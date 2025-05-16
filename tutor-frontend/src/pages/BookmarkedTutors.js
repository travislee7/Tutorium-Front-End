// import React, { useEffect, useState } from 'react';
// import Header from '../components/header';
// import Footer from '../components/footer';
// import '../styles/BookmarksPage.css';
// import { useNavigate } from 'react-router-dom';

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// function BookmarksPage() {
//     const [bookmarkedTutors, setBookmarkedTutors] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const studentID = localStorage.getItem('userId'); // Get studentID from localStorage

//     useEffect(() => {
//         const fetchBookmarkedTutors = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/api/bookmarked-tutors/`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ studentID }),
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     setBookmarkedTutors(data.bookmarked_tutors || []);
//                 } else {
//                     console.error(data.error || 'Failed to fetch bookmarked tutors');
//                 }
//             } catch (error) {
//                 console.error('Error fetching bookmarked tutors:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookmarkedTutors();
//     }, [studentID]);

//     if (loading) return <p>Loading bookmarked tutors...</p>;

//     return (
//         <div className="BookmarksPage">
//             <Header />
//             <div className="BookmarksPage-content">
//                 <h2>Your Bookmarked Tutors</h2>
//                 <div className="tutor-cards">
//                     {bookmarkedTutors.length === 0 ? (
//                         <p>No bookmarked tutors.</p>
//                     ) : (
//                         bookmarkedTutors.map((tutor, index) => (
//                             <div
//                                 key={index}
//                                 className="tutor-card"
//                                 onClick={() => navigate(`/tutor/${tutor.tutorID}`)} // Navigate to tutor profile page
//                                 style={{ cursor: 'pointer' }}
//                             >
//                                 {/* Profile Picture */}
//                                 <div
//                                     className="tutor-card-img"
//                                     style={{
//                                         backgroundImage: `url(${tutor.profile_picture})`, // Render S3 URL
//                                     }}
//                                 ></div>

//                                 <h3>{tutor.name}</h3>

//                                 {/* Subjects Label and Bubbles */}
//                                 <div>
//                                     <p className="bubble-label">Subjects:</p>
//                                     <div className="bubble-container">
//                                         {tutor.subjects.split(',').map((subject, idx) => (
//                                             <span key={idx} className="bubble">
//                                                 {subject.trim()}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Locations Label and Bubbles */}
//                                 <div>
//                                     <p className="bubble-label">Locations:</p>
//                                     <div className="bubble-container">
//                                         {tutor.location.split(',').map((loc, idx) => (
//                                             <span key={idx} className="bubble">
//                                                 {loc.trim()}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Languages Label and Bubbles */}
//                                 <div>
//                                     <p className="bubble-label">Languages:</p>
//                                     <div className="bubble-container">
//                                         {tutor.languages.split(',').map((lang, idx) => (
//                                             <span key={idx} className="bubble">
//                                                 {lang.trim()}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default BookmarksPage;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    primary: { main: '#007BFF' },
    secondary: { main: '#00b894' },
  },
});

function BookmarksPage() {
  const [bookmarkedTutors, setBookmarkedTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const studentID = localStorage.getItem('userId');

  useEffect(() => {
    const fetchBookmarkedTutors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/bookmarked-tutors/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentID }),
        });

        const data = await response.json();
        if (response.ok) {
          setBookmarkedTutors(data.bookmarked_tutors || []);
        } else {
          console.error(data.error || 'Failed to fetch bookmarked tutors');
        }
      } catch (error) {
        console.error('Error fetching bookmarked tutors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedTutors();
  }, [studentID]);

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
          <Typography variant="h4" align="center" gutterBottom>
            Your Bookmarked Tutors
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress />
            </Box>
          ) : bookmarkedTutors.length === 0 ? (
            <Typography align="center" variant="body1">No bookmarked tutors.</Typography>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 3,
                mt: 3,
              }}
            >
              {bookmarkedTutors.map((tutor, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  onClick={() => navigate(`/tutor/${tutor.tutorID}`)}
                  sx={{
                    width: 250,
                    p: 2,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <Box
  sx={{
    width: '100%',
    height: 150,
    mb: 2,
    borderRadius: 2,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  }}
>
  <img
    src={tutor.profile_picture}
    alt={`${tutor.name}'s profile`}
    style={{
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    }}
  />
</Box>

                  <Typography variant="h6" gutterBottom>
                    {tutor.name}
                  </Typography>

                  {[
                    { label: 'Subjects', items: tutor.subjects },
                    { label: 'Locations', items: tutor.location },
                    { label: 'Languages', items: tutor.languages },
                  ].map(({ label, items }, sectionIndex) => (
                    <Box key={sectionIndex} sx={{ mb: 1 }}>
                      <Typography variant="subtitle2">{label}:</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {items.split(',').map((item, i) => (
                          <Button
                            key={i}
                            size="small"
                            variant="outlined"
                            sx={{ m: 0.5, fontSize: '0.75rem' }}
                          >
                            {item.trim()}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Paper>
              ))}
            </Box>
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default BookmarksPage;

