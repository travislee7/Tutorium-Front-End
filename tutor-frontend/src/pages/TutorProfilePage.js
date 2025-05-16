// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from '../components/header';
// import Footer from '../components/footer';
// import '../styles/TutorProfilePage.css';

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// function TutorProfilePage() {
//     const { tutorId } = useParams();
//     const studentID = localStorage.getItem('userId') || '';
//     const [tutor, setTutor] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isBookmarked, setIsBookmarked] = useState(false);
//     const [formData, setFormData] = useState({
//         firstName: localStorage.getItem('firstName') || '',
//         lastName: localStorage.getItem('lastName') || '',
//         email: localStorage.getItem('email') || '',
//         description: '',
//     });

//     useEffect(() => {
//         const fetchTutorDetails = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/api/tutor-details/${tutorId}/`);
//                 if (!response.ok) {
//                     console.error(`Error fetching tutor details: ${response.status} ${response.statusText}`);
//                     return;
//                 }
//                 const data = await response.json();
//                 setTutor(data);

//                 const bookmarkResponse = await fetch(`${API_BASE_URL}/api/is-tutor-bookmarked/`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ studentID, tutorID: tutorId }),
//                 });
//                 const bookmarkData = await bookmarkResponse.json();
//                 if (bookmarkResponse.ok) {
//                     setIsBookmarked(bookmarkData.isBookmarked);
//                 }
//             } catch (error) {
//                 console.error("Error fetching tutor details or bookmark status:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchTutorDetails();
//     }, [tutorId, studentID]);

//     const renderStars = (rating = 0) => {
//         const totalStars = 5;
//         const stars = [];
//         for (let i = 0; i < totalStars; i++) {
//             const starValue = rating - i;
//             let fillPercentage = 0;
//             if (starValue >= 1) {
//                 fillPercentage = 100;
//             } else if (starValue > 0) {
//                 fillPercentage = starValue * 100;
//             }
//             stars.push(fillPercentage);
//         }
//         return stars;
//     };

//     const handleToggleBookmark = async () => {
//         if (!formData.firstName || !formData.lastName) {
//             alert("Make an account first, to use the bookmarking feature");
//             return;
//         }
//         try {
//             const endpoint = isBookmarked
//                 ? `${API_BASE_URL}/api/unbookmark-tutor/`
//                 : `${API_BASE_URL}/api/bookmark-tutor/`;
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ studentID, tutorID: tutorId }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setIsBookmarked((prev) => !prev);
//                 alert(data.message || (isBookmarked ? 'Tutor unbookmarked' : 'Tutor bookmarked'));
//             } else {
//                 console.error(data.error || 'Failed to toggle bookmark.');
//             }
//         } catch (error) {
//             console.error('Error toggling bookmark:', error);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const requestData = {
//             ...formData,
//             tutorFirstName: tutor.user__first_name,
//             tutorLastName: tutor.user__last_name,
//             tutorId,
//             studentID,
//         };
//         try {
//             const response = await fetch(`${API_BASE_URL}/api/tutor-request-email/`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(requestData),
//             });
//             if (response.ok) {
//                 const saveInfoResponse = await fetch(`${API_BASE_URL}/api/save-request-form-info/`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         requesterFirstName: formData.firstName,
//                         requesterLastName: formData.lastName,
//                         requesterEmail: formData.email,
//                         requesterDescription: formData.description,
//                         tutorID: tutorId,
//                     }),
//                 });

//                 if (!saveInfoResponse.ok) {
//                     console.error('Failed to save request form info.');
//                 }

//                 alert('Your request has been submitted successfully! You will receive an email receipt shortly.');
//                 setFormData({ ...formData, description: '' });
//             } else {
//                 alert('Failed to send your request. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error submitting the form:', error);
//             alert('An error occurred. Please try again.');
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (!tutor) return <p>Error loading tutor details.</p>;

//     return (
//         <div className="TutorProfilePage">
//             <Header />
//             <div className="profile-content">
//                 <div className="profile-card">
//                     <div
//                         className="tutor-card-img"
//                         style={{ backgroundImage: `url(${tutor.profile_picture})` }}
//                     ></div>
//                     <h3>{`${tutor.user__first_name} ${tutor.user__last_name}`}</h3>

//                     <div className="bubble-container">
//                         <p className="bubble-label">Average Rating:</p>
//                         <div className="stars">
//                             {renderStars(tutor.average_rating).map((fill, idx) => (
//                                 <span
//                                     key={idx}
//                                     className="star"
//                                     style={{ '--fill': `${fill}%` }}
//                                 ></span>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="bubble-container">
//                         <p className="bubble-label">Bio:</p>
//                         <p>{tutor.bio}</p>
//                     </div>

