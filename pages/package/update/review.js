import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import PackageReview from '../../../components/package/PackageReview'
function Upload(props) {

    return (
        <Head title={ 'Update Details'}>
            <div>
                <Step progress={2} />
            </div>
            <div>
                <PackageReview  pagex={'update review'} />
            </div>
        </Head>
    )
}

export default Upload