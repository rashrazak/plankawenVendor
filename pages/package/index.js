import React, {useState, useEffect, useContext} from 'react'
import {Button,Table} from 'reactstrap';
import Head from '../../components/Headx'
import LoginContext from '../../contexts/LoginContext'
import { Router } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import Swal from 'sweetalert2'
import firebase from '../../config/firebaseConfig'


function Package(props) {
    const {user} = useContext(LoginContext);
    const services = ['Venue',
                    'Canopy',
                    'KadBanner',
                    'WeddingDress',
                    'Makeup',
                    'Photographer',
                    'Videographer',
                    'Pelamin',
                    'Caterer',
                    'Hantaran',
                    'Kugiran',
                    'DoorGift',
                    'Others',]
    // const [allPackage, setallPackage] = useState([])
    const [serviceList, setserviceList] = useState([])


    useEffect(() => {
        if (user) {
            
            async function getData() {
                await services.map( async (val,index) => {
                    var read = await firebase.checkServiceType(val, user.email)
                    read.forEach(function(doc) {
                        let x = doc.id;
                        let y = doc.data()
                        let data = {...y, id:x}
                        console.log(data)

                        setserviceList((old) => [...old, data])
                    })
                })
            }
            getData()
            
        }
    }, [user])

    return (
        <Head title={'Package'}>
            <div>
                <h1>Package</h1>
            </div>
            <div>
            {serviceList ? 
                <div>
                    <h1>Show Lists</h1>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Type</th>
                            <th>Service Name</th>
                            <th>Status</th>
                            <th>Date Created</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>
                        </thead>
                        <tbody>
                            {serviceList.map((val,index) => {
                                let date = new Date(val.getTime)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{val.serviceType}</td>
                                        <td>{val.serviceName}</td>
                                        <td>{val.status}</td>
                                        <td>{date.toString()}</td>
                                        <td><Button onClick={() => selectService(index)} >Click </Button></td>
                                        <td><Button onClick={() => viewInformation(index)} >Click </Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            :
                <div>
                    <h1>Empty</h1>
                </div>
           } 
            </div>
            
        </Head>
    )
}

export default Package