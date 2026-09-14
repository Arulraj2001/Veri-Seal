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
  Palette,
  ArrowRightLeft,
  Sliders,
  Code2,
  FileCheck,
} from 'lucide-react';
import { ColorPickerEngine } from '@/components/tools/ColorPickerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Color Converter Online Free - HEX, RGB, HSL, HSV, CMYK | Kagazo',
  description:
    'Convert color codes across 8 universal standards: HEX, HEXA, RGB, RGBA, HSL, HSLA, HSV, and CMYK. Real-time WCAG 2.2 AA/AAA contrast ratio scores and 1-click CSS copying.',
  alternates: {
    canonical: 'https://kagazo.in/tools/color-converter',
  },
  openGraph: {
    title: 'Color Converter Online Free - HEX, RGB, HSL, HSV, CMYK | Kagazo',
    description:
      'Convert HEX to RGB, RGB to HSL, CMYK, and HSV in real-time with ready CSS declarations and WCAG accessibility contrast check.',
    url: 'https://kagazo.in/tools/color-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Converter Online Free - HEX, RGB, HSL, HSV, CMYK | Kagazo',
    description:
      'Real-time color converter across 8 universal formats with WCAG AA/AAA contrast scores and zero cloud uploads.',
  },
};

const COLOR_MODELS = [
  {
    model: 'HEX / HEXA',
    syntax: '#RRGGBB / #RRGGBBAA',
    range: '00 to FF per channel (Base 16)',
    usage: 'Web CSS, HTML styling, Figma, TailwindCSS design tokens',
  },
  {
    model: 'RGB / RGBA',
    syntax: 'rgb(R, G, B) / rgba(R, G, B, A)',
    range: '0–255 (integers) / 0.0–1.0 alpha',
    usage: 'Digital displays, Canvas 2D API, WebGL pixel shaders',
  },
  {
    model: 'HSL / HSLA',
    syntax: 'hsl(H, S%, L%) / hsla(H, S%, L%, A)',
    range: '0–360° Hue, 0–100% Saturation, 0–100% Lightness',
    usage: 'Modern CSS color systems, dynamic dark mode themes, UI states',
  },
  {
    model: 'HSV / HSB',
    syntax: 'hsv(H, S%, V%)',
    range: '0–360° Hue, 0–100% Saturation, 0–100% Value',
    usage: 'Photoshop color picker, digital painting, computer vision OpenCV',
  },
  {
    model: 'CMYK',
    syntax: 'cmyk(C%, M%, Y%, K%)',
    range: '0–100% Cyan, Magenta, Yellow, Black',
    usage: 'Commercial 4-color offset printing, packaging, brochure prepress',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Input Color Code',
    desc: 'Paste or type any color code in HEX, RGB, HSL, HSV, or CMYK format into the primary input field.',
  },
  {
    step: 2,
    title: 'Instant Multi-Format Conversion',
    desc: 'The mathematical conversion engine recalculates and displays the exact color across all 8 supported color spaces in real time.',
  },
  {
    step: 3,
    title: 'Fine-Tune Channels with Sliders',
    desc: 'Adjust individual color sliders (Hue, Saturation, Lightness, or Alpha opacity) to explore subtle shade variations.',
  },
  {
    step: 4,
    title: 'Verify WCAG Accessibility',
    desc: 'Review the live contrast ratio badges against pure white (#FFFFFF) and pure black (#000000) for WCAG 2.2 AA/AAA compliance.',
  },
  {
    step: 5,
    title: '1-Click CSS Syntax Copy',
    desc: 'Click on any converted format card to copy ready-to-paste CSS color declarations directly to your clipboard.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Hex Shorthand Ambiguity',
    title: 'Three-Digit HEX (#FFF) Transparency Loss',
    desc: 'Using shorthand 3-digit hex (#RGB) prevents specifying alpha transparency. Kagazo automatically normalizes shorthand into standard 6-character (#RRGGBB) and 8-character (#RRGGBBAA) hex codes.',
  },
  {
    badge: 'Error: CMYK Gamut Clipping',
    title: 'Dull Print Colors from Vibrant RGB Screens',
    desc: 'Electric blues and neon greens visible on illuminated monitors fall outside the physical CMYK ink gamut. Kagazo calculates the closest printable CMYK ink percentages to avoid print surprises.',
  },
  {
    badge: 'Error: WCAG Contrast Violations',
    title: 'Unreadable Text on UI Buttons and Alerts',
    desc: 'Light pastel buttons with white text fail accessibility audits and hurt usability. Kagazo provides instant AA and AAA contrast ratio indicators to ensure 4.5:1 minimum contrast compliance.',
  },
  {
    badge: 'Error: Missing Alpha Channel in HEXA',
    title: 'CSS Rendering Glitches in Legacy Browsers',
    desc: 'Modern 8-digit HEXA (#RRGGBBAA) is not supported by older browser engines. Kagazo simultaneously generates standard rgba() syntax with decimal alpha for maximum legacy compatibility.',
  },
];

