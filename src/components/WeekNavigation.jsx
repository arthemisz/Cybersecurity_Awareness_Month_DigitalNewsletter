import React, { useState } from 'react';

/**
 * WeekNavigation
 *
 * Sharp, high-craft editorial/technical navigation bar inspired by
 * Linear, Raycast, and Shopify Editions. Replaces rounded pill shapes
 * with micro-radius rectangular containers, monospace index tags,
 * and an architectural terminal-style telemetry badge.
 */
export default function WeekNavigation({
  weeks = [
    { id: 'week-1', number: 1, label: 'Week 1', navLabel: 'Week 1 — Identity' },
    { id: 'week-2', number: 2, label: 'Week 2', navLabel: 'Week 2 — Deception' },
    { id: 'week-3', number: 3, label: 'Week 3', navLabel: 'Week 3 — Systems' },
    { id: 'week-4', number: 4, label: 'Week 4', navLabel: 'Week 4 — Response' },
  ],
  activeSection = 'week-1',
  onSelectSection,
  showRegister = true,
  className = '',
}) {
  const [internalActive, setInternalActive] = useState(activeSection);
  const currentActive = onSelectSection ? activeSection : internalActive;

  const handleSelect = (id) => {
    if (onSelectSection) {
      onSelectSection(id);
    } else {
      setInternalActive(id);
    }
  };

  return (
    <nav
      aria-label="Campaign Week Navigation"
      className={`w-full bg-[#09090b] text-neutral-200 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        {/* 1. Week Navigation Tabs (Top Left) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          {weeks.map((week, idx) => {
            const isActive = currentActive === week.id;
            const indexNumber = week.number ?? idx + 1;
            const formattedIndex = String(indexNumber).padStart(2, '0');

            return (
              <button
                key={week.id}
                type="button"
                onClick={() => handleSelect(week.id)}
                aria-pressed={isActive}
                className={`group flex items-center rounded-sm border px-3 py-1.5 backdrop-blur-md transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'border-white/30 bg-white/[0.08] text-white shadow-sm'
                    : 'border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {/* Monospace Index Tag */}
                <span
                  className={`font-mono text-[10px] tracking-wider mr-2 transition-colors ${
                    isActive
                      ? 'text-sky-400 bg-sky-400/10 px-1 py-0.5 border border-sky-400/30'
                      : 'text-neutral-500 group-hover:text-neutral-400'
                  }`}
                >
                  [{formattedIndex}]
                </span>

                {/* Neo-grotesque Tab Label */}
                <span className="font-sans text-xs font-medium tracking-tight whitespace-nowrap">
                  {week.navLabel || week.label || `Week ${indexNumber}`}
                </span>
              </button>
            );
          })}

          {showRegister && (
            <button
              type="button"
              onClick={() => handleSelect('register')}
              aria-pressed={currentActive === 'register'}
              className={`group flex items-center rounded-sm border px-3 py-1.5 backdrop-blur-md transition-all duration-150 cursor-pointer ${
                currentActive === 'register'
                  ? 'border-white/30 bg-white/[0.08] text-white shadow-sm'
                  : 'border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <span
                className={`font-mono text-[10px] tracking-wider mr-2 transition-colors ${
                  currentActive === 'register'
                    ? 'text-sky-400 bg-sky-400/10 px-1 py-0.5 border border-sky-400/30'
                    : 'text-neutral-500 group-hover:text-neutral-400'
                }`}
              >
                [REG]
              </span>
              <span className="font-sans text-xs font-medium tracking-tight whitespace-nowrap">
                Register Free
              </span>
            </button>
          )}
        </div>

        {/* 2. Technical Telemetry Status Indicator (Top Right) */}
        <div className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/[0.04] px-2.5 py-1 rounded-none font-mono text-[10px] tracking-widest uppercase text-emerald-400 shrink-0 ml-4">
          <span className="w-1.5 h-1.5 bg-emerald-400/80 inline-block rotate-45" />
          <span>LIVE // 4-WEEK STREAM</span>
        </div>
      </div>
    </nav>
  );
}
