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
} from 'lucide-react';
import TneaCutoffCalculatorEngine from '@/components/tools/TneaCutoffCalculatorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'TNEA Engineering Cutoff Calculator 2025–26 (Anna University 200 Formula) | Kagazo',
  description: 'Calculate your exact TNEA Engineering Cutoff out of 200 marks for Anna University counseling. Formula: Maths + (Physics/2) + (Chemistry/2). Includes 7.5% Govt School quota eligibility, First Graduate fee waiver, and college cutoff tier benchmarks.',
  alternates: {
    canonical: 'https://kagazo.in/tools/tnea-cutoff-calculator',
    languages: {
      'ta-IN': 'https://kagazo.in/ta/tools/tnea-cutoff-calculator',
      'en': 'https://kagazo.in/tools/tnea-cutoff-calculator',
      'x-default': 'https://kagazo.in/tools/tnea-cutoff-calculator',
    },
  },
  openGraph: {
    title: 'TNEA Engineering Cutoff Calculator 2025–26 (Anna University 200 Formula) | Kagazo',
    description: 'Calculate your exact TNEA Engineering Cutoff out of 200 marks for Anna University counseling. Formula: Maths + (Physics/2) + (Chemistry/2). Includes 7.5% Govt School quota eligibility, First Graduate fee waiver, and college cutoff tier benchmarks.',
    url: 'https://kagazo.in/tools/tnea-cutoff-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TNEA Engineering Cutoff Calculator 2025–26 (Anna University 200 Formula) | Kagazo',
    description: 'Calculate your exact TNEA Engineering Cutoff out of 200 marks for Anna University counseling. Formula: Maths + (Physics/2) + (Chemistry/2). Includes 7.5% Govt School quota eligibility, First Graduate fee waiver, and college cutoff tier benchmarks.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Academic Stream",
    "desc": "Choose Academic Stream (Maths, Physics, Chemistry) or Vocational Engineering Group."
  },
  {
    "step": 2,
    "title": "Enter Class 12 Marks",
    "desc": "Input your actual or expected HSC marks out of 100 for Mathematics, Physics, and Chemistry."
  },
  {
    "step": 3,
    "title": "Check 7.5% Govt School Quota",
    "desc": "Indicate if you studied continuously from Classes 6 to 12 in Tamil Nadu State Government schools."
  },
  {
    "step": 4,
    "title": "Verify First Graduate Status",
    "desc": "Select First Graduate option if no one in your immediate family has earned a bachelor degree."
  },
  {
    "step": 5,
    "title": "Instant Score & College Tiers",
    "desc": "Review your precise cutoff score out of 200 with recommended counseling choice-filling college tiers."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Dividing Marks Incorrectly",
    "title": "Dividing Overall Total by 3 or 6",
    "desc": "Many students average their 600-mark total to find an engineering cutoff. TNEA strictly uses: Maths (100) + Physics (50) + Chemistry (50) to make an exact aggregate out of 200."
  },
  {
    "badge": "Error: Missing 7.5% Bonafide Proof",
    "title": "Lacking Headmaster Bonafide Certificate",
    "desc": "Claiming the 7.5% government school preferential quota without an official bonafide signed by all school Headmasters (Classes 6 to 12) leads to general category reassignment."
  },
  {
    "badge": "Error: First Graduate Certificate Delay",
    "title": "Missing Joint Declaration Form",
    "desc": "The First Graduate fee concession requires an e-Sevai Revenue Tahsildar certificate plus a joint declaration signed by parents and candidate before counseling begins."
  },
  {
    "badge": "Error: Choice Filling Sequence",
    "title": "Listing Lower Tier Colleges Above Desired Seats",
    "desc": "TNEA algorithms freeze counseling rounds sequentially. If a lower-preference college is placed above a top-tier choice with matching cutoff, you cannot upgrade."
  }
];

