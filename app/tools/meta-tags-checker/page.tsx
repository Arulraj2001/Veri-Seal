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
  Server,
  Network,
  Activity,
  Terminal,
  Layers,
  ArrowRightLeft,
} from 'lucide-react';
import { MetaTagsCheckerEngine } from '@/components/tools/MetaTagsCheckerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Meta Tags Checker & Social Card Preview Tool | Kagazo',
  description: 'Audit meta title, description, Open Graph (og:image), Twitter Card tags, and canonical links online. Preview real-time visual cards for Google Search, Facebook, LinkedIn, and X with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/meta-tags-checker',
  },
  openGraph: {
    title: 'Free Meta Tags Checker & Social Card Preview Tool | Kagazo',
    description: 'Audit meta title, description, Open Graph (og:image), Twitter Card tags, and canonical links online. Preview real-time visual cards for Google Search, Facebook, LinkedIn, and X with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/meta-tags-checker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Meta Tags Checker & Social Card Preview Tool | Kagazo',
    description: 'Audit meta title, description, Open Graph (og:image), Twitter Card tags, and canonical links online. Preview real-time visual cards for Google Search, Facebook, LinkedIn, and X with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Target Webpage URL",
    "desc": "Type or paste the complete webpage URL you wish to audit (e.g. https://yourdomain.com/blog/article)."
  },
  {
    "step": 2,
    "title": "Fetch & Parse Metadata",
    "desc": "The parser extracts all metadata tags from the HTML head tag."
  },
  {
    "step": 3,
    "title": "Review Visual Card Previews",
    "desc": "Inspect live simulated previews for Google Search results, Facebook feed posts, and Twitter/X cards."
  },
  {
    "step": 4,
    "title": "Check Length Guidelines",
    "desc": "Review alerts for titles exceeding 60 characters or descriptions exceeding 160 characters."
  },
  {
    "step": 5,
    "title": "Copy Clean Meta Tag Snippets",
    "desc": "Copy missing tags or optimized HTML markup directly into your CMS or React/Next.js template."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "SERP TRUNCATION",
    "title": "Title Tags Exceeding 60 Characters",
    "desc": "Google SERPs allocate approximately 600 pixels of width for title tags. Titles over 60 characters get chopped off with ugly ellipsis (...)."
  },
  {
    "badge": "IMAGE SHRINK BUG",
    "title": "Using Low-Resolution Open Graph Images",
    "desc": "Uploading og:image files smaller than 600x315 pixels forces Facebook and LinkedIn to display tiny square thumbnail cards instead of full-width banners."
  },
  {
    "badge": "DUPLICATE PENALTY",
    "title": "Missing or Broken Canonical Link Tags",
    "desc": "Omitting canonical tags causes search engines to treat HTTP/HTTPS versions and tracking parameter links as duplicate content."
  },
  {
    "badge": "NOINDEX ACCIDENT",
    "title": "Accidentally Leaving \"noindex\" on Live Pages",
    "desc": "Staging site robots meta tags (\"noindex, nofollow\") accidentally deployed to production completely remove your website from Google search results."
  }
];

const FAQS = [
  {
    "question": "What are meta tags and why are they essential for SEO?",
    "answer": "Meta tags are snippets of HTML code placed in the head section of a webpage. They inform search engines like Google about your page topic, target keywords, author, and indexing rules, while also controlling how your links appear when shared on social media platforms."
  },
  {
    "question": "What is the optimal character length for a webpage title tag?",
    "answer": "The recommended title tag length is between 50 and 60 characters (or under 600 pixels). Keeping titles within this range ensures that approximately 95% of your title is visible in desktop and mobile Google Search results without truncation."
  },
  {
    "question": "What is the optimal length for a meta description?",
    "answer": "Meta descriptions should generally be between 150 and 160 characters (approx. 960 pixels on desktop and 680 pixels on mobile). A compelling, well-crafted meta description improves organic click-through rates (CTR) from search results."
  },
  {
    "question": "Why are Open Graph (og:) tags important?",
    "answer": "Open Graph meta tags (developed by Facebook and adopted by LinkedIn, Discord, and Slack) control how your content appears when shared on social media. They dictate the exact headline (`og:title`), summary (`og:description`), and preview banner image (`og:image`)."
  },
  {
    "question": "What is the recommended size for an Open Graph image (og:image)?",
    "answer": "The ideal dimension for an Open Graph image is 1200 x 630 pixels, maintaining a 1.91:1 aspect ratio. This resolution ensures full-width, high-definition banner cards across desktop and mobile newsfeeds."
  },
  {
    "question": "What is a canonical tag (`rel=\"canonical\"`) and why is it mandatory?",
    "answer": "A canonical tag tells search engines which version of a URL represents the master, authoritative copy when identical content is accessible via multiple URLs (e.g., with tracking parameters, HTTP vs. HTTPS, or www vs. non-www)."
  },
  {
    "question": "What is the difference between summary and summary_large_image on Twitter/X?",
    "answer": "`summary` displays a small square thumbnail image to the left of the title and description text. `summary_large_image` displays a prominent, full-width visual banner card, which typically generates significantly higher engagement."
  },
  {
    "question": "Why does Google sometimes display a different description than my meta description?",
    "answer": "Google algorithms dynamically overwrite meta descriptions in approximately 60-70% of search queries if they believe a direct quote from the page body better matches the searcher specific query keywords."
  },
  {
    "question": "Can I check Schema.org JSON-LD structured data with this tool?",
    "answer": "Yes. Our tool scans for embedded `application/ld+json` script blocks, allowing you to inspect structured data schemas (such as WebPage, Article, Organization, and Product)."
  },
  {
    "question": "Is my website audit logged or made public?",
    "answer": "No. All meta tag extraction and previews run within your active browser session. We do not store, publish, or index your audited URLs or metadata."
  }
];

