import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../css/modal.css'
import PackageUpload from './PackageUpload'
import {PackageContext} from '../../contexts/PackageContext'
import {serviceContext} from '../../contexts/ServiceContext'
import * as ls from 'local-storage'

function modalImage() {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { setEditPackage, editPackage, images} = useContext(PackageContext)

    const updateImage = () =>{
        if (images) {
            let ep = editPackage
            ep.images = images
            ls.set('editPackage', ep)
        }
        setModal(!modal)
        alert('Success: Sila simpan ke DB')
        location.reload()
    }
    
    return (
        <div>
            <button className="btn btn-edit sidebar-modal-button" onClick={toggle}>Image</button>
            <Modal isOpen={modal} toggle={toggle} className="modal-design">
                <ModalHeader toggle={toggle}>Update Image</ModalHeader>
                <ModalBody>
                   <PackageUpload />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>updateImage()}>Update</Button>
                    {/* <Button color="secondary" onClick={()=>setModal(!modal)}>Kembali</Button> */}
                </ModalFooter>
            </Modal>
            <style jsx>{`
                .btn-edit { height: 45px; border-radius: 8px; color: #FFF; font-size: 14px; background-color: #75848E; font-weight: normal; width: 150px; margin-bottom: 10px;}
            `}</style>
        </div>
    )
}

export default modalImage
