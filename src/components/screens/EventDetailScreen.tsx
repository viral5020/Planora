import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Flame
} from 'lucide-react';

export const EventDetailScreen: React.FC = () => {
  const { selectedEvent, goBack, requestRSVP, navigateTo } = useApp();

  if (!selectedEvent) {
    return (
      <div className="flex-1 bg-[#13141a] text-white p-6 flex flex-col items-center justify-center text-center space-y-3">
        <Flame className="w-8 h-8 text-purple-400" />
        <h3 className="text-base font-bold">No event selected</h3>
        <button
          onClick={() => navigateTo('home')}
          className="py-2 px-4 rounded-xl bg-purple-600 text-xs font-semibold text-white"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  const isPending = selectedEvent.status === 'pending';
  const isApproved = selectedEvent.status === 'approved';

  return (
    <div className="flex-1 bg-[#13141a] text-white flex flex-col justify-between">
      <div>
        {/* Hero Image Section */}
        <div className="relative h-64 w-full">
          <img
            src={selectedEvent.image || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'}
            alt={selectedEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13141a] via-[#13141a]/50 to-transparent"></div>

          {/* Top Floating Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Link copied to clipboard: https://planora.app/e/' + selectedEvent.id)}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Pill Over Image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600/90 text-white backdrop-blur-md border border-purple-400/40 shadow-lg">
              {selectedEvent.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black font-mono bg-black/80 text-purple-300 border border-purple-500/30">
              ₹{selectedEvent.price} / person
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-5">
          {/* Title & Host info */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {selectedEvent.title}
            </h1>
            {selectedEvent.subtitle && (
              <p className="text-xs text-purple-300 font-medium">{selectedEvent.subtitle}</p>
            )}

            {/* Host Banner */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#181924] border border-[#27293b] mt-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedEvent.host?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={selectedEvent.host?.name || 'Host'}
                  className="w-10 h-10 rounded-full object-cover border border-purple-500/50"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white">{selectedEvent.host?.name || 'Aarav Mehta'}</h4>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-300 font-bold">
                      {selectedEvent.host?.badge || 'Host'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono">{selectedEvent.host?.handle || '@host'}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  ★ {selectedEvent.host?.rating || 4.9}
                </span>
                <p className="text-[9px] text-gray-400">Host Rating</p>
              </div>
            </div>
          </div>

          {/* Logistics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold text-gray-400">Date</span>
              </div>
              <p className="text-xs font-bold text-white">{selectedEvent.date}</p>
            </div>

            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold text-gray-400">Timing</span>
              </div>
              <p className="text-xs font-bold text-white">{selectedEvent.time}</p>
            </div>

            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] space-y-1 col-span-2">
              <div className="flex items-center gap-1.5 text-purple-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold text-gray-400">Venue</span>
              </div>
              <p className="text-xs font-bold text-white">{selectedEvent.venue}</p>
            </div>
          </div>

          {/* The Vibe Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
              The Gathering Vibe
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed bg-[#181924] p-3.5 rounded-2xl border border-[#27293b]">
              {selectedEvent.vibeDescription}
            </p>
          </div>

          {/* Vibe Tags */}
          {selectedEvent.vibeTags && selectedEvent.vibeTags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">Vibe Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedEvent.vibeTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-semibold bg-[#181924] border border-[#2d2f44] text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gathering Guidelines */}
          {selectedEvent.rules && selectedEvent.rules.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Host Guidelines & Safety
              </h3>
              <div className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] space-y-2">
                {selectedEvent.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky RSVP Action Bar */}
      <div className="sticky bottom-0 bg-[#141520]/95 backdrop-blur-xl border-t border-[#232535] p-4 flex items-center justify-between gap-4 mt-6">
        <div>
          <span className="text-[10px] text-gray-400 uppercase font-mono">Entry Pass</span>
          <p className="text-base font-black text-white">₹{selectedEvent.price}</p>
        </div>

        <button
          onClick={() => requestRSVP(selectedEvent.id)}
          className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs transition shadow-lg ${
            isApproved
              ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/30'
              : isPending
              ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-600/30 hover:brightness-110 active:scale-[0.98]'
          }`}
        >
          {isApproved ? 'Pass Confirmed (Tap to Cancel)' : isPending ? 'RSVP Awaiting Host Approval' : 'Request RSVP Pass'}
        </button>
      </div>
    </div>
  );
};
