import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/BookmarksPage.css';
import { useNavigate } from 'react-router-dom';

function BookmarksPage() {
    const [bookmarkedTutors, setBookmarkedTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const studentID = localStorage.getItem('userId'); // Get studentID from localStorage

    useEffect(() => {
        const fetchBookmarkedTutors = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/bookmarked-tutors/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ studentID }),
                });

                const data = await response.json();
                if (response.ok) {
                    setBookmarkedTutors(data.bookmarked_tutors || []);
                } else {
                    console.error(data.error || 'Failed to fetch bookmarked tutors');
                }
            } catch (error) {
                console.error('Error fetching bookmarked tutors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarkedTutors();
    }, [studentID]);

    if (loading) return <p>Loading bookmarked tutors...</p>;

    return (
        <div className="BookmarksPage">
            <Header />
            <div className="BookmarksPage-content">
                <h2>Your Bookmarked Tutors</h2>
                <div className="tutor-cards">
                    {bookmarkedTutors.length === 0 ? (
                        <p>No bookmarked tutors.</p>
                    ) : (
                        bookmarkedTutors.map((tutor, index) => (
                            <div
                                key={index}
                                className="tutor-card"
                                onClick={() => navigate(`/tutor/${tutor.tutorID}`)} // Navigate to tutor profile page
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Profile Picture */}
                                <div
                                    className="tutor-card-img"
                                    style={{
                                        backgroundImage: `url(${tutor.profile_picture})`, // Render S3 URL
                                    }}
                                ></div>

                                <h3>{tutor.name}</h3>

                                {/* Subjects Label and Bubbles */}
                                <div>
                                    <p className="bubble-label">Subjects:</p>
                                    <div className="bubble-container">
                                        {tutor.subjects.split(',').map((subject, idx) => (
                                            <span key={idx} className="bubble">
                                                {subject.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Locations Label and Bubbles */}
                                <div>
                                    <p className="bubble-label">Locations:</p>
                                    <div className="bubble-container">
                                        {tutor.location.split(',').map((loc, idx) => (
                                            <span key={idx} className="bubble">
                                                {loc.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Languages Label and Bubbles */}
                                <div>
                                    <p className="bubble-label">Languages:</p>
                                    <div className="bubble-container">
                                        {tutor.languages.split(',').map((lang, idx) => (
                                            <span key={idx} className="bubble">
                                                {lang.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookmarksPage;
