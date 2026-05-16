'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type AnalysisStage =
  | 'idle'
  | 'encrypting'
  | 'parsing'
  | 'ancestry'
  | 'traits'
  | 'pgx'
  | 'prs'
  | 'report'
  | 'done';

type ResultTab = 'ancestry' | 'traits' | 'pgx' | 'prs' | 'report';

interface AncestryEntry { pop: string; label: string; pct: number; color: string }
interface TraitEntry    { category: string; trait: string; effect: string; direction: 'high' | 'low' | 'neutral' }
interface PgxEntry      { gene: string; drug: string; status: string; level: 'A' | 'B'; phenotype: string; action: string }
interface PrsEntry      { condition: string; percentile: number; zscore: string; id: string; color: string }

// ─── Mock data ─────────────────────────────────────────────────────────────────

const ANCESTRY: AncestryEntry[] = [
  { pop: 'EUR', label: 'European',        pct: 64, color: '#00E5FF' },
  { pop: 'EAS', label: 'East Asian',      pct: 19, color: '#6366F1' },
  { pop: 'AFR', label: 'African',         pct: 9,  color: '#8B5CF6' },
  { pop: 'AMR', label: 'Admixed American',pct: 5,  color: '#06B6D4' },
  { pop: 'SAS', label: 'South Asian',     pct: 3,  color: '#0EA5E9' },
];

const TRAITS: TraitEntry[] = [
  { category: 'Metabolism',   trait: 'Caffeine Metabolism',        effect: 'Fast metabolizer — lower ADR risk',         direction: 'high'    },
  { category: 'Metabolism',   trait: 'Lactose Tolerance',          effect: 'Persistent lactase production',             direction: 'high'    },
  { category: 'Nutrition',    trait: 'Omega-3 Uptake Efficiency',  effect: 'Moderate DHA conversion from ALA',          direction: 'neutral' },
  { category: 'Nutrition',    trait: 'Vitamin D Binding',          effect: 'Reduced serum Vit-D — supplementation rec.', direction: 'low'    },
  { category: 'Athletic',     trait: 'VO₂ Max Potential',          effect: 'Above-average aerobic endurance capacity',  direction: 'high'    },
  { category: 'Athletic',     trait: 'Muscle Fiber Composition',   effect: 'Slight fast-twitch predominance',           direction: 'high'    },
  { category: 'Neurology',    trait: 'BDNF Neuroplasticity',       effect: 'Met/Val — moderate stress-resilience',      direction: 'neutral' },
  { category: 'Sleep',        trait: 'Circadian Chronotype',       effect: 'Morning chronotype (CLOCK gene)',           direction: 'high'    },
  { category: 'Cardiovascular',trait: 'HDL Cholesterol Genetics',  effect: 'Favourable lipid profile variant',          direction: 'high'    },
  { category: 'Immune',       trait: 'HLA Class II Alleles',       effect: 'Reduced T2D autoimmune susceptibility',     direction: 'high'    },
];

const PGX: PgxEntry[] = [
  { gene: 'CYP2D6', drug: 'Codeine',      status: 'Normal Metabolizer',  level: 'A', phenotype: '*1/*1',   action: 'Standard dosing. No adjustment required.'           },
  { gene: 'CYP2C19',drug: 'Clopidogrel',  status: 'Rapid Metabolizer',   level: 'A', phenotype: '*17/*1',  action: 'Full antiplatelet response; monitor for bleeding.'    },
  { gene: 'SLCO1B1',drug: 'Simvastatin',  status: 'Decreased Function',  level: 'A', phenotype: '*5/*1',   action: 'Increased myopathy risk. Consider alternate statin.'  },
  { gene: 'CYP2C9', drug: 'Warfarin',     status: 'Intermediate Metab.', level: 'A', phenotype: '*2/*1',   action: 'Reduce starting dose by 25%. INR monitoring required.' },
  { gene: 'TPMT',   drug: 'Azathioprine', status: 'Normal Metabolizer',  level: 'A', phenotype: '*1/*1',   action: 'Standard dosing. Routine TGN monitoring.'             },
  { gene: 'DPYD',   drug: 'Fluorouracil', status: 'Normal Metabolizer',  level: 'A', phenotype: '*1/*1',   action: 'No dose reduction required.'                          },
  { gene: 'CYP3A5', drug: 'Tacrolimus',   status: 'Expresser',           level: 'B', phenotype: '*1/*3',   action: 'Higher starting dose may be needed (1.5-2x).'         },
];

