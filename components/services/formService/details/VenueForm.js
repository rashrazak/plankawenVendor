import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
import '../../../../css/venueform.css'
import Autocomplete from 'react-google-autocomplete'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function VenueForm({serviceType, pagex}) {
    const {getServiceDetailsVenue, addServiceDetailsVenue} = useContext(AddServiceContext);
    const [hargaSewa, sethargaSewa] = useState(0);
    const [lokasi, setlokasi] = useState({});
    const [alamatPenuh, setalamatPenuh] = useState('')
    const [waktuOperasi, setwaktuOperasi] = useState('');
    const [lat, setlat] = useState(0);
    const [lng, setlng] = useState(0);

    useEffect(() =>{
        sethargaSewa(() => {
            let harg = getServiceDetailsVenue.hargaSewa
            console.log(harg)
            document.querySelector('.harga').value = harg;
            return harg
        })
        setlokasi(getServiceDetailsVenue.lokasi)
        setwaktuOperasi(getServiceDetailsVenue.waktuOperasi)
        setalamatPenuh(() => {
            let al = getServiceDetailsVenue.alamatPenuh
            document.querySelector('.auto').value = al;
            return al;
        })
        console.log(getServiceDetailsVenue.lokasi)
    },[getServiceDetailsVenue])

    useEffect(() => {
       console.log(alamatPenuh)
    }, [alamatPenuh])

    const submitServiceDetails = () => {
        addServiceDetailsVenue(hargaSewa , lokasi, waktuOperasi, alamatPenuh)
        Router.push(`/${pagex}/upload`);
    }

    const addAlamat = () => {
       let x = document.querySelector('.auto').value;
       setalamatPenuh(x)
    }
    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Harga Sewa (RM)</h4>
                <Input className="form-custom harga" type="number" onChange={(e) => {sethargaSewa(e.target.value)}} />
            </div>
            <div className="form-section">
                <h4>Nama Lokasi</h4>
                {/* <Input className="form-custom" type="text" placeholder="Nyatakan Lokasi Anda" value={lokasi} onChange={(e) => {setlokasi(e.target.value)}} /> */}
                <Autocomplete
                    className="auto"
                    style={{width: '100%', borderRadius:'4px', fontWeight:'400', fontSize:'14px', color:'#3e3e3e', padding: '.375rem .75rem', border: '1px solid #ced4da'}}
                    onPlaceSelected={(place) => {
                        setlokasi(place)
                    }}
                    types={[]}
                    componentRestrictions={{country: "my"}}
                />
            </div>
            <div className="form-section">
                <h4>Waktu Operasi</h4>
                <Input className="form-custom" onFocus={() => addAlamat()} type="textarea" placeholder="Nyatakan Waktu Operasi Lokasi" value={waktuOperasi} onChange={(e) => {setwaktuOperasi(e.target.value)}} />
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

export default VenueForm
