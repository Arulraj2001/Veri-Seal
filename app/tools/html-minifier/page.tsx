import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  FileCode,
  FileCheck,
  Minimize2,
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
  Gauge,
} from 'lucide-react';
import { HtmlCssJsMinifierEngine } from '@/components/tools/HtmlCssJsMinifierEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free HTML Minifier & Code Compressor Online | Kagazo',
  description:
    'Compress HTML markup online up to 35% without breaking layout structures. Strips redundant whitespace, removes comments, optimizes inline CSS/JS, and improves Core Web Vitals with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/html-minifier',
  },
  openGraph: {
    title: 'Free HTML Minifier & Code Compressor Online | Kagazo',
    description:
      'Compress HTML files online up to 35% without breaking code structure. Strips HTML comments, collapses whitespace, and measures exact byte savings.',
    url: 'https://kagazo.in/tools/html-minifier',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free HTML Minifier & Code Compressor | Kagazo',
    description:
      'Strip comments and collapse whitespace in HTML templates instantly with 100% in-browser privacy.',
  },
};

const HTML_COMPRESSION_BENCHMARKS = [
  {
    optimization: 'Collapsing Inter-Tag Whitespace',
    unminified: '<div> \\n   <span>Text</span>\\n</div>',
    minified: '<div><span>Text</span></div>',
    savings: '15% – 25%',
    impact: 'Reduces DOM text nodes and raw document byte payload',
  },
  {
    optimization: 'Stripping HTML Comments',
    unminified: '<!-- Navigation Header Container -->\\n<nav>...</nav>',
    minified: '<nav>...</nav>',
    savings: '5% – 15%',
    impact: 'Prevents leaking developer notes and reduces transfer size',
  },
  {
    optimization: 'Condensing Multi-line Attributes',
    unminified: '<button \\n  class="btn" \\n  id="submit">',
    minified: '<button class="btn" id="submit">',
    savings: '8% – 12%',
    impact: 'Accelerates tokenizer parsing speed in rendering engines',
  },
  {
    optimization: 'Trimming Trailing Endlines & Spaces',
    unminified: '<p>Paragraph text.   </p>\\n\\n',
    minified: '<p>Paragraph text.</p>',
    savings: '4% – 10%',
    impact: 'Decreases First Contentful Paint (FCP) over mobile 4G/5G',
  },
  {
    optimization: 'Preserving Whitespace-Sensitive Tags',
    unminified: '<pre>const x = 1;\\n  const y = 2;</pre>',
    minified: '<pre>const x = 1;\\n  const y = 2;</pre>',
    savings: '0% (Protected)',
    impact: 'Guarantees code syntax formatting and ASCII art remain intact',
  },
];

const FAQS = [
  {
    question: 'How does HTML minification improve Google PageSpeed and Core Web Vitals?',
    answer:
      'HTML minification strips unnecessary whitespace, indentation tabs, carriage returns, and developer comments from the initial HTML document payload. Reducing the byte size directly accelerates Time to First Byte (TTFB), decreases network packet counts over TCP slow-start connections, and hastens DOM tree generation, leading to measurable improvements in First Contentful Paint (FCP) and Largest Contentful Paint (LCP).',
  },
  {
    question: 'Does this minifier preserve whitespace inside <pre>, <code>, and <textarea> tags?',
    answer:
      'Yes. Our parser recognizes whitespace-sensitive HTML tags such as <pre>, <code>, and <textarea>. Formatting, multi-line indentation, and intentional spacing within these blocks are strictly preserved so your rendered source code examples and form field pre-fills never break visually.',
  },
  {
    question: 'Will minifying HTML break inline JavaScript or CSS stylesheets?',
    answer:
      'Kagazo safely minifies inline <style> and <script> contents while safeguarding string literals and regular expressions. However, if your inline JavaScript relies on single-line comments (//) without proper semicolon statement termination, removing line breaks can cause syntax errors. We recommend using standard multi-line comments (/* */) or terminating all JavaScript statements with semicolons.',
  },
  {
    question: 'Is my proprietary website source code uploaded to remote servers?',
    answer:
      'Never. All minification, regular expression evaluations, and byte calculation algorithms run 100% inside your browser’s volatile JavaScript memory (V8/WebKit). Zero markup, server templates (Jinja, Blade, EJS), or sensitive internal API endpoints are ever uploaded or logged.',
  },
  {
    question: 'How does HTML minification compare with Gzip and Brotli compression?',
    answer:
      'HTML minification and HTTP compression (Gzip/Brotli) are complementary optimizations rather than alternatives. Minification removes semantic redundancies (such as comments and empty lines) that compression algorithms cannot infer, allowing Brotli to achieve higher dictionary density and a smaller final transfer payload across the wire.',
  },
  {
    question: 'Can I minify HTML email templates without breaking email client rendering?',
    answer:
      'Yes. Kagazo handles table-based email layouts common in Outlook, Gmail, and Apple Mail. It preserves conditional comments like <!--[if mso]> while removing standard HTML developer comments.',
  },
  {
    question: 'Does minification remove HTML tag closing slashes like </p> or </li>?',
    answer:
      'No. While HTML5 permits omitting certain closing tags, doing so can cause unpredictable DOM parsing across modern frameworks. Kagazo retains all closing tags for 100% DOM tree stability.',
  },
  {
    question: 'What is the typical file size reduction percentage achieved by HTML minification?',
    answer:
      'Depending on how heavily commented and indented the original markup is, HTML minification typically reduces document payload sizes by 15% to 35%, yielding noticeable load speed improvements on mobile devices.',
  },
  {
    question: 'Can I upload an entire .html file for minification?',
    answer:
      'Yes. Drag and drop any .html or .htm file into the editor. The file is parsed and compressed in local browser memory via the HTML5 File API without any server roundtrip.',
  },
  {
    question: 'Can I download the minified markup as a ready-to-deploy file?',
    answer:
      'Yes. Click "Download Minified HTML" to immediately export a production-ready .html file directly to your downloads folder.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input HTML Source Markup',
    desc: 'Paste your raw HTML document, email template, or component markup into the source editor or upload a .html file.',
  },
  {
    step: 2,
    title: 'Configure Stripping Options',
    desc: 'The engine automatically isolates <pre>, <code>, and <textarea> blocks to safeguard intentional spacing.',
  },
  {
    step: 3,
    title: 'Execute Instant In-Memory Minification',
    desc: 'Click Minify HTML to strip comments, collapse indentation, and condense attribute whitespace in under 10ms.',
  },
  {
    step: 4,
    title: 'Verify Byte Reduction Metrics',
    desc: 'Inspect the real-time byte counter displaying the original size, minified size, and exact percentage saved.',
  },
  {
    step: 5,
    title: 'Copy or Download Production File',
    desc: 'Copy the compressed markup to clipboard or download the optimized .min.html file ready for deployment.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Broken Inline JavaScript After Stripping',
    title: 'Single-Line JS Comments (//) Collapsing',
    desc: 'If inline scripts contain // comments without terminating semicolons, collapsing line breaks comments out the subsequent code. Terminate all statements with semicolons or use /* */ comments.',
  },
  {
    badge: 'Error: Visual Distortion in Preformatted Blocks',
    title: 'Corrupted <pre> & <code> Formatting',
    desc: 'Generic minifiers strip whitespace inside code examples, turning indented snippets into single-line blobs. Kagazo isolates whitespace-sensitive tags completely.',
  },
  {
    badge: 'Error: Broken Email Layouts in Outlook',
    title: 'Stripped Conditional MSO Comments',
    desc: 'Overly aggressive tools remove <!--[if mso]> tags essential for Microsoft Outlook rendering. Kagazo protects conditional comments while stripping dead notes.',
  },
  {
    badge: 'Error: Corrupted Server Template Tags',
    title: 'Interfering with Jinja, Blade or EJS Delimiters',
    desc: 'Minifying templates containing {{ variable }} or {% if %} tags can break if whitespace is removed aggressively. Kagazo maintains delimiter boundaries.',
  },
];