const FAQS = [
  {
    "question": "What is the official formula to calculate TNEA engineering cutoff out of 200?",
    "answer": "The official formula prescribed by Anna University and the Directorate of Technical Education (DoTE) Tamil Nadu is: Cutoff = Mathematics marks (out of 100) + [Physics marks (out of 100) / 2] + [Chemistry marks (out of 100) / 2]. This creates an aggregate score out of 200."
  },
  {
    "question": "Who is eligible for the Tamil Nadu 7.5% Government School Quota?",
    "answer": "Students who studied continuously from 6th Standard to 12th Standard in Tamil Nadu State Government schools are eligible. The Government of Tamil Nadu sponsors 100% of their tuition, hostel, transport, and counseling fees in all engineering colleges."
  },
  {
    "question": "What is the First Graduate (FG) tuition fee concession in Tamil Nadu?",
    "answer": "If you are the first member in your family (including siblings and parents) to graduate with an undergraduate degree, you are eligible for up to Rs 25,000 annual tuition fee concession in government and government-quota private engineering seats."
  },
  {
    "question": "How are tie-breakers decided in TNEA when candidates have identical cutoffs?",
    "answer": "When cutoffs match, TNEA breaks ties in order: 1) Higher Mathematics marks, 2) Higher Physics marks, 3) Higher Optional Subject marks, 4) Older candidate by Date of Birth, and 5) Random Number assigned by DoTE."
  },
  {
    "question": "How does TNEA normalize marks for CBSE and CISCE board students?",
    "answer": "CBSE, CISCE, and other board marks are normalized using the highest score obtained by students in that specific board compared against the Tamil Nadu State Board topper scores."
  },
  {
    "question": "Can students from other Indian states apply for TNEA counseling?",
    "answer": "Other state students who completed schooling in Tamil Nadu can apply under Open Competition (OC). Candidates from outside Tamil Nadu who did not study in TN must apply under the All India / Other State quota."
  },
  {
    "question": "What documents are required for TNEA Online Certificate Verification?",
    "answer": "Mandatory documents: 1) 10th SSLC Marksheet, 2) 12th HSC Marksheet, 3) Transfer Certificate (TC), 4) Permanent Community Certificate, 5) Nativity Certificate (if applicable), 6) First Graduate Certificate & Declaration, and 7) 7.5% School Bonafide Certificate."
  },
  {
    "question": "What is a safe cutoff score for Computer Science Engineering at CEG Guindy?",
    "answer": "Based on previous counseling rounds, an open competition cutoff of 198.50+ is typically required for CSE at CEG Guindy. For BC/MBC categories, 197.00+ to 198.00+ offers competitive chances."
  },
  {
    "question": "How does Vocational Stream engineering cutoff calculation differ?",
    "answer": "For vocational stream students: Cutoff = Related Subject Marks (100) + Vocational Subject Theory (50) + Vocational Subject Practical (50), totaling 200 marks."
  },
  {
    "question": "Is my marks and personal cutoff calculation kept confidential on Kagazo?",
    "answer": "Yes. All calculations occur strictly client-side inside your browser memory. Your subject marks, cutoff scores, and category selections are never transmitted or stored on cloud servers."
  }
];

export default function TneaCutoffCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'TNEA Engineering Cutoff Calculator',
        url: 'https://kagazo.in/tools/tnea-cutoff-calculator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Calculate your exact TNEA Engineering Cutoff out of 200 marks for Anna University counseling. Formula: Maths + (Physics/2) + (Chemistry/2). Includes 7.5% Govt School quota eligibility, First Graduate fee waiver, and college cutoff tier benchmarks.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your TNEA Cutoff in 5 Steps',
        description: 'Step-by-step verified workflow instructions for TNEA Engineering Cutoff Calculator.',
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
            name: 'TNEA Engineering Cutoff Calculator',
            item: 'https://kagazo.in/tools/tnea-cutoff-calculator',
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
          <span className="text-primary font-bold">TNEA Engineering Cutoff Calculator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Anna University 200 Formula • 7.5% Govt Quota</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TNEA Engineering Cutoff </span>
            <span className="text-primary">Calculator & Counseling Kit</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Calculate your exact TNEA Engineering Cutoff out of 200 marks for Anna University counseling. Formula: Maths + (Physics/2) + (Chemistry/2). Includes 7.5% Govt School quota eligibility, First Graduate fee waiver, and college cutoff tier benchmarks.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <TneaCutoffCalculatorEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Exact 200-Mark Formula
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Anna University official calculation: Mathematics (100) + Physics (50) + Chemistry (50).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 7.5% Govt School Quota
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatic eligibility assessment for 100% free engineering education under TN Govt School horizontal reservation.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> College Tier Benchmarks
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instant cutoff benchmarks for CEG Guindy, MIT Chromepet, PSG Tech, SSN, CIT, and GCT Coimbatore.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    TNEA Top Engineering College Cutoff Benchmarks (Previous Year Trends)
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Anna University Counseling
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Engineering Institution</th><th className="py-2.5 px-3 font-bold">Branch / Department</th><th className="py-2.5 px-3 font-bold">General (OC) Cutoff Benchmark</th><th className="py-2.5 px-3 font-bold">BC / MBC Cutoff Benchmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">College of Engineering Guindy (CEG)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Computer Science (CSE) / IT</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">198.50 – 200.00</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">197.00 – 198.50</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Madras Institute of Technology (MIT)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Aeronautical / Electronics (ECE)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">197.50 – 199.00</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">195.50 – 197.50</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PSG College of Technology, Coimbatore</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CSE / AI & Data Science</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">197.00 – 199.00</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">195.00 – 197.00</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SSN College of Engineering, Chennai</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Computer Science (CSE)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">196.00 – 198.00</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">193.50 – 196.00</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Coimbatore Institute of Technology (CIT)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mechanical / Electrical (EEE)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">193.00 – 196.00</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">190.00 – 193.50</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Government College of Technology (GCT)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Civil / Electronics (ECE)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">192.00 – 195.50</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">188.00 – 192.00</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Calculate Your TNEA Cutoff in 5 Steps
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
                  Common TNEA Calculation Errors & Application Pitfalls
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
                TNEA Guidelines
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Cutoff Scale</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Maths (100) + Physics/2 (50) + Chemistry/2 (50) = 200.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">7.5% Quota</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% free engineering for TN Govt school students.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">First Graduate</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Rs 25,000 annual fee concession for eligible families.
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
                  href="/tools/pstm-certificate-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PSTM Certificate Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Quota
                  </span>
                </Link>
                <Link
                  href="/tools/tn-marksheet-compressor"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      TN Marksheet Compressor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Prep
                  </span>
                </Link>
                <Link
                  href="/tools/free-ats-resume-builder"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Free ATS Resume Builder
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Career
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
                All calculations and document drafting occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
