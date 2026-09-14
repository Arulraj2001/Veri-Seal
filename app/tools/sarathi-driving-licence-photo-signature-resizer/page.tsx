import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Car,
  CheckCircle2,
  FileCheck,
  CreditCard,
  PenTool,
  AlertTriangle,
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { SarathiResizerEngine } from '@/components/tools/SarathiResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Sarathi Parivahan Driving Licence Photo (35×45 mm, 20–50 KB) & Signature Resizer Free | Kagazo',
  description:
    'Resize photo to 35×45 mm (413×531 px, 300 DPI, 20–50 KB) and signature to 20×50 mm (236×591 px, 300 DPI, 10–20 KB) for Sarathi Parivahan 4.0 driving licence and learner licence applications. Zero uploads, instant download.',
  keywords: [
    'sarathi parivahan photo size',
    'driving licence photo resize online free',
    'sarathi photo signature resize',
    'morth driving licence photo 35x45mm',
    'parivahan portal photo size specification',
    'driving licence photo 20kb 50kb',
    'sarathi 4.0 photo signature resizer',
    'dl photo resize online india free',
    'driving licence signature 10kb 20kb',
    'rto photo resize 300 dpi free',
    'learner licence photo size 2024 2025',
    'dl renewal photo resize online',
    'sarathi portal file size out of bounds fix',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer',
  },
  openGraph: {
    title: 'Sarathi Driving Licence Photo (35×45 mm) & Signature Resizer Online Free | Kagazo',
    description:
      'Official MoRTH Sarathi Parivahan 4.0 specs: 35×45 mm photo (20–50 KB) and 20×50 mm signature (10–20 KB) at 300 DPI. Fixes "File size out of bounds" instantly. Zero uploads.',
    url: 'https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarathi Parivahan Driving Licence Photo & Signature Resizer | Kagazo',
    description:
      'Resize DL photo to 35×45 mm (20–50 KB) and signature to 20×50 mm (10–20 KB) at 300 DPI for Sarathi 4.0. Fixes "File size out of bounds" error. 100% free, no uploads.',
  },
};

