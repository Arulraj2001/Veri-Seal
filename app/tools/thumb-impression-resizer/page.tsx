import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Fingerprint,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Award,
  Sliders,
} from 'lucide-react';
import ThumbImpressionEngine from '@/components/tools/ThumbImpressionEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Left Thumb Impression (LTI) Resizer & Sharpener | IBPS, SBI, RRB | Kagazo',
  description:
    'Sharpen fingerprint friction ridges and format Left Thumb Impressions (LTI) strictly to 240×240 px (20–50 KB) in JPEG for IBPS PO, Clerk, SBI & Railway RRB. Ink smudge remover, 100% free RAM privacy.',
  keywords: [
    'thumb impression resizer online free',
    'ibps left thumb impression size 240x240',
    'sbi clerk thumb impression 20 to 50 kb',
    'rrb ntpc thumb impression photo resize',
    'enhance fingerprint ridges online free',
    'clean thumb impression smudge online',
    'left thumb impression format for bank exam',
    'thumb print resizer without blur',
    'biometric thumb impression sharpener',
    'ssc selection post thumb impression size',
    '240x240 photo resizer for thumb print',
    'left thumb impression online compressor',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/thumb-impression-resizer',
  },
  openGraph: {
    title: 'Left Thumb Impression (LTI) Resizer & Ridge Sharpener | Kagazo',
    description:
      'Sharpen papillary friction ridges, clean ink smudges, and format LTI strictly to 240×240 px (20–50 KB) for IBPS, SBI, and Railway RRB portals. 100% free.',
    url: 'https://kagazo.in/tools/thumb-impression-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Left Thumb Impression (LTI) Resizer & Sharpener | Kagazo',
    description:
      'Format and sharpen Left Thumb Impression strictly to 240×240 px (20–50 KB) for IBPS, SBI, and Railway exams. Zero server uploads.',
  },
};

const FAQS = [
  {
    question: 'Which hand thumb impression is mandatory for IBPS, SBI, and Bank PO exams?',
    answer:
      'Candidate guidelines from IBPS and SBI strictly require the Left Thumb Impression (LTI). If an applicant does not have a left thumb, they may provide an impression of their right thumb, but must explicitly declare this during online registration and document verification.',
  },
  {
    question: 'What are the exact dimensions and file size for IBPS thumb impressions?',
    answer:
      'IBPS requires the thumb impression to measure exactly 240 × 240 pixels (1:1 square ratio) at 200 DPI resolution. The file size must remain strictly between 20 KB and 50 KB in JPEG/JPG format. Files under 20 KB or above 50 KB are rejected by the upload portal.',
  },
  {
    question: 'What ink color should be used for the thumb impression stamp?',
    answer:
      'Both blue ink and black ink stamp pad impressions on clean white paper are officially permitted and accepted across IBPS, SBI, SSC, and Railway RRB examination portals.',
  },
  {
    question: 'What should I do if my thumb impression looks like a solid black smudge?',
    answer:
      'If your stamp pad was over-inked, friction ridges will merge into an unreadable solid ink blotch that automated biometric scanners will reject. Lightly dab your thumb on scrap paper first to remove excess ink, stamp gently on unlined white paper, and use Kagazo’s ridge sharpener to boost edge contrast.',
  },
  {
    question: 'What if an applicant has lost both thumbs due to injury or disability?',
    answer:
      'Under official IBPS guidelines: "If both thumbs are missing, the impression of one of the fingers of the left hand starting from the forefinger to little finger should be taken. If no fingers are available, right hand fingers may be used." The specific finger used must be clearly indicated in the declaration.',
  },
  {
    question: 'Can I upload a thumb impression in PNG or PDF format?',
    answer:
      'No. Bank examination portals strictly reject PDF, PNG, and TIFF formats in the thumb impression upload slot. You must upload a JPEG/JPG image. Kagazo strictly outputs compliant JPEG files.',
  },
  {
    question: 'Why does the IBPS portal reject thumb impressions under 20 KB?',
    answer:
      'IBPS enforces a 20 KB floor limit to ensure uploaded biometric scans have sufficient clarity for manual verification officers. Files compressed below 20 KB often become pixelated, obscuring fingerprint ridge flow.',
  },
  {
    question: 'How does Kagazo sharpen faint thumb impressions without altering biometric ridges?',
    answer:
      'Kagazo applies Contrast Limited Adaptive Histogram Equalization (CLAHE) and high-pass Laplacian edge filtering. This mathematically accentuates the contrast between dermal ridge peaks and valleys while subtracting ambient paper grain and shadows.',
  },
  {
    question: 'Can I use this tool for Railway RRB NTPC and Group D thumb impressions?',
    answer:
      'Yes. Railway RRB portals mandate an unsmudged, clear thumb impression on white paper within 20 KB to 50 KB. Kagazo’s preset matches the exact RRB verification standard.',
  },
  {
    question: 'Is my biometric fingerprint data stored or saved on your servers?',
    answer:
      'Never. Kagazo processes all fingerprint images 100% inside your web browser’s volatile RAM memory using client-side HTML5 Canvas. Zero bytes are uploaded to cloud servers or stored in databases. When you close the tab, all biometric data is permanently deleted.',
  },
];

