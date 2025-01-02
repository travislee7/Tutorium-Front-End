import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SigninPage.css';
import Header from '../components/header.js';

function SigninPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Response from backend:', data); // Debugging

            if (response.ok) {
                // Save user info locally
                localStorage.setItem('firstName', data.first_name);
                localStorage.setItem('lastName', data.last_name);
                localStorage.setItem('userType', data.user_type);
                localStorage.setItem('email', formData.email);
                localStorage.setItem('userId', data.user_id);

                // Redirect to the dashboard or home page
                navigate('/');
            } else {
                setErrorMessage(data.message || 'Invalid email or password!');
                setShowErrorPopup(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setShowErrorPopup(true);
        }
    };

    // Close error popup
    const closePopup = () => {
        setShowErrorPopup(false);
    };

    return (
        <div className="sign-in-page">
            <Header />
            <div className="sign-in-content">
                <div className="form-container">
                    <h2>Sign In</h2>
                    <p>Welcome back! Please sign in to continue.</p>

                    <form id="sign-in-form" onSubmit={handleSubmit}>
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

                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>

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

export default SigninPage;
