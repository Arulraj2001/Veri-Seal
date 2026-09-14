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
import { PasswordGeneratorEngine } from '@/components/tools/PasswordGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Strong Password Generator Online (CSPRNG & Bit Entropy) | Kagazo',
  description: 'Generate cryptographically secure passwords online with zero server logging. Configurable length, uppercase, lowercase, numbers, and symbols. Real-time bit entropy calculation and brute-force crack time estimation per NIST standards.',
  alternates: {
    canonical: 'https://kagazo.in/tools/password-generator',
  },
  openGraph: {
    title: 'Strong Password Generator Online (CSPRNG & Bit Entropy) | Kagazo',
    description: 'Generate cryptographically secure passwords online with zero server logging. Configurable length, uppercase, lowercase, numbers, and symbols. Real-time bit entropy calculation and brute-force crack time estimation per NIST standards.',
    url: 'https://kagazo.in/tools/password-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strong Password Generator Online (CSPRNG & Bit Entropy) | Kagazo',
    description: 'Generate cryptographically secure passwords online with zero server logging. Configurable length, uppercase, lowercase, numbers, and symbols. Real-time bit entropy calculation and brute-force crack time estimation per NIST standards.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Password Length",
    "desc": "Use the interactive slider to choose between 16 and 64 characters (16+ recommended)."
  },
  {
    "step": 2,
    "title": "Configure Character Sets",
    "desc": "Toggle Uppercase (A-Z), Lowercase (a-z), Numbers (0-9), and Special Symbols (!@#$%)."
  },
  {
    "step": 3,
    "title": "Exclude Ambiguous Characters",
    "desc": "Optionally filter out easily confused characters (e.g., 0 and O, 1 and l) for manual typing."
  },
  {
    "step": 4,
    "title": "Audit Entropy & Crack Time",
    "desc": "Inspect the real-time bit entropy meter (target 100+ bits) and estimated crack difficulty."
  },
  {
    "step": 5,
    "title": "1-Click Secure Copy",
    "desc": "Copy the verified strong password directly to your clipboard with automatic clipboard memory purge."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Password Re-Use",
    "title": "Using the Same Password Across Multiple Services",
    "desc": "When a minor forum or e-commerce site suffers a credential leak, automated credential stuffing bots immediately test your email and password combination against banking, email, and social accounts."
  },
  {
    "badge": "Error: Predictable Leetspeak Substitutions",
    "title": "Replacing Letters With Numbers (P@ssw0rd)",
    "desc": "Modern brute-force tools (Hashcat, John the Ripper) test common leetspeak rules (a to @, e to 3, i to 1, o to 0) in the first phase of dictionary attacks. True entropy requires true CSPRNG randomness."
  },
  {
    "badge": "Error: Saving Passwords in Plain Text",
    "title": "Keeping Credentials in Notepad or Email Drafts",
    "desc": "Storing passwords in unencrypted files on your desktop exposes all credentials to malware, browser infostealers, and shoulder-surfing. Always use an encrypted password manager."
  },
  {
    "badge": "Error: Over-Relying on Short Passwords",
    "title": "Using 8-Character Passwords With Symbols",
    "desc": "A complex 8-character password contains only ~52 bits of entropy, crackable in minutes on consumer GPU rigs. Length is exponentially more protective than complexity."
  }
];

