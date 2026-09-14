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
  Ratio,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'GATE & JAM Photo & Signature Resizer — GOAPS 2026 | Kagazo',
  description:
    'Resize GATE and JAM photo (3.5x4.5 cm, 5–200 KB) and signature (strict 3.15–3.95 aspect ratio, 5–100 KB) to IIT GOAPS portal specifications. No upload, instant.',
  alternates: {
    canonical: 'https://kagazo.in/tools/gate-photo-signature-resizer',
  },
  openGraph: {
    title: 'GATE & JAM Photo & Signature Resizer | Kagazo — Free, No Upload',
    description:
      'Format GATE 2026 & IIT JAM photo and signature. Solves GOAPS automated face-ratio (3.15–3.95 cm) and signature aspect-ratio errors. 100% in-browser.',
    url: 'https://kagazo.in/tools/gate-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const GATE_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'GATE Photo (5–200 KB, 3.5×4.5 cm, 70–85% Face)',
    minKb: 5,
    maxKb: 200,
    widthPx: 480,
    heightPx: 640,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'GATE Signature (5–100 KB, 3.55:1 Ratio Lock)',
    minKb: 5,
    maxKb: 100,
    widthPx: 532,
    heightPx: 150,
    isXerox: true,
  },
];

const GATE_FAQS = [
  {
    question: 'Why does IIT GOAPS show the error: "Aspect ratio of signature not between 3.15 and 3.95"?',
    answer:
      'The IIT GATE Online Application Processing System (GOAPS) runs an automated mathematical algorithm on uploaded signatures: Width divided by Height must strictly fall between 3.15 and 3.95. If you upload a square or standard 2:1 signature, GOAPS automatically halts the upload. Kagazo centers your signature on a calibrated 3.55:1 canvas, guaranteeing zero rejection.',
  },
  {
    question: 'What is the mandatory face-to-height ratio requirement for GATE GOAPS photos?',
    answer:
      'GOAPS requires that the height of the candidate face (from the chin to the crown/top of the head) must measure between 3.15 cm and 3.95 cm within the 3.5 cm x 4.5 cm frame (occupying roughly 70% to 88% of the total photo height). This ensures the automated facial biometric recognition algorithm at test centers can locate facial landmarks reliably.',
  },
  {
    question: 'Can I wear glasses or spectacles in my GATE 2026 photograph?',
    answer:
      'No. Recent GATE notifications strictly prohibit spectacles, tinted glasses, or prescription power lenses. The GOAPS validation script incorporates automated spectacle detection. Photos with glasses are flagged and rejected. Always photograph yourself without glasses.',
  },
  {
    question: 'What are the official file size limits for GATE and JAM on GOAPS?',
    answer:
      'The photograph file size must be between 5 KB and 200 KB (some organizing IITs allow up to 500 KB; 5–200 KB is universally accepted across all cycles). The signature must be between 5 KB and 100 KB in JPG/JPEG format only.',
  },
  {
    question: 'What ink color and background paper are required for the GATE signature?',
    answer:
      'Signatures must be made in black or dark blue ink within a clean rectangular box on plain unruled white paper. Avoid gel pens that reflect camera glare, pencil signatures, or lined paper. Kagazo provides our Xerox filter to boost ink contrast to deep black.',
  },
  {
    question: 'Is the IIT JAM photo requirement identical to GATE?',
    answer:
      'Yes. IIT Joint Admission test for Masters (JAM) uses the exact same GOAPS portal infrastructure, requiring the 3.5×4.5 cm photo with 70–88% face height coverage and the mathematical 3.15–3.95 signature aspect ratio.',
  },
  {
    question: 'Why does my studio passport photo get rejected on GOAPS?',
    answer:
      'Standard commercial studio photos usually crop faces to occupy only 50–60% of the frame with large chest margins. When uploaded to GOAPS, the automated face detector fails with "Face not detected" because the face is smaller than 3.15 cm. Kagazo frames the face tightly to satisfy the 70–88% constraint.',
  },
  {
    question: 'Does GOAPS accept PNG or WEBP image formats?',
    answer:
      'No. The GOAPS server only accepts genuine standard baseline JPEG binaries. Kagazo encodes all output images as standard compliant JPEGs with 300 DPI metadata.',
  },
  {
    question: 'What if the GOAPS organizing IIT changes this year?',
    answer:
      'While the organizing IIT rotates annually among IISc Bangalore, IIT Kharagpur, IIT Roorkee, IIT Kanpur, IIT Madras, IIT Bombay, and IIT Delhi, the core GOAPS software engine enforcing the 3.15–3.95 ratio and 3.5×4.5 cm format remains standardized.',
  },
  {
    question: 'Does Kagazo store or inspect my GATE photo?',
    answer:
      'No. Image scaling, ratio calculation, and JPEG encoding execute 100% in your local browser memory using HTML5 Canvas. Your biometric documents are never uploaded to any cloud server.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select GATE Preset",
    "desc": "Choose GATE Photo (5\u2013200 KB, 480\u00d7640 px) or GATE Signature (5\u2013200 KB, 160\u00d7560 px)."
  },
  {
    "step": 2,
    "title": "Upload Scanned File",
    "desc": "Select passport photo or black ink signature scan in any image format."
  },
  {
    "step": 3,
    "title": "Verify 60%\u201370% Face Coverage",
    "desc": "Position crown and chin inside GOAPS biometric guide lines."
  },
  {
    "step": 4,
    "title": "Auto Aspect Ratio Lock",
    "desc": "Locks 3.5:4.5 aspect ratio for photo and 3.5:1 ratio for signature."
  },
  {
    "step": 5,
    "title": "Download GOAPS Compliant JPEG",
    "desc": "Save verified JPEG file ready for instant upload to IIT GOAPS servers."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: GOAPS Resolution Mismatch",
    "title": "Dimensions Outside 480x640 Window",
    "desc": "GOAPS automated validator checks exact pixel ratios. Kagazo locks compliant dimensions."
  },
  {
    "badge": "Error: Blue Ink Signature Used",
    "title": "GATE Mandates Black Ink Signatures Only",
    "desc": "IIT organizers strictly reject blue ink signatures. Kagazo binarizes ink to pure black."
  },
  {
    "badge": "Error: File Exceeds 200 KB",
    "title": "GOAPS Upload Error: File Too Large",
    "desc": "High-resolution scans exceed 200 KB. Kagazo compresses cleanly into the 50\u2013150 KB sweet spot."
  },
  {
    "badge": "Error: Shadow Behind Ears",
    "title": "Uneven Lighting on Background",
    "desc": "Flash shadows cause GOAPS scrutinizer rejection. Kagazo whitens the background canvas."
  }
];

