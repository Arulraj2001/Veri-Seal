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
  Award,
  Globe2,
} from 'lucide-react';
import { UscisPhotoCheckerEngine } from '@/components/tools/UscisPhotoCheckerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'DV Lottery Photo Tool 2026 / 2027 | Official 600×600 px Checker | Kagazo',
  description:
    'Validate & format your photo for the official DV-2026 & DV-2027 Green Card Lottery. 600x600 px square, 50%–69% head height, under 240 KB, 100% free RAM privacy.',
  keywords: [
    'dv lottery photo tool 2026 official free',
    'diversity visa photo validator 600x600 online',
    'dv lottery photo checker under 240 kb',
    'green card lottery photo size in pixels',
    'how to check dv 2027 photo compliance',
    'dv lottery disqualification photo reasons',
    'us diversity visa photo requirements 2026',
    'official green card lottery photo crop tool',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/dv-lottery-photo-tool',
  },
  openGraph: {
    title: 'DV Lottery Photo Tool 2026 / 2027 | Official 600×600 px Checker | Kagazo',
    description:
      'Check and crop photos for the US Diversity Visa (Green Card) Lottery. 600x600 px, 50%-69% head height, 300 DPI, zero cloud upload.',
    url: 'https://kagazo.in/tools/dv-lottery-photo-tool',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DV Lottery Photo Tool 2026 / 2027 | Official 600×600 px Checker | Kagazo',
    description:
      'Format and validate your official DV-2026 & DV-2027 Green Card Lottery photo with 100% in-browser RAM privacy.',
  },
};

const DV_REQUIREMENTS = [
  {
    parameter: 'Pixel Dimensions',
    officialRule: 'Strictly 600 × 600 pixels (Square 1:1 ratio @ 300 DPI)',
    disqualificationRisk: 'Immediate upload rejection if rectangular or uncropped',
  },
  {
    parameter: 'Head Height',
    officialRule: '50% to 69% of image height (300 to 414 pixels chin to crown)',
    disqualificationRisk: 'Automated AI filter flags head size out of proportion',
  },
  {
    parameter: 'Eye Level Position',
    officialRule: '56% to 69% from the bottom edge (336 to 414 pixels)',
    disqualificationRisk: 'Tilted or low-angle portrait leads to silent entry rejection',
  },
  {
    parameter: 'File Size Ceiling',
    officialRule: 'Strictly 240 KB or less (Maximum 245,760 bytes)',
    disqualificationRisk: 'State Dept submission portal immediately aborts upload',
  },
  {
    parameter: 'Photo Recency',
    officialRule: 'Taken within the last 6 months to reflect current appearance',
    disqualificationRisk: 'Reusing photos from prior years results in lifetime lottery ban',
  },
  {
    parameter: 'Background Tone',
    officialRule: 'Plain white or off-white with zero shadows behind ears/neck',
    disqualificationRisk: 'Wall textures, doorway frames, or colored paint disqualify',
  },
  {
    parameter: 'Eyeglasses Rule',
    officialRule: 'Strictly prohibited without exception (Banned since Nov 2016)',
    disqualificationRisk: 'Entries with reading or prescription glasses are thrown out',
  },
];

const FAQS = [
  {
    question: 'What are the exact photo specifications for the DV-2026 / DV-2027 Lottery?',
    answer:
      'The photo must be a square JPEG image measuring exactly 600 × 600 pixels. The head must measure between 300 and 414 pixels (50% to 69% of image height), and eye height must be between 336 and 414 pixels from the bottom edge. File size must be under 240 KB in 24-bit sRGB color.',
  },
  {
    question: 'Can I reuse the photo I submitted in last year’s DV Lottery?',
    answer:
      'NO! The U.S. Department of State uses facial recognition algorithms across previous lottery cycles. Submitting a photo from an earlier DV entry results in immediate, automatic disqualification without appeal.',
  },
  {
    question: 'Why do over 30% of DV Lottery entries get disqualified for photos?',
    answer:
      'Most disqualified applicants never know they were rejected because the initial submission form accepts any image that meets basic file parameters. However, during automated post-entry screening, non-compliant head ratios, shadows, or eyeglasses result in silent disqualification.',
  },
  {
    question: 'Can I use AI photo generators or beauty filters for my DV Lottery photo?',
    answer:
      'Strictly NO. Any AI manipulation, face slimming, skin smoothing, or artificial background replacement that creates pixel anomalies can cause automated disqualification for photo alteration.',
  },
  {
    question: 'Can I wear glasses or sunglasses in the DV Lottery photo?',
    answer:
      'No. Eyeglasses have been completely banned in U.S. visa and diversity visa photos since 2016. Entries with eyeglasses are automatically disqualified.',
  },
  {
    question: 'How does Kagazo keep my photo under 240 KB?',
    answer:
      'Our client-side canvas compressor optimizes JPEG quantization tables to guarantee your file lands between 90 KB and 150 KB, well within the 240 KB ceiling.',
  },
  {
    question: 'Does my spouse and each child need a photo?',
    answer:
      'Yes. An individual compliant photo must be submitted for every person listed on your DV Lottery entry (principal applicant, spouse, and each unmarried child under 21).',
  },
  {
    question: 'Can I smile in my DV Lottery photo?',
    answer:
      'A natural, unexaggerated expression with both eyes open and mouth closed is required. Avoid big smiles showing teeth, as parting your lips can alter biometric landmark coordinates.',
  },
  {
    question: 'What should the background look like?',
    answer:
      'The background must be flat, untextured white or off-white with no shadows cast by the applicant’s head, shoulders, or ears. Use diffuse daylight for best results.',
  },
  {
    question: 'Is Kagazo’s DV Lottery photo tool safe to use?',
    answer:
      'Yes! Unlike online tools that store your lottery photos on cloud servers, Kagazo runs 100% in your device’s volatile RAM memory. Zero bytes leave your browser.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Entry Photo",
    "desc": "Upload candidate portrait for DV-2026 / DV-2027 Green Card lottery check."
  },
  {
    "step": 2,
    "title": "Automated Rules Validation",
    "desc": "Verifies 600x600 px, 24-bit sRGB color, and under 240 KB ceiling."
  },
  {
    "step": 3,
    "title": "Check Biometric Head Height",
    "desc": "Verifies head occupies 50% to 69% of picture height."
  },
  {
    "step": 4,
    "title": "Verify Eyeglasses & Background",
    "desc": "Confirms zero spectacles, neutral expression, and pure white background."
  },
  {
    "step": 5,
    "title": "Download Validated JPEG",
    "desc": "Save compliant 600x600 px photo ready for submission on dvprogram.state.gov."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Disqualification: Reusing Previous Photo",
    "title": "Automated Facial Match Against Past Entries",
    "desc": "State Dept disqualifies entries reusing photos from previous DV lotteries. Photo must be <6 months old."
  },
  {
    "badge": "Disqualification: Spectacles / Glasses Detected",
    "title": "Immediate Disqualification on DV Portal",
    "desc": "Wearing eyeglasses on DV entry photos triggers disqualification without notification."
  },
  {
    "badge": "Disqualification: Heavy Digital Editing",
    "title": "Excessive Retouching Flagged by AI",
    "desc": "Altering facial features, moles, or eye color violates DV lottery rules."
  },
  {
    "badge": "Disqualification: Compression Artifacts",
    "title": "Over-Compressed Artifacts in Face Area",
    "desc": "Images compressed below 10 KB or with blurry blocking fail consular inspection."
  }
];

