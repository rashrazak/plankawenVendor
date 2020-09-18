import React,{useEffect, useState, useContext} from 'react'
import { Button, Form, FormGroup, Table, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import '../../css/modal.css'
import {PackageContext} from '../../contexts/PackageContext'
import PackageEdit from './PackageEdit'
import * as ls from 'local-storage'
import {serviceContext} from '../../contexts/ServiceContext'
import { useRouter  } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'

function PackageEditAbout() {
    const [modal, setModal] = useState(false);

    
    const route = useRouter()
    const {serviceList} = useContext(serviceContext)
    const {serviceListSelected, setServiceListSelected, title, setTitle, description, setDescription, coveredArea, setCoveredArea, tnc, setTnc, setEditPackage, editPackage, quantity, setQuantity, discount, setDiscount, oriPrice, setOriPrice, price, setPrice} = useContext(PackageContext)
  
    const [service, setService] = useState(null)
    const [serviceSelect, setServiceSelect] = useState(null)

    useEffect(() => {
        const getServ = async () => {
            if (!service || !serviceList) {
                let x = await serviceList
                setService(x)
            }
        }

        getServ()

       
    }, [service])

    useEffect(() => {
        if (editPackage) {
            setTitle(editPackage.title)
            setCoveredArea([...editPackage.coveredArea])
            setDescription(editPackage.description)
            setServiceListSelected([...editPackage.selectServices])
            setServiceSelect([...editPackage.selectServices])
            setTnc(editPackage.tnc)
            setQuantity(parseInt(editPackage.quantity))
            setOriPrice(parseFloat(editPackage.originalPrice) )
            setPrice(parseFloat(editPackage.totalPrice))
            setDiscount(parseInt(editPackage.discount))
        }
    },[editPackage])

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

    const serviceIcon = { Venue: 'ico-venue.png', 
                        Canopy: 'ico-canopy.png', 
                        KadBanner: 'ico-cards.png',
                        WeddingDress: 'ico-dress.png',
                        Makeup: 'ico-makeup.png',
                        Photographer: 'ico-photography.png', 
                        Videographer: 'ico-videography.png',
                        Pelamin: 'ico-pelamin.png', 
                        Caterer: 'ico-catering.png',
                        Hantaran: 'ico-hantaran.png',
                        Persembahan: 'ico-performance.png',
                        DoorGift: 'ico-goodiebag.png',
                        Others: 'ico-others.png'}
    
    


    const handleChangeKawasan = (e) => {
        let name = e.target.name;
        let check = e.target.checked;
        let x = coveredArea;
        if (check) {
            setCoveredArea(old =>[...old, name])
        }else{
            let index = coveredArea.indexOf(name);
            x.splice(index,1);
            setCoveredArea([...x]);
        }
    }
``
    const selectFunction = (i) =>{
        let data = service
        setServiceSelect(old => [...old, data[i] ])
    }

    // const deleteFunction = (name, type, i) =>{
    //     let data = service
    //     setServiceSelect(old => old.filter(v => v.serviceName != name && v.serviceType != type))
    // }

    const deleteFunction = (id) =>{
        setServiceSelect(old => old.filter(v => v.id != id))
    }
    


  

    useEffect(() => {
        console.log(quantity)
        if (service) {
            calculatePrice(serviceSelect, quantity)
        }
    }, [quantity])



    useEffect(() => {
        if (price && oriPrice) {

            if (price < oriPrice) {
                let perc = parseFloat(price) / parseFloat(oriPrice)
                let disc = 100 - (perc * 100)
                console.log(disc)
                setDiscount(disc.toFixed(0))
            }else {
                setDiscount('Tiada Diskaun')

            }
        }
    }, [price])
    useEffect(() => {},[discount])

    useEffect(() => {
        calculatePrice(serviceListSelected, quantity)
    },[serviceListSelected])

    useEffect(() => {
        if (service) {
            calculatePrice(serviceSelect, quantity)
        }
    },[serviceSelect])

    const returnValue = (data, index, price) =>{
        let service = serviceSelect

        if (data.serviceType == 'Makeup') {
            let makeup = service[index]
            makeup.serviceDetails.hargaTouchup = price.hargaTouchup || 0
            makeup.serviceDetails.hargaFull = price.hargaFull || 0
            service[index] = makeup
            
        }else if (data.serviceType == 'KadBanner'){

            let kadbanner = service[index]
            kadbanner.serviceDetails.hargaPerPerson = price.hargaPerPerson || 0
            if (data.serviceDetails.banner == true) {
                kadbanner.serviceDetails.bannerDesc.bannerSize = price.banner
            }
            service[index] = kadbanner
        }else if (data.serviceType == 'Hantaran' || data.serviceType == 'Caterer' || data.serviceType == 'DoorGift'){
            let random = service[index]
            random.serviceDetails.hargaPerPerson =  price.hargaPerPerson || 0
            service[index] = random
    
        }else if (data.serviceType == 'Photographer' || data.serviceType == 'Videographer' || data.serviceType == 'WeddingDress' || data.serviceType == 'Pelamin' || data.serviceType == 'Others' || data.serviceType == 'Venue'){
            let fix = service[index]
            fix.serviceDetails.harga =  price.harga || 0
            service[index] = fix
        }
        //sambung
        setServiceListSelected([...service])
        setServiceSelect([...service])
        calculatePrice(service, quantity)
    }

    const calculatePrice = (service, quan) =>{
        var qty = quan
        var serviceAll = service
        var orip = 0
        console.log(serviceAll)
        serviceAll.map((v,i)=>{
            if (v.serviceType == 'Makeup') {
                let makeup = v

                orip += parseInt( makeup.serviceDetails.hargaTouchup )
                orip += parseInt( makeup.serviceDetails.hargaFull )
                
            }else if (v.serviceType == 'KadBanner'){

                let kadbanner = v
                if (qty > 0) {
                    console.log(qty)
                    orip = orip + (parseFloat( kadbanner.serviceDetails.hargaPerPerson ) * qty)
                    console.log(kadbanner)
                }
                if (v.serviceDetails.banner == true) {
                    let banner = kadbanner.serviceDetails.bannerDesc.bannerSize
                    banner.map((val, index)=>{
                        orip += parseInt( val.harga )
                    })
                }
            }else if (v.serviceType == 'Hantaran' || v.serviceType == 'Caterer' || v.serviceType == 'DoorGift'){
                let random = v
                if (qty > 0) {
                    orip = orip +  (parseInt( random.serviceDetails.hargaPerPerson ) * qty)
                }
        
            }else if (v.serviceType == 'Photographer' || v.serviceType == 'Videographer' || v.serviceType == 'WeddingDress' || v.serviceType == 'Pelamin' || v.serviceType == 'Others' || v.serviceType == 'Venue'){
                let fix = v

                orip += parseInt( fix.serviceDetails.harga )
                
            }

            if (i == (serviceAll.length - 1) ) {
                console.log(orip)
                setOriPrice(orip.toFixed(2))
            }
        })
        
    }

    const toggle = () =>{
        
        let pkg = editPackage
        pkg.quantity = quantity
        pkg.discount = discount
        pkg.description = description
        pkg.tnc = tnc
        pkg.coveredArea = coveredArea
        pkg.totalPrice = price
        pkg.originalPrice = oriPrice
        pkg.dateUpdated = new Date()
        pkg.title = title
        pkg.selectServices = serviceSelect

        setEditPackage(pkg)
        ls.set('editPackage', pkg)
        // setModal(!modal);  
        alert('Success: Sila simpan ke DB')
        location.reload()      
    }

    const revert = () => {
        //revert back to default
        setTitle(editPackage.title)
        setCoveredArea([...editPackage.coveredArea])
        setDescription(editPackage.description)
        setServiceListSelected([...editPackage.selectServices])
        setServiceSelect([...editPackage.selectServices])
        setTnc(editPackage.tnc)
        setQuantity(parseInt(editPackage.quantity))
        setOriPrice(parseFloat(editPackage.originalPrice) )
        setPrice(parseFloat(editPackage.totalPrice))
        setDiscount(parseInt(editPackage.discount))
        setModal(!modal)
    }

    return (
        <div>
            <button className="btn btn-edit sidebar-modal-button" onClick={()=>setModal(!modal)}>About</button>
            <Modal isOpen={modal} toggle={()=>setModal(!modal)} className="modal-design">
                <ModalHeader toggle={()=>setModal(!modal)}>Update</ModalHeader>
                <ModalBody>
                    <div className={`container-layout`}>
                    {
                        serviceList && service && serviceSelect ? 
                        <div>
                            <React.Fragment>
                                <h4>Sila pilih servis untuk package anda</h4>
                                <div className={`card-flex`}>
                                    {
                                        service && service.map((v,i)=> {
                                            if (v.serviceType != 'Pelamin' && v.serviceType != 'Hantaran') {
                                                let name = v.serviceName
                                                let type = v.serviceType
                                                let avail = false

                                                let found = false;
                                                for(let i = 0; i < serviceSelect.length; i++) {
                                                    if (serviceSelect[i].id == v.id) {
                                                        found = true;
                                                        break;
                                                    }
                                                }
                                               
                                                let img;
                                                if (v.images.length == 0 || v.images[0]['urlStorage'] == undefined) {
                                                    img = '/images/placeholder/service-placheholder.png'
                                                }else{
                                                    img = v.images[0]['urlStorage']
                                                }
                                                return(
                                                    <div key={i} className={ found ? 'card-service active-card':'card-service'} onClick={()=> found ? deleteFunction(v.id):selectFunction(i)}>
                                                        <img src={img}/>
                                                        <div className={`card-service-desc`}>
                                                            <img className={`icon-service`} src={`/images/icon/services-icon/dark/${serviceIcon[v.serviceType]}`}/>
                                                            <p>{v.serviceType} - {v.serviceName}</p>
                                                        </div>
                                                    </div>
                                                )    
                                            }

                                        })
                                    }
                                    
                                </div>
                                <div  className="total-service">
                                    <p>Minimum servis untuk pakej (2): {serviceListSelected ? serviceListSelected.length : 0}</p>
                                </div>
                                <div className="form-service">
                                    <div className="form-section">
                                        <h4>Nama atau Tajuk Pakej</h4>
                                        <Input className="form-custom" type="text" name="text" id="titleService" placeholder="" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                                    </div>
                                    <div className="form-section">
                                        <h4>Tentang Pakej</h4>
                                        <Input className="form-custom" type="textarea" name="text" placeholder={'Pakage yang lumayan tahun ini, rebut sekarang dan dapatkan tempahan tarikh anda sebelum penuh.'} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                    </div>
                                    <div className="form-section">
                                        <h4>Terma dan Syarat</h4>
                                        <Input className="form-custom" type="textarea" name="text" placeholder={'Syarat dan peraturan'} value={tnc} onChange={(e) => { setTnc(e.target.value) }} />
                                    </div>
                                    <div className="form-section">
                                        <h4> Lokasi Jangkauan</h4>
                                        {gMapsCities.map( (cty, index) =>{
                                            let bandar = cty.state;
                                            let chckd  = false;
                                            if (coveredArea != null) {
                                                chckd = coveredArea.includes(bandar) ? true : false;
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
                            </React.Fragment>

                        </div>
                        : 
                        <div className={`service-empty`}>
                            <p> Anda tiada servis buat masa kini. Sila klik <a href="/addservice/about">sini</a> untuk tambah servis.</p>
                        </div>
                    }
                    {
                        serviceListSelected.length >= 1 ?
                        <div className="form-service">
                            
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama Servis</th>
                                        <th>Kategori</th>
                                        <th>Harga / unit</th>
                                        <th>Edit Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        serviceSelect && serviceSelect.map((v,i)=>{
                                            return(
                                                <tr key={i}>
                                                    <PackageEdit  returnValue={returnValue} data={v} indexList={i}/>
                                                </tr>
                                            )
                                        })
                                    }  
                                </tbody>
                            </table>
                            <div className="form-section">
                                <h4>sila masukkan minimum kuantiti  </h4>
                                <Input className="form-custom" type="number" placeholder="" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                            </div>
                            {/* <div className="form-section">
                                <h4>Harga Diskaun</h4>
                                <Input className="form-custom" type="number" placeholder="" value={price} onChange={(e) => {setPrice(e.target.value)}} />
                            </div> */}
                            <div className="form-section">
                                <p>Harga Pakej: RM {oriPrice}</p>
                                {/* <p>Harga Diskaun Baharu: RM {price}</p> 
                                <p>Jumlah Diskaun: % {discount}</p>   */}
                            </div>
                        </div>
                        :
                        <h3>Sila pilih service anda untuk melakukan pengiraan</h3>
                    }
                    </div>
                
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>toggle()}>Update</Button>
                    <Button color="secondary" onClick={()=>revert()}>Cancel</Button>
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
                .form-button { display: flex; justify-content: space-between; }
                .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                .form-section { margin: 20px 0; }
                h4 { text-align: center; font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                .area-covered-div { display: inline-block; margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .container-layout { max-width: 800px; margin: 30px auto;}
                .service-empty {  background-color: #FEF2EB; box-shadow: 0 6px 10px 0 rgba(0,0,0,0.2); padding: 10px; max-width: 800px; margin: auto;}
                .service-empty p { margin: 0;}
                .service-empty a { color: #007bff; text-decoration: underline;}
                .card-flex { display: flex; flex-wrap: wrap; margin-top: 20px;}
                .card-service { border-radius: 5px; width: 150px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.2); margin-right: 10px; margin-bottom: 20px; background-color: #FFF; cursor: pointer; transition: all .3s}                
                .card-service > img { object-fit: cover; width: 100%; height: 85px; object-position: center;}
                .card-service-desc { margin: 0; padding: 10px; border-radius: 0px 0px 5px 5px; display: flex; align-items: flex-start;}
                .card-service-desc > p {  font-style: normal; font-weight: 900;font-size: 0.75rem; color: #3E3E3E; margin: 0;}
                .card-service-desc > img {width: 15px; flex: 0 0 15px; margin-right: 15px;}            
                .card-service-add { width: 100px; background-color: #EBF9F8; cursor: pointer; height: 100px;}
                .card-service-add p { background-color: transparent;}
                .card-service-add { background-image: url(/images/icon/plus-circle-dark.png); background-repeat: no-repeat; background-position: center 50%;}
                .active-card {  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1); position: relative;}
                .active-card:before { position: absolute; content: ''; width: 100%; height: 100%; background-color: rgba(234, 91, 59, 0.590308); top: 0; left: 0; background-image: url('/images/icon/check.png'); background-position: center; background-repeat: no-repeat; border-radius: 4px; transition: all .3s}
                .total-service { text-align: center;}
                .total-service > p { font-style: normal; font-weight: normal;font-size: 12px;color: #75848E;}
            `}</style>
        </div>
    )
}

export default PackageEditAbout
