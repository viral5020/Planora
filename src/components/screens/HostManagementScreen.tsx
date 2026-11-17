import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Users,
  Check,
  X,
  Megaphone,
  QrCode,
  Calendar,
  Clock,
  MapPin,
  PlusCircle,
  ShieldCheck,
  AlertCircle,
  Eye,
  LogOut,
  Sparkles
} from 'lucide-react';
import type { EventItem, GuestRequest } from '../../types';

export const HostManagementScreen: React.FC = () => {
  const {
    goBack,
    guestRequests,
    approveGuest,
    declineGuest,
    navigateTo,
    events,
    userProfile,
    logoutHost
  } = useApp();

  const [tab, setTab] = useState<'pending' | 'confirmed' | 'events'>('pending');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Filter events belonging to or managed by host
  const hostEvents = events && events.length > 0 ? events : [];
  const activeEvent = selectedEventId
    ? hostEvents.find((e) => e.id === selectedEventId) || hostEvents[0]
    : hostEvents[0];

  const pending = guestRequests.filter((g) => g.status === 'pending');
  const confirmed = guestRequests.filter((g) => g.status === 'approved');

  const handleBroadcast = () => {
    const msg = prompt(`Send push announcement to all confirmed guests for "${activeEvent?.title || 'Event'}":`);
    if (msg) {
      setBroadcastSent(true);
      setTimeout(() => setBroadcastSent(false), 3500);
    }
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 sm:p-6 space-y-5 max-w-4xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#20222f]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
            title="Back to App"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                HOST CONSOLE
              </span>
              <span className="text-[10px] text-green-400 font-mono">● Verified Host Active</span>
            </div>
            <h1 className="text-xl font-black text-white mt-0.5">Host Event Control Panel</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('create_step1_type')}
            className="hidden sm:flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:brightness-110 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Host New Event</span>
          </button>

          <button
            onClick={logoutHost}
            className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1 transition"
            title="Log out of host mode"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Host Mode</span>
          </button>
        </div>
      </div>

      {/* Broadcast Alert feedback */}
      {broadcastSent && (
        <div className="p-3.5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
          <span>Broadcast announcement sent to all confirmed attendees!</span>
        </div>
      )}

      {/* Active Event Selector / Stats Header */}
      {activeEvent ? (
        <div className="bg-[#181924] p-4 sm:p-5 rounded-3xl border border-[#27293b] space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                Managing Gathering
              </span>
              <h2 className="text-lg font-black text-white">{activeEvent.title}</h2>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-400" />
                <span>{activeEvent.venue} • {activeEvent.date}</span>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleBroadcast}
                className="py-2 px-3 rounded-xl bg-[#232537] hover:bg-[#2b2e42] border border-[#2f3248] text-xs font-bold text-gray-200 flex items-center gap-1.5 transition"
              >
                <Megaphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Broadcast</span>
              </button>

              <button
                onClick={() => navigateTo('create_step1_type')}
                className="sm:hidden py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                + New
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
            <div className="bg-[#12131b] p-3 rounded-2xl border border-[#242636]">
              <span className="text-lg font-black text-white">
                {activeEvent.attendingCount} / {activeEvent.totalCapacity}
              </span>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">Confirmed Guests</p>
            </div>

            <div className="bg-[#12131b] p-3 rounded-2xl border border-[#242636]">
              <span className="text-lg font-black text-amber-400 font-mono">
                {pending.length}
              </span>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">Pending RSVPs</p>
            </div>

            <div className="bg-[#12131b] p-3 rounded-2xl border border-[#242636]">
              <span className="text-lg font-black text-green-400 font-mono">
                ₹{activeEvent.price * activeEvent.attendingCount}
              </span>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">Est. Revenue</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#181924] p-6 rounded-3xl border border-[#27293b] text-center space-y-3">
          <Calendar className="w-8 h-8 text-gray-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">No active gatherings created yet</h3>
          <p className="text-xs text-gray-400">Host your first gathering in Surat to start receiving guest RSVPs.</p>
          <button
            onClick={() => navigateTo('create_step1_type')}
            className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
          >
            Create Your First Gathering
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-[#181924] p-1 rounded-2xl border border-[#27293b] text-xs">
        <button
          onClick={() => setTab('pending')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            tab === 'pending'
              ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Pending Approvals</span>
          {pending.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-pink-500 text-white">
              {pending.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab('confirmed')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            tab === 'confirmed'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Confirmed Guests</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#141520] text-gray-300">
            {confirmed.length}
          </span>
        </button>

        <button
          onClick={() => setTab('events')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            tab === 'events'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>My Gatherings ({hostEvents.length})</span>
        </button>
      </div>

      {/* TAB 1: PENDING GUEST RSVPS */}
      {tab === 'pending' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Review guest profiles & approve entry passes</span>
            <span>{pending.length} awaiting response</span>
          </div>

          {pending.length === 0 ? (
            <div className="bg-[#181924] p-8 rounded-3xl border border-[#27293b] text-center space-y-2">
              <Check className="w-8 h-8 text-green-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">All caught up!</h4>
              <p className="text-xs text-gray-400">No pending guest RSVP requests at this moment.</p>
            </div>
          ) : (
            pending.map((g) => (
              <div
                key={g.id}
                className="bg-[#181924] p-4 rounded-3xl border border-[#27293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#35384e] transition"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={g.avatar}
                    alt={g.name}
                    className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-purple-500/30"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{g.name}</h4>
                      <span className="text-[10px] text-gray-400 font-mono">• {g.profession}</span>
                    </div>
                    <p className="text-xs text-gray-300 italic">"{g.note}"</p>
                    <p className="text-[10px] text-purple-400 font-mono">{g.timeAgo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => approveGuest(g.id)}
                    className="py-1.5 px-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Approve Pass</span>
                  </button>

                  <button
                    onClick={() => declineGuest(g.id)}
                    className="py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: CONFIRMED ATTENDEES */}
      {tab === 'confirmed' && (
        <div className="space-y-3">
          {confirmed.length === 0 ? (
            <div className="bg-[#181924] p-8 rounded-3xl border border-[#27293b] text-center space-y-2">
              <Users className="w-8 h-8 text-gray-500 mx-auto" />
              <h4 className="text-sm font-bold text-white">No confirmed attendees yet</h4>
              <p className="text-xs text-gray-400">Approved guest passes will appear here.</p>
            </div>
          ) : (
            confirmed.map((g) => (
              <div
                key={g.id}
                className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={g.avatar} alt={g.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{g.name}</h4>
                    <p className="text-[10px] text-gray-400">{g.profession}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                  QR Pass Issued
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: HOST GATHERINGS LIST */}
      {tab === 'events' && (
        <div className="space-y-3">
          {hostEvents.map((e) => (
            <div
              key={e.id}
              onClick={() => setSelectedEventId(e.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                activeEvent?.id === e.id
                  ? 'bg-purple-900/20 border-purple-500'
                  : 'bg-[#181924] border-[#27293b] hover:border-[#383b52]'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={e.image} alt={e.title} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{e.title}</h4>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {e.venue} • {e.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-purple-400">
                  {e.attendingCount} attending
                </span>
                <p className="text-[9px] text-gray-500 font-mono">
                  {e.verificationStatus === 'pending' ? 'Pending Admin' : 'Active Live'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
