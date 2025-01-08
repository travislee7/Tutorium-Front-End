import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SignupPage.css';
import Header from '../components/header.js';
import Footer from '../components/footer.js';

function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get('userType') || '';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setShowErrorPopup(true);
            return;
        }

        try {
            const payload = { ...formData, userType };

            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('firstName', formData.firstName);
                localStorage.setItem('lastName', formData.lastName);
                localStorage.setItem('userType', userType);
                localStorage.setItem('email', formData.email);
                localStorage.setItem('userId', data.user_id);

                if (userType === 'tutor') {
                    navigate('/apply');
                } else {
                    navigate('/');
                }
            } else {
                setErrorMessage(data.message || 'Something went wrong!');
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setShowErrorPopup(true);
        }
    };

    const closePopup = () => {
        setShowErrorPopup(false);
    };

    return (
        <div className="signup-page">
            <Header />
            <div className="signup-content">
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

                    <p className="signup-footer">
                        Already have an account?{' '}
                        <a href="/signin" className="signin-link">
                            Login
                        </a>
                    </p>
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
            <Footer className="SignupPage-footer" />
        </div>
    );
}

export default SignupPage;
