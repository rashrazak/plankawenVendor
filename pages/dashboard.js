import React, {useContext, useEffect, useState} from 'react'
import LoginContext from '../contexts/LoginContext'
import firebase from '../config/firebaseConfig'
import Head from '../components/Headx'
import UploadService from '../components/dashboard/uploadService'
import UpcomingProject from '../components/dashboard/upcomingProject'
import SideBarDashboard from '../components/dashboard/sideBarDash'
import ProfileDetails from '../components/dashboard/profileDetails'
import {useMediaQuery} from 'react-responsive'
import '../css/dashboardMobile.css'


function dashboard() {
    const {user,signOut,saveVendorDetails} = useContext(LoginContext);
    const [data, setdata] = useState(false)

    const isMobile = useMediaQuery ({ maxWidth: 480 })
    const isLaptop = useMediaQuery ({ maxWidth: 1920})

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
        {
             user ?
             <Head title={ 'Vendor Dashboard'}>
                 <div className={`container`}>
                    {
                        data == true ?
                        <div className={`alert-info`}>
                            <img src="/images/icon/alert-circle.png" alt="alert icon"/>
                            <p>Kemas kini gambar profil dan keterangan mengenai syarikat anda supaya lebih meyakinkan dan memudahkan pelanggan membuat pilihan. Klik <a href="">sini</a> untuk berbuat sedemikian!</p>
                        </div>
                        :''
                    }
                     
                     <div className={`dashboard-container`}>
                        <div className={`dashboard-section`}>
                            <ProfileDetails />
                                {/* {
                                    isMobile &&
                                    <React.Fragment>
                                         <SideBarDashboard />
                                    </React.Fragment>
                                } */}
                            <div className={`details-section`}>
                                <UploadService />
                                <UpcomingProject />             
                            </div> 
                        </div>
                    </div>
                    {/* {
                        !isMobile &&
                        <React.Fragment>
                                 <SideBarDashboard />
                        </React.Fragment>
                    } */}
                     {/* {user.email}
                     <button onClick={ signOut }>Log Out</button>
                     <button>Add Service</button> */}
                 </div>
             </Head>
             :
             <Head title={ 'Vendor Dashboard'}>
                 {/* {user.email}
                 <button onClick={ signOut }>Log Out</button>
                 <button>Add Service</button> */}
             </Head>
        }
        <style jsx>{`
            .label-h4 { color: #3E3E3E; font-size: 16px; font-weight: normal;}
            .label-p { color: #9B9B9B; font-size: 12px; font-weight: normal;}
            .container { height: 85vh;}
            .alert-info { display: flex; background-color: #FEF2EB; box-shadow: 0 6px 10px 0 rgba(0,0,0,0.2); padding: 10px; max-width: 800px; margin-left: auto; position:absolute; bottom: 10px; right: 30px;}
            .alert-info img { height: 24px; margin-right: 10px;}
            .alert-info p { font-size: 12px; color: #3E3E3E;}
            .dashboard-container { background-color: #FFF; border-radius: 5px; padding: 35px 30px; display: inline-block; width: 68%; height: calc(100vh - 130px); overflow-y: scroll;}
            .oval-pic { width: 112px; height: 112px; border-radius: 50%; background-color: #9B9B9B; overflow: hidden;}
            .oval-pic img { object-fit: cover; width: 100%;}
            .profile-pic { width: 170px; position: relative; overflow:hidden}
            .details-section { width: 100%; height: 100%; overflow-y: scroll;}
            @media screen and (max-width: 480px){
                .dashboard-container {
                    display: block;
                    width: 100%;
                    padding: 50px 0px;
                }
                .oval-kampret { 
                    position: unset;
                }
                .container {
                    height: 100%;
                }
            }
        `}</style>
        </div>
    )
   
}


export default dashboard
