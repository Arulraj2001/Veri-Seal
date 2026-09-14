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
  Pipette,
  Sliders,
  FileCheck,
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
    title: 'Color Picker & Palette Studio Free Online | Kagazo',
    description:
      'Convert HEX, RGB, HSL, and CMYK with WCAG contrast checker and image eyedropper. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/color-picker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Picker & Palette Studio Free Online | Kagazo',
    description:
      'Interactive color picker and image palette extractor with real-time WCAG contrast verification.',
  },
};

const COLOR_FORMATS = [
  {
    format: 'HEX (#RRGGBB)',
    example: '#2563EB',
    depth: '24-bit TrueColor',
    bestFor: 'Web CSS stylesheets, SVG graphics, digital UI kits',
  },
  {
    format: 'RGB / RGBA',
    example: 'rgb(37, 99, 235)',
    depth: '8 bits per channel',
    bestFor: 'HTML5 Canvas, CSS transitions, WebGL rendering',
  },
  {
    format: 'HSL / HSLA',
    example: 'hsl(221, 83%, 53%)',
    depth: 'Perceptual coordinates',
    bestFor: 'Design systems, dark mode themes, accessibility scaling',
  },
  {
    format: 'HSV / HSB',
    example: 'hsv(221, 84%, 92%)',
    depth: 'Artist color model',
    bestFor: 'Digital illustration software, color gradient stops',
  },
  {
    format: 'CMYK (%)',
    example: 'cmyk(84%, 58%, 0%, 8%)',
    depth: '4-Color Process',
    bestFor: 'Commercial offset printing, packaging, flyers, brochures',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Pick Color or Upload Image',
    desc: 'Use the interactive 2D color canvas and spectrum slider, or upload any photo, screenshot, or logo to sample colors.',
  },
  {
    step: 2,
    title: 'Sample Pixels with Eyedropper',
    desc: 'Hover and click anywhere across your uploaded image using the high-precision crosshair cursor to extract exact pixel coordinates.',
  },
  {
    step: 3,
    title: 'Inspect Extracted Palette',
    desc: 'Review the 8 dominant palette swatches generated automatically via color quantization from your uploaded graphic.',
  },
  {
    step: 4,
    title: 'Validate Contrast Ratios',
    desc: 'Examine live WCAG 2.2 Level AA and AAA contrast indicators against pure black and pure white background surfaces.',
  },
  {
    step: 5,
    title: 'Copy Syntax in 1 Click',
    desc: 'Click on any swatch or color value to instantly copy HEX, RGB, HSL, or CSS variables to your system clipboard.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: Retina Pixel Blurring',
    title: 'Inaccurate Colors from High-DPI Displays',
    desc: 'Sampling pixels from browser-scaled images introduces blurry interpolated values. Kagazo samples native unscaled canvas coordinates to extract exact source pixels.',
  },
  {
    badge: 'Error: Shadow Color Pollution',
    title: 'Dark Shadow Pixels Dominating Extracted Palettes',
    desc: 'Naive quantization algorithms often populate palettes with muddy black shadow pixels. Kagazo filters out deep shadow noise and extreme specular glare to highlight genuine brand tones.',
  },
  {
    badge: 'Error: Poor Button Legibility',
    title: 'Aesthetic Pastel Colors Failing Accessibility',
    desc: 'Soft pastel UI accents often fail WCAG legibility guidelines when paired with white text. Kagazo provides immediate pass/fail contrast scoring for both small body text and large headings.',
  },
  {
    badge: 'Error: Canvas Security Tainting',
    title: 'CORS Security Blocks on Remote Image Pixels',
    desc: 'Loading remote URLs into HTML5 canvas triggers browser security taint errors. Kagazo reads images locally via the FileReader API, ensuring 100% unrestricted sampling privacy.',
  },
];

