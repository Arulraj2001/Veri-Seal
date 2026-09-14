import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BikeVsScooterEngine } from '@/components/vehicle-os/engines/BikeVsScooterEngine';
import {
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Coins,
  Fuel,
  HelpCircle,
  Bike,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bike vs Scooter Decision Tool India | Splendor vs Activa Mileage & Maintenance | Kagazo',
  description:
    'Should you buy a commuter motorcycle (Hero Splendor / Honda Shine) or a gearless scooter (Activa / Jupiter)? Compare monthly petrol costs, boot utility, spine ergonomics, and tyre life.',
  keywords: [
    'bike vs scooter comparison india',
    'activa vs splendor mileage and maintenance',
    'should i buy bike or scooter for daily office commute',
    'scooter vs motorcycle fuel economy difference india',
    'jupiter vs shine monthly running cost',
    'gearless scooter boot space vs bike mileage',
    'best 2 wheeler for bad roads and back pain india',
    'bike vs scooter total cost of ownership 5 years',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/bike-vs-scooter',
  },
  openGraph: {
    title: 'Bike vs Scooter Decision Engine | Kagazo Vehicle OS',
    description:
      'Compare commuter motorcycles against gearless scooters on mileage, storage utility, family usability, and monthly running costs.',
    url: 'https://Kagazo.in/vehicle-os/bike-vs-scooter',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bike vs Scooter Decision Tool India | Kagazo',
    description:
      'Commuter bike or automatic scooter? See your real fuel savings vs boot storage convenience.',
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
      name: 'Bike vs Scooter Decision Tool',
      item: 'https://Kagazo.in/vehicle-os/bike-vs-scooter',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Bike vs Scooter Decision Tool',
  url: 'https://Kagazo.in/vehicle-os/bike-vs-scooter',
  applicationCategory: 'DecisionApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Indian 2-wheeler selection engine evaluating commuter motorcycles against automatic scooters across fuel burn, cargo capacity, and road ergonomics.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the real-world fuel mileage difference between a commuter bike and an automatic scooter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 100cc–125cc commuter motorcycle (Hero Splendor, Honda Shine) delivers 60 to 65 km/L in stop-and-go city traffic due to larger 18-inch wheels and a direct geared manual transmission. A 110cc–125cc automatic scooter (Honda Activa, TVS Jupiter) delivers 45 to 50 km/L due to frictional rubber belt CVT slip. For a 35 km daily commute, the bike saves ~₹550 to ₹750 in petrol every month (₹7,000–₹9,000 annually).',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better for spine health and bad Indian road potholes: bike or scooter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Motorcycles are significantly better for back pain and spinal health. Commuter bikes feature large 17- or 18-inch wheels and longer suspension travel that absorb crater potholes smoothly. Scooters feature small 10- or 12-inch wheels and short-travel rear mono-shocks where road impacts transmit directly upward through the rider’s upright lumbar spine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do urban Indian families overwhelmingly prefer automatic scooters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scooters offer multi-user family versatility: clutchless twist-and-go operation allows anyone in the family to ride effortlessly, while the 18–22 litre under-seat boot and flat front footboard easily transport full-face helmets, office laptop bags, LPG cylinders, and weekly household grocery bags.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are maintenance and tyre replacement costs similar between bikes and scooters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Periodic servicing costs are virtually identical (₹1,400 to ₹1,800/year for engine oil, air filter, and spark plug cleaning). However, scooter CVT drive belts require inspection/replacement every 20,000 km (~₹800), whereas motorcycle final drive chain sprockets last 25,000–30,000 km (~₹1,200). Tyre sets for both segments cost between ₹3,000 and ₹4,000 per pair.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'What is the real-world fuel mileage difference between a commuter bike and an automatic scooter?',
    a: 'A 100cc–125cc commuter motorcycle (Hero Splendor, Honda Shine) delivers 60 to 65 km/L in stop-and-go city traffic due to larger 18-inch wheels and a direct geared manual transmission. A 110cc–125cc automatic scooter (Honda Activa, TVS Jupiter) delivers 45 to 50 km/L due to frictional rubber belt CVT slip. For a 35 km daily commute, the bike saves ~₹550 to ₹750 in petrol every month (₹7,000–₹9,000 annually).',
  },
  {
    q: 'Which is better for spine health and bad Indian road potholes: bike or scooter?',
    a: 'Motorcycles are significantly better for back pain and spinal health. Commuter bikes feature large 17- or 18-inch wheels and longer suspension travel that absorb crater potholes smoothly. Scooters feature small 10- or 12-inch wheels and short-travel rear mono-shocks where road impacts transmit directly upward through the rider’s upright lumbar spine.',
  },
  {
    q: 'Why do urban Indian families overwhelmingly prefer automatic scooters?',
    a: 'Scooters offer multi-user family versatility: clutchless twist-and-go operation allows anyone in the family to ride effortlessly, while the 18–22 litre under-seat boot and flat front footboard easily transport full-face helmets, office laptop bags, LPG cylinders, and weekly household grocery bags.',
  },
  {
    q: 'Are maintenance and tyre replacement costs similar between bikes and scooters?',
    a: 'Periodic servicing costs are virtually identical (₹1,400 to ₹1,800/year for engine oil, air filter, and spark plug cleaning). However, scooter CVT drive belts require inspection/replacement every 20,000 km (~₹800), whereas motorcycle final drive chain sprockets last 25,000–30,000 km (~₹1,200). Tyre sets for both segments cost between ₹3,000 and ₹4,000 per pair.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'EV vs Petrol Calculator',
    description: 'Compare electric two-wheelers (Ather, Ola, TVS iQube) against petrol Activa on running costs.',
    href: '/vehicle-os/ev-vs-petrol',
    badge: 'Electric 2W',
  },
  {
    title: 'Cost Reality Checker (TCO)',
    description: 'Model the 5-year total ownership cost including insurance, tyres, and resale recovery.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Sizer',
  },
  {
    title: 'Tyre Replacement Predictor',
    description: 'Check tyre tread wear depth and replacement schedules for 2-wheeler tyres.',
    href: '/vehicle-os/tyre-replacement',
    badge: 'Tyre Health',
  },
];

