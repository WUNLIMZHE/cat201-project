import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
    }

    const validateUserSignupMethod = async (username, password, firstName, lastName, email, phoneNumber) => {
        await handleApiCall(
            "users/signup",
            "POST",
            { username, password, firstName, lastName, email, phoneNumber },
            async (result) => {
                if (await result.signupStatus) {
                    setCurrentUserGeneralDetails(JSON.parse(result.user));
                    setUserLoginStatus(true);
                    console.log("User login status: " + userLoginStatus);
                    console.log("Current user general details: " + currentUserGeneralDetails);
                    navigate('/testhome');
                }
            },
            (error) => {
                setError(error);
            }
        );
    }

    const handleSignup = (e) => {
        e.preventDefault();
        validateUserSignupMethod(username, password, firstName, lastName, email, phoneNumber);
    }


    return (
        <div className='min-h-screen bg-gray-800 flex items-center justify-center'>
            <div className='w-full max-w-4xl'>
                <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                    <div className='md:flex'>
                        <div className='md:w-1/2 hidden md:block'>
                            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' alt="Sample photo" className="w-full h-full object-cover" />
                        </div>
                        <div className='md:w-1/2 p-8'>
                            <div className='text-black flex flex-col justify-center'>
                                <h3 className="mb-5 text-2xl font-bold uppercase">Registration form</h3>
                                <form onSubmit={handleSignup}>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700'>First Name</label>
                                        <input type='text' className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                                        <input type='text' className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <label className='block text-sm font-medium text-gray-700'>Username</label>
                                    <input type='text' className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className='mt-4'>
                                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                                    <input type='password' className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className='mt-4'>
                                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                                    <input type='email' className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='mt-4'>
                                    <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
                                    <input type='tel' className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' id='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="flex justify-end pt-3">
                                    <Link to="/login" className="btn btn-light btn-lg bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm">
                                        Back to Login
                                    </Link>
                                    <button type='submit' className='btn btn-warning btn-lg bg-yellow-500 text-gray-700 px-4 py-2 rounded-md shadow-sm ml-2'>Register</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;