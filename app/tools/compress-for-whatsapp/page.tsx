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
} from 'lucide-react';
import WhatsAppCompressorEngine from '@/components/tools/WhatsAppCompressorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress PDF & Photos for WhatsApp (<500KB) | Free Document Optimizer',
  description:
    'Compress heavy marksheet scans, certificates, and ID cards strictly under 500KB or 200KB for fast WhatsApp forwarding. Prevents text blurring on mobile 4G/5G networks. 100% free RAM privacy.',
  alternates: {
    canonical: 'https://veriseal.in/tools/compress-for-whatsapp',
  },
  openGraph: {
    title: 'Compress PDF & Documents for WhatsApp | VeriSeal',
    description:
      'Compress certificates and marksheets for fast, crystal-clear WhatsApp sharing.',
    url: 'https://veriseal.in/tools/compress-for-whatsapp',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const SHARING_COMPARISON = [
  { mode: 'Standard WhatsApp Photo', maxLimit: 'Aggressive Blur', textReadability: 'Poor (Roll numbers unreadable)' },
  { mode: 'VeriSeal Document Optimizer', maxLimit: '< 500 KB / < 200 KB', textReadability: 'Ultra Sharp (100% Legible)' },
  { mode: 'Uncompressed Flatbed Scan', maxLimit: '8 MB to 15 MB', textReadability: 'Fails to download on weak mobile networks' },
];

const FAQS = [
  {
    question: 'Why does WhatsApp blur marksheet photos and certificates?',
    answer:
      'When you send an image as a standard photo on WhatsApp, the app aggressively recompresses the image, reducing resolution and blurring fine registration numbers, student roll numbers, and stamp seals. VeriSeal applies adaptive contrast boosting and downscales intelligently so your document remains 100% sharp even when sent on mobile data.',
  },
  {
    question: 'Should I send files as "Document" or "Gallery Photo" on WhatsApp?',
    answer:
      'For official marksheets, college applications, and Aadhaar/PAN cards, always select the paperclip icon and choose "Document". Sending as a document transmits the exact byte stream without WhatsApp re-compressing or blurring the image.',
  },
  {
    question: 'Are my WhatsApp documents uploaded to any server?',
    answer:
      'No. All compression, contrast boosting, and file encoding execute 100% inside your local device RAM. Your private identity documents and exam certificates never touch any cloud server.',
  },
];

export default function WhatsAppCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal WhatsApp Document & Photo Compressor',
        url: 'https://veriseal.in/tools/compress-for-whatsapp',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress heavy PDF documents, marksheets, and certificates under 500KB for fast WhatsApp sharing.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a Document for WhatsApp',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Document or Photo',
            text: 'Select your heavy marksheet, degree certificate, or Aadhaar scan.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Size Mode',
            text: 'Choose < 500 KB or < 200 KB depending on your mobile network.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download & Send',
            text: 'Download the optimized file and attach it as a Document on WhatsApp.',
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
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
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
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            PDF Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Compress for WhatsApp</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero-Blur Mobile Compression Standard</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Compress PDF &amp; Photos for WhatsApp
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Compress heavy marksheet scans, certificates, and ID cards strictly under <strong>500 KB or 200 KB</strong>. Eliminates the dreaded WhatsApp text blur and ensures documents open instantly on mobile 4G and 5G networks.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% In-Browser Privacy:</strong> Your personal certificates and identity documents are compressed directly in local device RAM. Zero bytes are uploaded to cloud servers.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <WhatsAppCompressorEngine />

            {/* Comparison Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <Share2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-foreground">
                    WhatsApp Transfer Mode Comparison
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Mobile Best Practice
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <th className="py-2.5 px-3 font-bold">Transfer Method</th>
                      <th className="py-2.5 px-3 font-bold">File Size Budget</th>
                      <th className="py-2.5 px-3 font-bold">Text Legibility on Mobile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    {SHARING_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{row.mode}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-semibold">{row.maxLimit}</td>
                        <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                          {row.textReadability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                  >
                    <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                      <span className="text-emerald-600 font-extrabold">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (32%) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Tips Card */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Pro Tips</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Send via Paperclip &gt; Document</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Attaching as a Document prevents WhatsApp from running its compression engine.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Under 500KB Sweet Spot</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Opens in 0.5 seconds even on 2G/3G connections in rural areas.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Related PDF Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Compress PDF to 200KB
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Multi-Marksheet Merger (&lt;1MB)
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/clean-document-scanner"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Clean Document Scanner
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space (Ostrune Exclusive) */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
