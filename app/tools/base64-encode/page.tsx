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
  Upload,
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
  Binary,
} from 'lucide-react';
import { Base64StudioEngine } from '@/components/tools/Base64StudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Base64 Encoder Online | Text & Binary to Base64 | Kagazo',
  description:
    'Convert plain text, UTF-8 strings, and binary files (PNG, JPG, SVG, PDF) to Base64 format online. Features RFC 4648 compliance, URL-safe Base64 mode, Data URI generation, and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/base64-encode',
  },
  openGraph: {
    title: 'Free Base64 Encoder Online | Kagazo',
    description:
      'Convert text and binary files to RFC 4648 Base64 with URL-safe mode and Data URI generator with zero server uploads.',
    url: 'https://kagazo.in/tools/base64-encode',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Base64 Encoder & Data URI Generator | Kagazo',
    description:
      'Encode text, Unicode, and files to Base64 instantly in client-side RAM with 100% privacy.',
  },
};

const BASE64_SPEC_MATRIX = [
  {
    standard: 'RFC 4648 Standard',
    alphabet: 'A–Z, a–z, 0–9, +, /',
    paddingChar: '= (mandatory to pad 24-bit blocks)',
    overhead: '+33.3% raw byte expansion',
    typicalUsage: 'Email MIME attachments, Basic Auth headers, Data URIs',
  },
  {
    standard: 'RFC 4648 URL-Safe',
    alphabet: 'A–Z, a–z, 0–9, -, _',
    paddingChar: 'None or unpadded (stripped =)',
    overhead: '+33.3% raw byte expansion',
    typicalUsage: 'JWT tokens, URL query strings, filename slugs',
  },
  {
    standard: 'Data URI Scheme',
    alphabet: 'data:[<mediatype>][;base64],<data>',
    paddingChar: 'Follows RFC 4648 standard',
    overhead: 'MIME prefix + 33.3% data',
    typicalUsage: 'Inline SVG/PNG in CSS backgrounds and HTML <img>',
  },
  {
    standard: 'MIME / PEM Certificate',
    alphabet: 'Standard Base64 with line breaks at 64 or 76 chars',
    paddingChar: '=',
    overhead: '+33.3% + newline characters',
    typicalUsage: 'SSL/TLS PEM certificates, PGP public keys, S/MIME',
  },
];

const FAQS = [
  {
    question: 'How does Base64 encoding work at the binary bit level?',
    answer:
      'Base64 is a binary-to-text translation scheme defined in RFC 4648. It takes groups of 3 input bytes (24 bits) and splits them into 4 chunks of 6 bits each. Each 6-bit index (values 0 to 63) maps directly to a printable ASCII character: A–Z (0–25), a–z (26–51), 0–9 (52–61), + (62), and / (63). This converts arbitrary binary sequences into safe printable ASCII strings.',
  },
  {
    question: 'Why does Base64 encoding increase file size by roughly 33%?',
    answer:
      'Because every 3 bytes (24 bits) of raw binary input are converted into 4 printable ASCII characters (32 bits), the output data volume expands by exactly 4 divided by 3 (133.33%), representing an exact 33.3% data size overhead. If padding characters (=) are appended, small payloads may exhibit slightly higher overhead.',
  },
  {
    question: 'What is the difference between standard Base64 and URL-Safe Base64?',
    answer:
      'Standard Base64 contains the characters "+" and "/", which have reserved meanings in HTTP URL query strings and URI path hierarchies. URL-safe Base64 substitutes "+" with "-" and "/" with "_", and frequently strips trailing "=" padding characters to ensure strings can be safely passed inside URLs and JSON Web Tokens (JWTs) without requiring secondary percent-encoding.',
  },
  {
    question: 'Does this tool properly handle multi-byte Unicode strings and emojis?',
    answer:
      'Yes. Unlike the legacy JavaScript btoa() method—which throws an InvalidCharacterError when encountering characters outside the Latin-1 range (ASCII code 255)—our engine uses modern UTF-8 TextEncoder byte streams. Emojis (🚀, 💡), non-Latin alphabets (Arabic, Devanagari, Cyrillic, Kanji), and mathematical symbols encode flawlessly without character corruption.',
  },
  {
    question: 'Are my confidential files or passwords uploaded to remote servers during encoding?',
    answer:
      'Never. Kagazo executes all binary conversions, FileReader operations, and Base64 translations 100% inside your browser’s volatile JavaScript memory. Not a single byte of text or uploaded file data is ever transmitted across external networks or stored on remote servers.',
  },
  {
    question: 'How do I create an inline image Data URI for HTML or CSS?',
    answer:
      'Upload your PNG, JPG, or SVG image into Kagazo. Our tool automatically detects the MIME type (such as image/png) and prefixes the output with data:image/png;base64,..., providing a 1-click button to copy the ready-to-use Data URI string.',
  },
  {
    question: 'Is Base64 an encryption algorithm?',
    answer:
      'No! Base64 is strictly an encoding format, not encryption. It provides zero cryptographic security or confidentiality. Anyone can decode a Base64 string back into original plaintext without needing a secret key. Never use Base64 alone to protect passwords or secrets.',
  },
  {
    question: 'Can I encode binary PDF or audio files into Base64?',
    answer:
      'Yes. Drag and drop any binary file into the uploader. The browser reads the raw binary array buffer via the HTML5 FileReader API and converts it into RFC 4648 Base64 text.',
  },
  {
    question: 'What do the trailing equal signs (=) mean in Base64?',
    answer:
      'Equal signs are padding characters. Because Base64 operates on 3-byte chunks (24 bits), if the input length is not divisible by 3, one (=) or two (==) padding characters are appended to indicate how many dummy zero bytes were added.',
  },
  {
    question: 'Can I download the encoded Base64 output as a .txt file?',
    answer:
      'Yes. Click "Download Base64" to export the generated string directly as a plain text file on your local computer with zero watermarks or registration.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input Text or Drag & Drop File',
    desc: 'Paste plain text into the editor or drag and drop any image, document, or binary file into the upload box.',
  },
  {
    step: 2,
    title: 'Select RFC 4648 Mode',
    desc: 'Choose Standard Base64 for email MIME / Basic Auth or enable URL-Safe mode (- and _) for web URLs and JWTs.',
  },
  {
    step: 3,
    title: 'Automatic UTF-8 Byte Stream',
    desc: 'The engine translates characters into UTF-8 octets, preserving multi-byte international text and emojis.',
  },
  {
    step: 4,
    title: 'Generate Full Data URI',
    desc: 'For image files, the engine automatically extracts the MIME type and builds an inline data:image/... URI.',
  },
  {
    step: 5,
    title: 'Copy or Download String',
    desc: 'Copy the standard Base64 string or Data URI to your clipboard with 1 click, or download the text file.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: InvalidCharacterError: "btoa" Failed',
    title: 'Non-Latin-1 Characters & Emojis',
    desc: 'Legacy JavaScript window.btoa() crashes when characters exceed code point 255. Kagazo uses modern TextEncoder streams to encode all international Unicode characters and emojis safely.',
  },
  {
    badge: 'Error: Broken URL Query Parameters',
    title: 'Standard Base64 Inside Web URLs',
    desc: 'Standard Base64 uses + and /, which conflict with URL parameter syntax and path delimiters. Enable URL-Safe mode to replace + with - and / with _.',
  },
  {
    badge: 'Error: Broken CSS Background Data URIs',
    title: 'Missing MIME Type Prefix',
    desc: 'Using raw Base64 strings inside CSS url() without the data:image/png;base64, prefix fails to render. Kagazo generates the complete, syntactically correct Data URI automatically.',
  },
  {
    badge: 'Error: False Sense of Data Security',
    title: 'Confusing Encoding with Encryption',
    desc: 'Base64 offers zero data protection. Never use Base64 to store sensitive passwords or access tokens without applying AES or RSA encryption algorithms first.',
  },
];

