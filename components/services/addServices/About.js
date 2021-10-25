import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'reactstrap'
import AddServiceContext from '../../../contexts/AddServiceContext'
import '../../../css/about.css'

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
                        <button onClick={(e) => eventSelection(0, e)} className={`btn-category btn-venue ${serviceType == 'Venue' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-venue.png"/>
                            Lokasi (venue)
                        </button>{' '}
                        {/* <Button onClick={(e) => eventSelection(1, e)} className={`btn-category btn-canopy ${serviceType == 'Canopy' ? 'btn-active':''} `}>Canopy
                            
                        </Button>{' '} */}
                        <button onClick={(e) => eventSelection(2, e)} className={`btn-category btn-invitation ${serviceType == 'KadBanner' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-cards.png"/>
                            Kad & Banner
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(3, e)} className={`btn-category btn-dress ${serviceType == 'WeddingDress' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-dress.png"/>
                            Baju Pengantin
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(4, e)} className={`btn-category btn-makeup ${serviceType == 'Makeup' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-makeup.png"/>
                            Make Up
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(5, e)} className={`btn-category btn-photo ${serviceType == 'Photographer' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-photography.png"/>
                            Photographer
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(6, e)} className={`btn-category btn-video ${serviceType == 'Videographer' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-videography.png"/>
                            Videographer
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(7, e)} className={`btn-category btn-pelamin ${serviceType == 'Pelamin' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-pelamin.png"/>
                            Pelamin
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(8, e)} className={`btn-category btn-catering ${serviceType == 'Caterer' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-catering.png"/>
                            Caterer
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(9, e)} className={`btn-category btn-hantaran ${serviceType == 'Hantaran' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-hantaran.png"/>
                            Hantaran
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(10, e)} className={`btn-category btn-persembahan ${serviceType == 'Persembahan' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-performance.png"/>
                            Persembahan
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(11, e)} className={`btn-category btn-doorgift ${serviceType == 'DoorGift' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-goodiebag.png"/>
                            Door Gift
                            
                        </button>{' '}
                        <button onClick={(e) => eventSelection(12, e)} className={`btn-category btn-others ${serviceType == 'Others' ? 'btn-active':''} `}>
                        <img className={`icon-service`} src="/images/icon/services-icon/dark/ico-others.png"/>
                            Others
                            
                        </button>{' '}
                    </div>
                </div>
            </div>
            <style jsx>{`
               .icon-service{width:15%;height:50%;margin-bottom:5px;margin-right:5px}
               .container-1{
                    text-align: center;
                }
                .container-1 > p{
                    font-weight: 400;
                    color: #75848E;
                    font-size: 16px;
                }
                .choose-category{
                    display: flex;
                    justify-content: center;
                    max-width: 800px;
                    margin: auto;
                    flex-wrap: wrap;
                    text-align: center;
                    gap: 15px;
                }
                .btn-category{
                    border-radius: 4px;
                    flex: 0 0 150px;
                    height: 50px;
                    font-weight: 400;
                    color: #3E3E3E;
                    font-size: 12px;
                    background-color: #FFF; 
                    text-align: left;
                    box-sizing: border-box;
                }
                .btn-category:hover, .btn-category:active, .btn-category:focus, .btn-active{
                    background-color: #ED795F;
                    color: #FFF;
                    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.2)
                }
               @media screen and (max-width: 480px){
                   .container-1 {
                       padding: 0 10px;
                   }
                   .choose-category {
                       flex-wrap: wrap;
                       width: 100%;
                   }
                   .stepper-div {
                        margin-top: 10px !important;
                    }
                    .btn-category {
                        padding: 10px;
                    }
                    .form-service {
                        padding: 0 10px;
                    }
                    .btn-cancel, .btn-cancel:hover, .btn-next, .btn-next:hover {
                        width: 40% !important;
                    }
                }
            `}</style>
        </React.Fragment>
    )
}

export default About