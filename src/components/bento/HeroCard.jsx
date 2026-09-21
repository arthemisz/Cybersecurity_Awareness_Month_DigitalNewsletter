import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Volume2, Copy, Check, Sparkles, Shield, Bookmark } from 'lucide-react';

export default function HeroCard({ week, onOpenReader }) {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopySummary = (e) => {
    e.stopPropagation();
    const textToCopy = `SEC_DISPATCH // ${week.tag}\nTitle: ${week.title}\nExecutive Summary: ${week.summary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleAudio = (e) => {
    e.stopPropagation();
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div
      onClick={onOpenReader}
      className="group relative cursor-pointer md:col-span-2 rounded-2xl bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-black/10 p-6 md:p-8 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-0.5 shadow-godly overflow-hidden"
    >
      {/* Subtle ambient radial gradient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hairline subtle top highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        
        {/* Top metadata tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 dark:border-white/5 light:border-black/5 pb-4">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 border border-cyan-500/30">
              [{week.tag}]
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
              {week.kicker}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
            <span className="inline-flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>[{week.readTime}]</span>
            </span>
            <span className="text-neutral-600 dark:text-neutral-600 light:text-neutral-300">•</span>
            <span className="text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-semibold">
              {week.dateRange}
            </span>
          </div>
        </div>

        {/* Master Editorial Title & Subtitle */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-normal text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-cyan-200 dark:group-hover:text-cyan-200 light:group-hover:text-cyan-900 transition-colors" style={{ fontStretch: 'normal', letterSpacing: 'normal', transform: 'none' }}>
            {week.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-600 leading-relaxed font-serif max-w-3xl" style={{ fontStretch: 'normal', letterSpacing: 'normal', lineHeight: 1.5 }}>
            {week.subtitle}
          </p>
        </div>

        {/* Executive summary quote box */}
        <div className="bg-black/40 dark:bg-black/40 light:bg-neutral-50 rounded-xl p-4 border border-white/5 dark:border-white/5 light:border-black/5 text-xs text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-sans leading-relaxed">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXECUTIVE INTELLIGENCE SUMMARY:</span>
          </div>
          <p>{week.summary}</p>
        </div>

        {/* Action strip at bottom */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenReader}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-900 text-white text-xs font-mono font-semibold transition-all hover:bg-neutral-700 dark:hover:bg-neutral-700 group/btn"
            >
              <span>READ FULL DISPATCH</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={handleToggleAudio}
              className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                isPlayingAudio
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-black/30 dark:bg-black/30 light:bg-neutral-100 text-neutral-400 dark:text-neutral-400 light:text-neutral-700 border-white/5 hover:text-neutral-200'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-cyan-400' : ''}`} />
              <span>{isPlayingAudio ? 'STREAMING...' : `AUDIO // ${week.audioDuration}`}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-neutral-200 dark:hover:text-neutral-200 hover:bg-white/5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">COPIED BRIEF</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Brief</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
