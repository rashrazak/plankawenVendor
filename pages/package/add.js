import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label} from 'reactstrap';
import Head from '../../components/Headx'
import LoginContext from '../../contexts/LoginContext'
import {PackageContext} from '../../contexts/PackageContext'
import { Router } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import Swal from 'sweetalert2'
import firebase from '../../config/firebaseConfig'
import PackageName from '../../components/package/formService/PackageName';
import PackageList from '../../components/package/formService/packageList';


function Package() {
    
    const [packageName, setpackageName] = useState('')
    const getName = (val) => {
        setpackageName(val)
    }

    return (
        <Head title={'Package'}>
            <div>
                <h1>Package</h1>
            </div>
            <PackageName name={packageName} getName={getName} />
            {
                packageName ?
                    <PackageList />
                : ''
            }
            
            
        </Head>
    )
}


export default Package