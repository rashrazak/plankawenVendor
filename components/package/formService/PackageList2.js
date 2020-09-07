import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import LoginContext from '../../../contexts/LoginContext'
import { Router } from 'next/router'
import '../../../css/venueform.css'
import '../../../css/about.css'
import Swal from 'sweetalert2'
import firebase from '../../../config/firebaseConfig'


function PackageList() {
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
                    'Others']
    const [serviceList, setserviceList] = useState([])
    const [service, setservice] = useState([])
    const [indexServiceList, setindexServiceList] = useState('');
    const [modal, setmodal] = useState(false)
    const [serviceType, setserviceType] = useState('')
    const [serviceId, setserviceId] = useState('')
    const [hargaPerPerson, sethargaPerPerson] = useState(0)

    //banner
    const [bannerSize, setbannerSize] = useState([])

    //makeup
    const [hargaTouchup, sethargaTouchup] = useState(0)
    const [hargaFull, sethargaFull] = useState(0)

    const confirmService = () => {
        alert('hahahha')
        var x = {};
        if (serviceType == 'KadBanner' || serviceType == 'Caterer' || serviceType == 'DoorGift' || serviceType == 'Hantaran') {
            x = {serviceId,hargaPerPerson,serviceType}

            if (serviceType == 'KadBanner') {
                x.bannerSize = bannerSize
            }
        }else if (serviceType == 'Makeup') {
            x = {serviceId,hargaTouchup,hargaFull,serviceType}
        }else{

        }
        console.log(x)

    }

    const selectService = (index) => {
        setindexServiceList(index)
        let data = serviceList[index];
        console.log(data)
        setservice(data)
        setserviceId(data.id)
        setserviceType(data.serviceType)
        data.serviceType =='KadBanner' ? setbannerSize(data.serviceDetails.bannerDesc.bannerSize) : '';
        setmodal(!modal)

    }
    
    const toggle = () => setmodal(!modal);

    useEffect(() => {
        if (user) {
            async function getData() {
                // Swal.showLoading();
                await services.map( async (val,index) => {
                    var read = await firebase.checkServiceType(val, user.email)
                    read.forEach(function(doc) {
                        let x = doc.id;
                        let y = doc.data()
                        let data = {...y, id:x}
                        setserviceList((old) => [...old, data])
                    })
                })
                // Swal.close();
            }
            getData()
            
        }
    }, [user])

    useEffect(() => {
        console.log(bannerSize)
     }, [setbannerSize])

    return (
        
            <div>
            {serviceList ? 
                <div>
                    <h1>Select Services</h1>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Type</th>
                            <th>Nama Servis</th>
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
                    <h1>Loading...</h1>
                </div>
           }
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{serviceType}</ModalHeader>
                    <ModalBody>
                        {serviceType == 'KadBanner' || serviceType == 'Caterer' || serviceType == 'DoorGift' || serviceType == 'Hantaran'? 
                            <div>
                                <Label>Harga Per Pax (before) RM: {service.serviceDetails.hargaPerPerson}</Label>
                                {
                                    service.serviceDetails.discount.map((v,i) => {
                                        return(
                                            <li key={i}>Minimum:{v.min} Maximum:{v.max} Discount:{v.discount}</li>
                                        )
                                    })
                                }
                                <hr/>
                                <Input type="number" placeholder="Please input the new harga per pax" onChange={(e)=> sethargaPerPerson(e.target.value)} />
                                {
                                    serviceType == 'KadBanner' && service.serviceDetails.banner == true ?
                                        <React.Fragment>
                                            <hr/>
                                            <p>Butiran Banner</p>
                                            <p>{service.serviceDetails.bannerDesc.description}</p>
                                            {
                                                service.serviceDetails.bannerDesc.bannerSize.map((v,i) => {
                                                    return(
                                                        <React.Fragment key={i}>
                                                            <li >
                                                                Harga lama:{v.harga} <br/> Size:{v.size}
                                                                <p>Harga baru:{bannerSize[i].harga} <br/> Size:{bannerSize[i].size}</p>
                                                                <Input type="number" placeholder={'Please add new banner price'} onChange={(e)=> {
                                                                    let x = e.target.value || 0
                                                                    setbannerSize((old)=>{
                                                                        let y = old;
                                                                        y[i] = {harga:x ,size:v.size};
                                                                        return y;

                                                                    }) }}/>
                                                            </li>
                                                            
                                                        </React.Fragment>
                                                    )
                                                })
                                            }        
                                        </React.Fragment>
                                    : serviceType == 'Caterer' ?
                                        <React.Fragment>
                                            <hr/>
                                            <p>Senarai Lauk</p>
                                            {
                                                service.serviceDetails.senaraiLauk.map((v,i) => {
                                                    return(
                                                        <li key={i}>{v}</li>
                                                    )
                                                })
                                            }   
                                        </React.Fragment>
                                        : ''
                                }
                            </div>
                            : serviceType == 'Makeup'
                            ?
                                <React.Fragment>
                                    <div className="review-price">
                                        <p><span>MYR (Touchup)</span> <br></br>{service.serviceDetails.hargaTouchup}</p>
                                        <p><span>MYR (Diskaun)</span> <br></br>{service.serviceDetails.hargaDiscountTouchup}</p>
                                        <p><span>% (Diskaun)</span> <br></br>{service.serviceDetails.discountTouchup}</p>

                                        <Input type="number" placeholder={'Please add new touchup price'} onChange={(e)=> sethargaTouchup(e.target.value)}/>

                                    </div>
                                    <div className="review-price">
                                        <p><span>MYR (Touchup)</span> <br></br>{service.serviceDetails.hargaFull}</p>
                                        <p><span>MYR (Diskaun)</span> <br></br>{service.serviceDetails.hargaDiscountFull}</p>
                                        <p><span>% (Diskaun)</span> <br></br>{service.serviceDetails.discountFull}</p>

                                        <Input type="number" placeholder={'Please add new touchup price'} onChange={(e)=> sethargaFull(e.target.value)}/>
                                    </div>
                                </React.Fragment>
                            : ''

                        }
                    
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={confirmService}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal> 
            </div>
    )
}


export default PackageList