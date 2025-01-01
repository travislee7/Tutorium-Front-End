import React from 'react';
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import Signup from './pages/SignupPage';
import Signin from './pages/SigninPage';
import ApplyAsTutor from './pages/ApplyAsTutor';
import TutorRequestReceived from './pages/TutorRequestReceived';
import TutorLandingPage from './pages/TutorLandingPage';
import TutorBuildProfile from './pages/TutorBuildProfile';
import TutorEditProfile from './pages/TutorEditProfile';
import TutorSignupPage from './pages/TutorSignupPage';
import TutorProfilePage from './pages/TutorProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tutor-signup" element={<TutorSignupPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/apply" element={<ApplyAsTutor />} />
          <Route path="/tutor-request-received" element={<TutorRequestReceived />} />
          <Route path="/tutor-landing" element={<TutorLandingPage />} />
          <Route path="/tutor-build-profile" element={<TutorBuildProfile />} />
          <Route path="/tutor-edit-profile" element={<TutorEditProfile />} />
          <Route path="/tutor/:tutorId" element={<TutorProfilePage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
