import React, {useContext, useEffect, useState} from 'react'
import firebase from '../../../config/firebaseConfig';
import LoginContext from '../../../contexts/LoginContext'
import { Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import Router from 'next/router';

function EditServiceLists({serviceType}) {
    const {user} = useContext(LoginContext);

    const [service, setservice] = useState('')
    const [serviceList, setserviceList] = useState([])
    useEffect(() => {
        setservice(serviceType)
        if (user && service) {
            
            var getData = async () => {
                var read = await firebase.checkServiceType(service, user.email)
                setserviceList([])
                read.forEach(function(doc) {
                    let x = doc.id;
                    let y = doc.data()
                    if (y.serviceType == service) {
                        let data = {...y, id:x}
                        setserviceList((old) => [...old, data])
                    }
                })
            }
            getData()
        }else{
            
        }
        Swal.close()
        
    }, [serviceType,service,deleteFunction])

    const editFunction = (index) => {

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
    return (
        <div>
           {service && serviceList ? 
                <div>
                    <h1>Show Lists</h1>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
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
                                        <td>{val.serviceName}</td>
                                        <td>{val.status}</td>
                                        <td>{date.toString()}</td>
                                        <td><Button onClick={() => editFunction(index)} >Click </Button></td>
                                        <td><Button onClick={() => deleteFunction(index)} >Click </Button></td>
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
    )
}

export default EditServiceLists
