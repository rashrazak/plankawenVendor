import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip } from 'reactstrap';
import Router from 'next/router';
import '../../../../css/venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function MakeupForm({pagex, setModalEdit,editModal}) {
    const jenisMakeupArray = [
        {jenis:'Full Makeup', status:false},
        {jenis:'Touchup', status:false}
    ];
    const jantinaArray = [
        {jantina:'Lelaki', status:false},
        {jantina:'Wanita', status:false}
    ];
    const {getServiceDetailsMakeup, addServiceDetailsMakeup} = useContext(AddServiceContext);
    const [hargaTouchup, sethargaTouchup] = useState('')
    const [hargaFull, sethargaFull] = useState('')
    const [jantina, setjantina] = useState('')
    const [jenisMakeup, setjenisMakeup] = useState('')
    const [makeupFull, setmakeupFull] = useState(false)
    const [hargaDiscountFull, sethargaDiscountFull] = useState(0);
    const [discountFull, setdiscountFull] = useState(0);
    const [makeupTouchup, setmakeupTouchup] = useState(false)
    const [hargaDiscountTouchup, sethargaDiscountTouchup] = useState(0);
    const [discountTouchup, setdiscountTouchup] = useState(0);


    useEffect(() =>{
        sethargaTouchup(getServiceDetailsMakeup.hargaTouchup)
        sethargaDiscountTouchup(getServiceDetailsMakeup.hargaDiscountTouchup)
        setdiscountTouchup(getServiceDetailsMakeup.discountTouchup)
        sethargaFull(getServiceDetailsMakeup.hargaFull)
        sethargaDiscountFull(getServiceDetailsMakeup.hargaDiscountFull)
        setdiscountFull(getServiceDetailsMakeup.discountFull)
        setjantina(getServiceDetailsMakeup.jantina)
        setjenisMakeup(getServiceDetailsMakeup.jenisMakeup)
        setmakeupFull(()=> {
            return getServiceDetailsMakeup.hargaFull != 0 ? true : false
        })
        setmakeupTouchup(()=> {
            return getServiceDetailsMakeup.hargaTouchup != 0 ? true : false
        })
    },[getServiceDetailsMakeup])

    const handleChangeJenis = (e) => {
        let name = e.target.name;
        let check = e.target.checked;
        let x = jenisMakeup;
        
        if (check) {
            setjenisMakeup(old =>[...old, name])
            if (name == 'Full Makeup') {
                setmakeupFull(true)
            }else{
                setmakeupTouchup(true)
            }
        
        }else{
            let index = jenisMakeup.indexOf(name);
            x.splice(index,1);
            setjenisMakeup([...x]);
            if (name == 'Full Makeup') {
                setmakeupFull(false)
                sethargaFull(0)

            }else{
                setmakeupTouchup(false)
                sethargaTouchup(0)
            }
        }
    }

    const handleChangeJantina = (e) => {
        Swal.showLoading()
        let name = e.target.name;
        let check = e.target.checked;
        let x = jantina;
        if (check) {
            setjantina(old =>[...old, name])
        }else{
            let index = jantina.indexOf(name);
            x.splice(index,1);
            setjantina([...x]);
        }
        Swal.close()
    }


    const submitServiceDetails = () => {
        if (jenisMakeup.includes('Full Makeup') && hargaFull == 0) {
            alert('Sila input harga `Full Makeup` ')
            return false
        }

        if (jenisMakeup.includes('Touchup') && hargaTouchup == 0) {
            alert('Sila input harga `Touchup` ')
            return false
        }
        if (hargaFull == 0 && hargaTouchup == 0) {
            alert('Sila pilih jenis `makeup` ')
            return false
        }
        addServiceDetailsMakeup(hargaTouchup, hargaFull, jenisMakeup, jantina, discountTouchup, discountFull, hargaDiscountTouchup, hargaDiscountFull)
        Router.push(`/${pagex}/upload`);
    }

    const submitServiceDetails2 = () => {
        if (jenisMakeup.includes('Full Makeup') && hargaFull == 0) {
            alert('Sila input harga `Full Makeup` ')
            return false
        }

        if (jenisMakeup.includes('Touchup') && hargaTouchup == 0) {
            alert('Sila input harga `Touchup` ')
            return false
        }
        if (hargaFull == 0 && hargaTouchup == 0) {
            alert('Sila pilih jenis `makeup` ')
            return false
        }
        addServiceDetailsMakeup(hargaTouchup, hargaFull, jenisMakeup, jantina, discountTouchup, discountFull, hargaDiscountTouchup, hargaDiscountFull)
        setModalEdit(false)
    }
    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Jenis Makeup</h4>
                {
                    jenisMakeupArray.map( (cty, index) =>{
                        let jen = cty.jenis;
                        let chckd  = false;
                        if (jenisMakeup != null) {
                            chckd = jenisMakeup.includes(jen) ? true : false;
                            {/* if (jen == 'Full Makeup') {
                                setmakeupFull(chckd)
                            }else{
                                setmakeupTouchup(chckd)
                            } */}
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
                    })
                }
            </div>
            <div className="form-section">
                <h4>Jantina</h4>
                {
                    jantinaArray.map( (cty, index) =>{
                        let jen = cty.jantina;
                        let chckd  = false;
                        if (jantina != null) {
                            chckd = jantina.includes(jen) ? true : false;
                        }
                        return(
                            <div key={index} className="area-covered-div">
                                <label>
                                    <input type="checkbox"
                                        name={jen} 
                                        checked={chckd}
                                        onChange={(e) => handleChangeJantina(e)}
                                    />
                                    {jen}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
            {
                makeupTouchup ?
                    <div> 
                        <div className="form-section">
                            <h4>Harga Touchup (RM)</h4>
                            <Input className="form-custom" type="number" placeholder="" value={hargaTouchup} onChange={(e) => {sethargaTouchup(e.target.value)}} />
                        </div>
                        <div className="form-section">
                        <h4>Diskaun (%)</h4>
                        <Input className="form-custom harga" type="number" onChange={(e) => {
                                let x = e.target.value;
                                let har = hargaTouchup;
                                x = x / 100;
                                har = har - (har * x);
                                sethargaDiscountTouchup(har);
                                setdiscountTouchup(e.target.value)
                                }} value={discountTouchup} 
                            />
                        </div>
                        <div className="form-section">
                            <h4>Harga selepas Diskaun (RM)</h4>
                            <Input className="form-custom harga" type="number" disabled value={hargaDiscountTouchup} />
                        </div>
                    </div>
                :
                    <div>
                        {''}
                    </div>
            }

            {
                makeupFull ? 
                <div>
                    <div className="form-section">
                        <h4>Harga Makeup Full (RM)</h4>
                        <Input className="form-custom" type="number" placeholder="" value={hargaFull} onChange={(e) => {sethargaFull(e.target.value)}} />
                    </div>
                    <div className="form-section">
                    <h4>Diskaun (%)</h4>
                    <Input className="form-custom harga" type="number" onChange={(e) => {
                            let x = e.target.value;
                            let har = hargaFull;
                            x = x / 100;
                            har = har - (har * x);
                            sethargaDiscountFull(har);
                            setdiscountFull(e.target.value)
                            }} value={discountFull} 
                        />
                    </div>
                    <div className="form-section">
                        <h4>Harga selepas Diskaun (RM)</h4>
                        <Input className="form-custom harga" type="number" disabled value={hargaDiscountFull} />
                    </div>
                </div>       
                :
                    <div>
                        {''}
                    </div>
            }
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
                p {font-weight:400; color: #3e3e3e; font-size: 14px; margin-bottom: 5px;}
                .form-section { margin: 20px 0; }
                h4 { text-align: center; font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                .area-covered-div { display: inline-block; margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
            `}</style>
        </div>
    )
}

export default MakeupForm
