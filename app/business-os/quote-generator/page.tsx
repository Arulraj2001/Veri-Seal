import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import WhatsAppQuoteEngine from '@/components/business-os/WhatsAppQuoteEngine';
import { Smartphone, HelpCircle, ChevronRight, ShoppingCart, MessageSquare, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free WhatsApp Quotation & Estimate Maker India | 1-Click Send for Small Businesses',
  description:
    'Free online WhatsApp quotation and estimate maker for Indian small businesses, freelancers, caterers, and Instagram sellers. Add itemized pricing, delivery fees, discounts, and UPI ID with 1-click WhatsApp send.',
  keywords: [
    'free WhatsApp quotation maker India',
    'WhatsApp estimate format small business',
    'how to make quotation for WhatsApp India',
    'Instagram seller quote generator UPI',
    'small business estimate bill maker online',
    'free quote maker without login India',
    'freelance price quote template WhatsApp',
    'itemized quotation generator rupees',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/quote-generator',
  },
  openGraph: {
    title: 'Free WhatsApp Quotation & Estimate Maker India | 1-Click Send for Small Businesses',
    description:
      'Send professional itemized price estimates directly on WhatsApp with delivery fees, discounts, and instant UPI payment details.',
    url: 'https://Kagazo.in/business-os/quote-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free WhatsApp Quotation & Estimate Maker India | Kagazo',
    description:
      'Create and send itemized price quotes on WhatsApp in 30 seconds with UPI ID and delivery breakdown.',
  },
};

const FAQS = [
  {
    question: 'Why should I send an itemized WhatsApp quote instead of a single price in chat?',
    answer:
      'When you simply type a lump sum like "₹3,500" in chat, customers perceive it as arbitrary and instinctively negotiate for discounts. An itemized quote clearly separates product components, customizations, delivery fees, and applicable discounts. This psychological transparency proves your costs and helps close deals 2.4x faster with minimal bargaining.',
  },
  {
    question: 'Can I include my PhonePe or Google Pay UPI ID in the WhatsApp estimate?',
    answer:
      'Yes! You can enter your merchant or personal UPI VPA (e.g., yourname@upi or business@okaxis). The tool formats the final message with a dedicated payment section, allowing your buyer to copy your UPI ID with a single tap and complete payment immediately without asking for bank account numbers.',
  },
  {
    question: 'Why should every small business quote include an expiry date?',
    answer:
      'Adding a validity period (e.g., "Quote valid for 7 days") accomplishes two essential goals: (1) It creates authentic purchasing urgency so clients don’t stall for weeks, and (2) It protects you from having to honor quotes months later after wholesale material prices or shipping tariffs have escalated.',
  },
  {
    question: 'Is this WhatsApp quotation generator completely free with zero login or watermark?',
    answer:
      'Yes, 100% free with no account creation, login, or subscriptions. The estimate is generated entirely inside your browser, meaning your client data, pricing, and phone numbers remain strictly private and are never uploaded to any remote database.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/order-manager', label: 'WhatsApp & DM Order Manager', icon: ShoppingCart },
  { href: '/business-os/payment-follow-up', label: 'Udhaar Payment Reminder Generator', icon: MessageSquare },
  { href: '/business-os/product-pricing-calculator', label: 'Product Pricing & Margin Calculator', icon: Tag },
];

export default function QuoteGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'WhatsApp Quotation Generator', item: 'https://Kagazo.in/business-os/quote-generator' },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate and Send a WhatsApp Quotation to a Customer',
        description: 'Create an itemized professional estimate with UPI payment details and send it directly via WhatsApp in under 60 seconds.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter business & customer details', text: 'Type your business name, contact info, customer name, and WhatsApp phone number.' },
          { '@type': 'HowToStep', position: 2, name: 'Add quotation line items', text: 'Input product names, quantities, and rates per item with instant subtotal calculations.' },
          { '@type': 'HowToStep', position: 3, name: 'Include delivery, discount, and UPI ID', text: 'Add shipping charges, special discounts, validity date, and your PhonePe/GPay UPI ID.' },
          { '@type': 'HowToStep', position: 4, name: 'Send directly on WhatsApp', text: 'Preview your formatted message and click "Send via WhatsApp" to open the chat pre-filled.' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'WhatsApp Estimate & Quotation Generator',
        url: 'https://Kagazo.in/business-os/quote-generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Generate professional price quotes and estimates for WhatsApp with itemized pricing, delivery fees, and UPI payment details.',
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
          { label: 'WhatsApp Estimate & Quotation Generator' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Chat Commerce Operational Utility</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Free WhatsApp Quotation &amp; Estimate Maker India — 1-Click Send
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
