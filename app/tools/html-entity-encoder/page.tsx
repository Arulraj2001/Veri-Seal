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
  title: 'Free HTML Entity Encoder Online | Escape Special Characters for XSS Safety | Kagazo',
  description:
    'Convert special characters (<, >, &, ", \') into HTML entities (&lt;, &gt;, &amp;, &quot;, &#39;). Supports named, decimal, and hexadecimal entity formats to prevent Cross-Site Scripting (XSS) with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/html-entity-encoder',
  },
  openGraph: {
    title: 'Free HTML Entity Encoder Online | Kagazo',
    description:
      'Escape special HTML characters into named, decimal, and hex entities for web application security and XSS prevention.',
    url: 'https://kagazo.in/tools/html-entity-encoder',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free HTML Entity Encoder & Escaper | Kagazo',
    description:
      'Escape special HTML characters into safe entities instantly in client-side RAM with 100% privacy.',
  },
};

const HTML_ENTITY_ESCAPE_MATRIX = [
  {
    character: 'Less Than (<)',
    literal: '<',
    namedEntity: '&lt;',
    decimalEntity: '&#60;',
    hexEntity: '&#x3C;',
    xssThreat: 'High: Prevents tag injection (e.g., <script>, <iframe>, <img>)',
  },
  {
    character: 'Greater Than (>)',
    literal: '>',
    namedEntity: '&gt;',
    decimalEntity: '&#62;',
    hexEntity: '&#x3E;',
    xssThreat: 'High: Prevents closing existing HTML tags prematurely',
  },
  {
    character: 'Ampersand (&)',
    literal: '&',
    namedEntity: '&amp;',
    decimalEntity: '&#38;',
    hexEntity: '&#x26;',
    xssThreat: 'Medium: Prevents entity injection and query string ambiguity',
  },
  {
    character: 'Double Quote (")',
    literal: '"',
    namedEntity: '&quot;',
    decimalEntity: '&#34;',
    hexEntity: '&#x22;',
    xssThreat: 'Critical: Prevents escaping HTML attribute delimiters',
  },
  {
    character: 'Single Quote (\')',
    literal: "'",
    namedEntity: '&#39; (or &apos;)',
    decimalEntity: '&#39;',
    hexEntity: '&#x27;',
    xssThreat: 'Critical: Prevents escaping single-quoted attribute values',
  },
  {
    character: 'Copyright Symbol (©)',
    literal: '©',
    namedEntity: '&copy;',
    decimalEntity: '&#169;',
    hexEntity: '&#xA9;',
    xssThreat: 'Informational: Standard typographical character encoding',
  },
];

