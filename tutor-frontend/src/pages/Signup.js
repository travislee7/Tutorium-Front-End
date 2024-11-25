// src/pages/Signup.js
import React from 'react';
import Header from '../components/header.js'; // Import the reusable Header component
import '../styles/Signup.css'; // Optional: Create a separate file for styling

function Signup() {
    return (
        <div>
            <Header />
            <h2>Sign Up Page</h2>
            <p>Welcome to the Sign Up page!</p>

            <form id="signup-form">
                <label for="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name" placeholder="Enter your first name" required />
                
                <label for="last-name">Last Name:</label>
                <input type="text" id="last-name" name="last-name" placeholder="Enter your last name" required />
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
                
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required />
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
