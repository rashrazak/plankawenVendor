import React, {useState, useEffect} from 'react'
import Link from 'next/link';
// import '../../../css/about.css'
import { Button } from 'reactstrap'
import Venue from '../formService/about/Venue'
import Photographer from '../formService/about/Photographer'


function About(props) {
    const [comps, setcomps] = useState('Venue')
    var theComps = (<Venue />);
    
    useEffect(() => {
        if (comps == 'Venue') {
            theComps = (<Venue />)
        }else if (comps == 'Photographer') {
            theComps = (<Photographer />)
        }
    })

    return (
        <React.Fragment>
            <div className="row">
                <div className="container container-1">
                    <p>Please choose your category</p>
                    <div className="choose-category">
                        <Button className="btn-category btn-venue"><Link href="/addservice/about/venue"><a>Venue</a></Link></Button>{' '}
                        <Button className="btn-category btn-canopy"><Link href="/addservice/about/canopy"><a>Canopy</a></Link></Button>{' '}
                        <Button className="btn-category btn-invitation"><Link href="/addservice/about/kadbanner"><a>Kad & Banner</a></Link></Button>{' '}
                        <Button className="btn-category btn-dress"><Link href="/addservice/about/baju"><a>Dress</a></Link></Button>{' '}
                        <Button className="btn-category btn-makeup"><Link href="/addservice/about/makeup"><a>Make Up</a></Link></Button>{' '}
                        <Button className="btn-category btn-photo"><Link href="/addservice/about/photographer"><a>Photographer</a></Link></Button>{' '}
                        <Button className="btn-category btn-video"><Link href="/addservice/about/videographer"><a>Videographer</a></Link></Button>{' '}
                        <Button className="btn-category btn-pelamin"><Link href="/addservice/about/pelamin"><a>Pelamin</a></Link></Button>{' '}
                        <Button className="btn-category btn-catering"><Link href="/addservice/about/caterer"><a>Caterer</a></Link></Button>{' '}
                        <Button className="btn-category btn-hantaran"><Link href="/addservice/about/hantaran"><a>Hantaran</a></Link></Button>{' '}
                        <Button className="btn-category btn-persembahan"><Link href="/addservice/about/kugiran"><a>Kugiran</a></Link></Button>{' '}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default About
