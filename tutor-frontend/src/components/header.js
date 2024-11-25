// src/components/Header.js
import React from 'react';
import logo from '../assets/logo.png'; // Import your logo
import '../styles/Header.css'; // Import CSS for the header
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();

    return (
        <header className="Header">
            <div className="Header-content">
                <img src={logo} className="Header-logo" alt="Tutorium Logo" onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate clickability
                />
                <h1 className="Header-title">Tutorium</h1>
            </div>
            <div className="Header-buttons">
                <button className="Header-button--signin">Sign In</button>
                    <button className="Header-button--signup"
                    onClick={() => navigate('/signup')}
                    >Sign Up</button>
            </div>
        </header>
    );
}

export default Header;
