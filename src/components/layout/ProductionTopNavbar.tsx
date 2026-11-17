import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, MapPin, ChevronDown, LogIn, LogOut, ShieldAlert, Crown } from 'lucide-react';

export const ProductionTopNavbar: React.FC = () => {
  const {
    selectedCity,
    navigateTo,
    notifications,
    events,
    userId,
    userProfile,
    logout,
    isHostVerified,
    setSelectedEvent
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

        {/* Search Bar */}
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
              placeholder="Search gatherings, music, rooftops in Surat..."
              className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none pl-2.5 w-full"
            />
          </div>

          {/* Search Dropdown Results */}
          {showSearchResults && searchQuery.trim() && (
            <div
              className="absolute left-0 right-0 top-full mt-2 bg-[#171824] border border-[#292b3c] rounded-2xl shadow-2xl p-2 z-50 space-y-1 max-h-80 overflow-y-auto"
              onMouseLeave={() => setShowSearchResults(false)}
            >
              {searchResults.length > 0 ? (
                searchResults.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      setSelectedEvent(evt);
                      navigateTo('event_detail');
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#202230] cursor-pointer transition"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{evt.title}</h4>
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

        {/* Right Actions: Admin Link, City, Notifications & User Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Admin Console Button */}
          <button
            onClick={() => navigateTo('admin')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 border border-pink-500/30 text-pink-300 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm"
            title="Open Superadmin Console"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">/admin</span>
          </button>

          {/* Become Host Banner Pill if not verified */}
          {!isHostVerified && (
            <button
              onClick={() => navigateTo('become_host')}
              className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold transition"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Host (₹300)</span>
            </button>
          )}

          {/* Desktop City Switcher */}
          <button
            onClick={() => navigateTo('onboarding_location')}
            className="hidden md:flex items-center gap-1.5 bg-[#181924] hover:bg-[#202230] px-3 py-1.5 rounded-xl border border-[#27293b] text-xs transition"
          >
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold text-white">{selectedCity}</span>
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

          {/* User Profile Avatar or Sign In button */}
          {userId || userProfile ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#181924] transition group"
              >
                <img
                  src={userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={userProfile?.name || 'User'}
                  className="w-8 h-8 rounded-xl object-cover border border-purple-500/50 group-hover:border-purple-400 transition"
                />
                <span className="text-xs font-bold text-white hidden sm:inline max-w-[90px] truncate">
                  {userProfile?.name?.split(' ')[0] || 'Member'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div
                  onMouseLeave={() => setShowProfileMenu(false)}
                  className="absolute right-0 top-full mt-2 w-52 bg-[#181924] border border-[#2a2d3e] rounded-2xl shadow-2xl p-2 z-50 space-y-1"
                >
                  <div className="px-3 py-2 border-b border-[#242738]">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white truncate">{userProfile?.name || 'Member'}</p>
                      {isHostVerified && (
                        <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          HOST
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 truncate font-mono">{userProfile?.handle || '@member'}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigateTo('profile');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-gray-200 hover:bg-[#232537] hover:text-white transition"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigateTo('become_host');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-amber-300 hover:bg-amber-500/10 transition flex items-center justify-between"
                  >
                    <span>Become a Host</span>
                    <span className="text-[9px] font-bold bg-amber-500/20 px-1.5 py-0.5 rounded">₹300</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigateTo('admin');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-pink-300 hover:bg-pink-500/10 transition flex items-center gap-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin Panel (/admin)</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigateTo('settings_safety');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-gray-200 hover:bg-[#232537] hover:text-white transition"
                  >
                    Settings & Safety
                  </button>

                  <div className="pt-1 border-t border-[#242738]">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigateTo('auth_phone')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-purple-600/30 hover:brightness-110 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
