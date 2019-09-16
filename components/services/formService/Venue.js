import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Venue() {
    return (
        <div className="form-service">
            <div className="">
                <h4>Venue type</h4>
                <Label for="exampleSelect">Select</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </div>
        </div>
    )
}

export default Venue
