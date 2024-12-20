// src/pages/Signup.js
import React from 'react';
import Header from '../components/header.js'; // Import the reusable Header component
import '../styles/ApplyAsTutor.css'; // Optional: Create a separate file for styling
import Footer from '../components/footer.js';

function ApplyAsTutor() {
    return (
        <div classname="ApplyAsTutorPage">
            <Header />
            <div className='apply-page'>
                <h2>Apply As Tutor Page</h2>
                <p>Welcome to the Apply as a Tutor page!</p>
            </div>
            <Footer />
        </div>
    );
}

export default ApplyAsTutor;
