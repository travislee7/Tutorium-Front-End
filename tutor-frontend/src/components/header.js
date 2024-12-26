import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

function Header({ hideApplyButton = false }) { // Accept `hideApplyButton` as a prop with a default value of `false`
    const navigate = useNavigate();

    // Get user information from localStorage
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const isLoggedIn = firstName && lastName; // Check if the user is logged in
    const userType = localStorage.getItem('userType'); // Get the user type (e.g., student, tutor)

    // State to toggle dropdown menu visibility
    const [showMenu, setShowMenu] = useState(false);

    // Function to toggle dropdown menu
    const handleUserIconClick = () => {
        setShowMenu((prev) => !prev);
    };

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.clear(); // Clear user data from localStorage
        setShowMenu(false); // Hide the menu
        navigate('/'); // Redirect to the home page
    };

    // Function to handle "Apply as a Tutor" button click
    const handleApplyAsTutorClick = () => {
        if (isLoggedIn && userType === 'student') {
            navigate('/apply'); // If logged in as a student, navigate directly to the apply as tutor page
        } else {
            navigate('/signup?userType=tutor'); // Otherwise, navigate to the general sign-up page 
        }
    };

    return (
        <header className="Header">
            <div className="Header-content">
                {/* Logo */}
                <img
                    src={logo}
                    className="Header-logo"
                    alt="Tutorium Logo"
                    onClick={() => navigate('/')} // Navigate to the home page when the logo is clicked
                    style={{ cursor: 'pointer' }}
                />
                <h1 className="Header-title">Tutorium</h1>
            </div>

            <div className="Header-actions">
                {isLoggedIn ? (
                    <div className="User-info">
                        {/* Conditionally render "Apply as a Tutor" button if `hideApplyButton` is false */}
                        {!hideApplyButton && userType === 'student' && (
                            <button
                                className="Header-button--applytutor"
                                onClick={handleApplyAsTutorClick}
                            >
                                Apply as a Tutor
                            </button>
                        )}

                        {/* User Icon with initials */}
                        <div
                            className="User-icon"
                            onClick={handleUserIconClick} // Show dropdown menu on click
                        >
                            {firstName[0].toUpperCase()}{lastName[0].toUpperCase()}
                        </div>

                        {/* Dropdown menu for user actions */}
                        {showMenu && (
                            <ul className="Dropdown-menu">
                                <li
                                    className="Dropdown-item"
                                    onClick={handleLogout} // Logout option
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="Header-buttons">
                        {/* If not logged in, show Sign In and Sign Up buttons */}
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
                            onClick={handleApplyAsTutorClick}
                        >
                            Apply as a Tutor
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
