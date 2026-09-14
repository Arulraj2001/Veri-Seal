import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RepairOrReplaceEngine } from '@/components/vehicle-os/engines/RepairOrReplaceEngine';
import {
  Wrench,
  Car,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  HelpCircle,
  Coins,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Repair or Replace Car Calculator India | Sunk Cost Decision Engine | Kagazo',
  description:
    'Facing a major car repair bill in India? Calculate whether to repair and keep your car or sell and buy a replacement based on depreciation, interest, and the 50% rule.',
  keywords: [
    'car repair or replace calculator india',
    'is it worth repairing old car india',
    'car 50 percent repair rule',
    'should i sell my car or fix it',
    'engine overhaul vs buy new car',
    'major car repair decision tool',
    'old car maintenance vs new car emi',
    'car replacement financial threshold',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/repair-or-replace',
  },
  openGraph: {
    title: 'Repair or Replace Car Calculator | Kagazo Vehicle OS',
    description:
      'Compare the total cost of repairing your old car vs buying a replacement over a 1 to 3 year horizon.',
    url: 'https://Kagazo.in/vehicle-os/repair-or-replace',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Repair or Replace Car Decision Engine India | Kagazo',
    description:
      'Solve the big dilemma: Should you pay the ₹80,000 repair estimate or upgrade to a new vehicle?',
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
      name: 'Repair or Replace Decision Engine',
      item: 'https://Kagazo.in/vehicle-os/repair-or-replace',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Repair or Replace Decision Engine',
  url: 'https://Kagazo.in/vehicle-os/repair-or-replace',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Financial model evaluating old vehicle repair bills against new car depreciation, EMI interest, and insurance deltas.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the "50% Rule" in automotive repair economics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 50% Rule states that if a single repair estimate exceeds 50% of the vehicle’s realistic open-market resale value, repairing it is financially unsound. For example, spending ₹85,000 to repair a car worth only ₹1,50,000 traps capital in a rapidly depreciating asset that is prone to secondary cascading component failures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is keeping and repairing an older car often cheaper than buying a new one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A brand-new ₹10 Lakh to ₹15 Lakh car loses 18% to 22% in depreciation in Year 1 alone (₹1.8 Lakh to ₹3.3 Lakh loss), plus bank loan interest of ₹70,000 to ₹1,20,000 and higher comprehensive insurance. Even an expensive annual repair bill of ₹40,000 to ₹60,000 on an older, fully paid-off car is substantially lower than new vehicle capital drag.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does an aging car officially become a "money pit"?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A vehicle becomes a money pit when annual unscheduled repairs exceed the annualised loan EMI equivalent of a reliable replacement, or when critical systemic failures (such as simultaneous transmission slip, head gasket blowout, and steering rack wear) signal end-of-life fatigue across major assemblies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do state fitness and green tax rules in India affect this decision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the NCR region, petrol cars older than 15 years and diesel cars older than 10 years are strictly deregistered with zero legal road use. In other Indian states, vehicles over 15 years require fitness re-registration, automated lane testing, and recurring green tax (₹3,000 to ₹8,000 every 5 years), which increases keeping friction.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What is the "50% Rule" in automotive repair economics?',
    a: 'The 50% Rule states that if a single repair estimate exceeds 50% of the vehicle’s realistic open-market resale value, repairing it is financially unsound. For example, spending ₹85,000 to repair a car worth only ₹1,50,000 traps capital in a rapidly depreciating asset that is prone to secondary cascading component failures.',
  },
  {
    q: 'Why is keeping and repairing an older car often cheaper than buying a new one?',
    a: 'A brand-new ₹10 Lakh to ₹15 Lakh car loses 18% to 22% in depreciation in Year 1 alone (₹1.8 Lakh to ₹3.3 Lakh loss), plus bank loan interest of ₹70,000 to ₹1,20,000 and higher comprehensive insurance. Even an expensive annual repair bill of ₹40,000 to ₹60,000 on an older, fully paid-off car is substantially lower than new vehicle capital drag.',
  },
  {
    q: 'When does an aging car officially become a "money pit"?',
    a: 'A vehicle becomes a money pit when annual unscheduled repairs exceed the annualised loan EMI equivalent of a reliable replacement, or when critical systemic failures (such as simultaneous transmission slip, head gasket blowout, and steering rack wear) signal end-of-life fatigue across major assemblies.',
  },
  {
    q: 'How do state fitness and green tax rules in India affect this decision?',
    a: 'In the NCR region, petrol cars older than 15 years and diesel cars older than 10 years are strictly deregistered with zero legal road use. In other Indian states, vehicles over 15 years require fitness re-registration, automated lane testing, and recurring green tax (₹3,000 to ₹8,000 every 5 years), which increases keeping friction.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Depreciation & Resale Value Forecaster',
    description: 'Model real-world Indian automotive depreciation curves across hatchback, sedan, and SUV body types.',
    href: '/vehicle-os/depreciation-resale',
    badge: 'Valuation Engine',
  },
  {
    title: 'Cost Reality Checker (TCO)',
    description: 'Calculate 3-year and 5-year total cost of ownership including insurance, fuel, maintenance, and interest.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Calculator',
  },
  {
    title: 'Service Invoice Analyzer',
    description: 'Audit dealer repair bills and invoices to spot inflated labour fees and non-essential flush jobs.',
    href: '/vehicle-os/service-invoice-analyzer',
    badge: 'Invoice Protection',
  },
];

export default function RepairOrReplacePage() {
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
            { label: 'Repair or Replace Decision Engine' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              Critical Crossroads
            </span>
            <span className="text-xs font-semibold text-slate-500">Capital Allocation Sizer</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            “Repair or Replace?” — Financial Decision Engine
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Facing a massive repair estimate (e.g. clutch, engine overhaul, suspension, or gearbox)? This engine compares the true financial drain of repairing vs purchasing a replacement vehicle over a 1 to 3 year horizon.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <RepairOrReplaceEngine />

        {/* Educational / Deep-Dive Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Scale className="w-4 h-4" />
              <span>Automotive Financial Engineering</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Avoiding the "Sunk Cost Trap" in Car Repairs
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Car owners frequently make the mistake of saying, <em>"I just spent ₹40,000 on the suspension last month, so I must spend ₹50,000 on the clutch now."</em> Economists identify this as the classic sunk cost fallacy. Here is how to evaluate major mechanical crises rationally:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Past Costs are Gone</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Money already spent on previous service invoices is irreversible. The only relevant numbers are future anticipated outlays vs future vehicle utility.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. The New Car Illusion</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upgrading to eliminate repair hassles comes with mandatory registration taxes (8%–14% road tax), expensive comprehensive insurance premiums, and immediate steep year-one depreciation.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Breakdown Reliability Factor</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                If the vehicle is your sole primary transport and strandings cause missed business or safety hazards for family members, convenience and reliability outweigh purely financial models.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Repair vs Replace Decisions
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
            <span>Explore Related Vehicle Intelligence Tools</span>
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
