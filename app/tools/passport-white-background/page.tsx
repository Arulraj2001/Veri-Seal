import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Download,
  Camera,
  Layers,
  CheckCircle2,
  FileCheck,
  Globe2,
} from 'lucide-react';
import { BackgroundRemoverEngine } from '@/components/tools/BackgroundRemoverEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Change Photo Background to White for Passport & Visa Online Free | Kagazo',
  description:
    'Convert any photo background to official pure white (#FFFFFF) or light blue for Indian Passport, US Visa (DS-160), Schengen Visa, and government portals. 300 DPI JFIF output, 100% free, zero cloud upload.',
  alternates: {
    canonical: 'https://kagazo.in/tools/passport-white-background',
  },
  openGraph: {
    title: 'Convert Photo Background to White for Passport Free | Kagazo',
    description:
      'Official pure white (#FFFFFF) and light blue background converter for Passport Seva Kendra, US Visa, and SSC/UPSC exam forms. 300 DPI compliant.',
    url: 'https://kagazo.in/tools/passport-white-background',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do passport offices strictly require a pure white background?',
    answer:
      'ICAO (International Civil Aviation Organization) Doc 9303 biometric standard mandates a plain, uniform white or light grey background without patterns, shadows, or reflections. This ensures automated airport e-Gates and facial recognition algorithms can accurately calculate facial feature coordinates without background interference.',
  },
  {
    question: 'Does this tool inject the mandatory 300 DPI resolution header?',
    answer:
      'Yes! Passport Seva Kendra (India), USCIS (US Visa), and consular portals inspect the internal JFIF metadata marker. Kagazo automatically injects the RFC-compliant 300 DPI (0x012C) binary marker into the saved JPEG file, preventing portal rejection for "insufficient print resolution".',
  },
  {
    question: 'Which countries require a light blue background instead of white?',
    answer:
      'Countries including Malaysia, Singapore (ICA), UAE (Federal Authority for Identity), Kuwait, and Oman require or accept light blue backgrounds for tourist or employment visas. In the studio panel, simply click "Passport Blue (#B0C4DE)" to generate compliant blue backgrounds.',
  },
  {
    question: 'Can I use a casual photo taken at home against a wall?',
    answer:
      'Yes! Stand 2-3 feet in front of any wall in a well-lit room. Our in-browser segmentation algorithm detects your face, hair, and clothing, cleanly strips away wall textures, yellow room lighting, and background shadows, and replaces them with an official, uniform studio white background.',
  },
  {
    question: 'Are my passport photos saved or sent to any server?',
    answer:
      'Never. Kagazo processes all image transformations entirely within your browser’s volatile RAM memory using client-side WebAssembly and HTML5 Canvas. Zero bytes leave your device, ensuring total privacy for your identity documents.',
  },
];

export default function PassportWhiteBackgroundPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kagazo Passport White Background Converter',
        applicationCategory: 'PhotoEditingApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/passport-white-background',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert photo background to pure white (#FFFFFF) or light blue for Passport Seva Kendra, US Visa, and Schengen Visa with 300 DPI JFIF output.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Change Photo Background to White for Passport Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your Portrait Photo',
            text: 'Select or drop your photo taken against any indoor wall or room lighting.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Pure White or Passport Blue',
            text: 'Click Pure White (#FFFFFF) for Indian Passport / US Visa or Light Blue for Malaysia / UAE.',
          },
          {
            '@type': 'HowToStep',
            name: 'Fine-Tune Sensitivity and Edge Feather',
            text: 'Adjust the slider to eliminate any wall shadows around shoulders and hair.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 300 DPI Compliant JPG',
            text: 'Download your official passport-ready photograph with embedded 300 DPI JFIF header.',
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
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-text-main/60 overflow-x-auto whitespace-nowrap py-1"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/tools" className="hover:text-primary transition-colors">
            Tools Directory
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-text-main font-bold">Passport White Background Converter</span>
        </nav>

        {/* 2-Column Responsive Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Hero Header Section */}
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5 fill-primary" />
                <span>OFFICIAL PURE WHITE (#FFFFFF) • 300 DPI JFIF • 100% FREE</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
                Convert Photo Background to White for Passport &amp; Visa
              </h1>
              <p className="text-sm sm:text-base text-text-main/80 max-w-3xl leading-relaxed">
                Transform any home photograph into an official government-compliant passport photo with a
                pure studio white background (#FFFFFF) or light blue backdrop. Automatically injects the
                mandatory 300 DPI binary JFIF marker for Passport Seva Kendra, US Visa (DS-160), and
                Schengen Visa acceptance.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-bold text-text-main/80">
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Pure White (#FFFFFF)
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Globe2 className="w-3.5 h-3.5 text-primary" /> ICAO Doc 9303 Compliant
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> Embedded 300 DPI Header
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Lock className="w-3.5 h-3.5 text-primary" /> 100% Local Device Privacy
                </span>
              </div>
            </header>

            {/* In-Browser Interactive Background Studio with Passport Defaults */}
            <BackgroundRemoverEngine mode="passport_white" />

            {/* Post Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Global Passport Background Standards Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Official Passport Background Color Rules by Country
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified background color requirements across major immigration and passport authorities.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Authority / Country</th>
                      <th className="p-3.5">Mandatory Background Color</th>
                      <th className="p-3.5">Standard Size</th>
                      <th className="p-3.5">DPI Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">India (Passport Seva Kendra)</td>
                      <td className="p-3.5 font-semibold text-text-main">
                        Pure Plain White (No shadows or borders)
                      </td>
                      <td className="p-3.5 font-mono">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">United States (USCIS / DS-160)</td>
                      <td className="p-3.5 font-semibold text-text-main">
                        Pure Plain White or Off-White
                      </td>
                      <td className="p-3.5 font-mono">2 × 2 inches (600×600 px)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Schengen Visa (Europe 27 States)</td>
                      <td className="p-3.5 font-semibold text-text-main">
                        Light Grey or Plain White
                      </td>
                      <td className="p-3.5 font-mono">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">United Kingdom (HM Passport Office)</td>
                      <td className="p-3.5 font-semibold text-text-main">
                        Plain Light Grey or Cream
                      </td>
                      <td className="p-3.5 font-mono">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Malaysia / Singapore / UAE</td>
                      <td className="p-3.5 font-semibold text-primary">
                        Light Blue (#B0C4DE) or Plain White
                      </td>
                      <td className="p-3.5 font-mono">35 × 50 mm / 35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
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
                  Frequently asked questions about passport photo white background compliance.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                    <h3 className="text-sm font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-mono text-xs mt-0.5">0{index + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/75 pl-5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Rail (xl:col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-2xl border border-surface-darker p-3 shadow-card space-y-2">
              <span className="text-[10px] font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Visa Tools
              </span>

              <div className="space-y-1">
                <Link
                  href="/tools/uscis-photo-checker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      USCIS Photo Checker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    US
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Indian Passport Photo
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
                  </span>
                </Link>

                <Link
                  href="/tools/dv-lottery-photo-tool"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      DV Lottery 2027
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    600px
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change Image DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DPI
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
                Your private biometric photos never touch our servers. Processed 100% in local browser RAM.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI JFIF
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Studio White
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
