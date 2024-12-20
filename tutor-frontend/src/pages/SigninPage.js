// src/pages/Signup.js
import React from 'react';
import Header from '../components/header.js'; // Import the reusable Header component
import '../styles/SigninPage.css'; // Optional: Create a separate file for styling
import Footer from '../components/footer.js';

function SigninPage() {
    return (
        <div classname="SignupPage">
            <Header />
            <div className='signup-page'>
                <h2>Sign In Page</h2>
                <p>Welcome to the Sign In page!</p>
            </div>
            <Footer />
        </div>
    );
}

export default SigninPage;
