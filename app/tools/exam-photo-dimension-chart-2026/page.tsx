import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  Camera,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { ExamDimensionChartEngine } from '@/components/tools/ExamDimensionChartEngine';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All India Exam Photo & Signature Dimension Chart 2026 | Printable Cyber Café Poster | Kagazo',
  description:
    'Official 2026 photo dimensions, signature sizes, DPI, and background specifications for UPSC, SSC, IBPS, SBI, RRB, and TNPSC. Free printable A4 wall cheat-sheet for cyber cafés, CSC kiosks, and students.',
  keywords: [
    'exam photo dimension chart 2026',
    'government exam signature size list',
    'upsc ssc ibps photo size list',
    'cyber cafe photo size chart',
    'csc kiosk exam specification poster',
    'tnpsc photo signature dimensions',
    'all india exam document size cheat sheet',
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/exam-photo-dimension-chart-2026`,
  },
  openGraph: {
    title: 'All India Government Exam Photo & Signature Dimension Chart 2026 | Kagazo',
    description:
      'Official 2026 specifications for UPSC, SSC, IBPS, TNPSC, and RRB. Instant 1-click A4 printable wall poster for cyber cafés and CSC centers.',
    url: `${SITE_URL}/tools/exam-photo-dimension-chart-2026`,
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
};

const CHART_FAQS = [
  {
    question: 'Why do different Indian government portals require different photo and signature dimensions?',
    answer:
      'Each recruitment commission uses proprietary Optical Mark Recognition (OMR) and e-Admit card generation software. UPSC and TNPSC enforce strict 3.5×4.5 cm aspect ratios with candidate name & date stamps to prevent impersonation, while SSC and IBPS use fixed 140×60 px signature containers to align with automated biometric verification engines.',
  },
  {
    question: 'How can cyber cafés and CSC kiosks print this chart on standard A4 or A3 paper?',
    answer:
      'Click the "Print Poster (A4 / A3)" button at the top of the chart. Our software applies dedicated print CSS that automatically hides navigation bars, sidebars, and ads, rendering a crisp, high-density vector table formatted specifically for 1-page wall display.',
  },
  {
    question: 'What is the most common reason photos get rejected across government exam portals?',
    answer:
      'The #1 cause of rejection is non-white backgrounds (e.g. blue or dark curtains), followed by missing name/date stamps on UPSC and TNPSC applications, blurred faces from excessive mobile WhatsApp compression, and signatures penned in all capital block letters.',
  },
  {
    question: 'Can candidates resize and generate these exact specifications directly from their smartphones?',
    answer:
      'Yes. Kagazo operates 100% in volatile device RAM (HTML5 Canvas & WebAssembly) without uploading images to any cloud server. Every exam in this table links directly to a calibrated one-click tool on Kagazo.',
  },
  {
    question: 'What is the new UPSC 10-day photo rule introduced in recent notifications?',
    answer:
      'UPSC mandates that the uploaded photograph must not be older than 10 days from the opening date of the online application process. The candidate face must occupy three-fourths of the photograph, and the candidate full name and date on which the photograph was taken must be clearly stamped at the bottom.',
  },
  {
    question: 'Why are signatures in capital letters rejected by SSC and IBPS?',
    answer:
      'According to standard banking and recruitment guidelines, signatures must be written in normal running handwriting. Writing the name in all capital block letters is considered a printed name rather than a legal signature, leading to automatic cancellation of the candidature during document verification.',
  },
];

export default function ExamPhotoDimensionChartPage() {
  const structuredData = buildToolStructuredData({
    name: 'All India Government Exam Photo & Signature Dimension Chart 2026',
    description:
      'Official 2026 photo dimensions, signature sizes, DPI, and background specifications for UPSC, SSC, IBPS, SBI, RRB, and TNPSC. Free printable A4 wall cheat-sheet for cyber cafés, CSC kiosks, and students.',
    url: `${SITE_URL}/tools/exam-photo-dimension-chart-2026`,
    applicationCategory: 'EducationalApplication',
    howToTitle: 'How to use and print the Exam Dimension Chart',
    howToDescription:
      'Filter specifications by exam category or print a high-resolution A4 poster for your cyber café wall.',
    howToSteps: [
      {
        step: 1,
        title: 'Filter by Exam Body',
        desc: 'Select UPSC, SSC, Banking, or State PSC to view specific official dimensional thresholds.',
      },
      {
        step: 2,
        title: 'Check Exact KB & Stamp Rules',
        desc: 'Review minimum and maximum file size, pixel bounds, and candidate name/date stamping mandates.',
      },
      {
        step: 3,
        title: 'Print or Export',
        desc: 'Click "Print Poster" for a clean A4 wall chart or "Copy TSV / Excel" to paste into spreadsheets.',
      },
    ],
    faqs: CHART_FAQS,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Tools', url: `${SITE_URL}/tools` },
      { name: 'Exam Dimension Chart 2026', url: `${SITE_URL}/tools/exam-photo-dimension-chart-2026` },
    ],
  });

  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <JsonLd data={structuredData} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Exam Dimension Chart 2026' },
          ]}
          suppressSchema
        />

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Printer className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cyber Café &amp; CSC Kiosk Wall Printable Poster</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight">
            All India Exam <span className="text-primary">Photo &amp; Signature Chart 2026</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
            Standardized dimension, pixel ratio, DPI, and file size specifications for UPSC OTR, SSC, IBPS, SBI, RRB, and TNPSC. Zero guesswork, zero rejection.
          </p>
        </div>

        {/* GEO Answer Capsule */}
        <AnswerCapsule
          title="Official 2026 Government Exam Specification Summary"
          badge="Portal Standard Guidelines"
          portal="UPSC, SSC, IBPS & State PSCs"
          officialSourceName="Gazette of India & Commission Portals"
          officialSourceUrl="https://upsconline.nic.in"
          answer="Indian government exams mandate strict specifications: UPSC & TNPSC require 3.5×4.5 cm (20–50 KB) with candidate name and fresh date stamped in the lower 20% white banner. SSC requires 20–50 KB photos and 10–20 KB signatures (4×2 cm). IBPS mandates 20–50 KB photos, 10–20 KB running-hand signatures, and 20–50 KB left thumb impressions. All photos strictly require plain white backgrounds."
        />

        {/* Interactive & Printable Engine */}
        <ExamDimensionChartEngine />

        {/* AdSlot */}
        <div className="no-print">
          <AdSlot slot="in_content" />
        </div>

        {/* Deep Statutory & Technical Guide (800+ Words) */}
        <article className="no-print bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-10 space-y-8 text-text-main/80 text-sm leading-relaxed">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-text-main mb-4 tracking-tight">
              Statutory Guidelines for All India Recruitment Images (2026 Cycle)
            </h2>
            <p>
              Applying for national and state public examinations in India requires absolute adherence to digital image standards. Modern recruitment portals utilized by the <strong>Union Public Service Commission (UPSC)</strong>, <strong>Staff Selection Commission (SSC)</strong>, <strong>National Testing Agency (NTA)</strong>, and the <strong>Institute of Banking Personnel Selection (IBPS)</strong> utilize automated computer vision algorithms that cross-check uploaded image files against strict aspect ratios, compression bounds, and resolution parameters before permitting fee submission.
            </p>
            <p className="mt-3">
              Failing to meet these criteria results in immediate application cancellation or disqualification at the biometric verification phase on examination day.
            </p>
          </div>

          <div className="border-t border-surface-darker/60 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              <span>1. UPSC One Time Registration (OTR) and Civil Services Standards</span>
            </h3>
            <p>
              Under recent gazette updates issued by the UPSC, the photograph uploaded during online registration must comply with the following mandatory parameters:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Recency Mandate:</strong> The photograph must not be older than 10 days from the commencement of the online application window for that specific examination.
              </li>
              <li>
                <strong>Face Coverage:</strong> The candidate facial structure (from crown of head to chin) must occupy at least <strong>3/4th (75%)</strong> of the total image area.
              </li>
              <li>
                <strong>Candidate Name &amp; Date Stamp:</strong> The lower 20% of the image must incorporate a clear white text banner displaying the candidate&apos;s full name as printed on their Matriculation certificate, followed by the exact date (DD/MM/YYYY) on which the photograph was captured.
              </li>
              <li>
                <strong>Appearance Consistency:</strong> If a male candidate sports a beard or spectacles in the uploaded photograph, he must maintain identical facial hair and eyeglasses during the Preliminary, Mains, and Personality Test (Interview) rounds.
              </li>
            </ul>
          </div>

          <div className="border-t border-surface-darker/60 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>2. Staff Selection Commission (SSC) Live Capture vs Upload Rules</span>
            </h3>
            <p>
              With the launch of the new SSC Application Portal (ssc.gov.in), the Staff Selection Commission introduced live webcam photo capture combined with an uploaded signature:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Live Photo Capture:</strong> Candidates must sit in an evenly illuminated room with a plain white or light-coloured wall behind them. Wearing caps, dark glasses, beanies, or masks is strictly prohibited.
              </li>
              <li>
                <strong>Signature Size &amp; Ink:</strong> The signature must measure <strong>4.0 cm width × 2.0 cm height</strong> with a file size strictly bounded between <strong>10 KB and 20 KB</strong>. The signature must be signed on clean white paper using a black ink ballpoint pen.
              </li>
              <li>
                <strong>No Block Capitals:</strong> Writing the candidate name in capital letters (e.g., "RAHUL SHARMA") will lead to instantaneous summary rejection under the Commission&apos;s instructions.
              </li>
            </ul>
          </div>

          <div className="border-t border-surface-darker/60 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>3. NTA NEET &amp; JEE Postcard Size Photo Mandate</span>
            </h3>
            <p>
              The National Testing Agency requires two distinct photographic uploads for medical (NEET-UG) and engineering (JEE Main) aspirants:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1">
                <span className="font-bold text-text-main block">Passport Size (10 KB to 200 KB)</span>
                <p className="text-text-main/70">
                  Standard 3.5×4.5 cm image showing 80% face coverage with both ears clearly visible against a bright white background. No shadow behind head.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1">
                <span className="font-bold text-text-main block">Postcard Size (4×6 Inches / 10 KB to 200 KB)</span>
                <p className="text-text-main/70">
                  A high-resolution 4×6 inch photograph required for admit card paste-down and attendance sheet biometric matching during exam hall entry.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-darker/60 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-text-main">
              4. Banking Exams (IBPS, SBI, RBI): Thumb Impressions &amp; Declarations
            </h3>
            <p>
              Banking recruitment processes include auxiliary biometrics that must follow exact dimensional parameters:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Left Thumb Impression (LTI):</strong> Must be taken on white paper using blue or black stamp ink pad. File size must be between <strong>20 KB and 50 KB</strong>, with dimensions of <strong>240×240 pixels (3×3 cm at 200 DPI)</strong>. If a candidate does not have a left thumb, the right thumb may be used with explicit notification.
              </li>
              <li>
                <strong>Handwritten Declaration:</strong> Must be written in the candidate&apos;s own handwriting in English only on unlined white paper. Dimensions must be <strong>800×400 pixels (10×5 cm at 200 DPI)</strong> with a file size between <strong>50 KB and 100 KB</strong>. Declarations written in block capital letters are rejected.
              </li>
            </ul>
          </div>

          <div className="border-t border-surface-darker/60 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-text-main">
              5. Why Digital DPI Resolution Matters Over Raw Pixel Count
            </h3>
            <p>
              Many applicants attempt to reduce file size by repeatedly compressing images over messaging apps like WhatsApp. While this lowers the file size under 50 KB, it degrades the internal dots-per-inch (DPI) to sub-72 levels, blurring iris features and fingerprint ridge lines.
            </p>
            <p className="text-xs sm:text-sm text-text-main/70">
              Kagazo&apos;s client-side canvas engines preserve crisp <strong>200 to 300 DPI vector density</strong> while mathematically adjusting JPEG quantization tables, ensuring your image satisfies both file-size ceilings (e.g. 20–50 KB) and biometric resolution scans.
            </p>
          </div>
        </article>

        {/* Editorial Section & FAQs */}
        <div className="no-print space-y-10 pt-4">
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Why Cyber Cafés Rely on Standardized Dimension Sheets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-text-main/75 leading-relaxed">
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                <h3 className="font-bold text-text-main">Avoid Server Rejections</h3>
                <p>
                  Government portals automatically reject images that violate dimension aspect ratios by even 2 pixels, causing applicants to miss tight application deadlines.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                <h3 className="font-bold text-text-main">Speed Up Kiosk Processing</h3>
                <p>
                  CSC kiosk operators handling 50+ applicants a day can reference this printable sheet instantly without repeatedly checking conflicting notification PDFs.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                <h3 className="font-bold text-text-main">100% In-Browser Privacy</h3>
                <p>
                  Unlike cloud compressors that store citizen Aadhaar, PAN, and candidate photos on unknown servers, Kagazo processes everything locally in RAM.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked Questions (Exam Dimension Standards)
              </h2>
            </div>
            <div className="divide-y divide-surface-darker">
              {CHART_FAQS.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-text-main">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Ad Slot */}
          <AdSlot slot="post_download" />
        </div>
      </div>
    </div>
  );
}
