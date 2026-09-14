import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  ArrowRightLeft,
  FileCheck,
  Globe2,
  HelpCircle,
  Code2,
  CheckCircle2,
  Palette,
  Check,
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
    usage: 'Web CSS, HTML styling, Figma, TailwindCSS tokens',
    formula: 'Base-16 hexadecimal representation of 8-bit channels (00 to FF).',
  },
  {
    model: 'RGB / RGBA',
    syntax: 'rgb(R, G, B) / rgba(R, G, B, A)',
    usage: 'Digital screens, Canvas 2D API, WebGL shaders',
    formula: 'Additive light model (0–255 integer intensity per channel).',
  },
  {
    model: 'HSL / HSLA',
    syntax: 'hsl(H, S%, L%) / hsla(H, S%, L%, A)',
    usage: 'Design systems, modern CSS themes, UI state tints',
    formula: 'Cylindrical geometry: Hue (0–360°), Saturation (0–100%), Lightness (0–100%).',
  },
  {
    model: 'HSV / HSB',
    syntax: 'hsv(H, S%, V%)',
    usage: 'Photoshop color picker, digital painting, computer vision',
    formula: 'Hue (0–360°), Saturation (0–100%), Value / Brightness (0–100%).',
  },
  {
    model: 'CMYK',
    syntax: 'cmyk(C%, M%, Y%, K%)',
    usage: 'Commercial offset printing, packaging, print publishing',
    formula: 'Subtractive ink model: Cyan, Magenta, Yellow, Key / Black (0–100%).',
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
      'RGB is an additive color model designed for illuminated electronic displays (monitors, phones, TVs) where combining full red, green, and blue light produces pure white. In contrast, CMYK (Cyan, Magenta, Yellow, Black) is a subtractive color model engineered for physical printing inks where pigment absorb light. Colors that appear vibrant on RGB screens may look muted in CMYK print due to gamut boundaries.',
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
];

export default function ColorConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Color Converter Online Free',
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
        name: 'How to Convert Color Codes Across HEX, RGB, and HSL',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Input Color Code',
            text: 'Type or paste your color code in any supported format (HEX, RGB, HSL) or use the interactive color canvas.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect Converted Values',
            text: 'View real-time calculated equivalents across HEX, HEXA, RGB, RGBA, HSL, HSLA, HSV, and CMYK.',
          },
          {
            '@type': 'HowToStep',
            name: 'Check WCAG Contrast & Copy CSS',
            text: 'Verify accessibility compliance against light and dark backgrounds, then click any format to copy ready CSS declarations.',
          },
        ],
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
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
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
          <span className="text-primary font-bold">Color Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Multi-Model Universal Color Conversion Matrix</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Color Converter </span>
            <span className="text-primary">Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert color codes across 8 universal standards: <strong>HEX, RGB, HSL, HSV, and CMYK</strong>.
            Copy ready-to-use CSS declarations and verify real-time contrast ratios for WCAG 2.2 AA/AAA accessibility compliance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Code2 className="w-4 h-4 text-primary" /> 1-Click CSS Syntax Copy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-primary" /> WCAG 2.2 AA / AAA Verified
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Primary Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Container */}
            <ColorPickerEngine defaultHex="#003366" />

            {/* Post-Download Native Sponsor AdSlot */}
            <AdSlot slot="post_download" />

            {/* Mathematical Models Comparison Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Universal Color Spaces &amp; Representation Standards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Mathematical conversion logic and application environments for each color model.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Color Model</th>
                      <th className="p-3.5">Standard Syntax</th>
                      <th className="p-3.5">Primary Usage</th>
                      <th className="p-3.5">Mathematical Foundation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    {COLOR_MODELS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface/30 transition-colors">
                        <td className="p-3.5 font-bold text-text-main">{item.model}</td>
                        <td className="p-3.5 font-mono text-primary font-bold">{item.syntax}</td>
                        <td className="p-3.5">{item.usage}</td>
                        <td className="p-3.5 text-text-main/70">{item.formula}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* WCAG Contrast Accessibility Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                WCAG 2.2 Accessibility Contrast Thresholds
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    4.5:1
                  </div>
                  <h3 className="text-sm font-bold text-text-main">Level AA (Normal Text)</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Mandatory minimum contrast for standard body text under 18pt (or bold text under 14pt) against backgrounds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    3.0:1
                  </div>
                  <h3 className="text-sm font-bold text-text-main">Level AA (Large Text)</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Minimum requirement for large headings (18pt+ or 14pt bold) and essential UI components like buttons and form borders.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                    7.0:1
                  </div>
                  <h3 className="text-sm font-bold text-text-main">Level AAA (Strict Gold)</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Enhanced contrast requirement ensuring high readability for users with low vision across institutional and public portals.
                  </p>
                </div>
              </div>
            </section>

            {/* Deep FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-bold text-text-main">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                    <h3 className="font-bold text-text-main text-sm flex items-start gap-2">
                      <span className="text-primary font-extrabold">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-text-main/80 leading-relaxed pl-5">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Tools</span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/color-picker"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Color Picker &amp; Palette
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer Studio
                </Link>
                <Link
                  href="/tools/png-to-webp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to WebP Converter
                </Link>
                <Link
                  href="/tools/signature-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Digital Signature Studio
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
