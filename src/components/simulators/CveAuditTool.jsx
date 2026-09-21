import React, { useState } from 'react';
import { Cpu, ShieldAlert, Sparkles, RefreshCcw, Check, AlertTriangle, ShieldCheck, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CveAuditTool() {
  const [daysSinceReboot, setDaysSinceReboot] = useState(14);
  const [unapprovedExtensions, setUnapprovedExtensions] = useState(3);
  const [edrEnforcing, setEdrEnforcing] = useState(false);
  const [aiPluginsWithFullAccess, setAiPluginsWithFullAccess] = useState(2);
  const [isRemediated, setIsRemediated] = useState(false);

  // Calculate dynamic risk score (0 - 100)
  const calculateRisk = () => {
    if (isRemediated) return 4;
    let score = 20; // baseline
    score += Math.min(35, daysSinceReboot * 2.5);
    score += unapprovedExtensions * 12;
    score += aiPluginsWithFullAccess * 14;
    if (!edrEnforcing) score += 20;
    return Math.min(99, Math.round(score));
  };

  const riskScore = calculateRisk();

  const getRiskLabel = (score) => {
    if (score < 25) return { label: 'LOW EXPOSURE // HARDENED', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30' };
    if (score < 60) return { label: 'ELEVATED VULNERABILITY', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30' };
    return { label: 'CRITICAL WEAPONIZATION RISK', color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-500/30' };
  };

  const status = getRiskLabel(riskScore);

  const handleSanitize = () => {
    setIsRemediated(true);
    setDaysSinceReboot(0);
    setUnapprovedExtensions(0);
    setEdrEnforcing(true);
    setAiPluginsWithFullAccess(0);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#10B981', '#00E5FF', '#A855F7']
      });
    } catch {}
  };

  const handleReset = () => {
    setIsRemediated(false);
    setDaysSinceReboot(14);
    setUnapprovedExtensions(3);
    setEdrEnforcing(false);
    setAiPluginsWithFullAccess(2);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-neutral-200">ENDPOINT CVE & SHADOW IT EXPOSURE</span>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${status.bg} ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Main Exposure Metric Display */}
      <div className="bg-black/80 rounded-xl border border-white/10 p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">COMPUTED EXPLOITABILITY SCORE</div>
            <div className={`text-2xl font-bold font-sans ${status.color} mt-0.5`}>
              {riskScore}%
              <span className="text-xs font-mono font-normal text-neutral-400 ml-2">
                {riskScore > 50 ? '(Sub-4hr Bot Weaponization Window)' : '(Zero Known CVEs Active)'}
              </span>
            </div>
          </div>
          
          <div className="w-24 bg-neutral-900 rounded-full h-2.5 overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-500 ${
                riskScore < 25 ? 'bg-emerald-400' : riskScore < 60 ? 'bg-amber-400' : 'bg-rose-500'
              }`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>

        {/* Interactive Endpoint Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-white/5 font-sans">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-neutral-300">
              <span>Workstation Uptime (Pending Reboot):</span>
              <span className="font-mono text-cyan-400">{daysSinceReboot} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              disabled={isRemediated}
              value={daysSinceReboot}
              onChange={(e) => setDaysSinceReboot(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-neutral-300">
              <span>Rogue Browser Extensions:</span>
              <span className="font-mono text-amber-400">{unapprovedExtensions} Plugins</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              disabled={isRemediated}
              value={unapprovedExtensions}
              onChange={(e) => setUnapprovedExtensions(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 font-sans text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => !isRemediated && setEdrEnforcing(!edrEnforcing)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                edrEnforcing
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              EDR SENSOR: {edrEnforcing ? 'ACTIVE & BLOCKING' : 'DORMANT / OFF'}
            </button>
          </div>

          <button
            onClick={isRemediated ? handleReset : handleSanitize}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              isRemediated
                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-white/10'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {isRemediated ? (
              <>
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>RESTORE SIMULATION</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>TRIGGER AUTOMATED SANITIZE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
