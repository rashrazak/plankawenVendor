import React, {useState} from 'react'
import Head from '../../components/Headx'
import Step from '../../components/StepByStep'
import '../../css/venueform.css'
import '../../css/about.css'
import UploadForm from '../../components/services/formService/upload/UploadForm'
function Upload(props) {

    return (
        <Head title={ 'edit Details'}>
            <div>
                <Step progress={2} />
            </div>
            <div>
                <UploadForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default Upload