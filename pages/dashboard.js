import React, {useContext, useEffect, useState} from 'react'
import LoginContext from '../contexts/LoginContext'
import firebase from '../config/firebaseConfig'
import Head from '../components/Headx'

function dashboard() {
    const {user,signOut,saveVendorDetails} = useContext(LoginContext);

    const [docId, setdocId] = useState('')
    const [details, setdetails] = useState({})
   
    useEffect( () => {
        async function getData(){
            if (user) {
                var read = await firebase.check(user.email)
                read.forEach(function(doc) {
                    // setdocId(doc.id)
                    // setdetails(doc.data())
                    let x = doc.id;
                    let y = doc.data()
                    saveVendorDetails(x, y)
                })
            }
        }
        getData()
    },[user])

    return (
        user ?
        <Head title={ 'Vendor Dashboard'}>
            {user.email}
            <button onClick={ signOut }>Log Out</button>
            <button>Add Service</button>
           
        </Head>
        :
        <Head title={ 'Vendor Dashboard'}>
            {/* {user.email}
            <button onClick={ signOut }>Log Out</button>
            <button>Add Service</button> */}
        </Head>
    )
   
}


export default dashboard
