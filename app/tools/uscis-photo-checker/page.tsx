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
  Globe2,
  Layers,
} from 'lucide-react';
import { UscisPhotoCheckerEngine } from '@/components/tools/UscisPhotoCheckerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'USCIS & US Visa Photo Checker (600×600 px) | Free Validator | Kagazo',
  description:
    'Check and validate your US visa (DS-160) & USCIS photo online free. Verifies 600x600 px, 50%–69% head height, eye level (56%–69%), under 240 KB, 100% RAM privacy.',
  keywords: [
    'uscis photo checker online free',
    'us visa photo tool 600x600 checker',
    'ds 160 photo validator eye level test',
    'green card photo head size ratio test',
    'check us passport photo compliance online',
    'uscis i 765 photo checker ead opt',
    'us visa photo 50 to 69 percent head height',
    'ds 160 photo file size under 240 kb',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/uscis-photo-checker',
  },
  openGraph: {
    title: 'USCIS & US Visa Photo Checker (600×600 px) | Free Validator | Kagazo',
    description:
      'Check and crop photos for US Visa (DS-160, DS-260) and Green Card. Biometric head height oval, 300 DPI, strictly under 240 KB.',
    url: 'https://kagazo.in/tools/uscis-photo-checker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USCIS & US Visa Photo Checker (600×600 px) | Free Validator | Kagazo',
    description:
      'Validate official 600x600 px photos for US Visa, USCIS, and Green Card applications with 100% RAM privacy.',
  },
};

const VALIDATION_CHECKLIST = [
  {
    parameter: 'Pixel Dimensions',
    officialRule: 'Strictly 600 × 600 pixels (Square 1:1 ratio @ 300 DPI)',
    validationResult: 'PASS: Exact 600×600 px locked',
  },
  {
    parameter: 'Head Height Ratio',
    officialRule: '50% to 69% of height (300 to 414 px from chin to hair)',
    validationResult: 'PASS: Calibrated between 300 and 414 px',
  },
  {
    parameter: 'Eye Level Position',
    officialRule: '56% to 69% from bottom of photo (336 to 414 px)',
    validationResult: 'PASS: Eye line verified within green zone',
  },
  {
    parameter: 'File Size Ceiling',
    officialRule: 'Strictly between 10 KB and 240 KB (Max 245,760 bytes)',
    validationResult: 'PASS: Auto-compressed into safe 90–160 KB band',
  },
  {
    parameter: 'Color Depth & Space',
    officialRule: '24-bit sRGB True Colour (Monochrome/B&W disqualified)',
    validationResult: 'PASS: Color channels preserved without tint',
  },
  {
    parameter: 'Resolution Density',
    officialRule: 'Embedded 300 DPI JFIF density in JPEG APP0 segment',
    validationResult: 'PASS: Binary 0x012C density header injected',
  },
  {
    parameter: 'Eyeglasses Rule',
    officialRule: 'Strictly prohibited (22 CFR 51.26; medical waiver only)',
    validationResult: 'PASS: Mandatory removal alert enforced',
  },
];

const FAQS = [
  {
    question: 'How does the Kagazo USCIS photo checker verify compliance?',
    answer:
      'Kagazo’s validator checks your image against the official Department of State 7-point criteria: 600 × 600 px dimensions, 50%–69% head height ratio, 56%–69% eye level line, under 240 KB file size, 24-bit sRGB color, plain white background, and embedded 300 DPI metadata.',
  },
  {
    question: 'What is the official photo tool provided by the Department of State?',
    answer:
      'The U.S. Department of State previously provided a Flash-based photo tool that was discontinued. Kagazo provides a modern, in-browser HTML5 replacement that runs natively on all mobile phones and modern browsers with zero plugins or downloads.',
  },
  {
    question: 'What happens if my photo has an eye level below 56%?',
    answer:
      'If your eyes sit below 56% of the image height, your head is positioned too low in the frame. The CEAC visa portal or USCIS intake scanner will flag the file as non-compliant. Kagazo allows you to reposition your portrait to align with the green eye-level guide.',
  },
  {
    question: 'Why does USCIS reject photos taken with glasses?',
    answer:
      'Since 2016, the U.S. government prohibits eyeglasses in all immigration and passport photos because lenses cause flash reflections that obscure iris biometrics. Photos with glasses are summarily rejected.',
  },
  {
    question: 'Can I use this checker for the Green Card Diversity Visa (DV) Lottery?',
    answer:
      'Yes! DV Lottery specifications are identical to USCIS/DS-160 standards: 600 × 600 px, 50%–69% head height, under 240 KB, and plain white background.',
  },
  {
    question: 'What should I do if my photo size is over 240 KB?',
    answer:
      'Kagazo automatically compresses your photo using intelligent chroma subsampling to bring it comfortably below 240 KB while maintaining crisp 300 DPI sharpness.',
  },
  {
    question: 'Can I check photos for Form I-765 (OPT / STEM OPT EAD)?',
    answer:
      'Yes! USCIS lockboxes process thousands of Form I-765 applications for F-1 students. Submitting a compliant 2×2" photo verified with Kagazo prevents costly Requests for Evidence (RFEs) or card delays.',
  },
  {
    question: 'Is a white background mandatory for USCIS?',
    answer:
      'Yes. The background must be pure white or light off-white with zero shadows. Colored backgrounds, wall moldings, or visible room doors are leading causes of photo rejection.',
  },
  {
    question: 'Can I download a printable sheet after checking?',
    answer:
      'Yes! Once verified, you can download both the digital 600 × 600 px JPEG and an 8-photo 4×6" printable card for physical filing.',
  },
  {
    question: 'Does Kagazo upload my photo to any server during the check?',
    answer:
      'Never. All biometric face measurements and compression execute 100% locally in your device’s browser memory. Zero files leave your computer.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload US Photo",
    "desc": "Select your existing 2x2\" or 600x600 px photo for automated compliance testing."
  },
  {
    "step": 2,
    "title": "Instant Biometric Scan",
    "desc": "Algorithms evaluate pixel dimensions, aspect ratio, and eye level."
  },
  {
    "step": 3,
    "title": "Head Proportion Analysis",
    "desc": "Checks that head height is within official 50%\u201369% (1\" to 1 3/8\") limits."
  },
  {
    "step": 4,
    "title": "Background & Lighting Check",
    "desc": "Analyzes background luminance, color uniformity, and shadow levels."
  },
  {
    "step": 5,
    "title": "Review Report & Download",
    "desc": "Inspect pass/fail badges for each parameter and download calibrated photo."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Rejection: Eye Level Below 56%",
    "title": "Eyes Positioned Too Low in Frame",
    "desc": "US State Dept requires eyes located between 56% and 69% from the bottom of the photo."
  },
  {
    "badge": "Rejection: Image Dimensions Not Square",
    "title": "Non-1:1 Aspect Ratio",
    "desc": "USCIS and DS-160 require strict 1:1 square dimensions (min 600x600 px)."
  },
  {
    "badge": "Rejection: File Size Exceeding 240 KB",
    "title": "Consular Server Upload Failure",
    "desc": "Photos over 240 KB fail CEAC validation. Kagazo recompresses to safe 100\u2013180 KB."
  },
  {
    "badge": "Rejection: Low DPI Metadata",
    "title": "Resolution Flagged Below 300 DPI",
    "desc": "Scanners flag files without 300 DPI metadata. Kagazo injects true JFIF headers."
  }
];

