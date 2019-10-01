import React from 'react'

function BackAndNext({back, next}) {
    return (
        <div>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => Router.push(`/addservice/details/${serviceType.toLowerCase()}`)}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => submitServiceUpload()}>Next</Button>{' '}
            </div>        
        </div>
    )
}

export default BackAndNext
