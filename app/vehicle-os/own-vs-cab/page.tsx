import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { OwnVsCabEngine } from '@/components/vehicle-os/engines/OwnVsCabEngine';
import {
  Car,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Coins,
  HelpCircle,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Own Car vs Cab Calculator India | Ola Uber vs Car Ownership Sizer | Kagazo',
  description:
    'Should you buy a car or take Ola, Uber, and metro in India? Calculate your exact monthly break-even commuting distance comparing fixed EMI, insurance, parking against cab surge fares.',
  keywords: [
    'own car vs cab calculator india',
    'car ownership vs uber ola bangalore mumbai delhi',
    'is buying a car worth it vs cab india',
    'monthly car cost vs cab expense calculator',
    'car vs uber break even km per month',
    'metro vs own car monthly savings india',
    'should i buy a car or take cabs',
    'car emi parking vs daily cab ride costs',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/own-vs-cab',
  },
  openGraph: {
    title: 'Own vs Cab Decision Calculator | Kagazo Vehicle OS',
    description:
      'Compare the total monthly financial commitment of owning a personal car vs relying on on-demand cabs and metro.',
    url: 'https://Kagazo.in/vehicle-os/own-vs-cab',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Own Car vs Cab Calculator India | Kagazo',
    description:
      'Find your personal break-even monthly driving distance: When does owning a car become cheaper than cabs?',
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
      name: 'Own vs Cab Decision Calculator',
      item: 'https://Kagazo.in/vehicle-os/own-vs-cab',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Own vs Cab Decision Calculator',
  url: 'https://Kagazo.in/vehicle-os/own-vs-cab',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Financial comparison tool determining whether owning a car or using Ola/Uber/Metro is more economical based on monthly travel distance.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'At what monthly driving distance does owning a car become cheaper than cabs in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Indian tier-1 cities, the financial crossover point typically sits between 1,200 km and 1,500 km per month (~40–50 km daily). If you drive less than 800 km/month, taking cabs (averaging ₹18–₹22/km) saves between ₹8,000 and ₹15,000 every single month compared to car EMI, insurance, parking, and maintenance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the hidden friction costs of owning a car vs taking cabs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Car ownership requires spending 40 to 60 hours annually on service center visits, washing, finding paid parking (often ₹50–₹100/hr in commercial hubs), and navigating high-stress urban traffic. In a cab, you can work, read, or rest without parking stress or liability for minor accidental scrapes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the downsides of relying solely on cabs in Indian metros?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The primary downsides are unpredictable peak-hour surge pricing (up to 1.8x–2.2x), driver ride cancellations during monsoon rainstorms or late nights, lack of child car seats, hygiene variability, and difficulty booking spontaneous outstation road trips.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does remote work or hybrid 2-day office schedules affect this calculation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With hybrid work (commuting only 8 to 10 days per month), total monthly commute distance typically drops below 600 km. At this distance, a car costs ₹45 to ₹65 per kilometer driven because fixed EMI and insurance do not decrease. Taking premium cabs for office days and renting Zoomcar for weekend getaways saves ₹1.2 Lakh to ₹2.0 Lakh annually.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'At what monthly driving distance does owning a car become cheaper than cabs in India?',
    a: 'In Indian tier-1 cities, the financial crossover point typically sits between 1,200 km and 1,500 km per month (~40–50 km daily). If you drive less than 800 km/month, taking cabs (averaging ₹18–₹22/km) saves between ₹8,000 and ₹15,000 every single month compared to car EMI, insurance, parking, and maintenance.',
  },
  {
    q: 'What are the hidden friction costs of owning a car vs taking cabs?',
    a: 'Car ownership requires spending 40 to 60 hours annually on service center visits, washing, finding paid parking (often ₹50–₹100/hr in commercial hubs), and navigating high-stress urban traffic. In a cab, you can work, read, or rest without parking stress or liability for minor accidental scrapes.',
  },
  {
    q: 'What are the downsides of relying solely on cabs in Indian metros?',
    a: 'The primary downsides are unpredictable peak-hour surge pricing (up to 1.8x–2.2x), driver ride cancellations during monsoon rainstorms or late nights, lack of child car seats, hygiene variability, and difficulty booking spontaneous outstation road trips.',
  },
  {
    q: 'How does remote work or hybrid 2-day office schedules affect this calculation?',
    a: 'With hybrid work (commuting only 8 to 10 days per month), total monthly commute distance typically drops below 600 km. At this distance, a car costs ₹45 to ₹65 per kilometer driven because fixed EMI and insurance do not decrease. Taking premium cabs for office days and renting Zoomcar for weekend getaways saves ₹1.2 Lakh to ₹2.0 Lakh annually.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Cost Reality Checker (TCO)',
    description: 'Calculate your complete 5-year total cost of ownership including loan EMI, fuel, insurance, and tolls.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Calculator',
  },
  {
    title: 'Vehicle Affordability Checker',
    description: 'Check whether purchasing a car fits your net take-home salary using the 20/4/10 rule.',
    href: '/vehicle-os/affordability-checker',
    badge: 'Salary Rule',
  },
  {
    title: 'Trip True Cost Calculator',
    description: 'Calculate door-to-door trip cost comparing private car driving with tolls against cab options.',
    href: '/vehicle-os/trip-true-cost',
    badge: 'Trip Economics',
  },
];

export default function OwnVsCabPage() {
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
            { label: 'Own vs Cab Decision Calculator' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              Commuter Economics
            </span>
            <span className="text-xs font-semibold text-slate-500">Own Car vs Ola/Uber vs Metro</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            “Own vs Cab” Calculator — The Distance Break-Even Sizer
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Owning a car incurs substantial fixed monthly outflows (EMI, insurance, parking) whether you drive it or not. Calculate whether your monthly commute distance justifies car ownership or if cabs save you thousands every month.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <OwnVsCabEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Scale className="w-4 h-4" />
              <span>Urban Mobility Analysis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              The Math of Urban Mobility: Fixed vs Variable Cost Structure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Car ownership is 75% fixed cost and 25% variable fuel cost. In contrast, on-demand cabs are 100% variable cost. Here is how that fundamentally alters financial flexibility:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Low Mileage Penalty</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you only drive on weekends (e.g. 400 km/month), your fixed monthly costs (₹20,000 EMI + insurance + parking) produce a crippling real cost of ₹55 per kilometer.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. High Mileage Payoff</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Once you exceed 1,500 km per month, the fixed costs get spread across large mileage, driving your per-km cost down to ₹12–₹14/km—significantly cheaper than commercial cab rates.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Opportunity Cost of Capital</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A ₹3 Lakh down payment invested in a standard 12% equity index fund generates ~₹2.6 Lakh in compound returns over 5 years, which can fund over 1,000 cab rides.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Own vs Cab Decisions
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
