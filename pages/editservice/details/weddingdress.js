import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import WeddingDressForm from '../../../components/services/formService/details/WeddingDressForm'
function WeddingDress(props) {

    return (
        <Head title={ 'edit Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <WeddingDressForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default WeddingDress