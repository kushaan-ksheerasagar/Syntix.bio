'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Fingerprint, Coins, ShieldAlert } from 'lucide-react';

const PROBLEM_CARDS = [
  {
    n: '01',
    icon: Fingerprint,
    headline: 'No cryptographic provenance on raw sequences',
    body: 'Without cryptographic chains of custody, provenance is lost. Legacy biobanks lack verifiable audit trails, rendering data clinically inadmissible.',
  },
  {
    n: '02',
    icon: Coins,
    headline: 'No cryptographic contribution record',

    body: 'Data contributors are completely excluded from the research lifecycle. Centralised silos become data cemeteries where owners have no proof of contribution and no recourse.',

  },
  {
    n: '03',
    icon: ShieldAlert,
    headline: 'No ZK-verifiable consent audit trail',
    body: 'Traditional infrastructure cannot mathematically guarantee usage aligns with participant intent. Audits remain centralized, opaque, and unverifiable.',
  },
];

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
      className={className}>
      {children}
    </motion.div>
  );
};

export const Pgx = () => {
  return (
    <section id="problem" className="py-32 bg-global">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <FadeIn className="max-w-2xl mb-20">
          <span className="inline-block text-xs uppercase tracking-[0.28em] text-gray-400 mb-5 border border-gray-200 px-3 py-1 rounded-full">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-6">
            The genomic data silo<br />
            <strong className="font-bold">is a clinical liability.</strong>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed font-light">
            Traditional biobanks treat your biology as a static commodity — hoarding data that decays, without provenance, without your consent, without credit.

          </p>
        </FadeIn>

        {/* ── Two-column split: visual + stat ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: abstract graphic */}
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] bg-gray-50 border border-gray-100 overflow-hidden">
              <img src="/problem-image.png" alt="Problem illustration" className="w-full h-full object-cover" />
            </div>
          </FadeIn>

          {/* Right: stat + quote */}
          <FadeIn delay={0.2} className="space-y-8">
            <div>
              <div className="text-7xl font-bold text-gray-900 tracking-tighter mb-2">15M</div>
              <p className="text-gray-500 text-lg font-light leading-relaxed">
                genomic profiles sold by 23andMe in bankruptcy proceedings at{' '}
                <span className="text-gray-900 font-medium">roughly $20 per genome</span>.
                None of the original owners received notification.
              </p>
            </div>


          </FadeIn>
        </div>

        {/* ── Problem cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEM_CARDS.map((card, i) => (
            <FadeIn key={card.n} delay={i * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="p-8 border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <card.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-2xl font-bold text-indigo-600 font-mono tabular-nums">{card.n}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug">{card.headline}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-light">{card.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
