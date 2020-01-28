import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadFormEdit from '../../services/formService/upload/UploadFormEdit'
import '../../../css/modal.css'

function modalImage() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    return (
        <div>
            <Button className="sidebar-modal-button" onClick={toggle}>Image</Button>
            <Modal isOpen={modal} toggle={toggle} className="modal-design">
                <ModalHeader toggle={toggle}>Update Image</ModalHeader>
                <ModalBody>
                    <UploadFormEdit />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Simpan</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Kembali</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default modalImage
