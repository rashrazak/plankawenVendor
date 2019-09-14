import React from 'react'

function masterLayout(wrappedComponent) {

    return (props) =>{
        return (
            <React.Fragment>
                <wrappedComponent {...props} />
            </React.Fragment>
        )
    }
    
}

export default masterLayout
