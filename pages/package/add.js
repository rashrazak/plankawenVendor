import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label} from 'reactstrap';
import Head from '../../components/Headx'
import LoginContext from '../../contexts/LoginContext'
import {PackageContext} from '../../contexts/PackageContext'
import { useRouter  } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import firebase from '../../config/firebaseConfig'
import PackageName from '../../components/package/formService/PackageName';
import PackageList from '../../components/package/formService/PackageList';
import PackageImage from '../../components/package/formService/PackageImage';



function Package() {
    const route = useRouter()
    const {user} = useContext(LoginContext)
    const [packageDetails, setpackageDetails] = useState(null)
    const [showPackageDetails, setShowPackageDetails] = useState(true)
    const [showPackageImage, setShowPackageImage] = useState(true)
    const [packageImage, setpackageImage] = useState([])
    const [packageSelection, setPackageSelection] = useState(null)
    const [email, setEmail] = useState(null)
    const [serviceTotal, setServiceTotal] = useState(false)
    const [serviceList, setServiceList] = useState([])
    const services = ['Venue',
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
    useEffect(() => {
        if (user) {
            var check = false;
            async function getData() {
                if (serviceList.length == 0) {
                    
                    await services.map( async (val,index) => {
                        if (index == (serviceList.length - 1) ) {
                            check = true
                        }
                        var read = await firebase.checkServiceType(val, user.email)
                        read.forEach(function(doc) {
                            let x = doc.id;
                            let y = doc.data()
                            
                            let data = {...y, id:x}
                            setServiceList((old) => [...old, data])
                        })
                        
                        
                    })
                    if (check == true) {
                        console.log(serviceList)
                        // if (serviceList.length == 0) {
                        //     alert('Empty service! Please create service')
                        //     route.push('/addservice/about')
                        // }
                    }    
                }
            }
            getData()
            console.log(serviceList)
            
        }
    }, [user, serviceList])
    useEffect(() => {
        if (serviceTotal == true) {
            
        }
    }, [serviceTotal])

    useEffect(() => {
        console.log(packageImage)
    }, [packageImage])

    useEffect(() => {
        if (user != null) {
            setEmail(user.email)
        }
    }, [user])

    useEffect(() => {
        const submitPackage = async () =>{
            if (packageSelection != null) {
                let images = packageImage
                let img = await firebase.getImagesPackage(images, email)

                let data = {
                    packageImage:img ? img : null,
                    packageDetails,
                    packageSelection,
                    email
                }
                let y = firebase.createPackage(data)
                y.then((x) => {
                    route.push('/package/view')
                })
                .catch((e) => {
                    console.log(e)
                })
            }
        }
        submitPackage()
    }, [packageSelection])

    return (
        <Head title={'Package'}>
            <div className={`container-layout`}>
            {
                serviceList.length > 0 ? 
                <div>
                    <div>
                        <h1>Package {packageDetails ? packageDetails.name : ''}</h1>
                    </div>
                    <div>
                        <PackageList setPackageSelection={setPackageSelection} setServiceTotal={setServiceTotal} serviceList={serviceList}/>
                        {
                            showPackageImage ?
                                <PackageImage setShowPackageImage={setShowPackageImage} setpackageImage={setpackageImage} packageImage={packageImage} />
                            :<Button onClick={()=> setShowPackageImage(!showPackageImage)}>Update Package Image</Button>
                        }
                    </div>
                    {
                        showPackageDetails ? 
                        <PackageName packageList={packageDetails} getPackage={setpackageDetails} setShowPackageDetails={setShowPackageDetails} />
                        :
                        <Button onClick={()=> setShowPackageDetails(!showPackageDetails)}>Update Package Details</Button>
                    }
                </div>
                : 
                <div className={`service-empty`}>
                    <p> Anda tiada servis buat masa kini. Sila klik <a href="/addservice/about">sini</a> untuk tambah servis.</p>
                </div>
            }
            </div>
            <style jsx>{`
                .container-layout { max-width: 950px; margin: 30px auto;}
                .service-empty {  background-color: #FEF2EB; box-shadow: 0 6px 10px 0 rgba(0,0,0,0.2); padding: 10px; max-width: 800px; margin: auto;}
                .service-empty p { margin: 0;}
                .service-empty a { color: #007bff; text-decoration: underline;}
            `}</style>

            
        </Head>
    )
}


export default Package