import React, {useContext, useState} from 'react'
import ModalText from '../editServices/modalText'
import ModalPriceWqty from '../editServices/modalPriceWqty'
import ModalImage from '../editServices/modalImage'
import '../../../css/modal.css'
import AddServiceContext from '../../../contexts/AddServiceContext'

function editSidebar({serviceType}) {
    const [visibility, setVisibility] = useState(true)
    const {getReview, createAddService, updateAddService, addServiceVisibility, getVisibility} = useContext(AddServiceContext);

    const submitReview = () => {
        updateAddService('editservice')
    }

    const editVisibility = (x) => {
        addServiceVisibility(x)
    }

    return (
        <div className="sidebar-edit">
            <div className="">
                <ModalText/>
                <ModalPriceWqty serviceType={serviceType}/>
                <ModalImage/>
                {
                    getVisibility == 'show' ?
                    <button className={'btn btn-danger2'} onClick={()=> editVisibility('hidden')}>Hide</button>
                    :
                    <button className={'btn btn-visible'} onClick={()=> editVisibility('show')}>Show</button>
                }
                <button className={'btn btn-save'} onClick={()=> submitReview()}>Simpan</button>
            </div>
        <style jsx>{`
            .sidebar-edit { max-width: 300px; position: absolute; left: 0;}
            ModalText { witdh: 100%;}
            .btn-save { background-color: #22bb33; color: #FFF; font-size: 12px; font-weight: 500; display: block; width: 100px; height: 50px; border-radius: 25px; margin-bottom: 10px; transition: all 3.s}
            .btn-visible { background-color: #88FE47; color: #FFF; font-size: 12px; font-weight: 500; display: block; width: 100px; height: 50px; border-radius: 25px; margin-bottom: 10px; transition: all 3.s}
            .btn-danger2 { background-color: #FE6847; color: #FFF; font-size: 12px; font-weight: 500; display: block; width: 100px; height: 50px; border-radius: 25px; margin-bottom: 10px; transition: all 3.s}
        `}</style>
        </div>
    )
}

export default editSidebar
