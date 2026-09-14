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
  Calendar,
  User,
  Info,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'UPSC Photo & Signature Resizer — ORA Portal 2026 | Kagazo',
  description:
    'Resize your UPSC CSE, NDA, CDS, and IES exam photo (300 KB, 350–1000 px) and signature (300 KB, JPEG) with auto name & date-of-photo banner. Free, no upload, instant.',
  alternates: {
    canonical: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
  },
  openGraph: {
    title: 'UPSC ORA Photo & Signature Resizer | Kagazo — Free, No Upload',
    description:
      'Format UPSC photo and signature to exact ORA specifications. Auto embeds candidate name and date-of-photograph banner. 100% in-browser, no server.',
    url: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const UPSC_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'UPSC Photo (20–300 KB, 500×500 px)',
    minKb: 20,
    maxKb: 300,
    widthPx: 500,
    heightPx: 500,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'UPSC Signature (20–300 KB, 500×500 px)',
    minKb: 20,
    maxKb: 300,
    widthPx: 500,
    heightPx: 500,
    isXerox: true,
  },
];

const UPSC_FAQS = [
  {
    question: 'Does UPSC still require the name and date banner on the photo in 2026?',
    answer:
      'Yes, for most UPSC Online Recruitment Application (ORA) based examinations (CSE, NDA, CDS, CMS, and CAPF). The applicant full name and the exact date the photograph was captured must be printed in white text on a black banner strip at the bottom of the photograph. This must be physically embedded into the JPEG pixels, not typed into a form text box.',
  },
  {
    question: 'What is the official UPSC 10-Day Photograph Freshness Rule?',
    answer:
      'UPSC mandates that the photograph must not be older than 10 days from the date of online application opening or submission. The date printed on the bottom banner must reflect a date within this 10-day freshness window. If you apply on March 15, the banner date must be March 5 or later.',
  },
  {
    question: 'What size and pixel dimensions are required for UPSC photos and signatures?',
    answer:
      'Both photograph and signature must have pixel dimensions between 350 × 350 pixels (minimum) and 1000 × 1000 pixels (maximum) in a square 1:1 aspect ratio. The file size must be strictly below 300 KB (and at least 20 KB) in JPG/JPEG format.',
  },
  {
    question: 'Why does UPSC ORA show "Resolution less than 350x350" error?',
    answer:
      'Many basic photo resizers shrink pixel dimensions drastically to achieve small file sizes, dropping the resolution below 350×350 px. The UPSC ORA validation script immediately halts the upload. Kagazo locks your output to a high-resolution 500×500 pixel square canvas while keeping the file size safely between 40 KB and 150 KB.',
  },
  {
    question: 'Can I use a normal passport studio photo without a name/date strip?',
    answer:
      'Standard studio photos do not include the name and date strip unless you explicitly ask for it. Uploading a photo without the embedded strip can result in cancellation during document scrutiny or at the interview stage at Dholpur House. Kagazo embeds this required banner automatically.',
  },
  {
    question: 'Can I wear spectacles or dark glasses in the UPSC photograph?',
    answer:
      'No. UPSC guidelines prohibit spectacles, tinted lenses, and dark sunglasses. Lenses cause camera flash glare and reflections that hinder automated facial recognition systems used during examination center verification.',
  },
  {
    question: 'What background color is mandatory for UPSC photos?',
    answer:
      'The background must be plain white or a very light solid tone. Dark, colorful, textured, or outdoor background photographs are strictly prohibited by UPSC.',
  },
  {
    question: 'How should I format the signature for UPSC?',
    answer:
      'Sign in black or dark blue ink on clean, unruled white paper. Keep your signature in natural running cursive handwriting. Do not sign in BLOCK / CAPITAL letters. Kagazo scales the signature onto a 1:1 square canvas above 350×350 px to comply with the ORA upload validator.',
  },
  {
    question: 'Does Kagazo transmit my photo, name, or date to any server?',
    answer:
      'No. All processing—including facial cropping, canvas padding, banner rendering, and JPEG compression—happens 100% client-side inside your browser memory using HTML5 Canvas. No document or personal detail is ever sent to our servers.',
  },
  {
    question: 'What are the rules for PDF documents on the UPSC portal?',
    answer:
      'UPSC ORA requires educational certificates, caste/EWS certificates, and age proof documents to be uploaded in PDF format with file size strictly under 300 KB per document.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Choose Photo or Signature",
    "desc": "Select UPSC Photo (350\u20131000 px, max 300 KB) or UPSC Signature preset."
  },
  {
    "step": 2,
    "title": "Upload Image File",
    "desc": "Select portrait photo or signature scan; all image formats supported."
  },
  {
    "step": 3,
    "title": "Add Name & Date Banner",
    "desc": "Type candidate name and date photo was taken; Kagazo renders official white-on-black strip."
  },
  {
    "step": 4,
    "title": "Auto Aspect Ratio Lock",
    "desc": "Locks 1:1 square ratio for photos and standard 3:1 ratio for signatures."
  },
  {
    "step": 5,
    "title": "Download ORA Ready JPEG",
    "desc": "Download compliant JPEG verified strictly under 300 KB for the UPSC ORA portal."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Missing Name & DOP Banner",
    "title": "No Name and Date Printed on Photo",
    "desc": "UPSC ORA requires candidate name and date embedded in the JPEG. Kagazo renders this automatically."
  },
  {
    "badge": "Error: File Exceeds 300 KB",
    "title": "File Size Exceeds Maximum Limit",
    "desc": "High-resolution smartphone photos exceed 300 KB. Kagazo compresses to a safe 180\u2013240 KB window."
  },
  {
    "badge": "Error: Non-Square Photo Dimensions",
    "title": "Aspect Ratio Mismatch in ORA Portal",
    "desc": "UPSC mandates 1:1 square dimensions between 350x350 and 1000x1000 px. Kagazo enforces square cropping."
  },
  {
    "badge": "Error: Illegible Signature Stroke",
    "title": "Faint Pencil or Gel Pen Scans",
    "desc": "UPSC requires clear black ink. Kagazo's Xerox filter enhances stroke contrast."
  }
];

