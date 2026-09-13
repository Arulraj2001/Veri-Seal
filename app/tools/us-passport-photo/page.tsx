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
  DollarSign,
  Printer,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';
import { PassportPhotoStudioEngine } from '@/components/tools/PassportPhotoStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'US Passport Photo Maker Online Free (2x2 in) | 300 DPI & DS-160 | Kagazo',
  description:
    'Create official 2x2 inch (51x51 mm) US passport and visa photos online free at 300 DPI. 100% compliant with U.S. Dept of State & DS-160 standards with printable 4x6 sheet. Save $17 on CVS/Walgreens.',
  alternates: {
    canonical: 'https://kagazo.in/tools/us-passport-photo',
  },
  openGraph: {
    title: 'US Passport Photo Maker Online Free (2x2 in) | Kagazo',
    description:
      'Generate compliant 2x2 inch US passport photos at 300 DPI with printable 4x6 sheet. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/us-passport-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the official U.S. Department of State photo requirements?',
    answer:
      'The photo must be 2×2 inches (51×51 mm) square, taken within the last 6 months. The head height from the bottom of the chin to the top of the head must be between 1 inch and 1 3/8 inches (50% to 69% of the image height). The background must be pure white or off-white with zero shadows.',
  },
  {
    question: 'Are eyeglasses allowed in US passport photos?',
    answer:
      'NO. Effective November 1, 2016, eyeglasses are strictly prohibited in US passport and visa photos, even if you wear them daily. The only rare exception is with a signed medical certificate for urgent ophthalmic surgery recovery.',
  },
  {
    question: 'How does the printable 4×6" sheet save $17 at CVS or Walgreens?',
    answer:
      'CVS, Walgreens, and Rite Aid charge $16.99 to $18.99 for two 2×2 passport photos. When you download Kagazo’s 4×6" sheet (tiling 6 identical 2×2" photos), you can print it as a standard 4×6 glossy photo print at any pharmacy or photo kiosk for just $0.35 to $0.40, saving over 97%!',
  },
  {
    question: 'Does this meet requirements for online DS-160 and Green Card Lottery (DV Lottery)?',
    answer:
      'Yes. Kagazo’s single photo output is 600×600 pixels @ 300 DPI in sRGB color space, bisected under 240 KB in JPEG format, perfectly matching the strict technical gate of the CEAC DS-160 portal and the Diversity Immigrant Visa (DV) lottery.',
  },
];

export default function UsPassportPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'US Passport Photo Maker Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/us-passport-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Official 2x2 inch US passport and visa photo maker with biometric oval guides, 300 DPI JFIF output, and 4x6 print sheets.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Make a US Passport Photo at Home',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Take a Selfie',
            text: 'Take a front-facing photo against a light wall with no eyeglasses.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align Biometric Face Oval',
            text: 'Use Kagazo’s official 50-69% head height guide to align eyes and chin.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Photo & 4x6 Sheet',
            text: 'Download the 600x600px 300 DPI JPEG or printable 4x6 sheet.',
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
          <span className="text-primary font-bold">US Passport Photo Maker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>🇺🇸 U.S. Dept of State • 2×2 in (51×51 mm) @ 300 DPI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>US Passport Photo Maker </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Create official 2×2" US passport and visa photos at 300 DPI. Guaranteed biometric compliance with head height guides and printable 4×6" sheets. Save $17 on CVS &amp; Walgreens prints.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (83.3% Width on XL, 75% on LG) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PassportPhotoStudioEngine
              defaultCountryId="us-passport"
              toolHeading="US Passport & Visa Photo Studio"
              toolSubheading="Upload your selfie or portrait. Align your face with the 50-69% biometric oval, rotate/deskew, and download 300 DPI files."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Price Comparison vs CVS/Walgreens */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Cost Comparison: Kagazo vs Pharmacy Photo Studios
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">CVS / Walgreens / Post Office</span>
                  <div className="text-2xl font-black text-rose-600 font-mono">$16.99 – $18.99</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Charges premium rate for 2 printed photos. Long waits in line with zero digital copy included.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">Commercial Online Photo Apps</span>
                  <div className="text-2xl font-black text-amber-600 font-mono">$9.99 – $14.99</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Heavy subscription traps, weekly recurring fees, and watermark paywalls on download.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-500/40 space-y-2 relative">
                  <span className="text-xs font-bold text-emerald-800 block">Kagazo + 4×6" Kiosk Print</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">$0.35 (6 Photos!)</div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Download our 4×6 sheet for 100% free, print at Walgreens/CVS photo kiosk as standard print. Save 98%!
                  </p>
                </div>
              </div>
            </section>

            {/* Official Biometric Guidelines */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Key U.S. Passport Photo Rules (Bureau of Consular Affairs)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>No Eyeglasses Allowed</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Eyeglasses of any kind (reading glasses, tinted, or clear prescription) are strictly prohibited by the US Department of State.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Head Size 1 to 1 3/8 Inches</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The distance between the bottom of your chin and top of your head must occupy between 50% and 69% of the photo height.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Plain White / Off-White Background</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Background must be uniform with zero shadows, textures, furniture, or other people visible in frame.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Neutral Facial Expression</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Natural unforced expression with both eyes clearly open, mouth closed, and looking directly into camera lens.
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
                  Frequently Asked Questions (US Passport Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Answers to top questions regarding US passport photo guidelines and printing.
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

          {/* Ultra-Compact Sticky Right Sidebar Rail (16.7% Width on XL, 25% on LG) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix - High Density Single-Line List */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5 px-1">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Other Passport Tools
              </h3>

              <div className="space-y-1">
                <Link
                  href="/tools/uk-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span className="text-xs shrink-0">🇬🇧</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UK Passport
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
                  </span>
                </Link>

                <Link
                  href="/tools/schengen-visa-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span className="text-xs shrink-0">🇪🇺</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Schengen Visa
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
                  </span>
                </Link>

                <Link
                  href="/tools/canadian-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span className="text-xs shrink-0">🇨🇦</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Canada Photo
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    50×70
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-exact-kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    DS-160
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    300 DPI
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sleek In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-[11px]">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[10px] text-text-main/70 leading-tight">
                Rendered locally in browser RAM via WebAssembly. Zero uploads to servers.
              </p>
              <div className="flex flex-wrap items-center gap-1 text-[9px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">✓ Zero Server Upload</span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">✓ 300 DPI</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
