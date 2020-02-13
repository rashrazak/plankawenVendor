import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label} from 'reactstrap';
import Head from '../../components/Headx'
import LoginContext from '../../contexts/LoginContext'
import {PackageContext} from '../../contexts/PackageContext'
import { Router } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import firebase from '../../config/firebaseConfig'
import PackageName from '../../components/package/formService/PackageName';
import PackageList from '../../components/package/formService/PackageList';
import PackageImage from '../../components/package/formService/PackageImage';


function Package() {
    
    const [packageDetails, setpackageDetails] = useState(null)
    const [showPackageDetails, setShowPackageDetails] = useState(true)
    const [showPackageImage, setShowPackageImage] = useState(true)
    const [packageImage, setpackageImage] = useState([])
    
    const getImage = (val) => {
        setpackageImage(old =>[...old, val])
    }

    useEffect(() => {
        console.log(packageDetails)
    }, [packageDetails])

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
                                <PackageImage setShowPackageImage={setShowPackageImage} />
                            :<Button onClick={()=> setShowPackageImage(!showPackageImage)}>Update Package Image</Button>
                        }
                        <PackageList />
                    </React.Fragment>
                : ''
            }
        </Head>
    )
}


export default Package