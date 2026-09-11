import { Metadata } from 'next';
import ProductPricingEngine from '@/components/business-os/ProductPricingEngine';
import { Tag, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Indian Marketplace Product Pricing Calculator | Amazon, Flipkart, Meesho | VeriSeal',
  description:
    'Free product pricing calculator for Indian sellers. Reverse-engineers your selling price with authentic Amazon India, Flipkart, Meesho, and Shopify fee slabs, closing fees, and GST.',
  keywords: [
    'amazon india seller pricing calculator',
    'flipkart seller fee calculator',
    'meesho seller price calculator',
    'how to price products ecommerce india',
    'shopify direct pricing profit margin calculator',
  ],
  openGraph: {
    title: 'Indian Marketplace Product Pricing Calculator | Amazon, Flipkart, Meesho',
    description:
      'Reverse-engineer your exact selling price to guarantee your desired net profit after platform cuts and courier fees.',
    url: 'https://veriseal.org/business-os/product-pricing-calculator',
  },
};

export default function ProductPricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Indian Marketplace Product Pricing Calculator',
    url: 'https://veriseal.org/business-os/product-pricing-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Reverse-engineers e-commerce selling prices with Indian marketplace referral fees, closing fees, and payment gateway charges.',
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Tag className="w-3.5 h-3.5 text-amber-600" />
          <span>Multi-Channel Pricing Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Product Pricing Calculator with Marketplace Slabs
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Never lose money on e-commerce sales again. Input your product cost, packaging, shipping, and desired profit in rupees—our algorithm reverse-calculates the exact selling price needed after platform referral cuts and closing fees.
        </p>
      </div>

      {/* Interactive Engine */}
      <ProductPricingEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            How Platform Fee Structures Work in India
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comparing take-home margins across Amazon, Flipkart, Meesho, and Direct Selling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Amazon &amp; Flipkart</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Charge category referral fees (8% to 18%) plus fixed closing fees (₹15 to ₹45 per order) based on the price slab. In addition, 18% GST is levied on the marketplace fees themselves.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Meesho (0% Commission)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meesho charges 0% commission to sellers, but freight shipping and return penalties are strictly passed through. You must calibrate your base price so return freight doesn&apos;t erase margins.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Shopify &amp; WhatsApp Direct</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct selling avoids the 15% marketplace commission entirely. You only pay a 2% payment gateway fee (Razorpay/Cashfree) and direct shipping, leaving maximum profit in your own bank account.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
