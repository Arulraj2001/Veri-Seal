import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Camera,
  PenTool,
  Fingerprint,
  FileText,
  Sparkles,
} from 'lucide-react';
import TnpscOtrComplianceKitEngine from '@/components/tools/TnpscOtrComplianceKitEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'TNPSC OTR Photo, Signature & Thumb Kit | Group 4, 2, 1 | Kagazo',
  description:
    'Prepare Photo with Name/Date strip (20–50 KB), Signature (10–20 KB), and Thumb (10–50 KB) for TNPSC OTR Group 4, 2, 1 & VAO. 1-click batch download, 100% free.',
  keywords: [
    'tnpsc otr photo and signature resizer online free',
    'tnpsc group 4 photo size with name and date 20 to 50 kb',
    'tnpsc signature size 10 to 20 kb converter',
    'tnpsc left thumb impression size 10 to 50 kb',
    'tnpsc vao photo name date format 2026',
    'tnpsc group 2 otr photo signature dimensions',
    'tnpsc signature less than 10 kb error solution',
    'tnpsc one time registration photo editor free',
    'tnpsc certificate pdf compressor under 200 kb',
    'tamil nadu psc otr biometric suite',
    'tnpsc photo name date stamp online',
    'tnpsc otr photo resize 3.5x4.5 cm',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/tnpsc-otr-compliance-kit',
  },
  openGraph: {
    title: 'TNPSC OTR Photo, Signature & Thumb Compliance Kit | Kagazo',
    description:
      'All-in-one TNPSC OTR upload preparer: Photo with Name/DOP strip, Signature 10–20 KB anti-rejection lock, and biometric Thumb Impression. 100% free.',
    url: 'https://kagazo.in/tools/tnpsc-otr-compliance-kit',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TNPSC OTR Photo, Signature & Thumb Kit | Group 4, 2, 1 | Kagazo',
    description:
      'Prepare all 3 mandatory One Time Registration uploads for TNPSC: Photo with name/date strip, 10–20 KB signature lock, and thumb impression. Zero server uploads.',
  },
};

const TNPSC_RULES = [
  {
    item: 'Applicant Photograph',
    dims: '3.5 cm × 4.5 cm (approx 413 × 531 px @ 300 DPI)',
    size: 'Strictly 20 KB to 50 KB',
    requirement: 'Mandatory white bottom strip with Candidate Name in Capitals and Date of Photograph (DOP within 3 months).',
  },
  {
    item: 'Specimen Signature',
    dims: '6.0 cm × 2.0 cm (approx 400 × 130 px)',
    size: 'Strictly 10 KB to 20 KB (Strict Floor & Ceiling)',
    requirement: 'Dark blue or black ink on clean white unruled paper. Portal strictly rejects any file under 10 KB or over 20 KB.',
  },
  {
    item: 'Left Thumb Impression (LTI)',
    dims: '3.0 cm × 3.0 cm (approx 354 × 354 px)',
    size: 'Strictly 10 KB to 50 KB',
    requirement: 'Clear friction ridges without excessive ink pooling, blots, or blurring. Blue or black stamp pad ink.',
  },
  {
    item: 'Certificate Uploads (SSLC, PSTM)',
    dims: 'Standard A4 Document Format',
    size: 'Strictly between 100 KB and 200 KB',
    requirement: 'PDF format only. Compulsory for 10th SSLC marksheet, Community Certificate, and PSTM certificate.',
  },
];

