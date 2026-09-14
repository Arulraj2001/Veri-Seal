import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Code2,
  FileCheck,
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
import { HtmlEntityEngine } from '@/components/tools/HtmlEntityEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free HTML Entity Decoder Online | Convert &lt; &gt; &amp; to Plaintext | Kagazo',
  description:
    'Convert HTML entities (&lt;, &gt;, &amp;, &quot;, &#39;, &copy;) back into readable plaintext or HTML markup online. Supports named, decimal, and hexadecimal formats with recursive unescaping and 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/html-entity-decoder',
  },
  openGraph: {
    title: 'Free HTML Entity Decoder Online | Kagazo',
    description:
      'Unescape HTML entities into clean plaintext and source code instantly. Supports named, numeric, and hex entities with zero server logging.',
    url: 'https://kagazo.in/tools/html-entity-decoder',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free HTML Entity Decoder & Unescaper | Kagazo',
    description:
      'Unescape HTML entities back to plaintext instantly in client-side RAM with 100% privacy.',
  },
};

const HTML_ENTITY_DECODE_MATRIX = [
  {
    entityExample: '&lt; or &#60; or &#x3C;',
    character: 'Less Than (<)',
    category: 'HTML Delimiter',
    significance: 'Restores opening tag brackets in source code and templates',
  },
  {
    entityExample: '&gt; or &#62; or &#x3E;',
    character: 'Greater Than (>)',
    category: 'HTML Delimiter',
    significance: 'Restores closing tag brackets in source code and templates',
  },
  {
    entityExample: '&amp; or &#38; or &#x26;',
    character: 'Ampersand (&)',
    category: 'Entity Delimiter',
    significance: 'Restores literal ampersands in URLs, text, and query parameters',
  },
  {
    entityExample: '&quot; or &#34; or &#x22;',
    character: 'Double Quote (")',
    category: 'Attribute Delimiter',
    significance: 'Restores standard double quotation marks in HTML attribute strings',
  },
  {
    entityExample: '&#39; or &apos; or &#x27;',
    character: "Single Quote (')",
    category: 'Attribute Delimiter',
    significance: 'Restores apostrophes and single quotes across HTML and XML documents',
  },
  {
    entityExample: '&copy; or &#169; or &#xA9;',
    character: 'Copyright (©)',
    category: 'Symbol / Typography',
    significance: 'Restores international copyright notices and legal symbols',
  },
];

const FAQS = [
  {
    question: 'What is HTML entity decoding and how does the browser process it?',
    answer:
      'HTML entity decoding is the inverse process of entity escaping. It identifies entity strings (such as &lt;, &#60;, or &#x3C;) and converts them back into their corresponding raw characters (<). Browsers perform this decoding automatically when rendering HTML document trees, but developers often need to decode raw entity strings when inspecting API responses, database dumps, or scraped content.',
  },
  {
    question: 'Can decoding HTML entities introduce Cross-Site Scripting (XSS) risks?',
    answer:
      'Yes, if decoded strings are rendered unsafely. If user-submitted content containing &lt;script&gt; is decoded and then directly assigned to an element’s innerHTML, the browser will execute the injected script. Always sanitize decoded markup using a library like DOMPurify or assign it via textContent if it represents plain text.',
  },
  {
    question: 'How does Kagazo handle malformed entities missing trailing semicolons?',
    answer:
      'The HTML5 specification includes legacy tolerance for certain named entities without semicolons (such as &copy or &amp in specific contexts). Kagazo’s decoder follows modern WHATWG parsing algorithms to resolve both standard semicolon-terminated entities and legacy unclosed entities without throwing parsing errors.',
  },
  {
    question: 'What is the difference between decoding named, decimal, and hexadecimal entities?',
    answer:
      'Named entities use mnemonic words (like &quot;), decimal entities use base-10 Unicode numbers (like &#34;), and hexadecimal entities use base-16 numbers prefixed by an "x" (like &#x22;). Kagazo’s universal decoder resolves all three variants simultaneously in a single pass.',
  },
  {
    question: 'How do I fix double-encoded HTML strings like "&amp;lt;div&amp;gt;"?',
    answer:
      'Double encoding happens when a templating engine escapes an already-escaped string. The first decoding pass transforms &amp;lt; into &lt;. A second recursive pass is required to convert &lt; into <. Kagazo supports multi-pass decoding to cleanly unpack nested encoding layers.',
  },
  {
    question: 'Does decoding preserve indentation, whitespace, and newline formatting?',
    answer:
      'Yes. Kagazo’s parser operates on character streams without stripping or normalizing indentation, tabs, or newline breaks, ensuring code snippets and templates maintain their original structural layout.',
  },
  {
    question: 'Can this tool decode international Unicode characters and emojis?',
    answer:
      'Yes. High-code-point entities such as &#128640; or &#x1F680; are correctly reassembled into full 32-bit surrogate pairs, restoring emojis (🚀) and non-Latin alphabets without replacement character corruption.',
  },
  {
    question: 'Why does my XML parser fail on decoded HTML entities?',
    answer:
      'If you decode an entity like &amp; inside an XML document without proper CDATA wrapping, the XML parser will attempt to parse the raw ampersand as the start of an entity and fail. XML requires either escaping or wrapping in <![CDATA[...]]> blocks.',
  },
  {
    question: 'Are my confidential documents or code snippets uploaded to remote servers?',
    answer:
      'Never. All string manipulation, regex unescaping, and DOM parsing execute 100% inside your local browser memory. Zero data is ever transmitted across external networks.',
  },
  {
    question: 'Can I download the decoded output as a file?',
    answer:
      'Yes. Click "Download" to export the decoded source code or plaintext directly to your local file system with no watermarks or registration required.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input Entity-Encoded Text',
    desc: 'Paste text or HTML markup containing named (&lt;), decimal (&#60;), or hex (&#x3C;) entities.',
  },
  {
    step: 2,
    title: 'Automatic Entity Identification',
    desc: 'The engine scans your input and automatically matches all valid HTML5, decimal, and hex entity sequences.',
  },
  {
    step: 3,
    title: 'Multi-Pass Recursive Decoding',
    desc: 'Nested double-encoded entities (like &amp;lt;) are recursively unescaped to recover clean plaintext.',
  },
  {
    step: 4,
    title: 'Review Clean Rendered Code',
    desc: 'Inspect the live output editor to verify that tags, symbols, and emojis are properly restored.',
  },
  {
    step: 5,
    title: 'Copy or Download Output',
    desc: 'Copy the decoded string to your clipboard with 1 click or download it as a local text or HTML file.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Lingering &amp; from Double Encoding',
    title: 'Incomplete Single-Pass Unescaping',
    desc: 'If source text was encoded twice, decoding once leaves "&lt;" instead of "<". Kagazo allows recursive multi-pass unescaping to eliminate nested entity layers.',
  },
  {
    badge: 'Error: Accidental XSS in innerHTML',
    title: 'Injecting Decoded Strings into the DOM',
    desc: 'Never assign decoded user input directly into element.innerHTML. The browser will execute decoded <script> tags. Use textContent or DOMPurify before inserting into the DOM.',
  },
  {
    badge: 'Error: Malformed Semicolon-Less Entities',
    title: 'Legacy HTML Strings Lacking Semicolons',
    desc: 'Some scrapers generate &copy without a trailing semicolon. Kagazo conforms to WHATWG HTML5 entity resolution rules to repair and decode legacy unclosed entities.',
  },
  {
    badge: 'Error: Broken Surrogate Pair Halves',
    title: 'Split 16-Bit UTF-16 Code Points',
    desc: 'Legacy tools produce split entities like &#55357;&#56960;. Kagazo detects paired surrogate entities and joins them into single, valid 32-bit Unicode characters.',
  },
];

