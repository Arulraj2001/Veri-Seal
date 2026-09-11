import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Archive,
  Printer,
  FileCheck2,
} from 'lucide-react';
import BatchResizerEngine from '@/components/tools/BatchResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Bulk Batch Photo Resizer & ZIP Downloader | Cyber Cafe Multi-Applicant Hub',
  description:
    'Resize up to 50 candidate passport photos and signatures in 1 click for SSC, UPSC, and Banking exams. In-memory parallel batch compression with automatic structured ZIP download. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://veriseal.in/tools/batch-photo-resizer',
  },
  openGraph: {
    title: 'Free Bulk Batch Photo Resizer & ZIP Downloader | VeriSeal',
    description:
      'High-speed batch photo and signature resizer for Cyber Cafe and CSC operators. Process up to 50 applicant photos instantly.',
    url: 'https://veriseal.in/tools/batch-photo-resizer',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How many files can I process simultaneously in a single batch?',
    answer:
      'You can upload and compress up to 50 candidate photos or signatures at once. The engine automatically processes each image in parallel and packs them into a single clean ZIP archive.',
  },
  {
    question: 'Are applicant photos saved on VeriSeal servers?',
    answer:
      'Never. All photos are processed in volatile RAM memory with zero server disk persistence. Once your ZIP file is downloaded, all in-memory buffers are instantly purged.',
  },
  {
    question: 'Can I resize both photos and signatures together in one batch?',
    answer:
      'We recommend running photos under the Photo preset (e.g. SSC Photo 350x450 px) and signatures in a second batch under the Signature preset (e.g. SSC Signature 140x60 px) to ensure exact aspect ratio calibration.',
  },
  {
    question: 'Does the ZIP file rename the processed files?',
    answer:
      'Yes! The engine appends the preset specification code (e.g., candidate1_ssc_photo.jpg) so CSC operators can easily organize applicants without confusing files.',
  },
];

export default function BatchResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal Bulk Batch Photo Resizer & ZIP Downloader',
        url: 'https://veriseal.in/tools/batch-photo-resizer',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Batch resize and compress up to 50 candidate passport photos and signatures in 1 click with ZIP archive download.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Batch Resize Exam Photos for Multiple Applicants',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Multiple Photos',
            text: 'Choose up to 50 applicant passport photos or signature images from your device.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Exam Preset',
            text: 'Pick target exam preset such as SSC, UPSC, IBPS, or RRB.',
          },
          {
            '@type': 'HowToStep',
            name: 'Batch Process & Download ZIP',
            text: 'Click Process All and download the compressed ZIP archive containing all compliant images.',
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
          <span className="text-primary font-bold truncate">Bulk Batch Photo Resizer</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cyber Cafe & CSC Multi-Applicant Hub</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Bulk Batch Photo Resizer & ZIP Downloader
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Resize, crop, and compress up to 50 applicant photos or signatures simultaneously. Zero server disk persistence with instant structured ZIP download pre-calibrated for SSC, UPSC, and Banking portals.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Memory RAM Privacy:</strong> Every photo is processed in temporary volatile memory and purged instantly. Zero images are saved to disk or server logs.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <BatchResizerEngine />

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
            {/* Value Pillar Card */}
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Cyber Cafe Efficiency Perks</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">50 Photos in 3 Seconds</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">High-speed parallel RAM processing saves CSC queues.</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">Single ZIP Stream</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">No clicking 50 individual download buttons.</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">100% Guaranteed Pass</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Exact byte limits prevent portal form rejection.</div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related CSC Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/pvc-id-card-maker"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-emerald-600" />
                    PVC Smart Card Studio
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    Digital Self-Attestation
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/specifications"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-emerald-600" />
                    Exam Spec Radar
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