const FAQS = [
  {
    question: 'Why does the TNPSC portal reject signatures saying "File size less than 10 KB"?',
    answer:
      'When candidates crop a small signature to 6.0 cm × 2.0 cm, standard image compressors often reduce the file to 4–8 KB. The TNPSC OTR server algorithm strictly rejects any upload below 10 KB to ensure legibility. Kagazo solves this by applying 300 DPI high-chroma sampling and safe JFIF padding, guaranteeing your output always lands comfortably in the 13–18 KB sweet spot.',
  },
  {
    question: 'Is it mandatory to print the Candidate Name and Date of Photograph (DOP)?',
    answer:
      'Yes! According to the official TNPSC Instructions to Applicants, the photograph must have a clear white rectangular strip at the bottom containing the candidate\'s full name in capital block letters and the date on which the photograph was taken. Photos without this stamped strip are flagged and rejected during application scrutiny.',
  },
  {
    question: 'What is the date requirement for the Date of Photograph (DOP) on TNPSC?',
    answer:
      'The photograph must have been taken within three months prior to the date of notification. The date printed on the bottom strip must clearly reflect this recent capture date in DD/MM/YYYY format.',
  },
  {
    question: 'Can I download all 3 processed files together in one click?',
    answer:
      'Yes! Once you format your photo with name/date banner, signature, and left thumb impression, you can click "Download All 3 Files" to receive all three compliant assets sequentially named (`tnpsc_photo.jpg`, `tnpsc_signature.jpg`, `tnpsc_thumb.jpg`), ready for immediate OTR upload.',
  },
  {
    question: 'Can I use blue ink for my TNPSC specimen signature?',
    answer:
      'Yes. Unlike certain central boards that mandate black ink only, TNPSC officially accepts both blue and black ink signatures on clean, unruled white paper. However, signatures signed in CAPITAL letters or pencil will be rejected.',
  },
  {
    question: 'How long is a TNPSC One Time Registration (OTR) profile valid?',
    answer:
      'A TNPSC OTR profile is valid for 5 years from the date of initial registration. Candidates are required to renew their profile upon expiry and are strongly advised to update their photograph whenever their physical appearance changes or when applying for a major recruitment cycle like Group 4 or Group 2.',
  },
  {
    question: 'What format and file size are required for TNPSC certificate uploads like PSTM?',
    answer:
      'Educational marksheets (10th SSLC, 12th HSC), Community Certificates, and Persons Studied in Tamil Medium (PSTM) proofs must be uploaded in PDF format with file sizes strictly between 100 KB and 200 KB. Use Kagazo’s [TNPSC PDF Compressor (200KB)](/tools/compress-pdf-to-200kb).',
  },
  {
    question: 'What background color is mandatory for the TNPSC applicant photograph?',
    answer:
      'A plain white or very light off-white background is compulsory. Photos with colored walls, outdoor trees, busy patterns, or household furniture in the background are rejected during TNPSC document verification.',
  },
  {
    question: 'Can I wear spectacles or eye glasses in my TNPSC photo?',
    answer:
      'Regular prescription eyeglasses are permitted provided there is no glare or flash reflection covering your eyes. Sunglasses, tinted glasses, caps, hats, and religious headwear that obscures facial features from forehead to chin are strictly prohibited.',
  },
  {
    question: 'Does Kagazo upload or store my biometric photo, signature, or thumb print on any server?',
    answer:
      'Never. All cropping, banner stamping, contrast adjustment, and compression take place 100% in your local browser’s volatile RAM memory using client-side HTML5 Canvas. No personal identity files are ever transmitted across the network or stored on any server.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload 3 OTR Assets",
    "desc": "Select photo, signature, and left thumb impression files simultaneously."
  },
  {
    "step": 2,
    "title": "Automatic OTR Calibration",
    "desc": "Photo (20\u201350 KB, 200\u00d7230 px), Signature (10\u201320 KB), Thumb (10\u201350 KB)."
  },
  {
    "step": 3,
    "title": "Add Name & Date Banner",
    "desc": "Embeds applicant name and date of photo on the photograph bottom strip."
  },
  {
    "step": 4,
    "title": "Verify 300 DPI & Dimensions",
    "desc": "Ensures all 3 assets match TNPSC One Time Registration server criteria."
  },
  {
    "step": 5,
    "title": "Batch Download All 3",
    "desc": "Download verified assets ready for direct upload to tnpscexams.in."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Signature Under 10 KB",
    "title": "TNPSC Portal Signature Under 10 KB Error",
    "desc": "Cropping signatures closely drops file size to 6 KB. Kagazo pads to safe 14 KB."
  },
  {
    "badge": "Error: Missing Name and DOP Strip",
    "title": "Photo Lacks Applicant Name and Date",
    "desc": "TNPSC OTR requires name and date of photo printed on photo. Kagazo embeds this automatically."
  },
  {
    "badge": "Error: Thumb Impression Smudged",
    "title": "Unreadable Biometric Ridge Detail",
    "desc": "Over-inked thumb prints get rejected. Kagazo sharpens ridge contrast."
  },
  {
    "badge": "Error: Marksheet / ID Out of Range",
    "title": "Certificate Over 200 KB Ceiling",
    "desc": "TNPSC documents must be strictly between 100 KB and 200 KB. Kagazo compresses to safe 180 KB."
  }
];

export default function TnpscOtrComplianceKitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'TNPSC OTR Photo, Signature & Thumb Compliance Kit',
        url: 'https://kagazo.in/tools/tnpsc-otr-compliance-kit',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'All-in-one 3-in-1 compliance preparation suite for TNPSC One Time Registration (OTR). Prepares photo with name/date banner, signature 10–20 KB, and left thumb impression.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Prepare Full TNPSC OTR Dossier (Photo, Signature & Thumb)',
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kagazo.in/tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'TNPSC OTR Compliance Kit',
            item: 'https://kagazo.in/tools/tnpsc-otr-compliance-kit',
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
          <span className="text-primary font-bold truncate">TNPSC OTR Compliance Kit</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Official Tamil Nadu PSC Recruitment 2026 Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TNPSC OTR Photo, Signature &amp; </span>
            <span className="text-primary">Thumb Compliance Kit</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Complete 3-in-1 compliance suite for <strong>TNPSC One Time Registration (OTR)</strong>: Group 1, Group 2/2A, Group 4 &amp; VAO. Generate Photo with Name/Date strip (20–50 KB), Signature locked to <strong>10–20 KB</strong>, and Left Thumb Impression (10–50 KB) with 1-click batch download.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ 3-in-1 OTR Preparation Suite',
              '✓ Name & Date Banner Embedder',
              '✓ 10–20 KB Signature Lock',
              '✓ Left Thumb Friction Ridge Enhancer',
              '✓ 100% In-RAM Privacy',
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
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">3-in-1 Unified Session</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Format photo, signature, and thumb impression simultaneously without juggling multiple websites.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">10–20 KB Signature Lock</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Bi-directional padding prevents the infamous &quot;Signature size less than 10 KB&quot; rejection.
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
                Biometric assets are processed entirely inside browser memory. Zero server uploads.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* The Interactive Engine */}
            <TnpscOtrComplianceKitEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official TNPSC Portal Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Official TNPSC OTR Biometric Specifications (2026 Guidelines)
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Extracted directly from Tamil Nadu Public Service Commission Instructions to Applicants
                  </p>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  tnpscexams.in Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface border-b border-surface-darker text-text-main/70 uppercase text-[10px] tracking-wider">
                      <th className="p-3 font-bold">Upload Component</th>
                      <th className="p-3 font-bold">Official Dimensions</th>
                      <th className="p-3 font-bold">Strict File Size Range</th>
                      <th className="p-3 font-bold">Mandatory Portal Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {TNPSC_RULES.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 font-bold text-text-main">{rule.item}</td>
                        <td className="p-3 font-mono font-semibold text-primary">{rule.dims}</td>
                        <td className="p-3 font-bold text-emerald-700 bg-emerald-50/50 rounded-sm">
                          {rule.size}
                        </td>
                        <td className="p-3 text-text-main/70">{rule.requirement}</td>
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
                  How to Complete TNPSC OTR Compliance in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant recruitment portal compliance:
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
                  Common TNPSC OTR Compliance Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common application mistakes that trigger instant portal rejection:
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

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions (TNPSC OTR Guidelines)
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Official rules and guidelines for Tamil Nadu Public Service Commission registration
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Updated 2026
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* TNPSC Portal Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                TNPSC Criteria
              </h3>

              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Photo: 20–50 KB</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Must have Candidate Name &amp; DOP printed in white bottom strip.
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Signature: 10–20 KB</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Strict floor and ceiling. Files &lt;10 KB or &gt;20 KB are rejected.
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Thumb: 10–50 KB</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Left thumb friction ridges must be clear without blots.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PSTM &amp; SSLC PDF
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    200 KB
                  </span>
                </Link>

                <Link
                  href="/tools/photo-date-name-stamper"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Photo Date Stamper
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DOP
                  </span>
                </Link>

                <Link
                  href="/tools/thumb-impression-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Thumb Impression
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    240×240
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
                  href="/tools/specifications"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Exam Radar
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
                Personal identity assets (photos, signatures, thumb impressions) are calibrated strictly in local memory.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ TNPSC OTR
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Uploads
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

