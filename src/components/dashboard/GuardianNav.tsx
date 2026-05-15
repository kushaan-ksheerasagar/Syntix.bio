'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface GuardianNavProps {
  walletAddress?: string;
  onSettingsOpen: () => void;
}

// ─── Deterministic Identicon ──────────────────────────────────────────────────
// Generates a 5×5 symmetric pixel grid from the wallet address hash.

function hashStr(s: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < s.length; i++) {
    bytes.push(s.charCodeAt(i) & 0xff);
  }
  // simple xor-rotate hash into 32 bytes
  const out = new Array(32).fill(0);
  for (let i = 0; i < bytes.length; i++) {
    out[i % 32] ^= (bytes[i] + i * 7) & 0xff;
  }
  return out;
}

const Identicon = ({ address, size = 36 }: { address: string; size?: number }) => {
  const hash = hashStr(address);
  const r = hash[0];
  const g = hash[1];
  const b = hash[2];
  const color = `rgb(${r},${g},${b})`;
  const dim = 5;
  const cell = size / dim;

  // 5×5 symmetric grid: left half mirrors right
  const cells: boolean[] = [];
  for (let row = 0; row < dim; row++) {
    for (let col = 0; col < dim; col++) {
      const mirrorCol = col < 3 ? col : dim - 1 - col;
      const idx = row * 3 + mirrorCol;
      cells.push((hash[idx % hash.length] & 1) === 1);
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg flex-shrink-0">
      <rect width={size} height={size} fill="#0a0a14" rx="6"/>
      {cells.map((on, i) => {
        const row = Math.floor(i / dim);
        const col = i % dim;
        return on ? (
          <rect key={i}
            x={col * cell + 1} y={row * cell + 1}
            width={cell - 2} height={cell - 2}
            fill={color} fillOpacity={0.85}
            rx="1"
          />
        ) : null;
      })}
    </svg>
  );
};

// ─── Truncate address ─────────────────────────────────────────────────────────

function truncate(addr: string): string {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

// ─── Copy hook ────────────────────────────────────────────────────────────────

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);
  return { copied, copy };
}

// ─── Network status dot ───────────────────────────────────────────────────────

const NetworkDot = ({ online = true }: { online?: boolean }) => (
  <span className="relative flex-shrink-0 w-2 h-2">
    {online && (
      <motion.span
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-emerald-400"
      />
    )}
    <span className={`relative block w-2 h-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-gray-500'}`} />
  </span>
);

// ─── Wallet menu dropdown ─────────────────────────────────────────────────────

