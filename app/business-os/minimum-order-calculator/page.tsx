import { Metadata } from 'next';
import MinimumOrderValueEngine from '@/components/business-os/MinimumOrderValueEngine';
import { Truck, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Minimum Order Value (MOV) & Free Delivery Sizer for D2C Brands | VeriSeal',
  description:
    'Calculate the exact Minimum Order Value (MOV) threshold required for profitable free shipping. Avoid bleeding money on small ₹299 cart sizes in India.',
  keywords: [
    'minimum order value calculator ecommerce',
    'how to set free shipping threshold d2c india',
    'mov calculator small business',
    'profitable free delivery cart size formula',
    'ecommerce basket size optimizer',
  ],
  openGraph: {
    title: 'Minimum Order Value (MOV) & Free Delivery Sizer for D2C Brands',
    description:
      'Avoid shipping orders that lose money. Calculate your profitable free delivery threshold.',
    url: 'https://veriseal.org/business-os/minimum-order-calculator',
  },
};

export default function MinimumOrderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Minimum Order Value (MOV) & Free Delivery Sizer',
    url: 'https://veriseal.org/business-os/minimum-order-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculates break-even and profitable minimum cart value thresholds for e-commerce free shipping policies.',
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Fulfillment Threshold Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Minimum Order Value &amp; Free Shipping Sizer
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
    </div>
  );
}
