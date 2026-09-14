import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Code,
  FileCheck,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle,
  Terminal,
  Activity,
  ArrowRightLeft,
  Copy,
  AlertTriangle,
  Info,
  Sliders,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Base64StudioEngine } from '@/components/tools/Base64StudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Base64 Decoder Online | Decode Base64 to Text & Images | Kagazo',
  description:
    'Decode Base64 strings to readable plain text or preview decoded images online. Supports URL-safe Base64 strings, UTF-8 multi-byte characters, missing padding auto-correction, and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/base64-decode',
  },
  openGraph: {
    title: 'Free Base64 Decoder Online | Kagazo',
    description:
      'Decode Base64 strings into text or preview decoded images with auto-padding and zero server uploads.',
    url: 'https://kagazo.in/tools/base64-decode',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Base64 Decoder & Image Viewer | Kagazo',
    description:
      'Decode Base64 payloads and inspect image data URIs in client-side RAM with 100% privacy.',
  },
};

const BASE64_DECODE_MATRIX = [
  {
    pattern: 'Plain Text Base64',
    sample: 'V2VsY29tZSB0byBLYWdhem8=',
    detectedType: 'UTF-8 Text String',
    handling: 'Decodes via TextDecoder byte stream',
    resolution: 'Immediate display in decoded text box',
  },
  {
    pattern: 'Data URI Image',
    sample: 'data:image/png;base64,iVBORw0KGgo...',
    detectedType: 'PNG / JPEG / WebP / SVG',
    handling: 'Extracts MIME prefix & builds Object URL',
    resolution: 'Renders high-resolution image preview & download',
  },
  {
    pattern: 'URL-Safe Base64',
    sample: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    detectedType: 'JWT / URL Token',
    handling: 'Substitutes - with + and _ with /',
    resolution: 'Auto-calculates modulo-4 padding and parses JSON',
  },
  {
    pattern: 'Unpadded Base64',
    sample: 'SGVsbG8gV29ybGQ',
    detectedType: 'Truncated Padding String',
    handling: 'Detects missing = characters (len % 4)',
    resolution: 'Appends missing = or == before binary decoding',
  },
  {
    pattern: 'Binary Executable / PDF',
    sample: 'JVBERi0xLjQKJ...',
    detectedType: 'PDF Document / Binary Stream',
    handling: 'Identifies file magic header bytes (%PDF)',
    resolution: 'Provides raw binary byte inspection & download',
  },
];

const FAQS = [
  {
    question: 'How does Kagazo decode Base64 strings back to text or images?',
    answer:
      'When you paste a Base64 string, Kagazo scans the character stream to determine if it is a Data URI, URL-safe token, or standard ASCII string. It maps each 4-character block back into 3 raw binary bytes, detects magic file signatures (such as %PDF or PNG headers), and converts text bytes using modern UTF-8 TextDecoder algorithms.',
  },
  {
    question: 'What causes the "Failed to execute atob: The string to be decoded is not correctly encoded" error?',
    answer:
      'This common browser error occurs when a Base64 string has an invalid length (not a multiple of 4), contains characters outside the standard Base64 alphabet (such as spaces or invalid punctuation), or contains URL-safe characters (- and _) that legacy atob() cannot parse. Kagazo automatically normalizes whitespace, sanitizes URL-safe tokens, and repairs missing padding to prevent decoding errors.',
  },
  {
    question: 'Can I decode and preview Base64 image strings directly?',
    answer:
      'Yes. If your Base64 input is an image Data URI or raw image payload (PNG, JPG, GIF, WebP, SVG), Kagazo instantly renders a live visual preview in the output pane, displaying the image dimensions and offering a 1-click download button for the extracted image file.',
  },
  {
    question: 'How does this tool handle UTF-8 multi-byte characters and international languages?',
    answer:
      'Legacy JavaScript decoding using window.atob() corrupts accented Latin, Chinese, Cyrillic, and emoji characters because it treats every byte as 8-bit ASCII. Kagazo uses the modern browser TextDecoder("utf-8") API, ensuring flawless reconstruction of international scripts and multi-byte UTF-8 symbols.',
  },
  {
    question: 'Are my decoded authentication tokens, API keys, or images sent to remote servers?',
    answer:
      'Never. 100% of the decoding, byte stream extraction, and image rendering occur inside your browser’s local sandbox memory. Zero tokens, passwords, or decoded images are ever transmitted across external network connections or logged to remote servers.',
  },
  {
    question: 'How do I decode a JSON Web Token (JWT) payload with this tool?',
    answer:
      'Paste the middle segment of your JWT (between the two dots). Kagazo automatically replaces URL-safe characters (- and _), appends the missing padding (=), and displays the decoded JSON claims object instantly.',
  },
  {
    question: 'Can I extract and download the original file from a Base64 string?',
    answer:
      'Yes. If the decoded payload represents an image or binary document, clicking "Download File" converts the reconstructed byte buffer into a local blob and triggers a direct browser download.',
  },
  {
    question: 'What happens if a Base64 string contains line breaks or spaces?',
    answer:
      'Email MIME attachments and SSL PEM certificates insert carriage returns every 64 or 76 characters. Kagazo automatically strips all whitespace and newlines before initiating binary decoding.',
  },
  {
    question: 'Can I decode PDF files stored as Base64 strings?',
    answer:
      'Yes. Kagazo recognizes the %PDF magic header in binary streams and allows you to download the reconstructed .pdf file with 100% binary fidelity.',
  },
  {
    question: 'What is the maximum payload size supported for decoding?',
    answer:
      'You can decode payloads up to 100 MB smoothly depending on your local machine’s RAM, since all decoding operations occur client-side without network timeout limits.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Paste Base64 Payload',
    desc: 'Paste raw Base64 text, an inline Data URI (data:image/...), or a JWT segment into the input editor.',
  },
  {
    step: 2,
    title: 'Automated Padding Correction',
    desc: 'The engine calculates missing padding characters (= or ==) and converts URL-safe - and _ characters.',
  },
  {
    step: 3,
    title: 'Inspect Decoded Output',
    desc: 'Review the reconstructed UTF-8 text string or view the live rendered high-resolution image preview.',
  },
  {
    step: 4,
    title: 'Verify File MIME Header',
    desc: 'The engine inspects binary magic bytes (%PDF, PNG, JPEG) to verify file integrity and format accuracy.',
  },
  {
    step: 5,
    title: 'Copy Text or Export File',
    desc: 'Copy the decoded text with 1 click or download the extracted binary image or document directly to your device.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Failed to Execute "atob": Invalid String Length',
    title: 'Missing Modulo-4 Padding Equal Signs (=)',
    desc: 'Standard Base64 strings must have lengths divisible by 4. Systems that strip trailing = characters cause native decoders to crash. Kagazo calculates missing padding and restores it automatically.',
  },
  {
    badge: 'Error: Invalid Character at Index X',
    title: 'URL-Safe Characters (- and _) Inside Payloads',
    desc: 'Standard decoders crash when encountering URL-safe dashes and underscores. Kagazo substitutes them back into + and / before binary translation.',
  },
  {
    badge: 'Error: Garbled Accented Letters or Emojis',
    title: '8-Bit Latin-1 Encoding Mismatch',
    desc: 'Legacy atob() assumes single-byte ASCII, destroying multi-byte UTF-8 international text. Kagazo uses browser TextDecoder("utf-8") to preserve full Unicode fidelity.',
  },
  {
    badge: 'Error: Truncated Image Preview',
    title: 'Corrupted Base64 Data URI Headers',
    desc: 'Missing the base64, delimiter in data:image/png;base64,... prevents browsers from parsing images. Kagazo repairs damaged headers automatically.',
  },
];

