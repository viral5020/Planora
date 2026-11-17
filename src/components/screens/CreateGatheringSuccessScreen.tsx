import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Share2,
  QrCode,
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const CreateGatheringSuccessScreen: React.FC = () => {
  const { gatheringDraft, navigateTo } = useApp();

  return (
    <div className="flex-1 bg-[#13141a] text-white p-6 flex flex-col justify-between min-h-[700px]">
      <div className="space-y-6">
        {/* Success Icon & Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 p-0.5 mx-auto shadow-xl shadow-purple-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#161722] rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            SUBMITTED FOR VERIFICATION
          </span>

          <h2 className="text-2xl font-black text-white">Submitted for Curation Review!</h2>
          <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
            <span className="text-white font-semibold">"{gatheringDraft.title}"</span> has been saved and queued for admin review. As soon as it is approved from the Admin Panel, it will go live on the public feed.
          </p>
        </div>

        {/* Verification Status Card */}
        <div className="bg-[#181924] p-4 rounded-3xl border border-[#27293b] space-y-3 shadow-xl max-w-md mx-auto w-full">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">
              Review Checklist
            </span>
            <span className="text-yellow-400 font-mono text-[10px] font-bold">Status: Pending Verification</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-[#13141b] p-2.5 rounded-xl border border-[#25283a] flex items-center justify-between">
              <span className="text-gray-400">Venue Safety Check:</span>
              <span className="text-green-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passed</span>
              </span>
            </div>

            <div className="bg-[#13141b] p-2.5 rounded-xl border border-[#25283a] flex items-center justify-between">
              <span className="text-gray-400">Host Credentials:</span>
              <span className="text-green-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Host</span>
              </span>
            </div>

            <div className="bg-[#13141b] p-2.5 rounded-xl border border-[#25283a] flex items-center justify-between">
              <span className="text-gray-400">Admin Approval (/admin):</span>
              <span className="text-amber-400 font-bold">Awaiting Admin Action</span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigateTo('admin')}
              className="text-xs text-purple-400 font-semibold underline hover:text-purple-300"
            >
              Go to Admin Panel to Approve Event
            </button>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="space-y-2.5 pb-2">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>Return to Explore Feed</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('admin')}
          className="w-full py-3 rounded-2xl bg-[#1b1c28] border border-[#2d2f44] text-xs font-semibold text-gray-300 hover:text-white transition"
        >
          Open /admin Console
        </button>
      </div>
    </div>
  );
};
