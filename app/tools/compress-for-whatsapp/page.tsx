import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Share2,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  FileText,
  Smartphone,
  AlertTriangle,
  Info,
  Lock,
} from 'lucide-react';
import WhatsAppCompressorEngine from '@/components/tools/WhatsAppCompressorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF & Photos for WhatsApp (<500KB) | Free Document Optimizer | Kagazo',
  description:
    'Compress heavy marksheet scans, certificates, and ID cards strictly under 500KB or 200KB for fast WhatsApp forwarding. Prevents text blurring on mobile 4G/5G networks. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-for-whatsapp',
  },
  openGraph: {
    title: 'Compress PDF & Documents for WhatsApp (<500KB) | Kagazo',
    description:
      'Compress PDF marksheets and documents strictly under 500KB for instant WhatsApp forwarding without blur. 100% in-browser RAM privacy.',
    url: 'https://kagazo.in/tools/compress-for-whatsapp',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const WHATSAPP_LIMITS = [
  {
    mediaType: 'PDF Documents (Standard)',
    limit: 'Up to 100 MB (Standard) / 2 GB (Beta)',
    recommended: 'Under 500 KB for instant mobile download',
    notes: 'Sending files under 500 KB saves mobile recipient cellular data and opens instantly.',
  },
  {
    mediaType: 'Auto-Compressed WhatsApp Images',
    limit: 'WhatsApp downscales to ~70% JPEG quality',
    recommended: 'Send as Document or compress to 200–500 KB',
    notes: 'WhatsApp native image sharing blurs small text; sending as document preserves clarity.',
  },
  {
    mediaType: 'Job & College Application Proofs',
    limit: 'Recruiter review on mobile screens',
    recommended: '200 KB to 500 KB A4 PDF',
    notes: 'Recruiters and consultants can immediately forward documents to HR without wifi lag.',
  },
  {
    mediaType: 'Government Exam Admit Cards',
    limit: 'Mobile hall ticket verification',
    recommended: 'Under 300 KB single page',
    notes: 'Ensures quick rendering at examination center entry gates without network delay.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Document or Photo',
    desc: 'Select or drag-and-drop your marksheet, certificate, or resume PDF or image into the compressor.',
  },
  {
    step: 2,
    title: 'Choose Mobile Sharing Preset',
    desc: 'Select "Under 500 KB (Fast Mobile Share)" or "Under 200 KB (Ultra-Light)" preset.',
  },
  {
    step: 3,
    title: 'Instant In-Memory Optimization',
    desc: 'The engine downsamples raster elements while preserving sharp typography and seals.',
  },
  {
    step: 4,
    title: 'Preview Mobile Clarity',
    desc: 'Inspect document numbers and text in the clarity loupe to ensure 100% legibility.',
  },
  {
    step: 5,
    title: '1-Click WhatsApp Share',
    desc: 'Download the optimized file or click the instant WhatsApp Share button to forward directly.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Blurry Text When Sent as Image',
    title: 'WhatsApp Native Photo Compression',
    desc: 'Sending certificates as regular WhatsApp photos applies aggressive lossy compression. Always send certificates as a document PDF to preserve sharp text.',
  },
  {
    badge: 'Error: Massive 25MB File Hangs',
    title: 'Slow Downloads on Poor Mobile Networks',
    desc: 'Recipients on slow 3G/4G connections cannot easily download 25MB scanner files. Compressing under 500 KB guarantees instantaneous viewing.',
  },
  {
    badge: 'Error: Auto-Cropped Document Borders',
    title: 'Missing Page Margins on Mobile Viewers',
    desc: 'Inconsistent document margins cut off official stamps when viewed on smartphones. Kagazo formats documents to standard bordered A4 pages.',
  },
  {
    badge: 'Error: Cloud Privacy Leak',
    title: 'Uploading Identity Proofs to Untrusted Clouds',
    desc: 'Third-party compressors store Aadhaar and marksheet files on public servers. Kagazo operates 100% in local browser memory buffers.',
  },
];

const FAQS = [
  {
    question: 'Why does sending documents via WhatsApp often make text blurry?',
    answer:
      'When you send a certificate as a standard WhatsApp photo, WhatsApp automatically resamples the image to 72 DPI and applies aggressive lossy JPEG compression to save bandwidth. To preserve crisp text and stamps, compress your file with Kagazo and send it via WhatsApp using the "Document" attachment option.',
  },
  {
    question: 'What is the best file size for sharing PDFs and marksheets on WhatsApp?',
    answer:
      'We recommend keeping documents strictly between 200 KB and 500 KB. This allows recipients to download files instantly on mobile cellular connections while preserving 100% text clarity and rubber stamp legibility.',
  },
  {
    question: 'Can I send the compressed PDF directly to WhatsApp without saving to disk?',
    answer:
      'Yes! After compression, click the green "Share to WhatsApp" button on supported mobile and desktop browsers to open a pre-filled chat with your optimized document.',
  },
  {
    question: 'Will QR codes and barcode stamps remain scannable after compression?',
    answer:
      'Yes. Kagazo isolates high-frequency barcodes, university holograms, and QR code markers, maintaining sufficient contrast for phone camera scanners to decode them instantly.',
  },
  {
    question: 'Are my private educational marksheets uploaded to any server?',
    answer:
      'Zero cloud storage. All PDF downsampling, image optimization, and file packaging take place in your browser RAM. Your personal records are never sent across the network.',
  },
  {
    question: 'Does this tool support compressing photos (JPG/PNG) for WhatsApp?',
    answer:
      'Yes! You can upload JPG, PNG, and HEIC photos. The engine compresses them and wraps them into a clean, lightweight A4 PDF or an optimized image under 500 KB.',
  },
  {
    question: 'Can I compress multi-page documents like multi-semester transcripts?',
    answer:
      'Yes. Kagazo handles multi-page PDFs smoothly, distributing byte optimization across all pages so the entire document remains lightweight and easy to share.',
  },
  {
    question: 'Does Kagazo add any watermark or promotional text to the shared document?',
    answer:
      'No. The output file has zero watermarks, zero promotional banners, and no altered metadata.',
  },
  {
    question: 'How do I send a PDF as a "Document" in WhatsApp?',
    answer:
      'In WhatsApp chat, tap the paperclip icon (Android) or plus icon (iPhone), select "Document" instead of "Photos & Videos", and select your downloaded Kagazo PDF. WhatsApp will deliver it without applying its destructive photo compression.',
  },
  {
    question: 'Is there any fee or daily file limit on Kagazo?',
    answer:
      'No. Kagazo is 100% free and unlimited for all students, job seekers, and digital service operators.',
  },
];

export default function CompressForWhatsAppPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress PDF & Photos for WhatsApp (<500KB)',
        url: 'https://kagazo.in/tools/compress-for-whatsapp',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress PDF documents and photos strictly under 500 KB for fast WhatsApp sharing with 100% in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Documents for WhatsApp in 5 Steps',
        description:
          'Step-by-step instructions to compress marksheets and certificates strictly under 500 KB for WhatsApp sharing.',
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
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Compress for WhatsApp',
            item: 'https://kagazo.in/tools/compress-for-whatsapp',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold truncate">Compress for WhatsApp</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Fast WhatsApp Document &amp; Media Sharing Preset</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF for WhatsApp </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress heavy marksheet scans, certificates, and ID cards strictly <strong>under 500 KB or 200 KB</strong> for fast WhatsApp forwarding. Prevents text blurring on mobile cellular networks with 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Smartphone className="w-4 h-4 text-primary" /> Instant Mobile Fast Share
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Zero Blurry Text Guarantee
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <WhatsAppCompressorEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mobile Forwarding Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Never Send Blurry Certificate Photos on WhatsApp Again
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                When you send photos through standard WhatsApp chats, aggressive image compression blurs subject marks, official registration numbers, and signatures. Kagazo optimizes files into clean, lightweight document PDFs that bypass lossy compression.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Instant Mobile Download
                  </span>
                  <p className="text-xs text-text-main/70">
                    Keeps file size under 500 KB so recipients download documents in under 1 second.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Preserves Document Mode
                  </span>
                  <p className="text-xs text-text-main/70">
                    Formats files as compliant A4 documents to prevent WhatsApp photo quality loss.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Certificates processed in RAM and never written to disk. Zero retention.
                  </p>
                </div>
              </div>
            </section>

            {/* WhatsApp Sharing Standards Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    WhatsApp Media &amp; Document Sharing Guidelines
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Optimized parameters for fast cellular transfer and crystal-clear text readability.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Sharing Guide
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Sharing Method</th>
                      <th className="py-3 px-3">Network Upper Limit</th>
                      <th className="py-3 px-3">Kagazo Recommendation</th>
                      <th className="py-3 px-3">Clarity Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {WHATSAPP_LIMITS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{item.mediaType}</td>
                        <td className="py-3 px-3 text-text-main/70">{item.limit}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{item.recommended}</td>
                        <td className="py-3 px-3 text-xs text-text-main/60">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Pro Tip for Job Applicants:</strong> When forwarding certificates or resumes to HR recruiters on WhatsApp, always tap the paperclip icon and select &quot;Document&quot;. Never send as a &quot;Photo&quot; to prevent blurriness.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress Documents for WhatsApp in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common WhatsApp Document Sharing Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/80 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep 10 FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (WhatsApp Document Compression)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Essential advice on WhatsApp compression limits, mobile network performance, and document clarity.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q{idx + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/80 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-4">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Sharing Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-pdf-to-500kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 500KB
                </Link>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress PDF to 200KB
                </Link>
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image to PDF (200KB)
                </Link>
                <Link
                  href="/tools/pdf-compressor"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Master PDF Compressor
                </Link>
                <Link
                  href="/tools/clean-document-scanner"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Clean Document Scanner
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
