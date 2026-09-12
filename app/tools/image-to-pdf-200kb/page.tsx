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
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageToPdfEngine } from '@/components/tools/ImageToPdfEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Image to PDF Converter under 200KB Free | Exact Size Guarantee | Kagazo',
  description:
    'Convert marksheet photos, certificates, and ID cards directly to PDF strictly under 200 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting. Guaranteed compliance for TNPSC, UPSC, and SSC.',
  alternates: {
    canonical: 'https://Kagazo.in/tools/image-to-pdf-200kb',
  },
  openGraph: {
    title: 'Image to PDF Converter under 200KB Online Free | Kagazo',
    description:
      'Directly convert smartphone marksheet photos to PDF under 200 KB in 1 click. Zero paywalls, no watermarks, RAM-only processing.',
    url: 'https://Kagazo.in/tools/image-to-pdf-200kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do I convert a marksheet photo directly to a PDF under 200 KB?',
    answer:
      'Simply drag and drop your smartphone photo or scanned certificate into the Kagazo upload box. Our engine automatically crops the borders, enhances ink contrast, and compresses the PDF to strictly under 200 KB in a single pass.',
  },
  {
    question: 'Can I combine Front and Back pages of a marksheet into one PDF?',
    answer:
      'Yes! You can upload multiple images (e.g. Front and Back of your Degree certificate or 10th marksheet). Kagazo combines them into a multi-page A4 PDF while ensuring the total file size remains strictly under 200 KB.',
  },
  {
    question: 'Why do recruitment portals mandate PDF format under 200 KB?',
    answer:
      'Government servers (such as TNPSC, UPSC, SSC, and NTA) enforce a strict 200 KB or 300 KB ceiling to save database storage across millions of applicants while ensuring the certificate text and seals remain legible.',
  },
  {
    question: 'Will my marksheet text become blurry after compression?',
    answer:
      'No. Our engine uses Lanczos downsampling and selective JPEG quantization that preserves high-frequency text edges and official government seals, unlike generic tools that blur text.',
  },
  {
    question: 'Are my uploaded certificates saved on your servers?',
    answer:
      'No. Kagazo operates entirely in system memory (RAM). Your certificates, marksheets, and ID proofs are never written to permanent disk storage, ensuring 100% privacy and security.',
  },
];

