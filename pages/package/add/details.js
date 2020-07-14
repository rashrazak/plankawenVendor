import React,{useEffect, useState, useContext} from 'react'
import { useRouter  } from 'next/router'
import Step from '../../../components/StepByStep'
import {PackageContext} from '../../../contexts/PackageContext'
import Head from '../../../components/Headx'
import {Button,Table,Input,Label} from 'reactstrap';
import '../../../css/venueform.css'
import '../../../css/about.css'

function details() {
    const route = useRouter()

    const weirdService = ['KadBanner','Makeup','Caterer','Hantaran','DoorGift','Others']

    const {serviceListSelected, setServiceListSelected, title, setTitle, description, setDescription, coveredArea, setCoveredArea, quantity, setQuantity} = useContext(PackageContext)
    return (
        <Head title={'Package - Details'}>
            <div className={`container-layout`}>
            <div>
                <Step progress={1} />
            </div>
            {
                serviceListSelected ?
                <div className="form-service">
                    <div className="form-section">
                        <h4>Enter your quantity amount </h4>
                        <Input className="form-custom" type="number" placeholder="" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Service name</th>
                                <th>Category</th>
                                <th>Price /unit</th>
                                <th>Edit price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                serviceSelected && serviceSelected.map((v,i)=>{
                                    return(
                                        <tr key={i}>
                                            <th scope="row">{i+1}</th>
                                            <td>{v.serviceName}</td>
                                            <td>{v.serviceType}</td>
                                            <td>{v.hargaDiscount ? v.hargaDiscount : v.harga} /</td>
                                            <td></td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </Table>
                    <div className="form-section">
                        
                    </div>
                </div>
                :
                <h1>Please select the service <span style={{textDecoration:'underline'}} onClick={route.back()}>here</span>!</h1>
            }
            </div>
            <style jsx>{`
                .form-button { display: flex; justify-content: space-between; }
                .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                .form-section { margin: 20px 0; }
                h4 { text-align: center; font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                .area-covered-div { display: inline-block; margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .container-layout { max-width: 950px; margin: 30px auto;}
                .service-empty {  background-color: #FEF2EB; box-shadow: 0 6px 10px 0 rgba(0,0,0,0.2); padding: 10px; max-width: 800px; margin: auto;}
                .service-empty p { margin: 0;}
                .service-empty a { color: #007bff; text-decoration: underline;}
                .card-flex { display: flex; flex-wrap: wrap;}
                .card-service { border-radius: 5px; width: 150px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.2); margin-right: 10px; margin-bottom: 20px; background-color: #FFF; cursor: pointer;}                
                .card-service > img { object-fit: cover; width: 100%; height: 85px; object-position: center;}
                .card-service-desc {  background-color: #FFF; margin: 0; padding: 10px; border-radius: 0px 0px 5px 5px; display: flex; align-items: flex-start;}
                .card-service-desc > p {  font-style: normal; font-weight: 900;font-size: 0.75rem; color: #3E3E3E; margin: 0;}
                .card-service-desc > img {width: 15px; flex: 0 0 15px; margin-right: 15px;}            
                .card-service-add { width: 100px; background-color: #EBF9F8; cursor: pointer; height: 100px;}
                .card-service-add p { background-color: transparent;}
                .card-service-add { background-image: url(/images/icon/plus-circle-dark.png); background-repeat: no-repeat; background-position: center 50%;}
            `}</style>
        </Head>
    )
}

export default details
