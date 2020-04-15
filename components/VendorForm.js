import React, {useContext, useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import Filebase64 from 'react-file-base64'
import Router,{useRouter} from 'next/router'
import firebase from '../config/firebaseConfig'
import LoginContext from '../contexts/LoginContext'
import {GlassMagnifier} from "react-image-magnifiers";
import Swal from 'sweetalert2'

import Link from 'next/link'
import '../css/venueform.css'

function VendorForm() {
    const route = useRouter()
    const path  = route.pathname;
    const [cityArray, setCityArray] = useState([]);

    
    const [setuju, setSetuju] = useState(false);
    const [companyEmail, setCompanyEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState(''); 
    const [companyAddress, setCompanyAddress] = useState('');
    const [owner, setOwner] = useState('')
    const [companyId, setCompanyId] = useState('')
    const [bankName, setBankName] = useState('');
    const [bankAccount, setBankAccount] = useState('')
    const [ssmImage, setSsmImage] = useState(null)
    const [phoneNo, setPhoneNo] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('');
    const [vendorId, setVendorId] = useState('')

    const [firstDiv, setFirstDiv] = useState(true)
    const [secondDiv, setSecondDiv] = useState(false)
    const [thirdDiv, setThirdDiv] = useState(false)
    const [forthDiv, setForthDiv] = useState(false)

    useEffect(() => {
        console.log(ssmImage)
    }, [ssmImage])

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

    const uploadOnDone = (file) => {
        console.log(file)
        let f = file.file;
        if (f.size > 300000) {
            alert('Limit saiz gambar hanya 300kb sahaja untuk satu gambar, sila compress gambar anda')
            return false
        }
        setSsmImage(file)

    }

    const submitForm = ()=> {
        
        if (setuju == false) {
            alert('Sila daftar akuan sebagai vendor!')
            return false;
        }

        if (ssmImage == null) {
            alert('Sila lampirkan gambar SSM anda!')
            return false;
        }

        if (cityArray == false) {
            alert('Sila nyatakan kawasan anda!')
            return false;
        }
        if (password.length <= 6 && path == '/signup'){
            alert('Password anda harus melebihi 6 character!')
            return false;
        }

        if (companyName == false || owner == false || facebook == false || instagram == false || companyEmail == false || bankAccount == false || companyAddress == false || bankName == false || companyId == false || phoneNo == false) {
            alert('Sila isikan semua informasi!')
            return false;
        }
        Swal.fire({
            title:'Sila Tunggu...',
            onBeforeOpen:()=>{
                Swal.showLoading()
            }
        })
        var param = {
            account:0,
            akaunBank:bankAccount,
            alamatSyarikat:companyAddress,
            email:companyEmail,
            facebook,
            instagram,
            kawasan:cityArray,
            namaBank:bankName,
            namaPemilik:owner,
            bilanganPekerja:0,
            namaSyarikat:companyName,
            setuju,
            phone:phoneNo,
            noPendaftaranSyarikat:companyId,
            ssmImage:'',
            points:0,
            status:'pending',
            

        }
        if (Router.pathname == '/signup') {
            localStorage.removeItem('user')
            let x = firebase.createVendor(param, password, companyEmail, ssmImage)
            // if (x == true) {
            //     alert('Registered!')
            //     Router.push('/');
            // }
        }
        
    }

    return (
        <div className="">
            {/* <div className="logo-container">
                <img className="" src="/images/logos/logo-white-tagline.png"></img>
            </div> */}
            <div className="vendor-form-section">
                <div className="">
                    <img className="" src="/images/placeholder/vendor-bg.png"></img>
                </div>
                <div className="vendor-form">
                    <h4>Anda telah memilih untuk menjadi rakan vendor kami.<br></br>Sila masukkan detail syarikat anda.</h4>   
                    {
                        firstDiv == true ?
                        <React.Fragment>
                            <div>
                                <label>Email Syarikat</label>
                                <Input className="form-custom" type="email" value={companyEmail} onChange={(e)=>setCompanyEmail(e.target.value)} required/>
                                <label>Password</label>
                                <Input className="form-custom" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                                <div className="position-button">
                                    <Button className="btn-daftar" onClick={()=>{
                                        setFirstDiv(false)
                                        setSecondDiv(true)
                                    }}>Seterusnya</Button>
                                </div>
                                <div className={`login-cont`}>
                                    <p>Sudah ada akaun? <span><Link href="/index"><a className={``}>Klik disini</a></Link></span></p>
                                </div>
                            </div>    

                        </React.Fragment>
                        : ''
                    }
                    {
                        secondDiv == true ?
                        <React.Fragment>
                            <div>
                                <label>Nama Syarikat</label>
                                <Input className="form-custom" type="text" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required/>
                                <label>Alamat Syarikat</label>
                                <Input className="form-custom" type="textarea" value={companyAddress} onChange={(e)=>setCompanyAddress(e.target.value)} required/>
                                <label>Nama Pemilik</label>
                                <Input className="form-custom" type="text" value={owner} onChange={(e)=>setOwner(e.target.value)} required/>
                                <label>Nombor Pendaftaran Syarikat</label>
                                <Input className="form-custom" type="text" value={companyId} onChange={(e)=>setCompanyId(e.target.value)} required/>
                                <label>SSM</label>
                                {
                                    path != '/signup' ?
                                    <GlassMagnifier imageSrc={ssmImage}/>
                                    : ''
                                }
                                <div className="file-upload">
                                    <Filebase64 className="file-upload__input" id="testingUpload" multiple={ false } onDone={(x) => uploadOnDone(x) } />
                                </div>
                                <div className="position-button">
                                    <Button color="primary" className="btn-daftar" onClick={()=>{
                                        setSecondDiv(false)
                                        setFirstDiv(true)
                                    }}>Kembali</Button>
                                    <Button color="primary" className="btn-daftar" onClick={()=>{
                                        setSecondDiv(false)
                                        setThirdDiv(true)
                                    }}>Seterusnya</Button>
                                </div>
                            </div>
                        </React.Fragment>
                        : ''
                    }
                    {
                        thirdDiv == true ?
                            <React.Fragment>
                                <div>
                                    <label>Nama Bank</label>
                                    <Input className="form-custom" type="text" value={bankName} onChange={(e)=>setBankName(e.target.value)} required/>
                                    <label>Nombor Akaun Bank</label>
                                    <Input className="form-custom" type="text" value={bankAccount} onChange={(e)=>setBankAccount(e.target.value)} required/>
                                    <label>No. Telefon</label>
                                    <Input className="form-custom" type="text" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} required/>
                                    <div className="position-button">
                                        <Button color="primary" className="btn-daftar" onClick={()=>{
                                            setSecondDiv(true)
                                            setThirdDiv(false)
                                        }}>Kembali</Button>
                                         <Button color="primary" className="btn-daftar" onClick={()=>{
                                            setThirdDiv(false)
                                            setForthDiv(true)
                                        }}>Seterusnya</Button>
                                    </div>
                                </div>
                            </React.Fragment>
                            : ''
                    }

                    {
                        forthDiv == true ?
                        <React.Fragment>
                            <div>   
                                <label>Instagram</label>
                                <Input className="form-custom" type="text" value={instagram} onChange={(e)=>setInstagram(e.target.value)} required/>
                                <label>Facebook</label>
                                <Input className="form-custom" type="text" value={facebook} onChange={(e)=>setFacebook(e.target.value)} required/>
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
                                <div className="tnc-section">
                                    <Label check>
                                        <Input type="checkbox" 
                                            checked={setuju}
                                            onChange={() => setSetuju(!setuju)}
                                        />
                                        <p>Dengan mendaftar untuk sebagai Vendor PlanKawen, saya mengaku sudah membaca serta bersetuju dengan <a href="/terma">Terma dan Syarat</a> yang telah ditetapkan</p>
                                    </Label>
                                </div>
                                <div className="position-button">
                                    <Button color="primary" className="btn-daftar" onClick={()=>{
                                            setThirdDiv(true)
                                            setForthDiv(false)
                                    }}>Kembali</Button>
                                    <Button color="primary" className="btn-daftar" onClick={()=>submitForm()}>{path == '/signup'?'Daftar Masuk':'Kemaskini'}</Button>
                                </div>
                            </div>
                        </React.Fragment>
                        : ''
                    } 
                </div>
            </div>
            
            <style jsx>{`
                a { margin-top: 10px;}
                .master-layout { padding: 0 !important;}
                .bg-color { background: rgb(244,244,244); background: linear-gradient(180deg, rgba(244,244,244,1) 80%, rgba(245,154,134,0.5732668067226891) 100%); height: 100vh; width: 100%; position: relative; }
                .logo-container { text-align: center; margin-bottom: 10px; }
                .logo-container > img { width: 300px; }
                .form-custom { border: 2px solid #EAEAEA; }
                .vendor-form-section { background-color: #FFF; padding: 20px; border-radius: 10px; max-width: 1020px; margin: auto; }
                .vendor-form-section > h3 { font-weight: bold;}
                .vendor-form-section { display: flex; align-items: center; justify-content: center;}
                .vendor-form-section > div { }
                .vendor-form { width: 50%; }
                .vendor-form > div { position: relative;}
                label { font-weight: 400; color: #47CBC4; font-size: 14px; margin: 10px 0px 0px 0; }
                .testing::after { content:"another word" !important; }
                .file-upload { position: relative; }
                .file-upload__label { display: block; padding: 7px; color: #fff; background: #F5F6FA; color: #3e3e3e; border-radius: 4px; border: 2px solid #EAEAEA; transition: background .3s; cursor: pointer;  height: 38px; margin: 0;}
                .file-upload__label:hover { cursor: pointer; background: #000; }
                .file-upload__input { position: absolute; left: 0; top: 0; right: 0; bottom: 0; font-size: 1; width:0; height: 100%; opacity: 0; }
                .position-button  { text-align: center; margin-top: 30px;}
                .kawasan-section { display: flex; flex-wrap: wrap;}
                .area-covered-div { margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .position-button > Button { background-color: #4bd19f; margin: 20px; }
                .tnc-section { font-size: 10px; padding: 10px 0px 0px 20px;}
                .login-cont { margin-top: 30px;}
                .login-cont > p { font-size: 13px;}
                .login-cont > p > span > a { color: #007bff; text-decoration: underline;}
            `}</style>
        </div>
    )
}

export default VendorForm
