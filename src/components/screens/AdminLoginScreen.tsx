import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, User, ArrowLeft, ShieldAlert, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLoginScreen: React.FC = () => {
  const { navigateTo, loginAsAdmin } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const success = loginAsAdmin(username.trim(), password);
    if (success) {
      navigateTo('admin');
    } else {
      setErrorMsg('Invalid administrative credentials. Use name: admin, password: 12345678');
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
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
            RESTRICTED ACCESS
          </span>
          <div className="w-8"></div>
        </div>

        <div className="text-center space-y-1.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 p-0.5 mx-auto shadow-lg shadow-pink-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#141520] rounded-[14px] flex items-center justify-center text-pink-400">
              <ShieldAlert className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-xl font-black text-white">Planora Admin Portal</h2>
          <p className="text-xs text-gray-400">
            Sign in with master credentials to manage host approvals, event curations & deletions.
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
            <label className="text-[11px] font-semibold text-gray-300">Admin Username</label>
            <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-2xl p-3 focus-within:border-pink-500 transition">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="bg-transparent text-sm text-white focus:outline-none flex-1 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-gray-300">Password</label>
            <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-2xl p-3 focus-within:border-pink-500 transition">
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

          <div className="p-2.5 rounded-xl bg-purple-900/20 border border-purple-500/20 text-[10px] text-gray-300 flex items-center justify-between font-mono">
            <span>Preset Credentials:</span>
            <span className="text-purple-300 font-bold">admin / 12345678</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-pink-600/30 hover:brightness-110 active:scale-[0.98] transition"
          >
            Authenticate Admin Console
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-gray-400 hover:text-white transition"
          >
            ← Back to Planora Member Feed
          </button>
        </div>
      </div>
    </div>
  );
};
