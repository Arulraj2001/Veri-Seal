import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Building2,
  CheckCircle2,
  FileCheck,
  CreditCard,
  AlertTriangle,
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { EpfoResizerEngine } from '@/components/tools/EpfoResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'EPFO Cancelled Cheque & Bank Passbook Resizer Under 500 KB Free | Kagazo',
  description:
    'Resize and compress bank passbook front page or cancelled cheque photo strictly under 500 KB for EPFO UAN Member e-Sewa (Form 19, Form 31, Form 10C) PF withdrawal claims. Automatic text clarity filter keeps IFSC and account numbers razor sharp.',
  keywords: [
    'epfo cancelled cheque resize 500kb',
    'epfo passbook photo resize online free',
    'epfo bank proof upload size limit',
    'compress cancelled cheque under 500kb',
    'epfo member portal image size',
    'pf withdrawal bank proof resize',
    'epfo uan portal cheque upload',
    'form 19 cancelled cheque size',
    'epfo bank account verification image',
    'compress passbook image free india',
    'epfo claim rejection image not clear fix',
    'epfo bank document 500kb free online',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/epfo-passbook-photo-resizer',
  },
  openGraph: {
    title: 'EPFO Cancelled Cheque & Passbook Resizer (<500 KB) Free | Kagazo',
    description:
      'Zero PF claim rejections: Compress cancelled cheque or bank passbook under 500 KB with text clarity filter. IFSC, account number, and branch name stay legible. No uploads.',
    url: 'https://kagazo.in/tools/epfo-passbook-photo-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPFO Passbook & Cancelled Cheque Resizer Under 500 KB | Kagazo',
    description:
      'Compress bank passbook or cancelled cheque photo strictly under 500 KB for EPFO Form 19/31/10C PF withdrawal. Keeps IFSC text crisp. 100% free, no uploads.',
  },
};

const FAQS = [
  {
    question: 'What is the exact file size limit for EPFO Member Portal bank proof uploads?',
    answer:
      'The EPFO Unified Member Portal (member.epfindia.gov.in) for PF withdrawal claims via Form 19 (final PF settlement), Form 31 (partial withdrawal), and Form 10C (pension withdrawal) strictly mandates that the uploaded bank document — either a cancelled cheque leaf or the first page of a bank passbook — must be in JPEG/JPG format and must not exceed 500 KB. Files larger than 500 KB trigger an immediate upload error. Most phone camera photos of cheques are 2–8 MB and must be compressed before upload.',
  },
  {
    question: 'Why does the EPFO portal reject cancelled cheques with "Image Not Clear / Name Not Legible"?',
    answer:
      'Over 35% of EPFO online claim rejections occur because smartphone photos of cheques are compressed too aggressively by generic tools, blurring the pre-printed account holder name, account number, or bank IFSC code to illegibility. EPFO field officers manually verify that these details match the member\'s UAN profile. Kagazo applies an adaptive text-contrast sharpening filter that preserves printed bank text while compressing the file safely below 500 KB.',
  },
  {
    question: 'Does the cancelled cheque need to have my name pre-printed?',
    answer:
      'Yes, as per current EPFO guidelines. A cancelled cheque MUST have the member\'s name, bank account number, and IFSC code pre-printed on the cheque leaf by the bank. Self-written name or ink-stamped names are generally not accepted for online claim processing. If your cheque book does not have your name pre-printed (common with older accounts), submit the first page of your bank passbook with bank stamp and officer signature instead.',
  },
  {
    question: 'Can I upload a bank passbook front page instead of a cancelled cheque for EPFO?',
    answer:
      'Yes. The EPFO portal accepts either a cancelled cheque leaf OR the first page of your bank passbook. The passbook page must clearly show: (1) the member\'s full name as registered with EPFO, (2) the complete bank account number, (3) the 11-character IFSC code, and (4) the branch address with an official bank stamp or officer\'s signature. The Kagazo EPFO tool works identically for both document types.',
  },
  {
    question: 'My EPFO claim was approved but the bank transfer failed. What went wrong with the cheque?',
    answer:
      'Approved claims can fail at bank transfer if the IFSC code in the uploaded cheque photo was blurry and misread by the EPFO data-entry officer, resulting in an incorrect IFSC code entered in the system. Always double-check that the 11-character IFSC code is clearly legible in your uploaded image before submitting. Kagazo\'s text clarity booster specifically addresses this.',
  },
  {
    question: 'What should I do if my bank account is linked to a different branch than my passbook?',
    answer:
      'Upload the passbook front page of the active bank account where you want the PF funds credited — the one whose account number is registered in your UAN profile. If you recently changed your bank account, update it in your UAN profile first (under "Manage > KYC > Bank") and wait for employer approval before filing the claim.',
  },
  {
    question: 'Why does the EPFO portal say "Invalid file format" even though my file is JPEG?',
    answer:
      'Some Android camera apps and iPhone share sheets export HEIC files with a .jpg extension, causing MIME type mismatch errors. Additionally, screenshots saved from WhatsApp or email are sometimes WebP format with a .jpeg extension. Kagazo auto-detects the true file format regardless of extension and converts everything to genuine JPEG before compression.',
  },
  {
    question: 'What resolution should I photograph my cancelled cheque at?',
    answer:
      'For the best results, photograph your cancelled cheque or passbook with: (1) a steady hand or flat surface (no camera shake), (2) bright natural daylight or a desk lamp directly above the document (no harsh shadows), (3) the camera held directly above (no angle distortion), and (4) the full cheque leaf or passbook page visible in the frame. Camera resolution of 8 MP or higher gives the best text sharpness before compression. The file will likely be 3–8 MB and Kagazo will compress it to under 500 KB.',
  },
  {
    question: 'Can I use a net banking screenshot as bank proof for EPFO?',
    answer:
      'Generally, no. EPFO requires physical banking proof — either a cancelled cheque leaf or passbook front page — because these bear official bank account details and are harder to fabricate. A net banking screenshot with account details is typically rejected by EPFO field officers during verification.',
  },
  {
    question: 'Are my private banking documents uploaded to your servers?',
    answer:
      'Never. Your financial documents never leave your browser. All contrast enhancements, JPEG compression, and file size optimization execute 100% locally in your device\'s volatile RAM using HTML5 Canvas and WebAssembly. Zero bytes are stored on any Kagazo server. When you close the tab, all document memory is immediately purged.',
  },
];

