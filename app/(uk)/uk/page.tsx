import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  Home,
  FileText,
  Percent,
  Coins,
  Scale,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Landmark,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Official UK Statutory Calculators & Compliance Tools 2026/27 | HMRC, SDLT & Property',
  description:
    'Free UK statutory calculation suite: 2026/27 Take-Home Pay PAYE, Stamp Duty (SDLT), Section 24 Landlord Relief, Statutory Redundancy Pay, UK VAT, and HM Passport Photo Maker.',
  alternates: {
    canonical: `${SITE_URL}/uk`,
  },
};

export default function UkHubPage() {
  const categories = [
    {
      id: 'hmrc-payroll',
      title: '1. HMRC, Tax & Payroll',
      description: 'Calculations aligned with HMRC 2026/27 tax rates, Class 1 NICs, auto-enrolment workplace pensions, and statutory rights.',
      icon: Briefcase,
      tools: [
        {
          title: 'Take-Home Pay Salary Calculator 2026/27',
          desc: 'PAYE income tax bands, 8% employee NICs, student loan plans (1, 2, 4 Scottish, 5 & Postgraduate), and workplace pension contributions.',
          href: '/uk/take-home-pay-salary-calculator',
          badge: 'Top 300k+',
        },
        {
          title: 'Stamp Duty Land Tax (SDLT) Calculator',
          desc: 'Finance Act 2003 statutory bands for England & Northern Ireland: First-Time Buyer Relief, additional residential property (+3% surcharge), and non-UK resident surcharge.',
          href: '/uk/stamp-duty-sdlt-calculator',
          badge: 'SDLT',
        },
        {
          title: 'Statutory Redundancy Pay Calculator',
          desc: 'Employment Rights Act 1996 formula: 0.5 week (< 22 yrs), 1 week (22–40 yrs), 1.5 weeks (41+ yrs) capped at the statutory weekly maximum rate.',
          href: '/uk/redundancy-pay-statutory-calculator',
          badge: 'ERA 1996',
        },
        {
          title: 'UK VAT & Domestic Reverse Charge Calculator',
          desc: 'Standard 20%, reduced 5%, zero 0%, plus Construction Industry Scheme (CIS) domestic reverse charge and Flat Rate Scheme (FRS).',
          href: '/uk/vat-calculator-uk-reverse-charge',
          badge: 'HMRC VAT',
        },
        {
          title: 'Statutory Maternity Pay (SMP) Estimator',
          desc: 'Calculates the 6-week 90% average weekly earnings (AWE) band, the following 33-week statutory weekly rate, and employer recovery thresholds.',
          href: '/uk/statutory-maternity-pay-smp-calculator',
          badge: 'SMP 2026',
        },
      ],
    },
    {
      id: 'corporate-self-assessment',
      title: '2. Corporate & Self-Assessment',
      description: 'Self-employed tax planning, Corporation Tax marginal relief, dividend allowances, and Construction Industry Scheme compliance.',
      icon: Building2,
      tools: [
        {
          title: 'Self-Assessment Payment on Account (s.59A)',
          desc: 'Taxes Management Act 1970 s.59A balancing payment for 31 January plus first and second 50% advance payments for July 31.',
          href: '/uk/self-assessment-payment-on-account-calculator',
          badge: 'HMRC s.59A',
        },
        {
          title: 'Dividend Tax & Allowance Calculator',
          desc: 'Tax liability across basic (8.75%), higher (33.75%), and additional (39.35%) bands above the statutory £500 annual dividend allowance.',
          href: '/uk/dividend-tax-calculator',
          badge: 'Dividends',
        },
        {
          title: 'Corporation Tax & Marginal Relief (19%–25%)',
          desc: 'Small profits rate (19% up to £50,000), main rate (25% over £250,000), and statutory marginal relief fraction for profits in between.',
          href: '/uk/corporation-tax-marginal-relief-calculator',
          badge: 'Finance Act',
        },
        {
          title: 'Capital Gains Tax (Property & Shares)',
          desc: 'Annual exempt amount (£3,000), 18%/24% residential property rates, 10%/20% other chargeable assets, and the 60-day UK property reporting rule.',
          href: '/uk/capital-gains-tax-residential-shares-calculator',
          badge: 'CGT 60-Day',
        },
        {
          title: 'CIS Tax Deduction Calculator (20% / 30%)',
          desc: 'HMRC Construction Industry Scheme verification rates: gross payment (0%), verified subcontractor (20%), and unverified subcontractor (30%).',
          href: '/uk/cis-deduction-calculator',
          badge: 'CIS Scheme',
        },
      ],
    },
    {
      id: 'property-landlord',
      title: '3. Property & Landlord Compliance',
      description: 'Section 24 mortgage interest restrictions, leasehold extensions, PRA mortgage stress testing, and inheritance tax planning.',
      icon: Home,
      tools: [
        {
          title: 'Section 24 Landlord Mortgage Relief Calculator',
          desc: 'Simulate the impact of Finance (No. 2) Act 2015 s.24: replacement of mortgage interest deduction with a 20% basic rate tax credit.',
          href: '/uk/section-24-landlord-mortgage-relief-calculator',
          badge: 'Section 24',
        },
        {
          title: 'UK Rental Yield & Net Cap Rate Estimator',
          desc: 'Gross rental yield and true net yield deducting letting agent commission, service charges, ground rent, EPC, and gas safety certificates.',
          href: '/uk/rental-yield-cap-rate-calculator-uk',
          badge: 'Cap Rate',
        },
        {
          title: 'Mortgage Affordability PRA Stress Test',
          desc: 'Prudential Regulation Authority affordability checks: +3% interest buffer stress testing and the 4.5x household income ceiling.',
          href: '/uk/mortgage-affordability-stress-test-calculator',
          badge: 'PRA Rules',
        },
        {
          title: 'Leasehold Extension & Marriage Value Calculator',
          desc: 'Statutory leasehold valuation under the 1993 Act and 2022 Reform Act: diminution in freeholder interest and 50% marriage value below 80 years.',
          href: '/uk/ground-rent-leasehold-extension-calculator',
          badge: 'Marriage Value',
        },
        {
          title: 'Inheritance Tax (NRB & RNRB) Estimator',
          desc: 'Nil-Rate Band (£325,000), Residence Nil-Rate Band (£175,000), transferable spousal allowances, and 40% standard IHT rate over £2M taper.',
          href: '/uk/inheritance-tax-nrb-rnrb-calculator',
          badge: 'IHT 40%',
        },
      ],
    },
    {
      id: 'compliance-verification',
      title: '4. Compliance & Verification',
      description: 'Biometric passport photo compliance, Modulo 11 bank account validation, HMRC VAT checks, and Companies House document filing.',
      icon: FileText,
      tools: [
        {
          title: 'HM Passport Photo Biometric Tool (35×45mm)',
          desc: 'Official HM Passport Office & ICAO Doc 9303 specs (35×45mm @ 300 DPI, 413×531 px) with printable 6-photo sheet on 4×6 inch paper.',
          href: '/uk/uk-passport-photo-checker-generator',
          badge: '35×45mm',
        },
        {
          title: 'Sort Code & Account Modulus 11 Checker',
          desc: 'Validates UK 6-digit sort codes and 8-digit bank account numbers against the official Vocalink / Bacs modulus checking specification.',
          href: '/uk/hmrc-modulus-11-sort-code-account-validator',
          badge: 'Vocalink',
        },
        {
          title: 'UK VAT Number Modulo 97 Validator',
          desc: 'HMRC and VIES check digit algorithm for 9-digit GB VAT registration numbers using standard and alternative Modulus 97 tests.',
          href: '/uk/vat-number-validator-uk-gb',
          badge: 'Modulo 97',
        },
        {
          title: 'Companies House PDF Filing Compressor',
          desc: 'Compress and optimize accounts and confirmation statements under the strict 4.0 MB limit for Companies House and HMRC portal upload.',
          href: '/uk/pdf-compressor-companies-house',
          badge: '< 4MB',
        },
        {
          title: 'Right to Work Share Code Checker',
          desc: 'Verify Home Office 90-day Right to Work share codes, eVisa status, and British passport statutory defence compliance under civil penalty guidelines.',
          href: '/uk/right-to-work-share-code-expiry-calculator',
          badge: 'Home Office',
        },
      ],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Schema.org ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Official UK Statutory Calculators & Compliance Tools 2026/27',
            description:
              'Complete suite of 20 statutory micro-tools for the United Kingdom: PAYE take-home pay, Stamp Duty Land Tax, Section 24, redundancy pay, and HM Passport photo creator.',
            url: `${SITE_URL}/uk`,
            itemListElement: categories.flatMap((cat, catIdx) =>
              cat.tools.map((t, toolIdx) => ({
                '@type': 'ListItem',
                position: catIdx * 5 + toolIdx + 1,
                name: t.title,
                url: `${SITE_URL}${t.href}`,
              }))
            ),
          }),
        }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900 text-white text-xs font-bold tracking-wide shadow-xs">
          <span>🇬🇧</span>
          <span>United Kingdom Statutory Suite 2026/27</span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-indigo-300 font-mono">20 Tools</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight">
          UK Statutory Calculators &amp; HMRC Compliance Portal
        </h1>

        <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          High-precision statutory micro-tools calibrated strictly to UK acts: 2026/27 PAYE Income Tax bands, Stamp Duty (SDLT), Section 24 Landlord Relief, and ERA 1996 Redundancy Pay. 100% in-browser client execution with zero data storage.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Client-Side Privacy (Zero Server Logs)
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <Scale className="w-4 h-4 text-indigo-900" />
            HMRC &amp; Finance Act 2026/27 Aligned
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            AdSense Eligible &amp; Verified Accuracy
          </span>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="space-y-12">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <section key={category.id} id={category.id} className="space-y-6">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-900 text-white shadow-xs">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  5 Tools
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col justify-between transition-all duration-200 hover:border-indigo-900/50"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200">
                          {tool.badge}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-900 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-900 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-900">
                      <span>Launch Calculator</span>
                      <span className="text-[11px] text-slate-400 font-normal">Instant 2026</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Statutory E-E-A-T Guarantee Card */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            UK Statutory Transparency &amp; Data Privacy Guarantee
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          All financial calculations, salary models, Stamp Duty assessments, and PDF document compression execute entirely inside your local browser instance via client-side JavaScript. No payroll figures, property valuations, national insurance numbers, or identification records are ever transmitted to or logged on external servers.
        </p>
      </div>
    </div>
  );
}

