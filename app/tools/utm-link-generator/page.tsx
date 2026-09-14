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
  PenTool,
  Search,
  Fingerprint,
  QrCode,
  Scan,
  Share2,
  Mail,
  DollarSign,
  Link2,
} from 'lucide-react';
import { UtmLinkGeneratorEngine } from '@/components/tools/UtmLinkGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free UTM Link Generator & Campaign URL Builder (Google Analytics 4 / GA4) | Kagazo',
  description: 'Build campaign tracking links with standard UTM parameters for Google Analytics 4 (GA4). Auto-sanitizes utm_source, utm_medium, utm_campaign, utm_term, and utm_content with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/utm-link-generator',
  },
  openGraph: {
    title: 'Free UTM Link Generator & Campaign URL Builder (Google Analytics 4 / GA4) | Kagazo',
    description: 'Build campaign tracking links with standard UTM parameters for Google Analytics 4 (GA4). Auto-sanitizes utm_source, utm_medium, utm_campaign, utm_term, and utm_content with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/utm-link-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UTM Link Generator & Campaign URL Builder (Google Analytics 4 / GA4) | Kagazo',
    description: 'Build campaign tracking links with standard UTM parameters for Google Analytics 4 (GA4). Auto-sanitizes utm_source, utm_medium, utm_campaign, utm_term, and utm_content with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Website Destination URL",
    "desc": "Paste your landing page, product URL, or blog article link (e.g. https://yourdomain.com/product)."
  },
  {
    "step": 2,
    "title": "Set Campaign Source (utm_source)",
    "desc": "Specify the platform or referrer sending the traffic (e.g. newsletter, google, linkedin, instagram)."
  },
  {
    "step": 3,
    "title": "Set Campaign Medium (utm_medium)",
    "desc": "Identify the marketing channel type (e.g. email, cpc, organic_social, referral, qr)."
  },
  {
    "step": 4,
    "title": "Specify Campaign Name & Content",
    "desc": "Provide your promotion name (e.g. spring_promo) and optional creative identifiers for A/B testing."
  },
  {
    "step": 5,
    "title": "Copy Clean Tracking URL",
    "desc": "Copy the verified, formatted tracking link ready to deploy in ad managers, email campaigns, or link shorteners."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "REPORT FRAGMENTATION",
    "title": "Inconsistent Letter Casing (Email vs email)",
    "desc": "Google Analytics 4 is strictly case-sensitive. Using \"Email\", \"email\", and \"EMAIL\" splits your data into three separate medium rows. Always enforce uniform lowercase."
  },
  {
    "badge": "DATA LOSS TRAP",
    "title": "Using Spaces or Ampersands in Parameter Values",
    "desc": "Spaces or unencoded ampersands (&) break URL query parsing. Use hyphens (-) or underscores (_) to separate words in campaign names."
  },
  {
    "badge": "ATTRIBUTION DESTRUCTION",
    "title": "Tagging Internal Website Links with UTM Parameters",
    "desc": "Never place UTM parameters on links between pages within your own website. Doing so wipes out the original marketing attribution and inflates session counts."
  },
  {
    "badge": "HASH FRAGMENT ORDER",
    "title": "Placing UTM Parameters After URL Hashes (#)",
    "desc": "Putting query parameters after a hash (`/page#hero?utm_...`) causes web servers and analytics scripts to ignore them. Always place `?utm_...` before `#hash`."
  }
];

const FAQS = [
  {
    "question": "What are UTM parameters and why are they important?",
    "answer": "UTM (Urchin Tracking Module) parameters are five standard query tags appended to destination URLs that allow web analytics platforms like Google Analytics 4 (GA4), Mixpanel, and Adobe Analytics to accurately track the exact source, medium, and campaign creative driving your website traffic and conversions."
  },
  {
    "question": "Which UTM parameters are mandatory in Google Analytics 4?",
    "answer": "For accurate GA4 channel grouping, `utm_source`, `utm_medium`, and `utm_campaign` are strongly recommended as the essential triad. Without `utm_source` and `utm_medium`, GA4 cannot categorize incoming sessions into default channels (like Paid Search, Organic Social, or Email)."
  },
  {
    "question": "Why should I always use lowercase for UTM values?",
    "answer": "Google Analytics is case-sensitive. If you use `utm_source=Facebook` in one ad and `utm_source=facebook` in another, GA4 reports them as two completely separate traffic sources, fragmenting your metrics. Our tool automatically enforces lowercase formatting to keep your reporting clean."
  },
  {
    "question": "Should I separate words with hyphens or underscores in campaign names?",
    "answer": "Both hyphens (`spring-sale-2026`) and underscores (`spring_sale_2026`) are standard practice. However, hyphens are widely preferred for SEO and readability. Whichever convention you select, maintain consistency across your entire marketing team."
  },
  {
    "question": "What is the difference between utm_term and utm_content?",
    "answer": "`utm_term` is traditionally used in paid search advertising (like Google Ads or Bing Ads) to identify the specific bidding keyword. `utm_content` is used for A/B testing and content differentiation, such as distinguishing whether a user clicked the header logo link or the bottom CTA button in an email."
  },
  {
    "question": "Can I shorten a UTM tracking URL with Bitly or TinyURL?",
    "answer": "Yes. After generating your long UTM link with our tool, you can paste it into any URL shortener (like Bitly, Rebrandly, or TinyURL). When users click the short link, it redirects to the full destination URL and GA4 captures the UTM parameters normally."
  },
  {
    "question": "Why should I never use UTM links on internal website buttons?",
    "answer": "Using UTM links internally (e.g., linking from your homepage to a pricing page with UTM tags) instantly overwrites the original referral source that brought the visitor to your site. This causes GA4 to start a new artificial session and destroys your true marketing attribution data."
  },
  {
    "question": "Where do I find my UTM campaign data in Google Analytics 4?",
    "answer": "In Google Analytics 4, navigate to Reports -> Acquisition -> Traffic Acquisition. Select Primary Dimension as \"Session campaign\", \"Session source / medium\", or \"First user source / medium\" to analyze traffic, bounce rate, and revenue by campaign."
  },
  {
    "question": "Does this tool support the newer utm_id parameter?",
    "answer": "Yes. GA4 supports `utm_id`, which allows enterprise marketing teams to upload custom campaign metadata and cost data directly into Google Analytics via the GA4 Data Import feature."
  },
  {
    "question": "Are my campaign links or company website URLs tracked or saved?",
    "answer": "No. Our UTM Link Generator executes 100% locally in your web browser memory. No URLs, campaign names, client parameters, or tracking tags are ever sent to, recorded by, or stored on our servers."
  }
];

