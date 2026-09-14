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
  Image as ImageIcon,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'NEET Photo, 4x6 Postcard & Signature Resizer — NTA 2026 | Kagazo',
  description:
    'Resize all NEET UG uploads: 4x6 inch postcard photo (50–300 KB), passport photo (10–50 KB), signature (4–30 KB), and left thumb impression. NTA compliant, zero watermark.',
  alternates: {
    canonical: 'https://kagazo.in/tools/neet-photo-signature-resizer',
  },
  openGraph: {
    title: 'NEET UG Photo, 4x6 Postcard & Signature Resizer | Kagazo',
    description:
      'Prepare 4x6 postcard photo (50–300 KB), passport photo, running signature, and thumb impression to exact NTA NEET UG specifications. Free, in-browser.',
    url: 'https://kagazo.in/tools/neet-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const NEET_PRESETS: CustomPreset[] = [
  {
    id: 'postcard',
    label: 'Postcard Photo (4"×6", 50–300 KB)',
    minKb: 50,
    maxKb: 300,
    widthCm: 10.16,
    heightCm: 15.24,
    isPhoto: true,
  },
  {
    id: 'passport_photo',
    label: 'Passport Photo (3.5×4.5 cm, 10–50 KB)',
    minKb: 10,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'Running Signature (4–30 KB)',
    minKb: 4,
    maxKb: 30,
    widthCm: 3.5,
    heightCm: 1.5,
    isXerox: true,
  },
  {
    id: 'fingers_thumbs',
    label: 'Left Thumb Impression (10–50 KB)',
    minKb: 10,
    maxKb: 50,
    widthCm: 6.0,
    heightCm: 4.0,
    isXerox: true,
  },
];