const FAQS = [
  {
    question: 'How does HEX to RGB mathematical conversion work?',
    answer:
      'A standard 6-digit hex color (#RRGGBB) breaks down into three 2-character hexadecimal pairs representing red, green, and blue light components. Each pair is parsed as a base-16 number where characters 0–9 equal values 0–9 and letters A–F represent 10–15. For example, #003366 calculates to Red: 0, Green: (3 × 16) + 3 = 51, and Blue: (6 × 16) + 6 = 102, yielding rgb(0, 51, 102).',
  },
  {
    question: 'Why do designers prefer HSL over HEX or RGB for modern design systems?',
    answer:
      'HSL (Hue, Saturation, Lightness) aligns directly with human perceptual color psychology rather than hardware monitor light channels. By adjusting the Lightness percentage while keeping Hue and Saturation constant, developers can programmatically generate hover, active, disabled, and dark-mode states without manually recalculating RGB ratios.',
  },
  {
    question: 'What is the difference between CMYK and RGB color spaces?',
    answer:
      'RGB is an additive color model designed for illuminated electronic displays (monitors, phones, TVs) where combining full red, green, and blue light produces pure white. In contrast, CMYK (Cyan, Magenta, Yellow, Black) is a subtractive color model engineered for physical printing inks where pigments absorb light. Colors that appear vibrant on RGB screens may look muted in CMYK print due to gamut boundaries.',
  },
  {
    question: 'What are the official WCAG 2.2 contrast ratio requirements?',
    answer:
      'The Web Content Accessibility Guidelines (WCAG) 2.2 mandate a minimum contrast ratio of 4.5:1 for normal body text and 3:1 for large text (18pt+ or 14pt bold) to achieve Level AA compliance. For higher Level AAA compliance, body text requires at least a 7:1 contrast ratio against the background color to guarantee readability for users with low vision or color blindness.',
  },
  {
    question: 'Is my color palette data uploaded to any server?',
    answer:
      'No. Kagazo operates 100% in-browser using client-side JavaScript. Color conversions, mathematical matrix transformations, and image palette extractions happen directly in your local browser RAM memory without making any remote network API requests.',
  },
  {
    question: 'How does the alpha channel work in HEXA and RGBA?',
    answer:
      'The alpha channel controls opacity from fully transparent (0% / 0.0) to fully opaque (100% / 1.0). In RGBA, it is expressed as a decimal between 0 and 1 (e.g., rgba(0, 51, 102, 0.5)). In 8-digit HEXA, it is represented by two hexadecimal characters from 00 (0% opacity) to FF (100% opacity), such as #00336680.',
  },
  {
    question: 'What is HSV / HSB and how does it differ from HSL?',
    answer:
      'Both HSV (Hue, Saturation, Value) and HSL (Hue, Saturation, Lightness) are cylindrical representations of RGB. In HSV, maximum Value corresponds to pure white when saturation is zero, but pure color when saturation is 100%. In HSL, maximum Lightness (100%) always yields pure white regardless of saturation, making HSL more intuitive for web design tinting.',
  },
  {
    question: 'Can I convert Pantone (PMS) colors to CMYK or HEX with this tool?',
    answer:
      'Pantone is a proprietary spot-ink matching system. While Kagazo does not license proprietary Pantone swatch libraries, you can enter the official Pantone RGB or HEX equivalent provided by the manufacturer to instantly convert it into accurate CMYK process percentages and CSS tokens.',
  },
  {
    question: 'Why do colors look different on mobile screens versus desktop monitors?',
    answer:
      'Differences occur due to varying display color gamuts (such as standard sRGB versus wide-gamut Display P3 on newer iPhones and MacBooks), factory panel calibration, and ambient light sensors like Apple True Tone. For consistent web reproduction, always use standard sRGB color coordinates.',
  },
  {
    question: 'How do I use the converted CSS variables in modern web frameworks like TailwindCSS?',
    answer:
      'You can copy the HSL or RGB values and declare them in your root CSS stylesheet as custom properties, for example: --primary: 210 100% 50%. In your tailwind.config.js, reference this variable using hsl(var(--primary)) to enable automated opacity modifiers throughout your design system.',
  },
];

