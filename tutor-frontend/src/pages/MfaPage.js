// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/MfaPage.css';

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// function VerifyCodePage() {
//     const [email, setEmail] = useState(localStorage.getItem('email') || '');
//     const [code, setCode] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleVerify = async () => {
//         if (!email) {
//             setError("Email is required for verification.");
//             return;
//         }
    
//         const mode = localStorage.getItem('authFlow') || 'signin'; // fallback just in case
    
//         console.log('Verifying email:', email, 'with code:', code, 'and mode:', mode);
    
//         const response = await fetch(`${API_BASE_URL}/api/verify-2fa-code/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, code, mode }),
//         });
    
//         const data = await response.json();
    
//         if (response.ok) {
//             localStorage.setItem('userId', data.user_id);
//             const userType = localStorage.getItem('userType');
//             if (userType === 'tutor') {
//                 navigate('/apply');
//             } else {
//                 navigate('/');
//             }
//         } else {
//             setError(data.error || 'Invalid or expired code');
//         }
//     };
    

//     return (
//         <div className="verify-code-page">
//             <h2>Verify Your Email</h2>
//             <p>Enter the 6-digit code sent to <strong>{email}</strong></p>
//             <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Enter 2FA code"
//             />
//             <button onClick={handleVerify}>Verify</button>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// }


// export default VerifyCodePage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MfaPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function VerifyCodePage() {
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleVerify = async () => {
        if (!email) {
            setError("Email is required for verification.");
            return;
        }

        const mode = localStorage.getItem('authFlow') || 'signin'; // fallback just in case

        console.log('Verifying email:', email, 'with code:', code, 'and mode:', mode);

        const response = await fetch(`${API_BASE_URL}/api/verify-2fa-code/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code, mode }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userId', data.user_id);
            const intention = localStorage.getItem('intent');
            console.log('intention type:', intention);
            if (intention === 'tutor') {
                navigate('/apply');
            } else {
                navigate('/');
            }
        } else {
            console.error('Verification failed:', data);
            setError(data.error || 'Invalid or expired code');
        }
    };


    return (
        <div className="verify-code-page">
            <h2>Verify Your Email</h2>
            <p>Enter the 6-digit code sent to <strong>{email}</strong></p>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 2FA code"
            />
            <button onClick={handleVerify}>Verify</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}


export default VerifyCodePage;
