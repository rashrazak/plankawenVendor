import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip } from 'reactstrap';
import Router from 'next/router';
import '../../../../css/venueform.css'
import Autocomplete from 'react-google-autocomplete'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
    
function VenueForm({serviceType, pagex, setModalEdit,editModal}) {
    const {getServiceDetailsVenue, addServiceDetailsVenue} = useContext(AddServiceContext);
    const [harga, setharga] = useState(0);
    const [hargaDiscount, sethargaDiscount] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [lokasi, setlokasi] = useState({});
    const [alamatPenuh, setalamatPenuh] = useState('')
    const [waktuOperasi, setwaktuOperasi] = useState('');

    useEffect(() =>{
        setharga(() => {
            let harg = getServiceDetailsVenue.harga
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
        setdiscount(getServiceDetailsVenue.discount)
        sethargaDiscount(getServiceDetailsVenue.hargaDiscount)
        console.log(getServiceDetailsVenue)
    },[getServiceDetailsVenue])

    useEffect(() => {
       console.log(alamatPenuh)
    }, [alamatPenuh])

    const submitServiceDetails = () => {
        addServiceDetailsVenue(harga , lokasi, waktuOperasi, alamatPenuh, discount, hargaDiscount)
        Router.push(`/${pagex}/upload`);
    }

    const submitServiceDetails2 = () => {
        addServiceDetailsVenue(harga , lokasi, waktuOperasi, alamatPenuh, discount, hargaDiscount)
        setModalEdit(false)
    }

    const addAlamat = () => {
       let x = document.querySelector('.auto').value;
       setalamatPenuh(x)
    }

    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Harga (RM)</h4>
                <Input className="form-custom harga" href="#" id="UncontrolledTooltipExample" type="number" onChange={(e) => {
                    sethargaDiscount(e.target.value)
                    setharga(e.target.value)}} value={harga}/>
                <UncontrolledTooltip placement="left" target="UncontrolledTooltipExample">
                    Harga Lumpsump termasuk penginapan  (sekiranya ada). Jika anda turut menyediakan servic katering dan lain-lain, anda boleh sekalikan produk/servis anda yang lain dalam ruangan 'Pakej' dan menetapkan harga mengikut pakej anda
                </UncontrolledTooltip>
            </div>
            <div className="form-section">
                <h4>Diskaun (%)</h4>
                <Input className="form-custom harga" type="number" value={discount} onChange={(e) => {
                    let x = e.target.value;
                    let har = harga;
                    x = x / 100;
                    har = har - (har * x);
                    sethargaDiscount(har);
                    setdiscount(e.target.value)
                }}
                />
            </div>
            <div className="form-section">
                <h4>Harga selepas Diskaun (RM)</h4>
                <Input className="form-custom harga" type="number" disabled value={hargaDiscount} />
            </div>
            <div className="form-section">
                <h4>Nama Lokasi</h4>
                <Autocomplete
                    className="auto"
                    placeholder="Isikan lokasi anda"
                    style={{width: '100%', borderRadius:'4px', fontWeight:'400', fontSize:'14px', color:'#3e3e3e', padding: '.375rem .75rem', border: '1px solid #ced4da'}}
                    onPlaceSelected={(place) => {
                        console.log(place)
                        setlokasi(place)
                    }}
                    types={[]}
                    componentRestrictions={{country: "my"}}
                />
            </div>
            <div className="form-section">
                <h4>Terma / Syarat</h4>
                <Input className="form-custom" href="#" id="tooltipTerma" onFocus={() => addAlamat()} type="textarea" placeholder="Nyatakan Waktu Operasi Lokasi" value={waktuOperasi} onChange={(e) => {setwaktuOperasi(e.target.value)}} />
                <UncontrolledTooltip placement="left" target="tooltipTerma">
                    Tetapkan sebarang syarat yang dikenakan ke atas dewan/lokasi tersebut seperti; waktu operasi, lokasi parkir, jumlah tetamu maksimum dan sebagainya
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

export default VenueForm
