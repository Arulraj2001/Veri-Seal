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
import BiometricFaceEngine from '@/components/tools/BiometricFaceEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'ICAO Biometric Passport Face & Head Aligner | 70%–80% Rule | Kagazo',
  description:
    'Align your face and head height strictly within the 70%–80% ICAO 9303 biometric frame. Golden-ratio eye line & chin guide for Indian Passport, US Visa & Schengen. Free.',
  keywords: [
    'icao biometric face aligner passport photo',
    '70 to 80 percent face ratio calculator online free',
    'passport photo crown to chin alignment tool',
    'eye line position passport photo test',
    'icao 9303 biometric head height checker',
    'indian passport 70 80 face size tool',
    'inter pupillary distance passport photo online',
    'straighten passport photo head tilt online',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/biometric-face-aligner',
  },
  openGraph: {
    title: 'ICAO Biometric Passport Face & Head Aligner | 70%–80% Rule | Kagazo',
    description:
      'Ensure your passport and visa photo complies with ICAO 9303 biometric head height (70%–80%) and eye-line guidelines.',
    url: 'https://kagazo.in/tools/biometric-face-aligner',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICAO Biometric Passport Face & Head Aligner | 70%–80% Rule | Kagazo',
    description:
      'Align head height and eye-line strictly within official ICAO Doc 9303 biometric passport standards with 100% RAM privacy.',
  },
};

const ICAO_BIOMETRIC_SPECS = [
  {
    authority: 'Indian Passport (Passport Seva Kendra)',
    headRatio: '70% to 80% (25 mm to 35 mm on 45 mm photo)',
    eyePosition: 'Centered horizontally; 56%–69% from bottom',
    photoSize: '35 mm × 45 mm (413 × 531 px @ 300 DPI)',
  },
  {
    authority: 'United States (Passport / DS-160 / DV Lottery)',
    headRatio: '50% to 69% (1" to 1 3/8" / 28 mm to 35 mm)',
    eyePosition: 'Between 56% and 69% from bottom (336–414 px)',
    photoSize: '2" × 2" (51 × 51 mm / 600 × 600 px @ 300 DPI)',
  },
  {
    authority: 'Schengen Visa (29 EU European Member States)',
    headRatio: '70% to 80% (32 mm to 36 mm from chin to hair)',
    eyePosition: 'Level eye horizontal axis; minimum 60 px IPD',
    photoSize: '35 mm × 45 mm (413 × 531 px @ 300 DPI)',
  },
  {
    authority: 'United Kingdom (HMPO / British Passports)',
    headRatio: '29 mm to 34 mm (approx 64%–75% of height)',
    eyePosition: 'Minimum 5 mm clearance above top of hair',
    photoSize: '35 mm × 45 mm (413 × 531 px @ 300 DPI)',
  },
  {
    authority: 'Canada (IRCC Passport / PR Card / Express Entry)',
    headRatio: '31 mm to 36 mm (approx 44%–51% of 70 mm height)',
    eyePosition: 'Ample clearance between top of hair and border',
    photoSize: '50 mm × 70 mm (591 × 827 px @ 300 DPI)',
  },
];

const FAQS = [
  {
    question: 'What does the ICAO 70%–80% face rule mean?',
    answer:
      'According to International Civil Aviation Organization (ICAO Doc 9303) specifications, the vertical distance from the bottom of the chin to the top of the hair (crown) must occupy between 70% and 80% of the photograph’s total height (31.5 mm to 36 mm on a 45 mm photo).',
  },
  {
    question: 'Why is face height compliance critical for modern passports?',
    answer:
      'Modern passports contain biometric microchips storing high-resolution facial images. Automated border e-Gates at international airports use algorithmic biometric face matching. If the face is too small or too large, the airport e-Gate fails to verify your identity.',
  },
  {
    question: 'What is the eye-line guideline in passport photography?',
    answer:
      'An imaginary horizontal line drawn through the center of both eyes must be level (zero tilt) and sit between 56% and 69% of the total image height from the bottom edge.',
  },
  {
    question: 'How does Kagazo help me align my face?',
    answer:
      'When you upload your photo, Kagazo overlays interactive semi-transparent caliper lines representing the crown, eye line, and chin. You simply scale and drag your image until your facial features fit inside the target bracket.',
  },
  {
    question: 'What if my hair is voluminous or curly?',
    answer:
      'The "crown" represents the top of the skull bones, not the outer fluff of voluminous or afro-textured hair. Align the guide with the approximate top of your skull.',
  },
  {
    question: 'Can I use this tool for Indian Passport Seva Kendra applications?',
    answer:
      'Yes! Passport Seva Kendra enforces the 70%–80% head height rule (25 mm to 35 mm). This tool guarantees your photo will pass PSK document scrutiny.',
  },
  {
    question: 'Can I use this tool for US Visa and Green Card photos?',
    answer:
      'Yes. When toggled to US Visa mode, the calipers automatically shift to the 50%–69% head height range mandated by the U.S. Department of State.',
  },
  {
    question: 'Does this tool modify my facial features or use AI filters?',
    answer:
      'No. Kagazo strictly performs scaling, panning, and aspect ratio alignment. We never alter your facial structure, skin tone, or biometrics.',
  },
  {
    question: 'What resolution is generated by the face aligner?',
    answer:
      'Kagazo exports standards-compliant 300 DPI JPEG files formatted to the exact dimensions of your selected country preset.',
  },
  {
    question: 'Does Kagazo store biometric data?',
    answer:
      'Never. All processing is 100% client-side inside volatile RAM. No images or biometric coordinates are ever saved or transmitted.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Portrait Photo",
    "desc": "Select your portrait photo for automated ICAO biometric alignment."
  },
  {
    "step": 2,
    "title": "Automated Eye & Tilt Leveling",
    "desc": "Detects eye horizontal axis and automatically corrects head tilt."
  },
  {
    "step": 3,
    "title": "Center Facial Symmetry",
    "desc": "Centers bridge of nose and eyes along the vertical optical center."
  },
  {
    "step": 4,
    "title": "Scale to Consular Head Ratio",
    "desc": "Scales face so crown-to-chin distance matches 70%\u201380% (or 50%\u201369%)."
  },
  {
    "step": 5,
    "title": "Download Aligned Photo",
    "desc": "Export properly framed 300 DPI JPEG for instant passport application."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Rejection: Head Tilted Beyond 5 Degrees",
    "title": "Off-Axis Head Pose Refusal",
    "desc": "e-Gates require level eyes. Kagazo automatically rotates head to exact 0-degree horizontal alignment."
  },
  {
    "badge": "Rejection: Off-Center Facial Position",
    "title": "Face Shifted to Left or Right",
    "desc": "Biometric scanners require nose centered on vertical axis. Kagazo centers features perfectly."
  },
  {
    "badge": "Rejection: Aspect Ratio Distortion",
    "title": "Stretched or Squashed Facial Features",
    "desc": "Manual resizing stretches faces. Kagazo locks proportional aspect ratios."
  },
  {
    "badge": "Rejection: Eyes Blocked or Looking Away",
    "title": "Non-Frontal Gaze Rejection",
    "desc": "Candidates must look directly into camera lens with both eyes visible."
  }
];

