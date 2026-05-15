'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ─────────────────────────────────────────────────────────────────────

type SettingsTab = 'privacy' | 'biowallet';

interface NodePermission {
  id: string;
  name: string;
  type: string;
  since: string;
  active: boolean;
}

// ─── Initial state ─────────────────────────────────────────────────────────────

const INITIAL_NODES: NodePermission[] = [
  { id: 'n1', name: 'Stanford Genomics Lab',   type: 'Research Institution', since: '2026-02-14', active: true  },
  { id: 'n2', name: 'Oxford Biobank Research', type: 'Academic Medical',     since: '2026-03-07', active: true  },
  { id: 'n3', name: 'Novartis Pharma AG',      type: 'Pharmaceutical',       since: '2026-04-01', active: false },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const Toggle = ({ value, onChange, color = '#00E5FF' }: { value: boolean; onChange: (v: boolean) => void; color?: string }) => (
  <button
    role="switch"
    aria-checked={value}
    onClick={() => onChange(!value)}
    className={`relative w-10 h-5.5 rounded-full flex-shrink-0 transition-all duration-300 ${value ? 'bg-biomarker/20 border-biomarker/40' : 'bg-white/[0.06] border-white/10'} border`}
    style={value ? { backgroundColor: `${color}18`, borderColor: `${color}50` } : {}}
  >
    <motion.span
      animate={{ x: value ? '22px' : '2px' }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      className="absolute top-[3px] w-[14px] h-[14px] rounded-full"
      style={{ backgroundColor: value ? color : '#4B5563' }}
    />
  </button>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[9px] uppercase tracking-[0.28em] text-gray-600 mb-3">{children}</p>
);

// ─── Privacy & Security Tab ───────────────────────────────────────────────────

const PrivacyTab = () => {
  const [encMode, setEncMode] = useState<'fhe' | 'hybrid'>('fhe');
  const [nodes, setNodes] = useState<NodePermission[]>(INITIAL_NODES);
  const [killActive, setKillActive] = useState(false);
  const [killConfirm, setKillConfirm] = useState(false);
  const [killed, setKilled] = useState(false);

  const toggleNode = (id: string) =>
    setNodes((prev) => prev.map((n) => n.id === id ? { ...n, active: !n.active } : n));

  const handleKill = () => {
    if (!killConfirm) { setKillConfirm(true); return; }
    setKillActive(true);
    setTimeout(() => {
      setNodes((prev) => prev.map((n) => ({ ...n, active: false })));
      setKilled(true);
      setKillActive(false);
      setKillConfirm(false);
    }, 1800);
  };

  return (
    <div className="space-y-8">

      {/* ── Encryption Level ── */}
      <div>
        <SectionLabel>Encryption Level</SectionLabel>
        <div className="space-y-2.5">
          {([
            { key: 'fhe', label: 'Full FHE', sub: 'Maximum privacy · TFHE-rs 128-bit · ~10ms latency', badge: 'Max Privacy', color: '#00E5FF' },
            { key: 'hybrid', label: 'Hybrid ZKP', sub: 'Fast queries · Groth16 ZK-SNARK · ~3ms latency', badge: 'Balanced', color: '#6366F1' },
          ] as const).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setEncMode(opt.key)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                encMode === opt.key
                  ? 'border-white/[0.12] bg-white/[0.04]'
                  : 'border-white/[0.06] bg-transparent hover:border-white/[0.09]'
              }`}
            >
              {/* Radio */}
              <span
                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                style={encMode === opt.key
                  ? { borderColor: opt.color, boxShadow: `0 0 0 3px ${opt.color}20` }
                  : { borderColor: '#374151' }}
              >
                {encMode === opt.key && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: opt.color }} />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-white">{opt.label}</span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border"
                    style={{ color: opt.color, borderColor: `${opt.color}30`, backgroundColor: `${opt.color}10` }}>
                    {opt.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-light">{opt.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Node Permissions ── */}
      <div>
        <SectionLabel>Compute-to-Data Node Permissions</SectionLabel>
        <div className="space-y-2">
          {nodes.map((node) => (
            <div key={node.id}
              className="flex items-center gap-4 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.09] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="3" width="11" height="9" rx="1.5" stroke={node.active ? '#6366F1' : '#4B5563'} strokeWidth="1.2"/>
                  <path d="M4 3V2a2.5 2.5 0 015 0v1" stroke={node.active ? '#6366F1' : '#4B5563'} strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{node.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">{node.type} · Since {node.since}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] uppercase tracking-wider ${node.active ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {node.active ? 'Active' : 'Revoked'}
                </span>
                <Toggle value={node.active} onChange={() => toggleNode(node.id)} color="#6366F1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Kill Switch ── */}
      <div>
        <SectionLabel>Emergency Kill Switch</SectionLabel>
        <div className={`p-5 rounded-xl border transition-all duration-300 ${
          killed ? 'border-emerald-500/30 bg-emerald-500/[0.04]' :
          killConfirm ? 'border-red-500/40 bg-red-500/[0.06]' :
          'border-white/[0.07] bg-white/[0.02]'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors ${
              killed ? 'border-emerald-500/30 bg-emerald-500/10' :
              killConfirm ? 'border-red-500/40 bg-red-500/10' :
              'border-white/[0.07] bg-white/[0.03]'
            }`}>
              {killed ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v4M4.5 4.5l2 2" stroke={killConfirm ? '#EF4444' : '#6B7280'} strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="7" cy="8.5" r="4" stroke={killConfirm ? '#EF4444' : '#6B7280'} strokeWidth="1.3"/>
                </svg>
              )}
            </div>
            <div className="flex-1">
              {killed ? (
                <>
                  <p className="text-sm font-semibold text-emerald-400 mb-1">All Licenses Revoked</p>
                  <p className="text-xs text-gray-500 font-light">Revocation committed on-chain. All node permissions cleared. IP-NFT vault remains intact — only compute access was terminated.</p>
                </>
              ) : (
                <>
                  <p className={`text-sm font-semibold mb-1 ${killConfirm ? 'text-red-400' : 'text-white'}`}>
                    {killConfirm ? 'Confirm: Revoke ALL active licenses?' : 'Revoke All Data Licenses'}
                  </p>
                  <p className="text-xs text-gray-500 font-light mb-4">
                    {killConfirm
                      ? 'This will instantly terminate all active Compute-to-Data sessions and commit revocation on-chain. This cannot be undone — labs must re-apply.'
                      : 'Instantly invalidates all active IP-NFT licenses across all nodes. Committed on-chain within 1 block (~2s). IP-NFT vault remains intact.'}
                  </p>
                  <button
                    onClick={handleKill}
                    disabled={killActive}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                      killConfirm
                        ? 'bg-red-500 text-white hover:bg-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : 'border border-white/10 bg-white/[0.04] text-gray-400 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/[0.06]'
                    }`}
                  >
                    {killActive ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Revoking on-chain...
                      </span>
                    ) : killConfirm ? (
                      'Confirm Kill Switch'
                    ) : (
                      <>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M5.5 1v3M3 3l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                          <circle cx="5.5" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                        Activate Kill Switch
                      </>
                    )}
                  </button>
                  {killConfirm && (
                    <button onClick={() => setKillConfirm(false)}
                      className="ml-3 text-xs text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-4 decoration-white/20">
                      Cancel
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── BioWallet Tab ────────────────────────────────────────────────────────────

const BioWalletTab = () => {
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => { setExporting(false); setExported(true); setTimeout(() => setExported(false), 3000); }, 2200);
  };

  return (
    <div className="space-y-8">

      {/* ── Phenotypic Metadata ── */}
      <div>
        <SectionLabel>Biological Metadata Context</SectionLabel>
        <p className="text-xs text-gray-600 font-light mb-4 leading-relaxed">
          Phenotypic data enriches your genomic profile in the Schema Validator, improving PGx accuracy. Encrypted locally before submission.
        </p>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Age',           type: 'number', placeholder: 'e.g. 28'  },
              { label: 'Biological Sex',type: 'text',   placeholder: 'M / F / X' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-[10px] uppercase tracking-widest text-gray-600 mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-biomarker/40 transition-colors"/>
              </div>
            ))}
          </div>
          {[
            { label: 'Dietary Pattern',    placeholder: 'Mediterranean / Vegan / Omnivore / Ketogenic'    },
            { label: 'Exercise Frequency', placeholder: 'Sedentary / Light / Moderate / High'             },
            { label: 'Known Conditions',   placeholder: 'e.g. T2D, Hypertension — encrypted at rest'     },
            { label: 'Current Medications',placeholder: 'e.g. Metformin, Atorvastatin — for PGx context' },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-[10px] uppercase tracking-widest text-gray-600 mb-1.5">{f.label}</label>
              <input type="text" placeholder={f.placeholder}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-biomarker/40 transition-colors"/>
            </div>
          ))}

          <button type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-biomarker/10 border border-biomarker/25 text-biomarker text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-biomarker/[0.18] transition-all">
            {saved ? (
              <><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Saved</>
            ) : (
              <>Encrypt & Save Metadata</>
            )}
          </button>
        </form>
      </div>

      {/* ── Key Management ── */}
      <div>
        <SectionLabel>Encryption Key Management</SectionLabel>
        <div className="space-y-3">
          {/* Custody mode */}
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-white">Custody Mode</span>
              <span className="text-xs text-biomarker border border-biomarker/25 bg-biomarker/[0.08] px-2 py-0.5 rounded">SYNTIX HSM</span>
            </div>
            <p className="text-xs text-gray-600 font-light">Your FHE encryption keys are managed by SYNTIX Hardware Security Modules. Switch to self-custody to take full control.</p>
          </div>

          {/* Export */}
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <p className="text-sm font-medium text-white mb-1">Export Private Keys</p>
            <p className="text-xs text-gray-600 font-light mb-4">Export your FHE encryption keypair for self-custody. Store offline in a hardware wallet. SYNTIX will retain no copy.</p>
            <button onClick={handleExport} disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/[0.03] text-gray-300 text-xs font-medium uppercase tracking-widest rounded-lg hover:border-white/25 hover:text-white transition-all">
              {exporting ? (
                <><span className="w-3 h-3 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"/> Generating encrypted export...</>
              ) : exported ? (
                <><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> <span className="text-emerald-400">Keys exported securely</span></>
              ) : (
                <><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v6M2.5 5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 9h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Export Encrypted Keypair</>
              )}
            </button>
          </div>

          {/* Shred keys */}
          <div className="p-4 bg-red-500/[0.03] border border-red-500/15 rounded-xl">
            <p className="text-sm font-medium text-red-400/80 mb-1">GDPR Cryptographic Shredding</p>
            <p className="text-xs text-gray-600 font-light">Permanently destroys all FHE decryption keys. Your encrypted data becomes mathematically irretrievable — full GDPR Article 17 compliance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Panel ───────────────────────────────────────────────────────────────

export const SettingsPanel = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [tab, setTab] = useState<SettingsTab>('privacy');

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#070b13] border-l border-white/[0.07] flex flex-col shadow-[−24px_0_80px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div>
                <h2 className="text-white font-semibold">Guardian Settings</h2>
                <p className="text-gray-600 text-xs mt-0.5">Privacy, security & BioWallet management</p>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/[0.14] transition-all">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pt-4 pb-0">
              {([
                { key: 'privacy',   label: 'Privacy & Security' },
                { key: 'biowallet', label: 'BioWallet'          },
              ] as const).map((t) => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex-1 py-2 text-xs font-medium uppercase tracking-widest rounded-lg transition-all ${
                    tab === t.key
                      ? 'bg-white/[0.06] text-white border border-white/[0.1]'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                <motion.div key={tab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}>
                  {tab === 'privacy'   && <PrivacyTab />}
                  {tab === 'biowallet' && <BioWalletTab />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/[0.05] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-biomarker flex-shrink-0" />
              <span className="text-[10px] text-gray-700 uppercase tracking-widest">HIPAA 45 CFR §164.312 · 21 CFR Part 11 Compliant</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
