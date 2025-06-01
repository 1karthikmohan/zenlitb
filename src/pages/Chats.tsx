import React from 'react';

function Chats() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 bg-white shadow-sm fixed top-0 left-0 right-0 flex items-center px-4">
        <h1 className="text-lg font-bold text-center flex-1">Chats</h1>
      </div>
      
      <div className="pt-14 px-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <p className="text-gray mt-4">No conversations yet. Matches you like will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Chats;