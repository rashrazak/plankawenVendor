import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
import '../../../../css/venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
import LoginContext from '../../../../contexts/LoginContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function AboutForm({pagex}) {
    const {getReview, createAddService, updateAddService} = useContext(AddServiceContext);
    const {getVendorDetails} = useContext(LoginContext);

    const submitReview = () => {
        pagex == 'addservice' ? createAddService(pagex) : updateAddService(pagex) ;
    }

    useEffect(() => {
        console.log(getVendorDetails)
       
    }, [getVendorDetails])
    return (
        <div className="review-form">
            <div className="hero-review">
                    <img src="/static/images/placeholder/placeholder-review-master.png"/>
                <div className="hero-son-review">
                    <img src="/static/images/placeholder/placeholder-review-master.png"/>
                    <img src="/static/images/placeholder/placeholder-review-master.png"/>
                    <img src="/static/images/placeholder/placeholder-review-master.png"/>
                    <img src="/static/images/placeholder/placeholder-review-master.png"/>
                </div>
            </div>
            <div className="review-catergry-and-price">
                <div className="review-category">
                    <p><span><img src="/static/images/icon/ico-venue-white.png"/></span> Venue</p>
                </div>
                <div className="review-price">
                    <img src="/static/images/icon/ico-dollar.png"/>
                    <p><span>MYR</span> <br></br> 5,500</p>
                </div>
            </div>
            <div className="review-name-and-places">
                <h4>Dewan Serbaguna Section 9, Shah Alam</h4>
                <p><span><img src="/static/images/icon/ico-location.png"/></span>Section 9, Shah Alam</p>
            </div>
            <div className="review-desc">
                <p>Why read motivational sayings? For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.</p>
            </div>
            <div className="review-user">
                <div className="review-user-image-and-det">
                    <div className="review-user-image">
                        <img src="/static/images/placeholder/placeholder-rara.jpg"/>
                    </div>
                    <div className="review-user-image-det">
                        <p>Provided by</p>
                        <p>Tom John!</p>
                        <p>Verified</p>
                    </div>
                </div>
                <div className="">
                    <p>Kami menyediakan dewan dan beberapa pakej lain yang menarik. Sesuai untuk anda yang mempunyai budget yang limited  beserta pilihan barangan yang pelbagai.</p>
                </div>
            </div>
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
