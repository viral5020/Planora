import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, MapPin, Sparkles, SlidersHorizontal, ChevronDown } from 'lucide-react';

export const ProductionTopNavbar: React.FC = () => {
  const { selectedCity, navigateTo, notifications, events, setSelectedEvent } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const searchResults = searchQuery.trim()
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.venue.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#12131b]/95 backdrop-blur-xl border-b border-[#20222e] px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Mobile Brand (visible only when desktop sidebar is hidden) */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <div
            onClick={() => navigateTo('home')}
            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 p-0.5 shadow-md shadow-purple-500/30 flex items-center justify-center cursor-pointer"
          >
            <div className="w-full h-full bg-[#161722] rounded-[10px] flex items-center justify-center font-extrabold text-xs text-white">
              P
            </div>
          </div>

          <div
            onClick={() => navigateTo('onboarding_location')}
            className="flex items-center gap-1 cursor-pointer bg-[#181924] px-2.5 py-1 rounded-xl border border-[#27293b]"
          >
            <MapPin className="w-3 h-3 text-purple-400" />
            <span className="text-xs font-bold text-white">{selectedCity}</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </div>
        </div>

        {/* Search Bar (Full on Desktop, icon/expandable on mobile) */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative flex items-center bg-[#171822] border border-[#27293b] rounded-2xl px-3.5 py-2 focus-within:border-purple-500/80 focus-within:ring-1 focus-within:ring-purple-500/50 transition">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search rooftop sessions, vinyl circles, foodies, badminton in Surat..."
              className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none px-2.5 flex-1 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="text-gray-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            )}
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-[#202230] rounded border border-[#2d3044]">
              ⌘K
            </kbd>
          </div>

          {/* Live Search Results Dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#181924] border border-[#2d3044] rounded-2xl shadow-2xl p-2 z-50 max-h-72 overflow-y-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 py-1 block">
                Matching Gatherings & Circles
              </span>
              {searchResults.length > 0 ? (
                searchResults.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      setSelectedEvent(evt);
                      navigateTo('event_detail');
                      setShowSearchResults(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-[#202232] cursor-pointer flex items-center gap-3 transition"
                  >
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 truncate">
                      <h4 className="text-xs font-bold text-white truncate">{evt.title}</h4>
                      <p className="text-[10px] text-gray-400 truncate">
                        {evt.category} • {evt.venue}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-400 font-mono">
                      ₹{evt.price}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-gray-500">
                  No gatherings found for "{searchQuery}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions: City, Notifications & User Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Desktop City Switcher */}
          <button
            onClick={() => navigateTo('onboarding_location')}
            className="hidden md:flex items-center gap-1.5 bg-[#181924] hover:bg-[#202230] px-3 py-1.5 rounded-xl border border-[#27293b] text-xs transition"
          >
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold text-white">{selectedCity}</span>
            <span className="text-[10px] text-green-400 font-mono font-semibold">• 89 Active</span>
          </button>

          {/* Notifications Bell with Badge */}
          <button
            onClick={() => navigateTo('notifications')}
            className="relative w-9 h-9 rounded-xl bg-[#181924] hover:bg-[#202230] border border-[#27293b] flex items-center justify-center text-gray-300 hover:text-white transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#12131b]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => navigateTo('profile')}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#181924] transition group"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="User"
              className="w-8 h-8 rounded-xl object-cover border border-purple-500/50 group-hover:border-purple-400 transition"
            />
            <span className="text-xs font-bold text-white hidden sm:inline">Aarav</span>
          </button>
        </div>
      </div>
    </header>
  );
};

