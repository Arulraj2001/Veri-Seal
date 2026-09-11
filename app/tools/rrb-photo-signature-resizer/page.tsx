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
  title: 'Railway RRB Photo & Signature Resizer Online Free | NTPC, Group D, ALP | VeriSeal',
  description:
    'Resize photo (20-50KB, 320x240px with plain white background) and signature (10-40KB, 160x80px) for Railway RRB NTPC, Group D, ALP, Technician, and RPF Constable online application forms.',
  alternates: {
    canonical: 'https://veriseal.in/tools/rrb-photo-signature-resizer',
  },
  openGraph: {
    title: 'Railway RRB Photo & Signature Resizer Online Free | VeriSeal',
    description:
      'Exact 320x240 px and 160x80 px dimensions guaranteed. Avoid mass RRB application rejection. 100% free forever.',
    url: 'https://veriseal.in/tools/rrb-photo-signature-resizer',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const RRB_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'RRB Photo (20-50KB, 240×320px)',
    minKb: 20,
    maxKb: 50,
    widthPx: 240,
    heightPx: 320,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'RRB Signature (10-40KB, 160×80px)',
    minKb: 10,
    maxKb: 40,
    widthPx: 160,
    heightPx: 80,
    isXerox: true,
  },
];

const RRB_FAQS = [
  {
    question: 'What are the official photo and signature dimensions for Railway RRB exams?',
    answer:
      'According to official Railway Recruitment Board (RRB) notifications (NTPC, Group D, ALP, Technician, and RPF): Photograph must be 320 × 240 pixels (or 240 × 320 px) with file size strictly between 20 KB and 50 KB in JPG/JPEG format on a pure plain white background. Signature must have dimensions of 160 × 80 pixels with file size strictly between 10 KB and 40 KB in black ink on white paper.',
  },
  {
    question: 'Why do so many railway applications get rejected every year?',
    answer:
      'In past RRB recruitments, over 500,000 candidate forms were rejected due to: (1) Background not being plain white (e.g. blue wall, outdoor backdrop, shadows), (2) Signatures written in CAPITAL / BLOCK letters instead of running handwriting, (3) Selfie photos or photos wearing caps/sunglasses, and (4) Incorrect pixel dimensions (not 320x240 or 160x80).',
  },
  {
    question: 'Does VeriSeal ensure my RRB signature is in running handwriting?',
    answer:
      'VeriSeal preserves your genuine running handwriting strokes and applies our Xerox ink boost to darken faint ballpoint pen ink. Remember: never sign in block/capital letters when signing for Railway applications.',
  },
  {
    question: 'Is this RRB Resizer tool free with no watermark?',
    answer:
      'Yes, 100% free forever for all railway aspirants and cyber cafe operators. VeriSeal never stamps watermarks, never requires payment or signups, and processes images in volatile RAM memory.',
  },
];

export default function RrbPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Railway RRB Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://veriseal.in/tools/rrb-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize photograph (20-50KB, 320x240px) and signature (10-40KB, 160x80px) for Railway RRB NTPC, Group D, ALP, and RPF Constable.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for Railway RRB Portal Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose RRB Photo or Signature',
            text: 'Select RRB Photo (20-50KB, 240x320px) or RRB Signature (10-40KB, 160x80px).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload File',
            text: 'Upload your recent passport photograph or scanned signature.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic Pixel Calibration',
            text: 'VeriSeal locks exact pixel dimensions and balances file size within strict RRB rules.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant JPEG',
            text: 'Inspect with clarity zoom loupe and download the verified JPEG.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: RRB_FAQS.map((faq) => ({
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
          <span className="text-primary font-bold">Railway RRB Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RRB NTPC, Group D, ALP, Technician &amp; RPF Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Railway RRB Photo &amp; </span>
            <span className="text-primary">Signature Resizer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Calibrate photos to exact Railway Recruitment Board standards: Photo (20–50 KB, 320×240 px, plain white background) 
            and Signature (10–40 KB, 160×80 px). Guaranteed zero facial distortion.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="Railway RRB"
              customPresets={RRB_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official RRB Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official Railway RRB Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Enforced strictly by the Railway Recruitment Board online registration system.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  RRB Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Document</th>
                      <th className="py-3 px-3 font-bold">Allowed Size</th>
                      <th className="py-3 px-3 font-bold">Dimensions</th>
                      <th className="py-3 px-3 font-bold">Non-Negotiable Guidelines</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Passport Photograph</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 50 KB</td>
                      <td className="py-3 px-3">240 × 320 pixels (or 320×240)</td>
                      <td className="py-3 px-3">Pure plain white background, frontal face, no glare</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 40 KB</td>
                      <td className="py-3 px-3">160 × 80 pixels</td>
                      <td className="py-3 px-3 text-red-600 font-medium">Running handwriting only (Capital letters disqualified)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (Railway RRB Resizer)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear guidance for candidates applying for Railway NTPC, Group D, and ALP recruitment.
                </p>
              </div>

              <div className="space-y-3">
                {RRB_FAQS.map((faq, idx) => (
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
                      SSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB, 3.5×4.5 cm
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/ibps-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      IBPS Banking Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Photo, Sig, Thumb &amp; Declaration
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
                      NEET Postcard (4"×6")
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Postcard, Photo &amp; 10-Finger scan
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
                      Marksheet to PDF (&lt; 200 KB)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Class 10/12 certificate to PDF
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
                <span>100% Client-Side RAM Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Railway photos and signatures are processed in volatile memory and wiped immediately upon download. Never stored on server disks.
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
