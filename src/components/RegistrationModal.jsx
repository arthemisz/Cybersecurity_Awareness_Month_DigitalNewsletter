import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, UserCheck, BellRing, Sparkles, Check, Hash, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

const DEPARTMENTS = [
  'Engineering & DevOps',
  'Finance & Accounting',
  'Executive Leadership',
  'Legal & People Ops',
  'Product & Design',
  'Customer Operations'
];

export default function RegistrationModal({ isOpen, onClose, onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [channel, setChannel] = useState('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrolledBadge, setEnrolledBadge] = useState(null);
  const [copiedBadge, setCopiedBadge] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `DEF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setEnrolledBadge({
        id: generatedId,
        name,
        email,
        department,
        channel,
        enrolledAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
      setIsSubmitting(false);
      if (onRegisterSuccess) onRegisterSuccess();

      try {
        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#00E5FF', '#10B981', '#A855F7']
        });
      } catch {}
    }, 850);
  };

  const handleCopyBadge = () => {
    if (!enrolledBadge) return;
    navigator.clipboard.writeText(`SEC_DEFENDER_ID: ${enrolledBadge.id} // ${enrolledBadge.name} (${enrolledBadge.department})`);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  const handleReset = () => {
    setEnrolledBadge(null);
    setName('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Dialog box */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-neutral-950 dark:bg-neutral-950 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-black/15 shadow-2xl overflow-hidden font-sans">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 dark:border-white/10 light:border-black/10 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-50">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="font-mono text-xs font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
              CAMPAIGN DEFENDER ENROLLMENT
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6">
          {!enrolledBadge ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                  Register for Weekly Intelligence
                </h3>
                <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1">
                  Join 1,240+ verified team defenders receiving weekly threat briefings, tabletop scenarios, and cryptographic checklists throughout October 2026.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-700 mb-1">
                    Full Name / Call-Sign
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-50 border border-white/10 dark:border-white/10 light:border-neutral-300 text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-700 mb-1">
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.mercer@enterprise.internal"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-50 border border-white/10 dark:border-white/10 light:border-neutral-300 text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-700 mb-1">
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-50 border border-white/10 dark:border-white/10 light:border-neutral-300 text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-900 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-700 mb-1">
                      Dispatch Conduit
                    </label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-50 border border-white/10 dark:border-white/10 light:border-neutral-300 text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-900 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="email">Encrypted Email</option>
                      <option value="slack">Slack / Teams Bot</option>
                      <option value="calendar">Calendar Drill Sync</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-glow-cyan"
                >
                  {isSubmitting ? (
                    <span>ANCHORING DEFENDER BADGE...</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>INITIALIZE DEFENDER CREDENTIAL</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Digital Defender Badge Output */
            <div className="space-y-4 animate-fade-in text-center">
              <div className="p-5 rounded-2xl bg-black border border-cyan-500/40 relative overflow-hidden font-mono text-left shadow-glow-cyan">
                {/* Visual badge card */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-xs text-white">SEC_DEFENDER_CREDENTIAL</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED // 2026
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">DEFENDER_ID:</span>
                    <span className="text-cyan-400 font-bold">{enrolledBadge.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">OPERATIVE:</span>
                    <span className="text-neutral-100">{enrolledBadge.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CORP_EMAIL:</span>
                    <span className="text-neutral-200">{enrolledBadge.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">UNIT:</span>
                    <span className="text-purple-400">{enrolledBadge.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">ISSUED:</span>
                    <span className="text-neutral-400">{enrolledBadge.enrolledAt}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>ROOT_TRUST: ENTERPRISE TPM CA</span>
                  <span className="text-cyan-400">STATUS: ACTIVE</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  onClick={handleCopyBadge}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-mono text-neutral-200 hover:bg-neutral-700 transition-colors"
                >
                  {copiedBadge ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBadge ? 'COPIED BADGE' : 'Copy Credential'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 text-black font-mono font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  DONE
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
