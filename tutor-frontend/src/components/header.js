// src/components/Header.js
import React from 'react';
import logo from '../assets/logo.png'; // Import your logo
import '../styles/Header.css'; // Import CSS for the header

function Header() {
    return (
        <header className="Header">
            <div className="Header-content">
                <a href="LandingPage.js">
                    <img src={logo} className="Header-logo" alt="Tutorium Logo" />
                </a>
                <h1 className="Header-title">Tutorium</h1>
            </div>
            <div className="Header-buttons">
                <button className="Header-button--signin">Sign In</button>
                <button className="Header-button--signup">Sign Up</button>
            </div>
        </header>
    );
}

export default Header;
