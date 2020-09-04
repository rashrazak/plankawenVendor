import React,{useEffect, useState, useContext} from 'react'
import { useRouter  } from 'next/router'
import Step from '../../../components/StepByStep'
import {PackageContext} from '../../../contexts/PackageContext'
import Head from '../../../components/Headx'
import {Button,Table,Input,Label} from 'reactstrap';
import PackageEdit from '../../../components/package/PackageEdit'
import * as ls from 'local-storage'
import '../../../css/venueform.css'
import '../../../css/about.css'

function details() {
    const route = useRouter()

    const {serviceListSelected, setServiceListSelected, quantity, setQuantity, discount, setDiscount, oriPrice, setOriPrice, price, setPrice} = useContext(PackageContext)

    const [serviceSelected, setServiceSelected] = useState([])


    useEffect(() => {
        if (serviceSelected.length == 0 && serviceListSelected) {
            setServiceSelected(serviceListSelected)
            calculatePrice(serviceListSelected, quantity)
        }else{
            setPrice(0)
            setDiscount(0)
        }
    }, [serviceSelected])

    useEffect(() => {
        // console.log(quantity)
        calculatePrice(serviceSelected, quantity)
    }, [quantity])

    useEffect(() => {
        if (oriPrice && !price) {
            setPrice(oriPrice)
        }
    }, [oriPrice])

    useEffect(() => {
        if (price && oriPrice) {

            if (price < oriPrice) {
                let perc = parseFloat(price) / parseFloat(oriPrice)
                let disc = 100 - (perc * 100)
                console.log(disc)
                setDiscount(disc.toFixed(0))
            }else {
                setDiscount('Tiada Diskaun')

            }
        }
    }, [price])
    useEffect(() => {},[discount])

    const returnValue = (data, index, price) =>{
        let service = serviceListSelected

        if (data.serviceType == 'Makeup') {
            let makeup = service[index]
            makeup.serviceDetails.hargaTouchup = price.hargaTouchup || 0
            makeup.serviceDetails.hargaFull = price.hargaFull || 0
            service[index] = makeup
            
        }else if (data.serviceType == 'KadBanner'){

            let kadbanner = service[index]
            kadbanner.serviceDetails.hargaPerPerson = price.hargaPerPerson || 0
            if (data.serviceDetails.banner == true) {
                kadbanner.serviceDetails.bannerDesc.bannerSize = price.banner
            }
            service[index] = kadbanner
        }else if (data.serviceType == 'Hantaran' || data.serviceType == 'Caterer' || data.serviceType == 'DoorGift'){
            let random = service[index]
            random.serviceDetails.hargaPerPerson =  price.hargaPerPerson || 0
            service[index] = random
    
        }else if (data.serviceType == 'Photographer' || data.serviceType == 'Videographer' || data.serviceType == 'WeddingDress' || data.serviceType == 'Pelamin' || data.serviceType == 'Others'){
            let fix = service[index]
            fix.serviceDetails.harga =  price.harga || 0
            service[index] = fix
        }
        //sambung
        setServiceSelected([...service])
        calculatePrice(service, quantity)
    }

    const calculatePrice = (service, quan) =>{
        var qty = quan
        var serviceAll = service
        var orip = 0
        console.log(serviceAll)
        serviceAll.map((v,i)=>{
            if (v.serviceType == 'Makeup') {
                let makeup = v

                orip += parseInt( makeup.serviceDetails.hargaTouchup )
                orip += parseInt( makeup.serviceDetails.hargaFull )
                
            }else if (v.serviceType == 'KadBanner'){

                let kadbanner = v
                if (qty > 0) {
                    console.log(qty)
                    orip = orip + (parseFloat( kadbanner.serviceDetails.hargaPerPerson ) * qty)
                    console.log(kadbanner)
                }
                if (v.serviceDetails.banner == true) {
                    let banner = kadbanner.serviceDetails.bannerDesc.bannerSize
                    banner.map((val, index)=>{
                        orip += parseInt( val.harga )
                    })
                }
            }else if (v.serviceType == 'Hantaran' || v.serviceType == 'Caterer' || v.serviceType == 'DoorGift'){
                let random = v
                if (qty > 0) {
                    orip = orip +  (parseInt( random.serviceDetails.hargaPerPerson ) * qty)
                }
        
            }else if (v.serviceType == 'Photographer' || v.serviceType == 'Videographer' || v.serviceType == 'WeddingDress' || v.serviceType == 'Pelamin' || v.serviceType == 'Others'){
                let fix = v

                orip += parseInt( fix.serviceDetails.harga )
                
            }

            if (i == (serviceAll.length - 1) ) {
                console.log(orip)
                setOriPrice(orip.toFixed(2))
            }
        })
        
    }

    const goingNext = () => {
        setServiceListSelected([...serviceListSelected])
        ls.set('packageDetails')
        route.push('/package/add/upload')
    }
    return (
        <Head title={'Package - Details'}>
            <div className={`container-layout`}>
            <div>
                <Step progress={1} />
            </div>
            {
                serviceSelected.length >= 1 ?
                <div className="form-service">
                    
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama Servis</th>
                                <th>Kategori</th>
                                <th>Harga / unit</th>
                                <th>Edit Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                 serviceSelected.map((v,i)=>{
                                    return(
                                        <tr key={i} className="tr-bg">
                                            <PackageEdit key={i}  returnValue={returnValue} data={v} indexList={i}/>
                                        </tr>
                                    )
                                })
                            }  
                        </tbody>
                    </table>
                    <div className="form-section">
                        <h4>Sila masukkan jumlah quantity  </h4>
                        <Input className="form-custom" type="number" placeholder="" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                    </div>
                    <div className="form-section">
                        <h4>Harga Diskaun</h4>
                        <Input className="form-custom" type="number" placeholder="" value={price} onChange={(e) => {setPrice(e.target.value)}} />
                    </div>
                    <div className="form-section form-last">
                        <p>Harga Asal: <span>RM {oriPrice}</span></p>
                        <p>Harga Diskaun Baharu: <span>RM {price}</span></p> 
                        <p>Jumlah Diskaun: <span>% {discount}</span></p>  
                    </div>
                </div>
                :
                <div className="select-service">
                    <h1 style={{textAlign: 'center'}}>Please select the service <span style={{textDecoration:'underline', cursor: 'pointer'}} onClick={() =>route.back()}>here</span>!</h1>
                </div>
            }
            </div>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => route.back()}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => goingNext()}>Next</Button>{' '}
            </div>
            <style jsx>{`
                .form-button { display: flex; justify-content: space-between; max-width: 490px; margin: 10px auto;}
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
                table { width: 100%; border-collapse:separate; border-spacing:0 6px;}
                th { font-size: 12px; font-weight: normal; color: #75848E; padding: 0 10px;}
                .select-service { height: calc(100vh - 302px);}
                tbody > tr { background-color: #F5F7F8;}
                .form-last { background-color: #F5F6FA; padding: 20px 40px; border-radius: 6px;}
                .form-last > p { font-size: 14px; color: #75848E; font-weight: normal; margin-bottom: 2px;}
                .form-last > p > span { color: #2b2b2b; float: right;}
                th:last-child { width: 100px;}
                @media screen and ( max-width: 480px ){
                    .container-layout { padding: 0 20px;}
                    .form-button { padding: 0 20px;}
                }
            `}</style>
        </Head>
    )
}

export default details
