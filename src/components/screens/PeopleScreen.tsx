import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageCircle, MapPin, Check, Heart } from 'lucide-react';

export const PeopleScreen: React.FC = () => {
  const { people, selectedCity, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'shared' | 'near' | 'new'>('shared');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const handleConnect = (id: string) => {
    setConnectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 space-y-4">
      {/* Top Header */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
            Vibe Matching
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-white">Discover People in {selectedCity}!</h2>
        <p className="text-xs text-gray-400">
          Connect with locals who share your taste in music, food, sports, and nighttime plans.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-[#191b26] p-1 rounded-2xl border border-[#27293b] text-xs">
        <button
          onClick={() => setActiveTab('shared')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            activeTab === 'shared' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          Shared Vibes
        </button>
        <button
          onClick={() => setActiveTab('near')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            activeTab === 'near' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          Near You
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-1.5 rounded-xl font-semibold transition ${
            activeTab === 'new' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          New in Town
        </button>
      </div>

      {/* People Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {people.map((person) => {
          const isConnected = connectedIds.includes(person.id);
          return (
            <div
              key={person.id}
              className="bg-[#181924] p-4 rounded-3xl border border-[#26283b] space-y-3 hover:border-purple-500/40 transition"
            >
              {/* Profile Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/70"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#181924]"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">{person.name}, {person.age}</h4>
                    </div>
                    <p className="text-[11px] text-gray-400">{person.profession}</p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-purple-400" />
                      <span>{person.location}</span>
                    </p>
                  </div>
                </div>

                {/* Vibe Match Badge */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-500/40 text-[11px] font-extrabold text-pink-300">
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    <span>{person.vibeMatch}% Match</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[11px] text-gray-300 leading-relaxed bg-[#14151e] p-2.5 rounded-xl border border-[#222433]">
                "{person.bio}"
              </p>

              {/* Interests Chips */}
              <div className="flex flex-wrap gap-1.5">
                {person.interests.map((int) => (
                  <span
                    key={int}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-[#202230] text-purple-300 border border-[#2d3044]"
                  >
                    {int}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleConnect(person.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                    isConnected
                      ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-md shadow-purple-600/20'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Connection Sent</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Connect / Say Hi</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigateTo('inbox')}
                  className="p-2.5 rounded-xl bg-[#202230] hover:bg-[#282a3c] border border-[#2c2f42] text-gray-300 hover:text-white transition"
                  title="Send Direct Message"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

