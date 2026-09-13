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
  Copy,
  Layers,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { DeclarationProforma } from '@/components/tools/DeclarationProforma';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'IBPS Photo, Signature, Thumb & Declaration Resizer — 2026 | Kagazo',
  description:
    'Format all 4 mandatory IBPS uploads: photo (20–50 KB), signature (10–20 KB), left thumb (20–50 KB), and handwritten declaration (50–100 KB). 100% compliant, free.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ibps-photo-signature-resizer',
  },
  openGraph: {
    title: 'IBPS Photo, Signature, Thumb & Declaration Resizer | Kagazo',
    description:
      'All-in-one free image resizer for IBPS PO, Clerk, SO, RRB and SBI bank examinations. Exact pixels, zero watermark, 100% compliant.',
    url: 'https://kagazo.in/tools/ibps-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const IBPS_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'IBPS Photo (20–50 KB, 200×230 px)',
    minKb: 20,
    maxKb: 50,
    widthPx: 200,
    heightPx: 230,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'IBPS Signature (10–20 KB, 140×60 px)',
    minKb: 10,
    maxKb: 20,
    widthPx: 140,
    heightPx: 60,
    isXerox: true,
  },
  {
    id: 'thumb',
    label: 'Left Thumb (20–50 KB, 240×240 px)',
    minKb: 20,
    maxKb: 50,
    widthPx: 240,
    heightPx: 240,
    isXerox: true,
  },
  {
    id: 'declaration',
    label: 'Declaration (50–100 KB, 800×400 px)',
    minKb: 50,
    maxKb: 100,
    widthPx: 800,
    heightPx: 400,
    isXerox: true,
  },
];

const IBPS_FAQS = [
  {
    question: 'What are the four mandatory image uploads required for IBPS applications?',
    answer:
      'IBPS PO, Clerk, Specialist Officer (SO), and RRB applications require four separate uploads: (1) Passport photograph (20–50 KB, 200×230 px), (2) Signature in running cursive (10–20 KB, 140×60 px), (3) Left Thumb Impression (20–50 KB, 240×240 px), and (4) Handwritten Declaration in cursive (50–100 KB, 800×400 px). All must be in JPG/JPEG format.',
  },
  {
    question: 'What is the exact text for the IBPS Handwritten Declaration?',
    answer:
      'The official declaration text must be handwritten as follows: "I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required." It must be written in English by the applicant in black ink on unruled white paper.',
  },
  {
    question: 'Can the IBPS handwritten declaration be typed or written in block/capital letters?',
    answer:
      'No. IBPS explicitly states that declarations written in CAPITAL (BLOCK) LETTERS, or typed on a computer and printed, will NOT be accepted. Uploading a typed declaration will lead to disqualification during manual scrutiny.',
  },
  {
    question: 'Why does IBPS reject signatures signed in blue ink?',
    answer:
      'While some exams permit blue ink, IBPS guidelines specifically stipulate that the applicant signature MUST be signed in BLACK ink on plain white paper. Blue ink signatures can fail automated optical scanners on ibps.in.',
  },
  {
    question: 'What if I do not have a left thumb for the IBPS impression?',
    answer:
      'As per IBPS rules, if a candidate does not have a left thumb, they may use their right thumb. If both thumbs are missing, an impression of one of the fingers of the left hand may be taken starting from the forefinger, and documented in the form.',
  },
  {
    question: 'What is the minimum file size for the IBPS Left Thumb Impression (LTI)?',
    answer:
      'Unlike NEET which allows 10–50 KB, IBPS enforces a strict 20.0 KB lower floor for LTI (20–50 KB). If cropped too tightly, mobile scans often drop to 8–15 KB and trigger a portal error. Kagazo safely pads LTI files into the 25–40 KB range.',
  },
  {
    question: 'Does this tool work for SBI PO and SBI Clerk applications as well?',
    answer:
      'Yes. State Bank of India (SBI) utilizes the identical four-document upload architecture with matching dimensions and KB limits (Photo 20–50 KB, Signature 10–20 KB, Thumb 20–50 KB, Declaration 50–100 KB).',
  },
  {
    question: 'Can I wear glasses or spectacles in the IBPS passport photo?',
    answer:
      'Spectacles with tinted lenses or sunglasses are strictly prohibited. Even clear prescription glasses are discouraged if camera flash creates reflection on the lenses, obscuring the candidate eyes.',
  },
  {
    question: 'What happens if I accidentally swap the thumb and declaration uploads?',
    answer:
      'The automated portal script checks file size and format, so an accidental swap might pass initial submission, but your application will be canceled during document verification. Kagazo clearly labels each downloaded file to prevent upload mixups.',
  },
  {
    question: 'Does Kagazo save my handwritten declaration or thumbprint on any server?',
    answer:
      'No. All processing for all four documents occurs 100% in your browser RAM using HTML5 Canvas. Your signature, thumbprint, and declaration are never uploaded to any remote server or stored on disk.',
  },
];

