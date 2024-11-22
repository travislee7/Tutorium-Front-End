// src/pages/LandingPage.js
import React from 'react';
import Header from '../components/header.js'; // Import the reusable Header component
import '../styles/LandingPage.css'; // Optional: Create a separate file for styling

function LandingPage() {
    return (
        <div className="LandingPage">
            <Header /> {/* Use the reusable Header component */}
            <main className="LandingPage-content">
                <h1>Welcome to the Landing Page</h1>
                <p>This is the starting point for your application.</p>
                <a
                    className="LandingPage-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn More
                </a>
            </main>
        </div>
    );
}

export default LandingPage;
