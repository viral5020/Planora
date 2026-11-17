import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Users, Star, Calendar, PlusCircle, Check, Share2, Compass } from 'lucide-react';

export const CommunityDetailScreen: React.FC = () => {
  const { selectedCommunity, goBack, navigateTo, setSelectedEvent, events } = useApp();
  const [isJoined, setIsJoined] = useState(false);

  if (!selectedCommunity) {
    return (
      <div className="flex-1 bg-[#13141a] text-white p-6 flex flex-col items-center justify-center text-center space-y-3">
        <Compass className="w-8 h-8 text-purple-400" />
        <h3 className="text-base font-bold">No community selected</h3>
        <button
          onClick={() => navigateTo('communities')}
          className="py-2 px-4 rounded-xl bg-purple-600 text-xs font-semibold text-white"
        >
          Explore Communities
        </button>
      </div>
    );
  }

  const relatedEvent = events && events.length > 0 ? events[0] : null;

  return (
    <div className="flex-1 bg-[#13141a] text-white flex flex-col justify-between">
      <div>
        {/* Banner with Back Button */}
        <div className="relative h-56 w-full">
          <img
            src={selectedCommunity.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'}
            alt={selectedCommunity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13141a] via-[#13141a]/60 to-transparent"></div>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert('Community share link copied!')}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-600/90 text-white backdrop-blur-md">
              {selectedCommunity.category}
            </span>
            <h1 className="text-xl font-extrabold text-white leading-tight drop-shadow-md">
              {selectedCommunity.name}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-5">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b]">
              <div className="flex items-center justify-center gap-1 text-purple-400">
                <Users className="w-3.5 h-3.5" />
                <span className="text-sm font-extrabold text-white">{selectedCommunity.membersCount}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono">Members</p>
            </div>

            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b]">
              <div className="flex items-center justify-center gap-1 text-pink-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-sm font-extrabold text-white">{selectedCommunity.gatheringsCount}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono">Gatherings</p>
            </div>

            <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b]">
              <div className="flex items-center justify-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-extrabold text-white">{selectedCommunity.rating}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono">Vibe Score</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">About the Circle</h3>
            <p className="text-xs text-gray-300 leading-relaxed bg-[#181924] p-3.5 rounded-2xl border border-[#27293b]">
              {selectedCommunity.description}
            </p>
          </div>

          {/* Tags */}
          {selectedCommunity.tags && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">Vibe Focus</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedCommunity.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-semibold bg-[#181924] border border-[#2d2f44] text-gray-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Gatherings by this Circle */}
          {relatedEvent && (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Next Gathering by Circle
                </h3>
              </div>

              <div
                onClick={() => {
                  setSelectedEvent(relatedEvent);
                  navigateTo('event_detail');
                }}
                className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] flex items-center justify-between cursor-pointer hover:border-purple-500/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={relatedEvent.image}
                    alt={relatedEvent.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition">
                      {relatedEvent.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono">
                      {relatedEvent.date} • {relatedEvent.venue}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-purple-400 font-mono">₹{relatedEvent.price}</span>
                  <p className="text-[9px] text-gray-400">View</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Join Action Bar */}
      <div className="sticky bottom-0 bg-[#141520]/95 backdrop-blur-xl border-t border-[#232535] p-4 flex gap-3 mt-6">
        <button
          onClick={() => setIsJoined(!isJoined)}
          className={`flex-1 py-3.5 rounded-2xl font-bold text-xs transition shadow-lg flex items-center justify-center gap-2 ${
            isJoined
              ? 'bg-green-600 text-white shadow-green-600/30'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-600/30 hover:brightness-110'
          }`}
        >
          {isJoined ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Joined Circle</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Join Circle Community</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
