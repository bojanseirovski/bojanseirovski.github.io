import { useCookies } from 'react-cookie';
import '../css/Nav.css';

const Nav = () => {
    const [cookies, ] = useCookies(['user']);

    return (
        <div className="row text-right nav">
          <div className="col-3 item nav_red">
            <a className="nav_link" href="/">Doodle</a>
          </div>
          { cookies.loggedIn ===1 ? 
          <div className={ cookies.loggedIn === 0 ? "col-4 item nav_blue" : "col-5 item nav_blue"}>
            <a className="nav_link" href="/dashboard">Dashboard</a>
          </div>
          : "" }
          { cookies.loggedIn!==1 ? 
          <div className="col-3 item nav_green">
            <a className="nav_link" href="/login">Login</a> 
          </div>
          : "" }
          { cookies.loggedIn!==1 ? 
          <div className="col-3 item nav_black">
            <a className="nav_link" href="/register">Register</a> 
          </div>
          : "" }

          { cookies.loggedIn===1 ? 
          <div className="col-2 item nav_black">
            <a className="nav_link" href="/logout">Logout</a>
          </div>
          : ""}
        </div>
    );
}

export default Nav;