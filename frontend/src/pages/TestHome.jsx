//create a homepage for testing
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function TestHome() {
    return (
        <div className="container">
        <h1>Test Home</h1>
        <p>
            <Link to="/login">Login</Link>
        </p>
        <p>
            <Link to="/signup">Signup</Link>
        </p>
        </div>
    );
    }

export default TestHome;