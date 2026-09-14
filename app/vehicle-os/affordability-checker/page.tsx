import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AffordabilityCheckerEngine } from '@/components/vehicle-os/engines/AffordabilityCheckerEngine';
import {
  Percent,
  Coins,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Scale,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Affordability Calculator India | 20/4/10 Budget Rule | Kagazo',
  description:
    'Can you really afford that car? Test your true monthly outgo against take-home salary using the 20/4/10 financial rule adapted for Indian fuel, insurance, and interest rates.',
  keywords: [
    'car affordability calculator india',
    '20 4 10 rule for buying a car india',
    'how much car can i afford on my salary india',
    'car emi to salary ratio india',
    'safe car budget calculator based on salary',
    'car buying financial rules india',
    'can i afford 15 lakh car on 1 lakh salary',
    'maximum car emi percentage of salary',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/affordability-checker',
  },
  openGraph: {
    title: 'Vehicle Affordability Checker | Kagazo Vehicle OS',
    description:
      'Evaluate whether a car fits your net monthly take-home pay, loan EMI, fuel, insurance, and investment goals.',
    url: 'https://Kagazo.in/vehicle-os/affordability-checker',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Affordability Checker India | Kagazo',
    description:
      'Avoid car debt traps. Check your safe car purchase ceiling with the 20/4/10 automotive affordability rule.',
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
      name: 'Vehicle Affordability Checker',
      item: 'https://Kagazo.in/vehicle-os/affordability-checker',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Vehicle Affordability Checker',
  url: 'https://Kagazo.in/vehicle-os/affordability-checker',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Consumer protection financial engine stress-testing vehicle acquisition budgets against net in-hand salary using the 20/4/10 rule.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the "20/4/10 Rule" for buying a car in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 20/4/10 rule is a conservative personal finance guideline: (1) Put down at least 20% upfront as down payment, (2) Keep loan tenure under 4 years (48 months) to limit interest drain, and (3) Ensure total vehicle expenses (EMI + fuel + insurance + parking) do not exceed 10% to 15% of your gross monthly income (or 20% of net take-home salary).',
      },
    },
    {
      '@type': 'Question',
      name: 'How much car can I afford on a ₹1,00,000 monthly take-home salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a ₹1,00,000 monthly take-home salary, your total monthly vehicle allocation (including fuel, insurance, and maintenance) should not exceed ₹20,000. Leaving ₹6,000 for operational running costs means an EMI ceiling of ~₹14,000. Over a 4-year loan at 9.5% with a 20% down payment, this translates to a maximum on-road car price of ~₹7.5 Lakh to ₹8.5 Lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do 7-year car loans pose a dangerous financial trap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 7-year (84-month) loan reduces monthly EMI by ~22%, tempting buyers into vehicles above their real affordability. However, over 7 years you pay nearly double the total interest (e.g. ₹3.5 Lakh interest on a ₹10 Lakh loan), and you remain in "negative equity" (owing more on the loan than the car is worth in open market) for over 4.5 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use my emergency fund or long-term investments for a car down payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Never deplete emergency reserves (3–6 months living expenses) or liquidate compounding retirement/equity portfolios for a car down payment. Doing so removes your financial shock absorber. If you cannot afford the 20% down payment from designated non-emergency cash savings, delay the purchase by 6 to 12 months.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What is the "20/4/10 Rule" for buying a car in India?',
    a: 'The 20/4/10 rule is a conservative personal finance guideline: (1) Put down at least 20% upfront as down payment, (2) Keep loan tenure under 4 years (48 months) to limit interest drain, and (3) Ensure total vehicle expenses (EMI + fuel + insurance + parking) do not exceed 10% to 15% of your gross monthly income (or 20% of net take-home salary).',
  },
  {
    q: 'How much car can I afford on a ₹1,00,000 monthly take-home salary?',
    a: 'On a ₹1,00,000 monthly take-home salary, your total monthly vehicle allocation (including fuel, insurance, and maintenance) should not exceed ₹20,000. Leaving ₹6,000 for operational running costs means an EMI ceiling of ~₹14,000. Over a 4-year loan at 9.5% with a 20% down payment, this translates to a maximum on-road car price of ~₹7.5 Lakh to ₹8.5 Lakh.',
  },
  {
    q: 'Why do 7-year car loans pose a dangerous financial trap?',
    a: 'A 7-year (84-month) loan reduces monthly EMI by ~22%, tempting buyers into vehicles above their real affordability. However, over 7 years you pay nearly double the total interest (e.g. ₹3.5 Lakh interest on a ₹10 Lakh loan), and you remain in "negative equity" (owing more on the loan than the car is worth in open market) for over 4.5 years.',
  },
  {
    q: 'Should I use my emergency fund or long-term investments for a car down payment?',
    a: 'Never deplete emergency reserves (3–6 months living expenses) or liquidate compounding retirement/equity portfolios for a car down payment. Doing so removes your financial shock absorber. If you cannot afford the 20% down payment from designated non-emergency cash savings, delay the purchase by 6 to 12 months.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Cost Reality Checker (TCO)',
    description: 'Calculate your full 5-year total cost of ownership including loan EMI, fuel, insurance, and maintenance.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Calculator',
  },
  {
    title: 'Own vs Cab Decision Calculator',
    description: 'See if relying on Ola, Uber, and metro is more economical than taking on a monthly car loan EMI.',
    href: '/vehicle-os/own-vs-cab',
    badge: 'Mobility Sizer',
  },
  {
    title: 'Depreciation & Resale Forecaster',
    description: 'Check how rapidly your target car model loses value across 3 to 7 years of ownership.',
    href: '/vehicle-os/depreciation-resale',
    badge: 'Resale Engine',
  },
];

export default function AffordabilityCheckerPage() {
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
            { label: 'Vehicle Affordability Checker' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              Consumer Protection
            </span>
            <span className="text-xs font-semibold text-slate-500">True Household Budget Stress Tester</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Affordability Checker — Can I Realistically Afford This Car?
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Banks only approve loans based on gross salary. They don't account for your fuel bills, insurance, tyre wear, parking, or long-term wealth savings. This engine calculates your True Monthly Outflow vs safe income thresholds.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <AffordabilityCheckerEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Scale className="w-4 h-4" />
              <span>Budget Discipline &amp; Wealth Preservation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Why Dealership Loan Approvals Are Not "Affordability"
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automobile financiers in India routinely approve loans where the EMI consumes up to 50% of your net salary. Here is why accepting that maximum limit creates severe financial vulnerability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Lifestyle Crowding Out</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                When EMI + fuel + insurance swallow ₹30,000/month, discretionary spending on health, vacations, education, and mutual fund SIPs gets compromised first.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. Depreciating Collateral</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike a home loan where the underlying real estate asset generally appreciates, a vehicle depreciates by ~50% in 5 years while the loan debt remains constant.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Job Mobility Flexibility</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Heavy vehicle EMIs trap working professionals into staying in unfulfilling jobs or toxic workplaces due to inability to withstand even 2 months without salary inflows.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Car Affordability
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
