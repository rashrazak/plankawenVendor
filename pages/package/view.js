import React, {useState, useEffect, useContext} from 'react'
import Head from '../../components/Headx'
import Router from 'next/router'
import {PackageContext} from '../../contexts/PackageContext'
import '../../css/venueform.css'
import '../../css/about.css'
import firebase from '../../config/firebaseConfig'
import LoginContext from '../../contexts/LoginContext'
import {Button,Table,Input,Label} from 'reactstrap';
import Swal from 'sweetalert2';
import Link from 'next/link'




function view() {
    const [email, setEmail] = useState(null)
    const [packageList, setPackageList] = useState([])
    const {user} = useContext(LoginContext)
    useEffect(() => {
       if (user) {
            setEmail(user.email)
       }
    }, [user])

    useEffect(() => {
        const getQueries = async() =>{
            if (email) {
                var x = await firebase.getPackages(email)
                await x.forEach(function(doc) {
                    let x = doc.id;
                    let y = doc.data()
                    console.log(y)
                    let data = {...y, id:x}
                    setPackageList((old) => [...old, data])
                })
            }
        }    
        getQueries()
       
    }, [email])

    const editFunction = async (index) => {
        let pl = packageList[index]
        let id = pl.id;
    
        Router.push('/package/edit?id='+id)

    }

    const deleteFunction = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your service will be deleted",
            type: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result) {
               let pl = packageList[index]
               let id = pl.id;
               firebase.deletingPackage(id)
            }
        }).catch(Swal.noop);
    }
    return (
        <Head title={'View Packages'}>
        <h1>View Package</h1>
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Package Name</th>
                <th>Price before</th>
                <th>Price After</th>
                <th>Quantity</th>
                <th>Edit</th>
                <th>Delete</th>

            </tr>
            </thead>
            <tbody>
            {packageList.length > 0 ? 
                packageList.map((val,index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{val.packageDetails.packageName}</td>
                            <td>{val.packageSelection.totalBefore}</td>
                            <td>{val.packageSelection.totalAfter}</td>
                            <td>{val.packageSelection.quantity}</td>
                            <td><Button onClick={() => editFunction(index)} >Click </Button></td>
                            <td><Button onClick={() => deleteFunction(index)} >Click </Button></td>
                        </tr>
                    )
                })
            :
                <tr>
                    <td>Tiada Package yang dibuat, klik <Link href="/package/add"><a>Sini</a></Link></td>
                </tr>
            }             
            </tbody>
        </Table>
            
        </Head>
    )
}

export default view
