import React, { useState, useContext } from 'react'
import LoginContext from '../contexts/LoginContext'
import Swal from 'sweetalert2'
import Link from 'next/link';
import '../css/login.css'



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
            <div className="form-layout form-layout-login">
                <h1>Welcome Vendor</h1>
                <form>
                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    {/* <input type="submit" className="btn btn-primary" value="Login" /> */}
                    {message != '' && <div className="message">{message}</div>}
                </form>
                <div className={`login-cont`}>
                    <p>Pengguna Baru? <span><Link href="/signup"><a className={``}>Daftar disini</a></Link></span></p>
                    <button type="button" className="btn btn-login" onClick={e => authenticate(e)}>Login</button>
                </div>
            </div>
            <style jsx>{`
                .form-layout { text-align: center;}
                .form-control { border: 2px solid #EAEAEA; height: 50px; color: #3E3E3E; font-weight: normal; border-radius: 4px; transition: all .3s;}
                .form-control:active, .form-control:focus { outline: none; box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14); transition: all .3s;}
                a { color: #007bff; text-decoration: underline;}
                .btn-login { background-color: #ED795F; border-radius: 25px; color: #FFF; width: 130px; background-image: url(images/icon/arrow-right.png); background-repeat: no-repeat; background-position: center right 15px; background-size: 22px; transition: all .3s;}
                .btn-login:hover { background-position: center right 10px;}
                h1 { margin-bottom: 30px;}
                .login-cont { margin-top: 20px; display: flex; justify-content: space-between; align-items: center;}
                p { margin-bottom: 0; font-size: 13px;}

            `}</style>
        </div>
    )
}

export default Login
