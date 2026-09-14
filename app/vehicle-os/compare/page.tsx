import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { VehicleComparisonEngine } from '@/components/vehicle-os/engines/VehicleComparisonEngine';
import {
  Scale,
  Trophy,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BarChart,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Ownership Comparison Engine India | Head-to-Head 5-Year TCO | Kagazo',
  description:
    'Compare two Indian cars head-to-head on real 5-year ownership costs, EMI, fuel expenses, insurance, scheduled maintenance, and resale recovery across your monthly driving distance.',
  keywords: [
    'car comparison tool india ownership cost',
    'compare car true cost of ownership india',
    'petrol vs diesel car comparison calculator',
    'creta vs brezza ownership cost comparison',
    'head to head car emi and maintenance comparison',
    'car running cost per km comparison',
    'best car for 1000 km per month india',
    '5 year car expense comparison matrix',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/compare',
  },
  openGraph: {
    title: 'Vehicle Comparison Engine | Kagazo Vehicle OS',
    description:
      'Compare Indian vehicles beyond brochure specs. Discover which model wins on total 5-year financial outflow at your exact monthly driving distance.',
    url: 'https://Kagazo.in/vehicle-os/compare',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Head-to-Head Car Comparison Engine India | Kagazo',
    description:
      'Which car actually saves money at your monthly mileage? Compare total 5-year outflows side-by-side.',
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
      name: 'Vehicle Comparison Engine',
      item: 'https://Kagazo.in/vehicle-os/compare',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Head-to-Head Vehicle Comparison Engine',
  url: 'https://Kagazo.in/vehicle-os/compare',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Dynamic usage-tiered automotive financial comparison engine modeling purchase price, EMI, real city fuel burn, insurance, maintenance, and resale.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do head-to-head winners change when monthly driving distance shifts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A car with a higher sticker price but exceptional fuel economy (such as a hybrid or diesel) loses against a cheaper petrol car at 500 km/month because fixed loan EMI differences outweigh fuel savings. However, at 2,000 km/month, massive fuel savings (₹8,000–₹12,000/mo) completely overturn the higher EMI, making the initially pricier vehicle significantly cheaper overall.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does resale value impact a car comparison comparison matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Resale value is often the decisive factor. For instance, a vehicle costing ₹14 Lakh that retains 58% value after 5 years (₹8.12 Lakh recovery) has a net depreciation cost of ₹5.88 Lakh. A competing car costing ₹13 Lakh that retains only 42% (₹5.46 Lakh recovery) loses ₹7.54 Lakh—erasing its ₹1 Lakh sticker price advantage completely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I factor dealer scheduled service packages into vehicle comparison?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Certain manufacturers (e.g. Toyota, Maruti) offer lower periodic service rates averaging ₹6,000 to ₹9,000 annually, whereas European marques or turbocharged direct-injection engines can average ₹16,000 to ₹24,000 annually due to specialized synthetic lubricants and spark plug service requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do insurance costs vary between vehicle body styles and variants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Comprehensive insurance premiums scale with the car’s cubic capacity (cc) and Insured Declared Value (IDV). Engines over 1,500cc attract higher IRDAI third-party statutory tariffs (₹7,897 vs ₹3,416 for 1,000cc–1,500cc), adding ₹4,000 to ₹8,000 in higher annual insurance premiums over 5 years.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'Why do head-to-head winners change when monthly driving distance shifts?',
    a: 'A car with a higher sticker price but exceptional fuel economy (such as a hybrid or diesel) loses against a cheaper petrol car at 500 km/month because fixed loan EMI differences outweigh fuel savings. However, at 2,000 km/month, massive fuel savings (₹8,000–₹12,000/mo) completely overturn the higher EMI, making the initially pricier vehicle significantly cheaper overall.',
  },
  {
    q: 'How does resale value impact a car comparison comparison matrix?',
    a: 'Resale value is often the decisive factor. For instance, a vehicle costing ₹14 Lakh that retains 58% value after 5 years (₹8.12 Lakh recovery) has a net depreciation cost of ₹5.88 Lakh. A competing car costing ₹13 Lakh that retains only 42% (₹5.46 Lakh recovery) loses ₹7.54 Lakh—erasing its ₹1 Lakh sticker price advantage completely.',
  },
  {
    q: 'Should I factor dealer scheduled service packages into vehicle comparison?',
    a: 'Yes. Certain manufacturers (e.g. Toyota, Maruti) offer lower periodic service rates averaging ₹6,000 to ₹9,000 annually, whereas European marques or turbocharged direct-injection engines can average ₹16,000 to ₹24,000 annually due to specialized synthetic lubricants and spark plug service requirements.',
  },
  {
    q: 'How do insurance costs vary between vehicle body styles and variants?',
    a: 'Comprehensive insurance premiums scale with the car’s cubic capacity (cc) and Insured Declared Value (IDV). Engines over 1,500cc attract higher IRDAI third-party statutory tariffs (₹7,897 vs ₹3,416 for 1,000cc–1,500cc), adding ₹4,000 to ₹8,000 in higher annual insurance premiums over 5 years.',
  },
];

const RELATED_TOOLS = [
  {
    title: '5-Year Cost Reality Checker',
    description: 'Drill down into complete granular 5-year cost breakdown for any single vehicle model.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Sizer',
  },
  {
    title: 'EV vs Petrol Calculator',
    description: 'Compare electric vehicles directly against petrol/diesel models on fuel savings and battery longevity.',
    href: '/vehicle-os/ev-vs-petrol',
    badge: 'EV Comparison',
  },
  {
    title: 'Bike vs Scooter Decision Matrix',
    description: 'Compare two-wheeler options on mileage, maintenance, ergonomics, and highway stability.',
    href: '/vehicle-os/bike-vs-scooter',
    badge: '2-Wheeler Battle',
  },
];

export default function VehicleComparisonPage() {
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
            { label: 'Vehicle Comparison Engine' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              🆚 Decision Engine #2
            </span>
            <span className="text-xs font-semibold text-slate-500">Usage-Tiered Ownership Battle</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Comparison Engine — Real Ownership vs Static Specs
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Stop comparing brochure BHP and torque figures. Compare what actually leaves your bank account each month across purchase price, EMI, fuel, insurance, service, and resale. Toggle your monthly usage to watch the financial winner change dynamically.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <VehicleComparisonEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <BarChart className="w-4 h-4" />
              <span>Comparative Financial Modeling</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Why Mileage Dictates the Smart Automotive Choice
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Car buyers frequently regret buying fuel-efficient diesel or hybrid cars for short weekend trips, or purchasing thirsty petrol SUVs for 80 km daily office commutes. Here is why distance defines economics:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Under 800 km / month</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sticker price and EMI dominate the equation. A ₹3 Lakh price premium for a diesel or hybrid engine cannot be recovered in fuel savings even over 8 years.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. 800 to 1,500 km / month</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The equilibrium zone where factory CNG or efficient mild-hybrid petrol vehicles offer the optimal balance of acquisition cost and monthly fuel flexibility.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Over 1,500 km / month</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Running fuel costs overpower EMI differences. Strong hybrids or pure EVs become undisputed financial champions, saving ₹10,000+ every single month.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Vehicle Comparisons
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
            <span>Explore Related Comparison &amp; Decision Tools</span>
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
