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
  ArrowRight,
  Lock,
} from 'lucide-react';
import WhatsAppCompressorEngine from '@/components/tools/WhatsAppCompressorEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress PDF & Photos for WhatsApp (<500KB) | Free Document Optimizer | Kagazo',
  description:
    'Compress heavy marksheet scans, certificates, and ID cards strictly under 500KB or 200KB for fast WhatsApp forwarding. Prevents text blurring on mobile 4G/5G networks. 100% free RAM privacy.',
  keywords: [
    'compress pdf for whatsapp',
    'compress photos for whatsapp without blur',
    'reduce pdf size to 500kb for whatsapp',
    'whatsapp marksheet compressor free',
    'send clear certificates on whatsapp',
    'compress documents under 200kb for whatsapp',
    'mobile fast share document compressor',
    'send pdf as document without compression',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-for-whatsapp',
  },
  openGraph: {
    title: 'Compress PDF & Documents for WhatsApp (<500KB) | Kagazo',
    description:
      'Compress certificates and marksheets for fast, crystal-clear WhatsApp sharing without text blurriness.',
    url: 'https://kagazo.in/tools/compress-for-whatsapp',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF & Photos for WhatsApp (<500KB) | Kagazo',
    description: 'Eliminate WhatsApp blur. Compress documents under 500KB or 200KB for instant mobile sharing.',
  },
};

const SHARING_COMPARISON = [
  { mode: 'Standard WhatsApp Photo', maxLimit: 'Aggressive Blur', textReadability: 'Poor (Roll numbers unreadable)' },
  { mode: 'Kagazo Document Optimizer', maxLimit: '< 500 KB / < 200 KB', textReadability: 'Ultra Sharp (100% Legible)' },
  { mode: 'Uncompressed Flatbed Scan', maxLimit: '8 MB to 15 MB', textReadability: 'Fails to download on weak mobile networks' },
];

const FAQS = [
  {
    question: 'Why does WhatsApp blur marksheet photos and certificates?',
    answer:
      'When you send an image as a standard photo on WhatsApp, the app aggressively recompresses the image, reducing resolution and blurring fine registration numbers, student roll numbers, and stamp seals. Kagazo applies adaptive contrast boosting and downscales intelligently so your document remains 100% sharp even when sent on mobile data.',
  },
  {
    question: 'Should I send files as "Document" or "Gallery Photo" on WhatsApp?',
    answer:
      'For official marksheets, college applications, and Aadhaar/PAN cards, always select the paperclip icon and choose "Document". Sending as a document transmits the exact byte stream without WhatsApp re-compressing or blurring the image.',
  },
  {
    question: 'What is the ideal file size for sharing documents on WhatsApp?',
    answer:
      'The sweet spot is between 150 KB and 450 KB. Documents in this range download instantly in under a second even on 3G or congested 4G connections in rural areas, while maintaining razor-sharp typography.',
  },
  {
    question: 'Can I compress multi-page PDF documents for WhatsApp?',
    answer:
      'Yes! You can upload single or multi-page PDFs (like semester marksheets or property documents). Kagazo compresses them to land comfortably below your selected target limit without clipping pages.',
  },
  {
    question: 'Does this tool work on smartphone camera photos of ID cards?',
    answer:
      'Yes. You can upload photos of Aadhaar cards, driving licenses, voter IDs, or PAN cards. Our engine automatically removes shadows and enhances ink contrast so details are easy to read on mobile screens.',
  },
  {
    question: 'Are my WhatsApp documents uploaded to any server?',
    answer:
      'No. All compression, contrast boosting, and file encoding execute 100% inside your local device RAM. Your private identity documents and exam certificates never touch any cloud server.',
  },
  {
    question: 'Will this tool add any watermark or brand name to my document?',
    answer:
      'Never. Kagazo generates 100% clean, professional documents with zero watermarks, brand logos, or meta-tags.',
  },
  {
    question: 'Is Kagazo free to use on mobile devices?',
    answer:
      'Yes, 100% free forever on all smartphones (Android and iPhone). No app download or account registration is required.',
  },
];

