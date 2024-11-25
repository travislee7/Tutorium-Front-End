import React from 'react';
import '../styles/Footer.css'; 
import {FaInstagram} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Tutorium. All Rights Reserved.</p>
        <div className="social-links">
        <a href="https://www.instagram.com/schoolofwinnerz/profilecard/?igsh=ZjQ0dTgxaXc5ajR4" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} color="white" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
