'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── Layer data ─────────────────────────────────────────────── */
const LAYERS = [
  {
    id: 'compute',
    tier: 'Layer 01',
    label: 'The Compute Layer',
    sublabel: 'Privacy-First',
    tech: ['Inco Network', 'Zama', 'FHE'],
    function:
      'Enables "Blind Computation." Our AI models process biological signals while they remain encrypted, ensuring zero-knowledge exposure of raw genomic data.',
    color: '#00E5FF',   // biomarker cyan
    hex: 'biomarker',
    glow: 'rgba(0,229,255,0.18)',
    border: 'rgba(0,229,255,0.35)',
    icon: 'lock',
    badge: 'FHE Active',
  },
  {
    id: 'asset',
    tier: 'Layer 02',
    label: 'The Asset Layer',
    sublabel: 'Programmable IP',
    tech: ['Ethereum Mainnet', 'IP-NFTs'],
    function:
      'Every biomarker insight is minted as a programmable IP-NFT. This allows users to license their data to research labs or clinical trials autonomously, maintaining verifiable on-chain contribution records.',

    color: '#818CF8',   // indigo
    hex: 'indigo',
    glow: 'rgba(129,140,248,0.18)',
    border: 'rgba(129,140,248,0.35)',
    icon: 'dna',
    badge: 'IP-NFT Minted',
  },
  {
    id: 'interface',
    tier: 'Layer 03',
    label: 'The Interface Layer',
    sublabel: 'High-Fidelity',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    function:
      'A high-performance, type-safe environment designed for clinical precision and fluid micro-interactions.',
    color: '#FFFFFF',
    hex: 'white',
    glow: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.18)',
    icon: 'bolt',
    badge: 'Type-Safe',
  },
];

/* ─── Architecture nodes for the blueprint diagram ──────────── */
const ARCH_NODES = [
  { id: 'user',   label: 'USER\nDevice',        x: '10%',  y: '50%', color: '#00E5FF' },
  { id: 'fhe',    label: 'FHE\nEncryption',     x: '30%',  y: '25%', color: '#00E5FF' },
  { id: 'zkp',    label: 'ZKP\nVerifier',       x: '30%',  y: '75%', color: '#818CF8' },
  { id: 'ai',     label: 'AI Model\n(Blind)',    x: '55%',  y: '50%', color: '#00E5FF' },
  { id: 'ip',     label: 'Ethereum\nMainnet',     x: '78%',  y: '25%', color: '#818CF8' },

  { id: 'result', label: 'Health\nInsight',     x: '90%',  y: '50%', color: '#FFFFFF' },
];

/* ─── Card component ─────────────────────────────────────────── */
function LayerCard({ layer, index }: { layer: typeof LAYERS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: 'easeOut' }}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${layer.border}`,
        boxShadow: `0 0 40px ${layer.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
      className="relative rounded-2xl p-8 flex flex-col gap-6 backdrop-blur-lg overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Corner glow accent */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-25 blur-2xl pointer-events-none"
        style={{ background: layer.color }}
      />

      {/* Tier label */}
      <div
        className=" text-xs font-bold tracking-[0.2em] uppercase"
        style={{ color: layer.color }}
      >
        {layer.tier}
      </div>

      {/* Header */}
      <div>
        <div className="flex items-start gap-3 mb-1">
          <span className="text-2xl">{layer.icon}</span>
          <div>
            <h3 className="text-xl font-extrabold text-white leading-tight">{layer.label}</h3>
            <p className=" text-xs mt-1" style={{ color: layer.color }}>
              {layer.sublabel}
            </p>
          </div>
        </div>
      </div>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2">
        {layer.tech.map((t) => (
          <span
            key={t}
            className=" text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: `${layer.color}15`,
              border: `1px solid ${layer.color}40`,
              color: layer.color,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: layer.border }} />

      {/* Function */}
      <p className="text-sm text-gray-300 leading-relaxed">{layer.function}</p>

      {/* Status badge */}
      <div
        className="self-start  text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm flex items-center gap-2"
        style={{
          background: `${layer.color}10`,
          border: `1px solid ${layer.color}50`,
          color: layer.color,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: layer.color }}
        />
        {layer.badge}
      </div>
    </motion.div>
  );
}

