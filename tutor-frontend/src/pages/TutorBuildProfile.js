import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TutorBuildProfile.css';
import Header from '../components/header.js';

function TutorBuildProfile() {
    const [formData, setFormData] = useState({
        bio: '',
        subjects: '',
        location: '',
        language: '',
    });

    const [profilePic, setProfilePic] = useState(null); // State for profile picture
    const [preview, setPreview] = useState(null); // State for image preview
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData(); // Create FormData for file upload
            formDataToSend.append('bio', formData.bio);
            formDataToSend.append('subjects', formData.subjects);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('language', formData.language);
            if (profilePic) {
                formDataToSend.append('profilePic', profilePic); // Append the profile picture
            }

            console.log('FormData being sent:', formDataToSend); // Debugging

            const response = await fetch('http://127.0.0.1:8000/api/tutor-profile/', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();
            console.log('Response from backend:', data); // Debugging

            if (response.ok) {
                navigate('/dashboard'); // Redirect to tutor dashboard
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
                    <label htmlFor="profilePic">Profile Picture:</label>
                    <input
                        type="file"
                        id="profilePic"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}

                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Write a brief bio about yourself"
                        value={formData.bio}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <label htmlFor="subjects">Subjects:</label>
                    <input
                        type="text"
                        id="subjects"
                        name="subjects"
                        placeholder="E.g., Math, Science, English"
                        value={formData.subjects}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter your location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="language">Language:</label>
                    <input
                        type="text"
                        id="language"
                        name="language"
                        placeholder="Languages you speak"
                        value={formData.language}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Save Profile</button>
                </form>
            </div>

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
