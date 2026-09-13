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
  title: 'UK Passport Photo Maker Online Free (35x45 mm) | HM Passport Office | Kagazo',
  description:
    'Create official UK passport photos (35×45 mm) online free. 100% compliant with HM Passport Office specifications, 29–34 mm head height, and printable 4×6" sheet (8 photos). Save £12 on photo booth prints.',
  alternates: {
    canonical: 'https://kagazo.in/tools/uk-passport-photo',
  },
  openGraph: {
    title: 'UK Passport Photo Maker Online Free (35x45 mm) | Kagazo',
    description:
      'Generate HM Passport Office compliant 35x45 mm British passport photos at 300 DPI with printable 4x6 sheet. Free in-browser tool.',
    url: 'https://kagazo.in/tools/uk-passport-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the official HM Passport Office photo dimensions and rules?',
    answer:
      'The photo must measure 35mm wide by 45mm high. The head measurement from the crown of your head to the bottom of your chin must be between 29mm and 34mm (occupying 64% to 75% of the total frame). The background must be plain light grey or cream — NOT pure white.',
  },
  {
    question: 'Why does HM Passport Office reject pure white backgrounds?',
    answer:
      'Unlike the US, the British HM Passport Office requires a plain light grey or plain cream background. A pure white background causes halo glare on biometric scanners and makes light hair blend into the border.',
  },
  {
    question: 'How do I print 8 UK passport photos for £0.19 instead of £12?',
    answer:
      'Supermarket photo booths and Snappy Snaps charge £10 to £15 for 4 passport pictures. When you download Kagazo’s 4×6" photo sheet (which tiles 8 identical 35×45mm photos at 300 DPI), you can print it as a standard 4×6 photo print at Tesco, Boots, or Asda for just £0.19 to £0.35!',
  },
  {
    question: 'Can I use this for the online UK passport renewal digital upload?',
    answer:
      'Yes. Our engine outputs a high-resolution 300 DPI digital JPEG (minimum 600×750 pixels) that satisfies HM Passport Office digital upload gate checks.',
  },
];

export default function UkPassportPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'UK Passport Photo Maker Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/uk-passport-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Official 35x45 mm UK passport photo creator with HM Passport Office head measurement oval guides, 300 DPI output, and 4x6 print sheet.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Take a UK Passport Photo at Home',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Take Photo Against Light Grey / Cream Wall',
            text: 'Stand 0.5m away from a light grey or cream wall with uniform lighting.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align 29-34mm Biometric Crown-to-Chin Guide',
            text: 'Use Kagazo’s official HM Passport Office oval to align your face.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Photo & 4x6 Sheet',
            text: 'Download the 300 DPI single digital photo or 8-copy printable 4x6 sheet.',
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
          <span className="text-primary font-bold">UK Passport Photo Maker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>🇬🇧 HM Passport Office • 35×45 mm @ 300 DPI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>UK Passport Photo Maker </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Create official 35×45 mm British passport photos online. Guaranteed HM Passport Office biometric compliance (29–34 mm head height) with printable 4×6" sheets (8 photos). Save £12 on photo booths.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (75% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PassportPhotoStudioEngine
              defaultCountryId="uk-passport"
              toolHeading="UK Passport Photo Biometric Studio"
              toolSubheading="Upload your portrait. Align with HM Passport Office 29-34mm biometric crown-to-chin guide, adjust lighting, and generate 8-photo printable sheets."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Price Comparison vs UK Booths */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Cost Comparison: Kagazo vs UK Photo Booths
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">Photo-Me / Station Booths</span>
                  <div className="text-2xl font-black text-rose-600 font-mono">£10.00 – £12.00</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Expensive automated booths in train stations or supermarkets. Only 4 copies with bad fluorescent lighting.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <span className="text-xs font-bold text-text-main/60 block">Snappy Snaps / High St Studios</span>
                  <div className="text-2xl font-black text-amber-600 font-mono">£14.99 – £19.99</div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Costly commercial studios charging substantial markups for standard 35×45mm headshots.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-500/40 space-y-2 relative">
                  <span className="text-xs font-bold text-emerald-800 block">Kagazo + Tesco/Boots Kiosk</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">£0.19 (8 Photos!)</div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Download our 4×6 sheet for 100% free, print at Boots or Tesco photo kiosk as standard print. Save 98%!
                  </p>
                </div>
              </div>
            </section>

            {/* Official Biometric Guidelines */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Key UK Passport Photo Rules (HM Passport Office)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Head Size 29mm to 34mm</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The distance from the crown of the head to the bottom of the chin must be between 29mm and 34mm (roughly 65-75% of height).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Light Grey or Plain Cream Background</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    UK regulations specify a plain cream or light grey background without patterns, shadows, or textures.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>No Head Coverings (Unless Religious)</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Hats, caps, and head coverings are not permitted except for strictly religious or medical exemptions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Neutral Expression &amp; Eyes Open</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Mouth closed, no grinning or exaggerated smile, both eyes fully visible with no glare or red-eye reflection.
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
                  Frequently Asked Questions (UK Passport Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear answers for British passport online applications and paper counter submissions.
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
                Photos are processed locally in your browser's private memory. Zero biometric photos saved or uploaded to servers.
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
