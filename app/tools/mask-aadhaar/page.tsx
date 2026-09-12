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
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AadhaarMaskEngine } from '@/components/tools/AadhaarMaskEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Mask Aadhaar Card Online Free | Redact First 8 Digits (XXXX-XXXX-1234) | Kagazo',
  description:
    'Permanently mask the first 8 digits of your Aadhaar card (PDF & image files) online free. 100% in-memory processing. UIDAI and RBI KYC compliant. Prevents identity theft for private job and exam submissions.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/mask-aadhaar',
  },
  openGraph: {
    title: 'Mask Aadhaar Card Online Free | Kagazo',
    description:
      'Permanently redact the first 8 digits of Aadhaar. 100% RAM privacy, UIDAI compliant, zero watermark.',
    url: 'https://Kagazo.in/tools/mask-aadhaar',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is a Masked Aadhaar card and why is it mandatory?',
    answer:
      'A Masked Aadhaar card conceals the first 8 digits of your 12-digit Aadhaar number, showing only the authorized last 4 digits (e.g. XXXX-XXXX-1234). Both UIDAI and the Reserve Bank of India (RBI) legally mandate using Masked Aadhaar when submitting identity proof to private institutions, hotels, rental verification, and recruitment agencies to prevent identity theft and unauthorized authentication.',
  },
  {
    question: 'Is blacking out the numbers with an image editor safe?',
    answer:
      'Drawing black boxes in basic phone photo apps or PDF viewers is often unsafe because the underlying digital text layer is not erased—anyone who copies the text can still read your full 12 digits! Kagazo physically wipes the underlying character stream from the PDF and burns solid pixels into images, making the redaction 100% irreversible.',
  },
  {
    question: 'Can I upload a smartphone photo of my Aadhaar card or only PDF?',
    answer:
      'Kagazo supports both! You can upload an official e-Aadhaar PDF or a smartphone camera photo (JPEG/PNG/WEBP) of your PVC or printed Aadhaar card. Our engine redacts the sensitive numbers cleanly across both formats.',
  },
  {
    question: 'Are my Aadhaar details or documents stored on your server?',
    answer:
      'Never. Kagazo operates entirely in ephemeral volatile RAM memory. Your Aadhaar document is processed in memory and wiped immediately upon download. We never store personal data, identity numbers, or files on server disks or databases.',
  },
];

export default function MaskAadhaarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Official Masked Aadhaar Redactor',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/mask-aadhaar',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Permanently mask the first 8 digits of your Aadhaar card (PDF & image files) online free. UIDAI and RBI KYC compliant.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Mask Aadhaar Card Online Free',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Aadhaar PDF or Image',
            text: 'Select your e-Aadhaar PDF or scanned phone photo.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Redaction Options',
            text: 'Choose whether to mask the first 8 digits and optionally censor the biometric QR code.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Masked Document',
            text: 'Inspect the sanitized preview and download your official Masked Aadhaar.',
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
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Mask Aadhaar Card' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>UIDAI &amp; RBI KYC Privacy Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Mask Aadhaar Card </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Permanently conceal the first 8 digits of your Aadhaar card (<span className="font-mono font-bold text-primary">XXXX-XXXX-1234</span>) and QR code. 
            Safely submit ID proof for private jobs, exams, and hotel check-ins without risking identity theft.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <AadhaarMaskEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Why Irreversible Redaction is Critical */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Why Visual Paint Overlays Are Insecure (And How Kagazo Protects You)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block">
                    Insecure Phone &amp; Web Overlays
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Drawing a black marker line in basic phone apps only places a colored rectangle over the PDF surface. The underlying text stream still contains your full 12 digits, which anyone can extract simply by selecting and copying the text.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md inline-block">
                    Kagazo True Stream Redaction
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Kagazo executes cryptographic PDF stream redactions. The first 8 digits are physically purged from the PDF dictionary and replaced with solid opaque pixels, making recovery technically impossible.
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
                  Frequently Asked Questions (Masked Aadhaar Card)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  UIDAI regulations and privacy guidelines for masking Aadhaar cards.
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
          </main>

          {/* Sticky Right Sidebar Rail (32% Width) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Identity Tools
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/unlock-pdf"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Unlock e-Aadhaar PDF
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Remove password before masking
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/pdf-to-image"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      PDF to Image (300 DPI)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Extract Aadhaar PDF to JPG
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
                      Image to PDF (&lt; 200 KB)
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      A4 formatted certificate PDF
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
                      100KB, 200KB, 300KB sizing
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
                <span>Zero-Retention RAM Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your Aadhaar card and identity data are processed solely in volatile memory and destroyed immediately upon download. Never saved to disk or shared with third parties.
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

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/aadhaar-masker" />
      </div>
    </div>
  );
}
