import React from 'react';
import { TrendingUp, BarChart3, Info } from 'lucide-react';

export default function StatCard({ week }) {
  const stat = week.stat;

  return (
    <div className="rounded-2xl bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-black/10 p-6 md:p-7 transition-all duration-200 hover:border-cyan-500/30 shadow-godly flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 dark:border-white/5 light:border-black/5 pb-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400">
              <BarChart3 className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-mono font-semibold text-neutral-300 dark:text-neutral-300 light:text-neutral-800 uppercase tracking-wider">
              CORE RISK TELEMETRY
            </span>
          </div>

          <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>{stat.change}</span>
          </span>
        </div>

        {/* Big Impact Number */}
        <div className="space-y-1 mb-4">
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 font-sans">
            {stat.primaryValue}
          </div>
          <div className="text-sm font-semibold text-cyan-400 dark:text-cyan-400 light:text-cyan-700 font-sans">
            {stat.label}
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-sans leading-relaxed pt-1">
            {stat.subtext}
          </p>
        </div>

        {/* Breakdown Meters */}
        {stat.metricBreakdown && (
          <div className="space-y-2.5 pt-3 border-t border-white/5 dark:border-white/5 light:border-black/5">
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              DEFENSIVE POSTURE COMPARISON:
            </div>
            {stat.metricBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-300 dark:text-neutral-300 light:text-neutral-700">{item.name}</span>
                  <span className={`${item.color} font-semibold`}>{item.status}</span>
                </div>
                <div className="w-full bg-black/40 dark:bg-black/40 light:bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.risk < 20 ? 'bg-emerald-400' : item.risk < 50 ? 'bg-amber-400' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.max(5, item.risk)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span className="flex items-center space-x-1">
          <Info className="w-3 h-3 text-cyan-400/70" />
          <span>VERIFIED BY CISA & ENISA</span>
        </span>
        <span>OCT 2026 BENCHMARK</span>
      </div>
    </div>
  );
}
