'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  audience:      string;
  audienceColor: 'teal' | 'indigo' | 'white';
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    audience: 'Biotech Scientist', audienceColor: 'teal',
    q: 'How do you guarantee my data is never exposed during computation?',
    a: 'We use Fully Homomorphic Encryption (FHE) — computation runs directly on ciphertext, never touching plaintext. Your genomic data is encrypted on-device before it moves anywhere. Twelve decentralized H100 nodes execute the computation and return a ZK-SNARK confirming the result without revealing the input. Not even our own infrastructure can read your data.',
  },
  {
    audience: 'Research Institution', audienceColor: 'indigo',
    q: 'How does a lab or institution access SYNTIX datasets for research?',
    a: 'Institutional partners apply for a Programmable IP License (PIL) via our Research Gateway — specifying scope, purpose, duration, and compensation. Each data owner approves or rejects the proposal on-chain. Upon approval, FHE-encrypted computations run against the dataset; your institution receives verified insights and statistical outputs, never raw data. All transactions are logged immutably and BAAs are auto-generated.',
  },
  {
    audience: 'Individual User', audienceColor: 'white',
    q: 'What is an IP-NFT and how is my biological data recorded?',
    a: 'An IP-NFT is a blockchain token representing your legal ownership of a verified biological insight — a title deed for your genome. Every research use of your data is recorded permanently on Ethereum — a verifiable, portable proof of your biological contribution. You set the license terms, the scope, and who gets access.',
  },

  {
    audience: 'Investor', audienceColor: 'teal',
    q: 'What fundamentally differentiates SYNTIX from Nebula Genomics or EncrypGen?',
    a: "Nebula and EncrypGen are marketplaces — they still hold your data. SYNTIX is a compute protocol. We never hold raw data. FHE means all computation happens on encrypted inputs; Ethereum integration makes every dataset a registered IP asset with verifiable on-chain contribution records. We're the cryptographic infrastructure layer these platforms could run on top of — not another biobank with better branding.",

  },
  {
    audience: 'Privacy', audienceColor: 'indigo',
    q: 'Can my genetic data be hacked if I connect to SYNTIX?',
    a: "The traditional attack surface doesn't exist here. Your raw data never transits our servers — it's encrypted locally and stays encrypted throughout computation. Any interception yields only FHE ciphertext, computationally indistinguishable from random noise without your private key. ZK-SNARKs mean any tampering produces an invalid proof and gets auto-rejected. GDPR Cryptographic Shredding permanently purges decryption keys on request.",
  },
  {
    audience: 'Blockchain Novice', audienceColor: 'white',
    q: 'Do I need to understand crypto or blockchain to use SYNTIX?',
    a: "No — this was a core design requirement. Your BioWallet abstracts all blockchain complexity. Connecting takes under 60 seconds; we handle wallet creation, key management, and on-chain transactions in the background. Your contribution records appear in a clean dashboard. You never need to know what gas fees or smart contracts are. The protocol layer is there for developers who want it — never required for end users.",

  },
];

const audienceStyles = {
  teal:   { base: 'text-biomarker border-biomarker/20', active: 'text-biomarker border-biomarker/30 bg-biomarker/[0.08]' },
  indigo: { base: 'text-indigo border-indigo/20',       active: 'text-indigo border-indigo/30 bg-indigo/[0.08]' },
  white:  { base: 'text-gray-400 border-white/10',      active: 'text-gray-300 border-white/20 bg-white/[0.05]' },
} as const;

interface AccordionItemProps { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void; }