export default function MetaTagsCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Meta Tags Checker & Social Preview Studio',
        url: 'https://kagazo.in/tools/meta-tags-checker',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Audit meta title, description, Open Graph (og:image), Twitter Card tags, and canonical links online. Preview real-time visual cards for Google Search, Facebook, LinkedIn, and X with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Audit Webpage Meta Tags & Social Cards',
        description: 'Step-by-step verified workflow instructions for Meta Tags Checker & Social Preview Studio.',
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
            name: 'Meta Tags Checker & Social Preview Studio',
            item: 'https://kagazo.in/tools/meta-tags-checker',
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
          <span className="text-primary font-bold">Meta Tags Checker & Social Preview Studio</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Open Graph & Google SEO Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Meta Tags Checker & </span>
            <span className="text-primary">Social Preview Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Audit meta title, description, Open Graph (og:image), Twitter Card tags, and canonical links online. Preview real-time visual cards for Google Search, Facebook, LinkedIn, and X with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <MetaTagsCheckerEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Network Protocol Standards
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Real-Time Social Card Visualizer
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Interactive visual previews for Google Search snippets, Facebook/LinkedIn newsfeed cards, and Twitter/X rich cards.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Length & Pixel Overflow Auditing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Real-time character counters and pixel width simulators alert you when titles or descriptions risk truncation in search results.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Complete Protocol Verification
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Verifies standard HTML tags, Open Graph (OG), Twitter Cards, canonical link tags, robots indexing directives, and Schema.org JSON-LD.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Meta Tags & Social Graph Protocol Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative networking standards, protocol RFCs, and infrastructure specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Google & Open Graph Protocol Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Tag Category</th><th className="py-2.5 px-3 font-bold">Standard HTML Tag</th><th className="py-2.5 px-3 font-bold">Character / Pixel Threshold</th><th className="py-2.5 px-3 font-bold">Search & Social Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Page Title</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">title or meta name="title"</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">50 - 60 Characters (approx 600px)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Primary search ranking and browser tab label</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Meta Description</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">meta name="description"</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">150 - 160 Characters (approx 960px)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Influences click-through rate (CTR) in search results</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Canonical Link</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">link rel="canonical"</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Absolute HTTPS URL</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Consolidates duplicate content ranking signals</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Open Graph Title</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">meta property="og:title"</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">40 - 70 Characters</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Headline displayed on Facebook, LinkedIn, Discord</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Open Graph Image</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">meta property="og:image"</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1200 x 630 Pixels (1.91:1 ratio)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High-resolution image card on social networks</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Twitter Card</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">meta name="twitter:card"</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">summary_large_image</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Enables full-width preview cards on Twitter / X</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Audit Webpage Meta Tags & Social Cards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step diagnostic process for instant compliance and verified results:
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
                  Common Meta Tag Pitfalls & SEO Best Practices
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common server misconfigurations, protocol errors, and network downtime:
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
                    Comprehensive technical, networking, and security answers
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
                Meta Checker Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Open Graph & Google SEO
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Title Limit</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    50 - 60 Characters (600px)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Desc Limit</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    150 - 160 Characters
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">OG Image</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    1200 x 630 px (1.91:1)
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
                  href="/tools/http-headers-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      HTTP Headers Tracer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    HTTP
                  </span>
                </Link>
                <Link
                  href="/tools/url-redirect-checker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      URL Redirect Tracer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    301
                  </span>
                </Link>
                <Link
                  href="/tools/dns-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      DNS Zone Lookup
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    DNS
                  </span>
                </Link>
                <Link
                  href="/tools/ssl-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      SSL Certificate Checker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    TLS
                  </span>
                </Link>
                <Link
                  href="/tools/whois-lookup"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      WHOIS Domain Lookup
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    RDAP
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
                All network diagnostics, DNS queries, and header audits execute strictly inside your device browser memory. Zero target domains, IP records, or network payloads are logged on remote servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
