import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import DiscountProfitCrashEngine from '@/components/business-os/DiscountProfitCrashEngine';
import { Percent, HelpCircle, ChevronRight, Tag, ShoppingBag, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Discount Profit Crash Calculator India | Why 20% Off Kills 50% of Your Profit',
  description:
    'Calculate how discounts destroy small business profits in India. Discover why a 20% discount requires 2x to 3x more sales volume to keep the same net profit, and find smart alternatives like bundling and free gifts.',
  keywords: [
    'discount profit loss calculator India',
    'how 20 percent discount kills profit small business',
    'sales discount breakeven volume calculator India',
    'retail price cut margin erosion formula',
    'discount vs volume multiplier calculator',
    'kirana shop discount calculation India',
    'ecommerce seller discount crash simulator',
    'festive discount margin impact calculator',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/discount-profit-calculator',
  },
  openGraph: {
    title: 'Discount Profit Crash Calculator India | Why 20% Off Kills 50% of Your Profit',
    description:
      'A 20% discount does not cost 20% profit. Calculate your exact profit destruction and required sales volume jump.',
    url: 'https://Kagazo.in/business-os/discount-profit-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discount Profit Crash Calculator India | Profit Margin Erosion Tool',
    description:
      'See why 10%–20% discounts wipe out half your net profit and discover how many more units you must sell to break even.',
  },
};

const FAQS = [
  {
    question: 'Why does a 20% discount reduce my profit by 50% or more?',
    answer:
      'Your product costs (COGS), rent, staff wages, and packaging stay 100% unchanged when you offer a discount. If you sell an item for ₹1,000 that costs ₹700 to produce/procure, your normal profit is ₹300 (30% margin). If you give a 20% discount (₹200 off), your selling price drops to ₹800, but costs remain ₹700. Your new profit is only ₹100 — a massive 66.7% drop in profit from just a 20% price cut!',
  },
  {
    question: 'What is the formula to calculate the extra sales volume needed after discounting?',
    answer:
      'The formula is: Required Volume Multiplier = Original Margin % ÷ (Original Margin % − Discount %). For example, with a 30% original gross margin and a 15% discount: 30% ÷ (30% − 15%) = 30 ÷ 15 = 2.0x. This means you must sell exactly 100% more units (double the volume) just to make the same total rupee profit as before.',
  },
  {
    question: 'Why do festive Diwali/Republic Day flat discounts destroy Indian SMBs?',
    answer:
      'During festive seasons, shipping carriers increase delivery surcharges and advertising costs spike by 30%–50%. When Indian sellers simultaneously slash prices by 25%–30% to compete with giants like Amazon and Flipkart, their net margins turn negative. Without volume doubling, festive sales frequently generate high top-line turnover but massive net cash losses.',
  },
  {
    question: 'What should Indian retail and D2C brands do instead of offering cash discounts?',
    answer:
      'Instead of cutting prices: (1) Bundle slow-moving items with hero products (e.g., Buy 2 Get 1 combo), (2) Add a low-cost, high-perceived-value free gift (e.g., a sample bottle or accessory costing you ₹30 but valued at ₹200), (3) Introduce a Free Shipping threshold (e.g., Free delivery on orders above ₹999), and (4) Offer store credits or cashback valid only on future purchases.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/product-pricing-calculator', label: 'Product Pricing & Margin Calculator', icon: Tag },
  { href: '/business-os/minimum-order-calculator', label: 'Minimum Order Value (MOV) Calculator', icon: ShoppingBag },
  { href: '/business-os/break-even-calculator', label: 'Break-Even & Sales Target Finder', icon: Target },
];

export default function DiscountProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Discount Profit Crash Simulator', item: 'https://Kagazo.in/business-os/discount-profit-calculator' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Discount Profit Crash Simulator',
        url: 'https://Kagazo.in/business-os/discount-profit-calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Calculate the true profit reduction from sales discounts and determine the exact sales volume multiplier needed to break even.',
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
          { label: 'Discount Profit Crash Simulator' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          <Percent className="w-3.5 h-3.5 text-rose-600" />
          <span>Margin Protection Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Discount Profit Crash Calculator India — Why 20% Off Kills 50% of Your Profit
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Indian customers constantly ask for discounts. But when you discount, your product cost stays identical — meaning 100% of the discount comes straight out of your personal profit margin.
        </p>
      </div>

      {/* Interactive Engine */}
      <DiscountProfitCrashEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            3 Smarter Alternatives to Slashing Your Prices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How to win customers without destroying your bottom line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Product Bundles &amp; Combos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of offering 20% off a single item, create a Buy 2 Get 1 combo or a festive hamper. You increase your average order value (AOV) and absorb single shipping freight.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Free Low-Cost High-Perceived Value Gift</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Giving a complimentary tester, cosmetic pouch, or sample product costing you ₹25 feels like a ₹150 luxury bonus to the customer, saving you hundreds compared to cash discounts.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Free Shipping Threshold</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of discounting, offer &ldquo;Free Delivery on orders above ₹999&rdquo;. Customers will actively add additional items to their cart to reach the free shipping perk.
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
