import { useCookies } from 'react-cookie';

const Nav = () => {
    const [cookies, ] = useCookies(['user']);

    return (
        <div className="row text-right nav">
          <div className={ cookies.loggedIn === 0 ? "col-3" : "col-3"}>
            <a className="nav_link" href="/">Draw</a>
          </div>
          { cookies.loggedIn ===1 ? 
          <div className={ cookies.loggedIn === 0 ? "col-4" : "col-5"}>
            <a className="nav_link" href="/dashboard">Dashboard</a>
          </div>
          : "" }
          { cookies.loggedIn!==1 ? 
          <div className="col-3">
            <a className="nav_link" href="/login">Login</a> 
          </div>
          : "" }
          { cookies.loggedIn!==1 ? 
          <div className="col-3">
            <a className="nav_link" href="/register">Register</a> 
          </div>
          : "" }

          { cookies.loggedIn===1 ? 
          <div className="col-2">
            <a className="nav_link" href="/logout">Logout</a>
          </div>
          : ""}
        </div>
    );
}

export default Nav;