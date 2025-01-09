// import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <h1 className="text-2xl">Login</h1>
        <Link to="/"><button>member</button></Link>
        <Link to="/admin"><button>admin</button></Link>
      </div>
    </>
  );
};

export default Login;
