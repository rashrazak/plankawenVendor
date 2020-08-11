import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label} from 'reactstrap';
import Head from '../../../components/Headx'
import {PackageContext} from '../../../contexts/PackageContext'
import {serviceContext} from '../../../contexts/ServiceContext'
import { useRouter  } from 'next/router'
import '../../../css/venueform.css'
import '../../../css/about.css'
import Step from '../../../components/StepByStep'



function Package() {
    const route = useRouter()
    const {serviceList} = useContext(serviceContext)
    const {serviceListSelected, setServiceListSelected, title, setTitle, description, setDescription, coveredArea, setCoveredArea} = useContext(PackageContext)
  
    const [service, setService] = useState(null)

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
    
    useEffect(() => {
        const getServ = async () => {
            if (!service && serviceList) {
                let x = await serviceList
                setService(x)
            }else if(!serviceList){
                route.push('/dashboard')
            }
        }

        getServ()
        
    }, [service])



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

    const selectFunction = (i) =>{
        let data = service
        setServiceListSelected(old => [...old, data[i] ])
    }

    const deleteFunction = (i) =>{
        let data = service
        setServiceListSelected(old => old.filter(v => v != data[i]))
    }

    return (
        <Head title={'Package'}>
            <div className={`container-layout`}>
            {
                serviceList && service ? 
                <div>
                    <div>
                        <Step progress={0} />
                    </div>

                    <React.Fragment>
                        <h4>Please select which service you would like to add to your package</h4>
                        <div className={`card-flex`}>
                            {
                                service && service.map((v,i)=> {
                                    let img;
                                    if (v.images.length == 0 || v.images[0]['urlStorage'] == undefined) {
                                        img = '/images/placeholder/service-placheholder.png'
                                    }else{
                                        img = v.images[0]['urlStorage']
                                    }
                                    return(
                                        <div key={i} className={ serviceListSelected.includes(v) ? 'card-service active-card':'card-service'} onClick={()=> serviceListSelected.includes(v) ? deleteFunction(i):selectFunction(i)}>
                                            <img src={img}/>
                                            <div className={`card-service-desc`}>
                                                <img className={`icon-service`} src={`/images/icon/services-icon/dark/${serviceIcon[v.serviceType]}`}/>
                                                <p>{v.serviceType} - {v.serviceName}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div  className="total-service">
                            <p>Please select more than one. Total: {serviceListSelected ? serviceListSelected.length : 0}</p>
                        </div>
                        <div className="form-service">
                            <div className="form-section">
                                <h4>Nama atau Tajuk Package</h4>
                                <Input className="form-custom" type="text" name="text" id="titleService" placeholder="" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                            </div>
                            <div className="form-section">
                                <h4>Description Package</h4>
                                <Input className="form-custom" type="textarea" name="text" placeholder={'Pakage yang lumayan tahun ini, rebut sekarang dan dapatkan tempahan tarikh anda sebelum penuh.'} value={description} onChange={(e) => { setDescription(e.target.value) }} />
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
            </div>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => route.back()}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => route.push('/package/add/details')}>Next</Button>{' '}
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
        </Head>
    )
}


export default Package