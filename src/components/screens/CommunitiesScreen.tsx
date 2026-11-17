import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { CommunityItem } from '../../types';
import { Users, Star, ArrowRight, PlusCircle, Compass } from 'lucide-react';

const COMM_FILTERS = ['All Circles', 'Music & Arts', 'Sports & Turf', 'Food & Rooftops', 'Tech & Networking'];

export const CommunitiesScreen: React.FC = () => {
  const { communities, setSelectedCommunity, navigateTo, selectedCity } = useApp();
  const [filter, setFilter] = useState('All Circles');

  const filtered = filter === 'All Circles'
    ? communities
    : communities.filter((c) => c.category.toLowerCase().includes(filter.toLowerCase().split(' ')[0]));

  const handleOpenCommunity = (comm: CommunityItem) => {
    setSelectedCommunity(comm);
    navigateTo('community_detail');
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-4">
      {/* Header */}
      <div className="space-y-1 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
          Persistent City Hubs
        </span>
        <h2 className="text-xl font-extrabold text-white">{selectedCity} Communities</h2>
        <p className="text-xs text-gray-400">
          Places to build recurring weekly bonds with passionate locals.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {COMM_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-semibold transition ${
              filter === f
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#1b1c28] text-gray-300 hover:text-white border border-[#282a3d]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Communities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((comm) => (
          <div
            key={comm.id}
            onClick={() => handleOpenCommunity(comm)}
            className="group bg-[#181924] hover:bg-[#1e202f] rounded-3xl border border-[#27293b] overflow-hidden cursor-pointer transition shadow-lg"
          >
            {/* Banner image */}
            <div className="relative h-32 w-full overflow-hidden">
              <img
                src={comm.image}
                alt={comm.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181924] via-black/40 to-transparent"></div>

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-600/90 text-white backdrop-blur-md">
                  {comm.category}
                </span>
              </div>

              <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[10px]">
                  <Users className="w-3 h-3 text-purple-400" />
                  <span className="font-semibold text-white">{comm.membersCount} Members</span>
                </div>
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[10px]">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-white">{comm.rating}</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                {comm.name}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                {comm.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {comm.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-purple-400 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#252838] text-xs">
                <span className="text-[10px] text-gray-400">
                  {comm.gatheringsCount} gatherings hosted so far
                </span>
                <span className="font-semibold text-purple-400 flex items-center gap-1">
                  Explore Circle <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Circle Banner */}
      <div
        onClick={() => navigateTo('create_step1_type')}
        className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 flex items-center justify-between cursor-pointer hover:border-purple-400 transition"
      >
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-white">Start Your Own Circle in {selectedCity}</h4>
          <p className="text-[10px] text-gray-400">Build regular meetups for books, photography, or running.</p>
        </div>
        <PlusCircle className="w-6 h-6 text-purple-400 shrink-0" />
      </div>
    </div>
  );
};