export default function Base64EncodePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Base64 Encoder & Data URI Studio',
        url: 'https://kagazo.in/tools/base64-encode',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert text, Unicode strings, and binary files to RFC 4648 Base64 online. Features URL-safe mode, Data URI formatting, and zero server uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Encode Text and Files to Base64 Online in 5 Steps',
        description:
          'Step-by-step instructions to convert plain text or binary files into Base64 format for API payloads and CSS assets.',
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
            name: 'Base64 Encode',
            item: 'https://kagazo.in/tools/base64-encode',
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">Base64 Encode</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 4648 Binary-to-Text Studio &bull; UTF-8 &amp; URL-Safe Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Base64 Encoder &amp; </span>
            <span className="text-primary">Data URI Generator Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert text, Unicode strings, and binary files (PNG, JPG, PDF) to <strong>RFC 4648 Base64</strong>. Supports <strong>URL-Safe mode</strong> and inline Data URIs with zero remote network transmission.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <Base64StudioEngine initialMode="encode" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Binary Transformation
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Enterprise Binary-to-Text Serializer in Volatile RAM
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                HTTP and JSON protocols cannot safely transfer raw 8-bit binary bytes. Base64 serializes arbitrary files and text into safe ASCII characters for reliable network transmission.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Binary className="w-4 h-4" /> Full UTF-8 &amp; Emoji Safe
                  </span>
                  <p className="text-xs text-text-main/70">
                    Encodes international alphabets, math symbols, and emojis without Latin-1 character corruption.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Upload className="w-4 h-4" /> File Drag &amp; Drop
                  </span>
                  <p className="text-xs text-text-main/70">
                    Upload PNG, JPG, or PDF files to generate full inline data:image/... URIs with 1-click copying.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All file conversions run locally in browser memory. Sensitive images and passwords are never uploaded.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Base64 Encoding Specifications &amp; Overhead Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Comparison of RFC 4648 standards, permitted alphabets, and typical use cases.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  RFC 4648 Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Standard / Scheme</th>
                      <th className="py-3 px-3">Permitted Alphabet</th>
                      <th className="py-3 px-3">Padding Rule</th>
                      <th className="py-3 px-3">Byte Overhead</th>
                      <th className="py-3 px-3">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {BASE64_SPEC_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.standard}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{row.alphabet}</td>
                        <td className="py-3 px-3 font-mono text-xs text-amber-700">{row.paddingChar}</td>
                        <td className="py-3 px-3 font-semibold text-rose-600">{row.overhead}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.typicalUsage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>33.3% Overhead Notice:</strong> Because every 3 input bytes (24 bits) produce 4 output ASCII characters (32 bits), Base64 increases data size by exactly one third.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Encode Data to Base64 in 5 Steps
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
                Common Base64 Encoding Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Base64 Encoding &amp; Data URIs)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights into binary serialization, RFC 4648 standards, and data overhead.
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
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Encoding Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/base64-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Decoder
                </Link>
                <Link
                  href="/tools/url-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Encoder
                </Link>
                <Link
                  href="/tools/html-entity-encoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Encoder
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
