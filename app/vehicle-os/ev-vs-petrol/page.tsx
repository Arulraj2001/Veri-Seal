import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EvVsPetrolEngine } from '@/components/vehicle-os/engines/EvVsPetrolEngine';
import {
  Zap,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Fuel,
  HelpCircle,
  Coins,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV vs Petrol Break Even Calculator India | True TCO & Payback Sizer | Kagazo',
  description:
    'Calculate the exact months to break even on an Electric Vehicle (EV) vs Petrol car in India. Accounts for DISCOM domestic electricity slabs, DC fast charging, and maintenance deltas.',
  keywords: [
    'ev vs petrol calculator india',
    'electric car break even months india',
    'nexon ev vs petrol nexon cost comparison',
    'ev running cost per km vs petrol',
    'is ev worth buying in india calculator',
    'tata tiago ev vs petrol running cost',
    'electric vehicle tco calculator india',
    'ev charging cost vs petrol bill india',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/ev-vs-petrol',
  },
  openGraph: {
    title: 'EV vs Petrol Break-Even Calculator | Kagazo Vehicle OS',
    description:
      'Discover when your EV becomes cheaper than a petrol car based on your daily commute and home electricity tariff.',
    url: 'https://Kagazo.in/vehicle-os/ev-vs-petrol',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV vs Petrol Payback Calculator India | Kagazo',
    description:
      'Enter your daily driving distance to see the exact break-even timeline and 5-year net savings of buying an EV.',
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
      name: 'EV vs Petrol Break-Even Calculator',
      item: 'https://Kagazo.in/vehicle-os/ev-vs-petrol',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your EV vs Petrol Break-Even Horizon in India',
  description:
    'Step-by-step methodology to determine whether an electric vehicle pays back its upfront premium based on your monthly commute.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Determine the On-Road Upfront Premium',
      text: 'Calculate the difference between the EV on-road price and its closest ICE petrol trim equivalent (typically ₹3,50,000 to ₹5,00,000 in India).',
    },
    {
      '@type': 'HowToStep',
      name: 'Compute Monthly Energy Running Costs',
      text: 'Multiply monthly km by the petrol price per km (~₹7.20/km at 14 km/L) versus EV home charging rate (~₹1.10/km at 7.2 km/kWh and ₹7.50/unit DISCOM slab).',
    },
    {
      '@type': 'HowToStep',
      name: 'Factor In Public Fast Charging Tariffs',
      text: 'Adjust your average energy cost if 15%–25% of your charging occurs at commercial highway DC fast chargers (₹18–₹24 per unit).',
    },
    {
      '@type': 'HowToStep',
      name: 'Calculate Months to Full Amortization',
      text: 'Divide the upfront price premium by your total monthly running savings (fuel savings + periodic service savings).',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo EV vs Petrol Break-Even Calculator',
  url: 'https://Kagazo.in/vehicle-os/ev-vs-petrol',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Interactive financial model determining EV break-even months based on Indian DISCOM tariffs, battery efficiency, and commuting patterns.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the real running cost per kilometre of an EV vs a petrol car in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At domestic state DISCOM electricity rates of ₹7.00 to ₹8.50 per unit (kWh), a modern EV like the Tata Nexon.ev consumes ~138 Wh/km, resulting in an energy cost of ₹1.05 to ₹1.25 per km. In contrast, an equivalent 1.2L turbo-petrol compact SUV giving 13.5 km/L in city traffic costs ~₹7.50 per km (with petrol at ₹102/L). This gives an operating cost advantage of over ₹6.20 per km driven.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many monthly kilometres do I need to drive for an EV to make financial sense?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In India, if you drive over 1,200 km per month (~40 km per day), an EV will typically recover its ₹3.5L to ₹4.5L price premium within 38 to 48 months. If you drive less than 600 km per month, the break-even timeline extends beyond 7 years, making an EV harder to justify purely on financial return.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does relying heavily on public DC fast chargers affect EV savings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Public commercial DC fast charging costs between ₹18 and ₹24 per kWh (plus 18% GST). At ₹22/kWh, your EV running cost increases to ₹3.05 per km. While still cheaper than petrol (₹7.50/km), heavily relying on public stations reduces your monthly savings by ~35% and extends break-even duration by 14 to 18 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are EV periodic service costs truly cheaper than petrol or diesel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. EVs have no engine oil, oil filters, spark plugs, timing belts, fuel injectors, or clutch assemblies. Scheduled periodic services are largely limited to AC cabin pollen filters, brake fluid flushes every 2 years, coolant top-ups, and suspension inspections. Annual scheduled service for a mass-market EV averages ₹3,500 to ₹5,500 compared to ₹8,500 to ₹14,000 for an ICE vehicle.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What is the real running cost per kilometre of an EV vs a petrol car in India?',
    a: 'At domestic state DISCOM electricity rates of ₹7.00 to ₹8.50 per unit (kWh), a modern EV like the Tata Nexon.ev consumes ~138 Wh/km, resulting in an energy cost of ₹1.05 to ₹1.25 per km. In contrast, an equivalent 1.2L turbo-petrol compact SUV giving 13.5 km/L in city traffic costs ~₹7.50 per km (with petrol at ₹102/L). This gives an operating cost advantage of over ₹6.20 per km driven.',
  },
  {
    q: 'How many monthly kilometres do I need to drive for an EV to make financial sense?',
    a: 'In India, if you drive over 1,200 km per month (~40 km per day), an EV will typically recover its ₹3.5L to ₹4.5L price premium within 38 to 48 months. If you drive less than 600 km per month, the break-even timeline extends beyond 7 years, making an EV harder to justify purely on financial return.',
  },
  {
    q: 'How does relying heavily on public DC fast chargers affect EV savings?',
    a: 'Public commercial DC fast charging costs between ₹18 and ₹24 per kWh (plus 18% GST). At ₹22/kWh, your EV running cost increases to ₹3.05 per km. While still cheaper than petrol (₹7.50/km), heavily relying on public stations reduces your monthly savings by ~35% and extends break-even duration by 14 to 18 months.',
  },
  {
    q: 'Are EV periodic service costs truly cheaper than petrol or diesel?',
    a: 'Yes. EVs have no engine oil, oil filters, spark plugs, timing belts, fuel injectors, or clutch assemblies. Scheduled periodic services are largely limited to AC cabin pollen filters, brake fluid flushes every 2 years, coolant top-ups, and suspension inspections. Annual scheduled service for a mass-market EV averages ₹3,500 to ₹5,500 compared to ₹8,500 to ₹14,000 for an ICE vehicle.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'EV Home Charging Cost Calculator',
    description: 'Calculate exact unit consumption and monthly electricity bill impact under your state DISCOM slab.',
    href: '/vehicle-os/ev-home-charging',
    badge: 'Charging Sizer',
  },
  {
    title: 'Home Charger Installation Guide',
    description: 'Check sanction load, MCB rating, earthing resistance (&lt;2 ohms), and RWA society approval rules.',
    href: '/vehicle-os/home-charger-guide',
    badge: 'Installation Guide',
  },
  {
    title: 'Cost Reality Checker (TCO)',
    description: 'Full 5-year Total Cost of Ownership including loan EMI interest, insurance depreciation, and consumables.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Analyzer',
  },
];

