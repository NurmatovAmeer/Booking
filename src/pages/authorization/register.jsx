import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./authorization.css";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email:undefined,
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
      await axios.post(`${API_URL}/auth/register`, credentials);
      navigate("/login")
    } catch (err) {
      console.log(err)
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
                        <h1 className="title">Register</h1>
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
                         <label>Email</label>
                         <input 
                         type="email" 
                         required 
                         id="email"
                         name="email"
                         label="email"
                         onChange={handleChange}
                         />
                         {error && <p className="errorMsg" style={{color:'red'}}>{error.message}</p>}
                        <button type='submit' className='button' disabled={loading} onClick={handleClick}>Sign up</button>
                        <p>
                            Already have account?
                            <a href='/login'>Log in</a>
                        </p>
                        </form>
                </div>
            </div>
    </section>
  );
};

export default Register;