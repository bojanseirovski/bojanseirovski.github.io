import {useEffect} from "react";
import { useCookies } from 'react-cookie';

const Logout = () => {
    const [cookies, setCookie] = useCookies(['user']);
    useEffect(() => {
        if (cookies.loggedIn === 1 ) {
            setCookie('loggedIn', 0, { path: '/' });
            window.localStorage.setItem("accessToken", "");
            window.localStorage.setItem("refreshToken", "");
            window.localStorage.setItem("uid", "");
            window.location.href= "/logout";
        }
        
    }, [cookies,setCookie])

    return (
        <div className="coloringWrapper mt-4">
            <div className="row">
                <div className="col-12">
                <h2 className="multicolortext">You have been logged out!</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Logout;