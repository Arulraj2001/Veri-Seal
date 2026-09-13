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
  title: 'Canadian Passport Photo Maker Online Free (50x70 mm) | IRCC | Kagazo',
  description:
    'Create official 50×70 mm Canadian passport, visa, and PR photos online free. 100% compliant with IRCC specifications (31–36 mm face length) with printable 4×6" sheet. Save $22 on Shoppers Drug Mart.',
  alternates: {
    canonical: 'https://kagazo.in/tools/canadian-passport-photo',
  },
  openGraph: {
    title: 'Canadian Passport Photo Maker Online Free (50x70 mm) | Kagazo',
    description:
      'Generate IRCC-compliant 50x70 mm Canadian passport and Permanent Resident photos at 300 DPI with printable 4x6 sheet.',
    url: 'https://kagazo.in/tools/canadian-passport-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the official Canadian passport photo dimensions (IRCC)?',
    answer:
      'The photo must measure 50 mm wide by 70 mm high (2 inches wide by 2 3/4 inches high). The length of the face from the bottom of the chin to the top of the head (crown) must be between 31 mm and 36 mm (occupying 44% to 51% of the photo height).',
  },
  {
    question: 'Does this meet requirements for Canadian PR (Permanent Resident) cards and Citizenship?',
    answer:
      'Yes! Immigration, Refugees and Citizenship Canada (IRCC) mandates the identical 50×70 mm biometric specification for Canadian Passports, PR Cards, Citizenship applications, and Temporary Resident Visas (TRV).',
  },
  {
    question: 'How do I save $22 compared to Shoppers Drug Mart or Walmart Canada?',
    answer:
      'Shoppers Drug Mart, Walmart, and CAA charge $19.99 to $24.99 CAD for two Canadian passport photos. When you download Kagazo’s 4×6" photo card sheet (which tiles 4 official 50×70 mm photos at 300 DPI), you can print it at any pharmacy or Walmart photo kiosk as a standard 4×6 photo print for just $0.39 CAD!',
  },
  {
    question: 'What is the rule regarding the photographer’s stamp for physical applications?',
    answer:
      'For mail-in physical passport applications, IRCC requires the photographer/studio name, address, and date taken stamped or written on the back of one photo. If submitting digitally through the IRCC portal, no stamp is required; only the high-resolution 300 DPI JPEG is needed.',
  },
];

export default function CanadianPassportPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Canadian Passport Photo Maker Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/canadian-passport-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Official 50x70 mm Canadian passport, visa, and PR photo creator with IRCC biometric oval guides, 300 DPI output, and 4x6 print sheets.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Take a Canadian Passport Photo at Home',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Take a Selfie',
            text: 'Stand in front of a white or light-coloured wall with even, shadow-free lighting.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align 31-36 mm Face Length Oval Guide',
            text: 'Use Kagazo’s official IRCC oval to position your chin and crown between 31mm and 36mm.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Photo & 4x6 Sheet',
            text: 'Download single 591x827px 300 DPI JPEG or printable 4x6 sheet.',
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
          <span className="text-primary font-bold">Canadian Passport Photo Maker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>🇨🇦 IRCC Canada • 50×70 mm (2×2.75 in) @ 300 DPI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Canadian Passport Photo Maker </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Create official 50×70 mm Canadian passport, visa, and PR photos online. Strict IRCC biometric compliance (31–36 mm face height) with printable 4×6" sheets (4 photos). Save $22 on Shoppers Drug Mart.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (75% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PassportPhotoStudioEngine
              defaultCountryId="canadian-passport"
              toolHeading="Canadian Passport & PR Photo Studio"
              toolSubheading="Upload your portrait. Align with IRCC 31-36mm face height rules, inspect 50×70mm dimensions, and download 300 DPI files with guarantor back-stamp template."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Price Comparison vs Canadian Studios */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Cost Comparison: Kagazo vs Canadian Pharmacy / Studio Prints
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">Shoppers Drug Mart / Walmart</span>
                  <div className="text-2xl font-black text-rose-600 font-mono">CAD $24.99 – $29.99</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Significant markup for two physical prints. Strict 50×70mm dimensions often poorly cropped by store staff.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">Commercial Online Passport Apps</span>
                  <div className="text-2xl font-black text-amber-600 font-mono">CAD $14.99 – $19.99</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Hidden recurring billing traps, lack of Canadian guarantor stamp templates, and low-res downloads.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-500/40 space-y-2 relative">
                  <span className="text-xs font-bold text-emerald-800 block">Kagazo + Pharmacy Photo Kiosk</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">CAD $0.39 (4 Photos!)</div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Download our 4×6 sheet for 100% free, print at Walmart or Costco photo centre as a standard print. Save 98%!
                  </p>
                </div>
              </div>
            </section>

            {/* Official Biometric Guidelines */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Key Canadian Passport Photo Rules (IRCC)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Unique 50mm × 70mm Size</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Canada requires a unique 50×70mm (2×2.75 in) aspect ratio, distinctly larger than US or European standards.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Head Size 31mm to 36mm</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Face height from chin to crown must measure between 31mm and 36mm (roughly 44%–51% of photo height).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Plain White or Light-Coloured Background</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Background must be uniform white or very light color without shadows, textures, or secondary reflections.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Strict Neutral Facial Expression</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Mouth strictly closed, no smiling or frowning. Both eyes clearly open and gazing directly into camera lens.
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
                  Frequently Asked Questions (Canadian Passport Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Essential details on IRCC guidelines, guarantor signatures, and home photo submission.
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

          {/* Compact Sticky Right Sidebar Rail (25% Width) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix - High Density Single-Line List */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Other Passport Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/us-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-sm shrink-0">🇺🇸</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      US Passport
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    2×2 in
                  </span>
                </Link>

                <Link
                  href="/tools/uk-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-sm shrink-0">🇬🇧</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UK Passport
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45mm
                  </span>
                </Link>

                <Link
                  href="/tools/schengen-visa-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-sm shrink-0">🇪🇺</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Schengen Visa
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45mm
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-exact-kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Exact KB
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
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sleek In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Photos are processed locally in your browser's private memory. Zero biometric images stored on remote servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ Zero Server Upload</span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ 300 DPI</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
