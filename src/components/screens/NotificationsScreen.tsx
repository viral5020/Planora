import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Bell, CheckCircle2, Heart, Users, Sparkles } from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { goBack, notifications, markNotificationRead, navigateTo } = useApp();

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={goBack}
          className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-sm font-bold text-white">Notifications</h2>
        <span className="text-[10px] text-purple-400 font-semibold cursor-pointer">
          Mark All Read
        </span>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block px-1">
          Recent Activity
        </span>

        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              markNotificationRead(item.id);
              if (item.actionScreen) navigateTo(item.actionScreen);
            }}
            className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
              item.read
                ? 'bg-[#181924] border-[#25283a] text-gray-300'
                : 'bg-gradient-to-r from-purple-950/50 to-[#1c1e2b] border-purple-500/40 text-white shadow-md'
            }`}
          >
            {/* Avatar or Icon */}
            <div className="relative shrink-0">
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400">
                  <Bell className="w-5 h-5" />
                </div>
              )}
              {!item.read && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full ring-2 ring-[#181924]"></span>
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <span className="text-[10px] text-gray-500 font-mono">{item.timeAgo}</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-snug">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