export default function GatePhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'GATE & JAM Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/gate-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Format your IIT GATE and JAM application photo and signature to exact GOAPS automated-validation specifications — 3.5x4.5 cm photo, strictly enforced 3.15 to 3.95 signature aspect ratio, 5–200 KB.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Format GATE & JAM Photos for GOAPS Online',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: GATE_FAQS.map((faq) => ({
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
            name: 'GATE & JAM Photo & Signature Resizer',
            item: 'https://kagazo.in/tools/gate-photo-signature-resizer',
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
            { label: 'GATE & JAM IIT GOAPS Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>IIT GATE 2026 &amp; IIT JAM GOAPS Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>GATE &amp; IIT JAM Photo Resizer </span>
            <span className="text-primary">— GOAPS Portal (2026 Guidelines)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Format your GATE 2026 or IIT JAM photo and signature for the GOAPS portal. Enforces the mandatory face-to-image height ratio (3.15–3.95 cm) and 3.15 to 3.95 signature aspect ratio that cause automatic rejection when violated.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="IIT GATE / JAM"
              customPresets={GATE_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Tool Introduction & Key Differentiator */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  GOAPS Algorithmic Ratio Enforcement
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  The GOAPS Automated Face-Height &amp; Signature Ratio Checks
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-text-main/85 leading-relaxed space-y-3">
                <p>
                  GATE and IIT JAM enforce two technical image constraints unique to the Graduate Online Application Processing System (GOAPS). First, the <strong>face height must measure between 3.15 cm and 3.95 cm</strong> within a 3.5×4.5 cm photo (70% to 88% face coverage). Photos where the face is too small fail the portal&apos;s automated face-detection scan on upload.
                </p>
                <p>
                  Second, the signature&apos;s width divided by its height must strictly calculate between <strong>3.15 and 3.95</strong>. If you upload a signature with a common 2:1 ratio, GOAPS blocks the upload with an aspect ratio error. Kagazo locks both the 70–88% face framing and the 3.55:1 signature canvas automatically.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Ratio className="w-4 h-4" /> 3.15–3.95 Ratio Lock
                  </span>
                  <p className="text-xs text-text-main/70">
                    Mathematically ensures signature width-to-height ratio lands at 3.55:1, avoiding algorithmic rejection.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Camera className="w-4 h-4" /> 70–88% Face Coverage
                  </span>
                  <p className="text-xs text-text-main/70">
                    Frames chin-to-crown distance within 3.15–3.95 cm for flawless GOAPS automated facial detection.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Spectacles Warning
                  </span>
                  <p className="text-xs text-text-main/70">
                    Highlights GOAPS strict ban on glasses and tinted spectacles to prevent document disqualification.
                  </p>
                </div>
              </div>
            </section>

            {/* Official GATE GOAPS Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official GATE &amp; JAM GOAPS Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Standards drawn from official IIT GATE Information Bulletins.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  GOAPS Norms
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Parameter</th>
                      <th className="py-3 px-3 font-bold">GOAPS Candidate Photograph</th>
                      <th className="py-3 px-3 font-bold">GOAPS Candidate Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Applicable Exams</td>
                      <td className="py-3 px-3">GATE (all 30 papers across IITs/IISc), IIT JAM (M.Sc/Ph.D)</td>
                      <td className="py-3 px-3">Mandatory across all GOAPS applications</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Allowed File Size</td>
                      <td className="py-3 px-3 font-bold text-primary">5 KB to 200 KB (up to 500 KB on some portals)</td>
                      <td className="py-3 px-3 font-bold text-primary">5 KB to 100 KB</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Dimensions / Ratio</td>
                      <td className="py-3 px-3">3.5 cm (W) × 4.5 cm (H) (approx 480×640 px)</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">Strict 3.15 to 3.95 Width:Height Ratio</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Face Height Rule</td>
                      <td className="py-3 px-3 font-semibold text-primary">Face height 3.15 cm to 3.95 cm (70%–88% coverage)</td>
                      <td className="py-3 px-3">Not applicable</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">File Format</td>
                      <td className="py-3 px-3 font-mono">JPG / JPEG only</td>
                      <td className="py-3 px-3 font-mono">JPG / JPEG only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Spectacles Policy</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Strictly prohibited (no clear or power glasses)</td>
                      <td className="py-3 px-3">—</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Background &amp; Ink</td>
                      <td className="py-3 px-3">Uniform white or light background</td>
                      <td className="py-3 px-3">Dark blue or black ink on unruled white paper</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Note:</strong> GATE is organized by rotating IITs (IISc, IIT Kharagpur, IIT Roorkee, etc.). While organizing IITs change annually, the GOAPS automated face-detection check remains active. Compare specs across exams on our{' '}
                  <Link href="/tools/specifications" className="underline font-bold text-amber-950 hover:text-primary">
                    Exam Specifications Radar
                  </Link>.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Format GATE & JAM GOAPS Photo in 5 Steps
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
                  Common GATE GOAPS Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (IIT GATE &amp; JAM GOAPS)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Technical answers for engineering and science graduates preparing for GATE and JAM registration.
                </p>
              </div>

              <div className="space-y-3">
                {GATE_FAQS.map((faq, idx) => (
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
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Change Image DPI
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Set 300 DPI for GOAPS
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      UPSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      IES / ESE recruitment preset
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-image-to-200kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Image to 200KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Lock image under 200 KB
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
                      Compare GATE, UPSC, SSC
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
                <span>100% In-Browser Security</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                All aspect ratio calculations and image rendering take place inside your browser memory. No data is ever stored on or transmitted to any server.
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
        <RelatedTools currentSlug="/tools/gate-photo-signature-resizer" />
      </div>
    </div>
  );
}
