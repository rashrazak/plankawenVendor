import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function DoorGiftForm({pagex}) {

    const {getServiceDetailsDoorGift, addServiceDetailsDoorGift} = useContext(AddServiceContext);
    const [hargaPerPerson, sethargaPerPerson] = useState(0)
    const [discount, setdiscount] = useState([])

    //min max value
    const [minDiscount, setminDiscount] = useState(0)
    const [maxDiscount, setmaxDiscount] = useState(0)
    const [discountVal, setdiscountVal] = useState(0)
    const [arraySizeDiscount, setarraySizeDiscount] = useState(0)
    const [waktuTiba, setwaktuTiba] = useState('')
    const [jenisMaterial, setJenisMaterial] = useState('')
    const [maxDesignChanges, setmaxDesignChanges] = useState(0)
    const [jenisHantar, setjenisHantar] = useState('')


    useEffect(() =>{
        sethargaPerPerson(getServiceDetailsDoorGift.hargaPerPerson)
        setdiscount(getServiceDetailsDoorGift.discount)
        setwaktuTiba(getServiceDetailsDoorGift.waktuTiba)
        setJenisMaterial(getServiceDetailsDoorGift.jenisMaterial)
        setmaxDesignChanges(getServiceDetailsDoorGift.maxDesignChanges)
        setjenisHantar(getServiceDetailsDoorGift.jenisHantar)
        setarraySizeDiscount(() => {
            let disc = getServiceDetailsDoorGift.discount
            if (disc.length > 0) {
                let discL = disc.length
                return discL
            }
        })
        setminDiscount(() => {
            let disc = getServiceDetailsDoorGift.discount
            if (disc.length > 0) {
                let discL = disc.length
                let discIndex = disc[discL - 1]
                let min =  parseInt(discIndex['max']);
                min = min + 1;
                return min;
            }else{
                return 1;
            }
        })
    },[getServiceDetailsDoorGift])

    const addDiscount = () => {
        let max = parseInt(maxDiscount)
        let min = parseInt(minDiscount)
        let disc = parseInt(discountVal)

        if (min > max) {
            alert('The maximum value is less than minimum quantity')
            return false;
        }

        let data = {
            min:min,
            max:max,
            discount:disc
        }
        setdiscount(old =>[...old, data])
        let maxD = parseInt(maxDiscount)
        setminDiscount(maxD + 1)
        setmaxDiscount(0)
        setarraySizeDiscount(old => old + 1)

    }

    const deleteDiscount = (index) => {
        let disc = discount;
        let min = parseInt(disc[index]['min'])
        setminDiscount(min)
        setmaxDiscount(0)
        disc.splice(index, 1);
        setdiscount([...disc]);
        setarraySizeDiscount(old => old - 1)
    }

    useEffect(() => {
        console.log(discount)
    }, [discount])

    const submitServiceDetails = () => {
        addServiceDetailsDoorGift(hargaPerPerson, discount, waktuTiba, jenisMaterial, maxDesignChanges, jenisHantar)
        Router.push(`/${pagex}/upload`);
    }

    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Jenis Material</h4>
                <Input className="form-custom harga" type="text" onChange={(e) => {setJenisMaterial(e.target.value)}} value={jenisMaterial}/>
            </div>
            <div className="form-section">
                <h4>Max Changes Design</h4>
                <Input className="form-custom harga" type="number" onChange={(e) => {setmaxDesignChanges(e.target.value)}} value={maxDesignChanges}/>
            </div>
            <div className="form-section">
                <h4>Harga Satu Kepala (RM)</h4>
                <Input className="form-custom" type="number" placeholder="" value={hargaPerPerson} onChange={(e) => {sethargaPerPerson(e.target.value)}} />
            </div>
            <div className="form-section">
                <h4>Senarai harga</h4>
                <br/>
                <p>Min quantity</p>
                <Input className="form-custom" type="number" placeholder="min quantity" value={minDiscount} onChange={(e) => {setminDiscount(e.target.value)}} />
                <br/>
                <p>Max quantity</p>
                <Input className="form-custom" type="number" placeholder="max quantity" value={maxDiscount}  onChange={(e) => {setmaxDiscount(e.target.value)}} />
                <br/>
                <p>Any discount added?</p>
                <Input className="form-custom" type="number" placeholder="any discounted price?" onChange={(e) => {setdiscountVal(e.target.value)}} />
                <br/>
                <Button  color="primary" onClick={() => addDiscount()}>Add</Button>
            </div>
            <div className="form-section">
                { discount.length > 0 ?
                    <p>Senarai Diskaun</p>
                    :
                    ''
                }
                <br/>
                {   discount.length > 0 ?
                    
                    discount.map( (val, index) =>{
                        let ma = val.max;
                        let mi = val.min;
                        let d = val.discount;

                        return(
                            <React.Fragment key={index}>
                                <div  className="area-covered-div">
                                        <span>Min: {mi}</span>
                                        <span>Max: {ma}</span>
                                        <span>Discount: {d} %</span>
                                        {(index == (discount.length - 1) )
                                            ? 
                                            <Button  color="danger" onClick={() => deleteDiscount(index)}>Delete</Button>
                                            :
                                            <div></div>

                                        }
                                        <br/>
                                </div>
                            </React.Fragment>
                        )
                    })
                    : ''
                }
            </div>
            <div className="form-section">
                <h4>Waktu Tiba</h4>
                <Input className="form-custom harga" type="text" value={waktuTiba} onChange={(e) => {setwaktuTiba(e.target.value)}} />
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

export default DoorGiftForm
