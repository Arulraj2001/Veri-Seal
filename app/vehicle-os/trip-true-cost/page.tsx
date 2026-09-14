import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TripTrueCostEngine } from '@/components/vehicle-os/engines/TripTrueCostEngine';
import {
  MapPin,
  Fuel,
  CreditCard,
  Car,
  Users,
  Train,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Highway Trip Cost Calculator India | Fuel, FASTag Tolls & Split Sizer | Kagazo',
  description:
    'Calculate the true cost of an Indian highway road trip. Deconstruct fuel burn, FASTag expressway tolls, parking, and vehicle wear-and-tear against Vande Bharat / AC train tickets.',
  keywords: [
    'trip cost calculator india highway',
    'road trip fuel and toll calculator india',
    'delhi to jaipur road trip cost fuel toll',
    'bangalore to chennai car vs train cost',
    'mumbai to goa road trip cost calculator',
    'fastag toll calculator for road trip',
    'car trip expense split calculator per person',
    'car vs train ticket price comparison india',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/trip-true-cost',
  },
  openGraph: {
    title: 'Trip True Cost & Split Calculator | Kagazo Vehicle OS',
    description:
      'Plan your next outstation road trip. Calculate complete door-to-door expenses including fuel, expressway tolls, wear amortization, and per-head splits.',
    url: 'https://Kagazo.in/vehicle-os/trip-true-cost',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Highway Road Trip Cost & Split Calculator India | Kagazo',
    description:
      'Fuel + FASTag + Wear + Tolls: Calculate the true cost per person for any Indian highway drive.',
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
      name: 'Trip True Cost & Split Calculator',
      item: 'https://Kagazo.in/vehicle-os/trip-true-cost',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Trip True-Cost & Split Calculator',
  url: 'https://Kagazo.in/vehicle-os/trip-true-cost',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Comprehensive highway travel budgeting engine calculating fuel, FASTag tolls, vehicle wear amortization, and per-person cost parity against railway transit.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why should I include wear-and-tear depreciation in road trip calculations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every highway kilometer consumes tyre rubber (~₹0.70/km for a set of 4 tyres), engine oil and brake pads (~₹0.90/km), and accelerates general vehicle depreciation (~₹1.60/km). Omitting this ₹3.20/km hidden operational cost artificially understates your true out-of-pocket expenditure.',
      },
    },
    {
      '@type': 'Question',
      name: 'At what passenger count does driving a personal car become cheaper than train travel in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For distances between 300 km and 500 km (e.g., Bengaluru–Chennai, Mumbai–Pune, Delhi–Jaipur), driving a petrol car is usually more expensive for solo or 2 passengers compared to AC train or luxury bus seats. However, at 3 or more passengers, the combined train ticket cost exceeds car fuel and FASTag tolls, making driving significantly cheaper.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do FASTag expressway tolls impact modern Indian highway travel costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modern access-controlled expressways (such as the Delhi-Mumbai Expressway, Samruddhi Mahamarg, or Bengaluru-Mysuru Expressway) charge between ₹1.80 and ₹2.40 per kilometer in statutory FASTag tolls. For a 300 km journey, tolls often add ₹550 to ₹750, equaling 25% to 35% of your total fuel bill.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should friends fairly split road trip vehicle expenses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fair road trip splits should combine fuel receipts and FASTag toll deductions equally among all passengers. If using a personal vehicle for an extensive journey (over 1,000 km), it is standard etiquette for friends to cover all tolls and parking or chip in a ₹1.50/km maintenance allowance so the vehicle owner does not shoulder 100% of tyre and servicing wear.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'Why should I include wear-and-tear depreciation in road trip calculations?',
    a: 'Every highway kilometer consumes tyre rubber (~₹0.70/km for a set of 4 tyres), engine oil and brake pads (~₹0.90/km), and accelerates general vehicle depreciation (~₹1.60/km). Omitting this ₹3.20/km hidden operational cost artificially understates your true out-of-pocket expenditure.',
  },
  {
    q: 'At what passenger count does driving a personal car become cheaper than train travel in India?',
    a: 'For distances between 300 km and 500 km (e.g., Bengaluru–Chennai, Mumbai–Pune, Delhi–Jaipur), driving a petrol car is usually more expensive for solo or 2 passengers compared to AC train or luxury bus seats. However, at 3 or more passengers, the combined train ticket cost exceeds car fuel and FASTag tolls, making driving significantly cheaper.',
  },
  {
    q: 'How do FASTag expressway tolls impact modern Indian highway travel costs?',
    a: 'Modern access-controlled expressways (such as the Delhi-Mumbai Expressway, Samruddhi Mahamarg, or Bengaluru-Mysuru Expressway) charge between ₹1.80 and ₹2.40 per kilometer in statutory FASTag tolls. For a 300 km journey, tolls often add ₹550 to ₹750, equaling 25% to 35% of your total fuel bill.',
  },
  {
    q: 'How should friends fairly split road trip vehicle expenses?',
    a: 'Fair road trip splits should combine fuel receipts and FASTag toll deductions equally among all passengers. If using a personal vehicle for an extensive journey (over 1,000 km), it is standard etiquette for friends to cover all tolls and parking or chip in a ₹1.50/km maintenance allowance so the vehicle owner does not shoulder 100% of tyre and servicing wear.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Mileage Anomaly Tracker',
    description: 'Monitor whether your highway driving fuel economy matches your car’s official ARAI rating.',
    href: '/vehicle-os/mileage-anomaly-tracker',
    badge: 'Efficiency Audit',
  },
  {
    title: 'Tyre Replacement Predictor',
    description: 'Check tyre wear and safety ratings before embarking on high-speed expressway road trips.',
    href: '/vehicle-os/tyre-replacement',
    badge: 'Tyre Safety',
  },
  {
    title: 'Own vs Cab Decision Sizer',
    description: 'Compare daily city driving costs against on-demand taxi hailing and intercity rental services.',
    href: '/vehicle-os/own-vs-cab',
    badge: 'Cab Comparison',
  },
];

export default function TripTrueCostPage() {
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
            { label: 'Trip True Cost & Split Calculator' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              Travel Planning
            </span>
            <span className="text-xs font-semibold text-slate-500">Full Highway Cost Deconstruction</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trip True-Cost Calculator — Fuel, Tolls, Wear &amp; Transit Compare
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            A highway road trip costs far more than fuel alone. Calculate your actual trip outgo—including FASTag tolls, destination parking, and vehicle depreciation wear—and compare it against train or bus tickets for your family.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <TripTrueCostEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Compass className="w-4 h-4" />
              <span>Highway Travel Economics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Understanding Highway Cost Dynamics: Speed vs Consumption
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Aerodynamic drag increases with the square of speed. Driving at 120 km/h on expressways increases fuel burn by 25% to 30% compared to cruising at 85–90 km/h. Keep these factors in mind when planning long-distance travel:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. The 90 km/h Sweet Spot</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most passenger cars achieve maximum thermodynamic efficiency between 80 and 95 km/h in top overdrive gear, delivering 17–21 km/L vs 12–14 km/L at triple-digit speeds.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. FASTag Auto-Debit Reserves</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensure your FASTag wallet has at least ₹1,000 balance prior to highway entry to prevent blacklisting at boom barriers and paying double penalty cash tariffs.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Door-to-Door Last Mile</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                While train tickets look cheap, booking local autos or cabs to and from railway stations in tier-1/tier-2 destinations often adds ₹800–₹1,500 in hidden transit friction.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Highway Trip Costs
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
            <span>Explore Related Road Trip &amp; Mobility Tools</span>
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
