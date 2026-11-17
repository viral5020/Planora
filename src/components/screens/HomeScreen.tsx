import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { EventItem } from '../../types';
import {
  Bell,
  MapPin,
  Calendar,
  Clock,
  Users,
  Flame,
  ArrowRight,
  Compass,
  CheckCircle,
  Sparkles,
  Crown,
  Loader2
} from 'lucide-react';

const CATEGORIES = ['All', 'Nightlife', 'Food & Rooftops', 'Sports & Turf', 'Music & Mix'];

export const HomeScreen: React.FC = () => {
  const {
    events,
    eventsLoading,
    selectedCity,
    setSelectedCity,
    setSelectedEvent,
    navigateTo,
    requestRSVP,
    isHostVerified
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');

  // Only show approved/verified events on the main feed
  const approvedEvents = events.filter((e) => e.verificationStatus === 'approved' || !e.verificationStatus);

  const filteredEvents = activeCategory === 'All'
    ? approvedEvents
    : approvedEvents.filter((e) =>
        e.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0])
      );

  const spotlightEvent = approvedEvents[0];

  const handleOpenEvent = (event: EventItem) => {
    setSelectedEvent(event);
    navigateTo('event_detail');
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-5">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
            RADAR ACTIVE
          </span>
          <h2 className="text-xl font-black text-white mt-1">Happening in {selectedCity}</h2>
          <p className="text-xs text-gray-400">Curated gatherings and community socials tonight.</p>
        </div>

        {!isHostVerified && (
          <button
            onClick={() => navigateTo('become_host')}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition hover:scale-105"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Host (₹300)</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-semibold transition ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#1b1c28] text-gray-300 hover:text-white border border-[#282a3d]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {eventsLoading && (
        <div className="py-12 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
          <span>Syncing gatherings from Supabase...</span>
        </div>
      )}

      {/* Hero Spotlight Card */}
      {!eventsLoading && spotlightEvent && (
        <div
          onClick={() => handleOpenEvent(spotlightEvent)}
          className="relative rounded-3xl overflow-hidden border border-[#292b3d] bg-gradient-to-t from-black via-black/40 to-transparent cursor-pointer group shadow-2xl"
        >
          <img
            src={spotlightEvent.image}
            alt={spotlightEvent.title}
            className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-[#12131b]/60 to-transparent"></div>

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-600 text-white shadow-lg shadow-pink-600/30 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>Tonight's Spotlight</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#161722]/80 backdrop-blur-md text-purple-300 border border-purple-500/30 font-bold">
              {spotlightEvent.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 space-y-2">
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              {spotlightEvent.title}
            </h3>
            <p className="text-xs text-gray-300 line-clamp-1">{spotlightEvent.vibeDescription}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-3 text-xs text-gray-300 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{spotlightEvent.time}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>{spotlightEvent.attendingCount} attending</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-purple-400 font-mono">
                  ₹{spotlightEvent.price}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    requestRSVP(spotlightEvent.id);
                  }}
                  className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:brightness-110"
                >
                  {spotlightEvent.status === 'approved' ? 'Pass Ready' : spotlightEvent.status === 'pending' ? 'Pending' : 'Request RSVP'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Verified Events */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Curated Gatherings ({filteredEvents.length})
          </h3>
          <span className="text-[11px] text-purple-400 font-mono">Verified Only</span>
        </div>

        {filteredEvents.length === 0 && !eventsLoading ? (
          <div className="bg-[#181924] p-8 rounded-3xl border border-[#27293b] text-center space-y-2">
            <Compass className="w-8 h-8 text-gray-500 mx-auto" />
            <h4 className="text-sm font-bold text-white">No gatherings in this category yet.</h4>
            <p className="text-xs text-gray-400">
              Be the first verified host to publish a gathering!
            </p>
            <button
              onClick={() => navigateTo(isHostVerified ? 'create_step1_type' : 'become_host')}
              className="mt-2 py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition"
            >
              {isHostVerified ? 'Create Gathering' : 'Become a Host (₹300)'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => handleOpenEvent(evt)}
                className="bg-[#181924] rounded-3xl border border-[#27293b] overflow-hidden hover:border-purple-500/50 cursor-pointer transition flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#141520]/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
                        {evt.category}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md font-mono text-xs font-black text-purple-400">
                      ₹{evt.price}
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1.5">
                    <h4 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition line-clamp-1">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                      <span>{evt.venue}</span>
                    </p>
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {evt.vibeDescription}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0 flex items-center justify-between border-t border-[#232535] mt-2 pt-2 text-xs">
                  <span className="text-[10px] text-gray-400 font-mono">
                    🗓️ {evt.date} • {evt.time}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      requestRSVP(evt.id);
                    }}
                    className="py-1 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] shadow-sm transition"
                  >
                    {evt.status === 'approved' ? 'Attending' : evt.status === 'pending' ? 'Pending' : 'RSVP'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
