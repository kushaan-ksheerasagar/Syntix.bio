'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface Step {
  number:      string;
  icon:        React.ReactNode;
  label:       string;
  title:       string;
  description: string;
  terminal:    { text: string; type: 'cmd' | 'success' | 'info' | 'muted' }[];
}

// ─────────────────────────────────────────────────────────────
// CUSTOM SVG ICONS
// ─────────────────────────────────────────────────────────────

const BioWalletIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <rect x="2" y="7" width="22" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M2 12h22" stroke="currentColor" strokeWidth="1.7" />
    <path d="M7 7V5a3 3 0 013-3h6a3 3 0 013 3v2" stroke="currentColor" strokeWidth="1.7" />
    <rect x="17" y="15" width="4.5" height="3.5" rx="1" fill="currentColor" opacity="0.75" />
    <circle cx="19.25" cy="16.75" r="0.9" fill="#050813" />
    {/* DNA double-helix on card face */}
    <path d="M6 16 Q7.5 15 9 16 Q10.5 17 12 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <path d="M6 18.5 Q7.5 17.5 9 18.5 Q10.5 19.5 12 18.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const FHEComputeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <rect x="4" y="11" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 11V8.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="13" cy="18" r="2" fill="currentColor" opacity="0.8" />
    <path d="M13 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    {/* Signal arcs — representing encrypted compute */}
    <path d="M19 5 Q22 8 19 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    <path d="M21 3 Q25 7.5 21 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <path d="M7 5 Q4 8 7 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    <path d="M5 3 Q1 7.5 5 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const MintNFTIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    {/* Hexagon — IP-NFT token shape */}
    <path
      d="M13 2 L23 7.5 L23 18.5 L13 24 L3 18.5 L3 7.5 Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M13 7 L19 10.5 L19 17.5 L13 21 L7 17.5 L7 10.5 Z"
      fill="currentColor"
      opacity="0.12"
    />
    {/* Inner symbol — DNA strand */}
    <path d="M10 11 Q13 13 16 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
    <path d="M10 15 Q13 13 16 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
    <line x1="11" y1="11" x2="11" y2="15" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    <line x1="13" y1="11" x2="13" y2="15" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    <line x1="15" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    {/* Sparkle */}
    <circle cx="22" cy="4" r="1.2" fill="currentColor" opacity="0.6" />
    <path d="M22 1.5v1M22 6.5v1M19.5 4h1M24.5 4h1" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    number: '01',
    icon: <BioWalletIcon />,
    label: 'ONBOARDING',
    title: 'Connect your BioWallet',
    description:
      'Link your biological data sources — genomic files, wearables, clinical records — through your sovereign BioWallet in under 60 seconds. Your private keys are generated locally and never leave your device. You remain the sole Data Controller from day one.',
    terminal: [
      { text: '$ syntix.connect()',                          type: 'cmd'     },
      { text: '  → Wallet: 0x8f3a...c291 detected',         type: 'info'    },
      { text: '  → BioVault: initialized',                  type: 'info'    },
      { text: '  → Health records: 3 sources linked',       type: 'info'    },
      { text: '  → Key pair: LOCAL only, never transmitted', type: 'muted'   },
      { text: '  ✓ Onboarding complete',                    type: 'success' },
    ],
  },
  {
    number: '02',
    icon: <FHEComputeIcon />,
    label: 'FHE COMPUTE',
    title: 'Your data computes in the dark',
    description:
      'Fully Homomorphic Encryption lets our AI models run on your encrypted genome — no decryption, ever. Twelve decentralized H100-accelerated nodes process ciphertext and return a Zero-Knowledge Proof confirming the result. Not even SYNTIX can read your raw data.',
    terminal: [
      { text: '$ fhe.compute(genome_cipher)',                type: 'cmd'     },
      { text: '  → scheme: TFHE-rs / Zama',                 type: 'info'    },
      { text: '  → nodes: 12 decentralized (H100)',          type: 'info'    },
      { text: '  → latency: 8.3ms',                         type: 'info'    },
      { text: '  → raw_data_exposed: false',                type: 'muted'   },
      { text: '  ✓ ZK proof: 0x7d2f...91a validated',       type: 'success' },
    ],
  },
  {
    number: '03',
    icon: <MintNFTIcon />,
    label: 'ON-CHAIN CONTRIBUTION',
    title: 'Record your biological contribution',
    description:
      'Every research use of your data is recorded permanently on Ethereum — a verifiable, portable proof of your biological contribution.',

    terminal: [
      { text: '$ contribution.record(proof, {',              type: 'cmd'     },
      { text: '    contribution: "Verified",',              type: 'muted'   },
      { text: '    license:      "Research-Only",',         type: 'muted'   },
      { text: '    owner:        wallet_0x8f3a,',           type: 'muted'   },
      { text: '  })',                                        type: 'cmd'     },
      { text: '  ✓ Contribution #2847 recorded on Ethereum', type: 'success' },
      { text: '  ✓ Proof of contribution: permanent',        type: 'success' },
    ],

  },
];

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const stepVariants = {
  hidden:  { opacity: 0, x: -44 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const terminalVariants = {
  hidden:  { opacity: 0, x: 32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.15 + 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

// ─────────────────────────────────────────────────────────────
// TERMINAL SNIPPET
// ─────────────────────────────────────────────────────────────

interface TerminalProps {
  lines: Step['terminal'];
  label: string;
}

const lineColor = (type: Step['terminal'][number]['type']): string => {
  switch (type) {
    case 'cmd':     return 'text-biomarker';
    case 'success': return 'text-green-400/90';
    case 'info':    return 'text-gray-300';
    case 'muted':   return 'text-gray-500';
  }
};

const TerminalSnippet = ({ lines, label }: TerminalProps) => (
  <div className="rounded-xl border border-white/[0.08] bg-black/50 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.4)]">
    {/* Window bar */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      <span className="ml-auto text-[10px] text-gray-500 uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
    {/* Code body */}
    <div className="p-5 space-y-1.5">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.11 + 0.35 }}
          className={`text-[12px] leading-relaxed ${lineColor(line.type)}`}
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// CONNECTOR BETWEEN STEPS
// ─────────────────────────────────────────────────────────────

const StepConnector = () => (
  <div className="flex items-center gap-3 mt-10">
    <div className="h-px flex-1 bg-gradient-to-r from-biomarker/30 to-transparent" />
    <span className="text-[10px] text-biomarker/40 uppercase tracking-[0.25em]">next</span>
  </div>
);

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

const HowItWorks = () => (
  <section id="how-it-works" className="relative py-32 bg-hero overflow-hidden">
    {/* Ambient background */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-indigo/[0.04]    blur-[120px]" />
      <div className="absolute bottom-0 right-0               w-[420px] h-[420px] rounded-full bg-biomarker/[0.03] blur-[100px]" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-6">

      {/* ── Section header ── */}
      <div className="text-center mb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm text-biomarker uppercase tracking-[0.3em] mb-4"
        >
          Protocol Flow
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-light text-white tracking-tight"
        >
          How{' '}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-biomarker to-indigo">
            SYNTIX
          </span>{' '}
          works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 mt-5 text-lg font-light max-w-xl mx-auto"
        >
          From raw biology to sovereign IP — in three steps, without ever exposing your data.
        </motion.p>
      </div>

      {/* ── Steps ── */}
      <div className="space-y-20 md:space-y-28">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col gap-10 md:gap-16 items-start md:flex-row ${
              i % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Left column — step content */}
            <motion.div
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex-1 flex gap-5 md:gap-7"
            >
              {/* Large step number */}
              <div className="flex-shrink-0 pt-1 select-none">
                <span className="block text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-biomarker/80 to-biomarker/10 leading-none">
                  {step.number}
                </span>
              </div>

              {/* Text content */}
              <div className="min-w-0">
                {/* Icon + label row */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-biomarker backdrop-blur-sm flex-shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-[0.25em]">
                    {step.label}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-base md:text-[17px] font-light">
                  {step.description}
                </p>

                {/* Connector (all except last) */}
                {i < STEPS.length - 1 && <StepConnector />}
              </div>
            </motion.div>

            {/* Right column — terminal snippet */}
            <motion.div
              custom={i}
              variants={terminalVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex-1 w-full"
            >
              <TerminalSnippet lines={step.terminal} label={step.label} />
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA nudge ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
      >
        <p className="text-gray-500 font-light text-lg">
          Still have questions about the protocol?
        </p>
        <a
          href="#faq"
          className="text-sm text-biomarker hover:text-white border border-biomarker/30 hover:border-white/20 px-5 py-2.5 rounded-sm transition-all duration-200 uppercase tracking-widest"
        >
          Read the FAQ →
        </a>
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
