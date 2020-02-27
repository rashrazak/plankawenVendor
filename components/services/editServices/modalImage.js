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
                .btn-edit { height: 40px; border-radius: 25px; color: #FFF; font-size: 12px; background-color: #3399ff; font-weight: normal; width: 100px; margin-bottom: 10px;}
            `}</style>
        </div>
    )
}

export default modalImage
