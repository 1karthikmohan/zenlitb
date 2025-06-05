import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nearby from './pages/Nearby';
import Matches from './pages/Matches';
import Chats from './pages/Chats';
import Settings from './pages/Settings';
import MobileNavigation from './components/MobileNavigation';
import DesktopNavigation from './components/DesktopNavigation';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/nearby" />;
}

function AppContent() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <Routes>
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <DesktopNavigation />
      </div>
      <div className="md:hidden">
        <MobileNavigation />
      </div>
      <main className="pt-0 md:pt-16 pb-14 md:pb-0">
        <Routes>
          <Route path="/nearby" element={<PrivateRoute><Nearby /></PrivateRoute>} />
          <Route path="/matches" element={<PrivateRoute><Matches /></PrivateRoute>} />
          <Route path="/chats" element={<PrivateRoute><Chats /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/nearby" />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}