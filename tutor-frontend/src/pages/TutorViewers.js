import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Box, Typography, Paper, Stack } from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TutorViewersPage = () => {
  const [viewers, setViewers] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE_URL}/api/tutor/${userId}/viewers/`)
        .then((res) => res.json())
        .then((data) => {
          setViewers(data.viewers || []);
        })
        .catch((err) => console.error('Error fetching viewers:', err));
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to top, #b5f7f3, #d5f7f5, #fcfcfc)',
      }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: 720,
          margin: 'auto',
          mt: 4,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Who Viewed Your Profile
        </Typography>

        {viewers.length > 0 ? (
          <Stack spacing={3} mt={3}>
            {viewers.map((viewer, idx) => (
              <Paper
                key={idx}
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Typography variant="body1" fontWeight={500}>
                  {viewer.first_name + (viewer.last_name ? ' ' + viewer.last_name : '')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getTimeAgo(viewer.timestamp)}
                </Typography>
              </Paper>
            ))}
          </Stack>
        ) : (
          <Typography variant="body1" color="text.secondary" mt={3}>
            No views yet.
          </Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default TutorViewersPage;
