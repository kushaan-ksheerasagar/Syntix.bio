'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Benchmarking data ────────────────────────────────────────────────────────

const BENCH_ROWS = [
  { metric: 'Schema / Format Validation',    plain: '0.8 ms',  syntix: '2.1 ms',  delta: '+1.3 ms', note: 'BLAKE3 attestation overhead',        ok: true  },
  { metric: 'Genomic Fingerprint (ZKP)',     plain: '—',       syntix: '3.2 ms',  delta: '—',       note: 'Groth16 proof, 85k R1CS constraints', ok: true  },
  { metric: 'PGx Marker Scan (FHE)',         plain: '1.2 ms',  syntix: '4.8 ms',  delta: '+3.6 ms', note: '25 CPIC loci, TFHE-rs 128-bit',       ok: true  },
  { metric: 'On-chain Proof Verification',   plain: '—',       syntix: '0.5 ms',  delta: '—',       note: 'BN254, <200k gas, Inco Network',      ok: true  },
  { metric: 'Total Round-Trip (p95)',         plain: '~2 ms',   syntix: '<10 ms', delta: '5×',      note: 'Full privacy + clinical compliance',  ok: true  },
  { metric: 'Privacy Guarantee',             plain: 'None',    syntix: '128-bit', delta: '∞',       note: 'FHE semantic security',               ok: true  },
  { metric: 'Regulatory Attestation',        plain: 'None',    syntix: 'On-chain',delta: '∞',       note: 'HIPAA 45 CFR §164.312 + 21 CFR Pt 11',ok: true  },
];

// ─── Shared fade-in ───────────────────────────────────────────────────────────

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
      className={className}>
      {children}
    </motion.div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export const SchemaValidator = () => {
  return (
    <section id="performance-benchmarks" className="relative py-32 bg-hero overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-biomarker/[0.025] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo/[0.03] rounded-full blur-[130px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #00E5FF 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Benchmarking table ── */}
        <FadeIn className="mb-6">
          <p className="text-xs uppercase tracking-[0.28em] text-gray-600 text-center mb-2">Performance Benchmarks</p>
          <h3 className="text-center text-2xl md:text-3xl font-light text-white mb-10">
            Plaintext Speed vs.{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-biomarker to-indigo">
              SYNTIX Encrypted Pulse
            </span>
          </h3>
        </FadeIn>

        <FadeIn>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.015]">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1.2fr_0.8fr_2fr] gap-0 px-6 py-3 border-b border-white/[0.07] text-[10px] uppercase tracking-widest text-gray-600">
              <span>Operation</span>
              <span className="text-center">Plaintext</span>
              <span className="text-center">SYNTIX Pulse</span>
              <span className="text-center">Overhead</span>
              <span>Notes</span>
            </div>

            {BENCH_ROWS.map((r, i) => (
              <div key={i}
                className={`grid grid-cols-[2fr_1fr_1.2fr_0.8fr_2fr] gap-0 px-6 py-4 text-sm border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors ${
                  r.metric.includes('Total') ? 'bg-biomarker/[0.03]' : ''
                }`}
              >
                <span className={`font-medium ${r.metric.includes('Total') ? 'text-white' : 'text-gray-300'}`}>
                  {r.metric}
                </span>
                <span className="text-center text-gray-500 text-xs self-center">{r.plain}</span>
                <span className="text-center text-xs self-center font-bold" style={{ color: r.metric.includes('Total') ? '#00E5FF' : '#6366F1' }}>
                  {r.syntix}
                </span>
                <span className="text-center text-xs self-center">
                  {r.delta !== '—' && r.delta !== '∞' && r.delta !== '5×' ? (
                    <span className="text-gray-600">{r.delta}</span>
                  ) : (
                    <span className="font-bold" style={{ color: r.metric.includes('Total') ? '#00E5FF' : '#8B5CF6' }}>{r.delta}</span>
                  )}
                </span>
                <span className="text-gray-600 text-xs self-center font-light">{r.note}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-6 text-xs text-gray-600 text-center">
            <span>Benchmarked on: 1× NVIDIA A100 80 GB (FHE), AMD EPYC 7763 (plaintext)</span>
            <span className="hidden md:inline">·</span>
            <span>1M-variant WGS file, p95 unless noted</span>
            <span className="hidden md:inline">·</span>
            <span>Inco Network testnet (Sepolia fork)</span>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default SchemaValidator;
