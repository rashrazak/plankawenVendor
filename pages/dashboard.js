import React, {useContext} from 'react'
import LoginContext from '../contexts/LoginContext'
import Head from '../components/Headx'

function dashboard() {
    const {user, signOut} = useContext(LoginContext);
    return (
        <Head title={ 'Vendor Dashboard'}>
            <h1>Welcome to PlanKawen Vendor {user.email}</h1>
            <button onClick={ signOut }>Log Out</button>
            <button>Add Service</button>
        </Head>
    )
}

export default dashboard
