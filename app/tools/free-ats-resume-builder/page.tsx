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
import ResumeBuilderEngine from '@/components/tools/ResumeBuilderEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free ATS Resume Builder Online & Bio-Data Studio (100% Free, No Signup) | Kagazo',
  description: 'Build ATS-compliant software engineer resumes, fresher 1-page CVs, Sarkari PSU tabular biodata, and marriage biodata online. Real-time ATS readiness scoring (0-100), modern tech stack chips, clean A4 PDF export. 100% private in-RAM, zero watermark.',
  alternates: {
    canonical: 'https://kagazo.in/tools/free-ats-resume-builder',
  },
  openGraph: {
    title: 'Free ATS Resume Builder Online & Bio-Data Studio (100% Free, No Signup) | Kagazo',
    description: 'Build ATS-compliant software engineer resumes, fresher 1-page CVs, Sarkari PSU tabular biodata, and marriage biodata online. Real-time ATS readiness scoring (0-100), modern tech stack chips, clean A4 PDF export. 100% private in-RAM, zero watermark.',
    url: 'https://kagazo.in/tools/free-ats-resume-builder',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ATS Resume Builder Online & Bio-Data Studio (100% Free, No Signup) | Kagazo',
    description: 'Build ATS-compliant software engineer resumes, fresher 1-page CVs, Sarkari PSU tabular biodata, and marriage biodata online. Real-time ATS readiness scoring (0-100), modern tech stack chips, clean A4 PDF export. 100% private in-RAM, zero watermark.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Choose Target Role Preset",
    "desc": "Select Software Engineer, Fresh College Graduate, Business & Marketing, or Sarkari PSU format."
  },
  {
    "step": 2,
    "title": "Input Clean Contact Links",
    "desc": "Add phone, professional email, LinkedIn, and clean GitHub profile URL in standard body text."
  },
  {
    "step": 3,
    "title": "Describe Impactful Work",
    "desc": "List responsibilities using active verbs and quantifiable metrics (e.g., Improved latency by 35%)."
  },
  {
    "step": 4,
    "title": "Run Real-Time ATS Audit",
    "desc": "Inspect your live 0-100 ATS readiness score to fix formatting gaps, keyword density, and length."
  },
  {
    "step": 5,
    "title": "Download Clean A4 PDF",
    "desc": "Export a vector-quality, machine-readable A4 PDF ready for instant upload on job portals."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Multi-Column Table Scramble",
    "title": "Using Complex Graphic Design Layouts",
    "desc": "Applicant Tracking Systems parse text left-to-right across the page. Two-column tables scramble job titles with unrelated skills. Kagazo uses a linear, single-column hierarchy that parses with 100% accuracy."
  },
  {
    "badge": "Error: Header/Footer Contact Placement",
    "title": "Hiding Email & Phone in Document Header",
    "desc": "Many corporate ATS engines (Taleo, Workday) strip out Word/PDF headers and footers to remove page numbers, inadvertently dropping candidate contact details. Always place contact info in the document body."
  },
  {
    "badge": "Error: Rasterized Image Resumes",
    "title": "Exporting Canva Images as Flattened PDFs",
    "desc": "Resumes exported from graphic design tools often render text as pixel bitmaps. ATS bots see zero readable characters, scoring the resume 0%. Kagazo compiles true vector text with selectable glyphs."
  },
  {
    "badge": "Error: Keyword Stuffing in White Ink",
    "title": "Hidden Text Tricks Triggering Fraud Filters",
    "desc": "Hiding tiny white-colored keywords to trick filters triggers modern ATS blacklists and manual disqualification. Incorporate relevant skills naturally into project bullet points."
  }
];

