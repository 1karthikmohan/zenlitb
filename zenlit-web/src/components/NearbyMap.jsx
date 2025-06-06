import React from 'react';
import { dummyUsers } from '../data/dummyUsers';

export default function NearbyMap() {
  return (
    <div className="p-4">
      <h2 className="mb-4">Nearby Users</h2>
      <ul>
        {dummyUsers.map(u => (
          <li key={u.id} className="mb-2 flex items-center">
            <img src={u.avatar} alt={u.displayName} width="40" className="mr-2 rounded" />
            <span>{u.displayName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
