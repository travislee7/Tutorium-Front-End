import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TutorRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetch(`${API_BASE_URL}/api/tutor/${userId}/request-list/`)
                .then((res) => res.json())
                .then((data) => {
                    setRequests(data.requests || []);
                })
                .catch((err) => console.error('Error fetching tutor requests:', err));
        }
    }, [userId]);

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const created = new Date(timestamp);
        const diffMs = now - created;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    };

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Tutor Requests</h1>
                <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
                    Back
                </button>

                {requests.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
                        {requests.map((req, idx) => (
                            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'left' }}>
                                <p><strong>Description:</strong> {req.requesterDescription}</p>
                                <p><strong>Submitted:</strong> {formatTimeAgo(req.created_at)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No requests found.</p>
                )}
            </div>
        </div>
    );
};

export default TutorRequestsPage;
