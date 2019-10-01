import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import KadBannerForm from '../../../components/services/formService/details/KadBannerForm'
function KadBanner(props) {

    return (
        <Head title={ 'Add Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <KadBannerForm pagex={'addservice'} />
            </div>
        </Head>
    )
}

export default KadBanner