export default function UtmLinkGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'UTM Link Generator & Campaign URL Builder',
        url: 'https://kagazo.in/tools/utm-link-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Build campaign tracking links with standard UTM parameters for Google Analytics 4 (GA4). Auto-sanitizes utm_source, utm_medium, utm_campaign, utm_term, and utm_content with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Build Google Analytics 4 (GA4) UTM Tracking Links',
        description: 'Step-by-step verified workflow instructions for UTM Link Generator & Campaign URL Builder.',
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
            name: 'UTM Link Generator & Campaign URL Builder',
            item: 'https://kagazo.in/tools/utm-link-generator',
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
          <span className="text-primary font-bold">UTM Link Generator & Campaign URL Builder</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Google Analytics 4 (GA4) Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>UTM Link Generator & </span>
            <span className="text-primary">GA4 Campaign URL Builder</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Build campaign tracking links with standard UTM parameters for Google Analytics 4 (GA4). Auto-sanitizes utm_source, utm_medium, utm_campaign, utm_term, and utm_content with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <UtmLinkGeneratorEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Standards Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Full GA4 Compliance Matrix
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Engineered to match Google Analytics 4 campaign attribution models, supporting utm_source, utm_medium, utm_campaign, utm_term, utm_content, and utm_id.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Auto-Sanitization & Lowercase Enforcement
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically strips spaces, replaces special characters with hyphens, and enforces lowercase text to eliminate duplicate fragmented analytics reports.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> URL Fragment (#) Preservation
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Correctly places UTM query parameters before URL hash anchor fragments (#section), preventing broken deep links on single-page web applications.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    GA4 & Urchin Tracking Module (UTM) Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Google Analytics 4 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Requirement</th><th className="py-2.5 px-3 font-bold">Standard Format</th><th className="py-2.5 px-3 font-bold">Practical Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">utm_source</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mandatory</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Referrer identifier (lowercase)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">google, newsletter, facebook, linkedin, twitter</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">utm_medium</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mandatory</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Marketing channel medium</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">cpc, email, social, banner, affiliate, qr_code</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">utm_campaign</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mandatory</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Specific campaign identifier</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">summer_sale_2026, product_launch, black_friday</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">utm_term</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Optional</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Paid search keywords / audience</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">running+shoes, marketing_software, lookalike_1pct</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">utm_content</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Optional</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">A/B test creative / button ID</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">hero_cta_blue, sidebar_banner_v2, text_link</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">utm_id</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Optional</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">GA4 campaign data import ID</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ads_camp_89412, q3_promo_id</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Build Google Analytics 4 (GA4) UTM Tracking Links
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and optimal results:
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
                  Common UTM Tracking Mistakes & How to Avoid Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common scanning errors, protocol failures, and formatting pitfalls:
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
                    Comprehensive technical, optical, and operational answers
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
                UTM Link Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Google Analytics 4 (GA4)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Mandatory Tags</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Source, Medium, Campaign
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Formatting</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Auto-Lowercase & Hyphens
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">URL Structure</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    RFC 3986 Query Parameter
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local Execution
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
                  href="/tools/whatsapp-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      WhatsApp Link Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Chat
                  </span>
                </Link>
                <Link
                  href="/tools/mailto-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Mailto Link Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Email
                  </span>
                </Link>
                <Link
                  href="/tools/paypal-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PayPal Link Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Payment
                  </span>
                </Link>
                <Link
                  href="/tools/qr-code-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      QR Code Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    QR Code
                  </span>
                </Link>
                <Link
                  href="/tools/barcode-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Barcode Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    1D Code
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
                All matrix calculations, optical decoding, and link generations occur strictly inside your device browser memory. Zero URLs, contact details, or payloads are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
