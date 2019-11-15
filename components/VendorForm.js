import React, {useContext, useState, useEffect} from 'react'
import '../css/venueform.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function VendorForm() {

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

    const [cityArray, setCityArray] = useState([]);
 
    return (
        <div className="">
            <div className="vendor-form">
                <div>
                    <label>Email Syarikat</label>
                    <Input className="form-custom" type="email" name="text" id="" placeholder="" />
                    <label>Password</label>
                    <Input className="form-custom" type="password" name="text" id="" placeholder="" />
                    <label>Nama Syarikat</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                    <label>Nama Pemilik</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                    <label>Nombor Pendaftaran Syarikat</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                    <label>Nama Bank</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                    <label>Nombor Akaun Bank</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                </div>
                <div>
                    <label>SSM</label>
                    <div className="file-upload">
                        <label for="upload" className="file-upload__label">Upload file here</label>
                        <Input className="file-upload__input" type="file" name="file" id="testingUpload"/>
                    </div>
                    <label>No. Telefon</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                    <label>Instagram</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                    <label>Facebook</label>
                    <Input className="form-custom" type="text" name="text" id="" placeholder="" />
                    <div className="">
                        <label>Kawasan</label>
                        <div className="kawasan-section">
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
                    </div>
                </div>
            </div>
            <div className="position-button">
                <Button color="primary" className="btn-daftar">Daftar Masuk</Button>
            </div>
            <style jsx>{`
                a { margin-top: 10px;}
                .bg-color { background: rgb(244,244,244); background: linear-gradient(180deg, rgba(244,244,244,1) 80%, rgba(245,154,134,0.5732668067226891) 100%); height: 100vh; width: 100%; position: relative; }
                .logo-oficial { position: absolute; top: 20px; left: 20px;}
                .form-custom { border: 2px solid #EAEAEA; }
                .vendor-form { display: flex;  justify-content: space-between; }
                .vendor-form > div { width: 48%; }
                label { font-weight: 400; color: #3e3e3e; font-size: 14px; }
                .testing::after { content:"another word" !important; }
                .file-upload { position: relative; }
                .file-upload__label { display: block; padding: 7px; color: #fff; background: #F5F6FA; color: #3e3e3e; border-radius: 4px; border: 2px solid #EAEAEA; transition: background .3s; cursor: pointer;  height: 38px; margin: 0;}
                .file-upload__label:hover { cursor: pointer; background: #000; }
                .file-upload__input { position: absolute; left: 0; top: 0; right: 0; bottom: 0; font-size: 1; width:0; height: 100%; opacity: 0; }
                .position-button  { text-align: center; margin-top: 50px; }
                .kawasan-section { display: flex; flex-wrap: wrap;}
                .area-covered-div { margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .btn-daftar { background-color: #ED795F; }
            `}</style>
        </div>
    )
}

export default VendorForm
