import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Users, Search, Plus } from 'lucide-react';

export const InboxScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'circles' | 'dms'>('all');

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
            MESSAGING & CIRCLES
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">Inbox</h2>
        </div>

        <button
          onClick={() => alert('Search messages')}
          className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#191b26] p-1 rounded-2xl border border-[#27293b] text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            activeTab === 'all' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('circles')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            activeTab === 'circles' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          Event Circles
        </button>
        <button
          onClick={() => setActiveTab('dms')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            activeTab === 'dms' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          DMs (Direct)
        </button>
      </div>

      {/* Threads List */}
      <div className="space-y-2.5">
        {/* Event Group Chat Thread 1 */}
        {(activeTab === 'all' || activeTab === 'circles') && (
          <div
            onClick={() => navigateTo('event_chat')}
            className="bg-[#181924] hover:bg-[#1e202f] p-3 rounded-2xl border border-purple-500/30 flex items-center justify-between cursor-pointer transition shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#181924] rounded-[14px] flex items-center justify-center text-purple-300 font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#181924]"></span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">Midnight Vinyl & Tapas</h4>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-300 font-mono">
                    Event Chat
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  <span className="text-purple-300 font-semibold">Aakash (Host):</span> Welcome everyone! Rotary mixer is warmed up...
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-mono">7:42 PM</span>
              <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center ml-auto mt-1">
                3
              </div>
            </div>
          </div>
        )}

        {/* Event Group Chat Thread 2 */}
        {(activeTab === 'all' || activeTab === 'circles') && (
          <div
            onClick={() => navigateTo('event_chat')}
            className="bg-[#181924] hover:bg-[#1e202f] p-3 rounded-2xl border border-[#27293b] flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#232535] flex items-center justify-center text-gray-300">
                <Users className="w-5 h-5 text-gray-400" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white">Surat Turf Football League</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  Arjun: We need 2 more players for the 7v7 slot!
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-mono">Yesterday</span>
            </div>
          </div>
        )}

        {/* DM Thread 1 */}
        {(activeTab === 'all' || activeTab === 'dms') && (
          <div
            onClick={() => navigateTo('event_chat')}
            className="bg-[#181924] hover:bg-[#1e202f] p-3 rounded-2xl border border-[#27293b] flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                alt="Devika"
                className="w-12 h-12 rounded-full object-cover border border-[#2e3146]"
              />
              <div>
                <h4 className="text-xs font-bold text-white">Devika Shah</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  Are you bringing any Japanese jazz records tonight?
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-mono">1h ago</span>
            </div>
          </div>
        )}

        {/* DM Thread 2 */}
        {(activeTab === 'all' || activeTab === 'dms') && (
          <div
            onClick={() => navigateTo('event_chat')}
            className="bg-[#181924] hover:bg-[#1e202f] p-3 rounded-2xl border border-[#27293b] flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Aakash"
                className="w-12 h-12 rounded-full object-cover border border-[#2e3146]"
              />
              <div>
                <h4 className="text-xs font-bold text-white">Aakash Verma (Host)</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  Your VIP rooftop spot is reserved. See you at 8!
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-mono">3h ago</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigateTo('people')}
        className="w-full py-3 rounded-2xl bg-[#1d1f2d] hover:bg-[#25273a] border border-[#2d3046] text-purple-300 font-semibold text-xs transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4 text-purple-400" />
        <span>Start New Message with Locals</span>
      </button>
    </div>
  );
};

