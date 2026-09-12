import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Award,
  HelpCircle,
  Camera,
  PenTool,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'GATE & JAM Photo & Signature Resizer Online Free | IIT GOAPS Portal | Kagazo',
  description:
    'Resize photo (5-200KB, ratio 0.66-0.89) and signature (5-100KB, strict 3.15 to 3.95 aspect ratio) for IIT GATE & JAM online application (GOAPS). Solves aspect ratio upload errors.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/gate-photo-signature-resizer',
  },
  openGraph: {
    title: 'GATE & JAM Photo & Signature Resizer Online Free | Kagazo',
    description:
      'Strict 3.15 to 3.95 aspect ratio compliance for IIT GATE GOAPS. In-memory processing, zero watermark.',
    url: 'https://Kagazo.in/tools/gate-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const GATE_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'GATE Photo (5-200KB, 0.77:1 ratio)',
    minKb: 5,
    maxKb: 200,
    widthPx: 350,
    heightPx: 450,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'GATE Signature (3.55:1 ratio, 5-100KB)',
    minKb: 5,
    maxKb: 100,
    widthPx: 532,
    heightPx: 150,
    isXerox: true,
  },
];

const GATE_FAQS = [
  {
    question: 'Why does IIT GOAPS show the error: "Aspect ratio of signature not between 3.15 and 3.95"?',
    answer:
      'The IIT GATE Online Application Processing System (GOAPS) runs an automated mathematical validation on signature dimensions: Width divided by Height must strictly fall between 3.15 and 3.95. If you upload a square or tall signature (e.g. 2:1 ratio), GOAPS automatically blocks the upload. Kagazo fixes this by centering your signature on a calibrated 3.55:1 canvas, guaranteeing zero rejection.',
  },
  {
    question: 'What are the official photo requirements for GATE & JAM?',
    answer:
      'Photograph must be between 5 KB and 200 KB in JPEG/JPG format. The aspect ratio must be between 0.66 and 0.89 (standard passport ratio). Candidate face must cover 60% to 70% of the image area on a clean white or very light background. Both ears must be clearly visible with no caps or tinted spectacles.',
  },
  {
    question: 'What ink color is permitted for the GATE signature?',
    answer:
      'Signatures must be signed in black or dark blue ink within a rectangular box on clean white paper. Kagazo includes our Xerox ink boost filter to sharpen blue and black pen strokes while removing grey shadows.',
  },
  {
    question: 'Is this GATE GOAPS Resizer 100% free with no watermark?',
    answer:
      'Yes, Kagazo is completely free forever. No watermarks, no signups, and your images are processed purely in volatile RAM memory without saving to server disks.',
  },
];

export default function GatePhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'GATE & JAM Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/gate-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize photo and signature for IIT GATE and JAM online applications with strict 3.15 to 3.95 aspect ratio compliance.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for IIT GOAPS Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select GATE Photo or Signature',
            text: 'Choose GATE Photo (5-200KB) or GATE Signature (3.55:1 aspect ratio).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Image',
            text: 'Upload your passport photo or signature scan.',
          },
          {
            '@type': 'HowToStep',
            name: 'Mathematical Aspect Ratio Locking',
            text: 'Kagazo sets exact dimensions (e.g. 532x150 px) to satisfy the 3.15-3.95 GOAPS rule.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant JPEG',
            text: 'Inspect with high-resolution clarity loupe and download the verified JPEG.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: GATE_FAQS.map((faq) => ({
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
          <Link href="/tools/government-exam-pdf-compressor" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">GATE &amp; JAM Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>IIT GOAPS Portal Ready &bull; Aspect Ratio Locked</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>GATE &amp; JAM Photo &amp; </span>
            <span className="text-primary">Signature Resizer (GOAPS)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Calibrate engineering &amp; science exam documents to strict IIT GOAPS standards. 
            Guarantees signature aspect ratio strictly within the mandatory <span className="font-mono font-bold text-primary">3.15 to 3.95</span> range.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="signature"
              examName="IIT GATE GOAPS"
              customPresets={GATE_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official GATE Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official IIT GOAPS Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict mathematical parameters enforced by the Indian Institute of Technology.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  IIT Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Document</th>
                      <th className="py-3 px-3 font-bold">Allowed File Size</th>
                      <th className="py-3 px-3 font-bold">Aspect Ratio Rule</th>
                      <th className="py-3 px-3 font-bold">Key Guidelines</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Passport Photograph</td>
                      <td className="py-3 px-3 font-bold text-primary">5 KB to 200 KB</td>
                      <td className="py-3 px-3">0.66 to 0.89</td>
                      <td className="py-3 px-3">White background, 60–70% face coverage, both ears visible</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">5 KB to 100 KB</td>
                      <td className="py-3 px-3 text-primary font-bold">3.15 to 3.95 (Strict)</td>
                      <td className="py-3 px-3">Black or dark blue ink, running hand (Capital letters prohibited)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* The 3.15 - 3.95 Aspect Ratio Explanation */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Understanding the IIT GOAPS 3.15–3.95 Signature Rule
              </h2>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2 text-xs sm:text-sm text-text-main/80 leading-relaxed">
                <p>
                  Most online image compressors resize signatures to a square (1:1) or standard 2:1 rectangle. When uploaded to the GOAPS portal, the automated validator divides the pixel width by the pixel height:
                </p>
                <div className="p-3 rounded-xl bg-white border border-surface-darker font-mono text-xs text-center text-primary font-bold">
                  Aspect Ratio = Pixel Width ÷ Pixel Height &rarr; Must be between 3.15 and 3.95
                </div>
                <p>
                  Kagazo sets your canvas to exactly <strong>532 × 150 pixels</strong> (<span className="font-mono text-primary font-bold">532 ÷ 150 = 3.55</span>), perfectly centered in the permissible window, ensuring 100% first-time portal acceptance.
                </p>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (GATE GOAPS Resizer)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Guidance for engineering &amp; science graduates filling out GATE &amp; JAM registration.
                </p>
              </div>

              <div className="space-y-3">
                {GATE_FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl bg-surface/50 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 font-bold text-text-main text-xs sm:text-sm cursor-pointer list-none select-none">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/40 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Right Sidebar Rail (32% Width) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Exam Resizers
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      UPSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–300 KB, 350×350 px, 10-day DOP
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/rrb-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Railway RRB Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      320×240 px, 20–50 KB photo
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      SSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB, 3.5×4.5 cm
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Degree Certificate to PDF
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      A4 formatted PDF strictly &lt; 200 KB
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* RAM Security & Privacy Shield */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Memory RAM Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your photograph and signature are processed in ephemeral system memory and destroyed immediately upon download. Never stored on server disks.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
