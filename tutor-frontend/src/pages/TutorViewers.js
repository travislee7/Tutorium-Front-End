import React, { useEffect, useState } from 'react';
import Header from '../components/header';

const TutorViewersPage = () => {
    const [viewers, setViewers] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetch(`http://127.0.0.1:8000/api/tutor/${userId}/viewers/`)
                .then(res => res.json())
                .then(data => {
                    setViewers(data.viewers || []);
                })
                .catch(err => console.error('Error fetching viewers:', err));
        }
    }, [userId]);

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const viewed = new Date(timestamp);
        const diffMs = now - viewed;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 60) {
            return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        }
    };

    return (
        <div>
            <Header />
            <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '25px', fontSize: '26px', textAlign: 'center' }}>
                    Who Viewed Your Profile
                </h2>

                {viewers.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {viewers.map((viewer, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '16px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <span style={{ fontWeight: 500, fontSize: '16px' }}>
                                    {`${viewer.first_name}${viewer.last_name ? ' ' + viewer.last_name : ''}`}
                                </span>
                                <span style={{ color: '#666', fontSize: '14px' }}>
                                    {getTimeAgo(viewer.timestamp)}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: '#777' }}>No views yet.</p>
                )}
            </div>
        </div>
    );
};

export default TutorViewersPage;
