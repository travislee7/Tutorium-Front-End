
/*
import React from 'react';
import Header from '../components/header.js'; // Import the reusable Header component
import '../styles/SignupPage.css'; // Optional: Create a separate file for styling

function SignupPage() {
    return (
        <div className="signup-page">
            <div className="header-container">
                <Header />
            </div>
            <div>
                <h2>Sign Up Page</h2>
                <p>Welcome to the Sign Up page!</p>
    
                <form id="signup-form">
                    <label htmlFor="first-name">First Name:</label>
                    <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        placeholder="Enter your first name"
                        required
                    />
    
                    <label htmlFor="last-name">Last Name:</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        placeholder="Enter your last name"
                        required
                    />
    
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
    
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
    
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirm your password"
                        required
                    />
    
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
    
}

export default SignupPage;
*/

// src/pages/Signup.js
import React, { useState } from 'react';
import Header from '../components/header.js';
import '../styles/SignupPage.css';

function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Sign up successful!');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="signup-page">
            <div className="header-container">
                <Header />
            </div>
            <div>
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
        </div>
    );
}

export default SignupPage;*/

// src/pages/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    // Update form state on input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                // Save to localStorage
                localStorage.setItem('firstName', formData.firstName);
                localStorage.setItem('lastName', formData.lastName);

                // Redirect to home page
                navigate('/');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="signup-page">
            <Header />  {/* Correct Full-Width Header */}

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
        </div>
    );
}

export default SignupPage;



