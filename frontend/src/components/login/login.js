import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import LoginForm from "./loginForm";
import AuthService from "../../services/authService";
import { AuthContext } from "../../store/AuthContext";
import "./login.css";

const Login = (props) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const { handleChange, handleSubmit, values, resetForm } = LoginForm(submit);
  const { setCurrentUserInfo } = useContext(AuthContext);

  function updateMessage(newValue) {
    props.loginMessage(newValue);
  }

  async function submit(values) {
    try {
      const response = await AuthService.login(values);
      const { isAuthenticated, message } = response;
      if (isAuthenticated) {
        setCurrentUserInfo({
          type: "LOGIN",
          payload: response,
        });
        const welcomeMessage = { msgBody: "Welcome" };
        updateMessage(welcomeMessage);
        navigate("/userpage"); // Use navigate to redirect
      } else {
        updateMessage(message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-5">
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="form-control login-input"
              placeholder="Email"
            />
            <br />
            <span style={{ color: "#999999" }}>
              <input type="checkbox" />
              Remember me
            </span>
          </div>

          <div className="col-5">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="form-control login-input"
              placeholder="Password"
            />
            <br />
            <a href="/" style={{ color: "#999999" }}>
              Forgot it?
            </a>
          </div>

          <div className="col-2">
            <input
              type="submit"
              value="Sign in"
              className="gr-button gr-button--dark login-btn"
            />
          </div>
        </div>
        {/* ******** end of row ****** */}
      </form>
    </div>
  );
};

export default Login;
