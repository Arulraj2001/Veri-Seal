import { Metadata } from 'next';
import WhatsAppOrderEngine from '@/components/business-os/WhatsAppOrderEngine';
import { ShoppingBag, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WhatsApp Business Order & Profit Manager for D2C Sellers | VeriSeal',
  description:
    'Free lightweight order log for Instagram and WhatsApp sellers. Track customer orders, prepaid vs COD status, shipping costs, and live net profit. 100% private in-browser memory.',
  keywords: [
    'whatsapp order management tool free',
    'instagram dm order tracker excel alternative',
    'chat commerce order manager india',
    'cod order profit tracker',
    'small business order log sheet',
  ],
  openGraph: {
    title: 'WhatsApp Business Order & Profit Manager for D2C Sellers',
    description:
      'Track orders from Instagram DMs and WhatsApp with automatic COGS, shipping deduction, and net profit calculations.',
    url: 'https://veriseal.org/business-os/order-manager',
  },
};

export default function OrderManagerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'WhatsApp Business Order & Profit Manager',
    url: 'https://veriseal.org/business-os/order-manager',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Log customer chat orders, track fulfillment status, manage COD collections, and calculate live gross profit per order.',
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
          <span>Chat Commerce Operational Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          WhatsApp &amp; Instagram DM Order Manager
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
              Unlike cloud apps that store your customer phone numbers and sales data on remote servers, VeriSeal saves your active session securely in your own browser with zero third-party data tracking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
