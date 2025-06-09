import React from 'react';
import { dummyMatches } from '../data/dummyMatches';
import { useNavigate } from 'react-router-dom';

function Matches() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 bg-white shadow-sm fixed top-0 left-0 right-0 flex items-center px-4">
        <h1 className="text-lg font-bold text-center flex-1">Matches</h1>
      </div>

      <div className="pt-14 px-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dummyMatches.map((u) => (
          <div key={u.id} className="card flex items-center space-x-4">
            <img src={u.avatar} alt={u.displayName} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <h3 className="font-medium">{u.displayName}</h3>
              <p className="text-sm text-gray-600">{u.bio}</p>
            </div>
            <button className="btn text-sm px-3 py-1 h-auto" onClick={() => navigate('/chats')}>Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;