export default function ThumbImpressionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Left Thumb Impression (LTI) Resizer & Sharpener',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/thumb-impression-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Calibrate and sharpen Left Thumb Impression (LTI) photos strictly to 240x240 px, 20-50 KB in JPEG format for IBPS, SBI, and Railway RRB exams.',
        featureList: [
          'Exact 240x240 pixel square dimension lock',
          'Laplacian dermal friction ridge sharpening',
          'Ink puddle and smudge suppression',
          'Strict 20 KB – 50 KB file size auto-lock',
          '100% in-browser RAM privacy for biometric data',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize and Sharpen Left Thumb Impression for Bank Exams',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Thumb Impression Photo',
            text: 'Take a clear close-up smartphone photo of your Left Thumb Impression on clean white paper.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Ridge Sharpness',
            text: 'Use the ridge sharpness slider to highlight papillary friction ridge flow and loop patterns.',
          },
          {
            '@type': 'HowToStep',
            name: 'Verify 240x240 Square Crop',
            text: 'Center your thumb impression neatly inside the 1:1 square crop box.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant JPG',
            text: 'Download the verified 20–50 KB JPEG file ready for immediate IBPS or RRB portal submission.',
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kagazo.in/tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Left Thumb Impression Resizer',
            item: 'https://kagazo.in/tools/thumb-impression-resizer',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
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
          <span className="text-primary font-bold">Left Thumb Impression Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>IBPS, SBI &amp; Railway RRB Official Biometric Standard (240×240 px)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Left Thumb Impression </span>
            <span className="text-primary">(LTI)</span>
            <span> Resizer &amp; Sharpener</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Sharpen papillary friction ridges, clean ink stamp smudges, and format your Left Thumb Impression strictly to <strong>240 × 240 pixels (20 KB – 50 KB)</strong> in JPEG format for <strong>IBPS PO, Clerk, SBI, and Railway RRB</strong> online portals.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ Exact 240×240 px Square Lock',
              '✓ Friction Ridge Contrast Booster',
              '✓ Ink Smudge & Pool Reducer',
              '✓ Strict 20–50 KB Auto-Lock',
              '✓ 100% In-RAM Biometric Privacy',
            ].map((tag) => (
              <span
                key={tag}
                className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Ridge Sharpening</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Laplacian filtering accentuates fingerprint loop and whorl patterns for biometric clarity.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">240×240 Dimension Lock</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Hardcoded 1:1 aspect ratio matching official IBPS and SBI server validation requirements.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">100% In-RAM Privacy</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Biometric thumb impressions are processed in memory and instantly wiped upon download.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ThumbImpressionEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Specifications Cheatsheet */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Official Thumb Impression Rules Across Recruitment Portals
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for thumb impression uploads across banking, railway, and state recruitment bodies.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-surface text-text-main font-bold border-b border-surface-darker">
                      <th className="py-3 px-4">Recruitment Authority</th>
                      <th className="py-3 px-4">Dimension Standard</th>
                      <th className="py-3 px-4">Required File Size</th>
                      <th className="py-3 px-4">Ink Color</th>
                      <th className="py-3 px-4">Target Finger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker font-medium text-text-main/80">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">IBPS (PO, Clerk, SO)</td>
                      <td className="py-3 px-4 font-mono font-bold">240 × 240 pixels (1:1)</td>
                      <td className="py-3 px-4 font-bold">20 KB to 50 KB</td>
                      <td className="py-3 px-4">Blue or Black Ink</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Left Thumb (Mandatory)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">State Bank of India (SBI)</td>
                      <td className="py-3 px-4 font-mono font-bold">240 × 240 pixels</td>
                      <td className="py-3 px-4 font-bold">20 KB to 50 KB</td>
                      <td className="py-3 px-4">Blue or Black Ink</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Left Thumb</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">Railway RRB (NTPC, Group D)</td>
                      <td className="py-3 px-4 font-mono">3 cm × 3 cm (approx 200×200)</td>
                      <td className="py-3 px-4">10 KB to 40 KB</td>
                      <td className="py-3 px-4">Blue or Black Ink</td>
                      <td className="py-3 px-4">Left Thumb</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-4 font-bold text-primary">SSC (Selection Posts)</td>
                      <td className="py-3 px-4 font-mono">4.0 cm × 2.0 cm or Square</td>
                      <td className="py-3 px-4">10 KB to 20 KB</td>
                      <td className="py-3 px-4">Black Ink Preferred</td>
                      <td className="py-3 px-4">Left Thumb</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Biometric Scrutiny Notice:</strong> During exam hall attendance and document verification, thumb impressions captured on biometric sensors are cross-matched with your uploaded image. Impressions that are smudged, over-inked into solid black pools, or too faint will cause verification failure.
                </div>
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Step-by-Step: How to Take and Format a Clean Thumb Impression
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
                    Ink Your Left Thumb Lightly
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Use a standard blue or black stamp pad. Press your left thumb gently onto the ink pad. Dab lightly on scrap paper once to remove excess ink and avoid blotches.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
                    Roll Thumb on Unlined Paper
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Gently roll your thumb from left to right on clean white unruled paper without slipping. Take 2–3 impressions and pick the one with the clearest ridge pattern.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">3</span>
                    Capture Close-Up Photo
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Hold your smartphone camera directly above the print in bright daylight. Ensure the camera focuses sharply on individual fingerprint friction ridges.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">4</span>
                    Enhance &amp; Download (20–50 KB)
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Upload to Kagazo, adjust the sharpness slider, and download your 240×240 px JPG file, automatically locked between 20 KB and 50 KB.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Errors & Fixes */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common Thumb Impression Rejection Errors &amp; Exact Fixes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "File size less than 20 KB or greater than 50 KB"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> High-resolution mobile photos are 2–5 MB, while over-compressed thumbnails fall below 20 KB.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Kagazo uses bi-directional compression to ensure your file stays strictly between 22 KB and 48 KB.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "Dimensions must be 240 × 240 pixels"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> Uploading rectangular or non-square crops to banking portals that mandate 1:1 square aspect ratio.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Kagazo hardcodes the output to an exact 240×240 pixel canvas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "Friction ridges not distinct / smudged ink"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> Heavy pressure on the stamp pad causes ink to flood the dermal valleys, creating a solid blotch.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Re-stamp lightly, upload to Kagazo, and increase the ridge sharpening slider.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="font-bold text-xs text-red-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Error: "Invalid File Format: Only JPG allowed"
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    <strong>Cause:</strong> Uploading PNG or PDF files of scanned fingerprint documents.
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    <strong>Fix:</strong> Kagazo strictly exports standards-compliant JPEG files with official JFIF markers.
                  </p>
                </div>
              </div>
            </section>

            {/* Real World Use Cases */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Recruitment &amp; Legal Use Cases
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'IBPS PO & Clerk Registration',
                    desc: 'Mandatory Left Thumb Impression upload formatted to exact 240×240 px, 20–50 KB specs.',
                  },
                  {
                    title: 'SBI PO & Junior Associate',
                    desc: 'Calibrate clean blue or black ink left thumb prints for State Bank of India recruitment forms.',
                  },
                  {
                    title: 'Railway RRB NTPC & Group D',
                    desc: 'Sharpen papillary ridges for Railway Recruitment Control Board online biometric uploads.',
                  },
                  {
                    title: 'TNPSC One Time Registration (OTR)',
                    desc: 'Format Left Thumb Impression strictly between 10 KB and 50 KB for Tamil Nadu PSC OTR profile.',
                  },
                  {
                    title: 'PAN Card Illiterate Applicants',
                    desc: 'Attested left thumb impression formatted to 400×200 px for Form 49A PAN card applications.',
                  },
                  {
                    title: 'Property Deeds & Legal Notary',
                    desc: 'Clean up thumb prints for insertion into registered legal affidavits, power of attorney, and wills.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1">
                    <h3 className="text-xs font-bold text-text-main">{item.title}</h3>
                    <p className="text-[11px] text-text-main/70 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy & Security Architecture */}
            <section className="bg-gradient-to-br from-primary-light/40 via-surface to-surface rounded-3xl border border-primary/20 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Lock className="w-5 h-5" />
                <span>Biometric Privacy Guarantee: 100% In-Browser Execution</span>
              </div>
              <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                Biometric fingerprint impressions are sensitive personal data. Kagazo performs all ridge sharpening, cropping, and JPEG quantization locally inside your web browser’s volatile RAM. Zero fingerprint images are transmitted over the internet, stored on remote disks, or used for automated processing. Data is permanently wiped when you refresh or close this tab.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-primary">
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ No Biometric Cloud Retention</span>
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ No AI Biometric Training</span>
                <span className="bg-white border border-primary/20 px-2.5 py-1 rounded-full">✓ Instant RAM Purge</span>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-surface-darker pb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main">Frequently Asked Questions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                    <h3 className="font-bold text-xs sm:text-sm text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-5">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/ibps-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      IBPS 4-in-1 Suite
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    All 4
                  </span>
                </Link>

                <Link
                  href="/tools/handwritten-declaration-scanner"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      IBPS Declaration
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    50–100KB
                  </span>
                </Link>

                <Link
                  href="/tools/signature-cleaner-extractor"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Black Ink Sig Extractor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    No Lines
                  </span>
                </Link>

                <Link
                  href="/tools/rrb-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      RRB Railway Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    320×240
                  </span>
                </Link>

                <Link
                  href="/tools/tnpsc-otr-compliance-kit"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      TNPSC OTR Bundle
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    3-in-1
                  </span>
                </Link>

                <Link
                  href="/tools/specifications"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      All Exam Radar
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    40+ Exams
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
                Biometric fingerprint impressions are sharpened strictly in client memory. Zero server uploads.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 240×240 px
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 20–50 KB Lock
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

