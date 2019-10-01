import React, {useState, useEffect, useContext} from 'react'
import About from '../../components/services/addServices/About'
import Head from '../../components/Headx'
import Step from '../../components/StepByStep'
import { useRouter } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import AboutForm from '../../components/services/formService/about/AboutForm'
import AddServiceContext from '../../contexts/AddServiceContext'
import BackAndNext from '../../components/buttons/BackAndNext'
function EditService(props) {
    const {getServiceAbout} = useContext(AddServiceContext)
    const [serviceType, setServiceType] = useState('')

    useEffect(() => {
        let x = getServiceAbout;
        let st = x.serviceType;
        setServiceType(st)
    }, [getServiceAbout])
    return (
        <Head title={ 'Edit Services'}>
            <div>
                <Step progress={0} />
            </div>
            <div>
                <AboutForm serviceType={serviceType} pagex={'editservice'} />   
            </div>
        </Head>
    )
}

export default EditService