export default function WhatsAppCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'WhatsApp Document & Photo Compressor',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-for-whatsapp',
        inLanguage: ['en-IN', 'ta-IN'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '2980',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'Strict <500 KB and <200 KB mobile sharing presets',
          'Prevents WhatsApp photo compression and text blurring',
          'Paperclip Document transfer mode optimization',
          'In-browser RAM processing with zero cloud uploads',
          'Compatible with mobile 4G/5G and low-bandwidth connections',
        ],
        description:
          'Compress heavy PDF documents, marksheets, and certificates under 500KB for fast WhatsApp sharing.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress a Document for WhatsApp Sharing',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Document or Photo',
            text: 'Select your heavy marksheet, degree certificate, or ID scan.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Size Budget Mode',
            text: 'Choose < 500 KB or < 200 KB depending on your mobile network speed.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Optimized File',
            text: 'Download the crystal-clear document directly to your mobile phone.',
          },
          {
            '@type': 'HowToStep',
            name: 'Send via WhatsApp Paperclip',
            text: 'Open WhatsApp, click Paperclip > Document, and select your file for zero-blur transmission.',
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
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
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
            { label: 'Compress for WhatsApp' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Zero-Blur Mobile Sharing • &lt;500KB / &lt;200KB Optimization</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress PDF &amp; Photos for </span>
            <span className="text-emerald-700">WhatsApp</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress heavy marksheet scans, certificates, and ID cards strictly under <strong>500 KB or 200 KB</strong>. Eliminates the dreaded WhatsApp text blur and ensures documents open instantly on mobile 4G and 5G networks.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% In-Browser Privacy:</strong> Your personal certificates and identity documents are compressed directly in local device RAM. Zero bytes are uploaded to cloud servers.
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* The Engine Component (No redundant card wrapper) */}
            <WhatsAppCompressorEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* WhatsApp Transfer Mode Comparison Table */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div className="flex items-center gap-2.5">
                  <Share2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h2 className="text-xl font-bold text-text-main">
                      WhatsApp Transfer Mode Comparison
                    </h2>
                    <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                      Understanding why photos get blurred vs sending as document attachments.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 self-start sm:self-auto shrink-0">
                  Mobile Best Practice
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker/60 bg-surface/50 text-text-main/70 font-semibold">
                      <th className="py-3 px-3">Transfer Method</th>
                      <th className="py-3 px-3">File Size Budget</th>
                      <th className="py-3 px-3">Text Legibility on Mobile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/40 text-text-main">
                    {SHARING_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-bold text-text-main flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{row.mode}</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-800 bg-emerald-50/60 rounded">
                          {row.maxLimit}
                        </td>
                        <td className="py-3 px-3 text-text-main/80 font-medium">
                          {row.textReadability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Deep FAQ Section */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-text-main">
                  Frequently Asked Questions (WhatsApp Compression)
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl p-4 sm:p-5 bg-surface/30 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between font-bold text-text-main text-xs sm:text-sm cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-600 font-black">Q:</span>
                        {faq.question}
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/60 pt-3 pl-6">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28 self-start">
            {/* Pro Tips Card */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-5 space-y-4 shadow-card">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                WhatsApp Pro Tips
              </h3>
              <div className="space-y-2.5 text-xs text-text-main/70">
                <div className="p-3 rounded-xl bg-surface/60 border border-surface-darker space-y-1">
                  <div className="font-bold text-text-main">Send via Paperclip &gt; Document</div>
                  <div className="text-[11px] text-text-main/60 leading-tight">
                    Attaching as a Document prevents WhatsApp from running its compression engine.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface/60 border border-surface-darker space-y-1">
                  <div className="font-bold text-text-main">Under 500KB Sweet Spot</div>
                  <div className="text-[11px] text-text-main/60 leading-tight">
                    Opens in 0.5 seconds even on 2G/3G connections in rural areas.
                  </div>
                </div>
              </div>
            </div>

            {/* Exactly ONE Sidebar Native Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Quick Navigation Links */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-5 space-y-3 shadow-card">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Related Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Compress PDF to 200KB</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Multi-Marksheet Merger</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/clean-document-scanner"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Clean Document Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Image to PDF (&lt;200KB)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Privacy & RAM Security Card */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>100% In-Memory RAM Shield</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Documents are re-encoded purely inside your browser memory without being transmitted to any remote storage.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/compress-for-whatsapp" />
      </div>
    </div>
  );
}
