import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import DeliveryProfitEngine from '@/components/business-os/DeliveryProfitEngine';
import { Truck, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'E-Commerce Courier Delivery & RTO Profit Sizer | Kagazo',
  description:
    'Free COD return and courier profit calculator for Indian D2C and Instagram sellers. Calculate the hidden RTO tax per delivered order and protect e-commerce margins.',
  keywords: [
    'ecommerce delivery profit calculator india',
    'rto cost calculator cod orders',
    'how to calculate return to origin loss',
    'courier shipping margin calculator 500g',
    'delhivery shiprocket delivery profit formula',
  ],
  openGraph: {
    title: 'E-Commerce Courier Delivery & RTO Profit Sizer',
    description:
      'Cash on Delivery (COD) returns can wipe out small brand margins. Calculate your true net profit after absorbing courier RTO losses.',
    url: 'https://Kagazo.org/business-os/delivery-profit-calculator',
  },
};

export default function DeliveryProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'E-Commerce Courier Delivery & RTO Profit Sizer',
    url: 'https://Kagazo.org/business-os/delivery-profit-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculates net profit per delivered e-commerce order after factoring forward shipping, return reverse courier fees, and COD RTO failure rates.',
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Delivery & RTO Profit Sizer' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-indigo-600" />
          <span>E-Commerce Logistics Reality</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Courier Delivery &amp; RTO Return Profit Sizer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          In Indian e-commerce, 15% to 30% of Cash-on-Delivery (COD) orders are refused at the doorstep and returned as RTO. Enter your forward courier, reverse freight, and return rate to find your true delivered net margin.
        </p>
      </div>

      {/* Interactive Engine */}
      <DeliveryProfitEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The Indian E-Commerce RTO Defense Playbook
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How top direct-to-consumer brands slash delivery failure rates below 10%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Instant UPI Cash Discount</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Offering a flat ₹50 or 5% discount for instant UPI payments converts 30%–45% of COD shoppers into prepaid buyers. Prepaid orders have virtually zero doorstep rejection.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. WhatsApp Address Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Send an automated WhatsApp confirmation message before dispatching. If the buyer does not confirm within 24 hours, call them to confirm their pin code and intent to pay.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Blacklist High-RTO Pin Codes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Certain postal pin codes consistently suffer from 50%+ courier non-delivery or buyer refusal. Restrict COD availability in those specific zones to protect your shipping budget.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
