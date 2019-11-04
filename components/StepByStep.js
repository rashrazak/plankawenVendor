import React from 'react'
import Stepper from 'react-stepper-horizontal'

function StepByStep({progress}) {
    return (
        <div className="stepper-div">
            <Stepper steps={ [{title: 'About'}, {title: 'Details'}, {title: 'Upload'},{title: 'Review'},{title: 'Done'}] } activeStep={ progress } />
            <style jsx>{`
                .stepper-div { max-width: 700px; margin: 30px auto; }
            `}</style>
        </div>
    )
}

export default StepByStep
