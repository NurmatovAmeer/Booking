import "./navbar.css"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {user,dispatch,loading} = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOG_OUT" });
    try {
      dispatch({ type: "LOGIN_SUCCESS", payload:{user:null} });
      localStorage.set("user",{user:null})
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' style={{color:'inherit',textDecoration:'none'}}>
        <h2 className="logo">Clover booking</h2>
        </Link>        
        {user !== null ? (
          <div className="display_flex">
          <p>{user.username}</p>
          <button className="navButton" disabled={loading} onClick={handleClick}>Log Out</button>
          </div>
        ) : <div className="navItems">
          <Link to='/registration'><button className="navButton">Register</button></Link>
          <Link to='/login'><button className="navButton">Login</button></Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar