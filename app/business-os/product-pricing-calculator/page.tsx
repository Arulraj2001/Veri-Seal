import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import ProductPricingEngine from '@/components/business-os/ProductPricingEngine';
import { Tag, HelpCircle, ChevronRight, TrendingUp, Truck, Percent } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Amazon & Flipkart Product Pricing Calculator India 2025 | Referral Fee + Closing Fee',
  description:
    'Free product pricing calculator for Indian sellers on Amazon, Flipkart, Meesho, and Shopify. Reverse-engineers your selling price with authentic Indian marketplace referral fees, closing fees, Shiprocket courier slabs, GST, and payment gateway charges.',
  keywords: [
    'Amazon seller pricing calculator India 2025',
    'Flipkart seller fee calculator India',
    'Meesho seller price calculator profit margin',
    'how to price products ecommerce India',
    'Amazon India referral fee calculator',
    'ecommerce selling price calculator India',
    'Shiprocket pricing calculator',
    'D2C product price calculator India',
    'marketplace commission calculator India',
    'reverse price calculator for sellers India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/product-pricing-calculator',
  },
  openGraph: {
    title: 'Amazon & Flipkart Product Pricing Calculator India 2025 | Referral Fee + Closing Fee',
    description:
      'Reverse-engineer your exact selling price to guarantee your desired net profit after Amazon/Flipkart cuts, Shiprocket courier, and GST.',
    url: 'https://Kagazo.in/business-os/product-pricing-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon & Flipkart Pricing Calculator India 2025 | Referral + Closing Fees',
    description:
      'Never underprice on Amazon or Flipkart again. Free reverse-engineering pricing calculator with authentic Indian marketplace fee slabs.',
  },
};

const FAQS = [
  {
    question: 'What are Amazon India\'s referral fees by product category in 2025?',
    answer:
      'Amazon India referral fees vary by category: Consumer Electronics 8%, Books & Music 5%, Clothing & Accessories 15%, Kitchen & Home 12%, Beauty & Personal Care 18%, Sports & Outdoors 10%, Toys & Baby 12%, Automotive 10%, and Grocery & Gourmet 4%. All referral fees attract 18% GST on the fee itself. Additionally, a fixed closing fee of ₹15–₹45 per order applies based on the selling price slab.',
  },
  {
    question: 'Is Meesho really 0% commission for sellers in India?',
    answer:
      'Yes — Meesho charges 0% platform commission to suppliers, which is genuinely unique. However, Meesho passes through actual freight costs at ₹38–₹120 per shipment depending on weight and distance zone. Return freight for COD RTO orders is also charged to the seller. At 20–30% Meesho RTO rates, your effective "hidden cost" can be ₹80–₹150 per returned order even without a commission. The pricing calculator accounts for this.',
  },
  {
    question: 'How should I calculate my selling price to make a 30% net profit on Amazon India?',
    answer:
      'Work backwards: (1) Start with your cost price (product cost + packaging). (2) Add target net profit (30% of what?). (3) Layer on Shiprocket freight (₹65–₹120 for 500g). (4) Add Amazon referral fee % + closing fee + 18% GST on fees. (5) Add payment gateway charge (1.8–2.5%). The formula: Selling Price = (Cost + Freight + Fixed Fees + Target Profit) / (1 - Referral Fee%). This is exactly what our calculator does automatically.',
  },
  {
    question: 'What is the difference between selling on Shopify vs Amazon for Indian sellers?',
    answer:
      'Amazon India: Large existing customer base, trust, FBA fulfillment available. But 8–18% commission + closing fees + ad spend dependency means you typically net 5–15% margin. Shopify Direct: No platform commission — only 2% payment gateway fee. But you must build your own customer acquisition through ads, SEO, or social media, which costs money. Most successful Indian D2C brands sell on Amazon for discovery, then convert repeat buyers to their Shopify store to keep 100% margin on loyalty orders.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/real-profit-calculator', label: 'Monthly P&L & Profit Leak Finder', icon: TrendingUp },
  { href: '/business-os/delivery-profit-calculator', label: 'COD RTO Loss Calculator', icon: Truck },
  { href: '/business-os/discount-profit-calculator', label: 'Discount Profit Crash Simulator', icon: Percent },
];

export default function ProductPricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Product Pricing Calculator', item: 'https://Kagazo.in/business-os/product-pricing-calculator' },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate the Right Selling Price for Amazon and Flipkart India',
        description: 'Reverse-engineer your selling price to guarantee target profit after all marketplace fees and shipping costs.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Select your marketplace', text: 'Choose Amazon India, Flipkart, Meesho, or Direct/Shopify as your selling channel.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter your product cost and target margin', text: 'Input your purchase price (COGS), packaging cost, and desired net profit percentage.' },
          { '@type': 'HowToStep', position: 3, name: 'Select your product category', text: 'Choose the category to automatically apply the correct referral fee slab.' },
          { '@type': 'HowToStep', position: 4, name: 'View your minimum selling price', text: 'See the exact minimum selling price that guarantees your target profit after all fees, freight, GST, and gateway charges.' },
        ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Product Pricing Calculator' },
        ]}
      />

      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Tag className="w-3.5 h-3.5 text-amber-600" />
          <span>Amazon · Flipkart · Meesho · Shopify Fee Slabs</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Amazon & Flipkart Product Pricing Calculator India 2025 — Referral Fee + Closing Fee
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Never underprice on e-commerce again. Input your product cost, packaging, shipping, and desired profit — our algorithm reverse-calculates the exact selling price needed after authentic Indian marketplace fees, GST, and gateway charges.
        </p>
      </div>

      <ProductPricingEngine />

      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">How Platform Fee Structures Work in India</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Comparing take-home margins across Amazon, Flipkart, Meesho, and Direct Selling.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Amazon & Flipkart</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Charge category referral fees (8% to 18%) plus fixed closing fees (₹15 to ₹45 per order) based on the price slab. In addition, 18% GST is levied on the marketplace fees themselves.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Meesho (0% Commission)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meesho charges 0% commission to sellers, but freight shipping and return penalties are strictly passed through. Calibrate your base price so return freight doesn&apos;t erase margins.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Shopify & WhatsApp Direct</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct selling avoids the 15% marketplace commission entirely. You only pay a 2% payment gateway fee (Razorpay/Cashfree) and direct shipping, leaving maximum profit in your own bank account.
            </p>
          </div>
        </div>
      </section>

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
