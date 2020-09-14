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

    const {editPackage, setImages, setEditPackage} = useContext(PackageContext);
    const {getVendorDetails} = useContext(LoginContext);

    const serviceIcon = { Venue: 'ico-venue-active.png', 
    Canopy: 'ico-canopy-active.png', 
    KadBanner: 'ico-cards-active.png',
    WeddingDress: 'ico-dress-active.png',
    Makeup: 'ico-makeup-active.png',
    Photographer: 'ico-photography-active.png', 
    Videographer: 'ico-videography-active.png',
    Pelamin: 'ico-pelamin-active.png', 
    Caterer: 'ico-catering-active.png',
    Hantaran: 'ico-hantaran-active.png',
    Persembahan: 'ico-performance-active.png',
    DoorGift: 'ico-goodiebag-active.png',
    Others: 'ico-others-active.png'}

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
                            <p><span>MYR (Harga Asal)</span> <br></br>{editPackage.originalPrice}</p>
                        </div>
                        <div className="review-price">
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
                        </div>
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

                <h5>Servis Pilihan</h5>

                {
                    editPackage && editPackage.selectServices.map((v,i)=>{
                        return (
                            <div key={i} style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'justify-between', marginBottom: '6px'}}>
                                <div className="package-review-flex" style={{width: '100%'}}>
                                
                                    <p style={{marginBottom: 0}}>Nama Servis: {v.serviceName}</p>
                                    <p>Jenis Servis: {v.serviceType}</p>
                                    <p>Desription: {v.description}</p>
                                    {
                                        v.serviceType == 'Makeup'?
                                            <>
                                                <p>Harga Touchup: {v.serviceDetails.hargaTouchup}</p>
                                                <p>Harga Full: {v.serviceDetails.hargaFull}</p>
                                            </>
                                            
                                        : v.serviceType == 'KadBanner'?
                                            <>
                                                <p>Harga Kad: {v.serviceDetails.hargaPerPerson} X {v.quantity}</p>
                                                {
                                                    v.serviceDetails.banner == true ?
                                                        <div>
                                                            <p>Description: {v.serviceDetails.bannerDesc.description}</p>
                                                            {
                                                                kadbanner.serviceDetails.bannerDesc.bannerSize.map((val, index)=>{
                                                                    return(
                                                                        <>
                                                                            <p>Harga:{val.harga}</p>
                                                                            <p>Size:{val.size}</p>
                                                                        </>
                                                                        
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        
                                                    :''
                                                }
                                            </>
                                                

                                        :v.serviceType == 'Hantaran' || v.serviceType == 'Caterer' || v.serviceType == 'DoorGift'?
                                            <>
                                                <p>Harga {v.serviceType}: {v.serviceDetails.hargaPerPerson} X {v.quantity}</p>
                                                
                                            </>
                                        :v.serviceType == 'Photographer' || v.serviceType == 'Videographer' || v.serviceType == 'WeddingDress' || v.serviceType == 'Pelamin' || v.serviceType == 'Others'?
                                            <>
                                                <p>Harga {v.serviceType}: {v.serviceDetails.harga} </p>
                                                
                                            </>
                                            
                                        :''
                                    }
                                </div>
                                <img style={{width: '30%', height: '100px', objectFit: 'cover'}} src={v.images[0].urlStorage} />
                            </div>
                        )
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
                .review-desc { background-color: #F5F6FA; padding: 20px; margin-bottom: 22px; border-radius: 4px;}
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
