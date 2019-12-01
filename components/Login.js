import React, { useState, useContext } from 'react'
import '../css/login.css'
import LoginContext from '../contexts/LoginContext'
import Swal from 'sweetalert2'
import Link from 'next/link';


const Login = () => {

    const { signIn, check } = useContext(LoginContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const authenticate = async (e) => {
        Swal.showLoading();
        e.preventDefault();
        if (email != '' || password != '') {
            let result = await check(email);
            if (!result) {
                setMessage('You are not registered, please contact admin')
                Swal.close();
            }else{
                signIn(email, password);
                Swal.close();
            }
        } else {
            setMessage('Please enter your email and password');
            Swal.close();
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
                <Link href="/SignUp"><a>Sign Up</a></Link>
            </div>
            <style jsx>{`
                .form-layout { text-align: center; }
                a { margin-top: 10px;}
            `}</style>
        </div>
    )
}

export default Login
