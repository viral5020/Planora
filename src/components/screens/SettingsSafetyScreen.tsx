import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Shield,
  EyeOff,
  Radar,
  Users,
  Bell,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  LogOut
} from 'lucide-react';

export const SettingsSafetyScreen: React.FC = () => {
  const { goBack, privacySettings, togglePrivacySetting, userProfile, userEmail, logout } = useApp();

  const name = userProfile?.name || 'Aarav Mehta';
  const handle = userProfile?.handle || '@aarav_surat';
  const avatar = userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

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
        <h2 className="text-sm font-bold text-white">Settings & Safety</h2>
        <div className="w-8"></div>
      </div>

      {/* Account Info Card */}
      <div className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border border-purple-500/50"
          />
          <div>
            <h4 className="text-xs font-bold text-white">{name}</h4>
            <p className="text-[10px] text-gray-400 font-mono">
              {handle} {userEmail ? `• ${userEmail}` : '• +91 94026 12345'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-[10px] text-red-400 font-semibold bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-xl border border-red-500/20 transition flex items-center gap-1"
        >
          <LogOut className="w-3 h-3" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Privacy & Safety Toggles */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider px-1">
          Discovery & Privacy Controls
        </h3>

        <div className="bg-[#181924] rounded-2xl border border-[#27293b] divide-y divide-[#232535]">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Radar className="w-4 h-4 text-purple-400" />
              <div>
                <h4 className="text-xs font-semibold text-white">Neighborhood Radar Mode</h4>
                <p className="text-[10px] text-gray-400">Discover spontaneous gatherings within 3km</p>
              </div>
            </div>
            <button onClick={() => togglePrivacySetting('radarMode')}>
              {privacySettings.radarMode ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>

          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-indigo-400" />
              <div>
                <h4 className="text-xs font-semibold text-white">Find Shared Vibe People</h4>
                <p className="text-[10px] text-gray-400">Match based on your interests & events attended</p>
              </div>
            </div>
            <button onClick={() => togglePrivacySetting('peopleMatching')}>
              {privacySettings.peopleMatching ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>

          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <EyeOff className="w-4 h-4 text-pink-400" />
              <div>
                <h4 className="text-xs font-semibold text-white">Ghost Mode (Invisible at Venues)</h4>
                <p className="text-[10px] text-gray-400">Do not show profile on attendee list until approved</p>
              </div>
            </div>
            <button onClick={() => togglePrivacySetting('ghostMode')}>
              {privacySettings.ghostMode ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Controls */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider px-1">
          Notification Preferences
        </h3>

        <div className="bg-[#181924] rounded-2xl border border-[#27293b] divide-y divide-[#232535]">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-purple-400" />
              <div>
                <h4 className="text-xs font-semibold text-white">Push Notifications</h4>
                <p className="text-[10px] text-gray-400">RSVP approvals, chat messages & friend invites</p>
              </div>
            </div>
            <button onClick={() => togglePrivacySetting('pushNotifs')}>
              {privacySettings.pushNotifs ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>

          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-green-400" />
              <div>
                <h4 className="text-xs font-semibold text-white">WhatsApp Event Passes</h4>
                <p className="text-[10px] text-gray-400">Receive QR tickets & directions directly on WhatsApp</p>
              </div>
            </div>
            <button onClick={() => togglePrivacySetting('whatsappUpdates')}>
              {privacySettings.whatsappUpdates ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="p-3 rounded-2xl bg-[#181924] border border-[#27293b] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-white">Planora Safety Guidelines</span>
        </div>
        <span className="text-[10px] text-purple-400 font-mono">v1.0.0</span>
      </div>
    </div>
  );
};
