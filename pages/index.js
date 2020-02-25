import React, { useContext,useEffect } from 'react'
import Head from '../components/Headx'
import LoginContext from '../contexts/LoginContext'
import Login from '../components/Login';
import firebase from '../config/firebaseConfig'


function index() {
    const {user,saveVendorDetails} = useContext(LoginContext);

    useEffect( () => {
        async function getData(){
            if (user) {
                var read = await firebase.check(user.email)
                read.forEach(function(doc) {
                    let x = doc.id;
                    let y = doc.data()
                    //get vendor details
                    if (localStorage.getItem('vendorDetails') == null) {
                        saveVendorDetails(x, y)
                    }
                })
            }
        }
        getData()
    },[user])
    return (
        <Head title={'Hello Vendor'}>
            <div className="body-layout">
                <Login/>
            </div>
        </Head>
    )
}

export default index
