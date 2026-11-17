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
  Map
} from 'lucide-react';

const CATEGORIES = ['All', 'Nightlife', 'House Parties', 'Food & Rooftops', 'Sports & Turf', 'Music & Mix', 'Coffee & Cafes'];

export const HomeScreen: React.FC = () => {
  const {
    events,
    selectedCity,
    setSelectedCity,
    setSelectedEvent,
    navigateTo,
    requestRSVP,
    notifications
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [showHeatMapModal, setShowHeatMapModal] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const filteredEvents = activeCategory === 'All'
    ? events
    : events.filter((e) => e.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]));

  const tonightEvent = events.find((e) => e.id === 'rooftop-sunset-beats') || events[0];

  const handleOpenEvent = (event: EventItem) => {
    setSelectedEvent(event);
    navigateTo('event_detail');
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-5">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-purple-500/30">
            P
          </div>
          <div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="font-extrabold text-sm tracking-wide text-white">PLANORA</span>
              <span className="text-gray-500">•</span>
              <button
                onClick={() => navigateTo('onboarding_location')}
                className="text-xs font-semibold text-purple-400 flex items-center gap-0.5 hover:underline"
              >
                <MapPin className="w-3 h-3 text-purple-400" />
                <span>{selectedCity}</span>
              </button>
            </div>
            <p className="text-[10px] text-gray-400">Discover tonight's curated gatherings</p>
          </div>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => navigateTo('notifications')}
          className="relative w-9 h-9 rounded-full bg-[#1b1d29] border border-[#292c3f] flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifs > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-[#13141a]"></span>
          )}
        </button>
      </div>

      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-[#191b26] p-4 rounded-3xl border border-purple-500/20 relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-400" /> Curated Community Socials
          </span>
          <h2 className="text-base font-extrabold text-white">Good plans start with good people.</h2>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            Real gatherings with verified guest lists and host approval in {selectedCity}.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-medium text-xs ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-[#1b1c28] text-gray-300 hover:text-white border border-[#272a3b]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Section 1: Happening Tonight */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-pink-500 fill-pink-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Happening Tonight</h3>
          </div>
          <span className="text-[11px] text-purple-400 font-semibold font-mono">Surat Nightlife</span>
        </div>

        {/* Featured Big Card */}
        <div
          onClick={() => handleOpenEvent(tonightEvent)}
          className="group relative rounded-3xl overflow-hidden border border-[#2a2c3d] bg-[#181924] shadow-lg cursor-pointer transform hover:-translate-y-1 transition duration-200"
        >
          <div className="relative h-44 w-full overflow-hidden">
            <img
              src={tonightEvent.image}
              alt={tonightEvent.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13141a] via-[#13141a]/40 to-transparent"></div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-500/90 text-white backdrop-blur-md shadow">
                TONIGHT • 6:30 PM
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 text-white backdrop-blur-md border border-white/10">
                {tonightEvent.category}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-purple-600/90 text-white backdrop-blur-md">
                ₹{tonightEvent.price}
              </span>
            </div>

            {/* Card Content Overlay */}
            <div className="absolute bottom-3 left-3 right-3 space-y-1">
              <h4 className="text-base font-extrabold text-white leading-snug drop-shadow-md">
                {tonightEvent.title}
              </h4>
              <p className="text-[11px] text-gray-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                <span className="truncate">{tonightEvent.venue}</span>
              </p>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between bg-[#191a26] border-t border-[#26283a]">
            <div className="flex items-center gap-2">
              <img
                src={tonightEvent.host.avatar}
                alt={tonightEvent.host.name}
                className="w-6 h-6 rounded-full border border-purple-400 object-cover"
              />
              <span className="text-[11px] text-gray-300">
                Hosted by <span className="font-semibold text-white">{tonightEvent.host.name}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono">
                {tonightEvent.attendingCount}/{tonightEvent.totalCapacity} spots
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  requestRSVP(tonightEvent.id);
                }}
                className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition ${
                  tonightEvent.status === 'approved'
                    ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {tonightEvent.status === 'approved' ? 'Attending ✓' : 'Join Tonight'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: This Weekend & More */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">This Weekend in Surat</h3>
          </div>
          <span className="text-[11px] text-gray-400 font-mono">{filteredEvents.length} events</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => handleOpenEvent(evt)}
              className="bg-[#181924] hover:bg-[#1e202f] p-3 rounded-2xl border border-[#27293b] flex gap-3 cursor-pointer transition"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
                  ₹{evt.price}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wide">
                      {evt.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{evt.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{evt.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{evt.venue}</p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span>{evt.attendingCount} attending</span>
                  </div>

                  <span className="text-[11px] font-semibold text-purple-400 group-hover:translate-x-1 transition flex items-center gap-0.5">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Circle Teaser */}
      <div
        onClick={() => navigateTo('communities')}
        className="bg-gradient-to-r from-purple-950/60 to-[#1b1c2b] p-4 rounded-2xl border border-purple-500/30 flex items-center justify-between cursor-pointer hover:border-purple-400 transition"
      >
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">
            Communities
          </span>
          <h4 className="text-xs font-bold text-white">Surat Vinyl, Foodies & Football Circles</h4>
          <p className="text-[10px] text-gray-400">Join regular recurring local social circles.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Sticky Bottom Heatmap Trigger */}
      <div className="pt-2">
        <button
          onClick={() => setShowHeatMapModal(true)}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#1d1f2d] hover:bg-[#25273a] border border-purple-500/40 text-purple-300 font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Map className="w-4 h-4 text-purple-400" />
          <span>Explore Surat Live Gathering Heat Map</span>
        </button>
      </div>

      {/* Live Heat Map Modal */}
      {showHeatMapModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#181924] border border-[#2e3146] rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">Surat Live Activity Heat Map</h3>
                <p className="text-[11px] text-gray-400">High density gathering spots right now</p>
              </div>
              <button
                onClick={() => setShowHeatMapModal(false)}
                className="text-gray-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Stylized Dark Radar Map Simulation */}
            <div className="h-52 w-full bg-[#101117] rounded-2xl border border-[#25283a] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#25283a_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

              {/* Heat map pulse dots */}
              <div className="absolute top-12 left-16 flex flex-col items-center">
                <span className="w-5 h-5 rounded-full bg-pink-500/40 animate-ping absolute"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-pink-500 border border-white"></span>
                <span className="text-[9px] font-bold text-white bg-black/80 px-1 rounded mt-1">Vesu (32)</span>
              </div>

              <div className="absolute bottom-14 right-14 flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-purple-500/40 animate-ping absolute"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-purple-500 border border-white"></span>
                <span className="text-[9px] font-bold text-white bg-black/80 px-1 rounded mt-1">Dumas (24)</span>
              </div>

              <div className="absolute top-20 right-24 flex flex-col items-center">
                <span className="w-4 h-4 rounded-full bg-indigo-500/40 animate-ping absolute"></span>
                <span className="w-3 h-3 rounded-full bg-indigo-500 border border-white"></span>
                <span className="text-[9px] font-bold text-white bg-black/80 px-1 rounded mt-1">Piplod (18)</span>
              </div>

              <div className="text-center text-[10px] text-gray-500">
                Surat Municipal Area • 74 Active Guests
              </div>
            </div>

            <button
              onClick={() => setShowHeatMapModal(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs"
            >
              Close Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
