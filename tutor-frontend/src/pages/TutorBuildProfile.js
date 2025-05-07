import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TutorBuildProfile.css';
import Header from '../components/header.js';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function TutorBuildProfile() {
    const [formData, setFormData] = useState({
        bio: '',
        subjects: [],
        location: [],
        language: [],
    });

    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const navigate = useNavigate();

    // Handle checkbox changes for subjects, location, and language
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value] // Add the value if checked
                : prev[name].filter((item) => item !== value), // Remove the value if unchecked
        }));
    };

    // Validate and handle profile picture upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB file size limit

            // Check file type
            if (!allowedTypes.includes(file.type)) {
                setErrorMessage('Only JPG, JPEG, and PNG file types are allowed.');
                setShowErrorPopup(true);
                return;
            }

            // Check file size
            if (file.size > maxSize) {
                setErrorMessage('File size must not exceed 5MB.');
                setShowErrorPopup(true);
                return;
            }

            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setErrorMessage('User ID is missing. Please log in again.');
                setShowErrorPopup(true);
                return;
            }

            formDataToSend.append('user_id', userId);
            formDataToSend.append('bio', formData.bio);
            formDataToSend.append('subjects', formData.subjects.join(','));
            formDataToSend.append('location', formData.location.join(','));
            formDataToSend.append('language', formData.language.join(','));
            if (profilePic) {
                formDataToSend.append('profilePic', profilePic);
            }

            const response = await fetch(`${API_BASE_URL}/api/tutor-profile/`, {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/tutor-landing');
            } else {
                setErrorMessage(data.message || 'Something went wrong!');
                setShowErrorPopup(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setShowErrorPopup(true);
        }
    };

    // Close error popup
    const closePopup = () => {
        setShowErrorPopup(false);
    };

    return (
        <div className="tutor-profile-page">
            <Header />
            <div className="form-container">
                <h2>Tutor Profile</h2>
                <p>Set up your tutor profile to connect with students!</p>

                <form id="tutor-profile-form" onSubmit={handleSubmit}>
                    {/* Profile Picture Input */}
                    <label htmlFor="profilePic">Profile Picture:</label>
                    <input
                        type="file"
                        id="profilePic"
                        name="profilePic"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                    />
                    {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}

                    {/* Bio Input */}
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Write a brief bio about yourself"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        required
                    ></textarea>

                    {/* Subjects Checkboxes */}
                    <label>Subjects:</label>
                    <div className="checkbox-group">
                        {['Math', 'English', 'Physics', 'Science', 'Chemistry', 'History', 'Art'].map((subject) => (
                            <div key={subject}>
                                <input
                                    type="checkbox"
                                    name="subjects"
                                    value={subject}
                                    checked={formData.subjects.includes(subject)}
                                    onChange={handleCheckboxChange}
                                />
                                <label>{subject}</label>
                            </div>
                        ))}
                    </div>

                    {/* Location Checkboxes */}
                    <label>Location:</label>
                    <div className="checkbox-group">
                        {['Seattle', 'Kirkland', 'Bellevue', 'Redmond', 'Kent', 'Renton', 'Lynnwood', 'Tukwila'].map((location) => (
                            <div key={location}>
                                <input
                                    type="checkbox"
                                    name="location"
                                    value={location}
                                    checked={formData.location.includes(location)}
                                    onChange={handleCheckboxChange}
                                />
                                <label>{location}</label>
                            </div>
                        ))}
                    </div>

                    {/* Language Checkboxes */}
                    <label>Language:</label>
                    <div className="checkbox-group">
                        {['English', 'Spanish', 'Japanese', 'Korean', 'Chinese', 'Russian'].map((language) => (
                            <div key={language}>
                                <input
                                    type="checkbox"
                                    name="language"
                                    value={language}
                                    checked={formData.language.includes(language)}
                                    onChange={handleCheckboxChange}
                                />
                                <label>{language}</label>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Save Profile</button>
                </form>
            </div>

            {/* Error Popup */}
            {showErrorPopup && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{errorMessage}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TutorBuildProfile;

