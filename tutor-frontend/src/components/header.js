// import React, { useState, useEffect } from 'react';
// import logo from '../assets/logo.png';
// import '../styles/Header.css';
// import { useNavigate, useLocation } from 'react-router-dom';

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// function Header({ hideApplyButton = false }) {
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Check if the current path matches "/tutor/:tutorId"
//     const tutorPathRegex = /^\/tutor\/\d+(\/review)?$/;
//     const isTutorPath = tutorPathRegex.test(location.pathname);

//     // Get user information from localStorage
//     const firstName = localStorage.getItem('firstName');
//     const lastName = localStorage.getItem('lastName');
//     const isLoggedIn = firstName && lastName; // Check if the user is logged in
//     const userId = localStorage.getItem('userId'); // Get the userId from localStorage

//     // State to store the approve_status, profile_complete, profile_picture, and loading status
//     const [approveStatus, setApproveStatus] = useState(null);
//     const [profileComplete, setProfileComplete] = useState(null);
//     const [profilePicture, setProfilePicture] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [showMenu, setShowMenu] = useState(false); // Manage dropdown menu visibility

//     useEffect(() => {
//         const fetchStatuses = async () => {
//             if (userId) {
//                 try {
//                     // Fetch approve_status
//                     const approveResponse = await fetch(`${API_BASE_URL}/api/tutor-approve-status/?user_id=${userId}`);
//                     const approveData = await approveResponse.json();
//                     setApproveStatus(approveData.approve_status);

//                     // Fetch profile_complete and profile_picture
//                     const profileResponse = await fetch(`${API_BASE_URL}/api/tutor-profile-read/?user_id=${userId}`);
//                     const profileData = await profileResponse.json();
//                     setProfileComplete(profileData.profile_complete);
//                     //setProfilePicture(profileData.profile_picture);
//                     setProfilePicture(`${profileData.profile_picture}?timestamp=${new Date().getTime()}`);


//                     console.log('approve_status:', approveData.approve_status);
//                     console.log('profile_data:', profileData);
//                 } catch (error) {
//                     console.error('Error fetching statuses:', error);
//                 } finally {
//                     setLoading(false); // Data fetching is complete
//                 }
//             } else {
//                 setLoading(false); // No user logged in
//             }
//         };

//         fetchStatuses();
//     }, [userId]);

//     // Navigation logic for the Tutorium logo click
//     const handleLogoClick = () => {
//         const tutorPages = ['/tutor-edit-profile', '/tutor-build-profile', '/tutor-landing', '/tutor-viewers' // ← ADD THIS
// ];
//         if (tutorPages.includes(location.pathname)) {
//             navigate('/tutor-landing'); // Redirect to TutorLandingPage
//         } else {
//             navigate('/'); // Redirect to LandingPage
//         }
//     };

//     // Function to handle "Fill Out Your Profile" button click
//     const handleFillOutProfileClick = () => {
//         navigate('/tutor-build-profile');
//     };

//     // Function to handle "Edit Your Profile" button click
//     const handleEditProfileClick = () => {
//         navigate('/tutor-edit-profile');
//     };

//     // Updated apply as tutor navigation to redirect to TutorSignupPage
//     const handleApplyAsTutorClick = () => {
//         if (!isLoggedIn) {
//             navigate('/tutor-signup?userType=student');
//         } else if (approveStatus === 'pending') {
//             navigate('/tutor-request-received');
//         } else {
//             navigate('/apply?userType=student');
//         }
//     };

//     // Function to toggle dropdown menu
//     const handleUserIconClick = () => {
//         setShowMenu((prev) => !prev);
//     };

//     // Function to handle user logout
//     const handleLogout = () => {
//         localStorage.clear(); // Clear user data from localStorage
//         navigate('/'); // Redirect to the home page
//     };

//     // Navigate to Switch Views
//     const handleSwitchToTutorView = () => {
//         navigate('/tutor-landing');
//     };

//     const handleSwitchToStudentView = () => {
//         navigate('/');
//     };

//     if (loading) {
//         return null; // Render nothing while loading
//     }

//     return (
//         <header className="Header">
//             <div className="Header-content">
//                 {/* Logo */}
//                 <img
//                     src={logo}
//                     className="Header-logo"
//                     alt="Tutorium Logo"
//                     onClick={handleLogoClick} // Redirect based on current page
//                     style={{ cursor: 'pointer' }}
//                 />
//                 <h1 className="Header-title">Tutorium</h1>
//             </div>

