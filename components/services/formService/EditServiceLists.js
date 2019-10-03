import React, {useContext, useEffect, useState} from 'react'
import firebase from '../../../config/firebaseConfig';
import LoginContext from '../../../contexts/LoginContext'
import AddServiceContext from '../../../contexts/AddServiceContext'
import { Table, Button, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { get } from 'https';

function EditServiceLists({serviceType}) {
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
    const [search, setsearch] = useState('')
    const [searchList, setsearchList] = useState([])

    useEffect(() => {
        if (user) {
            async function getData() {
                await services.map( async (val,index) => {
                    Swal.showLoading()
                    var read = await firebase.checkServiceType(val, user.email)
                    await read.forEach(function(doc) {
                        let x = doc.id;
                        let y = doc.data()
                        let data = {...y, id:x}
                        console.log(data)

                        setserviceList((old) => [...old, data])
                        setsearchList((old) => [...old, data]);
                    })
                    Swal.close()
                })
                

            }
            getData()
            
        }
    }, [user])

    const editFunction = (index) => {
        let sl = serviceList[index]
        console.log(sl);
        let id = sl.id;
        addServiceAbout(sl.serviceName, sl.areaCovered, sl.description)
        addServiceUpload(sl.images, serviceType, id);
        getServiceDetailsEdit(objectType, sl.serviceDetails, id)

        Router.push('/editservice/about')

    }

    const deleteFunction = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your service will be deleted",
            type: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result) {
               let sl = serviceList[index]
               let id = sl.id;
               firebase.deleting(service, id)
            }
        }).catch(Swal.noop);
    }

    useEffect(() => {
        setsearchList((old) => {
            let v = serviceList.filter((x) => {
                //search service name
                return (x.serviceName.toLowerCase().includes(search.toLowerCase()) || x.serviceType.toLowerCase().includes(search.toLowerCase()));
            })
            return v
        })
    }, [search])
    return (
        
        <div>
            <div>
                {/* {
                    searchList = serviceList.filter((x) => {
                    return x.serviceName.toLowerCase().indexOf(val.toLowerCase() !== -1);
                })} */}
                <h1>Show Lists</h1>
                <Input type="text" name="search" onChange={(e) => setsearch(e.target.value)}  placeholder="Search" />
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Service Name</th>
                        <th>Status</th>
                        <th>Date Created</th>
                        <th>Service Type</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                    </thead>
                    <tbody>
            {searchList.length > 0 ? 
                searchList.map((val,index) => {
                    let date = new Date(val.getTime)
                    return (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{val.serviceName}</td>
                            <td>{val.status}</td>
                            <td>{date.toString()}</td>
                            <td>{val.serviceType}</td>
                            <td><Button onClick={() => editFunction(index)} >Click </Button></td>
                            <td><Button onClick={() => deleteFunction(index)} >Click </Button></td>
                        </tr>
                    )
                })
            :
                <tr>
                    <td>Empty</td>
                </tr>
            }             
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default EditServiceLists
