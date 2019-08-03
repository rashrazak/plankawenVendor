import React, { Component } from 'react'
import '../css/login.css'


export class Login extends Component {
    render() {
        return (
            <div className="login-layout"> 
                <h1>Welcome Vendor</h1>
                <div className="form-layout">
                    <form>
                        <input type="email" className="form-control" name="email" placeholder="Email" />
                        <input type="password" className="form-control" name="password" placeholder="Password" />
                        {/* <input type="submit" className="btn btn-primary" value="Login" /> */}
                        <button type="button" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
