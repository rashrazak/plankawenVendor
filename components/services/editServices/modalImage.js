import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadFormEdit from '../../services/formService/upload/UploadFormEdit'

function modalImage() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    return (
        <div>
             <Button color="danger" onClick={toggle}>Image</Button>
            <Modal isOpen={modal} toggle={toggle} className="test">
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
