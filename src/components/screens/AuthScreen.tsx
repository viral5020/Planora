import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Phone, ShieldCheck, Globe } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { navigateTo, goBack, userPhone, setUserPhone, otpCode, setOtpCode } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#13141a] text-white min-h-[700px]">
      <div>
        {/* Back Button */}
        <button
          onClick={goBack}
          className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-widest">
            AUTHENTICATION
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            {step === 'phone' ? 'Welcome to PLANORA' : 'Verify Phone Number'}
          </h2>
          <p className="text-xs text-gray-400">
            {step === 'phone'
              ? 'Enter your phone number to discover real gatherings and message hosts.'
              : `Enter the 4-digit verification code sent to ${userPhone}`}
          </p>
        </div>

        {/* Form Inputs */}
        <div className="mt-8 space-y-4">
          {step === 'phone' ? (
            <div className="space-y-3">
              <label className="text-[11px] font-medium text-gray-300">Mobile Number</label>
              <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-2xl p-3 focus-within:border-purple-500 transition">
                <span className="text-sm font-semibold text-gray-300 pl-1">🇮🇳 +91</span>
                <span className="text-gray-500">|</span>
                <input
                  type="tel"
                  value={userPhone.replace('+91 ', '')}
                  onChange={(e) => setUserPhone(`+91 ${e.target.value}`)}
                  placeholder="94026 12345"
                  className="bg-transparent text-sm text-white focus:outline-none flex-1 font-mono tracking-wider"
                />
                <Phone className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-[11px] font-medium text-gray-300">4-Digit Verification Code</label>
              <div className="flex justify-between gap-3">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-14 h-14 text-center text-xl font-bold bg-[#1b1c28] border border-purple-500/50 rounded-2xl text-purple-300 focus:outline-none focus:border-purple-400 shadow-md shadow-purple-500/10"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[11px] text-gray-400 pt-2">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  onClick={() => alert('Code re-sent: 7294')}
                  className="text-purple-400 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          {/* Social login divider */}
          {step === 'phone' && (
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#262838]"></div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-[#262838]"></div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('onboarding_interests')}
                className="w-full py-3 px-4 rounded-2xl bg-[#1b1c28] hover:bg-[#232535] border border-[#2d2f44] text-xs font-medium text-gray-200 transition flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4 text-purple-400" />
                <span>Continue with Google</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Submit */}
      <div className="space-y-3 pb-4">
        {step === 'phone' ? (
          <button
            onClick={() => setStep('otp')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition"
          >
            Send Verification Code
          </button>
        ) : (
          <button
            onClick={() => navigateTo('onboarding_interests')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition"
          >
            Verify & Continue
          </button>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>By continuing, you agree to Planora Community Guidelines</span>
        </div>
      </div>
    </div>
  );
};