//                     <div className="bubble-container">
//                         <p className="bubble-label">Subjects:</p>
//                         {tutor.subjects.split(',').map((subject, idx) => (
//                             <span key={idx} className="bubble">{subject.trim()}</span>
//                         ))}
//                     </div>

//                     <div className="bubble-container">
//                         <p className="bubble-label">Locations:</p>
//                         {tutor.location.split(',').map((loc, idx) => (
//                             <span key={idx} className="bubble">{loc.trim()}</span>
//                         ))}
//                     </div>

//                     <div className="bubble-container">
//                         <p className="bubble-label">Languages:</p>
//                         {tutor.language.split(',').map((lang, idx) => (
//                             <span key={idx} className="bubble">{lang.trim()}</span>
//                         ))}
//                     </div>

//                     <div className="bubble-container">
//                         {tutor.gender && (
//                             <p className="bubble-label">
//                                 Gender: <span className="bubble">{tutor.gender}</span>
//                             </p>
//                         )}
//                         {tutor.hourly_rate && (
//                             <p className="bubble-label">
//                                 Rate: <span className="bubble">${parseFloat(tutor.hourly_rate).toFixed(2)}/hr</span>
//                             </p>
//                         )}
//                     </div>

//                     <div className="action-buttons">
//                         <button
//                             className="bookmark-icon"
//                             onClick={handleToggleBookmark}
//                             aria-label="Bookmark"
//                         >
//                             {isBookmarked ? (
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="24"
//                                     height="24"
//                                     fill="#C3FC8B"
//                                     viewBox="0 0 16 16"
//                                     className="bookmark-icon--filled"
//                                 >
//                                     <path d="M2 2v13.5l6-3 6 3V2z" />
//                                 </svg>
//                             ) : (
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="24"
//                                     height="24"
//                                     fill="#ccc"
//                                     viewBox="0 0 16 16"
//                                     className="bookmark-icon--empty"
//                                 >
//                                     <path d="M2 2v13.5l6-3 6 3V2z" fill="none" />
//                                     <path d="M2 2h12v13.5l-6-3-6 3z" />
//                                 </svg>
//                             )}
//                         </button>

//                         <button
//                             className="add-review-button"
//                             onClick={() => {
//                                 if (!formData.firstName || !formData.lastName) {
//                                     alert("You need to create an account to leave a review!");
//                                     return;
//                                 }
//                                 window.location.href = `/tutor/${tutorId}/review`;

//                             }}
//                         >
//                             Add Review
//                         </button>
//                     </div>
//                 </div>

//                 <div className="form-container">
//                     <h2>Request Tutor</h2>
//                     <form id="request-form" onSubmit={handleSubmit}>
//                         <label htmlFor="firstName">First Name:</label>
//                         <input
//                             type="text"
//                             id="firstName"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             required
//                         />
//                         <label htmlFor="lastName">Last Name:</label>
//                         <input
//                             type="text"
//                             id="lastName"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             required
//                         />
//                         <label htmlFor="email">Email Address:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                         <label htmlFor="description">Description:</label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button type="submit">Send Request</button>
//                     </form>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default TutorProfilePage;




import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Header from '../components/header';

import Footer from '../components/footer';

import {

    Box,

    Typography,

    Button,

    Container,

    Paper,

    IconButton,

    TextField,

    Dialog,

    DialogTitle,

    DialogContent,

    DialogActions,

    CssBaseline,

    createTheme,

    ThemeProvider

} from '@mui/material';

import BookmarkIcon from '@mui/icons-material/Bookmark';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import '../styles/TutorProfilePage.css';
 
const API_BASE_URL = process.env.REACT_APP_API_URL;
 
// const theme = createTheme({

//     typography: {

//         fontFamily: 'Inter, sans-serif',

//     },

//     palette: {

//         primary: { main: '#007BFF' },

//         secondary: { main: '#00b894' },

//     },

// });

 
// function TutorProfilePage() {

//     const { tutorId } = useParams();

//     const studentID = localStorage.getItem('userId') || '';

//     const [tutor, setTutor] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [isBookmarked, setIsBookmarked] = useState(false);

//     const [showReviewForm, setShowReviewForm] = useState(false);
 
//     const [formData, setFormData] = useState({

//         firstName: localStorage.getItem('firstName') || '',

//         lastName: localStorage.getItem('lastName') || '',

//         email: localStorage.getItem('email') || '',

