import {useRef, useState} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import ErrorMessage from './messages/ErrorMessage';
import '../css/Login.css';

const Login = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [toggleEmailErr, setToggleE] = useState(false);
    const [togglePasswordErr, setToggleP] = useState(false);

    const [, setCookie] = useCookies(['user']);

    let emailError = false;
    let passwordError = false;
    const validateAndLogin = () => {
        const username = emailRef.current.value;
        const password = passRef.current.value;
        
        emailError = false;
        passwordError = false;
        if (username.length < 3) {
            emailError = true;
        }
        if (password<3) {
            passwordError = true;
        }

        setToggleE(emailError);
        setToggleP(passwordError);
        if (!emailError && !passwordError) {
            handlelogin();
        }
        logIn();
    }

    const handlelogin = () => {
        const loginCreds = {
            username: emailRef.current.value,
            password: passRef.current.value
        };
        axios.post('/', loginCreds)
        .then(response => {
            // set uid cookie
            setCookie('uid', 1, { path: '/' });
            logIn();
        })
        .catch(error => {
          console.error(error);
        });
    };

    const logIn = () => {
        setCookie('loggedIn', 1, { path: '/' });
        window.location.href= "/";
    }

    return (
        <div className="coloringWrapper login mt-4 pl-3 pr-3">
            <div className="row">
                <div className="col-12">
                    Login
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <input type="email" ref={emailRef} className="form-control" id="email1" placeholder="Enter email" />
                        { toggleEmailErr ? <ErrorMessage type={"email"} message={"invalid email"}/> : null }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <input type="password" ref={passRef} className="form-control" id="password" placeholder="Enter paasword" />
                        { togglePasswordErr ? <ErrorMessage type={"password"} message={"invalid password"}/> : null }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={validateAndLogin}>Start drawing</button>
                </div>
            </div>
        </div>
    );
}

export default Login;