export default function HtmlMinifierPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo HTML Minifier & Code Compressor',
        url: 'https://kagazo.in/tools/html-minifier',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress and minify HTML documents online. Remove unnecessary comments, whitespace, and empty lines with instant byte savings and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Minify HTML Markup Online in 5 Steps',
        description:
          'Step-by-step instructions to strip comments, eliminate whitespace, and compress HTML payloads for production deployments.',
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
            name: 'HTML Minifier',
            item: 'https://kagazo.in/tools/html-minifier',
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">HTML Minifier</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs sm:text-sm font-semibold text-amber-700 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>High-Speed HTML Parser &bull; Core Web Vitals Optimizer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free HTML Minifier &amp; </span>
            <span className="text-amber-600">Code Compressor Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress HTML documents, emails, and templates up to <strong>35%</strong>. Strip redundant whitespace, eliminate comments, and boost Core Web Vitals with zero remote server exposure.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <HtmlCssJsMinifierEngine defaultLanguage="html" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Performance First
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Engineered for Maximum Core Web Vitals Acceleration
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Large HTML payloads increase Time to First Byte (TTFB) and stall DOM tree construction. Kagazo collapses unnecessary bytes without breaking layout structures or code blocks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4" /> Core Web Vitals Boost
                  </span>
                  <p className="text-xs text-text-main/70">
                    Reduces raw document size to hasten First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4" /> Pre &amp; Textarea Safety
                  </span>
                  <p className="text-xs text-text-main/70">
                    Strictly safeguards whitespace inside preformatted blocks, ensuring code blocks never lose their visual formatting.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Source markup is processed exclusively in your browser memory. No proprietary website code is ever sent to our servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    HTML Minification Optimization Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Detailed breakdown of byte reduction techniques and their direct impact on rendering pipelines.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  AST Benchmarks
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Optimization Technique</th>
                      <th className="py-3 px-3">Unminified Source</th>
                      <th className="py-3 px-3">Minified Output</th>
                      <th className="py-3 px-3">Typical Savings</th>
                      <th className="py-3 px-3">Core Web Vitals Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {HTML_COMPRESSION_BENCHMARKS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.optimization}</td>
                        <td className="py-3 px-3 font-mono text-xs text-rose-600 bg-rose-50/50 rounded">{row.unminified}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 bg-emerald-50/50 rounded">{row.minified}</td>
                        <td className="py-3 px-3 font-semibold text-amber-600">{row.savings}</td>
                        <td className="py-3 px-3 text-xs">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Compression Synergy:</strong> Minification and Brotli/Gzip work together. Minifying strips non-functional semantic syntax so HTTP compression dictionaries operate with higher efficiency.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                How to Minify HTML Markup in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
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
                Common HTML Minification Pitfalls and How Kagazo Fixes Them
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
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  Frequently Asked Questions (HTML Minification &amp; Performance)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Authoritative technical guidance on HTML document compression and Core Web Vitals.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-amber-600 font-black">Q{idx + 1}.</span>
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
                Related Code Minifiers
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/css-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  CSS Minifier
                </Link>
                <Link
                  href="/tools/js-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JavaScript Minifier
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  JSON Formatter
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