//             <div className="Header-actions">
//                 {isLoggedIn ? (
//                     <div className="User-info">
//                         {!hideApplyButton && location.pathname === '/tutor-landing' && (
//                             <>
//                                 {profileComplete === 'no' ? (
//                                     <button
//                                         className="Header-button--filloutprofile"
//                                         onClick={handleFillOutProfileClick}
//                                     >
//                                         Fill Out Your Profile
//                                     </button>
//                                 ) : profileComplete === 'yes' ? (
//                                     <button
//                                         className="Header-button--editprofile"
//                                         onClick={handleEditProfileClick}
//                                     >
//                                         Edit Your Profile
//                                     </button>
//                                 ) : null}
//                             </>
//                         )}

//                         {!hideApplyButton && location.pathname !== '/tutor-landing' && approveStatus !== 'approved' && (
//                             <button
//                                 className="Header-button--applytutor"
//                                 onClick={handleApplyAsTutorClick}
//                             >
//                                 Apply as a Tutor
//                             </button>
//                         )}

//                         {/* User Icon with initials or profile picture */}
//                         <div
//                             className="User-icon"
//                             onClick={handleUserIconClick}
//                             style={{
//                         //         backgroundImage: profileComplete === 'yes' && profilePicture ? `url(${profilePicture})` : undefined,
//                         //         backgroundSize: 'cover',
//                         //         backgroundPosition: 'center',
//                         //         backgroundColor: profileComplete !== 'yes' ? '#ccc' : undefined,
//                         //         color: profileComplete !== 'yes' ? 'white' : undefined,
//                         //         fontSize: profileComplete !== 'yes' ? '1.2em' : undefined,
//                         //     }}
//                         // >
//                         //     {location.pathname === '/' && `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}

//                                 backgroundImage:
//                                     (location.pathname === '/' || isTutorPath || location.pathname === '/bookmarked-tutors') && firstName && lastName
//                                         ? 'none' // Disable profile picture background on the landing page
//                                         : profileComplete === 'yes' && profilePicture
//                                             ? `url(${profilePicture})`
//                                             : undefined, // Use profile picture for other pages
//                                 backgroundSize: 'cover',
//                                 backgroundPosition: 'center',
//                                 backgroundColor:
//                                     (location.pathname === '/' || isTutorPath || location.pathname === '/bookmarked-tutors') && firstName && lastName
//                                         ? '#ccc' // Blank background when showing initials
//                                         : profileComplete !== 'yes'
//                                             ? '#ccc'
//                                             : undefined, // Default background color
//                                 color:
//                                     location.pathname === '/' && firstName && lastName
//                                         ? 'white' // White initials on landing page
//                                         : profileComplete !== 'yes'
//                                             ? 'white'
//                                             : undefined, // Text color for initials
//                                 fontSize: '1.2em', // Font size for initials
//                                 borderRadius: '50%', // Circular icon
//                                 width: '40px', // Icon size
//                                 height: '40px', // Icon size
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 cursor: 'pointer', // Interactive cursor
//                             }}
//                         >
//                             {(location.pathname === '/' || location.pathname === '/tutor-request-received' || location.pathname === '/apply' || isTutorPath || location.pathname === '/bookmarked-tutors' || ((location.pathname === '/tutor-landing' || location.pathname === '/tutor-build-profile') && profileComplete === 'no')) && firstName && lastName
//                                 ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
//                                 : ''}
//                         </div>
                        

//                         {showMenu && (
//                             <ul className="Dropdown-menu">
//                                 {(location.pathname === '/' || isTutorPath || location.pathname === '/bookmarked-tutors') && approveStatus === 'approved' && (
//                                     <li
//                                         className="Dropdown-item"
//                                         onClick={handleSwitchToTutorView}
//                                     >
//                                         Switch to Tutor View
//                                     </li>
//                                 )}
//                                 {['/tutor-landing', '/tutor-edit-profile', '/tutor-build-profile', '/tutor-viewers', '/tutor-requests'].includes(location.pathname) && (
//                                     <li
//                                         className="Dropdown-item"
//                                         onClick={handleSwitchToStudentView}
//                                     >
//                                         Switch to Student View
//                                     </li>
//                                 )}

//                                 {/* Add "Bookmarked Tutors" button */}
//                                 {(location.pathname === '/' || isTutorPath || location.pathname === '/bookmarked-tutors') && firstName && lastName && (
//                                     <li
//                                         className="Dropdown-item"
//                                         onClick={() => navigate('/bookmarked-tutors')}
//                                     >
//                                         Bookmarked Tutors
//                                     </li>
//                                 )}

