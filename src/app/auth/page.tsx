'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Fingerprint } from 'lucide-react';

type FlowStep = 'path-selector' | 'onboarding-guardian' | 'onboarding-curator' | 'connecting' | 'verifying';
type Role = 'guardian' | 'curator' | null;

export default function AuthPage() {
  const [step, setStep] = useState<FlowStep>('path-selector');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const router = useRouter();

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  const startConnectionFlow = (role: Role) => {
    if (role === 'guardian') {
      router.push('/dashboard/guardian');
    } else {
      router.push('/dashboard/institute');
    }
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    startConnectionFlow(role);
  };

  const handleCuratorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startConnectionFlow('curator');
  };

  const handleGuardianSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startConnectionFlow('guardian');
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col relative overflow-hidden font-sans text-white">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 sm:px-12 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative transition-transform duration-300 group-hover:scale-110">
            <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full" />
            <Fingerprint className="w-full h-full text-cyan-400 relative z-10" />
          </div>
          <span className="font-extrabold tracking-[0.15em] text-lg">SYNTIX</span>
        </Link>
        <Link href="/" className="text-sm font-mono text-gray-400 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: PATH SELECTOR */}
          {step === 'path-selector' && (
            <motion.div
              key="path-selector"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center w-full max-w-5xl"
            >
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                  Select your <span className="font-bold text-cyan-400">Node Identity</span>
                </h1>
                <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
                  Welcome to the SYNTIX Gateway. Choose your role to initialize the secure environment and connect your web3 wallet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 md:px-0">
                {/* GUARDIAN CARD */}
                <button
                  onClick={() => handleRoleSelect('guardian')}
                  className="group relative flex flex-col items-center text-center p-10 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:bg-cyan-400/[0.04] hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(34,211,238,0.25)]"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="mb-8 rounded-2xl bg-cyan-400/10 p-5 text-cyan-400 transition-transform duration-500 group-hover:scale-110 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M14.5 9c-2.5 1.5-2.5 4.5 0 6M9.5 9c2.5 1.5 2.5 4.5 0 6"/>
                      <path d="M12 8v8"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Enter as Guardian</h3>
                  <p className="text-base text-gray-400 leading-relaxed mb-10 flex-grow max-w-xs mx-auto">
                    Take absolute sovereignty over your biological data. Compute blindly. Monetize on your own terms.
                  </p>
                  <div className="mt-auto px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                    Personal · Private · Sovereign
                  </div>
                </button>

                {/* CURATOR CARD */}
                <button
                  onClick={() => handleRoleSelect('curator')}
                  className="group relative flex flex-col items-center text-center p-10 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-indigo-400/50 hover:bg-indigo-400/[0.04] hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.25)]"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-400/0 to-indigo-400/0 group-hover:from-indigo-400/5 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="mb-8 rounded-2xl bg-indigo-400/10 p-5 text-indigo-400 transition-transform duration-500 group-hover:scale-110 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Enter as Curator</h3>
                  <p className="text-base text-gray-400 leading-relaxed mb-10 flex-grow max-w-xs mx-auto">
                    Access high-fidelity, anonymized genomic datasets for institutional research and breakthroughs.
                  </p>
                  <div className="mt-auto px-5 py-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                    Institutional · Verified · Compliant
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 1.4: GUARDIAN ONBOARDING (KYC) */}
          {step === 'onboarding-guardian' && (
            <motion.div
              key="onboarding-guardian"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center w-full max-w-xl"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-light text-white mb-4">Identity Verification</h2>
                <p className="text-gray-400 text-sm">
                  To protect your biological IP and prevent phishing, please verify your sovereign identity. 
                  This data is encrypted locally and never leaves your device unencrypted.
                </p>
              </div>

              <form onSubmit={handleGuardianSubmit} className="w-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Full Legal Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Country of Residence</label>
                      <input required type="text" placeholder="e.g. Switzerland" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">National ID / Passport Number</label>
                    <input required type="text" placeholder="Document ID for IP-NFT Minting" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors" />
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                    <input required type="checkbox" id="compliance-guardian" className="mt-1 accent-cyan-400" />
                    <label htmlFor="compliance-guardian" className="text-xs text-gray-400 leading-relaxed">
                      I confirm that this is my true biological identity. I understand that misrepresenting my identity for IP-NFT creation violates the SYNTIX protocol terms.
                    </label>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button type="button" onClick={() => setStep('path-selector')} className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                    Back
                  </button>
                  <button type="submit" className="flex-2 w-full px-6 py-3 rounded-xl font-semibold text-cyan-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    Verify & Connect BioWallet
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* SCREEN 1.5: CURATOR ONBOARDING (KYB/KYC) */}
          {step === 'onboarding-curator' && (
            <motion.div
              key="onboarding-curator"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center w-full max-w-xl"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-light text-white mb-4">Institutional Verification</h2>
                <p className="text-gray-400 text-sm">
                  SYNTIX operates a compliant custodial vault. Please provide your institutional details to request a secure node.
                </p>
              </div>

              <form onSubmit={handleCuratorSubmit} className="w-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Legal Representative</label>
                      <input required type="text" placeholder="Full Legal Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Jurisdiction / Country</label>
                      <input required type="text" placeholder="e.g. United States" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Organization Name</label>
                      <input required type="text" placeholder="e.g. Stanford Medical Research" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Institutional Email</label>
                      <input required type="email" placeholder="researcher@university.edu" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Registration No. (EIN / ID)</label>
                      <input required type="text" placeholder="Official Registration ID" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Compliance Certification</label>
                      <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400 transition-colors appearance-none">
                        <option value="" disabled selected>Select Certification Standard</option>
                        <option value="hipaa">HIPAA Compliance (US)</option>
                        <option value="gdpr">GDPR Adherence (EU)</option>
                        <option value="iso27001">ISO/IEC 27001 Certified</option>
                        <option value="other">Other / IRB Approved</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Research Intent (Encrypted)</label>
                    <textarea required placeholder="Briefly describe the purpose of your data access request, specific biomarkers needed, and methodology..." rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-400 transition-colors resize-none" />
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-400/10 border border-indigo-400/20">
                    <input required type="checkbox" id="compliance" className="mt-1 accent-indigo-400" />
                    <label htmlFor="compliance" className="text-xs text-gray-400 leading-relaxed">
                      I acknowledge that all computation on SYNTIX is performed blindly via FHE. Raw genomic data will never be decrypted or exported to our servers.
                    </label>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button type="button" onClick={() => setStep('path-selector')} className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                    Back
                  </button>
                  <button type="submit" className="flex-2 w-full px-6 py-3 rounded-xl font-semibold text-indigo-900 bg-indigo-400 hover:bg-indigo-300 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    Submit & Connect Node
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* SCREEN 2: CONNECTING */}
          {step === 'connecting' && (
            <motion.div
              key="connecting"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center justify-center w-full max-w-md"
            >
              <div className="relative w-32 h-32 mb-12">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent ${selectedRole === 'guardian' ? 'border-t-cyan-400 border-r-cyan-400/30' : 'border-t-indigo-400 border-r-indigo-400/30'}`}
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-3 rounded-full border-b-2 border-l-2 border-transparent ${selectedRole === 'guardian' ? 'border-b-cyan-400 border-l-cyan-400/30' : 'border-b-indigo-400 border-l-indigo-400/30'}`}
                />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {selectedRole === 'guardian' ? '⬡' : '◈'}
                </div>
              </div>
              <h2 className="text-3xl font-light text-white mb-4">Awaiting Signature</h2>
              <p className="text-gray-400 font-mono text-sm tracking-wide text-center">
                Please confirm the secure connection request in your BioWallet. This signature does not cost gas.
              </p>
            </motion.div>
          )}

          {/* SCREEN 3: VERIFYING ZKP */}
          {step === 'verifying' && (
            <motion.div
              key="verifying"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center justify-center w-full max-w-md"
            >
              <div className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-full shadow-2xl">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="font-mono text-sm text-gray-300 space-y-4"
                >
                  <div className="flex justify-between items-center gap-8 border-b border-white/5 pb-3">
                    <span className="text-gray-500">[STATUS]</span> 
                    <span className="text-green-400 font-semibold tracking-wide">Verifying Identity Proof</span>
                  </div>
                  <div className="flex justify-between items-center gap-8 border-b border-white/5 pb-3">
                    <span className="text-gray-500">[CIRCUIT]</span> 
                    <span>Groth16 ZK-SNARK</span>
                  </div>
                  <div className="flex justify-between items-center gap-8 text-indigo-300">
                    <span className="text-gray-500">[HASH]</span> 
                    <span>0x7f2a...8c91</span>
                  </div>
                </motion.div>
              </div>
              <h2 className="text-3xl font-light text-white mb-4">Establishing Session</h2>
              <p className="text-gray-400 font-mono text-sm tracking-wide text-center animate-pulse">
                Validating Zero-Knowledge Proofs on-chain...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