export default function Base64DecodePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Base64 Decoder & Image Viewer',
        url: 'https://kagazo.in/tools/base64-decode',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Decode Base64 strings to text or preview images online. Handles URL-safe Base64, auto-padding repair, and UTF-8 multi-byte decoding with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Decode Base64 Strings to Text or Images Online in 5 Steps',
        description:
          'Step-by-step instructions to convert Base64 strings back to plain text, inspect JSON payloads, or download decoded images.',
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
            name: 'Developer Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Base64 Decode',
            item: 'https://kagazo.in/tools/base64-decode',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">Base64 Decode</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-700 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Base64 String to Plain Text &bull; Live Image Viewer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Base64 Decoder &amp; </span>
            <span className="text-emerald-600">Image Viewer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert Base64 back into human-readable text or image files. Automatically handles <strong>URL-Safe strings (- and _) and missing padding</strong> with zero server uploads.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <Base64StudioEngine initialMode="decode" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Format Diagnostics
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Intelligent Base64 Detection &amp; Auto-Padding Correction
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Standard decoders crash when encountering unpadded strings, URL-safe tokens, or image Data URIs. Kagazo normalizes byte boundaries in browser RAM to guarantee error-free decoding.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Auto-Padding Repair
                  </span>
                  <p className="text-xs text-text-main/70">
                    Calculates missing padding equal signs (=) automatically, resolving legacy atob() decode failures.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> Live Image Preview
                  </span>
                  <p className="text-xs text-text-main/70">
                    Instantly renders PNG, JPG, WebP, and SVG images from Data URIs with a 1-click download button.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% Client-Side Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Decodes tokens, auth secrets, and documents strictly in local RAM. Zero data is ever logged to servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Base64 Decoding &amp; Format Detection Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Comprehensive breakdown of input formats, binary header recognition, and decoding routines.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Format Diagnostics
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Input Pattern</th>
                      <th className="py-3 px-3">Sample Payload</th>
                      <th className="py-3 px-3">Detected Format</th>
                      <th className="py-3 px-3">Decoding Routine</th>
                      <th className="py-3 px-3">Output Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {BASE64_DECODE_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.pattern}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{row.sample}</td>
                        <td className="py-3 px-3 font-semibold text-emerald-700">{row.detectedType}</td>
                        <td className="py-3 px-3 text-xs">{row.handling}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>JWT Decoding:</strong> For JSON Web Tokens, paste the middle payload segment. Kagazo automatically normalizes URL-safe characters and appends missing equal signs.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                How to Decode Base64 Strings in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
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
                Common Base64 Decoding Failures and How Kagazo Fixes Them
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
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  Frequently Asked Questions (Base64 Decoding &amp; Formats)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive answers regarding Base64 deserialization, image extraction, and security.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-emerald-600 font-black">Q{idx + 1}.</span>
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
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Encoding Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/base64-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Encoder
                </Link>
                <Link
                  href="/tools/url-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Decoder
                </Link>
                <Link
                  href="/tools/html-entity-decoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Decoder
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
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
