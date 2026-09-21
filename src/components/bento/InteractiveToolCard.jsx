import React from 'react';
import { Terminal, Sparkles, Wrench } from 'lucide-react';
import PasskeyChecker from '../simulators/PasskeyChecker';
import HeaderInspector from '../simulators/HeaderInspector';
import CveAuditTool from '../simulators/CveAuditTool';
import ContainmentSim from '../simulators/ContainmentSim';

export default function InteractiveToolCard({ week }) {
  const renderSimulator = () => {
    switch (week.simulator?.type) {
      case 'passkey-checker':
        return <PasskeyChecker />;
      case 'header-inspector':
        return <HeaderInspector />;
      case 'cve-audit':
        return <CveAuditTool />;
      case 'containment-sim':
        return <ContainmentSim />;
      default:
        return <PasskeyChecker />;
    }
  };

  return (
    <div className="rounded-2xl bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-black/10 p-6 md:p-7 transition-all duration-200 hover:border-cyan-500/30 shadow-godly flex flex-col justify-between">
      <div>
        {/* Tool Header */}
        <div className="flex items-center justify-between border-b border-white/5 dark:border-white/5 light:border-black/5 pb-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Wrench className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-mono font-semibold text-neutral-300 dark:text-neutral-300 light:text-neutral-800 uppercase tracking-wider">
              {week.simulator?.badge || 'INTERACTIVE SIMULATOR'}
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            READY TO RUN
          </span>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            {week.simulator?.title}
          </h3>
          <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1 font-sans">
            {week.simulator?.description}
          </p>
        </div>

        {/* Dynamic Simulator Runtime */}
        <div className="mt-2">
          {renderSimulator()}
        </div>
      </div>

      {/* Micro-footer note */}
      <div className="mt-4 pt-3 border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <span>RUNS LOCALLY IN-BROWSER</span>
        <span className="text-cyan-400/80">// SEC_SIM_V2.6</span>
      </div>
    </div>
  );
}