export default function BiometricFaceAlignerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'ICAO Biometric Passport Face & Head Aligner',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/biometric-face-aligner',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Align face and head height strictly within 70%–80% biometric boundary for Indian Passport, US Visa (DS-160), and Schengen visas.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Align Head and Eye Level for Biometric Passports',
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
            name: 'Biometric Face Aligner',
            item: 'https://kagazo.in/tools/biometric-face-aligner',
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
          <span className="font-semibold text-text-main">Biometric Face Aligner</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-extrabold shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>ICAO Doc 9303 Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>ICAO Biometric Passport Face Aligner </span>
            <span className="text-primary">(70%–80% Rule)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Align, scale, and center your facial portrait strictly within the internationally mandated
            70%–80% crown-to-chin biometric frame. Certified against ICAO Doc 9303 and ISO/IEC 19794-5
            standards for Indian Passport Seva, US Visa (DS-160), and Schengen visas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              70%–80% Crown-to-Chin Lock
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Eye Line Horizon Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              300 DPI JFIF Metadata
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
            <BiometricFaceEngine />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                Why Align Biometric Face Dimensions on Kagazo?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    ICAO
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">ICAO Doc 9303 Calipers</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Dual concentric guidelines mark the exact 70% minimum (31.5 mm) and 80% maximum (36 mm)
                    head boundaries.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-3">
                    Eyes
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Eye-Line Horizon Guide</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Ensures pupils are horizontally level with zero tilt, placed between 56% and 69% from the
                    bottom edge.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-3">
                    IPD
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Inter-Pupillary Distance</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Guarantees optimal facial pixel density for airport automated smart border e-Gates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-3">
                    Global
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Multi-Country Presets</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    1-click switching between Indian Passport (70–80%), US Visa (50–69%), and Canadian (44–51%).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-3">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Displays live pixel measurements and writes embedded 300 DPI binary tags into the output file.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-3">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Biometric coordinates and cropping algorithms execute entirely inside local device RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official ICAO Biometric Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-primary" />
                    International Biometric Head Ratio Specifications
                  </h2>
                  <p className="text-sm text-text-main/70 mt-1">
                    Official standards comparison for passport and consular visa intake.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  ISO/IEC 19794-5
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-4">Authority / Nation</th>
                      <th className="py-3 px-4">Mandated Head Ratio</th>
                      <th className="py-3 px-4">Eye Position Guide</th>
                      <th className="py-3 px-4">Standard Photo Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {ICAO_BIOMETRIC_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-text-main whitespace-nowrap">
                          {spec.authority}
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-700">{spec.headRatio}</td>
                        <td className="py-3 px-4 text-text-main/70">{spec.eyePosition}</td>
                        <td className="py-3 px-4 font-mono text-text-main/80">{spec.photoSize}</td>
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
                  How to Align Biometric Face Photos in 5 Steps
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
                  Common Biometric Alignment Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Biometric Face Aligner)
                </h2>
                <p className="text-sm text-text-main/70 mt-1">
                  Everything you need to know about ICAO Doc 9303, head height ratios, and eye levels.
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
                Related Photo Tools
              </span>

              <div className="space-y-1.5">
                <Link
                  href="/tools/passport-photo-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Photo Maker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
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
                  href="/tools/uscis-photo-checker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      USCIS Photo Checker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    600px
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
                Biometric face alignment calipers operate entirely inside volatile client RAM. No biometric
                templates are stored.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ ICAO Doc 9303
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 70%–80% Caliper
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Eye Horizon Guide
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