export default function ImageToPdf200KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Image to PDF Converter under 200KB',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://Kagazo.in/tools/image-to-pdf-200kb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Convert marksheet photos, certificates, and ID cards directly to PDF strictly under 200 KB online free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Image to PDF under 200 KB Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Marksheet Photos',
            text: 'Upload 1 or more images of your certificate or marksheet (Front & Back).',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Preset & Target',
            text: 'Choose color or Xerox Ink Boost and confirm target size under 200 KB.',
          },
          {
            '@type': 'HowToStep',
            name: '1-Click In-Memory Conversion',
            text: 'Click convert to generate an A4 formatted PDF strictly under 200 KB.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect & Download',
            text: 'Verify clarity with the hover zoom loupe, then download directly.',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools/pdf-compressor" className="hover:text-primary transition-colors font-medium">
            Free Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Image to PDF under 200KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Strict Under 200 KB Guarantee • Multi-Image Merge</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Image to PDF Converter </span>
            <span className="text-primary">under 200KB</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert smartphone photos of marksheets, community certificates, and ID proofs directly into a compliant PDF strictly under 200 KB in a single click.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageToPdfEngine initialTargetKb={200} />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Marksheet Upload Limits Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Indian Exam Marksheet &amp; Certificate PDF Rules
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official limits enforced across central and state recruitment portals.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Verified Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Portal / Examination</th>
                      <th className="py-3 px-3 font-bold">Document Type</th>
                      <th className="py-3 px-3 font-bold">Strict Ceiling</th>
                      <th className="py-3 px-3 font-bold">Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/70 text-text-main">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold">TNPSC (Group 1, 2, 4, VAO)</td>
                      <td className="py-3.5 px-3 text-text-main/70">Community, SSLC Marksheet</td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                          &lt; 200 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">PDF</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold">UPSC (Civil Services OTR)</td>
                      <td className="py-3.5 px-3 text-text-main/70">Degree, Age Proof Certificate</td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          20 – 300 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">PDF</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold">SSC (CGL, CHSL, MTS)</td>
                      <td className="py-3.5 px-3 text-text-main/70">Category &amp; Education Proof</td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                          &lt; 200 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">PDF</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold">IBPS / State Banks</td>
                      <td className="py-3.5 px-3 text-text-main/70">Handwritten Declaration</td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                          50 – 100 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">JPG / PDF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* Why Kagazo is Better */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">1-Click Direct to &lt;200KB</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  No need to convert to PDF first and then find a second compressor. Converts smartphone marksheets directly to compliant &lt;200KB PDF in one pass.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">100% Free Forever</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  No hourly limits, no subscription walls, and no watermarks added. Built permanently for students and cyber cafe operators.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">RAM-Only Privacy</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Your confidential marksheets and identity certificates are processed in RAM and never written to permanent disk storage.
                </p>
              </div>
            </section>

            {/* Hyper-Targeted FAQ Accordion */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2 pb-2 border-b border-surface-darker/60">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </h2>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-surface-darker rounded-2xl bg-surface/40 p-4 sm:p-5 open:bg-surface transition-all cursor-pointer"
                  >
                    <summary className="font-bold text-sm sm:text-base text-text-main list-none flex items-center justify-between">
                      <span>{faq.question}</span>
                      <span className="text-primary text-xl transition-transform group-open:rotate-180 font-bold">▾</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-text-main/80 mt-3 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Cross-Link to PDF Compressor */}
            <aside className="p-6 sm:p-8 rounded-3xl bg-surface border border-primary/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-extrabold text-text-main flex items-center gap-2 justify-center sm:justify-start">
                  <FileText className="w-5 h-5 text-primary" />
                  Already have a large PDF certificate?
                </h3>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Use our PDF Compressor to compress existing PDF files directly to under 200 KB or 100 KB.
                </p>
              </div>
              <Link
                href="/tools/compress-pdf-to-200kb"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                Compress PDF to 200KB
                <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </main>

          {/* Right Sticky Sidebar (32% Width) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            {/* Quick Switch Card */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-surface-darker shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-primary" />
                  Document Tools
                </h3>
                <span className="text-[10px] font-extrabold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary/20">
                  Instant
                </span>
              </div>
              <div className="space-y-1.5 pt-0.5">
                {[
                  { name: 'Image to PDF under 200KB', href: '/tools/image-to-pdf-200kb', active: true, tag: 'Current' },
                  { name: 'Compress PDF to 200KB', href: '/tools/compress-pdf-to-200kb', active: false, tag: 'Most Popular' },
                  { name: 'Compress PDF to 100KB', href: '/tools/compress-pdf-to-100kb', active: false, tag: 'Strict' },
                  { name: 'TNPSC Photo & Sig Resizer', href: '/tools/tnpsc-photo-signature-resizer', active: false, tag: 'TNPSC' },
                  { name: 'TNPSC PDF Compressor', href: '/tools/tnpsc-pdf-compressor', active: false, tag: 'Certificates' },
                  { name: 'Master PDF Compressor', href: '/tools/pdf-compressor', active: false, tag: 'All Formats' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all border',
                      item.active
                        ? 'bg-primary-light border-primary/40 text-primary shadow-2xs'
                        : 'bg-surface/40 border-surface-darker hover:border-primary/40 hover:bg-white text-text-main'
                    )}
                  >
                    <span className="truncate pr-2">{item.name}</span>
                    <span
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0',
                        item.active ? 'bg-primary text-white' : 'bg-surface border border-surface-darker text-text-main/60'
                      )}
                    >
                      {item.tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Slot A: Sticky Sidebar Display Unit */}
            <AdSlot slot="sidebar" />

            {/* Official Portal CheatSheet */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-surface-darker shadow-card space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Portal Marksheet Limits
              </h3>
              <div className="space-y-2 text-xs divide-y divide-surface-darker/60">
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">TNPSC Certificate PDF</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">&lt; 200 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">UPSC Marksheets</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">20 – 300 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">SSC Certificates</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">&lt; 200 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">IBPS Marksheet PDF</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">&lt; 200 KB</span>
                </div>
              </div>
            </div>

            {/* Privacy Shield */}
            <div className="p-5 rounded-3xl bg-surface/60 border border-surface-darker space-y-2">
              <div className="flex items-center gap-2 text-text-main font-black text-xs">
                <Lock className="w-4 h-4 text-primary" />
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Marksheet images are converted in RAM and never written to permanent disk storage. 100% private.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
