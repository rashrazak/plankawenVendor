import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'reactstrap'
import AddServiceContext from '../../../contexts/AddServiceContext'

function About({typeChange}) {
    const {getServiceAbout, addServiceAboutTypeName} = useContext(AddServiceContext);
    const serviceType = getServiceAbout.serviceType;
    const selection = [
        {name:'Venue',isActive:false},
        {name:'Canopy',isActive:false},
        {name:'KadBanner',isActive:false},
        {name:'WeddingDress',isActive:false},
        {name:'Makeup',isActive:false},
        {name:'Photographer',isActive:false},
        {name:'Videographer',isActive:false},
        {name:'Pelamin',isActive:false},
        {name:'Caterer',isActive:false},
        {name:'Hantaran',isActive:false},
        {name:'Persembahan',isActive:false},
        {name:'DoorGift',isActive:false},
        {name:'Others',isActive:false},
    ]
    const [select, setSelect] = useState(selection)
    const [click, setclick] = useState(false)

    const eventSelection = (index, e) => {
        e.preventDefault()
        setSelect(select[index].isActive = true) 
        const namex = select[index].name;
        addServiceAboutTypeName(namex)
        setclick(true)
        typeChange(namex)
    }

    useEffect(() => {
        
    }, [getServiceAbout])

    useEffect(() => {
        setSelect(selection)
        setclick(false)
    }, [click])

    return (
        <React.Fragment>
            <div className="row">
                <div className="container container-1">
                    <p>Please choose your category</p>
                    <div className="choose-category">
                        <Button onClick={(e) => eventSelection(0, e)} className={`btn-category btn-venue ${serviceType == 'Venue' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-venue.png"/>
                            Lokasi
                        </Button>{' '}
                        {/* <Button onClick={(e) => eventSelection(1, e)} className={`btn-category btn-canopy ${serviceType == 'Canopy' ? 'btn-active':''} `}>Canopy
                            
                        </Button>{' '} */}
                        <Button onClick={(e) => eventSelection(2, e)} className={`btn-category btn-invitation ${serviceType == 'KadBanner' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-cards.png"/>
                            Kad & Banner
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(3, e)} className={`btn-category btn-dress ${serviceType == 'WeddingDress' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-dress.png"/>
                            Baju Pengantin
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(4, e)} className={`btn-category btn-makeup ${serviceType == 'Makeup' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-makeup.png"/>
                            Make Up
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(5, e)} className={`btn-category btn-photo ${serviceType == 'Photographer' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-photography.png"/>
                            Photographer
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(6, e)} className={`btn-category btn-video ${serviceType == 'Videographer' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-photography.png"/>
                            Videographer
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(7, e)} className={`btn-category btn-pelamin ${serviceType == 'Pelamin' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-pelamin.png"/>
                            Pelamin
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(8, e)} className={`btn-category btn-catering ${serviceType == 'Caterer' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-catering.png"/>
                            Caterer
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(9, e)} className={`btn-category btn-hantaran ${serviceType == 'Hantaran' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-venue.png"/>
                            Hantaran
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(10, e)} className={`btn-category btn-persembahan ${serviceType == 'Persembahan' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-venue.png"/>
                            Persembahan
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(11, e)} className={`btn-category btn-doorgift ${serviceType == 'DoorGift' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-goodiebag.png"/>
                            Door Gift
                            
                        </Button>{' '}
                        <Button onClick={(e) => eventSelection(12, e)} className={`btn-category btn-others ${serviceType == 'Others' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-others.png"/>
                            Others
                            
                        </Button>{' '}
                    </div>
                </div>
            </div>
            <style jsx>{`
               .icon-service{width:15%;height:50%;margin-bottom:5px;margin-right:5px}
            `}</style>
        </React.Fragment>
    )
}

export default About