const IBPS_DECLARATION_TEXT =
  'I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.';

export default function IbpsPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'IBPS Photo, Signature, Thumb & Declaration Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/ibps-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Prepare all four mandatory IBPS uploads — passport photo (20–50 KB), signature (10–20 KB), left thumb impression (20–50 KB), and handwritten declaration (50–100 KB) — for IBPS PO, Clerk, RRB, and SBI.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize All 4 IBPS Uploads Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Document Preset',
            text: 'Choose Photo (20–50 KB), Signature (10–20 KB), Left Thumb (20–50 KB), or Declaration (50–100 KB).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Scanned File',
            text: 'Upload phone photo or scanner file. Accepts JPG, PNG, WEBP, and Apple HEIC directly.',
          },
          {
            '@type': 'HowToStep',
            name: 'Contrast & Ink Enhancement',
            text: 'Our Xerox filter darkens handwriting strokes and thumbprint ridges while clearing background shadows.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automated Size Calibration',
            text: 'File sizes are locked into the exact IBPS band, preventing both undersize floor and oversize errors.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified JPEGs',
            text: 'Download portal-ready JPEG files ready for instant upload on ibps.in and sbi.co.in/careers.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: IBPS_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
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
            { label: 'IBPS & Bank Exam Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>IBPS PO, Clerk, RRB Officer &amp; SBI Suite Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>IBPS &amp; Bank Exam Photo Resizer </span>
            <span className="text-primary">(PO, Clerk, RRB, SBI — 2026)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Prepare all four mandatory IBPS uploads — passport photo (20–50 KB), signature (10–20 KB), left thumb impression (20–50 KB), and handwritten declaration (50–100 KB) — for IBPS PO, Clerk, RRB Officer, and SBI online forms.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="declaration"
              examName="IBPS Bank Selection"
              customPresets={IBPS_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Copyable IBPS Handwritten Declaration Proforma */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <DeclarationProforma text={IBPS_DECLARATION_TEXT} />

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Critical Warning:</strong> Writing in CAPITAL (BLOCK) LETTERS or typing and printing the declaration will result in instant disqualification. Write naturally in cursive handwriting.
                </p>
              </div>
            </section>

            {/* Official IBPS Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official IBPS 4-Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Parameters enforced across IBPS PO, Clerk, SO, RRB, and SBI online portals.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Banking Norms
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Upload Item</th>
                      <th className="py-3 px-3 font-bold">Mandatory File Size</th>
                      <th className="py-3 px-3 font-bold">Pixel Dimensions</th>
                      <th className="py-3 px-3 font-bold">Format &amp; Key Rules</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Passport Photograph</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 50 KB</td>
                      <td className="py-3 px-3 font-mono">200 × 230 pixels</td>
                      <td className="py-3 px-3">JPG/JPEG; light/white bg; no spectacles; both ears visible</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 20 KB</td>
                      <td className="py-3 px-3 font-mono">140 × 60 pixels</td>
                      <td className="py-3 px-3">JPG/JPEG; BLACK ink only; cursive handwriting (no capitals)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Left Thumb Impression</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 50 KB</td>
                      <td className="py-3 px-3 font-mono">240 × 240 pixels (200 DPI)</td>
                      <td className="py-3 px-3">JPG/JPEG; blue or black ink; clear ridges; unsmudged</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Handwritten Declaration</td>
                      <td className="py-3 px-3 font-bold text-primary">50 KB to 100 KB</td>
                      <td className="py-3 px-3 font-mono">800 × 400 pixels (200 DPI)</td>
                      <td className="py-3 px-3">JPG/JPEG; English cursive handwriting; plain white paper</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Note:</strong> IBPS notifications may have slight variations between PO and Specialist Officer posts. Always cross-check with the official notification on <code className="font-mono font-bold">ibps.in</code> before uploading. Need to scan declarations? Use our{' '}
                  <Link href="/tools/handwritten-declaration-scanner" className="underline font-bold text-amber-950 hover:text-primary">
                    Handwritten Declaration Scanner
                  </Link>.
                </p>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Format All 4 Banking Uploads in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Select Document Preset</h3>
                  <p className="text-xs text-text-main/75">
                    Click <strong>Photo</strong>, <strong>Signature</strong>, <strong>Left Thumb</strong>, or <strong>Declaration</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Upload Photo or Scan</h3>
                  <p className="text-xs text-text-main/75">
                    Drop your phone capture or scanner image. Supports JPG, PNG, WEBP, and Apple HEIC directly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Auto Crop Framing</h3>
                  <p className="text-xs text-text-main/75">
                    Kagazo automatically frames the document into official pixel boundaries (e.g. 800×400 px for declaration).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    4
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Ink Contrast Booster</h3>
                  <p className="text-xs text-text-main/75">
                    Darkens faint black pen ink and thumb ridges while bleaching shadowy paper to clean white.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2 sm:col-span-2 lg:col-span-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    5
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Download Compliant JPEG</h3>
                  <p className="text-xs text-text-main/75">
                    Review final KB and resolution with our clarity loupe, then download verified JPEGs ready for upload to ibps.in.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Errors Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common IBPS Banking Upload Mistakes and How to Avoid Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Typed Handwritten Declaration
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Typing and printing the text leads to disqualification during manual scrutiny. It must be written by hand in natural cursive English handwriting.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Left Thumb File Size Under 20 KB
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    IBPS requires LTI to be between 20 KB and 50 KB. Scans under 20.0 KB are blocked by the portal. Kagazo safely pads LTI files into the 25–40 KB range.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Blue Ink Signature
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    IBPS explicitly requires black ink for candidate signatures. Our Xerox filter converts and enhances strokes into deep black ink.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Signatures in Capital / Block Letters
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Block letter signatures are rejected across all IBPS recruitment rounds. Sign in natural running script.
                  </p>
                </div>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (IBPS &amp; Bank Exam Uploads)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear, verified answers covering IBPS PO, Clerk, RRB, SO, and SBI applications.
                </p>
              </div>

              <div className="space-y-3">
                {IBPS_FAQS.map((faq, idx) => (
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
                  href="/tools/handwritten-declaration-scanner"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Declaration Scanner
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Clean &amp; sharpen written text
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/thumb-impression-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Thumb Impression Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      LTI 20–50 KB optimizer
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Image to 20KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Signature 10–20 KB target
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
                      Compare IBPS, SSC, UPSC
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
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Biometric thumb impressions, signatures, and handwritten declarations are processed exclusively in volatile RAM and destroyed on session close. Never saved to any database.
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
        <RelatedTools currentSlug="/tools/ibps-photo-signature-resizer" />
      </div>
    </div>
  );
}
