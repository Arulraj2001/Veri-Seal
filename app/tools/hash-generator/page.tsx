import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Banknote,
  Calculator,
  GraduationCap,
  Award,
  FileCheck2,
  Clock,
  Globe,
  Code2,
  Ruler,
  Coins,
  Heart,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  Languages,
  PenTool,
  Search,
  Fingerprint,
} from 'lucide-react';
import { HashGeneratorEngine } from '@/components/tools/HashGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Cryptographic Hash Generator (SHA-256, SHA-512, MD5, HMAC) | Kagazo',
  description: 'Free online cryptographic hash generator and checksum verification studio. Compute SHA-256, SHA-512, SHA-384, SHA-1, MD5, and HMAC hashes for text and local files in real time. 100% private in-browser Web Crypto execution.',
  alternates: {
    canonical: 'https://kagazo.in/tools/hash-generator',
  },
  openGraph: {
    title: 'Cryptographic Hash Generator (SHA-256, SHA-512, MD5, HMAC) | Kagazo',
    description: 'Free online cryptographic hash generator and checksum verification studio. Compute SHA-256, SHA-512, SHA-384, SHA-1, MD5, and HMAC hashes for text and local files in real time. 100% private in-browser Web Crypto execution.',
    url: 'https://kagazo.in/tools/hash-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptographic Hash Generator (SHA-256, SHA-512, MD5, HMAC) | Kagazo',
    description: 'Free online cryptographic hash generator and checksum verification studio. Compute SHA-256, SHA-512, SHA-384, SHA-1, MD5, and HMAC hashes for text and local files in real time. 100% private in-browser Web Crypto execution.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Input Mode",
    "desc": "Choose Plain Text input to hash strings or File Checksum mode for local disk files."
  },
  {
    "step": 2,
    "title": "Choose Hashing Algorithm",
    "desc": "Select SHA-256 (recommended industry standard), SHA-512, SHA-384, MD5, or HMAC."
  },
  {
    "step": 3,
    "title": "Enter Text or Secret Key",
    "desc": "Type your message payload or provide an optional HMAC secret key for message authentication."
  },
  {
    "step": 4,
    "title": "Instant Digest Generation",
    "desc": "Review the computed hexadecimal hash string and base64 encoded cryptographic digest."
  },
  {
    "step": 5,
    "title": "Compare and Verify Checksum",
    "desc": "Paste an author published checksum to run real-time string match verification for file integrity."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Invisible Newline Mismatch",
    "title": "Trailing \\n Characters Changing the Entire Hash",
    "desc": "Cryptographic hashes exhibit the avalanche effect: changing a single whitespace byte completely alters the output. Ensure input strings do not contain unintended trailing newline or carriage return characters."
  },
  {
    "badge": "Error: Using MD5 for Passwords",
    "title": "Relying on Broken Obsolete Algorithms",
    "desc": "MD5 and SHA-1 have been broken by practical collision attacks and can be cracked in seconds via rainbow tables. Modern password storage requires salted hashing algorithms like Argon2, bcrypt, or PBKDF2."
  },
  {
    "badge": "Error: Uploading Gigabytes to Online Tools",
    "title": "Server-Side Tools Timing Out on Large Files",
    "desc": "Cloud-based hashers force you to upload multi-GB installer files over the internet, risking timeouts. Kagazo reads local file streams in chunks directly from your SSD in client RAM."
  },
  {
    "badge": "Error: Case-Sensitivity Comparison Mismatch",
    "title": "Comparing Lowercase vs Uppercase Hex Strings",
    "desc": "Hexadecimal digests are case-insensitive, but naive string equality operators (==) treat \"A\" and \"a\" as unequal. Kagazo normalizes case for error-free comparison."
  }
];

