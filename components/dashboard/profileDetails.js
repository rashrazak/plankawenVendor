import React, {useContext, useEffect, useState, useRef} from 'react'
import LoginContext from '../../contexts/LoginContext'
import firebase from '../../config/firebaseConfig'

function profileDetails() {

    const {user,getVendorDetails,saveVendorDetails} = useContext(LoginContext);
    const [data, setdata] = useState(false)
    const [editDetails, setEditDetails] = useState(false)
    const [hoverImage, setHoverImage] = useHover();
    const [imageBinary, setImageBinary] = useState(null)
    const [vendorId, setVendorId] = useState(null)
    const [companyDesc, setCompanyDesc] = useState(null)

    const toggle = () => setEditDetails(!editDetails)

    function useHover () {

        const [value, setValue] = useState(false)
        const ref = useRef(null)

        const handleMouseOver = () => setValue(true)
        const handleMouseOut = () => setValue(false)

        useEffect(() => {
            
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.addEventListener('mouseover', handleMouseOver);
                    node.addEventListener('mouseout', handleMouseOut);
                }   
            }
           
        }, [ref.current])

        return [ref, value];
    }


    useEffect( () => {
        async function getData(){
            if (user) {
                var read = await firebase.check(user.email)
                read.forEach(function(doc) {
                    let x = doc.id;
                    let y = doc.data()
                    setVendorId(doc.id)
                    //get vendor details
                    saveVendorDetails(x, y)
                    setCompanyDesc(y.companyDesc)
                })
            }
        }
        getData()
    },[user])

    useEffect(() => {
        if (imageBinary != null) {
            firebase.updateVendorProfileImage(imageBinary,user.email, vendorId)
        }
    }, [imageBinary])

    useEffect(() => {
       if (companyDesc != null && editDetails == false && companyDesc !== getVendorDetails.companyDesc) {
            firebase.updateVendorCompanyDesc(companyDesc,vendorId)
       }
    }, [companyDesc,editDetails])

    return (
        <div>
            <div className={`profile-details`}>
                <div className={`oval-kampret`}>
                    <div className={`oval-pic`} ref={hoverImage}>
                        {
                            setHoverImage ?
                                <React.Fragment>
                                    <input type="file" className={`input-image`} onChange={(e)=>{
                                        console.log(e.target.files)
                                        let fr = new FileReader()
                                        fr.onload = function(){
                                            setImageBinary(fr.result)
                                        }
                                        fr.readAsDataURL(e.target.files[0])
                                     } }/>
                                    <span><img className={`user-hover`} src="/images/icon/user-hover.png"/></span> 
                                </React.Fragment>
                                : 
                                imageBinary || ( getVendorDetails && getVendorDetails.profileImage ) ?
                                <img src={getVendorDetails.profileImage || imageBinary}/>
                                : 
                                <img className={`user-placholder`} src="/images/icon/user-placeholder.png"/>
                           
                        }
                    </div>
                    {
                        getVendorDetails && getVendorDetails.status == 'active' ?
                        <p>Disahkan Plankawen</p>
                        :''

                    }
                </div>
                <div className={`profile-upper`}>
                {/* <input type="file" className={``}/> */}
                    <h2>Hi, <span>{user.email}</span></h2>
                    <div className={`keterangan-div`}>
                        <textarea value={companyDesc} className={ editDetails ? 'form-textarea active' : 'form-textarea' } disabled={!editDetails} placeholder="Masukkan keterangan syarikat anda disini." onChange={(e)=>{
                            if (e.target.value.length < 81) {
                                setCompanyDesc(e.target.value)
                            }else{
                                alert('Maksimum 80 patah kata')
                            }
                        }}/>
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
                .oval-pic { width: 112px; height: 112px; border-radius: 50%; background-color: #9B9B9B; overflow: hidden; position: relative;}
                .oval-pic:hover { box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); background-color: #7C7C7C;}
                .oval-pic img { object-fit: cover; width: 100%;}
                .oval-pic img.user-placholder {object-fit: unset; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 40px;}
                .oval-pic img.user-hover {object-fit: unset; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 40px;}
                .profile-upper { margin-left: 156px;}
                h2 { margin: 0; font-size: 22px; color: #3e3e3e; font-weight: normal;}
                h2 > span { font-weight: bold;}
                p { margin: 0; font-size: 12px; color: #3e3e3e; font-weight: normal;}
                .form-textarea { background-color: #FFF;border: 1px solid #EAEAEA;border-radius: 4px; resize: none; height: 80px; width: 100%; margin-top: 10px; padding: 10px 20px; padding-right: 70px; font-weight: normal; font-size: 14px; color: #2B2B2B;}
                .form-textarea.active { box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2); transition: all .3s;}
                .keterangan-div { position: relative;}
                .icon-edit { position: absolute; right: 10px; top: 20px; width: 24px; cursor: pointer;}
                .p-save { color: #47CBC4; font-weight: bold; font-size: 14px; width: auto;}
                .input-image { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 112px; -webkit-appearance:none; z-index:1; opacity: 0; border-radius: 10px; height: 112px; }
            `}</style>
        </div>
    )
}

export default profileDetails
