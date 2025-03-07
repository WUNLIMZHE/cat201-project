/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleApiCall from '../utils/handleApiCall';
import './Login.css';
import './EditProfile.css';

function EditProfile({ loggedIn, username }) {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setzipcode] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardType, setCardType] = useState('');
    const [cvv, setCvv] = useState('');
    const [payments, setPayments] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        } else {
            fetchAddresses();
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if (loggedIn) {
            fetchPayments();
        }
    }, [loggedIn]);

    const fetchAddresses = async () => {
        await handleApiCall(
            "users/getaddress",
            "GET",
            { username },
            async (result) => {
                setAddresses(result);
                //console.log(result)
            },
            (error) => {
                console.error("Error fetching addresses: " + error);
                setError("Error fetching addresses: " + error);
            }
        );
    };

    const fetchPayments = async () => {
        await handleApiCall(
            "users/getpayment",
            "GET",
            { username },
            async (result) => {
                setPayments(result);
            },
            (error) => {
                console.error("Error fetching payments: " + error);
                setError("Error fetching payments: " + error);
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

    const paymentSubmissionMethod = async (username, cardholderName, cardNumber, expiryDate, cardType, cvv) => {
        await handleApiCall(
            "users/payment",
            "POST",
            { username, cardholderName, cardNumber, expiryDate, cardType, cvv },
            async (result) => {
                console.log("Payment submission result: " + JSON.stringify(result));
                if (result.status !== "Payment added successfully") {
                    setError(result.status);
                }
                else {
                    fetchPayments();
                }
            },
            (error) => {
                console.error("Error submitting payment: " + error);
                setError("Error submitting payment: " + error);
            }
        );
    };

    const deleteAddress = async (addressid) => {
        if (!selectedAddress) {
            setError("No address selected");
            return;
        }
        console.log(addressid)
        await handleApiCall(
            "users/deleteaddress",
            "DELETE",
            { username, addressid },
            async (result) => {
                if (result.message !== "Address deleted successfully") {
                    setError(result.message);
                } else {
                    await fetchAddresses(); // Fetch updated addresses
                }
            },
            (error) => {
                console.error("Error deleting address: " + error);
                setError("Error deleting address: " + error);
            }
        );
    };

    const deletePayment = async (paymentid) => {
        if (!selectedPayment) {
            setError("No payment selected");
            return;
        }
        console.log(paymentid)
        await handleApiCall(
            "users/removepayment",
            "DELETE",
            { username, paymentid },
            async (result) => {
                if (result.message !== "Address payment successfully") {
                    setError(result.message);
                } else {
                    await fetchPayments(); // Fetch updated payment
                }
            },
            (error) => {
                console.error("Error deleting address: " + error);
                setError("Error deleting address: " + error);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addressSubmitionMethod(username, street, city, state, zipcode, country);
        await fetchAddresses(); // Fetch updated addresses
        //window.location.reload(); // Refresh the webpage
        console.log({ username, street, city, state, zipcode, country });
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        await paymentSubmissionMethod(username, cardholderName, cardNumber, expiryDate, cardType, cvv);
        await fetchPayments(); // Fetch updated payments
        //window.location.reload(); // Refresh the webpage
        console.log({ username, cardholderName, cardNumber, expiryDate, cardType, cvv });
    };

    const handleLogout = () => {
        localStorage.setItem("userLoginStatus", false);
        navigate('/login');
    };

    return loggedIn ? (
        <div className="container">
            <h1>Welcome, {username}!</h1>
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
            
            <h2>Your Addresses</h2>
            <ul>
                {addresses.map((address, index) => (
                    <li key={index}>
                        <input
                            type="radio"
                            name="selectedAddress"
                            value={address.addressid}
                            onChange={async () => {
                                setSelectedAddress(address.addressid);
                            }}
                        />
                        {address.street}, {address.city}, {address.state}, {address.zipcode}, {address.country}
                    </li>
                ))}
            </ul>
            <button onClick={() => deleteAddress(selectedAddress)} className="btn btn-danger">Delete</button>
            
            <h2>Payment Details</h2>
            <form onSubmit={handlePaymentSubmit}>
                <div className="form-group">
                    <label htmlFor="cardholderName">Cardholder Name</label>
                    <input
                        type="text"
                        id="cardholderName"
                        className="form-control"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                        type="text"
                        id="expiryDate"
                        className="form-control"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardType">Card Type</label>
                    <input
                        type="text"
                        id="cardType"
                        className="form-control"
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        className="form-control"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            
            <h2>Your Payments</h2>
            <ul>
                {payments.map((payment, index) => (
                    <li key={index}>
                        <input
                            type="radio"
                            name="selectedPayment"
                            value={payment.paymentid}
                            onChange={async () => {
                                setSelectedPayment(payment.paymentid);
                            }}
                        />
                        <p>Payment Method: {payment.paymentMethod}</p>
                        <p>Cardholder Name: {payment.cardholderName}</p>
                        <p>Card Number: {payment.cardNumber}</p>
                        <p>Expiry Date: {payment.expiryDate}</p>
                        <p>Card Type: {payment.cardType}</p>
                        <p>CVV: {payment.cvv}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => deletePayment(selectedPayment)} className="btn btn-danger">Delete</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default EditProfile;