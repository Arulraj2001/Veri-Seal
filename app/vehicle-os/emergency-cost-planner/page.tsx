import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EmergencyCostPlannerEngine } from '@/components/vehicle-os/engines/EmergencyCostPlannerEngine';
import {
  ShieldCheck,
  Coins,
  Wrench,
  TrendingDown,
  Sparkles,
  ArrowRight,
  HelpCircle,
  PiggyBank,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Maintenance Emergency Fund Calculator India | Sinking Fund Sizer | Kagazo',
  description:
    'Calculate the exact monthly sinking fund required to smoothly cover car insurance renewals, tyre sets, battery replacement, periodic service, and surprise breakdown repairs in India.',
  keywords: [
    'car emergency fund calculator india',
    'car maintenance sinking fund monthly amount',
    'how much to save per month for car maintenance',
    'car insurance and tyre replacement budget buffer',
    'unexpected car repair budget planner india',
    'suv monthly maintenance reserve fund',
    'car sinking fund calculation formula',
    'vehicle breakdown repair contingency fund',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/emergency-cost-planner',
  },
  openGraph: {
    title: 'Vehicle Emergency Cost Planner | Kagazo Vehicle OS',
    description:
      'Plan your monthly car maintenance sinking fund. Smooth out lump-sum insurance, tyre replacements, and unforeseen breakdowns.',
    url: 'https://Kagazo.in/vehicle-os/emergency-cost-planner',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Maintenance Sinking Fund Planner India | Kagazo',
    description:
      'Never get caught off guard by a ₹35,000 insurance and tyre bill. Build a monthly automotive buffer.',
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
      name: 'Emergency Repair Sinking Fund',
      item: 'https://Kagazo.in/vehicle-os/emergency-cost-planner',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Vehicle Emergency Sinking Fund Planner',
  url: 'https://Kagazo.in/vehicle-os/emergency-cost-planner',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Cash flow management tool calculating monthly automotive sinking fund reserves across hatchbacks, sedans, SUVs, and 2-wheelers.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a vehicle "sinking fund" and why is it essential?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A vehicle sinking fund is a dedicated savings pot built through automated monthly deposits (e.g. ₹3,500 to ₹5,500/mo) designed to absorb large, irregular car expenses—such as annual comprehensive insurance renewals (₹25,000), set of 4 new tyres (₹32,000), battery replacement (₹5,500), and major 40,000 km brake/fluid services—without raiding your emergency fund or swiping high-interest credit cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much should an SUV owner in India save each month for maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a compact or mid-size SUV (e.g. Brezza, Creta, Harrier) driven 12,000 km annually, an owner should set aside approximately ₹4,500 to ₹5,800 per month. This covers annual insurance (~₹30,000), periodic scheduled service (~₹12,000), annualized tyre replacement (~₹8,000/yr), battery amortization (~₹1,800/yr), and a ₹10,000 unscheduled repair contingency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where should I park my vehicle sinking fund money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Park your automotive sinking fund in an auto-sweep bank account, a high-yield liquid mutual fund, or a 7-day flexi-fixed deposit offering 6.5% to 7.2% interest. Keep it completely separate from your daily transaction account so you do not accidentally spend it on retail purchases.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does vehicle age impact the required emergency contingency reserve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'During years 1 to 3, factory warranties cover mechanical failures, keeping unscheduled breakdown costs near zero. After year 4 (when warranty expires), wear-and-tear components like suspension bushings, shock absorbers, water pumps, alternator brushes, and clutch assemblies begin requiring replacement. We recommend increasing your unscheduled repair buffer by ₹2,000 to ₹3,000 for each year beyond year 4.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What is a vehicle "sinking fund" and why is it essential?',
    a: 'A vehicle sinking fund is a dedicated savings pot built through automated monthly deposits (e.g. ₹3,500 to ₹5,500/mo) designed to absorb large, irregular car expenses—such as annual comprehensive insurance renewals (₹25,000), set of 4 new tyres (₹32,000), battery replacement (₹5,500), and major 40,000 km brake/fluid services—without raiding your emergency fund or swiping high-interest credit cards.',
  },
  {
    q: 'How much should an SUV owner in India save each month for maintenance?',
    a: 'For a compact or mid-size SUV (e.g. Brezza, Creta, Harrier) driven 12,000 km annually, an owner should set aside approximately ₹4,500 to ₹5,800 per month. This covers annual insurance (~₹30,000), periodic scheduled service (~₹12,000), annualized tyre replacement (~₹8,000/yr), battery amortization (~₹1,800/yr), and a ₹10,000 unscheduled repair contingency.',
  },
  {
    q: 'Where should I park my vehicle sinking fund money?',
    a: 'Park your automotive sinking fund in an auto-sweep bank account, a high-yield liquid mutual fund, or a 7-day flexi-fixed deposit offering 6.5% to 7.2% interest. Keep it completely separate from your daily transaction account so you do not accidentally spend it on retail purchases.',
  },
  {
    q: 'How does vehicle age impact the required emergency contingency reserve?',
    a: 'During years 1 to 3, factory warranties cover mechanical failures, keeping unscheduled breakdown costs near zero. After year 4 (when warranty expires), wear-and-tear components like suspension bushings, shock absorbers, water pumps, alternator brushes, and clutch assemblies begin requiring replacement. We recommend increasing your unscheduled repair buffer by ₹2,000 to ₹3,000 for each year beyond year 4.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Service Quote Fairness Checker',
    description: 'Verify if dealer service estimates include inflated labor rates or unnecessary add-on flush packages.',
    href: '/vehicle-os/service-quote-fairness',
    badge: 'Quote Audit',
  },
  {
    title: 'Repair or Replace Decision Engine',
    description: 'Decide whether to invest in an aging vehicle’s costly transmission or engine overhaul or sell it.',
    href: '/vehicle-os/repair-or-replace',
    badge: 'Repair Decision',
  },
  {
    title: 'Tyre Replacement Predictor',
    description: 'Forecast exact remaining tyre mileage, tread wear depth, and replacement cost for Indian conditions.',
    href: '/vehicle-os/tyre-replacement',
    badge: 'Tread Health',
  },
];

export default function EmergencyCostPlannerPage() {
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
            { label: 'Emergency Repair Sinking Fund' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              Sinking Fund Sizer
            </span>
            <span className="text-xs font-semibold text-slate-500">Zero-Panic Maintenance Buffer</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Emergency Cost Planner — Your Monthly Sinking Fund
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Never get hit with an unexpected ₹30,000 bill for tyres, insurance renewal, or battery failure all in the same month. Calculate an exact monthly reserve to smoothly absorb all periodic and surprise vehicle costs.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <EmergencyCostPlannerEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <PiggyBank className="w-4 h-4" />
              <span>Automotive Cash Flow Engineering</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              The 5 Pillars of a Zero-Surprise Car Sinking Fund
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Car ownership expenses are predictable in aggregate even when they occur irregularly. Budgeting for these 5 buckets eliminates financial anxiety:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Fixed Annual Insurance</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A single ₹25,000 renewal bill in October can disrupt festival bonuses. Dividing it by 12 (₹2,083/mo) makes renewal completely painless.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. Milestone Maintenance</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Major 40,000 km and 80,000 km services require timing belts, brake rotors, and transmission fluids, costing 2.5x standard annual oil changes.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. High-Ticket Consumables</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                4 premium tyres cost ₹28,000–₹48,000, while starter batteries cost ₹5,500 every 3.5 years. Amortizing these ensures ready funds on replacement day.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Maintenance Sinking Funds
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
            <span>Explore Related Maintenance &amp; Repair Tools</span>
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
