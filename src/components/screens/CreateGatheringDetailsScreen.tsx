import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = [
  'Music & Nightlife',
  'Food & Rooftops',
  'House Parties',
  'Sports & Turf',
  'Specialty Coffee',
  'Creative Tech & Founders'
];

export const CreateGatheringDetailsScreen: React.FC = () => {
  const { goBack, navigateTo, gatheringDraft, setGatheringDraft, selectedCity } = useApp();

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
            Host Flow • Step 2/3
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">Bring the vision to life.</h2>
          <p className="text-xs text-gray-400">
            Give your gathering a catchy title, set the timing, and specify your venue in {selectedCity}.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mt-6">
          {/* Event Title */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-gray-300">Gathering Title</label>
            <input
              type="text"
              value={gatheringDraft.title}
              onChange={(e) => setGatheringDraft((prev: any) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Midnight Vinyl & Tapas Social"
              className="w-full bg-[#1b1c28] border border-[#2c2f44] rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-purple-500 font-medium"
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-gray-300">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGatheringDraft((prev: any) => ({ ...prev, category: cat }))}
                  className={`p-2 rounded-xl text-[10px] font-medium border text-left truncate transition ${
                    gatheringDraft.category === cat
                      ? 'bg-purple-600/30 text-purple-200 border-purple-500'
                      : 'bg-[#1b1c28] text-gray-400 border-[#27293b] hover:border-[#383a50]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-gray-300 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-400" /> Date
              </label>
              <input
                type="text"
                value={gatheringDraft.date}
                onChange={(e) => setGatheringDraft((prev: any) => ({ ...prev, date: e.target.value }))}
                className="w-full bg-[#1b1c28] border border-[#2c2f44] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-gray-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-pink-400" /> Time
              </label>
              <input
                type="text"
                value={gatheringDraft.time}
                onChange={(e) => setGatheringDraft((prev: any) => ({ ...prev, time: e.target.value }))}
                className="w-full bg-[#1b1c28] border border-[#2c2f44] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Venue & Location */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-gray-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-purple-400" /> Venue & Address
            </label>
            <input
              type="text"
              value={gatheringDraft.venue}
              onChange={(e) => setGatheringDraft((prev: any) => ({ ...prev, venue: e.target.value }))}
              placeholder="e.g. Skyline Terrace Lounge, Vesu, Surat"
              className="w-full bg-[#1b1c28] border border-[#2c2f44] rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-purple-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={() => navigateTo('create_step3_curate')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>Continue to Guest Curation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

