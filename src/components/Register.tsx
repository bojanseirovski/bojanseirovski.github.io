import {useRef, useState} from 'react';
import { useCookies } from 'react-cookie';
import ErrorMessage from './messages/ErrorMessage';
import {registerReq, loginReq} from '../helpers/API';
import '../css/Register.css';

const Register = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [toggleEmailErr, setToggleE] = useState(false);
    const [togglePasswordErr, setToggleP] = useState(false);

    const [, setCookie] = useCookies(['user']);

    let emailError = false;
    let passwordError = false;
    const validateAndRegister = () => {
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
            handleregister(username, password);
        }
    }

    const handleregister = (username:string, password:string) => {
        registerReq(username, password, () => {
            loginReq(username, password, () => {
                setCookie('loggedIn', 1, { path: '/' });
                window.location.href = "/";
            },
            () => {});
        },
        () => {
            setToggleE(true);
        });
    };

    return (
        <div className="coloringWrapper register mt-4 pl-3 pr-3">
            <div className="row">
                <div className="col-12">
                <h2 className="multicolortext">Register for free:</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <input type="email" className="form-control" id="email1" ref={emailRef} placeholder="Enter email" />
                        { toggleEmailErr ? <ErrorMessage type={"email"} message={"invalid email"}/> : null }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" ref={passRef} placeholder="Enter paasword" />
                        { togglePasswordErr ? <ErrorMessage type={"password"} message={"invalid password"}/> : null }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={validateAndRegister}>Register and Start Doodling</button>
                </div>
            </div>
        </div>
    );
}

export default Register;