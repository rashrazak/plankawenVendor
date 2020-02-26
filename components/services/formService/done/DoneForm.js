import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
import '../../../../css/venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
    
function DoneForm({pagex}) {
    const {resetAddService, getReview} = useContext(AddServiceContext);

    const complete = () => {
        let x = resetAddService()
        if (x) {
            Router.push(`/dashboard`)
        }
    }

    useEffect(() => {
        var user = localStorage.getItem('user');
        var vendorDetails = localStorage.getItem('vendorDetails');
        localStorage.clear();
        localStorage.setItem('user',user);
        localStorage.setItem('vendorDetails',vendorDetails);
        console.log(getReview);
       
    }, [resetAddService])
    return (
        <div className="form-service">
            <img className="center-block" src="/images/logos/thankyou-service.png"></img>
            <h5>Congratulations!</h5>
            <p>You’ve succesfully add your new service.</p>
            <div className="form-button">
                <Button color={'warning'} className="btn-next" onClick={() => Router.push(`/dashboard`)}>Dashboard</Button>{' '}
            </div>
            <style jsx>{`
                .form-button { text-align: center; }
                .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                .form-section { margin: 20px 0; }
                h4 { text-align: center; font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                .area-covered-div { display: inline-block; margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .form-service { text-align: center;}
                h5 { color: #ED795F; font-size: 18px;}
                p { color: #3E3E3E; font-size: 18px;}
                .form-service > img { margin-bottom: 10px;}
            `}</style>
        </div>
    )
}

export default DoneForm
