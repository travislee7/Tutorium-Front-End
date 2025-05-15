import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.js';
import '../styles/ApplyAsTutor.css';
import Footer from '../components/footer.js';

const API_BASE_URL = process.env.REACT_APP_API_URL;

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

        if (formData.questionOne.trim().length < 50 || formData.questionTwo.trim().length < 50) {
            alert("Each response must be at least 50 characters long.");
            return;
        }

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
            const response = await fetch(`${API_BASE_URL}/api/application`, {
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
            <Header hideApplyButton={true} />
    
            {/* Page Heading */}
            <div className="apply-page">
                <p className="page-heading">Welcome to the Apply as a Tutor Page!</p>
    
                {/* Main Content (Two Columns) */}
                <div className="apply-content">
                    {/* Left Text Section */}
                    <div className="benefits-section">
                        <p>Meet with your preferred student anywhere anytime within Washington state.</p>
                        <p>Select your student and save time by easily fitting sessions into your schedule.</p>
                        <p>No subscriptions. Get Paid, Hassle-free. Affordable options. Only pay for the time you need.</p>
                    </div>
    
                    {/* Right Form Section */}
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
                                    placeholder="Minimum 50 characters"
                                    rows="10"
                                    required
                                />
                                <p className="character-count">
                                    {formData.questionOne.trim().length}/2000 characters
                                </p>
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
                                    placeholder="Minimum 50 characters"
                                    rows="10"
                                    required
                                />
                                <p className="character-count">
                                    {formData.questionTwo.trim().length}/2000 characters
                                </p>
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
    
            <Footer />
        </div>
    );
    
    
    
}

export default ApplyAsTutor;