const NEET_FAQS = [
  {
    question: 'What is the exact Postcard Size Photo required for NEET UG?',
    answer:
      'The National Testing Agency (NTA) mandates a 4" × 6" (10.16 cm × 15.24 cm) Postcard size photograph for NEET UG. The scanned file must be in JPG/JPEG format between 50 KB and 300 KB, with a plain white background and at least 80% facial coverage showing both ears. Candidate name and date of taking photo (DOP) are typically printed on the bottom strip.',
  },
  {
    question: 'What are the three mandatory image uploads for NTA NEET UG?',
    answer:
      'NEET UG requires three separate image uploads on the official portal: (1) Postcard photograph (4x6 inch, 50–300 KB), (2) Standard passport photo (3.5x4.5 cm, 10–50 KB or 10–200 KB per bulletin year), and (3) Left Thumb Impression / 10-finger impressions (10–50 KB), alongside the scanned signature (4–30 KB).',
  },
  {
    question: 'Why do signatures get rejected in NEET applications?',
    answer:
      'NTA rules strictly forbid signatures signed in CAPITAL (BLOCK) letters. The signature must be in your natural running cursive handwriting in black ink on unruled white paper, with file size between 4 KB and 30 KB. Submitting initials only or capital letters will lead to application rejection.',
  },
  {
    question: 'Is the printed postcard photo required at the NEET exam center?',
    answer:
      'Yes. Candidates must carry a physical 4"×6" print of the exact same postcard photograph pasted on the designated attendance sheet proforma in the examination hall. The candidate name and father name are written on the back of the physical photograph.',
  },
  {
    question: 'Can I upload my passport photo into the postcard photo slot?',
    answer:
      'No. The postcard photo has a distinct 4:6 (2:3 aspect ratio) print size and a 50–300 KB range, whereas the passport photo is 3.5×4.5 cm. Uploading a small passport photo into the postcard slot will be flagged as mismatched during center biometric verification.',
  },
  {
    question: 'What if my Left Thumb Impression file size is below 10 KB?',
    answer:
      'The NTA online portal rejects LTI files under 10.0 KB. If your cropped thumb scan is too small, Kagazo applies contrast enhancement and safe JFIF padding to bring the file into the compliant 15–35 KB range.',
  },
  {
    question: 'Can I wear spectacles or caps in my NEET photo?',
    answer:
      'No. NTA NEET guidelines strictly prohibit spectacles, tinted glasses, sunglasses, and caps. Both ears and the forehead must be completely uncovered and visible against a plain white background.',
  },
  {
    question: 'What ink color should be used for the NEET thumb impression?',
    answer:
      'NTA recommends blue or black ink stamp pads on clean unruled white paper. The impression should be rolled smoothly from side to side so finger ridge lines are sharp and smudge-free.',
  },
  {
    question: 'Does NEET require candidate name and date on the photo digitally?',
    answer:
      'Yes. As per NTA bulletin guidelines, candidate name in capital letters and the date on which the photograph was taken (e.g. 01/09/2026) must appear on a white strip at the bottom of both the passport and postcard photographs.',
  },
  {
    question: 'Does Kagazo store biometric thumb impressions or photos on servers?',
    answer:
      'No. Thumb impressions and passport photos are sensitive biometric data. All image cropping, contrast enhancement, and compression occur 100% inside your browser using HTML5 Canvas in volatile RAM memory. Nothing is ever sent to any server.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Choose NEET Mode",
    "desc": "Select NEET Passport (10\u2013200 KB) or 4x6\" Postcard (10\u2013200 KB, 4\u00d76 inch)."
  },
  {
    "step": 2,
    "title": "Upload Candidate Portrait",
    "desc": "Upload camera photo; white background with 80% face coverage required."
  },
  {
    "step": 3,
    "title": "Add Mandatory Name & DOP",
    "desc": "Type applicant name and date of photo; Kagazo embeds required bottom strip."
  },
  {
    "step": 4,
    "title": "Auto Size & DPI Scaling",
    "desc": "Scales image to 300 DPI print quality while keeping file size under 200 KB."
  },
  {
    "step": 5,
    "title": "Download NTA Compliant JPEG",
    "desc": "Save verified JPEG ready for submission on exams.nta.ac.in/NEET."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Missing Name & Date Strip",
    "title": "NTA Rejection: Photo Lacks Name & DOP",
    "desc": "NEET UG strictly mandates applicant name and date of photo printed at the bottom."
  },
  {
    "badge": "Error: Face Coverage Under 80%",
    "title": "Face Too Small on Canvas",
    "desc": "NTA requires 80% face coverage showing ears against a white background. Kagazo enforces exact framing."
  },
  {
    "badge": "Error: Postcard Aspect Ratio Mismatch",
    "title": "Postcard Not 4x6 Inches Ratio",
    "desc": "Admit card requires a 4\u00d76 inch postcard photo pasted on the attendance sheet."
  },
  {
    "badge": "Error: File Exceeds 200 KB",
    "title": "NTA Portal Upload Blocked",
    "desc": "High-resolution phone cameras produce 5 MB JPEGs. Kagazo compresses to under 200 KB."
  }
];

