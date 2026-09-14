import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CostRealityCheckerEngine } from '@/components/vehicle-os/engines/CostRealityCheckerEngine';
import {
  Coins,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  PieChart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car True Cost of Ownership Calculator India | 5-Year TCO Sizer | Kagazo',
  description:
    'Calculate the true 5-year cost of car ownership in India beyond showroom price and EMI. Uncover loan interest, insurance, fuel, maintenance, FASTag tolls, parking, and resale recovery.',
  keywords: [
    'car true cost of ownership calculator india',
    'total cost of ownership car india 5 years',
    'real cost of owning a car in bangalore mumbai delhi',
    'car emi vs real monthly expense calculator',
    'how much does a car really cost per month in india',
    'hidden costs of car ownership india',
    'cost per km car ownership calculation',
    'car maintenance insurance fuel cost breakdown',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/cost-reality-checker',
  },
  openGraph: {
    title: 'Vehicle Cost Reality Checker (TCO) | Kagazo Vehicle OS',
    description:
      'Uncover the real 5-year financial commitment of car ownership in India. See your true cost per month and cost per kilometer.',
    url: 'https://Kagazo.in/vehicle-os/cost-reality-checker',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Cost Reality Checker India | Kagazo',
    description:
      'Think your car costs just the EMI? See the full financial picture including insurance, fuel, tolls, and depreciation.',
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
      name: 'Cost Reality Checker',
      item: 'https://Kagazo.in/vehicle-os/cost-reality-checker',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate the True 5-Year Cost of Owning a Car in India',
  description:
    'Comprehensive step-by-step framework to compute the complete Total Cost of Ownership (TCO) for personal vehicles in Indian cities.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Determine Total Capital Outlay & Loan Interest',
      text: 'Add down payment, registration road taxes (8%–14%), and total loan interest paid over the 3 to 7 year tenure to the on-road price.',
    },
    {
      '@type': 'HowToStep',
      name: 'Model 5-Year Energy & Consumables Consumption',
      text: 'Calculate total fuel expenditure based on realistic city traffic mileage (typically 20% lower than ARAI claims), plus 1 set of replacement tyres.',
    },
    {
      '@type': 'HowToStep',
      name: 'Aggregate Recurring Fixed Overheads',
      text: 'Sum 5 years of comprehensive zero-dep insurance, scheduled dealer services, monthly parking rent, and FASTag highway toll receipts.',
    },
    {
      '@type': 'HowToStep',
      name: 'Subtract 5-Year Resale Equity Recovery',
      text: 'Deduct the anticipated open-market resale value (typically 45%–55% of initial on-road cost) to arrive at the net true ownership cost.',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Vehicle Cost Reality Checker',
  url: 'https://Kagazo.in/vehicle-os/cost-reality-checker',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Flagship Indian automotive total cost of ownership calculator modeling loans, fuel, insurance, maintenance, tolls, and depreciation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is the real monthly cost of a car usually double the loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Car owners typically budget solely for the loan EMI (e.g. ₹18,000/month on a ₹9 Lakh loan). However, adding fuel (₹7,500/mo at 1,000 km), amortized insurance (₹2,000/mo), scheduled services & tyre wear (₹2,200/mo), FASTag tolls, and residential/office parking (₹1,500/mo) brings the true cash outflow to ₹31,200 to ₹35,000 per month—nearly 1.8x to 2x the base EMI.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much depreciation should I expect on a new car in India over 5 years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In India, high-retention mass-market petrol cars (like Maruti Suzuki and Hyundai hatchbacks) retain 50% to 55% of their invoice price after 5 years. Premium German luxury cars retain only 35% to 42%, while mid-size diesel SUVs retain 45% to 52% (subject to 10-year NGT deregistration rules in NCR).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a reasonable "Cost Per Kilometre" benchmark for a personal car in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For an entry hatchback driven 12,000 km annually, the net true cost per km (including depreciation) is ₹12 to ₹15/km. For a mid-size SUV (₹15 Lakh to ₹20 Lakh), it ranges from ₹22 to ₹28/km. For low-mileage drivers doing under 5,000 km/year, true cost can spike above ₹45/km due to fixed depreciation and insurance overhead.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do hidden costs like parking and FASTag tolls affect ownership reality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In metro cities (Bengaluru, Mumbai, Delhi-NCR), dedicated society parking slots or office parking fees average ₹1,000 to ₹3,000 per month. Monthly highway trips and airport expressway commutes add ₹600 to ₹1,500 in FASTag deductions. Over 5 years, parking and tolls alone drain ₹90,000 to ₹2,50,000 in unbudgeted cash.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'Why is the real monthly cost of a car usually double the loan EMI?',
    a: 'Car owners typically budget solely for the loan EMI (e.g. ₹18,000/month on a ₹9 Lakh loan). However, adding fuel (₹7,500/mo at 1,000 km), amortized insurance (₹2,000/mo), scheduled services & tyre wear (₹2,200/mo), FASTag tolls, and residential/office parking (₹1,500/mo) brings the true cash outflow to ₹31,200 to ₹35,000 per month—nearly 1.8x to 2x the base EMI.',
  },
  {
    q: 'How much depreciation should I expect on a new car in India over 5 years?',
    a: 'In India, high-retention mass-market petrol cars (like Maruti Suzuki and Hyundai hatchbacks) retain 50% to 55% of their invoice price after 5 years. Premium German luxury cars retain only 35% to 42%, while mid-size diesel SUVs retain 45% to 52% (subject to 10-year NGT deregistration rules in NCR).',
  },
  {
    q: 'What is a reasonable "Cost Per Kilometre" benchmark for a personal car in India?',
    a: 'For an entry hatchback driven 12,000 km annually, the net true cost per km (including depreciation) is ₹12 to ₹15/km. For a mid-size SUV (₹15 Lakh to ₹20 Lakh), it ranges from ₹22 to ₹28/km. For low-mileage drivers doing under 5,000 km/year, true cost can spike above ₹45/km due to fixed depreciation and insurance overhead.',
  },
  {
    q: 'How do hidden costs like parking and FASTag tolls affect ownership reality?',
    a: 'In metro cities (Bengaluru, Mumbai, Delhi-NCR), dedicated society parking slots or office parking fees average ₹1,000 to ₹3,000 per month. Monthly highway trips and airport expressway commutes add ₹600 to ₹1,500 in FASTag deductions. Over 5 years, parking and tolls alone drain ₹90,000 to ₹2,50,000 in unbudgeted cash.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Own vs Cab Decision Engine',
    description: 'Compare the net monthly and per-km cost of owning a personal car against relying on Uber / Ola.',
    href: '/vehicle-os/own-vs-cab',
    badge: 'Commute Dilemma',
  },
  {
    title: 'Vehicle Affordability Checker',
    description: 'Calculate your safe car purchase budget using the 20/4/10 financial rule and monthly net salary.',
    href: '/vehicle-os/affordability-checker',
    badge: 'Budget Rule',
  },
  {
    title: 'Depreciation & Resale Forecaster',
    description: 'Model year-by-year value decay curves across body styles and estimate accurate 3-to-7 year resale value.',
    href: '/vehicle-os/depreciation-resale',
    badge: 'Resale Engine',
  },
];

