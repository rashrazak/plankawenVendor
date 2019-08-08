import React, { useState, useContext } from 'react'
import '../css/login.css'
import LoginContext from '../contexts/LoginContext'


const Login = () => {

    const { signIn } = useContext(LoginContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const authenticate = e => {
        e.preventDefault();
        if (email != '' || password != '') {
          signIn(email, password);
        } else {
          setMessage('Please enter your email and password');
        }
    };

    return (
        <div className="login-layout"> 
            <h1>Welcome Vendor</h1>
            <div className="form-layout">
                <form>
                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    {/* <input type="submit" className="btn btn-primary" value="Login" /> */}
                    {message != '' && <div className="message">{message}</div>}
                    <button type="button" className="btn btn-primary" onClick={e => authenticate(e)}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
