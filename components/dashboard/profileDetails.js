import React, {useContext, useEffect, useState} from 'react'
import LoginContext from '../../contexts/LoginContext'
import firebase from '../../config/firebaseConfig'

function profileDetails() {

    const {user,signOut,saveVendorDetails} = useContext(LoginContext);
    const [data, setdata] = useState(false)
    const [editDetails, setEditDetails] = useState(false)

    const toggle = () => setEditDetails(!editDetails)


    useEffect( () => {
        async function getData(){
            if (user) {
                var read = await firebase.check(user.email)
                read.forEach(function(doc) {
                    let x = doc.id;
                    let y = doc.data()
                    //get vendor details
                    if (localStorage.getItem('vendorDetails') == null) {
                        saveVendorDetails(x, y)
                    }
                })
            }
        }
        getData()
    },[user])

    return (
        <div>
            <div className={`profile-details`}>
                <div className={`oval-kampret`}>
                    <div className={`oval-pic`}>
                        {
                            data == true ?
                            <img src={user.photoUrl}/>
                            :
                            <img src="/images/icon/user-placeholder.png"/>
                        }
                    </div>
                    <p>Disahkan SSM</p>
                </div>
                <div className={`profile-upper`}>
                    <h2>Hi, <span>{user.email}</span></h2>
                    {/* <p className={`label-p`}>Kami menyediakan dewan dan beberapa pakej lain yang menarik. Sesuai untuk anda yang mempunyai budget yang limited  beserta pilihan barangan yang pelbagai.</p> */}
                    <div className={`keterangan-div`}>
                        <textarea className={ editDetails ? 'form-textarea active' : 'form-textarea' } disabled={!editDetails} placeholder="Masukkan keterangan syarikat anda disini."></textarea>
                        {
                            !editDetails ?
                            <img className={`icon-edit`} src="/images/icon/edit-2.png" onClick={toggle}/>
                            : 
                            <p className={`icon-edit p-save`} onClick={toggle}>Simpan</p>
                        }
                       
                    </div>
                </div>
            </div>
            <style jsx>{`
                .profile-details { background-color: #F5F6FA;  padding: 10px 20px; position: relative; margin: 20px 0; min-height: 107px; border-radius: 4px;}
                .oval-kampret { position: absolute; top: -45px; left: 34px;}
                .oval-kampret > p { text-align: center; font-style: italic; color: #47CBC4; font-size: 12px; margin-top: 10px;}
                .oval-pic { width: 112px; height: 112px; border-radius: 50%; background-color: #9B9B9B; overflow: hidden;}
                .oval-pic img { object-fit: cover; width: 100%;}
                .profile-upper { margin-left: 156px;}
                h2 { margin: 0; font-size: 22px; color: #3e3e3e; font-weight: normal;}
                h2 > span { font-weight: bold;}
                p { margin: 0; font-size: 12px; color: #3e3e3e; font-weight: normal;}
                .form-textarea { background-color: #FFF;border: 1px solid #EAEAEA;border-radius: 4px; resize: none; height: 80px; width: 100%; margin-top: 10px; padding: 10px 20px; padding-right: 70px; font-weight: normal; font-size: 14px;}
                .form-textarea.active { box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2); transition: all .3s;}
                .keterangan-div { position: relative;}
                .icon-edit { position: absolute; right: 10px; top: 20px; width: 24px; cursor: pointer;}
                .p-save { color: #47CBC4; font-weight: bold; font-size: 14px; width: auto;}
            `}</style>
        </div>
    )
}

export default profileDetails