const FAQS = [
  {
    "question": "What is an ATS and how does this resume builder optimize for it?",
    "answer": "An Applicant Tracking System (ATS) is software used by employers to scan, rank, and filter job applications. Kagazo optimizes your resume with linear single-column layout, standard section titles, machine-readable vector fonts, and optimal keyword density."
  },
  {
    "question": "Is this resume builder truly 100% free with no watermark or credit card?",
    "answer": "Yes. Kagazo generates clean, watermark-free, vector A4 PDFs without requiring registration, subscription payments, or hidden download fees."
  },
  {
    "question": "How does the live ATS Readiness Score (0\u2013100) work?",
    "answer": "Our client-side analyzer audits your resume against 12 industry benchmarks: presence of active verbs, quantifiable metrics (%, $), standard contact format, absence of multi-column tables, skill count, and single-page length balance."
  },
  {
    "question": "Should fresh college graduates use a 1-page or 2-page resume?",
    "answer": "Candidates with under 5 years of professional experience should strictly use a 1-page resume. Recruiters spend an average of 6 to 8 seconds scanning resumes, and concise 1-pagers maximize impact."
  },
  {
    "question": "Is my personal career history and contact info stored on your servers?",
    "answer": "No. All resume compiling and scoring occurs locally in your web browser RAM. Your phone number, work history, projects, and personal data are never transmitted to any database or third-party server."
  },
  {
    "question": "Can I save my resume data and edit it later?",
    "answer": "Yes. You can export your resume as a lightweight JSON configuration file to your local computer, and re-import it anytime to update experience, add new skills, or tailor it for specific job openings."
  },
  {
    "question": "Is PDF or Word format better for submitting to job applications?",
    "answer": "Searchable vector PDF is the industry standard because it preserves exact typography, spacing, and layout across all operating systems while remaining fully readable by modern ATS parsers."
  },
  {
    "question": "How should I format bullet points under work experience?",
    "answer": "Use the Google XYZ formula: \"Accomplished [X], as measured by [Y], by doing [Z]\". Begin every bullet with a powerful past-tense action verb (Engineered, Spearheaded, Reduced) and include concrete percentages or numbers."
  },
  {
    "question": "Can this tool generate Sarkari PSU and government job biodata?",
    "answer": "Yes. Select our Sarkari PSU / Tabular Biodata preset to format personal details, educational qualifications, caste categories, and experience into official Indian public sector tabular formats."
  },
  {
    "question": "How do I ensure my resume prints perfectly on paper for interviews?",
    "answer": "In your PDF viewer, print using Paper Size: A4, Scaling: 100% (Actual Size), and print on 90\u2013100 GSM bright white bond paper for crisp typography and clean physical presentation."
  }
];

export default function FreeAtsResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free ATS Resume Builder Online',
        url: 'https://kagazo.in/tools/free-ats-resume-builder',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Build ATS-compliant software engineer resumes, fresher 1-page CVs, Sarkari PSU tabular biodata, and marriage biodata online. Real-time ATS readiness scoring (0-100), modern tech stack chips, clean A4 PDF export. 100% private in-RAM, zero watermark.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Build an ATS-Compliant Resume in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Free ATS Resume Builder Online.',
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
            name: 'Free ATS Resume Builder Online',
            item: 'https://kagazo.in/tools/free-ats-resume-builder',
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
          <span className="text-primary font-bold">Free ATS Resume Builder Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>0-100 ATS Score Checker • Zero Watermark A4 PDF</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free ATS Resume Builder Online & </span>
            <span className="text-primary">Sovereign Bio-Data Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Build ATS-compliant software engineer resumes, fresher 1-page CVs, Sarkari PSU tabular biodata, and marriage biodata online. Real-time ATS readiness scoring (0-100), modern tech stack chips, clean A4 PDF export. 100% private in-RAM, zero watermark.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <ResumeBuilderEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Real-Time ATS Checker
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Interactive 0-100 algorithmic score checking keyword density, action verbs, contact placement, and readability.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Zero Watermark Export
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download high-definition, machine-readable A4 vector PDFs with crisp typography and zero promotional watermarks.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-RAM Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your career history, contact details, salary expectations, and projects are compiled strictly in browser memory.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    ATS Machine-Readability & Parsing Standards (Workday, Taleo, Greenhouse)
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Parsing Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Resume Architecture Rule</th><th className="py-2.5 px-3 font-bold">ATS Machine Requirement</th><th className="py-2.5 px-3 font-bold">Common Candidate Violation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Column Layout</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strict single-column chronological structure</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Multi-column tables that scramble parse order</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Contact Information</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard body placement (Phone, Email, LinkedIn, City)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Placing contact info inside header/footer (ignored by ATS)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Section Headings</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard terms: Experience, Education, Skills, Projects</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Creative headers like "Where Ive Been" or "My Journey"</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">File Format & Fonts</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Searchable vector PDF or DOCX; standard fonts (Inter, Arial)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Flattened Canva raster images without selectable text</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Experience Metrics</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Action verb + Task + Quantifiable Business Result (%)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Passive job duty lists lacking measurable outcomes</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Length Constraint</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly 1 single A4 page for candidates with under 5 years experience</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2-page sprawl with excess white space and redundant info</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Build an ATS-Compliant Resume in 5 Steps
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
                  Common ATS Rejection Traps & Technical Solutions
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
                ATS Architecture
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Linear Flow</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Single-column structure for 100% parse accuracy.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">0-100 Score</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Real-time algorithm checks keywords and metrics.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Zero Watermark</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Professional vector A4 PDF export without branding.
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
                  href="/tools/marriage-biodata-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Marriage Bio-Data Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Biodata
                  </span>
                </Link>
                <Link
                  href="/tools/salary-slip-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Bilingual Salary Slip Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Income
                  </span>
                </Link>
                <Link
                  href="/tools/affidavit-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Bilingual Affidavit Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Legal
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
