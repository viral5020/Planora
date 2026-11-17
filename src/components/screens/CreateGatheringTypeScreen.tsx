import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Lock, Globe2, Zap, ArrowRight } from 'lucide-react';

export const CreateGatheringTypeScreen: React.FC = () => {
  const { goBack, navigateTo, gatheringDraft, setGatheringDraft } = useApp();

  const gatheringTypes = [
    {
      id: 'Private Gathering',
      title: 'Private Gathering',
      desc: 'Invite-only, secret link, unlisted on city feed. Perfect for house parties, private dinners, and inner-circle jam sessions.',
      icon: <Lock className="w-5 h-5 text-purple-400" />,
      tag: 'Invite Only'
    },
    {
      id: 'Public Social Experience',
      title: 'Public Social Experience',
      desc: 'Listed on Surat discover feed with host approval & ticketing. Ideal for rooftop socials, vinyl listening sessions, and workshops.',
      icon: <Globe2 className="w-5 h-5 text-pink-400" />,
      tag: 'Curated & Public',
      recommended: true
    },
    {
      id: 'Casual Spontaneous Hangout',
      title: 'Casual Spontaneous Hangout',
      desc: 'Happening within the next 3 hours. Low friction, instant join for spontaneous coffee runs, turf football, or late-night street food.',
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      tag: 'Next 3 Hours'
    }
  ];

  const handleSelectType = (typeId: string) => {
    setGatheringDraft((prev: any) => ({ ...prev, type: typeId }));
    navigateTo('create_step2_details');
  };

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
            Host Flow • Step 1/3
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">What kind of gathering are you cooking up?</h2>
          <p className="text-xs text-gray-400">
            Choose how discoverable and curated you want your event to be.
          </p>
        </div>

        {/* Gathering Options Cards */}
        <div className="space-y-3.5 mt-6">
          {gatheringTypes.map((t) => {
            const isSelected = gatheringDraft.type === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleSelectType(t.id)}
                className={`p-4 rounded-3xl border cursor-pointer transition relative space-y-2 ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-950/70 to-[#1e1f2d] border-purple-500/80 shadow-lg shadow-purple-500/20'
                    : 'bg-[#181924] border-[#25283a] hover:border-[#383b52]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#202232] border border-[#2c2f44]">
                      {t.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.title}</h4>
                      <span className="text-[10px] text-purple-300 font-mono">{t.tag}</span>
                    </div>
                  </div>

                  {t.recommended && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 leading-relaxed pl-1">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={() => navigateTo('create_step2_details')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>Continue to Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

