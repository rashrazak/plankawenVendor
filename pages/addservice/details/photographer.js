import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import PhotographerForm from '../../../components/services/formService/details/PhotographerForm'
function Photographer(props) {

    return (
        <Head title={ 'Add Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <PhotographerForm pagex={'addservice'} />
            </div>
        </Head>
    )
}

export default Photographer