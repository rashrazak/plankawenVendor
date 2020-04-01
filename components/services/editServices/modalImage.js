import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadFormEdit from '../../services/formService/upload/UploadFormEdit'
import '../../../css/modal.css'

function modalImage() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    return (
        <div>
            <button className="btn btn-edit sidebar-modal-button" onClick={toggle}>Image</button>
            <Modal isOpen={modal} toggle={toggle} className="modal-design">
                <ModalHeader toggle={toggle}>Update Image</ModalHeader>
                <ModalBody>
                    <UploadFormEdit editModal={true} setModalEdit={setModal} />
                </ModalBody>
            </Modal>
            <style jsx>{`
                .btn-edit { height: 45px; border-radius: 8px; color: #FFF; font-size: 14px; background-color: #75848E; font-weight: normal; width: 150px; margin-bottom: 10px;}
            `}</style>
        </div>
    )
}

export default modalImage
