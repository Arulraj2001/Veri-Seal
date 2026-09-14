import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Link2,
  FileCheck,
  Table,
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
} from 'lucide-react';
import { UrlEncoderEngine } from '@/components/tools/UrlEncoderEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free URL Decoder Online | Percent-Decode URI & Query Strings | Kagazo',
  description:
    'Percent-decode URLs and query strings online per RFC 3986. Safely decode %20, %26, %3D, plus (+) signs, and multi-byte UTF-8 emojis with recursive unescaping and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/url-decode',
  },
  openGraph: {
    title: 'Free URL Decoder Online | Kagazo',
    description:
      'Percent-decode URLs and inspect query parameter breakdowns in real time with RFC 3986 compliance and zero server logging.',
    url: 'https://kagazo.in/tools/url-decode',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free URL Decoder & Query Unescaper | Kagazo',
    description:
      'Percent-decode URLs and query strings instantly in client-side RAM with 100% privacy.',
  },
};

const RFC_3986_DECODE_MATRIX = [
  {
    sequence: '%20 or +',
    decodedChar: 'Space ( )',
    standard: 'RFC 3986 & WHATWG Form Spec',
    description: 'Decodes hex %20 or form plus sign into a standard whitespace character',
  },
  {
    sequence: '%26',
    decodedChar: 'Ampersand (&)',
    standard: 'RFC 3986 Reserved',
    description: 'Restores literal ampersand previously encoded to prevent query param splitting',
  },
  {
    sequence: '%3D',
    decodedChar: 'Equals Sign (=)',
    standard: 'RFC 3986 Reserved',
    description: 'Restores literal equals sign previously encoded to protect key-value mapping',
  },
  {
    sequence: '%2F',
    decodedChar: 'Forward Slash (/)',
    standard: 'RFC 3986 Reserved',
    description: 'Restores directory path delimiters in URLs and routing endpoints',
  },
  {
    sequence: '%3F and %23',
    decodedChar: '? and #',
    standard: 'RFC 3986 Reserved',
    description: 'Restores query starter (?) and hash fragment identifier (#)',
  },
  {
    sequence: '%F0%9F%9A%80',
    decodedChar: 'Emoji (🚀)',
    standard: 'Unicode UTF-8 (4-Octet)',
    description: 'Reassembles consecutive hex byte sequences into high-surrogate UTF-8 symbols',
  },
];

const FAQS = [
  {
    question: 'What is URL decoding (percent-decoding) and how does RFC 3986 define it?',
    answer:
      'URL decoding, or percent-decoding, is the reverse process of percent-encoding defined in RFC 3986 Section 2.1. It scans a URI string for triplets consisting of a percent symbol (%) followed by two hexadecimal digits, converting each triplet back into its corresponding 8-bit octet, and assembling multi-byte octet sequences into original UTF-8 characters.',
  },
  {
    question: 'Why does JavaScript throw "URIError: URI malformed" during decoding?',
    answer:
      'The native decodeURIComponent() function throws a URIError when it encounters an invalid percent triplet—such as a single "%" followed by non-hex characters, a trailing "%" at the end of the string, or an illegal UTF-8 byte sequence. Kagazo catches malformed sequences gracefully, allowing developers to inspect damaged URLs without crashing.',
  },
  {
    question: 'How should plus signs (+) be handled when decoding query strings?',
    answer:
      'Under the W3C HTML form specification (application/x-www-form-urlencoded), spaces in form inputs are converted to plus signs (+). However, standard RFC 3986 specifies that spaces should be encoded as %20, and a literal "+" means a plus symbol. Kagazo provides an explicit toggle to decode "+" as spaces or preserve them literally.',
  },
  {
    question: 'What is recursive or double decoding and when is it necessary?',
    answer:
      'Double decoding occurs when a URL was accidentally encoded multiple times by nested microservices or proxy redirects (e.g., %20 became %2520). A single decoding pass only turns %2520 into %20. Kagazo allows multi-pass recursive decoding to strip away stacked encoding layers until clean plaintext is recovered.',
  },
  {
    question: 'How does the decoder restore multi-byte UTF-8 characters and international alphabets?',
    answer:
      'International characters (such as Arabic, Chinese, Devanagari, or emojis) consist of 2 to 4 UTF-8 bytes. Each byte is represented in the URL by a %XX sequence (e.g., %F0%9F%9A%80 for 🚀). The decoder reads the sequence of byte values into a Uint8Array and decodes them via UTF-8 TextDecoder into correct Unicode characters.',
  },
  {
    question: 'What is the difference between decodeURI() and decodeURIComponent()?',
    answer:
      'decodeURI() decodes percent sequences in a full URL but leaves structural characters like %2F (/) and %26 (&) encoded to prevent corrupting the URL structure. In contrast, decodeURIComponent() decodes every single percent triplet, including reserved delimiters. Use decodeURIComponent() for query string values.',
  },
  {
    question: 'How can malformed percent-encoded sequences lead to security vulnerabilities?',
    answer:
      'Attackers use double encoding (e.g., %252F for /) to bypass Web Application Firewalls (WAFs) and directory traversal filters. If a backend server decodes the URL twice after the security check has passed, path traversal attacks (../../) can succeed. Client-side URL debugging helps security teams spot these evasion techniques.',
  },
  {
    question: 'Can I decode nested OAuth redirect URLs and JSON payloads in query strings?',
    answer:
      'Yes. OAuth2 callbacks often pass entire JSON strings or nested redirect targets inside ?state= or ?redirect_uri=. Pasting the full query into Kagazo automatically unescapes the nested values and formats the parameter breakdown for rapid inspection.',
  },
  {
    question: 'Are my sensitive URLs, API tokens, or session IDs uploaded to any server?',
    answer:
      'Never. Kagazo performs 100% of all string decoding and regex replacements inside your local web browser memory. No text, tokens, or URL paths are ever transmitted across external networks.',
  },
  {
    question: 'Can I copy or download the decoded output directly?',
    answer:
      'Yes. Kagazo provides 1-click clipboard copying for both the full decoded URL and individual parameter values, plus a button to export the output as a clean text file.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input Encoded URL or Query String',
    desc: 'Paste a percent-encoded web address, API endpoint, or raw query string into the editor.',
  },
  {
    step: 2,
    title: 'Select Decoding Scope',
    desc: 'Choose "Component" (decodeURIComponent) for query values or "Full URI" (decodeURI) for complete URLs.',
  },
  {
    step: 3,
    title: 'Configure Plus (+) Space Handling',
    desc: 'Toggle whether form plus signs should be decoded into whitespace or kept as literal "+" symbols.',
  },
  {
    step: 4,
    title: 'Inspect Decoded Parameters',
    desc: 'View the dissected parameters table to verify that nested redirect URLs and values are correctly recovered.',
  },
  {
    step: 5,
    title: 'Copy Clean Plaintext',
    desc: 'Copy the fully decoded URL or individual parameter keys and values with a single click.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: URIError: URI malformed',
    title: 'Damaged or Incomplete %HEX Triplets',
    desc: 'Occurs when a URL contains an orphan "%" without two trailing hex digits or an invalid UTF-8 byte boundary. Kagazo highlights damaged sequences so you can isolate truncations.',
  },
  {
    badge: 'Error: Lingering Plus (+) Signs',
    title: 'Form Encoded Spaces Left Unconverted',
    desc: 'Standard decodeURI() leaves "+" characters intact. If your input originated from an HTML form (application/x-www-form-urlencoded), enable form mode to convert "+" into spaces.',
  },
  {
    badge: 'Error: Double-Encoded %2520 Residue',
    title: 'Multiple Encoding Layers Unresolved',
    desc: 'If a service encoded an already-encoded URL, one decode pass leaves "%20" instead of spaces. Run Kagazo’s multi-pass decoding to peel off nested encoding layers.',
  },
  {
    badge: 'Error: Garbled Unicode Replacement ()',
    title: 'Truncated Multi-Byte Octets',
    desc: 'Copying partial percent-encoded strings can slice multi-byte UTF-8 characters in half, resulting in replacement diamonds. Ensure the full %XX sequence is pasted.',
  },
];