const PRS: PrsEntry[] = [
  { condition: 'Type 2 Diabetes',      percentile: 22, zscore: '-0.77', id: 'PGS000014', color: '#00E5FF' },
  { condition: 'Coronary Artery Dis.', percentile: 34, zscore: '-0.41', id: 'PGS000011', color: '#6366F1' },
  { condition: 'Breast Cancer (BRCA)', percentile: 58, zscore: '+0.20', id: 'PGS000004', color: '#8B5CF6' },
  { condition: 'Alzheimer\'s Disease', percentile: 41, zscore: '-0.23', id: 'PGS000333', color: '#06B6D4' },
  { condition: 'Atrial Fibrillation',  percentile: 17, zscore: '-0.95', id: 'PGS000035', color: '#0EA5E9' },
];

const AI_REPORT = `SYNTIX GENOMIC INTELLIGENCE REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dataset ID : 0x8f3a...c291
Analysis   : Groth16 ZK-SNARK Verified
Encryption : FHE (Zama TFHE-rs)
Timestamp  : ${new Date().toISOString().split('T')[0]}

── EXECUTIVE SUMMARY ───────────────
Your genomic profile demonstrates predominantly European ancestry (64%) with significant East Asian admixture (19%), reflecting a diverse population heritage across 26 ancestry-informative markers from the 1000 Genomes Phase 3 reference panel.

── METABOLIC INTELLIGENCE ──────────
CYP1A2 fast-metabolizer status confers efficient caffeine clearance, reducing habitual caffeine-related cardiovascular strain. Persistent LCT expression indicates full lactase production — dairy consumption poses no metabolic concern. Omega-3 conversion efficiency (FADS1/FADS2) is moderate; direct EPA/DHA supplementation is preferable to ALA-only sources.

── PHARMACOGENOMIC GUIDANCE ────────
SLCO1B1 *5 allele is the most clinically actionable finding: statin-induced myopathy risk is elevated. Recommend discussing rosuvastatin or pravastatin (OATP1B1-independent statins) with your physician before initiating lipid therapy. CYP2C19 *17 rapid metabolizer status means clopidogrel will reach full antiplatelet effect faster than population average.

── WELLNESS OPTIMIZATION ───────────
VO₂ Max polygenic score places aerobic capacity potential in the top tertile. Fast-twitch fiber predominance (ACTN3 R allele) favours explosive performance. Circadian chronotype analysis (CLOCK, PER3) suggests optimal cognitive performance in early morning hours. Sleep hygiene aligned with this chronotype will maximize BDNF-dependent neuroplasticity.

── CARDIOVASCULAR RISK ─────────────
Polygenic Risk Score for CAD: 34th percentile (low-moderate). HDL genetics are favourable. Primary prevention strategy: maintain current lifestyle interventions rather than pharmacological intervention at this risk tier.

── DATA SOVEREIGNTY NOTE ────────────
This report was computed entirely under Fully Homomorphic Encryption. Your raw genomic sequence was never decrypted at any point during analysis. This Zero-Knowledge proof (Groth16) confirms computation integrity without revealing your underlying data.

Proof Hash: 0x7d2f91a...
Verified on: Ethereum Testnet (Sepolia)
Contribution ID: Pending confirmation


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ DISCLAIMER: For educational & wellness purposes only. Not a clinical diagnosis. Consult a licensed healthcare professional before making any health decisions.`;

// ─── Stage metadata ────────────────────────────────────────────────────────────

