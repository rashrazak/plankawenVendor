import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../../../css/venueform.css'
import AddServiceContext from '../../../../contexts/AddServiceContext'
import Swal from 'sweetalert2'
    
function Venue() {
    const gMapsCities = [
        {city:'Ampang', status:false},
        {city:'Bandar Baru Bangi', status:false},
        {city:'Bangsar', status:false},
        {city:'Bandar Baru Selayang', status:false},
        {city:'Bandar Sri Damansara', status:false},
        {city:'Bandar Utama', status:false},
        {city:'Batu Caves', status:false},
        {city:'Bukit Damansara', status:false},
        {city:'Bukit Jalil', status:false},
        {city:'Bukit Kiara', status:false},
        {city:'Cheras', status:false},
        {city:'Cyberjaya', status:false},
        {city:'Damansara Jaya', status:false},
        {city:'Damansara Town Centre', status:false},
        {city:'Damansara Utama', status:false},
        {city:'Gombak', status:false},
        {city:'Hulu Langat', status:false},
        {city:'Kajang', status:false},
        {city:'Kelana Jaya', status:false},
        {city:'Kepong', status:false},
        {city:'Klang', status:false},
        {city:'Kota Damansara', status:false},
        {city:'Kuala Lumpur', status:false},
        {city:'Lembah Beringin', status:false},
        {city:'Maluri', status:false},
        {city:'Miharja', status:false},
        {city:'Petaling Jaya', status:false},
        {city:'Port Klang', status:false},
        {city:'Puchong', status:false},
        {city:'Pudu', status:false},
        {city:'Putrajaya', status:false},
        {city:'Rawang', status:false},
        {city:'Segambut', status:false},
        {city:'Selayang', status:false},
        {city:'Sentul', status:false},
        {city:'Semenyih', status:false},
        {city:'Sepang', status:false},
        {city:'Seri Kembangan', status:false},
        {city:'Setapak', status:false},
        {city:'Shah Alam', status:false},
        {city:'Sri Hartamas', status:false},
        {city:'Sri Petaling', status:false},
        {city:'Subang Jaya', status:false},
        {city:'Subang', status:false},
        {city:'Sungai Besi', status:false},
        {city:'Sungai Buloh', status:false},
        {city:'Taman Melawati', status:false},
        {city:'Taman Tun Dr Ismail', status:false},
        {city:'USJ', status:false},
        {city:'Wangsa Maju', status:false},
        {city:'Wilayah Persekutuan Putrajaya', status:false},
        {city:'Wilayah Persekutuan Kuala Lumpur', status:false},
        {city:'Federal Territory of Kuala Lumpur', status:false},
        {city:'Federal Territory of Putrajaya', status:false},
        {city:'Kuala Lumpur',status:false}
    ];
    const {getServiceAbout} = useContext(AddServiceContext);
    const kawasan = getServiceAbout.areaCovered;
    const [cityArray, setCityArray] = useState(kawasan);
    // const [vend, setVend] = useState({
    //     serviceName:'',
    //     description:'',
    //     serviceType:'',
    //     areaCovered:[]
    // });

    useEffect( () =>{
        setCityArray(kawasan)
    },[kawasan])

    useEffect(() =>{
        const getx = () => {
            console.log(cityArray)
        }
        getx();
    },[cityArray])

    const handleChangeKawasan = (e) => {
        Swal.showLoading()
        let name = e.target.name;
        let check = e.target.checked;
        let x = cityArray;
        if (check) {
            setCityArray(old =>[...old, name])
        }else{
            let index = cityArray.indexOf(name);
            x.splice(index,1);
            setCityArray([...x]);
        }
        Swal.close()
    }
    return (
        <div className="form-service">
            {/* <div className="form-section">
                <h4>Type</h4>
                <div className="checkbox-type">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            <p>Nikah</p>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            <p>Walimah</p>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            <p>Outdoor</p>
                        </Label>
                    </FormGroup>
                </div>
            </div> */}
            <div className="form-section">
                <h4>Add title to your service</h4>
                <Input className="form-custom" type="text" name="text" id="titleService" placeholder="" />
            </div>
            <div className="form-section">
                <h4>Description for your service</h4>
                <Input className="form-custom" type="textarea" name="text" id="descService" />
            </div>
            <div className="form-section">
                <h4>Area Covered</h4>
                {gMapsCities.map( (cty, index) =>{
                    let bandar = cty.city;
                    {/* let chckd  = false; */}
                    let chckd = cityArray.includes(bandar) ? true : false;
                    return(
                        
                            <div key={index} className="area-covered-div">
                                <label>
                                    <input type="checkbox"
                                        name={bandar} 
                                        checked={chckd}
                                        onChange={(e) => handleChangeKawasan(e)}
                                    />
                                    {bandar}
                                </label>
                            </div>
                            
                    )
                } )}
            </div>
            <div className="form-button">
                <Button  className="btn-cancel">Cancel</Button>{' '}
                <Button  className="btn-next">Next</Button>{' '}
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

export default Venue
