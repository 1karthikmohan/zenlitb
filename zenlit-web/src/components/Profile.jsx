import React from 'react';

export default function Profile() {
  const email = localStorage.getItem('zn_user');
  return (
    <div className="p-4">
      <h2 className="mb-4">Profile</h2>
      <p>Signed in as {email}</p>
    </div>
  );
}
