import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">Bayer Healthcare</div>
    <ul className="nav-links">
      <li>Home</li>
      <li>Health Topics</li>
      <li>Resources</li>
      <li>About Us</li>
      <li>Contact</li>
    </ul>
  </nav>
);

export default Navbar;
