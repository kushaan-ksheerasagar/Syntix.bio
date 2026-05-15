'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

const TICKER_ITEMS = [
  'Zero-Knowledge Proofs', 'FHE Computation', 'IP-NFT Minting',
  'Data Sovereignty', 'Royalty Distribution', 'BioWallet Authentication',
  'Genomic Privacy', 'On-Chain Provenance', 'HIPAA Compliant', 'Blind Compute',
];

const PARTICLES = [
  { id: 1,  size: 4, x: 14, y: 22, color: '#00E5FF', opacity: 0.45, dur: 4.5, delay: 0.0 },
  { id: 2,  size: 3, x: 81, y: 14, color: '#6366F1', opacity: 0.50, dur: 5.2, delay: 0.8 },
  { id: 3,  size: 5, x: 44, y: 71, color: '#00E5FF', opacity: 0.30, dur: 3.8, delay: 1.2 },
  { id: 4,  size: 2, x: 66, y: 44, color: '#6366F1', opacity: 0.60, dur: 6.1, delay: 0.4 },
  { id: 5,  size: 4, x: 29, y: 60, color: '#00E5FF', opacity: 0.35, dur: 4.8, delay: 1.8 },
  { id: 6,  size: 3, x: 91, y: 54, color: '#00E5FF', opacity: 0.45, dur: 5.5, delay: 2.1 },
  { id: 7,  size: 2, x: 9,  y: 79, color: '#6366F1', opacity: 0.40, dur: 4.2, delay: 0.6 },
  { id: 8,  size: 5, x: 56, y: 31, color: '#6366F1', opacity: 0.30, dur: 3.5, delay: 1.5 },
  { id: 9,  size: 3, x: 71, y: 74, color: '#00E5FF', opacity: 0.50, dur: 4.0, delay: 2.5 },
  { id: 10, size: 4, x: 24, y: 9,  color: '#6366F1', opacity: 0.35, dur: 5.8, delay: 1.0 },
] as const;

const ZKP_BADGES = [
  { text: 'BLOCK_VERIFIED: 0x8f3a...c291',    color: 'text-biomarker', border: 'border-biomarker/25', delay: 1.0 },
  { text: 'ZKP_CONFIRMED: proof_0x7d2f...91a', color: 'text-indigo',   border: 'border-indigo/25',   delay: 1.4 },
] as const;

const EASE_CUBIC: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE_CUBIC } },
};

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    <div className="absolute inset-0 opacity-[0.13]"
      style={{ backgroundImage: 'radial-gradient(circle, #00E5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-hero via-transparent to-hero" />
    <div className="absolute inset-0 bg-gradient-to-r from-hero via-transparent to-hero" />
    {PARTICLES.map((p) => (
      <motion.div key={p.id} className="absolute rounded-full"
        style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color, opacity: 0 }}
        animate={{ y: [0, -24, 0], opacity: [0, p.opacity, 0] }}
        transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
      />
    ))}
    <svg className="absolute top-0 right-0 h-full opacity-[0.07]" style={{ width: '44%' }}
      viewBox="0 0 400 900" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d="M320 0 Q 200 150 320 300 Q 440 450 320 600 Q 200 750 320 900"
        stroke="#00E5FF" strokeWidth="2" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, ease: 'easeInOut' }} />
      <motion.path d="M80 0 Q 200 150 80 300 Q -40 450 80 600 Q 200 750 80 900"
        stroke="#6366F1" strokeWidth="2" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, ease: 'easeInOut', delay: 0.6 }} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.line key={i}
          x1={i % 2 === 0 ? 80 : 320} y1={i * 100 + 50}
          x2={i % 2 === 0 ? 320 : 80} y2={i * 100 + 50}
          stroke="#00E5FF" strokeWidth="0.8" strokeDasharray="5 5"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 2.6, delay: i * 0.4, repeat: Infinity }} />
      ))}
    </svg>
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-biomarker/[0.04] blur-[140px]" />
    <div className="absolute top-1/4 left-1/4 w-[380px] h-[280px] rounded-full bg-indigo/[0.05] blur-[110px]" />
  </div>
);

