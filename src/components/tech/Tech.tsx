'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const METRICS = [
  {
    value: '100+',
    label: 'Biomarkers',
    sub: 'Unified into one encrypted sentinel score',
    color: '#00E5FF',
  },
  {
    value: '<10ms',
    label: 'Encrypted Latency',
    sub: 'FHE compute round-trip, p95 benchmark',
    color: '#6366F1',
  },
  {
    value: '$4,500',
    label: 'Per ADR Prevented',
    sub: 'Cost basis: AHRQ 2023 — Adverse Drug Reactions',
    color: '#8B5CF6',
  },
];

export const Tech = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="roi" className="py-24 bg-global border-t border-gray-100">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
              className="py-12 md:px-12 flex flex-col items-center text-center first:md:pl-0 last:md:pr-0"
            >
              <div
                className="text-6xl md:text-7xl font-bold tracking-tighter mb-3 tabular-nums"
                style={{ color: m.color, textShadow: `0 0 40px ${m.color}30` }}
              >
                {m.value}
              </div>
              <p className="text-gray-900 font-semibold text-lg mb-1.5">{m.label}</p>
              <p className="text-gray-400 text-sm font-light max-w-[200px] leading-snug">{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
