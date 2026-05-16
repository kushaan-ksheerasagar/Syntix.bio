'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Server, Shield, Terminal, Share2, LogOut,
  LayoutDashboard, Globe, Building2, Key, FlaskConical,
  ChevronRight, CheckCircle2, Clock, XCircle, Dna
} from 'lucide-react';
import Link from 'next/link';

// ─── Types ─────────────────────────────────────────────────────────────────────

type ActiveTab = 'analytics' | 'marketplace' | 'licenses' | 'compute';

// ─── Nav ───────────────────────────────────────────────────────────────────────

const NAV: { key: ActiveTab; icon: React.ElementType; label: string }[] = [
  { key: 'analytics',   icon: LayoutDashboard, label: 'Analytics'       },
  { key: 'marketplace', icon: Database,        label: 'Data Marketplace' },
  { key: 'licenses',    icon: Key,             label: 'Active Licenses'  },
  { key: 'compute',     icon: Terminal,        label: 'Active Compute'   },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, color = 'text-indigo' }: { label: string; value: string; sub: string; color?: string }) => (
  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-600 mt-1">{sub}</p>
  </div>
);

// ─── Analytics Tab ─────────────────────────────────────────────────────────────

const BiomarkerHeatmap = () => (
  <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/[0.07] rounded-2xl p-6 h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
        <Globe size={12} className="text-indigo"/> Global Biomarker Heatmap
      </div>
      <span className="text-xs text-indigo bg-indigo/10 border border-indigo/20 px-2 py-1 rounded">Anonymized Feed</span>
    </div>
    <div className="flex-1 relative flex items-center justify-center border border-white/[0.05] rounded-xl bg-white/[0.02] overflow-hidden min-h-[260px]">
      <div className="absolute inset-0 opacity-15 bg-gradient-to-tr from-indigo/40 via-transparent to-biomarker/30"/>
      {[
        { top: '28%', left: '38%', size: 'w-28 h-28', color: 'bg-indigo/40',    dur: 3   },
        { top: '58%', left: '18%', size: 'w-36 h-36', color: 'bg-indigo/25',    dur: 4.2 },
        { top: '38%', right: '28%',size: 'w-24 h-24', color: 'bg-biomarker/30', dur: 2.8 },
        { top: '70%', right: '15%',size: 'w-20 h-20', color: 'bg-indigo/35',    dur: 5   },
      ].map((n, i) => (
        <motion.div key={i}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: n.dur, repeat: Infinity, delay: i * 0.7 }}
          className={`absolute ${n.size} ${n.color} rounded-full blur-2xl`}
          style={{ top: n.top, left: (n as any).left, right: (n as any).right }}
        />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-4">
        <p className="text-white font-semibold text-base mb-1 drop-shadow-lg">North America Data Cluster</p>
        <p className="text-gray-400 text-xs drop-shadow-md">1.2M Active Nodes · 450 TB Encrypted Storage</p>
        <div className="flex gap-4 mt-3 text-xs">
          <span className="text-indigo">EU: 340k nodes</span>
          <span className="text-biomarker">APAC: 210k nodes</span>
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard label="Datasets Accessed" value="14"      sub="FHE computations run"    color="text-indigo"/>
      <StatCard label="Active Licenses"   value="3"       sub="via Ethereum IP-NFT"     color="text-biomarker"/>
      <StatCard label="Insights Delivered" value="1,204"  sub="ZK-verified results"     color="text-white"/>
      <StatCard label="Spend This Month"  value="0.42 ETH" sub="Network usage fees"     color="text-indigo"/>

    </div>
    <div className="h-[320px]">
      <BiomarkerHeatmap/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: 'Most Requested Trait', value: 'CYP2D6 Metabolism', icon: Dna,         color: 'text-biomarker' },
        { label: 'Avg Compute Latency',  value: '8.3 ms',            icon: Server,      color: 'text-indigo'    },
        { label: 'Compliance Status',    value: 'HIPAA · GDPR',      icon: Shield,      color: 'text-green-400' },
      ].map((s, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
            <s.icon size={16} className={s.color}/>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</p>
            <p className={`font-bold mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Data Marketplace Tab ──────────────────────────────────────────────────────

interface Dataset {
  id: string; name: string; size: string; tags: string[];
  guardians: number; price: string; category: string;
}

const DATASETS: Dataset[] = [
  { id: 'DS-001', name: 'Whole Genome Sequencing — Diverse Cohort',  size: '2.4 TB', tags: ['WGS','Ancestry','PRS'],      guardians: 412,  price: '0.12 ETH',  category: 'Genomics'        },
  { id: 'DS-002', name: 'Pharmacogenomics — CPIC Level A/B Panel',   size: '180 GB', tags: ['PGx','Drug Response'],       guardians: 889,  price: '0.04 ETH',  category: 'Pharmacogenomics'},
  { id: 'DS-003', name: 'Metabolic Biomarker Longitudinal Study',    size: '94 GB',  tags: ['Metabolomics','Glucose'],     guardians: 2140, price: '0.08 ETH',  category: 'Metabolomics'    },
  { id: 'DS-004', name: 'Neurodegenerative Variant Dataset',          size: '310 GB', tags: ['Alzheimer\'s','APOE'],       guardians: 673,  price: '0.15 ETH',  category: 'Neurology'       },
  { id: 'DS-005', name: 'Cardiovascular Polygenic Risk Scores',       size: '45 GB',  tags: ['PRS','CAD','AFib'],         guardians: 3201, price: '0.03 ETH',  category: 'Cardiovascular'  },

];

const MarketplaceTab = () => {
  const [requestDs, setRequestDs] = useState<Dataset | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = DATASETS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setRequestDs(null); setSubmitted(false); }, 3000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search datasets by name or tag..."
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo/50 transition-colors"
        />
        <span className="text-xs text-gray-500">{filtered.length} datasets</span>
      </div>

      <div className="space-y-3">
        {filtered.map((ds) => (
          <div key={ds.id} className="group bg-white/[0.02] border border-white/[0.06] hover:border-indigo/25 rounded-xl p-5 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo/10 border border-indigo/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Database size={15} className="text-indigo"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{ds.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{ds.id} · {ds.size} · {ds.guardians.toLocaleString()} guardians</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-indigo font-bold text-sm">{ds.price}</p>
                    <p className="text-xs text-gray-600">/ access</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {ds.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider text-indigo border border-indigo/25 bg-indigo/[0.08] px-2 py-0.5 rounded">{t}</span>
                  ))}
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 border border-white/10 px-2 py-0.5 rounded">{ds.category}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Shield size={11} className="text-green-400"/> FHE Encrypted · ZK Verified · Ethereum PIL

              </div>
              <button
                onClick={() => setRequestDs(ds)}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo border border-indigo/30 bg-indigo/[0.08] hover:bg-indigo/[0.18] px-4 py-1.5 rounded-lg transition-all"
              >
                Request License <ChevronRight size={11}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* License Request Modal */}
      <AnimatePresence>
        {requestDs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { if (!submitted) setRequestDs(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#080c14] border border-white/[0.1] rounded-2xl p-6 shadow-2xl"
            >
              {!submitted ? (
                <>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Programmable IP License Request</p>
                      <h3 className="text-lg font-semibold text-white">{requestDs.name}</h3>
                    </div>
                    <button onClick={() => setRequestDs(null)} className="text-gray-500 hover:text-white transition-colors ml-3">
                      <XCircle size={18}/>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Research Scope</label>
                      <textarea required rows={2} placeholder="Describe the specific analysis you intend to run..." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo/50 transition-colors resize-none"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">License Duration</label>
                        <select required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors">
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="365">1 year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Output Type</label>
                        <select required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors">
                          <option>Statistical Aggregates</option>
                          <option>Individual ZK Insights</option>
                          <option>Population-Level PRS</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Biomarkers Requested</label>
                      <input type="text" placeholder="e.g. CYP2D6, HbA1c, APOE ε4..." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo/50 transition-colors"/>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-500 bg-indigo/[0.05] border border-indigo/15 rounded-xl p-3">
                      <Shield size={12} className="text-indigo mt-0.5 flex-shrink-0"/>
                      All computation runs under FHE. Raw genomic data is never decrypted or transmitted to your institution. Each guardian must individually approve your request on-chain.
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button type="button" onClick={() => setRequestDs(null)} className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                        Cancel
                      </button>
                      <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo hover:bg-indigo/80 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        Submit PIL Request · {requestDs.price}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8 gap-4"
                >
                  <CheckCircle2 size={48} className="text-indigo"/>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Request Submitted</h3>
                    <p className="text-gray-400 text-sm">Your PIL request has been sent to all {requestDs.guardians.toLocaleString()} guardians for on-chain approval. You'll be notified when quorum is reached.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Active Licenses Tab ───────────────────────────────────────────────────────

const LicensesTab = () => {
  const licenses = [
    { name: 'Metabolic Syndrome Study Q3',   provider: 'Stanford Protocol',  status: 'Processing FHE',    cost: '0.08 ETH', expires: '2026-07-12', progress: 65 },
    { name: 'Longevity Gene Mapping',         provider: 'Global Node Pool',   status: 'Active Access',     cost: '0.12 ETH', expires: '2026-08-30', progress: 100},
    { name: 'Neurodegenerative Analysis',     provider: 'Oxford Biobank',     status: 'Awaiting Approval', cost: '0.15 ETH', expires: '—',          progress: 20 },

  ];

  const statusIcon = (s: string) => {
    if (s === 'Active Access')     return <CheckCircle2 size={13} className="text-green-400"/>;
    if (s === 'Processing FHE')    return <Clock size={13} className="text-indigo"/>;
    return <Clock size={13} className="text-yellow-400"/>;
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active"    value="1"  sub="Full access granted"  color="text-green-400"/>
        <StatCard label="Processing" value="1" sub="FHE compute running"  color="text-indigo"/>
        <StatCard label="Pending"   value="1"  sub="Guardian approval"    color="text-yellow-400"/>
      </div>

      {licenses.map((l, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{l.name}</p>
              <p className="text-xs text-gray-500 mt-1">{l.provider} · Expires: {l.expires}</p>
            </div>
            <div className="flex items-center gap-2 text-xs flex-shrink-0">
              {statusIcon(l.status)}
              <span className={
                l.status === 'Active Access'     ? 'text-green-400' :
                l.status === 'Processing FHE'    ? 'text-indigo' :
                'text-yellow-400'
              }>{l.status}</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo to-biomarker"
              initial={{ width: 0 }}
              animate={{ width: `${l.progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Access progress: {l.progress}%</span>
            <span className="text-indigo font-bold">{l.cost}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Active Compute Tab ────────────────────────────────────────────────────────

const ComputeTab = () => {
  const [logs] = useState([
    { time: '08:14:22', text: 'Node pool selected: 12 × H100 (Blind Compute)',    type: 'info'   },
    { time: '08:14:23', text: 'Dispatching FHE workload — Metabolic Cohort Q3...',type: 'info'   },
    { time: '08:14:27', text: 'Partial result received: aggregated_HbA1c = OK',   type: 'result' },
    { time: '08:14:31', text: 'Verifying ZK-SNARK proof for node batch #4...',    type: 'info'   },
    { time: '08:14:34', text: 'Proof valid · Groth16 · 0x8f12...44c3',           type: 'result' },
    { time: '08:14:38', text: 'BAA auto-generated and logged on Ethereum.', type: 'result' },

  ]);

  const jobs = [
    { name: 'Metabolic Cohort Q3',   nodes: 12, pct: 74, eta: '~3 min' },
    { name: 'APOE Variant Screening', nodes: 6, pct: 31, eta: '~9 min' },
  ];

  return (
    <div className="space-y-5">
      {jobs.map((j, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-indigo"/>
              <span className="text-sm font-medium text-white">{j.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{j.nodes} H100 nodes</span>
              <span className="text-indigo font-medium">ETA {j.eta}</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo to-biomarker"
              animate={{ width: [`${j.pct - 3}%`, `${j.pct}%`] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
          </div>
          <p className="text-right text-xs text-gray-600 mt-1.5">{j.pct}% complete</p>
        </div>
      ))}

      <div className="bg-[#060810]/90 backdrop-blur-md border border-white/[0.07] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
            <Terminal size={12} className="text-indigo"/> FHE Compute Log
          </div>
          <div className="flex gap-1.5">
            {['bg-red-500/40','bg-yellow-500/40','bg-green-500/40'].map((c) => <span key={c} className={`w-2 h-2 rounded-full ${c}`}/>)}
          </div>
        </div>
        <div className="space-y-2.5 text-xs">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-indigo shrink-0">[{log.time}]</span>
              <span className={log.type === 'result' ? 'text-biomarker' : 'text-gray-400'}>{log.text}</span>
            </div>
          ))}
          <div className="flex gap-3 text-gray-600 animate-pulse">
            <span className="text-indigo shrink-0">[{new Date().toTimeString().split(' ')[0]}]</span>
            <span>Streaming next batch...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function InstituteDashboard() {
  const [active, setActive] = useState<ActiveTab>('analytics');

  return (
    <div className="min-h-screen bg-hero flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-60 border-r border-white/[0.05] bg-black/50 backdrop-blur-xl hidden md:flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/[0.05]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-indigo/20 blur-md rounded-full"/>
              <Building2 className="w-full h-full text-indigo relative z-10"/>
            </div>
            <span className="font-extrabold tracking-[0.15em] text-base">SYNTIX</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <p className="px-3 py-2 text-xs text-gray-600 uppercase tracking-widest">Institutional Node</p>
          {NAV.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === key
                  ? 'bg-indigo/10 text-white border border-indigo/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon size={16} className={active === key ? 'text-indigo' : ''} strokeWidth={1.6}/>
              {label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/[0.05]">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm">
            <LogOut size={16} strokeWidth={1.6}/> Disconnect Node
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-5 lg:px-10 py-8">
          {/* Header */}
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {active === 'analytics'   && 'Curator Analytics'}
                {active === 'marketplace' && 'Data Marketplace'}
                {active === 'licenses'    && 'Active IP Licenses'}
                {active === 'compute'     && 'Active FHE Compute'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {active === 'analytics'   && 'Ethical Access & Distributed Compute Monitoring'}
                {active === 'marketplace' && 'Browse and license anonymized genomic datasets'}
                {active === 'licenses'    && 'Programmable IP Licenses via Ethereum'}

                {active === 'compute'     && 'Live FHE workloads across distributed H100 nodes'}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-full text-xs">
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-indigo"/>
              Node Status: Validated
            </div>
          </header>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {active === 'analytics'   && <AnalyticsTab/>}
              {active === 'marketplace' && <MarketplaceTab/>}
              {active === 'licenses'    && <LicensesTab/>}
              {active === 'compute'     && <ComputeTab/>}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
