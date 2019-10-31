import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import OthersForm from '../../../components/services/formService/details/OthersForm'
function Others(props) {

    return (
        <Head title={ 'Add Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <OthersForm pagex={'addservice'} />
            </div>
        </Head>
    )
}

export default Others