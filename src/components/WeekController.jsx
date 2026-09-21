import React from 'react';
import { Lock, CheckCircle2, ChevronRight, Sparkles, Clock } from 'lucide-react';

export default function WeekController({
  weeks,
  activeWeekId,
  onSelectWeek,
  completedWeeks = [],
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-2xl pointer-events-none">
      <nav
        aria-label="Campaign Timeline Controller"
        className="pointer-events-auto mx-auto backdrop-blur-2xl bg-neutral-950/85 dark:bg-neutral-950/85 light:bg-white/90 border border-neutral-800/80 dark:border-neutral-800/80 light:border-black/10 rounded-full p-1.5 shadow-godly transition-all duration-300"
      >
        <div className="flex items-center justify-between space-x-1 sm:space-x-1.5">
          {weeks.map((week) => {
            const isActive = week.id === activeWeekId;
            const isCompleted = completedWeeks.includes(week.id);
            const isCurrentActive = week.status === 'active';

            return (
              <button
                key={week.id}
                onClick={() => onSelectWeek(week.id)}
                className={`relative group flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-mono transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? 'bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-900 text-white font-semibold shadow-inner'
                    : 'text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-neutral-200 dark:hover:text-neutral-200 light:hover:text-neutral-900 hover:bg-neutral-900/60 dark:hover:bg-neutral-900/60 light:hover:bg-neutral-100'
                }`}
              >
                {/* Visual state indicator */}
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : isCurrentActive ? (
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                ) : (
                  <Clock className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                )}

                {/* Week Label */}
                <span className="hidden sm:inline whitespace-nowrap">
                  {week.dockLabel}
                </span>
                <span className="sm:hidden font-mono">
                  W{week.weekNumber}
                </span>

                {/* Micro status badge or upcoming tag */}
                {isActive && (
                  <span className="hidden md:inline-block text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    LIVE
                  </span>
                )}

                {/* Subtle active glow pill underlay */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-cyan-500/30 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
