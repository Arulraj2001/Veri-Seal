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
  title: 'US Passport & Visa Photo Maker (2×2") | DS-160 600×600 px | Kagazo',
  description:
    'Create official 2x2 inch (600x600 px @ 300 DPI) US passport, DS-160 visa, and Green Card photos. 50%–69% head height verification, 4x6" printable sheet, 100% free.',
  keywords: [
    'us passport photo maker 2x2 online free',
    'ds 160 visa photo 600x600 px resizer',
    'us passport photo printable 4x6 sheet free',
    'us visa photo head size 50 to 69 percent',
    'us green card photo resizer under 240 kb',
    'us state department photo requirements',
    'cvs walgreens passport photo 4x6 print coupon',
    'us passport photo eyeglasses banned rule',
    'ds 260 photo dimensions online free',
    'us citizenship photo 2x2 n400 resizer',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/us-passport-photo',
  },
  openGraph: {
    title: 'US Passport & Visa Photo Maker (2×2") | DS-160 600×600 px | Kagazo',
    description:
      'Generate compliant 2x2 inch US passport and visa photos at 300 DPI with printable 4x6 sheet. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/us-passport-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Passport & Visa Photo Maker (2×2") | DS-160 600×600 px | Kagazo',
    description:
      'Create official 2x2 inch US passport & visa photos with printable 4x6 sheets. 100% free in-browser RAM privacy.',
  },
};

const US_PHOTO_SPECS = [
  {
    parameter: 'Physical Dimensions',
    officialRule: '2" × 2" inches (51 mm × 51 mm)',
    commonFailure: 'Uploading standard rectangular 35×45mm photos',
  },
  {
    parameter: 'Digital Dimensions',
    officialRule: '600 × 600 pixels minimum (up to 1200×1200 px @ 300 DPI)',
    commonFailure: 'Uploading non-square images with mismatched aspect ratios',
  },
  {
    parameter: 'Head Height Ratio',
    officialRule: '50% to 69% of total height (1" to 1 3/8" / 28–35 mm)',
    commonFailure: 'Taking photos too close (face >70%) or too far away (<50%)',
  },
  {
    parameter: 'Eye Level Position',
    officialRule: '56% to 69% from the bottom of the photo (28 mm to 35 mm)',
    commonFailure: 'Camera tilted downward or upward away from direct eye line',
  },
  {
    parameter: 'Digital File Size',
    officialRule: 'Strictly under 240 KB (Minimum 10 KB, 24-bit sRGB JPEG)',
    commonFailure: 'Portal rejection: "File size exceeds maximum limit of 240 KB"',
  },
  {
    parameter: 'Background Color',
    officialRule: 'Plain White or Off-White (Zero shadows, uniform illumination)',
    commonFailure: 'Cast shadows behind ears, door frames, or colored walls',
  },
  {
    parameter: 'Eyeglasses',
    officialRule: 'Strictly prohibited (Effective Nov 1, 2016; medical waiver only)',
    commonFailure: 'Flash reflection on lenses, tinted glass, or frame covering iris',
  },
  {
    parameter: 'Facial Expression',
    officialRule: 'Neutral expression, mouth closed, both eyes open facing camera',
    commonFailure: 'Open-mouthed smiles showing teeth or tilted head posture',
  },
];

