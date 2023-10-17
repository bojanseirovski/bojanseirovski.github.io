import {useEffect} from "react";
import { useCookies } from 'react-cookie';

const Logout = () => {
    const [cookies, setCookie] = useCookies(['user']);
    useEffect(() => {
        if (cookies.loggedIn === 1 ) {
            setCookie('loggedIn', 0, { path: '/' });
            setCookie('uid', 0, { path: '/' });
            window.location.href= "/logout";
        }
        
    }, [cookies,setCookie])

    return (
        <div className="coloringWrapper mt-4">
            <div className="row">
                <div className="col-12">
                    You have been logged out!
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