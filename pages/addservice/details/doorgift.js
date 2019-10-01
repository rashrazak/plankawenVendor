import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import DoorGiftForm from '../../../components/services/formService/details/DoorGiftForm'
function DoorGift(props) {

    return (
        <Head title={'Add Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <DoorGiftForm pagex={'addservice'} />
            </div>
        </Head>
    )
}

export default DoorGift