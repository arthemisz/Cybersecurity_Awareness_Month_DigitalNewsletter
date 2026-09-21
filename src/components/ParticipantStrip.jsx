import React, { useState } from 'react';
import { Send, Users, ShieldCheck, Check, Sparkles, Radio, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LIVE_DEFENDER_FEED } from '../data/dispatchData';

export default function ParticipantStrip({
  currentWeek,
  enrolledCount,
  onNewEnrollment,
}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid corporate or team email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onNewEnrollment) onNewEnrollment();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00E5FF', '#10B981']
        });
      } catch {}
    }, 900);
  };

  return (
    <section className="relative z-10 w-full mt-10 rounded-2xl bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-black/10 p-6 md:p-8 shadow-godly overflow-hidden">
      {/* Hairline subtle glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Live Distribution Status & Metric */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">
              FEED DISTRIBUTION STATUS: ACTIVE
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-normal text-neutral-100 dark:text-neutral-100 light:text-neutral-900 font-sans" style={{ fontStretch: 'normal', letterSpacing: 'normal', transform: 'none' }}>
            Week {currentWeek.weekNumber} Pushed to{' '}
            <span className="text-cyan-400 font-mono underline decoration-cyan-500/40 decoration-2 underline-offset-4">
              {enrolledCount.toLocaleString()} Enrolled Defenders
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-sans leading-relaxed">
            Every Monday at 08:00 UTC, registered team members receive our encrypted dispatch with that week’s actionable tabletop drill and cryptographic hygiene guide.
          </p>

          {/* Live Recent Defense Actions ticker */}
          <div className="pt-2 flex items-center space-x-2 overflow-x-auto text-[11px] font-mono text-neutral-400">
            <span className="text-cyan-400 font-semibold flex items-center space-x-1 flex-shrink-0">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>LIVE DEFENDER LOG:</span>
            </span>
            <div className="flex space-x-3 whitespace-nowrap">
              {LIVE_DEFENDER_FEED.slice(0, 3).map((item) => (
                <span key={item.id} className="bg-black/30 px-2 py-0.5 rounded border border-white/5">
                  <span className="text-neutral-300 font-medium">{item.user}</span>: {item.action} ({item.time})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Clean Instant Email Signup */}
        <div className="lg:col-span-6 bg-black/40 dark:bg-black/40 light:bg-neutral-50 rounded-xl p-5 md:p-6 border border-white/5 dark:border-white/5 light:border-black/5">
          {!isSuccess ? (
            <form onSubmit={handleSubscribe} className="space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">ENROLL NEW DEFENDER PROFILE</span>
                </span>
                <span className="text-[10px] text-neutral-400">ZERO SPAM // INTERNAL ONLY</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="defender@company.enterprise"
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-white/10 dark:border-white/10 light:border-neutral-300 text-xs font-mono text-neutral-200 dark:text-neutral-200 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>ENCRYPTING...</span>
                  ) : (
                    <>
                      <span>ENROLL NOW</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <div className="text-[11px] font-mono text-rose-400">
                  {errorMsg}
                </div>
              )}

              <p className="text-[11px] text-neutral-500 font-sans">
                By enrolling, you will receive 4 weekly dispatches throughout October 2026. Compliant with NIST SP 800-63B standards.
              </p>
            </form>
          ) : (
            <div className="space-y-3 animate-fade-in text-center py-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-100 font-mono">
                  DEFENDER PROFILE REGISTERED
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Enrolled as <span className="text-cyan-400 font-mono font-semibold">{email}</span>. Dispatch dispatch packet sent for Week {currentWeek.weekNumber}.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                Enroll another team member
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
