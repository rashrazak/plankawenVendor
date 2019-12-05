import React, { Component } from 'react'
import Head from '../components/Headx'
import Swal from 'sweetalert2'
import VendorForm from '../components/VendorForm';
import '../css/index.css'

function signup (){
        return (
            <Head title="Signup">
                <div className="bg-color">
                    <div className="vendor-signup-section">
                        <VendorForm />
                    </div> 
                    {/* <button onClick={(e)=>submitLoading(e)}></button> */}
                    <style jsx>{`
                        .form-layout { text-align: center; }
                        a { margin-top: 10px;}
                        .bg-color { background-color: #4bd19f; }
                        .logo-oficial { margin: auto; }
                        .vendor-signup-section { max-width: 700px; margin: auto; padding: 100px 0;}
                    `}</style>
                </div>
            </Head>
          
        )
}

export default signup
