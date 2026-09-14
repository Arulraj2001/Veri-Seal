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
import { MailtoLinkGeneratorEngine } from '@/components/tools/MailtoLinkGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Mailto Link Generator (HTML Email Link & Button Builder) | Kagazo',
  description: 'Generate standard RFC 6068 mailto: links and HTML anchor tags online for free. Support for CC, BCC, pre-filled subject lines, and multi-line body templates with automatic percent-encoding and 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/mailto-link-generator',
  },
  openGraph: {
    title: 'Free Mailto Link Generator (HTML Email Link & Button Builder) | Kagazo',
    description: 'Generate standard RFC 6068 mailto: links and HTML anchor tags online for free. Support for CC, BCC, pre-filled subject lines, and multi-line body templates with automatic percent-encoding and 100% client-side privacy.',
    url: 'https://kagazo.in/tools/mailto-link-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mailto Link Generator (HTML Email Link & Button Builder) | Kagazo',
    description: 'Generate standard RFC 6068 mailto: links and HTML anchor tags online for free. Support for CC, BCC, pre-filled subject lines, and multi-line body templates with automatic percent-encoding and 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter Primary Recipient",
    "desc": "Input the primary destination email address (e.g., support@yourcompany.com)."
  },
  {
    "step": 2,
    "title": "Add CC & BCC (Optional)",
    "desc": "Include secondary email addresses for carbon copy and blind carbon copy tracking."
  },
  {
    "step": 3,
    "title": "Set Subject Line",
    "desc": "Draft a clear, pre-filled subject line (e.g., \"Inquiry regarding Enterprise License\")."
  },
  {
    "step": 4,
    "title": "Compose Body Template",
    "desc": "Draft the pre-filled message body with structured questions, bullet points, and greeting lines."
  },
  {
    "step": 5,
    "title": "Copy Link or HTML Code",
    "desc": "Copy the raw mailto URL or the full HTML anchor tag code directly into your CMS or website."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "DELIMITER COLLISION",
    "title": "Using Multiple Question Marks (?) in Query String",
    "desc": "Only the very first query parameter starts with `?`. All subsequent parameters (like `&body=` and `&cc=`) must begin with an ampersand `&`."
  },
  {
    "badge": "LINE BREAK SQUASH",
    "title": "Using \\n Instead of RFC-Compliant %0D%0A",
    "desc": "Email clients like Outlook and Thunderbird ignore simple `\\n` breaks. Always use `%0D%0A` (carriage return + line feed) to preserve paragraph breaks."
  },
  {
    "badge": "URL TRUNCATION",
    "title": "Exceeding 2,000 Characters in Body Text",
    "desc": "Many webmail clients and mobile operating systems truncate mailto links exceeding 2,000 characters. Keep pre-filled body templates concise."
  },
  {
    "badge": "SPAM BOT HARVESTING",
    "title": "Exposing Plaintext Email on Public Webpages",
    "desc": "Public mailto links are easily scraped by web crawlers. For public contact pages, consider contact forms or obfuscating email characters."
  }
];

