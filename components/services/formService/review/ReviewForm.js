import React, {useContext, useState, useEffect} from 'react'
import { Button } from 'reactstrap';
import Router from 'next/router';
import '../../../../css/venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
import LoginContext from '../../../../contexts/LoginContext'
import Swal from 'sweetalert2'


    
function AboutForm({pagex}) {
    const {getReview, createAddService, updateAddService} = useContext(AddServiceContext);
    const {getVendorDetails} = useContext(LoginContext);

    const [coverImage, setcoverImage] = useState('')
    const [images, setimages] = useState([])
    const [serviceType, setserviceType] = useState('')
    const [details, setdetails] = useState([])
    const [about, setabout] = useState([])
    const [vendorDetails, setvendorDetails] = useState([])

    useEffect(() => {
        let images = getReview.addServiceUpload.images;
        if (images.length > 0) {
            setcoverImage(images[0]);
            setimages(images);
        }
       
        let x   = getReview.addServiceAbout.serviceType;
        setserviceType(x);
        let s   = 'addServiceDetails'+x;
        
        let details = getReview[s];
        setdetails(details);
        console.log(details)

        let about = getReview.addServiceAbout
        setabout(about)
    }, [getReview])

    const submitReview = () => {
        pagex == 'addservice' ? createAddService(pagex) : updateAddService(pagex) ;
    }

    useEffect(() => {
        setvendorDetails(getVendorDetails)
    }, [getVendorDetails])
    return (
        <div className="review-form">
            {
                images && coverImage ? 
                    <div className="hero-review">
                            <img src={coverImage.base64}/>
                        <div className="hero-son-review">
                            {images.map((v,i) => {
                                return (<img key={i} onClick={() =>setcoverImage(v)} src={v.base64}/>)
                            })}
                        </div>
                    </div>
                :
                    <div className="hero-review">
                            <img src="/static/images/logos/unavailable.png"/>
                        <div className="hero-son-review">
                            <img src="/static/images/logos/unavailable.png"/>
                            <img src="/static/images/logos/unavailable.png"/>
                            <img src="/static/images/logos/unavailable.png"/>
                            <img src="/static/images/logos/unavailable.png"/>
                        </div>
                    </div>

            }
            
            <div className="review-catergry-and-price">
                <div className="review-category">
                    <p><span><img src="/static/images/icon/ico-venue-white.png"/></span>{serviceType}</p>
                </div>
                {
                    (serviceType == 'KadBanner' || serviceType == 'Caterer' || serviceType == 'DoorGift' || serviceType == 'Hantaran')
                    ? 
                        <React.Fragment>
                            <div className="review-price">
                                <img src="/static/images/icon/ico-dollar.png"/>
                                <p><span>MYR (Harga Pax)</span> <br></br>{details.hargaPerPerson}</p>
                            </div>
                        </React.Fragment>
                    : serviceType == 'Makeup'
                    ?
                        <React.Fragment>
                            <div className="review-price">
                                <p><span>MYR (Touchup)</span> <br></br>{details.hargaTouchup}</p>
                                <p><span>MYR (Diskaun)</span> <br></br>{details.hargaDiscountTouchup}</p>
                                <p><span>% (Diskaun)</span> <br></br>{details.discountTouchup}</p>
                            </div>
                            <div className="review-price">
                                <p><span>MYR (Full)</span> <br></br>{details.hargaFull}</p>
                                <p><span>MYR (Diskaun)</span> <br></br>{details.hargaDiscountFull}</p>
                                <p><span>% (Diskaun)</span> <br></br>{details.discountFull}</p>
                            </div>
                        </React.Fragment>
                    : 
                        <React.Fragment>
                            <div className="review-price">
                                <img src="/static/images/icon/ico-dollar.png"/>
                                <p><span>MYR (Harga Asal)</span> <br></br>{details.harga}</p>
                            </div>
                            <div className="review-price">
                                <img src="/static/images/icon/ico-dollar.png"/>
                                <p><span>MYR (Harga Disk)</span> <br></br>{details.hargaDiscount}</p>
                            </div>
                            <div className="review-price">
                                <img src="/static/images/icon/ico-dollar.png"/>
                                <p><span>% (Diskaun)</span> <br></br>{details.discount}</p>
                            </div>
                        </React.Fragment>

                }
                
            </div>
            {
                ( serviceType == 'WeddingDress' || serviceType == 'Venue') ?
                    <div className="review-name-and-places">
                        <h4> {about.serviceName}</h4>
                        <p><span><img src="/static/images/icon/ico-location.png"/></span>{details.alamatPenuh}</p>
                    </div>
                :
                    <div className="review-name-and-places">
                        <h4>Service Name {about.serviceName}</h4>
                    </div>
            }
            
            <div className="review-desc">
                {serviceType == "WeddingDress" ?
                    <React.Fragment>
                        <p>Jenis Baju</p>
                        <ul>
                            {
                                details.jenisSewa.map((v,i) => {
                                    return(
                                        <li key={i}>{v}</li>
                                    )
                                })
                            }
                        </ul>
                    </React.Fragment>
                    : serviceType == 'Videographer' || serviceType == 'Photographer' || serviceType == 'Pelamin' || serviceType == 'Others' ? 
                    <React.Fragment>
                        <p>Jenis Kenduri/Event</p>
                        <ul>
                            {
                                details.jenisEvent.map((v,i) => {
                                    return(
                                        <li key={i}>{v}</li>
                                    )
                                })
                            }
                        </ul>
                    </React.Fragment>
                    : serviceType == 'KadBanner' || serviceType == 'Caterer' || serviceType == 'DoorGift' || serviceType == 'Hantaran' ?
                    <React.Fragment>
                        <p>Bayaran Majlis</p>
                        <ul>
                            <li>Harga Pax: {details.hargaPerPerson}</li>
                            {
                                details.discount.map((v,i) => {
                                    return(
                                        <li key={i}>Minimum:{v.min} Maximum:{v.max} Discount:{v.discount}</li>
                                    )
                                })
                            }
                        </ul>
                        {
                            serviceType == 'KadBanner' && details.banner == true ?
                                <React.Fragment>
                                    <p>Butiran Banner</p>
                                    <p>{details.bannerDesc.description}</p>
                                    {
                                        details.bannerDesc.bannerSize.map((v,i) => {
                                            return(
                                                <li key={i}>Harga:{v.harga} <br/> Size:{v.size}</li>
                                            )
                                        })
                                    }        
                                </React.Fragment>
                            : serviceType == 'Caterer' ?
                                <React.Fragment>
                                    <p>Senarai Lauk</p>
                                    {
                                        details.senaraiLauk.map((v,i) => {
                                            return(
                                                <li key={i}>{v}</li>
                                            )
                                        })
                                    }   
                                </React.Fragment>
                                : ''
                        }
                    </React.Fragment>
                    : serviceType == 'Others' || serviceType == 'Pelamin' || serviceType == 'DoorGift' || serviceType == 'Hantaran'|| serviceType == 'Videographer'|| serviceType == 'Photographer' ?
                    <React.Fragment>
                        <p>Waktu Tiba</p>
                        <p>details.waktuTiba</p>
                    </React.Fragment>
                    : serviceType == 'WeddingDress' || serviceType == 'Pelamin' || serviceType == 'DoorGift' || serviceType == 'Hantaran' ?
                    <React.Fragment>
                        <p>Perubahan Design Berapa Kali</p>
                        <p>{details.maxDesignChanges}</p>
                    </React.Fragment>
                    : serviceType == 'WeddingDress' || serviceType == 'DoorGift' || serviceType == 'Hantaran' ?
                    <React.Fragment>
                        <React.Fragment>
                                    <p>Kaedah Hantar</p>
                                    {
                                        details.jenisHantar.map((v,i) => {
                                            return(
                                                <li key={i}>{v}</li>
                                            )
                                        })
                                    }   
                        </React.Fragment>
                              
                    </React.Fragment>
                    : serviceType == 'Caterer' ?
                    <React.Fragment>
                        <p>Berapa Kali Tukar Menu</p>
                        <p>details.changeMenu</p>
                        <p>Berapa Kali Tukar Venue</p>
                        <p>details.changeVenue</p>
                    </React.Fragment>
                    :
                    
                    ''
                }
                <p>Description:</p>
                <p>{about.description}</p>

                <p>Terms And Condition:</p>
                <p>{about.tnc}</p>

                <p>Extra:</p>
                <p>{about.extra}</p>
            </div>
            {/* <div className="review-user">
                <div className="review-user-image-and-det">
                    <div className="review-user-image">
                        <img src="/static/images/placeholder/placeholder-rara.jpg"/>
                    </div>
                    <div className="review-user-image-det">
                        <p>Provided by</p>
                        <p>{vendorDetails.namaPemilik}</p>
                        <p>{about.status}</p>
                    </div>
                </div>
            </div> */}
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => Router.push(`/${pagex}/upload`)}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => submitReview()}>Next</Button>{' '}
            </div>
            <style jsx>{`
                .review-form { max-width: 670px; margin: 30px auto;}
                .hero-review { position: relative;}
                .hero-review > img { object-fit: cover; width: 100%;}
                .hero-son-review { position: absolute; bottom: 15px; left: 15px; display: flex; }
                .hero-son-review > img { width: 40px; height: 40px; object-fit: cover;  border: 2px solid #FFF; border-radius: 4px; margin-right: 6px; cursor: pointer;}
                .form-button { max-width: 490px; margin: auto; display: flex; justify-content: space-between; }
                .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                .form-section { margin: 20px 0; }
                h4 { font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                .area-covered-div { display: inline-block; margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .review-catergry-and-price { display: flex; justify-content: flex-start; margin: 13px 0px 18px 0px;}
                .review-category { background-color: #ED795F; color: #FFF; padding: 20px; border-radius: 5px; width: 143px; margin-right: 10px;}
                .review-category > p { font-size: 12px; color: #FFF; margin: 0;}
                .review-price { padding: 0 20px; display: flex; justify-content: space-between; align-items: center; border-radius: 5px; width: 143px; border: 1px solid #EAEAEA;}
                .review-price > p { font-size: 14px; color: #3E3E3E;}
                .review-price > p > span { color: #59D0C9; font-size: 10px;}
                .review-name-and-places > h4 { font-size: 18px; color: #3E3E3E;}
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

            `}</style>
        </div>
    )
}

export default AboutForm
