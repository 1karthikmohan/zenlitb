import React from 'react';
import { dummyConversations, getConversationUser } from '../data/dummyConversations';
import { useNavigate } from 'react-router-dom';

function Chats() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 bg-white shadow-sm fixed top-0 left-0 right-0 flex items-center px-4">
        <h1 className="text-lg font-bold text-center flex-1">Chats</h1>
      </div>

      <div className="pt-14 px-4 space-y-2">
        {dummyConversations.map((c) => {
          const user = getConversationUser(c);
          return (
            <div key={c.id} className="card flex items-center space-x-4">
              <img src={user.avatar} alt={user.displayName} className="w-12 h-12 rounded-full" />
              <div className="flex-1 overflow-hidden">
                <h3 className="font-medium">{user.displayName}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {c.lastMessage}
                </p>
              </div>
              {c.unreadCount > 0 && (
                <span className="ml-2 text-xs bg-primary text-white rounded-full px-2 py-0.5">
                  {c.unreadCount}
                </span>
              )}
              <button className="btn text-sm px-3 py-1 h-auto" onClick={() => navigate('/chats')}>Open</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chats;