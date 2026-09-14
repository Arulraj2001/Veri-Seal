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
  PenTool,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
  Info,
  User,
  Calendar,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'TNPSC Photo & Signature Resizer — OTR Portal 2026 | Kagazo',
  description:
    'Resize your TNPSC Group 1, Group 2, Group 4, or VAO photo (20–50 KB) and signature (10–20 KB) with the mandatory name and date strip for the One Time Registration portal. Free, no upload.',
  alternates: {
    canonical: 'https://kagazo.in/tools/tnpsc-photo-signature-resizer',
  },
  openGraph: {
    title: 'TNPSC Photo & Signature Resizer — OTR Portal | Kagazo',
    description:
      'Format TNPSC photo with name and date-of-photo strip (20–50 KB) and signature (10–20 KB) for OTR registration. 100% in-browser, free.',
    url: 'https://kagazo.in/tools/tnpsc-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const TNPSC_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'TNPSC Photo (20–50 KB, 3.5×4.5 cm, Name & DOP Strip)',
    minKb: 20,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'TNPSC Signature (10–20 KB, 3.5×1.5 cm)',
    minKb: 10,
    maxKb: 20,
    widthCm: 3.5,
    heightCm: 1.5,
    isXerox: true,
  },
];

const TNPSC_FAQS = [
  {
    question: 'Does TNPSC require a Name and Date strip on the photo for OTR?',
    answer:
      'Yes. As per official Tamil Nadu Public Service Commission guidelines for One Time Registration (OTR), the candidate photograph must have a clear white rectangular strip at the bottom containing the candidate full name in capital letters (matching SSLC/10th marksheet) and the date on which the photograph was captured.',
  },
  {
    question: 'What are the exact photo and signature dimensions for TNPSC OTR?',
    answer:
      'For TNPSC One Time Registration and all recruitment examinations (Group 1, 2, 4, VAO): The photograph must have dimensions of 3.5 cm (width) x 4.5 cm (height) and file size strictly between 20 KB and 50 KB in JPG/JPEG format. The signature must have dimensions of 3.5 cm (width) x 1.5 cm (height) and file size strictly between 10 KB and 20 KB.',
  },
  {
    question: 'Why does the TNPSC OTR portal reject signatures with "File size less than 10 KB"?',
    answer:
      'When candidates crop a small 3.5cm x 1.5cm signature, ordinary image resizers compress the file down to 3–7 KB. The TNPSC OTR server immediately blocks files below 10.0 KB. Kagazo solves this by applying 300 DPI supersampling and safe JFIF padding to lock the output securely in the 12–18 KB safe band.',
  },
  {
    question: 'Should the name in the photo strip be in English or Tamil?',
    answer:
      'The name printed in the strip should be in English CAPITAL (BLOCK) letters, exactly matching the spelling, initials, and order on your 10th (SSLC) marksheet and your OTR profile. Any mismatch during certificate verification (CV) can cause administrative holds.',
  },
  {
    question: 'How recent must my TNPSC photograph be?',
    answer:
      'TNPSC mandates that the photograph must not be older than 3 months from the date of advertisement or OTR renewal. The date entered on the bottom strip must accurately reflect a date within this recent window.',
  },
  {
    question: 'Can I wear spectacles or caps in the TNPSC photograph?',
    answer:
      'No. Photographs wearing spectacles, reading glasses, caps, or dark sunglasses are strictly prohibited under TNPSC commission instructions. Both ears must be clearly visible against a white or very light background.',
  },
  {
    question: 'Can I sign in blue ink for TNPSC?',
    answer:
      'TNPSC guidelines accept dark blue or black ballpoint pen on plain white paper. However, black ballpoint ink provides superior contrast on scanners. Signatures must be in running handwriting, never in block letters.',
  },
  {
    question: 'Does this tool support all TNPSC exam categories?',
    answer:
      'Yes. The single photo and signature uploaded to your TNPSC OTR account applies to all recruitment drives including Group 1, Group 2/2A, Group 4, VAO, Combined Technical Services, and Departmental tests.',
  },
  {
    question: 'What is the file size limit for TNPSC certificate uploads?',
    answer:
      'For community certificates, SSLC marksheets, and PSTM certificates, the TNPSC portal requires single or merged PDF files with file size strictly between 100 KB and 200 KB.',
  },
  {
    question: 'Does Kagazo store my TNPSC photo or signature on servers?',
    answer:
      'No. All processing—including generating the name and date strip, cropping, and padding—takes place 100% client-side in your device RAM memory. No photo, signature, or personal identity data is ever transmitted to or stored on any server.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select TNPSC Mode",
    "desc": "Choose TNPSC Photo (20\u201350 KB, 3.5\u00d74.5 cm) or TNPSC Signature (10\u201320 KB)."
  },
  {
    "step": 2,
    "title": "Upload Asset Image",
    "desc": "Upload photo or signature in any image format."
  },
  {
    "step": 3,
    "title": "Add Name & Date Banner",
    "desc": "Type applicant name and photo date for the mandatory bottom banner."
  },
  {
    "step": 4,
    "title": "Enforce OTR Dimensions",
    "desc": "Calibrates photo to 200\u00d7230 px and signature to 130\u00d760 px at 300 DPI."
  },
  {
    "step": 5,
    "title": "Download ORA Ready JPEG",
    "desc": "Save verified JPEG ready for upload to tnpscexams.in."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Missing Name & Date Strip",
    "title": "TNPSC Mandates Name & DOP on Photo",
    "desc": "TNPSC requires applicant name and date of photo printed at bottom. Kagazo embeds this automatically."
  },
  {
    "badge": "Error: Signature Under 10 KB",
    "title": "TNPSC OTR Signature Under 10 KB Rejected",
    "desc": "Signature files under 10 KB are rejected by the portal script. Kagazo pads to safe 14 KB."
  },
  {
    "badge": "Error: Non-White Background",
    "title": "Background Color Disqualification",
    "desc": "TNPSC requires plain light white background with zero shadows behind ears."
  },
  {
    "badge": "Error: File Exceeds 50 KB",
    "title": "Photo Size Exceeds 50 KB Ceiling",
    "desc": "High-resolution smartphone cameras produce oversized files. Kagazo compresses to safe 35 KB."
  }
];

