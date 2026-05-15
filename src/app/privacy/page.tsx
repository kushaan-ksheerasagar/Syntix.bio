import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SYNTIX',
  description: 'Policies, legal terms, and data governance principles for SYNTIX.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-hero relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050813] via-[#050813]/95 to-black pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">SYNTIX — Policies &amp; Legal Information</h1>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert prose-cyan max-w-none">
          <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
            Welcome to SYNTIX.
            <br /><br />
            This page outlines the policies, legal terms, and data governance principles that guide how SYNTIX operates. Because SYNTIX works with sensitive biological and genomic information, transparency, privacy, and user control are foundational to our platform.
            <br /><br />
            By using SYNTIX, you acknowledge and agree to the policies described below.
          </p>

          <hr className="border-white/10 my-12" />

          {/* 1. Privacy Policy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">1. Privacy Policy</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
            <p className="text-zinc-300 mb-6">SYNTIX is committed to protecting the privacy and security of user data.</p>
            <p className="text-zinc-300 mb-8">We collect and process biological and platform-related information solely to provide genomic interpretation, infrastructure services, secure access management, and platform functionality.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Information We Collect</h3>
            <p className="text-zinc-300 mb-4">Depending on platform usage, SYNTIX may collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-cyan-500">
              <li>Account and authentication information</li>
              <li>Uploaded genomic files (such as VCF files)</li>
              <li>Biomarker and laboratory reports</li>
              <li>User-generated platform activity</li>
              <li>Device and browser information</li>
              <li>Consent and permission records</li>
              <li>Blockchain wallet interactions (if applicable)</li>
              <li>Platform analytics and usage metrics</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">How We Use Information</h3>
            <p className="text-zinc-300 mb-4">User data may be used for:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-cyan-500">
              <li>Genomic interpretation and report generation</li>
              <li>Platform functionality and account management</li>
              <li>Security, fraud prevention, and infrastructure monitoring</li>
              <li>User-controlled permission management</li>
              <li>Research participation approved by the user</li>
              <li>Product improvement and analytics</li>
            </ul>
            <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl mb-8">
              <p className="text-cyan-400 font-semibold m-0">SYNTIX does not sell raw genomic data.</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Data Ownership</h3>
            <p className="text-zinc-300 mb-4 font-semibold text-white">Users retain ownership of their uploaded biological and genomic data.</p>
            <p className="text-zinc-300 mb-4">SYNTIX provides infrastructure, interpretation tools, and permission management systems while users maintain control over:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-cyan-500">
              <li>access permissions</li>
              <li>data visibility</li>
              <li>research participation</li>
              <li>data deletion requests</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Data Security</h3>
            <p className="text-zinc-300 mb-4">SYNTIX uses encrypted infrastructure and secure cloud architecture to protect user information.</p>
            <p className="text-zinc-300 mb-4">Security measures may include:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-cyan-500">
              <li>encrypted storage</li>
              <li>secure authentication</li>
              <li>permission-based access systems</li>
              <li>blockchain auditability</li>
              <li>infrastructure monitoring</li>
            </ul>
            <p className="text-zinc-400 italic mb-8">While we implement industry-standard protections, no digital system can guarantee absolute security.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Research Participation</h3>
            <p className="text-zinc-300 mb-4">Participation in research programs or data-sharing initiatives is entirely optional.</p>
            <p className="text-zinc-300 mb-4">Users must explicitly approve:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-cyan-500">
              <li>who can access data</li>
              <li>what data is accessed</li>
              <li>how long permissions remain active</li>
            </ul>
            <p className="text-zinc-300 mb-8">Permissions may be revoked by the user at any time where technically feasible.</p>

            <h3 className="text-xl font-semibold text-white mb-4">User Rights</h3>
            <p className="text-zinc-300 mb-4">Users may request to:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-cyan-500">
              <li>export their data</li>
              <li>delete accounts</li>
              <li>revoke permissions</li>
              <li>close platform access</li>
              <li>request clarification regarding data usage</li>
            </ul>
            <p className="text-zinc-300 mb-8">Requests may be submitted through official SYNTIX support channels.</p>

            <h3 className="text-xl font-semibold text-white mb-4">AI &amp; Interpretation Disclaimer</h3>
            <p className="text-zinc-300 mb-4 font-semibold">Reports generated through SYNTIX are informational and educational in nature.</p>
            <p className="text-zinc-300 mb-4">SYNTIX does not provide:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-cyan-500">
              <li>medical diagnosis</li>
              <li>treatment recommendations</li>
              <li>clinical decision-making</li>
              <li>guaranteed biological predictions</li>
            </ul>
            <p className="text-zinc-300 mb-8">Users should consult licensed healthcare professionals before making medical decisions.</p>
          </section>

          <hr className="border-white/10 my-12" />

          {/* 2. Terms of Service */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">2. Terms of Service</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Acceptance of Terms</h3>
            <p className="text-zinc-300 mb-8">By accessing or using SYNTIX, users agree to comply with these Terms of Service and all applicable laws and regulations.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Platform Purpose</h3>
            <p className="text-zinc-300 mb-4">SYNTIX provides infrastructure and interpretation tools related to biological and genomic data.</p>
            <p className="text-zinc-300 mb-8">The platform is intended for informational, educational, and infrastructure-related purposes only.</p>

            <h3 className="text-xl font-semibold text-white mb-4">No Medical Advice</h3>
            <p className="text-zinc-300 mb-4 font-semibold">SYNTIX is not a medical provider.</p>
            <p className="text-zinc-300 mb-4">The platform does not provide:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-purple-500">
              <li>diagnosis</li>
              <li>treatment</li>
              <li>medical recommendations</li>
              <li>clinical decision support</li>
            </ul>
            <p className="text-zinc-300 mb-8">All reports and insights are informational in nature.</p>

            <h3 className="text-xl font-semibold text-white mb-4">User Responsibilities</h3>
            <p className="text-zinc-300 mb-4">Users are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-purple-500">
              <li>maintaining account security</li>
              <li>ensuring uploaded data accuracy</li>
              <li>complying with applicable laws</li>
              <li>managing permission settings responsibly</li>
            </ul>
            <p className="text-zinc-300 mb-8">Users may not misuse the platform for unlawful, harmful, or unauthorized purposes.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Intellectual Property</h3>
            <p className="text-zinc-300 mb-4">All SYNTIX branding, software, infrastructure systems, platform design, and proprietary materials remain the intellectual property of SYNTIX unless otherwise stated.</p>
            <p className="text-zinc-300 mb-8 font-semibold">Users retain ownership of uploaded biological data.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Limitation of Liability</h3>
            <p className="text-zinc-300 mb-4">SYNTIX is provided on an &quot;as available&quot; basis.</p>
            <p className="text-zinc-300 mb-4">SYNTIX shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-purple-500">
              <li>interpretation inaccuracies</li>
              <li>indirect damages</li>
              <li>research outcomes</li>
              <li>third-party misuse</li>
              <li>service interruptions</li>
              <li>user decisions made using platform outputs</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Blockchain Disclaimer</h3>
            <p className="text-zinc-300 mb-4">Blockchain-based records and audit systems may be partially immutable.</p>
            <p className="text-zinc-300 mb-8">Users acknowledge that some permission and audit records may remain permanently recorded depending on underlying infrastructure design.</p>
          </section>

          <hr className="border-white/10 my-12" />

          {/* 3. Cookie Policy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">3. Cookie Policy</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
            <p className="text-zinc-300 mb-8">SYNTIX uses cookies and related technologies to improve platform functionality, security, analytics, and user experience.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Types of Cookies Used</h3>
            
            <h4 className="text-lg font-medium text-white mb-2">Essential Cookies</h4>
            <p className="text-zinc-300 mb-4">Required for:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-indigo-500">
              <li>authentication</li>
              <li>login sessions</li>
              <li>security</li>
              <li>platform functionality</li>
            </ul>

            <h4 className="text-lg font-medium text-white mb-2">Analytics Cookies</h4>
            <p className="text-zinc-300 mb-4">Used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-4 marker:text-indigo-500">
              <li>understand traffic patterns</li>
              <li>improve platform performance</li>
              <li>monitor infrastructure usage</li>
            </ul>
            <p className="text-zinc-300 mb-4">Analytics providers may include:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-indigo-500">
              <li>Google Analytics</li>
              <li>Vercel Analytics</li>
              <li>PostHog</li>
            </ul>

            <h4 className="text-lg font-medium text-white mb-2">Preference Cookies</h4>
            <p className="text-zinc-300 mb-4">Used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-indigo-500">
              <li>remember settings</li>
              <li>improve usability</li>
              <li>maintain user preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Cookie Consent</h3>
            <p className="text-zinc-300 mb-4">Users may:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-indigo-500">
              <li>accept all cookies</li>
              <li>reject non-essential cookies</li>
              <li>manage cookie preferences</li>
            </ul>
            <p className="text-zinc-300 mb-8">Continuing to use SYNTIX may constitute consent to essential platform cookies.</p>
          </section>

          <hr className="border-white/10 my-12" />

          {/* 4. Data Consent Policy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">4. Data Consent Policy</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
            <p className="text-zinc-300 mb-4">SYNTIX operates using a consent-based infrastructure model.</p>
            <p className="text-zinc-300 mb-8">Users remain responsible for deciding how their biological data is accessed, shared, or used.</p>

            <h3 className="text-xl font-semibold text-white mb-4">User Consent Controls</h3>
            <p className="text-zinc-300 mb-4">Users may control:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-cyan-500">
              <li>research participation</li>
              <li>access permissions</li>
              <li>sharing duration</li>
              <li>visibility settings</li>
              <li>consent revocation</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Research Access</h3>
            <p className="text-zinc-300 mb-4">Researchers may only access approved datasets after user authorization.</p>
            <p className="text-zinc-300 mb-4">SYNTIX may facilitate:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-cyan-500">
              <li>permission management</li>
              <li>auditability</li>
              <li>transparency systems</li>
              <li>consent tracking</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Revocation</h3>
            <p className="text-zinc-300 mb-4">Users may revoke permissions where technically and legally feasible.</p>
            <p className="text-zinc-300 mb-8">Certain immutable blockchain audit records may remain permanently recorded.</p>
          </section>

          <hr className="border-white/10 my-12" />

          {/* 5. AI & Genomic Interpretation Policy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">5. AI &amp; Genomic Interpretation Policy</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
            <p className="text-zinc-300 mb-8">SYNTIX uses computational systems and AI-assisted tools to organize and interpret genomic information.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Scientific Infrastructure</h3>
            <p className="text-zinc-300 mb-4">Interpretation pipelines may rely on:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-purple-500">
              <li>1000 Genomes Project</li>
              <li>GWAS Catalog</li>
              <li>PharmGKB</li>
              <li>NHGRI resources</li>
              <li>CPIC guidelines</li>
              <li>publicly available genomic literature</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Limitations of Genomic Interpretation</h3>
            <p className="text-zinc-300 mb-4">Genomic analysis is probabilistic and continuously evolving.</p>
            <p className="text-zinc-300 mb-4">Interpretations may:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-purple-500">
              <li>change over time</li>
              <li>vary across populations</li>
              <li>contain uncertainty</li>
              <li>be incomplete</li>
            </ul>
            <p className="text-zinc-300 mb-8 font-semibold">SYNTIX does not guarantee biological outcomes or disease predictions.</p>

            <h3 className="text-xl font-semibold text-white mb-4">AI Limitations</h3>
            <p className="text-zinc-300 mb-4">AI-generated reports may contain inaccuracies, omissions, or simplified interpretations.</p>
            <p className="text-zinc-300 mb-8 font-semibold text-rose-400">AI outputs should not replace professional medical guidance.</p>
          </section>

          <hr className="border-white/10 my-12" />

          {/* 6. Security & Infrastructure Policy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">6. Security &amp; Infrastructure Policy</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
            <p className="text-zinc-300 mb-8">SYNTIX prioritizes secure infrastructure and permission-based access management.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Security Measures</h3>
            <p className="text-zinc-300 mb-4">Security practices may include:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-indigo-500">
              <li>encrypted storage</li>
              <li>secure APIs</li>
              <li>access controls</li>
              <li>authentication systems</li>
              <li>infrastructure monitoring</li>
              <li>blockchain audit systems</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Infrastructure Design</h3>
            <p className="text-zinc-300 mb-4">SYNTIX separates:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-indigo-500">
              <li>storage layers</li>
              <li>compute layers</li>
              <li>governance layers</li>
            </ul>
            <p className="text-zinc-300 mb-8">to improve scalability, security, and transparency.</p>
          </section>

          <hr className="border-white/10 my-12" />

          {/* 7. Account Deletion & Data Removal Policy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">7. Account Deletion &amp; Data Removal Policy</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
            <p className="text-zinc-300 mb-8">Users may request account deletion and data removal.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Data Removal</h3>
            <p className="text-zinc-300 mb-4">Where technically feasible, uploaded files and associated user data may be deleted from active infrastructure systems.</p>
            <p className="text-zinc-300 mb-8">Certain logs or blockchain audit records may remain immutable.</p>

            <h3 className="text-xl font-semibold text-white mb-4">Retention Requirements</h3>
            <p className="text-zinc-300 mb-4">SYNTIX may temporarily retain limited information for:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-8 marker:text-cyan-500">
              <li>legal compliance</li>
              <li>security monitoring</li>
              <li>fraud prevention</li>
              <li>operational continuity</li>
            </ul>
          </section>

          <hr className="border-white/10 my-12" />

          {/* 8. Research Ethics Statement */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">8. Research Ethics Statement</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Our Principles</h3>
            <p className="text-zinc-300 mb-4">SYNTIX believes biological data infrastructure should prioritize:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 mb-6 marker:text-purple-500">
              <li>transparency</li>
              <li>user ownership</li>
              <li>ethical participation</li>
              <li>informed consent</li>
              <li>responsible access</li>
            </ul>
            <p className="text-zinc-300 mb-8 font-semibold">We do not support exploitative or non-transparent biological data practices.</p>
          </section>

          <hr className="border-white/10 my-12" />

          {/* Contact Information */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Contact Information</h2>
            <p className="text-zinc-300 mb-6">For questions regarding policies, permissions, or data governance:</p>
            
            <h3 className="text-xl font-semibold text-white mb-4">LinkedIn</h3>
            <ul className="list-none space-y-2 text-zinc-300 mb-8">
              <li>Kushaan A Ksheerasagar</li>
              <li>Alejandra Catacora</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Email</h3>
            <p className="text-zinc-300 mb-8">
              <a href="mailto:support@syntix.ai" className="text-cyan-400 hover:text-cyan-300 hover:underline">support@syntix.ai</a>
            </p>
          </section>

          {/* Final Statement */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />
            <h2 className="text-2xl font-bold text-white mb-6">Final Statement</h2>
            <p className="text-zinc-300 mb-4 max-w-2xl mx-auto">
              SYNTIX is building infrastructure for transparent, interpretable, and patient-controlled biological data systems.
            </p>
            <p className="text-zinc-300 max-w-2xl mx-auto font-medium">
              Our goal is to help individuals securely own, understand, and manage one of the most personal forms of information they possess — their biology.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
