import { Link, useLocation } from 'react-router-dom';
import { MapPin, Heart, MessageSquare, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MobileNavigation() {
  const location = useLocation();

  const links = [
    { to: '/nearby', icon: MapPin, label: 'Nearby' },
    { to: '/matches', icon: Heart, label: 'Matches' },
    { to: '/chats', icon: MessageSquare, label: 'Chats' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-14 flex items-center justify-around">
      {links.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex flex-col items-center justify-center w-full h-full',
              isActive ? 'text-primary' : 'text-gray-500'
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs mt-0.5">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}