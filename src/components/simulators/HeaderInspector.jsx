import React, { useState } from 'react';
import { AlertOctagon, CheckCircle2, QrCode, Mic, Volume2, ShieldAlert, FileText, ArrowUpRight } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'spoofed-wire',
    title: 'AI CFO Wire Transfer',
    type: 'phish',
    fromDisplay: 'David Sterling <david.sterling@enterprise-corp.cc>',
    realFrom: 'david.sterling@enterprise.com (Legitimate)',
    subject: 'URGENT // Q3 Confidential Acquisition Escrow Release',
    dmarcStatus: 'FAIL (p=quarantine)',
    spfStatus: 'FAIL (IP 198.51.100.42 not permitted)',
    dkimStatus: 'NEUTRAL (Invalid signature)',
    redFlags: [
      'Lookalike domain: ".cc" TLD instead of internal ".com"',
      'DMARC alignment failed: SPF IP belongs to unverified hosting subnet',
      'High urgency pressure tone coercing bypass of accounting controls'
    ],
    audioVoiceClone: true,
  },
  {
    id: 'quishing-qr',
    title: 'Lobby Parking Quishing Lure',
    type: 'phish',
    fromDisplay: 'Building Facilities <facilities-update@qr-gateways.io>',
    realFrom: 'facilities@enterprise.com',
    subject: 'ACTION REQUIRED // Oct 2026 Parking Permit Physical QR Update',
    dmarcStatus: 'SOFTFAIL',
    spfStatus: 'FAIL',
    dkimStatus: 'FAIL',
    redFlags: [
      'Physical adhesive sticker placed over authentic parking terminal QR',
      'Target URL redirects to external phishing credential harvester: sec-parking.xyz',
      'Asks employee to enter Microsoft SSO credentials to validate vehicle license'
    ],
    audioVoiceClone: false,
  },
  {
    id: 'legit-okta',
    title: 'Legitimate FIDO2 Migration Notice',
    type: 'legit',
    fromDisplay: 'SecOps Identity Service <no-reply@okta.enterprise.com>',
    realFrom: 'no-reply@okta.enterprise.com',
    subject: 'Notice: FIDO2 Hardware Key Enclave Binding Active',
    dmarcStatus: 'PASS (Strict Alignment)',
    spfStatus: 'PASS (Sender IP 203.0.113.195 authorized)',
    dkimStatus: 'PASS (Key rsa2048 s=enterprise)',
    redFlags: [],
    audioVoiceClone: false,
  }
];

export const HeaderInspector = () => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [highlightedField, setHighlightedField] = useState(null);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div className="space-y-3.5">
      {/* Scenario switcher pills */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
          SELECT INVESTIGATION CASE:
        </span>
        <div className="flex space-x-1">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setSelectedScenario(scenario);
                setAudioPlaying(false);
              }}
              className={`text-[11px] font-mono px-2.5 py-1 rounded transition-all flex items-center space-x-1 ${
                selectedScenario.id === scenario.id
                  ? scenario.type === 'phish'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900/60'
              }`}
            >
              {scenario.type === 'phish' ? (
                <AlertOctagon className="w-3 h-3 text-rose-400" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              )}
              <span>{scenario.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RFC Header Inspection Terminal */}
      <div className="bg-black/80 rounded-xl border border-white/10 p-3.5 font-mono text-[11px] space-y-2.5">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center space-x-2 text-neutral-400">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-neutral-300 font-semibold">RFC 5322 HEADER DIAGNOSTIC</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              selectedScenario.type === 'phish'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {selectedScenario.type === 'phish' ? 'MALICIOUS DECEPTION' : 'AUTHENTIC SENDER'}
          </span>
        </div>

        {/* Header details */}
        <div className="space-y-1.5 text-neutral-300">
          <div
            onClick={() => setHighlightedField('from')}
            className={`p-1.5 rounded cursor-pointer transition-colors ${
              highlightedField === 'from' ? 'bg-neutral-800 border border-white/20' : 'hover:bg-white/5'
            }`}
          >
            <span className="text-neutral-400">From: </span>
            <span className={selectedScenario.type === 'phish' ? 'text-rose-400 font-semibold' : 'text-neutral-200'}>
              {selectedScenario.fromDisplay}
            </span>
          </div>

          <div className="p-1.5 rounded hover:bg-white/5">
            <span className="text-neutral-400">Subject: </span>
            <span className="text-neutral-100">{selectedScenario.subject}</span>
          </div>

          {/* DMARC / SPF / DKIM verification strip */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className={`p-2 rounded border ${
              selectedScenario.dmarcStatus.includes('PASS')
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <div className="text-[9px] text-neutral-400">DMARC ALIGNMENT</div>
              <div className="font-bold text-[11px] mt-0.5">{selectedScenario.dmarcStatus}</div>
            </div>

            <div className={`p-2 rounded border ${
              selectedScenario.spfStatus.includes('PASS')
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <div className="text-[9px] text-neutral-400">SPF RECORD</div>
              <div className="font-bold text-[11px] mt-0.5">{selectedScenario.spfStatus}</div>
            </div>

            <div className={`p-2 rounded border ${
              selectedScenario.dkimStatus.includes('PASS')
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className="text-[9px] text-neutral-400">DKIM SIGNATURE</div>
              <div className="font-bold text-[11px] mt-0.5">{selectedScenario.dkimStatus}</div>
            </div>
          </div>
        </div>

        {/* Threat breakdown analysis */}
        {selectedScenario.redFlags.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-white/5">
            <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-1 flex items-center space-x-1">
              <ShieldAlert className="w-3 h-3" />
              <span>DETECTED DECEPTION SIGNATURES:</span>
            </div>
            <ul className="space-y-1 font-sans text-xs text-neutral-300">
              {selectedScenario.redFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-rose-400 text-xs">⚠️</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Audio Spectrogram Simulator for AI Voice Clone case */}
        {selectedScenario.audioVoiceClone && (
          <div className="mt-2 pt-2 border-t border-white/5 bg-neutral-900/60 rounded-lg p-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5 text-xs text-cyan-300 font-sans font-medium">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                <span>Synthetic Voice Clone Spectral Analysis</span>
              </div>
              <button
                onClick={toggleAudio}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1 hover:bg-cyan-500/30"
              >
                <Volume2 className="w-3 h-3" />
                <span>{audioPlaying ? 'PAUSE SPECTROGRAM' : 'AUDIT VOICE SAMPLE'}</span>
              </button>
            </div>

            {/* Simulated Audio Visualizer Frequency Bars */}
            <div className="flex items-end justify-between h-8 bg-black/60 rounded px-2 py-1 gap-1">
              {[40, 65, 80, 45, 90, 70, 85, 30, 95, 60, 50, 75, 90, 40, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t transition-all duration-150 ${
                    audioPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-neutral-700'
                  }`}
                  style={{ height: audioPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 1 : 0.8))) % 100}%` : `${h / 3}%` }}
                />
              ))}
            </div>
            <div className="text-[10px] text-amber-400 font-mono mt-1.5">
              [SPECTRAL_ANOMALY]: Unnatural zero-latency harmonics & missing human glottal breathing pauses.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderInspector;
