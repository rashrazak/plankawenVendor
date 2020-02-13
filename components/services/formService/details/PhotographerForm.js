import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function PhotographerForm({pagex}) {
    const jenisEventArray = [
        {jenis:'Nikah', status:false},
        {jenis:'Walimah', status:false},
        {jenis:'Outdoor', status:false},
    ];
    const {getServiceDetailsPhotographer, addServiceDetailsPhotographer} = useContext(AddServiceContext);
    const [harga, setharga] = useState('')
    const [jenisEvent, setjenisEvent] = useState([])
    const [hargaDiscount, sethargaDiscount] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [waktuTiba, setwaktuTiba] = useState('');


    useEffect(() =>{
        setharga(getServiceDetailsPhotographer.harga)
        setjenisEvent(getServiceDetailsPhotographer.jenisEvent)
        setdiscount(getServiceDetailsPhotographer.discount)
        sethargaDiscount(getServiceDetailsPhotographer.hargaDiscount)
        setwaktuTiba(getServiceDetailsPhotographer.setwaktuTiba)
    },[getServiceDetailsPhotographer])

    const handleChangeJenis = (e) => {
        Swal.showLoading()
        let name = e.target.name;
        let check = e.target.checked;
        let x = jenisEvent;
        if (check) {
            setjenisEvent(old =>[...old, name])
        }else{
            let index = jenisEvent.indexOf(name);
            x.splice(index,1);
            setjenisEvent([...x]);
        }
        Swal.close()
    }


    const submitServiceDetails = () => {
        addServiceDetailsPhotographer(harga ,jenisEvent, discount, hargaDiscount, waktuTiba)
        Router.push(`/${pagex}/upload`);
    }
    return (
        <div className="form-service">
        <div className="form-section">
                <h4>Jenis Event</h4>
                {jenisEventArray.map( (cty, index) =>{
                    let jen = cty.jenis;
                    let chckd  = false;
                    if (jenisEvent != null) {
                        chckd = jenisEvent.includes(jen) ? true : false;
                    }
                    
                    return(
                        
                            <div key={index} className="area-covered-div">
                                <label>
                                    <input type="checkbox"
                                        name={jen} 
                                        checked={chckd}
                                        onChange={(e) => handleChangeJenis(e)}
                                    />
                                    {jen}
                                </label>
                            </div>
                            
                    )
                } )}
            </div>
            <div className="form-section">
                <h4>Harga (RM)</h4>
                <Input className="form-custom harga" href="#" id="tooltipHarga" type="number" onChange={(e) => {
                    sethargaDiscount(e.target.value)
                    setharga(e.target.value)}} value={harga}/>
                <UncontrolledTooltip placement="left" target="tooltipHarga">
                    Harga LumpSump termasuk kos photobook/album/ dan juga caj penghantaran yang akan disediakan oleh Pelanggan ialah diluar servis  PlanKawen
                </UncontrolledTooltip>
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
                <Input className="form-custom harga" href="#" id="tooltipTiba" type="text" value={waktuTiba} onChange={(e) => {setwaktuTiba(e.target.value)}} />
                <UncontrolledTooltip placement="left" target="tooltipTiba">
                    Terangkan waktu ketibaan anda sebelum Majlis dan bila Gambar/Photobook akan siap untuk penghantaran kepada pelanggan
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

export default PhotographerForm