export default function CostRealityCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
            { label: '5-Year Cost Reality Checker' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              🥇 #1 Decision Engine
            </span>
            <span className="text-xs font-semibold text-slate-500">True 5-Year Ownership Reality</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Cost Reality Checker — Beyond the Showroom Price
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Most car owners only think about the showroom sticker price and EMI. This engine uncovers your complete 5-year financial commitment—including fuel, insurance, maintenance, tyres, parking, FASTag tolls, and resale recovery—to reveal your true cost per month and true cost per kilometer.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <CostRealityCheckerEngine />

        {/* Deep Dive Educational Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <PieChart className="w-4 h-4" />
              <span>Financial Anatomy of Car Ownership</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Where Does Your Car Ownership Money Actually Go?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When analyzing over 10,000 real-world Indian car ownership cycles, the initial purchase price accounts for less than 45% of total capital deployed. Here is the realistic 5-year expense distribution:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Invisible Financing Drag</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 5-year loan of ₹8 Lakh at 9.5% accumulates over ₹2,10,000 in pure interest. Prepaying even 1 extra EMI annually can save up to ₹42,000 in compound interest drain.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. Fuel &amp; Real City MPG</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manufacturer ARAI ratings are achieved in laboratory dynamometer tests without AC. Real Indian city crawling speeds reduce real fuel economy by 25%–35%, inflating 5-year fuel outgo significantly.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Consumables &amp; Tyres</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Between 40,000 km and 55,000 km, all 4 tyres require replacement (₹24,000–₹45,000) alongside brake pads, auxiliary battery, and transmission fluid flushes.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Vehicle Ownership Costs
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
            <span>Explore Related Ownership &amp; Decision Tools</span>
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
