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
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'SSC Photo & Signature Resizer Online Free | 20-50KB & 10-20KB | Kagazo',
  description:
    'Resize photo (20-50 KB, 3.5x4.5 cm) and signature (10-20 KB, 4.0x2.0 cm) for SSC CGL, CHSL, MTS, CPO, GD Constable. 100% compliant with Staff Selection Commission portal specifications.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/ssc-photo-signature-resizer',
  },
  openGraph: {
    title: 'SSC Photo & Signature Resizer Online Free | Kagazo',
    description:
      'Resize photograph and signature for SSC CGL, CHSL, MTS, GD Constable online. Strict 20-50KB and 10-20KB limits guaranteed. No blur, no watermark.',
    url: 'https://Kagazo.in/tools/ssc-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SSC_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'SSC Photo (20-50KB, 3.5x4.5cm)',
    minKb: 20,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'SSC Signature (10-20KB, 4.0x2.0cm)',
    minKb: 10,
    maxKb: 20,
    widthCm: 4.0,
    heightCm: 2.0,
    isXerox: true,
  },
];

const SSC_FAQS = [
  {
    question: 'What are the official photo and signature dimensions for SSC exams?',
    answer:
      'According to Staff Selection Commission (SSC) official guidelines: Photograph must have dimensions of 3.5 cm (width) x 4.5 cm (height) and file size between 20 KB and 50 KB. Signature must have dimensions of 4.0 cm (width) x 2.0 cm (height) and file size strictly between 10 KB and 20 KB in JPEG/JPG format.',
  },
  {
    question: 'Why does the SSC portal reject my signature with "File size less than 10 KB"?',
    answer:
      'When students crop signatures tightly, ordinary mobile tools compress the JPEG to 4 KB - 8 KB. The SSC online application portal instantly flags any file below 10.0 KB as invalid. Kagazo uses 300 DPI super-sampling and safe JFIF structure padding to ensure your signature strictly lands in the safe 12 KB - 18 KB range.',
  },
  {
    question: 'What are the main reasons for SSC photo rejection?',
    answer:
      'SSC strictly rejects photos with: (1) Caps, hats, or dark spectacles/sunglasses, (2) Both ears not clearly visible, (3) Side profile or tilted face, (4) Dark or patterned backgrounds, (5) Blurry or pixelated scans, and (6) File size outside 20-50 KB.',
  },
  {
    question: 'Is this SSC Resizer 100% free with no watermark?',
    answer:
      'Yes, Kagazo is 100% free forever for all applicants and cyber cafe operators. We never stamp watermarks, never require signups, and process files in volatile RAM memory so your personal documents are never stored on server storage.',
  },
];

export default function SscPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SSC Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/ssc-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize photograph and signature for SSC CGL, CHSL, MTS, CPO, and GD Constable. Strictly compliant with 20-50KB and 10-20KB rules.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for SSC Portal Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose SSC Photo or Signature',
            text: 'Select SSC Photo (20-50KB, 3.5x4.5cm) or SSC Signature (10-20KB, 4.0x2.0cm).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Scan',
            text: 'Drag and drop or select your photo or signature image.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic Enhancement',
            text: 'Kagazo centers the image, boosts contrast, and calibrates file size to strict SSC limits.',
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
        mainEntity: SSC_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            jsonLdAnswer: faq.answer,
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
            { label: 'SSC Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>SSC CGL, CHSL, MTS, CPO &amp; GD Constable Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>SSC Photo &amp; Signature </span>
            <span className="text-primary">Resizer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Resize your photo (20–50 KB, 3.5×4.5 cm) and signature (10–20 KB, 4.0×2.0 cm) to exact Staff Selection Commission upload standards. 
            Guaranteed under-size padding and over-size compression with zero facial distortion.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="SSC"
              customPresets={SSC_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official SSC Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official SSC Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict rules enforced by the Staff Selection Commission (ssc.gov.in) portal.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  SSC Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Document</th>
                      <th className="py-3 px-3 font-bold">Allowed Size Range</th>
                      <th className="py-3 px-3 font-bold">Dimensions</th>
                      <th className="py-3 px-3 font-bold">Format &amp; Quality</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">SSC Candidate Photo</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 50 KB</td>
                      <td className="py-3 px-3">3.5 cm (W) × 4.5 cm (H)</td>
                      <td className="py-3 px-3">Light background, both ears visible, no spectacles</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">SSC Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 20 KB</td>
                      <td className="py-3 px-3">4.0 cm (W) × 2.0 cm (H)</td>
                      <td className="py-3 px-3">Strict 2:1 horizontal ratio, dark blue/black ink</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SSC Rejection Prevention Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Top Reasons SSC Applications Get Rejected (And How Kagazo Fixes Them)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Trap #1: Under 10 KB Signature
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Cropping signatures tightly often results in 4–8 KB files. SSC servers immediately throw an error. Kagazo applies super-sampling and safe JFIF padding to lock signatures securely at 12–18 KB.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Trap #2: Facial Distortion
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Generic online resizers force images into rectangular boxes, stretching round faces into tall ovals. Kagazo scales proportionally and centers on a pure white canvas without warping.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Trap #3: Faint Ballpoint Pen Ink
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Mobile photos of signatures often have dark gray paper and faint blue ink. Our Xerox filter darkens the pen strokes while washing background paper to pure #FFFFFF white.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Trap #4: Wrong Aspect Ratio
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    SSC mandates a wide 4.0 cm × 2.0 cm (2:1 aspect ratio) for signatures. Kagazo automatically frames your signature to prevent squished or truncated letters.
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
                  Frequently Asked Questions (SSC Photo &amp; Signature)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear answers to common questions about SSC CGL, CHSL, MTS, and GD photo uploads.
                </p>
              </div>

              <div className="space-y-3">
                {SSC_FAQS.map((faq, idx) => (
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
                      UPSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–300 KB, 350×350 px, 10-day DOP rule
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/tnpsc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      TNPSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB, Name &amp; DOP Strip
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

                <Link
                  href="/tools/government-exam-pdf-compressor"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Govt Exam PDF Compressor
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compress PDFs to 100KB, 200KB, 500KB
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
                <span>100% Client-Side &amp; In-Memory Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your photograph and signature are processed exclusively in volatile RAM memory and immediately destroyed after download. Never saved to database or disk.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No Signup
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/ssc-photo-signature-resizer" />
      </div>
    </div>
  );
}