export default function ColorConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Color Converter Online Free - HEX, RGB, HSL, HSV, CMYK',
        url: 'https://kagazo.in/tools/color-converter',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Convert colors across HEX, RGB, HSL, HSV, and CMYK formats with real-time WCAG AA/AAA contrast checks and CSS export.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Color Codes Across HEX, RGB, and HSL in 5 Steps',
        description:
          'Step-by-step instructions to convert digital color codes across HEX, RGB, HSL, HSV, and CMYK formats.',
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
            name: 'Color Converter',
            item: 'https://kagazo.in/tools/color-converter',
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
          <span className="text-primary font-bold truncate">Color Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Universal Color Space Engine &amp; WCAG Contrast Suite</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Color Converter </span>
            <span className="text-primary">HEX, RGB, HSL &amp; CMYK</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert color codes across 8 universal standards: <strong>HEX, HEXA, RGB, RGBA, HSL, HSLA, HSV, and CMYK</strong>. Real-time WCAG 2.2 AA/AAA contrast ratio scoring and 1-click CSS syntax copying.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-primary" /> WCAG 2.2 AA &amp; AAA Scoring
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Code2 className="w-4 h-4 text-primary" /> 1-Click CSS Export
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ColorPickerEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Color Science &amp; Accessibility
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  High-Precision Multi-Model Color Conversion Engine
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Whether you are designing digital UI themes, developing frontend component libraries, or preparing graphics for physical commercial printing, Kagazo bridges color models with exact mathematical precision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ArrowRightLeft className="w-4 h-4" /> 8 Universal Models
                  </span>
                  <p className="text-xs text-text-main/70">
                    Instant synchronized conversion between HEX, RGB, HSL, HSV, and CMYK models.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> WCAG 2.2 Contrast Ratio
                  </span>
                  <p className="text-xs text-text-main/70">
                    Real-time readability validation against dark and light UI backgrounds.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" /> 1-Click CSS Syntax
                  </span>
                  <p className="text-xs text-text-main/70">
                    Direct clipboard copying formatted for TailwindCSS, CSS Variables, and CSS-in-JS.
                  </p>
                </div>
              </div>
            </section>

            {/* Color Models Matrix Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Color Models &amp; Coordinate Specifications Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Standard coordinate boundaries and primary applications across web and print.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Color Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Color Space</th>
                      <th className="py-3 px-3">Syntax Example</th>
                      <th className="py-3 px-3">Channel Coordinate Range</th>
                      <th className="py-3 px-3">Primary Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {COLOR_MODELS.map((model, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{model.model}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{model.syntax}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700">{model.range}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{model.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Color Space Note:</strong> Modern web browsers render in standard sRGB color space. When converting to CMYK for physical print shops, keep in mind that subtractive inks reflect less dynamic range than self-illuminating display panels.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Convert Color Codes in 5 Steps
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
                Common Color Conversion Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Color Conversion)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Technical insights into color science, contrast ratios, and frontend tokens.
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
                Related Design Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/color-picker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Color Picker &amp; Palette
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
                </Link>
                <Link
                  href="/tools/remove-background"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Remove Background
                </Link>
                <Link
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/html-minifier"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  HTML Minifier
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
