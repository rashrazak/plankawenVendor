import React, {useContext} from 'react'
import { Button} from 'reactstrap';
import Router from 'next/router';
import {PackageContext} from '../../contexts/PackageContext'
import Filebase64 from 'react-file-base64'
import * as ls from 'local-storage'

function PackageReview() {
    const {submitPackage} = useContext(PackageContext)
    return (
        <div>
            <h1>Review</h1>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => Router.back()}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => submitPackage()}>Next</Button>{' '}
            </div>
        </div>
    )
}

export default PackageReview