const FAQS = [
  {
    question: 'What are the exact photo specifications for Sarathi Parivahan Driving Licence in 2025?',
    answer:
      'The Ministry of Road Transport & Highways (MoRTH) Sarathi Parivahan 4.0 portal requires applicant passport photographs to measure 35 mm × 45 mm. At 300 DPI, this corresponds to approximately 413 × 531 pixels. The file format must be JPEG/JPG with a light or plain white background, and the file size must be strictly between 20 KB and 50 KB. Files outside this range trigger an automatic portal upload error.',
  },
  {
    question: 'What are the exact signature specifications for Sarathi 4.0 portal?',
    answer:
      'The applicant signature must measure 20 mm × 50 mm. At 300 DPI, this corresponds to approximately 236 × 591 pixels. The file size must be strictly between 10 KB and 20 KB in JPEG/JPG format. The signature should be on clean white paper with dark blue or black ink. Kagazo\'s binary-search engine targets 12–18 KB to stay well within the 10–20 KB window.',
  },
  {
    question: 'Why does the Parivahan portal show "File size is out of bounds"?',
    answer:
      'Sarathi Parivahan 4.0 has one of the tightest signature size windows in India — strictly 10 KB to 20 KB. Regular image compressors often produce signatures at 7–9 KB (too small, below the minimum) or 22–25 KB (too large, above the maximum). Both fail silently on most portals but produce explicit errors on Sarathi. Kagazo\'s iterative binary-search JPEG quality engine guarantees the signature lands between 12 KB and 18 KB with 300 DPI JFIF markers embedded.',
  },
  {
    question: 'What is the difference between a Learner Licence (LL) and Driving Licence (DL) application — do photo requirements differ?',
    answer:
      'Both LL and DL applications on Sarathi Parivahan use the same photo and signature specifications: 35×45 mm (20–50 KB) for the photograph and 20×50 mm (10–20 KB) for the signature. The same Kagazo output can be used for both LL (Form 2) and DL (Form 4) applications and for DL renewal (Form 9).',
  },
  {
    question: 'Can I upload a phone selfie for my driving licence application?',
    answer:
      'Yes, but selfies must meet specific requirements: plain white or light background (no colored walls), front-facing, no sunglasses, no caps or hats (unless for religious reasons), and direct lighting without harsh shadows. Upload your selfie to Kagazo, use the 35×45 mm crop guide to adjust framing, and the tool handles all resizing, DPI embedding, and file size compliance.',
  },
  {
    question: 'Does Sarathi Parivahan accept photographs taken at a photo studio?',
    answer:
      'Yes. Studio photographs are typically printed at 35×45 mm and scanned by the photographer at 600 DPI+, resulting in files of 300 KB to 2 MB — far too large for the 50 KB portal limit. Upload the high-resolution scan to Kagazo, and it will resize, embed 300 DPI, and compress to the compliant 20–50 KB range in seconds.',
  },
  {
    question: 'What is Form 2 photo requirement for Sarathi (Learner Licence)?',
    answer:
      'Form 2 (Learner Licence application) requires a recent passport photograph (35×45 mm, 20–50 KB, JPEG) along with a scanned signature (20×50 mm, 10–20 KB, JPEG). Both files must meet the same Sarathi Parivahan 4.0 specifications. This is the same as Form 4 (DL application) and Form 9 (DL renewal).',
  },
  {
    question: 'My DL renewal application says "Photo rejected by RTO officer." What went wrong?',
    answer:
      'RTO officers can reject photographs for three main reasons beyond file size: (1) The photo is too old — most RTOs require photos taken within the last 3–6 months; (2) The background is not plain white/light — colored walls or patterned backgrounds are rejected; (3) The applicant is wearing reflective glasses. Ensure your photo meets these guidelines before uploading.',
  },
  {
    question: 'Why does the Sarathi portal say "Invalid image format" for my JPEG photo?',
    answer:
      'Some camera apps save HEIC or WEBP files with a .jpg extension, causing format mismatch errors. Kagazo automatically converts any uploaded HEIC, WebP, PNG, or misnamed file to a genuine JPEG during processing, ensuring format compliance.',
  },
  {
    question: 'Are my identity documents uploaded to any server?',
    answer:
      'No. All resizing, cropping, DPI header injection, and JPEG compression occur directly inside your browser\'s volatile RAM via WebAssembly and HTML5 Canvas. Zero files are uploaded to any Kagazo server. Your driving licence application photos never leave your device.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select DL Photo or Signature",
    "desc": "Choose Sarathi Photo (35\u00d745 mm, 20\u201350 KB) or Signature (20\u00d750 mm, 10\u201320 KB)."
  },
  {
    "step": 2,
    "title": "Upload Photo or Scan",
    "desc": "Select smartphone portrait or signature photo in any format."
  },
  {
    "step": 3,
    "title": "Apply B&W Contrast Filter",
    "desc": "Purges desk shadows and yellow camera tints from paper scans."
  },
  {
    "step": 4,
    "title": "Bi-Directional Size Lock",
    "desc": "Compresses oversized files under limit and pads undersized signatures above 10 KB."
  },
  {
    "step": 5,
    "title": "Download RTO Ready JPEG",
    "desc": "Download verified JPEG ready for upload on sarathi.parivahan.gov.in."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Signature Under 10 KB",
    "title": "Sarathi Portal Signature Under 10 KB Rejected",
    "desc": "Sarathi Parivahan enforces a strict 10 KB floor. Kagazo safely pads files to 14 KB."
  },
  {
    "badge": "Error: Wrong Aspect Ratio",
    "title": "Signature Not 20x50 mm (2.5:1 Ratio)",
    "desc": "Signatures must be landscape 2.5:1 ratio. Kagazo locks exact millimeter dimensions."
  },
  {
    "badge": "Error: Non-White Background",
    "title": "Yellow Camera Tint or Desk Shading",
    "desc": "MoRTH requires pure white background. Kagazo whitens paper automatically."
  },
  {
    "badge": "Error: File Exceeds 50 KB",
    "title": "Photo Size Exceeds 50 KB Limit",
    "desc": "RTO portals reject photos over 50 KB. Kagazo compresses into the 25\u201340 KB sweet spot."
  }
];

export default function SarathiDrivingLicenceResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Sarathi Parivahan Driving Licence Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Resize driving licence photo to 35×45 mm (413×531 px, 20–50 KB) and signature to 20×50 mm (236×591 px, 10–20 KB) at 300 DPI for Sarathi Parivahan 4.0 portal. Embedded JFIF headers, zero uploads.',
        featureList: [
          '35×45 mm (413×531 px) photo at 300 DPI, 20–50 KB',
          '20×50 mm (236×591 px) signature at 300 DPI, 10–20 KB',
          'Iterative binary-search JPEG compression for exact KB windows',
          'Ink clarity booster for phone-photographed signatures',
          'Support for LL, DL, and DL renewal applications',
          '100% client-side processing — zero server uploads',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for Driving Licence Application on Sarathi Parivahan',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your Passport Photograph',
            text: 'Click "Upload Photo" and select a clear, front-facing photo with a plain white or light background. Passport studio photos or phone selfies both work.',
          },
          {
            '@type': 'HowToStep',
            name: 'Crop to the 35×45 mm Guide',
            text: 'Center your face in the crop guide. Your face should occupy at least 70% of the frame with a clear chin-to-crown view and visible ears.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload and Clean Your Signature',
            text: 'Upload a photo of your signature on white paper. Enable the Ink Clarity Booster to eliminate background shadows and ensure dark, crisp ink strokes.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant Files',
            text: 'Download the 35×45 mm photo (20–50 KB, 300 DPI) and 20×50 mm signature (10–20 KB, 300 DPI) individually or as a ZIP kit for immediate upload to Sarathi Parivahan.',
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
            name: 'Sarathi Driving Licence Photo & Signature Resizer',
            item: 'https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer',
          },
        ],
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
          <span className="text-primary font-bold">Sarathi DL Photo &amp; Signature Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Ministry of Road Transport &amp; Highways (MoRTH) — Sarathi Parivahan 4.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Sarathi Driving Licence </span>
            <span className="text-primary">Photo &amp; Signature Resizer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Crop photo to <strong>35×45 mm (20–50 KB)</strong> and signature to <strong>20×50 mm (10–20 KB)</strong> at 300 DPI for Sarathi Parivahan 4.0 portal. Fixes{' '}
            <strong>&quot;File size is out of bounds&quot;</strong> errors for Learner Licence (Form 2), Driving Licence (Form 4), and DL Renewal (Form 9).
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ Sarathi 4.0 Verified Specs',
              '✓ Fixes "File Out of Bounds"',
              '✓ 300 DPI Embedded',
              '✓ LL + DL + Renewal',
              '✓ Zero Server Upload',
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

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SarathiResizerEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Cheatsheet Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  Official Parivahan Sarathi 4.0 Upload Rules
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for Learner Licence (LL / Form 2), Driving Licence (DL / Form 4), and DL Renewal (Form 9) applications on{' '}
                  <strong>sarathi.parivahan.gov.in</strong>.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Requirement</th>
                      <th className="p-3.5 text-primary">Applicant Photo</th>
                      <th className="p-3.5 text-primary">Applicant Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">Physical Dimensions</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        35 mm × 45 mm
                      </td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        20 mm × 50 mm
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Pixel Dimensions @ 300 DPI</td>
                      <td className="p-3.5 font-mono text-text-main">
                        413 × 531 pixels
                      </td>
                      <td className="p-3.5 font-mono text-text-main">
                        236 × 591 pixels
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">DPI Resolution</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">File Size Limit</td>
                      <td className="p-3.5 font-bold text-primary">Strictly 20 KB to 50 KB</td>
                      <td className="p-3.5 font-bold text-primary">Strictly 10 KB to 20 KB</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Allowed Format</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Background</td>
                      <td className="p-3.5">Plain white or light; no patterns</td>
                      <td className="p-3.5">White paper; dark blue/black ink</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Applicable Forms</td>
                      <td className="p-3.5">Form 2 (LL) / Form 4 (DL) / Form 9 (Renewal)</td>
                      <td className="p-3.5">Form 2 (LL) / Form 4 (DL) / Form 9 (Renewal)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-start gap-2 text-xs text-text-main/60 bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-700">Critical:</strong> The Sarathi signature window (10–20 KB) is exceptionally narrow. Standard compressors typically produce 7 KB (rejected: too small) or 22 KB (rejected: too large). Kagazo targets 12–18 KB using iterative binary-search JPEG quality adjustment.
                </span>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Format Sarathi DL Photo & Signature in 5 Steps
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
                  Common Sarathi Parivahan Errors and How Kagazo Fixes Them
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

            {/* Use Cases Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Who Uses the Sarathi Driving Licence Photo Resizer?
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'First-Time Learner Licence Applicants',
                    desc: 'Young applicants (18+) applying for their first Learner Licence (Form 2) at their local RTO via Sarathi Parivahan.',
                  },
                  {
                    title: 'Driving Licence (Form 4) Applicants',
                    desc: 'Learner licence holders who have passed the driving test and are upgrading to a full Driving Licence.',
                  },
                  {
                    title: 'DL Renewal Applicants (Form 9)',
                    desc: 'Drivers renewing their expired or near-expiry driving licences online to avoid a physical RTO visit.',
                  },
                  {
                    title: 'Transport Workers (Commercial Licence)',
                    desc: 'Auto-rickshaw, truck, and bus drivers applying for commercial Heavy Motor Vehicle (HMV) or Light Motor Vehicle (LMV) licences.',
                  },
                  {
                    title: 'CSC & Driving School Operators',
                    desc: 'Common Service Centres and driving schools processing Sarathi applications for their students in bulk.',
                  },
                  {
                    title: 'NRI / International Licence Converters',
                    desc: 'Non-resident Indians converting their foreign driving licence to an Indian DL upon return through the Sarathi portal.',
                  },
                ].map((uc) => (
                  <div key={uc.title} className="flex gap-3 p-3 rounded-2xl bg-surface border border-surface-darker/60">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-text-main">{uc.title}</p>
                      <p className="text-xs text-text-main/70 leading-relaxed mt-0.5">{uc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions — Sarathi Driving Licence Photo &amp; Signature
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about Sarathi Parivahan 4.0 photo and signature upload requirements.
                </p>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl bg-surface/50 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 font-bold text-text-main text-xs sm:text-sm cursor-pointer list-none select-none">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/40 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Privacy & Security Section */}
            <section className="bg-gradient-to-br from-emerald-50/60 to-slate-50 dark:from-slate-900 dark:to-slate-900 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/40 shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Privacy Architecture — Your DL Documents Never Leave Your Device
              </h2>
              <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                All processing — including photo crop, DPI header injection, ink contrast enhancement, and JPEG binary-search compression — executes{' '}
                <strong>100% inside your browser&apos;s volatile RAM</strong> using HTML5 Canvas and WebAssembly. Your driving licence application photos and signatures are never transmitted to any external server or stored in any database. The moment you close the tab, all image data is purged from memory.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-emerald-700">
                {[
                  '✓ Zero Server Upload',
                  '✓ No Account Required',
                  '✓ No Watermark',
                  '✓ No File Storage',
                  '✓ Sarathi 4.0 Verified',
                  '✓ Works on Mobile',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/pan-card-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PAN Card Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    213×213
                  </span>
                </Link>

                <Link
                  href="/tools/epfo-passbook-photo-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      EPFO Cheque Leaf
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    &lt;500 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Signature 20KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    20 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-50kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Photo 50KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    50 KB
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    300 DPI
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Biometrics and signatures are processed exclusively in client-side volatile RAM. Zero server uploads.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Sarathi 4.0 Verified
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI Embedded
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
