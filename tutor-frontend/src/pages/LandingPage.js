// src/pages/LandingPage.js
import React from 'react';
import Header from '../components/header.js'; // Import the reusable Header component
import '../styles/LandingPage.css'; // Optional: Create a separate file for styling
import { useState } from "react";

function LandingPage() {
  // Separate states for subject and location dropdowns
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Toggle functions for each dropdown
  const toggleSubjectDropdown = () => {
    setIsSubjectOpen(!isSubjectOpen); // Toggle subject dropdown visibility
  };

  const toggleLocationDropdown = () => {
    setIsLocationOpen(!isLocationOpen); // Toggle location dropdown visibility
  };

  return (
    <div className="LandingPage">
        <Header />
        <div className="dropdown-container">
        {/* Subject Dropdown */}
            <div className="subjectdropdown">
                <button onClick={toggleSubjectDropdown}>Select a subject</button>
                <div className={`subjectdropdown-content ${isSubjectOpen ? "show" : ""}`}>
                    <a href="">Math</a>
                    <a href="">Science</a>
                    <a href="">Language arts</a>
                    <a href="">Social studies</a>
                </div>
            </div>

        {/* Location Dropdown */}
            <div className="locationdropdown">
                <button onClick={toggleLocationDropdown}>Select a location</button>
                <div className={`locationdropdown-content ${isLocationOpen ? "show" : ""}`}>
                    <a href="">Seattle</a>
                    <a href="">Bellevue</a>
                    <a href="">Kirkland</a>
                    <a href="">Kent</a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LandingPage;

