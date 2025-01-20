import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleApiCall from "../utils/handleApiCall";
import "./Login.css";

function Login({ setLoggedIn, setAuthUsername, handleSuccessfulLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const validateUserLoginMethod = async (username, password) => {
    await handleApiCall(
      "users/login",
      "POST",
      { username, password },
      async (result) => {
        if (result.loginStatus) {
          setAuthUsername(username);
          setLoggedIn(true);
          const userId = result.user.userid;
          const userRole = result.userRole;
          const address = result.user.address;
          
          handleSuccessfulLogin(userId, userRole, address);
  
          if (userRole === "admin") {
            navigate("/"); // Assuming you have an admin dashboard
          } else {
            navigate("/"); // Redirect user to homepage
          }
        } else {
          setError("Invalid username or password");
        }
      },
      (error) => setError("Error validating user login: " + error)
    );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateUserLoginMethod(username, password);
  };

  return (
    <div className="limiter bg-gray-800">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-49">Login</span>

            <div
              className="wrap-input100 validate-input m-b-23 mt-5"
              data-validate="username is required"
            >
              <label className="input input-bordered flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
            <div
              className="wrap-input100 validate-input m-b-23 mt-5"
              data-validate="password is required"
            >
              <label className="input input-bordered flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            {error && (
              <div role="alert" className="error-message alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <button className="btn login100-form-btn" type="submit">
                  Login
                </button>
              </div>
            </div>
            <div className="flex-col-c ">
              <span className="txt1 p-b-17">Or Sign Up Using</span>
              <div className="wrap-login100-form-btn">
                <Link to="/signup" className="btn signup100-form-btn">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
