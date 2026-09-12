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
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'IBPS Photo, Signature, Thumb & Declaration Resizer Online Free | Kagazo',
  description:
    'Resize IBPS Photo (20-50KB, 200x230px), Signature (10-20KB, 140x60px), Left Thumb Impression (20-50KB, 240x240px), and Handwritten Declaration (50-100KB, 800x400px) for IBPS PO, Clerk, SO, RRB, and SBI online forms.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/ibps-photo-signature-resizer',
  },
  openGraph: {
    title: 'IBPS Photo, Signature, Thumb & Declaration Resizer Online Free | Kagazo',
    description:
      'All-in-one free image resizer for IBPS PO, Clerk, SO, RRB and SBI bank examinations. Exact pixels, zero watermark, 100% compliant.',
    url: 'https://Kagazo.in/tools/ibps-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const IBPS_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'IBPS Photo (20-50KB, 200×230px)',
    minKb: 20,
    maxKb: 50,
    widthPx: 200,
    heightPx: 230,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'IBPS Signature (10-20KB, 140×60px)',
    minKb: 10,
    maxKb: 20,
    widthPx: 140,
    heightPx: 60,
    isXerox: true,
  },
  {
    id: 'thumb',
    label: 'Left Thumb (20-50KB, 240×240px)',
    minKb: 20,
    maxKb: 50,
    widthPx: 240,
    heightPx: 240,
    isXerox: true,
  },
  {
    id: 'declaration',
    label: 'Declaration (50-100KB, 800×400px)',
    minKb: 50,
    maxKb: 100,
    widthPx: 800,
    heightPx: 400,
    isXerox: true,
  },
];

const IBPS_FAQS = [
  {
    question: 'What are the required dimensions for IBPS photo, signature, thumb, and declaration?',
    answer:
      'According to official IBPS guidelines: Photograph must be 200 × 230 pixels (20–50 KB), Signature must be 140 × 60 pixels (10–20 KB), Left Thumb Impression must be 240 × 240 pixels at 200 DPI (20–50 KB, 3×3 cm), and Handwritten Declaration must be 800 × 400 pixels at 200 DPI (50–100 KB, 10×5 cm).',
  },
  {
    question: 'What is the exact text for the IBPS Handwritten Declaration?',
    answer:
      'The official declaration text must read: "I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required." It must be written in English by the candidate in black ink on white paper.',
  },
  {
    question: 'Can the IBPS handwritten declaration be typed or written in capital letters?',
    answer:
      'No. IBPS explicitly states that handwritten declarations written in CAPITAL (BLOCK) LETTERS or typed by a computer will NOT be accepted and the application will be rejected.',
  },
  {
    question: 'What if I do not have a Left Thumb for the IBPS impression?',
    answer:
      'As per IBPS rules, if a candidate does not have a left thumb, they may use their right thumb. If both thumbs are missing, impression of one of the fingers of the left hand may be taken starting from the forefinger.',
  },
];

export default function IbpsPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'IBPS Photo, Signature, Thumb & Declaration Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/ibps-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize Photograph, Signature, Left Thumb Impression, and Handwritten Declaration for IBPS PO, Clerk, SO, and RRB recruitment.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize IBPS Banking Application Documents Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose Banking Document Type',
            text: 'Select Photo (20-50KB), Signature (10-20KB), Thumb (20-50KB), or Declaration (50-100KB).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Scan or Smartphone Photo',
            text: 'Upload your document or capture.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic Pixel & Size Calibration',
            text: 'Kagazo sets exact pixels (e.g. 200x230 or 800x400) and locks the file in the accepted KB range.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified JPEG',
            text: 'Download the optimized JPEG ready for instant upload on the IBPS portal.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: IBPS_FAQS.map((faq) => ({
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
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'IBPS Bank Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>IBPS PO, Clerk, SO, RRB &amp; SBI Portal Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>IBPS Photo, Signature &amp; </span>
            <span className="text-primary">Declaration Resizer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Calibrate banking exam documents to exact official pixel specifications: Photo (200×230 px), 
            Signature (140×60 px), Left Thumb (240×240 px), and Handwritten Declaration (800×400 px).
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="IBPS / SBI"
              customPresets={IBPS_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official IBPS Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official IBPS / SBI Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Enforced by the Institute of Banking Personnel Selection online registration engine.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  IBPS Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Document</th>
                      <th className="py-3 px-3 font-bold">Allowed Size</th>
                      <th className="py-3 px-3 font-bold">Pixel Dimensions</th>
                      <th className="py-3 px-3 font-bold">Key Guidelines</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Passport Photograph</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 50 KB</td>
                      <td className="py-3 px-3">200 × 230 pixels</td>
                      <td className="py-3 px-3">Light/white background, frontal face</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 20 KB</td>
                      <td className="py-3 px-3">140 × 60 pixels</td>
                      <td className="py-3 px-3">Black ink on white paper, no capital letters</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Left Thumb Impression</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 50 KB</td>
                      <td className="py-3 px-3">240 × 240 pixels (3×3 cm)</td>
                      <td className="py-3 px-3">Blue or black ink, clear ridge lines</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Handwritten Declaration</td>
                      <td className="py-3 px-3 font-bold text-primary">50 KB to 100 KB</td>
                      <td className="py-3 px-3">800 × 400 pixels (10×5 cm)</td>
                      <td className="py-3 px-3">In English, black ink, candidate's own handwriting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Official Handwritten Declaration Copy Box */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-2 pb-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Official IBPS Declaration Text to Copy
                </h2>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Mandatory Text
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-main/70">
                Write the following text clearly on clean white A4 paper using a black ink pen. Do not use capital letters:
              </p>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker font-mono text-xs sm:text-sm text-text-main/90 leading-relaxed select-all">
                &ldquo;I, _________ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.&rdquo;
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (IBPS &amp; SBI)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Guidance for candidates applying for Bank PO, Clerk, Specialist Officer, and RRB posts.
                </p>
              </div>

              <div className="space-y-3">
                {IBPS_FAQS.map((faq, idx) => (
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
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      SSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB, CGL/CHSL ready
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      UPSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–300 KB, 350×350 px, 10-day DOP rule
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/neet-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      NEET Postcard (4"×6") &amp; Photo
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      4×6 Postcard, 80% face passport photo
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
                      Marksheet Image to PDF (&lt; 200 KB)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      1-click certificate &amp; marksheet converter
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
                <span>100% In-Memory Banking Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your photograph, signature, thumb impression, and declaration are processed in RAM memory and wiped immediately upon download. No personal data is ever logged or stored.
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

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/ibps-bank-photo-signature-resizer" />
      </div>
    </div>
  );
}
