import React,{useEffect, useState, useContext} from 'react'
import {PackageContext} from '../../contexts/PackageContext'
import LoginContext from '../../contexts/LoginContext'
import PackageEditAbout from './PackageEditAbout'
import PackageEditImage from './PackageEditImage'

function PackageEditSidebar() {
    const {editVisibility, editPackage, updatePackage} = useContext(PackageContext)
    const {user} = useContext(LoginContext)

    const [visible, setVisible] = useState('hidden')

    useEffect(() => {
        if (editPackage && !visible) {
            setVisible(editPackage.visibility)
        }else{
            console.log(visible)
            editVisibility(visible)
        }
        // console.log(visible)
    })

    const submitReview = () => {
        updatePackage()
    }
    return (
        <div className="sidebar-edit">
            <div className="flex-display">
                <PackageEditAbout />
                <PackageEditImage />
                {
                    visible == 'hidden' ?
                    <div>
                        <button className={'btn btn-edit'} onClick={()=> setVisible('show')}>Hide</button>
                    </div>
                    :
                    <div>
                        <button className={'btn btn-edit'} onClick={()=> setVisible('hidden')}>Show</button>
                    </div>
                }
                <button className={'btn btn-save'} onClick={()=> submitReview()}>Simpan Ke DB</button>
            </div>
        <style jsx>{`
            .sidebar-edit { max-width: 300px; position: absolute; left: 0;}
            ModalText { witdh: 100%;}
            .btn-save { background-color: #47CBC4; color: #FFF; font-size: 14px; font-weight: 500; display: block; width: 150px; height: 45px; border-radius: 8px; margin-bottom: 10px; transition: all 3.s}
            .btn-edit { height: 45px; border-radius: 8px; color: #FFF; font-size: 14px; background-color: #75848E; font-weight: normal; width: 150px; margin-bottom: 10px;}
            .btn-danger2 { background-color: #FE6847; color: #FFF; font-size: 12px; font-weight: 500; display: block; width: 100px; height: 50px; border-radius: 25px; margin-bottom: 10px; transition: all 3.s}
            @media screen and (max-width: 480px ){
                .sidebar-edit {
                   position: relative;
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

export default PackageEditSidebar


