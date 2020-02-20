import React from 'react'
import ModalText from '../editServices/modalText'
import ModalPriceWqty from '../editServices/modalPriceWqty'
import ModalImage from '../editServices/modalImage'
import '../../../css/modal.css'

function editSidebar({serviceType}) {


    return (
        <div className="sidebar-edit">
            <div className="">
                <ModalText/>
                <ModalPriceWqty serviceType={serviceType}/>
                <ModalImage/>
            </div>
        <style jsx>{`
            .sidebar-edit { max-width: 300px; position: absolute; left: 0;}
            ModalText { witdh: 100%;}
        `}</style>
        </div>
    )
}

export default editSidebar
