import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Camera,
  CheckCircle2,
  FileCheck,
  Sliders,
  Sparkles,
  CreditCard,
  PenTool,
} from 'lucide-react';
import { PanCardCropEngine } from '@/components/tools/PanCardCropEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'NSDL & UTIITSL PAN Card Photo (213×213) & Signature (400×200) Resizer Free | Kagazo',
  description:
    'Resize and crop PAN card photo to 213x213 pixels (300 DPI, <30KB) and signature to 400x200 pixels (600 DPI, <60KB) for NSDL Protean & UTIITSL Form 49A. 100% private in-browser processing.',
  alternates: {
    canonical: 'https://kagazo.in/tools/pan-card-photo-signature-resizer',
  },
  openGraph: {
    title: 'PAN Card Photo (213×213) & Signature (400×200) Resizer Online Free | Kagazo',
    description:
      'Official dimensions for NSDL & UTIITSL PAN applications. 213x213 @ 300 DPI photo, 400x200 @ 600 DPI signature with B&W ink booster.',
    url: 'https://kagazo.in/tools/pan-card-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the exact photo specifications for NSDL and UTIITSL PAN Card applications?',
    answer:
      'Both Protean (NSDL e-Gov) and UTIITSL require applicant passport photographs to measure exactly 213 × 213 pixels (or 3.5 × 2.5 cm at 300 DPI). The file format must be JPEG/JPG with true colors, and the file size must strictly not exceed 30 KB (minimum 10 KB).',
  },
  {
    question: 'What are the exact signature specifications for PAN Card Form 49A / 49AA?',
    answer:
      'The applicant signature or left thumb impression must measure exactly 400 × 200 pixels (2:1 aspect ratio) at 600 DPI resolution. The file size must be strictly under 60 KB (minimum 10 KB). The ink should be dark black or dark blue on clean white paper.',
  },
  {
    question: 'Why does the NSDL portal reject my photo with "Resolution must be 300 DPI"?',
    answer:
      'Standard image editors only set pixel dimensions (213×213) but leave the internal JFIF resolution header at 72 DPI (web default) or uncalibrated. NSDL’s server software inspects the byte-level JFIF header. Kagazo automatically writes the binary 300 DPI (0x012C) marker for photos and 600 DPI (0x0258) marker for signatures, guaranteeing immediate portal acceptance.',
  },
  {
    question: 'How does the B&W Ink Clarity Booster work for phone camera photos of signatures?',
    answer:
      'When you photograph a signature with a smartphone, paper creases, yellow room lighting, and shadows often cause portal rejection. Our in-browser Otsu thresholding engine separates dark pen strokes from the background, converting shadows into pure white while intensifying ink lines to deep black.',
  },
  {
    question: 'Are my biometric photos and signatures uploaded to any server?',
    answer:
      'Never. Kagazo processes all image crops, DPI header injections, and quantization entirely in your browser’s volatile RAM via WebAssembly. Zero bytes leave your device, ensuring total privacy for your identity documents.',
  },
];

export default function PanCardPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'NSDL & UTIITSL PAN Card Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/pan-card-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Resize PAN card photo to 213x213 px at 300 DPI (<30KB) and signature to 400x200 px at 600 DPI (<60KB) for NSDL and UTIITSL portals.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo & Signature for PAN Card Form 49A',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo & Signature',
            text: 'Select or drag your applicant passport photo and signature into the respective upload boxes.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Crop & Ink Booster',
            text: 'Align the square crop guide for photo and enable the B&W ink booster to clean the signature background.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified PAN Kit',
            text: 'Download the 213x213 @ 300 DPI photo and 400x200 @ 600 DPI signature individually or as a single ZIP kit.',
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

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">PAN Card Photo &amp; Signature Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>NSDL (Protean) &amp; UTIITSL Official Specifications</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PAN Card Photo </span>
            <span className="text-primary">(213×213)</span>
            <span> &amp; Signature </span>
            <span className="text-primary">(400×200)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Crop and resize applicant photo to exactly 213×213 px (300 DPI, &lt;30 KB) and signature to 400×200 px (600 DPI, &lt;60 KB). Guaranteed zero rejection on NSDL &amp; UTIITSL portals.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PanCardCropEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Portal Specifications Cheatsheet */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Official NSDL vs UTIITSL PAN Card Upload Rules
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for online PAN applications (Form 49A &amp; 49AA).
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Requirement</th>
                      <th className="p-3.5 text-primary">Passport Photograph</th>
                      <th className="p-3.5 text-primary">Signature / Thumb Impression</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">Pixel Dimensions</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        213 × 213 pixels (1:1 square)
                      </td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        400 × 200 pixels (2:1 landscape)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Physical Size</td>
                      <td className="p-3.5">3.5 cm × 2.5 cm (approx 1.38&quot; × 1&quot;)</td>
                      <td className="p-3.5">2.0 cm × 4.5 cm</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">DPI Resolution</td>
                      <td className="p-3.5 font-bold text-emerald-700">300 DPI (Required)</td>
                      <td className="p-3.5 font-bold text-emerald-700">600 DPI (Required)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">File Size Limit</td>
                      <td className="p-3.5 font-bold text-primary">
                        Strictly &lt; 30 KB (10–30 KB)
                      </td>
                      <td className="p-3.5 font-bold text-primary">
                        Strictly &lt; 60 KB (10–60 KB)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Color Mode</td>
                      <td className="p-3.5">24-bit True Color (sRGB)</td>
                      <td className="p-3.5">Black &amp; White / High-contrast Ink</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Allowed Format</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                      <td className="p-3.5">JPEG / JPG only</td>
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
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Frequently asked questions about PAN card photo and signature resizing.
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

          {/* Compact Sticky Right Sidebar Rail (col-span-3 / col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar + PAN Merge
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    KYC
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Signature 20KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    20 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-50kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Photo 50KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    50 KB
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change DPI (600)
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DPI
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 200KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    PDF
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Biometrics and signatures are processed exclusively in client-side volatile RAM. Zero server uploads.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ NSDL 300 DPI
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ UTIITSL 600 DPI
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
