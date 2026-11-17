import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Globe2, Zap, ArrowLeft, ShieldAlert } from 'lucide-react';

export const CreateGatheringTypeScreen: React.FC = () => {
  const { goBack, navigateTo, setGatheringDraft, isHostVerified } = useApp();

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
    // If not verified host, route to become_host
    if (!isHostVerified) {
      navigateTo('become_host');
      return;
    }
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
          <div className="w-8"></div>
        </div>

        {/* Host Verification Notice if unverified */}
        {!isHostVerified && (
          <div className="mb-4 p-4 rounded-3xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/40 flex items-start justify-between gap-3 shadow-lg">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Verified Host Account Required</h4>
                <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">
                  To host gatherings on Planora, you must complete the ₹300 one-time host verification and receive approval from the admin panel.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('become_host')}
              className="py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 transition"
            >
              Verify Host (₹300)
            </button>
          </div>
        )}

        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-black text-white">What kind of gathering are you cooking up?</h2>
          <p className="text-xs text-gray-400">
            Choose how members will discover, RSVP, and enter your event.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {gatheringTypes.map((t) => (
            <div
              key={t.id}
              onClick={() => handleSelectType(t.id)}
              className="p-4 rounded-3xl bg-[#181924] hover:bg-[#1e202f] border border-[#27293b] hover:border-purple-500/50 cursor-pointer transition space-y-2 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#232537] flex items-center justify-center group-hover:scale-105 transition">
                    {t.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition">
                      {t.title}
                    </h3>
                    <span className="text-[10px] font-mono text-purple-400">{t.tag}</span>
                  </div>
                </div>
                {t.recommended && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-13">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 text-center">
        <p className="text-[10px] text-gray-400">
          All gatherings are monitored under Planora Safety Guidelines.
        </p>
      </div>
    </div>
  );
};