const FAQS = [
  {
    question: 'What are the official U.S. Department of State photo dimensions in inches, mm, and pixels?',
    answer:
      'The official physical size is 2 × 2 inches (51 × 51 mm). For online DS-160 visa, DS-260, and Diversity Visa (DV) lottery applications, the digital image must be a 1:1 square measuring at least 600 × 600 pixels (up to 1200 × 1200 pixels) at 300 DPI, in sRGB JPEG format with a file size strictly under 240 KB.',
  },
  {
    question: 'Are eyeglasses allowed in US passport and visa photos?',
    answer:
      'NO. Effective November 1, 2016, eyeglasses are strictly prohibited in all U.S. passport and visa photographs, even if you wear them daily. The only rare exception is for urgent medical conditions (such as recent eye surgery), which requires a signed explanatory letter from an ophthalmologist.',
  },
  {
    question: 'How do I verify that my head height is between 50% and 69%?',
    answer:
      'The U.S. Department of State mandates that your head (from the bottom of your chin to the top of your hair) must occupy between 1 inch and 1 3/8 inches (50% to 69%) of the photo. Kagazo’s interactive biometric framing overlay draws official guideline markers so you can center and scale your head to the exact 50%–69% target zone.',
  },
  {
    question: 'Why does the CEAC DS-160 portal reject photos with "File size exceeds 240 KB"?',
    answer:
      'The Department of State consular electronic application portal has a hard 240 KB file ceiling. High-resolution smartphone cameras produce 3 MB to 8 MB JPEGs, triggering immediate rejection. Kagazo automatically balances compression so your 600×600 px photo is saved between 80 KB and 180 KB at crisp 300 DPI, safely below the 240 KB limit.',
  },
  {
    question: 'How does Kagazo’s 4×6" sheet save $17 at Walgreens or CVS?',
    answer:
      'CVS, Walgreens, and Rite Aid charge $16.99 to $18.99 for two 2×2" passport photos. When you download Kagazo’s printable 4×6" photo card (which tiles 6 identical 2×2" photos with millimeter cut guides), you can order a standard 4×6" photo print at the same store or photo kiosk for just $0.35 to $0.40, saving over 97%!',
  },
  {
    question: 'Can I smile in my US passport photo?',
    answer:
      'While a gentle, unexaggerated smile is technically acceptable under 22 CFR 51.26, the U.S. State Department strongly recommends a neutral facial expression with both eyes open and mouth closed. Broad grins that show teeth or crinkle your eyes can trigger automatic biometric rejections during consular facial recognition checks.',
  },
  {
    question: 'What clothing should I wear for a US passport or visa picture?',
    answer:
      'Wear normal, everyday civilian clothing in darker solid colors (such as navy blue, black, or burgundy) to contrast against the white background. Do NOT wear white shirts (which blend into the background), uniforms, clothing resembling a uniform, or camouflage attire.',
  },
  {
    question: 'Are hats or religious head coverings permitted?',
    answer:
      'Hats and casual headbands are not allowed. Religious head coverings (such as hijabs, yarmulkes, or turbans) are permitted if worn daily for religious purposes, provided they do not obscure any part of your face from the bottom of your chin to the top of your forehead, or cast shadows across your features.',
  },
  {
    question: 'How should infants and babies be photographed for US passports?',
    answer:
      'Lay the baby on their back on a clean white sheet or cover a car seat with a white cloth. Ensure no hands, toys, pacifiers, or supporting parents are visible in the frame. The infant should be looking toward the camera. For newborns under 1 year, partially open eyes are acceptable.',
  },
  {
    question: 'Does Kagazo store, process, or sell my biometric facial photos?',
    answer:
      'Never. Kagazo operates with zero-upload in-browser processing. Your portrait is cropped, scaled, verified, and converted into 300 DPI JPEGs entirely inside your browser’s volatile RAM. No image data is ever transmitted to our servers or saved in any database.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Capture Frontal Portrait",
    "desc": "Stand 4 feet in front of a plain white wall in even natural daylight without eyeglasses."
  },
  {
    "step": 2,
    "title": "Select 2x2\" US Standard",
    "desc": "Kagazo locks the canvas to an exact 2x2 inch square at 300 DPI (600x600 px)."
  },
  {
    "step": 3,
    "title": "Align 50%\u201369% Head Markers",
    "desc": "Scale so head height measures between 1\" and 1 3/8\" (28\u201335 mm) from chin to crown."
  },
  {
    "step": 4,
    "title": "Enforce <240 KB DS-160 Limit",
    "desc": "Engine compresses output between 80 KB and 180 KB for instant CEAC portal upload."
  },
  {
    "step": 5,
    "title": "Download Photo or 4x6\" Sheet",
    "desc": "Export digital JPEG or 6-photo 4x6\" card to print at Walgreens or CVS for 35 cents."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Rejection: Eyeglasses Detected",
    "title": "Spectacles Prohibited under 22 CFR 51.26",
    "desc": "Glasses cause instant refusal at consular portals due to lens glare and facial obscuration."
  },
  {
    "badge": "Rejection: File Size Exceeds 240 KB",
    "title": "CEAC Portal Upload Failure",
    "desc": "DS-160 and DV Lottery reject images over 240 KB. Kagazo compresses within 80\u2013180 KB."
  },
  {
    "badge": "Rejection: Head Size Out of Range",
    "title": "Head Height Outside 50%\u201369% Zone",
    "desc": "Photos where head is smaller than 1\" or larger than 1 3/8\" fail automated State Dept checks."
  },
  {
    "badge": "Rejection: Non-White Background",
    "title": "Off-White Wall Tint or Cast Shadows",
    "desc": "State Dept mandates pure white or off-white background with zero patterns or shadows."
  }
];

