import React, {useContext, useEffect, useState} from 'react'
import LoginContext from '../contexts/LoginContext'
import Head from '../components/Headx'

function dashboard() {
    const {user,signOut} = useContext(LoginContext);
   
    useEffect(() => {
        console.log(user)
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