export default function EpfoPassbookResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'EPFO Passbook & Cancelled Cheque Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/epfo-passbook-photo-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Resize bank passbook and cancelled cheque photos strictly under 500 KB with adaptive text sharpening for EPFO Member e-Sewa PF withdrawal claims (Form 19, 31, 10C).',
        featureList: [
          'Compress to strictly under 500 KB for EPFO Member Portal',
          'Adaptive text-contrast filter preserves IFSC code legibility',
          'Supports both cancelled cheque and passbook front page',
          '100% client-side processing — zero server uploads',
          'Auto-detects and converts HEIC/WebP to genuine JPEG',
          'Final size targeted 380–480 KB for safe margin',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Cancelled Cheque or Bank Passbook for EPFO PF Claim Under 500 KB',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Photograph Your Document',
            text: 'Place the cancelled cheque or passbook on a flat surface. Photograph it in bright daylight from directly above with a steady hand. Ensure the account number and IFSC code are fully visible.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload to Kagazo EPFO Resizer',
            text: 'Click "Upload" and select the photographed cheque or passbook image. Any size is accepted — the tool handles files from 100 KB to 20 MB.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enable the Bank Text Clarity Filter',
            text: 'Verify in the preview that the account holder name, account number, IFSC code, and branch address are dark and crisp. Enable the clarity booster if text appears gray or blurry.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified Document (<500 KB)',
            text: 'Click Download to get the optimized JPEG file, guaranteed to be under 500 KB and pass EPFO Member e-Sewa automated and manual verification.',
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kagazo.in/tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'EPFO Passbook & Cancelled Cheque Resizer',
            item: 'https://kagazo.in/tools/epfo-passbook-photo-resizer',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
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
          <span className="text-primary font-bold">EPFO Passbook &amp; Cheque Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>EPFO Unified Member Portal &bull; Form 19, Form 31 &amp; Form 10C Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>EPFO Cancelled Cheque &amp; Bank Passbook </span>
            <span className="text-primary">Resizer Under 500 KB</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress bank passbook front pages and cancelled cheque photos to strictly{' '}
            <strong>under 500 KB</strong> for EPFO UAN Member e-Sewa PF withdrawal claims. Adaptive text-clarity filter ensures your{' '}
            <strong>IFSC code, account number, and name remain razor sharp</strong> — preventing the #1 cause of EPFO claim rejections.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ Strictly Under 500 KB',
              '✓ IFSC Text Clarity Booster',
              '✓ Form 19 / 31 / 10C Ready',
              '✓ Cheque + Passbook Support',
              '✓ Zero Server Upload',
            ].map((tag) => (
              <span
                key={tag}
                className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <EpfoResizerEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* EPFO Portal Specifications */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  EPFO Member Portal — Bank Proof Upload Specifications
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified requirements for PF withdrawal bank account verification on{' '}
                  <strong>member.epfindia.gov.in</strong> (Unified Member Portal 2.0).
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Requirement</th>
                      <th className="p-3.5 text-primary">Cancelled Cheque Leaf</th>
                      <th className="p-3.5 text-primary">Bank Passbook Front Page</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">Maximum File Size</td>
                      <td className="p-3.5 font-bold text-primary">Strictly ≤ 500 KB</td>
                      <td className="p-3.5 font-bold text-primary">Strictly ≤ 500 KB</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Allowed Format</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Name Requirement</td>
                      <td className="p-3.5 font-bold text-red-700">Name pre-printed by bank (mandatory)</td>
                      <td className="p-3.5">Name printed + bank stamp acceptable</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Account Number</td>
                      <td className="p-3.5">Fully visible, unobscured</td>
                      <td className="p-3.5">Fully visible, unobscured</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">IFSC Code</td>
                      <td className="p-3.5">11-character code must be legible</td>
                      <td className="p-3.5">11-character code must be legible</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Branch Address</td>
                      <td className="p-3.5">Visible on cheque leaf</td>
                      <td className="p-3.5">Visible with bank attestation preferred</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Applicable Forms</td>
                      <td className="p-3.5">Form 19, Form 31, Form 10C</td>
                      <td className="p-3.5">Form 19, Form 31, Form 10C</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-start gap-2 text-xs text-text-main/60 bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-700">Critical:</strong> If your cheque does not have your name pre-printed by the bank (e.g., old account or new cheque book), use your bank passbook front page instead. Kagazo handles both identically.
                </span>
              </div>
            </section>

            {/* Rejection Prevention Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Top 4 Reasons EPFO Rejects Bank Cheque / Passbook Uploads — and Fixes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow these guidelines to ensure your online PF withdrawal claim is settled without delay.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    error: '"Image Not Clear / Name Not Legible"',
                    fix: 'Aggressive JPEG compression blurs pre-printed bank text. Kagazo\'s adaptive text-contrast filter preserves dark ink on light paper, keeping name and IFSC crisp.',
                  },
                  {
                    error: '"Cheque name does not match UAN member name"',
                    fix: 'If your bank account is in a different name (maiden name, initials), update your name in UAN profile to match the bank records before filing the claim. This is a portal-data mismatch, not an image quality issue.',
                  },
                  {
                    error: '"File size exceeds limit" (>500 KB)',
                    fix: 'Phone camera photos are 2–8 MB. Upload to Kagazo — it uses iterative JPEG quality search to land at 380–480 KB, safely under the 500 KB limit with headroom.',
                  },
                  {
                    error: '"Invalid file format" despite using JPEG',
                    fix: 'iPhone and some Android apps save HEIC or WebP with a .jpg extension. Kagazo detects the true format by reading the file magic bytes and converts to genuine JPEG automatically.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-surface-darker bg-surface/40 p-4 space-y-1">
                    <p className="text-xs font-bold text-red-700 dark:text-red-400">
                      ✗ Rejection: {item.error}
                    </p>
                    <p className="text-xs sm:text-sm text-text-main/80">
                      <span className="text-emerald-700 font-bold">✓ Fix: </span>
                      {item.fix}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* How-to Steps Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-primary" />
                  How to Compress Your Cheque / Passbook for EPFO in 4 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  The complete process takes under 60 seconds — no software installation or account required.
                </p>
              </div>

              <ol className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Photograph your document in bright light',
                    desc: 'Place the cancelled cheque or passbook on a flat white surface. Hold your phone directly above — no tilt, no angle distortion. Use bright natural daylight or a direct desk lamp to eliminate shadows. Ensure the entire document is visible within the frame.',
                  },
                  {
                    step: '2',
                    title: 'Upload to Kagazo EPFO Resizer',
                    desc: 'Click "Upload" and select your document photo. Any file size is accepted — 3 MB, 8 MB, or larger. The tool\'s file size limit is only on the output, not the input.',
                  },
                  {
                    step: '3',
                    title: 'Check the text clarity in the preview',
                    desc: 'Verify in the preview that your account holder name, account number, IFSC code, and branch are clearly visible. Enable the Bank Text Clarity Booster if any text appears gray or blurry — especially the 11-character IFSC code.',
                  },
                  {
                    step: '4',
                    title: 'Download and upload to EPFO portal',
                    desc: 'Click Download — get a JPEG file strictly under 500 KB (typically 380–480 KB), ready for immediate upload to the EPFO Unified Member Portal (member.epfindia.gov.in) for Form 19, 31, or 10C claims.',
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-text-main text-sm">{item.title}</p>
                      <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Use Cases Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Who Uses the EPFO Bank Proof Resizer?
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'PF Final Settlement (Form 19)',
                    desc: 'Employees who have left a job and want to withdraw their full Provident Fund balance after 2+ months of unemployment.',
                  },
                  {
                    title: 'PF Partial Withdrawal (Form 31)',
                    desc: 'Members withdrawing partial PF amounts for medical emergencies, home loan repayment, or education expenses.',
                  },
                  {
                    title: 'EPS Pension Withdrawal (Form 10C)',
                    desc: 'Short-service employees (less than 10 years) withdrawing their Employee Pension Scheme corpus before retirement.',
                  },
                  {
                    title: 'Bank Account Change KYC',
                    desc: 'Members who have changed their bank account and need to upload new bank proof to update their UAN KYC records.',
                  },
                  {
                    title: 'HR & Payroll Teams',
                    desc: 'Company HR departments assisting departing employees with their PF withdrawal documentation in bulk.',
                  },
                  {
                    title: 'CSC & Labour Welfare Centres',
                    desc: 'Common Service Centres and government labour welfare offices processing EPFO claims for unorganized sector workers.',
                  },
                ].map((uc) => (
                  <div key={uc.title} className="flex gap-3 p-3 rounded-2xl bg-surface border border-surface-darker/60">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-text-main">{uc.title}</p>
                      <p className="text-xs text-text-main/70 leading-relaxed mt-0.5">{uc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions — EPFO Cheque &amp; Passbook Upload
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about uploading bank proof for EPFO PF withdrawal claims.
                </p>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl bg-surface/50 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 font-bold text-text-main text-xs sm:text-sm cursor-pointer list-none select-none">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/40 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Privacy & Security Section */}
            <section className="bg-gradient-to-br from-emerald-50/60 to-slate-50 dark:from-slate-900 dark:to-slate-900 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/40 shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Privacy Architecture — Your Financial Documents Never Leave Your Device
              </h2>
              <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                All image processing — including adaptive text-contrast filtering, JPEG quality optimization, and file size reduction — executes{' '}
                <strong>100% inside your browser&apos;s volatile RAM</strong> using HTML5 Canvas and WebAssembly. Your bank documents, cancelled cheques, and passbook photos are never transmitted to any Kagazo server, stored in any database, or logged in any form. The moment you close the browser tab, all image data is immediately purged from memory.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-emerald-700">
                {[
                  '✓ Zero Server Upload',
                  '✓ No Account Required',
                  '✓ No Watermark',
                  '✓ No File Storage',
                  '✓ Bank Clarity Locked',
                  '✓ Works on Mobile',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/sarathi-driving-licence-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Sarathi DL Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    MoRTH
                  </span>
                </Link>

                <Link
                  href="/tools/pan-card-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PAN Card Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    213×213
                  </span>
                </Link>

                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar + PAN KYC
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    KYC PDF
                  </span>
                </Link>

                <Link
                  href="/tools/compress-pdf-to-500kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to 500KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    500 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-exact-kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Exact KB Tool
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    KB Limit
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Your bank details and cheques are processed strictly in your device volatile memory. No documents are uploaded to any server.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Bank Clarity Locked
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ &lt; 500 KB Verified
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
