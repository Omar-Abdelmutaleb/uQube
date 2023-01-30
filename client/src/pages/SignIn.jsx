import "./login.css";
import logo from "../images/logo.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import google from "../images/google.png"
import { useNavigate } from "react-router";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      navigate("/")
    } catch (err) {
      dispatch(loginFailure());
    }
  };
 

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
        .post("/auth/google", {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          console.log(res.data)
        });
      })
      .catch((err) => {
        dispatch(loginFailure());
    });
  };
  

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginBas">
            <img className="logo" src={logo} alt="" />
            <h3 className="loginLogo">uQube</h3>
          </div>
          <span className="loginDesc">
            Watch whatever you like, upload, view, share, comment all for free!{" "}
            <span style={{ marginLeft: "5px" }}>:)</span>
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              type="text"
              placeholder="E-mail"
              className="loginInput"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" onClick={handleLogin}>
              Sign In
            </button>

            <button className="loginGoogleButton" onClick={signInWithGoogle}>
            <img src={google} className="googleLogo" alt=""/>
              <span className="googleText">Sign in with Google</span>
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={()=>navigate("/register")}>
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
