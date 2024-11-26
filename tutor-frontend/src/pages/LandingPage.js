// src/pages/LandingPage.js
import React from 'react';
import Header from '../components/header.js'; // Import the reusable Header component
import '../styles/LandingPage.css'; // Optional: Create a separate file for styling
import Footer from '../components/footer.js';

function LandingPage() {
  return (
    <div className="LandingPage">
        <Header />
        <div className="dropdown-container">
        {/* Subject Select */}
            <div className="subject-select">
                <select>
                    <option value="0">Select a subject</option>
                    <option value="1">Math</option>
                    <option value="2">Science</option>
                    <option value="3">English</option>
                    <option value="4">History</option>
                </select>
            </div>

        {/* Location Select */}
            <div className="location-select">
                <select>
                    <option value="0">Select a location</option>
                    <option value="1">Seattle</option>
                    <option value="2">Bellevue</option>
                    <option value="3">Kent</option>
                    <option value="4">Renton</option>
                </select>
            </div>
            {/* Language Select */}
            <div className="language-select">
                <select>
                    <option value="0">Select a language</option>
                    <option value="1">English</option>
                    <option value="2">Spanish</option>
                </select>
            </div>
        </div>
        <div className="submitbutton">
            <button className='submit'>Submit</button>
        </div>
        <Footer />  
    </div>
  );
}

export default LandingPage;