//         description: '',

//     });
 
//     useEffect(() => {

//         const fetchTutorDetails = async () => {

//             try {

//                 const response = await fetch(`${API_BASE_URL}/api/tutor-details/${tutorId}/`);

//                 const data = await response.json();

//                 setTutor(data);
 
//                 const bookmarkResponse = await fetch(`${API_BASE_URL}/api/is-tutor-bookmarked/`, {

//                     method: 'POST',

//                     headers: { 'Content-Type': 'application/json' },

//                     body: JSON.stringify({ studentID, tutorID: tutorId }),

//                 });

//                 const bookmarkData = await bookmarkResponse.json();

//                 if (bookmarkResponse.ok) {

//                     setIsBookmarked(bookmarkData.isBookmarked);

//                 }

//             } catch (error) {

//                 console.error("Error fetching tutor details:", error);

//             } finally {

//                 setLoading(false);

//             }

//         };
 
//         fetchTutorDetails();

//     }, [tutorId, studentID]);
 
//     const renderStars = (rating = 0) => {

//         return [...Array(5)].map((_, i) => {

//             const filled = rating >= i + 1;

//             return (
// <span key={i} style={{ color: filled ? '#FFD700' : '#ccc' }}>★</span>

//             );

//         });

//     };
 
//     const handleToggleBookmark = async () => {

//         if (!formData.firstName || !formData.lastName) {

//             alert("Make an account first, to use the bookmarking feature");

//             return;

//         }

//         try {

//             const endpoint = isBookmarked

//                 ? `${API_BASE_URL}/api/unbookmark-tutor/`

//                 : `${API_BASE_URL}/api/bookmark-tutor/`;

//             const response = await fetch(endpoint, {

//                 method: 'POST',

//                 headers: { 'Content-Type': 'application/json' },

//                 body: JSON.stringify({ studentID, tutorID: tutorId }),

//             });

//             const data = await response.json();

//             if (response.ok) {

//                 setIsBookmarked((prev) => !prev);

//                 alert(data.message || 'Bookmark updated');

//             }

//         } catch (error) {

//             console.error('Error toggling bookmark:', error);

//         }

//     };
 
//     const handleChange = (e) => {

//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     };
 
//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         const requestData = {

//             ...formData,

//             tutorFirstName: tutor.user__first_name,

//             tutorLastName: tutor.user__last_name,

//             tutorId,

//             studentID,

//         };

//         try {

//             const response = await fetch(`${API_BASE_URL}/api/tutor-request-email/`, {

//                 method: 'POST',

//                 headers: { 'Content-Type': 'application/json' },

//                 body: JSON.stringify(requestData),

//             });
 
//             if (response.ok) {

//                 await fetch(`${API_BASE_URL}/api/save-request-form-info/`, {

//                     method: 'POST',

//                     headers: { 'Content-Type': 'application/json' },

//                     body: JSON.stringify({

//                         requesterFirstName: formData.firstName,

//                         requesterLastName: formData.lastName,

//                         requesterEmail: formData.email,

//                         requesterDescription: formData.description,

//                         tutorID: tutorId,

//                     }),

//                 });

//                 alert('Request submitted! Check your email for confirmation.');

//                 setFormData({ ...formData, description: '' });

//             } else {

//                 alert('Failed to send request.');

//             }

//         } catch (error) {

//             console.error('Submission error:', error);

//             alert('An error occurred. Try again.');

//         }

//     };
 
//     if (loading) return <Typography>Loading...</Typography>;

//     if (!tutor) return <Typography>Error loading tutor.</Typography>;
 
//     return (
//             <ThemeProvider theme={theme}>
//               <CssBaseline />
//               <Header />
//               <Container maxWidth="md" sx={{ py: 5 }}>
//                 <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
//                   {/* Updated profile picture section */}
//                   <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
//                     <img
//                       src={tutor.profile_picture}
//                       alt={`${tutor.user__first_name} ${tutor.user__last_name}`}
//                       style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
//                     />
//                   </Box>
        
//                   <Typography variant="h4" gutterBottom>
//                     {`${tutor.user__first_name} ${tutor.user__last_name}`}
//                   </Typography>
        
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="subtitle1">Average Rating:</Typography>
//                     <Box>{renderStars(tutor.average_rating)}</Box>
//                   </Box>
        
