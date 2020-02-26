import React, {useContext, useEffect, useState} from 'react'
import firebase from '../../../config/firebaseConfig';
import LoginContext from '../../../contexts/LoginContext'
import AddServiceContext from '../../../contexts/AddServiceContext'
import { Table, Button, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { get } from 'https';
import '../../../css/editServiceList.css';
import Link from 'next/link'

function EditServiceLists({serviceType}) {
    const {user} = useContext(LoginContext);
    const {addServiceAbout,addServiceUpload,getServiceDetailsEdit, addServiceAboutTypeName} = useContext(AddServiceContext)
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
                    'Persembahan',
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
                        setserviceList((old) => [...old, data])
                        setsearchList((old) => [...old, data]);
                    })
                    Swal.close()
                })
                

            }
            getData()
            
        }
    }, [user])

    const editFunction = async (index) => {
        let sl = serviceList[index]
        let st = sl.serviceType;
        let serv = 'addServiceDetails'+st;
        let id = sl.id;
        await addServiceAboutTypeName(st);
        await addServiceAbout(sl.serviceName, sl.areaCovered, sl.description, sl.tnc, sl.extra)
        await addServiceUpload(sl.images, st, id);
        await getServiceDetailsEdit(serv, sl.serviceDetails, id)
        // Router.push('/editservice/about')
        Router.push('/editservice/edit')

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
               firebase.deleting(sl.serviceType, id)
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
        
        <div className="edit-list-section">
            <div>
                {/* {
                    searchList = serviceList.filter((x) => {
                    return x.serviceName.toLowerCase().indexOf(val.toLowerCase() !== -1);
                })} */}
                <h1></h1>
                <div className={`add-service`}>
                    <Input className={`seacrh-input`}type="text" name="search" onChange={(e) => setsearch(e.target.value)}  placeholder="Search" />
                    <Link href="/addservice/about"><span><button type="button" className={`btn add-btn`}>Add Service</button></span></Link>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Status</th>
                            <th>Date Created</th>
                            <th>Service Type</th>
                            <th></th>
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
                                        <td className={`button-td`}>
                                            <button type="button" className={`btn btn-table edit-btn`} onClick={() => editFunction(index)} ></button>
                                            <button type="button" className={`btn btn-table delete-btn`} onClick={() => deleteFunction(index)} > </button>
                                        </td>
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
            <style jsx>{`
                .edit-list-section { max-width: 950px; margin: 20px auto;}
            `}</style>
        </div>
    )
}

export default EditServiceLists
