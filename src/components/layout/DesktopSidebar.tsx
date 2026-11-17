import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ScreenId } from '../../types';
import {
  Compass,
  Users,
  PlusCircle,
  MessageSquare,
  User,
  Shield,
  Ticket,
  Sliders,
  MapPin,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const { currentScreen, navigateTo, selectedCity, guestRequests, notifications } = useApp();

  const pendingCount = guestRequests.filter((g) => g.status === 'pending').length;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: Array<{
    id: ScreenId;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    { id: 'home', label: 'Explore Feed', icon: <Compass className="w-5 h-5" /> },
    { id: 'people', label: 'Discover People', icon: <Users className="w-5 h-5" />, badge: 'Match', badgeColor: 'bg-pink-500/20 text-pink-300' },
    { id: 'communities', label: 'Communities', icon: <Sparkles className="w-5 h-5" />, badge: '5 Circles' },
    { id: 'host_management', label: 'Host Console', icon: <Sliders className="w-5 h-5" />, badge: pendingCount > 0 ? pendingCount : undefined, badgeColor: 'bg-purple-600 text-white' },
    { id: 'inbox', label: 'Inbox & Chats', icon: <MessageSquare className="w-5 h-5" />, badge: '3 Unread', badgeColor: 'bg-pink-500 text-white' },
    { id: 'my_events', label: 'My Event Passes', icon: <Ticket className="w-5 h-5" /> },
    { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
    { id: 'settings_safety', label: 'Settings & Safety', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <aside className="w-64 bg-[#12131b] border-r border-[#20222e] flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0">
      {/* Brand & City */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 p-0.5 shadow-lg shadow-purple-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#161722] rounded-[14px] flex items-center justify-center text-white font-extrabold text-sm">
              P
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-white">PLANORA</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-gray-400">Social Gathering Layer</p>
          </div>
        </div>

        {/* City Switcher Pill */}
        <button
          onClick={() => navigateTo('onboarding_location')}
          className="w-full p-2.5 rounded-2xl bg-[#181924] hover:bg-[#1e202f] border border-[#27293b] flex items-center justify-between transition text-left group"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-purple-300 transition">
                {selectedCity}
              </p>
              <p className="text-[9px] text-gray-400">89 gatherings active</p>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-white" />
        </button>

        {/* Create Gathering CTA */}
        <button
          onClick={() => navigateTo('create_step1_type')}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Host a Gathering</span>
        </button>

        {/* Nav Links */}
        <nav className="space-y-1 pt-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id || (item.id === 'inbox' && currentScreen === 'event_chat');
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full px-3 py-2.5 rounded-2xl flex items-center justify-between text-xs font-semibold transition ${
                  isActive
                    ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#181a24]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-purple-400' : 'text-gray-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      item.badgeColor || 'bg-[#222434] text-gray-300'
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
      <div
        onClick={() => navigateTo('profile')}
        className="p-3 rounded-2xl bg-[#181924] hover:bg-[#1e202f] border border-[#27293b] flex items-center justify-between cursor-pointer transition group"
      >
        <div className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Aarav"
            className="w-9 h-9 rounded-full object-cover border border-purple-500/50"
          />
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition">
              Aarav Mehta
            </h4>
            <p className="text-[10px] text-gray-400 font-mono">@aarav_surat</p>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      </div>
    </aside>
  );
};
