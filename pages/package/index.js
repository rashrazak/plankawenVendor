import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label} from 'reactstrap';
import Head from '../../components/Headx'
import LoginContext from '../../contexts/LoginContext'
import { Router } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import Swal from 'sweetalert2'
import firebase from '../../config/firebaseConfig'


function Package(props) {
    const {user} = useContext(LoginContext);
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
                    'Kugiran',
                    'DoorGift',
                    'Others',]
    // const [allPackage, setallPackage] = useState([])
    const [serviceList, setserviceList] = useState([])
    const [packageName, setpackageName] = useState('')


    

    return (
        <Head title={'Package'}>
            <div>
                <h1>Package</h1>
            </div>
            <div>
                <Label>Add Package Name</Label>
            </div>
        </Head>
    )
}

export default Package