import React, {useState} from 'react'
import Head from '../../components/Headx'
import Step from '../../components/StepByStep'
import '../../css/venueform.css'
import '../../css/about.css'
import DoneForm from '../../components/services/formService/done/DoneForm'

function review(props) {

    return (
        <Head title={'Review'}>
            <div>
                <Step progress={4} />
            </div>
            <div>
                <h1>Done</h1>
                <DoneForm />
            </div>
        </Head>
    )
}

export default review