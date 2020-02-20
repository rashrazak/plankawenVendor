import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, UncontrolledTooltip } from 'reactstrap';
import '../../../css/modal.css'
import VenueForm from '../../../components/services/formService/details/VenueForm'
import CatererForm from '../../../components/services/formService/details/CatererForm'
import DoorGiftForm from '../../../components/services/formService/details/DoorGiftForm'
import HantaranForm from '../../../components/services/formService/details/HantaranForm'
import KadBannerForm from '../../../components/services/formService/details/KadBannerForm'
import MakeupForm from '../../../components/services/formService/details/MakeupForm'
import OthersForm from '../../../components/services/formService/details/OthersForm'
import PelaminForm from '../../../components/services/formService/details/PelaminForm'
import PersembahanForm from '../../../components/services/formService/details/PersembahanForm'
import PhotographerForm from '../../../components/services/formService/details/PhotographerForm'
import VideographerForm from '../../../components/services/formService/details/VideographerForm'
import WeddingDressForm from '../../../components/services/formService/details/WeddingDressForm'

function modalPriceWqty({serviceType}) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button className="sidebar-modal-button" onClick={toggle}>Price With Qty</Button>
            <Modal isOpen={modal} toggle={toggle} className="modal-design">
                <ModalHeader toggle={toggle}>Update</ModalHeader>
                <ModalBody>
                    <h1></h1>
                {
                    serviceType == 'Venue' ?
                    <VenueForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Canopy' ?
                    <CanopyForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'KadBanner' ?
                    <KadBannerForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'WeddingDress' ?
                    <WeddingDressForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Makeup' ?
                    <MakeupForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Photographer' ?
                    <PhotographerForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Videographer' ?
                    <VideographerForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Pelamin' ?
                    <PelaminForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Caterer' ?
                    <CatererForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Hantaran' ?
                    <HantaranForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Persembahan' ?
                    <PersembahanForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'DoorGift' ?
                    <DoorGiftForm setModalEdit={setModal} editModal={true} />
                    : serviceType == 'Others' ?
                    <OthersForm setModalEdit={setModal} editModal={true} />
                    :''
                }
                </ModalBody>
                {/* <ModalFooter>
                <Button color="primary" onClick={toggle}>Simpan</Button>{' '}
                <Button color="secondary" onClick={toggle}>Kembali</Button>
                </ModalFooter> */}
            </Modal>            
        </div>
    )
}

export default modalPriceWqty
