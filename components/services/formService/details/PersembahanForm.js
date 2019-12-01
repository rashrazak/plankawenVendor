import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function PersembahanForm({pagex}) {

    const {getServiceDetailsPersembahan, addServiceDetailsPersembahan} = useContext(AddServiceContext);
    const [harga, setharga] = useState(0)
    const [namaPersembahan, setnamaPersembahan] = useState('')
    const [hargaDiscount, sethargaDiscount] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [kaliPersembahan, setkaliPersembahan] = useState(0)


    useEffect(() =>{
        setharga(getServiceDetailsPersembahan.harga)
        setnamaPersembahan(getServiceDetailsPersembahan.namaPersembahan)
        setdiscount(getServiceDetailsPersembahan.discount)
        sethargaDiscount(getServiceDetailsPersembahan.hargaDiscount)
        setkaliPersembahan(getServiceDetailsPersembahan.kaliPersembahan)
    },[getServiceDetailsPersembahan])

    
    const submitServiceDetails = () => {
        addServiceDetailsPersembahan(harga, discount, hargaDiscount, kaliPersembahan, namaPersembahan)
        Router.push(`/${pagex}/upload`);
    }
    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Harga Servis LumpSump (RM)</h4>
                <Input className="form-custom harga" type="number" onChange={(e) => {setharga(e.target.value)}} value={harga}/>
            </div>
            <div className="form-section">
                <h4>Discount</h4>
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
                <h4>Discount Price</h4>
                <Input className="form-custom harga" type="number" disabled value={hargaDiscount} />
            </div>
            <div className="form-section">
                <h4>Nama Persembahan / Kumpulan</h4>
                <Input className="form-custom" type="text" placeholder="" value={namaPersembahan} onChange={(e) => {setnamaPersembahan(e.target.value)}} />
            </div>
            <div className="form-section">
                <h4>Bil. Persembahan</h4>
                <Input className="form-custom" href="#" id="tooltipTiba" type="number" placeholder="" value={kaliPersembahan} onChange={(e) => {setkaliPersembahan(e.target.value)}} />
                <UncontrolledTooltip placement="left" target="tooltipTiba">
                    Terangkan berapa bilangan persembahan yang akan dipertontonkan semasa majlis berlangsung. contoh;<br></br>
                    - Kompang - 2(Pengantin masuk & selepas doa) <br></br>
                    - Kugiran - 10 (Lagu yang akan dinyanyikan semasa majlis)
                </UncontrolledTooltip>
            </div>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => Router.push(`/${pagex}/about`)}>Back</Button>{' '}
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

export default PersembahanForm
