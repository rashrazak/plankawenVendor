import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import AddServiceContext from '../../../contexts/AddServiceContext'
import '../../../css/modal.css'



function modalText(serviceType) {
    const [modal, setModal] = useState(false);

    const {addJenisEventOthers, getServiceAbout, addServiceAbout, getServiceDetailsOthers} = useContext(AddServiceContext);
   
    const gMapsCities = [
        // {state:'Johor', status:false},
        // {state:'Kedah', status:false},
        // {state:'Kelantan', status:false},
        // {state:'Melaka', status:false},
        // {state:'Negeri Sembilan', status:false},
        // {state:'Pahang', status:false},
        // {state:'Penang', status:false},
        // {state:'Perak', status:false},
        // {state:'Perlis', status:false},
        // {state:'Sabah', status:false},
        // {state:'Sarawak', status:false},
        {state:'Selangor', status:false},
        {state:'Kuala Lumpur', status:false},
        // {state:'Terengganu', status:false},
        // {state:'Labuan', status:false},
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
    const [jenisEventOthers, setjenisEventOthers] = useState('')

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
        console.log(getServiceDetailsOthers)
        
    },[getServiceAbout, getServiceDetailsOthers])

    useEffect(() => {
        if (serviceTypex == 'Others') {
            addJenisEventOthers(jenisEventOthers)
        }
    }, [jenisEventOthers])

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

    const toggle = () =>{
        addServiceAbout(title , cityArray, descriptionx, tnc, extra)
        setModal(!modal);        
    } 

    
    return (
        <div>
            <button className="btn btn-edit sidebar-modal-button" onClick={toggle}>Details</button>
            <Modal isOpen={modal} toggle={toggle} className="modal-design">
                <ModalHeader toggle={toggle}>Update</ModalHeader>
                <ModalBody>
                
                {
                    serviceTypex == 'Others' || getServiceAbout.serviceType == 'Others' && getServiceDetailsOthers ?
                    <div className="form-service">
                        
                        <div className="form-section" href="#" id="tooltipEvent">
                            <h4>Jenis Event</h4>
                            <FormGroup check>
                                <Label check>
                                    <Input className=" harga" type="radio" name="jenisEventOthers" value="makanan"  checked={getServiceDetailsOthers.jenisEvent == 'makanan' ? true : false} onChange={(e) => setjenisEventOthers(e.target.value)} />
                                    Makanan {jenisEventOthers}
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input className=" harga" type="radio" name="jenisEventOthers" value="dj" checked={ getServiceDetailsOthers.jenisEvent == 'dj' ? true : false} onChange={(e) => setjenisEventOthers(e.target.value)} />
                                    DJ
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input className=" harga" type="radio" name="jenisEventOthers" value="booth" checked={ getServiceDetailsOthers.jenisEvent == 'booth' ? true : false} onChange={(e) => setjenisEventOthers(e.target.value)} />
                                    Booth
                                </Label>
                            </FormGroup>
                        </div>
                        <UncontrolledTooltip placement="left" target="tooltipEvent">
                            Contoh: <br></br>
                            Makanan: Cendol, Ice Cream <br></br>
                            DJ: PA Sistem, Pengacara <br></br>
                            Booth: Photobooth, Insta booth
                        </UncontrolledTooltip>
                    </div>
                    :''

                }
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
                .modal-design { max-width: 700px;}
                .btn-edit { height: 45px; border-radius: 8px; color: #FFF; font-size: 14px; background-color: #75848E; font-weight: normal; width: 150px; margin-bottom: 10px;}
            `}</style>
        </div>
    )
}

export default modalText