export default function NeetPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'NEET Photo, Postcard & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/neet-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Format all mandatory NTA NEET UG application uploads — 4x6 inch postcard photo, passport-size photo, running signature, and left thumb impression — to exact NTA specifications.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize NEET Postcard Photo, Passport Photo & LTI Online',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: NEET_FAQS.map((faq) => ({
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
            name: 'NEET Photo, Postcard & Signature Resizer',
            item: 'https://kagazo.in/tools/neet-photo-signature-resizer',
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
            { label: 'NEET Postcard & Photo Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>NTA NEET UG 2026 Official Specifications</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>NTA NEET UG Photo Resizer 2026 — </span>
            <span className="text-primary">Postcard (4×6&quot;), Passport &amp; LTI</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Prepare all mandatory NTA NEET UG photo uploads in one place: the 4×6 inch postcard photograph (50–300 KB), the standard passport-size photo (10–50 KB), running signature (4–30 KB), and left thumb impression (10–50 KB). Processed entirely in your browser with zero server contact.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="postcard"
              examName="NTA NEET"
              customPresets={NEET_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Tool Introduction & Key Differentiators */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  All 4 Mandatory NEET Uploads in One Tool
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Understanding the NEET 4×6&quot; Postcard Photo &amp; Biometric LTI Uploads
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-text-main/85 leading-relaxed space-y-3">
                <p>
                  NTA NEET UG is unique among national entrance exams in requiring candidates to upload both a standard <strong>passport photo</strong> and a large <strong>4×6 inch Postcard photograph (50–300 KB)</strong>, alongside a <strong>Left Thumb Impression (LTI)</strong>. The postcard photo uploaded online is printed and carried to the exam center to be pasted on the attendance sheet.
                </p>
                <p>
                  Uploading a normal passport photo into the postcard slot causes biometric mismatch at the center, while faint thumb impressions fail NTA&apos;s automated image quality filters. Kagazo provides distinct presets for each asset with contrast optimization, guaranteeing zero rejection on the NTA portal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" /> 4×6&quot; Postcard Sizing
                  </span>
                  <p className="text-xs text-text-main/70">
                    Enforces 50–300 KB and print-resolution 4:6 aspect ratio for the mandatory NTA proforma photo.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> LTI Ridge Enhancer
                  </span>
                  <p className="text-xs text-text-main/70">
                    Boosts thumb impression ink contrast and pads scans above the 10 KB lower rejection floor.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <PenTool className="w-4 h-4" /> Cursive Signature Lock
                  </span>
                  <p className="text-xs text-text-main/70">
                    Frames signatures within the strict 4–30 KB range with running handwriting protection.
                  </p>
                </div>
              </div>
            </section>

            {/* Official NTA NEET Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official NTA NEET UG Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Exact requirements sourced from the official NTA NEET UG Information Bulletin.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  NTA Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Document</th>
                      <th className="py-3 px-3 font-bold">Physical Dimensions</th>
                      <th className="py-3 px-3 font-bold">Allowed Size Range</th>
                      <th className="py-3 px-3 font-bold">Format &amp; Critical Rules</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Postcard Photo</td>
                      <td className="py-3 px-3">4&quot; × 6&quot; (10.16 × 15.24 cm)</td>
                      <td className="py-3 px-3 font-bold text-primary">50 KB to 300 KB</td>
                      <td className="py-3 px-3">JPG/JPEG; 80% face coverage; white bg; Name &amp; DOP strip</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Passport Photo</td>
                      <td className="py-3 px-3">3.5 cm × 4.5 cm</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 50 KB (or 200 KB)</td>
                      <td className="py-3 px-3">JPG/JPEG; white bg; ears visible; no spectacles/caps</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Running Signature</td>
                      <td className="py-3 px-3">3.5 cm × 1.5 cm</td>
                      <td className="py-3 px-3 font-bold text-primary">4 KB to 30 KB</td>
                      <td className="py-3 px-3">Black ink on white paper; running handwriting only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Left Thumb Impression</td>
                      <td className="py-3 px-3">Plain white paper scan</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 50 KB</td>
                      <td className="py-3 px-3">Blue/black stamp ink; clear ridge lines; unsmudged</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Note:</strong> NTA updates the NEET UG information bulletin annually. Always cross-check with the official PDF on <code className="font-mono font-bold">exams.nta.ac.in/NEET</code>. Need a custom name and date strip? Use our{' '}
                  <Link href="/tools/photo-date-name-stamper" className="underline font-bold text-amber-950 hover:text-primary">
                    Photo Name &amp; Date Stamper
                  </Link>.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Format NEET Postcard & Passport Photo in 5 Steps
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
                  Common NEET Photo Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (NTA NEET UG Uploads)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear, verified answers covering postcard photos, passport sizing, signatures, and LTI.
                </p>
              </div>

              <div className="space-y-3">
                {NEET_FAQS.map((faq, idx) => (
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
                  href="/tools/thumb-impression-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Thumb Impression Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Dedicated LTI &amp; ridge sharpener
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
                      Add Name &amp; DOP strip
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/ibps-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      IBPS &amp; Bank Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Photo, signature &amp; declaration
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-image-to-50kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Image to 50KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Instant passport photo tool
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
                <span>100% Client-Side Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Biometric thumb impressions and photos are processed in temporary browser memory and wiped clean on tab close. Never uploaded to remote servers.
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
        <RelatedTools currentSlug="/tools/neet-photo-signature-resizer" />
      </div>
    </div>
  );
}
