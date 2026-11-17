import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Share2,
  QrCode,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Camera,
  Eye,
  Sliders
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
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            GATHERING IS LIVE
          </span>
          <h2 className="text-2xl font-black text-white">Ready to pack the house.</h2>
          <p className="text-xs text-gray-300">
            <span className="text-white font-semibold">"{gatheringDraft.title}"</span> is published in Surat. Share your invite pass to start receiving guest RSVPs.
          </p>
        </div>

        {/* QR Code Pass Card */}
        <div className="bg-[#181924] p-4 rounded-3xl border border-[#27293b] text-center space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs px-2">
            <span className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">
              Host Entry Pass
            </span>
            <span className="text-purple-400 font-mono text-[10px]">45 Spots Left</span>
          </div>

          <div className="p-3 bg-white rounded-2xl inline-block mx-auto shadow-inner">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=PLANORA_HOST_PASS_SURAT"
              alt="QR Code"
              className="w-28 h-28"
            />
          </div>

          <p className="text-[11px] text-gray-400">
            Scan QR at the door to verify approved guests instantly.
          </p>
        </div>

        {/* Broadcast & Virality Channels */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Broadcast Channels</span>
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => alert('WhatsApp invite message generated & copied!')}
              className="p-3 rounded-2xl bg-[#1b1d2b] hover:bg-[#23263a] border border-[#2c3046] text-left space-y-1 transition"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold text-white">WhatsApp</span>
              </div>
              <p className="text-[10px] text-gray-400">Broadcast invite to local groups</p>
            </button>

            <button
              onClick={() => alert('Instagram Story asset downloaded!')}
              className="p-3 rounded-2xl bg-[#1b1d2b] hover:bg-[#23263a] border border-[#2c3046] text-left space-y-1 transition"
            >
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-bold text-white">Story Asset</span>
              </div>
              <p className="text-[10px] text-gray-400">Generate 9:16 aesthetic poster</p>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Action Buttons */}
      <div className="space-y-2.5 pt-4 pb-2">
        <button
          onClick={() => navigateTo('host_management')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <Sliders className="w-4 h-4" />
          <span>Open Host Management & Approvals</span>
        </button>

        <button
          onClick={() => navigateTo('event_detail')}
          className="w-full py-3 rounded-2xl bg-[#1a1b26] text-gray-300 hover:text-white border border-[#2a2c3d] text-xs font-medium transition flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4 text-purple-400" />
          <span>Preview Live Guest View</span>
        </button>
      </div>
    </div>
  );
};
