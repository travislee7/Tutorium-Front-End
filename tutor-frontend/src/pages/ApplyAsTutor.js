import React, { useState } from 'react';  // Import useState from React
import Header from '../components/header.js'; 
import '../styles/ApplyAsTutor.css'; 
import Footer from '../components/footer.js';

function ApplyAsTutor() {
    // Initialize formData with useState
    const [formData, setFormData] = useState({
        questionOne: '',
        questionTwo: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to server)
        console.log(formData);
    };

    return (
        <div className="apply-as-tutor-page">
            <Header />
            <div className="apply-page">
		<p>Welcome to the Apply as a Tutor Page!</p>

                <div className="apply-content-container">
                    
                    <p>Fill out the following questions:</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="questionOne">
                                Why do you think you can be a tutor? <br /> List your school and experience:</label>
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
                                List Your Qualifications <br /> Have you ever worked with a different tutoring app?</label>
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
