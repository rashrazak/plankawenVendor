import React, {useState, useEffect, useContext} from 'react'
import Router from 'next/router'
import LoginContext from '../../contexts/LoginContext'
import AddServiceContext from '../../contexts/AddServiceContext'
import {serviceContext} from '../../contexts/ServiceContext'
import {PackageContext} from '../../contexts/PackageContext'
import Swal from 'sweetalert2'
import * as ls from 'local-storage'
function uploadService() {
    const {user} = useContext(LoginContext)
    const {addServiceAbout,addServiceUpload,getServiceDetailsEdit, addServiceAboutTypeName, addServiceVisibility} = useContext(AddServiceContext)
    const {getAllPackages, packagesAll, editPackage, setEditPackage} = useContext(PackageContext)
    const {serviceList} = useContext(serviceContext)

    const [services, setServices] = useState(null)
    const [packages, setPackages] = useState(null)
    const [tempahan, setTempahan] = useState(null)
    const [type, setType] = useState('service')

    useEffect(() => {
        if(packagesAll.length === 0 && user){
            getAllPackages(user.email)
        }else{
            console.log(packagesAll)
            setPackages(packagesAll)
        } 
    },[packagesAll, user])

    const serviceType = ['Venue',
                    'Canopy',
                    'KadBanner',
                    'WeddingDress',
                    'Makeup',
                    'Photographer',
                    'Videographer',
                    'Pelamin',
                    'Caterer',
                    'Hantaran',
                    'Persembahan',
                    'DoorGift',
                    'Others']

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
        if (user && services == null) {
            Swal.showLoading()

            async function getData() {
               let x = await serviceList
               if (x) {
                console.log(x)
                setServices(x)
               }
               
            }

            async function getTempahan() {
                
                //need to sort venue and extra services

                // await serviceType.map( async (val,index) => {
                //     var read = await firebase.checkTempahanType(user.email)
                //     await read.forEach(function(doc) {
                //         let x = doc.id;
                //         let y = doc.data()
                //         let data = {...y, id:x}
                //         setPackages((old) => [...old, data])
                //     })
                // })
            }
            getData()
            getTempahan()
            Swal.close()

            
        }
    }, [user,serviceList])

    function setServiceFn(service){
        setType(service)
    }

    function addService(){
        Router.push('/addservice/about')
    }

    function addPackage(){
        Router.push('/package/add')
    }

    const editFunction = async (index) => {
        let sl = services[index]
        let st = sl.serviceType;
        let serv = 'addServiceDetails'+st;
        let id = sl.id;
        await addServiceAboutTypeName(st);
        await addServiceAbout(sl.serviceName, sl.areaCovered, sl.description, sl.tnc, sl.extra)
        await addServiceUpload(sl.images, st, id);
        await getServiceDetailsEdit(serv, sl.serviceDetails, id)
        if (sl.visibility != undefined) {
            await addServiceVisibility(sl.visibility)
        }
        // Router.push('/editservice/about')
        Router.push('/editservice/edit')

    }

    const editPackageFn = async (index) => {
        let pkg = packages[index]
        setEditPackage(pkg)
        ls.set('editPackage', pkg)
        Router.push('/package/update')


    }
    return (
        <div className={`upload-service-container`}>
            <div>
                <button className={type == 'service'?'btn btn-coral btn-active':'btn btn-coral'} onClick={()=>setServiceFn('service')}>Service Anda</button>
                <button className={type == 'package'?'btn btn-coral btn-active':'btn btn-coral'} onClick={()=>setServiceFn('package')}>Package Anda</button>
                <button className={type == 'tempahan'?'btn btn-coral btn-active':'btn btn-coral'} onClick={()=>setServiceFn('tempahan')}>Tempahan</button>
            </div>
            {
                type == 'service' ?
                <React.Fragment>
                    <h4>Service Anda</h4>
                    <div className={`card-flex`}>
                        {
                            services && services.map((v,i)=> {
                                let img;
                                if (v.images.length == 0 || v.images[0]['urlStorage'] == undefined) {
                                    img = '/images/placeholder/service-placheholder.png'
                                }else{
                                    img = v.images[0]['urlStorage']
                                }
                                return(
                                    <div key={i} className={`card-service`} onClick={()=>editFunction(i)}>
                                        <img src={img}/>
                                        <div className={`card-service-desc`}>
                                            <img className={`icon-service`} src={`/images/icon/services-icon/dark/${serviceIcon[v.serviceType]}`}/>
                                            <p>{v.serviceType} - {v.serviceName}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className={`card-service card-service-add`} onClick={()=> addService()}>
                        
                        </div>
                    </div>
                </React.Fragment>

                : type == 'package' ?
                <React.Fragment>
                    <h4>Package Anda</h4>
                    <div className={`card-flex`}>
                        {
                            packages && packages.map((v,i)=> {
                                let img;
                                if (v.images.length == 0 || v.images[0]['urlStorage'] == undefined) {
                                    img = '/images/placeholder/service-placheholder.png'
                                }else{
                                    img = v.images[0]['urlStorage']
                                }
                                return(
                                    <div key={i} className={`card-service`} onClick={()=>editPackageFn(i)}>
                                        <img src={img}/>
                                        <div className={`card-service-desc`}>
                                            <img className={`icon-service`} src={`/images/icon/black.png`}/>
                                            <p>{v.title}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className={`card-service card-service-add`} onClick={()=> addPackage()}>
                        
                        </div>
                    </div>
                </React.Fragment>
                :type == 'tempahan' ?
                <React.Fragment>
                    <h4>Tempahan Anda</h4>
                    <div className={`card-flex`}>
                        {
                            tempahan && tempahan.map((v,i)=> {
                                let img;
                                if (v.images.length == 0 || v.images[0]['urlStorage'] == undefined) {
                                    img = '/images/placeholder/service-placheholder.png'
                                }else{
                                    img = v.images[0]['urlStorage']
                                }
                                return(
                                    <div key={i} className={`card-service`} onClick={()=>editFunction(i)}>
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
                </React.Fragment>
                :''

            }
            
            <style jsx>{`
                h4 { color: #75848E; font-size: 14px; font-weight: normal;}
                .upload-service-container { margin-bottom: 15%;}
                .label-h4 { color: #3E3E3E; font-size: 16px; font-weight: normal;}
                .label-p { color: #9B9B9B; font-size: 12px; font-weight: normal;}
                .upload-service { display: flex; align-items: center;}
                .upload-service > span { display: block; width: 100px; height: 70px; background-image: url(/images/icon/plus-circle.png); background-repeat: no-repeat; background-position: center; background-size: 24px; background-color: #FFF; border-radius: 5px; border: 1px solid #BABABA; margin-right: 10px; cursor: pointer;}
                .upload-service p { margin: 0; font-size: 12px; color: #3E3E3E;}
                .upload-service p > span { margin-right: 5px;}
                .card-flex { display: flex; flex-wrap: wrap;}
                .card-service { border-radius: 5px; width: 150px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.2); margin-right: 10px; margin-bottom: 20px; background-color: #FFF; cursor: pointer;}                
                .card-service > img { object-fit: cover; width: 100%; height: 85px; object-position: center;}
                .card-service-desc {  background-color: #FFF; margin: 0; padding: 10px; border-radius: 0px 0px 5px 5px; display: flex; align-items: flex-start;}
                .card-service-desc > p {  font-style: normal; font-weight: 900;font-size: 0.75rem; color: #3E3E3E; margin: 0;}
                .card-service-desc > img {width: 15px; flex: 0 0 15px; margin-right: 15px;}            
                .card-service-add { width: 100px; background-color: #EBF9F8; cursor: pointer; height: 100px;}
                .card-service-add p { background-color: transparent;}
                .card-service-add { background-image: url(/images/icon/plus-circle-dark.png); background-repeat: no-repeat; background-position: center 50%;}
                .btn-coral { background-color: #f4f4f4; border-radius: 6px; font-weight: normal; font-size: 14px; color: #3E3E3E; margin-right: 6px; margin-bottom: 20px; margin-top: 10px;}
                .btn-coral.btn-active { background-color: #47CBC4; font-weight: bold; color: #FFF;}
                @media screen and (max-width: 480px){
                    .card-flex {
                        padding: 5px;
                    }
                }
            `}</style>
        </div>
    )
}

export default uploadService
