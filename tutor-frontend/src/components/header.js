import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

function Header({ hideApplyButton = false }) {
    const navigate = useNavigate();

    // Get user information from localStorage
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const isLoggedIn = firstName && lastName; // Check if the user is logged in
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage

    // State to store the approve_status, profile_complete, and loading status
    const [approveStatus, setApproveStatus] = useState(null);
    const [profileComplete, setProfileComplete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false); // Manage dropdown menu visibility

    useEffect(() => {
        const fetchStatuses = async () => {
            if (userId) {
                try {
                    // Fetch approve_status
                    const approveResponse = await fetch(`http://127.0.0.1:8000/api/tutor-approve-status/?user_id=${userId}`);
                    const approveData = await approveResponse.json();
                    setApproveStatus(approveData.approve_status);

                    // Fetch profile_complete
                    const profileResponse = await fetch(`http://127.0.0.1:8000/api/tutor-profile-status/?user_id=${userId}`);
                    const profileData = await profileResponse.json();
                    setProfileComplete(profileData.profile_complete);

                    console.log('approve_status:', approveData.approve_status);
                    console.log('profile_complete:', profileData.profile_complete);
                } catch (error) {
                    console.error('Error fetching statuses:', error);
                } finally {
                    setLoading(false); // Data fetching is complete
                }
            } else {
                setLoading(false); // No user logged in
            }
        };

        fetchStatuses();
    }, [userId]);

    // Function to handle "Fill Out Your Profile" button click
    const handleFillOutProfileClick = () => {
        navigate('/tutor-build-profile');
    };

    // Function to handle "Apply as a Tutor" button click
    const handleApplyAsTutorClick = () => {
        if (!isLoggedIn) {
            // If the user is not logged in, navigate to Sign Up
            navigate('/signup?userType=student');
        } else if (approveStatus === 'pending') {
            // If the user is logged in and their status is pending, navigate to request received
            navigate('/tutor-request-received');
        } else {
            // Default case: navigate to Apply as Tutor with userType=student
            navigate('/apply?userType=student');
        }
    };

    // Function to navigate to Sign Up page
    const handleSignUpClick = () => {
        navigate('/signup?userType=student'); // Pass userType=student for "Sign Up"
    };

    // Function to toggle dropdown menu
    const handleUserIconClick = () => {
        setShowMenu((prev) => !prev); // Use the setShowMenu function to toggle the state
    };

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.clear(); // Clear user data from localStorage
        navigate('/'); // Redirect to the home page
    };

    if (loading) {
        return null; // Render nothing while loading
    }

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
                        {/* Conditionally render buttons */}
                        {!hideApplyButton && (
                            <>
                                {approveStatus === 'approved' && profileComplete === 'no' ? (
                                    <button
                                        className="Header-button--filloutprofile"
                                        onClick={handleFillOutProfileClick}
                                    >
                                        Fill Out Your Profile
                                    </button>
                                ) : (
                                    <button
                                        className="Header-button--applytutor"
                                        onClick={handleApplyAsTutorClick}
                                    >
                                        Apply as a Tutor
                                    </button>
                                )}
                            </>
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
                            onClick={handleSignUpClick} // Navigate to Sign Up with userType=student
                        >
                            Sign Up
                        </button>
                        <button
                            className="Header-button--applytutor"
                            onClick={handleApplyAsTutorClick} // Navigate to Apply as Tutor with userType=student
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
