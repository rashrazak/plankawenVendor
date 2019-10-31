import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
import Autocomplete from 'react-google-autocomplete'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function WeddingDressForm({pagex}) {
    const jenisSewaArray = [
        {jenis:'Lelaki', status:false},
        {jenis:'Wanita', status:false},
        {jenis:'Pasangan', status:false},
    ];
   
    const {getServiceDetailsWeddingDress, addServiceDetailsWeddingDress} = useContext(AddServiceContext);
    const [harga, setharga] = useState('');
    const [lokasi, setlokasi] = useState('');
    const [syaratSewaan, setsyaratSewaan] = useState('');
    const [jenisSewa, setjenisSewa] = useState([])
    const [hargaDiscount, sethargaDiscount] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [alamatPenuh, setalamatPenuh] = useState('')
    const [jenisMaterial, setJenisMaterial] = useState('')
    const [maxDesignChanges, setmaxDesignChanges] = useState(0)
    const [jenisHantar, setjenisHantar] = useState('')

    useEffect(() =>{
        setharga(getServiceDetailsWeddingDress.harga)
        setlokasi(getServiceDetailsWeddingDress.lokasi)
        setsyaratSewaan(getServiceDetailsWeddingDress.syaratSewaan)
        setdiscount(getServiceDetailsWeddingDress.discount)
        sethargaDiscount(getServiceDetailsWeddingDress.hargaDiscount)
        setjenisSewa(getServiceDetailsWeddingDress.jenisSewa)
        setJenisMaterial(getServiceDetailsWeddingDress.jenisMaterial)
        setmaxDesignChanges(getServiceDetailsWeddingDress.maxDesignChanges)
        setjenisHantar(getServiceDetailsWeddingDress.jenisHantar)

        setalamatPenuh(() => {
            let al = getServiceDetailsWeddingDress.alamatPenuh
            document.querySelector('.auto').value = al;
            return al;
        })
    },[getServiceDetailsWeddingDress])

    const handleChangeJenis = (e) => {
        Swal.showLoading()
        let name = e.target.name;
        let check = e.target.checked;
        let x = jenisSewa;
        if (check) {
            setjenisSewa(old =>[...old, name])
        }else{
            let index = jenisSewa.indexOf(name);
            x.splice(index,1);
            setjenisSewa([...x]);
        }
        Swal.close()
    }

    const addAlamat = () => {
        let x = document.querySelector('.auto').value;
        setalamatPenuh(x)
     }

    const submitServiceDetails = () => {
        addServiceDetailsWeddingDress(harga , lokasi, alamatPenuh, syaratSewaan, jenisSewa, discount, hargaDiscount, jenisMaterial, maxDesignChanges, jenisHantar)
        Router.push(`/${pagex}/upload`);
    }
    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Jenis Sewa</h4>
                {jenisSewaArray.map( (cty, index) =>{
                    let jen = cty.jenis;
                    let chckd  = false;
                    if (jenisSewa != null) {
                        chckd = jenisSewa.includes(jen) ? true : false;
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
                <h4>Jenis Material</h4>
                <Input className="form-custom harga" type="text" onChange={(e) => {setJenisMaterial(e.target.value)}} value={jenisMaterial}/>
            </div><div className="form-section">
                <h4>Max Changes Design</h4>
                <Input className="form-custom harga" type="number" onChange={(e) => {setmaxDesignChanges(e.target.value)}} value={maxDesignChanges}/>
            </div>
            <div className="form-section">
                <h4>Harga Sewa (RM)</h4>
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
                <h4>Jenis Hantar</h4>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="jenisHantar" value="postage"  checked={jenisHantar == 'postage' ? true : false} onChange={(e) => setjenisHantar(e.target.value)} />
                        Postage
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="jenisHantar" value="self-pickup" checked={ jenisHantar == 'self-pickup' ? true : false} onChange={(e) => setjenisHantar(e.target.value)} />
                        Self Pickup
                    </Label>
                </FormGroup>
            </div>
            <div className="form-section">
                <h4>Lokasi Butik (tak boleh letak className)</h4>
                <Autocomplete className="auto"
                    style={{width: '100%', borderRadius:'4px', fontWeight:'400', fontSize:'14px', color:'#3e3e3e', padding: '.375rem .75rem', border: '1px solid #ced4da'}}
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
                <Input className="form-custom" onFocus={() => addAlamat()} type="textarea" placeholder="Nyatakan Syarat Sewaan Baju" value={syaratSewaan} onChange={(e) => {setsyaratSewaan(e.target.value)}} />
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
