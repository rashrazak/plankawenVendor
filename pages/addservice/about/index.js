import React from 'react'
import About from '../../../components/services/addServices/About'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import { useRouter } from 'next/router'
import '../../../css/venueform.css'
import '../../../css/about.css'
import AboutForm from '../../../components/services/formService/about/AboutForm'
function AddServiceAbout(props) {
    return (
        <Head title={ 'Add Services'}>
            <div>
                <Step progress={0} />
            </div>
            <div>
                <About />
                <AboutForm />   
            </div>
        </Head>
    )
}

export default AddServiceAbout