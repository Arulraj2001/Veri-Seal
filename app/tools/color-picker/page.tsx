import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  Pipette,
  FileCheck,
  Globe2,
  Palette,
} from 'lucide-react';
import { ColorPickerEngine } from '@/components/tools/ColorPickerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Color Picker Online Free - HEX, RGB, HSL, CMYK & Palette Extractor | Kagazo',
  description:
    'Interactive color picker and palette extractor online. Convert between HEX, RGB, HSL, HSV, and CMYK in real-time. Check WCAG accessibility contrast ratios and extract color palettes from images with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/color-picker',
  },
  openGraph: {
    title: 'Color Picker & Palette Studio Free | Kagazo',
    description: 'Convert HEX, RGB, HSL, and CMYK with WCAG contrast checker and image eyedropper. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/color-picker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What color formats does the Kagazo Color Picker support?',
    answer:
      'Kagazo converts colors in real-time across 8 models: HEX (#RRGGBB), HEXA (with alpha channel), RGB, RGBA, HSL, HSLA, HSV / HSB, and print CMYK (Cyan, Magenta, Yellow, Key Black). All calculations are synchronized instantly as you manipulate any slider or input field.',
  },
  {
    question: 'How do I extract a color palette from my own uploaded image or logo?',
    answer:
      'Scroll to the "Image Eyedropper & Palette Extractor" section and upload any image (JPG, PNG, WebP). The engine will automatically generate 8 dominant color swatches, and you can click anywhere on the image with the precision cursor to sample individual pixels with zero quality loss.',
  },
  {
    question: 'What is the WCAG contrast ratio, and why is it important for web design?',
    answer:
      'The Web Content Accessibility Guidelines (WCAG 2.1) require a minimum contrast ratio of 4.5:1 for normal text (Level AA) and 7.0:1 for enhanced contrast (Level AAA) to ensure people with visual impairments can read content comfortably. Kagazo displays real-time compliance badges against pure white and rich black backgrounds.',
  },
  {
    question: 'How does digital RGB convert into CMYK for physical print materials?',
    answer:
      'RGB represents additive light emitted by screens, whereas CMYK represents subtractive ink absorption on paper. Kagazo calculates standard four-color process ink percentages (Cyan, Magenta, Yellow, and Key Black) so graphic designers can bridge the gap between digital mockups and commercial print orders.',
  },
  {
    question: 'Are my uploaded images or custom color palettes saved to any server?',
    answer:
      'No. The Color Picker runs 100% inside your browser’s volatile memory. When you upload photos for palette extraction, the image is rendered onto an in-memory HTML5 canvas and never transmitted across the network, guaranteeing total confidentiality.',
  },
];

export default function ColorPickerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Color Picker and Palette Studio',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/color-picker',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Online color picker and format converter supporting HEX, RGB, HSL, CMYK, WCAG accessibility contrast checker, and image palette extraction.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Pick and Convert Colors Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Adjust Color Sliders',
            text: 'Slide Red, Green, Blue, and Opacity sliders to dial in your exact color shade.',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy Desired Format',
            text: 'Click on any format card (HEX, RGB, HSL, CMYK) to copy the exact code to your clipboard.',
          },
          {
            '@type': 'HowToStep',
            name: 'Test WCAG Accessibility',
            text: 'Review the contrast ratio against white and black backgrounds to ensure compliance with ADA accessibility guidelines.',
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
            name: 'Color Picker',
            item: 'https://kagazo.in/tools/color-picker',
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Color Picker</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>Interactive Color Studio • 8 Format Converter &amp; WCAG Checker</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Color Picker &amp; Palette Studio Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Select colors, convert between <strong>HEX, RGB, HSL, HSV, and CMYK</strong>, test WCAG accessibility contrast ratios, and extract color palettes from uploaded images.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Palette className="w-4 h-4 text-primary" /> Image Eyedropper &amp; Palette
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> WCAG AA / AAA Score
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ColorPickerEngine defaultHex="#E6570B" />

            <AdSlot slot="post_download" />

            {/* Educational Matrix */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Understanding Color Models in Web &amp; Print Design
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  When to use HEX, RGB, HSL, or CMYK in your digital projects.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🌐 HEX &amp; RGB (Screen Displays)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Used across CSS, HTML, and digital screens. RGB combines Red, Green, and Blue light from 0 to 255. HEX represents these values as a 6-digit hexadecimal string.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🎨 HSL (Human-Friendly Tuning)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Hue (0-360° on the color wheel), Saturation (0-100%), and Lightness (0-100%). Ideal for generating harmonious tints, shades, and dark-mode variations.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🖨️ CMYK (Commercial Printing)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Subtractive color model using Cyan, Magenta, Yellow, and Key (Black) inks for print brochures, posters, business cards, and physical merchandise.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">👁️ WCAG Contrast (Accessibility)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    A ratio comparing the relative luminance of foreground text to its background. Ensures readability across high ambient light and for low-vision readers.
                  </p>
                </div>
              </div>
            </section>

            {/* WCAG Accessibility Contrast Matrix */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  WCAG 2.2 Color Contrast &amp; Accessibility Thresholds
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official W3C digital compliance criteria for legible web and mobile typography.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/60">
                      <th className="py-3 px-4 font-bold text-text-main">Compliance Level</th>
                      <th className="py-3 px-4 font-bold text-text-main">Minimum Ratio</th>
                      <th className="py-3 px-4 font-bold text-primary">Content Type</th>
                      <th className="py-3 px-4 font-bold text-emerald-700">Recommended Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-emerald-700">WCAG Level AA</td>
                      <td className="py-3.5 px-4 font-medium text-text-main">4.5 : 1</td>
                      <td className="py-3.5 px-4 text-text-main/80">Normal Body Text (&lt;18pt)</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Standard legal minimum for all commercial websites</td>
                    </tr>
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-emerald-700">WCAG Level AA (Large)</td>
                      <td className="py-3.5 px-4 font-medium text-text-main">3.0 : 1</td>
                      <td className="py-3.5 px-4 text-text-main/80">Large Text (&ge;18pt or &ge;14pt Bold)</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Hero headings, banners &amp; large UI button labels</td>
                    </tr>
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-primary">WCAG Level AAA</td>
                      <td className="py-3.5 px-4 font-medium text-text-main">7.0 : 1</td>
                      <td className="py-3.5 px-4 text-text-main/80">Enhanced Normal Text</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Government, banking, healthcare &amp; high-accessibility portals</td>
                    </tr>
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-primary">UI Components</td>
                      <td className="py-3.5 px-4 font-medium text-text-main">3.0 : 1</td>
                      <td className="py-3.5 px-4 text-text-main/80">Input borders, icons &amp; focus rings</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Ensures buttons &amp; form controls stand out from backgrounds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="divide-y divide-surface-darker/70">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group py-4 first:pt-0 last:pb-0">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-text-main group-hover:text-primary transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed pl-2 border-l-2 border-primary/30">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Design Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/color-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Color Converter Matrix
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
                </Link>
                <Link
                  href="/tools/signature-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Signature Generator
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Color operations and image samples occur entirely in volatile memory. No tracking.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
