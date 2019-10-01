import React, {useState, useEffect, useContext} from 'react'
import About from '../../components/services/addServices/About'
import EditServiceLists from '../../components/services/formService/EditServiceLists'
import {Button} from 'reactstrap';
import Head from '../../components/Headx'
import { Router } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import Swal from 'sweetalert2'


function EditService(props) {
    const [serviceType, setServiceType] = useState('')
    const typeChange = (name) => {
        Swal.showLoading()
        setServiceType(name)
    }

    return (
        <Head title={ 'Add Services'}>
            <div>
                {/* <Step progress={0} /> */}
            </div>
            <div>
                <About typeChange={typeChange} />
                <EditServiceLists serviceType={serviceType} />   
            </div>
            <div className="form-service">
            
                {/* <div className="form-button">
                    <Button  className="btn-cancel" onClick={() => Router.push(`/dashboard`)}>Back</Button>{' '}
                    <Button  className="btn-next" onClick={() => Router.push(`/editservice/about`)}>Next</Button>{' '}
                </div> */}
                <style jsx>{`
                    .form-button { display: flex; justify-content: space-between; }
                    .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                    p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                    .form-section { margin: 20px 0; }
                    h4 { text-align: center; font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                    .area-covered-div { display: inline-block; margin-right: 10px; }
                    .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                    .area-covered-div > label > input { margin-right: 5px; }
                `}</style>
            </div>
        </Head>
    )
}

export default EditService