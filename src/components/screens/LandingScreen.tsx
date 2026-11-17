import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Compass } from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#13141a] text-white min-h-[700px] relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center font-bold text-[10px]">
            P
          </div>
          <span className="font-bold text-sm tracking-wider">PLANORA</span>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="text-xs text-gray-400 hover:text-white transition"
        >
          Skip
        </button>
      </div>

      {/* Hero Visual & Headline */}
      <div className="my-auto py-6 space-y-6">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-medium">
          <Flame className="w-3.5 h-3.5 text-pink-400" />
          <span>The Real-World Social Layer</span>
        </div>

        {/* Big Headline matching Stitch */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold leading-tight text-white">
            Your city.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Your people.
            </span><br />
            Your plans.
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed pt-2">
            Curated real-world gatherings, secret suppers, rooftop vinyl sessions & spontaneous hangouts happening in Surat tonight.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <div className="bg-[#1a1b26] p-3 rounded-2xl border border-[#27293b] space-y-1">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-semibold text-white">Curated & Safe</h4>
            <p className="text-[10px] text-gray-400">Host approvals & verified IDs for peace of mind.</p>
          </div>
          <div className="bg-[#1a1b26] p-3 rounded-2xl border border-[#27293b] space-y-1">
            <Compass className="w-4 h-4 text-pink-400" />
            <h4 className="text-xs font-semibold text-white">Hyperlocal Vibes</h4>
            <p className="text-[10px] text-gray-400">Find real communities in your neighborhood.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-4">
        <button
          onClick={() => navigateTo('auth_phone')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center">
          <button
            onClick={() => navigateTo('auth_phone')}
            className="text-xs text-gray-400 hover:text-white transition"
          >
            Already have an account? <span className="text-purple-400 font-semibold underline">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

