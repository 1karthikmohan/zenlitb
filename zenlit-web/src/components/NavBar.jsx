import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Logo width={80} />
      <div>
        <NavLink to="/profile" className="mr-4">Profile</NavLink>
        <NavLink to="/nearby" className="mr-4">Nearby</NavLink>
      </div>
    </nav>
  );
}
