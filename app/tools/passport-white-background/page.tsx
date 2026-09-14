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
  AlertTriangle,
} from 'lucide-react';
import { BackgroundRemoverEngine } from '@/components/tools/BackgroundRemoverEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Convert Photo Background to White for Passport & Visa | Free 300 DPI | Kagazo',
  description:
    'Convert any photo background to official pure white (#FFFFFF) or light grey for Indian Passport, US Visa, and Schengen. 300 DPI output, zero watermarks, 100% free RAM privacy.',
  keywords: [
    'change passport photo background to white online free',
    'white background for passport photo free no watermark',
    'convert photo background to white for passport seva',
    'us visa white background photo editor free',
    'remove background from passport photo 300 dpi',
    'passport photo background changer online mobile',
    'schengen visa light grey background editor',
    'signature white background converter online',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/passport-white-background',
  },
  openGraph: {
    title: 'Convert Photo Background to White for Passport & Visa | Free 300 DPI | Kagazo',
    description:
      'Convert any photo background to official pure white (#FFFFFF) or light grey for Indian Passport, US Visa, and Schengen. 300 DPI output, zero watermarks, 100% free RAM privacy.',
    url: 'https://kagazo.in/tools/passport-white-background',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Photo Background to White for Passport & Visa | Free 300 DPI | Kagazo',
    description:
      'Convert casual photos into official pure white or light grey passport portraits with 300 DPI output and zero cloud upload.',
  },
};

const BACKGROUND_STANDARDS = [
  {
    authority: 'Indian Passport (Passport Seva / MEA)',
    colorStandard: 'Pure Plain White (#FFFFFF / RGB 255, 255, 255)',
    rules: 'Zero patterns, shadows, or yellow tint; high contrast with dark clothing',
  },
  {
    authority: 'United States (Passport / DS-160 / DV Lottery)',
    colorStandard: 'Plain White or Off-White (#FFFFFF to #F8F9FA)',
    rules: 'Uniform lighting; zero shadows cast behind ears or under chin',
  },
  {
    authority: 'United Kingdom (HMPO / British Passports)',
    colorStandard: 'Plain Light Grey (#E5E7EB) or Light Cream',
    rules: 'Pure stark white is discouraged to avoid halo glare on light hair',
  },
  {
    authority: 'Schengen Visa (France, Germany, 29 EU States)',
    colorStandard: 'Uniform Light Grey or Neutral Light Background',
    rules: 'Shadow-free flat background; 70%–80% face contrast required',
  },
  {
    authority: 'Malaysia / Singapore / Middle East Visas',
    colorStandard: 'Passport Light Blue (#B0C4DE) or Pure White',
    rules: 'Specific consular portals mandate sky-blue or light blue backgrounds',
  },
];

const FAQS = [
  {
    question: 'Which passport and visa portals require a pure white background?',
    answer:
      'An absolute plain white background is mandatory for Indian Passports (Passport Seva Kendra), U.S. Passports and Visas (DS-160), Canadian Passports (IRCC), Australian Visas, and over 80% of global government agencies.',
  },
  {
    question: 'Which countries require a light grey background instead of white?',
    answer:
      'The UK HM Passport Office (HMPO) and several Schengen countries (such as France, Norway, and Switzerland) prefer or mandate a uniform light grey or light cream background to provide clear contrast with pale skin or blond/white hair. Kagazo supports both with a 1-click toggle.',
  },
  {
    question: 'Does Kagazo leave a watermark on the white background image?',
    answer:
      'Never. Kagazo is 100% free with zero watermarks, zero quality downsampling, and no hidden fees. You get the full-resolution output ready for direct submission.',
  },
  {
    question: 'How does Kagazo keep hair strands looking natural on a white background?',
    answer:
      'Our client-side alpha matting algorithm analyzes luminance differentials along the subject border, feathering fine hair strands naturally so the photo looks like it was captured in a professional photography studio.',
  },
  {
    question: 'Can I use this tool to whiten signature backgrounds as well?',
    answer:
      'Yes! You can upload signatures signed on notebook paper or photographed under yellow lighting to convert the background into pure flatbed white without losing delicate pen stroke details.',
  },
  {
    question: 'What format does this tool export?',
    answer:
      'Kagazo exports standard baseline JPEG files with embedded 300 DPI JFIF density tags, universally accepted across government and visa portals.',
  },
  {
    question: 'Why do passport offices reject photos with colored backgrounds?',
    answer:
      'Colored walls, patterns, and background shadows interfere with automated biometric edge detection and facial recognition algorithms used in border control e-Gates.',
  },
  {
    question: 'Can I print the resulting photo on a 4×6" photo card?',
    answer:
      'Yes! You can take your whitened photo into our Passport Photo Maker to tile 8 copies onto a standard 4×6" sheet for inexpensive drugstore printing.',
  },
  {
    question: 'Is my photo uploaded to an external server or AI cloud?',
    answer:
      'Never. All background removal and whitening happen 100% inside your browser’s local memory. Zero bytes leave your device.',
  },
  {
    question: 'What should I wear when taking a photo to be whitened?',
    answer:
      'Wear dark clothing (such as dark blue, black, or charcoal) so that your shoulders and collar contrast sharply against the white background.',
  },
];

export default function PassportWhiteBackgroundPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Convert Photo Background to White for Passport & Visa',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/passport-white-background',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert any photo background to official pure white (#FFFFFF) or light grey for Indian Passport, US Visa, and Schengen with 300 DPI output.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert a Photo Background to Pure White for Passport & Visa',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Casual Portrait',
            text: 'Select your photo taken against any home wall or indoor background.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic Subject Segmentation',
            text: 'Our in-browser segmentation algorithm separates your face, hair, and clothing from the backdrop.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Background Color',
            text: 'Select Pure White (#FFFFFF) for Indian/US or Light Grey for UK/Schengen.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inject 300 DPI Headers',
            text: 'Kagazo embeds binary 300 DPI JFIF density tags directly into the JPEG file.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Full-Resolution JPG',
            text: 'Download your studio-quality portrait with zero watermarks.',
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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Passport & Visa Photo Lab',
            item: 'https://kagazo.in/tools/passport-photo-maker',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Passport White Background',
            item: 'https://kagazo.in/tools/passport-white-background',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/40" />
          <Link href="/tools" className="hover:text-primary transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/40" />
          <Link
            href="/tools/passport-photo-maker"
            className="hover:text-primary transition-colors"
          >
            Passport & Visa Photo Lab
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/40" />
          <span className="font-semibold text-text-main">Passport White Background</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-extrabold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Official Pure White (#FFFFFF)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Convert Photo Background to White </span>
            <span className="text-primary">(for Passport & Visa)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Turn casual photos into official consular-compliant portraits by converting cluttered home
            backgrounds into pure flatbed white (<code className="font-mono text-primary font-bold">#FFFFFF</code>)
            or official light grey. Features hair-edge preservation, 300 DPI binary injection, and zero-upload
            in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Pure Flatbed White (#FFFFFF)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              HMPO Light Grey Mode
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              300 DPI Embedded JFIF
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <Lock className="w-3.5 h-3.5 text-primary" />
              100% In-Browser RAM Privacy
            </span>
          </div>
        </header>

        {/* Main Grid: Tool Engine (9 cols) + Quick Info Sidebar (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Container */}
            <BackgroundRemoverEngine mode="passport_white" />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                Why Whiten Passport Photo Backgrounds on Kagazo?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    #FFF
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Pure Consular White</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Replaces yellow indoor walls, curtains, and shadows with clean, uniform consular white (#FFFFFF).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-3">
                    HMPO
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">UK & Schengen Light Grey</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    1-click switch to official light grey (#E5E7EB) required by His Majesty&apos;s Passport Office.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-3">
                    Hair
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Natural Hair-Edge Feathering</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Sub-pixel alpha matting preserves fine flyaway hair strands without harsh unnatural cutout lines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-3">
                    Free
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Zero Watermarks or Paywalls</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download full-resolution images instantly with no watermark stamps or email registration gates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-3">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Writes binary resolution markers into the JPEG APP0 marker to satisfy strict embassy intake rules.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-3">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Zero server uploads. Your personal facial portraits are processed entirely inside volatile RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Background Standards Comparison */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-primary" />
                    Consular Background Standards by Country & Authority
                  </h2>
                  <p className="text-sm text-text-main/70 mt-1">
                    Match the exact background shade mandated by your target visa or passport portal.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  ICAO Doc 9303
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-4">Authority / Portal</th>
                      <th className="py-3 px-4">Official Color Standard</th>
                      <th className="py-3 px-4">Background Rules & Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {BACKGROUND_STANDARDS.map((std, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-text-main whitespace-nowrap">
                          {std.authority}
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-700">{std.colorStandard}</td>
                        <td className="py-3 px-4 text-text-main/70">{std.rules}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step-by-Step Instructions */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <Camera className="w-6 h-6 text-primary" />
                Step-by-Step: How to Convert Your Photo Background to White
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Upload Photo</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Select your portrait taken against any indoor wall, door, or curtain.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Auto-Segmentation</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Client-side algorithm identifies subject boundaries and isolates hair and shoulders in RAM.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Choose Background</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Select Pure White (#FFFFFF) for India/US or Light Grey for UK/Schengen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Refine Edges</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Fine-tune edge feathering to ensure hair strands look realistic and sharp against white.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      5
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Inject 300 DPI</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Kagazo embeds binary 300 DPI JFIF density markers directly into the JPEG stream.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      6
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Download Free</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Save the studio-quality image with zero watermarks for online passport or visa upload.
                  </p>
                </div>
              </div>
            </section>

            {/* Rejection Prevention & Troubleshooting */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Background Rejection Reasons & How Kagazo Prevents Them
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    Rejection: Background Shadows
                  </h3>
                  <p className="text-xs text-red-800/80 leading-relaxed">
                    <strong>The Cause:</strong> Flash or room lights casting dark silhouettes behind the subject’s head or ears.
                  </p>
                  <p className="text-xs text-red-900 font-semibold pt-1">
                    <strong>Kagazo Fix:</strong> Completely eliminates shadows and fills the space with uniform #FFFFFF white.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    Rejection: Jagged &quot;Sticker&quot; Edges
                  </h3>
                  <p className="text-xs text-red-800/80 leading-relaxed">
                    <strong>The Cause:</strong> Crude background erasers creating harsh pixelated contours around hair and shoulders.
                  </p>
                  <p className="text-xs text-red-900 font-semibold pt-1">
                    <strong>Kagazo Fix:</strong> Sub-pixel alpha blending ensures natural transitions between hair and backdrop.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h3 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    Rejection: Yellow Room Tint
                  </h3>
                  <p className="text-xs text-red-800/80 leading-relaxed">
                    <strong>The Cause:</strong> Incandescent or warm domestic bulbs turning white walls yellow or beige in photos.
                  </p>
                  <p className="text-xs text-red-900 font-semibold pt-1">
                    <strong>Kagazo Fix:</strong> Replaces the entire backdrop with pure clinical white matching consular standards.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Frequently Asked Questions (Passport White Background)
                </h2>
                <p className="text-sm text-text-main/70 mt-1">
                  Everything you need to know about passport background requirements, color codes, and photo printing.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 space-y-2">
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

          {/* Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-3xl border border-surface-darker p-4 sm:p-5 shadow-card space-y-3">
              <span className="text-xs font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Passport Tools
              </span>

              <div className="space-y-1.5">
                <Link
                  href="/tools/passport-photo-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Global Passport Studio
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    50+
                  </span>
                </Link>

                <Link
                  href="/tools/us-passport-photo"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      US Passport Photo
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    2×2&quot;
                  </span>
                </Link>

                <Link
                  href="/tools/uk-passport-photo"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UK Passport Photo
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    HMPO
                  </span>
                </Link>

                <Link
                  href="/tools/schengen-visa-photo"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Schengen Visa Photo
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    EU
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Sheet Maker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    4×6&quot;
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-xs text-text-main/70 leading-relaxed">
                All background segmentation and whitening execute inside your browser RAM. Zero photos are
                ever transmitted to cloud servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Pure #FFFFFF
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Light Grey HMPO
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI JFIF
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
