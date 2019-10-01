import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import VideographerForm from '../../../components/services/formService/details/VideographerForm'
function Videographer(props) {

    return (
        <Head title={ 'edit Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <VideographerForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default Videographer