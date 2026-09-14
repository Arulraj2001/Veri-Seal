import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import MinimumOrderValueEngine from '@/components/business-os/MinimumOrderValueEngine';
import { Truck, HelpCircle, ChevronRight, Tag, Percent, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Minimum Order Value (MOV) Calculator India | Profitable Free Delivery Threshold',
  description:
    'Free Minimum Order Value (MOV) calculator for Indian e-commerce and D2C brands. Calculate the exact basket size required to offer free shipping profitably after absorbing Shiprocket/Delhivery courier freight and packaging costs.',
  keywords: [
    'minimum order value calculator India free shipping',
    'MOV free delivery threshold calculator',
    'how to calculate minimum order value D2C India',
    'free shipping threshold calculator rupees',
    'ecommerce cart size optimizer India',
    'profitable free delivery threshold formula',
    'Shiprocket Delhivery courier margin calculator',
    'average order value AOV booster calculator',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/minimum-order-calculator',
  },
  openGraph: {
    title: 'Minimum Order Value (MOV) Calculator India | Profitable Free Delivery Threshold',
    description:
      'Avoid shipping orders that lose money. Calculate your profitable free delivery cart threshold after courier freight and packaging.',
    url: 'https://Kagazo.in/business-os/minimum-order-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minimum Order Value (MOV) Calculator India | D2C Free Shipping Sizer',
    description:
      'Determine the exact basket size required to offer free delivery profitably in India without subsidizing courier charges.',
  },
};

const FAQS = [
  {
    question: 'What is Minimum Order Value (MOV) and why is it crucial for Indian D2C brands?',
    answer:
      'Minimum Order Value (MOV) is the lowest cart total a customer must reach before qualifying for free shipping or special discounts. In India, where courier shipping costs ₹60 to ₹120 per parcel regardless of product value, fulfilling small orders (e.g., ₹299) wipes out your entire product margin. Setting an accurate MOV guarantees that every single dispatched parcel generates positive cash flow.',
  },
  {
    question: 'How does offering "Free Shipping on All Orders" cause losses on small cart sizes?',
    answer:
      'If you sell an item for ₹349 with a 50% gross product margin, your gross margin is ₹175. However, if courier shipping costs ₹75, packaging costs ₹30, and payment gateway fees cost ₹8, your fulfillment costs total ₹113. If you run paid Facebook/Instagram ads costing ₹100 per customer acquisition, you are losing ₹38 on every single ₹349 sale!',
  },
  {
    question: 'What is the formula to calculate a profitable free shipping threshold in India?',
    answer:
      'The formula is: Profitable MOV = (Courier Shipping Cost + Packaging Cost) ÷ (Gross Margin % − Desired Net Margin %). For example, if shipping + packaging is ₹100, your gross margin is 50%, and your target net margin is 20%: MOV = ₹100 ÷ (0.50 − 0.20) = ₹100 ÷ 0.30 = ₹333 minimum basket size to protect your 20% profit margin.',
  },
  {
    question: 'How do I encourage shoppers to add extra items to reach my free delivery threshold?',
    answer:
      '(1) Display a dynamic cart progress bar ("Add ₹140 more to unlock Free Delivery!"), (2) Offer low-cost impulse add-ons near the checkout button (e.g., ₹99 socks, keychains, or travel-size cosmetics), (3) Create curated bundles that naturally sit 10% above your threshold (e.g., ₹1,099 combo when free delivery is ₹999), and (4) Charge a flat ₹79 delivery fee for carts below the threshold.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/delivery-profit-calculator', label: 'COD & RTO Delivery Profit Calculator', icon: Truck },
  { href: '/business-os/product-pricing-calculator', label: 'Product Pricing & Margin Calculator', icon: Tag },
  { href: '/business-os/discount-profit-calculator', label: 'Discount Profit Crash Calculator', icon: Percent },
];

export default function MinimumOrderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Minimum Order Value Sizer', item: 'https://Kagazo.in/business-os/minimum-order-calculator' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Minimum Order Value (MOV) & Free Delivery Sizer',
        url: 'https://Kagazo.in/business-os/minimum-order-calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Calculates break-even and profitable minimum cart value thresholds for e-commerce free shipping policies in India.',
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
          { label: 'Minimum Order Value (MOV) Sizer' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Fulfillment Threshold Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Minimum Order Value (MOV) Calculator India — Profitable Free Delivery Threshold
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Offering &ldquo;Free Delivery on All Orders&rdquo; sounds attractive to shoppers, but fulfilling a ₹299 parcel with ₹70 courier freight and ₹35 packaging guarantees an operational loss. Calculate your exact profitable cart threshold.
        </p>
      </div>

      {/* Interactive Engine */}
      <MinimumOrderValueEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            How to Nudge Shoppers to Hit Your Free Shipping Target
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tactics top Indian direct-to-consumer brands use to elevate average cart values by 35%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. The Cart Progress Bar</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Show a visual bar: &ldquo;Add ₹140 more to unlock Free Delivery!&rdquo;. Shoppers hate paying a ₹80 shipping fee and will enthusiastically add an accessory or add-on product to bridge the gap.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Pre-Packaged Bundles</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never sell individual low-ticket items alone. Instead of selling a single jar of body scrub for ₹340, create a 3-piece pamper bundle for ₹899 that naturally clears your free delivery threshold.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Flat Shipping Below Threshold</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If a customer insists on buying a single low-value item, charge a flat ₹79 standard courier fee. This preserves your unit margin while ensuring you never pay for their parcel out of your own pocket.
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
