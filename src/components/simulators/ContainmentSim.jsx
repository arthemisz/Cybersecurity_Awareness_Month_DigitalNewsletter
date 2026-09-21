import React, { useState } from 'react';
import { Siren, WifiOff, Power, ShieldAlert, Award, ArrowRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const DRILL_STEPS = [
  {
    step: 1,
    title: 'Stage 1: Active Ransomware Alert Detected',
    scenario: 'At 02:14 UTC, your endpoint displays a suspicious background process encrypting local `.docx` and `.sqlite` files. Network activity spikes. What is your immediate first response?',
    options: [
      {
        id: 'opt-a',
        label: 'Disconnect Network (Wi-Fi / Unplug Ethernet)',
        correct: true,
        reason: 'Optimal Choice! Disconnecting the network severs C2 communication and stops lateral encryption across subnet shares while preserving volatile memory (RAM) for forensic encryption key extraction.',
        scoreDelta: 50,
      },
      {
        id: 'opt-b',
        label: 'Hard Power Off (Hold Power Button)',
        correct: false,
        reason: 'Suboptimal! Hard power cuts destroy volatile RAM data, wiping encryption keys and memory-resident malware payloads needed by the Incident Response team to decrypt affected files.',
        scoreDelta: 15,
      }
    ]
  },
  {
    step: 2,
    title: 'Stage 2: Token & Credential Triage',
    scenario: 'Your network interface is severed. You need to alert the enterprise security operations center and mitigate active cloud sessions. How do you proceed?',
    options: [
      {
        id: 'opt-a',
        label: 'Notify 24/7 Hotline via Personal Mobile Phone',
        correct: true,
        reason: 'Correct Protocol! Out-of-band communication prevents alerting the adversary who may have active C2 listeners on your compromised workstation.',
        scoreDelta: 50,
      },
      {
        id: 'opt-b',
        label: 'Re-enable Wi-Fi to send a Slack/Teams message',
        correct: false,
        reason: 'Dangerous! Reconnecting the machine allows the ransomware worm to resume lateral movement across adjacent server shares.',
        scoreDelta: -20,
      }
    ]
  }
];

export default function ContainmentSim() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentStep = DRILL_STEPS[currentStepIndex];

  const handleSelectOption = (option) => {
    const updatedChoices = [...userChoices, option];
    const newScore = Math.max(0, score + option.scoreDelta);
    setUserChoices(updatedChoices);
    setScore(newScore);

    if (currentStepIndex < DRILL_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCompleted(true);
      if (newScore >= 80) {
        try {
          confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.8 },
            colors: ['#00E5FF', '#10B981', '#F59E0B']
          });
        } catch {}
      }
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setUserChoices([]);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-3.5 font-mono text-xs">
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center space-x-2 text-rose-400">
          <Siren className="w-4 h-4 animate-pulse" />
          <span className="font-semibold tracking-wider uppercase">[ACTIVE_INCIDENT_DRILL // TABLETOP]</span>
        </div>
        <div className="text-[11px] text-neutral-400">
          RAM INTEGRITY SCORE: <span className="text-cyan-400 font-bold">{score}/100</span>
        </div>
      </div>

      {!completed ? (
        <div className="bg-black/80 rounded-xl border border-white/10 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>STEP {currentStep.step} OF {DRILL_STEPS.length}</span>
            <span className="text-amber-400 font-bold">RESPONSE SLA: &lt; 15 MIN</span>
          </div>

          <h4 className="text-sm font-semibold text-neutral-100 font-sans">{currentStep.title}</h4>
          <p className="text-xs text-neutral-300 font-sans leading-relaxed bg-neutral-900/60 p-2.5 rounded-lg border border-white/5">
            {currentStep.scenario}
          </p>

          <div className="space-y-2 pt-1 font-sans">
            {currentStep.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className="w-full text-left p-3 rounded-lg border border-white/10 bg-neutral-900/80 hover:bg-neutral-800/90 hover:border-cyan-500/40 text-neutral-200 text-xs transition-all flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results screen */
        <div className="bg-black/80 rounded-xl border border-white/10 p-4 space-y-3.5 animate-fade-in font-sans">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="font-mono text-sm font-bold text-neutral-100">
                TABLETOP DRILL COMPLETED
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold ${
              score >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {score >= 80 ? 'FORENSIC EXPERT PASS' : 'NEEDS SOP REVIEW'}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {userChoices.map((choice, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/5 space-y-1">
                <div className="flex items-center space-x-1.5">
                  {choice.correct ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  )}
                  <span className={choice.correct ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                    Stage {i + 1}: {choice.label}
                  </span>
                </div>
                <p className="text-[11px] font-sans text-neutral-400 pl-5">
                  {choice.reason}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-xs">
            <span className="text-neutral-400">Incident Readiness XP: <span className="text-emerald-400 font-bold">+100 XP</span></span>
            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RE-RUN DRILL</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
