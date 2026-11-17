import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Crown, Lock, User, ArrowLeft, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const HostLoginScreen: React.FC = () => {
  const { navigateTo, loginAsHost } = useApp();
  const [hostId, setHostId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const success = loginAsHost(hostId.trim(), password);
    if (success) {
      navigateTo('host_management');
    } else {
      setErrorMsg('Invalid Host ID or Password. Check your host application credentials or register below.');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-[#0e0f15] text-white min-h-[600px]">
      <div className="w-full max-w-sm bg-[#141520] border border-[#27293d] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('home')}
            className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            HOST PORTAL
          </span>
          <div className="w-8"></div>
        </div>

        <div className="text-center space-y-1.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 p-0.5 mx-auto shadow-lg shadow-amber-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#141520] rounded-[14px] flex items-center justify-center text-amber-400">
              <Crown className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-xl font-black text-white">Host Dashboard Login</h2>
          <p className="text-xs text-gray-400">
            Sign in with your verified Host ID and password to manage your gatherings & attendees.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-gray-300">Host ID or Username</label>
            <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-2xl p-3 focus-within:border-amber-500 transition">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                required
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
                placeholder="e.g. host_surat_01 or your Host ID"
                className="bg-transparent text-sm text-white focus:outline-none flex-1 font-mono text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-gray-300">Host Password</label>
            <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-2xl p-3 focus-within:border-amber-500 transition">
              <Lock className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent text-sm text-white focus:outline-none flex-1 font-mono"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#1b1c28] border border-[#27293b] text-[10px] text-gray-300 flex items-center justify-between font-mono">
            <span>Demo Host Passcode:</span>
            <span className="text-amber-400 font-bold">host_surat / host123</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition"
          >
            Access Host Console
          </button>
        </form>

        <div className="pt-2 border-t border-[#232535] text-center space-y-2">
          <p className="text-xs text-gray-400">Want to host gatherings on Planora?</p>
          <button
            onClick={() => navigateTo('become_host')}
            className="py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs transition flex items-center justify-center gap-1.5 w-full"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Apply to Become a Host (₹300)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

