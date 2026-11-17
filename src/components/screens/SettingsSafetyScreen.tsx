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
  AlertTriangle,
  FileText,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const SettingsSafetyScreen: React.FC = () => {
  const { goBack, privacySettings, togglePrivacySetting } = useApp();

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
          <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-300 font-bold">
            AM
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Aarav Mehta</h4>
            <p className="text-[10px] text-gray-400 font-mono">+91 94026 12345 • Linked Google</p>
          </div>
        </div>
        <span className="text-[10px] text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
          Active
        </span>
      </div>

      {/* Privacy & Discovery Toggles */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Radar className="w-3.5 h-3.5 text-purple-400" />
          <span>Neighborhood Privacy Controls</span>
        </h3>

        <div className="bg-[#181924] rounded-2xl border border-[#27293b] divide-y divide-[#242636]">
          {/* Radar Mode */}
          <div className="p-3 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white">Neighborhood Radar Mode</h4>
              <p className="text-[10px] text-gray-400">Discover gatherings within 5km radius in Surat</p>
            </div>
            <button onClick={() => togglePrivacySetting('radarMode')}>
              {privacySettings.radarMode ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>

          {/* People Matching */}
          <div className="p-3 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white">Find New People / Vibe Matching</h4>
              <p className="text-[10px] text-gray-400">Allow other verified locals to discover your profile</p>
            </div>
            <button onClick={() => togglePrivacySetting('peopleMatching')}>
              {privacySettings.peopleMatching ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>

          {/* Ghost Mode */}
          <div className="p-3 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white">Ghost Mode</h4>
              <p className="text-[10px] text-gray-400">Hide your attendance status on event guest lists</p>
            </div>
            <button onClick={() => togglePrivacySetting('ghostMode')}>
              {privacySettings.ghostMode ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>

          {/* Incognito */}
          <div className="p-3 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white">Incognito Browsing</h4>
              <p className="text-[10px] text-gray-400">Browse circles without showing in recent visitors</p>
            </div>
            <button onClick={() => togglePrivacySetting('incognito')}>
              {privacySettings.incognito ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Safety Shield Center */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-pink-400" />
          <span>Trust & Safety Center</span>
        </h3>

        <div className="bg-[#181924] rounded-2xl border border-[#27293b] p-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <div>
                <h4 className="text-xs font-semibold text-white">Government ID Verification</h4>
                <p className="text-[10px] text-gray-400">Identity verified with DigiLocker / Aadhaar</p>
              </div>
            </div>
            <span className="text-[10px] text-green-300 font-bold">Verified ✓</span>
          </div>

          <div className="h-px bg-[#262838]"></div>

          <button
            onClick={() => alert('Late Night Safety Hotline: +91 1800-PLANORA')}
            className="w-full py-2.5 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center justify-between transition"
          >
            <span>Late Night Safety & Escort Support</span>
            <AlertTriangle className="w-3.5 h-3.5 text-purple-400" />
          </button>

          <button
            onClick={() => alert('Incident reporting form opened')}
            className="w-full py-2.5 px-3 rounded-xl bg-red-950/30 hover:bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center justify-between transition"
          >
            <span>Report Disruptive Member or Incident</span>
            <FileText className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5 text-purple-400" />
          <span>Notification Alerts</span>
        </h3>

        <div className="bg-[#181924] rounded-2xl border border-[#27293b] divide-y divide-[#242636]">
          <div className="p-3 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white">Push Notifications</h4>
              <p className="text-[10px] text-gray-400">RSVP approvals, chat messages & friend invites</p>
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
            <div>
              <h4 className="text-xs font-semibold text-white">WhatsApp Event Passes</h4>
              <p className="text-[10px] text-gray-400">Receive QR tickets & venue directions directly on WhatsApp</p>
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
    </div>
  );
};

