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
  Cpu,
} from 'lucide-react';
import { HtmlCssJsMinifierEngine } from '@/components/tools/HtmlCssJsMinifierEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free JavaScript Minifier & Code Compressor Online | Kagazo',
  description:
    'Compress and minify JavaScript code online up to 45%. Strips comments, collapses whitespace, protects string literals, and reduces client-side bundle size to optimize Total Blocking Time (TBT) with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/js-minifier',
  },
  openGraph: {
    title: 'Free JavaScript Minifier & Code Compressor | Kagazo',
    description:
      'Compress JavaScript files online up to 45%. Remove comments, whitespace, and optimize scripts with zero server uploads.',
    url: 'https://kagazo.in/tools/js-minifier',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JavaScript Minifier & Script Compressor | Kagazo',
    description:
      'Fast client-side JavaScript minifier. Strip comments and whitespace safely with 100% in-browser memory privacy.',
  },
};

const JS_OPTIMIZATION_BENCHMARKS = [
  {
    technique: 'Stripping Single & Multi-Line Comments',
    rawJs: '// Process payment transaction\\n/* Version 2.4.0 */\\nfunction pay() {}',
    minifiedJs: 'function pay(){}',
    savings: '15% – 30%',
    impact: 'Prevents exposing internal logic and reduces raw source file transfer volume',
  },
  {
    technique: 'Collapsing Structural Whitespace',
    rawJs: 'const config = {\\n  timeout: 5000,\\n  retries: 3\\n};',
    minifiedJs: 'const config={timeout:5000,retries:3};',
    savings: '20% – 35%',
    impact: 'Decreases V8 tokenizer streaming time and accelerates script execution',
  },
  {
    technique: 'Preserving String Literals & Regex',
    rawJs: 'const msg = "Hello   World";\\nconst re = /  +/g;',
    minifiedJs: 'const msg="Hello   World";const re=/  +/g;',
    savings: '5% – 10%',
    impact: 'Guarantees string content and regular expressions never corrupt during stripping',
  },
  {
    technique: 'Safeguarding Operator Spacing',
    rawJs: 'let count = a + +b;\\nreturn typeof x;',
    minifiedJs: 'let count=a+ +b;return typeof x;',
    savings: '2% – 5%',
    impact: 'Prevents operator collision (such as transforming + + into ++ increment)',
  },
  {
    technique: 'Trimming Function Indentation',
    rawJs: 'function run() {\\n    const a = 1;\\n    return a;\\n}',
    minifiedJs: 'function run(){const a=1;return a}',
    savings: '18% – 40%',
    impact: 'Optimizes Total Blocking Time (TBT) and Interaction to Next Paint (INP)',
  },
];

const FAQS = [
  {
    question: 'How does JavaScript minification improve Core Web Vitals (TBT and INP)?',
    answer:
      'JavaScript is both network-heavy and CPU-intensive. When a browser downloads a JS bundle, the JavaScript engine (like Google Chrome’s V8) must stream, compile, tokenize, and execute every single character. Minifying JavaScript reduces network payload size and byte count, which directly shortens main-thread blocking time, reduces Total Blocking Time (TBT), and improves user responsiveness metrics like Interaction to Next Paint (INP).',
  },
  {
    question: 'Does this minifier protect string literals containing spaces and newlines?',
    answer:
      'Yes. Our parser features lexical string protection that isolates single-quoted, double-quoted, and ES6 template literals (backticks). Spaces, tabs, and escape sequences inside text strings and regular expression literals (/pattern/) are strictly preserved so your UI copy and regex matchers remain 100% functional.',
  },
  {
    question: 'Will minifying my script break Automatic Semicolon Insertion (ASI)?',
    answer:
      'JavaScript allows developers to omit semicolons in certain contexts due to Automatic Semicolon Insertion (ASI). However, when line breaks are collapsed during minification, code that relies on ASI can occasionally merge with the next line and trigger unexpected errors. We recommend terminating all statements with explicit semicolons before minification to guarantee bulletproof production execution.',
  },
  {
    question: 'Is my proprietary application source code uploaded to remote servers?',
    answer:
      'Never. Kagazo processes 100% of your JavaScript code inside your browser’s local sandbox memory. No client logic, API keys, algorithmic routines, or proprietary codebases are ever transmitted over external network connections or logged to remote servers.',
  },
  {
    question: 'What is the difference between JavaScript minification and obfuscation?',
    answer:
      'Minification focuses entirely on reducing file size by stripping redundant characters, whitespace, and comments without altering program logic or renaming variables into confusing strings. Obfuscation deliberately scrambles variable names, alters control flow, and encodes strings to deter reverse engineering, often resulting in larger file sizes and slower execution speeds.',
  },
  {
    question: 'Does this tool support ES6+ modern JavaScript syntax?',
    answer:
      'Yes. Arrow functions, async/await keywords, optional chaining (?.), nullish coalescing (??), destructuring, and class syntax are processed seamlessly without parsing failure.',
  },
  {
    question: 'Can I upload an entire .js file for compression?',
    answer:
      'Yes. Drag and drop any .js file into the editor. The script is tokenized and minified in local browser RAM via the HTML5 File API with zero server roundtrips.',
  },
  {
    question: 'How does Kagazo prevent operator collision like "+ +" turning into "++"?',
    answer:
      'Our tokenizer detects adjacent operators (such as unary plus next to binary addition: a + +b) and maintains single space separation to prevent accidentally converting them into increment operators (a++b).',
  },
  {
    question: 'What is the typical compression ratio for JavaScript scripts?',
    answer:
      'Standard JavaScript scripts containing comments, functions, and indentation typically achieve between 25% and 45% reduction in raw file size before gzip/brotli transfer.',
  },
  {
    question: 'Can I download the minified code directly as a .min.js file?',
    answer:
      'Yes. Click "Download Minified JS" to immediately export a production-ready .min.js bundle to your local device.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input JavaScript Source',
    desc: 'Paste your raw JavaScript function, module, or snippet into the source editor or upload a .js script file.',
  },
  {
    step: 2,
    title: 'Isolate Literals & Regex',
    desc: 'The tokenizer automatically isolates strings, template literals, and regex patterns to protect internal spacing.',
  },
  {
    step: 3,
    title: 'Trigger In-Memory Minification',
    desc: 'Click Minify JS to strip comments, collapse indentation, and optimize token boundaries in milliseconds.',
  },
  {
    step: 4,
    title: 'Inspect Performance Savings',
    desc: 'Review the live byte counter comparing original script size with minified production weight.',
  },
  {
    step: 5,
    title: 'Copy or Download .min.js',
    desc: 'Copy the optimized JavaScript code with 1 click or download the ready-to-deploy .min.js bundle.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: ASI Semicolon Merge Failure',
    title: 'Omitted Statement Semicolons',
    desc: 'Relying on Automatic Semicolon Insertion (ASI) across collapsed line breaks can cause two expressions to merge. Ensure all statements end with semicolons prior to minification.',
  },
  {
    badge: 'Error: Unary Operator Collision',
    title: 'Accidental Increment Conversion',
    desc: 'Stripping spaces indiscriminately transforms a + +b into a++b, causing unexpected mathematical evaluation errors. Kagazo protects operator boundary spacing.',
  },
  {
    badge: 'Error: Dynamic Scope & eval() Hazards',
    title: 'Scope Corruption with eval() or with',
    desc: 'Scripts containing eval() or with blocks prevent safe scope analysis. Write modular ES6+ functions to achieve maximum minification efficiency.',
  },
  {
    badge: 'Error: Broken Multiline Strings',
    title: 'Unescaped ES5 Multiline Text',
    desc: 'Legacy multiline strings using backslashes (\\) at end of line can break if trailing whitespace is removed. Use ES6 template literals (`) instead.',
  },
];

