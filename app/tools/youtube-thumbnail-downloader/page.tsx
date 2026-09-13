import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  PlaySquare,
  FileCheck,
  Globe2,
  Download,
} from 'lucide-react';
import { YoutubeThumbnailEngine } from '@/components/tools/YoutubeThumbnailEngine';
import { AdSlot } from '@/components/ads/AdSlot';

function YoutubeIcon({ className = "w-4 h-4 text-red-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader HD & 4K (1080p) Free | Kagazo',
  description:
    'Download YouTube video thumbnails in Ultra HD (1080p maxresdefault), High Quality (480p), and WebP formats. Supports YouTube Shorts, mobile links, and 1-click clipboard copy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/youtube-thumbnail-downloader',
  },
  openGraph: {
    title: 'YouTube Thumbnail Downloader HD & 4K Free | Kagazo',
    description: 'Download YouTube thumbnails in 1080p HD, convert to WebP, and copy to clipboard free.',
    url: 'https://kagazo.in/tools/youtube-thumbnail-downloader',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do I download a YouTube thumbnail in 1080p Full HD?',
    answer:
      'Paste the YouTube video link into the search box and click "Get Thumbnails". If the creator uploaded a 1080p/720p custom thumbnail, it will appear under "Maximum Resolution (1080p / 720p)". Click "Download JPG" to save the uncompressed file directly to your phone or computer.',
  },
  {
    question: 'Can I download thumbnails from YouTube Shorts?',
    answer:
      'Yes. Simply copy the share link from any YouTube Shorts video (e.g. youtube.com/shorts/...) and paste it into Kagazo. Our engine automatically parses the unique 11-character video ID.',
  },
  {
    question: 'Is downloading YouTube thumbnails legal?',
    answer:
      'Yes, YouTube thumbnails are publicly accessible assets hosted on Google’s content delivery network (img.youtube.com). You may download them for personal reference, fair-use analysis, inspiration, or archival purposes.',
  },
  {
    question: 'Why do some older YouTube videos lack a 1080p (maxresdefault) thumbnail?',
    answer:
      'Older YouTube videos (especially those uploaded before 2012) or videos where the uploader never assigned a custom high-resolution cover may only have 480×360 (HQ) or 640×480 (SD) auto-generated captures from the video stream.',
  },
];

export default function YoutubeThumbnailDownloaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'YouTube Thumbnail Downloader HD',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/youtube-thumbnail-downloader',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to extract and download high-resolution YouTube thumbnails in 1080p, 720p, 480p, and WebP format.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Download YouTube Video Thumbnails in HD',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Copy YouTube Video Link',
            text: 'Copy the URL from your browser address bar or share sheet (YouTube video, Shorts, or youtu.be link).',
          },
          {
            '@type': 'HowToStep',
            name: 'Paste Link into Kagazo',
            text: 'Paste the link into the YouTube Thumbnail Downloader search bar and press Enter.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Quality Tier',
            text: 'Choose between Maximum Resolution (1080p), High Definition (480p), or WebP.',
          },
          {
            '@type': 'HowToStep',
            name: 'Save or Copy to Clipboard',
            text: 'Click Download JPG to save the image directly to your device, or click Copy to paste into design editors.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">YouTube Thumbnail Downloader</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs sm:text-sm font-semibold text-red-600 shadow-2xs">
            <YoutubeIcon className="w-4 h-4 text-red-600 shrink-0" />
            <span>Official Google CDN Direct Endpoints • 1080p &amp; 4K</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            YouTube Thumbnail Downloader HD / 4K
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Download high-definition video thumbnails from any YouTube video or Shorts. Grab uncompressed{' '}
            <strong>1080p (maxresdefault)</strong> covers, convert to WebP, or copy directly to clipboard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant 1-Click Download
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-primary" /> WebP Fast Converter
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free &amp; Private
            </span>
          </div>
        </header>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <YoutubeThumbnailEngine />

            <AdSlot slot="post_download" />

            {/* Technical Resolution Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  YouTube Thumbnail CDN Specifications Guide
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Standard image endpoints provided by Google for creator thumbnails.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Filename</th>
                      <th className="p-3.5">Resolution</th>
                      <th className="p-3.5">Aspect Ratio</th>
                      <th className="p-3.5">Quality Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80 font-mono text-xs">
                    <tr>
                      <td className="p-3.5 font-bold text-primary">maxresdefault.jpg</td>
                      <td className="p-3.5 font-bold">1920 × 1080 / 1280 × 720</td>
                      <td className="p-3.5">16:9 Widescreen</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Full HD (Best Quality)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">sddefault.jpg</td>
                      <td className="p-3.5">640 × 480</td>
                      <td className="p-3.5">4:3 Standard</td>
                      <td className="p-3.5 text-text-main font-semibold">Standard Definition</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">hqdefault.jpg</td>
                      <td className="p-3.5">480 × 360</td>
                      <td className="p-3.5">4:3 Standard</td>
                      <td className="p-3.5 text-text-main font-semibold">High Quality (Universal)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">mqdefault.jpg</td>
                      <td className="p-3.5">320 × 180</td>
                      <td className="p-3.5">16:9 Widescreen</td>
                      <td className="p-3.5 text-text-main/70">Medium Quality (Mobile)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQs Accordion */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Answers to common questions about extracting and using YouTube covers.
                </p>
              </div>

              <div className="divide-y divide-surface-darker/70">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group py-4 first:pt-0 last:pb-0">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-text-main group-hover:text-primary transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed pl-2 border-l-2 border-primary/30">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Media Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
                </Link>
                <Link
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP
                </Link>
                <Link
                  href="/tools/image-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Universal Image Converter
                </Link>
                <Link
                  href="/tools/change-image-dpi"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Change Image DPI
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Thumbnail URLs are loaded directly from Google CDN to your browser. Zero logs or tracking.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
