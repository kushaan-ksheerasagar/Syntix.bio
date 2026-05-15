'use client';

import React from 'react';
import { Shield, Dna, Lock, Target, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const MissionValues = () => {
  return (
    <section className="py-32 bg-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-biomarker/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl relative group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-biomarker rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-biomarker/10 rounded-lg text-biomarker">
                <Target size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              We exist to decentralize the global flow of health intelligence. By creating a secure and transparent infrastructure, we empower researchers to accelerate biological discovery at an unprecedented scale without ever compromising individual privacy or human sovereignty.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl relative group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo/10 rounded-lg text-indigo">
                <Eye size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Our Vision</h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              We exist to architect the world's first privacy-preserving biological intelligence layer. We are transforming health data from a fragmented liability into a catalyst for medical progress, ensuring every human possesses absolute ownership over their biological IP and genetic truth.
            </p>
          </motion.div>
        </div>

        {/* Pillars Header */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono text-biomarker uppercase tracking-[0.3em] mb-4">Core Principles</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">The Foundational Pillars</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-biomarker/30 p-8 rounded-2xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-biomarker/10 flex items-center justify-center text-biomarker mb-8">
              <Shield size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Privacy by Design</h3>
            <p className="text-gray-400 leading-relaxed">
              Data is encrypted at the source using advanced ZKP protocols. We don't see your code; the network verifies it.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-indigo/30 p-8 rounded-2xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo mb-8">
              <Dna size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Scientific Rigor</h3>
            <p className="text-gray-400 leading-relaxed">
              Bridging the gap between raw genomic sequences and clinical-grade insights through verifiable compute.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 p-8 rounded-2xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white mb-8">
              <Lock size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Radical Ownership</h3>
            <p className="text-gray-400 leading-relaxed">
              You maintain total intellectual property over your biological identity through smart contract governance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
