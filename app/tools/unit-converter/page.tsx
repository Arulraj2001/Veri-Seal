import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Banknote,
  Calculator,
  GraduationCap,
  Award,
  FileCheck2,
  Clock,
  Globe,
  Code2,
  Ruler,
  Coins,
  Heart,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  Languages,
} from 'lucide-react';
import { UnitConverterEngine } from '@/components/tools/UnitConverterEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Universal Unit Converter Matrix (Length, Weight, Area, Data) | Kagazo',
  description: 'Free universal unit converter matrix for engineering, science, and daily measurements. High-precision conversion across Length, Weight, Indian Land Area (Cent, Ground, Acre), Digital Data, Temperature, and Speed. 100% private in-RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/unit-converter',
  },
  openGraph: {
    title: 'Universal Unit Converter Matrix (Length, Weight, Area, Data) | Kagazo',
    description: 'Free universal unit converter matrix for engineering, science, and daily measurements. High-precision conversion across Length, Weight, Indian Land Area (Cent, Ground, Acre), Digital Data, Temperature, and Speed. 100% private in-RAM.',
    url: 'https://kagazo.in/tools/unit-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Unit Converter Matrix (Length, Weight, Area, Data) | Kagazo',
    description: 'Free universal unit converter matrix for engineering, science, and daily measurements. High-precision conversion across Length, Weight, Indian Land Area (Cent, Ground, Acre), Digital Data, Temperature, and Speed. 100% private in-RAM.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Measurement Category",
    "desc": "Choose from Length, Weight, Area (including Indian Land Units), Data Storage, Temperature, or Speed."
  },
  {
    "step": 2,
    "title": "Enter Numeric Value",
    "desc": "Type the numerical quantity you want to convert into the interactive input field."
  },
  {
    "step": 3,
    "title": "Pick Source & Target Units",
    "desc": "Select your input unit (e.g. Feet, Cents, Kilograms) and desired destination unit (e.g. Meters, Sq Ft)."
  },
  {
    "step": 4,
    "title": "Review Exact Formula",
    "desc": "View the step-by-step mathematical conversion formula with configurable decimal precision."
  },
  {
    "step": 5,
    "title": "1-Click Copy Result",
    "desc": "Copy the exact converted value with symbol suffix ready for architectural plans, bills, or calculations."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Indian Land Unit Mixups",
    "title": "Confusing Cent, Ground, and Guntha",
    "desc": "Land measurements vary regionally across India. 1 Ground in Tamil Nadu is exactly 2,400 sq ft (5.5 Cents), whereas in other states Guntha or Bigha are used with completely different square footage."
  },
  {
    "badge": "Error: Data Storage Prefix Ambiguity",
    "title": "Mixing Decimal (KB) With Binary (KiB)",
    "desc": "Storage manufacturers define 1 KB as 1,000 bytes (decimal SI), while operating systems calculate 1 KiB as 1,024 bytes (binary IEC). This explains why a 1 TB hard disk formats as 931 GB in Windows."
  },
  {
    "badge": "Error: Temperature Linear Assumption",
    "title": "Multiplying Temperature by a Single Factor",
    "desc": "Celsius and Fahrenheit have different zero baselines. Converting Celsius to Fahrenheit requires multiplying by 9/5 AND adding 32 (F = C * 1.8 + 32). A simple ratio calculation produces wrong results."
  },
  {
    "badge": "Error: Floating-Point Rounding Drifts",
    "title": "Loss of Precision in High-Decimal Engineering",
    "desc": "Standard JavaScript binary floating-point math can produce errors like 0.1 + 0.2 = 0.30000000000000004. Kagazo uses scaled integer arithmetic to eliminate floating-point artifacts."
  }
];

