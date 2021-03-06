import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import PelaminForm from '../../../components/services/formService/details/PelaminForm'
function Pelamin(props) {

    return (
        <Head title={ 'Edit Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <PelaminForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default Pelamin