export default function UpscPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'UPSC Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Prepare your UPSC Civil Services, NDA, CDS, CAPF, and IES exam photo and signature for the Online Recruitment Application (ORA) portal with auto name and date-of-photograph banner.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for UPSC ORA Online',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: UPSC_FAQS.map((faq) => ({
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
            name: 'UPSC Photo & Signature Resizer',
            item: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
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
            { label: 'UPSC Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>UPSC CSE, NDA, CDS &amp; OTR Portal Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>UPSC Photo &amp; Signature </span>
            <span className="text-primary">Resizer — ORA Portal Guidelines (2026)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Prepare your UPSC Civil Services, NDA, CDS, CAPF, and IES exam photo and signature for the Online Recruitment Application (ORA) portal — with automatic name and date-of-photograph banner. Everything processed inside your browser, zero server contact.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="UPSC OTR"
              customPresets={UPSC_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Tool Introduction & Key Differentiators */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Embedded Name &amp; Date-of-Photo Banner
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  The UPSC 10-Day Rule and the Embedded Banner Strip Requirement
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-text-main/85 leading-relaxed space-y-3">
                <p>
                  The Union Public Service Commission (<code className="font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">upsconline.nic.in</code>) portal performs one verification check that catches thousands of candidates off guard: it requires the candidate&apos;s <strong>full name and the date the photograph was captured to be printed in white text on a black banner strip</strong> directly below the face, physically embedded into the JPEG image file itself.
                </p>
                <p>
                  A standard neighborhood photo studio rarely knows this specific rule. Generic compressors and online cropping tools cannot generate the banner strip. Kagazo renders this compliant banner strip automatically. You simply type your name and capture date—our engine positions the strip cleanly at the bottom without squishing your face or exceeding the 300 KB ceiling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Name &amp; DOP Banner
                  </span>
                  <p className="text-xs text-text-main/70">
                    Embeds the official high-contrast white-on-black strip directly into the photo pixels.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Strict 1:1 Square Lock
                  </span>
                  <p className="text-xs text-text-main/70">
                    Enforces 350×350 to 1000×1000 px resolution, fully preventing ORA portal dimension errors.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> 10-Day Freshness Check
                  </span>
                  <p className="text-xs text-text-main/70">
                    Prompts you to ensure the banner date falls strictly within 10 days of your application date.
                  </p>
                </div>
              </div>
            </section>

            {/* Official UPSC Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official UPSC ORA Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict parameters drawn from Union Public Service Commission CSE, NDA, and CDS notifications.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  UPSC ORA Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Parameter</th>
                      <th className="py-3 px-3 font-bold">UPSC Scanned Photograph</th>
                      <th className="py-3 px-3 font-bold">UPSC Scanned Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Applicable Exams</td>
                      <td className="py-3 px-3">CSE (IAS/IPS/IFS), NDA &amp; NA, CDS, CAPF (AC), IES/ISS, EPFO</td>
                      <td className="py-3 px-3">Mandatory across all UPSC recruitment and OTR examinations</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Allowed File Size</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 300 KB (strictly &lt; 300 KB)</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 300 KB (strictly &lt; 300 KB)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Pixel Dimensions</td>
                      <td className="py-3 px-3">Min 350×350 px — Max 1000×1000 px (1:1 square)</td>
                      <td className="py-3 px-3">Min 350×350 px (or proportional square canvas)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">File Format</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">JPG / JPEG only</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">JPG / JPEG only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Name &amp; Date Banner</td>
                      <td className="py-3 px-3 font-semibold text-primary">Mandatory: Candidate name &amp; DOP printed at bottom</td>
                      <td className="py-3 px-3">Not applicable</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Date Freshness</td>
                      <td className="py-3 px-3">Captured within 10 days of application opening date</td>
                      <td className="py-3 px-3">—</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Background &amp; Pen</td>
                      <td className="py-3 px-3">Plain white or very light background; 75% face coverage</td>
                      <td className="py-3 px-3">Clean white paper, black or dark blue ballpoint ink, running cursive</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Spectacles / Glasses</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Strictly prohibited (no clear or power glasses)</td>
                      <td className="py-3 px-3">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Note:</strong> UPSC modifies guidelines periodically across notifications. The 10-day photograph freshness rule is strictly enforced during physical verification at Dholpur House. Always verify active guidelines on <code className="font-mono font-bold">upsconline.nic.in</code>. Need to change image metadata? Try{' '}
                  <Link href="/tools/change-image-dpi" className="underline font-bold text-amber-950 hover:text-primary">
                    Change Image DPI to 300
                  </Link>.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Format UPSC Photo & Signature in 5 Steps
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
                  Common UPSC ORA Upload Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (UPSC Photo &amp; Signature)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Answers to the most critical photo, signature, and ORA portal questions for UPSC aspirants.
                </p>
              </div>

              <div className="space-y-3">
                {UPSC_FAQS.map((faq, idx) => (
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
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      SSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB photo &amp; 10–20 KB signature
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
                      Custom banner strip generator
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/upsc-pdf-compressor"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      UPSC PDF Compressor
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compress marksheets &lt; 300 KB
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
                      Compare SSC, UPSC, RRB, NEET
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
                Your photograph, signature, and candidate name are processed purely in temporary browser memory. Never uploaded to cloud servers or stored in any database.
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
        <RelatedTools currentSlug="/tools/upsc-photo-signature-resizer" />
      </div>
    </div>
  );
}
