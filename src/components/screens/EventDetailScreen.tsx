import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const EventDetailScreen: React.FC = () => {
  const { selectedEvent, goBack, requestRSVP, navigateTo } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);

  const isPending = selectedEvent.status === 'pending';
  const isApproved = selectedEvent.status === 'approved';

  return (
    <div className="flex-1 bg-[#13141a] text-white flex flex-col justify-between">
      <div>
        {/* Hero Image Section */}
        <div className="relative h-64 w-full">
          <img
            src={selectedEvent.image}
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
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Content Overlay */}
          <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-600/90 text-white backdrop-blur-md">
                {selectedEvent.category}
              </span>
              {selectedEvent.isCurated && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-400" /> Curated Social
                </span>
              )}
            </div>
            <h1 className="text-xl font-extrabold text-white leading-tight drop-shadow-md">
              {selectedEvent.title}
            </h1>
            <p className="text-xs text-gray-300">{selectedEvent.subtitle}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-5">
          {/* Host Card */}
          <div className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedEvent.host.avatar}
                alt={selectedEvent.host.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/60"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">{selectedEvent.host.name}</h4>
                  <span className="text-[10px] text-yellow-400 font-bold">★ {selectedEvent.host.rating}</span>
                </div>
                <p className="text-[10px] text-purple-300">{selectedEvent.host.badge}</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('host_management')}
              className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 bg-purple-500/10 px-2.5 py-1.5 rounded-xl border border-purple-500/30"
            >
              Host Tools
            </button>
          </div>

          {/* Logistics Matrix */}
          <div className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">{selectedEvent.date}</p>
                <p className="text-[10px] text-gray-400">{selectedEvent.time}</p>
              </div>
            </div>

            <div className="h-px bg-[#262838]"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{selectedEvent.venue}</p>
                <p className="text-[10px] text-purple-400 flex items-center gap-1 cursor-pointer">
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </p>
              </div>
            </div>

            <div className="h-px bg-[#262838]"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">
                  {selectedEvent.attendingCount} Confirmed Guests
                </p>
                <p className="text-[10px] text-gray-400 font-mono">
                  {selectedEvent.totalCapacity - selectedEvent.attendingCount} spots remaining • Intimate limit
                </p>
              </div>
            </div>
          </div>

          {/* Guest List Preview Avatars */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-200 uppercase tracking-wider text-[11px]">
                Curated Guest List
              </span>
              <span className="text-[11px] text-purple-400 font-mono">32 Attending</span>
            </div>

            <div className="flex items-center gap-2 bg-[#181924] p-3 rounded-2xl border border-[#27293b]">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="guest"
                  className="w-7 h-7 rounded-full border-2 border-[#181924] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                  alt="guest"
                  className="w-7 h-7 rounded-full border-2 border-[#181924] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80"
                  alt="guest"
                  className="w-7 h-7 rounded-full border-2 border-[#181924] object-cover"
                />
                <div className="w-7 h-7 rounded-full bg-purple-900 border-2 border-[#181924] flex items-center justify-center text-[9px] font-bold text-white">
                  +29
                </div>
              </div>
              <p className="text-[10px] text-gray-400 flex-1 pl-2">
                Devika, Arjun, and 30 other verified locals from Surat are attending.
              </p>
            </div>
          </div>

          {/* The Vibe Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">The Vibe</h3>
            <p className="text-xs text-gray-300 leading-relaxed bg-[#181924] p-3 rounded-2xl border border-[#27293b]">
              {selectedEvent.vibeDescription}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedEvent.vibeTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-xl text-[10px] font-medium bg-[#1d1f2e] text-purple-300 border border-[#2f3248]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Vibe & Safety Guidelines */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Community Safety & Rules</span>
            </h3>
            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] space-y-2">
              {selectedEvent.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="sticky bottom-0 bg-[#161722]/95 backdrop-blur-xl border-t border-[#26283a] p-4 flex items-center justify-between gap-4 z-30">
        <div>
          <span className="text-[10px] text-gray-400 font-medium">Price per guest</span>
          <div className="text-lg font-black text-white">
            ₹{selectedEvent.price}
            <span className="text-[11px] font-normal text-gray-400"> / entry</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isApproved ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQrModal(true)}
                className="py-2.5 px-3 rounded-xl bg-[#232537] hover:bg-[#2b2e44] text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <QrCode className="w-4 h-4" />
                <span>Pass</span>
              </button>
              <button
                onClick={() => navigateTo('event_chat')}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5 hover:brightness-110 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Group Chat</span>
              </button>
            </div>
          ) : isPending ? (
            <button
              onClick={() => requestRSVP(selectedEvent.id)}
              className="py-3 px-5 rounded-2xl bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 font-semibold text-xs transition"
            >
              Pending Approval ⏳ (Tap to Cancel)
            </button>
          ) : (
            <button
              onClick={() => requestRSVP(selectedEvent.id)}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition"
            >
              Request to Join (RSVP)
            </button>
          )}
        </div>
      </div>

      {/* QR Ticket Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#181924] border border-purple-500/40 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20">
                Confirmed Entry Pass
              </span>
              <h3 className="text-sm font-extrabold text-white mt-1">{selectedEvent.title}</h3>
              <p className="text-[10px] text-gray-400">{selectedEvent.venue}</p>
            </div>

            {/* QR Visual */}
            <div className="p-4 bg-white rounded-2xl shadow-inner inline-block mx-auto">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=PLANORA_ENTRY_TOKEN_94026"
                alt="Entry QR"
                className="w-36 h-36"
              />
            </div>

            <div className="text-[11px] text-gray-300 font-mono">
              Guest: Aarav Mehta • Pass #PL-8831
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

