import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import UdhaarReminderEngine from '@/components/business-os/UdhaarReminderEngine';
import { CreditCard, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Udhaar Ledger & Polite WhatsApp Payment Reminder Generator | Kagazo',
  description:
    'Free Udhaar (credit) ledger for Indian shopkeepers and freelancers. Generate polite, non-awkward WhatsApp payment reminder messages in 4 distinct tones with UPI payment links.',
  keywords: [
    'polite payment reminder message format whatsapp',
    'udhaar recovery message generator',
    'how to ask for pending money politely whatsapp',
    'free customer credit ledger online',
    'shopkeeper udhaar khata reminder tool',
  ],
  openGraph: {
    title: 'Udhaar Ledger & Polite WhatsApp Payment Reminder Generator',
    description:
      'Never feel awkward asking for pending money. Pick your tone and send polite WhatsApp reminders in 1 click.',
    url: 'https://Kagazo.org/business-os/payment-follow-up',
  },
};

export default function PaymentFollowUpPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Udhaar Ledger & Polite WhatsApp Payment Reminder Generator',
    url: 'https://Kagazo.org/business-os/payment-follow-up',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Track unpaid customer credit and generate polite, non-awkward WhatsApp payment reminder messages with 1-click dispatch.',
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Udhaar Ledger & Payment Reminders' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <CreditCard className="w-3.5 h-3.5 text-amber-600" />
          <span>Cash Collection &amp; Khata Recovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Udhaar Ledger &amp; Polite WhatsApp Reminder Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Indian small businesses lose lakhs every year because owners feel shy or uncomfortable asking customers for pending payments. Select the appropriate tone and send professional reminders with instant UPI settlement links.
        </p>
      </div>

      {/* Interactive Engine */}
      <UdhaarReminderEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 4 Rules of Awkward-Free Udhaar Collection
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How to collect 85%+ of pending customer balances without damaging local relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Frame as &ldquo;Routine Accounting&rdquo;</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never make it personal. Use phrases like &ldquo;Our monthly account reconciliation noted...&rdquo; or &ldquo;Our supplier settlement is due today...&rdquo;. This removes personal tension and makes payment standard operating procedure.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Include Direct UPI Details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If a customer has to ask &ldquo;Where should I pay?&rdquo;, collection takes days. Placing your UPI ID in the initial message enables the customer to tap, enter the amount, and pay within 30 seconds.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. The 14-Day Golden Window</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Udhaar older than 14 days has an 80% recovery rate. Udhaar older than 90 days drops below 25% recovery. Consistent, polite follow-ups at 7, 14, and 21 days prevent debts from turning into write-offs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