export default function UrlDecodePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo URL Decoder & Parameter Unescaper',
        url: 'https://kagazo.in/tools/url-decode',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Percent-decode URLs and query strings online per RFC 3986. Safely decode %20, %26, %3D, plus signs, and multi-byte UTF-8 characters with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Percent-Decode URLs and Query Parameters Online in 5 Steps',
        description:
          'Step-by-step instructions to safely decode percent-encoded URLs and restore readable query strings.',
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
            name: 'URL Decode',
            item: 'https://kagazo.in/tools/url-decode',
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
          <span className="text-primary font-bold">URL Decode</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 3986 Percent Unescaper &bull; Multi-Byte UTF-8 Recovery</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free URL Decoder &amp; </span>
            <span className="text-primary">Query Unescaper Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Percent-decode URLs, API endpoints, and query strings per <strong>RFC 3986</strong>. Handles <strong>%20</strong>, <strong>+ signs</strong>, nested OAuth redirects, and multi-byte UTF-8 emojis with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <UrlEncoderEngine initialMode="decode" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Decoding Intelligence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  RFC 3986 Percent Decoding with Resilient Error Recovery
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Damaged percent sequences and double-encoded URLs frequently crash native JavaScript methods. Kagazo provides fault-tolerant URL decoding with structured query decomposition.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Resilient Error Handling
                  </span>
                  <p className="text-xs text-text-main/70">
                    Safely parses damaged or partial percent triplets without crashing with fatal URIError exceptions.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Table className="w-4 h-4" /> Form Plus (+) Decoding
                  </span>
                  <p className="text-xs text-text-main/70">
                    Optionally converts application/x-www-form-urlencoded plus signs into clean spaces automatically.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All decoding algorithms run inside your device’s volatile RAM. Authentication tokens are never transmitted.
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
                    Percent-Decoding Reference &amp; Octet Map
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Common percent-encoded sequences and their decoded character representations.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  RFC 3986 Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Encoded Sequence</th>
                      <th className="py-3 px-3">Decoded Character</th>
                      <th className="py-3 px-3">Governing Standard</th>
                      <th className="py-3 px-3">Behavior &amp; Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {RFC_3986_DECODE_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-mono text-xs font-bold text-primary">{row.sequence}</td>
                        <td className="py-3 px-3 font-semibold text-text-main">{row.decodedChar}</td>
                        <td className="py-3 px-3 font-mono text-xs text-amber-700">{row.standard}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Multi-Pass Tip:</strong> If your decoded string still contains sequences like <code>%20</code> or <code>%26</code>, the string was originally double-encoded (%2520). Run another decoding pass to resolve the inner layer.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Percent-Decode URLs in 5 Steps
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
                Common URL Decoding Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (URL Decoding &amp; RFC 3986)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights on URL unescaping, malformed hex sequences, and parameter inspection.
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
                Related Encoding Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/url-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Encoder
                </Link>
                <Link
                  href="/tools/base64-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Decoder
                </Link>
                <Link
                  href="/tools/html-entity-decoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Decoder
                </Link>
                <Link
                  href="/tools/json-validator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Validator
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
