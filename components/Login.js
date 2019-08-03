import React, { Component } from 'react'
import '../css/login.css'


export class Login extends Component {
    render() {
        return (
            <div class="login-layout"> 
                <h1>Welcome Vendor</h1>
                <div class="form-layout">
                    <form>
                        <input type="email" class="form-control" name="email" placeholder="Email" />
                        <input type="password" class="form-control" name="password" placeholder="Password" />
                        {/* <input type="submit" class="btn btn-primary" value="Login" /> */}
                        <button type="button" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
