import React from 'react'
import About from '../../../components/services/addServices/About'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/about.css'

function AddServiceAbout(props) {
    return (
        <Head title={ 'Add Services'}>
            <div>
                <Step progress={0} />
            </div>
            <div>
                <About />
                {props.children}  
            </div>
        </Head>
    )
}

export default AddServiceAbout