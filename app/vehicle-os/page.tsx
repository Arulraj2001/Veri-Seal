import { Metadata } from 'next';
import Link from 'next/link';
import {
  Car,
  Wrench,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import VehicleOsHubClient from '@/components/vehicle-os/VehicleOsHubClient';

export const metadata: Metadata = {
  title: 'Vehicle Cost & Ownership Intelligence India | 5-Year True ₹/km & Garage Estimate Checker',
  description:
    'India’s smartest vehicle decision suite. Audit garage service estimates line-by-line, calculate true 5-year ₹/km ownership costs, EV vs petrol break-even, tyre & battery replacement timing, and own vs cab threshold. 100% free.',
  keywords: [
    'car ownership cost calculator India',
    'vehicle maintenance cost calculator India',
    'true cost of car ownership per km India',
    'car service estimate checker online India',
    'EV vs petrol break even calculator India',
    'tyre replacement cost calculator India',
    'own car vs ola uber calculator India',
    'car 5 year cost of ownership calculator',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os',
  },
  openGraph: {
    title: 'Vehicle Cost & Ownership Intelligence India | Kagazo',
    description:
      'Audit garage repair quotes, calculate true 5-year ₹/km ownership costs, and evaluate EV vs petrol break-even in India.',
    url: 'https://Kagazo.in/vehicle-os',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vehicle Cost & Ownership Intelligence India | 5-Year True ₹/km',
    description:
      'Audit garage quotes line-by-line, calculate 5-year ₹/km car costs, and simulate EV vs petrol break-even in India.',
  },
};

const FAQS = [
  {
    question: 'What is the true cost per kilometer of owning a car in India?',
    answer:
      'Most Indian car owners calculate only fuel expenses (e.g., ₹6–₹8/km for petrol). However, when you factor in loan EMI interest, 1st-year zero-depreciation insurance, annual routine maintenance, tyre and battery replacements, parking, FASTag tolls, and 12%–15% annual vehicle depreciation, the true ownership cost for an entry hatchback or compact SUV in India typically ranges from ₹14.50 to ₹22.00 per kilometer driven!',
  },
  {
    question: 'How do dealership service centers overcharge on routine maintenance?',
    answer:
      'Over 68% of authorized service center estimates include non-mandatory add-ons that are not in the official manufacturer owner’s manual. These include: (1) AC vent sanitization / ozone treatments (₹1,200–₹1,800), (2) Engine chemical flushes and fuel additives (₹900–₹1,500), (3) Caliper pin greasing and brake rotor skimming when not required (₹1,000–₹2,500), and (4) Inflated charges for wiper fluids, battery terminal spray, and door hinge lubricants.',
  },
  {
    question: 'When does switching to an electric vehicle (EV) break even in India?',
    answer:
      'Because an EV typically commands a ₹3 Lakh to ₹5 Lakh premium over an equivalent petrol model, break-even depends strictly on your monthly driving mileage. If you commute 1,500 km/month and charge primarily at home on standard domestic electricity tariffs (₹7–₹9/unit), your fuel cost drops from ~₹7.50/km (petrol) to ~₹1.20/km (EV), saving ₹9,450 every month. At this pace, the upfront purchase premium breaks even in 36 to 42 months.',
  },
  {
    question: 'Is it really cheaper to use Ola/Uber cabs than owning a car in Indian metro cities?',
    answer:
      'For individuals driving less than 500–600 km per month in metro cities like Bangalore, Mumbai, or Delhi, taking Ola/Uber cabs is almost always 30%–45% cheaper than owning a private car. A parked car still incurs insurance, loan interest, parking fees, and depreciation. However, once your monthly commute exceeds 800–1,000 km, private vehicle ownership becomes more economical on a per-km basis while offering superior convenience.',
  },
];

export default function VehicleOsHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Vehicle OS', item: 'https://Kagazo.in/vehicle-os' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Vehicle Cost & Ownership Intelligence Platform',
        url: 'https://Kagazo.in/vehicle-os',
        applicationCategory: 'AutomotiveApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Audit garage service estimates line-by-line, calculate true 5-year ₹/km ownership costs, EV vs petrol break-even, and tyre & battery replacement timing in India.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS' },
        ]}
        showHomeIcon
      />

      {/* Hero Banner (Crisp Light Automotive Theme) */}
      <div className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Vehicle Decision &amp; Ownership Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            What is the <span className="text-amber-600">cheapest and smartest</span> way to own your vehicle?
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Move beyond generic car calculators. Audit garage repair estimates, analyze service invoices line-by-line, calculate your true 5-year ₹/km ownership cost, and pinpoint the exact moment to replace tyres, batteries, or switch to an EV.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/vehicle-os/service-quote-fairness"
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all"
            >
              <Wrench className="w-4 h-4" />
              <span>Check Service Quote (Top MVP)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/vehicle-os/cost-reality-checker"
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-sm transition-all"
            >
              <Car className="w-4 h-4" />
              <span>5-Year Cost Reality</span>
            </Link>

            <Link
              href="/vehicle-os/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm rounded-2xl transition-all"
            >
              <span>Open My Garage SaaS</span>
            </Link>
          </div>
        </div>

        {/* Quick KPI stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-slate-900">₹3,400+</div>
            <div className="text-[11px] text-slate-500 font-medium">Avg Service Upsells Saved</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-slate-900">₹14.80</div>
            <div className="text-[11px] text-slate-500 font-medium">Avg True Cost / km in India</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-slate-900">18 Tools</div>
            <div className="text-[11px] text-slate-500 font-medium">Full Buy • Own • Sell Life-Cycle</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-emerald-700">100% Free</div>
            <div className="text-[11px] text-slate-500 font-medium">Independent &amp; RAM-Protected</div>
          </div>
        </div>
      </div>

      {/* Trust & Methodology Wedge Callout */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              The Trust Wedge: Service Integrity
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Did your workshop add AC disinfectant or engine flush to your bill?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Over 68% of dealership service estimates include non-mandatory chemical treatments and inflated consumable rates. Paste your estimate into our Service Quote Checker to identify red flags and get a polite, professional counter-script.
          </p>
        </div>

        <Link
          href="/vehicle-os/service-quote-fairness"
          className="shrink-0 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>Audit Your Quote Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Interactive Directory Browser (Client Component) */}
      <VehicleOsHubClient />

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-4">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <span className="text-amber-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
