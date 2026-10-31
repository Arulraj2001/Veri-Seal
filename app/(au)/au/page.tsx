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
  title: 'Official Australian Statutory Calculators 2026/27 | ATO PAYG, Super Guarantee, Fair Work & Stamp Duty',
  description:
    'Comprehensive Australian statutory suite for 2026/27: Revised Stage 3 PAYG salary take-home, Superannuation Guarantee (12%), Fair Work NES redundancy, state stamp duty, HECS/HELP repayments, and ABN/TFN validators.',
  alternates: {
    canonical: `${SITE_URL}/au`,
  },
};

export default function AustraliaHubPage() {
  const categories = [
    {
      id: 'ato-tax-super',
      title: '1. ATO Tax & Superannuation (ATO & Super Guarantee)',
      description: 'Calculations strictly modelled on the revised Stage 3 tax cuts, Superannuation Guarantee Act 1992, GST Act 1999, and ITAA 1997 provisions.',
      icon: Calculator,
      tools: [
        {
          title: 'PAYG Withholding & Salary Take-Home 2026/27',
          desc: 'Revised Stage 3 tax cuts (16%, 30%, 37%, 45%), Medicare Levy (2.0%), MLS, HELP/HECS repayments, and compulsory Super Guarantee contributions.',
          href: '/au/payg-withholding-salary-calculator',
          badge: 'Revised Stage 3',
        },
        {
          title: 'Superannuation Guarantee (11.5% - 12%)',
          desc: 'Superannuation Guarantee (Administration) Act 1992: legislated 12.0% SG rate, Ordinary Time Earnings (OTE), maximum super contribution base ($65,070/qtr), and concessional cap ($30,000).',
          href: '/au/superannuation-guarantee-calculator',
          badge: '12% Legislated',
        },
        {
          title: 'Australian GST 10% & BAS Tool',
          desc: 'A New Tax System (Goods and Services Tax) Act 1999: 10% standard GST, GST-free medical/fresh food exemptions, and net Business Activity Statement (BAS) refund/payable calculation.',
          href: '/au/goods-and-services-tax-gst-calculator',
          badge: 'GST Act 1999',
        },
        {
          title: 'Capital Gains Tax (50% CGT Discount)',
          desc: 'ITAA 1997 Subdivision 115-A: statutory 50% capital gains tax discount for Australian individual residents holding assets > 12 months and Main Residence exemption test.',
          href: '/au/capital-gains-tax-cgt-discount-calculator',
          badge: '50% Discount',
        },
        {
          title: 'HECS / HELP Compulsory Repayment Calculator',
          desc: 'Higher Education Support Act 2003: statutory repayment income (RI) brackets ($54,435+), tiered rates (1.0% to 10.0%), and annual CPI indexation adjustment.',
          href: '/au/hecs-help-repayment-calculator',
          badge: 'HESA 2003',
        },
      ],
    },
    {
      id: 'fair-work-employment',
      title: '2. Employment & Fair Work Compliance',
      description: 'Statutory Fair Work Act 2009 entitlements: National Employment Standards (NES) redundancy scales, award leave loading, high income threshold, and sham contracting tests.',
      icon: Briefcase,
      tools: [
        {
          title: 'Statutory Redundancy Pay (s.119 NES)',
          desc: 'Fair Work Act 2009 s.119 NES redundancy entitlement schedule (4 to 16 weeks base), small business employer exemption (< 15 staff), and s.83-170 tax-free redundancy base.',
          href: '/au/redundancy-pay-fair-work-calculator',
          badge: 's.119 NES',
        },
        {
          title: 'Annual Leave Loading (17.5% Modern Awards)',
          desc: 'Fair Work NES 4 weeks statutory paid leave combined with 17.5% annual leave loading under Australian modern awards and enterprise agreements.',
          href: '/au/annual-leave-loading-calculator',
          badge: '17.5% Award',
        },
        {
          title: 'Unfair Dismissal High Income Threshold (s.382)',
          desc: 'Fair Work Act 2009 s.382 High Income Threshold ($175,000+ benchmark), strict 21-day Fair Work Commission lodgment deadline, and 6-month minimum qualifying period.',
          href: '/au/unfair-dismissal-high-income-threshold-checker',
          badge: 's.382 FWA',
        },
        {
          title: 'FBT Car Fringe Benefit (Statutory Formula)',
          desc: 'Fringe Benefits Tax Assessment Act 1986: statutory formula method (20% base value fraction minus days unavailable) vs operating cost logbook method at the 47% FBT rate.',
          href: '/au/fbt-car-fringe-benefit-calculator',
          badge: 'FBTAA 1986',
        },
        {
          title: 'Contractor vs Employee Sham Contracting Checker',
          desc: 'Fair Work Act 2009 Part 3-1 Division 6 (Sham contracting arrangements) and High Court common law multifactorial test (delegation, control, risk, and equipment).',
          href: '/au/contractor-vs-employee-sham-contracting-checker',
          badge: 'Fair Work Test',
        },
      ],
    },
    {
      id: 'property-state-revenue',
      title: '3. Property & State Revenue',
      description: 'State transfer duty (stamp duty), land tax brackets, negative gearing mortgage tax deductions, and First Home Super Saver scheme computations.',
      icon: Home,
      tools: [
        {
          title: 'State Stamp Duty Transfer Calculator',
          desc: 'State-by-state property transfer duty across NSW, VIC, QLD, WA, SA, TAS, ACT, and NT, including First Home Buyer (FHB) concessions and foreign buyer surcharges.',
          href: '/au/stamp-duty-conveyancing-calculator',
          badge: 'NSW / VIC / QLD',
        },
        {
          title: 'State Land Tax & Surcharge Calculator',
          desc: 'State revenue land tax thresholds, unimproved land values, Principal Place of Residence (PPR) full exemption, and foreign owner / discretionary trust surcharges.',
          href: '/au/land-tax-state-revenue-calculator',
          badge: 'State Revenue',
        },
        {
          title: 'Rental Yield & Negative Gearing Shield (s.8-1)',
          desc: 'Gross vs net rental yield and negative gearing mortgage interest tax shield under s.8-1 ITAA 1997 against marginal individual tax brackets.',
          href: '/au/rental-yield-negative-gearing-calculator',
          badge: 's.8-1 ITAA',
        },
        {
          title: 'Division 43 Capital Works Depreciation (2.5%)',
          desc: 'ITAA 1997 Division 43 statutory 2.5% p.a. 40-year capital works building write-off schedule and Division 40 plant & equipment asset depreciation.',
          href: '/au/capital-works-div-43-depreciation-calculator',
          badge: 'Div 43 ITAA',
        },
        {
          title: 'First Home Super Saver Scheme (FHSS)',
          desc: 'FHSS rules: $15,000 per financial year up to $50,000 total voluntary super contributions, associated earnings calculation, and 15% super tax savings vs PAYG.',
          href: '/au/first-home-super-saver-fhss-calculator',
          badge: 'FHSS $50k',
        },
      ],
    },
    {
      id: 'identity-legal-tools',
      title: '4. Identity, Verification & Legal Tools',
      description: 'Official Australian algorithmic validators (ABN Modulus 89, TFN Modulus 11), Australian passport biometric photo tool, and legal document utilities.',
      icon: FileText,
      tools: [
        {
          title: 'Australian Passport Photo Biometric Tool (35×45mm)',
          desc: 'Australian Passport Office (APO) and ICAO Doc 9303 biometric specifications: 35×45 mm, 32–36 mm crown-to-chin ratio, plain cream/light grey background, and 4×6 inch 300 DPI sheet.',
          href: '/au/australian-passport-photo-checker-generator',
          badge: 'APO 35×45',
        },
        {
          title: 'ABN Lookup Modulus 89 Validator',
          desc: 'Australian Business Register (ABR) 11-digit Modulus 89 check algorithm (subtract 1 from first digit, weights [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]) and 9-digit ACN extraction.',
          href: '/au/abn-lookup-modulus-89-validator',
          badge: 'Modulus 89',
        },
        {
          title: 'Tax File Number (TFN) Modulus 11 Validator',
          desc: 'ATO 9-digit and 8-digit Tax File Number Modulus 11 check algorithm with statutory weighting coefficients [1, 4, 3, 7, 5, 8, 6, 9, 10] for payroll compliance.',
          href: '/au/tfn-tax-file-number-validator',
          badge: 'ATO Mod 11',
        },
        {
          title: 'ASIC & ATO PDF Filing Compressor (< 10 MB)',
          desc: 'In-browser client-side PDF document compressor tailored for ASIC annual company statements (< 10 MB limit) and ATO portal uploads with zero data leakage.',
          href: '/au/pdf-compressor-asic-ato',
          badge: '&lt; 10 MB',
        },
        {
          title: 'AUD Legal Number to Words Currency Converter',
          desc: 'Formal Australian legal and banking currency wording: "(X Australian Dollars and Y Cents AUD)" compliant with the Bills of Exchange Act 1909 for loan deeds and cheques.',
          href: '/au/number-to-words-aud-cents-converter',
          badge: 'Legal AUD',
        },
      ],
    },
  ];

  // Schema.org ItemList for Rich Search Engine Snippets
  const hubJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Official Australian Statutory Calculators & Compliance Tools 2026/27 - Kagazo',
    description: 'Statutory suite with 20 sovereign calculators and legal verifiers calibrated to ATO, Fair Work Ombudsman, and state revenue frameworks.',
    numberOfItems: 20,
    itemListElement: categories.flatMap((cat, catIdx) =>
      cat.tools.map((tool, toolIdx) => ({
        '@type': 'ListItem',
        position: catIdx * 5 + toolIdx + 1,
        name: tool.title,
        url: `${SITE_URL}${tool.href}`,
        description: tool.desc,
      }))
    ),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold tracking-wide">
          <span>🇦🇺</span>
          <span>Australian Sovereign Suite 2026/27</span>
          <span className="text-amber-700">&bull;</span>
          <span className="font-mono">20 Statutory Tools</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Official Australian Statutory Calculators &amp; Compliance Tools 2026/27
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
          High-precision statutory micro-tools calibrated to the ATO revised Stage 3 tax cuts, Superannuation Guarantee Act 1992, Fair Work Act 2009 National Employment Standards (NES), state transfer duty acts, and official ABN/TFN check algorithms. 100% in-browser client execution: zero financial figures or personal identifiers leave your device.
        </p>

        {/* Quick Nav Anchors */}
        <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-amber-800 hover:border-amber-600 transition-colors shadow-2xs"
            >
              {cat.title.split('.')[1].trim()}
            </a>
          ))}
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="space-y-12">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <section
              key={category.id}
              id={category.id}
              className="space-y-6 pt-6 border-t border-slate-200/80 first:border-0 first:pt-0"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 shadow-2xs">
                    <Icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{category.description}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start md:self-auto">
                  5 Statutory Tools
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/80 hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                          {tool.badge}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-amber-800">
                      <span>Open Calculator &rarr;</span>
                      <span className="text-[10px] font-mono text-slate-400">Client-Side</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Trust & Statutory Privacy Guarantee Card */}
      <div className="p-8 rounded-3xl bg-slate-950 text-white space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-tight">
              100% Statutory Privacy Guarantee for Australian Citizens &amp; Businesses
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every tool in the Kagazo Australia Suite executes entirely within your browser's V8 JavaScript engine. Your salary figures, ABNs, Tax File Numbers (TFN), property purchase contracts, and sensitive financial data are never transmitted across the network, stored in databases, or logged in server telemetry.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Revised Stage 3 PAYG tax cuts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">12% Superannuation Guarantee rate</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Fair Work Act 2009 NES compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