const FAQS = [
  {
    "question": "What is a mailto link and how does it work?",
    "answer": "A `mailto:` link is a special Uniform Resource Identifier (URI) scheme defined in RFC 6068. When a website visitor clicks a mailto link, their operating system automatically launches their default email client (such as Microsoft Outlook, Apple Mail, or a webmail handler like Gmail) with the recipient, subject, and body pre-populated."
  },
  {
    "question": "How do I add multiple email recipients to a mailto link?",
    "answer": "You can specify multiple email addresses in the primary \"To\" field or in the \"CC\" and \"BCC\" fields by separating each address with a comma (e.g., `mailto:sales@example.com,support@example.com`)."
  },
  {
    "question": "Why do spaces appear as %20 in the generated link?",
    "answer": "URLs and URI schemes cannot contain literal whitespace characters according to RFC 3986. Spaces must be percent-encoded as `%20` so web browsers and email applications can interpret the string without breaking the link."
  },
  {
    "question": "How do line breaks work in a pre-filled email body?",
    "answer": "To create a line break in a mailto body, the standard internet carriage return and line feed characters (CRLF) must be encoded as `%0D%0A`. A double line break (`%0D%0A%0D%0A`) creates a clean paragraph separation in all major email clients."
  },
  {
    "question": "What is the maximum allowed length for a mailto link?",
    "answer": "While the RFC 6068 specification does not impose an arbitrary character limit, web browsers and email clients (notably Internet Explorer, Outlook, and mobile Safari) can fail or truncate links exceeding approximately 2,000 characters. Keep message templates under 1,500 characters for universal reliability."
  },
  {
    "question": "Does clicking a mailto link work if the user has no desktop email client installed?",
    "answer": "If a user does not have a native email application configured (like Outlook or Apple Mail), modern browsers like Google Chrome allow users to register Gmail or Outlook.com as their default protocol handler, opening the compose window directly in the browser."
  },
  {
    "question": "Can I use this mailto link in my email signature or PDF document?",
    "answer": "Yes. You can attach the `mailto:...` link to any hyperlink field in PDF documents, Microsoft Word files, email signatures, or web pages."
  },
  {
    "question": "What is the difference between a mailto link and a web contact form?",
    "answer": "A mailto link opens the user's personal email software, allowing them to send messages from their own authenticated email address. A web contact form submits data through a server-side script, keeping the visitor on your webpage without opening external apps."
  },
  {
    "question": "Can I style a mailto link as a button on my website?",
    "answer": "Yes. Use our generated HTML anchor snippet and apply your CSS button classes (e.g., `<a href=\"mailto:...\" class=\"btn btn-primary\">Email Us</a>`)."
  },
  {
    "question": "Are the email addresses I enter here saved or shared?",
    "answer": "No. Our Mailto Link Generator runs 100% locally in your browser memory. No email addresses, subject lines, or message templates are ever sent to, logged by, or stored on any server."
  }
];

export default function MailtoLinkGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Mailto Link Generator Online',
        url: 'https://kagazo.in/tools/mailto-link-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate standard RFC 6068 mailto: links and HTML anchor tags online for free. Support for CC, BCC, pre-filled subject lines, and multi-line body templates with automatic percent-encoding and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create HTML Mailto Links with Pre-filled Content',
        description: 'Step-by-step verified workflow instructions for Mailto Link Generator Online.',
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
            name: 'Mailto Link Generator Online',
            item: 'https://kagazo.in/tools/mailto-link-generator',
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
          <span className="text-primary font-bold">Mailto Link Generator Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC 6068 Standard URI Scheme</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Mailto Link Generator </span>
            <span className="text-primary">HTML Email URL Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate standard RFC 6068 mailto: links and HTML anchor tags online for free. Support for CC, BCC, pre-filled subject lines, and multi-line body templates with automatic percent-encoding and 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <MailtoLinkGeneratorEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Strict RFC 6068 Compliance
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Constructs perfectly compliant mailto: URIs with proper query parameter separators (? and &) and RFC 3986 percent-encoding.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Pre-Formatted HTML Anchor Code
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instantly generates ready-to-paste HTML anchor tag HTML snippets for websites, newsletter templates, and email signatures.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Multi-Line CRLF Formatting
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Correctly converts paragraphs and line breaks into `%0D%0A` sequences, preventing text squashing across Outlook, Apple Mail, and Gmail.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    RFC 6068 Mailto URI Scheme Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IETF RFC 6068 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Component</th><th className="py-2.5 px-3 font-bold">Syntax Standard</th><th className="py-2.5 px-3 font-bold">Delimiter Rule</th><th className="py-2.5 px-3 font-bold">Encoding Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Recipient (To)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">mailto:user@domain.com</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Initial scheme delimiter</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Multiple addresses separated by commas</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Query Parameters</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">?subject=...&body=...</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">First param starts with ?, others with &</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 3986 percent-encoding for reserved chars</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Carbon Copy (CC)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">cc=recipient@domain.com</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Secondary query parameter (&cc=)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard comma-separated email list</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Blind Carbon Copy (BCC)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">bcc=audit@domain.com</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Secondary query parameter (&bcc=)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Hidden copy recipients for tracking</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Subject Line</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">subject=Support%20Request</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">URL encoded string</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Spaces converted to %20 (avoid + signs)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Body Text & Line Breaks</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">body=Line1%0D%0ALine2</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CRLF (%0D%0A) line separators</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard multi-line formatted email templates</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Create HTML Mailto Links with Pre-filled Content
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
                  Common Mailto Link Syntax Errors & Fixes
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
                Mailto Link Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Protocol</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    IETF RFC 6068 Standard
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Encoding</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    RFC 3986 Percent-Encoding
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Line Breaks</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    CRLF Standard (%0D%0A)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Fields</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    To, CC, BCC, Subject, Body
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
                  href="/tools/utm-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UTM Link Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    GA4
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
