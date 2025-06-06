import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('zn_user', email);
    navigate('/profile');
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <Logo width={160} />
      <form onSubmit={handleSubmit} className="mt-4" style={{ width: '100%' }}>
        <input
          type="email"
          placeholder="Email"
          className="input-field mb-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn w-full">Sign In</button>
      </form>
      <button className="mt-2" onClick={() => navigate('/signup')}>Need an account?</button>
    </div>
  );
}
