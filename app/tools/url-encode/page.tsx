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
  title: 'Free URL Encoder Online | Percent-Encode URI & Query Strings | Kagazo',
  description:
    'Percent-encode URLs and query strings online per RFC 3986. Switch between encodeURIComponent and encodeURI modes with real-time parameter parsing, UTF-8 multi-byte support, and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/url-encode',
  },
  openGraph: {
    title: 'Free URL Encoder Online | Kagazo',
    description:
      'Percent-encode URLs and inspect query parameter breakdowns in real time with RFC 3986 compliance and zero server logging.',
    url: 'https://kagazo.in/tools/url-encode',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free URL Encoder & Query Escaper | Kagazo',
    description:
      'Percent-encode URLs and query strings instantly in client-side RAM with 100% privacy.',
  },
};

const RFC_3986_CHARACTER_MATRIX = [
  {
    charName: 'Space Character',
    literal: ' ',
    percentEncoded: '%20 (or + in forms)',
    encodeURIStatus: 'Encoded (%20)',
    encodeURIComponentStatus: 'Encoded (%20)',
    role: 'Separates words; invalid in raw URI components',
  },
  {
    charName: 'Ampersand (&)',
    literal: '&',
    percentEncoded: '%26',
    encodeURIStatus: 'Preserved (&)',
    encodeURIComponentStatus: 'Encoded (%26)',
    role: 'Reserved parameter delimiter in query strings',
  },
  {
    charName: 'Equals Sign (=)',
    literal: '=',
    percentEncoded: '%3D',
    encodeURIStatus: 'Preserved (=)',
    encodeURIComponentStatus: 'Encoded (%3D)',
    role: 'Separates parameter key from value',
  },
  {
    charName: 'Forward Slash (/)',
    literal: '/',
    percentEncoded: '%2F',
    encodeURIStatus: 'Preserved (/)',
    encodeURIComponentStatus: 'Encoded (%2F)',
    role: 'Delimits hierarchical path segments',
  },
  {
    charName: 'Question Mark (?)',
    literal: '?',
    percentEncoded: '%3F',
    encodeURIStatus: 'Preserved (?)',
    encodeURIComponentStatus: 'Encoded (%3F)',
    role: 'Indicates the start of the query parameter string',
  },
  {
    charName: 'Hash / Anchor (#)',
    literal: '#',
    percentEncoded: '%23',
    encodeURIStatus: 'Preserved (#)',
    encodeURIComponentStatus: 'Encoded (%23)',
    role: 'Marks the start of the client-side fragment identifier',
  },
];