export default function UsPassportPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'US Passport & Visa Photo Maker Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/us-passport-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Official 2x2 inch (600x600 px @ 300 DPI) US passport, DS-160 visa, and Green Card photo maker with 50-69% head ratio guides and printable 4x6 sheets.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create an Official US Passport Photo at Home',
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
            name: 'US Passport Photo Maker (2x2")',
            item: 'https://kagazo.in/tools/us-passport-photo',
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
          <span className="text-primary font-bold truncate">US Passport Photo (2×2&quot;)</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-xs sm:text-sm font-extrabold text-emerald-800 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>22 CFR 51.26 Compliant • 600 × 600 px @ 300 DPI • Under 240 KB DS-160</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>US Passport &amp; Visa Photo Maker </span>
            <span className="text-primary">(2&quot; × 2&quot; / 600×600 px)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Format, validate, and download 100% compliant U.S. passport, DS-160 nonimmigrant visa,
            and DV Lottery photos meeting strict Department of State and USCIS guidelines. Features 2×2
            inch (600 × 600 px) square calibration, 50%–69% head height lock, under 240 KB file size
            optimization, and printable 4×6&quot; 6-photo sheets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> State Dept 22 CFR 51.26
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Globe2 className="w-4 h-4 text-primary" /> 600 × 600 px @ 300 DPI
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
            <PassportPhotoStudioEngine defaultCountryId="us-passport" />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Why Make Your US Passport Photos on Kagazo?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Engineered to meet exact Bureau of Consular Affairs and CEAC portal technical requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-2.5">
                    2&quot;
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Strict 2×2&quot; Square Lock</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Locks exact 1:1 aspect ratio and 600×600 px minimum resolution mandated by the U.S.
                    Department of State.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-2.5">
                    50%
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">50%–69% Head Height Guide</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Interactive biometric caliper verifies your head measures between 1&quot; and 1 3/8&quot;
                    (28–35 mm) from chin to crown.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-2.5">
                    240
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">DS-160 &lt;240 KB Budget Lock</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Intelligently compresses output between 80 KB and 180 KB to prevent CEAC portal
                    upload errors.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-2.5">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Save $17 on Drugstore Prints</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generates an 6-photo 4×6&quot; sheet. Print at CVS, Walgreens, or Walmart for $0.35
                    instead of paying $16.99.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-2.5">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Writes binary 300 DPI tags directly into the JPEG APP0 segment to pass automated consular
                    scanners.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-2.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Zero-Upload RAM Security</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your biometric facial photos are processed locally on your device. Zero cloud uploads,
                    zero tracking.
                  </p>
                </div>
              </div>
            </section>

            {/* Official US Passport & Visa Photo Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Official U.S. Passport &amp; Visa Photo Requirements (22 CFR 51.26)
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                    Verified against the Bureau of Consular Affairs and USCIS guidelines.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
                  State Dept Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-3.5">Parameter</th>
                      <th className="py-3 px-3.5">Official Department of State Rule</th>
                      <th className="py-3 px-3.5">Common Failure Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {US_PHOTO_SPECS.map((spec, idx) => (
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
                  How to Create an Official US Passport Photo in 5 Steps
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
                  Common US Passport Photo Rejections and How Kagazo Fixes Them
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
                  Frequently Asked Questions (US Passport &amp; DS-160 Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Everything you need to know about US passport guidelines, print sheets, and DS-160 rules.
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

          {/* Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-3xl border border-surface-darker p-4 sm:p-5 shadow-card space-y-3">
              <span className="text-[10px] font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Visa Tools
              </span>

              <div className="space-y-1.5">
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
                    AI
                  </span>
                </Link>

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
                    DV
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
                Your U.S. visa and passport photos are cropped and processed exclusively in client-side RAM.
                Zero cloud storage or facial harvesting.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 2×2&quot; (51×51 mm)
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 600×600 px @ 300 DPI
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ &lt;240 KB DS-160
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
