import { Metadata } from 'next';
import ReconciliationEngine from '@/components/business-os/ReconciliationEngine';
import { Coins, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day-End Cash & UPI Register Reconciliation Tool for Indian Shops | VeriSeal',
  description:
    'Free evening register closing tool for retail shops and restaurants. Tally physical cash drawer count against expected sales and verify digital UPI payments to spot shortages in 90 seconds.',
  keywords: [
    'cash register reconciliation tool online',
    'evening cash tally sheet retail shop india',
    'how to reconcile cash drawer daily',
    'upi sales vs bank credit reconciliation',
    'daily shop register closing template',
  ],
  openGraph: {
    title: 'Day-End Cash & UPI Register Reconciliation Tool for Indian Shops',
    description:
      'Tally drawer cash against sales, verify PhonePe/GPay settlements, and detect register shortages instantly.',
    url: 'https://veriseal.org/business-os/reconciliation',
  },
};

export default function ReconciliationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Day-End Cash & UPI Register Reconciliation Tool',
    url: 'https://veriseal.org/business-os/reconciliation',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Tallies physical drawer cash against expected cash sales and verifies digital UPI QR settlements for retail businesses.',
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
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          <span>Evening Operational Discipline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Day-End Cash &amp; UPI Register Closing
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Eliminate evening cash shortages. Enter your morning cash float, today&apos;s cash sales, petty expenses paid out, and your physical cash count. In 90 seconds, know if your register is balanced or missing money.
        </p>
      </div>

      {/* Interactive Engine */}
      <ReconciliationEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 3 Most Common Sources of Register Leakage in India
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Where unrecorded rupees disappear between opening and closing the shutter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Unrecorded Petty Cash Outflows</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paying ₹40 for morning chai, ₹150 for courier tape, and ₹500 helper advance directly from the till without noting it down causes a false &ldquo;₹690 cash shortage&rdquo; at night. Always record petty expenses immediately.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Fake UPI Screenshot Scams</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customers occasionally show a pre-recorded video or fake UPI receipt app showing &ldquo;Payment Successful&rdquo; without the transaction actually going through. Always check for your merchant soundbox or banking SMS notification.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. The 90-Second Evening Habit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reconciling every single night catches mistakes while memories are fresh. If you wait until Saturday night to balance the week, finding where ₹1,200 went is virtually impossible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
