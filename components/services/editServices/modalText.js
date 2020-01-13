import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddServiceContext from '../../../contexts/AddServiceContext'



function modalText(serviceType) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const {getServiceAbout, addServiceAbout} = useContext(AddServiceContext);
   
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


    // const serviceAbout = getServiceAbout();
    // const kawasan = getServiceAbout.areaCovered == null|| getServiceAbout.areaCovered == [] ? [] : getServiceAbout.areaCovered ;
    const [cityArray, setCityArray] = useState([]);
    const [descriptionx, setDescriptionx] = useState('');
    const [title, setTitle] = useState('');
    const [serviceTypex, setServiceTypex] = useState('')
    const [tnc, settnc] = useState('');
    const [extra, setextra] = useState('');

    useEffect(() => {
        // console.log(getServiceAbout)
        setServiceTypex(getServiceAbout.serviceType);
    }, [serviceType])

    useEffect(() =>{
        setCityArray(getServiceAbout.areaCovered);
        setDescriptionx(getServiceAbout.description);
        setTitle(getServiceAbout.serviceName);
        settnc(getServiceAbout.tnc)
        setextra(getServiceAbout.extra)
    },[getServiceAbout])

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

    const submitServiceAbout = () => {
        addServiceAbout(title , cityArray, descriptionx, tnc, extra)
        let aaa = serviceTypex.toLowerCase();
        Router.push(`/${pagex}/details/${aaa}`);
    }
    
    return (
        <div>
            <Button color="danger" onClick={toggle}>Text</Button>
            <Modal isOpen={modal} toggle={toggle} className=''>
                <ModalHeader toggle={toggle}>Update</ModalHeader>
                <ModalBody>
                <div className="form-service">
                    <div className="form-section">
                        <h4>Nama atau Tajuk Servis/Produk</h4>
                        <Input className="form-custom" type="text" name="text" id="titleService" placeholder="" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    </div>
                    <div className="form-section">
                        <h4>Description Servis/Produk (dengan lengkap)</h4>
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
                </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Simpan</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Kembali</Button>
                </ModalFooter>
            </Modal>
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

export default modalText
