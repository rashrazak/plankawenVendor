import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link';
import { Button } from 'reactstrap'
import { useRouter } from 'next/router'
import AddServiceContext from '../../../contexts/AddServiceContext'

function About(props) {
    const {getServiceAbout} = useContext(AddServiceContext);
    const serviceName = getServiceAbout.serviceName;
    const selection = [
        {name:'Venue',isActive:false},
        {name:'Canopy',isActive:false},
        {name:'Kad & Banner',isActive:false},
        {name:'Baju Pengantin',isActive:false},
        {name:'Make Up',isActive:false},
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
        console.log(select)
    }

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
                        <Button onClick={() => eventSelection(0)} className={`btn-category btn-venue ${serviceName == 'Venue' ? 'btn-active':''} `}>Venue</Button>{' '}
                        <Button onClick={() => eventSelection(1)} className={`btn-category btn-canopy ${serviceName == 'Canopy' ? 'btn-active':''} `}>Canopy</Button>{' '}
                        <Button onClick={() => eventSelection(2)} className={`btn-category btn-invitation ${serviceName == 'Kad & Banner' ? 'btn-active':''} `}>Kad & Banner</Button>{' '}
                        <Button onClick={() => eventSelection(3)} className={`btn-category btn-dress ${serviceName == 'Baju Pengantin' ? 'btn-active':''} `}>Baju Pengantin</Button>{' '}
                        <Button onClick={() => eventSelection(4)} className={`btn-category btn-makeup ${serviceName == 'Make Up' ? 'btn-active':''} `}>Make Up</Button>{' '}
                        <Button onClick={() => eventSelection(5)} className={`btn-category btn-photo ${serviceName == 'Photographer' ? 'btn-active':''} `}>Photographer</Button>{' '}
                        <Button onClick={() => eventSelection(6)} className={`btn-category btn-video ${serviceName == 'Videographer' ? 'btn-active':''} `}>Videographer</Button>{' '}
                        <Button onClick={() => eventSelection(7)} className={`btn-category btn-pelamin ${serviceName == 'Pelamin' ? 'btn-active':''} `}>Pelamin</Button>{' '}
                        <Button onClick={() => eventSelection(8)} className={`btn-category btn-catering ${serviceName == 'Caterer' ? 'btn-active':''} `}>Caterer</Button>{' '}
                        <Button onClick={() => eventSelection(9)} className={`btn-category btn-hantaran ${serviceName == 'Hantaran' ? 'btn-active':''} `}>Hantaran</Button>{' '}
                        <Button onClick={() => eventSelection(10)} className={`btn-category btn-persembahan ${serviceName == 'Kugiran' ? 'btn-active':''} `}>Kugiran</Button>{' '}
                        <Button onClick={() => eventSelection(11)} className={`btn-category btn-doorgift ${serviceName == 'Door Gift' ? 'btn-active':''} `}>Door Gift</Button>{' '}
                        <Button onClick={() => eventSelection(12)} className={`btn-category btn-others ${serviceName == 'Others' ? 'btn-active':''} `}>Others</Button>{' '}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default About
