import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import CatererForm from '../../../components/services/formService/details/CatererForm'
function Caterer(props) {

    return (
        <Head title={'Edit Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <CatererForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default Caterer