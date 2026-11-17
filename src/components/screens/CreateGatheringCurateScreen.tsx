import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Users,
  IndianRupee,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const CreateGatheringCurateScreen: React.FC = () => {
  const { goBack, gatheringDraft, setGatheringDraft, publishGatheringDraft } = useApp();

  return (
    <div className="flex-1 bg-[#13141a] text-white p-6 flex flex-col justify-between min-h-[700px]">
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
            Host Flow • Step 3/3
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">Curate your guest list.</h2>
          <p className="text-xs text-gray-400">
            Control who attends, set capacity limits, and configure cover charges.
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-4 mt-6">
          {/* Approval Mode Choice */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-gray-300">Entry & Approval Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGatheringDraft((p: any) => ({ ...p, approvalMode: 'approval' }))}
                className={`p-3 rounded-2xl border text-left transition space-y-1 ${
                  gatheringDraft.approvalMode === 'approval'
                    ? 'bg-purple-950/60 border-purple-500 shadow-md shadow-purple-500/20'
                    : 'bg-[#181924] border-[#262838] text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Host Approval</span>
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <p className="text-[10px] text-gray-400">You review each guest’s bio & mutuals before letting them in.</p>
              </button>

              <button
                type="button"
                onClick={() => setGatheringDraft((p: any) => ({ ...p, approvalMode: 'instant' }))}
                className={`p-3 rounded-2xl border text-left transition space-y-1 ${
                  gatheringDraft.approvalMode === 'instant'
                    ? 'bg-purple-950/60 border-purple-500 shadow-md shadow-purple-500/20'
                    : 'bg-[#181924] border-[#262838] text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Instant RSVP</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                </div>
                <p className="text-[10px] text-gray-400">First-come, first-served until capacity fills up.</p>
              </button>
            </div>
          </div>

          {/* Capacity & Spots */}
          <div className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Max Capacity / Spots</span>
              </div>
              <span className="text-xs font-mono font-bold text-purple-300">
                {gatheringDraft.capacity} Guests
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={gatheringDraft.capacity}
              onChange={(e) => setGatheringDraft((p: any) => ({ ...p, capacity: Number(e.target.value) }))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>Intimate (10)</span>
              <span>Medium (45)</span>
              <span>Party (100)</span>
            </div>
          </div>

          {/* Ticketing & Cover Fee */}
          <div className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Cover Fee / Ticket</h4>
                <p className="text-[10px] text-gray-400">Includes entry & tapas plate</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#1b1c28] border border-[#2d2f44] rounded-xl px-2.5 py-1.5">
              <span className="text-xs font-bold text-gray-400">₹</span>
              <input
                type="number"
                value={gatheringDraft.price}
                onChange={(e) => setGatheringDraft((p: any) => ({ ...p, price: Number(e.target.value) }))}
                className="w-16 bg-transparent text-xs font-bold text-white focus:outline-none text-right font-mono"
              />
            </div>
          </div>

          {/* Social Dynamics & Icebreaker Toggle */}
          <div className="bg-[#181924] p-3.5 rounded-2xl border border-[#27293b] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Group Icebreaker Game</h4>
                <p className="text-[10px] text-gray-400">Enable in-chat prompt generator for guests</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGatheringDraft((p: any) => ({ ...p, icebreakers: !p.icebreakers }))}
              className="text-purple-400 transition"
            >
              {gatheringDraft.icebreakers ? (
                <ToggleRight className="w-7 h-7 text-purple-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Publish Action Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={publishGatheringDraft}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Publish Gathering & Pack the House</span>
        </button>
      </div>
    </div>
  );
};

