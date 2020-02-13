import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip } from 'reactstrap';
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
                <Input className="form-custom harga" href="#" id="tooltipHarga" type="number" onChange={(e) => {
                    sethargaDiscount(e.target.value)
                    setharga(e.target.value)}} value={harga}/>
                <UncontrolledTooltip placement="left" target="tooltipHarga">
                    Harga LumpSump termasuk kos penghantaran/pemasangan/pengemasan untuk produk disiapkan. Sebarang kos penginapan yang akan disediakan oleh Pelanggan ialah diluar servis PlanKawen
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
                <h4>Jenis Material</h4>
                <Input className="form-custom harga" href="#" id="tooltipMaterial" type="text" onChange={(e) => {setJenisMaterial(e.target.value)}} value={jenisMaterial}/>
                <UncontrolledTooltip placement="left" target="tooltipMaterial">
                    Terangkan ciri-ciri pelamin anda seperti: <br></br>
                    - Jenis bunga yang digunakan  <br></br>
                    - Pencahayaan <br></br>
                    - Jenis dekorasi
                </UncontrolledTooltip>
            </div>
            <div className="form-section">
                <h4>Perubahan maksimum rekaan?</h4>
                <Input className="form-custom harga" href="#" id="tooltipRekaan" type="number" onChange={(e) => {setmaxDesignChanges(e.target.value)}} value={maxDesignChanges}/>
                <UncontrolledTooltip placement="left" target="tooltipRekaan">
                    Tetapkan syarat untuk beberapa kali perubahan rekaan boleh dilakukan selepas pembayaran. Sekiranya tiada, boleh letakkan sebagai '0'
                </UncontrolledTooltip>
            </div>
            <div className="form-section">
                <h4>Penghantaran</h4>
                <Input className="form-custom harga" href="#" id="tooltipPenghantaran" type="text" value={waktuTiba} onChange={(e) => {setwaktuTiba(e.target.value)}} />
                <UncontrolledTooltip placement="left" target="tooltipPenghantaran">
                    Tetapkan waktu untuk pemasangan dan mengemas  barang-barang pelamin tersebut. Contoh: <br></br>
                    - Pemasangan - sehari sebelum majlis <br></br>
                    - Pengemasan - Sesudah Majlis
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

export default PelaminForm
