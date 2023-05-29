import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./authorization.css";
import { API_URL } from "../../config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem("user",res.data)
      console.log(res.data);
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <section className="login">
        <Link to='/'><FontAwesomeIcon className="icon_home" icon={faHome} /></Link>
            <div className="loginContainer">
                <div className="btnContainer">
                        <form
                        >
                        <h1 className="title">Login</h1>
                        <label>Username</label>
                         <input 
                         type="text"
                         autoFocus 
                         required 
                         id="username"
                         name="username"
                         label="Username"
                         onChange={handleChange}
                         />
                         <label>Password</label>
                         <input 
                         type="password" 
                         required 
                         id="password"
                         name="password"
                         label="Password"
                         onChange={handleChange}
                         
                         />
                         {error && <p className="errorMsg" style={{color:'red'}}>{error.message}</p>}
                        <button type='submit' className='button' disabled={loading} onClick={handleClick}>Sign in</button>
                        <p>
                            Don't have accaunt ?
                            <a href='/registration'>Sign up</a>
                        </p>
                        </form>
                </div>
            </div>
    </section>
  );
};

export default Login;