const InfiniteTicker = () => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="w-full overflow-hidden border-y border-white/[0.06] bg-white/[0.015]">
      <motion.div className="flex" style={{ width: 'max-content' }}
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 py-3 text-sm uppercase tracking-[0.18em] text-gray-500 whitespace-nowrap select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-biomarker/50 flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const [wave, setWave] = useState(false);

  const router = useRouter();
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 340], [1, 0.25]);
  const contentY       = useTransform(scrollY, [0, 340], [0, -38]);

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    setWave(true);
    setTimeout(() => {
      setWave(false);
      router.push('/auth');
    }, 600);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-hero overflow-hidden">
      <GridBackground />
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 flex flex-col items-center">

        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }} className="mt-28 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-biomarker/20 bg-biomarker/[0.06] backdrop-blur-sm">
            <motion.span animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-biomarker flex-shrink-0" />
            <span className="text-[11px] text-biomarker tracking-[0.2em] uppercase">
              127 active biological datasets protected
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center max-w-5xl px-6">
          <motion.h1 variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.25rem] font-light text-white tracking-tight leading-[1.06]">
            Your biology.
            <br />
            <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-biomarker via-cyan-300 to-indigo">
              Your data.
            </strong>
            <br />
            Your sovereignty.
          </motion.h1>

          <motion.p variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mt-8 mb-12 leading-relaxed font-light">
            FHE computes on your encrypted genome. ZK Proofs verify the result.
            IP-NFTs convert your biology into programmable, royalty-generating intellectual property.
          </motion.p>

          {/* Dual CTA */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative inline-block">
              <button onClick={handleConnect}
                className="relative z-10 inline-flex items-center gap-2.5 px-8 py-4 bg-biomarker text-hero text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.22)] hover:shadow-[0_0_50px_rgba(0,229,255,0.45)] hover:bg-cyan-300">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="flex-shrink-0">
                  <rect x="1" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 6h13" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="11" cy="9" r="1" fill="currentColor" />
                </svg>
                VIEW DEMO
              </button>
              <AnimatePresence>
                {wave && (
                  <motion.span initial={{ scale: 0.8, opacity: 0.9 }} animate={{ scale: 4.2, opacity: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute inset-0 block rounded border-2 border-biomarker pointer-events-none"
                    style={{ boxShadow: '0 0 32px 10px rgba(0,229,255,0.35)', backgroundColor: 'rgba(0,229,255,0.08)' }} />
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); router.push('/waitlist'); }}
              className="group inline-flex items-center gap-2.5 px-8 py-4 border border-white/10 bg-white/[0.04] text-white text-sm uppercase tracking-widest rounded-sm backdrop-blur-sm hover:bg-white/[0.09] hover:border-white/[0.2] transition-all duration-300"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="flex-shrink-0 text-indigo">
                <rect x="2" y="2" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 7.5h5M5 5h5M5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Join the Waitlist
              <span className="text-indigo transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
            </button>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-[11px] uppercase tracking-widest text-gray-500">
            {(['HIPAA Compliant', 'FHE Encrypted', 'ZK Verified', 'IP-NFT Protected'] as const).map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-biomarker/60" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ZKP floating badges */}
        <div className="relative z-10 w-full max-w-6xl px-6 hidden md:flex justify-between mt-10 pointer-events-none">
          {ZKP_BADGES.map(({ text, color, border, delay }) => (
            <motion.div key={text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 0.85, 0.85, 0] }}
              transition={{ duration: 5, delay, repeat: Infinity, repeatDelay: 3 }}
              className={`text-[10px] ${color} border ${border} bg-black/60 px-3 py-1.5 rounded backdrop-blur-md`}>
              {`[${text}]`}
            </motion.div>
          ))}
        </div>

        <div className="w-full mt-16">
          <InfiniteTicker />
        </div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
