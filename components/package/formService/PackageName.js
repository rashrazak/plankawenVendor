import React, {useState, useEffect, useContext} from 'react'
import { Button, Label, Input } from 'reactstrap';
import '../../../css/venueform.css'
import '../../../css/about.css'

import { PackageContext } from '../../../contexts/PackageContext';

function PackageName({packageList, getPackage, setShowPackageDetails}) {
    const gMapsCities = [
        {state:'Johor', status:false},
        {state:'Kedah', status:false},
        {state:'Kelantan', status:false},
        {state:'Melaka', status:false},
        {state:'Negeri Sembilan', status:false},
        {state:'Pahang', status:false},
        {state:'Penang', status:false},
        {state:'Perak', status:false},
        {state:'Perlis', status:false},
        {state:'Sabah', status:false},
        {state:'Sarawak', status:false},
        {state:'Selangor', status:false},
        {state:'Kuala Lumpur', status:false},
        {state:'Terengganu', status:false},
        {state:'Labuan', status:false},
        {state:'Putrajaya', status:false},
    ];
    const {packageDetailsFunction} = useContext(PackageContext)

    useEffect(() => {
        console.log(packageList)
        packageDetailsFunction(packageList)
    }, [packageList])


    const createPackageFunction = () => {
        getPackage({packageName:name, tnc, description:descriptionx, extra, areaCovered:cityArray})
        setShowPackageDetails(old => false)
    }
    const handleChangeKawasan = (e) => {
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
    }
    const [cityArray, setCityArray] = useState([]);
    const [descriptionx, setDescriptionx] = useState('');
    const [tnc, settnc] = useState('');
    const [extra, setextra] = useState('');
    const [name, setname] = useState('');
  
    return (
        
        <div className="form-service">
            <div>
                <h4>Nama atau Tajuk Package {name ? name.name : ''}</h4>
                <Input type="text"  onChange={(e) => setname(e.target.value)} />
                
            </div>
            <div className="form-section">
                <h4>Description Package (dengan lengkap)</h4>
                <Input className="form-custom" type="textarea" name="text" id="descService" value={descriptionx} onChange={(e) => { setDescriptionx(e.target.value) }} />
            </div>
            <div className="form-section">
                <h4>Terma dan Syarat </h4>
                <Input className="form-custom" onChange={(e) => settnc(e.target.value)} type="textarea" placeholder="Terms & Conditions" value={tnc} />
            </div>
            <div className="form-section">
                <h4>Maklumat tambahan</h4>
                <Input className="form-custom" onChange={(e) => setextra(e.target.value)} type="textarea" placeholder="Extra Details, free gift etc" value={extra} />
            </div>
            <div className="form-section">
                <h4> Lokasi Jangkauan</h4>
                {gMapsCities.map( (cty, index) =>{
                    let bandar = cty.state;
                    let chckd  = false;
                    if (cityArray != null) {
                        chckd = cityArray.includes(bandar) ? true : false;
                    }
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
                <Button color="primary" onClick={() =>createPackageFunction()} >Confirm</Button>
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


export default PackageName