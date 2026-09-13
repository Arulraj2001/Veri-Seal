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
  Globe,
} from 'lucide-react';
import { PassportPhotoStudioEngine } from '@/components/tools/PassportPhotoStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Schengen Visa Photo Maker Online Free (35x45 mm) | ICAO 9303 | Kagazo',
  description:
    'Create official 35×45 mm European Schengen visa photos online free. 100% compliant with ICAO 9303 standards for France, Germany, Italy, Spain, Switzerland, and 29 EU nations with printable 4×6" sheet. Save €12 on VFS photo booths.',
  alternates: {
    canonical: 'https://kagazo.in/tools/schengen-visa-photo',
  },
  openGraph: {
    title: 'Schengen Visa Photo Maker Online Free (35x45 mm) | Kagazo',
    description:
      'Generate compliant 35x45 mm European Schengen visa photos at 300 DPI for all 29 member states with printable 4x6 sheet.',
    url: 'https://kagazo.in/tools/schengen-visa-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the official photo specifications for a Schengen visa?',
    answer:
      'The photograph must measure 35mm wide by 45mm high. According to the Schengen Visa Code and ICAO 9303, the applicant’s face must take up 70% to 80% of the picture height (between 32mm and 36mm from chin to crown). The background must be light grey or plain white with uniform lighting and zero flash shadows.',
  },
  {
    question: 'Is this photo accepted by VFS Global, BLS International, and TLScontact?',
    answer:
      'Yes! Kagazo adheres strictly to the official Biometric Photo Specifications published by the European Commission. The exported 413×531 px @ 300 DPI format matches visa submission standards across France, Germany, Switzerland, Italy, Spain, Greece, and all 29 Schengen states.',
  },
  {
    question: 'Why do VFS Global and embassy photo booths charge €10 to €15?',
    answer:
      'Visa application centers charge inflated emergency convenience fees for standard photo booth prints. With Kagazo, you can align your biometric photo, download the 4×6" photo sheet (which tiles 8 identical photos), and print it at any local pharmacy or photo printer for €0.25 to €0.50, saving over 95%!',
  },
  {
    question: 'Can I wear religious head coverings or hijabs in a Schengen visa photo?',
    answer:
      'Yes, religious head coverings are permitted provided they do not obscure any portion of the face. The full face—from the bottom of the chin to the top of the forehead and both edges of the cheeks—must be completely visible without casting shadows onto the face.',
  },
];

export default function SchengenVisaPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Schengen Visa Photo Maker Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/schengen-visa-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Official 35x45 mm Schengen European visa photo maker compliant with ICAO 9303 standards across 29 EU nations.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Prepare a Schengen Visa Photo',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Take a Selfie',
            text: 'Take a high-resolution portrait with good lighting and neutral expression.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align 70-80% Biometric Face Coverage',
            text: 'Use Kagazo’s ICAO 9303 oval guide to position chin and crown between 32mm and 36mm.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant Photo & 4x6 Sheet',
            text: 'Download single biometric JPEG or 8-copy printable 4x6 sheet.',
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
          <span className="text-primary font-bold">Schengen Visa Photo Maker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>🇪🇺 ICAO 9303 • 35×45 mm @ 300 DPI • 29 European States</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Schengen Visa Photo Maker </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate official 35×45 mm European Schengen visa photos online. Full ICAO 9303 biometric compliance (70%–80% face coverage) with printable 4×6" sheets (8 photos). Save €12 on VFS photo booths.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (75% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PassportPhotoStudioEngine
              defaultCountryId="schengen-visa"
              toolHeading="Schengen Visa Biometric Photo Studio"
              toolSubheading="Upload your passport portrait. Position face inside the 32-36mm biometric zone, verify 300 DPI compliance, and download printable photo sheets for visa consulates."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Price Comparison vs Visa Service Centres */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Cost Comparison: Kagazo vs VFS Global / Visa Application Centres
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">VFS Global / TLScontact Kiosk</span>
                  <div className="text-2xl font-black text-rose-600 font-mono">€12.00 – €15.00</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Exorbitant on-site photo booth charges at European visa application centres for basic prints.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">Commercial Visa Photo Apps</span>
                  <div className="text-2xl font-black text-amber-600 font-mono">€8.99 – €12.99</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Auto-renewing weekly charges, mandatory subscriptions, and watermarked downloads.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-500/40 space-y-2 relative">
                  <span className="text-xs font-bold text-emerald-800 block">Kagazo + Local Pharmacy Print</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">€0.25 (8 Photos!)</div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Download our 4×6 sheet for 100% free, print at dm, Rossmann, Boots, or pharmacy kiosk. Save 98%!
                  </p>
                </div>
              </div>
            </section>

            {/* Official Biometric Guidelines */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Key Schengen Visa Photo Rules (ICAO 9303 Standard)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Head Size 32mm to 36mm</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Chin-to-crown distance must measure strictly between 32mm and 36mm (occupying 70%–80% of photo).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Plain Light Grey Background</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Uniform light grey background (neither pure white nor dark). Zero cast shadows behind head or ears.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Eyes Directly Visible &amp; Centered</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Hair must not obscure eyebrows or eyes. Thick spectacle frames or reflective lenses are not allowed.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Photo Taken Within 6 Months</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The photo must represent your current appearance at the time of your consulate visa interview.
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
                  Frequently Asked Questions (Schengen Visa Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Guidance across European embassies including France, Germany, Italy, Spain, Switzerland, and Netherlands.
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
                  href="/tools/canadian-passport-photo"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-sm shrink-0">🇨🇦</span>
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Canada Photo
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    50×70mm
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
                Biometric imagery is rendered in volatile browser memory. Zero facial data is logged, retained, or sent to external servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ Zero Server Storage</span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ 300 DPI</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
