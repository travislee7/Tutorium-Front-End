import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.js';
import '../styles/ApplyAsTutor.css';
import Footer from '../components/footer.js';

function ApplyAsTutor() {
    const [formData, setFormData] = useState({
        questionOne: '',
        questionTwo: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem('email');
        if (!email) {
            alert('Email not found in localStorage.');
            return;
        }

        const payload = {
            ...formData,
            email,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Redirect to confirmation page on success
                navigate('/tutor-request-received');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Unknown error occurred.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error connecting to the server.');
        }
    };

    return (
        <div className="apply-as-tutor-page">
            <Header hideApplyButton={true} /> {/* Pass the prop to hide the button */}
            <div className="apply-page">
                <p>Welcome to the Apply as a Tutor Page!</p>
                <div className="apply-content-container">
                    <p>Fill out the following questions:</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="questionOne">
                                Why do you think you can be a tutor? <br /> List your school and experience:
                            </label>
                            <textarea
                                id="questionOne"
                                name="questionOne"
                                value={formData.questionOne}
                                onChange={handleChange}
                                placeholder="minimum 50 characters"
                                rows="10"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="questionTwo">
                                List Your Qualifications <br /> Have you ever worked with a different tutoring app?
                            </label>
                            <textarea
                                id="questionTwo"
                                name="questionTwo"
                                value={formData.questionTwo}
                                onChange={handleChange}
                                placeholder="minimum 50 characters"
                                rows="10"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ApplyAsTutor;
