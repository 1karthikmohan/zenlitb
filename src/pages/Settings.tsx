import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('zn_user') || '';
  const [displayName, setDisplayName] = useState(storedUser);
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedProfile = localStorage.getItem('zn_profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setDisplayName(profile.displayName);
      setBio(profile.bio);
      setAvatar(profile.avatar);
    }
  }, []);

  function handleSave() {
    if (!displayName.trim()) {
      setError('Display Name is required.');
      return;
    }
    const profile = { displayName: displayName.trim(), bio, avatar };
    localStorage.setItem('zn_profile', JSON.stringify(profile));
    navigate('/nearby');
  }

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <h2 className="mt-4 mb-4 text-2xl font-semibold">Profile</h2>
      <div className="mb-4 text-center">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Photo</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="mt-2" />
      </div>
      <input
        className="input mb-2"
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <textarea
        className="input mb-2"
        placeholder="Bio"
        rows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      {error && <p className="mb-2 text-red-600">{error}</p>}
      <button className="btn" onClick={handleSave}>Save Profile</button>
    </div>
  );
}
