import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ServiceQuoteFairnessEngine from '@/components/vehicle-os/engines/ServiceQuoteFairnessEngine';
import { Wrench, HelpCircle, ChevronRight, Receipt, Car, Disc } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Service Estimate Checker India | Audit Garage Quotes & Spot Overpriced Upsells',
  description:
    'Paste or enter your car service center estimate. Our engine audits line items against Indian benchmark pricing, spots unmandated chemical flushes & AC sanitizers, and gives you a polite WhatsApp counter-script.',
  keywords: [
    'car service estimate checker India',
    'car service quote fair price calculator',
    'Maruti service estimate price check online',
    'unnecessary car service items dealer flush scam',
    'Hyundai car service bill check online',
    'garage estimate fairness checker rupees',
    'car service labour charge calculator India',
    'engine flush ac disinfection car service scam',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/service-quote-fairness',
  },
  openGraph: {
    title: 'Car Service Estimate Checker India | Audit Garage Quotes & Spot Overpriced Upsells',
    description:
      'Is your car service estimate fair? Audit OEM and garage quotes line-by-line, detect unmandated chemical flushes, and copy a polite negotiation script.',
    url: 'https://Kagazo.in/vehicle-os/service-quote-fairness',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Service Estimate Checker India | Garage Quote Auditor',
    description:
      'Audit garage repair quotes, detect dealer upsells (AC disinfection, engine flushes), and save ₹2,000–₹4,000 on car servicing.',
  },
};

const FAQS = [
  {
    question: 'How does the Service Quote Fairness Checker detect overpriced items?',
    answer:
      'Our engine maintains benchmark price bands for OEM authorized workshops (Maruti Arena/Nexa, Hyundai, Tata Motors, Mahindra, Honda) and multi-brand garages across Indian Tier-1 and Tier-2 cities. It evaluates each line item for parts cost, standard labour book times, and flags non-mandatory chemical treatments (engine flush, throttle body spray, AC disinfectant) that are not required by manufacturer service schedules.',
  },
  {
    question: 'What are the most common unnecessary items added to car service bills in India?',
    answer:
      'Dealership service advisors often add 4 high-margin items: (1) AC vent sanitization / anti-bacterial treatment (₹1,200–₹1,800) — simple cabin air filter replacement for ₹350 is usually all you need, (2) Engine flush & oil additives (₹900–₹1,500) — modern fully synthetic oils already contain detergents; flushes can even harm older seals, (3) Throttle body cleaning when the car has zero idling issues (₹800–₹1,400), and (4) Caliper pin greasing or brake skimming when pads have plenty of life left.',
  },
  {
    question: 'How do I use the "Smart Customer" negotiation counter-script?',
    answer:
      'When the service advisor sends you the estimate on WhatsApp or calls for approval, tap "Copy WhatsApp Message". The generated script politely thanks the advisor, approves the standard mandatory periodic service items (oil, oil filter, air filter), and professionally asks to omit the specific non-mandatory add-ons with clear manufacturer references without causing confrontation.',
  },
  {
    question: 'Can I paste raw text directly from a WhatsApp service estimate?',
    answer:
      'Yes! Simply copy the text or WhatsApp message received from your service advisor and paste it into the "Quick Paste" box. The tool automatically parses item names and prices, matches them against benchmarks, and calculates your total potential savings in under 2 seconds.',
  },
];

const RELATED_TOOLS = [
  { href: '/vehicle-os/service-invoice-analyzer', label: 'Car Service Invoice Analyzer', icon: Receipt },
  { href: '/vehicle-os/cost-reality-checker', label: '5-Year True Ownership Cost Reality', icon: Car },
  { href: '/vehicle-os/tyre-replacement', label: 'Car Tyre Replacement & Health Sizer', icon: Disc },
];

export default function ServiceQuoteFairnessPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Vehicle OS', item: 'https://Kagazo.in/vehicle-os' },
          { '@type': 'ListItem', position: 3, name: 'Service Quote Fairness Checker', item: 'https://Kagazo.in/vehicle-os/service-quote-fairness' },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Audit a Car Service Estimate in India',
        description: 'Check your car service center quote for unmandated chemical add-ons and overpriced parts before approving work.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Select vehicle & workshop type', text: 'Choose your vehicle model and whether you are at an OEM authorized center or independent garage.' },
          { '@type': 'HowToStep', position: 2, name: 'Paste or enter estimate items', text: 'Paste the WhatsApp estimate text or enter items and prices one by one.' },
          { '@type': 'HowToStep', position: 3, name: 'Review fairness & flagged add-ons', text: 'Examine items flagged as above typical market rate or unmandated chemical flushes.' },
          { '@type': 'HowToStep', position: 4, name: 'Copy counter-script', text: 'Copy the polite WhatsApp negotiation response to decline unnecessary add-ons and save money.' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Car Service Estimate Fairness Checker',
        url: 'https://Kagazo.in/vehicle-os/service-quote-fairness',
        applicationCategory: 'AutomotiveApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Audit car service center quotes, spot unmandated chemical flushes, and copy polite negotiation counter-scripts in India.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Service Quote Fairness Checker' },
        ]}
      />

      {/* Tool Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            🥇 Top MVP Tool
          </span>
          <span className="text-xs font-semibold text-slate-500">Service Estimate Intelligence</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          “Is This Service Quote Fair?” — Car Service Estimate Auditor India
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Paste or enter your service center estimate. Our intelligence engine audits each line item against Indian market benchmark pricing, highlights unmandated dealer add-on chemicals, and gives you a polite, ready-to-copy WhatsApp counter-script.
        </p>
      </div>

      {/* Interactive Engine */}
      <ServiceQuoteFairnessEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 3 Golden Rules Before Approving Any Car Service Estimate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How educated Indian car owners save ₹2,500 to ₹5,000 on every routine service visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Cross-Check the Owner&apos;s Manual</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open your car&apos;s glovebox manual to the Periodic Maintenance Schedule table. If &ldquo;engine flush&rdquo;, &ldquo;injector cleaning&rdquo;, or &ldquo;AC duct disinfection&rdquo; isn&apos;t explicitly listed for your mileage, it is a dealer upsell and 100% optional.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Reject Chemical Treatments Politely</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dealership service advisors earn commission incentives on chemical products. A simple message: &ldquo;Please perform only standard mandatory maintenance as per manual and omit all flushes and additives&rdquo; is universally respected.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Ask for Replaced Old Parts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always request the workshop to place all replaced parts (old filters, spark plugs, brake pads) in a box in your car&apos;s boot. This simple request ensures that invoiced parts were genuinely replaced.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-4">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <span className="text-amber-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Related Vehicle OS Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RELATED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-amber-400 rounded-2xl transition-all group shadow-xs">
                <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 leading-tight">{tool.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
