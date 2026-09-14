import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Sun,
  Wind,
  Droplets,
  Paintbrush,
  Wallet,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Building,
} from 'lucide-react';
import HomeDigitalTwinDashboard from '@/components/home-cost/HomeDigitalTwinDashboard';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Household Cost Calculator India | Electricity, AC, Solar & Renovation Savings',
  description:
    "India's most detailed household cost calculator — electricity slab bills with real DISCOM rates (TANGEDCO, BESCOM, MSEDCL), 3★ vs 5★ AC payback, PM Surya Ghar solar subsidy up to ₹78,000, BLDC fan ROI, inverter sizing, and LPG vs induction comparison. Free, instant, built for Indian homes.",
  keywords: [
    'household cost calculator India',
    'home electricity bill calculator India',
    'Indian home expenses calculator',
    'reduce electricity bill India',
    'DISCOM slab tariff calculator India',
    'PM Surya Ghar subsidy calculator',
    'home cost savings India',
    'AC electricity cost India',
    'inverter battery sizing India',
    'home renovation cost India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost',
  },
  openGraph: {
    title: 'Household Cost Calculator India | Electricity, AC, Solar & Renovation | Kagazo',
    description:
      'Answer the ultimate homeowner question: What is costing me money at home, and what should I change to save money? Real DISCOM tariffs, PM Surya Ghar subsidy, AC payback, and more.',
    url: 'https://Kagazo.in/home-cost',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Household Cost Calculator India | Electricity, AC, Solar & Renovation Savings',
    description:
      "India's free household cost intelligence platform — real DISCOM electricity slab bills, AC payback, PM Surya Ghar solar subsidy, and more.",
  },
};

const FAQS = [
  {
    question: 'How does the Home Digital Twin calculate my electricity bill accurately?',
    answer:
      'Unlike generic online tools that apply a flat rate, our engine models the exact telescopic slab structures of major Indian state DISCOMs (including TANGEDCO in Tamil Nadu, MSEDCL in Maharashtra, BSES in Delhi, and BESCOM in Karnataka). It accounts for subsidized free tiers, progressive slab jumps, and sanctioned load fixed charges.',
  },
  {
    question: 'Why does setting AC temperature from 20°C to 24°C save so much money?',
    answer:
      'Bureau of Energy Efficiency (BEE) and ASHRAE thermodynamic research shows that every 1°C increase in AC set temperature reduces compressor load by approximately 6%. Increasing the thermostat from 20°C to 24°C reduces electricity consumption by ~24%, saving an average Indian household ₹3,200 to ₹5,400 across summer months with zero lifestyle compromise.',
  },
  {
    question: 'Is switching conventional ceiling fans to BLDC motors worth the investment?',
    answer:
      'Yes! A standard induction ceiling fan consumes 75W, while a modern BLDC motor fan consumes just 28W (a 63% reduction). At 14 hours of daily use, one BLDC fan saves ~240 units per year (~₹1,800/yr). Since BLDC fans cost around ₹2,800, full investment payback is achieved in under 18 months.',
  },
  {
    question: 'How much subsidy does PM Surya Ghar Muft Bijli Yojana provide for rooftop solar?',
    answer:
      'Under the PM Surya Ghar scheme, the Central Government provides direct bank account (DBT) subsidies: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum cap of ₹78,000 for 3 kW and above. For a typical 3 kW system costing ~₹1.95 Lakhs, net cost is reduced to ~₹1.17 Lakhs with full break-even payback in ~3.2 years.',
  },
  {
    question: 'How do I read my electricity bill to find my sanctioned load and current slab?',
    answer:
      'Your sanctioned load (in kW) is printed on the top section of your DISCOM bill, near your consumer number. It determines your fixed demand charge each month. Your "units consumed" (kWh) for the billing period determines which tariff slab applies to you. If you consume fewer than the first slab threshold (e.g., 100 units in Tamil Nadu), you pay the lowest rate. Consuming more pushes additional units into progressively higher-rate slabs.',
  },
  {
    question: 'What is the single biggest way to reduce home electricity bills in India?',
    answer:
      'For most Indian households, the air conditioner accounts for 40–60% of the summer electricity bill. The three highest-impact changes are: (1) Set your AC thermostat to 24°C instead of 20°C — saves ~24% of AC electricity, (2) Service the AC filters every 2 months — dirty filters increase consumption by 10–15%, and (3) Upgrade to a 5-Star Inverter AC from a non-inverter model — saves 30–40% annually. These three changes combined can reduce your summer bill by ₹2,000–₹5,000 per month.',
  },
];

