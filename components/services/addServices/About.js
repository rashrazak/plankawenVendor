import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'reactstrap'
import AddServiceContext from '../../../contexts/AddServiceContext'

function About({typeChange}) {
    const {getServiceAbout, addServiceAboutTypeName} = useContext(AddServiceContext);
    const serviceType = getServiceAbout.serviceType;
    const selection = [
        {name:'Venue',isActive:false},
        {name:'Canopy',isActive:false},
        {name:'Kad & Banner',isActive:false},
        {name:'Weddingdress',isActive:false},
        {name:'Makeup',isActive:false},
        {name:'Photographer',isActive:false},
        {name:'Videographer',isActive:false},
        {name:'Pelamin',isActive:false},
        {name:'Caterer',isActive:false},
        {name:'Hantaran',isActive:false},
        {name:'Kugiran',isActive:false},
        {name:'Door Gift',isActive:false},
        {name:'Others',isActive:false},
    ]
    const [select, setSelect] = useState(selection)

    const eventSelection = (index) => {
        // setSelect(selection);
        setSelect(select[index].isActive = true) 
        const namex = select[index].name;
        addServiceAboutTypeName(namex)
        typeChange(namex)
    }

    useEffect(() => {
        console.log(serviceType)
        
    }, [getServiceAbout])

    useEffect(() => {
        return () => {
            setSelect(selection);
        };
    }, [eventSelection])

    return (
        <React.Fragment>
            <div className="row">
                <div className="container container-1">
                    <p>Please choose your category</p>
                    <div className="choose-category">
                        <Button onClick={() => eventSelection(0)} className={`btn-category btn-venue ${serviceType == 'Venue' ? 'btn-active':''} `}>Venue</Button>{' '}
                        {/* <Button onClick={() => eventSelection(1)} className={`btn-category btn-canopy ${serviceType == 'Canopy' ? 'btn-active':''} `}>Canopy</Button>{' '} */}
                        <Button onClick={() => eventSelection(2)} className={`btn-category btn-invitation ${serviceType == 'Kadbanner' ? 'btn-active':''} `}>Kad & Banner</Button>{' '}
                        <Button onClick={() => eventSelection(3)} className={`btn-category btn-dress ${serviceType == 'Weddingdress' ? 'btn-active':''} `}>Baju Pengantin</Button>{' '}
                        <Button onClick={() => eventSelection(4)} className={`btn-category btn-makeup ${serviceType == 'Makeup' ? 'btn-active':''} `}>Make Up</Button>{' '}
                        <Button onClick={() => eventSelection(5)} className={`btn-category btn-photo ${serviceType == 'Photographer' ? 'btn-active':''} `}>Photographer</Button>{' '}
                        <Button onClick={() => eventSelection(6)} className={`btn-category btn-video ${serviceType == 'Videographer' ? 'btn-active':''} `}>Videographer</Button>{' '}
                        <Button onClick={() => eventSelection(7)} className={`btn-category btn-pelamin ${serviceType == 'Pelamin' ? 'btn-active':''} `}>Pelamin</Button>{' '}
                        <Button onClick={() => eventSelection(8)} className={`btn-category btn-catering ${serviceType == 'Caterer' ? 'btn-active':''} `}>Caterer</Button>{' '}
                        <Button onClick={() => eventSelection(9)} className={`btn-category btn-hantaran ${serviceType == 'Hantaran' ? 'btn-active':''} `}>Hantaran</Button>{' '}
                        <Button onClick={() => eventSelection(10)} className={`btn-category btn-persembahan ${serviceType == 'Kugiran' ? 'btn-active':''} `}>Kugiran</Button>{' '}
                        <Button onClick={() => eventSelection(11)} className={`btn-category btn-doorgift ${serviceType == 'Doorgift' ? 'btn-active':''} `}>Door Gift</Button>{' '}
                        <Button onClick={() => eventSelection(12)} className={`btn-category btn-others ${serviceType == 'Others' ? 'btn-active':''} `}>Others</Button>{' '}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default About
