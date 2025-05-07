import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import '../styles/LandingPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;
 
function LandingPage() {
    const [subject, setSubject] = useState('');
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('');
    const [tutors, setTutors] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
 
    const handleSubmit = async () => {
        const queryParams = new URLSearchParams();
        if (subject) queryParams.append('subject', subject);
        if (location) queryParams.append('location', location);
        if (language) queryParams.append('language', language);
 
        try {
            const response = await fetch(`${API_BASE_URL}/api/search-tutors/?${queryParams.toString()}`);
            if (!response.ok) {
                console.error(`Error fetching tutors: ${response.status} ${response.statusText}`);
                return;
            }
            const data = await response.json();
            console.log("Response Data:", data);
            setTutors(data);
            setHasSearched(true);
        } catch (error) {
            console.error("Error during fetch or JSON parsing:", error);
        }
    };
 
    /**
     * Renders an array of 5 stars, each with a fill percentage (0% to 100%).
     * For example, if rating=3.43:
     *  - Star 1: 100%
     *  - Star 2: 100%
     *  - Star 3: 100%
     *  - Star 4: 43%
     *  - Star 5: 0%
     */
    const renderStars = (rating = 0) => {
        const totalStars = 5;
        const stars = [];
 
        for (let i = 0; i < totalStars; i++) {
            const starValue = rating - i; // how much rating is left for this star
            let fillPercentage = 0;
            if (starValue >= 1) {
                fillPercentage = 100; // full star
            } else if (starValue > 0) {
                fillPercentage = starValue * 100; // partial star
            }
            stars.push(fillPercentage);
        }
        return stars;
    };
 
    return (
        <div className="LandingPage">
            <Header />
            <div className="LandingPage-content">
                <div className="dropdown-container">
                    <div className="subject-select">
                        <select onChange={(e) => setSubject(e.target.value)}>
                            <option value="">Select a subject</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>
                    <div className="location-select">
                        <select onChange={(e) => setLocation(e.target.value)}>
                            <option value="">Select a location</option>
                            <option value="Seattle">Seattle</option>
                            <option value="Bellevue">Bellevue</option>
                            <option value="Kent">Kent</option>
                            <option value="Renton">Renton</option>
                            <option value="Lynnwood">Lynnwood</option>
                            <option value="Tukwila">Tukwila</option>
                            <option value="Kirkland">Kirkland</option>
                            <option value="Redmond">Redmond</option>
                        </select>
                    </div>
                    <div className="language-select">
                        <select onChange={(e) => setLanguage(e.target.value)}>
                            <option value="">Select a language</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Korean">Korean</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Russian">Russian</option>
                        </select>
                    </div>
                </div>
 
                <div className="submitbutton">
                    <button className="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
 
                <div className="divider" />
 
                <div className="tutor-cards">
                    {hasSearched && tutors.length === 0 && (
                        <p>No tutors found. Try a different search.</p>
                    )}
                    {tutors.map((tutor, index) => (
                        <div
                            key={index}
                            className="tutor-card"
                            onClick={() => 
                                
                            {
                                const viewerId = localStorage.getItem('userId');
                                const tutorId = tutor.user__id;

                                // Log the profile view
                                fetch(`${API_BASE_URL}/api/log-view/`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        tutor_id: tutorId,
                                        viewer_id: viewerId,
                                    }),
                                })
                                    .then((res) => res.json())
                                    .then((data) => console.log('View log response:', data))
                                    .catch((err) => console.error('Failed to log view:', err));

                                //.catch((err) => console.error('Failed to log view:', err));

                                
                                navigate(`/tutor/${tutor.user__id}`); }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="tutor-card-img"
                                style={{
                                    backgroundImage: `url(${tutor.profile_picture})`,
                                }}
                            ></div>
                            <h3>{`${tutor.user__first_name} ${tutor.user__last_name}`}</h3>
 
                            {/* Average Rating Stars */}
                            <div className="stars">
                                {renderStars(tutor.average_rating).map((fill, idx) => (
                                    <span
                                        key={idx}
                                        className="star"
                                        style={{ '--fill': `${fill}%` }}
                                    ></span>
                                ))}
                            </div>
 
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
                                    {tutor.language.split(',').map((lang, idx) => (
                                        <span key={idx} className="bubble">
                                            {lang.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer className="LandingPage-footer" />
        </div>
    );
}
 
export default LandingPage;