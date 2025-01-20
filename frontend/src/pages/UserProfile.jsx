import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleApiCall from '../utils/handleApiCall';
import PaymentCard from '../components/User/PaymentCard';
import AddressCard from '../components/User/AddressCard';
import x from '../assets/x.svg';
import './UserProfile.css';
import Footer from '../components/Footer/Footer';
import FooterContent from '../components/FooterContent/FooterContent';
import Navbar from '../components/Navbar/Navbar';

const UserProfile = ({ loggedIn, username }) => {
    const [fname, setFname] = useState("FirstName");
    const [lname, setLname] = useState("LastName");
    const [email, setEmail] = useState("@xx.com");
    const [phone, setPhone] = useState("1234567890");
    const navigate = useNavigate();

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
    const [showAddressOptions, setShowAddressOptions] = useState(false);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
    const [password, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        } else {
            fetchAddresses();
            fetchUser();
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if (loggedIn) {
            fetchPayments();
        }
    }, [loggedIn]);

    const fetchUser = async () => {
        await handleApiCall(
            "users/getdetails",
            "GET",
            { username },
            async (result) => {
                setFname(result.firstName);
                setLname(result.lastName);
                setEmail(result.email);
                setPhone(result.phoneNumber);
            },
            (error) => {
                console.error("Error fetching user: " + error);
            }
        );
    };
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

    const deleteAddress = async (addressid) => {
        console.log("Deleting address: " + addressid);
        if (!addressid) {
            setError("No address selected");
            return;
        }
        await handleApiCall(
            "users/deleteaddress",
            "DELETE",
            { username, addressid },
            async (result) => {
                if (result.message !== "Address deleted successfully") {
                    setError(result.message);
                } else {
                    await fetchAddresses(); // Fetch updated addresses
                    setShowAddressOptions(false); // Exit edit mode
                    fetchAddresses();
                    setSelectedAddress(null); // Reset selected address
                }
            },
            (error) => {
                console.error("Error deleting address: " + error);
                setError("Error deleting address: " + error);
            }
        );
    };

    const deletePayment = async (paymentid) => {
        console.log("Deleting payment: " + paymentid);
        if (!paymentid) {
            setError("No payment selected");
            return;
        }
        await handleApiCall(
            "users/removepayment",
            "DELETE",
            { username, paymentid },
            async (result) => {
                if (result.message !== "Payment deleted successfully") {
                    setError(result.message);
                } else {
                    await fetchPayments(); // Fetch updated payment
                    setShowPaymentOptions(false); // Exit edit mode
                    fetchPayments(); // Fetch updated payments
                    setSelectedPayment(null); // Reset selected payment
                }
            },
            (error) => {
                console.error("Error deleting payment: " + error);
                setError("Error deleting payment: " + error);
            }
        );
    };

    const handleAddressEditClick = () => {
        setShowAddressOptions(!showAddressOptions);
        setSelectedAddress(null);
        fetchAddresses(); // Fetch updated addresses
    };

    const handlePaymentEditClick = () => {
        setShowPaymentOptions(!showPaymentOptions);
        setSelectedPayment(null);
        fetchPayments(); // Fetch updated payments
    };

    const handleResetPasswordClick = () => {
        setShowResetPasswordForm(!showResetPasswordForm);
    };

    const resetpassword = async (username, currentPassword, newPassword) => {
        await handleApiCall(
            "users/resetpassword",
            "POST",
            { username, password, newPassword },
            (result) => {
                alert(result.message);
                setShowResetPasswordForm(false);
            },
            (error) => {
                console.error("Error resetting password: " + error);
                setError("Error resetting password: " + error);
            }
        );
    };

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        await resetpassword(username, password, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="main-body">
                {/* /Breadcrumb */}
                <div className="profile-header">
                    <h2>Welcome, {username}</h2>
                </div>
                <div className="flex flex-wrap -mx-2 profile-detail">
                    <div className="w-full md:w-1/3 px-2 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="flex flex-col items-center text-center">
                                    <img src="https://media.istockphoto.com/id/1298261537/vector/blank-man-profile-head-icon-placeholder.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=CeT1RVWZzQDay4t54ookMaFsdi7ZHVFg2Y5v7hxigCA=" alt="Admin" className="pp rounded-full w-36" />
                                    <div className="mt-3">
                                        <h4 className="text-lg font-semibold">{username}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 px-2">
                        <div className="card bg-white shadow-md rounded-lg mb-4">
                            <div className="card-body p-4">
                                <div className="row mb-4">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-gray-600">
                                        {fname} {lname}
                                    </div>
                                </div>
                                <hr />
                                <div className="row mb-4">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-gray-600">
                                        <a className="text-black">{email}</a>
                                    </div>
                                </div>
                                <hr />
                                <div className="row mb-4">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-gray-600">
                                        {phone}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button className="btn-info bg-blue-500 text-white px-4 py-2 rounded" onClick={handleResetPasswordClick}>
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                                {showResetPasswordForm && (
                                    <div className="row mt-4">
                                        <div className="col-sm-12">
                                            <div className="card bg-white shadow-md rounded-lg p-4">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="currentPassword"
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                                        value={password}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="newPassword">
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="newPassword"
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                </div>
                                                <button className="btn-info bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePasswordReset}>
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full px-2 mb-4">
                                <div className="card bg-white shadow-md rounded-lg h-full w-full">
                                    <div className="card-body p-4">
                                        <h6 className="d-flex align-items-center mb-3">Address
                                            {!showAddressOptions && (
                                                <button className="btn-info absolute right-5" onClick={handleAddressEditClick}>Edit</button>
                                            )}
                                        </h6>

                                        <ul>
                                            {addresses.map((address, index) => (
                                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>
                                                        {showAddressOptions && (
                                                            <input
                                                                type="radio"
                                                                name="selectedAddress"
                                                                value={address.addressid}
                                                                onChange={() => setSelectedAddress(address.addressid)}
                                                                checked={selectedAddress === address.addressid}
                                                            />
                                                        )}
                                                        {address.street}, {address.city}, {address.state}, {address.zipcode}, {address.country}
                                                    </span>
                                                    {showAddressOptions && selectedAddress === address.addressid}
                                                </li>
                                            ))}
                                        </ul>
                                        {showAddressOptions ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {selectedAddress && (
                                                    <button className="btn-info bg-red-500 text-white rounded ml-2" onClick={() => deleteAddress(selectedAddress)}>
                                                        Delete
                                                    </button>
                                                )}
                                                <button className="btn-info bg-blue-500 text-white rounded" onClick={handleAddressEditClick}>
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <a className="btn-info bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/editaddress"}>
                                                Add Address
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-2 mb-4">
                                <div className="card bg-white shadow-md rounded-lg h-full w-full">
                                    <div className="card-body p-4">
                                        <h6 className="d-flex align-items-center mb-3">Payment Method
                                            {!showPaymentOptions && (
                                                <button className="btn-info absolute right-5" onClick={handlePaymentEditClick}>Edit</button>
                                            )}
                                        </h6>
                                        <ul>
                                            {payments.map((payment, index) => (
                                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>
                                                        {showPaymentOptions && (
                                                            <input
                                                                type="radio"
                                                                name="selectedPayment"
                                                                value={payment.paymentid}
                                                                onChange={() => setSelectedPayment(payment.paymentid)}
                                                                checked={selectedPayment === payment.paymentid}
                                                            />
                                                        )}
                                                        <p>Payment Method: {index + 1}</p>
                                                        <p>Cardholder Name: {payment.cardholderName}</p>
                                                        <p>Card Number: **** **** **** {payment.cardNumber.slice(-4)}</p>
                                                        <p>Card Type: {payment.cardType}</p>
                                                    </span>
                                                    {showPaymentOptions && selectedPayment === payment.paymentid}
                                                </li>
                                            ))}
                                        </ul>
                                        {showPaymentOptions ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {selectedPayment && (
                                                    <button className="btn-info bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => deletePayment(selectedPayment)}>
                                                        Delete
                                                    </button>
                                                )}
                                                <button className="btn-info bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePaymentEditClick}>
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="btn-info bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/editpayment"}>
                                                Add Payment Method
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <FooterContent />
        <Footer />
        </>
    );
};

export default UserProfile;
