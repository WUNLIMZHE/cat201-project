import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import handleApiCall from '../../utils/handleApiCall';
import './PaymentCard.css';

function PaymentCard({ loggedIn, username }) {
    const [error, setError] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardType, setCardType] = useState('');
    const [cvv, setCvv] = useState('');
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

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

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        await paymentSubmissionMethod(username, cardholderName, cardNumber, expiryDate, cardType, cvv);
        await fetchPayments(); // Fetch updated payments
        navigate('/userprofile'); // Navigate to user profile page
        console.log({ username, cardholderName, cardNumber, expiryDate, cardType, cvv });
        setCardholderName(''); // Reset form fields
        setCardNumber('');
        setExpiryDate('');
        setCardType('');
        setCvv('');
    };

    return (
        <div className="payment-card-container">
            <div className="payment-card">
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
                <div className="payment-card-back">
                    <Link to="/userprofile" className="payment-card-back-link">
                        Go back to profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentCard;