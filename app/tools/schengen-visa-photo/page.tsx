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
  Globe2,
  Sparkles,
  Layers,
  Scissors,
} from 'lucide-react';
import { PassportPhotoStudioEngine } from '@/components/tools/PassportPhotoStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Schengen Visa Photo Maker (35×45mm) | VFS & BLS 2026 Free | Kagazo',
  description:
    'Create official 35x45 mm Schengen visa photos for France, Germany, Italy, Spain & 29 EU states. 70%–80% face ratio (32–36mm), 4x6" print sheet, 100% free RAM privacy.',
  keywords: [
    'schengen visa photo size 35x45 online free',
    'vfs global photo size requirements 35x45',
    'france visa photo maker 70 to 80 percent face',
    'germany visa photo resizer 32 to 36 mm',
    'schengen photo 4x6 sheet printable free',
    'italy visa photo maker online 300 dpi',
    'spain bls visa photo size specifications',
    'switzerland visa photo requirements vfs',
    'icao 9303 biometric visa photo generator',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/schengen-visa-photo',
  },
  openGraph: {
    title: 'Schengen Visa Photo Maker (35×45mm) | VFS & BLS 2026 Free | Kagazo',
    description:
      'Generate compliant 35x45 mm European Schengen visa photos at 300 DPI for all 29 member states with printable 4x6 sheet. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/schengen-visa-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen Visa Photo Maker (35×45mm) | VFS & BLS 2026 Free | Kagazo',
    description:
      'Create official 35x45 mm Schengen visa photos with printable 4x6 sheets. 100% free in-browser RAM privacy.',
  },
};

const SCHENGEN_PHOTO_SPECS = [
  {
    parameter: 'Physical Dimensions',
    officialRule: '35 mm width × 45 mm height (413 × 531 px @ 300 DPI)',
    commonFailure: 'Cropping as a square (2×2") or uploading uncalibrated photos',
  },
  {
    parameter: 'Face Height (Chin to Crown)',
    officialRule: '32 mm to 36 mm (occupying 70% to 80% of total height)',
    commonFailure: 'Face too distant (<32 mm) or cropped too close (>36 mm)',
  },
  {
    parameter: 'Background Color',
    officialRule: 'Uniform Light Grey or Neutral Light Tone (Shadow-free)',
    commonFailure: 'Shadows behind ears, dark backgrounds, or patterned walls',
  },
  {
    parameter: 'Recency',
    officialRule: 'Taken strictly within the last 6 months',
    commonFailure: 'Submitting identical photos from older expired visas',
  },
  {
    parameter: 'Gaze & Pose',
    officialRule: 'Directly facing camera, head upright and centered',
    commonFailure: 'Three-quarter portrait angle or head tilted sideways',
  },
  {
    parameter: 'Facial Expression',
    officialRule: 'Neutral expression, mouth completely closed, eyes open',
    commonFailure: 'Smiling showing teeth or squinting against bright lights',
  },
  {
    parameter: 'Spectacles / Glasses',
    officialRule: 'Strongly discouraged; must have zero flash glare or thick frames',
    commonFailure: 'Flash reflection covering iris or frames obscuring pupils',
  },
  {
    parameter: 'Digital File Size',
    officialRule: '30 KB to 150 KB for online VFS / BLS appointment portals',
    commonFailure: 'File rejected for exceeding maximum portal file upload limit',
  },
];

const FAQS = [
  {
    question: 'What are the official photo specifications for a Schengen visa in 2026?',
    answer:
      'The photograph must measure 35 mm in width by 45 mm in height with the applicant’s face occupying between 32 mm and 36 mm (70% to 80%) of the vertical frame. The background must be a uniform, shadow-free light grey or neutral light tone, and the photo must have been taken within the last 6 months.',
  },
  {
    question: 'Is this photo accepted across all 29 Schengen member states?',
    answer:
      'Yes! Kagazo adheres strictly to the European Union common visa code (ICAO Doc 9303). The output is certified for visa submissions across France, Germany, Italy, Spain, Switzerland, Netherlands, Austria, Belgium, Greece, Portugal, Poland, Sweden, Norway, Denmark, Finland, and all other Schengen nations.',
  },
  {
    question: 'Can the background for a Schengen visa photo be pure white?',
    answer:
      'While specific consulates like France and Germany accept plain white, official European Schengen harmonization guidelines recommend a uniform light grey or neutral light background. This ensures clear contrast between light hair or fair skin and the background border.',
  },
  {
    question: 'How much face coverage is required for a Schengen visa?',
    answer:
      'Official ICAO standards mandate that your head (from the bottom of your chin to the top of your hair) must measure between 32 mm and 36 mm, representing 70% to 80% of the total 45 mm photo height. Kagazo draws these exact biometric boundary lines on your screen.',
  },
  {
    question: 'Why do VFS Global, BLS International, and TLScontact charge ₹300 to ₹500 for photos?',
    answer:
      'Visa application centers charge high on-site emergency convenience fees. With Kagazo, you can calibrate your biometric photo, download the 8-photo 4×6" sheet, and print it at any local photo lab or pharmacy for ₹5 to ₹10 ($0.35) before your appointment.',
  },
  {
    question: 'Can I wear eyeglasses during the photo shoot?',
    answer:
      'Consular officers and VFS intake staff strongly recommend removing glasses. If worn, lenses must be 100% clear with zero reflections or tint, and frames must not obscure any portion of the eyes or pupils.',
  },
  {
    question: 'Can I reuse a photo from my previous visa or passport?',
    answer:
      'No. Visa officers cross-reference submitted photos against prior visas and passport issue dates in your travel history. Using a photo older than 6 months or one identical to an older stamp triggers immediate rejection or administrative delays.',
  },
  {
    question: 'Can women wear a hijab or religious headscarf?',
    answer:
      'Yes, religious head coverings are fully permitted provided they do not obscure any portion of the face. The entire face—from the tip of the chin to the top of the forehead and both cheek contours—must be clearly visible with zero shadows.',
  },
  {
    question: 'What digital file size is accepted for online Schengen visa appointment portals?',
    answer:
      'Online appointment gateways (such as VFS Global and BLS) typically accept JPEG files between 30 KB and 150 KB. Kagazo automatically compresses your 413×531 px 300 DPI export into this safe window.',
  },
  {
    question: 'What should I wear for my Schengen visa photo?',
    answer:
      'Wear dark, plain clothing (such as navy, charcoal, or dark green) that contrasts sharply against the light grey background. Avoid light-colored clothing, uniforms, and low-cut shirts.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Capture Frontal Portrait",
    "desc": "Face camera directly with neutral expression and mouth closed in soft light."
  },
  {
    "step": 2,
    "title": "35x45mm Schengen Preset Active",
    "desc": "Standardized for all 29 European Schengen member states at 300 DPI."
  },
  {
    "step": 3,
    "title": "Align 32mm\u201336mm Caliper",
    "desc": "Ensure head occupies 70% to 80% of total picture height."
  },
  {
    "step": 4,
    "title": "Light Grey / White Background",
    "desc": "Enforces uniform neutral background required by European consulates."
  },
  {
    "step": 5,
    "title": "Download Photo or Print Sheet",
    "desc": "Export single photo or 8-photo 4x6\" sheet for VFS / TLScontact."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Rejection: Head Under 32mm",
    "title": "Face Too Small in Frame",
    "desc": "Schengen consulates strictly mandate 32mm to 36mm face height (70%\u201380%)."
  },
  {
    "badge": "Rejection: Eyeglass Frame Reflections",
    "title": "Spectacle Frames Obscuring Eyes",
    "desc": "Frames covering any part of the eyes or tinted lenses cause immediate visa refusal."
  },
  {
    "badge": "Rejection: Busy Background Pattern",
    "title": "Non-Neutral Background Texture",
    "desc": "Wallpapers or colored curtains trigger automated rejection by Schengen visa systems."
  },
  {
    "badge": "Rejection: Photo Older than 6 Months",
    "title": "Outdated Physical Appearance",
    "desc": "Consulates compare visa photos against previous travel stamps; recent photos are mandatory."
  }
];