const WalletMenu = ({
  address,
  onSettings,
  onClose,
}: {
  address: string;
  onSettings: () => void;
  onClose: () => void;
}) => {
  const { copied, copy } = useCopy();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
      className="absolute right-0 top-full mt-2 w-72 bg-[#080c14] border border-white/[0.09] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50"
    >
      {/* Address block */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3">
          <Identicon address={address} size={40} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <NetworkDot online />
              <span className="text-[10px] text-emerald-400 uppercase tracking-[0.18em]">Inco Network · Active</span>
            </div>
            <p className="text-white font-medium text-sm tracking-wide">Guardian Node</p>
          </div>
        </div>

        <button
          onClick={() => copy(address)}
          className="w-full flex items-center justify-between gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2.5 hover:border-white/[0.14] transition-all group"
        >
          <span className="font-mono text-xs text-gray-300 tracking-wider">{address}</span>
          <span className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0">
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="1" y="4" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="#080c14"/>
              </svg>
            )}
          </span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-b border-white/[0.06]">
        {[
          { label: 'IP-NFTs',  value: '3'       },
          { label: 'Earned',   value: '0.21 ETH' },
          { label: 'ZK Proofs',value: '847'     },
        ].map((s) => (
          <div key={s.label} className="px-3 py-3 text-center">
            <p className="text-white font-semibold text-sm">{s.value}</p>
            <p className="text-gray-600 text-[10px] uppercase tracking-wider mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="p-2">
        {[
          {
            label: 'Privacy & Security',
            sub: 'FHE levels, node permissions',
            icon: (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L2 3.5v4c0 3.09 2.133 5.99 5 6.96C9.867 13.49 12 10.59 12 7.5v-4L7 1z"
                  stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M5 7l1.5 1.5L9.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
            action: () => { onSettings(); onClose(); },
            color: 'text-biomarker',
          },
          {
            label: 'BioWallet Settings',
            sub: 'Metadata, key export',
            icon: (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 4.5C7 4.5 8 5.5 8 7s-1 2.5-1 2.5M6 4.5C6 4.5 5 5.5 5 7s1 2.5 1 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M4 7h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            ),
            action: () => { onSettings(); onClose(); },
            color: 'text-indigo',
          },
        ].map((item) => (
          <button key={item.label}
            onClick={item.action}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors text-left group"
          >
            <span className={`${item.color} flex-shrink-0`}>{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 font-medium">{item.label}</p>
              <p className="text-[11px] text-gray-600 mt-0.5">{item.sub}</p>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>

      {/* Disconnect */}
      <div className="px-2 pb-2 pt-1 border-t border-white/[0.05]">
        <Link href="/"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-500/[0.08] text-gray-500 hover:text-red-400 transition-colors text-sm"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8.5 1.5h2a1 1 0 011 1v8a1 1 0 01-1 1h-2M5.5 9.5L8.5 6.5 5.5 3.5M8.5 6.5H1.5"
              stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Disconnect BioWallet
        </Link>
      </div>
    </motion.div>
  );
};

// ─── Main Nav ─────────────────────────────────────────────────────────────────

export const GuardianNav = ({ walletAddress = '0x7f2a918c4D3B91a3', onSettingsOpen }: GuardianNavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const display = truncate(walletAddress);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-5 lg:px-8 h-14 bg-hero/90 backdrop-blur-xl border-b border-white/[0.05]">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-6 h-6 relative">
          <div className="absolute inset-0 bg-biomarker/20 blur-sm rounded-full" />
          <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" className="relative z-10 w-full h-full">
            <path d="M12 2L3 7v5c0 5.523 3.81 10.694 9 12 5.19-1.306 9-6.477 9-12V7L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12.5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-extrabold tracking-[0.14em] text-white text-sm group-hover:text-biomarker/90 transition-colors">
          SYNTIX
        </span>
        <span className="hidden sm:inline-flex text-[9px] uppercase tracking-[0.2em] text-biomarker/60 border border-biomarker/15 bg-biomarker/[0.06] px-2 py-0.5 rounded-full">
          Guardian
        </span>
      </Link>

      {/* Centre: live status strip */}
      <div className="hidden md:flex items-center gap-1.5 text-[10px] text-gray-600 uppercase tracking-[0.18em]">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-biomarker flex-shrink-0"
        />
        Blind Compute Active · Inco Network
      </div>

      {/* Right: wallet block */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-200 group"
          aria-label="Wallet menu"
        >
          <Identicon address={walletAddress} size={26} />
          <div className="hidden sm:flex flex-col items-start">
            <span className="font-mono text-xs text-gray-200 tracking-wider leading-none">{display}</span>
            <span className="text-[9px] text-gray-600 mt-0.5 leading-none">Guardian · Verified</span>
          </div>
          <NetworkDot online />
          {/* Cog */}
          <motion.svg
            width="13" height="13" viewBox="0 0 13 13" fill="none"
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-gray-500 group-hover:text-gray-300 transition-colors"
          >
            <path d="M6.5 8.5a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M10.5 6.5h.5M2 6.5h.5M6.5 2v.5M6.5 10v.5M9.243 3.757l-.353.354M4.11 8.89l-.354.353M9.243 9.243l-.353-.353M4.11 4.11l-.354-.353"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </motion.svg>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="relative z-50">
                <WalletMenu
                  address={walletAddress}
                  onSettings={onSettingsOpen}
                  onClose={() => setMenuOpen(false)}
                />
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default GuardianNav;
