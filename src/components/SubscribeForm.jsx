import React, { useState, useCallback } from 'react';

/**
 * SubscribeForm — Resend-backed email registration component.
 *
 * Posts to /api/subscribe (Next.js API route) and handles
 * idle → loading → success | error states with inline feedback.
 *
 * Props:
 *  - apiUrl?: string  — override the default endpoint (defaults to '/api/subscribe')
 *  - onSuccess?: (email: string) => void  — callback after successful registration
 */

// ── RFC 5322 email regex (mirrors server-side validation) ───────────────────
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function SubscribeForm({ apiUrl = '/api/subscribe', onSuccess }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');   // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const trimmed = email.trim().toLowerCase();

      // Client-side validation
      if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
        setStatus('error');
        setErrorMsg('Enter a valid email address.');
        return;
      }

      setStatus('loading');
      setErrorMsg('');

      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed (${res.status})`);
        }

        setStatus('success');
        if (onSuccess) onSuccess(trimmed);
      } catch (err) {
        setStatus('error');
        setErrorMsg(err.message || 'Something went wrong. Please try again.');
      }
    },
    [email, apiUrl, onSuccess]
  );

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        {/* Checkmark ring */}
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="font-mono text-sm font-semibold text-neutral-100 mb-1">
          DISPATCH CONFIRMED
        </p>
        <p className="text-xs text-neutral-400 max-w-xs">
          Week 1 — <span className="text-amber-400">Identity & Passkeys</span> — has been sent to{' '}
          <span className="text-neutral-200 font-medium">{email}</span>.
        </p>
      </div>
    );
  }

  // ── Form state (idle / loading / error) ───────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-3">
      {/* Email input */}
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="operative@enterprise.internal"
          disabled={status === 'loading'}
          autoComplete="email"
          className={`
            w-full px-4 py-3 rounded-lg
            bg-neutral-900 border
            font-mono text-sm text-neutral-200
            placeholder:text-neutral-600
            focus:outline-none focus:ring-1
            transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              status === 'error'
                ? 'border-red-500/60 focus:ring-red-500/40'
                : 'border-white/10 focus:ring-amber-500/40'
            }
          `}
        />
      </div>

      {/* Error feedback */}
      {status === 'error' && errorMsg && (
        <p className="text-xs font-mono text-red-400 pl-1">
          ⚠ {errorMsg}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="
          w-full py-3 rounded-lg
          bg-amber-500 hover:bg-amber-400
          text-black font-mono font-bold text-xs tracking-wider
          transition-all
          flex items-center justify-center gap-2
          disabled:opacity-60 disabled:cursor-not-allowed
          shadow-[0_0_20px_rgba(245,166,35,0.15)]
          hover:shadow-[0_0_30px_rgba(245,166,35,0.25)]
        "
      >
        {status === 'loading' ? (
          <>
            {/* Spinner */}
            <svg
              className="animate-spin h-4 w-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>DISPATCHING...</span>
          </>
        ) : (
          <span>SUBSCRIBE — RECEIVE WEEK 1</span>
        )}
      </button>

      {/* Fine print */}
      <p className="text-[11px] text-neutral-500 text-center font-mono leading-relaxed">
        Four emails in October. No sales, no tracking. Unsubscribe any time.
      </p>
    </form>
  );
}
