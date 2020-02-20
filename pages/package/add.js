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
    useEffect(() => {
        console.log(packageDetails)
    }, [packageDetails])

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
            <div>
                <h1>Package {packageDetails ? packageDetails.name : ''}</h1>
            </div>
            {
                showPackageDetails ? 
                <PackageName packageList={packageDetails} getPackage={setpackageDetails} setShowPackageDetails={setShowPackageDetails} />
                :
                <Button onClick={()=> setShowPackageDetails(!showPackageDetails)}>Update Package Details</Button>
            }
            
            {
                packageDetails ?
                    <React.Fragment>
                        {
                            showPackageImage ?
                                <PackageImage setShowPackageImage={setShowPackageImage} setpackageImage={setpackageImage} packageImage={packageImage} />
                            :<Button onClick={()=> setShowPackageImage(!showPackageImage)}>Update Package Image</Button>
                        }
                        <PackageList setPackageSelection={setPackageSelection} />
                    </React.Fragment>
                : ''
            }
        </Head>
    )
}


export default Package