// src/App.js
import React from 'react';
import './styles/App.css';
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
import Signup from './pages/SignupPage'; // Import the Signup component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//<LandingPage />

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>

    </div>

  );
}

export default App;
