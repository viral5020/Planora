import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, MapPin, QrCode, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export const MyEventsScreen: React.FC = () => {
  const { events, navigateTo, setSelectedEvent } = useApp();
  const [tab, setTab] = useState<'attending' | 'saved' | 'past'>('attending');
  const [activeQrEvent, setActiveQrEvent] = useState<string | null>(null);

  const attendingEvents = events.filter((e) => e.status === 'approved');

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-4">
      {/* Header */}
      <div className="space-y-1 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
          YOUR TICKETS & PASSES
        </span>
        <h2 className="text-xl font-extrabold text-white">My Events</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#191b26] p-1 rounded-2xl border border-[#27293b] text-xs">
        <button
          onClick={() => setTab('attending')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            tab === 'attending' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          Attending ({attendingEvents.length})
        </button>
        <button
          onClick={() => setTab('saved')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            tab === 'saved' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          Saved (4)
        </button>
        <button
          onClick={() => setTab('past')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            tab === 'past' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          Past (12)
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3.5">
        {tab === 'attending' ? (
          attendingEvents.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-xs text-gray-400">No active event passes right now.</p>
              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
              >
                Browse Gatherings
              </button>
            </div>
          ) : (
            attendingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#181924] rounded-3xl border border-purple-500/30 overflow-hidden shadow-lg space-y-3 p-4"
              >
                <div className="flex gap-3">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Confirmed Guest
                    </span>
                    <h3 className="text-xs font-bold text-white line-clamp-1">{evt.title}</h3>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      <span>{evt.date} • {evt.time}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-pink-400" />
                      <span>{evt.venue}</span>
                    </p>
                  </div>
                </div>

                {/* Ticket Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#26283a]">
                  <button
                    onClick={() => setActiveQrEvent(evt.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#232537] hover:bg-[#2c2f44] text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR Pass</span>
                  </button>

                  <button
                    onClick={() => navigateTo('event_chat')}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30 transition hover:brightness-110"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Group Chat</span>
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="text-center py-10 text-xs text-gray-500">
            {tab === 'saved' ? '4 saved events in Surat' : '12 past gatherings attended with 4.9★ rating'}
          </div>
        )}
      </div>

      {/* QR Modal */}
      {activeQrEvent && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#181924] border border-purple-500/40 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white">Your Confirmed Entry Pass</h3>
            <div className="p-3 bg-white rounded-2xl inline-block mx-auto">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PASS_CONFIRMED_AARAV_MEHTA"
                alt="Ticket QR"
                className="w-32 h-32"
              />
            </div>
            <p className="text-[11px] text-gray-300 font-mono">ID: #PL-SURAT-2026 • Aarav Mehta</p>
            <button
              onClick={() => setActiveQrEvent(null)}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

