import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-title">Lyrics Finder</Link>
    <div className="navbar-links">
      <Link to="/info">Info</Link>
    </div>
  </nav>
);

export default Navbar; 