export default function HtmlEntityDecoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo HTML Entity Decoder & Unescaper',
        url: 'https://kagazo.in/tools/html-entity-decoder',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert HTML entities (&lt;, &gt;, &amp;, &quot;, &#39;, &copy;) back into readable plaintext or HTML markup online. Supports named, decimal, and hexadecimal formats with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Decode HTML Entities Online in 5 Steps',
        description:
          'Step-by-step instructions to safely unescape HTML entities into clean source code and plaintext.',
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
            name: 'HTML Entity Decoder',
            item: 'https://kagazo.in/tools/html-entity-decoder',
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
          <span className="text-primary font-bold">HTML Entity Decoder</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Universal Entity Unescaper &bull; Multi-Pass Recursive Recovery</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free HTML Entity Decoder &amp; </span>
            <span className="text-primary">Text Unescaper Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert HTML entities (&amp;lt;, &amp;gt;, &amp;amp;, &amp;quot;, &amp;copy;) back into readable plaintext or HTML markup. Supports <strong>Named</strong>, <strong>Decimal</strong>, and <strong>Hexadecimal</strong> entities with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <HtmlEntityEngine initialMode="decode" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Entity Decoding Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Universal Entity Resolution with Recursive Unescaping
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Scraped data and database extracts often contain double-encoded and malformed entities. Kagazo cleans and unescapes all entity representations in browser memory.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Multi-Pass Recursive
                  </span>
                  <p className="text-xs text-text-main/70">
                    Peels away stacked layers of double-encoding (&amp;amp;lt;) until original clean markup is fully restored.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" /> Universal Standards
                  </span>
                  <p className="text-xs text-text-main/70">
                    Resolves named HTML5 abbreviations, numeric decimal entities, and hex notations in a single unified sweep.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All decoding logic runs in client-side RAM. Sensitive documents and proprietary code are never transmitted.
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
                    HTML Entity Decoding Reference Map
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Common encoded entity representations and their corresponding decoded characters.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  W3C Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Entity Notation</th>
                      <th className="py-3 px-3">Decoded Character</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Description &amp; Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {HTML_ENTITY_DECODE_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-mono text-xs font-bold text-primary">{row.entityExample}</td>
                        <td className="py-3 px-3 font-semibold text-text-main">{row.character}</td>
                        <td className="py-3 px-3 font-mono text-xs text-amber-700">{row.category}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.significance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Security Reminder:</strong> If decoded content originated from untrusted user inputs, sanitize it before inserting it into <code>element.innerHTML</code> to avoid Cross-Site Scripting (XSS).
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Decode HTML Entities in 5 Steps
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
                Common HTML Decoding Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (HTML Entity Decoding &amp; Unescaping)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive answers on entity resolution, recursive decoding, and XSS safety.
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
                Related Entity Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/html-entity-encoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Encoder
                </Link>
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/url-decode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Decoder
                </Link>
                <Link
                  href="/tools/markdown-to-html"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Markdown to HTML
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
