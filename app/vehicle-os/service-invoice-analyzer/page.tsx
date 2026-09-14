import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ServiceInvoiceAnalyzerEngine from '@/components/vehicle-os/engines/ServiceInvoiceAnalyzerEngine';
import { Receipt, HelpCircle, ChevronRight, Wrench, Car, Gauge } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Service Invoice Analyzer India | Deconstruct Parts, Labour & GST Taxes',
  description:
    'Deconstruct completed garage invoices into OEM parts, labour charges, and 18% GST. Compare against prior service history to detect unexpected cost inflation and calculate your real maintenance cost per kilometer.',
  keywords: [
    'car service invoice analyzer India',
    'break down car service bill parts vs labour GST',
    'car service invoice audit online',
    'dealership service bill inflated consumables',
    'periodic maintenance service bill breakdown',
    'car maintenance cost per km calculator',
    'GST on car service bill India 18 percent',
    'how to read car service bill India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/service-invoice-analyzer',
  },
  openGraph: {
    title: 'Car Service Invoice Analyzer India | Deconstruct Parts, Labour & GST Taxes',
    description:
      'Analyze your completed car service bill into Parts, Labour, and Taxes. Detect cost inflation compared to your previous service.',
    url: 'https://Kagazo.in/vehicle-os/service-invoice-analyzer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Service Invoice Analyzer India | Parts vs Labour & GST Breakdown',
    description:
      'Upload or enter your car service bill to deconstruct parts vs labour ratios and spot unexpected price hikes.',
  },
};

const FAQS = [
  {
    question: 'What is a normal ratio of parts cost vs labour cost in Indian car servicing?',
    answer:
      'For a standard minor periodic service (10k, 20k, 30k km) at an authorized center, parts (engine oil, filters, washers) typically make up 60%–70% of the pre-tax bill, with labour accounting for 30%–40%. If your labour charge exceeds 45% of the total bill without major mechanical component overhauls, your workshop is likely billing excessive diagnostic or discretionary inspection fees.',
  },
  {
    question: 'Why is GST on car servicing in India charged at 18% or 28%?',
    answer:
      'In India, automotive labour and service jobs attract 18% GST. Most standard replacement spare parts also attract 18% GST, though specific high-tax assemblies and accessories may attract 28% GST. Because tax is calculated on top of both parts and labour, GST alone adds ₹1,500 to ₹3,000 to an average ₹10,000 service invoice.',
  },
  {
    question: 'How do I calculate my maintenance cost per kilometer from my service invoice?',
    answer:
      'Divide the total post-tax invoice amount by the number of kilometers driven since your previous service. For example: if your 40,000 km service cost ₹9,800 and you drove 10,000 km since the 30,000 km service: Maintenance Cost/km = ₹9,800 ÷ 10,000 km = ₹0.98/km. For Indian hatchbacks and compact SUVs, routine scheduled maintenance should average ₹0.80 to ₹1.30 per km.',
  },
  {
    question: 'What should I check on my invoice after collecting my car from the workshop?',
    answer:
      '(1) Ensure parts part numbers match the manufacturer standard catalog, (2) Verify that no unapproved line items were added after the preliminary estimate, (3) Confirm that free service coupons or discount promises were accurately deducted, and (4) Check that the next service due sticker on your windshield matches the manual mileage schedule.',
  },
];

const RELATED_TOOLS = [
  { href: '/vehicle-os/service-quote-fairness', label: 'Car Service Quote Fairness Checker', icon: Wrench },
  { href: '/vehicle-os/cost-reality-checker', label: '5-Year True Ownership Cost Reality', icon: Car },
  { href: '/vehicle-os/mileage-anomaly-tracker', label: 'Mileage Anomaly & Fuel Drop Detector', icon: Gauge },
];

export default function ServiceInvoiceAnalyzerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Vehicle OS', item: 'https://Kagazo.in/vehicle-os' },
          { '@type': 'ListItem', position: 3, name: 'Service Invoice Analyzer', item: 'https://Kagazo.in/vehicle-os/service-invoice-analyzer' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Car Service Invoice Analyzer',
        url: 'https://Kagazo.in/vehicle-os/service-invoice-analyzer',
        applicationCategory: 'AutomotiveApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Deconstruct completed garage invoices into Parts, Labour, and Taxes, and detect cost inflation in India.',
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
          { label: 'Service Invoice Line-Item Auditor' },
        ]}
      />

      {/* Page Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black uppercase tracking-wider">
            🥈 Top MVP Tool
          </span>
          <span className="text-xs font-semibold text-slate-500">Service Invoice &amp; Cost-Driver Auditor</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Car Service Invoice Analyzer India — Deconstruct Parts, Labour &amp; GST
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Deconstruct completed garage invoices into Parts, Labour, and Taxes. Compare against your previous service bill to identify exactly which replacement item drove your cost increase.
        </p>
      </div>

      {/* Interactive Engine */}
      <ServiceInvoiceAnalyzerEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Deconstructing an Indian Car Service Bill: Parts vs Labour vs GST
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding the three distinct buckets that make up your garage payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. OEM Parts &amp; Consumables</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Includes engine oil, oil filter, air cleaner element, and brake pads. Always check that the oil grade (e.g., 0W-20 or 5W-30) billed matches your vehicle manufacturer handbook.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Flat-Rate Labour Units (FRUs)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automakers publish standardized time allowances for each repair task. Authorized workshops cannot legally charge you 3 hours of labour for a brake pad replacement that has a 0.8-hour FRU benchmark.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. 18% Statutory GST</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Service centres split GST into 9% CGST (Central) and 9% SGST (State). Verify that your GST invoice includes the workshop&apos;s valid 15-digit GSTIN number to ensure tax compliance.
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
