import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./registerSuccess.css";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <>
      <h3 className="sucess">
        Account Created Successfully!
        </h3>
    </>
  );
};

export default RegisterSuccess;
