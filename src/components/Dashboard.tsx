import {useEffect, useState} from "react";
import { useCookies } from 'react-cookie';
import {getColoringsReq} from '../helpers/API';
import Coloring from "./list_items/Coloring";

const Dashboard = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [colorings, setColorings] = useState(Array<any>);
    
    useEffect(() => {
        if (cookies.loggedIn !== 1 ) {
            window.location.href= "/login";
        }
        getColoringsReq((response:any) => {
            setColorings(response);
        },
        () => {

        });
    }, [cookies,setCookie]);

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
            {colorings.map((element:any, i:number) => {
                return (<Coloring cid={element.id} date={element.timestamp}/>)
            })}
        </div>
    );
}

export default Dashboard;