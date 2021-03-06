import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import HantaranForm from '../../../components/services/formService/details/HantaranForm'
function Hantaran(props) {

    return (
        <Head title={'Add Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <HantaranForm pagex={'addservice'} />
            </div>
        </Head>
    )
}

export default Hantaran