const FAQS = [
  {
    question: 'What is percent-encoding in URLs and why is it required by RFC 3986?',
    answer:
      'Percent-encoding (often called URL encoding) translates characters that are not allowed or have special reserved syntax in Uniform Resource Identifiers (URIs) into safe hexadecimal representations. Under RFC 3986, non-ASCII characters and delimiters are converted into a percent sign followed by their two-digit hexadecimal byte value (e.g., a space becomes %20). This ensures web servers and proxies route and parse requests without data corruption.',
  },
  {
    question: 'What is the critical difference between encodeURI() and encodeURIComponent()?',
    answer:
      'encodeURI() is designed for entire URL strings; it leaves protocol and routing delimiters intact, including ":", "/", "?", "#", and "&". Conversely, encodeURIComponent() aggressively encodes all reserved delimiters (turning "/" into "%2F" and "&" into "%26"). You must use encodeURIComponent() when encoding individual query string values to prevent parameter injection.',
  },
  {
    question: 'Why do query strings break if characters like "&" and "=" are not encoded?',
    answer:
      'In HTTP URLs, the ampersand (&) separates distinct key-value pairs, while the equals sign (=) assigns a value to a key. If a search query or user input contains "Books & Magazines", leaving the ampersand unencoded causes the web server to interpret " Magazines" as an entirely new query parameter key, truncating the user’s search.',
  },
  {
    question: 'What is double percent-encoding and how can I prevent "%2520" bugs?',
    answer:
      'Double encoding occurs when an already percent-encoded string is passed through an encoder a second time. The leading "%" character (ASCII hex 0x25) is converted into "%25", turning "%20" into "%2520". This creates malformed URLs that fail backend routing. Kagazo inspects existing percent sequences to help developers verify if payloads are already encoded.',
  },
  {
    question: 'Does this tool support international languages and multi-byte UTF-8 emojis?',
    answer:
      'Yes. Our encoder follows modern RFC 3986 standards by converting multi-byte UTF-8 sequences into consecutive percent-encoded hex octets. For example, the emoji 🚀 (4 UTF-8 bytes: 0xF0 0x9F 0x9A 0x80) encodes correctly as %F0%9F%9A%80 without character corruption.',
  },
  {
    question: 'Why are spaces encoded as "%20" instead of "+" in standard URL encoding?',
    answer:
      'The plus sign (+) for space is only specified in HTML form submissions using application/x-www-form-urlencoded MIME types. In standard RFC 3986 URI paths and REST API query parameters, a literal plus sign means "+" and a space must always be encoded strictly as %20 to avoid routing ambiguities.',
  },
  {
    question: 'How does percent-encoding protect web applications against injection attacks and XSS?',
    answer:
      'When user input containing characters like "<", ">", "\'", or quotes is reflected into URL redirects or query attributes, unescaped delimiters can lead to Reflected Cross-Site Scripting (XSS) or HTTP Parameter Pollution (HPP). Percent-encoding neutralizes these characters into inert byte sequences (%3C, %3E).',
  },
  {
    question: 'Can I encode nested redirect URLs for OAuth2 callback flows?',
    answer:
      'Yes. When setting redirect_uri or state parameters in OAuth2 flows (e.g., Google or GitHub login), the entire target URL must be encoded with encodeURIComponent() mode so that inner query parameters do not interfere with the authentication server’s top-level handshake.',
  },
  {
    question: 'Are my confidential URLs, OAuth callback tokens, or search terms logged on remote servers?',
    answer:
      'Never. Kagazo performs all URL parsing, parameter extraction, and percent-encoding algorithms 100% locally inside your browser’s volatile JavaScript memory. Zero URL paths, authentication tokens, or sensitive API queries are ever transmitted over external networks.',
  },
  {
    question: 'Which characters are unreserved under RFC 3986 and never encoded?',
    answer:
      'Under RFC 3986 section 2.3, the unreserved characters are uppercase and lowercase English letters (A–Z, a–z), decimal digits (0–9), hyphen (-), underscore (_), period (.), and tilde (~). These characters have no reserved structural meaning in URIs and are never percent-encoded.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input URL or Query String',
    desc: 'Paste a full web address, query parameter string, or arbitrary text into the input editor.',
  },
  {
    step: 2,
    title: 'Select Scope (Component vs Full URI)',
    desc: 'Choose "Component" (encodeURIComponent) for query values or "Full URI" (encodeURI) for complete web addresses.',
  },
  {
    step: 3,
    title: 'Automatic UTF-8 Octet Translation',
    desc: 'The engine converts multi-byte Unicode characters, spaces, and reserved symbols into standard %HEX octets.',
  },
  {
    step: 4,
    title: 'Inspect Parameter Breakdown',
    desc: 'Review the live parsed key-value table to verify that parameter boundaries and query keys remain intact.',
  },
  {
    step: 5,
    title: 'Copy or Export Encoded String',
    desc: 'Copy the percent-encoded URL to your clipboard with 1 click, ready for REST API calls or OAuth redirects.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: HTTP Parameter Pollution (HPP)',
    title: 'Unescaped & or = in Query Values',
    desc: 'If a search term contains "&" or "=", unencoded input creates accidental extra query parameters on the backend. Use Component mode to escape "&" as %26 and "=" as %3D.',
  },
  {
    badge: 'Error: Broken Nested OAuth Redirects',
    title: 'Failure to Encode Callback URLs',
    desc: 'Embedding an unencoded redirect URL containing its own query parameters inside ?redirect_uri= corrupts authentication handshakes. Always encode secondary URLs completely.',
  },
  {
    badge: 'Error: Destroyed Protocol & Path Delimiters',
    title: 'Applying Component Mode to Full URLs',
    desc: 'Running encodeURIComponent on "https://example.com/page" converts "://" into "%3A%2F%2F", breaking browser navigation. Use Full URI mode for complete addresses.',
  },
  {
    badge: 'Error: Double Percent-Encoding (%2520)',
    title: 'Encoding Already Encoded Strings',
    desc: 'Passing an already encoded URL through another encoder replaces "%" with "%25", turning "%20" into "%2520" and causing 404 routing errors on target servers.',
  },
];

