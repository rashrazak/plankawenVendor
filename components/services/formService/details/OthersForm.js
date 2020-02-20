import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function OthersForm({pagex, setModalEdit,editModal}) {

    const {getServiceDetailsOthers, addServiceDetailsOthers} = useContext(AddServiceContext);
    const [harga, setharga] = useState(0)
    const [hargaDiscount, sethargaDiscount] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [waktuTiba, setwaktuTiba] = useState('');


    useEffect(() =>{
        setharga(getServiceDetailsOthers.harga)
        // setjenisEvent(getServiceDetailsOthers.jenisEvent)
        setdiscount(getServiceDetailsOthers.discount)
        sethargaDiscount(getServiceDetailsOthers.hargaDiscount)
        setwaktuTiba(getServiceDetailsOthers.waktuTiba)
    },[getServiceDetailsOthers])

    const handleChangeJenis = (e) => {
        Swal.showLoading()
        let name = e.target.name;
        let check = e.target.checked;
        let x = jenisEvent;
        
        Swal.close()
    }


    const submitServiceDetails = () => {
        addServiceDetailsOthers(harga, discount, hargaDiscount, waktuTiba)
        Router.push(`/${pagex}/upload`);
    }

    const submitServiceDetails2 = () => {
        addServiceDetailsOthers(harga, discount, hargaDiscount, waktuTiba)
        setModalEdit(false)
    }
    return (
        <div className="form-service">
           
            <div className="form-section">
                <h4>Harga Servis LumpSump (RM)</h4>
                <Input className="form-custom harga" type="number" onChange={(e) => {
                    sethargaDiscount(e.target.value)
                    setharga(e.target.value)}} value={harga}/>
            </div>
            <div className="form-section">
                <h4>Diskaun (%)</h4>
                <Input className="form-custom harga" type="number" onChange={(e) => {
                    let x = e.target.value;
                    let har = harga;
                    x = x / 100;
                    har = har - (har * x);
                    sethargaDiscount(har);
                    setdiscount(e.target.value)
                    }} value={discount} 
                />
            </div>
            <div className="form-section">
                <h4>Harga selepas Diskaun (RM)</h4>
                <Input className="form-custom harga" type="number" disabled value={hargaDiscount} />
            </div>
            <div className="form-section">
                <h4>Waktu Ketibaan & Penghantaran</h4>
                <Input className="form-custom harga" href="#" id="tooltipTiba" onChange={(e) => {setwaktuTiba(e.target.value)}} value={waktuTiba} />
                <UncontrolledTooltip placement="left" target="tooltipTiba">
                    Terangkan waktu ketibaan anda semasa Majlis berlangsung dan waktu berkemas sesudah majlis
                </UncontrolledTooltip>
            </div>
            {
                !editModal ? 
                <div className="form-button">
                    <Button  className="btn-cancel" onClick={() => Router.push(`/${pagex}/about`)}>Back</Button>{' '}
                    <Button  className="btn-next" onClick={() => submitServiceDetails()}>Next</Button>{' '}
                </div>
                :
                <div className="form-button">
                    <Button  className="btn-cancel" onClick={() => setModalEdit(false)}>Cancel</Button>{' '}
                    <Button  className="btn-next" onClick={() => submitServiceDetails2()}>Confirm</Button>{' '}
                </div>

            }
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

export default OthersForm
