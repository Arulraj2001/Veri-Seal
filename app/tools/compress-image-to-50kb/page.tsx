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
  title: 'Compress Image to 50KB Online Free | Exact 20-50KB Passport Photo | VeriSeal',
  description:
    'Compress photo and image to strictly between 20 KB and 50 KB online free. Perfect for passport photos, SSC, TNPSC, and IBPS online application forms. Zero blur, zero watermark.',
  alternates: {
    canonical: 'https://veriseal.in/tools/compress-image-to-50kb',
  },
  openGraph: {
    title: 'Compress Image to 50KB Online Free | VeriSeal',
    description:
      'Compress photos to 50KB online with exact dimension and size guarantee. Zero watermark, instant in-memory processing.',
    url: 'https://veriseal.in/tools/compress-image-to-50kb',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const PRESETS_50KB: CustomPreset[] = [
  {
    id: 'photo',
    label: 'Passport Photo (20-50KB, 3.5×4.5cm)',
    minKb: 20,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'id_card',
    label: 'ID Card / Aadhaar Photo (20-50KB)',
    minKb: 20,
    maxKb: 50,
    isPhoto: true,
  },
  {
    id: 'certificate_photo',
    label: 'Certificate Photo (30-50KB)',
    minKb: 30,
    maxKb: 50,
    isPhoto: true,
  },
];

const FAQS = [
  {
    question: 'How do I compress my photo to 50 KB without facial distortion?',
    answer:
      'Standard compressors often stretch or squash candidate faces when fitting strict dimensions. VeriSeal scales proportionally and automatically centers your photo on a pure white (#FFFFFF) canvas, maintaining your true facial proportions while locking the file size strictly between 20 KB and 50 KB.',
  },
  {
    question: 'Why do so many government portals ask for 20-50 KB photos?',
    answer:
      'Portals like SSC, IBPS, and State PSCs process millions of applicants simultaneously. The 20–50 KB range ensures the candidate face is sharp enough for automated biometric facial matching during the exam, while keeping file sizes small enough to avoid server bottlenecks.',
  },
  {
    question: 'Can I add my Name and Date of Photo (DOP) to the photo?',
    answer:
      'Yes! Check the "Add Name & Date strip" toggle. VeriSeal will automatically generate the official white bottom banner with your candidate name and date of photo capture.',
  },
  {
    question: 'Is this 50 KB compressor free to use for cyber cafes and applicants?',
    answer:
      'Yes, 100% free with no daily limits, no login requirement, and no watermarks.',
  },
];

export default function CompressImageTo50KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Compress Image to 50KB Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://veriseal.in/tools/compress-image-to-50kb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Compress photo and image to strictly between 20 KB and 50 KB online free. Perfect for passport photos, SSC, and TNPSC.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Image to 50 KB Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo',
            text: 'Upload your smartphone passport photo or camera capture.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Preset or Size',
            text: 'Choose Passport Photo (20-50KB) and optionally add Name & Date banner.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant Photo',
            text: 'Inspect with high-resolution clarity loupe and download the verified JPEG.',
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
          <Link href="/tools/government-exam-pdf-compressor" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Compress Image to 50KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Strict 20 KB to 50 KB Guarantee</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">50KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Resize passport photos and applicant pictures strictly between 20 KB and 50 KB. 
            Zero facial stretching, optional Name &amp; Date banner, and 100% portal acceptance.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="General / Exam"
              customPresets={PRESETS_50KB}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Quality Comparison Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Preserve Facial Symmetry Without Warping
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    Competitor Distortion
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Most resizers stretch pictures non-proportionally to match 3.5×4.5 cm, warping normal faces into unnaturally narrow or squashed shapes that can cause exam hall biometric rejection.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    VeriSeal Proportional Canvas
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    VeriSeal calculates the exact proportional scale, centers your head and shoulders, and pads edges with pure #FFFFFF background, guaranteeing zero facial distortion.
                  </p>
                </div>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (50 KB Photo Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Common queries about compressing passport photos to 50 KB.
                </p>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
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
                Related Tools
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Image to 20KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      10–20 KB signature sizing
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
                      SSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB, 3.5×4.5 cm
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
                      20–300 KB, 350×350 px
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
                      1-click marksheet to A4 PDF
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
                Photos are processed in ephemeral memory and discarded immediately upon download. No facial data is ever saved or shared.
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
