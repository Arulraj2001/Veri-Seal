import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Search,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Compass,
  FileCheck2,
  Camera,
  PenTool,
} from 'lucide-react';
import ExamSpecificationRadar from '@/components/tools/ExamSpecificationRadar';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Exam Photo & Signature Specifications Radar 2026 | UPSC, SSC, IBPS, NEET',
  description:
    'Complete interactive database of official photo, signature, and thumb impression specifications for UPSC, SSC, IBPS, NEET, JEE, RRB, and State PSC portals. 1-click calibrate and resize. 100% updated guidelines.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/specifications',
  },
  openGraph: {
    title: 'Exam Photo & Signature Specification Radar | Kagazo',
    description:
      'Search official dimensions, file size limits, and ink rules across 40+ Indian recruitment exams.',
    url: 'https://Kagazo.in/tools/specifications',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How often are the exam specifications in this database updated?',
    answer:
      'Our radar is synchronized with the latest official recruitment notifications issued by UPSC, SSC, IBPS, NTA, RRB, and State PSCs. Any rule changes (such as SSC live webcam capture or UPSC 10-day photo validity) are reflected immediately.',
  },
  {
    question: 'Why do different exams have different photo dimension rules?',
    answer:
      'Different exam boards use distinct server architectures and legacy software. For example, SSC requires a 3.5cm x 4.5cm vertical portrait (20-50KB), whereas UPSC requires a square 350x350px image (20-300KB) with candidate name and date printed at the base.',
  },
  {
    question: 'Can I directly resize my photo from this radar?',
    answer:
      'Yes! Every exam card in the radar features a direct "Pre-Calibrated Tool" button that instantly loads the exact dimension and byte limits into our Kagazo processing engine.',
  },
  {
    question: 'What is the most common reason for online application form rejection?',
    answer:
      'Over 75% of form rejections are caused by non-compliant photos and signatures: including blurry signatures, photos with non-white backgrounds, files outside specified byte boundaries, and missing date stamps.',
  },
];

export default function ExamSpecificationRadarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Exam Recruitment Specification Radar',
        url: 'https://Kagazo.in/tools/specifications',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Interactive search database of official photo, signature, and document specifications for 40+ Indian government and entrance exams.',
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
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Specification Radar</span>
        </nav>

        {/* Header Hero */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Recruitment Portal Guidelines (2026 Edition)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Exam Recruitment Photo & Signature Specification Radar
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Instant official dimensions, aspect ratios, file size budgets (KB), background color requirements, and signature rules across 40+ central, state, banking, and entrance exam boards.
          </p>
        </div>

        {/* Core Interactive Radar Engine */}
        <ExamSpecificationRadar />

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 space-y-6 shadow-sm max-w-5xl mx-auto mt-12">
          <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                  <span className="text-emerald-600 font-extrabold">Q:</span>
                  {faq.question}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Ad Slot */}
        <div className="max-w-5xl mx-auto pt-6">
          <AdSlot slot="in_content" />
        </div>
      </div>
    </div>
  );
}
