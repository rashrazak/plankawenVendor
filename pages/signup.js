import React, { Component } from 'react'
import Swal from 'sweetalert2'
import VendorForm from '../components/VendorForm';
import '../css/index.css'


const submitLoading =(e)=>{
    Swal.showLoading();

}

class signup extends Component {
    render() {
        return (
           
            <div className="bg-color">
                <img className="logo-oficial" src="/static/images/logos/logo-official.png"></img>
                <div className="vendor-signup-section">
                    <VendorForm></VendorForm>
                </div> 
                {/* <button onClick={(e)=>submitLoading(e)}></button> */}
                <style jsx>{`
                    .form-layout { text-align: center; }
                    a { margin-top: 10px;}
                    .bg-color { background: rgb(245,154,134); background: linear-gradient(360deg, rgba(245,154,134,1) 0%, rgba(244,244,244,1) 100%); width: 100%; position: relative; }
                    .logo-oficial { position: absolute; top: 20px; left: 20px;}
                    .vendor-signup-section { max-width: 700px; margin: auto; padding: 100px 0; height: 100vh;}
                `}</style>
            </div>
          
        )
    }
}

export default signup
