import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Users,
  IndianRupee,
  Shield,
  Check,
  X,
  Megaphone,
  QrCode,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const HostManagementScreen: React.FC = () => {
  const { goBack, guestRequests, approveGuest, declineGuest, navigateTo } = useApp();
  const [tab, setTab] = useState<'pending' | 'confirmed'>('pending');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const pending = guestRequests.filter((g) => g.status === 'pending');
  const confirmed = guestRequests.filter((g) => g.status === 'approved');

  const handleBroadcast = () => {
    const msg = prompt('Enter announcement message to broadcast to all 32 confirmed attendees:');
    if (msg) {
      setBroadcastSent(true);
      setTimeout(() => setBroadcastSent(false), 3000);
    }
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={goBack}
          className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
          HOST CONSOLE
        </span>
      </div>

      {/* Event Title & Status */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-white">Midnight Vinyl & Tapas Social</h2>
        <p className="text-xs text-gray-400">Skyline Terrace Lounge • Saturday, Oct 21</p>
      </div>

      {/* Revenue & Metrics Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] text-center">
          <div className="flex items-center justify-center gap-1 text-purple-400">
            <Users className="w-3.5 h-3.5" />
            <span className="font-extrabold text-sm text-white">45</span>
          </div>
          <span className="text-[10px] text-gray-400">Total RSVPs</span>
        </div>

        <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] text-center">
          <div className="flex items-center justify-center gap-1 text-green-400">
            <IndianRupee className="w-3.5 h-3.5" />
            <span className="font-extrabold text-sm text-white">19.9k</span>
          </div>
          <span className="text-[10px] text-gray-400">Gross Sales</span>
        </div>

        <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] text-center">
          <div className="flex items-center justify-center gap-1 text-pink-400">
            <span className="font-extrabold text-sm text-white">8</span>
          </div>
          <span className="text-[10px] text-gray-400">Spots Left</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#191b26] p-1 rounded-2xl border border-[#27293b] text-xs">
        <button
          onClick={() => setTab('pending')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition flex items-center justify-center gap-1.5 ${
            tab === 'pending' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Pending Approvals</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-900 text-purple-200">
            {pending.length}
          </span>
        </button>

        <button
          onClick={() => setTab('confirmed')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition flex items-center justify-center gap-1.5 ${
            tab === 'confirmed' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Confirmed Guests</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#27293b] text-gray-300">
            32
          </span>
        </button>
      </div>

      {/* Guest Cards */}
      <div className="space-y-3">
        {tab === 'pending' ? (
          pending.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              All guest requests have been reviewed! 🎉
            </div>
          ) : (
            pending.map((guest) => (
              <div
                key={guest.id}
                className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={guest.avatar}
                      alt={guest.name}
                      className="w-10 h-10 rounded-full object-cover border border-purple-500/50"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{guest.name}</h4>
                      <p className="text-[10px] text-gray-400">{guest.profession}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{guest.timeAgo}</span>
                </div>

                <p className="text-[11px] text-gray-300 bg-[#14151e] p-2 rounded-xl border border-[#222433] italic">
                  "{guest.note}"
                </p>

                {/* Approve / Decline Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => approveGuest(guest.id)}
                    className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-1 transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Guest</span>
                  </button>

                  <button
                    onClick={() => declineGuest(guest.id)}
                    className="py-2 px-3 rounded-xl bg-[#232535] hover:bg-[#2c2f42] text-gray-400 hover:text-white text-xs font-medium transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="space-y-2">
            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="guest"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Devika Shah</h4>
                  <p className="text-[10px] text-gray-400">Pass #PL-401 • Paid ₹499</p>
                </div>
              </div>
              <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                Verified
              </span>
            </div>

            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                  alt="guest"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Arjun Parekh</h4>
                  <p className="text-[10px] text-gray-400">Pass #PL-402 • Paid ₹499</p>
                </div>
              </div>
              <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                Verified
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Host Operations Toolkit */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Host Toolkit</h3>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleBroadcast}
            className="p-3 rounded-2xl bg-[#1b1d2b] hover:bg-[#23263a] border border-[#2c3046] text-left space-y-1 transition"
          >
            <Megaphone className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold text-white">Broadcast Announcement</h4>
            <p className="text-[10px] text-gray-400">Push notification to all guests</p>
          </button>

          <button
            onClick={() => navigateTo('event_chat')}
            className="p-3 rounded-2xl bg-[#1b1d2b] hover:bg-[#23263a] border border-[#2c3046] text-left space-y-1 transition"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <h4 className="text-xs font-bold text-white">Open Group Chat</h4>
            <p className="text-[10px] text-gray-400">Live chat with confirmed attendees</p>
          </button>
        </div>

        {broadcastSent && (
          <div className="p-2.5 rounded-xl bg-green-600/20 border border-green-500/40 text-green-300 text-xs text-center font-medium animate-fade-in">
            Broadcast announcement sent to all 32 guests! 📢
          </div>
        )}

        {/* Emergency Host Shield */}
        <button
          onClick={() => alert('Host Emergency Shield activated. Venue security & local support notified.')}
          className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-950/60 border border-red-500/30 text-red-300 font-bold text-xs transition flex items-center justify-center gap-2 mt-2"
        >
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>Host Emergency Shield / Venue Alert</span>
        </button>
      </div>
    </div>
  );
};

