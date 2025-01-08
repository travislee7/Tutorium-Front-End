import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/TutorProfilePage.css';

function TutorProfilePage() {
    const { tutorId } = useParams();
    const studentID = localStorage.getItem('userId') || ''; // Retrieve studentID from localStorage
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false); // Bookmark state
    const [formData, setFormData] = useState({
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
        email: localStorage.getItem('email') || '',
        description: '',
    });

    useEffect(() => {
        const fetchTutorDetails = async () => {
            try {
                // Fetch tutor details
                const response = await fetch(`http://127.0.0.1:8000/api/tutor-details/${tutorId}/`);
                if (!response.ok) {
                    console.error(`Error fetching tutor details: ${response.status} ${response.statusText}`);
                    return;
                }
                const data = await response.json();
                setTutor(data);

                // Check if the tutor is bookmarked
                const bookmarkResponse = await fetch('http://127.0.0.1:8000/api/is-tutor-bookmarked/', {
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

    const handleToggleBookmark = async () => {

        // Check if the user is logged in (firstName and lastName exist)
        if (!formData.firstName || !formData.lastName) {
            alert("Make an account first, to use the bookmarking feature");
            return;
        }


        try {
            const endpoint = isBookmarked
                ? 'http://127.0.0.1:8000/api/unbookmark-tutor/' // Unbookmark API
                : 'http://127.0.0.1:8000/api/bookmark-tutor/'; // Bookmark API
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID, tutorID: tutorId }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsBookmarked((prev) => !prev); // Toggle bookmark state
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
            studentID, // Include studentID in the request payload
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/tutor-request-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                alert('Your request has been submitted successfully! You will receive an email receipt shortly.');
                setFormData({ ...formData, description: '' }); // Clear the description field
            } else {
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
                        style={{
                            backgroundImage: `url(${tutor.profile_picture})`,
                        }}
                    ></div>
                    <h3>{`${tutor.user__first_name} ${tutor.user__last_name}`}</h3>

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



                    {/* Bookmark Icon */}
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
                                onClick={() => window.location.href = `/tutor/${tutorId}/review`}
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
                        ></textarea>

                        <button type="submit">Send Request</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TutorProfilePage;