const FAQS = [
  {
    "question": "What makes a password cryptographically secure (CSPRNG)?",
    "answer": "A Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) derives randomness from hardware interrupts, mouse movements, and OS entropy pools via window.crypto.getRandomValues(). Unlike standard Math.random(), CSPRNG output is mathematically unpredictable and immune to reverse-engineering."
  },
  {
    "question": "Is my generated password sent to or saved on your servers?",
    "answer": "Never. The entire password generation script runs 100% locally inside your web browser. Zero generated passwords, entropy metrics, or user selections are ever transmitted across network connections."
  },
  {
    "question": "What is Shannon Entropy and how many bits are recommended?",
    "answer": "Shannon Entropy measures the unpredictability of a password in bits. A score of 64 bits provides baseline security, but modern cybersecurity standards (NIST, OWASP) recommend at least 80 to 100+ bits of entropy for critical financial and master accounts."
  },
  {
    "question": "What is the recommended password length in 2026?",
    "answer": "Cybersecurity guidelines recommend a minimum of 16 characters for standard online accounts, and 20 to 24 characters for master passwords, cloud hosting, cryptocurrency wallets, and financial banking logins."
  },
  {
    "question": "Should I still change my passwords every 90 days?",
    "answer": "No. The National Institute of Standards and Technology (NIST SP 800-63B) advises against periodic forced password resets because users tend to make predictable minor variations (e.g., Spring2025! to Summer2025!). Instead, use long random passwords and change them only upon known breach alerts."
  },
  {
    "question": "What is an ambiguous character and why should I exclude them?",
    "answer": "Ambiguous characters are glyphs that look virtually identical in certain fonts, such as uppercase \"I\" (India), lowercase \"l\" (lima), and number \"1\" (one), or letter \"O\" and digit \"0\". Excluding them prevents frustrating login failures when typing manually on mobile keyboards."
  },
  {
    "question": "How does this password generator compare to browser built-in generators?",
    "answer": "Kagazo provides full granular control over length (up to 64 characters), exact symbol inclusion, exclusion of ambiguous characters, and detailed real-time crack-time analytics that browser defaults do not show."
  },
  {
    "question": "Can this generator create secure passphrases?",
    "answer": "Yes. In passphrase mode, the generator selects multi-word sequences from a curated EFF wordlist, creating memorable, high-entropy passphrases ideal for disk encryption and master vault unlock keys."
  },
  {
    "question": "How long would a modern supercomputer take to crack a 16-character random password?",
    "answer": "A truly random 16-character alphanumeric password with symbols contains ~106 bits of entropy. Testing every permutation at 100 billion guesses per second would require over 1.2 million years to crack via brute-force attack."
  },
  {
    "question": "Is it safe to copy passwords using the clipboard button?",
    "answer": "Yes. The copy action uses the native browser Clipboard API. For maximum hygiene, paste the password directly into your encrypted password manager and clear your clipboard history."
  }
];

export default function PasswordGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Strong Password Generator CSPRNG',
        url: 'https://kagazo.in/tools/password-generator',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate cryptographically secure passwords online with zero server logging. Configurable length, uppercase, lowercase, numbers, and symbols. Real-time bit entropy calculation and brute-force crack time estimation per NIST standards.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a Secure Password in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Strong Password Generator CSPRNG.',
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
            name: 'Strong Password Generator CSPRNG',
            item: 'https://kagazo.in/tools/password-generator',
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
          <span className="text-primary font-bold">Strong Password Generator CSPRNG</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Cryptographically Secure • Live Bit Entropy & Crack Time</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Strong Password Generator CSPRNG & </span>
            <span className="text-primary">Entropy Security Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate cryptographically secure passwords online with zero server logging. Configurable length, uppercase, lowercase, numbers, and symbols. Real-time bit entropy calculation and brute-force crack time estimation per NIST standards.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <PasswordGeneratorEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Web Crypto CSPRNG
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Powered by window.crypto.getRandomValues() using hardware entropy rather than predictable pseudo-random math.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Live Bit Entropy & Crack Time
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Real-time calculation of Shannon entropy (bits) and realistic brute-force offline crack time estimation.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Zero Network Telemetry
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generated passwords exist solely in volatile client RAM. Zero analytics, logging, or transmission.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    NIST SP 800-63B Password Security & Entropy Guidelines
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  NIST Cybersecurity Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Password Length & Composition</th><th className="py-2.5 px-3 font-bold">Shannon Entropy (Bits)</th><th className="py-2.5 px-3 font-bold">Brute-Force Crack Time (Modern GPUs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">8 Characters (Lowercase only)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">~37.6 Bits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Instantaneous (under 1 second across 8x RTX 4090)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">12 Characters (Mixed Alphanumeric)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">~71.4 Bits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">~3 days to crack via distributed dictionary assault</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">16 Characters (Upper, Lower, Digits, Symbols)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">~105.8 Bits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">~1.2 Million Years (Enterprise Security Benchmark)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">20 Characters (High-Complexity CSPRNG)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">~131.0 Bits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Trillions of Years (Quantum-resistant baseline)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Passphrase (4 Random Dictionary Words)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">~76.0 Bits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Decades to crack; high human memory retention</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">NIST Recommendation 2026</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Min 16+ Characters with Symbols</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Eliminates predictable character substitution vulnerabilities</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate a Secure Password in 5 Steps
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
                  Common Password Security Pitfalls & Vulnerabilities
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
                CSPRNG Criteria
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Hardware Entropy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Powered by window.crypto.getRandomValues().
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">100+ Bit Entropy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    High-resistance against GPU brute-force attacks.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Zero Logging</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% in-browser RAM execution without telemetry.
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
                  href="/tools/hash-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Cryptographic Hash Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Crypto
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
                  href="/tools/mask-aadhaar"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Official Masked Aadhaar Redactor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Privacy
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