const FAQS = [
  {
    question: 'Why is HTML entity encoding essential for preventing Cross-Site Scripting (XSS)?',
    answer:
      'Cross-Site Scripting (XSS) occurs when untrusted user input is injected into an HTML document without proper escaping, allowing browsers to interpret user text as executable code. By converting characters like "<" into "&lt;" and ">" into "&gt;", the browser’s HTML parser treats the input strictly as inert display text rather than DOM tags or executable scripts.',
  },
  {
    question: 'Which five core characters must always be escaped in HTML and XML documents?',
    answer:
      'The five essential characters are: ampersand (& -> &amp;), less-than (< -> &lt;), greater-than (> -> &gt;), double quote (" -> &quot;), and single quote (\' -> &#39; or &apos;). Escaping these five characters guarantees that user strings cannot break out of HTML element bodies or attribute strings.',
  },
  {
    question: 'What is the difference between named entities, decimal entities, and hex entities?',
    answer:
      'Named entities use mnemonic abbreviations (e.g., &copy; for ©), making them easy for human developers to read. Decimal entities represent the Unicode code point in base-10 (e.g., &#169;), while hexadecimal entities represent it in base-16 (e.g., &#xA9;). Hex and decimal entities are universally supported across both strict XML and HTML.',
  },
  {
    question: 'Why do XML parsers reject standard HTML named entities like &copy; or &trade;?',
    answer:
      'Standard XML defines only five built-in entity references (&amp;, &lt;, &gt;, &quot;, and &apos;). Other named entities like &copy; or &nbsp; will cause an XML parser to throw a "reference to undefined entity" fatal error unless declared in a Document Type Definition (DTD). Using numeric entities (&#169;) avoids this problem entirely.',
  },
  {
    question: 'What is double entity escaping and how can it be prevented?',
    answer:
      'Double escaping occurs when already-escaped HTML (such as &lt;div&gt;) is passed into an encoder again, converting the ampersand into &amp;lt;div&amp;gt;. On the rendered webpage, users will see the literal code "&lt;div&gt;" instead of rendered elements. Always sanitize or encode raw text once at the boundary of your templating engine.',
  },
  {
    question: 'Should I escape characters inside HTML attributes differently than inside text content?',
    answer:
      'Yes. Inside element content (between <div> and </div>), escaping "<" and "&" is strictly sufficient. However, inside attribute values (<input value="...">), quotes (both single and double) must be escaped to prevent an attacker from terminating the attribute string and injecting event handlers like "onload=" or "onerror=".',
  },
  {
    question: 'When should I encode all non-ASCII characters instead of just special HTML characters?',
    answer:
      'Encoding all non-ASCII characters is recommended when saving templates or sending HTML emails over legacy transport systems that do not reliably support UTF-8 charset encodings. Converting foreign characters to numeric entities guarantees identical visual rendering regardless of server encoding headers.',
  },
  {
    question: 'Does this tool encode multi-byte Unicode characters and emojis properly?',
    answer:
      'Yes. Our engine uses standard UTF-8 code point resolution (codePointAt) rather than legacy charCodeAt. This ensures surrogate pairs for emojis (🚀, 🎉) and historical scripts are encoded as correct 32-bit decimal or hexadecimal code points without broken surrogate halves.',
  },
  {
    question: 'Are my confidential templates, code snippets, or texts uploaded to any server?',
    answer:
      'Never. Kagazo processes all text escaping client-side inside your browser’s volatile JavaScript memory. Not a single character or document is ever sent to external cloud servers or stored in databases.',
  },
  {
    question: 'Can I copy or download the escaped HTML entities directly?',
    answer:
      'Yes. You can copy the escaped string to your clipboard with a single click or export the entire output as a .html or .txt file directly onto your local machine.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input HTML Code or Text',
    desc: 'Paste raw HTML markup, source code snippets, or user-submitted text into the input editor.',
  },
  {
    step: 2,
    title: 'Choose Entity Format',
    desc: 'Select Named Entities (&lt;), Decimal Numeric (&#60;), or Hexadecimal (&#x3C;) based on your target system.',
  },
  {
    step: 3,
    title: 'Select Escaping Scope',
    desc: 'Choose whether to escape only the 5 critical syntax delimiters or all non-ASCII international characters.',
  },
  {
    step: 4,
    title: 'Inspect Live Escaped Code',
    desc: 'Review the output editor in real time to verify that tags like <script> are safely neutralized.',
  },
  {
    step: 5,
    title: 'Copy or Download Code',
    desc: 'Copy the escaped HTML string to your clipboard for instant embedding into templates or documentation.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Cross-Site Scripting (XSS) Vulnerability',
    title: 'Unescaped Quotes in HTML Attributes',
    desc: 'Failing to escape quotes in <input value="USER_INPUT"> allows attackers to escape the attribute and inject malicious onload or onerror handlers. Always escape " as &quot; and \' as &#39;.',
  },
  {
    badge: 'Error: Double-Escaped Markup (&amp;amp;)',
    title: 'Re-encoding Already Escaped Documents',
    desc: 'Passing an already sanitized document through an entity encoder converts existing &amp; into &amp;amp;, producing ugly literal code on screen. Ensure encoding is applied only to raw text.',
  },
  {
    badge: 'Error: XML / XHTML Parser Crash',
    title: 'Using HTML5 Named Entities in Strict XML',
    desc: 'XML parsers throw fatal errors when encountering named entities like &copy; or &nbsp; without a DTD declaration. For XML, SVG, and RSS feeds, use numeric decimal (&#169;) entities.',
  },
  {
    badge: 'Error: Broken Surrogate Pair Half Emojis',
    title: 'Legacy 16-Bit UTF-16 Truncation',
    desc: 'Old charCodeAt encoders slice 32-bit emojis into two broken surrogates like &#55357;&#56960;. Kagazo uses 32-bit code points to generate valid entities like &#128640; for 🚀.',
  },
];

