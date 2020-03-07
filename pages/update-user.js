import React, { Component } from 'react'
import Head from '../components/Headx'
import '../css/index.css'
import VendorFormUpdate from '../components/VendorFormUpdate';

function signup (){
        return (
            <Head title="Update User">
                <div className="bg-color">
                    <div className="vendor-signup-section">
                        <VendorFormUpdate />
                    </div> 
                    {/* <button onClick={(e)=>submitLoading(e)}></button> */}
                    <style jsx>{`
                        .form-layout { text-align: center; }
                        a { margin-top: 10px;}
                        .bg-color { background-color: #FFF; }
                        .logo-oficial { margin: auto; }
                        .master-layout { padding: 0;}
                    `}</style>
                </div>
            </Head>
          
        )
}

export default signup
