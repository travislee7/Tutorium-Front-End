import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Container, Typography, Box, Paper } from '@mui/material';

function TutorRequestReceived() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        bgcolor: 'transparent',
        background: 'linear-gradient(to top, #b5f7f3, #d5f7f5, #fcfcfc)', // Same gradient as ApplyAsTutor
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Match your theme font
      }}
    >
      <Header hideApplyButton={true} />
      <Container
        component={Paper}
        elevation={3}
        sx={{
          flex: 1,
          mt: 8,
          mb: 4,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: 2,
          bgcolor: 'background.paper',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        }}
        maxWidth="sm"
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#191938' }}>
          We have received your request to become a tutor and sent you a confirmation email.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ color: '#191938' }}>
          Please wait while we approve your request.
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}

export default TutorRequestReceived;
