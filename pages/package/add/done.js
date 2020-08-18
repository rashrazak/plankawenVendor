import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import DoneForm from '../../../components/services/formService/done/DoneForm'

function done(props) {

    return (
        <Head title={'Done'}>
            <div>
                <Step progress={4} />
            </div>
            <div>
                {/* <h1>Done</h1> */}
                <DoneForm pagex={'package'} />
            </div>
        </Head>
    )
}

export default done