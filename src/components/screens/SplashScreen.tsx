import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between items-center p-6 text-center bg-gradient-to-b from-[#181924] via-[#12131b] to-[#0d0e14] min-h-[700px] relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top subtle tag */}
      <div className="pt-8">
        <span className="text-[11px] uppercase tracking-widest text-purple-400 font-semibold px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20">
          Stitch Interactive Design
        </span>
      </div>

      {/* Center Logo & Brand */}
      <div className="flex flex-col items-center gap-5 z-10">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 p-0.5 shadow-2xl shadow-purple-500/40 transform hover:scale-105 transition duration-300">
          <div className="w-full h-full bg-[#161722] rounded-[22px] flex items-center justify-center">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300">
              P
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-wider text-white">PLANORA</h1>
          <p className="text-xs text-gray-400 tracking-wide mt-1">THE SOCIAL GATHERING PLATFORM</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1c1d2a] border border-[#2d2f44] text-xs text-gray-300 mt-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Surat • Mumbai • Ahmedabad</span>
        </div>
      </div>

      {/* Bottom Launch Actions */}
      <div className="w-full space-y-3 pb-6 z-10">
        <button
          onClick={() => navigateTo('landing')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>Launch Flow</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3 px-6 rounded-2xl bg-[#1a1b26] text-gray-300 hover:text-white border border-[#2a2c3d] text-xs font-medium transition flex items-center justify-center gap-2"
        >
          <Play className="w-3.5 h-3.5 text-purple-400" />
          <span>Skip to Main Feed</span>
        </button>
      </div>
    </div>
  );
};

