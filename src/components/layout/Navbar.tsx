import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../context/SoundContext';
import { Menu, Bell, Search, LogOut, User, Settings, ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const roleBadgeColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  sales_agent: 'bg-blue-100 text-blue-700 border-blue-200',
  operations_manager: 'bg-green-100 text-green-700 border-green-200',
  accountant: 'bg-amber-100 text-amber-700 border-amber-200',
};

const roleLabels: Record<string, string> = {
  admin: 'Administrator',
  sales_agent: 'Sales Agent',
  operations_manager: 'Operations Manager',
  accountant: 'Accountant',
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const { enabled: soundEnabled, toggleSound, play } = useSound();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    play('logout');
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 300);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-64 lg:w-80">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search leads, bookings..." className="bg-transparent border-none outline-none text-sm text-slate-600 w-full placeholder:text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button 
            onClick={() => { toggleSound(); play('toggle'); }}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => play('notification')}
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="relative" ref={profileRef}>
            <button onClick={() => { setProfileOpen(!profileOpen); play('dropdown'); }} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center text-white text-sm font-semibold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-700 leading-tight">{user?.firstName} {user?.lastName}</p>
                <span className={`inline-block mt-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded border ${roleBadgeColors[user?.role || '']}`}>
                  {roleLabels[user?.role || '']}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 hidden md:block transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-800">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User className="w-4 h-4 text-slate-400" /> Profile Settings
                  </Link>
                  <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="w-4 h-4 text-slate-400" /> Preferences
                  </Link>
                </div>
                <div className="border-t border-slate-100 py-1">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
