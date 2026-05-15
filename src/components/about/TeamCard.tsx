'use client';

import React from 'react';
import Image from 'next/image';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  github?: string;
  linkedin?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ name, role, description, imageUrl, github, linkedin }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-biomarker/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] overflow-hidden">
      {/* Subtle top border glow on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-biomarker to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex flex-col h-full">
        {imageUrl && (
          <div className="mb-8 relative w-full aspect-square rounded-xl overflow-hidden border border-white/5 bg-black/40 group-hover:border-biomarker/30 transition-colors duration-300">
            <Image 
              src={imageUrl} 
              alt={name} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="font-mono text-sm text-indigo uppercase tracking-wider">{role}</p>
        </div>
        
        <p className="text-gray-400 leading-relaxed flex-grow mb-8">
          {description}
        </p>
        
        <div className="flex items-center gap-4 mt-auto">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <GithubIcon size={20} />
            </a>
          )}
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#0A66C2] transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
