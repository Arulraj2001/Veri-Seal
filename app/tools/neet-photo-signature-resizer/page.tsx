import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Award,
  HelpCircle,
  Camera,
  PenTool,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'NEET Postcard (4x6) & Photo Signature Resizer Online Free | Kagazo',
  description:
    'Resize Postcard Photo (4x6 inch, 10-200KB with Name & Date), Passport Photo (10-200KB, 80% face), Signature (4-30KB), and Finger Impressions for NEET UG online application and admit card.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/neet-photo-signature-resizer',
  },
  openGraph: {
    title: 'NEET Postcard (4x6) & Photo Signature Resizer Online Free | Kagazo',
    description:
      'Free NTA NEET UG image resizer. 4"x6" Postcard photo, passport photo, running signature, and finger impressions resized to exact NTA specifications.',
    url: 'https://Kagazo.in/tools/neet-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const NEET_PRESETS: CustomPreset[] = [
  {
    id: 'postcard',
    label: 'Postcard Photo (4"×6", 10-200KB)',
    minKb: 10,
    maxKb: 200,
    widthCm: 10.16,
    heightCm: 15.24,
    isPhoto: true,
  },
  {
    id: 'passport_photo',
    label: 'Passport Photo (3.5×4.5cm, 10-200KB)',
    minKb: 10,
    maxKb: 200,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'Running Signature (4-30KB)',
    minKb: 4,
    maxKb: 30,
    widthCm: 3.5,
    heightCm: 1.5,
    isXerox: true,
  },
  {
    id: 'fingers_thumbs',
    label: 'Fingers & Thumbs (10-200KB)',
    minKb: 10,
    maxKb: 200,
    widthCm: 6.0,
    heightCm: 4.0,
    isXerox: true,
  },
];

const NEET_FAQS = [
  {
    question: 'What is the Postcard Size Photo required for NEET UG?',
    answer:
      'The National Testing Agency (NTA) mandates a 4" × 6" (inches) or 10.16 cm × 15.24 cm Postcard size photograph for NEET UG. The photo must be in JPG/JPEG format between 10 KB and 200 KB, with a white background, 80% face coverage showing ears clearly, and candidate name with date of taking photo (DOP) printed at the bottom.',
  },
  {
    question: 'Why do students get rejected for signature in NEET?',
    answer:
      'NTA rules strictly prohibit signatures written in CAPITAL (BLOCK) letters. The signature must be in running handwriting in black ink on white paper, with a file size between 4 KB and 30 KB. Submitting a signature in capital letters will lead to application cancellation.',
  },
  {
    question: 'What are the 10 fingers and thumbs impression guidelines for NEET?',
    answer:
      'Candidates must put impressions of all 10 fingers (left and right hands) using blue ink on plain white paper. The scanned image must be between 10 KB and 200 KB in JPG/JPEG format with clear ridge visibility without smudging.',
  },
  {
    question: 'How do I add Candidate Name and Date of Photo for NEET?',
    answer:
      'Kagazo automatically generates the official white bottom strip. Simply type your Name and the Date the photo was taken (e.g., 01-09-2026), and our engine seamlessly mounts it with correct contrast and font proportion.',
  },
];

export default function NeetPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'NEET Postcard & Photo Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/neet-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize 4x6 Postcard photo, Passport photo, Signature, and Finger impressions for NTA NEET UG examination.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize NEET Postcard and Passport Photos Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select NEET Document Type',
            text: 'Choose Postcard Photo (4x6"), Passport Photo, Signature (4-30KB), or Fingers & Thumbs.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Photo',
            text: 'Upload your smartphone photo or digital scan.',
          },
          {
            '@type': 'HowToStep',
            name: 'Provide Name & Date (For Photos)',
            text: 'Type candidate name and capture date for the mandatory bottom banner.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant File',
            text: 'Preview side-by-side with clarity zoom loupe and download the verified JPEG ready for the NTA portal.',
          },
        ],
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

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools/government-exam-pdf-compressor" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">NEET Postcard &amp; Photo Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>NTA NEET UG Application &amp; Admit Card Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>NEET Postcard (4"×6") &amp; </span>
            <span className="text-primary">Photo Resizer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate 4"×6" Postcard photos, passport photos (10–200 KB) with Name &amp; Date of Photo, 
            running signatures (4–30 KB), and 10-finger impressions fully compliant with National Testing Agency (NTA) guidelines.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="postcard"
              examName="NTA NEET"
              customPresets={NEET_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official NEET Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official NTA NEET UG Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict parameters mandated in the NEET UG Information Bulletin.
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
                      <th className="py-3 px-3 font-bold">Allowed Size Range</th>
                      <th className="py-3 px-3 font-bold">Required Dimensions</th>
                      <th className="py-3 px-3 font-bold">Crucial NTA Rules</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Postcard Size Photo</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 200 KB</td>
                      <td className="py-3 px-3">4" × 6" (10.16 × 15.24 cm)</td>
                      <td className="py-3 px-3">White background, Name &amp; Date at bottom, pasted on admit card</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Passport Size Photo</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 200 KB</td>
                      <td className="py-3 px-3">3.5 cm × 4.5 cm</td>
                      <td className="py-3 px-3">80% face coverage, both ears visible, Name &amp; Date strip</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">4 KB to 30 KB</td>
                      <td className="py-3 px-3">3.5 cm × 1.5 cm</td>
                      <td className="py-3 px-3 text-red-600 font-medium">Running handwriting only (Capital letters prohibited)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Fingers &amp; Thumbs</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 200 KB</td>
                      <td className="py-3 px-3">Standard horizontal scan</td>
                      <td className="py-3 px-3">All 10 fingers (Left &amp; Right hands) in blue ink on white paper</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (NEET UG Photos &amp; Signatures)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Guidance for medical aspirants filling out NEET application forms.
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
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
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
                      SSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB, CGL/CHSL ready
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
                      UPSC Photo &amp; Signature Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–300 KB, 350×350 px, 10-day DOP rule
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Marksheet Image to PDF (&lt; 200 KB)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Class 10/12 certificate to A4 PDF
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/government-exam-pdf-compressor"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Govt Exam PDF Compressor
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compress PDFs to 100KB, 200KB, 500KB
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
                <span>100% Client-Side &amp; In-Memory Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your photograph, signature, and biometric impressions are processed strictly in volatile RAM memory and immediately wiped. No images are ever saved to disk or third-party servers.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
