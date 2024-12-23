// src/components/Header.js
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get user info from localStorage
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const isLoggedIn = firstName && lastName;

    // State for Logout Toggle
    const [showMenu, setShowMenu] = useState(false);

    // Toggle Menu Visibility
    const handleUserIconClick = () => {
        setShowMenu((prev) => !prev);
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.clear();
        setShowMenu(false);
        navigate('/');
    };

    return (
        <header className="Header">
            <div className="Header-content">
                <img
                    src={logo}
                    className="Header-logo"
                    alt="Tutorium Logo"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                />
                <h1 className="Header-title">Tutorium</h1>
            </div>

            <div className="Header-actions">
                {isLoggedIn ? (
                    <div className="User-info">
                        <div
                            className="User-icon"
                            onClick={handleUserIconClick}
                        >
                            {firstName[0].toUpperCase()}{lastName[0].toUpperCase()}
                        </div>

                        {/* Dropdown Menu */}
                        {showMenu && (
                            <ul className="Dropdown-menu">
                                <li
                                    className="Dropdown-item"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="Header-buttons">
                        <button
                            className="Header-button--signin"
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>
                        <button
                            className="Header-button--signup"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                        <button
                            className="Header-button--applytutor"
                            onClick={() => navigate('/apply')}
                        >
                            Apply as a tutor
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
