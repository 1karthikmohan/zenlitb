import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import NearbyMap from './components/NearbyMap';
import Chat from './components/Chat';
import NavBar from './components/NavBar';
import MobileContainer from './components/MobileContainer';

function useAuth() {
  const user = localStorage.getItem('zn_user');
  return { user };
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

export default function AppRoutes() {
  return (
    <Router basename="/">
      <NavBar />
      <div style={{ marginTop: '56px', marginBottom: '56px' }}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MobileContainer>
                  <Profile />
                </MobileContainer>
              </PrivateRoute>
            }
          />
          <Route
            path="/nearby"
            element={
              <PrivateRoute>
                <MobileContainer>
                  <NearbyMap />
                </MobileContainer>
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:convId"
            element={
              <PrivateRoute>
                <MobileContainer>
                  <Chat />
                </MobileContainer>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
