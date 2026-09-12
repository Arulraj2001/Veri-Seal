import { Metadata } from 'next';
import WhatsAppQuoteEngine from '@/components/business-os/WhatsAppQuoteEngine';
import { Smartphone, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WhatsApp Estimate & Quotation Generator for Indian Sellers | Kagazo',
  description:
    'Generate professional price quotes and estimates for WhatsApp. Add itemized pricing, delivery fees, special discounts, and 1-click UPI payment details. 100% free with zero login.',
  keywords: [
    'whatsapp quotation maker online india',
    'free estimate generator whatsapp',
    'how to send price quote on whatsapp',
    'whatsapp bill format for small business',
    'instagram seller quote generator',
  ],
  openGraph: {
    title: 'WhatsApp Estimate & Quotation Generator for Indian Sellers',
    description:
      'Send beautiful itemized estimates with 1-click WhatsApp share and UPI QR payment details.',
    url: 'https://Kagazo.org/business-os/quote-generator',
  },
};

export default function QuoteGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'WhatsApp Estimate & Quotation Generator',
    url: 'https://Kagazo.org/business-os/quote-generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Generate professional price quotes and estimates for WhatsApp with itemized pricing, delivery fees, and UPI payment details.',
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
          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Chat Commerce Operational Utility</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          WhatsApp Estimate &amp; Quotation Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Indian customers expect fast, clear, professional responses on WhatsApp. Build your itemized quotation with delivery fees, discounts, and your UPI ID, then send it directly to your customer with one click.
        </p>
      </div>

      {/* Interactive Engine */}
      <WhatsAppQuoteEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Why Clean WhatsApp Quotations Close 2.4x More Deals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How Indian boutiques, caterers, and freelancers turn casual inquiries into paid orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Itemized Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you quote a single lump-sum number (e.g. &ldquo;₹3,500&rdquo;), customers instinctively negotiate. When you itemize items, delivery, and a special discount, customers see the value clearly and agree faster.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Instant UPI Friction Reduction</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Including your UPI ID (e.g. `yourshop@upi`) directly in the message allows buyers to copy-paste it immediately into Google Pay or PhonePe without waiting for bank account numbers.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. The 7-Day Validity Clause</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adding &ldquo;Valid for 7 days&rdquo; protects you from sudden raw material price hikes while creating healthy urgency for the buyer to confirm their booking before the quote expires.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
