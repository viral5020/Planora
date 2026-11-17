import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, MapPin, Navigation, CheckCircle2, Search } from 'lucide-react';

const CITIES = [
  {
    name: 'Surat',
    state: 'Gujarat',
    gatheringsCount: 89,
    status: 'Active',
    featuredTag: 'Featured Hub',
    description: 'Vesu, Adajan, Dumas & Piplod active scenes'
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    gatheringsCount: 142,
    status: 'Active',
    description: 'Bandra, Lower Parel & Juhu circles'
  },
  {
    name: 'Ahmedabad',
    state: 'Gujarat',
    gatheringsCount: 56,
    status: 'Active',
    description: 'Sindhu Bhavan & Bodakdev circles'
  },
  {
    name: 'Vadodara',
    state: 'Gujarat',
    gatheringsCount: 28,
    status: 'Active',
    description: 'Alkapuri & Sevasi circles'
  }
];

export const LocationScreen: React.FC = () => {
  const { navigateTo, goBack, selectedCity, setSelectedCity } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#13141a] text-white min-h-[700px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goBack}
            className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
            Step 2 of 2
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">Where's your scene?</h2>
          <p className="text-xs text-gray-400">
            Choose your city to unlock neighborhood circles, rooftop events, and local vibe-matches.
          </p>
        </div>

        {/* Radar Pulse Visual */}
        <div className="my-5 flex flex-col items-center justify-center relative py-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-full border border-purple-500/20 radar-pulse"></div>
            <div className="absolute w-24 h-24 rounded-full border border-purple-500/40"></div>
            <div className="absolute w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/60 flex items-center justify-center"></div>

            {/* Center Beacon */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 z-10 animate-bounce">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-[11px] text-gray-400 mt-2 font-medium">Scanning local radius in {selectedCity}</span>
        </div>

        {/* Use Current Location Button */}
        <button
          onClick={() => setSelectedCity('Surat')}
          className="w-full py-2.5 px-4 rounded-xl bg-[#1b1d2b] hover:bg-[#232638] border border-[#2d3047] text-xs font-semibold text-purple-300 transition flex items-center justify-center gap-2 mb-4"
        >
          <Navigation className="w-3.5 h-3.5 text-purple-400" />
          <span>Use Current Location (GPS)</span>
        </button>

        {/* City Options List */}
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {CITIES.map((city) => {
            const isSelected = selectedCity === city.name;
            return (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city.name)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-950/70 to-[#1f2030] border-purple-500/80 shadow-md shadow-purple-500/20'
                    : 'bg-[#181924] border-[#252737] hover:border-[#35384e] text-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{city.name}</h4>
                    {city.featuredTag && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {city.featuredTag}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{city.description}</p>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-[10px] font-mono text-gray-400">{city.gatheringsCount} plans</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explore City CTA */}
      <div className="pt-4 pb-2">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>Explore {selectedCity}</span>
        </button>
      </div>
    </div>
  );
};

