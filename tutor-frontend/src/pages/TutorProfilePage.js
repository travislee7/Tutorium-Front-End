import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/TutorProfilePage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;
 
function TutorProfilePage() {
    const { tutorId } = useParams();
    const studentID = localStorage.getItem('userId') || '';
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [formData, setFormData] = useState({
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
        email: localStorage.getItem('email') || '',
        description: '',
    });
 
    useEffect(() => {
        const fetchTutorDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/tutor-details/${tutorId}/`);
                if (!response.ok) {
                    console.error(`Error fetching tutor details: ${response.status} ${response.statusText}`);
                    return;
                }
                const data = await response.json();
                setTutor(data);
 
                // Check bookmark status
                const bookmarkResponse = await fetch(`${API_BASE_URL}/api/is-tutor-bookmarked/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ studentID, tutorID: tutorId }),
                });
                const bookmarkData = await bookmarkResponse.json();
                if (bookmarkResponse.ok) {
                    setIsBookmarked(bookmarkData.isBookmarked);
                }
            } catch (error) {
                console.error("Error fetching tutor details or bookmark status:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTutorDetails();
    }, [tutorId, studentID]);
 
    /**
     * This function returns an array of length 5 (for 5 stars).
     * Each element is the "fill percentage" of that star (0% to 100%).
     * For example, if rating = 3.43:
     * - Star 1 (index 0): fill = 100%
     * - Star 2 (index 1): fill = 100%
     * - Star 3 (index 2): fill = 100%
     * - Star 4 (index 3): fill = 43%
     * - Star 5 (index 4): fill = 0%
     */
    const renderStars = (rating = 0) => {
        const totalStars = 5;
        const stars = [];
 
        for (let i = 0; i < totalStars; i++) {
            // starIndex 0 => 1st star, starIndex 1 => 2nd star, etc.
            const starIndex = i;
            // how much rating is left for this star
            const starValue = rating - starIndex;
 
            let fillPercentage = 0;
            if (starValue >= 1) {
                fillPercentage = 100; // fully filled
            } else if (starValue > 0) {
                fillPercentage = starValue * 100; // partial fill
            }
            stars.push(fillPercentage);
        }
        return stars;
    };
 
    const handleToggleBookmark = async () => {
        if (!formData.firstName || !formData.lastName) {
            alert("Make an account first, to use the bookmarking feature");
            return;
        }
        try {
            const endpoint = isBookmarked
                ? `${API_BASE_URL}/api/unbookmark-tutor/`
                : `${API_BASE_URL}/api/bookmark-tutor/`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID, tutorID: tutorId }),
            });
            const data = await response.json();
            if (response.ok) {
                setIsBookmarked((prev) => !prev);
                alert(data.message || (isBookmarked ? 'Tutor unbookmarked' : 'Tutor bookmarked'));
            } else {
                console.error(data.error || 'Failed to toggle bookmark.');
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };
 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            ...formData,
            tutorFirstName: tutor.user__first_name,
            tutorLastName: tutor.user__last_name,
            tutorId,
            studentID,
        };
        try {
            const response = await fetch(`${API_BASE_URL}/api/tutor-request-email/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
            if (response.ok) {
                // ALSO send the second request to save request form info
                const saveInfoResponse = await fetch(`${API_BASE_URL}/api/save-request-form-info/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requesterFirstName: formData.firstName,
                        requesterLastName: formData.lastName,
                        requesterEmail: formData.email,
                        requesterDescription: formData.description,
                        tutorID: tutorId,
                    }),
                });

                if (!saveInfoResponse.ok) {
                    console.error('Failed to save request form info.');
                }


                alert('Your request has been submitted successfully! You will receive an email receipt shortly.');
                setFormData({ ...formData, description: '' });
            } 
            else {
                alert('Failed to send your request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred. Please try again.');
        }
    };
 
    if (loading) return <p>Loading...</p>;
    if (!tutor) return <p>Error loading tutor details.</p>;
 
    return (
        <div className="TutorProfilePage">
            <Header />
            <div className="profile-content">
                <div className="profile-card">
                    <div
                        className="tutor-card-img"
                        style={{ backgroundImage: `url(${tutor.profile_picture})` }}
                    ></div>
                    <h3>{`${tutor.user__first_name} ${tutor.user__last_name}`}</h3>
 
                    {/* Display the average rating as partial stars */}
                    <div className="bubble-container">
                        <p className="bubble-label">Average Rating:</p>
                        <div className="stars">
                            {renderStars(tutor.average_rating).map((fill, idx) => (
                                <span
                                    key={idx}
                                    className="star"
                                    style={{ '--fill': `${fill}%` }}
                                ></span>
                            ))}
                        </div>
                    </div>
 
                    <div className="bubble-container">
                        <p className="bubble-label">Bio:</p>
                        <p>{tutor.bio}</p>
                    </div>
                    <div className="bubble-container">
                        <p className="bubble-label">Subjects:</p>
                        {tutor.subjects.split(',').map((subject, idx) => (
                            <span key={idx} className="bubble">
                                {subject.trim()}
                            </span>
                        ))}
                    </div>
                    <div className="bubble-container">
                        <p className="bubble-label">Locations:</p>
                        {tutor.location.split(',').map((loc, idx) => (
                            <span key={idx} className="bubble">
                                {loc.trim()}
                            </span>
                        ))}
                    </div>
                    <div className="bubble-container">
                        <p className="bubble-label">Languages:</p>
                        {tutor.language.split(',').map((lang, idx) => (
                            <span key={idx} className="bubble">
                                {lang.trim()}
                            </span>
                        ))}
                    </div>
                    <div className="action-buttons">
                        <button
                            className="bookmark-icon"
                            onClick={handleToggleBookmark}
                            aria-label="Bookmark"
                        >
                            {isBookmarked ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#C3FC8B"
                                    viewBox="0 0 16 16"
                                    className="bookmark-icon--filled"
                                >
                                    <path d="M2 2v13.5l6-3 6 3V2z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#ccc"
                                    viewBox="0 0 16 16"
                                    className="bookmark-icon--empty"
                                >
                                    <path d="M2 2v13.5l6-3 6 3V2z" fill="none" />
                                    <path d="M2 2h12v13.5l-6-3-6 3z" />
                                </svg>
                            )}
                        </button>
 
                        <button
                            className="add-review-button"
                            onClick={() => {
                                if (!formData.firstName || !formData.lastName) {
                                    alert("You need to create an account to leave a review!");
                                    return;
                                }
                                window.location.href = `/tutor/${tutorId}/review`;
                            }}
                        >
                            Add Review
                        </button>
                    </div>
                </div>
                <div className="form-container">
                    <h2>Request Tutor</h2>
                    <form id="request-form" onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Send Request</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default TutorProfilePage;