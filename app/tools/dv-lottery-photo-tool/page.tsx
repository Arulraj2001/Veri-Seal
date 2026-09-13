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
  Printer,
  Sparkles,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { UscisPhotoCheckerEngine } from '@/components/tools/UscisPhotoCheckerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'DV Lottery Photo Tool 2026 / 2027 Online Free (Official 600×600 px) | Kagazo',
  description:
    'Free official DV Lottery 2026 & 2027 photo tool. Validate 600x600 px dimensions, 50%–69% head height ratio, 300 DPI, plain white background, and file size under 240 KB in browser RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/dv-lottery-photo-tool',
  },
  openGraph: {
    title: 'DV Lottery Photo Tool 2026 / 2027 Online Free | Kagazo',
    description:
      'Check and crop photos for the US Diversity Visa (Green Card) Lottery. 600x600 px, 50%-69% head height, 300 DPI, zero cloud upload.',
    url: 'https://kagazo.in/tools/dv-lottery-photo-tool',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the exact photo specifications for DV Lottery 2026 / 2027?',
    answer:
      'The US State Department mandates that every DV Lottery entry photo must be exactly 600 × 600 pixels (1:1 square ratio) in JPEG format, with 24-bit sRGB color. The head height (from bottom of chin to top of head) must be between 50% and 69% of the total height (300 to 414 pixels). The file size must not exceed 240 KB (minimum 60 KB).',
  },
  {
    question: 'Can I use the official US State Department photo tool on my phone?',
    answer:
      'The official State Department website tool frequently fails to load or crashes on modern smartphone browsers because it relies on legacy web components. Kagazo’s DV Lottery Photo Tool runs 100% on HTML5 Canvas and WebAssembly, working seamlessly across all iPhones, Android phones, tablets, and desktop computers.',
  },
  {
    question: 'Can I submit last year’s photo for the new DV Lottery registration?',
    answer:
      'No. The State Department strictly mandates that your photograph must have been taken within the last 6 months to reflect your current appearance. Submitting the same photo from a previous year will lead to immediate disqualification.',
  },
  {
    question: 'How should baby or toddler photos be taken for the DV Lottery?',
    answer:
      'No other person may be in the photo, and the child must look directly at the camera with eyes open. A common trick is to lay the baby on a plain white sheet on their back, photographing from directly above, or placing a white sheet over a car seat.',
  },
  {
    question: 'Are hats, turbans, or religious head coverings permitted?',
    answer:
      'Head coverings worn for religious purposes are permitted, provided the full facial oval from the bottom of the chin to the top of the forehead and both edges of the face are clearly visible without casting shadows.',
  },
];

export default function DvLotteryPhotoToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'DV Lottery Photo Tool 2026/2027',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/dv-lottery-photo-tool',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Official photo validator and cropper for the US Diversity Visa Green Card Lottery. 600x600 px @ 300 DPI.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Prepare a Compliant DV Lottery Photo',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Portrait Photo',
            text: 'Upload a recent portrait photo taken in good lighting against a plain white background.',
          },
          {
            '@type': 'HowToStep',
            name: 'Check Head Height & Eye Zone',
            text: 'Ensure the head fits within the 50% to 69% oval guide and eyes fall in the designated eye zone.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 600×600 px JPEG',
            text: 'Export the verified JPEG file guaranteed under 240 KB and 300 DPI for immediate registration.',
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
      {/* Ambient glow */}
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
          <span className="text-primary font-bold">DV Lottery Photo Tool</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>US State Dept Diversity Visa 2026 / 2027 Validator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>DV Lottery Photo Tool </span>
            <span className="text-primary">2026 / 2027 Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Validate 600×600 px dimensions, 50%–69% head height ratio, and 300 DPI for the US Green Card Lottery. Guaranteed compliance with zero rejection.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UscisPhotoCheckerEngine
              defaultMode="dv_lottery"
              toolHeading="Official DV Lottery Photo Validator Studio"
              toolSubheading="Upload portrait photo. Crop to official 600×600 px (300 DPI) with State Dept head height boundaries."
            />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Disqualification Prevention Checklist */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  How to Ensure Your DV Lottery Entry Is Not Disqualified
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Over 20% of DV lottery submissions are disqualified during electronic entry due to bad photos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                    ✅ Exact 600 × 600 Pixels
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Square aspect ratio (1:1). Rectangular or skewed photos are rejected automatically by the portal validator.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                    ✅ Head Height 50% - 69%
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    The head must measure between 300 and 414 pixels from chin to top of hair. No extreme close-ups or far-away shots.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                    ✅ File Size &lt; 240 KB
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Kagazo automatically compresses the output to ~140 KB, well within the 60 KB to 240 KB limit.
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
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Frequently asked questions regarding the US Diversity Visa Lottery photo requirements.
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
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/uscis-photo-checker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      USCIS Checker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    US Visa
                  </span>
                </Link>

                <Link
                  href="/tools/us-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      US Passport 2x2"
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    2×2 in
                  </span>
                </Link>

                <Link
                  href="/tools/schengen-visa-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Schengen Visa
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45mm
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    300 DPI
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-exact-kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to Exact KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    KB Limit
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Biometric audits and 4×6 sheet rendering execute locally in client-side RAM. No photos are ever uploaded.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI Tagged
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ DV-2026/27 Approved
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
