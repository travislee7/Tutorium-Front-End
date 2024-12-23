import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SignupPage.css';
import Header from '../components/header.js';

function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState(''); // For displaying validation errors
    const [showErrorPopup, setShowErrorPopup] = useState(false); // Controls pop-up visibility

    const navigate = useNavigate();
    const location = useLocation();

    // Extract userType from query parameters
    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get('userType') || ''; // Default to ''

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage(''); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setShowErrorPopup(true); // Show error pop-up
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userType }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('firstName', formData.firstName);
                localStorage.setItem('lastName', formData.lastName);

                if (userType === 'tutor') {
                    navigate('/apply');
                } else {
                    navigate('/');
                }
            } else {
                setErrorMessage(data.message || 'Something went wrong!');
                setShowErrorPopup(true); // Show error pop-up
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setShowErrorPopup(true); // Show error pop-up
        }
    };

    const closePopup = () => {
        setShowErrorPopup(false); // Close the pop-up
    };

    return (
        <div className="signup-page">
            <Header />
            <div className="form-container">
                <h2>Sign Up Page</h2>
                <p>Welcome to the Sign Up page!</p>

                <form id="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Sign Up</button>
                </form>
            </div>

            {/* Error Pop-Up */}
            {showErrorPopup && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{errorMessage}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignupPage;
