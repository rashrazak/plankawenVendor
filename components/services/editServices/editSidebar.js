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
            <div className="flex-display">
                <ModalText/>
                <ModalPriceWqty serviceType={serviceType}/>
                <ModalImage/>
                {
                    getVisibility == 'show' ?
                    <button className={'btn btn-edit'} onClick={()=> editVisibility('hidden')}>Hide</button>
                    :
                    <button className={'btn btn-edit'} onClick={()=> editVisibility('show')}>Show</button>
                }
                <button className={'btn btn-save'} onClick={()=> submitReview()}>Simpan</button>
            </div>
        <style jsx>{`
            .sidebar-edit { max-width: 300px; position: absolute; left: 0;}
            ModalText { witdh: 100%;}
            .btn-save { background-color: #47CBC4; color: #FFF; font-size: 14px; font-weight: 500; display: block; width: 150px; height: 45px; border-radius: 8px; margin-bottom: 10px; transition: all 3.s}
            .btn-edit { height: 45px; border-radius: 8px; color: #FFF; font-size: 14px; background-color: #75848E; font-weight: normal; width: 150px; margin-bottom: 10px;}
            .btn-danger2 { background-color: #FE6847; color: #FFF; font-size: 12px; font-weight: 500; display: block; width: 100px; height: 50px; border-radius: 25px; margin-bottom: 10px; transition: all 3.s}
            @media screen and (max-width: 480px){
                .sidebar-edit {
                    position: unset;
                }
                .flex-display {
                    display: flex;
                    gap: 3px;
                    width: 100%;
                }
            }
        `}</style>
        </div>
    )
}

export default editSidebar