export default function BikeVsScooterPage() {
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
            { label: 'Bike vs Scooter Decision Tool' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              India 2-Wheeler Decision
            </span>
            <span className="text-xs font-semibold text-slate-500">Commuter Motorcycle vs Gearless Scooter</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bike vs Scooter Decision Tool — What Should You Buy?
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            The most common vehicle purchase dilemma in Indian households: Hero Splendor / Honda Shine vs Honda Activa / TVS Jupiter. Compare fuel economy, boot utility, tyre replacement costs, and highway ride comfort tailored to your daily commute.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <BikeVsScooterEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Bike className="w-4 h-4" />
              <span>Two-Wheeler Dynamics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              The 3 Deciding Trade-offs: Commuter Motorcycle vs Automatic Scooter
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Choosing between India's top two personal mobility formats comes down to weighing daily convenience against long-distance fuel efficiency:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Clutch Fatigue vs CVT Ease</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                In bumper-to-bumper city traffic, pulling a motorcycle clutch lever 400 times per hour causes wrist strain. Scooters eliminate clutch and gear changing entirely.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. Fuel Burn Advantage</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your round-trip commute exceeds 45 km daily, a motorcycle's 62 km/L efficiency saves ₹9,000+ per year in petrol over a scooter's 48 km/L CVT transmission.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Weather &amp; Luggage Protection</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scooters feature waterproof under-seat storage to protect laptops during monsoon showers, along with front leg shields preventing road mud splashes on trousers.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Bike vs Scooter
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
            <span>Explore Related Two-Wheeler &amp; Commute Tools</span>
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
