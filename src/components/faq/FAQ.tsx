'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Cpu } from 'lucide-react';

const regulatoryFaqs = [
  {
    q: 'Is the Syntix platform HIPAA and GDPR compliant?',
    a: 'Yes. We implement administrative, physical, and technical safeguards. Our architecture maps to HIPAA requirements by ensuring encryption at rest (AES-256 in IP-Vaults) and in transit (TLS 1.3), along with immutable audit logs for six years. We sign Business Associate Agreements (BAAs) with all HIPAA-eligible cloud service tiers.'
  },
  {
    q: 'How does the "Right to be Forgotten" work on an immutable blockchain?',
    a: 'We solve the GDPR Article 17 conflict through a "Hybrid Off-Chain" model. While the record hash is permanent on the Story Network, the actual health data is stored in an encrypted off-chain IP Vault. Upon a deletion request, we trigger a "Cryptographic Shredding" event where the decryption keys are permanently purged from the IP Vault, rendering the data and its on-chain commitments inaccessible and functionally "forgotten".'
  },
  {
    q: 'Who acts as the Data Controller in this decentralized model?',
    a: 'Under our "Sovereign Health" paradigm, the patient acts as the primary Data Controller. The Syntix Protocol and Story Network act as Data Processors, executing the patient\'s explicit "Programmable IP License" (PIL) terms.'
  }
];

const technicalFaqs = [
  {
    q: 'How do you solve the latency issues typical of FHE?',
    a: 'We utilize a "Two-Layer Compute Strategy." Simple linear operations are performed via Leveled FHE on a decentralized network of H100-accelerated nodes, which reduces latency by 30x. Complex non-linear activations are offloaded to a "Client-Server Hybrid Protocol" where the client handles small non-linear batches to avoid the full cost of functional bootstrapping.'
  },
  {
    q: 'How is the authenticity of health data verified before it is minted as an IP-NFT?',
    a: 'We utilize "Proof-of-Creativity" attestations. Before a Bio-IP Asset is registered, it must receive a cryptographic signature from a verified healthcare provider or diagnostic lab. This ensures that "Garbage In" does not result in "IP-NFT Out".'
  },
  {
    q: 'What is the cost per diagnostic transaction?',
    a: 'By utilizing the Story Network\'s optimized execution layer and precompiled primitives, we aim for a transaction cost reduction of up to 96% compared to legacy Layer-1 blockchains, with target gas consumption below 250,000 gas per validation.'
  }
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className="text-lg font-semibold text-white group-hover:text-biomarker transition-colors">
          {q}
        </span>
        <ChevronDown 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-biomarker' : ''}`}
          size={20}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 font-sans leading-relaxed text-sm">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  return (
    <section className="py-32 bg-hero relative overflow-hidden" id="faq">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-biomarker/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono text-biomarker uppercase tracking-[0.3em] mb-4">Compliance & Security</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Managing Sensitive Data</h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A robust, compliance-first architecture designed to meet the rigorous demands of institutional partners and ensure patient sovereignty.
          </p>
        </div>

        <div className="space-y-12">
          {/* Regulatory Section */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center text-indigo">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-2xl font-bold text-white tracking-tight">Regulatory & Compliance</h4>
            </div>
            <div className="space-y-2">
              {regulatoryFaqs.map((faq, idx) => (
                <FaqItem key={idx} {...faq} />
              ))}
            </div>
          </div>

          {/* Technical Section */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-biomarker/10 flex items-center justify-center text-biomarker">
                <Cpu size={24} />
              </div>
              <h4 className="text-2xl font-bold text-white tracking-tight">Technical & Performance</h4>
            </div>
            <div className="space-y-2">
              {technicalFaqs.map((faq, idx) => (
                <FaqItem key={idx} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
