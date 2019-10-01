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
        <div className="form-service">
            
            <div className="form-button">
            <Button  className="btn-cancel" onClick={() => Router.push(`/${pagex}/upload`)}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => submitReview()}>Next</Button>{' '}
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
            `}</style>
        </div>
    )
}

export default AboutForm