//                                 <li
//                                     className="Dropdown-item"
//                                     onClick={handleLogout}
//                                 >
//                                     Logout
//                                 </li>
//                             </ul>
//                         )}
//                     </div>
//                 ) : (
//                     <div className="Header-buttons">
//                         <button
//                             className="Header-button--signin"
//                             onClick={() => navigate('/signin')}
//                         >
//                             Sign In
//                         </button>
//                         <button
//                             className="Header-button--signup"
//                             onClick={() => navigate('/signup?userType=student')}
//                         >
//                             Sign Up
//                         </button>
//                         <button
//                             className="Header-button--applytutor"
//                             onClick={handleApplyAsTutorClick}
//                         >
//                             Apply as a Tutor
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Tooltip,
    useTheme,
    Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function Header({ hideApplyButton = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    const tutorPathRegex = /^\/tutor\/\d+(\/review)?$/;
    const isTutorPath = tutorPathRegex.test(location.pathname);

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const isLoggedIn = firstName && lastName;
    const userId = localStorage.getItem('userId');

    const [approveStatus, setApproveStatus] = useState(null);
    const [profileComplete, setProfileComplete] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchStatuses = async () => {
            if (userId) {
                try {
                    const approveResponse = await fetch(`${API_BASE_URL}/api/tutor-approve-status/?user_id=${userId}`);
                    const approveData = await approveResponse.json();
                    setApproveStatus(approveData.approve_status);

                    const profileResponse = await fetch(`${API_BASE_URL}/api/tutor-profile-read/?user_id=${userId}`);
                    const profileData = await profileResponse.json();
                    setProfileComplete(profileData.profile_complete);
                    setProfilePicture(`${profileData.profile_picture}?timestamp=${new Date().getTime()}`);
                } catch (error) {
                    console.error('Error fetching statuses:', error);
                }
            }
        };
        fetchStatuses();
    }, [userId]);

    const handleLogoClick = () => {
        const tutorPages = ['/tutor-edit-profile', '/tutor-build-profile', '/tutor-landing', '/tutor-viewers'];
        if (tutorPages.includes(location.pathname)) navigate('/tutor-landing');
        else navigate('/');
    };

    const handleApplyAsTutorClick = () => {
        if (!isLoggedIn) navigate('/tutor-signup?userType=student');
        else if (approveStatus === 'pending') navigate('/tutor-request-received');
        else navigate('/apply?userType=student');
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleSwitchView = (path) => navigate(path);

    const initials = firstName && lastName ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}` : '';

    return (
        <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleLogoClick}>
                    <img src={logo} alt="Tutorium Logo" style={{ height: 40, marginRight: 12 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>Tutorium</Typography>
                </Box>

                {isLoggedIn ? (
                    <Box display="flex" alignItems="center" gap={2}>
                        {!hideApplyButton && location.pathname === '/tutor-landing' && (
                            profileComplete === 'no' ? (
                                <Button variant="outlined" onClick={() => navigate('/tutor-build-profile')}>Fill Out Your Profile</Button>
                            ) : (
                                <Button variant="outlined" onClick={() => navigate('/tutor-edit-profile')}>Edit Your Profile</Button>
                            )
                        )}

                        {!hideApplyButton && location.pathname !== '/tutor-landing' && approveStatus !== 'approved' && (
                            <Button variant="contained" color="primary" onClick={handleApplyAsTutorClick}>
                                Apply as a Tutor
                            </Button>
                        )}

                        <Tooltip title="Account menu">
                            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <Avatar
                                    src={profileComplete === 'yes' && profilePicture && location.pathname !== '/' ? profilePicture : ''}
                                    sx={{ bgcolor: profileComplete !== 'yes' || location.pathname === '/' ? 'grey.500' : 'transparent' }}
                                >
                                    {location.pathname === '/' && initials}
                                </Avatar>
                            </IconButton>
                        </Tooltip>

                        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                            {(location.pathname === '/' || isTutorPath || location.pathname === '/bookmarked-tutors') && approveStatus === 'approved' && (
                                <MenuItem onClick={() => handleSwitchView('/tutor-landing')}>Switch to Tutor View</MenuItem>
                            )}
                            {['/tutor-landing', '/tutor-edit-profile', '/tutor-build-profile', '/tutor-viewers', '/tutor-requests'].includes(location.pathname) && (
                                <MenuItem onClick={() => handleSwitchView('/')}>Switch to Student View</MenuItem>
                            )}
                            {(location.pathname === '/' || isTutorPath || location.pathname === '/bookmarked-tutors') && (
                                <MenuItem onClick={() => navigate('/bookmarked-tutors')}>Bookmarked Tutors</MenuItem>
                            )}
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Box display="flex" gap={1}>
                        <Button onClick={() => navigate('/signin')}>Sign In</Button>
                        <Button variant="outlined" onClick={() => navigate('/signup?userType=student')}>Sign Up</Button>
                        <Button variant="contained" onClick={handleApplyAsTutorClick}>Apply as a Tutor</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
