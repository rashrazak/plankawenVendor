import React, {useState, useEffect, useContext} from 'react'
import About from '../../components/services/addServices/About'
import Head from '../../components/Headx'
import Step from '../../components/StepByStep'
import { useRouter } from 'next/router'
import '../../css/venueform.css'
import '../../css/about.css'
import AboutForm from '../../components/services/formService/about/AboutForm'
import AddServiceContext from '../../contexts/AddServiceContext'
import {FormGroup, Label, Input, UncontrolledTooltip} from 'reactstrap'
function AddServiceAbout(props) {
    const {addJenisEventOthers, getServiceAbout, getServiceDetailsOthers} = useContext(AddServiceContext);
    const [serviceType, setServiceType] = useState('')
    const [jenisEventOthers, setjenisEventOthers] = useState('')
    const typeChange = (name) => {
        setServiceType(name)
    }
    useEffect(() => {
        setServiceType(getServiceAbout.serviceType)
    }, [getServiceAbout])
    useEffect(() => {
        setjenisEventOthers(getServiceDetailsOthers.jenisEvent)
        console.log(getServiceDetailsOthers)
    }, [getServiceDetailsOthers])
    useEffect(() => {
        console.log(serviceType)
    }, [setServiceType])
    useEffect(() => {
        if (serviceType == 'Others') {
            addJenisEventOthers(jenisEventOthers)
        }
    }, [jenisEventOthers])
    return (
        <Head title={ 'Add Services'}>
            <div>
                <Step progress={0} />
            </div>
            <div>
                <About typeChange={typeChange} />
                {
                    serviceType == 'Others' || getServiceAbout.serviceType == 'Others'  ?
                    <div className="form-service">
                        <div className="form-section" href="#" id="tooltipEvent">
                            <h4>Jenis Event</h4>
                            <FormGroup check>
                                <Label check>
                                    <Input className=" harga" type="radio" name="jenisEventOthers" value="makanan"  checked={jenisEventOthers == 'makanan' ? true : false} onChange={(e) => setjenisEventOthers(e.target.value)} />
                                    Makanan
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input className=" harga" type="radio" name="jenisEventOthers" value="dj" checked={ jenisEventOthers == 'dj' ? true : false} onChange={(e) => setjenisEventOthers(e.target.value)} />
                                    DJ
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input className=" harga" type="radio" name="jenisEventOthers" value="booth" checked={ jenisEventOthers == 'booth' ? true : false} onChange={(e) => setjenisEventOthers(e.target.value)} />
                                    Booth
                                </Label>
                            </FormGroup>
                        </div>
                        <UncontrolledTooltip placement="left" target="tooltipEvent">
                            Contoh: <br></br>
                            Makanan: Cendol, Ice Cream <br></br>
                            DJ: PA Sistem, Pengacara <br></br>
                            Booth: Photobooth, Insta booth
                        </UncontrolledTooltip>
                    </div>
                    :''

                }
                <AboutForm serviceType={serviceType} pagex={'addservice'} />   
            </div>
        </Head>
    )
}

export default AddServiceAbout