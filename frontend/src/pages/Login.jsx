import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [showUserLoginStatus, setShowUserLoginStatus] = useState(false);
  const [currentUserGeneralDetails, setCurrentUserGeneralDetails] = useState({});
  const navigate = useNavigate();

  const handleApiCall = async (
    url,
    method,
    body,
    onSuccess,
    onError
  ) => {
    try {
      const response = await fetch("http://localhost:9090/api/" + url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("API call result: " + JSON.stringify(result));
        onSuccess(result);
        setError(null);
      } else {
        console.error(
          "HTTP error",
          response.status,
          response.statusText
        );
        onError(response.statusText);
      }
    } catch (err) {
      onError(err.message);
    }
  };

  const validateUserLoginMethod = async (username, password) => {
    await handleApiCall(
      "users/login",
      "POST",
      { username, password },
      async (result) => {
        if (await result.loginStatus) {
          setCurrentUserGeneralDetails(JSON.parse(result.user));
          setUserLoginStatus(true);
          console.log("User login status: " + userLoginStatus);
          console.log("Current user general details: " + currentUserGeneralDetails);
          navigate('/testhome');
        } else {
          setError("Invalid username or password");
        }
        setShowUserLoginStatus(true);
      },
      (error) => setError("Error validating user login: " + error)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateUserLoginMethod(username, password);
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-49">
              Login
            </span>

            <div className="wrap-input100 validate-input m-b-23 mt-5" data-validate="username is required">
              <label className="input input-bordered flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input className="input100" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
            <div className="wrap-input100 validate-input m-b-23 mt-5" data-validate="password is required">
              <label className="input input-bordered flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input className="input100" type="password" name="pass" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            {error && <div role="alert" className="error-message alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}</div>}

            <div className="text-right p-t-8 p-b-31 link link-hover">
              <a href="#">
                Forgot password?
              </a>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn" type="submit">
                  Login
                </button>
              </div>
            </div>
            <div className="flex-col-c pt-32">
              <span className="txt1 p-b-17">
                Or Sign Up Using
              </span>

              <Link to="/signup" className="signup100-form-btn">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;