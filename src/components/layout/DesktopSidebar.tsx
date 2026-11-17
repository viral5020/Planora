import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Users,
  Building2,
  PlusCircle,
  ShieldCheck,
  Inbox,
  User,
  Settings,
  Sparkles,
  LogOut,
  LogIn
} from 'lucide-react';
import type { ScreenId } from '../../types';

export const DesktopSidebar: React.FC = () => {
  const { currentScreen, navigateTo, guestRequests, notifications, userProfile, userId, logout } = useApp();

  const pendingRequestsCount = guestRequests.filter((g) => g.status === 'pending').length;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks: Array<{
    id: ScreenId;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    badgeColor?: string;
  }> = [
    { id: 'home', label: 'Explore Gatherings', icon: <Compass className="w-4 h-4" /> },
    { id: 'people', label: 'People Radar', icon: <Users className="w-4 h-4" /> },
    { id: 'communities', label: 'Communities', icon: <Building2 className="w-4 h-4" /> },
    {
      id: 'create_step1_type',
      label: 'Host a Gathering',
      icon: <PlusCircle className="w-4 h-4 text-purple-400" />
    },
    {
      id: 'host_management',
      label: 'Host Management',
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: pendingRequestsCount,
      badgeColor: 'bg-pink-500'
    },
    {
      id: 'inbox',
      label: 'Messages & Chat',
      icon: <Inbox className="w-4 h-4" />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Sparkles className="w-4 h-4" />,
      badge: unreadCount,
      badgeColor: 'bg-purple-500'
    },
    { id: 'profile', label: 'My Profile & Passes', icon: <User className="w-4 h-4" /> },
    { id: 'settings_safety', label: 'Settings & Safety', icon: <Settings className="w-4 h-4" /> }
  ];

  const name = userProfile?.name || 'Aarav Mehta';
  const handle = userProfile?.handle || '@aarav_surat';
  const avatar = userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';

  return (
    <aside className="w-64 bg-[#12131b] border-r border-[#20222e] p-4 flex flex-col justify-between h-[calc(100vh-61px)] sticky top-[61px]">
      <div className="space-y-6">
        {/* Brand */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 cursor-pointer px-2"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 p-0.5 shadow-md shadow-purple-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#161722] rounded-[10px] flex items-center justify-center font-extrabold text-sm text-white">
              P
            </div>
          </div>
          <div>
            <h1 className="font-black text-sm tracking-widest text-white">PLANORA</h1>
            <p className="text-[10px] text-purple-400 font-mono tracking-tight">SURAT SOCIAL LAYER</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navLinks.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#181924]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-purple-400' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold text-white ${
                      item.badgeColor || 'bg-purple-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Bottom Mini Card */}
      {userId || userProfile ? (
        <div className="p-3 rounded-2xl bg-[#181924] border border-[#27293b] flex items-center justify-between transition group">
          <div
            onClick={() => navigateTo('profile')}
            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
          >
            <img
              src={avatar}
              alt={name}
              className="w-9 h-9 rounded-full object-cover border border-purple-500/50 shrink-0"
            />
            <div className="truncate">
              <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition truncate">
                {name}
              </h4>
              <p className="text-[10px] text-gray-400 font-mono truncate">{handle}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition shrink-0 ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigateTo('auth_phone')}
          className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:brightness-110 shadow-md shadow-purple-600/30 transition"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In / Register</span>
        </button>
      )}
    </aside>
  );
};
