import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Printer, Shield, BookOpen, Clock, AlertTriangle, ArrowRight, Download, Terminal } from 'lucide-react';

export default function DispatchReaderModal({ week, isOpen, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !week) return null;

  const editorial = week.editorial;

  const handleCopyCode = () => {
    if (!editorial?.codeSnippet) return;
    navigator.clipboard.writeText(editorial.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyFullArticle = () => {
    const fullText = `SEC_DISPATCH // 2026\nWeek ${week.weekNumber}: ${week.title}\nAuthor: ${editorial.author}\nDate: ${editorial.publishedAt}\n\nOverview:\n${editorial.overview}\n\nKey Principles:\n${editorial.corePrinciples.join('\n')}\n\nActionable Protocol:\n${editorial.actionableProtocol.join('\n')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-neutral-950 dark:bg-neutral-950 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-black/15 shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 dark:border-white/10 light:border-black/10 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 border border-cyan-500/30">
              [{week.tag}]
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-neutral-400">
              {editorial?.classification || 'ENTERPRISE INTELLIGENCE DISPATCH'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyFullArticle}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 text-xs font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-800 transition-colors"
            >
              {copiedBrief ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Brief</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 dark:hover:text-neutral-100 light:text-neutral-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Editorial Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 md:px-12 py-8 space-y-8 font-sans">
          
          {/* Article Header */}
          <div className="space-y-4 border-b border-white/10 dark:border-white/10 light:border-black/10 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="text-cyan-400 font-semibold">{editorial?.author}</span>
              <span>•</span>
              <span>{editorial?.publishedAt}</span>
              <span>•</span>
              <span>[{week.readTime}]</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
              {week.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans max-w-3xl">
              {week.subtitle}
            </p>
          </div>

          {/* Overview text */}
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              // THREAT CONTEXT & ARCHITECTURAL OVERVIEW
            </h3>
            <p className="text-neutral-300 dark:text-neutral-300 light:text-neutral-700 text-base leading-relaxed">
              {editorial?.overview}
            </p>
          </div>

          {/* Threat Vectors Cards */}
          {editorial?.threatVectors && (
            <div className="space-y-3.5 max-w-3xl">
              <h3 className="text-sm font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>// PRIMARY EXPLOITATION VECTORS (2026 TELEMETRY)</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {editorial.threatVectors.map((vec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-50 border border-white/5 dark:border-white/5 light:border-black/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                        {vec.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                        RISK: {vec.risk}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 leading-relaxed">
                      {vec.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Architectural Principles */}
          {editorial?.corePrinciples && (
            <div className="space-y-3 max-w-3xl">
              <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                // CORE DEFENSIVE DOCTRINES
              </h3>
              <ul className="space-y-2">
                {editorial.corePrinciples.map((prin, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed">
                    <span className="text-cyan-400 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                    <span>{prin}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code or Protocol Snippet */}
          {editorial?.codeSnippet && (
            <div className="space-y-2 max-w-3xl font-mono">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center space-x-1.5 text-neutral-300">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{editorial.codeSnippet.title}</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black border border-white/10 text-xs text-neutral-300 overflow-x-auto leading-relaxed">
                <pre>{editorial.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Actionable Protocol Checklist for Employee */}
          {editorial?.actionableProtocol && (
            <div className="p-5 rounded-xl bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50 border border-emerald-500/30 space-y-3 max-w-3xl">
              <h4 className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>// MANDATORY EMPLOYEE DEFENSE RUNBOOK:</span>
              </h4>
              <ul className="space-y-2 text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-800 leading-relaxed">
                {editorial.actionableProtocol.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 dark:border-white/10 light:border-black/10 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-50 flex items-center justify-between flex-shrink-0 text-xs font-mono">
          <span className="text-neutral-500">
            OFFICIAL SECURITY BULLETIN // NIST SP 800-63B COMPLIANT
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors font-semibold"
          >
            DISMISS BRIEF
          </button>
        </div>

      </div>
    </div>
  );
}
