import React, { Component } from 'react'
import Head from '../components/Headx'
import VendorForm from '../components/VendorForm';
import '../css/index.css'

function signup (){
        return (
            <Head title="Update User">
                <div className="bg-color">
                    <div className="vendor-signup-section">
                        <VendorForm />
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
