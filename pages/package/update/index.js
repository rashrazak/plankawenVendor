import React, {useContext, useState, useEffect} from 'react'
import Head from '../../../components/Headx'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Router from 'next/router';
import '../../../css/venueform.css'
import {PackageContext} from '../../../contexts/PackageContext'
import LoginContext from '../../../contexts/LoginContext'
import UploadFormEdit from '../../../components/services/formService/upload/UploadFormEdit'
import PackageEditSidebar from '../../../components/package/PackageEditSidebar';
import * as ls from 'local-storage'

function edit({pagex, sidebar}) {

    const {editPackage, setImages, setEditPackage, quantity} = useContext(PackageContext);
    const {getVendorDetails} = useContext(LoginContext);

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

    const [coverImage, setcoverImage] = useState('')
    const [images, setimages] = useState([])
    const [serviceType, setserviceType] = useState('')
    const [details, setdetails] = useState([])
    const [about, setabout] = useState([])
    const [vendorDetails, setvendorDetails] = useState([])
    const [imageModal,  setImageModal] = useState(false);
    const editImage = () => setImageModal(!imageModal);
    const [textAreaModal, setTextAreaModal] = useState(false)
    const editTextArea = () => setTextAreaModal(!textAreaModal)
    const [textmodal, setTextmodal] = useState(false)

    const [sidebarDiv, setSidebarDiv] = useState(false)

    // const [modal, setModal] = useState(false);
    // const uploadImage = () => setModal(!modal);

    useEffect(() => {
        if (editPackage) {
            let images = editPackage.images;
            console.log(editPackage)
            if (images.length > 0) {
                setcoverImage(images[0]);
                setimages(images);
                images.map((v,i)=>{
                    setImages(old => [...old,v])
                })
            }
        }
       
    }, [editPackage])

    const submitReview = () => {
       updateAddService('editservice')
    }
      
    useEffect(() => {
        setvendorDetails(getVendorDetails)
    }, [getVendorDetails])



    return (
        <Head title="edit">
           
            <div className="review-form">
                <div className="button-edit-position">
                    <button className={'btn btn-edit'} onClick={()=> setSidebarDiv(!sidebarDiv) }>Edit Package</button>
                    {
                         editPackage && sidebarDiv ?
                        <div>
                            <PackageEditSidebar />
                        </div>
                          : ''
                    }
                    
                </div>
               
            {
                images && coverImage ? 
                    <div className="hero-review">
                            <img src={coverImage.base64 || coverImage.urlStorage}/>
                        <div className="hero-son-review">
                            {images.map((v,i) => {
                                return (<img key={i} onClick={() =>setcoverImage(v)} src={v.base64 || v.urlStorage}/>)
                            })}
                        </div>
                        
                    </div>
                :
                    <div className="hero-review" onClick={editImage}>
                        <img src="/images/logos/unavailable.png"/>
                        <div className="hero-son-review">
                            <img src="/images/logos/unavailable.png"/>
                            <img src="/images/logos/unavailable.png"/>
                            <img src="/images/logos/unavailable.png"/>
                            <img src="/images/logos/unavailable.png"/>
                        </div>
                    </div>
                   

            }
            <React.Fragment>
                <Modal isOpen={imageModal} toggle={editImage} className="test">
                    <ModalHeader toggle={editImage}>Update Image</ModalHeader>
                    <ModalBody>
                        <UploadFormEdit />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={editImage}>Simpan</Button>{' '}
                        <Button color="secondary" onClick={editImage}>Kembali</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
            { 
                editPackage ?
                <div className="review-catergry-and-price">
                    <div className="review-category">
                        <p><span><img className="icon-service" src={'/images/icon/black.png'}/></span>{editPackage.title}</p>
                    </div>
                    <React.Fragment>
                        <div className="review-price">
                            <img src="/images/icon/ico-dollar.png"/>
                            <p><span>MYR (Harga Pakej)</span> <br></br>{editPackage.originalPrice}</p>
                        </div>
                        {/* <div className="review-price">
                            <img src="/images/icon/ico-canopy-black.png"/>
                            <p><span>Minimum Qty</span> <br></br>{editPackage.quantity}</p>
                        </div>
                        <div className="review-price">
                            <img src="/images/icon/bell.png"/>
                            <p><span>Status</span> <br></br>{editPackage.status}</p>
                        </div>
                        <div className="review-price">
                            <img src="/images/icon/edit.png"/>
                            <p><span>Visible</span> <br></br>{editPackage.visibility}</p>
                        </div> */}
                    </React.Fragment>
                </div>
                :''
            }
            
            {
                ( serviceType == 'WeddingDress' || serviceType == 'Venue') ?
                    <div className="review-name-and-places" onClick={editTextArea}>
                        <h4> {about.serviceName}</h4>
                        <p><span><img src="/images/icon/ico-location.png"/></span>{details.alamatPenuh}</p>
                    </div>
                :
                    <div className="review-name-and-place" onClick={editTextArea}>
                        <h4>{about.serviceName}</h4>
                    </div>
            }
             <React.Fragment>
                <Modal isOpen={textAreaModal} toggle={editTextArea} className="test">
                    <ModalHeader toggle={editTextArea}>Update Image</ModalHeader>
                    <ModalBody>
                        <UploadFormEdit />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={editTextArea}>Simpan</Button>{' '}
                        <Button color="secondary" onClick={editTextArea}>Kembali</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
            
            <div className="review-desc">

                <h5>Description:</h5>
                <p>{editPackage && editPackage.description}</p>

                <h5>Covered Area:</h5>
                <p>{editPackage && editPackage.coveredArea.map((v,i)=>{
                        return (<span key={i}>{v} <br/> </span>)    
                })}</p>

                <h5>Syarat dan Terma:</h5>
                <p>{ editPackage && editPackage.tnc}</p>

            </div>
            <div className="">

            {
                     editPackage && editPackage.selectServices.map((v,i) => {

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
            <style jsx>{`
                .review-form { max-width: 670px; margin: 30px auto; position: relative;}
                .hero-review { position: relative;}
                .hero-review > img { object-fit: cover; width: 100%; height: 206px; object-position: top; border-radius: 5px;}
                .hero-son-review { position: absolute; bottom: 15px; left: 15px; display: flex; }
                .hero-son-review > img { width: 40px; height: 40px; object-fit: cover;  border: 2px solid #FFF; border-radius: 4px; margin-right: 6px; cursor: pointer;}
                .form-button-edit { max-width: 490px; margin: auto; display: flex; justify-content: space-between; }
                .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                .form-section { margin: 20px 0; }
                h4 { font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                .area-covered-div { display: inline-block; margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .review-catergry-and-price { display: flex; justify-content: flex-start; margin: 13px 0px 18px 0px;}
                .review-category { background-color: #ED795F; color: #FFF; padding: 20px; border-radius: 5px; width: 150px; margin-right: 10px;}
                .review-category > p { font-size: 12px; color: #FFF; margin: 0;}
                .review-category > p > span { margin-right: 10px;}
                .review-price { padding: 0 10px; display: flex; justify-content: space-between; align-items: center; border-radius: 5px; width: 143px; border: 1px solid #EAEAEA; margin-right: 10px;}
                .review-price > p { font-size: 14px; color: #3E3E3E;}
                .review-price > p > span { color: #59D0C9; font-size: 10px;}
                .review-price > img { width: 16px;}
                .review-name-and-places > h4 { font-size: 18px; color: #3E3E3E;}
                .review-name-and-places > h4 > span { font-weight: bold;}
                .review-name-and-places > p { font-size: 12px; color: #3E3E3E;}
                .review-name-and-places > p > span  { margin-right: 10px;}
                .review-desc { padding: 20px 0; margin-bottom: 22px;}
                .review-desc > p { color:  #75848E; font-size: 14px;}
                .review-user  { background-color: #F5F6FA; padding: 20px; border-radius: 4px; margin-bottom: 22px; display: flex;}
                .review-user-image > img { width: 74px; height: 74px; object-fit: cover; border-radius: 50%;}
                .review-user-image-and-det { display: flex; justify-content: flex-start; align-items: center; width: 400px;}
                .review-user-image-det { margin-left: 10px;}
                .review-user-image-det > p { margin: 0;}
                .review-user-image-det > p:first-child { font-size: 10px; color: #9B9B9B;}
                .review-user-image-det > p:nth-child(2) { font-size: 16px; color: #3E3E3E;}
                .review-user-image-det > p:nth-child(3) { font-size: 12px; color: #47CBC4;}
                h5 { font-weight: bold; color: #3E3E3E; font-size: 17px; margin-top: 10px;}
                .form-button {display: none;}
                .button-edit-position { position: fixed; left: 60px; z-index: 2;}
                .button-edit-position .btn { display: block; width: 100px; height: 50px; border-radius: 25px; margin-bottom: 10px; transition: all 3.s}
                .btn-edit { background-color: #FFF; color: #3e3e3e; font-size: 14px; font-weight: 500; text-align: left;}
                .btn-edit:hover, .btn-edit:focus, .btn-edit:active { box-shadow: none; transition: all 3.s }
                .btn-save { background-color: #22bb33; color: #FFF; font-size: 12px; font-weight: 500;}
                .icon-service{width:20%;}
                .package-review-flex > p { margin: 0; color: #75848E; font-size: 14px; font-weight: normal;}
                .package-details { display: flex; margin: 10px 0;}
                .package-img { margin-right: 10px; flex: 0 0 200px; border: 1px solid #F4F4F4; border-radius: 4px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);}
                .package-img > img { width: 100%; object-fit: cover; height: 95px;}
                .package-subs { background-color: #F5F6FA; padding: 10px; width: 100%; position: relative;}
                .package-subs::after { position: absolute; content: ''; bottom: 50px; left: 0; right: 0; background-color: #EAEAEA; height: 1px; width: 100%;}
                .package-subs > p { font-size: 14px; color: #515D65; font-weight: normal;  margin-bottom: 0;}
                .package-subs-2 { position: absolute; bottom: 0px; display: flex;}
                .package-subs-2 > p { font-size: 14px; color: #515D65; font-weight: normal; }
                .package-subs-2 > p:first-child { margin-right: 16px;}
                .package-subs-2 > p > span { font-weight: bold;}
                .package-icon { display: flex; align-items: center; padding: 6px;}
                .package-icon > img { margin-right: 10px;}
                .package-icon-text > h6 { font-weight: bold; font-size: 12px; color: #3E3E3E; margin-bottom: 0;}
                .package-icon-text > p{ font-weight: normal; font-size: 11px; color: #75848E; margin-bottom: 0;}
                @media screen and (max-width: 480px ){
                    .review-catergry-and-price {
                        overflow-x: scroll;padding: 0px 10px;
                    }
                    .review-catergry-and-price > div {
                        flex: 0 0 143px;
                    }
                    .button-edit-position {
                        position: relative;top: 0;left: 0;padding: 10px;
                    }
                    .sidebar-edit {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
        </Head>
    )
}

export default edit
