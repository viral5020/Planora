import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Users, Star, Calendar, PlusCircle, Check, Share2 } from 'lucide-react';

export const CommunityDetailScreen: React.FC = () => {
  const { selectedCommunity, goBack, navigateTo, setSelectedEvent, events } = useApp();
  const [isJoined, setIsJoined] = useState(false);

  const relatedEvent = events.find((e) => e.id === 'midnight-vinyl') || events[0];

  return (
    <div className="flex-1 bg-[#13141a] text-white flex flex-col justify-between">
      <div>
        {/* Banner with Back Button */}
        <div className="relative h-56 w-full">
          <img
            src={selectedCommunity.image}
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
          <div className="grid grid-cols-3 gap-2 bg-[#181924] p-3 rounded-2xl border border-[#27293b] text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-purple-400">
                <Users className="w-3.5 h-3.5" />
                <span className="font-extrabold text-sm text-white">{selectedCommunity.membersCount}</span>
              </div>
              <span className="text-[10px] text-gray-400">Members</span>
            </div>
            <div className="border-x border-[#282a3d]">
              <div className="flex items-center justify-center gap-1 text-pink-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-extrabold text-sm text-white">{selectedCommunity.gatheringsCount}</span>
              </div>
              <span className="text-[10px] text-gray-400">Gatherings</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span className="font-extrabold text-sm text-white">{selectedCommunity.rating}</span>
              </div>
              <span className="text-[10px] text-gray-400">Community Score</span>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">About The Circle</h3>
            <p className="text-xs text-gray-300 leading-relaxed bg-[#181924] p-3.5 rounded-2xl border border-[#27293b]">
              {selectedCommunity.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedCommunity.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-lg text-[10px] bg-[#1f202e] text-purple-300 border border-[#2e3146]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Gatherings in Circle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider">Upcoming Gatherings</h3>
              <span className="text-purple-400 font-mono text-[11px]">2 Scheduled</span>
            </div>

            <div
              onClick={() => {
                setSelectedEvent(relatedEvent);
                navigateTo('event_detail');
              }}
              className="bg-[#181924] hover:bg-[#1e202f] p-3 rounded-2xl border border-[#27293b] flex gap-3 cursor-pointer transition"
            >
              <img
                src={relatedEvent.image}
                alt="gathering"
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{relatedEvent.title}</h4>
                  <p className="text-[10px] text-gray-400">{relatedEvent.date} • {relatedEvent.venue}</p>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-purple-400">₹{relatedEvent.price} / spot</span>
                  <span className="text-gray-400 font-mono">{relatedEvent.attendingCount} attending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Members in Circle */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Members</h3>
            <div className="flex items-center gap-2 bg-[#181924] p-3 rounded-2xl border border-[#27293b]">
              <div className="flex -space-x-2">
                {selectedCommunity.members.map((m, i) => (
                  <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    className="w-8 h-8 rounded-full border-2 border-[#181924] object-cover"
                    title={m.name}
                  />
                ))}
              </div>
              <p className="text-[10px] text-gray-400 pl-2">
                Aarav, Devika, Kavit and {selectedCommunity.membersCount - 4} others active in Surat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 bg-[#161722]/95 backdrop-blur-xl border-t border-[#26283a] p-4 flex items-center gap-3 z-30">
        <button
          onClick={() => setIsJoined(!isJoined)}
          className={`flex-1 py-3 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
            isJoined
              ? 'bg-green-600/20 text-green-300 border border-green-500/40'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
          }`}
        >
          {isJoined ? (
            <>
              <Check className="w-4 h-4" />
              <span>Joined Circle ✓</span>
            </>
          ) : (
            <span>Join Community Circle</span>
          )}
        </button>

        <button
          onClick={() => navigateTo('create_step1_type')}
          className="p-3 rounded-2xl bg-[#202230] hover:bg-[#292b3c] border border-[#2e3144] text-purple-300"
          title="Host a gathering in this circle"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

