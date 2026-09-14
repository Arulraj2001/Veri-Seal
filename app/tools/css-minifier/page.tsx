import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  FileType,
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
  Palette,
} from 'lucide-react';
import { HtmlCssJsMinifierEngine } from '@/components/tools/HtmlCssJsMinifierEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free CSS Minifier & Stylesheet Compressor Online | Kagazo',
  description:
    'Compress and minify CSS stylesheets online up to 40%. Strips CSS comments, shortens hex color codes, removes trailing semicolons and zero-units to eliminate render-blocking stylesheet latency with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/css-minifier',
  },
  openGraph: {
    title: 'Free CSS Minifier & Stylesheet Compressor | Kagazo',
    description:
      'Compress CSS stylesheets in real time. Strip comments, shorten hex colors, and remove redundant zero units with zero server uploads.',
    url: 'https://kagazo.in/tools/css-minifier',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CSS Minifier & Optimizer | Kagazo',
    description:
      'Optimize stylesheets for production deployments. Instant CSS byte savings with zero server tracking.',
  },
};

const CSS_OPTIMIZATION_BENCHMARKS = [
  {
    technique: 'Stripping CSS Comments',
    rawCss: '/* Header Navigation Styles */\\n.header { display: flex; }',
    minifiedCss: '.header{display:flex}',
    savings: '12% – 25%',
    impact: 'Prevents leaking internal development notes and strips non-functional bytes',
  },
  {
    technique: 'Collapsing Whitespace & Indentation',
    rawCss: '.card {\\n  padding: 16px;\\n  margin: 8px;\\n}',
    minifiedCss: '.card{padding:16px;margin:8px}',
    savings: '15% – 30%',
    impact: 'Reduces raw HTTP transfer size and accelerates CSSOM construction',
  },
  {
    technique: 'Shortening 6-Digit Hex Colors',
    rawCss: 'color: #ffffff; background: #000000;',
    minifiedCss: 'color:#fff;background:#000',
    savings: '4% – 8%',
    impact: 'Converts equivalent 6-digit hex notation to 3-digit shorthand values',
  },
  {
    technique: 'Stripping Redundant Zero Units',
    rawCss: 'margin: 0px; padding: 0em 0rem;',
    minifiedCss: 'margin:0;padding:0 0',
    savings: '3% – 6%',
    impact: 'Complies with W3C CSS specifications where unitless 0 is universal',
  },
  {
    technique: 'Removing Trailing Semicolons',
    rawCss: '.btn { font-weight: bold; }',
    minifiedCss: '.btn{font-weight:bold}',
    savings: '2% – 5%',
    impact: 'Removes optional final statement terminator before closing brace',
  },
];

const FAQS = [
  {
    question: 'How does minifying CSS improve First Contentful Paint (FCP)?',
    answer:
      'CSS is a critical render-blocking resource. Browsers cannot render any pixels on the screen until all external and embedded stylesheets are downloaded, parsed, and converted into the CSSOM (CSS Object Model). Minifying CSS reduces payload size, accelerates TCP transfer across mobile connections, and eliminates parse stalls, directly speeding up First Contentful Paint (FCP) and Largest Contentful Paint (LCP).',
  },
  {
    question: 'Does this minifier break calc() expressions with spaces?',
    answer:
      'No. The W3C CSS specification strictly requires whitespace around the addition (+) and subtraction (-) operators inside calc() functions (e.g., calc(100% - 20px)). Our CSS minifier parser preserves required syntactic whitespace within mathematical expressions while aggressively removing whitespace everywhere else.',
  },
  {
    question: 'Can I minify modern CSS variables and nested rules?',
    answer:
      'Yes. The engine seamlessly processes custom CSS properties (CSS variables such as --primary-color: #2563eb;), CSS grid layouts, flexbox declarations, media queries, and modern CSS Nesting syntax without corrupting property values or scoping rules.',
  },
  {
    question: 'Are my proprietary stylesheets or design tokens uploaded to remote servers?',
    answer:
      'Never. Kagazo performs 100% of the CSS parsing, AST string transformations, and byte statistics calculations in your browser’s volatile JavaScript memory. No stylesheets, internal styling rules, or design tokens are ever transmitted across external networks.',
  },
  {
    question: 'What is the difference between CSS minification and CSS purging?',
    answer:
      'CSS minification compresses existing CSS rules by removing comments, formatting spaces, and redundant characters without altering what rules exist. CSS purging (like PurgeCSS) scans HTML/JS templates and deletes entire unused selector declarations. For optimal performance, developers purge unused selectors first and then minify the resulting stylesheet.',
  },
  {
    question: 'Does minification merge identical CSS selectors?',
    answer:
      'To prevent breaking cascade order and specificity inheritance, Kagazo preserves rule declaration ordering while collapsing selector whitespace and stripping redundant semicolons.',
  },
  {
    question: 'Can I upload an entire .css file for compression?',
    answer:
      'Yes. Drag and drop any .css stylesheet into the editor. The file is read via the client-side FileReader API and compressed instantaneously without uploading anything to a server.',
  },
  {
    question: 'How does Kagazo handle CSS data URIs and embedded base64 fonts?',
    answer:
      'Base64 strings inside url("data:...") declarations are strictly shielded from character alteration and whitespace compression, guaranteeing that inline SVGs, WOFF2 fonts, and icons remain intact.',
  },
  {
    question: 'What is the typical size reduction when minifying CSS stylesheets?',
    answer:
      'Production stylesheets typically achieve between 20% and 40% reduction in raw file size, leading to significantly faster stylesheet evaluation on mobile CPU cores.',
  },
  {
    question: 'Can I download the minified stylesheet directly as a .min.css file?',
    answer:
      'Yes. Click "Download Minified CSS" to immediately export a production-ready .min.css file directly to your device.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input CSS Stylesheet',
    desc: 'Paste your raw CSS code into the source editor or drag and drop an existing .css stylesheet file.',
  },
  {
    step: 2,
    title: 'Automated AST Parsing',
    desc: 'The engine scans selector rules, property blocks, custom CSS variables, and vendor prefixes.',
  },
  {
    step: 3,
    title: 'Compress & Optimize',
    desc: 'Click Minify CSS to strip comments, collapse indentation, shorten hex colors, and remove zero units.',
  },
  {
    step: 4,
    title: 'Inspect Byte Savings',
    desc: 'Review the live reduction counter comparing original byte weight with the minified production size.',
  },
  {
    step: 5,
    title: 'Copy or Download .min.css',
    desc: 'Copy the compressed CSS to your clipboard with 1 click or download the ready-to-deploy .min.css file.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Broken calc() Expressions',
    title: 'Missing Spaces in calc() Operators',
    desc: 'Removing spaces around + or - inside calc() functions (e.g., calc(100%-20px)) causes instant browser CSSOM parse errors. Kagazo protects required mathematical operator spacing.',
  },
  {
    badge: 'Error: Vendor Prefix Fallback Collapse',
    title: 'Overwriting Prefixed Declarations',
    desc: 'Collapsing vendor prefixes like -webkit-box and flex into a single property breaks older mobile browser rendering. Kagazo strictly preserves cascade fallback order.',
  },
  {
    badge: 'Error: Broken Font & Image URLs',
    title: 'Unescaped Characters in url() Paths',
    desc: 'Stripping quotation marks from url() paths containing spaces or hash anchors breaks asset loading. Kagazo normalizes URL parameters safely.',
  },
  {
    badge: 'Error: CSS Variable Name Corruption',
    title: 'Case-Sensitive Custom Property Alteration',
    desc: 'Unlike standard CSS properties, CSS variables (--myColor vs --mycolor) are strictly case-sensitive. Kagazo preserves case across all custom tokens.',
  },
];

