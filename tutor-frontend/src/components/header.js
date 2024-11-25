// src/components/Header.js
import React from 'react';
import logo from '../assets/logo.png'; // Import your logo
import '../styles/Header.css'; // Import CSS for the header
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

    // Check if the current route is "/signup"
    const isSignupPage = location.pathname === '/signup';

    return (
        <header className="Header">
            <div className="Header-content">
                <img
                    src={logo}
                    className="Header-logo"
                    alt="Tutorium Logo"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate clickability
                />
                <h1 className="Header-title">Tutorium</h1>
            </div>
            {/* Conditionally render the sign up and sign in buttons if not on the Signup page */}
            {!isSignupPage && (
                <div className="Header-buttons">
                    <button className="Header-button--signin">Sign In</button>
                    <button
                        className="Header-button--signup"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
