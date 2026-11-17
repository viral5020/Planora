import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  AlertCircle,
  Save,
  Eye,
  Plus,
  LogOut
} from 'lucide-react';
import type { EventItem, HostApplicationItem } from '../../types';

export const AdminScreen: React.FC = () => {
  const {
    events,
    hostApplications,
    approveHostApplication,
    rejectHostApplication,
    approveEvent,
    rejectEvent,
    deleteEvent,
    updateEvent,
    navigateTo,
    logoutAdmin
  } = useApp();

  const [activeTab, setActiveTab] = useState<'events' | 'hosts'>('events');
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [filterCity, setFilterCity] = useState('All');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const pendingHostsCount = hostApplications.filter((h) => h.status === 'pending').length;
  const pendingEventsCount = events.filter((e) => e.verificationStatus === 'pending').length;

  const handleApproveHost = async (id: string) => {
    await approveHostApplication(id);
    setActionSuccess('Host approved successfully! Their Host ID is now active.');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleRejectHost = async (id: string) => {
    await rejectHostApplication(id, 'Information provided does not meet Planora standards.');
    setActionSuccess('Host application marked as rejected.');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleApproveEvent = async (id: string) => {
    await approveEvent(id);
    setActionSuccess('Gathering approved and made live on the public feed!');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleRejectEvent = async (id: string) => {
    await rejectEvent(id, 'Event does not meet community guidelines.');
    setActionSuccess('Gathering moved to rejected state.');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this event?')) {
      await deleteEvent(id);
      setActionSuccess('Event deleted from Supabase.');
      setTimeout(() => setActionSuccess(null), 3500);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    await updateEvent(editingEvent.id, {
      title: editingEvent.title,
      category: editingEvent.category,
      venue: editingEvent.venue,
      date: editingEvent.date,
      time: editingEvent.time,
      price: Number(editingEvent.price) || 0,
      totalCapacity: Number(editingEvent.totalCapacity) || 50,
      vibeDescription: editingEvent.vibeDescription,
      city: editingEvent.city
    });

    setEditingEvent(null);
    setActionSuccess('Event details updated successfully.');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const filteredEvents = filterCity === 'All'
    ? events
    : events.filter((e) => e.city.toLowerCase() === filterCity.toLowerCase());

  return (
    <div className="flex-1 bg-[#0f1017] text-white p-4 sm:p-6 space-y-6 max-w-6xl mx-auto w-full">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#20222f]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-9 h-9 rounded-xl bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
            title="Back to App"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                MASTER ADMIN
              </span>
              <span className="text-[10px] text-green-400 font-mono">● Authenticated as Admin</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">Planora Superadmin</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab Pills with Pending Badges */}
          <div className="flex bg-[#181924] p-1 rounded-2xl border border-[#27293b]">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Events</span>
              {pendingEventsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-pink-500 text-white">
                  {pendingEventsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('hosts')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'hosts'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Host Apps (₹300)</span>
              {pendingHostsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-500 text-white">
                  {pendingHostsCount}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={logoutAdmin}
            className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>

      {/* Action Success Alert */}
      {actionSuccess && (
        <div className="p-3.5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          <span className="font-semibold">{actionSuccess}</span>
        </div>
      )}

      {/* TAB 1: HOST APPLICATIONS (₹300) */}
      {activeTab === 'hosts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white">Host Verification Requests</h2>
              <p className="text-xs text-gray-400">
                Review applicants who paid ₹300. Approving unlocks their custom Host ID and publishing console.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              {hostApplications.length} Total Applications
            </span>
          </div>

          {hostApplications.length === 0 ? (
            <div className="bg-[#181924] p-10 rounded-3xl border border-[#27293b] text-center space-y-3">
              <ShieldAlert className="w-10 h-10 text-gray-500 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Host Applications Yet</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Users can apply to become a host from the member side by paying ₹300.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {hostApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#181924] p-4 rounded-3xl border border-[#27293b] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#35384e] transition"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">{app.userName}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {app.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'approved'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : app.status === 'rejected'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}
                      >
                        {app.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 italic max-w-2xl">
                      "{app.experienceBio || 'No experience details specified'}"
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 pt-1 font-mono">
                      <span>Host ID: <strong className="text-amber-400">{app.hostId || 'host_pending'}</strong></span>
                      {app.hostPassword && <span>Pass: <strong className="text-gray-300">{app.hostPassword}</strong></span>}
                      <span>• Fee: ₹{app.paymentAmount} (Paid)</span>
                      <span>• Ref: {app.paymentReference || 'PLN_300'}</span>
                      {app.phone && <span>• Tel: {app.phone}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {app.status !== 'approved' && (
                      <button
                        onClick={() => handleApproveHost(app.id)}
                        className="py-2 px-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-green-600/20 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Host ID</span>
                      </button>
                    )}

                    {app.status !== 'rejected' && (
                      <button
                        onClick={() => handleRejectHost(app.id)}
                        className="py-2 px-3.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EVENTS MANAGEMENT */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-extrabold text-white">All Gatherings & Verifications</h2>
              <p className="text-xs text-gray-400">
                Approve newly published events, edit details, or permanently delete entries.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Filter City:</span>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="bg-[#181924] border border-[#27293b] rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="All">All Cities</option>
                <option value="Surat">Surat</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredEvents.map((event) => {
              const isPending = event.verificationStatus === 'pending';
              const isApproved = event.verificationStatus === 'approved' || (!event.verificationStatus);

              return (
                <div
                  key={event.id}
                  className="bg-[#181924] p-4 rounded-3xl border border-[#27293b] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#35384e] transition"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80'}
                      alt={event.title}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-purple-500/30"
                    />

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-extrabold text-white truncate">{event.title}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {event.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isPending
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                              : isApproved
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {isPending ? 'PENDING VERIFICATION' : isApproved ? 'LIVE' : 'REJECTED'}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 truncate">
                        {event.venue} • {event.city}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 font-mono">
                        <span>🗓️ {event.date}</span>
                        <span>⏰ {event.time}</span>
                        <span className="text-purple-400 font-bold">₹{event.price}</span>
                        <span>👥 {event.attendingCount}/{event.totalCapacity} capacity</span>
                        <span>Host: {event.host?.name || 'Aarav Mehta'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin action buttons */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {isPending && (
                      <button
                        onClick={() => handleApproveEvent(event.id)}
                        className="py-1.5 px-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-green-600/20 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify & Publish</span>
                      </button>
                    )}

                    {isPending && (
                      <button
                        onClick={() => handleRejectEvent(event.id)}
                        className="py-1.5 px-3 rounded-xl bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-500/30 font-bold text-xs flex items-center gap-1 transition"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}

                    <button
                      onClick={() => setEditingEvent(event)}
                      className="py-1.5 px-3 rounded-xl bg-[#232537] hover:bg-[#2b2e42] text-gray-200 border border-[#2f3248] text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181924] border border-[#2a2d3e] rounded-3xl p-6 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#242738]">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-400" />
                <span>Edit Gathering Details</span>
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="w-7 h-7 rounded-full bg-[#232537] text-gray-400 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Gathering Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-medium">Category</label>
                  <input
                    type="text"
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-medium">City</label>
                  <input
                    type="text"
                    value={editingEvent.city}
                    onChange={(e) => setEditingEvent({ ...editingEvent, city: e.target.value })}
                    className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Venue Location</label>
                <input
                  type="text"
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-medium">Date</label>
                  <input
                    type="text"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-medium">Time</label>
                  <input
                    type="text"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-medium">Ticket Price (₹)</label>
                  <input
                    type="number"
                    value={editingEvent.price}
                    onChange={(e) => setEditingEvent({ ...editingEvent, price: Number(e.target.value) })}
                    className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-medium">Total Capacity</label>
                  <input
                    type="number"
                    value={editingEvent.totalCapacity}
                    onChange={(e) => setEditingEvent({ ...editingEvent, totalCapacity: Number(e.target.value) })}
                    className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Vibe Description</label>
                <textarea
                  rows={3}
                  value={editingEvent.vibeDescription}
                  onChange={(e) => setEditingEvent({ ...editingEvent, vibeDescription: e.target.value })}
                  className="w-full bg-[#12131b] border border-[#27293b] rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="py-2.5 px-4 rounded-xl bg-[#232537] text-gray-300 text-xs font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:brightness-110 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
