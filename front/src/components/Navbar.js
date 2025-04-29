import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = ({ onTitleClick }) => {
  return (
    <nav className="navbar">
      <span 
        className="navbar-title"
        style={{
          color: 'inherit',
          font: 'inherit',
          padding: '0.5rem',
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          display: 'inline-block'
        }}
      >
        Lyrics Finder
      </span>
      <div className="navbar-links">
        <Link to="/" onClick={onTitleClick}>Home</Link>
        <Link to="/info">Info</Link>
      </div>
    </nav>
  );
};

export default Navbar; 