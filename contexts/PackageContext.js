import React,{createContext, useState, useEffect} from 'react'
import firebase from'../config/firebaseConfig'
// import sendEmail from'../config/emailConfig'
import * as ls from 'local-storage'
export const PackageContext = createContext();

const PackageContextProvider = (props) => {
    const [serviceListSelected, setServiceListSelected] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tnc, setTnc] = useState('')
    const [coveredArea, setCoveredArea] = useState([])
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1000)
    const [discount, setDiscount] = useState(0)
    const [oriPrice, setOriPrice] = useState(0)
    const [price, setPrice] = useState(0)
    const [packageId, setPackageId] = useState('')

    const [packagesAll, setPackagesAll] = useState([])
    const [editPackage, setEditPackage] = useState(null)

    // useEffect(() => {
    //     const getServ =  () => {
    //         if (serviceListSelected.length === 0 && ls('packageSelected')) {
    //             setServiceListSelected(ls.get('packageSelected'))
    //         }
    //     }

    //     getServ()
    // }, [serviceListSelected])

    useEffect(() => {
        if (images.length == 0  && ls('packageImages')) {
            let x = ls.get('packageImages')
            if (x.length > 0) {
                setImages(ls.get('packageImages'))
            }
        }
    }, [images])

    useEffect(() => {
        if (editPackage == null && ls('editPackage')) {
            setEditPackage(ls.get('editPackage'))
        }
    },[editPackage])

    const getAllPackages = async (email) =>{
        console.log(email)
        const pkg = await firebase.checkPackageType(email)
        pkg.forEach(function(doc) {
            let x = doc.id;
            let y = doc.data()
            let data = {...y, id:x}
            console.log(data)
            setPackagesAll((old) => [...old, data])
        })

    }

    const submitPackage = async () =>{

        const serviceListSelected = ls.get('packageSelected2')
        const quantity = ls.get('packageQuantity')
        const price = ls.get('packagePrice')
        const images = ls.get('packageImages')
        const title = ls.get('packageTitle')
        const description = ls.get('packageDescription')
        const coveredArea = ls.get('packageCoveredArea')
        const tnc = ls.get('packageTnc')

        let {id, email} = JSON.parse(localStorage.getItem('vendorDetails') )

        let img = await firebase.getImagesPackage(images, email)

        let data = {
            selectServices:serviceListSelected,
            title,
            description,
            tnc,
            coveredArea,
            images: img || [], 
            quantity, 
            discount,
            originalPrice:oriPrice, 
            totalPrice:price,
            dateCreated: new Date(),
            status:'pending',
            visibility:'show',
            email,
            vendorId:id
        }

        setTimeout(() => {
            let y = firebase.createPackage(data)
            y.then((x) => {
              console.log(x.id)
              data.packageId = x.id
              let y = firebase.updatePackage(x.id, data)
              y.then(async () => {
                // await sendEmail({
                //     email:data.email,
                //     type: 'package-created-admin',
                //     title: data.title,
                // })
                alert('success')
                window.location.href = `/package/add/done`;
                // Router.push(`/${pagex}/done`)
              })
              .catch((e) => {
                alert('error')
                console.log(e)
                window.location.reload()
              }) 
            })
            .catch((e) => {
              console.log(e)
            })
      
          },2000)
    }

    const editVisibility = (type) => {
        let pkg = editPackage
        setEditPackage(null)
        pkg.visibility = type
        setEditPackage(pkg)
    }

    const updatePackage = async () => {

        let {id, email} = JSON.parse(localStorage.getItem('vendorDetails') )
        let img = await firebase.getImagesPackage(images, email)
        let pkg = editPackage
        ls.set('editPackage', pkg)
        pkg.images = img
        setTimeout(() => {
            let y = firebase.updatePackage(pkg.packageId, pkg)
            y.then(() => {
                let y = firebase.updatePackage(pkg.packageId, pkg)
                y.then(() => {
                alert('success')
                location.reload();
                })
                .catch((e) => {
                alert('error')
                console.log(e)
                })
            })
            .catch((e) => {
                alert('error')
                console.log(e)
            })
        },2000)
    }


    const removeContext = () => {
        
    }

    return (
        <PackageContext.Provider value={{serviceListSelected, setServiceListSelected, 
        title, setTitle, description, setDescription, coveredArea, setCoveredArea,
         quantity, setQuantity, tnc, setTnc, images, submitPackage, setImages,discount, setDiscount, oriPrice, setOriPrice, price, setPrice,
         getAllPackages, packageId, setPackageId, packagesAll, editPackage, setEditPackage, editVisibility, updatePackage}}>
            {props.children} 
        </PackageContext.Provider>
    )
}

export default PackageContextProvider