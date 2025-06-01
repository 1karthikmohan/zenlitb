import React from 'react';

function Nearby() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 bg-white shadow-sm fixed top-0 left-0 right-0 flex items-center px-4">
        <button className="w-8 h-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <h1 className="text-lg font-bold text-center flex-1">Nearby</h1>
        <div className="w-8 h-8 flex items-center">
          <span className="text-sm text-accent">5 km</span>
        </div>
      </div>
      
      <div className="pt-14 h-[calc(100vh-56px)]">
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <p className="text-gray">Map will be implemented here</p>
        </div>
      </div>
    </div>
  );
}

export default Nearby;