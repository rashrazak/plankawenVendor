import React, {useState, useEffect, useContext} from 'react'
import {Button,Table,Input,Label} from 'reactstrap';
import '../../../css/venueform.css'
import '../../../css/about.css'

import { PackageContext } from '../../../contexts/PackageContext';

function PackageName({name, getName}) {

    const {packageNameFunction} = useContext(PackageContext)

    const addName = () => {
        packageNameFunction(name)
    }
  
    return (
        <div>
            <Label>Add Package Name {name}</Label>
            <Input type="text"  onBlur={(e) => getName(e.target.value)} />
            <Button color="primary" onClick={addName} >Confirm</Button>
        </div>
    )
}


export default PackageName