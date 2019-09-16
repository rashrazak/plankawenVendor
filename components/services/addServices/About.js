import React, {useState} from 'react'
import Head from '../../Headx'
import '../../../css/about.css'
import { Button } from 'reactstrap'
import Venue from '../formService/about/Venue'


function About() {
    return (
        <Head>
            <div className="row">
                <div className="container container-1">
                    <p>Please choose your category</p>
                    <div className="choose-category">
                        <Button className="btn-category btn-venue" onClick={() => changeComponent()}>Venue</Button>{' '}
                        <Button className="btn-category btn-canopy" onClick={() => changeComponent()}>Canopy</Button>{' '}
                        <Button className="btn-category btn-invitation" onClick={() => changeComponent()}>Kad Kahwin / Banner</Button>{' '}
                        <Button className="btn-category btn-dress" onClick={() => changeComponent()}>Dress</Button>{' '}
                        <Button className="btn-category btn-makeup" onClick={() => changeComponent()}>Make Up</Button>{' '}
                        <Button className="btn-category btn-photo" onClick={() => changeComponent()}>Photographer</Button>{' '}
                        <Button className="btn-category btn-video" onClick={() => changeComponent()}>Videographer</Button>{' '}
                        <Button className="btn-category btn-pelamin" onClick={() => changeComponent()}>Pelamin</Button>{' '}
                        <Button className="btn-category btn-catering" onClick={() => changeComponent()}>Caterer</Button>{' '}
                        <Button className="btn-category btn-hantaran" onClick={() => changeComponent()}>Hantaran</Button>{' '}
                        <Button className="btn-category btn-persembahan" onClick={() => changeComponent()}>Kugiran / Persembahan</Button>{' '}
                    </div>
                    <div className="test">
                        <Venue />
                    </div>
                </div>
            </div>
        </Head>
    )
}

export default About
