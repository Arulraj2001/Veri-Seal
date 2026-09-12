import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  GraduationCap,
  Award,
} from 'lucide-react';
import TneaCutoffCalculatorEngine from '@/components/tools/TneaCutoffCalculatorEngine';

export const metadata: Metadata = {
  title: 'TNEA Cutoff Calculator 2025–26 | Anna University 200 Marks Formula',
  description:
    'Free online TNEA engineering cutoff calculator for Tamil Nadu Class 12 students. Exact Anna University formula: Maths + (Physics/2) + (Chemistry/2) out of 200. Check 7.5% Govt school quota, First Graduate fee waiver, and college tier cutoff benchmarks.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/tnea-cutoff-calculator',
  },
  openGraph: {
    title: 'TNEA Engineering Cutoff Calculator 2025–26 | Kagazo',
    description:
      'Calculate Anna University 200 engineering cutoff score with college tier benchmarks and fee waiver estimator.',
    url: 'https://Kagazo.in/tools/tnea-cutoff-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is the official formula to calculate TNEA engineering cutoff out of 200?',
    answer:
      'As prescribed by Anna University and the Directorate of Technical Education (DoTE) Tamil Nadu: TNEA Cutoff = Mathematics marks (out of 100) + [Physics marks (out of 100) ÷ 2] + [Chemistry marks (out of 100) ÷ 2]. This yields an aggregate score out of 200.',
  },
  {
    question: 'Who is eligible for the Tamil Nadu 7.5% Government School Quota?',
    answer:
      'Students who studied continuously from 6th Standard to 12th Standard in Tamil Nadu State Government schools are eligible for the 7.5% horizontal preferential reservation. All tuition, hostel, transport, and counseling fees for selected candidates are 100% sponsored by the Government of Tamil Nadu.',
  },
  {
    question: 'What is the First Graduate (FG) tuition fee waiver concession?',
    answer:
      'If you are the first member in your family (including siblings and parents) to graduate from a degree program, you are eligible for the Tamil Nadu First Graduate tuition fee concession of up to ₹25,000 per year in government and government-quota private engineering seats.',
  },
  {
    question: 'What documents are mandatory for TNEA Online Certificate Verification?',
    answer:
      'You must upload: 1) Class 10 (SSLC) Marksheet, 2) Class 12 (HSC) Marksheet, 3) Transfer Certificate (TC), 4) Permanent Community Certificate, 5) Nativity Certificate (if native of TN but studied outside), 6) First Graduate Certificate & Joint Declaration (if claiming FG), and 7) 7.5% Bonafide Certificate from school Headmaster.',
  },
];

export default function TneaCutoffCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TNEA Engineering Cutoff Calculator 2025–26',
    url: 'https://Kagazo.in/tools/tnea-cutoff-calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Online calculator for Tamil Nadu Engineering Admissions (TNEA) cutoff out of 200 marks, college benchmarks, and government school 7.5% quota fee waiver estimator.',
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-foreground pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">TNEA Cutoff Calculator</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Anna University 200 Marks Formula • 7.5% Govt School Quota</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            TNEA Engineering Cutoff Calculator &amp; Counseling Kit
          </h1>

          <p className="text-sm sm:text-base text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Calculate your precise Anna University engineering cutoff score out of 200. Discover top college cutoff benchmarks, fee waiver concessions, and print your counseling preparation dossier.
          </p>
        </div>

        {/* Engine */}
        <TneaCutoffCalculatorEngine />

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
              <p className="text-xs text-text-main/60">
                Essential information on TNEA engineering counseling and cutoff calculation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-bold text-foreground flex items-start gap-2">
                  <span className="text-primary font-black">Q.</span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-text-main/70 leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
