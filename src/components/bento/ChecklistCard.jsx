import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Award, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ChecklistCard({ week, onChecklistCompleted }) {
  const storageKey = `sec_dispatch_checklist_${week.id}`;

  const [checkedIds, setCheckedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Re-sync if week changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setCheckedIds(saved ? JSON.parse(saved) : []);
    } catch {
      setCheckedIds([]);
    }
  }, [week.id]);

  const toggleItem = (itemId, xp) => {
    const isChecked = checkedIds.includes(itemId);
    let updated;
    if (isChecked) {
      updated = checkedIds.filter(id => id !== itemId);
    } else {
      updated = [...checkedIds, itemId];
    }
    setCheckedIds(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {}

    // If all completed, celebrate!
    if (!isChecked && updated.length === week.checklist.length) {
      if (onChecklistCompleted) onChecklistCompleted(week.id);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#00E5FF', '#10B981', '#F59E0B']
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  };

  const completedCount = checkedIds.length;
  const totalCount = week.checklist.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const totalXp = week.checklist.reduce((acc, curr) => acc + (checkedIds.includes(curr.id) ? curr.xp : 0), 0);

  return (
    <div className="rounded-2xl bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-black/10 p-6 md:p-7 transition-all duration-200 hover:border-cyan-500/30 shadow-godly flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 dark:border-white/5 light:border-black/5 pb-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <CheckSquare className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-mono font-semibold text-neutral-300 dark:text-neutral-300 light:text-neutral-800 uppercase tracking-wider">
              WEEKLY DEFENDER CHECKLIST
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-emerald-400 font-bold">{completedCount}/{totalCount} DONE</span>
            {completedCount > 0 && (
              <button
                onClick={handleReset}
                title="Reset checklist"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
            <span>WEEKLY PROGRESS</span>
            <span className="text-cyan-400 font-semibold">{percent}% COMPLETE ({totalXp} XP)</span>
          </div>
          <div className="w-full bg-black/40 dark:bg-black/40 light:bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Interactive Checkbox Items */}
        <div className="space-y-2.5">
          {week.checklist.map((item) => {
            const isDone = checkedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id, item.xp)}
                className={`group cursor-pointer p-3 rounded-xl border transition-all select-none flex items-start space-x-3 ${
                  isDone
                    ? 'bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50/60 border-emerald-500/30'
                    : 'bg-black/40 dark:bg-black/40 light:bg-neutral-50 border-white/5 dark:border-white/5 light:border-black/5 hover:border-white/20 dark:hover:border-white/20'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isDone ? (
                    <div className="w-4 h-4 rounded bg-emerald-500 text-black flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded border border-neutral-600 dark:border-neutral-600 light:border-neutral-400 group-hover:border-cyan-400 transition-colors" />
                  )}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${
                      isDone
                        ? 'line-through text-neutral-400 dark:text-neutral-400 light:text-neutral-500'
                        : 'text-neutral-200 dark:text-neutral-200 light:text-neutral-900 group-hover:text-cyan-300 transition-colors'
                    }`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.2 rounded">
                      +{item.xp} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-400 light:text-neutral-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion status celebration banner */}
      <div className="mt-4 pt-3 border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between text-[11px] font-mono">
        {percent === 100 ? (
          <span className="text-emerald-400 font-semibold flex items-center space-x-1.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WEEK COMPLETED // BADGE UNLOCKED</span>
          </span>
        ) : (
          <span className="text-neutral-500">COMPLETE ALL 3 TO VERIFY WEEKLY COMPLIANCE</span>
        )}
        <span className="text-neutral-400 font-semibold">{totalXp} / 250 XP</span>
      </div>
    </div>
  );
}
