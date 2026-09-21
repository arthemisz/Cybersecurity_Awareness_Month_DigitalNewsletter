import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Search, Sun, Moon, BellRing, Sparkles, Radio } from 'lucide-react';

export default function Header({
  isDark,
  onToggleTheme,
  onOpenRegister,
  onOpenSearch,
  enrolledCount,
}) {
  const [currentTime, setCurrentTime] = useState({ utc: '', eat: '' });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      
      // UTC time
      const utcString = now.toISOString().substring(11, 19) + ' UTC';
      
      // EAT is UTC+3
      const eatDate = new Date(now.getTime() + 3 * 3600 * 1000);
      const eatHours = String(eatDate.getUTCHours()).padStart(2, '0');
      const eatMinutes = String(eatDate.getUTCMinutes()).padStart(2, '0');
      const eatSeconds = String(eatDate.getUTCSeconds()).padStart(2, '0');
      const eatString = `${eatHours}:${eatMinutes}:${eatSeconds} EAT`;

      setCurrentTime({ utc: utcString, eat: eatString });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0A0A0C]/85 dark:bg-[#0A0A0C]/85 light:bg-white/90 border-b border-white/10 dark:border-white/10 light:border-black/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Minimalist Logo + System Monospace Callout */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-white/15 dark:border-white/15 light:border-black/10 shadow-sm group">
            <Shield className="w-5 h-5 text-cyan-400 transition-transform group-hover:scale-110" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-sm tracking-wider text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                SEC_DISPATCH
              </span>
              <span className="text-cyan-400 font-mono text-xs">// 2026</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-neutral-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>CAMPAIGN ACTIVE</span>
              <span className="text-neutral-600 dark:text-neutral-600 light:text-neutral-300">•</span>
              <span className="hidden sm:inline">OCTOBER DEFENSE HUB</span>
            </div>
          </div>
        </div>

        {/* Center: Live UTC/EAT Timestamp Readout (Godly Precision Aesthetic) */}
        <div className="hidden md:flex items-center space-x-3 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-100 px-3.5 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-black/5 text-xs font-mono">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse-subtle" />
          <div className="flex items-center space-x-2 text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
            <span className="text-cyan-300 font-semibold">{currentTime.utc || '00:00:00 UTC'}</span>
            <span className="text-neutral-600 dark:text-neutral-600 light:text-neutral-400">|</span>
            <span className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600">{currentTime.eat || '00:00:00 EAT'}</span>
          </div>
        </div>

        {/* Right: Search trigger, Theme switcher, and Registration modal trigger */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Search / Filter Command Palette Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200 border border-white/10 dark:border-white/10 light:border-black/10 text-neutral-400 hover:text-neutral-200 dark:hover:text-neutral-200 light:text-neutral-600 transition-all text-xs font-mono"
            title="Search Campaign Dispatches (Ctrl+K / Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-black/40 dark:bg-black/40 light:bg-neutral-300 border border-white/10 text-[10px] text-neutral-400 dark:text-neutral-400 light:text-neutral-700">
              ⌘K
            </kbd>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-200 border border-white/10 dark:border-white/10 light:border-black/10 text-neutral-400 hover:text-neutral-200 dark:hover:text-neutral-200 light:text-neutral-700 transition-all"
            aria-label="Toggle visual theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Register Modal Trigger Button */}
          <button
            onClick={onOpenRegister}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 text-xs font-mono font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-glow-cyan"
          >
            <BellRing className="w-3.5 h-3.5 text-cyan-400 animate-bounce" style={{ animationDuration: '2.5s' }} />
            <span className="hidden sm:inline">Register Dispatch</span>
            <span className="sm:hidden">Join</span>
          </button>
        </div>

      </div>
    </header>
  );
}
