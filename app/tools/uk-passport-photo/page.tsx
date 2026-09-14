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
  title: 'UK Passport Photo Maker (35×45mm) | HMPO Compliant Free | Kagazo',
  description:
    'Create HM Passport Office compliant 35x45 mm UK passport and visa photos. 29–34mm head height lock, light grey background, printable 4x6" sheet (8 photos), 100% free.',
  keywords: [
    'uk passport photo maker free online',
    'hm passport office photo requirements 35x45',
    'uk passport photo 29 to 34 mm head size',
    'uk passport photo 4x6 print sheet tesco boots',
    'digital photo code uk passport online free',
    'uk visa photo size 35x45 mm online',
    'british passport photo background light grey cream',
    'how to print uk passport photo at boots',
    'uk passport photo baby rules online',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/uk-passport-photo',
  },
  openGraph: {
    title: 'UK Passport Photo Maker (35×45mm) | HMPO Compliant Free | Kagazo',
    description:
      'Generate HM Passport Office compliant 35x45 mm British passport photos at 300 DPI with printable 4x6 sheet. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/uk-passport-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Passport Photo Maker (35×45mm) | HMPO Compliant Free | Kagazo',
    description:
      'Create HM Passport Office compliant 35x45 mm UK passport and visa photos with printable 4x6 sheets. 100% free in-browser RAM privacy.',
  },
};

const UK_PHOTO_SPECS = [
  {
    parameter: 'Physical Dimensions',
    officialRule: '35 mm width × 45 mm height (413 × 531 px @ 300 DPI)',
    commonFailure: 'Uploading 2×2" US photos or uncropped smartphone snapshots',
  },
  {
    parameter: 'Head Height (Crown to Chin)',
    officialRule: '29 mm to 34 mm (occupying 64% to 75% of total height)',
    commonFailure: 'Head oversized (>34 mm) or placed too far back (<29 mm)',
  },
  {
    parameter: 'Clear Margin Above Head',
    officialRule: 'Minimum 5 mm clearance between hair and upper border',
    commonFailure: 'Hair touching or cropped off at the top border of the photo',
  },
  {
    parameter: 'Background Color',
    officialRule: 'Light grey or plain cream (uniform, zero shadows)',
    commonFailure: 'Using stark pure white or textured patterned walls',
  },
  {
    parameter: 'Facial Expression',
    officialRule: 'Neutral expression, mouth closed, both eyes clearly visible',
    commonFailure: 'Smiling showing teeth, frowning, or head tilted sideways',
  },
  {
    parameter: 'Eyeglasses',
    officialRule: 'Allowed only if eyes fully visible without reflections or glare',
    commonFailure: 'Flash reflection on lenses, tinted glass, or frames obscuring pupils',
  },
  {
    parameter: 'Digital File Size',
    officialRule: '50 KB to 10 MB in standard JPEG format',
    commonFailure: 'File under 50 KB (over-compressed) or exported as PNG/WEBP',
  },
];

const FAQS = [
  {
    question: 'What is the exact size of a UK passport photo in millimeters and pixels?',
    answer:
      'A UK passport photo must measure 35 mm in width by 45 mm in height. At 300 DPI print density, this translates to 413 × 531 pixels. For online gov.uk passport renewals, the digital image must be between 50 KB and 10 MB in JPEG format with a minimum dimension of 600 × 750 pixels.',
  },
  {
    question: 'Does HM Passport Office require a white or light grey background?',
    answer:
      'HM Passport Office guidelines explicitly require a plain light grey or cream background. Pure stark white backgrounds can cause glare and make light hair blend into the border during biometric facial scanning, leading to automatic rejection.',
  },
  {
    question: 'How does Kagazo ensure the 29 mm to 34 mm head height requirement?',
    answer:
      'Kagazo features an interactive biometric caliper grid. It displays the official 29 mm (minimum) and 34 mm (maximum) head boundaries along with the mandatory 5 mm top clearance margin, allowing you to zoom and align your portrait with millimeter precision.',
  },
  {
    question: 'How do I print 8 UK passport photos cheaply at Boots, Tesco, or Asda?',
    answer:
      'High street photo booths charge £10 to £15 for 4 passport pictures. When you download Kagazo’s 8-photo 4×6" gang sheet, upload it to the photo printing kiosk at Boots, Tesco, or Asda as a standard 4×6" photo print for only 20p to 35p, saving over 95%!',
  },
  {
    question: 'Can I wear glasses in my UK passport photo?',
    answer:
      'HMPO allows prescription glasses only if your eyes are completely visible without glare, flash reflection, or heavy frames covering your pupils. Sunglasses and tinted lenses are strictly forbidden. Consular officers recommend removing glasses completely to eliminate any risk of rejection.',
  },
  {
    question: 'Can I smile in a UK passport photo?',
    answer:
      'No. His Majesty’s Passport Office requires a neutral expression with your mouth closed. Even a modest smile that parts your lips or wrinkles your cheeks will cause automatic failure in the gov.uk facial recognition validation algorithm.',
  },
  {
    question: 'What are the rules for babies and young children in UK passport photos?',
    answer:
      'Children aged 5 and under do not need to look straight at the camera or have a neutral expression. Babies under 1 year do not need their eyes open. However, no adult hands, dummy pacifiers, toys, or background shadows may be visible in the image.',
  },
  {
    question: 'What clothing should I wear for a UK passport photo?',
    answer:
      'Wear dark, plain clothing that contrasts well against the light grey background. Uniforms and military gear are prohibited. Religious head coverings are allowed if worn daily for religious purposes, provided your full face from chin to hairline is visible.',
  },
  {
    question: 'What is the minimum clearance above the head in UK passport photos?',
    answer:
      'HMPO requires a minimum of 5 mm of clear background space between the highest point of your hair or head covering and the top edge of the 45 mm frame. Kagazo displays this 5 mm top line guide on the crop canvas.',
  },
  {
    question: 'Does Kagazo give me a UK digital photo code?',
    answer:
      'Photo codes are proprietary codes generated by specific commercial photo booths in UK high street shops. However, the official gov.uk passport service lets you upload a digital photo file directly. Kagazo provides the exact compliant JPEG file for direct online upload.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Take Photo in Natural Light",
    "desc": "Stand 4 feet from a plain cream or light grey background without eyeglasses."
  },
  {
    "step": 2,
    "title": "HMPO 35x45mm Preset Active",
    "desc": "Engine locks canvas to 35x45 mm at 300 DPI (413x531 px)."
  },
  {
    "step": 3,
    "title": "Align 29mm to 34mm Head Caliper",
    "desc": "Position head within official HMPO crown-to-chin guidelines."
  },
  {
    "step": 4,
    "title": "Digital Photo Code Ready",
    "desc": "Export high-resolution JPEG compatible with GOV.UK digital passport portal."
  },
  {
    "step": 5,
    "title": "Download Photo or 4x6\" Sheet",
    "desc": "Export single JPEG or printable 8-photo gang sheet."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Rejection: Pure White Background",
    "title": "UK HMPO Rejects Pure White Backgrounds",
    "desc": "Unlike US/India, UK HMPO mandates light grey or cream backgrounds to prevent contrast burnout."
  },
  {
    "badge": "Rejection: Smiling or Showing Teeth",
    "title": "Non-Neutral Facial Expression",
    "desc": "HMPO facial recognition algorithms reject open-mouthed smiles or non-neutral expressions."
  },
  {
    "badge": "Rejection: Head Height Outside 29\u201334mm",
    "title": "Biometric Proportion Failure",
    "desc": "Head must measure between 29mm and 34mm from chin to crown."
  },
  {
    "badge": "Rejection: Flash Glare on Face",
    "title": "Uneven Direct Flash Lighting",
    "desc": "Harsh camera flash washes out skin tones. Diffused daylight is recommended."
  }
];

