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
import PstmCertificateEngine from '@/components/tools/PstmCertificateEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Official PSTM Certificate Generator Online (Tamil & English Formats) | Kagazo',
  description: 'Generate official Persons Studied in Tamil Medium (PSTM) certificate format for TNPSC Group 1, Group 2, Group 4, VAO, TRB, and TNUSRB recruitment. Madras High Court compliant bilingual format with school/college seal box. 100% private in-RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/pstm-certificate-generator',
  },
  openGraph: {
    title: 'Official PSTM Certificate Generator Online (Tamil & English Formats) | Kagazo',
    description: 'Generate official Persons Studied in Tamil Medium (PSTM) certificate format for TNPSC Group 1, Group 2, Group 4, VAO, TRB, and TNUSRB recruitment. Madras High Court compliant bilingual format with school/college seal box. 100% private in-RAM.',
    url: 'https://kagazo.in/tools/pstm-certificate-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Official PSTM Certificate Generator Online (Tamil & English Formats) | Kagazo',
    description: 'Generate official Persons Studied in Tamil Medium (PSTM) certificate format for TNPSC Group 1, Group 2, Group 4, VAO, TRB, and TNUSRB recruitment. Madras High Court compliant bilingual format with school/college seal box. 100% private in-RAM.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Education Level",
    "desc": "Choose School PSTM (Classes 1-10 or 1-12), College Degree PSTM (UG/PG), or Polytechnic Diploma."
  },
  {
    "step": 2,
    "title": "Enter Candidate Particulars",
    "desc": "Input your full legal name as per SSLC marksheet, parent name, and school/college registration roll number."
  },
  {
    "step": 3,
    "title": "Specify Study Period",
    "desc": "Fill in exact academic years studied (e.g., 2012-2013 to 2021-2022) and class standards completed."
  },
  {
    "step": 4,
    "title": "Add Institution Details",
    "desc": "Enter official school or college name, campus address, taluk, district, and issuing authority title."
  },
  {
    "step": 5,
    "title": "Export A4 Certificate PDF",
    "desc": "Download official bilingual A4 PDF ready for Headmaster/Principal institutional seal and signature."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Partial Tamil Education",
    "title": "Studying Degree in English After Tamil Schooling",
    "desc": "Under Madras High Court rulings, for degree-level exams (Group 1 & 2), the candidate must have studied all levels (Class 1 to Degree) in Tamil. Submitting an English medium degree forfeits the 20% quota."
  },
  {
    "badge": "Error: Missing School Seal or Date",
    "title": "Unstamped or Undated Certificate Uploaded",
    "desc": "TNPSC certificate verification scripts reject uploaded PSTM documents lacking the official round stamp of the institution or missing the Headmaster signature date."
  },
  {
    "badge": "Error: Academic Year Discrepancy",
    "title": "Years Not Matching Transfer Certificate (TC)",
    "desc": "Dates of study on the PSTM certificate must match your School Transfer Certificate exactly. Any overlapping or conflicting academic years trigger rejection."
  },
  {
    "badge": "Error: Blurry Upload Scan Below 100 DPI",
    "title": "Unreadable Attestation Details on OTR",
    "desc": "Scanning documents under dim mobile lighting blurs the Headmaster dispatch number. Use our Clean Document Scanner to produce crisp 200 DPI black-and-white PDFs."
  }
];

const FAQS = [
  {
    "question": "What is the 20% PSTM reservation quota in Tamil Nadu recruitment?",
    "answer": "Under the Tamil Nadu Appointment on Preferential Basis in the Services under the State of Persons Studied in Tamil Medium Act, 20% of all direct recruitment vacancies in state government posts are reserved for candidates who completed their qualifying education in Tamil medium."
  },
  {
    "question": "Can I claim PSTM if I studied in English medium college but Tamil medium school?",
    "answer": "For SSLC-level posts (like TNPSC Group 4 and VAO), Tamil medium schooling up to 10th standard is sufficient. However, for graduate-level posts (TNPSC Group 1, Group 2), you must have studied from 1st standard through your undergraduate degree entirely in Tamil medium."
  },
  {
    "question": "Who is authorized to sign and seal my PSTM certificate?",
    "answer": "For school education, the current Headmaster, Headmistress, or District Educational Officer (DEO) must sign. For collegiate education, the College Principal, University Dean, or Registrar must sign and affix the official seal."
  },
  {
    "question": "Do I need separate PSTM certificates if I studied in different schools?",
    "answer": "Yes. If you completed Classes 1 to 5 in one school and Classes 6 to 10 in another school, you must obtain separate PSTM certificates from each respective school Headmaster covering the exact academic years spent there."
  },
  {
    "question": "Is an online e-Sevai PSTM certificate mandatory, or is this physical format accepted?",
    "answer": "For candidates whose school records are digitized, e-Sevai PSTM is issued online. However, for older alumni, closed schools, or colleges where e-Sevai records are unavailable, this physical prescribed format signed by the Headmaster/Principal is fully accepted by TNPSC."
  },
  {
    "question": "What details must be present on a valid PSTM certificate?",
    "answer": "A valid PSTM certificate must clearly show: Candidate Name, Registration/Roll Number, Classes Studied, Academic Years, explicit declaration that medium of instruction and examination was Tamil, School Name, Headmaster Signature, Official Round Seal, and Issue Date."
  },
  {
    "question": "Can students who wrote exams in Tamil but studied in English medium claim PSTM?",
    "answer": "No. The law and Madras High Court rulings explicitly require that both the medium of instruction and the medium of examination must have been Tamil. Writing exams in Tamil while enrolled in an English medium classroom does not qualify."
  },
  {
    "question": "Does this generator format the certificate in both Tamil and English?",
    "answer": "Yes. Kagazo generates the official bilingual format containing standard statutory declarations in both Tamil (\u0ba4\u0bae\u0bbf\u0bb4\u0bcd) and English on a single clean A4 sheet."
  },
  {
    "question": "Is my personal academic data logged or stored on your servers?",
    "answer": "No. Kagazo operates exclusively inside client-side browser memory. Your academic years, registration numbers, and personal details are purged the moment you close the tab."
  },
  {
    "question": "How do I compress the signed PSTM certificate for TNPSC OTR upload?",
    "answer": "After obtaining your Headmaster signature and seal, scan the document and use our dedicated TNPSC PDF Compressor or Compress PDF to 200KB tool to lock file size safely between 100 KB and 200 KB for portal acceptance."
  }
];