/* ─── Node tooltip metadata ──────────────────────────────────── */
const NODE_TOOLTIPS: Record<string, { title: string; lines: string[]; color: string }> = {
  user: {
    title: 'USER_DEVICE',
    lines: ['status: CONNECTED', 'protocol: TLS_1.3', 'session: 0xB3...9A'],
    color: '#00E5FF',
  },
  fhe: {
    title: 'FHE_ENCRYPTION',
    lines: ['ciphertext: 0x7a4f...c9d2', 'scheme: TFHE-rs / Zama', 'keysize: 2048-bit'],
    color: '#00E5FF',
  },
  zkp: {
    title: 'ZKP_VERIFIER',
    lines: ['status: PROOF_VALIDATED ✓', 'circuit: Groth16', 'verify_time: 42ms'],
    color: '#818CF8',
  },
  ai: {
    title: 'AI_MODEL (BLIND)',
    lines: ['mode: BLIND_COMPUTE', 'input: CIPHERTEXT_ONLY', 'output: ENCRYPTED_INFERENCE'],
    color: '#00E5FF',
  },
  ip: {
    title: 'ETHEREUM_MAINNET',
    lines: ['minting: IP-NFT #8821...', 'contribution: VERIFIED', 'tx: 0xf7...3b'],
    color: '#818CF8',
  },

  result: {
    title: 'HEALTH_INSIGHT',
    lines: ['decrypt: CLIENT_SIDE_ONLY', 'risk_score: COMPUTED', 'integrity: VERIFIED'],
    color: '#FFFFFF',
  },
};

/* ─── Glitch hook for the BLUEPRINT watermark ───────────────── */
function useGlitch(active: boolean) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    if (!active) return;
    const fire = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    };
    fire();
    const t1 = setTimeout(fire, 600);
    const t2 = setTimeout(fire, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);
  return glitch;
}

