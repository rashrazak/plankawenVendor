import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
import Autocomplete from 'react-google-autocomplete'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function WeddingDressForm({serviceType, pagex}) {
    const {getServiceDetailsWeddingDress, addServiceDetailsWeddingDress} = useContext(AddServiceContext);
    const [hargaSewa, sethargaSewa] = useState('');
    const [lokasi, setlokasi] = useState('');
    const [syaratSewaan, setsyaratSewaan] = useState('');
    const [lat, setlat] = useState(0);
    const [lng, setlng] = useState(0);

    useEffect(() =>{
        sethargaSewa(getServiceDetailsWeddingDress.hargaSewa)
        setlokasi(getServiceDetailsWeddingDress.lokasi)
        setsyaratSewaan(getServiceDetailsWeddingDress.syaratSewaan)
        // setlat(getServiceDetailsWeddingDress.lat)
        // setlng(getServiceDetailsWeddingDress.lng)
    },[getServiceDetailsWeddingDress])


    const submitServiceDetails = () => {
        addServiceDetailsWeddingDress(hargaSewa , lokasi, syaratSewaan)
        Router.push(`/${pagex}/upload`);
    }
    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Harga Sewa (RM)</h4>
                <Input className="form-custom" type="number" placeholder="" value={hargaSewa} onChange={(e) => {sethargaSewa(e.target.value)}} />
            </div>
            <div className="form-section">
                <h4>Lokasi Butik (tak boleh letak className)</h4>
                <Autocomplete
                    style={{width: '100%', borderRadius:'4px', fontWeight:'400', fontSize:'14px', color:'#3e3e3e', }}
                    onPlaceSelected={(place) => {
                    setlokasi(place)
                    }}
                    types={[]}
                    componentRestrictions={{country: "my"}}
                />
            </div>
            <div className="form-section">
                <h4>Syarat Sewaan Baju </h4>
                {/* by default waktu operasi */}
                <Input className="form-custom" type="textarea" placeholder="Nyatakan Syarat Sewaan Baju" value={syaratSewaan} onChange={(e) => {setsyaratSewaan(e.target.value)}} />
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

export default WeddingDressForm
