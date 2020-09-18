import React, {useContext, useEffect, useState} from 'react'
import { Button} from 'reactstrap';
import Router from 'next/router';
import {PackageContext} from '../../contexts/PackageContext'
import Filebase64 from 'react-file-base64'
import * as ls from 'local-storage'

function PackageReview() {

    const {submitPackage, discount, oriPrice } = useContext(PackageContext)
    const serviceListSelected = ls.get('packageSelected2')
    const quantity = ls.get('packageQuantity')
    const price = ls.get('packagePrice')
    const images = ls.get('packageImages')
    const title = ls.get('packageTitle')
    const description = ls.get('packageDescription')
    const coveredArea = ls.get('packageCoveredArea')
    const tnc = ls.get('packageTnc')
    
    // const [serviceSelected, setserviceSelected] = useState([])
    const [coverImages, setcoverImages] = useState('')
    const [hargaFull, setHargaFull] = useState('')
    const [hargaTouchup, setHargaTouchup] = useState('')

    const serviceIcon = { Venue: 'ico-venue.png', 
    Canopy: 'ico-canopy.png', 
    KadBanner: 'ico-cards.png',
    WeddingDress: 'ico-dress.png',
    Makeup: 'ico-makeup.png',
    Photographer: 'ico-camera.png', 
    Videographer: 'ico-camera.png',
    Pelamin: 'ico-pelamin.png', 
    Caterer: 'ico-catering.png',
    Hantaran: 'ico-hantaran.png',
    Persembahan: 'ico-performance.png',
    DoorGift: 'ico-doorgift.png',
    Others: 'ico-others.png'}


    useEffect(() => {

        let image = images
        if (image.length > 0) {
            setcoverImages(image[0])
        }
        
        console.log(serviceListSelected)
        console.log(discount)
        console.log(oriPrice)
        console.log(quantity)

    }, [])




    return (
        <div className="review-form">
            {
                images && coverImages ?
                <div className="hero-review">
                    <img src={coverImages? coverImages.base64 || coverImages.urlStorage : ''}/>
                    <div className="hero-son-review">
                        {
                            images.map((v, i) => {
                                return (
                                    <img key={i} onClick={() => setcoverImages(v)} src={v.base64 || v.urlStorage}/>
                                )
                            })
                        }
                    </div>
                </div>
                :
                <div className="hero-review">
                    <img src="/images/logos/unavailable.png"/>
                    <div className="hero-son-review">
                        <img src="/images/logos/unavailable.png"/>
                        <img src="/images/logos/unavailable.png"/>
                        <img src="/images/logos/unavailable.png"/>
                        <img src="/images/logos/unavailable.png"/>
                    </div>
                </div>
            }
             
            <div className="review-catergry-and-price">
                <div className="review-category">
                    <p><span><img className="icon-service" src={'/images/icon/services-icon/white/ico-canopy-active.png/'}/></span>Package</p>
                </div>
                <div className="review-price">
                    <img src="/images/icon/ico-dollar.png"/>
                     <p><span>MYR (Min {quantity} pax)</span> <br></br> {oriPrice}</p>
                </div>
                {/* <div className="review-price">
                    <img src="/images/icon/ico-canopy-black.png"/>
                    <p><span>Minimum Qty</span> <br></br> {quantity}</p>
                </div>
                <div className="review-price">
                    <img src="/images/icon/bell.png"/>
                    <p><span>Status</span> <br></br> Pending</p>
                </div>
                <div className="review-price">
                    <img src="/images/icon/edit.png"/>
                    <p><span>Visible</span> <br></br> Show</p>
                </div> */}
            </div>

            
            <h5>{title}</h5>
            <div className="review-desc">
                <p>Tentang Pakej: <br/><span>{description}</span></p>
                <p>Terma & Syarat: <br/><span>{tnc}</span></p>
                <p>Covered Area: <br/>

                {coveredArea && coveredArea.map((v)=>{
                    return (<span style={{display: 'block'}}>{v} </span>)})}
                </p>
            </div>

            <div className="review-package">
                {
                    serviceListSelected&&serviceListSelected.map((v,i) => {

                        let price = 0

                        if (v.serviceType == "Makeup") {

                            price += parseInt(v.serviceDetails.hargaFull)
                            price += parseInt(v.serviceDetails.hargaTouchup)

                            return (
                                <div className="package-details" key={i}>
                                    <div className="package-img">
                                        <img src={v.images[0].base64 || v.images[0].urlStorage}/>
                                        <div className="package-icon">
                                            <img style={{height: 24, width: 24}} src={'/images/icon/services-icon/dark/'+serviceIcon[v.serviceType]}/>
                                            <div className="package-icon-text">
                                                <h6>{v.serviceName}</h6>
                                                <p>{v.serviceType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="package-subs">
                                        <p style={{marginBottom: 0}}>Description: {v.description}</p>
                                        <p style={{marginBottom: 0}}>Harga Touchup: {v.serviceDetails.hargaTouchup}</p>
                                        <p style={{marginBottom: 0}}>Harga full: {v.serviceDetails.hargaFull}</p>
                                        <div className="package-subs-2">
                                            <p>Harga: <span>MYR {price}</span></p>  
                                        </div>                                       
                                    </div>
                                </div>
                            )

                        } else if (v.serviceType == 'KadBanner') {

                            let priceBanner = 0

                            price += (quantity * v.serviceDetails.hargaPerPerson)
                            // v.serviceDetails.bannerDesc.bannarSize.forEach( obj => priceBanner += parseInt(obj.harga))
                            // price += priceBanner

                            const reducer = (accumulator, currentValue) => parseInt(accumulator.harga) + parseInt(currentValue.harga)
                            if (v.serviceDetails.banner == true && v.serviceDetails.bannerDesc.bannerSize.length > 0) {
                                priceBanner = v.serviceDetails.bannerDesc.bannerSize.reduce(reducer)
                                price += priceBanner
                            }

                            return (
                                <div className="package-details" key={i}>
                                    <div className="package-img">
                                        <img src={v.images[0].base64 || v.images[0].urlStorage}/>
                                        <div className="package-icon">
                                            <img style={{height: 24, width: 24}} src={'/images/icon/services-icon/dark/'+serviceIcon[v.serviceType]}/>
                                            <div className="package-icon-text">
                                                <h6>{v.serviceName}</h6>
                                                <p>{v.serviceType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="package-subs">
                                        <p>Description: {v.description}</p>
                                        <div className="package-subs-2">
                                            <p>Harga: <span>MYR {price}</span></p>  
                                        </div>                                       
                                    </div>
                                </div>
                            )

                        } else if (v.serviceType == 'Hantaran' || v.serviceType == 'Caterer' || v.serviceType == 'DoorGift')  {

                            price += parseInt(v.serviceDetails.hargaPerPerson)
        
                            return (
                                <div className="package-details" key={i}>
                                    <div className="package-img">
                                        <img src={v.images.length > 0 ? v.images[0].base64 || v.images[0].urlStorage: ''}/>
                                        <div className="package-icon">
                                            <img style={{height: 24, width: 24}} src={'/images/icon/services-icon/dark/'+serviceIcon[v.serviceType]}/>
                                            <div className="package-icon-text">
                                                <h6>{v.serviceName}</h6>
                                                <p>{v.serviceType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="package-subs">
                                        <p>Description: {v.description}</p>
                                        <div className="package-subs-2">
                                            <p>Quantity: <span>{quantity}</span></p>  
                                            <p>Harga: <span>MYR {price}</span></p>  
                                        </div>                                       
                                    </div>
                                </div>
                            )

                        } else if (v.serviceType == 'Photographer' || v.serviceType == 'Videographer' || v.serviceType == 'WeddingDress' || v.serviceType == 'Pelamin' || v.serviceType == 'Others') {

                            price += parseInt(v.serviceDetails.harga)

                            return (

                                <div className="package-details" key={i}>
                                    <div className="package-img">
                                        <img src={v.images[0].base64 || v.images[0].urlStorage}/>
                                        <div className="package-icon">
                                            <img style={{height: 24, width: 24}} src={'/images/icon/services-icon/dark/'+serviceIcon[v.serviceType]}/>
                                            <div className="package-icon-text">
                                                <h6>{v.serviceName}</h6>
                                                <p>{v.serviceType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="package-subs">
                                        <p>Description: {v.description}</p>
                                        {/* <p>Harga: {v.serviceDetails.harga}</p> */}
                                        <div className="package-subs-2">
                                            <p>Harga: <span>MYR {price}</span></p>  
                                        </div>                                       
                                    </div>
                                </div>
                            )
                        }

                        
                    })
                }
                
            </div>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => Router.back()}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => submitPackage()}>Next</Button>{' '}
            </div>
            <style jsx>{`
                .review-form { max-width: 670px; margin: 30px auto; overflow: hidden;}
                .hero-review { position: relative;}
                .hero-review > img { object-fit: cover; width: 100%; max-height: 206px; object-position: top; border-radius: 5px;}
                .hero-son-review { position: absolute; bottom: 15px; left: 15px; display: flex; }
                .hero-son-review > img { width: 40px; height: 40px; object-fit: cover;  border: 2px solid #FFF; border-radius: 4px; margin-right: 6px; cursor: pointer;}
                .form-button { max-width: 490px; margin: 10px auto; display: flex; justify-content: space-between; }
                .package-details { display: flex; margin: 10px 0;}
                .package-img { margin-right: 10px; flex: 0 0 200px; border: 1px solid #F4F4F4; border-radius: 4px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);}
                .package-img > img { width: 100%; object-fit: cover; height: 95px;}
                .package-subs { background-color: #F5F6FA; padding: 10px; width: 100%; position: relative;}
                .package-subs::after { position: absolute; content: ''; bottom: 50px; left: 0; right: 0; background-color: #EAEAEA; height: 1px; width: 100%;}
                .package-subs > p { font-size: 14px; color: #515D65; font-weight: normal;  margin-bottom: 0;}
                .package-subs > p:first-child { width: 96%; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box;}
                .package-subs-2 { position: absolute; bottom: 0px; display: flex;}
                .package-subs-2 > p { font-size: 14px; color: #515D65; font-weight: normal; }
                .package-subs-2 > p:first-child { margin-right: 16px;}
                .package-subs-2 > p > span { font-weight: bold;}
                .package-icon { display: flex; align-items: center; padding: 6px;}
                .package-icon > img { margin-right: 10px;}
                .package-icon-text > h6 { font-weight: bold; font-size: 12px; color: #3E3E3E; margin-bottom: 0;}
                .package-icon-text > p{ font-weight: normal; font-size: 11px; color: #75848E; margin-bottom: 0;}
                .review-catergry-and-price { display: flex; justify-content: space-between; margin: 13px 0px 18px 0px; overflow-x: auto;}
                .review-category { background-color: #ED795F; color: #FFF; padding: 20px; border-radius: 5px; margin-right: 10px; flex: 0 0 180px;}
                .review-category > p { font-size: 14px; color: #FFF; margin: 0;}
                .review-category > p > span { margin-right: 10px;}
                .icon-service{width:20%; margin-right: 10px;}
                .review-price { padding: 0 20px; display: flex; justify-content: space-between; align-items: center; border-radius: 5px; width: 143px; border: 1px solid #EAEAEA; margin-right: 10px; flex: 0 0 170px; text-align: right;}
                .review-price > p { font-size: 14px; color: #3E3E3E; width: 100%; margin: 0;}
                .review-price > p > span { color: #59D0C9; font-size: 10px;}
                .review-price > img { width: 16px;}
                .review-desc { padding: 20px 0; margin-bottom: 22px;}
                .review-desc > p { color:  #75848E; font-size: 14px;}
                .review-desc > p > span { color: #515D65; font-size: 16px; font-weight: bold;}
                @media screen and ( max-width: 480px ) {
                    .review-form { padding: 0 20px;}
                    .package-details { flex-wrap: wrap;}
                    .package-img { flex: 0 0 100%;}
                    .package-subs::after { content: none;}
                    .package-subs-2 { position: unset;}
                }
            `}</style>
        </div>
    )
}

export default PackageReview
