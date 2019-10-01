import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function CatererForm({pagex}) {

    const {getServiceDetailsCaterer, addServiceDetailsCaterer} = useContext(AddServiceContext);
    const [hargaPerPerson, sethargaPerPerson] = useState(0)
    const [discount, setdiscount] = useState([])
    const [senaraiLauk, setsenaraiLauk] = useState([])

    //min max value
    const [minDiscount, setminDiscount] = useState(0)
    const [maxDiscount, setmaxDiscount] = useState(0)
    const [discountVal, setdiscountVal] = useState(0)
    const [arraySizeDiscount, setarraySizeDiscount] = useState(0)
    const [lauk, setlauk] = useState('')



    useEffect(() =>{
        sethargaPerPerson(getServiceDetailsCaterer.hargaPerPerson)
        setdiscount(getServiceDetailsCaterer.discount)
        setsenaraiLauk(getServiceDetailsCaterer.senaraiLauk)
        setarraySizeDiscount(() => {
            let disc = getServiceDetailsCaterer.discount
            if (disc.length > 0) {
                let discL = disc.length
                return discL
            }
        })
        setminDiscount(() => {
            let disc = getServiceDetailsCaterer.discount
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
    },[getServiceDetailsCaterer])

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

    const addLauk = () => {
        const la = lauk
        setsenaraiLauk(old => [...old, la])
        setlauk('')
    }

    const deleteLauk = (index) => {
        let sl = senaraiLauk;
        sl.splice(index, 1);
        setsenaraiLauk([...sl]);
        setlauk('')
    }

    useEffect(() => {
        console.log(discount)
    }, [discount])

    useEffect(() => {
        console.log(senaraiLauk)
    }, [senaraiLauk])

    const submitServiceDetails = () => {
        addServiceDetailsCaterer(hargaPerPerson, discount, senaraiLauk)
        Router.push(`/${pagex}/upload`);
    }

    return (
        <div className="form-service">
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
                <h4>Jenis Lauk</h4>
                <br/>
                <p>Nama Lauk</p>
                <Input className="form-custom" type="textarea" placeholder="Nama Lauk dan Description" value={lauk} onChange={(e) => {setlauk(e.target.value)}} />
                <br/>
                <Button  color="primary" onClick={() => addLauk()}>Add</Button>
            </div>
            <div className="form-section">
                { senaraiLauk.length > 0 ?
                    <p>Senarai Lauk</p>
                    :
                    ''
                }
                <br/>
                {   senaraiLauk.length > 0 ?
                    
                    senaraiLauk.map( (val, index) =>{
                        let lauk = val

                        return(
                            <React.Fragment key={index}>
                                <div  className="area-covered-div">
                                    <label>
                                        <span>Lauk: {lauk}</span>
                                        <Button  color="danger" onClick={() => deleteLauk(index)}>Delete</Button>
                                    </label>
                                    <br/>
                                </div>
                            </React.Fragment>
                        )
                    })
                    : ''
                }
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

export default CatererForm
