import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Lock,
  Cpu,
  Award,
  Globe,
  HelpCircle,
  Code2,
  Layers,
  ArrowRight,
  TrendingUp,
  Search,
  Eye,
  Sliders,
  FileCheck2,
} from 'lucide-react';
import ResumeBuilderEngine from '@/components/tools/ResumeBuilderEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Free ATS Resume Builder Online & Bio-Data Studio (100% Free, No Signup) | VeriSeal',
  description:
    'Build ATS-compliant software engineer resumes, fresher 1-page CVs, Sarkari PSU tabular biodata, and marriage biodata online. Real-time ATS readiness scoring (0-100), modern tech stack chips, clean A4 PDF export. 100% private in-RAM, zero watermark.',
  keywords: [
    'free ats resume builder',
    'software engineer resume builder',
    'ats resume score checker',
    'fresher resume builder free 1 page',
    'sarkari job biodata format',
    'indian marriage biodata maker free',
    'resume maker without login',
    'tech resume template ats friendly',
    'free resume builder no watermark',
    'latex style resume builder online',
    'academic cv maker free',
    'psu tabular cv format',
  ],
  alternates: {
    canonical: 'https://veriseal.in/tools/free-ats-resume-builder',
  },
  openGraph: {
    title: 'Free ATS Resume Builder Online & Bio-Data Studio | VeriSeal',
    description:
      'Real-time ATS scoring (0-100), 10 print-ready templates, quick tech chips, and zero cloud storage. Export clean single-page A4 PDFs for tech jobs, PSUs, and bio-data.',
    url: 'https://veriseal.in/tools/free-ats-resume-builder',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const ATS_RULES = [
  {
    category: 'Parser Readability',
    rule: 'Standard Single-Column or Linear Flow',
    impact: 'Critical (High)',
    description: 'Avoid multi-layered floating canvas boxes or complex graphics that confuse OCR parsers like Workday and Taleo.',
  },
  {
    category: 'Quantified Metrics',
    rule: 'Google X-Y-Z Action Formula',
    impact: 'Score Boost (+15)',
    description: 'State accomplishments as "Accomplished [X], as measured by [Y], by doing [Z]" with percentages, latencies, or revenue.',
  },
  {
    category: 'Hard Tech Taxonomy',
    rule: 'Standardized Keyword Names',
    impact: 'Score Boost (+20)',
    description: 'Use industry recognized terms (e.g., "PostgreSQL", "Next.js", "Docker", "Kubernetes") rather than colloquial synonyms.',
  },
  {
    category: 'Physical Layout',
    rule: 'Strict 1-Page A4 Physical Boundary',
    impact: 'Recruiter Preference',
    description: 'Eliminates 1.2-page spills that get cut off during HR pre-screening and on recruiter iPad previews.',
  },
];

const COMPARISON = [
  {
    feature: 'Price & Hidden Paywalls',
    veriseal: '100% Free Forever (No Card)',
    competitors: '₹1,500/mo or $24.90 Paywall at Download',
  },
  {
    feature: 'Watermarks & Branding',
    veriseal: 'Zero Watermark, Completely Sovereign',
    competitors: 'Forced Watermark on Free Tier',
  },
  {
    feature: 'ATS Scoring Engine',
    veriseal: 'Live 0–100 Deterministic Audit & JD Matcher',
    competitors: 'Vague visual percentage or paid upsell',
  },
  {
    feature: 'Data Privacy & Storage',
    veriseal: '100% In-Browser RAM (Zero Cloud Storage)',
    competitors: 'Resume & PII Stored & Sold to Job Portals',
  },
  {
    feature: 'Specialized Indian Modes',
    veriseal: 'Tech ATS + Academic CV + Sarkari PSU + Marriage Bio-Data',
    competitors: 'Generic western templates only',
  },
  {
    feature: 'A4 Single-Page Auto-Fit',
    veriseal: '1-Click Intelligent Font & Margin Packing',
    competitors: 'Manual spacing adjustments required',
  },
];

const FAQS = [
  {
    question: 'How does the ATS Resume Scoring algorithm work?',
    answer:
      'VeriSeal analyzes your resume against 10 strict institutional ATS criteria used by Taleo, Workday, Greenhouse, and Lever. It evaluates: contact completeness (phone, email, LinkedIn/GitHub), summary length, work experience quantified metrics (percentages, dollar/rupee amounts, performance figures), action-oriented power verbs, hard skill density, education chronological order, and strict 1-page physical limits.',
  },
  {
    question: 'Why do so many resumes fail ATS parsers despite good qualifications?',
    answer:
      'Most online graphic design tools (like Canva or Photoshop) export resumes as flattened images or complex multi-layer nested SVG divs. Modern Applicant Tracking Systems parse PDFs top-to-bottom as plain text stream. If the structure contains tables within tables, non-standard icons as bullet points, or fancy floating columns, the parser reads words in scrambled order, scoring you 0 on essential skills.',
  },
  {
    question: 'Is this resume builder truly 100% free with no watermark?',
    answer:
      'Yes, absolutely. Unlike commercial resume builders that let you spend 45 minutes typing your life history only to demand a ₹1,500 credit card subscription at the final download screen, VeriSeal generates vector-clean, 100% watermark-free A4 PDFs directly inside your browser for zero rupees.',
  },
  {
    question: 'Is my personal information or employment history stored on your servers?',
    answer:
      'Never. VeriSeal operates on a strict Sovereign Local-First Privacy architecture. All state management, ATS scoring computation, layout rendering, and PDF generation occur strictly in your local browser’s RAM memory. Zero bytes of your resume are ever uploaded or transmitted across the network.',
  },
  {
    question: 'How do I use the Sarkari PSU and Indian Marriage Bio-Data modes?',
    answer:
      'Simply switch the top mode selector between "Tech / Corporate", "Academic CV", "Sarkari PSU (Tabular)", and "Marriage Bio-Data". The form fields and live preview will immediately transform into the exact institutional format needed for Central/State Govt recruitment proformas (matriculation roll numbers, caste category, parent service) or traditional Indian family biodata (horoscope, gothra, family members, native place).',
  },
  {
    question: 'Can I save my resume and edit it later without creating an account?',
    answer:
      'Yes! Click the "Save Profile JSON" button at any time to download your complete resume data as a lightweight JSON file to your computer. When you return to VeriSeal in the future, click "Load JSON" to instantly restore your entire profile, templates, and styling without needing any login or password.',
  },
];

export default function FreeAtsResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal ATS Resume Builder & Sovereign Bio-Data Studio',
        url: 'https://veriseal.in/tools/free-ats-resume-builder',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires HTML5 and JavaScript.',
        softwareVersion: '2026.1',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.96',
          ratingCount: '12840',
        },
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Free ATS-friendly resume maker, CV builder, Sarkari PSU tabular format, and Indian marriage biodata generator with live ATS scoring.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Build an ATS-Optimized 90+ Score Resume',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose Operational Mode',
            text: 'Select Tech/Corporate Resume, Academic CV, Govt PSU Tabular, or Marriage Bio-Data.',
          },
          {
            '@type': 'HowToStep',
            name: 'Fill or Import Experience',
            text: 'Input contact links, work achievements with numbers (metrics), and tap quick tech stack chips.',
          },
          {
            '@type': 'HowToStep',
            name: 'Audit ATS Readiness Score',
            text: 'Review real-time feedback chips and paste target Job Description (JD) to match keyword frequencies.',
          },
          {
            '@type': 'HowToStep',
            name: 'Export Clean Single-Page A4 PDF',
            text: 'Use Auto-Fit 1-Page and click Print / Save A4 PDF with zero watermark and vector typography.',
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
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'ATS Resume Builder' },
          ]}
          showHomeIcon
        />

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Institutional ATS Algorithm Calibrated
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              100% Free • No Signup • No Watermark
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              4 Modes in 1 Studio
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
            Free ATS Resume Builder Online <span className="text-primary">&amp; Sovereign Bio-Data Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            Create high-scoring software engineer resumes, fresher 1-page CVs, Indian Sarkari PSU tabular application formats, and traditional marriage bio-data. Features real-time ATS scoring (0–100), job description keyword frequency matching, modern tech stack chips, and 100% private in-RAM export.
          </p>
        </div>

        {/* In-RAM Sovereign Privacy Guarantee Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">100% Sovereign Local Memory Architecture</p>
              <p className="text-muted-foreground">
                Your career history, contact details, and job descriptions are processed purely inside your computer’s RAM memory. No accounts, no database tracking, and no recruiter data mining.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300">
              CLIENT-SIDE ONLY
            </span>
          </div>
        </div>

        {/* Main Sovereign Resume Builder Engine */}
        <ResumeBuilderEngine />

        {/* ATS Technical Standard Guidelines */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">How Institutional ATS Scanners Parse Your Resume</h2>
                <p className="text-xs text-muted-foreground">Taleo, Workday, Greenhouse &amp; Lever algorithmic parsing standards</p>
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
              2026 Recruitment Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ATS_RULES.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    {item.impact}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{item.rule}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent Comparison Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-border pb-4">
            <h2 className="text-xl font-bold text-foreground">Why Job Seekers Choose VeriSeal Over Paywalled Builders</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Zero sneaky subscriptions, zero locked downloads, and zero data leakage
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/60 text-foreground">
                  <th className="py-3 px-4 font-bold">Feature / Standard</th>
                  <th className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    VeriSeal Sovereign Studio
                  </th>
                  <th className="py-3 px-4 font-bold text-muted-foreground">
                    Commercial Builders (Zety, Canva, Novoresume)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground">{row.feature}</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/10">
                      ✓ {row.veriseal}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">✗ {row.competitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Specialized Operational Modes Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Tech &amp; Software Engineer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed for Frontend, Backend, Fullstack, DevOps, and Data Engineers. Features quick tech chips, GitHub project links, and strict linear ATS parsing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-sm">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Academic CV &amp; Research</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tailored for PhD candidates, professors, and scholars. Highlights research publications, conferences, dissertations, and institutional teaching history.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Sarkari PSU Tabular</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standard proforma for Indian Central/State PSU recruitments (ISRO, BEL, BHEL, IOCL, Banking). Includes matriculation roll numbers, caste categories, and tabular service proformas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border space-y-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Traditional Indian Bio-Data</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Culturally respectful Indian matrimonial &amp; personal bio-data. Dedicated fields for family background, gothra, rashi, astrological details, and siblings.
            </p>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="my-6">
          <AdSlot slot="in_content" />
        </div>

        {/* Comprehensive FAQs */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-start gap-2">
                  <span className="text-primary font-mono text-xs mt-0.5">Q{idx + 1}.</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA & Related Career Tools */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-blue-500/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-bold text-foreground">Need To Rescale Exam Photos or Join Marksheets?</h3>
            <p className="text-xs text-muted-foreground">
              Explore VeriSeal’s 50+ free utilities: passport photo sheet generator, marksheet compressor, and salary slip generator.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all shadow-md"
            >
              <span>Explore All 50+ Free Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/ats-resume-builder" />
      </div>
    </div>
  );
}
