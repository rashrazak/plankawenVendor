import React, {useState} from 'react'
import Head from '../../components/Headx'
import Step from '../../components/StepByStep'
import '../../css/venueform.css'
import '../../css/about.css'
import ReviewForm from '../../components/services/formService/review/ReviewForm'
function review(props) {

    return (
        <Head title={'Review'}>
            <div>
                <Step progress={3} />
            </div>
            <div>
                <ReviewForm pagex={'addservice'} />
            </div>
        </Head>
    )
}

export default review