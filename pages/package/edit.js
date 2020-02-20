import React, {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import { Headx } from '../../components/Headx';
import '../../css/venueform.css'
import '../../css/about.css'
import firebase from '../../config/firebaseConfig'
import PackageName from '../../components/package/formService/PackageName';
import PackageList from '../../components/package/formService/PackageList';
import PackageImage from '../../components/package/formService/PackageImage';
import {Button,Table,Input,Label} from 'reactstrap';
import Swal from 'sweetalert2';


function edit() {
    const route = useRouter()
    const query = route.query.id || null;
    const [id, setId] = useState(null)
    const [datax, setData] = useState(null)
    const [packageDetails, setpackageDetails] = useState(null)
    const [showPackageDetails, setShowPackageDetails] = useState(true)
    const [showPackageImage, setShowPackageImage] = useState(true)
    const [packageImage, setpackageImage] = useState([])
    const [packageSelection, setPackageSelection] = useState(null)
    const [packageSelectionNew, setPackageSelectionNew] = useState(null)

    
    useEffect(() => {
        const getPackage = async() => {
            if (query && id == null ) {
                console.log(query)
                setId(route.query.id)
            }else{
                if (id) {
                    var x = await firebase.getPackageById(id)
                    setData(x.data())
                    var y = x.data();
                    console.log(y)
                    setpackageDetails(y.packageDetails)
                    setpackageImage(y.packageImage)
                    setPackageSelection(y.packageSelection)
                    Swal.close()
                }
            }    
        }
        Swal.showLoading()
        getPackage()
    }, [query, id])

    useEffect(() => {
        console.log(packageImage)
    }, [packageImage])

    useEffect(() => {
        console.log(packageDetails)
    }, [packageDetails])

    useEffect(() => {
        console.log(packageSelection)
    }, [packageSelection])

    useEffect(() => {
        const submitPackage = async () =>{
            if (packageSelectionNew != null) {
                console.log(datax)
                var images = packageImage
                let img = await firebase.getImagesPackage(images, datax.email)
                var data = await {
                    packageImage:img || null,
                    packageDetails,
                    packageSelection,
                    email:datax.email
                }
                setTimeout(() => {
                    let y = firebase.updatePackage(query, data)
                    y.then((x) => {
                        route.push('/package/view')
                    })
                    .catch((e) => {
                        console.log(e)
                    })
                }, 2000);
                
            }
        }
        submitPackage()
    }, [packageSelectionNew])
    return (
        <Headx title={'Edit Package'}>
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
                        <PackageList setPackageSelection={setPackageSelectionNew} packageSelection={packageSelection} />
                    </React.Fragment>
                : ''
            }
        </Headx>
    )
}

export default edit
