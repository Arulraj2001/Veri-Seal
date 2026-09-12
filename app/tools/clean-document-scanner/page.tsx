import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Sparkles,
  Award,
  HelpCircle,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Layers,
} from 'lucide-react';
import CleanScannerEngine from '@/components/tools/CleanScannerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Clean Document Scanner Online Free | Remove Shadows & Xerox Binarize | Kagazo',
  description:
    'Convert phone camera photos of certificates and marksheets into flatbed-quality scans online free. Remove phone shadows, yellow incandescent tint, and desk backgrounds for UPSC, SSC, and TNPSC portals.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/clean-document-scanner',
  },
  openGraph: {
    title: 'Clean Document Scanner & Xerox Binarizer Free | Kagazo',
    description:
      'Remove phone shadows, clean yellow tints, and binarize photocopy scans into crisp PDF and JPEG documents with zero watermark.',
    url: 'https://Kagazo.in/tools/clean-document-scanner',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do recruitment portals reject photos taken with mobile cameras?',
    answer:
      'Government exam portals use automated OCR and document indexing tools. Mobile camera photos often have uneven lighting, dark hand/phone shadows, yellow indoor light tints, or curled desk edges. These make small printed numbers (like roll numbers and mark totals) unreadable by the automated verification systems, leading to application rejection.',
  },
  {
    question: 'What is the difference between "Magic Color" and "High-Contrast Xerox"?',
    answer:
      '"Magic Color" normalizes the paper background to pure white while preserving the original color of official red/blue rubber stamps, university gold seals, and ink signatures. "High-Contrast Xerox" uses adaptive binarization to turn every character into crisp black ink on stark white paper, perfectly mimicking a high-end office photocopy machine.',
  },
  {
    question: 'Will cleaning the document affect its legal validity?',
    answer:
      'No. Our engine cleans optical shadows and enhances contrast without altering or interpolating any printed text, numbers, signatures, or seal shapes. It produces a cleaner representation of your original document.',
  },
  {
    question: 'Is it safe to upload sensitive certificates to Kagazo?',
    answer:
      'Yes, 100% safe. Processing happens exclusively in volatile RAM memory. Documents are never saved to disk, stored in databases, or used for AI training. Everything is automatically destroyed upon download.',
  },
];

const SCANNER_FEATURES = [
  {
    title: 'Shadow Purge Algorithm',
    desc: 'Eliminates dark gradients cast by your phone or hand when taking photos on desks or beds.',
  },
  {
    title: 'Yellow Tint Correction',
    desc: 'Compensates for warm indoor bulb lighting, restoring genuine crisp white paper backgrounds.',
  },
  {
    title: 'Stamp & Ink Protection',
    desc: 'Special color retention preserves blue pen signatures and official university red/green seals.',
  },
  {
    title: 'Exact Portal File Sizing',
    desc: 'Automatically compresses the cleaned scan strictly under <200KB (TNPSC) or <300KB (UPSC).',
  },
];

export default function CleanDocumentScannerPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Kagazo Clean Document Scanner & Xerox Binarizer',
            url: 'https://Kagazo.in/tools/clean-document-scanner',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'INR',
            },
            description:
              'Remove phone shadows and desk background from marksheet and certificate photos for exam portal uploads.',
          }),
        }}
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
          <span className="text-primary font-bold truncate">Clean Document Scanner</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero Section */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Flatbed Quality from Phone Photos</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Clean Document Scanner & Xerox Binarizer
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Turn smartphone marksheet and certificate photos into flatbed scanner quality. Automatically purges phone shadows, neutralizes yellow room lighting, and boosts faded stamps for 100% portal acceptance.
              </p>
            </div>

            {/* In-Memory Privacy Callout */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Memory RAM Privacy:</strong> Your educational certificates and marks are cleaned in volatile RAM memory. Zero copies are ever saved to disk or databases.
              </span>
            </div>

            {/* The Engine Component */}
            <CleanScannerEngine />

            {/* Why This Tool Solves The Problem */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                Why Phone Photos Fail on Recruitment Portals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                  <h3 className="font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Unprocessed Phone Photos
                  </h3>
                  <ul className="text-xs text-rose-700/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Dark hand/phone shadow blocks subject marks</li>
                    <li>Yellow incandescent light creates muddy background</li>
                    <li>Desk wood-grain visible around paper edges</li>
                    <li>Automated OCR rejects application for unreadable scan</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Kagazo Clean Scan
                  </h3>
                  <ul className="text-xs text-emerald-800/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Shadow division produces pure crisp white paper</li>
                    <li>Stamps, signatures, and university seals preserved</li>
                    <li>High contrast black & white xerox binarization</li>
                    <li>Instant download in portal-ready PDF or JPEG</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Advanced Scanning Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {SCANNER_FEATURES.map((feat, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <h3 className="font-bold text-slate-800">{feat.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-surface-darker/40 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1.5 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (32%) Sticky Rail */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Top Ad Slot with Zero CLS */}
            <AdSlot slot="sidebar" />

            {/* Quick Links */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-5 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Essential Document Utilities
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Merge Marksheets to 1 PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/unlock-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Unlock e-Aadhaar & PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/mask-aadhaar"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Mask Aadhaar First 8 Digits</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/pdf-to-image"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Extract PDF to 300 DPI Images</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Passport Photo Sheet Maker</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Bottom Ad Slot with Zero CLS */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
