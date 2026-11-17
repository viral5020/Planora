import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, ShieldCheck, Star, Users, Calendar, Award, Share2, Sparkles } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-4">
      {/* Top Bar with Settings Icon */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
          MEMBER PROFILE
        </span>

        <button
          onClick={() => navigateTo('settings_safety')}
          className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
          title="Settings & Safety"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* User Hero Info */}
      <div className="bg-[#181924] p-4 rounded-3xl border border-[#27293b] text-center space-y-3 relative shadow-xl">
        <div className="relative inline-block mx-auto">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Aarav Mehta"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500 shadow-lg shadow-purple-500/30"
          />
          <div className="absolute bottom-0 right-0 p-1 rounded-full bg-purple-600 text-white border-2 border-[#181924]">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-base font-extrabold text-white">Aarav Mehta</h2>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
              PRO
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono">@aarav_surat • Vesu, Surat</p>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
          Architect & vinyl lover. Playing deep cuts on rotary mixers, exploring rooftop viewpoints & specialty coffee across Surat.
        </p>

        {/* Profile Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => alert('Profile editing modal')}
            className="flex-1 py-2 rounded-xl bg-[#232537] hover:bg-[#2b2e42] text-xs font-semibold text-gray-200 border border-[#2f3248] transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => alert('Vibe card shared to clipboard!')}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-semibold text-white shadow-md shadow-purple-600/30 transition flex items-center justify-center gap-1.5 hover:brightness-110"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Vibe Card</span>
          </button>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-3 gap-2 bg-[#181924] p-3 rounded-2xl border border-[#27293b] text-center">
        <div>
          <span className="text-base font-extrabold text-white font-mono">18</span>
          <p className="text-[10px] text-gray-400">Gatherings</p>
        </div>
        <div className="border-x border-[#282a3d]">
          <span className="text-base font-extrabold text-purple-400 font-mono">34</span>
          <p className="text-[10px] text-gray-400">Connections</p>
        </div>
        <div>
          <span className="text-base font-extrabold text-yellow-400 font-mono flex items-center justify-center gap-0.5">
            ★ 4.9
          </span>
          <p className="text-[10px] text-gray-400">Vibe Score</p>
        </div>
      </div>

      {/* Reputation Badges */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-pink-400" />
          <span>Reputation Badges</span>
        </h3>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#181924] p-2.5 rounded-2xl border border-[#27293b] text-center space-y-1">
            <span className="text-xl">👑</span>
            <h4 className="text-[10px] font-bold text-white">Top Host</h4>
            <p className="text-[9px] text-gray-400">95%+ 5-star ratings</p>
          </div>

          <div className="bg-[#181924] p-2.5 rounded-2xl border border-[#27293b] text-center space-y-1">
            <span className="text-xl">🛡️</span>
            <h4 className="text-[10px] font-bold text-white">Govt ID Verified</h4>
            <p className="text-[9px] text-gray-400">Aadhaar verified</p>
          </div>

          <div className="bg-[#181924] p-2.5 rounded-2xl border border-[#27293b] text-center space-y-1">
            <span className="text-xl">⚓</span>
            <h4 className="text-[10px] font-bold text-white">Anchor</h4>
            <p className="text-[9px] text-gray-400">Surat Vinyl Circle</p>
          </div>
        </div>
      </div>

      {/* Attended Gatherings Showcase */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider">Attended Gatherings</h3>
          <span className="text-purple-400 font-mono text-[11px] cursor-pointer" onClick={() => navigateTo('my_events')}>
            View All
          </span>
        </div>

        <div className="space-y-2">
          <div className="bg-[#181924] p-2.5 rounded-2xl border border-[#27293b] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎧</span>
              <div>
                <h4 className="font-bold text-white text-[11px]">Surat Vinyl Circle Session #17</h4>
                <p className="text-[10px] text-gray-400">Amber Lounge, Dumas Road</p>
              </div>
            </div>
            <span className="text-[10px] text-green-400 font-mono">Attended</span>
          </div>

          <div className="bg-[#181924] p-2.5 rounded-2xl border border-[#27293b] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">☕</span>
              <div>
                <h4 className="font-bold text-white text-[11px]">Sunday Pour-Over Masterclass</h4>
                <p className="text-[10px] text-gray-400">The Bean Lab, Piplod</p>
              </div>
            </div>
            <span className="text-[10px] text-green-400 font-mono">Attended</span>
          </div>
        </div>
      </div>
    </div>
  );
};

