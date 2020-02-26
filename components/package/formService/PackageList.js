import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import LoginContext from '../../../contexts/LoginContext'
import { Router } from 'next/router'
import '../../../css/venueform.css'
import '../../../css/about.css'
import Link from 'next/link'
import firebase from '../../../config/firebaseConfig'


function PackageList({setPackageSelection, packageSelection, setServiceTotal, serviceList}) {
    const [service, setservice] = useState([])
    const [serviceBefore, setserviceBefore] = useState([])
    const [quantity, setquantity] = useState(100)
    const [totalAfter, settotalAfter] = useState(0)
    const [totalBefore, settotalBefore] = useState(0)
    const [modal, setmodal] = useState(false)
    const [packageDiscount, setpackageDiscount] = useState(0)

    const selectService = (index) => {
        let data = serviceList[index];
        
        setservice([...service,data])
        setserviceBefore([...serviceBefore,data])
    }
    
    const toggle = () => setmodal(!modal);

    useEffect(() => {
        if (packageSelection != null) {
            setservice(packageSelection.service)
            settotalAfter(packageSelection.totalAfter)
            settotalBefore(packageSelection.totalBefore)
            setquantity(packageSelection.quantity)
            setpackageDiscount(packageSelection.packageDiscount)

        }
    }, [packageSelection])

    



    const deleteService = (index) => {
        let sl = service;
        sl.splice(index, 1);
        setservice([...sl]);
        setserviceBefore([...sl])
    }

    useEffect(() => {
        const calculateServiceBefore = () => {

            if (serviceBefore.length > 0 && quantity) {
    
                var serv = serviceBefore
                var totalPrice = 0;
                var q = quantity; 

    
                serv.map((val, index) => {
                    let st = val.serviceType
                    if (st == 'KadBanner' || st == 'Caterer' || st == 'DoorGift' || st == 'Hantaran') {
                        let hpp = parseInt(val.serviceDetails.hargaPerPerson)
                        let disc = val.serviceDetails.discount
                        disc.map((val,index) =>{
                            let dis = val.discount
                            let max = val.max;
                            let min = val.min
                            var sn = serv[index].serviceName;
                            
                            if (q >= min && q <= max ) {
                                let har = q * hpp;
                                dis = dis / 100;
                                har = har - (har * dis);
                                totalPrice += har
                                
                                
                            }else if (q > max && (disc.length === index+1)){
                                // let har = q * hpp;
                                // dis = dis / 100;
                                // har = har - (har * dis);
                                // totalPrice += har
                                alert(`Jumlah maximum untuk ${sn} adalah ${max} orang`)
                            }
                        })
                        if (st == 'KadBanner') {
                            let setB = val.serviceDetails.banner
                            if (setB) {
                                let BSize = val.serviceDetails.bannerDesc.bannerSize
                                BSize.map((val, index) =>{
                                    let harg = parseInt(val.harga);
                                    totalPrice += harg;
                                })
    
                            }
                        }
                    }else if (st == 'Makeup') {
                        let hargaTouchup =  val.serviceDetails.hargaDiscountTouchup;
                        let hargaFull = val.serviceDetails.hargaDiscountFull;
                        totalPrice += hargaTouchup;
                        totalPrice += hargaFull;
                        
                    }else if (st == 'Videographer' || st == 'Photographer' || st == 'Others' || st == 'Pelamin' || st == 'Venue' || st == 'Persembahan' || st == 'WeddingDress' || st == 'Canopy'){
                        let harga = val.serviceDetails.hargaDiscount 
                        totalPrice += harga

                    }
                    
                });
                let x = parseInt(totalPrice);
                settotalBefore(x)
                if (totalAfter != 0) {
                    let z = parseInt(totalAfter)
                    let y = x;
                    let d = (z / y) * 100
                    d     = Math.round(d);
                    d = 100 - d;
                    d = d > 100 ? -d : d;
                    setpackageDiscount(d)
                }
            }else{
                settotalBefore(0)
            }
        }
        calculateServiceBefore()
    }, [serviceBefore,quantity])

    const calculatePackage = () => {
        const x = {
            quantity,
            service,
            totalAfter,
            totalBefore,
            packageDiscount
        }
        setPackageSelection(x)
    }

    return (
            <div>
                <Button onClick={toggle}>Pilih Service</Button>
                {
                    service.length > 0 ?
                        <div className={'row'}>
                            <div className="col-md-4">
                                <Label>Quantity (if any)</Label>
                                <Input type="number" value={quantity} onChange={e => {
                                    setquantity(parseInt(e.target.value))
                                
                                }  }/>
                            </div>
                            <div className="col-md-4">
                                <a href="/editservice" target="_blank">View Service</a>
                            </div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Service Type</th>
                                    <th>Service Name</th>
                                    <th>Details</th>
                                    <th>Min Details</th>
                                    <th>Max Details</th>
                                    <th>Price (with per head)</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {service && service.map((val,index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td style={{width:'10%'}}>{val.serviceType}</td>
                                                <td style={{width:'10%'}}>{val.serviceName}</td>
                                                <td style={{width:'60%'}}>{val.description}</td>
                                                <td style={{width:'10%'}}>
                                                    <p>Quantity: {val.serviceDetails.discount ? val.serviceDetails.discount[0].min : ''}</p>
                                                    <p>Discount: {val.serviceDetails.discount ? val.serviceDetails.discount[0].discount : ''}</p>
                                                </td>
                                                <td style={{width:'10%'}}>
                                                    <p>Quantity: {val.serviceDetails.discount ? val.serviceDetails.discount[val.serviceDetails.discount.length-1].min : ''}</p>
                                                    <p>Discount: {val.serviceDetails.discount ? val.serviceDetails.discount[val.serviceDetails.discount.length-1].discount : ''}</p>
                                                </td>
                                                <td style={{width:'10%'}}>{val.serviceDetails.hargaPerPerson}</td>
                                                <td style={{width:'10%'}}><Button onClick={() => deleteService(index)} >Delete </Button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Quantity: {quantity}</th>
                                        <th>Total Before: {totalBefore}</th>
                                        <th>Total After: <Input type="number" value={totalAfter} onChange={e => {
                                                let x = parseInt(e.target.value) || 0
                                                let y = totalBefore;
                                                let d = (x / y) * 100
                                                d     = Math.round(d);
                                                d = 100 - d;
                                                d = d > 100 ? -d : d;
                                                settotalAfter(x)
                                                setpackageDiscount(d)
                                            }}/>
                                        </th>
                                        <th>
                                            Discount Difference: %{packageDiscount}
                                        </th>
                                    </tr>
                                </thead>
                            </Table>
                            <center>
                                <Button color={'primary'} onClick={()=>calculatePackage()}>Submit</Button>
                            </center>
                        </div>
                    : ''
                }
                
                <Modal isOpen={modal} toggle={toggle} size={'lg'}>
                    <ModalHeader toggle={toggle}>Service List</ModalHeader>
                    <ModalBody>
                    {serviceList ? 
                        <div>
                            <h4>Select Services</h4>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Service Type</th>
                                    <th>Service Name</th>
                                    <th>Status</th>
                                    <th>Date Created</th>
                                    <th>Select</th>
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
                    
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" onClick={confirmService}>Confirm</Button>{' '} */}
                        <Button color="secondary" onClick={toggle}>OK</Button>
                    </ModalFooter>
                </Modal> 
            </div>
    )
}


export default PackageList