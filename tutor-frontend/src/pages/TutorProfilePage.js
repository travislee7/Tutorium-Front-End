import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/TutorProfilePage.css';

function TutorProfilePage() {
    const { tutorId } = useParams();
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
        email: localStorage.getItem('email') || '',
        description: '',
    });

    useEffect(() => {
        const fetchTutorDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/tutor-details/${tutorId}/`);
                if (!response.ok) {
                    console.error(`Error fetching tutor details: ${response.status} ${response.statusText}`);
                    return;
                }
                const data = await response.json();
                setTutor(data);
            } catch (error) {
                console.error("Error during fetch or JSON parsing:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutorDetails();
    }, [tutorId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
                </div>

                <div className="form-container">
                    <h2>Request Tutor</h2>
                    <form id="request-form">
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