//                   <Typography variant="body1" sx={{ mb: 2 }}>{tutor.bio}</Typography>
        
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="subtitle2">Subjects:</Typography>
//                     {tutor.subjects.split(',').map((sub, i) => (
//                       <Button key={i} variant="outlined" size="small" sx={{ m: 0.5 }}>
//                         {sub.trim()}
//                       </Button>
//                     ))}
//                   </Box>
        
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="subtitle2">Locations:</Typography>
//                     {tutor.location.split(',').map((loc, i) => (
//                       <Button key={i} variant="outlined" size="small" sx={{ m: 0.5 }}>
//                         {loc.trim()}
//                       </Button>
//                     ))}
//                   </Box>
        
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="subtitle2">Languages:</Typography>
//                     {tutor.language.split(',').map((lang, i) => (
//                       <Button key={i} variant="outlined" size="small" sx={{ m: 0.5 }}>
//                         {lang.trim()}
//                       </Button>
//                     ))}
//                   </Box>
        
//                   <Box sx={{ mb: 2 }}>
//                     {tutor.gender && <Typography variant="body2">Gender: {tutor.gender}</Typography>}
//                     {tutor.hourly_rate && (
//                       <Typography variant="body2">
//                         Rate: ${parseFloat(tutor.hourly_rate).toFixed(2)}/hr
//                       </Typography>
//                     )}
//                   </Box>
        
//                   <Box sx={{ mt: 3 }}>
//                     <IconButton onClick={handleToggleBookmark}>
//                       {isBookmarked ? <BookmarkIcon color="success" /> : <BookmarkBorderIcon />}
//                     </IconButton>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       sx={{ ml: 2 }}
//                       onClick={() => {
//                         if (!formData.firstName) {
//                           alert('Login first to add a review');
//                           return;
//                         }
//                         setShowReviewForm(true);
//                       }}
//                     >
//                       Add Review
//                     </Button>
//                   </Box>
        
//                   <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
//                     <Typography variant="h6" gutterBottom>
//                       Send Request
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       label="Description"
//                       name="description"
//                       multiline
//                       rows={4}
//                       value={formData.description}
//                       onChange={handleChange}
//                       margin="normal"
//                       required
//                     />
//                     <Button type="submit" variant="contained" color="primary">
//                       Send Request
//                     </Button>
//                   </Box>
//                 </Paper>
//               </Container>
        
//               <Dialog open={showReviewForm} onClose={() => setShowReviewForm(false)}>
//                 <DialogTitle>Leave a Review</DialogTitle>
//                 <ReviewForm tutorId={tutorId} onClose={() => setShowReviewForm(false)} />
//               </Dialog>
        
//               <Footer />
//             </ThemeProvider>

//     );

// }

 
// function ReviewForm({ tutorId, onClose }) {

//     const [rating, setRating] = useState(0);

//     const [comment, setComment] = useState('');

//     const studentID = localStorage.getItem('userId');
 
//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         const res = await fetch(`${API_BASE_URL}/api/tutor/${tutorId}/add-review/`, {

//             method: 'POST',

//             headers: { 'Content-Type': 'application/json' },

//             body: JSON.stringify({ tutorId, studentID, rating, comment }),

//         });

//         if (res.ok) {

//             alert('Review submitted!');

//             onClose();

//         } else {

//             alert('Failed to submit review.');

//         }

//     };
 
//     return (
// <DialogContent>
// <Box component="form" onSubmit={handleSubmit}>
// <Typography gutterBottom>Rating:</Typography>
// <Box sx={{ mb: 2 }}>

//                     {[1, 2, 3, 4, 5].map((star) => (
// <IconButton

//                             key={star}

//                             onClick={() => setRating(star)}

//                             color={star <= rating ? 'warning' : 'default'}
// >

//                             ★
// </IconButton>

//                     ))}
// </Box>
// <TextField

//                     fullWidth

//                     label="Comment"

//                     multiline

//                     rows={4}

//                     value={comment}

//                     onChange={(e) => setComment(e.target.value)}

//                     required

//                 />
// <DialogActions>
// <Button onClick={onClose}>Cancel</Button>
// <Button type="submit" variant="contained" color="primary">

//                         Submit
// </Button>
// </DialogActions>
// </Box>
// </DialogContent>

//     );

// }
 
// export default TutorProfilePage;
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    primary: { main: '#007BFF' },
    secondary: { main: '#00b894' },
  },
});

