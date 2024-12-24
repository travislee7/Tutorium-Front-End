import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    // Get user info from localStorage
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const isLoggedIn = firstName && lastName;
    const userType = localStorage.getItem('userType');

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
                {
                    isLoggedIn ? (
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
                    ) :
                    isLoggedIn && userType === 'student' ? (
                        <div className="User-info">
                            <button
                                className="Header-button--applytutor"
                                onClick={() => navigate('/signup?userType=tutor')}
                            >
                                Apply as a Tutor
                            </button>
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
                    ) :
                    (
                        <div className="Header-buttons">
                            <button
                                className="Header-button--signin"
                                onClick={() => navigate('/signin')}
                            >
                                Sign In
                            </button>
                            <button
                                className="Header-button--signup"
                                onClick={() => navigate('/signup?userType=student')}
                            >
                                Sign Up
                            </button>
                            <button
                                className="Header-button--applytutor"
                                onClick={() => navigate('/signup?userType=tutor')}
                            >
                                Apply as a Tutor
                            </button>
                        </div>
                    )
                }
            </div>
        </header>
    );
}

export default Header;
