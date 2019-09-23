import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import MakeupForm from '../../../components/services/formService/details/MakeupForm'
function Makeup(props) {

    return (
        <Head title={ 'Add Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <MakeupForm />
            </div>
        </Head>
    )
}

export default Makeup