export default function UrlEncodePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo URL Encoder & Parameter Studio',
        url: 'https://kagazo.in/tools/url-encode',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Percent-encode URLs and query strings online per RFC 3986. Switch between encodeURIComponent and encodeURI modes with real-time parameter parsing and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Percent-Encode URLs and Query Parameters Online in 5 Steps',
        description:
          'Step-by-step instructions to safely encode URLs and prevent query parameter corruption per RFC 3986.',
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
            name: 'URL Encode',
            item: 'https://kagazo.in/tools/url-encode',
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
          <span className="text-primary font-bold">URL Encode</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 3986 Standard &bull; Dual Mode URI Escaping</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free URL Encoder &amp; </span>
            <span className="text-primary">Query Escaper Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Percent-encode URLs and query strings per <strong>RFC 3986</strong>. Switch between <strong>encodeURIComponent</strong> and <strong>encodeURI</strong> with real-time parameter parsing and 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <UrlEncoderEngine initialMode="encode" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  URI Escaping Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  RFC 3986 Compliant Query Serialization in Local RAM
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                HTTP query parameters and REST endpoints require precise character escaping to prevent parameter injection and request truncation. Kagazo gives developers instant control over URL encoding scopes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Dual-Mode Switching
                  </span>
                  <p className="text-xs text-text-main/70">
                    Switch between encodeURI for full URLs and encodeURIComponent for individual query parameter values.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Table className="w-4 h-4" /> Live Parameter Parser
                  </span>
                  <p className="text-xs text-text-main/70">
                    Dissects complex query strings into structured key-value tables in real time for effortless debugging.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All URL parsing and percent-encoding algorithms execute in browser memory. Sensitive tokens are never logged.
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
                    RFC 3986 Character Encoding &amp; Escaping Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Detailed breakdown of reserved characters and their encoding behavior across URI scopes.
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
                      <th className="py-3 px-3">Character Name</th>
                      <th className="py-3 px-3">Literal</th>
                      <th className="py-3 px-3">Percent-Encoded</th>
                      <th className="py-3 px-3">encodeURI()</th>
                      <th className="py-3 px-3">encodeURIComponent()</th>
                      <th className="py-3 px-3">RFC Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {RFC_3986_CHARACTER_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.charName}</td>
                        <td className="py-3 px-3 font-mono text-xs font-bold text-text-main">{row.literal}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{row.percentEncoded}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-600">{row.encodeURIStatus}</td>
                        <td className="py-3 px-3 font-mono text-xs text-amber-700">{row.encodeURIComponentStatus}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Component Rule:</strong> When injecting parameters into query strings (such as <code>?search=Books%26Music</code>), always use <strong>Component mode</strong> to ensure ampersands and equals signs do not break query structure.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Percent-Encode URLs and Parameters in 5 Steps
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
                Common URL Encoding Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (URL Encoding &amp; RFC 3986)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive answers on URI escaping, parameter security, and character standards.
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
                  href="/tools/url-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Decoder
                </Link>
                <Link
                  href="/tools/base64-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Encoder
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
