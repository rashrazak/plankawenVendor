import React, { Component } from 'react'
import Swal from 'sweetalert2'
import Navbar from 'react-bootstrap/Navbar'
import NavItem from 'react-bootstrap/NavItem'


const submitLoading =(e)=>{
    Swal.showLoading();

}

class signup extends Component {
    render() {
        return (
            <div>
                <h1>Hi Love</h1>
                <button onClick={(e)=>submitLoading(e)}></button>
            </div>
        )
    }
}

export default signup
