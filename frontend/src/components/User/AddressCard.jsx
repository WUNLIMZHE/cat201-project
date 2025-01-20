//Generate AddressCard component as a form for user to add Address details to their profile page. 
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleApiCall from '../../utils/handleApiCall';
import './AddressCard.css';

const AddressCard = ({ loggedIn, username }) => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setzipcode] = useState('');
    const [country, setCountry] = useState('');
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        } else {
            fetchAddresses();
        }
    }, [loggedIn, navigate]);

    const fetchAddresses = async () => {
        await handleApiCall(
            "users/getaddress",
            "GET",
            { username },
            async (result) => {
                setAddresses(result);
            },
            (error) => {
                console.error("Error fetching addresses: " + error);
                setError("Error fetching addresses: " + error);
            }
        );
    };

    const addressSubmitionMethod = async (username, street, city, state, zipcode, country) => {
        await handleApiCall(
            "users/address",
            "POST",
            { username, street, city, state, zipcode, country },
            async (result) => {
                console.log("Address submission result: " + JSON.stringify(result));
                if (result.status !== "Address added successfully") {
                    setError(result.status);
                } else {
                    fetchAddresses();
                }
            },
            (error) => {
                console.error("Error submitting address: " + error);
                setError("Error submitting address: " + error);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addressSubmitionMethod(username, street, city, state, zipcode, country);
        await fetchAddresses(); // Fetch updated addresses
        navigate('/userprofile'); // Navigate to user profile page
        console.log({ username, street, city, state, zipcode, country });
        setStreet(''); // Reset form fields
        setCity('');
        setState('');
        setzipcode('');
        setCountry('');
    };

    return (
        <div className="address-card-container">
            <div className="address-card">
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
                            onChange={(e) => setzipcode(e.target.value)}
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
                <div className="address-card-back">
                    <Link to="/userprofile" className="address-card-back-link">
                        Go back to profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AddressCard;