// import React from 'react';
// import Header from '../components/header';

// const TutorLandingPage = () => {
//     return (
//         <div>
//             <Header />
//             <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                 <h1>Tutor Landing Page</h1>
//             </div>
//         </div>
//     );
// };

// export default TutorLandingPage; 

import React, { useEffect, useState } from 'react';
import Header from '../components/header';

const TutorLandingPage = () => {
    const [viewCount, setViewCount] = useState(null);
    const userId = localStorage.getItem('userId'); // Tutor ID

    useEffect(() => {
        if (userId) {
            fetch(`http://127.0.0.1:8000/api/tutor/${userId}/view-count/`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.view_count !== undefined) {
                        setViewCount(data.view_count);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching view count:', err);
                });
        }
    }, [userId]);

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Tutor Landing Page</h1>
                {viewCount !== null && (
                    <p style={{ fontSize: '18px' }}>
                        <strong>Number of Views:</strong> {viewCount}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TutorLandingPage;

