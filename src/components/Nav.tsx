
const Nav = () => {

    return (
        <div className="row text-right nav">
          <div className="col-2"></div>
          <div className="col-2">
            <a href="/">Draw</a>
          </div>
          <div className="col-2">
            <a href="/login">Login</a>
          </div>
          <div className="col-2">
            <a href="/register">Register</a>
          </div>
          <div className="col-2">
            <a href="/account">Account</a>
          </div>
          <div className="col-2">
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="col-2">
            <a href="/logout">Logout</a>
          </div>
        </div>
    );
}

export default Nav;