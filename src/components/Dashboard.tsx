import {useEffect} from "react";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Dashboard = () => {
    const [cookies, setCookie] = useCookies(['user']);
    useEffect(() => {
        if (cookies.loggedIn !== 1 ) {
            window.location.href= "/login";
        }
        // handleGetList();
    }, [cookies,setCookie]);

    const handleGetList = () => {
        const uid = {
            //  put uid from login here
            username: cookies.uid
        };
        axios.post('/', uid)
        .then(response => {
          //    populate list and display
        })
        .catch(error => {
          console.error(error);
        });
    };

    return (
        <div className="coloringWrapper mt-4">
            <div className="row">
                <div className="col-12">
                    Dashboard
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Your projects</h2>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;