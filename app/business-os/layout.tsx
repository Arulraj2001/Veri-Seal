import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Coins,
  TrendingUp,
  Tag,
  Percent,
  Target,
  Smartphone,
  CreditCard,
  ShoppingBag,
  Archive,
  Calendar,
  Sparkles,
  Trophy,
  Clock,
  Truck,
  ChevronRight,
} from 'lucide-react';

const SUB_NAV_LINKS = [
  { href: '/business-os', label: 'Command Center', icon: Briefcase },
  { href: '/business-os/quote-generator', label: 'WhatsApp Quote', icon: Smartphone },
  { href: '/business-os/payment-follow-up', label: 'Udhaar Reminders', icon: CreditCard },
  { href: '/business-os/order-manager', label: 'Order Manager', icon: ShoppingBag },
  { href: '/business-os/daily-profit-calculator', label: 'Daily Profit', icon: Coins },
  { href: '/business-os/real-profit-calculator', label: 'P&L Leaks', icon: TrendingUp },
  { href: '/business-os/product-pricing-calculator', label: 'Pricing Sizer', icon: Tag },
  { href: '/business-os/discount-profit-calculator', label: 'Discount Crash', icon: Percent },
  { href: '/business-os/break-even-calculator', label: 'Break-Even', icon: Target },
  { href: '/business-os/sales-target-calculator', label: 'Target ₹1 Lakh', icon: Trophy },
  { href: '/business-os/cash-flow-survival-calculator', label: 'Cash Runway', icon: Clock },
  { href: '/business-os/delivery-profit-calculator', label: 'Delivery & RTO', icon: Truck },
  { href: '/business-os/cash-calendar', label: 'Cash Calendar', icon: Calendar },
  { href: '/business-os/inventory-profit-calculator', label: 'Dead Stock', icon: Archive },
  { href: '/business-os/reconciliation', label: 'Evening Closing', icon: Coins },
  { href: '/business-os/employee-cost-calculator', label: 'Employee Cost', icon: Briefcase },
  { href: '/business-os/minimum-order-calculator', label: 'MOV Sizer', icon: Truck },
  { href: '/business-os/ai-advisor', label: 'AI Advisor', icon: Sparkles },
];

export default function BusinessOsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/business-os" className="hover:text-primary transition-colors font-medium">
            Small Business Profit OS
          </Link>
        </nav>

        {/* Sub-Navigation Ribbon (Crisp Light Aesthetic) */}
        <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-2 backdrop-blur-xl shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          {SUB_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 whitespace-nowrap transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Child Pages Content */}
        {children}
      </div>
    </div>
  );
}
