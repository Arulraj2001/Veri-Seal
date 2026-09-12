import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Fingerprint,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import ThumbImpressionEngine from '@/components/tools/ThumbImpressionEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Left Thumb Impression (LTI) Resizer & Sharpener | IBPS, RRB, SSC',
  description:
    'Enhance biological friction ridges, clean ink smudges, and format Left Thumb Impressions (LTI) strictly to 240x240 pixels (20KB–50KB) for IBPS PO, Clerk, SBI, Railway RRB, and SSC exams. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/thumb-impression-resizer',
  },
  openGraph: {
    title: 'Free Left Thumb Impression (LTI) Resizer & Sharpener | Kagazo',
    description:
      'Sharpen faint fingerprint ridges and calibrate thumb impression photos strictly under 50KB for IBPS and Railway recruitment.',
    url: 'https://Kagazo.in/tools/thumb-impression-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Which hand thumb impression is required for IBPS and Bank PO exams?',
    answer:
      'IBPS, SBI, and most national banks strictly require the Left Thumb Impression (LTI). If a candidate does not have a left thumb, right thumb impression may be used with an explanatory note during document verification.',
  },
  {
    question: 'What are the official dimensions and file size for IBPS thumb impressions?',
    answer:
      'IBPS requires 240 × 240 pixels at 200 DPI strictly between 20KB and 50KB in JPEG/JPG format. Our tool automatically applies these exact limits.',
  },
  {
    question: 'What ink color should be used for the thumb print?',
    answer:
      'Blue or Black ink stamp pad impressions are standard and officially accepted across SSC, RRB, and IBPS portals.',
  },
  {
    question: 'How does the tool sharpen faint or smudged thumb prints?',
    answer:
      'The engine applies Contrast Limited Adaptive Histogram Equalization (CLAHE) and unsharp masking to enhance the contrast between papillary friction ridges and valleys while cleaning off-white paper smudges.',
  },
];

export default function ThumbImpressionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Thumb Impression Resizer & Sharpener',
        url: 'https://Kagazo.in/tools/thumb-impression-resizer',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Calibrate and sharpen Left Thumb Impression (LTI) photos strictly to 240x240 px, 20-50KB for IBPS and RRB exams.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize and Sharpen Left Thumb Impression for Bank Exams',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Thumb Photo',
            text: 'Take a close-up photo of your Left Thumb Impression on clean white paper.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Sharpness',
            text: 'Use the ridge sharpness slider to highlight fingerprint details.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 20-50KB JPG',
            text: 'Click Enhance Thumb Impression and download your IBPS/RRB compliant JPG.',
          },
        ],
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

      {/* Structured Data */}
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
          <span className="text-primary font-bold truncate">Left Thumb Impression Resizer</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Fingerprint className="w-3.5 h-3.5 text-emerald-600" />
                <span>IBPS & Railway RRB Biometric Standard</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Left Thumb Impression (LTI) Resizer & Ridge Sharpener
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Enhance papillary friction ridges, clean ink stamp smudges, and format your Left Thumb Impression photo strictly to 240×240 pixels (20KB–50KB) in JPEG format for IBPS, SBI PO, and Railway RRB recruitment.
              </p>
            </div>

            {/* In-Memory Privacy */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Memory RAM Privacy:</strong> Biometric thumb impressions are processed exclusively in volatile computer RAM and instantly wiped upon download. Zero data persistence.
              </span>
            </div>

            {/* Core Tool Engine */}
            <ThumbImpressionEngine />

            {/* FAQ Accordion */}
            <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
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
          </div>

          {/* Right Sidebar (32%) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Recruitment Portal Guidelines</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">IBPS PO / Clerk / SO</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">240 × 240 px • 20 KB to 50 KB • 200 DPI</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Railway RRB NTPC / Group D</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">240 × 240 px • 20 KB to 50 KB • Clear Ridges</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">State Police Recruitment</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Unsmudged clear print on white paper</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Related Exam Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/signature-cleaner-extractor"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Black Ink Signature Extractor</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/ibps-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>IBPS Photo & Signature Resizer</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/rrb-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>RRB Photo & Signature Resizer</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
