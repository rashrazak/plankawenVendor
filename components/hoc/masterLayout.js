import React from 'react'
import '../../css/index.css'

function masterLayout(WrappedComponent) {

    return (props) =>{
        return (
            <React.Fragment>
                <div className="master-layout">
                    <WrappedComponent {...props} />
                </div>
            </React.Fragment>
        )
    }
    
}

export default masterLayout