const AccordionItem = ({ item, index, isOpen, onToggle }: AccordionItemProps) => {
  const styles = audienceStyles[item.audienceColor];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`relative rounded-xl border overflow-hidden transition-all duration-300 ${
        isOpen ? 'border-white/[0.12] bg-white/[0.04] shadow-[0_0_40px_rgba(0,229,255,0.04)]' : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.11]'
      }`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-biomarker to-indigo origin-top rounded-l-xl pointer-events-none" />
        )}
      </AnimatePresence>
      <button onClick={onToggle} aria-expanded={isOpen}
        className="w-full flex items-start gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-biomarker/50">
        <span className={`mt-0.5 flex-shrink-0 text-[11px] uppercase tracking-[0.2em] px-2.5 py-1 rounded border transition-all duration-200 ${isOpen ? styles.active : styles.base}`}>
          {item.audience}
        </span>
        <span className={`flex-1 text-base md:text-[17px] font-medium leading-snug transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-300'}`}>
          {item.q}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.24 }}
          className={`flex-shrink-0 mt-0.5 transition-colors duration-200 ${isOpen ? 'text-biomarker' : 'text-gray-500'}`}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
            <p className="px-6 pb-6 pt-1 pl-24 text-gray-400 leading-relaxed text-sm md:text-[15px] font-light">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FinalCTA = () => (
  <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.65, delay: 0.15 }} className="mt-20">
    <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl overflow-hidden p-10 md:p-14 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-biomarker/[0.05] via-transparent to-indigo/[0.06] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] rounded-full bg-biomarker/[0.06] blur-[80px] pointer-events-none" />
      <div className="relative z-10">
        <p className="text-biomarker uppercase tracking-[0.28em] text-xs mb-5">Your biology awaits</p>
        <h3 className="text-3xl md:text-[2.6rem] font-light text-white leading-tight mb-4">
          Ready to{' '}
          <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-biomarker to-indigo">
            own your biology?
          </strong>
        </h3>
        <p className="text-gray-400 mb-10 max-w-md mx-auto font-light leading-relaxed">
          Join the waitlist — be among the first to turn your biological data into sovereign, verifiable biological IP.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative inline-flex items-center gap-2.5 px-10 py-4 bg-biomarker text-hero text-sm font-bold uppercase tracking-widest rounded-sm overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_70px_rgba(0,229,255,0.55)]">
            <span className="relative z-10 flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1 6h12" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="10.5" cy="8.5" r="0.9" fill="currentColor" />
              </svg>
              VIEW DEMO
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-biomarker translate-x-[-102%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>
          <span className="text-gray-600 text-sm hidden sm:inline">or</span>
          <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/20 hover:decoration-white/50">
            Talk to our science team &#8594;
          </button>
        </div>
        <p className="mt-8 text-[11px] text-gray-600 uppercase tracking-widest">
          No wallet required to join &middot; No data collected at signup
        </p>
      </div>
    </div>
  </motion.div>
);

const ContactBox = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.get('email'), question: formData.get('question') }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8 mb-16 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 md:p-10">
      <h3 className="text-2xl font-light text-white mb-2">Still have questions?</h3>
      <p className="text-gray-400 text-sm mb-6 font-light">Drop us a message and our science team will get back to you.</p>
      
      {status === 'success' ? (
        <div className="bg-biomarker/10 border border-biomarker/20 text-biomarker p-4 rounded-xl text-sm font-medium flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Question sent successfully! We'll be in touch.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required name="email" type="email" placeholder="Your email address" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-biomarker transition-colors" />
          <textarea required name="question" placeholder="Ask us anything..." rows={3} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-biomarker transition-colors resize-none" />
          <button type="submit" disabled={status === 'loading'} className="self-end px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2">
            {status === 'loading' && <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {status === 'loading' ? 'Sending...' : 'Send Question'}
          </button>
          {status === 'error' && <p className="text-red-400 text-xs mt-2 text-right">Failed to send message. Please try again.</p>}
        </form>
      )}
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  return (
    <section id="faq" className="relative py-32 bg-hero overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-biomarker/[0.03] blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-indigo/[0.04] blur-[100px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-biomarker uppercase tracking-[0.3em] text-xs mb-4">
            Everything you need to know
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Frequently asked{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-biomarker to-indigo">questions</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="text-gray-500 mt-5 text-lg font-light">
            From scientists and institutions to first-time users and investors.
          </motion.p>
        </div>
        <div className="space-y-2.5 mb-10">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} item={item} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} />
          ))}
        </div>
        <ContactBox />
        <FinalCTA />
      </div>
    </section>
  );
};

export default FAQSection;
