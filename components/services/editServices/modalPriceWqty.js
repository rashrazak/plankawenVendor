import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, UncontrolledTooltip } from 'reactstrap';
import '../../../css/modal.css'

function modalPriceWqty(serviceType) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [hargaPerPerson, sethargaPerPerson] = useState(0)
    const [discount, setdiscount] = useState([])
    const [minDiscount, setminDiscount] = useState(0)
    const [maxDiscount, setmaxDiscount] = useState(0)
    const [discountVal, setdiscountVal] = useState(0)

    return (
        <div>
            <Button className="sidebar-modal-button" onClick={toggle}>Price With Qty</Button>
            <Modal isOpen={modal} toggle={toggle} className="modal-design">
                <ModalHeader toggle={toggle}>Update</ModalHeader>
                <ModalBody>
                <div className="form-service">
                    <div className="form-section">
                        <h4>Harga per Unit (RM)</h4>
                        <Input className="form-custom" type="number" placeholder="" value={hargaPerPerson} onChange={(e) => {sethargaPerPerson(e.target.value)}} />
                    </div>
                    <div className="form-section">
                        <h4>Senarai harga</h4>
                        <br/>
                        <p>Kuantiti Minimum</p>
                        <Input className="form-custom" type="number" placeholder="min quantity" value={minDiscount} onChange={(e) => {setminDiscount(e.target.value)}} />
                        <br/>
                        <p>Kuantiti Maksimum</p>
                        <Input className="form-custom" type="number" placeholder="max quantity" value={maxDiscount}  onChange={(e) => {setmaxDiscount(e.target.value)}} />
                        <br/>
                        <p>Diskaun per Pax (%)</p>
                        <Input className="form-custom" href="#" id="tooltipDiskaun" type="number" placeholder="any discounted price?" onChange={(e) => {setdiscountVal(e.target.value)}} />
                        <UncontrolledTooltip placement="left" target="tooltipDiskaun">
                            Diskaun mengikut minimum dan maksimum per pax. Contoh: <br></br>
                            1 - 500 (0% diskaun per unit) <br></br>
                            501 - 1000 (5% diskaun per unit) <br></br>
                            1001 - 1500 (8% diskaun per unit) 
                        </UncontrolledTooltip>
                        <br/>
                        <Button  color="primary" onClick={() => addDiscount()}>Add</Button>
                    </div>
                    <div className="form-section">
                        { discount.length > 0 ?
                            <p>Senarai Diskaun</p>
                            :
                            ''
                        }
                        <br/>
                        {   discount.length > 0 ?
                            
                            discount.map( (val, index) =>{
                                let ma = val.max;
                                let mi = val.min;
                                let d = val.discount;

                                return(
                                    <React.Fragment key={index}>
                                        <div className="area-covered-div">
                                                <span>Min: {mi} | </span>
                                                <span>Max: {ma} | </span>
                                                <span>Discount: {d} %</span>
                                                {(index == (discount.length - 1) )
                                                    ? 
                                                    <Button color="danger" className="round-delete" onClick={() => deleteDiscount(index)}>x</Button>
                                                    :
                                                    <div></div>

                                                }
                                                <br/>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                            : ''
                        }
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>Simpan</Button>{' '}
                <Button color="secondary" onClick={toggle}>Kembali</Button>
                </ModalFooter>
            </Modal>            
        </div>
    )
}

export default modalPriceWqty