export default function HtmlEntityEncoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo HTML Entity Encoder & XSS Escaper',
        url: 'https://kagazo.in/tools/html-entity-encoder',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Convert special characters (<, >, &, ", \') into HTML entities (&lt;, &gt;, &amp;, &quot;, &#39;). Supports named, decimal, and hexadecimal entity formats to prevent Cross-Site Scripting (XSS).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Encode HTML Entities Online in 5 Steps',
        description:
          'Step-by-step instructions to safely escape special characters into HTML entities for web security and XML compatibility.',
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
            name: 'HTML Entity Encoder',
            item: 'https://kagazo.in/tools/html-entity-encoder',
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
          <span className="text-primary font-bold">HTML Entity Encoder</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>W3C &amp; WHATWG Standards &bull; Named, Decimal &amp; Hex</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free HTML Entity Encoder &amp; </span>
            <span className="text-primary">XSS Escaper Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert special characters (&lt;, &gt;, &amp;, &quot;, &apos;) into safe HTML entities. Supports <strong>Named</strong>, <strong>Decimal</strong>, and <strong>Hexadecimal</strong> formats to neutralize XSS vulnerabilities with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <HtmlEntityEngine initialMode="encode" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  XSS Prevention Studio
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Enterprise Character Sanitization &amp; Multi-Standard Escaping
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Raw user input injected directly into HTML creates severe Cross-Site Scripting vulnerabilities. Kagazo converts dangerous markup delimiters into safe character entities in local RAM.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Named, Dec &amp; Hex
                  </span>
                  <p className="text-xs text-text-main/70">
                    Switch between named HTML5 entities (&amp;copy;) or universally compliant numeric decimal and hexadecimal codes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" /> Full XSS Neutralization
                  </span>
                  <p className="text-xs text-text-main/70">
                    Escapes all 5 critical HTML syntax delimiters to ensure safe rendering inside element bodies and attributes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All character replacements run client-side in browser RAM. Proprietary code and text snippets are never uploaded.
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
                    Essential HTML Entity Escaping &amp; Security Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Comparison of entity notations and their respective XSS mitigation roles.
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
                      <th className="py-3 px-3">Character</th>
                      <th className="py-3 px-3">Literal</th>
                      <th className="py-3 px-3">Named Entity</th>
                      <th className="py-3 px-3">Decimal Entity</th>
                      <th className="py-3 px-3">Hex Entity</th>
                      <th className="py-3 px-3">Security &amp; XSS Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {HTML_ENTITY_ESCAPE_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.character}</td>
                        <td className="py-3 px-3 font-mono text-xs font-bold text-text-main">{row.literal}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{row.namedEntity}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-600">{row.decimalEntity}</td>
                        <td className="py-3 px-3 font-mono text-xs text-amber-700">{row.hexEntity}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{row.xssThreat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Attribute Escaping Notice:</strong> When inserting user strings inside HTML attributes (such as <code>&lt;input value=&quot;...&quot;&gt;</code>), both double quotes (<code>&amp;quot;</code>) and single quotes (<code>&amp;#39;</code>) must be strictly escaped to prevent breaking out of attribute delimiters.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Encode HTML Entities in 5 Steps
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
                Common HTML Encoding Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (HTML Entity Encoding &amp; Security)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive guidance on XSS defense, XML entity compatibility, and character standards.
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
                  href="/tools/html-entity-decoder"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Entity Decoder
                </Link>
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
                </Link>
                <Link
                  href="/tools/url-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  URL Encoder
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
