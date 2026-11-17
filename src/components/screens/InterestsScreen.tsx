import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

const INTERESTS_LIST = [
  { id: 'Nightlife & Clubs', icon: '🍸', desc: 'Clubs, lounges, late music' },
  { id: 'House Parties & Jam', icon: '🎸', desc: 'Acoustic sets, living room jams' },
  { id: 'Food & Rooftops', icon: '🥘', desc: 'Secret suppers, chef tastings' },
  { id: 'Gaming & Dice', icon: '🎲', desc: 'Board games, Catan, tournaments' },
  { id: 'Sports & Turf', icon: '⚽', desc: 'Late night turf football & badminton' },
  { id: 'Music & Mix', icon: '🎧', desc: 'Analog vinyl, deep house, indies' },
  { id: 'Roadtrips & Wild', icon: '🏕️', desc: 'Weekend treks, coastal drives' },
  { id: 'Film Clubs', icon: '🎬', desc: 'Indie screenings, foreign cinema' },
  { id: 'Coffee & Cafes', icon: '☕', desc: 'Pour-overs, cafe hops, cupping' },
  { id: 'Art Walks', icon: '🎨', desc: 'Gallery tours, ceramic pottery' }
];

export const InterestsScreen: React.FC = () => {
  const { navigateTo, goBack, selectedInterests, toggleInterest } = useApp();

  const minRequired = 3;
  const isReady = selectedInterests.length >= minRequired;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#13141a] text-white min-h-[700px]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goBack}
            className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
            Step 1 of 2
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">What are you into?</h2>
          <p className="text-xs text-gray-400">
            Select at least <span className="text-purple-400 font-semibold">{minRequired} interests</span> to personalize your vibe match & gathering recommendations.
          </p>
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-6 max-h-[420px] overflow-y-auto pr-1">
          {INTERESTS_LIST.map((item) => {
            const isSelected = selectedInterests.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleInterest(item.id)}
                type="button"
                className={`p-3 rounded-2xl text-left border transition relative flex flex-col justify-between h-[86px] ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-950/70 via-[#211a33] to-[#1a1b2a] border-purple-500/80 shadow-md shadow-purple-500/20'
                    : 'bg-[#181924] border-[#262838] hover:border-[#3a3d54] text-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xl">{item.icon}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{item.id}</h4>
                  <p className="text-[9px] text-gray-400 truncate mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="pt-4 pb-2">
        <button
          disabled={!isReady}
          onClick={() => navigateTo('onboarding_location')}
          className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
            isReady
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98]'
              : 'bg-[#212330] text-gray-500 cursor-not-allowed border border-[#2b2d3d]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Continue ({selectedInterests.length} Selected)</span>
        </button>
      </div>
    </div>
  );
};