export default function CssMinifierPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo CSS Minifier & Stylesheet Compressor',
        url: 'https://kagazo.in/tools/css-minifier',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress CSS stylesheets online up to 40%. Remove comments, whitespace, zero-units, and shorten hex colors with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Minify CSS Stylesheets Online in 5 Steps',
        description:
          'Step-by-step instructions to compress CSS code, strip developer comments, and reduce stylesheet file sizes for production.',
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
            name: 'CSS Minifier',
            item: 'https://kagazo.in/tools/css-minifier',
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">CSS Minifier</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-semibold text-blue-700 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Modern CSS Parser &bull; Render-Blocking Latency Reducer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free CSS Minifier &amp; </span>
            <span className="text-blue-600">Stylesheet Optimizer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress CSS stylesheets up to <strong>40%</strong>. Strip <strong>comments, zero units (`0px` to `0`), and shorten hex colors</strong> to eliminate render-blocking stylesheet latency with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <HtmlCssJsMinifierEngine defaultLanguage="css" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Stylesheet Acceleration
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Eliminating Render-Blocking Stylesheet Overhead
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Browsers cannot paint a single pixel until all external CSS files are fully downloaded and parsed. Kagazo applies safe, standards-compliant AST transformations to accelerate CSSOM generation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <Palette className="w-4 h-4" /> Hex Shorthand Optimization
                  </span>
                  <p className="text-xs text-text-main/70">
                    Automatically condenses 6-digit hex color codes (#ffffff) into 3-digit shorthand values (#fff).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Zero-Unit Stripping
                  </span>
                  <p className="text-xs text-text-main/70">
                    Converts margin: 0px 0em into margin: 0 according to W3C standards where zero requires no dimensional unit.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% Client-Side RAM
                  </span>
                  <p className="text-xs text-text-main/70">
                    Your proprietary stylesheets and design system tokens are processed locally with zero network transmission.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    CSS AST Minification Benchmarks
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Comprehensive breakdown of transformation rules and their impact on CSSOM construction.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  CSSOM Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Technique</th>
                      <th className="py-3 px-3">Raw CSS Syntax</th>
                      <th className="py-3 px-3">Minified Output</th>
                      <th className="py-3 px-3">Byte Savings</th>
                      <th className="py-3 px-3">CSSOM Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {CSS_OPTIMIZATION_BENCHMARKS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.technique}</td>
                        <td className="py-3 px-3 font-mono text-xs text-rose-600 bg-rose-50/50 rounded">{row.rawCss}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 bg-emerald-50/50 rounded">{row.minifiedCss}</td>
                        <td className="py-3 px-3 font-semibold text-blue-600">{row.savings}</td>
                        <td className="py-3 px-3 text-xs">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Render-Blocking Rule:</strong> External CSS files block HTML parser rendering. Eliminating comment bytes and shortening colors directly reduces Time to First Paint on mobile 4G/5G connections.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                How to Minify CSS Stylesheets in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
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
                Common CSS Minification Pitfalls and How Kagazo Fixes Them
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
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Frequently Asked Questions (CSS Minification &amp; Performance)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights into CSS stylesheet optimization, render-blocking latency, and standards.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-blue-600 font-black">Q{idx + 1}.</span>
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
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
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
                  href="/tools/base64-encode"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Base64 Encoder
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
