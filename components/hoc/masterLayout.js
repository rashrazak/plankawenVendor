import React from 'react'

function masterLayout(WrappedComponent) {

    return (props) =>{
        return (
            <React.Fragment>
                <WrappedComponent {...props} />
            </React.Fragment>
        )
    }
    
}

export default masterLayout
