import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleApiCall from '../utils/handleApiCall';
import '../style.css';

function TestHome({ loggedIn, username }) {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn, navigate]);

    const addressSubmitionMethod = async (username, street, city, state, zipcode, country) => {
        await handleApiCall(
            "users/address",
            "POST",
            { username, street, city, state, zipcode, country },
            async (result) => {
                console.log("Address submission result: " + JSON.stringify(result));
            },
            (error) => {
                console.error("Error submitting address: " + error);
                setError("Error submitting address: " + error);
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addressSubmitionMethod(username, street, city, state, zipcode, country);
        console.log({ username, street, city, state, zipcode, country });
    };

    const handleLogout = () => {
        localStorage.setItem("userLoginStatus", false);
        navigate('/login');
    };

    return loggedIn ? (
        <div className="container">
            <h1>Welcome, {username}!</h1>
            <p>This is your homepage.</p>
            <p>
                <Link to="/login">Login</Link>
            </p>
            <p>
                <Link to="/signup">Signup</Link>
            </p>
            <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
            <h2>Address Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        className="form-control"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        className="form-control"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                        type="text"
                        id="zipcode"
                        className="form-control"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        className="form-control"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default TestHome;