export default function DvLotteryPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'DV Lottery Photo Tool 2026 / 2027 (Official 600×600 px)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/dv-lottery-photo-tool',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Validate & format your photo for the official DV-2026 & DV-2027 Green Card Lottery. 600x600 px square, 50%–69% head height, under 240 KB, 100% free RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Prepare a Compliant Photo for the DV Lottery',
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
            name: 'DV Lottery Photo Tool',
            item: 'https://kagazo.in/tools/dv-lottery-photo-tool',
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
          <span className="font-semibold text-text-main">DV Lottery Photo Tool</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-extrabold shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>DV-2026 & DV-2027 Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>DV Lottery Photo Tool 2026 / 2027 </span>
            <span className="text-primary">(600×600 px)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Format and validate your official photograph for the U.S. Diversity Visa Green Card Lottery
            (DV-2026 & DV-2027). Verifies strict 600 × 600 pixel square resolution, 50%–69% head height
            ratio, under 240 KB file size limit, and plain white background with zero cloud uploads.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              600 × 600 px (1:1 Ratio)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              50%–69% Head Height Oval
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-surface-darker">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Strictly &lt;240 KB Ceiling
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
                Why Format Your DV Lottery Photo on Kagazo?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-3">
                    600
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Official DV Specification Lock</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Enforces the exact 600 × 600 pixel square dimensions mandated on dvprogram.state.gov.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-3">
                    50–69
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Head Height Calculator</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Ensures your head measures between 300 and 414 pixels from chin to hair crown.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-3">
                    &lt;240
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Strict 240 KB File Budget</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Compresses phone snapshots into the compliant 80 KB to 160 KB zone to avoid upload aborts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-3">
                    24-Bit
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">True 24-Bit sRGB Color</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Preserves natural skin tones and prevents disqualification caused by color cast errors.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-3">
                    Real
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Zero AI Alterations</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Formats your photo purely through geometric framing without AI modification.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-3">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your lottery photo never touches an external server. Processed entirely in volatile RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official DV Requirements & Disqualification Risks Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-primary" />
                    Official DV Lottery Photo Requirements & Disqualification Risks
                  </h2>
                  <p className="text-sm text-text-main/70 mt-1">
                    Avoid silent disqualification by meeting all Electronic Diversity Visa criteria.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  DV-2026/2027
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-4">Requirement Parameter</th>
                      <th className="py-3 px-4">Official State Department Standard</th>
                      <th className="py-3 px-4">Automated Disqualification Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {DV_REQUIREMENTS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-text-main whitespace-nowrap">
                          {item.parameter}
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-700">{item.officialRule}</td>
                        <td className="py-3 px-4 text-red-800/90 font-medium">{item.disqualificationRisk}</td>
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
                  How to Prepare DV Lottery Photos in 5 Steps
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
                  Common DV Lottery Photo Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (DV Lottery Photo Tool)
                </h2>
                <p className="text-sm text-text-main/70 mt-1">
                  Everything you need to know about Green Card lottery photo specifications, disqualification risks, and rules.
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
                DV Lottery photos are processed in volatile RAM. Zero cloud storage, zero facial scanning
                harvesting.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ DV-2026/2027
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 600×600 px
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
