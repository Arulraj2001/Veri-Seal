import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EvHomeChargingEngine } from '@/components/vehicle-os/engines/EvHomeChargingEngine';
import {
  Zap,
  BatteryCharging,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Coins,
  Cpu,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Home Charging Cost Calculator India | Monthly Electricity Bill Impact | Kagazo',
  description:
    'Calculate exact home electricity costs to charge an electric car or 2-wheeler in India. Models 12% AC-to-DC conversion loss, state DISCOM domestic tariff slabs, and public charger deltas.',
  keywords: [
    'ev home charging cost calculator india',
    'electric car electricity bill increase india',
    'how much does it cost to charge nexon ev at home',
    'ev charging unit consumption per month',
    'cost to charge electric scooter ather ola home',
    'domestic electricity slab for ev charging india',
    'ac wallbox charging cost per unit',
    'home charging vs fast charging cost difference',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/ev-home-charging',
  },
  openGraph: {
    title: 'EV Home Charging Cost Calculator | Kagazo Vehicle OS',
    description:
      'Model your daily, monthly, and annual electricity bill impact when charging an electric vehicle at home in India.',
    url: 'https://Kagazo.in/vehicle-os/ev-home-charging',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Home Charging Cost Calculator India | Kagazo',
    description:
      'Find out how much your monthly electricity bill increases when charging your EV overnight at home.',
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
      name: 'EV Home Charging Cost Calculator',
      item: 'https://Kagazo.in/vehicle-os/ev-home-charging',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo EV Home Charging Cost Calculator',
  url: 'https://Kagazo.in/vehicle-os/ev-home-charging',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Tool modeling monthly home electric utility bill increases from overnight EV charging, accounting for thermal conversion loss.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a full home recharge cost for a typical Indian electric car?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a compact EV with a 30 kWh battery (such as a Tata Tiago or Punch EV), charging from 10% to 100% requires drawing ~30 units (kWh) from the domestic grid after accounting for 12% AC-to-DC conversion losses. At a typical state tariff of ₹7.50 per unit, a complete 100% recharge costs between ₹225 and ₹260, delivering 200 to 240 km of real-world driving.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do you add a 10% to 15% charging loss to grid consumption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When alternating current (AC) from the home wall socket passes through the car’s on-board charger (OBC) to be converted into direct current (DC) for the battery pack, thermal dissipation occurs. Standard SAE J1772 tests demonstrate that 10% to 15% of electrical energy drawn from the grid is lost as heat in the inverter circuitry and battery cooling fans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can EV charging push my household into a higher electricity tariff slab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Indian state DISCOMs (such as BESCOM, MSEDCL, or TANGEDCO) follow progressive telescopic tariff slabs (e.g. ₹4.50 for the first 100 units, stepping up to ₹8.50 or ₹9.50 above 400 units). Adding 180–250 units monthly for EV charging pushes consumption into the highest domestic slab. Some states offer a separate subsidised EV-specific non-telescopic domestic meter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is regular 15A socket charging safe for long-term daily use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 15A (3.3 kW) industrial-grade socket is safe provided it is wired with a dedicated 4 sq. mm copper cable direct from the distribution board, protected by a dedicated 16A/20A MCB and Type-A RCCB, and backed by earth pit resistance under 2 Ohms. Standard domestic 15A plugs without dedicated wiring risk socket face burning and terminal meltdown.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'How much does a full home recharge cost for a typical Indian electric car?',
    a: 'For a compact EV with a 30 kWh battery (such as a Tata Tiago or Punch EV), charging from 10% to 100% requires drawing ~30 units (kWh) from the domestic grid after accounting for 12% AC-to-DC conversion losses. At a typical state tariff of ₹7.50 per unit, a complete 100% recharge costs between ₹225 and ₹260, delivering 200 to 240 km of real-world driving.',
  },
  {
    q: 'Why do you add a 10% to 15% charging loss to grid consumption?',
    a: 'When alternating current (AC) from the home wall socket passes through the car’s on-board charger (OBC) to be converted into direct current (DC) for the battery pack, thermal dissipation occurs. Standard SAE J1772 tests demonstrate that 10% to 15% of electrical energy drawn from the grid is lost as heat in the inverter circuitry and battery cooling fans.',
  },
  {
    q: 'Can EV charging push my household into a higher electricity tariff slab?',
    a: 'Yes. Indian state DISCOMs (such as BESCOM, MSEDCL, or TANGEDCO) follow progressive telescopic tariff slabs (e.g. ₹4.50 for the first 100 units, stepping up to ₹8.50 or ₹9.50 above 400 units). Adding 180–250 units monthly for EV charging pushes consumption into the highest domestic slab. Some states offer a separate subsidised EV-specific non-telescopic domestic meter.',
  },
  {
    q: 'Is regular 15A socket charging safe for long-term daily use?',
    a: 'A 15A (3.3 kW) industrial-grade socket is safe provided it is wired with a dedicated 4 sq. mm copper cable direct from the distribution board, protected by a dedicated 16A/20A MCB and Type-A RCCB, and backed by earth pit resistance under 2 Ohms. Standard domestic 15A plugs without dedicated wiring risk socket face burning and terminal meltdown.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'EV vs Petrol Break-Even Calculator',
    description: 'Calculate the exact months required to amortize the EV purchase price gap against petrol savings.',
    href: '/vehicle-os/ev-vs-petrol',
    badge: 'TCO Payback',
  },
  {
    title: 'Home Charger Installation Guide',
    description: 'Detailed compliance checklist: Sanctioned load check, RWA approval letter, and earthing installation.',
    href: '/vehicle-os/home-charger-guide',
    badge: 'Safety Checklist',
  },
  {
    title: 'Trip True Cost Calculator',
    description: 'Door-to-door trip cost calculator for road trips comparing highway DC charging vs petrol/toll fees.',
    href: '/vehicle-os/trip-true-cost',
    badge: 'Highway Trips',
  },
];

export default function EvHomeChargingCostPage() {
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
            { label: 'EV Home Charging Cost Calculator' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              EV Energy Economics
            </span>
            <span className="text-xs font-semibold text-slate-500">Tariff Slabs &amp; Thermal Loss Modeling</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            EV Home Charging Cost Calculator — Daily, Monthly &amp; Annual Sizer
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Calculate your exact home electricity bill impact when plugging in your EV overnight. Factoring in AC-to-DC conversion losses (10-15%) and state domestic tariff slabs, compare home charging vs public DC fast charging.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <EvHomeChargingEngine />

        {/* Educational / Deep-Dive Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600">
              <Cpu className="w-4 h-4" />
              <span>Electricity Metering &amp; Grid Physics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Understanding Home EV Charging Losses &amp; Slab Leaps
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When prospective EV buyers evaluate running costs, they often multiply battery pack capacity directly by their current electricity rate. However, real-world utility bills reflect two crucial electrical engineering factors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. The Inverter Thermal Overhead</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Car on-board rectifiers convert 230V AC grid electricity into ~350V–400V DC. Conversion efficiency ranges from 86% to 90%, meaning you pull ~34 kWh from the meter to store 30 kWh in the battery cells.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. Telescopic Slab Leaps</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                An average monthly commute of 1,200 km draws ~200 additional units. If your home baseline was 250 units, your total becomes 450 units, pushing the marginal units into the costliest top DISCOM slab tier.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Dedicated EV Tariffs (LT-EV)</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Many states (e.g. Karnataka, Delhi, Maharashtra) permit a secondary domestic meter solely for EV charging under flat tariffs (₹5.00–₹6.50/unit) without pushing your household appliances into punitive tiers.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Home EV Charging Bills
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
