import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DepreciationResaleEngine } from '@/components/vehicle-os/engines/DepreciationResaleEngine';
import {
  ShieldCheck,
  TrendingDown,
  Car,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BarChart3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Depreciation & Resale Value Calculator India | Used Car Valuation | Kagazo',
  description:
    'Forecast your car’s current fair market resale value and 2-year forward residual trajectory in India. Accounts for brand retention curves, owner serial count, odometer, and vehicle condition.',
  keywords: [
    'car depreciation calculator india',
    'used car resale value predictor india',
    'how fast do cars depreciate in india',
    'maruti vs hyundai vs tata resale value',
    'car value after 5 years calculator',
    'second hand car valuation estimator',
    'spinny cars24 price benchmark calculator',
    'diesel car depreciation 10 year rule delhi',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/depreciation-resale',
  },
  openGraph: {
    title: 'Car Depreciation & Resale Value Predictor | Kagazo Vehicle OS',
    description:
      'Check fair market used car valuation bands and 2-year forward resale outlook across Indian car models.',
    url: 'https://Kagazo.in/vehicle-os/depreciation-resale',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Used Car Depreciation Calculator India | Kagazo',
    description:
      'Estimate fair market value bands for your car today and see the projected 2-year value drop.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://Kagazo.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Vehicle OS',
      item: 'https://Kagazo.in/vehicle-os',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Depreciation & Resale Predictor',
      item: 'https://Kagazo.in/vehicle-os/depreciation-resale',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Car Depreciation & Resale Predictor',
  url: 'https://Kagazo.in/vehicle-os/depreciation-resale',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Predictive residual value modeling engine estimating present and 24-month forward vehicle market pricing across Indian makes and conditions.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does car depreciation typically progress in India year by year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The standard Indian car depreciation curve follows: Year 1: 15% to 20% (the immediate showroom drive-off drop); Year 2: +10% (cumulative ~28%); Year 3: +10% (cumulative ~38%); Year 4: +8% (cumulative ~46%); Year 5: +7% (cumulative ~53%). After Year 5, depreciation slows to 4%–5% annually until reaching a mechanical salvage baseline.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which car brands hold their resale value best in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toyota (Innova Crysta, Fortuner) and Maruti Suzuki (Swift, Brezza, Ertiga) retain the highest residual values in India, often retaining 60% to 68% of their on-road price after 4 years. Hyundai and Honda hold moderate retention (~50%–55%), while luxury European marques (BMW, Mercedes-Benz, Audi) depreciate the steepest, retaining under 38% after 5 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does multiple previous ownership penalize used car value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the Indian used-car market, each additional transfer on the Registration Certificate (RC) reduces market valuation by approximately 7% to 10%. A 2nd-owner car sells for ~8% less than an identical 1st-owner vehicle, while a 3rd-owner car suffers an additional 12% haircut due to buyer reluctance and financing loan restrictions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What impact does the Delhi-NCR 10-year diesel rule have on resale value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Due to National Green Tribunal (NGT) regulations mandating mandatory deregistration of diesel cars older than 10 years in Delhi-NCR, diesel vehicles experience steep depreciation cliffs around Year 7 and 8. Owners must obtain an RTO No-Objection Certificate (NOC) and sell the car to tier-2/tier-3 non-NCR states to avoid total scrap valuation.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'How does car depreciation typically progress in India year by year?',
    a: 'The standard Indian car depreciation curve follows: Year 1: 15% to 20% (the immediate showroom drive-off drop); Year 2: +10% (cumulative ~28%); Year 3: +10% (cumulative ~38%); Year 4: +8% (cumulative ~46%); Year 5: +7% (cumulative ~53%). After Year 5, depreciation slows to 4%–5% annually until reaching a mechanical salvage baseline.',
  },
  {
    q: 'Which car brands hold their resale value best in India?',
    a: 'Toyota (Innova Crysta, Fortuner) and Maruti Suzuki (Swift, Brezza, Ertiga) retain the highest residual values in India, often retaining 60% to 68% of their on-road price after 4 years. Hyundai and Honda hold moderate retention (~50%–55%), while luxury European marques (BMW, Mercedes-Benz, Audi) depreciate the steepest, retaining under 38% after 5 years.',
  },
  {
    q: 'How much does multiple previous ownership penalize used car value?',
    a: 'In the Indian used-car market, each additional transfer on the Registration Certificate (RC) reduces market valuation by approximately 7% to 10%. A 2nd-owner car sells for ~8% less than an identical 1st-owner vehicle, while a 3rd-owner car suffers an additional 12% haircut due to buyer reluctance and financing loan restrictions.',
  },
  {
    q: 'What impact does the Delhi-NCR 10-year diesel rule have on resale value?',
    a: 'Due to National Green Tribunal (NGT) regulations mandating mandatory deregistration of diesel cars older than 10 years in Delhi-NCR, diesel vehicles experience steep depreciation cliffs around Year 7 and 8. Owners must obtain an RTO No-Objection Certificate (NOC) and sell the car to tier-2/tier-3 non-NCR states to avoid total scrap valuation.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Repair or Replace Decision Engine',
    description: 'Determine if high repair estimates exceed 50% of your vehicle market valuation.',
    href: '/vehicle-os/repair-or-replace',
    badge: 'Repair vs Sell',
  },
  {
    title: 'Cost Reality Checker (TCO)',
    description: 'Factor accurate 5-year resale recovery into your comprehensive Total Cost of Ownership.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Analyzer',
  },
  {
    title: 'Vehicle Affordability Checker',
    description: 'Calculate your safe car purchase budget based on net monthly salary and the 20/4/10 rule.',
    href: '/vehicle-os/affordability-checker',
    badge: 'Affordability',
  },
];

export default function DepreciationResalePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Vehicle OS', href: '/vehicle-os' },
            { label: 'Depreciation & Resale Forecaster' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              Resale Intelligence
            </span>
            <span className="text-xs font-semibold text-slate-500">Residual Value Curve Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Depreciation &amp; Resale Predictor — Current &amp; 2-Year Outlook
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Forecast your vehicle's current market value band and projected 2-year residual trajectory based on Indian used-car market trends, owner count, odometer, and brand retention curves.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <DepreciationResaleEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <BarChart3 className="w-4 h-4" />
              <span>Residual Engineering Dynamics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Key Value Preservation Drivers in the Indian Used Car Market
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Resale value is the single largest component of true automotive ownership costs. Here are the 3 critical variables that determine whether your vehicle commands top rupee:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Authorized Service History</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A digital stamped dealer service record (with invoice receipts) increases resale prices by ₹35,000 to ₹75,000 compared to identical vehicles serviced at unverified local garages.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. OEM Paint &amp; Panel Integrity</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Used-car buyers and platforms carry ultrasonic paint thickness gauges. Repainted metal body panels instantly deduct 3%–5% per panel from overall inspection score.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Clean No-Claim Bonus (NCB)</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A high NCB certificate (45%–50%) confirms an accident-free driving record, providing verifiable third-party proof that gives buyers confidence to pay top market tier.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Used Car Depreciation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools Internal Linking */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Explore Related Ownership &amp; Resale Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {tool.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tool.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
