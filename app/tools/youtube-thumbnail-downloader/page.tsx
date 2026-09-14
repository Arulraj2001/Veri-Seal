import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Info,
  Download,
  PlaySquare,
  FileCheck,
  Globe2,
} from 'lucide-react';
import { YoutubeThumbnailEngine } from '@/components/tools/YoutubeThumbnailEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader HD & 4K (1080p) Free | Kagazo',
  description:
    'Download YouTube video thumbnails in Ultra HD (1080p maxresdefault), High Quality (480p), and WebP formats. Supports YouTube Shorts, mobile links, and 1-click clipboard copy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/youtube-thumbnail-downloader',
  },
  openGraph: {
    title: 'YouTube Thumbnail Downloader HD & 4K Free | Kagazo',
    description:
      'Download YouTube thumbnails in 1080p Full HD, convert to WebP, and copy to clipboard free with zero watermarks.',
    url: 'https://kagazo.in/tools/youtube-thumbnail-downloader',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Thumbnail Downloader HD & 4K Free | Kagazo',
    description:
      'Download high-resolution YouTube thumbnails in 1080p, 720p, and 480p with instant clipboard copying.',
  },
};

const THUMBNAIL_SPECS = [
  {
    quality: 'Maximum Resolution (Full HD)',
    tag: 'maxresdefault.jpg',
    resolution: '1920 × 1080 px (1080p)',
    ratio: '16:9 Widescreen',
    notes: 'Available when creator uploads 1080p/720p custom cover',
  },
  {
    quality: 'Standard Definition (SD)',
    tag: 'sddefault.jpg',
    resolution: '640 × 480 px (480p)',
    ratio: '4:3 (Letterboxed 16:9)',
    notes: 'High-speed preview fallback for mid-tier devices',
  },
  {
    quality: 'High Quality (HQ)',
    tag: 'hqdefault.jpg',
    resolution: '480 × 360 px (360p)',
    ratio: '4:3 Pillarboxed',
    notes: 'Universal fallback generated for 100% of YouTube videos',
  },
  {
    quality: 'Medium Quality (MQ)',
    tag: 'mqdefault.jpg',
    resolution: '320 × 180 px (180p)',
    ratio: '16:9 Widescreen',
    notes: 'Optimized for mobile search results and feed lists',
  },
  {
    quality: 'Player Background Cover',
    tag: '0.jpg (Default)',
    resolution: '480 × 360 px',
    ratio: '4:3 Aspect Ratio',
    notes: 'Primary frame thumbnail embedded inside player iframe',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Copy YouTube Video Link',
    desc: 'Copy any video link from YouTube, YouTube Shorts, or the mobile app (e.g. youtube.com/watch?v=... or youtu.be/...).',
  },
  {
    step: 2,
    title: 'Paste URL into Kagazo',
    desc: 'Paste the link into the search bar. The engine immediately parses the unique 11-character video ID in client-side RAM.',
  },
  {
    step: 3,
    title: 'Preview All Resolutions',
    desc: 'Inspect live visual previews across Maximum Resolution (1080p), Standard (480p), and High Quality (360p).',
  },
  {
    step: 4,
    title: 'Choose Output Format',
    desc: 'Select standard JPG for full-fidelity graphic design or convert to next-gen WebP for lightweight blog thumbnails.',
  },
  {
    step: 5,
    title: 'Download or Copy Image',
    desc: 'Click Download Image to save directly to your storage, or click Copy to Clipboard for instant pasting into Canva or Figma.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: 404 MaxRes Missing',
    title: 'Older Video Lacks 1080p (maxresdefault)',
    desc: 'When creators upload low-resolution videos (under 720p), YouTube does not generate a maxresdefault file. Kagazo automatically falls back to the highest available 480p hqdefault preview.',
  },
  {
    badge: 'Error: Shorts URL Incompatibility',
    title: 'Unsupported /shorts/ Link Syntax',
    desc: 'Many basic scrapers fail on YouTube Shorts URLs. Kagazo universal regex parser extracts the video ID equally from /shorts/, /embed/, youtu.be, and standard desktop URLs.',
  },
  {
    badge: 'Error: Letterbox Black Bars',
    title: 'Black Bars on Top & Bottom of 4:3 Thumbnails',
    desc: 'YouTube sddefault and hqdefault images pad 16:9 frames with black bars into a 4:3 container. Kagazo displays unpadded maxresdefault whenever available for pristine 16:9 edges.',
  },
  {
    badge: 'Error: Private / Region-Locked Content',
    title: 'Restricted Videos Failing to Load Thumbnails',
    desc: 'Thumbnails from private videos or country-blocked content are restricted on Google CDN. Kagazo alerts you immediately if the asset cannot be retrieved from public endpoints.',
  },
];

