import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  QrCode,
  AlertCircle,
  CreditCard,
  Building,
  Check,
  Key,
  User,
  Crown
} from 'lucide-react';

export const BecomeHostScreen: React.FC = () => {
  const { goBack, navigateTo, isHostVerified, hostStatus, applyForHost, userProfile, userPhone } = useApp();

  const [step, setStep] = useState<'info' | 'form' | 'credentials' | 'payment' | 'done'>(
    isHostVerified ? 'done' : hostStatus === 'pending' ? 'done' : 'info'
  );

  const [category, setCategory] = useState('Music & Rooftops');
  const [experienceBio, setExperienceBio] = useState('');
  const [hostId, setHostId] = useState(`host_${(userProfile?.name || 'surat').toLowerCase().replace(/\s+/g, '_')}`);
  const [hostPassword, setHostPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    'Music & Rooftops',
    'Food, Suppers & Culinary',
    'Nightlife & Social Clubs',
    'Sports, Turf & Fitness',
    'Tech, Design & Founders'
  ];

  const handleProceedToCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experienceBio.trim()) {
      setErrorMsg('Please tell us a bit about what kind of gatherings you plan to host.');
      return;
    }
    setErrorMsg(null);
    setStep('credentials');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostId.trim() || !hostPassword.trim()) {
      setErrorMsg('Please specify both a Host ID and Password to manage your host panel.');
      return;
    }
    if (hostPassword.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    setErrorMsg(null);
    setStep('payment');
  };

  const handleCompletePaymentAndApply = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const paymentRef = `PLN_PAY_${Date.now().toString().slice(-6)}`;
      await applyForHost(category, experienceBio, paymentRef, hostId.trim(), hostPassword.trim());
      setStep('done');
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white p-4 sm:p-6 flex flex-col justify-between min-h-[700px] max-w-2xl mx-auto w-full">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            className="w-8 h-8 rounded-full bg-[#1b1d28] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 font-semibold">
            PLANORA HOST NETWORK
          </span>
          <div className="w-8"></div>
        </div>

        {/* STEP 1: INFO OVERVIEW */}
        {step === 'info' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 p-0.5 mx-auto shadow-xl shadow-purple-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#161722] rounded-[14px] flex items-center justify-center font-black text-xl text-white">
                  👑
                </div>
              </div>
              <h2 className="text-2xl font-black text-white">Become a Verified Host</h2>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                Host intimate dinners, rooftop concerts, vinyl listening sessions, and spontaneous weekend activities in your city.
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-[#181924] p-5 rounded-3xl border border-[#292b3c] shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  One-time Host Verification Fee
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold text-white">₹300</span>
                  <span className="text-xs text-gray-400 font-mono">/ lifetime</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Covers host screening, manual vetting, custom Host ID & verification badge.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            {/* Perks list */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider px-1">
                What Verified Hosts Receive:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Dedicated Host Panel</h5>
                    <p className="text-[10px] text-gray-400">Manage attendees, view stats & accept guest requests.</p>
                  </div>
                </div>

                <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Guest Curation & Approval</h5>
                    <p className="text-[10px] text-gray-400">Screen attendee profiles, accept or decline tickets.</p>
                  </div>
                </div>

                <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Sell Entry Passes & Tickets</h5>
                    <p className="text-[10px] text-gray-400">Set prices, generate QR entry tickets for guests.</p>
                  </div>
                </div>

                <div className="bg-[#181924] p-3 rounded-2xl border border-[#27293b] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Verified Host Shield Badge</h5>
                    <p className="text-[10px] text-gray-400">Gain instant credibility and high member trust.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setStep('form')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
              >
                <span>Continue Application & Create Host ID</span>
                <Sparkles className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  onClick={() => navigateTo('host_login')}
                  className="text-xs text-amber-400 font-semibold hover:underline"
                >
                  Already have a Host ID? Login to Host Panel →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE DETAILS */}
        {step === 'form' && (
          <form onSubmit={handleProceedToCredentials} className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-white">1. Host Experience</h3>
              <p className="text-xs text-gray-400">Tell us what kind of gatherings you plan to organize.</p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-300">Primary Experience Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#181924] border border-[#292b3c] rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#181924]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-300">
                What gatherings do you want to host? & Experience
              </label>
              <textarea
                rows={4}
                required
                value={experienceBio}
                onChange={(e) => setExperienceBio(e.target.value)}
                placeholder="e.g. I run a rooftop audio space in Vesu, Surat. I host acoustic jam sessions and vinyl turntable evenings for 30-40 music enthusiasts..."
                className="w-full bg-[#181924] border border-[#292b3c] rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep('info')}
                className="py-3.5 px-4 rounded-2xl bg-[#1b1c28] border border-[#2d2f44] text-xs font-semibold text-gray-300 hover:text-white transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition"
              >
                Next: Create Host Login ID →
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: CREATE HOST LOGIN CREDENTIALS */}
        {step === 'credentials' && (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-white">2. Create Host Login Credentials</h3>
              <p className="text-xs text-gray-400">
                You will use this custom Host ID and Password to sign in to your dedicated Host Management Panel.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-300">Choose your Host ID / Username</label>
              <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-2xl p-3 focus-within:border-purple-500 transition">
                <User className="w-4 h-4 text-purple-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={hostId}
                  onChange={(e) => setHostId(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="e.g. host_surat_acoustic"
                  className="bg-transparent text-sm text-white focus:outline-none flex-1 font-mono text-xs"
                />
              </div>
              <p className="text-[10px] text-gray-400">Unique identifier for your host console.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-300">Create Host Password</label>
              <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-2xl p-3 focus-within:border-purple-500 transition">
                <Key className="w-4 h-4 text-purple-400 shrink-0" />
                <input
                  type="password"
                  required
                  value={hostPassword}
                  onChange={(e) => setHostPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent text-sm text-white focus:outline-none flex-1 font-mono"
                />
              </div>
              <p className="text-[10px] text-gray-400">Minimum 6 characters.</p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="py-3.5 px-4 rounded-2xl bg-[#1b1c28] border border-[#2d2f44] text-xs font-semibold text-gray-300 hover:text-white transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-[0.98] transition"
              >
                Next: Proceed to Payment (₹300) →
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: PAYMENT SCREEN (₹300) */}
        {step === 'payment' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-black text-white">3. Verification Payment</h3>
              <p className="text-xs text-gray-400">Complete ₹300 one-time fee to register your Host ID.</p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Payment Summary Box */}
            <div className="bg-[#181924] p-4 rounded-3xl border border-[#292b3c] space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-[#25283a]">
                <span className="text-gray-400">Host ID Created:</span>
                <span className="font-bold text-purple-400 font-mono">{hostId}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-[#25283a]">
                <span className="text-gray-400">Category:</span>
                <span className="font-semibold text-white">{category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">Total Payable:</span>
                <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  ₹300.00
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-semibold transition ${
                    paymentMethod === 'upi'
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-[#181924] border-[#292b3c] text-gray-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-purple-400" />
                  <span>UPI / QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-semibold transition ${
                    paymentMethod === 'card'
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-[#181924] border-[#292b3c] text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-pink-400" />
                  <span>Credit / Debit Card</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'upi' ? (
              <div className="bg-[#181924] p-4 rounded-2xl border border-[#292b3c] text-center space-y-3">
                <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                  Scan & Pay ₹300 with any UPI App
                </span>
                <div className="bg-white p-3 rounded-2xl inline-block mx-auto shadow-inner">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=planora@upi&pn=Planora%20Host%20Verification&am=300&cu=INR"
                    alt="UPI QR Code"
                    className="w-32 h-32"
                  />
                </div>
                <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-xl p-2.5 max-w-xs mx-auto">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="or enter your UPI ID (e.g. name@okhdfcbank)"
                    className="bg-transparent text-xs text-white focus:outline-none flex-1 font-mono placeholder-gray-500"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-[#181924] p-4 rounded-2xl border border-[#292b3c] space-y-2.5">
                <div className="flex items-center gap-2 bg-[#1b1c28] border border-[#2d2f44] rounded-xl p-2.5">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Card Number •••• •••• •••• 4242"
                    className="bg-transparent text-xs text-white focus:outline-none flex-1 font-mono placeholder-gray-500"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="bg-[#1b1c28] border border-[#2d2f44] rounded-xl p-2.5 text-xs text-white focus:outline-none flex-1 font-mono text-center placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="bg-[#1b1c28] border border-[#2d2f44] rounded-xl p-2.5 text-xs text-white focus:outline-none flex-1 font-mono text-center placeholder-gray-500"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="py-3.5 px-4 rounded-2xl bg-[#1b1c28] border border-[#2d2f44] text-xs font-semibold text-gray-300 hover:text-white transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCompletePaymentAndApply}
                disabled={loading}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-green-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{loading ? 'Processing Payment...' : 'Pay ₹300 & Register Host'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: SUBMITTED */}
        {step === 'done' && (
          <div className="text-center space-y-5 py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 p-0.5 mx-auto shadow-2xl shadow-purple-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#161722] rounded-full flex items-center justify-center">
                {isHostVerified ? (
                  <Check className="w-10 h-10 text-green-400 stroke-[3]" />
                ) : (
                  <ShieldCheck className="w-10 h-10 text-purple-400" />
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                {isHostVerified ? 'HOST ACCOUNT ACTIVE' : 'HOST REGISTERED • UNDER ADMIN REVIEW'}
              </span>
              <h3 className="text-2xl font-black text-white">
                {isHostVerified ? 'You are a Verified Planora Host!' : 'Host Credentials Submitted!'}
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                {isHostVerified
                  ? 'Your host account is verified! You can now log into your Host Panel to manage events and verify guests.'
                  : `Your ₹300 verification payment is confirmed and Host ID "${hostId}" is created. The admin will review and verify your account. Once approved, use your Host ID and Password to sign in to your Host Panel!`}
              </p>
            </div>

            <div className="bg-[#181924] p-4 rounded-3xl border border-[#27293b] max-w-md mx-auto space-y-2 text-xs text-left">
              <div className="flex justify-between items-center pb-2 border-b border-[#25283a]">
                <span className="text-gray-400">Host Login ID:</span>
                <span className="font-mono font-bold text-amber-400">{hostId}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#25283a]">
                <span className="text-gray-400">Payment Status:</span>
                <span className="text-green-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>₹300.00 Paid</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Status:</span>
                <span className={`font-bold ${isHostVerified ? 'text-green-400' : 'text-amber-400'}`}>
                  {isHostVerified ? 'Verified & Active' : 'Pending Admin Verification'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <button
                onClick={() => navigateTo('host_login')}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:brightness-110 transition"
              >
                Go to Host Login →
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="flex-1 py-3 rounded-2xl bg-[#1b1c28] border border-[#2d2f44] text-xs font-semibold text-gray-200 hover:text-white transition"
              >
                Back to Explore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
