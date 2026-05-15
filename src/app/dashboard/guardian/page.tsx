'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Database, Shield, Lock, Fingerprint, Terminal,
  FileCode2, Share2, LogOut, LayoutDashboard, Dna,
  Wallet, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { GenomeAnalyzer } from '@/components/dashboard/GenomeAnalyzer';
import { GuardianNav }   from '@/components/dashboard/GuardianNav';
import { SettingsPanel } from '@/components/dashboard/SettingsPanel';

// ─── Demo wallet ──────────────────────────────────────────────────────────────

const DEMO_WALLET = '0x7f2a918c4D3B91a3';

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

type ActiveTab = 'overview' | 'analyser' | 'vault' | 'royalties';

const NAV_ITEMS: { key: ActiveTab; icon: React.ElementType; label: string }[] = [
  { key: 'overview',  icon: LayoutDashboard, label: 'Overview'       },
  { key: 'analyser',  icon: Dna,             label: 'Genome Analyser'},
  { key: 'vault',     icon: Database,        label: 'IP-NFT Vault'   },
  { key: 'royalties', icon: Wallet,          label: 'Royalties'      },
];

// ─── Sentinel Score ───────────────────────────────────────────────────────────

const SentinelScore = () => (
  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 flex flex-col items-center justify-center relative overflow-hidden">
    <p className="text-xs text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-1.5">
      <Activity size={12} className="text-biomarker" /> Sentinel Score
    </p>
    <div className="relative w-44 h-44 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF"/>
            <stop offset="100%" stopColor="#818CF8"/>
          </linearGradient>
        </defs>
        <motion.circle
          cx="50" cy="50" r="44" fill="none"
          stroke="url(#sg)" strokeWidth="4"
          strokeDasharray="276"
          initial={{ strokeDashoffset: 276 }}
          animate={{ strokeDashoffset: 55 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(0,229,255,0.4)' }}>92</span>
        <span className="text-xs text-gray-500 mt-1">/100</span>
      </div>
    </div>
    <div className="mt-5 flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/[0.07]">
      <Lock size={10} className="text-biomarker"/> Computed via FHE (Encrypted)
    </div>
  </div>
);

// ─── Blind Compute Feed ───────────────────────────────────────────────────────

const BlindComputeFeed = () => {
  const [logs, setLogs] = React.useState([
    { time: '01:24:05', text: 'Encrypting Biomarker: Glucose_Level...', type: 'info'    },
    { time: '01:24:06', text: 'Computing Risk Assessment (FHE Mode)...', type: 'info'   },
    { time: '01:24:07', text: 'Result: Metabolic_Stability = High.',      type: 'result' },
  ]);

  React.useEffect(() => {
    const messages = [
      { text: 'Verifying ZKP parameters...', type: 'info' },
      { text: 'Fetching IP-NFT constraints from Story Protocol...', type: 'info' },
      { text: 'Running Secure Multi-Party Computation...', type: 'info' },
      { text: 'Result: Biomarker matches normative baseline.', type: 'result' },
      { text: 'Proof sealed — Groth16 ZK-SNARK written on-chain.', type: 'result' },
    ];
    const iv = setInterval(() => {
      setLogs((prev) => {
        const next = prev.length > 6 ? prev.slice(1) : prev;
        const t = new Date().toTimeString().split(' ')[0];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        return [...next, { time: t, ...msg }];
      });
    }, 3800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="bg-[#060810]/90 backdrop-blur-md border border-white/[0.07] rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-biomarker/30 to-transparent"/>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
          <Terminal size={12} className="text-biomarker"/> Live Blind Computation
        </div>
        <div className="flex gap-1.5">
          {['bg-red-500/40','bg-yellow-500/40','bg-green-500/40'].map((c) => <span key={c} className={`w-2 h-2 rounded-full ${c}`}/>)}
        </div>
      </div>
      <div className="flex-1 overflow-hidden space-y-2.5 text-xs">
        {logs.map((log, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
            <span className="text-indigo shrink-0">[{log.time}]</span>
            <span className={log.type === 'result' ? 'text-biomarker' : 'text-gray-400'}>{log.text}</span>
          </motion.div>
        ))}
        <div className="flex gap-3 text-gray-600 animate-pulse">
          <span className="text-indigo shrink-0">[{new Date().toTimeString().split(' ')[0]}]</span>
          <span>Awaiting next compute cycle...</span>
        </div>
      </div>
    </div>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, color = 'text-biomarker' }: { label: string; value: string; sub: string; color?: string }) => (
  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-600 mt-1">{sub}</p>
  </div>
);

// ─── IP-NFT Vault Tab ─────────────────────────────────────────────────────────

const IPNFTVaultTab = () => {
  const assets = [
    { name: 'Genomic Sequence (WGS)',  id: '0x7F...3B92', type: 'DNA',      status: 'Active',  royalty: '12%', earnings: '0.14 ETH' },
    { name: 'Metabolic Profile Q1',    id: '0x4A...9C11', type: 'Blood',    status: 'Active',  royalty: '8%',  earnings: '0.07 ETH' },
    { name: 'Longitudinal EHR Data',   id: '0x9B...2D44', type: 'Clinical', status: 'Locked',  royalty: '—',   earnings: '—'        },
    { name: 'Genome Analysis Report',  id: '0x3E...F710', type: 'Report',   status: 'Pending', royalty: '15%', earnings: '—'        },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">IP-NFT Vault</h2>
        <span className="text-xs text-gray-500 border border-white/10 px-3 py-1 rounded-full">Powered by Story Protocol</span>
      </div>
      <div className="space-y-3">
        {assets.map((a, i) => (
          <div key={i} className="group bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] rounded-xl p-4 transition-all flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
              <FileCode2 size={17} className={a.type === 'DNA' ? 'text-biomarker' : 'text-indigo'}/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{a.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                <span>{a.id}</span><span className="w-px h-3 bg-white/10"/>
                <span className={a.status === 'Active' ? 'text-green-400' : a.status === 'Pending' ? 'text-yellow-400' : 'text-gray-500'}>{a.status}</span>
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <div className="text-right"><p className="text-xs text-gray-500">Royalty</p><p className="text-white font-medium">{a.royalty}</p></div>
              <div className="text-right"><p className="text-xs text-gray-500">Earned</p><p className="text-biomarker font-medium">{a.earnings}</p></div>
            </div>
            <button className="ml-2 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/25 px-3 py-2 rounded-lg transition-all">
              <Share2 size={12}/> License
            </button>
          </div>
        ))}
      </div>
      <div className="bg-biomarker/[0.04] border border-biomarker/15 rounded-xl p-4 flex items-center gap-3">
        <Shield size={15} className="text-biomarker flex-shrink-0"/>
        <p className="text-xs text-gray-400">All assets managed by SYNTIX HSM custody. Decryption keys never leave your device.</p>
      </div>
    </div>
  );
};

// ─── Royalties Tab ────────────────────────────────────────────────────────────

const RoyaltiesTab = () => {
  const events = [
    { date: '2026-05-06', from: 'Stanford Genomics Lab',   amount: '0.08 ETH', type: 'WGS License'    },
    { date: '2026-05-04', from: 'Oxford Biobank Research', amount: '0.04 ETH', type: 'Metabolic Data' },
    { date: '2026-04-28', from: 'Novartis Pharma AG',      amount: '0.02 ETH', type: 'PGx Profile'    },
    { date: '2026-04-20', from: 'MIT Media Lab — BioHub',  amount: '0.07 ETH', type: 'WGS License'    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Total Earned"    value="0.21 ETH" sub="≈ $672 USD"         color="text-biomarker"/>
        <StatCard label="Active Licenses" value="2"        sub="3 datasets licensed" color="text-indigo"/>
        <StatCard label="Pending Payouts" value="0.04 ETH" sub="Expected in 2 days"  color="text-white"/>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-widest">Payment History</h3>
        <div className="space-y-2.5">
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-biomarker/10 border border-biomarker/20 flex items-center justify-center flex-shrink-0">
                <Wallet size={13} className="text-biomarker"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{e.from}</p>
                <p className="text-xs text-gray-500">{e.date} · {e.type}</p>
              </div>
              <span className="text-biomarker font-bold text-sm">+{e.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Overview Tab ─────────────────────────────────────────────────────────────

const OverviewTab = ({ onGoToAnalyser }: { onGoToAnalyser: () => void }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard label="Datasets Protected" value="3"       sub="IP-NFTs minted"        color="text-biomarker"/>
      <StatCard label="Sentinel Score"     value="92"      sub="/100 biological health" color="text-biomarker"/>
      <StatCard label="Total Royalties"    value="0.21 ETH" sub="Lifetime earnings"     color="text-indigo"/>
      <StatCard label="ZK Proofs"          value="847"     sub="Verifications on-chain" color="text-white"/>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <SentinelScore/>
      <BlindComputeFeed/>
    </div>
    <button
      onClick={onGoToAnalyser}
      className="w-full flex items-center justify-between bg-biomarker/[0.05] border border-biomarker/20 hover:border-biomarker/40 hover:bg-biomarker/[0.09] rounded-xl px-6 py-4 transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-biomarker/10 border border-biomarker/20 flex items-center justify-center">
          <Dna size={15} className="text-biomarker"/>
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white">Run Genome Analysis</p>
          <p className="text-xs text-gray-500">Upload VCF → FHE encrypt → ancestry · traits · PGx · risk scores · AI report</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-500 group-hover:text-biomarker group-hover:translate-x-1 transition-all"/>
    </button>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GuardianDashboard() {
  const [active, setActive]         = useState<ActiveTab>('overview');
  const [settingsOpen, setSettings] = useState(false);

  const PAGE_TITLES: Record<ActiveTab, { h1: string; sub: string }> = {
    overview:  { h1: 'Biological Intelligence',         sub: 'Guardian Node · FHE Encrypted Compute' },
    analyser:  { h1: 'Genome Analyser',                 sub: 'VCF → FHE → Ancestry · Traits · PGx · PRS · AI Report' },
    vault:     { h1: 'IP-NFT Vault',                    sub: 'Sovereign Biological IP on Story Protocol' },
    royalties: { h1: 'Royalty Dashboard',               sub: 'On-chain royalty payments from licensed datasets' },
  };

  return (
    <div className="min-h-screen bg-hero flex flex-col text-white font-sans">

      {/* ── Authenticated Nav ── */}
      <GuardianNav
        walletAddress={DEMO_WALLET}
        onSettingsOpen={() => setSettings(true)}
      />

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-56 border-r border-white/[0.05] bg-black/50 backdrop-blur-xl hidden md:flex flex-col flex-shrink-0">
          <nav className="flex-1 p-3 space-y-1 pt-4">
            <p className="px-3 py-2 text-xs text-gray-600 uppercase tracking-widest">Command Center</p>
            {NAV_ITEMS.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active === key
                    ? 'bg-biomarker/10 text-white border border-biomarker/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon size={16} className={active === key ? 'text-biomarker' : ''} strokeWidth={1.6}/>
                {label}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-white/[0.05]">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm">
              <LogOut size={16} strokeWidth={1.6}/> Disconnect
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 lg:px-10 py-8">

            <header className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{PAGE_TITLES[active].h1}</h1>
                <p className="text-gray-500 text-sm mt-1">{PAGE_TITLES[active].sub}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-full text-xs">
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-biomarker"/>
                Guardian · Verified
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {active === 'overview'  && <OverviewTab onGoToAnalyser={() => setActive('analyser')}/>}
                {active === 'analyser'  && <GenomeAnalyzer/>}
                {active === 'vault'     && <IPNFTVaultTab/>}
                {active === 'royalties' && <RoyaltiesTab/>}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* ── Settings Panel (slide-in) ── */}
      <SettingsPanel open={settingsOpen} onClose={() => setSettings(false)} />
    </div>
  );
}
