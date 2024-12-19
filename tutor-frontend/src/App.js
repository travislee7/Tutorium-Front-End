/*
import React from 'react';
import './styles/App.css';
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
import Signup from './pages/SignupPage'; // Import the Signup component
import Signin from './pages/SigninPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';

//<LandingPage />

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />}/>
        </Routes>
      </Router>
    <Footer>
    </Footer>

    </div>

  );
}

export default App;*/

// src/App.js
import React from 'react';
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import Signup from './pages/SignupPage';
import Signin from './pages/SigninPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

