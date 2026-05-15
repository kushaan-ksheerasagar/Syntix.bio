'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


export const Footer = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-hero text-gray-400 border-t border-white/10">



      {/* ── Main footer grid ── */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* ── Brand column ── */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col items-start mb-6">
              <div 
                className="relative w-[384px] h-[56px] -ml-4"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                }}
              >
                <Image src="/logo-new.png" alt="SYNTIX Logo" fill className="object-contain mix-blend-screen" />
              </div>
              <a href="mailto:syntix.bio@gmail.com" className="mt-4 flex items-center gap-2 text-white font-mono text-sm tracking-widest hover:text-biomarker transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                syntix.bio@gmail.com
              </a>
            </div>

            <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-6">
              The Decentralized Personal Health Intelligence Layer. Programmable consent and verifiable compute for 3D genomic architecture.
            </p>



            <div className="font-mono text-xs text-gray-600 uppercase tracking-widest">
              © 2026 Sentinel Layer. DPHIL Protocol.
            </div>
          </div>

          {/* ── Developers column ── */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-sm tracking-widest uppercase">Developers</h4>
            <ul className="space-y-4 text-sm font-mono">
              <li><a href="#" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> Protocol Docs</a></li>
              <li><a href="#" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> API Reference</a></li>
              <li><a href="#" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> OpenPGx Standard</a></li>
              <li><a href="#" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> GitHub</a></li>
            </ul>
          </div>

          {/* ── Ecosystem column ── */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-sm tracking-widest uppercase">Ecosystem</h4>
            <ul className="space-y-4 text-sm font-mono">
              <li><a href="#" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> BioDAO Grants</a></li>
              <li><a href="#" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> Network State</a></li>
            </ul>
          </div>

          {/* ── Legal column ── */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-sm tracking-widest uppercase">Legal</h4>
            <ul className="space-y-4 text-sm font-mono">
              <li><a href="/privacy" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> Privacy Policy</a></li>
              <li><a href="/privacy" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> Cookie Policy</a></li>
              <li><a href="/privacy" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> Disclaimer</a></li>
              <li><a href="/privacy" className="hover:text-biomarker transition-colors flex items-center gap-2"><span className="text-indigo">→</span> Data Consent</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};
