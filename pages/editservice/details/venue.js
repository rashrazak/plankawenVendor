import React, {useState} from 'react'
import Head from '../../../components/Headx'
import Step from '../../../components/StepByStep'
import '../../../css/venueform.css'
import '../../../css/about.css'
import VenueForm from '../../../components/services/formService/details/VenueForm'
function Venue(props) {

    return (
        <Head title={ 'edit Details'}>
            <div>
                <Step progress={1} />
            </div>
            <div>
                <VenueForm pagex={'editservice'} />
            </div>
        </Head>
    )
}

export default Venue