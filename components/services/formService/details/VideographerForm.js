import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function VideographerForm({pagex}) {
    const jenisEventArray = [
        {jenis:'Nikah', status:false},
        {jenis:'Walimah', status:false},
        {jenis:'Outdoor', status:false},
    ];
    const {getServiceDetailsVideographer, addServiceDetailsVideographer} = useContext(AddServiceContext);
    const [harga, setharga] = useState('')
    const [jenisEvent, setjenisEvent] = useState([])


    useEffect(() =>{
        setharga(getServiceDetailsVideographer.harga)
        setjenisEvent(getServiceDetailsVideographer.jenisEvent)
    },[getServiceDetailsVideographer])

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
        addServiceDetailsVideographer(harga ,jenisEvent)
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
                <h4>Harga Servis (RM)</h4>
                <Input className="form-custom" type="number" placeholder="" value={harga} onChange={(e) => {setharga(e.target.value)}} />
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

export default VideographerForm