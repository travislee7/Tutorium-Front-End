// import React, { useState } from 'react';
// import Header from '../components/header.js';
// import Footer from '../components/footer.js';
// import '../styles/LandingPage.css';

// function LandingPage() {
//     const [subject, setSubject] = useState('');
//     const [location, setLocation] = useState('');
//     const [language, setLanguage] = useState('');
//     const [tutors, setTutors] = useState([]);
//     const [hasSearched, setHasSearched] = useState(false);

//     const handleSubmit = async () => {
//         const queryParams = new URLSearchParams();
//         if (subject) queryParams.append('subject', subject);
//         if (location) queryParams.append('location', location);
//         if (language) queryParams.append('language', language);

//         try {
//             const response = await fetch(`http://127.0.0.1:8000/api/search-tutors/?${queryParams.toString()}`);
//             if (!response.ok) {
//                 console.error(`Error fetching tutors: ${response.status} ${response.statusText}`);
//                 return;
//             }
//             const data = await response.json();
//             console.log("Response Data:", data);
//             setTutors(data);
//             setHasSearched(true);
//         } catch (error) {
//             console.error("Error during fetch or JSON parsing:", error);
//         }
//     };

//     return (
//         <div className="LandingPage">
//             <Header />
//             <div className="LandingPage-content">
//                 <div className="dropdown-container">
//                     <div className="subject-select">
//                         <select onChange={(e) => setSubject(e.target.value)}>
//                             <option value="">Select a subject</option>
//                             <option value="Math">Math</option>
//                             <option value="Science">Science</option>
//                             <option value="English">English</option>
//                             <option value="History">History</option>
//                             <option value="Physics">Physics</option>
//                             <option value="Chemistry">Chemistry</option>
//                             <option value="Art">Art</option>
//                         </select>
//                     </div>
//                     <div className="location-select">
//                         <select onChange={(e) => setLocation(e.target.value)}>
//                             <option value="">Select a location</option>
//                             <option value="Seattle">Seattle</option>
//                             <option value="Bellevue">Bellevue</option>
//                             <option value="Kent">Kent</option>
//                             <option value="Renton">Renton</option>
//                             <option value="Lynnwood">Lynnwood</option>
//                             <option value="Tukwila">Tukwila</option>
//                             <option value="Kirkland">Kirkland</option>
//                             <option value="Redmond">Redmond</option>
//                         </select>
//                     </div>
//                     <div className="language-select">
//                         <select onChange={(e) => setLanguage(e.target.value)}>
//                             <option value="">Select a language</option>
//                             <option value="English">English</option>
//                             <option value="Spanish">Spanish</option>
//                             <option value="Japanese">Japanese</option>
//                             <option value="Korean">Korean</option>
//                             <option value="Chinese">Chinese</option>
//                             <option value="Russian">Russian</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="submitbutton">
//                     <button className="submit" onClick={handleSubmit}>
//                         Submit
//                     </button>
//                 </div>

//                 <div className="divider" />

//                 <div className="tutor-cards">
//                     {hasSearched && tutors.length === 0 && (
//                         <p>No tutors found. Try a different search.</p>
//                     )}
//                     {tutors.map((tutor, index) => (
//                         <div key={index} className="tutor-card">
//                             <div
//                                 className="tutor-card-img"
//                                 style={{
//                                     backgroundImage: `url(${tutor.profile_picture})`,
//                                 }}
//                             ></div>
//                             <h3>{`${tutor.user__first_name} ${tutor.user__last_name}`}</h3>

//                             {/* Subjects Label and Bubbles */}
//                             <div>
//                                 <p className="bubble-label">Subjects:</p>
//                                 <div className="bubble-container">
//                                     {tutor.subjects.split(',').map((subject, idx) => (
//                                         <span key={idx} className="bubble">
//                                             {subject.trim()}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Locations Label and Bubbles */}
//                             <div>
//                                 <p className="bubble-label">Locations:</p>
//                                 <div className="bubble-container">
//                                     {tutor.location.split(',').map((loc, idx) => (
//                                         <span key={idx} className="bubble">
//                                             {loc.trim()}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Languages Label and Bubbles */}
//                             <div>
//                                 <p className="bubble-label">Languages:</p>
//                                 <div className="bubble-container">
//                                     {tutor.language.split(',').map((lang, idx) => (
//                                         <span key={idx} className="bubble">
//                                             {lang.trim()}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <Footer className="LandingPage-footer" />
//         </div>
//     );
// }

// export default LandingPage;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import '../styles/LandingPage.css';

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
            const response = await fetch(`http://127.0.0.1:8000/api/search-tutors/?${queryParams.toString()}`);
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
                            onClick={() => navigate(`/tutor/${tutor.user__id}`)} // Navigate to tutor profile page
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="tutor-card-img"
                                style={{
                                    backgroundImage: `url(${tutor.profile_picture})`,
                                }}
                            ></div>
                            <h3>{`${tutor.user__first_name} ${tutor.user__last_name}`}</h3>

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