const FAQS = [
  {
    question: 'How do I download a YouTube thumbnail in 1080p Full HD?',
    answer:
      'Paste the YouTube video link into the search box and click "Get Thumbnails". If the creator uploaded a 1080p/720p custom thumbnail, it will appear under "Maximum Resolution (1080p / 720p)". Click "Download JPG" to save the uncompressed file directly to your phone or computer.',
  },
  {
    question: 'Can I download thumbnails from YouTube Shorts?',
    answer:
      'Yes. Simply copy the share link from any YouTube Shorts video (e.g. youtube.com/shorts/...) and paste it into Kagazo. Our engine automatically parses the unique 11-character video ID and fetches the high-resolution cover image.',
  },
  {
    question: 'Is downloading YouTube thumbnails legal?',
    answer:
      'Yes, YouTube thumbnails are publicly accessible assets hosted on Google content delivery network (img.youtube.com). You may download them for personal reference, fair-use analysis, inspiration, educational projects, or archival purposes.',
  },
  {
    question: 'Why do some older YouTube videos lack a 1080p (maxresdefault) thumbnail?',
    answer:
      'YouTube only generates maxresdefault.jpg if the uploader submitted a custom thumbnail with a resolution of at least 1280x720 pixels. For older videos or automated uploads, YouTube defaults to 640x480 (sddefault) or 480x360 (hqdefault).',
  },
  {
    question: 'What is the standard aspect ratio and dimension for YouTube thumbnails?',
    answer:
      'YouTube officially recommends a resolution of 1280 × 720 pixels (minimum width of 640 pixels) with a 16:9 widescreen aspect ratio. The file format should be JPG, PNG, or WebP, and remain under the 2 MB file size limit.',
  },
  {
    question: 'Can I convert downloaded YouTube thumbnails directly into WebP format?',
    answer:
      'Yes! Kagazo includes a client-side HTML5 canvas transcoder that converts the Google CDN JPEG thumbnail into a high-efficiency WebP image directly in your browser with zero quality loss and up to 35% smaller file size.',
  },
  {
    question: 'Does Kagazo track or store the YouTube links I enter?',
    answer:
      'Never. Kagazo operates entirely client-side. The YouTube video ID is extracted and resolved directly against public Google CDN servers in your local browser session without storing any URLs, user IP addresses, or browsing history.',
  },
  {
    question: 'How can I download a thumbnail on an iPhone or Android mobile device?',
    answer:
      'Open the YouTube mobile app, tap "Share" beneath any video, and choose "Copy link". Paste the URL into Kagazo in Safari or Chrome, tap "Get Thumbnails", and tap the Download button to save the photo directly into your device camera roll or downloads folder.',
  },
  {
    question: 'Why does my downloaded thumbnail have black bars on the top and bottom?',
    answer:
      'YouTube automatically pads standard definition thumbnails (hqdefault and sddefault) with black letterbox bars to conform to a 4:3 container. To avoid black bars, always select the 1080p Maximum Resolution option which preserves native 16:9 widescreen.',
  },
  {
    question: 'Can I copy the thumbnail directly to my clipboard without downloading the file?',
    answer:
      'Yes! Click the "Copy to Clipboard" button under any preview. Kagazo writes the image blob directly to the system clipboard using the asynchronous Clipboard API, allowing you to paste it instantly into Photoshop, Figma, or Word.',
  },
];

