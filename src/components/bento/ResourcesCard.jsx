import React, { useState } from 'react';
import { Download, FileText, Check, ExternalLink, Terminal, ShieldAlert } from 'lucide-react';

export default function ResourcesCard({ week }) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadedIds, setDownloadedIds] = useState([]);

  const handleDownload = (res) => {
    setDownloadingId(res.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => [...prev, res.id]);

      // Create a simulated text/markdown download blob
      const content = `# SEC_DISPATCH // 2026 ARCHIVE\nAsset: ${res.title}\nCode: ${res.code}\nFormat: ${res.format}\nWeek: ${week.title}\n\nSecurity Notice:\nThis operational security artifact is issued under Cybersecurity Awareness Month 2026 enterprise defense protocols.\nAll procedures must be enacted strictly in accordance with Zero Trust standards.\n\n[AUTHENTICATION SIGNATURE: SHA256: 9b2d8f93a1c847e30d7b]`;
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${res.code.toLowerCase().replace(/[^a-z0-9]/g, '-')}-brief.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <div className="rounded-2xl bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-black/10 p-6 md:p-7 transition-all duration-200 hover:border-cyan-500/30 shadow-godly flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 dark:border-white/5 light:border-black/5 pb-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-purple-500/10 text-purple-400">
              <Download className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-mono font-semibold text-neutral-300 dark:text-neutral-300 light:text-neutral-800 uppercase tracking-wider">
              FIELD TOOLKITS & RUNBOOKS
            </span>
          </div>

          <span className="text-[10px] font-mono text-neutral-400">
            OFFICIAL ARTIFACTS
          </span>
        </div>

        <div className="mb-3">
          <h3 className="text-base font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Downloadable Defensive SOPs
          </h3>
          <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1 font-sans">
            One-page field manuals, terminal snippets, and tabletop incident guides for {week.shortTitle}.
          </p>
        </div>

        {/* Resource Items */}
        <div className="space-y-2.5">
          {week.resources.map((res) => {
            const isDownloading = downloadingId === res.id;
            const isDownloaded = downloadedIds.includes(res.id);

            return (
              <div
                key={res.id}
                className="p-3 rounded-xl bg-black/40 dark:bg-black/40 light:bg-neutral-50 border border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between group hover:border-white/15 dark:hover:border-white/15 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 text-cyan-400 flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-900 group-hover:text-cyan-300 transition-colors">
                      {res.title}
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400 mt-0.5">
                      <span>[{res.code}]</span>
                      <span>•</span>
                      <span className="text-neutral-400">{res.format}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(res)}
                  disabled={isDownloading}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isDownloaded
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 text-neutral-200 dark:text-neutral-200 light:text-neutral-800 border border-white/10 dark:border-white/10'
                  }`}
                >
                  {isDownloading ? (
                    <span className="text-[10px]">PACKAGING...</span>
                  ) : isDownloaded ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px]">SAVED</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3 text-neutral-400 group-hover:text-cyan-400" />
                      <span className="text-[10px]">GET</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span>GPG VERIFIED // ENCRYPTED SHA-256</span>
        <span className="text-cyan-400/80">3 ARTIFACTS AVAILABLE</span>
      </div>
    </div>
  );
}
