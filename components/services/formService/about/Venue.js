import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import '../../../../css/venueform.css'

function Venue() {
    return (
        <div className="form-service">
            <div className="form-section">
                <h4>Type</h4>
                <div className="checkbox-type">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            <p>Nikah</p>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            <p>Walimah</p>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            <p>Outdoor</p>
                        </Label>
                    </FormGroup>
                </div>
            </div>
            <div className="form-section">
                <h4>Add title to your service</h4>
                <Input className="form-custom" type="text" name="text" id="titleService" placeholder="" />
            </div>
            <div className="form-section">
                <h4>Description for your service</h4>
                <Input className="form-custom" type="textarea" name="text" id="descService" />
            </div>
            <div className="form-button">
                <Button  className="btn-cancel">Cancel</Button>{' '}
                <Button  className="btn-next">Next</Button>{' '}
            </div>
            <style jsx>{`
                .form-button { display: flex; justify-content: space-between; }
                .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                .form-section { margin: 20px 0; }
                h4 { text-align: center; font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
            `}</style>
        </div>
    )
}

export default Venue