export default function JsMinifierPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo JavaScript Minifier & Code Compressor',
        url: 'https://kagazo.in/tools/js-minifier',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Compress JavaScript code online up to 45%. Strip comments, collapse whitespace, and safeguard string literals with 100% client-side memory privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Minify JavaScript Scripts Online in 5 Steps',
        description:
          'Step-by-step instructions to compress JavaScript code, strip comments, and eliminate whitespace for production web applications.',
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
            name: 'JavaScript Minifier',
            item: 'https://kagazo.in/tools/js-minifier',
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-yellow-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">JavaScript Minifier</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-xs sm:text-sm font-semibold text-yellow-700 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
            <span>High-Speed JavaScript Engine &bull; Core Web Vitals (TBT/INP) Optimizer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free JavaScript Minifier &amp; </span>
            <span className="text-yellow-600">Code Compressor Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress JavaScript code up to <strong>45%</strong>. Strip <strong>comments, newlines, and whitespace</strong> while preserving string literals and variable scopes with zero server exposure.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine */}
            <HtmlCssJsMinifierEngine defaultLanguage="js" />

            {/* Post-Action Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Script Efficiency
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Optimizing Execution Speed &amp; Reducing Main-Thread Blocking
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                JavaScript must be downloaded, parsed into an Abstract Syntax Tree (AST), and compiled to machine code by browser JIT engines. Kagazo removes non-functional tokens to accelerate script compilation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-yellow-700 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> TBT &amp; INP Optimization
                  </span>
                  <p className="text-xs text-text-main/70">
                    Slashes main-thread compilation time to lower Total Blocking Time and improve touch responsiveness.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-yellow-700 flex items-center gap-1.5">
                    <Code className="w-4 h-4" /> Literal &amp; Regex Protection
                  </span>
                  <p className="text-xs text-text-main/70">
                    Strictly safeguards string spaces, template literals, and regex patterns so copy and expressions never break.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-yellow-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser RAM
                  </span>
                  <p className="text-xs text-text-main/70">
                    Your proprietary application logic and API endpoints are compressed exclusively in local client memory.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-600" />
                    JavaScript AST Optimization Benchmarks
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Detailed analysis of lexical stripping methods and their effect on V8 parse and runtime evaluation.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  V8 Benchmarks
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Technique</th>
                      <th className="py-3 px-3">Raw JavaScript Syntax</th>
                      <th className="py-3 px-3">Minified Output</th>
                      <th className="py-3 px-3">Typical Savings</th>
                      <th className="py-3 px-3">V8 / Runtime Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {JS_OPTIMIZATION_BENCHMARKS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{row.technique}</td>
                        <td className="py-3 px-3 font-mono text-xs text-rose-600 bg-rose-50/50 rounded">{row.rawJs}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700 bg-emerald-50/50 rounded">{row.minifiedJs}</td>
                        <td className="py-3 px-3 font-semibold text-yellow-600">{row.savings}</td>
                        <td className="py-3 px-3 text-xs">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>JIT Compiler Notice:</strong> Minification reduces raw script text tokens. For production bundles, combining minification with HTTP Brotli compression delivers maximum throughput.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                How to Minify JavaScript Scripts in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-yellow-600 text-white text-xs font-bold flex items-center justify-center">
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
                Common JavaScript Minification Pitfalls and How Kagazo Fixes Them
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
                  <HelpCircle className="w-5 h-5 text-yellow-600" />
                  Frequently Asked Questions (JavaScript Minification &amp; Performance)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive technical insights regarding script minification, V8 parsing, and performance metrics.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-yellow-600 font-black">Q{idx + 1}.</span>
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
                  href="/tools/css-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  CSS Minifier
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
                  Base64 Encode
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