export default function EvVsPetrolBreakEvenPage() {
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
            { label: 'EV vs Petrol / Diesel TCO Sizer' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              ⚡ Deep Decision Engine #3
            </span>
            <span className="text-xs font-semibold text-slate-500">Amortization &amp; Tariff Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            EV vs Petrol Break-Even — At Your Driving Pattern, When Does EV Become Cheaper?
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Electric vehicles carry a substantial initial price premium. This engine models your exact daily driving distance, home DISCOM electricity tariffs, public DC fast charging ratios, and maintenance savings to determine the exact month you recover the upfront price gap.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <EvVsPetrolEngine />

        {/* Educational / Deep-Dive Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600">
              <Cpu className="w-4 h-4" />
              <span>EV Ownership Economics in India</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Understanding the 3 Pillars of Electric Vehicle Payback
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Purchasing an EV in India is primarily an upfront capital allocation decision that trades a higher down-payment for microscopic recurring operating costs. Here is how the key financial vectors interact:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. The Energy Spread</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                With petrol retailing at ~₹100–₹105/L and domestic electricity averaging ₹6–₹8.50/unit, every single kilometre driven saves ₹5.50 to ₹6.50 in direct energy expenditure when charged overnight at home.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. State Subsidies &amp; Road Tax</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Several Indian states offer 0% road tax and registration fee waivers on EVs (saving ₹1.2 Lakh to ₹2.2 Lakh over ICE road tax), narrowing the real on-road upfront acquisition premium dramatically.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Battery Longevity &amp; Resale</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern LFP (Lithium Iron Phosphate) battery chemistry used by major Indian OEMs retains &gt;80% capacity over 2,000–3,000 cycles (equivalent to 3,00,000+ km), debunking early battery replacement fears.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on EV vs Petrol Economics
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
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Explore Related EV &amp; Ownership Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {tool.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tool.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
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
