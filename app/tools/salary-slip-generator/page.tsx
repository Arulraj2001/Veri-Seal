import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Printer,
  CheckCircle2,
  Languages,
  DollarSign,
  Building2,
} from 'lucide-react';
import SalarySlipGeneratorEngine from '@/components/tools/SalarySlipGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Bilingual Salary Slip Generator (English & தமிழ்) | Free Payslip Maker',
  description:
    'Free online salary slip & payslip maker in English and Tamil. Standard format with EPF, ESI, Professional Tax, and TDS calculations. 100% compliant for personal loan, car loan, home loan, and international visa applications.',
  alternates: {
    canonical: 'https://veriseal.in/tools/salary-slip-generator',
  },
  openGraph: {
    title: 'Free Bilingual Salary Slip Generator | VeriSeal',
    description:
      'Generate corporate & MSME salary slips in English & Tamil with automatic tax calculations and print-ready PDF export.',
    url: 'https://veriseal.in/tools/salary-slip-generator',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const STATUTORY_RULES = [
  { component: 'Basic Pay', rule: 'Normally 40% to 50% of Total CTC', type: 'Mandatory Earnings' },
  { component: 'House Rent Allowance (HRA)', rule: '40% (Non-Metro) or 50% (Metro) of Basic', type: 'Tax Exempt Component' },
  { component: 'Employees Provident Fund (EPF)', rule: '12% of Basic + DA (Capped at ₹1,800/mo)', type: 'Statutory Deduction' },
  { component: 'ESIC Health Insurance', rule: '0.75% of Gross Pay (Applicable if Gross ≤ ₹21,000)', type: 'Statutory Health' },
  { component: 'Professional Tax (PT)', rule: 'State Slab (e.g. ₹208/mo in TN & Maharashtra)', type: 'State Deduction' },
];

const FAQS = [
  {
    question: 'Can I use this generated salary slip for bank loans and credit cards?',
    answer:
      'Yes. Indian banks (SBI, HDFC, ICICI, Axis) require official monthly salary slips displaying the employer name, employee designation, UAN/PF number, PAN, and complete itemized earnings/deductions. VeriSeal generates a formal corporate A4 layout recognized by bank underwriting systems.',
  },
  {
    question: 'Is this payslip valid for Schengen, US, and UK visa applications?',
    answer:
      'Yes. Embassies and visa processing centers (VFS Global, BLS) ask for the last 3 to 6 months payslips. Simply enter your company and compensation details, ensure the numbers match your bank statement credits, and download the print-ready vector PDF.',
  },
  {
    question: 'How does the bilingual English and Tamil toggle work?',
    answer:
      'VeriSeal is the first platform in India to offer official Tamil (`மாதாந்திர சம்பள ரசீது`) alongside standard English terminology. Small business owners, shops, and institutions in Tamil Nadu can generate legal salary documentation for local employees in seconds.',
  },
  {
    question: 'Are my salary numbers or bank account digits saved on your servers?',
    answer:
      'Never. All calculations, numbers-to-words conversions, and PDF formatting execute strictly inside your local browser’s volatile RAM. Zero financial or payroll data is ever logged or uploaded.',
  },
];

export default function SalarySlipGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'VeriSeal Bilingual Salary Slip & Payslip Generator',
        url: 'https://veriseal.in/tools/salary-slip-generator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Create professional monthly salary slips with statutory EPF, ESIC, and PT calculations in English and Tamil.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a Salary Slip Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Employer & Employee Details',
            text: 'Provide company name, employee designation, department, and bank details.',
          },
          {
            '@type': 'HowToStep',
            name: 'Input Earnings & Deductions',
            text: 'Enter Basic Pay, HRA, EPF, and Tax Deductions to compute Net Pay.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Language & Export',
            text: 'Choose English or Tamil and click 1-Click Print A4 PDF.',
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
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
            { label: 'Salary Slip Generator' },
          ]}
          showHomeIcon
        />

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <Languages className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Bilingual Corporate &amp; MSME Format (English + தமிழ்)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Bilingual Salary Slip / Pay Slip Generator
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Generate professional, bank-compliant monthly salary slips in English and Tamil. Automatically calculates Gross Pay, EPF, ESIC, Professional Tax, TDS, and Net Pay in numbers and Indian currency words. Perfect for loan, visa, and rental verification.
              </p>
            </div>

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-3 p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-xs text-indigo-950 dark:text-indigo-200 font-medium">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>
                <strong>Confidential In-Memory Payroll:</strong> Your compensation numbers, bank account digits, and employer details are calculated strictly in client RAM. Zero payroll data is recorded on servers.
              </span>
            </div>

            {/* Core Interactive Tool Engine */}
            <SalarySlipGeneratorEngine />

            {/* Statutory Compensation Rules */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-bold text-foreground">
                    Indian Statutory Compensation Reference
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
                  Labor Law Compliance
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <th className="py-2.5 px-3 font-bold">Salary Component</th>
                      <th className="py-2.5 px-3 font-bold">Statutory Rule / Formula</th>
                      <th className="py-2.5 px-3 font-bold">Classification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    {STATUTORY_RULES.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{rule.component}</span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                          {rule.rule}
                        </td>
                        <td className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400 font-semibold">
                          {rule.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-darker/60 dark:border-slate-800 pb-4">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                  >
                    <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                      <span className="text-indigo-600 font-extrabold">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (32%) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Visa & Loan Proof Card */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>Bank Loan &amp; Visa Submission</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Bank Credit Reconciliation</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Ensure Net Pay matches the salary credit entry reflected in your bank statement.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-white">Digital Stamp / Seal</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Affix your business stamp or authorized signatory signature in the designated footer box.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Related Business Tools</span>
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/gst-number-verifier"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    GST Number Verifier
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/affidavit-generator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    Bilingual Affidavit Generator
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    Digital Self-Attest PDF
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Ad Space (Ostrune Exclusive) */}
            <AdSlot slot="sidebar" />
          </div>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/salary-slip-generator" />
      </div>
    </div>
  );
}
