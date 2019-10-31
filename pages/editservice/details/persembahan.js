import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import PersembahanForm from '../../../components/services/formService/details/PersembahanForm'
function Persembahan(props) {

    return (
        <Head title={'Edit Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <PersembahanForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default Persembahan