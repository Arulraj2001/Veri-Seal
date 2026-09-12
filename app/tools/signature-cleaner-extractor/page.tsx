import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PenTool,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import SignatureExtractorEngine from '@/components/tools/SignatureExtractorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Black Ink Signature Extractor & Contrast Enhancer | SSC, UPSC, IBPS',
  description:
    'Remove ruled notebook lines, whiten paper backgrounds to pure #FFFFFF, and convert blue/faint pen strokes to dense India Black ink. Auto-crop to exact SSC 140x60, UPSC 350x350, and IBPS portal limits. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/signature-cleaner-extractor',
  },
  openGraph: {
    title: 'Free Black Ink Signature Extractor & Contrast Enhancer | Kagazo',
    description:
      'Eliminate lined notebook lines and convert blue ink to official black ink for SSC, UPSC, and Bank PO recruitment forms.',
    url: 'https://Kagazo.in/tools/signature-cleaner-extractor',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do SSC and UPSC portals reject signatures on lined paper?',
    answer:
      'Recruitment portals use automated optical character recognition (OCR) and high-speed signature verification algorithms during exam hall biometric checks. Horizontal notebook lines intersect with letters and cause automatic scanning failures.',
  },
  {
    question: 'Can I upload a signature written with a blue ballpoint pen?',
    answer:
      'Yes! Our engine mathematically isolates the blue and violet ink frequencies and remaps them to dense, official India Black ink (#141414) while preserving your natural pen pressure variations.',
  },
  {
    question: 'What are the exact signature dimensions for SSC CGL and UPSC CSE?',
    answer:
      'SSC requires 140 × 60 pixels strictly between 10KB and 20KB in JPEG format. UPSC requires a square 350 × 350 pixels between 20KB and 50KB. Our presets automatically apply these exact specifications.',
  },
  {
    question: 'Is my handwritten signature stored on Kagazo servers?',
    answer:
      'Never. Kagazo processes all signatures strictly inside temporary RAM memory. Your signature is instantly wiped upon download. Zero images are saved to disk or databases.',
  },
];

export default function SignatureExtractorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Black Ink Signature Extractor',
        url: 'https://Kagazo.in/tools/signature-cleaner-extractor',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Extract black ink signatures from notebook paper photos for SSC, UPSC, and IBPS online application forms.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Extract Clean Black Ink Signature for Government Exam Forms',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Signature Photo',
            text: 'Take a clear phone photo of your signature (even on lined notebook paper or with blue ink).',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Exam Preset',
            text: 'Select SSC (140x60, 10-20KB), UPSC (350x350, 20-50KB), or IBPS.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Official JPG',
            text: 'Click Extract Clean Official Signature and download your 100% portal-compliant JPG.',
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
          <span className="text-primary font-bold truncate">Signature Cleaner & Extractor</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Lined Paper Rejections</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Black Ink Signature Extractor & Contrast Enhancer
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Automatically eliminates notebook ruled lines, converts faint or blue ballpoint ink to dense official India Black ink, whitens paper background to pure `#FFFFFF`, and auto-crops to exact SSC, UPSC, and IBPS limits.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Memory Privacy:</strong> Your handwritten signature is processed strictly in volatile RAM memory and purged immediately upon download. Zero server persistence.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <SignatureExtractorEngine />

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
                <span>Portal Specification Rules</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">SSC CGL / CHSL / MTS</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">140 × 60 px • 10 KB to 20 KB • Black Ink</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">UPSC Civil Services</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">350 × 350 px • 20 KB to 50 KB • Pure White BG</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800">IBPS PO & Clerk</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">140 × 60 px • 10 KB to 20 KB • No Capital Letters</div>
                </div>
              </div>
            </div>

            {/* Related Tools Links */}
            <div className="p-6 bg-white rounded-3xl border border-surface-darker/70 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Related Exam Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/thumb-impression-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>Left Thumb Impression Enhancer</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>SSC Photo & Signature Resizer</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium"
                >
                  <span>UPSC Photo & Signature Resizer</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* Ad Slot */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