export default function TnpscPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'TNPSC Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/tnpsc-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize TNPSC photo (20–50 KB, 3.5x4.5 cm) with candidate name & DOP strip, and signature (10–20 KB, 3.5x1.5 cm) for TNPSC OTR portal.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for TNPSC OTR Online',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: TNPSC_FAQS.map((faq) => ({
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
            name: 'TNPSC Photo & Signature Resizer',
            item: 'https://kagazo.in/tools/tnpsc-photo-signature-resizer',
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
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'TNPSC Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>TNPSC OTR, Group 1, Group 2, Group 4 &amp; VAO Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TNPSC Photo &amp; Signature </span>
            <span className="text-primary">Resizer — OTR Portal (2026)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Format your TNPSC photo and signature for the Tamil Nadu Public Service Commission One Time Registration (OTR) portal — with the mandatory candidate name and date-of-photograph strip embedded directly in the image. Processed in-browser, zero server contact.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="TNPSC OTR"
              customPresets={TNPSC_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Tool Introduction & Key Differentiator */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mandatory Name &amp; Date Strip Generation
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  The TNPSC One Time Registration (OTR) Strip Rule Explained
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-text-main/85 leading-relaxed space-y-3">
                <p>
                  The Tamil Nadu Public Service Commission (<code className="font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">tnpsc.gov.in</code>) requires every applicant&apos;s OTR photograph to feature a <strong>clean white strip at the bottom displaying the candidate full name and photograph capture date</strong>. Uploading a standard passport photo without this strip causes OTR verification rejection.
                </p>
                <p>
                  Additionally, signatures uploaded to the OTR portal must measure 3.5×1.5 cm and fall strictly between 10 KB and 20 KB. Standard photo editors compress these tiny files to 3–6 KB, triggering immediate portal errors. Kagazo automatically adds the compliant name and date strip to photos, and pads signatures to safely land between 12 KB and 18 KB.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Name &amp; Date Strip
                  </span>
                  <p className="text-xs text-text-main/70">
                    Generates the white bottom strip with candidate name and date matching SSLC marksheet records.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 10 KB Floor Auto-Padding
                  </span>
                  <p className="text-xs text-text-main/70">
                    Prevents OTR rejection by guaranteeing your signature stays safely between 10 KB and 20 KB.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> 3-Month Freshness Check
                  </span>
                  <p className="text-xs text-text-main/70">
                    Prompts you to ensure your capture date complies with TNPSC&apos;s recent-photo mandate.
                  </p>
                </div>
              </div>
            </section>

            {/* Official TNPSC Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official TNPSC OTR Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict parameters drawn from TNPSC Commission notifications and OTR guidelines.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  TNPSC Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Parameter</th>
                      <th className="py-3 px-3 font-bold">TNPSC Scanned Photograph</th>
                      <th className="py-3 px-3 font-bold">TNPSC Scanned Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Applicable Exams</td>
                      <td className="py-3 px-3">Group 1, Group 2 &amp; 2A, Group 4, VAO, Combined Engineering, Forest Services</td>
                      <td className="py-3 px-3">Mandatory across all TNPSC OTR profiles</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">File Size Window</td>
                      <td className="py-3 px-3 font-bold text-primary">20.0 KB minimum — 50.0 KB maximum</td>
                      <td className="py-3 px-3 font-bold text-primary">10.0 KB minimum — 20.0 KB maximum</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Physical Dimensions</td>
                      <td className="py-3 px-3">3.5 cm (W) × 4.5 cm (H) (approx 413×531 px)</td>
                      <td className="py-3 px-3">3.5 cm (W) × 1.5 cm (H) (approx 413×177 px)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Name &amp; Date Strip</td>
                      <td className="py-3 px-3 font-semibold text-primary">Mandatory: Candidate name &amp; DOP printed at bottom</td>
                      <td className="py-3 px-3">Not applicable</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Permitted Format</td>
                      <td className="py-3 px-3 font-mono">JPG / JPEG only</td>
                      <td className="py-3 px-3 font-mono">JPG / JPEG only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Background &amp; Pen</td>
                      <td className="py-3 px-3">Plain white or very light background; no spectacles</td>
                      <td className="py-3 px-3">Clean white unruled paper; dark blue or black ballpoint ink</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Notice:</strong> Ensure the name spelled on the photo strip matches your 10th (SSLC) marksheet exactly. Need OTR-compliant certificate preparation? Try our{' '}
                  <Link href="/tools/tnpsc-otr-compliance-kit" className="underline font-bold text-amber-950 hover:text-primary">
                    TNPSC OTR Compliance Kit
                  </Link>.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Format TNPSC Photo & Signature in 5 Steps
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
                  Common TNPSC OTR Errors and How Kagazo Fixes Them
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

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (TNPSC Photo &amp; Signature)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear, verified answers covering TNPSC OTR registration, Group 4, Group 2, and Group 1 applications.
                </p>
              </div>

              <div className="space-y-3">
                {TNPSC_FAQS.map((faq, idx) => (
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
          </main>

          {/* Sticky Right Sidebar Rail (32% Width) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Exam Resizers
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/tnpsc-otr-compliance-kit"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      TNPSC OTR Kit
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      All-in-one OTR suite
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/photo-date-name-stamper"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Photo Name &amp; Date Stamper
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Custom banner strip tool
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      SSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/specifications"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Exam Specs Radar
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compare TNPSC, SSC, UPSC
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* RAM Security & Privacy Shield */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your photograph, signature, and candidate name are rendered exclusively in your browser memory. Nothing is ever saved to disk or transmitted to our servers.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No Signup
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/tnpsc-photo-signature-resizer" />
      </div>
    </div>
  );
}
