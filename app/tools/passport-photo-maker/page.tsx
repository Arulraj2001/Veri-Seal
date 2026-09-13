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
  Printer,
  FileCheck,
  AlertTriangle,
  Globe2,
  Sparkles,
} from 'lucide-react';
import { PassportPhotoStudioEngine } from '@/components/tools/PassportPhotoStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Passport Photo Maker Online Free (35×45 mm & 2×2 in) | 300 DPI Sheet | Kagazo',
  description:
    'Create official passport size photos online free for Indian Passport (Passport Seva Kendra, 35x45 mm), US Visa (2x2 in), UK, Canada, and Schengen. 300 DPI JFIF output with printable 4x6" 8-photo sheet and name/date stamp.',
  alternates: {
    canonical: 'https://kagazo.in/tools/passport-photo-maker',
  },
  openGraph: {
    title: 'Passport Photo Maker Online Free (35×45 mm & 2×2 in) | Kagazo',
    description:
      'Generate compliant 35x45mm Indian passport & international visa photos at 300 DPI with printable 4x6 sheet. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/passport-photo-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the official photo requirements for Indian Passport (Passport Seva Kendra)?',
    answer:
      'For domestic Indian passport applications through Passport Seva Kendra (PSK) or Indian missions abroad, the photograph must measure 35 × 45 mm (width × height) at 300 DPI. The background must be pure plain white with zero shadows or borders, and the face must occupy 60% to 70% of the picture height (chin to crown).',
  },
  {
    question: 'How does printing a 4×6" photo sheet save money at local studios or photo labs?',
    answer:
      'Photo studios and cyber cafes typically charge ₹80 to ₹150 for 8 passport photos. When you download Kagazo’s printable 4×6" sheet (tiling 8 identical 35×45 mm photos with scissor cutting lines), you can print it as a standard 4×6 photo print at any photo kiosk or digital studio for just ₹5 to ₹10, saving over 90% of the cost!',
  },
  {
    question: 'Can I add Candidate Name and Date of Photo (DOP) for exam portal uploads?',
    answer:
      'Yes! Many recruitment bodies (UPSC, SSC, State Police, Railway RRB) mandate that the applicant name and date the photo was taken (DOP) be printed on a clear white strip at the bottom of the photo. Simply toggle the "Add Name & Date Strip" option in the studio controls.',
  },
  {
    question: 'Can I create visa photos for the US, UK, Schengen, and Canada using this tool?',
    answer:
      'Yes. Kagazo includes a multi-country preset switcher. You can switch to US Visa / DS-160 (2×2 inch, 600×600 px), UK Passport (35×45 mm, light grey background), Schengen Visa (35×45 mm, 70-80% face ratio), Canadian Passport / PR (50×70 mm), Australia, or Singapore with 1 click.',
  },
  {
    question: 'Are my biometric photos uploaded or stored on your servers?',
    answer:
      'Never. Kagazo guarantees 100% In-Browser Sovereign Privacy. Every crop, aspect ratio recalculation, DPI header injection, and sheet generation executes entirely within your browser’s local volatile RAM memory. Zero bytes leave your device.',
  },
];

export default function PassportPhotoMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Passport Photo Maker Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/passport-photo-maker',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Official 35x45mm Indian passport photo maker and international visa photo creator with 300 DPI JFIF output and printable 4x6 sheets.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Make an Official Passport Photo Online at Home',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Take a Frontal Portrait',
            text: 'Take a clear, well-lit photo against a plain white or light background looking straight into the camera.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Country Specification',
            text: 'Choose Indian Passport (35x45 mm), US Visa (2x2 in), UK, Schengen, or Canada.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align Biometric Face Frame',
            text: 'Position your face within the 60%-70% biometric head height guides and adjust brightness if needed.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Photo & 4x6 Sheet',
            text: 'Download the 300 DPI compliant JPEG for online portals or the printable 4x6" 8-photo card for physical submission.',
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
          <span className="text-primary font-bold">Passport Photo Maker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Official MEA 35×45mm &amp; International Visa Standards • 300 DPI</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Passport Photo Maker Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Create biometric passport photos for <strong>Passport Seva Kendra (35×45 mm)</strong>,{' '}
            <strong>US Visa (2×2&quot;)</strong>, <strong>UK</strong>, <strong>Canada</strong>, and{' '}
            <strong>Schengen</strong>. Automatically injects 300 DPI JFIF headers, enforces face
            alignment guidelines, and generates printable 4×6&quot; sheets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-primary" /> MEA Passport Seva Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Printer className="w-4 h-4 text-primary" /> Printable 4×6&quot; 8-Photo Card
            </span>
          </div>
        </header>

        {/* Studio Grid (Main Engine + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Engine */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PassportPhotoStudioEngine
              defaultCountryId="india-passport"
              toolHeading="Passport &amp; Visa Photo Studio"
              toolSubheading="Upload your selfie or camera portrait to crop to official 35×45mm or 2×2 inch dimensions with 300 DPI print sheets."
            />

            {/* Post Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Official Specifications Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Official Passport Photo Specifications Cheatsheet
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for online government portals and physical application centers.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Authority / Country</th>
                      <th className="p-3.5">Dimensions</th>
                      <th className="p-3.5">Resolution</th>
                      <th className="p-3.5">Background</th>
                      <th className="p-3.5">Head Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">India (Passport Seva Kendra)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Plain White</td>
                      <td className="p-3.5">60%–70% of frame</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">US Visa (DS-160 / USCIS)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        2 × 2 in (600×600 px)
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">White / Off-White</td>
                      <td className="p-3.5">50%–69% of frame</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">United Kingdom (HM Passport)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Light Grey / Cream</td>
                      <td className="p-3.5">29–34 mm (64%–75%)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Schengen Visa (Europe)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">35 × 45 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Light Grey / White</td>
                      <td className="p-3.5">70%–80% of frame</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Canada (IRCC Passport &amp; PR)</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">50 × 70 mm</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5">Plain White</td>
                      <td className="p-3.5">31–36 mm (44%–51%)</td>
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
                  Everything you need to know about passport photos, print sheets, and portal rules.
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
                Related Photo Studios
              </span>

              <div className="space-y-1">
                <Link
                  href="/tools/passport-white-background"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      White Background
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    White
                  </span>
                </Link>

                <Link
                  href="/tools/remove-background"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Full-HD Background Remover
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    4K
                  </span>
                </Link>

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

                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Sheet Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    4×6&quot;
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
                Your biometric photographs are cropped and processed exclusively in client-side volatile
                RAM. Never stored or logged.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI JFIF
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 35×45 mm / 2×2&quot;
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
