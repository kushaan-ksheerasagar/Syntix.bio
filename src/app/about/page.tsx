import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { TeamCard } from '@/components/about/TeamCard';
import { MissionValues } from '@/components/about/MissionValues';

export default function AboutPage() {
  return (
    <main className="bg-hero min-h-screen">
      <AboutHero />
      
      {/* Founders Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square rounded-full bg-indigo/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-indigo uppercase tracking-[0.3em] mb-4">Foundational Merit</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white">The Architects</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TeamCard 
              name="Alejandra Catacora"
              role="Cybersecurity & Blockchain Infra"
              description="Specializing in Cybersecurity Engineering and Blockchain Infrastructure. Obsessed with building 'Trustless Health Data' systems where privacy is cryptographically guaranteed, not just promised."
              imageUrl="/alejandra.png"
              github="https://github.com/"
              linkedin="https://linkedin.com/"
            />
            
            <TeamCard 
              name="Kushaan A Ksheerasagar"
              role="Genomics & Bio-Algorithms"
              description="Biologist focused on genetic algorithms and computational biology. Bridging the gap between raw biological sequences and verifiable, privacy-preserving clinical insights."
              imageUrl="/kushaan.jpg"
              github="https://github.com/"
              linkedin="https://linkedin.com/"
            />
          </div>
        </div>
      </section>

      <MissionValues />
    </main>
  );
}