const CATEGORY_CARDS = [
  {
    title: '⚡ Electricity & Energy',
    desc: 'Room-by-room appliance bill calculator, state tariff slabs, and 5-star upgrade payback.',
    href: '/home-cost/electricity-bill-calculator',
    badge: 'TOP SAVINGS',
  },
  {
    title: '❄️ Inverter AC & Cooling',
    desc: '3-Star vs 5-Star break-even analysis, room tonnage sizer, and thermostat physics.',
    href: '/home-cost/ac-cost-calculator',
    badge: 'SUMMER ESSENTIAL',
  },
  {
    title: '☀️ Solar & Backup Power',
    desc: 'PM Surya Ghar ₹78,000 subsidy calculator, roof sizing, and Inverter/Battery Ah capacity.',
    href: '/home-cost/solar-calculator',
    badge: 'GOVT SUBSIDY',
  },
  {
    title: '💧 Water & Geyser',
    desc: 'IS 1172 water tank capacity sizer & 3-way geyser battle: Electric vs Gas vs Solar.',
    href: '/home-cost/water-tank-calculator',
    badge: 'PLUMBING',
  },
  {
    title: '🏡 Renovation & Construction',
    desc: 'Wall painting litres & labor, floor tile box estimator, and cement/sand/steel sizing.',
    href: '/home-cost/renovation-cost',
    badge: 'MATERIALS',
  },
  {
    title: '💰 Living Cost & Rent vs Buy',
    desc: '14.2 kg LPG cylinder vs Induction cooktop & Indian 10-year Rent vs Buy financial model.',
    href: '/home-cost/lpg-vs-induction',
    badge: 'FINANCE',
  },
];

export default function HomeCostLandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Home Cost OS', item: 'https://Kagazo.in/home-cost' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Kagazo Home Cost & Savings Intelligence Platform',
        url: 'https://Kagazo.in/home-cost',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Indian household operating expense optimizer, electricity bill calculator with real DISCOM slab rates, AC payback simulator, PM Surya Ghar solar subsidy calculator, and AI home savings advisor.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Home Cost OS' },
        ]}
        showHomeIcon
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Home Cost &amp; Savings Intelligence for Indian Households</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          What Is Costing You Money at Home, and What Should You Change?
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Simulate your household&apos;s real power, water, cooling, and living costs using authentic Indian state DISCOM tariff slabs. Discover high-ROI upgrades that pay for themselves.
        </p>
      </div>

      {/* Flagship Digital Twin Dashboard */}
      <HomeDigitalTwinDashboard />

      {/* 6 Category Hub Links */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Specialized Household Cost Intelligence Tools</h3>
            <p className="text-xs text-slate-500">Deep-dive into specific appliances, utilities, and financial decisions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-xs"
            >
              <div>
                <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {cat.badge}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-3 group-hover:text-emerald-700 transition-colors">
                  {cat.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mt-6 group-hover:translate-x-1 transition-transform">
                <span>Explore Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 space-y-6 shadow-sm max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                <span className="text-emerald-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ad Slot */}
      <div className="max-w-5xl mx-auto pt-4">
        <AdSlot slot="in_content" />
      </div>
    </div>
  );
}