const STAGES: { stage: AnalysisStage; label: string; duration: number }[] = [
  { stage: 'encrypting', label: 'Encrypting genome locally (FHE)',    duration: 1800 },
  { stage: 'parsing',    label: 'Parsing VCF — QC validation',         duration: 1400 },
  { stage: 'ancestry',   label: 'Computing ancestry (26 AIMs)',         duration: 1600 },
  { stage: 'traits',     label: 'Scoring 80+ trait loci',              duration: 1500 },
  { stage: 'pgx',        label: 'Pharmaco­genomics — CPIC Level A/B',  duration: 1300 },
  { stage: 'prs',        label: 'Polygenic risk scores (5 conditions)',duration: 1400 },
  { stage: 'report',     label: 'Generating ZK-verified AI report',    duration: 1600 },
  { stage: 'done',       label: 'Analysis complete — proof sealed',    duration: 0    },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const ProgressBar = ({ pct, color = '#00E5FF' }: { pct: number; color?: string }) => (
  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
      initial={{ width: 0 }}
      animate={{ width: `${pct}%` }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    />
  </div>
);

const AncestryTab = () => {
  const total = 360;
  let offset = 0;
  const segments = ANCESTRY.map((a) => {
    const deg = (a.pct / 100) * total;
    const seg = { ...a, start: offset, deg };
    offset += deg;
    return seg;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Donut chart */}
        <div className="relative flex-shrink-0 w-52 h-52">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {segments.map((s) => {
              const r = 38;
              const circ = 2 * Math.PI * r;
              const dashLen = (s.deg / 360) * circ;
              const dashOff = ((360 - s.start) / 360) * circ;
              return (
                <motion.circle key={s.pop}
                  cx="50" cy="50" r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="14"
                  strokeDasharray={`${dashLen} ${circ}`}
                  strokeDashoffset={-((s.start / 360) * circ)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              );
            })}
            <circle cx="50" cy="50" r="31" fill="#050813" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Ancestry</span>
            <span className="text-2xl font-bold text-white mt-0.5">26 AIMs</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-4">
          {ANCESTRY.map((a) => (
            <div key={a.pop} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium">{a.label}</span>
                <span className="font-bold" style={{ color: a.color }}>{a.pct}%</span>
              </div>
              <ProgressBar pct={a.pct} color={a.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-sm text-gray-400 leading-relaxed">
        <span className="text-biomarker font-medium">Methodology:</span> Naive Bayes likelihood computed across 26 Ancestry-Informative Markers (AIMs) from 1000 Genomes Phase 3. Populations: AFR · AMR · EAS · EUR · SAS.
      </div>
    </div>
  );
};

const TraitsTab = () => {
  const categories = Array.from(new Set(TRAITS.map((t) => t.category)));
  const dirColor: Record<string, string> = { high: '#00E5FF', low: '#F59E0B', neutral: '#6B7280' };
  const dirLabel: Record<string, string> = { high: 'Favorable', low: 'Note', neutral: 'Typical' };

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat}>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
            <span className="w-4 h-px bg-white/20 inline-block" />
            {cat}
          </p>
          <div className="space-y-2">
            {TRAITS.filter((t) => t.category === cat).map((t, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/[0.025] border border-white/[0.06] rounded-lg px-4 py-3 hover:border-white/[0.12] transition-colors">
                <span
                  className="mt-0.5 flex-shrink-0 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{ color: dirColor[t.direction], borderColor: `${dirColor[t.direction]}30`, backgroundColor: `${dirColor[t.direction]}0D` }}
                >
                  {dirLabel[t.direction]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{t.trait}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PgxTab = () => {
  const levelColor = { A: '#00E5FF', B: '#6366F1' };
  return (
    <div className="space-y-3">
      <div className="hidden md:grid grid-cols-[80px_120px_160px_60px_100px_1fr] gap-3 text-[10px] uppercase tracking-widest text-gray-600 px-4">
        <span>Gene</span><span>Drug</span><span>Status</span><span>Level</span><span>Phenotype</span><span>Action</span>
      </div>
      {PGX.map((p, i) => (
        <div key={i} className="bg-white/[0.025] border border-white/[0.06] rounded-xl px-4 py-3 hover:border-white/[0.12] transition-colors">
          <div className="hidden md:grid grid-cols-[80px_120px_160px_60px_100px_1fr] gap-3 items-center">
            <span className="text-biomarker font-bold text-sm">{p.gene}</span>
            <span className="text-white text-sm">{p.drug}</span>
            <span className="text-gray-300 text-sm">{p.status}</span>
            <span className="text-xs px-2 py-0.5 rounded border font-bold" style={{ color: levelColor[p.level], borderColor: `${levelColor[p.level]}40`, backgroundColor: `${levelColor[p.level]}15` }}>
              CPIC {p.level}
            </span>
            <span className="text-gray-400 text-xs">{p.phenotype}</span>
            <span className="text-gray-400 text-xs leading-snug">{p.action}</span>
          </div>
          {/* Mobile layout */}
          <div className="md:hidden space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-biomarker font-bold">{p.gene} / {p.drug}</span>
              <span className="text-xs px-2 py-0.5 rounded border font-bold" style={{ color: levelColor[p.level], borderColor: `${levelColor[p.level]}40` }}>CPIC {p.level}</span>
            </div>
            <p className="text-gray-300 text-sm">{p.status} · {p.phenotype}</p>
            <p className="text-gray-500 text-xs leading-snug">{p.action}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const PrsTab = () => (
  <div className="space-y-5">
    {PRS.map((p, i) => {
      const risk = p.percentile < 25 ? 'Low' : p.percentile < 60 ? 'Average' : p.percentile < 80 ? 'Elevated' : 'High';
      const riskColor = p.percentile < 25 ? '#00E5FF' : p.percentile < 60 ? '#6366F1' : '#F59E0B';
      return (
        <div key={i} className="bg-white/[0.025] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white font-medium">{p.condition}</p>
              <p className="text-gray-600 text-xs mt-0.5">{p.id}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: p.color }}>{p.percentile}<span className="text-sm text-gray-500">th</span></p>
              <p className="text-xs" style={{ color: riskColor }}>{risk} Risk</p>
            </div>
          </div>
          <ProgressBar pct={p.percentile} color={p.color} />
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>0th percentile</span>
            <span>Z-score: {p.zscore}</span>
            <span>100th percentile</span>
          </div>
        </div>
      );
    })}
    <div className="text-xs text-gray-600 text-center pt-2">
      Scores computed from PGS Catalog reference weights. Population: 1000 Genomes Phase 3.
    </div>
  </div>
);

const ReportTab = () => {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const handleMint = () => {
    setMinting(true);
    setTimeout(() => { setMinting(false); setMinted(true); }, 2800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/60 border border-white/[0.08] rounded-xl p-5 overflow-auto max-h-[360px]">
        <pre className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">{AI_REPORT}</pre>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {!minted ? (
          <button
            onClick={handleMint}
            disabled={minting}
            className="flex-1 relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-biomarker text-hero text-sm font-bold uppercase tracking-widest rounded-sm overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.22)] hover:shadow-[0_0_50px_rgba(0,229,255,0.45)] disabled:opacity-70"
          >
            {minting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-hero border-t-transparent animate-spin" />
                Recording contribution on Ethereum...

              </span>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M4 7h6M7 4v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Record Genome Contribution

              </>
            )}
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center gap-3 px-6 py-3.5 bg-biomarker/10 border border-biomarker/30 rounded-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#00E5FF" strokeWidth="1.4"/>
              <path d="M5 8l2 2 4-4" stroke="#00E5FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <p className="text-biomarker text-sm font-bold">Contribution Recorded Successfully</p>
              <p className="text-gray-500 text-xs">Contribution ID: #4721 · Ethereum Testnet (Sepolia)</p>

            </div>
          </motion.div>
        )}
        <button className="px-6 py-3.5 border border-white/10 bg-white/[0.04] text-white text-sm uppercase tracking-widest rounded-sm hover:bg-white/[0.08] transition-all">
          Export PDF Report
        </button>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-600 border-t border-white/[0.06] pt-4">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1l1.236 3.803h4l-3.236 2.35 1.236 3.803L6 8.606 2.764 10.956 4 7.153.764 4.803h4z" fill="#6366F1"/>
        </svg>
        <span>Report generated via Claude API under FHE. Raw sequence never decrypted. ZK proof: <span className="text-indigo">0x7d2f...91a3</span></span>
      </div>
    </div>
  );
};

// ─── Upload Screen ─────────────────────────────────────────────────────────────

const UploadScreen = ({ onUpload }: { onUpload: (name: string) => void }) => {
  const handle = (name: string) => onUpload(name);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-biomarker/10 border border-biomarker/20 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#00E5FF" strokeWidth="1.6">
            <path d="M14 4v16M7 11l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 24h20" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Upload Your VCF File</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Your genome will be encrypted locally before leaving your device. SYNTIX never sees raw sequence data.
        </p>
      </div>

      <button
        onClick={() => handle('demo_genome_NA12878.vcf')}
        className="flex items-center gap-2 px-6 py-3 border border-indigo/30 bg-indigo/[0.08] text-indigo text-sm font-medium rounded-xl hover:bg-indigo/[0.14] transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M5.5 5.5C5.5 4.672 6.172 4 7 4s1.5.672 1.5 1.5-.672 1.5-1.5 1.5M7 9v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Use Demo Genome (NA12878 reference)
      </button>

      <div className="flex items-center gap-6 text-xs text-gray-600 border-t border-white/[0.06] pt-6 w-full max-w-md justify-center">
        {['FHE Encrypted', 'ZK Verified', 'Never Stored Raw'].map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-biomarker/50" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Analysis Progress Screen ──────────────────────────────────────────────────

const AnalysisProgress = ({ stage }: { stage: AnalysisStage }) => {
  const stageIdx = STAGES.findIndex((s) => s.stage === stage);
  const total = STAGES.length - 1;
  const progress = Math.round((stageIdx / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8 max-w-md mx-auto text-center">
      {/* Pulsing ring */}
      <div className="relative w-28 h-28">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-biomarker border-r-biomarker/30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-b-2 border-l-2 border-transparent border-b-indigo border-l-indigo/30"
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
          {progress}%
        </div>
      </div>

      <div className="w-full space-y-3">
        <ProgressBar pct={progress} />
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-sm text-biomarker font-medium"
          >
            {STAGES[stageIdx]?.label ?? 'Finalizing...'}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="space-y-2 w-full text-left">
        {STAGES.slice(0, -1).map((s, i) => (
          <div key={s.stage} className={`flex items-center gap-3 text-xs transition-all ${i < stageIdx ? 'text-gray-500' : i === stageIdx ? 'text-biomarker' : 'text-gray-700'}`}>
            {i < stageIdx ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="#00E5FF20" stroke="#00E5FF" strokeWidth="1"/><path d="M3.5 6l1.5 1.5 3-3" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : i === stageIdx ? (
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-3 h-3 rounded-full bg-biomarker flex-shrink-0" />
            ) : (
              <span className="w-3 h-3 rounded-full border border-white/10 flex-shrink-0" />
            )}
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Results Screen ────────────────────────────────────────────────────────────

const TABS: { key: ResultTab; label: string }[] = [
  { key: 'ancestry', label: 'Ancestry' },
  { key: 'traits',   label: '80+ Traits' },
  { key: 'pgx',      label: 'Pharmacogenomics' },
  { key: 'prs',      label: 'Risk Scores' },
  { key: 'report',   label: 'AI Report & Contribution' },

];

const ResultsScreen = ({ filename }: { filename: string }) => {
  const [tab, setTab] = useState<ResultTab>('ancestry');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Analysis complete</p>
          <h3 className="text-white font-semibold">{filename}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-biomarker bg-biomarker/10 border border-biomarker/20 px-3 py-1.5 rounded-full">
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-biomarker" />
          ZK Proof Verified · Groth16
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 min-w-max px-3 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
              tab === t.key
                ? 'bg-biomarker/10 text-biomarker border border-biomarker/25'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'ancestry' && <AncestryTab />}
          {tab === 'traits'   && <TraitsTab />}
          {tab === 'pgx'      && <PgxTab />}
          {tab === 'prs'      && <PrsTab />}
          {tab === 'report'   && <ReportTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Main Export ───────────────────────────────────────────────────────────────

export const GenomeAnalyzer: React.FC = () => {
  const [stage, setStage]       = useState<AnalysisStage>('idle');
  const [filename, setFilename] = useState('');

  const runAnalysis = async (name: string) => {
    setFilename(name);
    for (const s of STAGES) {
      setStage(s.stage);
      if (s.duration > 0) await new Promise((r) => setTimeout(r, s.duration));
    }
  };

  return (
    <div className="bg-[#0a0a0f]/80 backdrop-blur-md border border-white/[0.07] rounded-2xl p-6 md:p-8 min-h-[560px] flex flex-col relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-biomarker/40 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-biomarker/10 border border-biomarker/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#00E5FF" strokeWidth="1.5">
              <path d="M7 1v12M4 3.5C4 3.5 5.5 5 7 5s3-1.5 3-1.5M4 10.5C4 10.5 5.5 9 7 9s3 1.5 3 1.5M4 7h6" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Genome Analyser</span>
          <span className="text-xs text-gray-600">/ FHE Pipeline</span>
        </div>
        {stage === 'done' && (
          <button
            onClick={() => { setStage('idle'); setFilename(''); }}
            className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest border border-white/10 px-3 py-1 rounded-lg hover:border-white/25"
          >
            New Analysis
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1">
        {stage === 'idle' && <UploadScreen onUpload={runAnalysis} />}
        {stage !== 'idle' && stage !== 'done' && <AnalysisProgress stage={stage} />}
        {stage === 'done' && <ResultsScreen filename={filename} />}
      </div>
    </div>
  );
};

export default GenomeAnalyzer;
