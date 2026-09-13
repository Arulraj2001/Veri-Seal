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
} from 'lucide-react';
import { UscisPhotoCheckerEngine } from '@/components/tools/UscisPhotoCheckerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'USCIS Photo Checker & Tool Online Free (600×600 px @ 300 DPI) | Kagazo',
  description:
    'Free online USCIS & US Visa (DS-160) biometric photo checker. Validates 600x600 px dimensions, 50%–69% head height ratio, 300 DPI, white background, and generates 4x6" printable cards.',
  alternates: {
    canonical: 'https://kagazo.in/tools/uscis-photo-checker',
  },
  openGraph: {
    title: 'USCIS Photo Checker & Validator Online Free | Kagazo',
    description:
      'Check and crop photos for US Visa (DS-160, DS-260) and Green Card. Biometric head height oval, 300 DPI, strictly < 240 KB.',
    url: 'https://kagazo.in/tools/uscis-photo-checker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the official USCIS and US Visa photo requirements?',
    answer:
      'The US Department of State and USCIS require photos to be exactly 2 × 2 inches (51 × 51 mm) or 600 × 600 pixels in digital format at 300 DPI. The subject’s head (from chin to crown) must measure between 50% and 69% of the total image height (1 to 1-3/8 inches). Eye height must be between 56% and 69% from the bottom edge.',
  },
  {
    question: 'Are eyeglasses allowed in US visa or passport photos?',
    answer:
      'No. As of November 1, 2016, eyeglasses are strictly prohibited in US passport and visa photos, even if you wear them daily. The only rare exception is a signed medical statement in cases of recent eye surgery.',
  },
  {
    question: 'What is the maximum file size allowed for online DS-160 upload?',
    answer:
      'The official US Department of State online portal requires JPEG files to be less than or equal to 240 KB (kilobytes) and greater than or equal to 60 KB. Kagazo’s binary search engine automatically compresses the photo to between 120 KB and 180 KB, safely within the acceptable window.',
  },
  {
    question: 'How does the 4×6" printable sheet save money at CVS or Walgreens?',
    answer:
      'Pharmacy photo counters (CVS, Walgreens, Rite Aid) charge $17.99 to $19.99 for two 2×2" passport photos. If you bring a standard 4×6" photo containing six 2×2" pictures, you can print it as an ordinary 4×6 snapshot for approximately $0.35 to $0.40 and simply cut the photos out along the guide lines.',
  },
  {
    question: 'Are my photos uploaded to any remote server or stored in the cloud?',
    answer:
      'No. All biometric verification, oval alignment, JFIF DPI header injection, and 4×6 sheet rendering take place 100% locally in your browser’s volatile RAM. Your photos are never uploaded or saved.',
  },
];

export default function UscisPhotoCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'USCIS Biometric Photo Checker',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/uscis-photo-checker',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Validate and crop US Visa and USCIS photos to exact 600x600 px @ 300 DPI with biometric head height oval guide.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Check and Crop a Photo for USCIS / DS-160',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Portrait Photo',
            text: 'Upload your photo directly from your phone, laptop, or camera.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align with Biometric Oval',
            text: 'Adjust zoom and position so the chin and crown fit within the official green State Dept oval guide.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Digital Photo or 4x6" Sheet',
            text: 'Download the 600x600 px JPEG for digital portals or the 4x6" card for $0.35 pharmacy printing.',
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
          <span className="text-primary font-bold">USCIS Photo Checker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official U.S. Dept of State &amp; USCIS 2×2" Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>USCIS &amp; US Visa </span>
            <span className="text-primary">Photo Checker Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Validate 600×600 px dimensions, 50%–69% head height ratio, and 300 DPI for DS-160, DS-260, and Green Card. Export digital JPEG or printable 4×6" sheets.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UscisPhotoCheckerEngine
              defaultMode="uscis"
              toolHeading="USCIS &amp; US Visa Biometric Photo Studio"
              toolSubheading="Upload portrait photo. Crop to official 600×600 px (300 DPI) with State Dept head height boundaries."
            />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Critical Rules Notice Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Top Reasons USCIS &amp; Consular Officers Reject Photos
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid delays in your visa interview or Green Card application by checking these rules.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    🚫 Eyeglasses Ban
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Eyeglasses are 100% prohibited. Photos with glasses or sunglasses will be automatically rejected.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    🚫 Harsh Shadows
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Background must be uniform plain white or off-white. No shadows behind ears or under chin.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    ✅ Neutral Expression
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                    Both eyes open, mouth closed, and looking straight into the camera lens with a neutral expression.
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
                  Frequently asked questions regarding USCIS and US Visa photo compliance.
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
                  href="/tools/dv-lottery-photo-tool"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      DV Lottery Tool
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    2026/27
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
                  ✓ DS-160 Approved
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