/* ─── Terminal Tooltip ───────────────────────────────────────── */
function TerminalTooltip({ nodeId, color }: { nodeId: string; color: string }) {
  const meta = NODE_TOOLTIPS[nodeId];
  if (!meta) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute z-50 bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-52 pointer-events-none"
      style={{
        background: 'rgba(5, 10, 18, 0.97)',
        border: `1px solid ${color}55`,
        boxShadow: `0 0 24px ${color}22`,
        borderRadius: '6px',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      {/* Window bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 border-b"
        style={{ borderColor: `${color}25` }}
      >
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[8px] uppercase tracking-widest" style={{ color }}>
          {meta.title}
        </span>
      </div>
      {/* Lines */}
      <div className="px-3 py-2 space-y-1">
        {meta.lines.map((line, i) => (
          <div key={i} className="text-[9px] text-gray-400 leading-tight">
            <span style={{ color }} className="opacity-60 mr-1">›</span>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Node icons ─────────────────────────────────────────────── */
const NODE_ICONS: Record<string, string> = {
  user:   '○',
  fhe:    '⬡',
  zkp:    '✅',
  ai:     '◈',
  ip:     '◇',
  result: '✦',
};

/* ─── Individual node with hover callout ────────────────────── */
function ArchNode({ node }: { node: typeof ARCH_NODES[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: node.x, top: node.y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence>
          {hovered && <TerminalTooltip nodeId={node.id} color={node.color} />}
        </AnimatePresence>

        {/* Outer pulse ring on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="ring"
              className="absolute rounded-xl pointer-events-none"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                inset: '-4px',
                border: `1px solid ${node.color}`,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={
            hovered
              ? { scale: 1.18, boxShadow: `0 0 32px ${node.color}80, 0 0 8px ${node.color}40` }
              : { scale: 1, boxShadow: `0 0 14px ${node.color}28` }
          }
          transition={{ duration: 0.18 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center cursor-pointer gap-0.5"
          style={{
            background: `linear-gradient(135deg, ${node.color}20 0%, ${node.color}08 100%)`,
            border: `1px solid ${node.color}55`,
            color: node.color,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            textAlign: 'center',
          }}
        >
          <span className="text-base leading-none">{NODE_ICONS[node.id]}</span>
          {node.label.split('\n').map((l, i) => (
            <span key={i} className="block text-[8px] leading-tight opacity-80">{l}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Blueprint Architecture Diagram ────────────────────────── */
function ArchDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const glitch = useGlitch(inView);
  const [scanY, setScanY] = useState(0);

  /* Scanline loop */
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 3200; // ms per sweep
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = ((ts - start) % duration) / duration;
      setScanY(pct * 100);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* --- Shared SVG dimensions for % → pixel path math ---------- */
  // We use viewBox="0 0 1000 320" so % values map cleanly.
  // All node positions are re-expressed in VB units:
  //   x: 10%→100, 30%→300, 55%→550, 78%→780, 90%→900
  //   y: 50%→160, 25%→80,  75%→240
  const VB_W = 1000;
  const VB_H = 320;

  /* Privacy channel: user(100,160) → fhe(300,80) → ai(550,160) → result(900,160) */
  const privacyPath = `M 100 160 L 300 80 L 550 160 L 900 160`;
  /* Identity channel: user(100,160) → zkp(300,240) → ai(550,160) → ip(780,80) → result(900,160) */
  const identityPath = `M 100 160 L 300 240 L 550 160 L 780 80 L 900 160`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        height: '340px',
        background: 'linear-gradient(135deg, rgba(0,229,255,0.03) 0%, rgba(129,140,248,0.05) 100%)',
        border: '1px solid rgba(0,229,255,0.18)',
        boxShadow: '0 0 60px rgba(0,229,255,0.05)',
      }}
    >
      {/* ── Scanline sweep ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom,
            transparent ${scanY - 1}%,
            rgba(0,229,255,0.04) ${scanY}%,
            rgba(0,229,255,0.07) ${scanY + 0.3}%,
            rgba(0,229,255,0.04) ${scanY + 0.6}%,
            transparent ${scanY + 1.5}%
          )`,
        }}
      />

      {/* ── Full-bleed SVG for grid + paths + particles ──────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Thin grid */}
        <defs>
          <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,229,255,0.05)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />

        {/* ── Privacy channel (CYAN) ── */}
        {/* user → fhe */}
        <line x1="100" y1="160" x2="300" y2="80"
          stroke="rgba(0,229,255,0.35)" strokeWidth="1.2" strokeDasharray="6 5" />
        {/* fhe → ai */}
        <line x1="300" y1="80" x2="550" y2="160"
          stroke="rgba(0,229,255,0.35)" strokeWidth="1.2" strokeDasharray="6 5" />
        {/* ai → result */}
        <line x1="550" y1="160" x2="900" y2="160"
          stroke="rgba(0,229,255,0.35)" strokeWidth="1.2" strokeDasharray="6 5" />

        {/* ── Identity channel (INDIGO) ── */}
        {/* user → zkp */}
        <line x1="100" y1="160" x2="300" y2="240"
          stroke="rgba(129,140,248,0.35)" strokeWidth="1.2" strokeDasharray="6 5" />
        {/* zkp → ai */}
        <line x1="300" y1="240" x2="550" y2="160"
          stroke="rgba(129,140,248,0.35)" strokeWidth="1.2" strokeDasharray="6 5" />
        {/* ai → ip */}
        <line x1="550" y1="160" x2="780" y2="80"
          stroke="rgba(129,140,248,0.35)" strokeWidth="1.2" strokeDasharray="6 5" />

        {/* Channel labels */}
        <text x="185" y="100" fill="rgba(0,229,255,0.55)"
          fontSize="11" fontFamily="'JetBrains Mono',monospace"
          letterSpacing="2" textAnchor="middle">PRIVACY CHANNEL</text>
        <text x="185" y="225" fill="rgba(129,140,248,0.55)"
          fontSize="11" fontFamily="'JetBrains Mono',monospace"
          letterSpacing="2" textAnchor="middle">IDENTITY CHANNEL</text>

        {/* ── Data packets ── */}
        {inView && (
          <>
            {/* === PRIVACY CHANNEL particles === */}

            {/* Packet P1 — fast ingestion user→fhe */}
            <circle r="4" fill="#00E5FF" filter="url(#glowCyan)">
              <animateMotion
                dur="0.7s"
                begin="0s"
                repeatCount="indefinite"
                path="M 100 160 L 300 80"
                calcMode="spline"
                keySplines="0.4 0 0.6 1"
              />
              <animate attributeName="opacity" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
            </circle>

            {/* Packet P2 — slow AI pulse fhe→ai (heavy compute) */}
            <circle r="3.5" fill="#00E5FF" opacity="0.7" filter="url(#glowCyan)">
              <animateMotion
                dur="2.2s"
                begin="0.7s"
                repeatCount="indefinite"
                path="M 300 80 L 550 160"
                calcMode="spline"
                keySplines="0.9 0 0.9 1"
              />
              <animate attributeName="r" values="3.5;5;3.5" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
            </circle>

            {/* Packet P3 — burst ai→result */}
            <circle r="4.5" fill="#00E5FF" filter="url(#glowCyan)">
              <animateMotion
                dur="0.6s"
                begin="2.9s"
                repeatCount="indefinite"
                path="M 550 160 L 900 160"
                calcMode="spline"
                keySplines="0.1 0 0.3 1"
              />
              <animate attributeName="opacity" values="0;1;1;0" dur="0.6s" begin="2.9s" repeatCount="indefinite" />
            </circle>

            {/* === IDENTITY CHANNEL particles === */}

            {/* Packet I1 — fast ingestion user→zkp */}
            <circle r="3.5" fill="#818CF8" filter="url(#glowIndigo)">
              <animateMotion
                dur="0.75s"
                begin="0.4s"
                repeatCount="indefinite"
                path="M 100 160 L 300 240"
                calcMode="spline"
                keySplines="0.4 0 0.6 1"
              />
              <animate attributeName="opacity" values="0;1;1;0" dur="0.75s" begin="0.4s" repeatCount="indefinite" />
            </circle>

            {/* Packet I2 — slow ZKP verify pulse zkp→ai */}
            <circle r="3" fill="#818CF8" opacity="0.7" filter="url(#glowIndigo)">
              <animateMotion
                dur="2.4s"
                begin="1.15s"
                repeatCount="indefinite"
                path="M 300 240 L 550 160"
                calcMode="spline"
                keySplines="0.9 0 0.9 1"
              />
              <animate attributeName="r" values="3;4.5;3" dur="2.4s" begin="1.15s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.4s" begin="1.15s" repeatCount="indefinite" />
            </circle>

            {/* Packet I3 — burst ai→ip */}
            <circle r="4" fill="#818CF8" filter="url(#glowIndigo)">
              <animateMotion
                dur="0.65s"
                begin="3.55s"
                repeatCount="indefinite"
                path="M 550 160 L 780 80"
                calcMode="spline"
                keySplines="0.1 0 0.3 1"
              />
              <animate attributeName="opacity" values="0;1;1;0" dur="0.65s" begin="3.55s" repeatCount="indefinite" />
            </circle>

            {/* SVG filter defs for glow */}
            <defs>
              <filter id="glowCyan" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glowIndigo" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </>
        )}
      </svg>

      {/* ── Nodes (rendered as HTML for Framer hover) ─────────── */}
      {ARCH_NODES.map((node) => (
        <ArchNode key={node.id} node={node} />
      ))}

      {/* ── BLUEPRINT watermark with glitch ─────────────────── */}
      <div
        className="absolute top-4 left-4  text-[10px] uppercase tracking-widest select-none"
        style={{
          color: glitch ? '#00E5FF' : 'rgba(0,229,255,0.45)',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          textShadow: glitch
            ? '2px 0 #818CF8, -2px 0 #00E5FF'
            : 'none',
          transform: glitch ? 'translateX(2px)' : 'none',
          transition: 'color 0.05s, text-shadow 0.05s, transform 0.05s',
        }}
      >
        SYNTIX_ARCH_V2.BLUEPRINT
      </div>

      {/* ── Legend ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-3 right-4 flex items-center gap-4"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-px" style={{ background: 'rgba(0,229,255,0.6)', boxShadow: '0 0 4px #00E5FF' }} />
          <span style={{ color: 'rgba(0,229,255,0.55)' }}>Privacy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-px" style={{ background: 'rgba(129,140,248,0.6)', boxShadow: '0 0 4px #818CF8' }} />
          <span style={{ color: 'rgba(129,140,248,0.55)' }}>Identity</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Biomarker row metadata ─────────────────────────────────── */
const BIO_ROWS = [
  {
    key: 'glucose',
    label: 'Glucose',
    real: '94 mg/dL',
    status: 'Normal',
    severity: 'ok',
    cipher: 'ΩΨ3f9αβ...0x8c2F',
  },
  {
    key: 'cortisol',
    label: 'Cortisol',
    real: '18.2 µg/dL',
    status: 'Elevated',
    severity: 'warn',
    cipher: '0xA7f★⊗3d...Ξ₿Δ',
  },
  {
    key: 'genomicRisk',
    label: 'Genomic Risk',
    real: 'BRCA1 variant',
    status: 'Low risk',
    severity: 'ok',
    cipher: '0x★★★⊗...9f2Γ∴β',
  },
  {
    key: 'pgxAlert',
    label: 'PGx Alert',
    real: 'CYP2D6 — Avoid codeine',
    status: 'ALERT',
    severity: 'alert',
    cipher: 'Δ0xΩ⊗ΨΓ...Ξ₿★3',
  },
] as const;

type Severity = 'ok' | 'warn' | 'alert';
const SEVERITY_STYLES: Record<Severity, { badge: string; dot: string; text: string }> = {
  ok:    { badge: 'rgba(34,197,94,0.12)',  dot: '#22c55e', text: '#22c55e' },
  warn:  { badge: 'rgba(234,179,8,0.12)',  dot: '#eab308', text: '#eab308' },
  alert: { badge: 'rgba(239,68,68,0.12)',  dot: '#ef4444', text: '#ef4444' },
};

/* ─── Animated cipher stream ─────────────────────────────────── */
function CipherStream({ text }: { text: string }) {
  const chars = '█▓▒░ΩΨαβΞ₿Δ⊗★0123456789ABCDEF';
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let frame: ReturnType<typeof setTimeout>;
    const scramble = () => {
      setDisplay(
        text.split('').map((c) =>
          Math.random() > 0.6 ? chars[Math.floor(Math.random() * chars.length)] : c
        ).join('')
      );
      frame = setTimeout(scramble, 120);
    };
    scramble();
    return () => clearTimeout(frame);
  }, [text]);
  return <span className="opacity-80">{display}</span>;
}

/* ─── FHE Privacy Toggler ────────────────────────────────────── */
function PrivacyToggler() {
  const [fheActive, setFheActive] = useState(true);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  /* Live connection ticker in the window bar */
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(2,8,18,0.95) 0%, rgba(5,12,24,0.98) 100%)',
        border: '1px solid rgba(0,229,255,0.22)',
        boxShadow: '0 0 80px rgba(0,229,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      {/* ── Window bar ───────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{
          borderColor: 'rgba(0,229,255,0.12)',
          background: 'rgba(0,0,0,0.5)',
        }}
      >
        {/* Traffic lights + title */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-sm text-gray-300 tracking-wider font-medium">
            SYNTIX_HEALTH_DASHBOARD.tsx
          </span>
        </div>

        {/* Live ticker + toggle */}
        <div className="flex items-center gap-5">
          <span
            className="text-[10px] tracking-widest uppercase hidden sm:inline"
            style={{ color: fheActive ? 'rgba(0,229,255,0.55)' : 'rgba(255,255,255,0.2)' }}
          >
            {fheActive ? `[ ${['ENCRYPTING', 'COMPUTING', 'VERIFYING'][tick % 3]}... ]` : '[ DECRYPTED ]'}
          </span>
          <button
            onClick={() => setFheActive((v) => !v)}
            className="flex items-center gap-3 cursor-pointer group"
            aria-label="Toggle FHE encryption"
          >
            <span
              className={`text-xs uppercase tracking-widest transition-colors font-semibold ${
                fheActive ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              FHE {fheActive ? 'ON' : 'OFF'}
            </span>
            <div
              className="relative w-11 h-6 rounded-full transition-all duration-300"
              style={{
                background: fheActive ? 'linear-gradient(90deg,#00b4cc,#00E5FF)' : 'rgba(255,255,255,0.12)',
                boxShadow: fheActive ? '0 0 14px rgba(0,229,255,0.6)' : 'none',
              }}
            >
              <motion.div
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                animate={{ left: fheActive ? '24px' : '4px' }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Two-panel body ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* SERVER panel */}
        <div
          className="p-6 space-y-3 border-b md:border-b-0 md:border-r"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {/* Panel header */}
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: fheActive ? '#00E5FF' : '#374151' }}
            />
            <span
              className="text-xs uppercase tracking-[0.2em] font-semibold"
              style={{ color: fheActive ? 'rgba(0,229,255,0.75)' : '#4b5563' }}
            >
              Server Receives
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={fheActive ? 'srv-fhe' : 'srv-plain'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              {BIO_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between px-4 py-3 rounded-lg"
                  style={{
                    background: fheActive ? 'rgba(0,229,255,0.05)' : 'rgba(255,255,255,0.03)',
                    border: fheActive ? '1px solid rgba(0,229,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="text-[11px] text-gray-400 w-28 shrink-0 font-medium">{row.label}:</span>
                  <span
                    className="text-[11px] ml-2 overflow-hidden text-right"
                    style={{ color: fheActive ? '#00E5FF' : '#374151' }}
                  >
                    {fheActive
                      ? <CipherStream text={row.cipher} />
                      : <span className="text-gray-700">[ ENCRYPTED ]</span>
                    }
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* YOU SEE panel */}
        <div className="p-6 space-y-3">
          {/* Panel header */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-base text-biomarker">◈</span>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">You See</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={fheActive ? 'usr-fhe' : 'usr-plain'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              {BIO_ROWS.map((row) => {
                const sty = SEVERITY_STYLES[row.severity];
                return (
                  <div
                    key={row.key}
                    className="flex items-center justify-between px-4 py-3 rounded-lg"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Label + value */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{row.label}</span>
                      <span className="text-xs text-gray-100 font-medium">{row.real}</span>
                    </div>
                    {/* Status badge */}
                    <span
                      className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1.5 shrink-0 font-medium"
                      style={{
                        background: sty.badge,
                        color: sty.text,
                        border: `1px solid ${sty.dot}40`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: sty.dot }}
                      />
                      {row.status}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Status strip ─────────────────────────────────────── */}
      <div
        className="px-6 py-3 border-t flex items-center justify-between gap-4"
        style={{
          borderColor: fheActive ? 'rgba(0,229,255,0.12)' : 'rgba(255,255,255,0.06)',
          background: fheActive ? 'rgba(0,229,255,0.04)' : 'rgba(0,0,0,0.25)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">{fheActive ? '■' : '○'}</span>
          <span
            className="text-[10px] uppercase tracking-widest font-medium"
            style={{ color: fheActive ? 'rgba(0,229,255,0.75)' : '#4b5563' }}
          >
            {fheActive
              ? 'BLIND COMPUTE ACTIVE — Server never sees raw biomarkers'
              : 'Toggle ON to see how FHE protects your data'}
          </span>
        </div>
        {fheActive && (
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[10px] tracking-widest font-medium"
            style={{ color: 'rgba(0,229,255,0.55)' }}
          >
            INCO_NETWORK · ZAMA
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */
export const ProtocolStack = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <div className="bg-hero text-white">

      {/* ── Protocol Stack Section ── */}
      <section id="protocol-stack" className="py-32 relative overflow-hidden">
        {/* ambient glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: '#00E5FF' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: '#818CF8' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >

            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              The SYNTIX{' '}
              <span className="text-cyan-400">
                Protocol Stack
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Three functional layers built for clinical precision, cryptographic privacy, and
              programmable ownership of biological intelligence.
            </p>
          </motion.div>

          {/* 3-column glassmorphism cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {LAYERS.map((layer, i) => (
              <LayerCard key={layer.id} layer={layer} index={i} />
            ))}
          </div>


        </div>
      </section>

      {/* ── FHE Privacy Toggler Demo ── */}
      <section id="privacy-demo" className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Blind Computation,{' '}
              <span className="text-cyan-400">
                Real Results
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
              Toggle FHE on/off to see how SYNTIX delivers actionable health insights while the server
              only ever processes encrypted ciphertext.
            </p>
          </div>
          <PrivacyToggler />
        </div>
      </section>

    </div>
  );
};