export default function UkPassportPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'UK Passport Photo Maker (HMPO Compliant)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/uk-passport-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GBP',
        },
        description:
          'Create HM Passport Office compliant 35x45 mm UK passport and visa photos online free. 29–34mm head height lock, light grey background, and printable 4x6" sheets.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Make an HMPO Compliant UK Passport Photo at Home',
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
            name: 'UK Passport Photo (35×45mm)',
            item: 'https://kagazo.in/tools/uk-passport-photo',
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
          <span className="text-primary font-bold truncate">UK Passport Photo (35×45mm)</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-xs sm:text-sm font-extrabold text-emerald-800 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>HMPO 2026 Compliant • 35 × 45 mm (29–34 mm Head) • Light Grey Tone</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>UK Passport Photo Maker </span>
            <span className="text-primary">(HMPO 35×45mm Guidelines)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Format, calibrate, and print official His Majesty’s Passport Office (HMPO) compliant British
            passport photos. Features 35 × 45 mm dimensions, strict 29–34 mm head height verification,
            light grey background adjustment, and printable 4×6&quot; 8-copy sheets for Boots and Tesco
            photo printing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> HMPO &amp; Home Office Standard
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
            <PassportPhotoStudioEngine defaultCountryId="uk-passport" />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Why Make Your UK Passport Photos on Kagazo?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Engineered strictly to satisfy His Majesty&apos;s Passport Office digital criteria.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-2.5">
                    35×45
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Official HMPO 35×45 mm Crop</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Precise millimeter crop meeting official UK Home Office standards for both adult and child
                    passport renewals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-2.5">
                    29–34
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Strict 29–34 mm Head Height</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    On-screen caliper lines ensure the distance between your chin and the crown of your head
                    falls strictly within guidelines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-2.5">
                    5 mm
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Top Margin Clearance Guide</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Visual headroom marker guarantees the required 5 mm margin above hair to prevent top-crop
                    rejections.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-2.5">
                    £
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Print 8 Copies for 35p</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download an 8-photo 4×6&quot; card to print at Tesco, Boots, or Asda photo kiosks for 35p
                    instead of £12.00 at a booth.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-2.5">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Embedded 300 DPI Metadata</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Delivers true 413 × 531 pixel resolution at 300 DPI density, perfectly passing gov.uk
                    digital checks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-2.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    All cropping, head height scaling, and sheet generation run 100% in your device RAM without
                    cloud uploads.
                  </p>
                </div>
              </div>
            </section>

            {/* Official HMPO Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Official HM Passport Office (HMPO) Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                    Verified against His Majesty&apos;s Passport Office digital photo criteria (gov.uk).
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
                  HMPO Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-3.5">Requirement</th>
                      <th className="py-3 px-3.5">HMPO Official Standard</th>
                      <th className="py-3 px-3.5">Common Rejection Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {UK_PHOTO_SPECS.map((spec, idx) => (
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
                  How to Make an HMPO Compliant UK Photo in 5 Steps
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
                  Common UK Passport Photo Rejections and How Kagazo Fixes Them
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
                  Frequently Asked Questions (UK Passport Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Everything you need to know about HMPO photo rules, gov.uk online uploads, and kiosk printing.
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
                Your British passport photos are processed exclusively in client-side RAM. No servers, no
                facial biometric harvesting.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 35×45 mm HMPO
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 29–34 mm Head
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 5 mm Top Margin
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