export default function YoutubeThumbnailPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'YouTube Thumbnail Downloader HD & 4K (1080p) Free',
        url: 'https://kagazo.in/tools/youtube-thumbnail-downloader',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Download YouTube thumbnails in 1080p HD, convert to WebP, and copy to clipboard free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Download YouTube Thumbnails in 5 Steps',
        description:
          'Step-by-step instructions to download high-definition YouTube video and Shorts thumbnails online free.',
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
            name: 'YouTube Thumbnail Downloader',
            item: 'https://kagazo.in/tools/youtube-thumbnail-downloader',
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
          <span className="text-primary font-bold truncate">YouTube Thumbnail Downloader</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>High-Resolution CDN Asset Grabber &amp; WebP Converter</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>YouTube Thumbnail Downloader </span>
            <span className="text-primary">HD &amp; 4K (1080p) Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Download YouTube video thumbnails in <strong>Ultra HD (1080p maxresdefault)</strong>, High Quality (480p), and modern WebP formats. Supports YouTube Shorts, mobile URLs, and 1-click clipboard copy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <PlaySquare className="w-4 h-4 text-primary" /> Full 1080p MaxRes Support
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Download className="w-4 h-4 text-primary" /> JPG &amp; WebP Instant Download
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <YoutubeThumbnailEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  CDN Asset Extraction
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Direct Google CDN Retrieval Without Watermarks or Re-encoding
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Kagazo connects directly to Google high-speed image content delivery network servers (img.youtube.com) to serve the original uncompressed source image uploaded by the creator.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <PlaySquare className="w-4 h-4" /> 1080p MaxRes Grabbing
                  </span>
                  <p className="text-xs text-text-main/70">
                    Retrieves true 1920×1080 full resolution files whenever available.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4" /> Shorts &amp; Mobile Links
                  </span>
                  <p className="text-xs text-text-main/70">
                    Universal URL regex parses standard watch URLs, shortlinks, and Shorts.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> In-Browser WebP Converter
                  </span>
                  <p className="text-xs text-text-main/70">
                    Convert any thumbnail into high-efficiency WebP in your browser in milliseconds.
                  </p>
                </div>
              </div>
            </section>

            {/* YouTube Thumbnail Hierarchy Matrix */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    YouTube Thumbnail Resolution Hierarchy Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Standard quality tiers generated automatically across Google CDN servers.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  CDN Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Quality Tier</th>
                      <th className="py-3 px-3">Google CDN Filename</th>
                      <th className="py-3 px-3">Resolution Dimensions</th>
                      <th className="py-3 px-3">Aspect Ratio</th>
                      <th className="py-3 px-3">Availability Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {THUMBNAIL_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{spec.quality}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{spec.tag}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{spec.resolution}</td>
                        <td className="py-3 px-3 text-xs text-text-main/80">{spec.ratio}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{spec.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Aspect Ratio Note:</strong> For clean presentations and graphic design work, always download the 1080p Maximum Resolution option to avoid the top and bottom black letterbox bars present in 4:3 standard definitions.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Download YouTube Thumbnails in 5 Steps
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
                Common Thumbnail Download Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (YouTube Thumbnail Downloader)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Authoritative answers on thumbnail resolutions, legality, WebP conversion, and CDN quirks.
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
                Related Media Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
                </Link>
                <Link
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/remove-background"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Remove Background
                </Link>
                <Link
                  href="/tools/color-picker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Color Picker &amp; Palette
                </Link>
                <Link
                  href="/tools/compress-image-to-100kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress to 100KB
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
