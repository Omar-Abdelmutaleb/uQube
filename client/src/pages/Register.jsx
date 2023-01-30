import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
        //img: result.user.photoURL,
      });
      navigate('/registerSuccess')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h2 className="registerLogo">uQube</h2>
          <span className="registerDesc">
            Sign up & Become one of us{" "}
            <span style={{ marginLeft: "5px" }}>:)</span>
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="registerInput"
            />
            <button className="registerRegisterButton" onClick={handleRegister}>
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
