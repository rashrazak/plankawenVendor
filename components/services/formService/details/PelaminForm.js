import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function PelaminForm({pagex}) {
    const jenisEventArray = [
        {jenis:'Nikah', status:false},
        {jenis:'Walimah', status:false},
        {jenis:'Outdoor', status:false},
    ];
    const {getServiceDetailsPelamin, addServiceDetailsPelamin} = useContext(AddServiceContext);
    const [harga, setharga] = useState('')
    const [jenisEvent, setjenisEvent] = useState([])
    const [hargaDiscount, sethargaDiscount] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [waktuTiba, setwaktuTiba] = useState('')
    const [jenisMaterial, setJenisMaterial] = useState('')
    const [maxDesignChanges, setmaxDesignChanges] = useState(0)


    useEffect(() =>{
        setharga(getServiceDetailsPelamin.harga)
        setjenisEvent(getServiceDetailsPelamin.jenisEvent)
        setdiscount(getServiceDetailsPelamin.discount)
        sethargaDiscount(getServiceDetailsPelamin.hargaDiscount)
        setwaktuTiba(getServiceDetailsPelamin.waktuTiba)
        setJenisMaterial(getServiceDetailsPelamin.jenisMaterial)
        setmaxDesignChanges(getServiceDetailsPelamin.maxDesignChanges)
    },[getServiceDetailsPelamin])

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
        addServiceDetailsPelamin(harga ,jenisEvent, discount, hargaDiscount, waktuTiba, jenisMaterial, maxDesignChanges)
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
                <h4>Harga(RM)</h4>
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
                <h4>Jenis Material</h4>
                <Input className="form-custom harga" type="text" onChange={(e) => {setJenisMaterial(e.target.value)}} value={jenisMaterial}/>
            </div>
            <div className="form-section">
                <h4>Max Changes Design</h4>
                <Input className="form-custom harga" type="number" onChange={(e) => {setmaxDesignChanges(e.target.value)}} value={maxDesignChanges}/>
            </div>
            <div className="form-section">
                <h4>Discount Price</h4>
                <Input className="form-custom harga" type="number" disabled value={hargaDiscount} />
            </div>
            <div className="form-section">
                <h4>Waktu Tiba</h4>
                <Input className="form-custom harga" type="text" value={waktuTiba} onChange={(e) => {setwaktuTiba(e.target.value)}} />
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

export default PelaminForm
