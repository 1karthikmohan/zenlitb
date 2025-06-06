import React, { useState } from 'react';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState('');

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result.toString());
    reader.readAsDataURL(file);
  }

  function handleSave() {
    localStorage.setItem('profile', JSON.stringify({ displayName, avatar }));
    alert('Profile saved');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Profile for {storedUser.email}</h2>
      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input type="file" onChange={handleAvatarChange} />
      {avatar && <img src={avatar} alt="avatar" style={{ width: '100px' }} />}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Profile;
