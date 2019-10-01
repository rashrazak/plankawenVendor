import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import KugiranForm from '../../../components/services/formService/details/KugiranForm'
function Kugiran(props) {

    return (
        <Head title={'Edit Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <KugiranForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default Kugiran