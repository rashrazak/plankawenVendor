import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip } from 'reactstrap';
import Router from 'next/router';
// import '../../../../css/Venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
// import Multiselect from 'multiselect-dropdown-react';
import Swal from 'sweetalert2'
    
function KadBannerForm({pagex}) {
    const {getServiceDetailsKadBanner, addServiceDetailsKadBanner} = useContext(AddServiceContext);
    const [hargaPerPerson, sethargaPerPerson] = useState(0)
    const [discount, setdiscount] = useState([])
    const [banner, setbanner] = useState(false)
    const [bannerSize, setbannerSize] = useState([])
    const [bannerDescription, setbannerDescription] = useState('')

    //min max value
    const [minDiscount, setminDiscount] = useState(0)
    const [maxDiscount, setmaxDiscount] = useState(0)
    const [discountVal, setdiscountVal] = useState(0)
    const [arraySizeDiscount, setarraySizeDiscount] = useState(0)

    //size harga banner
    const [sizex, setsizex] = useState('');
    const [pricex, setpricex] = useState(0);
    

    useEffect(() =>{
        console.log(getServiceDetailsKadBanner)
        sethargaPerPerson(getServiceDetailsKadBanner.hargaPerPerson)
        setdiscount(getServiceDetailsKadBanner.discount)
        setbanner(getServiceDetailsKadBanner.banner)
        setbannerSize(getServiceDetailsKadBanner.bannerDesc.bannerSize)
        setbannerDescription(getServiceDetailsKadBanner.bannerDesc.description)
        setarraySizeDiscount(() => {
            let disc = getServiceDetailsKadBanner.discount
            if (disc.length > 0) {
                let discL = disc.length
                return discL
            }
        })
        setminDiscount(() => {
            let disc = getServiceDetailsKadBanner.discount
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
    },[getServiceDetailsKadBanner])

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

    const addBanner = () => {
        if (pricex == 0 && sizex == '') {
            alert('Informasi tidak diisi')
            return false
        }
        let data = {
            harga:pricex,
            size:sizex
        }
        setbannerSize(old => [...old, data])
        setpricex(0)
        setsizex('')
    }

    const deleteBanner = (index) => {
        let ban = bannerSize;
        ban.splice(index, 1);
        setbannerSize([...ban]);
        setpricex(0)
        setsizex('')
    }

    useEffect(() => {
        console.log(discount)
    }, [discount])

    useEffect(() => {
        console.log(bannerSize)
    }, [bannerSize])

    const submitServiceDetails = () => {
        addServiceDetailsKadBanner(hargaPerPerson, discount, banner, bannerSize, bannerDescription)
        Router.push(`/${pagex}/upload`);
    }
    return (
        <div className="form-service">
            
            <div className="form-section">
                <h4>Harga per Unit (RM)</h4>
                <Input className="form-custom" type="number" placeholder="" value={hargaPerPerson} onChange={(e) => {sethargaPerPerson(e.target.value)}} />
            </div>
            <div className="form-section">
                <h4>Senarai harga</h4>
                <br/>
                <p>Kuantiti Minimum</p>
                <Input className="form-custom" type="number" placeholder="min quantity" value={minDiscount} onChange={(e) => {setminDiscount(e.target.value)}} />
                <br/>
                <p>Kuantiti Maksimum</p>
                <Input className="form-custom" type="number" placeholder="max quantity" value={maxDiscount}  onChange={(e) => {setmaxDiscount(e.target.value)}} />
                <br/>
                <p>Diskaun per Pax (%)</p>
                <Input className="form-custom" href="#" id="tooltipDiskaun" type="number" placeholder="any discounted price?" onChange={(e) => {setdiscountVal(e.target.value)}} />
                <UncontrolledTooltip placement="left" target="tooltipDiskaun">
                    Diskaun mengikut minimum dan maksimum per pax. Contoh: <br></br>
                    1 - 500 (0% diskaun per unit) <br></br>
                    501 - 1000 (5% diskaun per unit) <br></br>
                    1001 - 1500 (8% diskaun per unit) 
                </UncontrolledTooltip>
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
                                    <label>
                                        <span>Minimum: {mi} | </span>
                                        <span>Maksimum: {ma} | </span>
                                        <span>Diskaun: {d} %</span>
                                        {(index == (discount.length - 1) )
                                            ? 
                                            <Button color="danger" className="round-delete" onClick={() => deleteDiscount(index)}>x</Button>
                                            :
                                            <div></div>

                                        }
                                        <br/>
                                    </label>
                                </div>
                            </React.Fragment>
                        )
                    })
                    : ''
                }
            </div>
            <div className="form-section">
                <h4>Turut menyediakan servis banner?</h4>
                <div className="area-covered-div">
                    <label>
                        <input type="checkbox"
                            checked={banner}
                            onChange={(e) => setbanner(e.target.checked)}
                        />
                        {banner ? "<< Ya" : "<< Tidak"}
                    </label>
                </div>
            </div>
            {
                banner ?
                <React.Fragment> 
                    <div className="form-section">
                        <h4>Description Banner</h4>
                        <Input className="form-custom" href="#" id="tooltipHarga" type="textarea" placeholder="" value={bannerDescription} onChange={(e) => {setbannerDescription(e.target.value)}} />
                        <UncontrolledTooltip placement="left" target="tooltipHarga">
                            Terangkan jenis kain/fabrik digunakan sebagai banner anda dan sebarang informasi berkaitan
                        </UncontrolledTooltip>
                    </div>
                    <div className="form-section">
                        <h4>Jenis Banner</h4>
                        <br/>
                        <p>Saiz</p>
                        <Input className="form-custom" type="text" placeholder="Size Banner" value={sizex} onChange={(e) => {setsizex(e.target.value)}} />
                        <br/>
                        <p>Harga (RM)</p>
                        <Input className="form-custom" type="number" placeholder="Harga Seunit" value={pricex}  onChange={(e) => {setpricex(e.target.value)}} />
                        <br/>
                        <Button  color="primary" onClick={() => addBanner()}>Add</Button>
                    </div>
                    <div className="form-section">
                        { bannerSize.length > 0 ?
                            <p>Senarai Banner</p>
                            :
                            ''
                        }
                        <br/>
                        {   bannerSize.length > 0 ?
                            
                            bannerSize.map( (val, index) =>{
                                let sz = val.size;
                                let hrg = val.harga;

                                return(
                                    <React.Fragment key={index}>
                                        <div  className="area-covered-div">
                                            <label>
                                                <span>size: {sz}</span>
                                                <span>Harga: {hrg}</span>
                                                <Button  color="danger" className="round-delete" onClick={() => deleteBanner(index)}>x</Button>
                                            </label>
                                            <br/>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                            : ''
                        }
                    </div>
                </React.Fragment>
                : ''
                
            }
            
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

export default KadBannerForm
