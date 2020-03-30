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
            <div className={`height-layout`}>
                {/* <h1>Done</h1> */}
                <DoneForm pagex={'addservice'} />
            </div>
            <style jsx>{`
                .height-layout { height: calc(100vh - 340px);}
            `}</style>
        </Head>
    )
}

export default review