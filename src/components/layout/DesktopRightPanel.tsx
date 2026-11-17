import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, MapPin, Users, ArrowRight } from 'lucide-react';

export const DesktopRightPanel: React.FC = () => {
  const { events, navigateTo, setSelectedEvent } = useApp();

  const featuredEvent = events && events.length > 0 ? events[0] : null;

  return (
    <aside className="w-80 bg-[#12131b] border-l border-[#20222e] p-4 shrink-0 h-screen sticky top-0 overflow-y-auto hidden xl:block space-y-5">
      {/* City Radar Status */}
      <div className="bg-gradient-to-br from-purple-950/40 to-[#191a26] p-4 rounded-3xl border border-purple-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">
              Surat Live Radar
            </span>
          </div>
          <span className="text-[10px] font-mono text-purple-300">89 Active</span>
        </div>

        {/* Mini Map radar visualization */}
        <div className="h-28 w-full bg-[#101117] rounded-2xl border border-[#25283a] relative overflow-hidden flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-[radial-gradient(#26293d_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>

          {/* Vesu node */}
          <div className="absolute top-4 left-6 flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
            <span className="text-[9px] font-bold text-gray-300">Vesu (32)</span>
          </div>

          {/* Dumas node */}
          <div className="absolute bottom-5 right-8 flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-[9px] font-bold text-gray-300">Dumas (24)</span>
          </div>

          {/* Center scan line */}
          <div className="w-16 h-16 rounded-full border border-purple-500/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/60"></div>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 leading-snug">
          Vesu terrace lounges and Dumas coastal cafes have the highest guest density tonight.
        </p>
      </div>

      {/* Quick Spotlight Card */}
      {featuredEvent ? (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-pink-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Spotlight Event</h4>
            </div>
            <span className="text-[10px] font-bold text-purple-400">Featured</span>
          </div>

          <div
            onClick={() => {
              setSelectedEvent(featuredEvent);
              navigateTo('event_detail');
            }}
            className="bg-[#181924] hover:bg-[#1e202f] p-3 rounded-2xl border border-[#27293b] cursor-pointer transition space-y-2.5 group"
          >
            <div className="relative h-28 w-full rounded-xl overflow-hidden">
              <img
                src={featuredEvent.image || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80'}
                alt={featuredEvent.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[9px] font-bold text-white">
                {featuredEvent.date || 'Upcoming'}
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-purple-600 text-[10px] font-bold text-white">
                ₹{featuredEvent.price}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white line-clamp-1 group-hover:text-purple-300 transition">
                {featuredEvent.title}
              </h5>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">{featuredEvent.venue}</p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#25283a] text-[10px]">
              <span className="text-gray-400">{featuredEvent.attendingCount} attending</span>
              <span className="text-purple-400 font-bold flex items-center gap-1">
                View Pass <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#181924] p-4 rounded-2xl border border-[#27293b] text-center space-y-2">
          <Flame className="w-6 h-6 text-purple-400 mx-auto" />
          <p className="text-xs font-semibold text-white">Explore Gathering Vibes</p>
          <p className="text-[10px] text-gray-400">Join real-world socials happening in Surat.</p>
        </div>
      )}

      {/* Top Curators Mini Widget */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top Surat Curators</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-[#171822] p-2.5 rounded-xl border border-[#242636]">
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Curator"
                className="w-8 h-8 rounded-full object-cover border border-purple-500/50"
              />
              <div>
                <p className="text-xs font-bold text-white">Devika Shah</p>
                <p className="text-[10px] text-gray-400">Analog & Vinyl</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-purple-400 font-bold">4.9 ★</span>
          </div>

          <div className="flex items-center justify-between bg-[#171822] p-2.5 rounded-xl border border-[#242636]">
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="Curator"
                className="w-8 h-8 rounded-full object-cover border border-pink-500/50"
              />
              <div>
                <p className="text-xs font-bold text-white">Arjun Parekh</p>
                <p className="text-[10px] text-gray-400">Coffee & Tech</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-purple-400 font-bold">4.8 ★</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