const FAQS = [
  {
    "question": "How many square feet are in 1 Ground and 1 Cent in Tamil Nadu?",
    "answer": "In Tamil Nadu real estate: 1 Cent equals 435.60 square feet (40.46 sq meters). 1 Ground equals exactly 2,400 square feet (approximately 5.51 Cents or 222.96 sq meters). 1 Acre contains exactly 18.15 Grounds (43,560 sq ft)."
  },
  {
    "question": "What is the formula to convert Celsius to Fahrenheit and vice versa?",
    "answer": "To convert Celsius to Fahrenheit: F = (C * 9/5) + 32. To convert Fahrenheit to Celsius: C = (F - 32) * 5/9."
  },
  {
    "question": "What is the difference between KB and KiB in data storage?",
    "answer": "1 Kilobyte (KB) is 1,000 bytes based on the decimal (SI) system used by hard drive makers. 1 Kibibyte (KiB) is 1,024 bytes (2^10) based on binary architecture used by operating system RAM and disk formatting."
  },
  {
    "question": "How many meters are in a nautical mile compared to an imperial mile?",
    "answer": "1 Imperial Mile (statute mile) is 1,609.344 meters (5,280 feet). 1 Nautical Mile (used in maritime and aviation navigation) is standardized as exactly 1,852 meters (6,076.12 feet)."
  },
  {
    "question": "How many kilograms are in one metric ton vs imperial ton?",
    "answer": "1 Metric Ton (Tonne) equals exactly 1,000 kilograms (2,204.62 lbs). 1 Imperial Long Ton (UK) equals 1,016.05 kg (2,240 lbs), while 1 Short Ton (US) equals 907.18 kg (2,000 lbs)."
  },
  {
    "question": "Does this converter maintain high accuracy for micro and nano measurements?",
    "answer": "Yes. Kagazo precision engine allows up to 10 decimal places of accuracy for scientific, pharmaceutical, and high-tolerance mechanical engineering calculations."
  },
  {
    "question": "Can I convert speed between km/h, mph, and knots?",
    "answer": "Yes. The speed module converts seamlessly between kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and nautical knots (1 knot = 1.852 km/h)."
  },
  {
    "question": "What is the conversion between Acre and Hectare?",
    "answer": "1 Hectare equals 10,000 square meters or 2.47105 Acres. Conversely, 1 Acre equals 0.404686 Hectares (or 100 Cents in South India)."
  },
  {
    "question": "Is this unit converter available offline in the browser?",
    "answer": "Yes. Once loaded, all conversion calculation tables and algorithms are cached in your browser. You can perform unlimited conversions without an active internet connection."
  },
  {
    "question": "Are my inputs and calculation data tracked or stored?",
    "answer": "No. Kagazo operates with a 100% in-browser privacy policy. No numerical values, conversion pairs, or session records are ever transmitted to remote analytics servers."
  }
];

export default function UnitConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Universal Unit Converter Matrix',
        url: 'https://kagazo.in/tools/unit-converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Free universal unit converter matrix for engineering, science, and daily measurements. High-precision conversion across Length, Weight, Indian Land Area (Cent, Ground, Acre), Digital Data, Temperature, and Speed. 100% private in-RAM.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Units in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Universal Unit Converter Matrix.',
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
            name: 'Universal Unit Converter Matrix',
            item: 'https://kagazo.in/tools/unit-converter',
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
          <span className="text-primary font-bold">Universal Unit Converter Matrix</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Length, Weight, Area, Data & Temp • Exact SI Ratios</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Universal Unit Converter & </span>
            <span className="text-primary">Precision Engineering Matrix</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Free universal unit converter matrix for engineering, science, and daily measurements. High-precision conversion across Length, Weight, Indian Land Area (Cent, Ground, Acre), Digital Data, Temperature, and Speed. 100% private in-RAM.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <UnitConverterEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Compliance Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Multi-Domain Matrix
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Convert Length, Weight, Indian Land Area, Digital Storage, Temperature, and Speed with exact ratios.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Floating-Point Precision
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    High-precision decimal engine prevents cumulative floating-point rounding errors during conversions.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-Browser Math
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    All conversion formulas execute in local JavaScript memory without server latency or network calls.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Standard Engineering & Real Estate Land Unit Conversion Ratios
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  SI & Revenue Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Unit Category</th><th className="py-2.5 px-3 font-bold">Source Unit</th><th className="py-2.5 px-3 font-bold">Exact Conversion Equivalent</th><th className="py-2.5 px-3 font-bold">Primary Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Indian Land Area</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1 Acre</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">43,560 sq ft = 100 Cents = 18.15 Grounds = 0.4046 Hectare</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Revenue land registration, agriculture</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Indian Land Area</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1 Ground (Tamil Nadu)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2,400 sq ft = 222.96 sq meters = 5.51 Cents</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Chennai / Tamil Nadu residential plots</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Indian Land Area</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1 Cent</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">435.60 sq ft = 40.46 sq meters = 0.01 Acre</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">South Indian real estate property sales</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Length & Distance</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1 Meter (m)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">3.28084 Feet = 39.3701 Inches = 1.09361 Yards</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Civil engineering, construction surveys</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Weight & Mass</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1 Kilogram (kg)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2.20462 Pounds (lbs) = 35.274 Ounces (oz)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Commercial logistics, laboratory metrics</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Digital Data Storage</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1 Megabyte (MB)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1,000 Kilobytes (decimal) = 1,024 Kibibytes (binary KiB)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cloud storage, network bandwidth limits</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Units in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common Unit Conversion Pitfalls & Calculation Traps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, legal omissions, and calculation pitfalls:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Strict 10 Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Comprehensive technical, legal, and operational answers
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  10 Questions Answered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Key Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Unit Standards
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">SI Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Calibrated against International System of Units (SI).
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Land Measures</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Includes South Indian Cent, Ground, Acre, and Hectare.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Zero Drift</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    High-precision math without floating-point errors.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/unix-timestamp-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Unix Timestamp Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Epoch
                  </span>
                </Link>
                <Link
                  href="/tools/number-to-words-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Number to Words Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Math
                  </span>
                </Link>
                <Link
                  href="/tools/free-ats-resume-builder"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Free ATS Resume Builder
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Career
                  </span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-3 space-y-1.5 text-text-main/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-RAM Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-main/70">
                All calculations and document drafting occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
