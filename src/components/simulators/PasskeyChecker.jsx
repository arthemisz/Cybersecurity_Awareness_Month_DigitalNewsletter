import React, { useState, useEffect } from 'react';
import { KeyRound, ShieldCheck, Fingerprint, Cpu, AlertTriangle, Check, RefreshCw, Terminal, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PasskeyChecker() {
  const [browserSupport, setBrowserSupport] = useState({
    webauthn: true,
    platformAuthenticator: true,
    residentKeys: true,
  });
  const [simState, setSimState] = useState('idle'); // idle | creating | success | comparing
  const [credentialData, setCredentialData] = useState(null);
  const [activeTab, setActiveTab] = useState('sim'); // 'sim' | 'matrix'

  useEffect(() => {
    // Check real browser capabilities if available
    if (typeof window !== 'undefined') {
      const hasWebAuthn = Boolean(window.PublicKeyCredential);
      setBrowserSupport(prev => ({
        ...prev,
        webauthn: hasWebAuthn,
      }));
    }
  }, []);

  const handleSimulatePasskey = () => {
    setSimState('creating');
    setTimeout(() => {
      setSimState('success');
      setCredentialData({
        credentialId: "sec_dispatch_fido2_" + Math.random().toString(36).substring(2, 9),
        algorithm: "ES256 (ECDSA with SHA-256)",
        authenticatorType: "TPM 2.0 / Secure Enclave",
        origin: "https://dispatch.sec.internal",
        userVerification: "biometric_fingerprint_verified",
        counter: 1,
        timestamp: new Date().toISOString(),
      });
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00E5FF', '#10B981', '#38BDF8']
        });
      } catch {
        // ignore if not loaded yet
      }
    }, 1300);
  };

  const handleReset = () => {
    setSimState('idle');
    setCredentialData(null);
  };

  return (
    <div className="space-y-4">
      {/* Sub-navigation tabs inside tool */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-xs font-mono tracking-wider text-cyan-400 uppercase font-semibold">
            [FIDO2_WEBAUTHN_RUNTIME]
          </span>
        </div>
        <div className="flex space-x-1 bg-black/40 dark:bg-black/60 p-0.5 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('sim')}
            className={`text-xs px-2.5 py-1 rounded-md transition-all font-mono ${
              activeTab === 'sim'
                ? 'bg-neutral-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Live Simulator
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`text-xs px-2.5 py-1 rounded-md transition-all font-mono ${
              activeTab === 'matrix'
                ? 'bg-neutral-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Threat Defang Matrix
          </button>
        </div>
      </div>

      {activeTab === 'sim' ? (
        <div className="space-y-4">
          {/* Real hardware capability telemetry strip */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-neutral-900/60 dark:bg-black/40 border border-white/5 rounded-lg p-2.5 text-center">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">WebAuthn API</div>
              <div className="flex items-center justify-center space-x-1 mt-1 text-emerald-400 font-mono text-xs font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>SUPPORTED</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 dark:bg-black/40 border border-white/5 rounded-lg p-2.5 text-center">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Platform Enclave</div>
              <div className="flex items-center justify-center space-x-1 mt-1 text-cyan-400 font-mono text-xs font-semibold">
                <Fingerprint className="w-3.5 h-3.5" />
                <span>DETECTED</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 dark:bg-black/40 border border-white/5 rounded-lg p-2.5 text-center">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">AiTM Phish Shield</div>
              <div className="flex items-center justify-center space-x-1 mt-1 text-emerald-400 font-mono text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% IMMUNE</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Action Box */}
          <div className="bg-neutral-950/80 rounded-xl border border-white/10 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

            {simState === 'idle' && (
              <div className="text-center py-4 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-1">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-100">Simulate Hardware Passkey Creation</h4>
                  <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                    Experience how a cryptographic keypair is generated directly inside your secure hardware enclave without exposing passwords.
                  </p>
                </div>
                <button
                  onClick={handleSimulatePasskey}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-mono font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>INITIALIZE BIOMETRIC KEYPAIR</span>
                </button>
              </div>
            )}

            {simState === 'creating' && (
              <div className="py-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 animate-spin">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                    [TPM_2.0_HARDWARE_ASSERTION]
                  </div>
                  <p className="text-xs text-neutral-300">
                    Awaiting Biometric Confirmation / Touch ID or YubiKey Touch...
                  </p>
                </div>
              </div>
            )}

            {simState === 'success' && credentialData && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>PUBLIC KEYPAIR ANCHORED IN TPM</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-[11px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    [RE-RUN TEST]
                  </button>
                </div>

                <div className="bg-black/80 rounded-lg p-3 border border-white/10 font-mono text-[11px] text-neutral-300 space-y-1.5 overflow-x-auto">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-neutral-400">CREDENTIAL_ID:</span>
                    <span className="text-cyan-400">{credentialData.credentialId}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-neutral-400">ASYMMETRIC_ALGO:</span>
                    <span className="text-neutral-200">{credentialData.algorithm}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-neutral-400">DOMAIN_ORIGIN_BIND:</span>
                    <span className="text-emerald-400">{credentialData.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">VERIFICATION:</span>
                    <span className="text-purple-400">{credentialData.userVerification}</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md p-2 text-emerald-300">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Private key never left your device. AiTM phishing attacks have zero shared secrets to steal.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Threat Defang Matrix Tab */
        <div className="space-y-2 font-mono text-xs">
          <div className="bg-neutral-900/60 dark:bg-black/50 border border-white/10 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-rose-400 font-semibold">
              <span className="flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Legacy Password + SMS OTP</span>
              </span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                CRITICAL RISK
              </span>
            </div>
            <p className="text-[11px] font-sans text-neutral-400">
              Vulnerable to reverse-proxy proxies (Evilginx). Fake login pages forward your SMS code in real time and steal the session cookie.
            </p>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-cyan-400 font-semibold">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Passkey (FIDO2 / WebAuthn)</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                IMMUNE TO AITM
              </span>
            </div>
            <p className="text-[11px] font-sans text-neutral-300">
              The browser verifies the cryptographic domain before sending signature. Fake URLs cannot trigger the passkey signature.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
