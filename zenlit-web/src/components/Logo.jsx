import React from 'react';
import logo from '../logo.svg';

export default function Logo({ width = 120 }) {
  return <img src={logo} alt="Zenlit" width={width} />;
}
