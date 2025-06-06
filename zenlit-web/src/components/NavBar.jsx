import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function NavBar() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Logo />
      <Link to="/" style={{ marginLeft: '10px' }}>Sign In</Link>
      <Link to="/signup" style={{ marginLeft: '10px' }}>Sign Up</Link>
      <Link to="/profile" style={{ marginLeft: '10px' }}>Profile</Link>
      <Link to="/map" style={{ marginLeft: '10px' }}>Map</Link>
      <Link to="/chat" style={{ marginLeft: '10px' }}>Chat</Link>
    </nav>
  );
}

export default NavBar;
