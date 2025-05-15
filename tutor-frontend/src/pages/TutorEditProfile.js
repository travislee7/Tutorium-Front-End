import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TutorBuildProfile.css';
import Header from '../components/header.js';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function TutorEditProfile() {
    const [formData, setFormData] = useState({
        bio: '',
        subjects: [],
        location: [],
        language: [],
        gender: '',
        hourly_rate: ''
    });

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [profilePic, setProfilePic] = useState(null); // State for new profile picture
    const [preview, setPreview] = useState(null); // State for profile picture preview
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const navigate = useNavigate();

    // 📊 Fetch existing profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            try {
                // Fetch profile data
                const profileResponse = await fetch(`${API_BASE_URL}/api/tutor-profile-read/?user_id=${userId}`);
                const profileData = await profileResponse.json();

                if (profileResponse.ok) {
                    setFormData({
                        bio: profileData.bio || '',
                        subjects: profileData.subjects ? profileData.subjects.split(',') : [],
                        location: profileData.location ? profileData.location.split(',') : [],
                        language: profileData.language ? profileData.language.split(',') : [],
                        gender: profileData.gender || '',
                        hourly_rate: profileData.hourly_rate || '',
                    });
                    if (profileData.profile_picture) {
                        setPreview(profileData.profile_picture);
                    }
                }

                // Fetch user data
                const userResponse = await fetch(`${API_BASE_URL}/api/student-user/?user_id=${userId}`);
                const userData = await userResponse.json();

                if (userResponse.ok) {
                    setUserData({
                        firstName: userData.first_name || '',
                        lastName: userData.last_name || '',
                        email: userData.email || '',
                    });
                } else {
                    setErrorMessage(userData.error || 'Failed to fetch user data.');
                    setShowErrorPopup(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('An error occurred while fetching data.');
                setShowErrorPopup(true);
            }
        };

        fetchProfileData();
    }, []);

    // ✅ Handle checkbox changes for subjects, location, and language
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter((item) => item !== value),
        }));
    };

    // 🛡️ **Validate and Handle Profile Picture Upload**
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB file size limit

            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                setErrorMessage('Only JPG, JPEG, and PNG file types are allowed.');
                setShowErrorPopup(true);
                return;
            }

            // Validate file size
            if (file.size > maxSize) {
                setErrorMessage('File size must not exceed 5MB.');
                setShowErrorPopup(true);
                return;
            }

            setProfilePic(file); 
            setPreview(URL.createObjectURL(file));
        }
    };

    // 📤 Handle form submission
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
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('hourly_rate', formData.hourly_rate);


            // Add new profile picture if selected; else retain the current preview
            if (profilePic) {
                formDataToSend.append('profilePic', profilePic);
            } else if (preview) {
                formDataToSend.append('existingProfilePic', preview); // Send existing profile picture URL
            }

            const response = await fetch(`${API_BASE_URL}/api/tutor-profile/`, {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                //navigate('/tutor-landing');
                navigate('/tutor-landing', { state: { refreshProfile: true } });

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

    // Close Error Popup
    const closePopup = () => {
        setShowErrorPopup(false);
    };

    return (
        <div className="tutor-profile-page">
            <Header />
            <div className="form-container">
                <h2>Edit Tutor Profile</h2>
                <p>Update your tutor profile details below.</p>

                <div className="uneditable-fields">
                    <p><strong>First Name:</strong> {userData.firstName}</p>
                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>

                <form id="tutor-profile-form" onSubmit={handleSubmit}>
                    {/* Profile Picture */}
                    <label htmlFor="profilePic">Profile Picture:</label>
                    <input
                        type="file"
                        id="profilePic"
                        name="profilePic"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                    />
                    {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}

                    {/* Bio */}
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        required
                    ></textarea>

                    {/* Subjects */}
                    <label>Subjects:</label>
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

                    {/* Location */}
                    <label>Location:</label>
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

                    {/* Language */}
                    <label>Language:</label>
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

                    {/* Gender Radio Buttons */}
                    <label>Gender:</label>
                    <div className="radio-group">
                        {['Male', 'Female'].map((g) => (
                            <div key={g}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    checked={formData.gender === g}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    required
                                />
                                <label>{g}</label>
                            </div>
                        ))}
                    </div>

                    {/* Hourly Rate Input */}
                    <label htmlFor="hourlyRate">Hourly Rate ($):</label>
                    <input
                        type="number"
                        id="hourlyRate"
                        name="hourly_rate"
                        min="0"
                        step="1"
                        placeholder="Enter your rate"
                        value={formData.hourly_rate}
                        onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                    />

                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default TutorEditProfile;


