import { Link, useLocation } from 'react-router-dom';
import { MapPin, Heart, MessageSquare, Settings, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export default function DesktopNavigation() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const links = [
    { to: '/nearby', label: 'Nearby', icon: MapPin },
    { to: '/matches', label: 'Matches', icon: Heart },
    { to: '/chats', label: 'Chats', icon: MessageSquare },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center">
          <Database className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold">Nearby Connect</span>
        </div>

        <div className="flex items-center space-x-8">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center space-x-1 py-2',
                  isActive
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {user && (
          <button
            onClick={() => signOut()}
            className="text-gray-500 hover:text-gray-900"
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}