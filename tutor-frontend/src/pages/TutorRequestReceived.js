// TutorRequestReceived.js
import React from 'react';
import '../styles/TutorRequestReceived.css';
import Header from '../components/header';
import Footer from '../components/footer.js';

function TutorRequestReceived() {
    return (
        <div className="page-container">
            <Header hideApplyButton={true} />
            <div className="tutor-request-received-page">
                <h1>We have received your request to become a tutor and sent you a confirmation email.</h1>
                <p>Please wait while we approve your request.</p>
            </div>
            <Footer className="RequestReceived-footer" />
        </div>
    );
}

export default TutorRequestReceived;
