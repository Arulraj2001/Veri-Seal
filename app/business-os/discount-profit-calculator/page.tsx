import { Metadata } from 'next';
import DiscountProfitCrashEngine from '@/components/business-os/DiscountProfitCrashEngine';
import { Percent, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Discount Profit Crash Simulator | How Discounts Kill SMB Margins | VeriSeal',
  description:
    'Simulate how price discounts slash your net profits. Discover why a 20% discount requires selling 2x to 3x more units just to take home the same income.',
  keywords: [
    'discount profit margin calculator',
    'how discounts affect profit small business',
    'sales discount breakeven volume calculator',
    'price cut vs volume increase formula',
    'retail discount margin erosion tool',
  ],
  openGraph: {
    title: 'Discount Profit Crash Simulator | How Discounts Kill SMB Margins',
    description:
      'A 20% discount does not cost 20% profit. Calculate your exact profit destruction and required volume jump.',
    url: 'https://veriseal.org/business-os/discount-profit-calculator',
  },
};

export default function DiscountProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Discount Profit Crash Simulator',
    url: 'https://veriseal.org/business-os/discount-profit-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculate the true profit reduction from sales discounts and determine the exact sales volume multiplier needed to break even.',
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          <Percent className="w-3.5 h-3.5 text-rose-600" />
          <span>Margin Protection Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Discount Profit Crash Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Indian customers constantly ask for discounts. But when you discount, your product cost stays identical—meaning 100% of the discount comes straight out of your personal profit margin.
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
    </div>
  );
}
