import React from 'react'
import Stepper from 'react-stepper-horizontal'

function StepByStep({progress}) {
    return (
        <div>
            <Stepper steps={ [{title: 'About'}, {title: 'Details'}, {title: 'Upload'},{title: 'Confirm'}] } activeStep={ progress } />
        </div>
    )
}

export default StepByStep