export default function PstmCertificateGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Official PSTM Certificate Generator',
        url: 'https://kagazo.in/tools/pstm-certificate-generator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate official Persons Studied in Tamil Medium (PSTM) certificate format for TNPSC Group 1, Group 2, Group 4, VAO, TRB, and TNUSRB recruitment. Madras High Court compliant bilingual format with school/college seal box. 100% private in-RAM.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a PSTM Certificate in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Official PSTM Certificate Generator.',
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
            name: 'Official PSTM Certificate Generator',
            item: 'https://kagazo.in/tools/pstm-certificate-generator',
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
          <span className="text-primary font-bold">Official PSTM Certificate Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>20% Horizontal Quota • TNPSC Group 1, 2, 4 & Police</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Official PSTM Certificate Generator </span>
            <span className="text-primary">(Tamil & English Formats)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate official Persons Studied in Tamil Medium (PSTM) certificate format for TNPSC Group 1, Group 2, Group 4, VAO, TRB, and TNUSRB recruitment. Madras High Court compliant bilingual format with school/college seal box. 100% private in-RAM.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <PstmCertificateEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> 20% Quota Compliance
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Aligned with latest Tamil Nadu Government Gazette rules and Madras High Court PSTM guidelines.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Bilingual Templates
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generate clean statutory certificates in formal Tamil (தமிழ்) and English for school, diploma, and degree levels.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-RAM Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Candidate academic years, registration numbers, and school details are processed locally without cloud logging.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    TNPSC PSTM 20% Reservation Eligibility Rules (Gazette Guidelines)
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Statutory Quota
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Recruitment Exam Level</th><th className="py-2.5 px-3 font-bold">Mandatory Tamil Medium Requirement</th><th className="py-2.5 px-3 font-bold">Issuing Authority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SSLC Qualification (e.g., Group 4 / VAO)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Must have studied 1st to 10th Standard entirely in Tamil medium</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">School Headmaster / DEO</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">HSC Qualification (e.g., Police Constable / Lab Asst)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Must have studied 1st to 12th Standard entirely in Tamil medium</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">School Headmaster / Principal</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Degree Qualification (e.g., Group 1, Group 2/2A)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1st to 12th + 3/4-Year UG Degree studied entirely in Tamil medium</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">College Principal / University Registrar</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PG Qualification (e.g., Assistant Professor / TRB)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1st to 12th + UG Degree + PG Degree all in Tamil medium</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">University Registrar / HOD</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mandatory Certificate Elements</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Student Name, Roll No, Academic Years, Medium: Tamil, School Seal, Date</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Official institutional ink seal and signature</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Invalid Claims (Disallowed)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">English medium degree with Tamil SSLC, or distance education without Tamil exams</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rejected during OTR Certificate Verification</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate a PSTM Certificate in 5 Steps
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
                  Common PSTM Verification Errors & Rejection Modes
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
                PSTM Standards
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">20% Horizontal Quota</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Statutory Tamil medium reservation for TNPSC & TRB.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Full Continuity</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Tamil medium from Class 1 through qualifying degree.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Official Seal Box</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Dedicated space for Headmaster seal and date.
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
                  href="/tools/tnpsc-otr-compliance-kit"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      TNPSC OTR Compliance Kit
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    OTR
                  </span>
                </Link>
                <Link
                  href="/tools/tn-marksheet-compressor"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      TN Marksheet Compressor
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Prep
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
