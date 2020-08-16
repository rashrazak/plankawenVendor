import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import PackageUpload from '../../../components/package/PackageUpload'
function Upload(props) {

    return (
        <Head title={ 'Upload Details'}>
            <div>
                <Step progress={2} />
            </div>
            <div>
                <PackageUpload  pagex={'upload service'} />
            </div>
        </Head>
    )
}

export default Upload