function TutorProfilePage() {
  const { tutorId } = useParams();
  const studentID = localStorage.getItem('userId') || '';
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    email: localStorage.getItem('email') || '',
    description: '',
  });

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tutor-details/${tutorId}/`);
        const data = await response.json();
        setTutor(data);

        const bookmarkResponse = await fetch(`${API_BASE_URL}/api/is-tutor-bookmarked/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentID, tutorID: tutorId }),
        });

        const bookmarkData = await bookmarkResponse.json();
        if (bookmarkResponse.ok) {
          setIsBookmarked(bookmarkData.isBookmarked);
        }
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDetails();
  }, [tutorId, studentID]);

  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, i) => {
      const filled = rating >= i + 1;
      return (
        <span key={i} style={{ color: filled ? '#FFD700' : '#ccc' }}>★</span>
      );
    });
  };

  const handleToggleBookmark = async () => {
    if (!formData.firstName || !formData.lastName) {
      alert("Make an account first, to use the bookmarking feature");
      return;
    }

    try {
      const endpoint = isBookmarked
        ? `${API_BASE_URL}/api/unbookmark-tutor/`
        : `${API_BASE_URL}/api/bookmark-tutor/`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID, tutorID: tutorId }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsBookmarked((prev) => !prev);
        alert(data.message || 'Bookmark updated');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...formData,
      tutorFirstName: tutor.user__first_name,
      tutorLastName: tutor.user__last_name,
      tutorId,
      studentID,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/tutor-request-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        await fetch(`${API_BASE_URL}/api/save-request-form-info/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requesterFirstName: formData.firstName,
            requesterLastName: formData.lastName,
            requesterEmail: formData.email,
            requesterDescription: formData.description,
            tutorID: tutorId,
          }),
        });

        alert('Request submitted! Check your email for confirmation.');
        setFormData({ ...formData, description: '' });
      } else {
        alert('Failed to send request.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Try again.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!tutor) return <Typography>Error loading tutor.</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to top, #b5f7f3, #d5f7f5, #fcfcfc)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Container maxWidth="md" sx={{ py: 5, flexGrow: 1 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
              <img
                src={tutor.profile_picture}
                alt={`${tutor.user__first_name} ${tutor.user__last_name}`}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
              />
            </Box>

            <Typography variant="h4" gutterBottom>
              {`${tutor.user__first_name} ${tutor.user__last_name}`}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Average Rating:</Typography>
              <Box>{renderStars(tutor.average_rating)}</Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>{tutor.bio}</Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Subjects:</Typography>
              {tutor.subjects.split(',').map((sub, i) => (
                <Button key={i} variant="outlined" size="small" sx={{ m: 0.5 }}>
                  {sub.trim()}
                </Button>
              ))}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Locations:</Typography>
              {tutor.location.split(',').map((loc, i) => (
                <Button key={i} variant="outlined" size="small" sx={{ m: 0.5 }}>
                  {loc.trim()}
                </Button>
              ))}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Languages:</Typography>
              {tutor.language.split(',').map((lang, i) => (
                <Button key={i} variant="outlined" size="small" sx={{ m: 0.5 }}>
                  {lang.trim()}
                </Button>
              ))}
            </Box>

            <Box sx={{ mb: 2 }}>
              {tutor.gender && <Typography variant="body2">Gender: {tutor.gender}</Typography>}
              {tutor.hourly_rate && (
                <Typography variant="body2">
                  Rate: ${parseFloat(tutor.hourly_rate).toFixed(2)}/hr
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: 3 }}>
              <IconButton onClick={handleToggleBookmark}>
                {isBookmarked ? <BookmarkIcon color="success" /> : <BookmarkBorderIcon />}
              </IconButton>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => {
                  if (!formData.firstName) {
                    alert('Login first to add a review');
                    return;
                  }
                  setShowReviewForm(true);
                }}
              >
                Add Review
              </Button>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Send Request
              </Typography>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Send Request
              </Button>
            </Box>
          </Paper>
        </Container>

        <Dialog open={showReviewForm} onClose={() => setShowReviewForm(false)}>
          <DialogTitle>Leave a Review</DialogTitle>
          <ReviewForm tutorId={tutorId} onClose={() => setShowReviewForm(false)} />
        </Dialog>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

function ReviewForm({ tutorId, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const studentID = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/api/tutor/${tutorId}/add-review/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tutorId, studentID, rating, comment }),
    });

    if (res.ok) {
      alert('Review submitted!');
      onClose();
    } else {
      alert('Failed to submit review.');
    }
  };

  return (
    <DialogContent>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography gutterBottom>Rating:</Typography>
        <Box sx={{ mb: 2 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
              key={star}
              onClick={() => setRating(star)}
              color={star <= rating ? 'warning' : 'default'}
            >
              ★
            </IconButton>
          ))}
        </Box>
        <TextField
          fullWidth
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </DialogContent>
  );
}

export default TutorProfilePage;

 