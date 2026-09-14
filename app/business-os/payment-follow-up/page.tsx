import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import UdhaarReminderEngine from '@/components/business-os/UdhaarReminderEngine';
import { CreditCard, HelpCircle, ChevronRight, Smartphone, Coins, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Udhaar Payment Reminder Generator India | WhatsApp Recovery Message Templates',
  description:
    'Free Udhaar payment reminder generator for Indian shopkeepers, retailers, and freelancers. Create polite, non-awkward WhatsApp payment recovery messages in 4 distinct tones with instant UPI settlement links.',
  keywords: [
    'udhaar reminder message generator WhatsApp',
    'payment collection message format India',
    'polite payment reminder message WhatsApp India',
    'how to ask for pending money politely in Hindi and English',
    'kirana shop udhaar recovery message template',
    'free customer credit ledger online India',
    'pending bill payment reminder WhatsApp format',
    'business payment follow up templates India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/payment-follow-up',
  },
  openGraph: {
    title: 'Udhaar Payment Reminder Generator India | WhatsApp Recovery Message Templates',
    description:
      'Never feel awkward asking for pending money. Pick your tone and send polite WhatsApp reminders in 1 click.',
    url: 'https://Kagazo.in/business-os/payment-follow-up',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Udhaar Payment Reminder Generator India | WhatsApp Collection Templates',
    description:
      'Recover pending customer credit with polite, non-awkward WhatsApp reminders in gentle, professional, urgent, or firm tones.',
  },
};

const FAQS = [
  {
    question: 'How do I ask a customer for pending Udhaar politely on WhatsApp without offending them?',
    answer:
      'The key is to frame the reminder as standard business bookkeeping rather than a personal confrontation. Instead of saying "You have not paid me", say: "Hi [Name], our weekly account reconciliation shows an outstanding balance of ₹[Amount] for invoice #[Number]. Could you kindly settle this via UPI at your earliest convenience?" This shifts the context from personal blame to routine accounting.',
  },
  {
    question: 'What are the 4 message tones available in this payment reminder tool?',
    answer:
      '(1) Friendly / Gentle: Perfect for loyal, long-time neighborhood customers who simply forgot, (2) Professional: Standard formal tone ideal for B2B clients, corporate buyers, or wholesale accounts, (3) Urgent: Stresses upcoming vendor settlement or GST filing deadlines, and (4) Firm / Final: For overdue accounts past 30 days clearly stating pause of further services or credit.',
  },
  {
    question: 'Why does including my UPI ID directly in the reminder message increase collection speed?',
    answer:
      'Friction kills payments. If a customer reads your reminder and has to ask "What is your bank account number?" or "Send QR code", they put their phone down and forget. When your UPI VPA (e.g., yourname@upi) is in the message, the customer can tap, copy, open PhonePe or Google Pay, and transfer funds in under 20 seconds.',
  },
  {
    question: 'What should I do if a customer ignores multiple polite WhatsApp payment reminders?',
    answer:
      'If 3 WhatsApp messages over 21 days are ignored: (1) Call them directly during business hours (11 AM to 4 PM), (2) Offer a one-time settlement with a small waiver (e.g., pay ₹4,500 today to clear ₹5,000 full due), (3) Visit them in person if they are local, and (4) Immediately stop all new credit extensions until the old balance is 100% resolved.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/quote-generator', label: 'Free WhatsApp Quotation Maker', icon: Smartphone },
  { href: '/business-os/reconciliation', label: 'Day-End Cash & UPI Reconciliation', icon: Coins },
  { href: '/business-os/cash-flow-survival-calculator', label: 'Cash Flow Survival Runway', icon: Clock },
];

export default function PaymentFollowUpPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Payment Follow-Up & Udhaar Ledger', item: 'https://Kagazo.in/business-os/payment-follow-up' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Udhaar Ledger & Polite WhatsApp Payment Reminder Generator',
        url: 'https://Kagazo.in/business-os/payment-follow-up',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Track unpaid customer credit and generate polite, non-awkward WhatsApp payment reminder messages with 1-click dispatch.',
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
          { label: 'Udhaar Ledger & Payment Reminders' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <CreditCard className="w-3.5 h-3.5 text-amber-600" />
          <span>Cash Collection &amp; Khata Recovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Udhaar Payment Reminder Generator India — WhatsApp Recovery Templates
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
