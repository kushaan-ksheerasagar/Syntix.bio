'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

// ─── useInterval hook ─────────────────────────────────────────────────────────

function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  role: string;
  org: string;
  badge: string;
  quote: string;
  avatarFrom: string;
  avatarTo: string;
  borderActive: string;
  glowActive: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'Computational Genomics Lead',
    org: 'Stanford Medicine',
    badge: 'Biotech Scientist',
    quote: 'The FHE pipeline is the first architecture I\'ve seen where I can run PGx analysis on patient cohorts and genuinely tell my IRB that I never saw the raw data. SYNTIX turns regulatory compliance from a blocker into a proof.',
    avatarFrom: '#00E5FF',
    avatarTo: '#06B6D4',
    borderActive: '#00E5FF',
    glowActive: 'rgba(0,229,255,0.15)',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    role: 'Deep Tech Partner',
    org: 'Andreessen Horowitz Bio',
    badge: 'Investor',
    quote: 'Most "privacy-first" genomics startups are still sitting on plaintext in a locked S3 bucket. SYNTIX is actually computing on ciphertext. The Groth16 ZKP integration is the technical moat that makes this a fundable thesis.',
    avatarFrom: '#6366F1',
    avatarTo: '#8B5CF6',
    borderActive: '#6366F1',
    glowActive: 'rgba(99,102,241,0.15)',
  },
  {
    id: 3,
    name: 'Dr. Amara Okonkwo',
    role: 'Director of Precision Medicine',
    org: 'Africa CDC Genomics Initiative',
    badge: 'Research Institution',
    quote: 'We\'ve been locked out of 70% of global genomic datasets because of data-sharing agreements that don\'t protect African patients. SYNTIX\'s Compute-to-Data model and on-chain PIL licensing is the first framework that actually works for our populations.',
    avatarFrom: '#8B5CF6',
    avatarTo: '#EC4899',
    borderActive: '#8B5CF6',
    glowActive: 'rgba(139,92,246,0.15)',
  },
  {
    id: 4,
    name: 'Kenji Tanaka',
    role: 'Founder',
    org: 'BioSovereign Labs',
    badge: 'Early Adopter',
    quote: 'I uploaded my WGS VCF, ran the FHE analysis, and had a ZK-verified pharmacogenomics report — plus an IP-NFT already minted on Story Protocol — in under 4 minutes. My genome is now a royalty-generating asset. That\'s not a product, that\'s a paradigm shift.',
    avatarFrom: '#06B6D4',
    avatarTo: '#00E5FF',
    borderActive: '#06B6D4',
    glowActive: 'rgba(6,182,212,0.15)',
  },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ t, size = 48 }: { t: Testimonial; size?: number }) => {
  const initials = t.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full blur-md opacity-60"
        style={{ background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})` }} />
      <div className="relative w-full h-full rounded-full flex items-center justify-center border-2 border-white/10"
        style={{ background: `linear-gradient(135deg, ${t.avatarFrom}22, ${t.avatarTo}22)` }}>
        <span className="text-white font-bold text-sm">{initials}</span>
      </div>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const TestimonialCard = ({ t, isActive }: { t: Testimonial; isActive: boolean }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    className="relative rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-300"
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
      border: `1px solid ${isActive ? t.borderActive + '30' : 'rgba(255,255,255,0.07)'}`,
      boxShadow: isActive ? `0 0 60px ${t.glowActive}, inset 0 1px 0 rgba(255,255,255,0.06)` : 'none',
    }}
  >
    {/* Decorative quote mark */}
    <div className="absolute top-6 right-8 text-[7rem] leading-none font-serif opacity-[0.06] select-none pointer-events-none"
      style={{ color: t.avatarFrom }}>
      &ldquo;
    </div>

    {/* Quote */}
    <blockquote className="relative z-10 text-gray-300 text-base md:text-lg leading-relaxed font-light mb-8">
      &ldquo;{t.quote}&rdquo;
    </blockquote>

    {/* Author */}
    <div className="relative z-10 flex items-center gap-4">
      <Avatar t={t} size={48} />
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold">{t.name}</p>
        <p className="text-gray-500 text-sm truncate">{t.role}</p>
        <p className="text-xs mt-0.5" style={{ color: t.avatarFrom }}>{t.org}</p>
      </div>
      <span
        className="hidden sm:inline-flex text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded border flex-shrink-0"
        style={{ color: t.avatarFrom, borderColor: `${t.avatarFrom}30`, backgroundColor: `${t.avatarFrom}10` }}
      >
        {t.badge}
      </span>
    </div>
  </motion.div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const dragControls                  = useDragControls();

  const len  = TESTIMONIALS.length;
  const next = useCallback(() => setActiveIndex(i => (i + 1) % len), [len]);
  const prev = useCallback(() => setActiveIndex(i => (i - 1 + len) % len), [len]);

  useInterval(next, isPaused ? null : 4000);

  return (
    <section
      id="testimonials"
      className="relative py-28 bg-hero overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-biomarker/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-biomarker uppercase tracking-[0.3em] text-xs mb-4"
          >
            From scientists & investors
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-white tracking-tight"
          >
            Built for those who{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-biomarker to-indigo">
              know what matters
            </span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <motion.div
            className="flex select-none"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            drag="x"
            dragControls={dragControls}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60) prev();
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className="min-w-full px-2 md:px-6">
                <TestimonialCard t={t} isActive={i === activeIndex} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              animate={{
                width:           i === activeIndex ? 40 : 20,
                backgroundColor: i === activeIndex ? '#00E5FF' : '#1f2937',
                boxShadow:       i === activeIndex ? '0 0 12px rgba(0,229,255,0.5)' : 'none',
              }}
              transition={{ duration: 0.3 }}
              className="h-1 rounded-full"
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-xs text-gray-600 tabular-nums">
            {activeIndex + 1} / {len}
          </span>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
