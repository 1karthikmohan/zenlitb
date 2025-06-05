import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyMessages } from '../data/dummyUsers';

export default function Chat() {
  const { convId } = useParams();
  const msgs = dummyMessages[convId] || [];
  return (
    <div className="p-4">
      <h2 className="mb-4">Chat</h2>
      <ul>
        {msgs.map(m => (
          <li key={m.id} className="mb-2">
            <b>{m.sender}: </b>{m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