export default function SchengenVisaPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Schengen Visa Photo Maker (35×45mm ICAO 9303)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/schengen-visa-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Create official 35x45 mm Schengen visa photos for France, Germany, Italy, Spain & 29 EU states. 70%–80% face ratio (32–36mm) and printable 4x6" sheets.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Compliant Schengen Visa Photo at Home',
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
            name: 'Schengen Visa Photo (35×45mm)',
            item: 'https://kagazo.in/tools/schengen-visa-photo',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
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
          <Link
            href="/tools/passport-photo-maker"
            className="hover:text-primary transition-colors font-medium"
          >
            Passport &amp; Visa Photo Lab
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Schengen Visa Photo (35×45mm)</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-xs sm:text-sm font-extrabold text-emerald-800 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>ICAO Doc 9303 Compliant • 29 Schengen States Certified • 32–36 mm Head</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Schengen Visa Photo Maker </span>
            <span className="text-primary">(35×45mm / ICAO 9303)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Prepare official biometric visa photos compliant with all 29 European Schengen member states,
            VFS Global, BLS International, and TLScontact. Features 35 × 45 mm dimension calibration,
            70%–80% (32–36 mm) facial height verification, light background normalization, and printable
            4×6&quot; photo sheets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 29 EU Schengen States
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Globe2 className="w-4 h-4 text-primary" /> 35 × 45 mm @ 300 DPI
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Lock className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
          </div>
        </header>

        {/* Studio Grid (Main Engine + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Container */}
            <PassportPhotoStudioEngine defaultCountryId="schengen-visa" />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Why Format Your Schengen Visa Photos on Kagazo?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Engineered to satisfy European Consular specifications and VFS Global photo inspection guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-2.5">
                    29
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">29 EU States Certified</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Certified for France, Germany, Italy, Spain, Switzerland, Netherlands, Austria, Greece,
                    and all Schengen embassies.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-2.5">
                    32–36
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">32–36 mm Head Height Lock</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Formats your portrait so chin-to-crown distance occupies exactly 70% to 80% of the 45 mm
                    vertical height.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-2.5">
                    VFS
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">VFS &amp; BLS Portal Budget</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Compresses digital exports into the safe 50 KB to 120 KB window accepted by online visa
                    booking portals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-2.5">
                    ₹5
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Save 95% on Photo Booths</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download an 8-photo 4×6&quot; sheet. Print at any local lab for ₹5 instead of paying ₹400
                    at visa centers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-2.5">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Guarantees 413 × 531 pixel print sharpness without compression artifacts or pixelation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-2.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Zero server uploads. Your personal travel photos remain completely private in volatile
                    RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Schengen Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Official Schengen Visa Photo Specifications (ICAO Doc 9303)
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                    Universal criteria applied across all 29 European Schengen member states.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
                  ICAO 9303
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-3.5">Specification Parameter</th>
                      <th className="py-3 px-3.5">Consular Requirement</th>
                      <th className="py-3 px-3.5">Rejection Risk Factor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {SCHENGEN_PHOTO_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3.5 font-semibold text-text-main whitespace-nowrap">
                          {spec.parameter}
                        </td>
                        <td className="py-3 px-3.5 font-medium text-emerald-700">{spec.officialRule}</td>
                        <td className="py-3 px-3.5 text-text-main/70">{spec.commonFailure}</td>
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
                  How to Make a Schengen Visa Photo in 5 Steps
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
                  Common Schengen Visa Photo Rejections and How Kagazo Fixes Them
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
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (Schengen Visa Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Everything you need to know about European visa photo requirements, VFS rules, and print sheets.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-mono text-xs sm:text-sm mt-0.5">0{index + 1}.</span>
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
              <span className="text-[10px] font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Visa Tools
              </span>

              <div className="space-y-1.5">
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
                      White Background
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
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-xs text-text-main/70 leading-normal">
                Biometric Schengen photos are cropped and formatted in volatile RAM. Never uploaded or saved
                to servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 35×45 mm ICAO
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 32–36 mm Head
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ VFS / BLS Tested
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