export default function UscisPhotoCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'USCIS & US Visa Photo Checker (600×600 px)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/uscis-photo-checker',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Validate and verify 600x600 px photos for USCIS immigration and DS-160 visa applications. 50-69% head ratio and under 240 KB compression.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Validate a Photo for USCIS and US Visa Portals',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
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
            name: 'USCIS Photo Checker',
            item: 'https://kagazo.in/tools/uscis-photo-checker',
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
          <span className="font-semibold text-text-main">USCIS Photo Checker (600×600 px)</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-extrabold shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>USCIS & CEAC Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>USCIS & US Visa Photo Checker </span>
            <span className="text-primary">(600×600 px Validator)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Instantly validate, auto-calibrate, and verify your photographs for USCIS immigration forms
            (I-485, I-765, N-400) and U.S. Department of State DS-160 visa applications. Features
            algorithmic 50%–69% head height verification, eye level line analysis, under 240 KB file size
            optimization, and printable 4×6&quot; sheets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              600 × 600 px Exact Square
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              50%–69% Head Height Oval
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              &lt;240 KB CEAC File Ceiling
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
            <UscisPhotoCheckerEngine />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                Why Validate Your USCIS Photos with Kagazo?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    600
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">600×600 px Dimension Check</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Validates and locks your image to the exact 1:1 square resolution mandated by CEAC and USCIS
                    upload servers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-3">
                    50–69
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Head Height Test (50%–69%)</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Mathematically checks that the distance from chin to crown occupies between 300 and 414
                    pixels.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-3">
                    56–69
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Eye Level Position Guide</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Analyzes eye position to ensure pupils rest between 336 and 414 pixels from the bottom edge.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-3">
                    &lt;240
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">File Size Ceiling Guard</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically compresses oversized mobile photos into the compliant 80 KB to 160 KB zone.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-3">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Injects official resolution tags into JPEG APP0 markers to pass automated consular checks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-3">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Zero cloud transmission. Biometric face validation executes entirely inside volatile RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official USCIS & DS-160 Biometric Validation Checklist */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-primary" />
                    Official USCIS & DS-160 Biometric Validation Checklist
                  </h2>
                  <p className="text-sm text-text-main/70 mt-1">
                    Verified against U.S. State Department 22 CFR 51.26 and USCIS Form I-485/I-765 standards.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  7-Point Check
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-4">Test Parameter</th>
                      <th className="py-3 px-4">Official Consular Standard</th>
                      <th className="py-3 px-4">Automated Validation Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {VALIDATION_CHECKLIST.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-text-main whitespace-nowrap">
                          {item.parameter}
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-700">{item.officialRule}</td>
                        <td className="py-3 px-4 text-emerald-800 font-mono font-semibold">
                          {item.validationResult}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Test and Validate Your USCIS Photo in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for guaranteed consular acceptance:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common USCIS Photo Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common passport photo mistakes that trigger application rejection:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Frequently Asked Questions (USCIS Photo Checker)
                </h2>
                <p className="text-sm text-text-main/70 mt-1">
                  Everything you need to know about USCIS forms, DS-160 validation, and 600×600 px requirements.
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
                Related US Tools
              </span>

              <div className="space-y-1.5">
                <Link
                  href="/tools/dv-lottery-photo-tool"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      DV Lottery Photo Tool
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    600px
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
                  href="/tools/passport-white-background"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      White Background AI
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    White
                  </span>
                </Link>

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
                Biometric validation algorithms execute directly inside local browser RAM. No servers, no
                cloud logging.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 600×600 px
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 50%–69% Head
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ &lt;240 KB Safe
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
