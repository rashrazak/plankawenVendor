import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function KugiranForm() {

    const {getServiceDetailsKugiran, addServiceDetailsKugiran} = useContext(AddServiceContext);
    const [hargaKugiran, sethargaKugiran] = useState('')
    const [nameKugiran, setnameKugiran] = useState([])


    useEffect(() =>{
        sethargaKugiran(getServiceDetailsKugiran.hargaKugiran)
        setnameKugiran(getServiceDetailsKugiran.nameKugiran)
    },[getServiceDetailsKugiran])

    
    const submitServiceDetails = () => {
        addServiceDetailsKugiran(nameKugiran ,hargaKugiran)
        Router.push(`/addservice/upload`);
    }
    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Harga Servis (RM)</h4>
                <Input className="form-custom" type="number" placeholder="" value={hargaKugiran} onChange={(e) => {sethargaKugiran(e.target.value)}} />
            </div>
            <div className="form-section">
                <h4>Nama Kugiran</h4>
                <Input className="form-custom" type="text" placeholder="" value={nameKugiran} onChange={(e) => {setnameKugiran(e.target.value)}} />
            </div>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => Router.push('/addservice/about')}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => submitServiceDetails()}>Next</Button>{' '}
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

export default KugiranForm
