// import React, { useEffect, useState } from 'react';
// import Header from '../components/header';

// const TutorLandingPage = () => {
//     const [viewCount, setViewCount] = useState(null);
//     const userId = localStorage.getItem('userId'); // Tutor ID

//     useEffect(() => {
//         if (userId) {
//             fetch(`http://127.0.0.1:8000/api/tutor/${userId}/view-count/`)
//                 .then((res) => res.json())
//                 .then((data) => {
//                     if (data.view_count !== undefined) {
//                         setViewCount(data.view_count);
//                     }
//                 })
//                 .catch((err) => {
//                     console.error('Error fetching view count:', err);
//                 });
//         }
//     }, [userId]);

//     return (
//         <div>
//             <Header />
//             <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                 <h1>Tutor Landing Page</h1>
//                 {viewCount !== null && (
//                     <p style={{ fontSize: '18px' }}>
//                         <strong>Number of Views:</strong> {viewCount}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TutorLandingPage;

import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

const TutorLandingPage = () => {
    const [viewCount, setViewCount] = useState(null);
    const [viewHistory, setViewHistory] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            // Fetch total view count
            fetch(`http://127.0.0.1:8000/api/tutor/${userId}/view-count/`)
                .then((res) => res.json())
                .then((data) => {
                    setViewCount(data.view_count ?? 0);
                })
                .catch((err) => console.error('Error fetching view count:', err));

            // Fetch view history per day
            fetch(`http://127.0.0.1:8000/api/tutor/${userId}/view-history/`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.history) {
                        setViewHistory(data.history);
                    }
                })
                .catch((err) => console.error('Error fetching view history:', err));
        }
    }, [userId]);

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Tutor Landing Page</h1>

                {viewCount !== null && (
                    <p style={{ fontSize: '18px' }}>
                        <strong>Total Views:</strong> {viewCount}
                    </p>
                )}

                <h2>Daily View History</h2>
                {viewHistory.length > 0 ? (
                    <ResponsiveContainer width="95%" height={300}>
                        <BarChart data={viewHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="views" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No view history available.</p>
                )}
            </div>
        </div>
    );
};

export default TutorLandingPage;

