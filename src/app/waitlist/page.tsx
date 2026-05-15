'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WaitlistPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      organization: formData.get('organization'),
      source: formData.get('source'),
    };

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#020819] flex flex-col items-center justify-center text-white relative">
        <div className="text-center z-10 px-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center mx-auto mb-6 text-[#00E5FF]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">You're on the list.</h1>
          <p className="text-gray-400 max-w-md mx-auto mb-10">
            Thank you for your interest in SYNTIX. We'll be in touch soon with your exclusive beta access.
          </p>
          <Link href="/" className="inline-block bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-3 rounded-lg transition-colors uppercase tracking-widest text-sm">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020819] py-20 px-6 flex flex-col items-center justify-center text-white relative">
      <div className="w-full max-w-2xl z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Join the <span className="font-bold text-[#00E5FF]">Waitlist</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Register your interest to secure early access to the SYNTIX protocol.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/[0.05] p-8 md:p-12 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name *</label>
              <input required name="name" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00E5FF] transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address *</label>
              <input required name="email" type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00E5FF] transition-colors" placeholder="john@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Role / Interest *</label>
              <select required name="role" defaultValue="" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00E5FF] transition-colors appearance-none text-white">
                <option value="" disabled>Select your intent</option>
                <option value="Guardian (Individual)">Enter as Guardian (Individual Data Owner)</option>
                <option value="Curator (Institution)">Enter as Curator (Lab / Institution)</option>
                <option value="Investor">Investor / Partner</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Organization (Optional)</label>
              <input name="organization" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00E5FF] transition-colors" placeholder="Company or University" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">How did you hear about us? *</label>
            <input required name="source" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00E5FF] transition-colors" placeholder="e.g. LinkedIn, Twitter, Colleague" />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              Something went wrong sending your request. Please try again or check your .env.local configuration.
            </div>
          )}

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-[#00E5FF] text-[#050813] font-bold uppercase tracking-widest px-6 py-4 rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 flex justify-center items-center gap-3"
            >
              {status === 'loading' ? (
                <><span className="w-4 h-4 border-2 border-[#050813] border-t-transparent rounded-full animate-spin"/> Processing...</>
              ) : 'Submit Application'}
            </button>
          </div>
          
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mt-6">
            Your data is strictly confidential.
          </p>
        </form>

        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
