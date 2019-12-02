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
                <div className="vendor-signup-section">
                    <VendorForm></VendorForm>
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
          
        )
    }
}

export default signup
