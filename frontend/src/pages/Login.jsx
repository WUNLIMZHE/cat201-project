import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [showUserLoginStatus, setShowUserLoginStatus] = useState(false);
  const [currentUserGeneralDetails, setCurrentUserGeneralDetails] = useState({});

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

  const validateUserLoginMethod = async (email, password) => {
    setUserEmail(email);
    setUserPassword(password);
    await handleApiCall(
      "users/login",
      "POST",
      { email, password },
      async (result) => {
        if (await result.loginStatus) {
          setCurrentUserGeneralDetails(JSON.parse(result.user));
          setUserLoginStatus(true);
          console.log("User login status: " + userLoginStatus);
          console.log("Current user general details: " + currentUserGeneralDetails);
        } else {
          setError("\n Invalid email or password");
        }
        setShowUserLoginStatus(true);
      },
      (error) => setError("\n Error validating user login: " + error)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateUserLoginMethod("sunny@example.com", "12345");
    validateUserLoginMethod("sunny@example.com", "123456");
  };

  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: "url('images/bg-01.jpg')" }}>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-49">
              Login
            </span>

            <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
              <span className="label-input100">Username</span>
              <input className="input100" type="text" name="username" placeholder="Type your username" value={email} onChange={(e) => setEmail(e.target.value)} />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <span className="label-input100">Password</span>
              <input className="input100" type="password" name="pass" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <div className="text-right p-t-8 p-b-31">
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

            <div className="txt1 text-center p-t-54 p-b-20">
              <span>
                Or Sign Up Using
              </span>
            </div>

            <div className="flex-c-m">
              <a href="#" className="login100-social-item bg1">
                <i className="fa fa-facebook"></i>
              </a>

              <a href="#" className="login100-social-item bg2">
                <i className="fa fa-twitter"></i>
              </a>

              <a href="#" className="login100-social-item bg3">
                <i className="fa fa-google"></i>
              </a>
            </div>

            <div className="flex-col-c p-t-155">
              <span className="txt1 p-b-17">
                Or Sign Up Using
              </span>

              <Link to="/register" className="txt2">
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