const FAQS = [
  {
    "question": "What is a cryptographic hash function?",
    "answer": "A cryptographic hash function is an irreversible mathematical algorithm that transforms an arbitrary amount of data into a fixed-size string of characters (a digest). The same input always produces the exact same hash, while even a one-bit modification produces a completely different result (the avalanche effect)."
  },
  {
    "question": "Is my file or sensitive text uploaded to your servers when hashing?",
    "answer": "No. Kagazo uses the native Web Crypto API (window.crypto.subtle) built directly into modern web browsers. All calculations are executed locally on your computer CPU. Files and text never leave your device."
  },
  {
    "question": "How can I verify if a downloaded file has been tampered with?",
    "answer": "Drop your downloaded file into Kagazo, compute its SHA-256 checksum, and paste the official checksum provided on the developer release page into the \"Compare Hash\" box. If the strings match, your file is 100% authentic and uncorrupted."
  },
  {
    "question": "Can a cryptographic hash be decrypted or reversed?",
    "answer": "No. Hash functions are strictly one-way mathematical operations; they do not contain the original data and cannot be \"decrypted\". The only way to find matching input is by testing billions of guesses (brute-force or rainbow tables)."
  },
  {
    "question": "What is the difference between SHA-256 and SHA-512?",
    "answer": "SHA-256 outputs a 256-bit (32-byte) digest represented as 64 hex characters, whereas SHA-512 outputs a 512-bit (64-byte) digest as 128 hex characters. On 64-bit computer processors, SHA-512 is frequently faster than SHA-256 due to native 64-bit word operations."
  },
  {
    "question": "Why is MD5 still used if it is cryptographically broken?",
    "answer": "While MD5 is unsafe for digital signatures, passwords, and security verification against malicious adversaries, it remains widely used in legacy systems as a fast non-cryptographic checksum to detect accidental network corruption."
  },
  {
    "question": "What is an HMAC and how does it work?",
    "answer": "A Hash-based Message Authentication Code (HMAC) combines a cryptographic hash function with a secret shared key. It verifies both the data integrity of a payload and the authentic identity of the sender, widely used in API webhooks (Stripe, GitHub) and AWS authentication."
  },
  {
    "question": "Can I hash huge files like 10 GB disk images without crashing my browser?",
    "answer": "Yes. Kagazo reads local files in progressive 64 KB binary chunks using the HTML5 FileReader API, streaming data incrementally through the cryptographic hasher without overloading browser memory."
  },
  {
    "question": "What is the difference between Hex and Base64 hash representation?",
    "answer": "Hexadecimal represents each byte as two characters (0-9, a-f), resulting in a 64-character string for SHA-256. Base64 encodes 3 bytes into 4 characters using a 64-character set, producing a more compact 44-character string."
  },
  {
    "question": "Why is raw SHA-256 alone not recommended for storing user passwords?",
    "answer": "Fast hash algorithms like SHA-256 can be calculated billions of times per second on modern GPUs, making them vulnerable to brute-force attacks. Password storage requires slow, computationally intensive algorithms like bcrypt, scrypt, or Argon2."
  }
];

export default function HashGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Cryptographic Hash Generator',
        url: 'https://kagazo.in/tools/hash-generator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Free online cryptographic hash generator and checksum verification studio. Compute SHA-256, SHA-512, SHA-384, SHA-1, MD5, and HMAC hashes for text and local files in real time. 100% private in-browser Web Crypto execution.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate and Verify Hashes in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Cryptographic Hash Generator.',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Cryptographic Hash Generator',
            item: 'https://kagazo.in/tools/hash-generator',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Cryptographic Hash Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>SHA-256, SHA-512, MD5 & HMAC • Web Crypto API</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Cryptographic Hash Generator Studio & </span>
            <span className="text-primary">Checksum Verifier</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Free online cryptographic hash generator and checksum verification studio. Compute SHA-256, SHA-512, SHA-384, SHA-1, MD5, and HMAC hashes for text and local files in real time. 100% private in-browser Web Crypto execution.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <HashGeneratorEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Compliance Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Web Crypto API Acceleration
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Hardware-accelerated cryptographic digests computed in native browser C++ runtime without WebAssembly overhead.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Local File Streaming
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Drop multi-gigabyte files (Linux ISOs, disk images) to compute checksums locally without uploading a single byte.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Secret Key HMAC Support
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generate Hash-based Message Authentication Codes (HMAC) with custom secret keys for API payload signing.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Cryptographic Hashing Algorithm Comparison & Security Matrix
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  NIST FIPS 180-4
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Algorithm</th><th className="py-2.5 px-3 font-bold">Digest Output Length (Bits / Hex)</th><th className="py-2.5 px-3 font-bold">Collision Resistance Status</th><th className="py-2.5 px-3 font-bold">Standard Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SHA-256 (SHA-2 Family)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">256 Bits (64 Hex Characters)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cryptographically Secure (Zero Collisions)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">TLS/SSL certificates, Bitcoin/blockchain, software releases</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SHA-512 (SHA-2 Family)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">512 Bits (128 Hex Characters)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cryptographically Secure (Maximum Security)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High-security government data, certificate authorities</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SHA-384 (SHA-2 Family)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">384 Bits (96 Hex Characters)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cryptographically Secure (NSA Suite B)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Enterprise SSL handshakes, military cryptographic storage</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SHA-1</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">160 Bits (40 Hex Characters)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Broken (Theoretical & Practical Collisions)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Legacy Git commit hashes; disallowed for digital certs</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">MD5</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">128 Bits (32 Hex Characters)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Critically Broken (Instant Collisions)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Legacy file integrity checks; forbidden for security/passwords</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">HMAC (SHA-256 / SHA-512)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Variable Digest Length</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cryptographically Secure With Secret Key</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">REST API authentication, AWS Signature v4, JWT tokens</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate and Verify Hashes in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common Cryptographic Hashing Errors & Security Bugs
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, legal omissions, and calculation pitfalls:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Strict 10 Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Comprehensive technical, legal, and operational answers
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  10 Questions Answered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Key Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Hash Standards
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Web Crypto API</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Native browser C++ hardware-accelerated math.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Streaming Files</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Hash multi-GB files locally without upload.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">HMAC Signing</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Secret key message authentication support.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/password-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Strong Password Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Security
                  </span>
                </Link>
                <Link
                  href="/tools/uuid-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UUID / GUID v4 Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    UUID
                  </span>
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      JSON Formatter & Validator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Developer
                  </span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-3 space-y-1.5 text-text-main/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-RAM Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-main/70">
                All calculations and security operations occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
