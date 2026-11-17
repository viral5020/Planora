import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Users, PlusCircle, MessageSquare, User, Wifi, Battery, Signal } from 'lucide-react';
import type { ScreenId } from '../../types';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const { currentScreen, navigateTo, deviceViewMode } = useApp();

  const showBottomNav = [
    'home',
    'people',
    'communities',
    'inbox',
    'profile',
    'my_events',
    'notifications'
  ].includes(currentScreen);

  const navItems: Array<{ id: ScreenId; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'people', label: 'People', icon: <Users className="w-5 h-5" /> },
    {
      id: 'create_step1_type',
      label: 'Create',
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 transform -translate-y-2 hover:scale-105 transition-all">
          <PlusCircle className="w-6 h-6 stroke-[2.2]" />
        </div>
      )
    },
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> }
  ];

  if (deviceViewMode === 'expanded') {
    return (
      <div className="max-w-4xl mx-auto min-h-screen bg-[#13141a] text-white shadow-2xl relative border-x border-[#232533]">
        {/* Top Status */}
        <div className="sticky top-0 z-50 bg-[#13141a]/90 backdrop-blur-md px-6 py-3 border-b border-[#232533] flex justify-between items-center text-xs text-gray-400">
          <span className="font-semibold text-white tracking-wide">PLANORA Web Experience</span>
          <div className="flex items-center gap-3">
            <span>Surat, India</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </div>

        {/* Content */}
        <div className="pb-24">{children}</div>

        {/* Bottom Nav */}
        {showBottomNav && (
          <div className="fixed bottom-0 left-0 right-0 max-w-4xl mx-auto bg-[#13141a]/95 backdrop-blur-xl border-t border-[#232533] px-6 py-2 flex justify-around items-center z-40">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActive ? 'text-purple-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {item.icon}
                  <span className="text-[11px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-6 px-2 min-h-screen">
      {/* Smartphone Chassis */}
      <div className="w-[395px] h-[850px] bg-[#0b0c10] rounded-[52px] p-[10px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-[5px] border-[#2a2c3a] relative flex flex-col overflow-hidden">
        {/* Outer Phone Bezel accents */}
        <div className="absolute top-28 -left-[7px] w-[3px] h-10 bg-[#3f4356] rounded-l-sm"></div>
        <div className="absolute top-44 -left-[7px] w-[3px] h-12 bg-[#3f4356] rounded-l-sm"></div>
        <div className="absolute top-36 -right-[7px] w-[3px] h-16 bg-[#3f4356] rounded-r-sm"></div>

        {/* Inner Screen Area */}
        <div className="w-full h-full bg-[#13141a] rounded-[42px] overflow-hidden flex flex-col relative">
          {/* iOS Dynamic Island & Status Bar */}
          <div className="h-11 w-full bg-[#13141a] z-50 flex items-center justify-between px-7 shrink-0 select-none">
            <span className="text-[13px] font-semibold text-white tracking-tight">9:41</span>

            {/* Dynamic Island Pill */}
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#20222e]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#151620] border border-[#2d2f3e]"></span>
            </div>

            <div className="flex items-center gap-1.5 text-white">
              <Signal className="w-3.5 h-3.5 fill-white" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-white" />
            </div>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth flex flex-col">
            {children}
            {showBottomNav && <div className="h-20 shrink-0"></div>}
          </div>

          {/* Floating Mobile Bottom Navigation Bar */}
          {showBottomNav && (
            <div className="absolute bottom-0 left-0 right-0 bg-[#161720]/95 backdrop-blur-xl border-t border-[#252838] px-4 py-2 flex justify-around items-center z-40">
              {navItems.map((item) => {
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`flex flex-col items-center gap-0.5 transition-colors ${
                      isActive ? 'text-purple-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Home Indicator bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full pointer-events-none z-50"></div>
        </div>
      </div>
    </div>
  );
};