const FAQS = [
  {
    question: 'What color formats does the Kagazo Color Picker support?',
    answer:
      'Kagazo converts colors in real-time across 8 models: HEX (#RRGGBB), HEXA (with alpha channel), RGB, RGBA, HSL, HSLA, HSV / HSB, and print CMYK (Cyan, Magenta, Yellow, Key Black). All calculations are synchronized instantly as you manipulate any slider or input field.',
  },
  {
    question: 'How do I extract a color palette from my own uploaded image or logo?',
    answer:
      'Scroll to the Image Eyedropper & Palette Extractor section and upload any image (JPG, PNG, WebP). The engine will automatically generate 8 dominant color swatches, and you can click anywhere on the image with the precision cursor to sample individual pixels with zero quality loss.',
  },
  {
    question: 'What is the WCAG contrast ratio, and why is it important for web design?',
    answer:
      'The Web Content Accessibility Guidelines (WCAG 2.2) require a minimum contrast ratio of 4.5:1 for normal text (Level AA) and 7.0:1 for enhanced contrast (Level AAA) to ensure people with visual impairments can read content comfortably. Kagazo displays real-time compliance badges against pure white and rich black backgrounds.',
  },
  {
    question: 'How does digital RGB convert into CMYK for physical print materials?',
    answer:
      'RGB represents additive light emitted by screens, whereas CMYK represents subtractive ink absorption on paper. Kagazo calculates standard four-color process ink percentages (Cyan, Magenta, Yellow, and Key Black) so graphic designers can bridge the gap between digital mockups and commercial print orders.',
  },
  {
    question: 'Are my uploaded images or custom color palettes saved to any server?',
    answer:
      'No. The Color Picker runs 100% inside your browser volatile memory. When you upload photos for palette extraction, the image is rendered onto an in-memory HTML5 canvas and never transmitted across the network, guaranteeing total confidentiality.',
  },
  {
    question: 'What is the difference between Color Picker and Color Converter?',
    answer:
      'While both tools perform synchronized math across HEX, RGB, and HSL, the Color Picker includes an interactive visual 2D color canvas, spectrum hue sliders, and an image upload eyedropper for extracting palettes directly from photos and logos.',
  },
  {
    question: 'How does the automatic color quantization algorithm extract dominant swatches?',
    answer:
      'The engine samples pixel buffers from your uploaded image using a modified median-cut quantization algorithm. It clusters pixels by perceptual proximity and selects the 8 most representative chromatic color centers while suppressing pure blacks and whites.',
  },
  {
    question: 'Can I extract colors from SVG vector graphics?',
    answer:
      'Yes. You can upload SVG vector files directly into the image canvas. The browser rasterizes the vector at high resolution onto an in-memory canvas buffer, allowing you to sample any fill or stroke color with the eyedropper cursor.',
  },
  {
    question: 'Why does my sampled color look slightly different when printed on paper?',
    answer:
      'Monitors emit vibrant light across the RGB sRGB or DCI-P3 spectrum, while printing presses use CMYK inks on physical paper that absorb and reflect ambient light. Highly saturated screen blues and greens fall outside the physical ink gamut and print slightly darker.',
  },
  {
    question: 'Does Kagazo support the native EyeDropper API on desktop browsers?',
    answer:
      'Yes! On modern Chromium-based browsers (Google Chrome, Microsoft Edge, and Opera), Kagazo utilizes the native EyeDropper API where available, allowing you to sample colors from any application window outside the browser viewport.',
  },
];

export default function ColorPickerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Color Picker Online Free - HEX, RGB, HSL, CMYK & Palette Extractor',
        url: 'https://kagazo.in/tools/color-picker',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Interactive color picker and palette extractor online. Convert between HEX, RGB, HSL, HSV, and CMYK in real-time.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Pick and Extract Color Palettes in 5 Steps',
        description:
          'Step-by-step instructions to pick colors, sample image pixels, and verify WCAG contrast ratios online free.',
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
          <span className="text-primary font-bold truncate">Color Picker</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Interactive Color Canvas &amp; Image Palette Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Color Picker </span>
            <span className="text-primary">&amp; Palette Studio Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Interactive color picker, image eyedropper, and palette generator. Extract dominant swatches, inspect <strong>WCAG 2.2 contrast ratios</strong>, and convert across <strong>HEX, RGB, HSL, and CMYK</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Pipette className="w-4 h-4 text-primary" /> Image Eyedropper
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Palette className="w-4 h-4 text-primary" /> 8-Swatch Palette Extractor
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
                  Color Studio Features
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Creative Color Discovery &amp; Accessibility Verification
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                From sampling brand accents on uploaded moodboards to verifying accessibility contrast ratios for responsive UI design, Kagazo delivers professional color tooling directly in your browser.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Pipette className="w-4 h-4" /> Precision Eyedropper
                  </span>
                  <p className="text-xs text-text-main/70">
                    Sample individual pixels from any uploaded logo or photo without quality degradation.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Palette className="w-4 h-4" /> 8 Dominant Swatches
                  </span>
                  <p className="text-xs text-text-main/70">
                    Automated color quantization instantly generates harmonious design palettes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> WCAG AA/AAA Scoring
                  </span>
                  <p className="text-xs text-text-main/70">
                    Live contrast calculations ensure UI components meet international accessibility standards.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Digital Color Formats &amp; Media Applications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Supported color standards, syntax structures, and production use cases.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Format Guide
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Format Model</th>
                      <th className="py-3 px-3">Syntax Example</th>
                      <th className="py-3 px-3">Bit Depth / Channel</th>
                      <th className="py-3 px-3">Best Used For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    {COLOR_FORMATS.map((f, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-text-main">{f.format}</td>
                        <td className="py-3 px-3 font-mono text-xs text-primary font-bold">{f.example}</td>
                        <td className="py-3 px-3 font-mono text-xs text-emerald-700">{f.depth}</td>
                        <td className="py-3 px-3 text-xs text-text-main/70">{f.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Eyedropper Privacy:</strong> Images uploaded for palette sampling remain strictly local in your browser memory buffer and are never saved or sent across the internet.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Pick and Extract Colors in 5 Steps
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
                Common Color Picking Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Color Picker &amp; Palette Studio)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Detailed guidance on color sampling, quantization, and accessibility audits.
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
                  href="/tools/color-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Color Converter
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
                  href="/tools/png-to-ico"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to ICO Converter
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
