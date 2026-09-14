import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import WhatsAppOrderEngine from '@/components/business-os/WhatsAppOrderEngine';
import { ShoppingBag, HelpCircle, ChevronRight, Truck, Smartphone, ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WhatsApp & DM Order Manager India | Track COD vs Prepaid & Live Profit Per Order',
  description:
    'Free WhatsApp and Instagram DM order management tool for Indian D2C sellers and social commerce brands. Log customer orders, track COD remittances, shipping costs, and see live net profit per order.',
  keywords: [
    'WhatsApp order tracking small business India',
    'DM order log profit calculator',
    'Instagram order manager excel alternative India',
    'COD vs prepaid order tracker small business',
    'chat commerce order manager India free',
    'D2C social seller order log sheet',
    'courier remittance and profit tracker India',
    'free small business order management tool',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/order-manager',
  },
  openGraph: {
    title: 'WhatsApp & DM Order Manager India | Track COD vs Prepaid & Live Profit Per Order',
    description:
      'Track orders from Instagram DMs and WhatsApp with automatic COGS, shipping deduction, COD status, and live net profit calculations.',
    url: 'https://Kagazo.in/business-os/order-manager',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp & DM Order Manager India | Social Commerce Profit Tracker',
    description:
      'Log customer chat orders, monitor fulfillment status, and calculate live net profit per parcel in your browser.',
  },
};

const FAQS = [
  {
    question: 'Why shouldn’t I manage my WhatsApp/Instagram orders in a paper notebook?',
    answer:
      'Paper notebooks make it impossible to calculate real-time profit margins, track unpaid Cash on Delivery (COD) balances, or identify courier shipping subsidies. When customer volumes grow past 5 orders a day, paper records lead to missed dispatch deadlines, duplicate shipments, and lost profits from uncollected courier remittances.',
  },
  {
    question: 'How do I track COD remittance delays from couriers like Shiprocket and Delhivery?',
    answer:
      'Couriers typically remit COD collections into your bank account 3 to 7 business days after successful delivery, charging an early-remittance fee if you need cash sooner. By logging COD orders separately with clear pending/remitted status, you ensure that no parcel delivered to a customer slips through without cash hitting your bank.',
  },
  {
    question: 'Why does charging flat ₹50 shipping secretly kill margins for Indian D2C brands?',
    answer:
      'Courier aggregators (Shiprocket, Delhivery, Shadowfax) bill based on volumetric weight (500g slab) and regional delivery zones (Zone A local vs Zone E North-East). While local delivery might cost ₹45, delivering to another state frequently costs ₹85 to ₹120. If you charge a flat ₹50, you are subsidizing out-of-state customers by ₹35 to ₹70 per order directly from your personal profit.',
  },
  {
    question: 'Is my customer data safe and private when using this order manager?',
    answer:
      'Yes, 100% private. Unlike centralized cloud apps that store customer phone numbers, addresses, and sales metrics on their databases, Kagazo executes and persists your order log locally inside your browser’s localStorage. No third party or external server can view your customer data.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/delivery-profit-calculator', label: 'COD & RTO Loss Calculator', icon: Truck },
  { href: '/business-os/quote-generator', label: 'Free WhatsApp Quotation Maker', icon: Smartphone },
  { href: '/business-os/minimum-order-calculator', label: 'Minimum Order Value (MOV) Calculator', icon: ShoppingCart },
];

export default function OrderManagerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'WhatsApp & DM Order Manager', item: 'https://Kagazo.in/business-os/order-manager' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'WhatsApp Business Order & Profit Manager',
        url: 'https://Kagazo.in/business-os/order-manager',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Log customer chat orders, track fulfillment status, manage COD collections, and calculate live gross profit per order in India.',
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
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'WhatsApp Business Order Manager' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
          <span>Chat Commerce Operational Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          WhatsApp &amp; DM Order Manager India — Track COD vs Prepaid &amp; Live Profit
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Ditch messy paper notebooks and clunky spreadsheets. Log every customer order in seconds, track fulfillment from packed to delivered, and monitor your exact net profit after product costs and courier shipping.
        </p>
      </div>

      {/* Interactive Engine */}
      <WhatsAppOrderEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 3 Pitfalls of Selling on Instagram &amp; WhatsApp DMs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How growing social sellers accidentally lose money without realizing it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Untracked COD Receivables</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When selling via Cash on Delivery, your courier takes 3–7 days after delivery to remit money into your bank account. Keeping an active log prevents courier remittance delays from draining your working capital.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Hidden Shipping Subsidies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Charging customers ₹50 for shipping when Delhivery or BlueDart actually bills you ₹85 eats ₹35 out of your margin on every parcel. Real-time profit tracking highlights undercharged shipping instantly.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. In-Browser Privacy Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike cloud apps that store your customer phone numbers and sales data on remote servers, Kagazo saves your active session securely in your own browser with zero third-party data tracking.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-4">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Related Business OS Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RELATED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl transition-all group shadow-xs">
                <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 leading-tight">{tool.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
