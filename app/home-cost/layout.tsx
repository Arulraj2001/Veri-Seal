import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Zap,
  Sun,
  Wind,
  Droplets,
  Paintbrush,
  Wallet,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const SUB_NAV_LINKS = [
  { href: '/home-cost', label: 'Digital Twin Hub', icon: Home },
  { href: '/home-cost/electricity-bill-calculator', label: 'Electricity Bill', icon: Zap },
  { href: '/home-cost/ac-cost-calculator', label: 'AC & Cooling', icon: Wind },
  { href: '/home-cost/solar-calculator', label: 'Solar & Backup', icon: Sun },
  { href: '/home-cost/water-tank-calculator', label: 'Water & Geyser', icon: Droplets },
  { href: '/home-cost/renovation-cost', label: 'Renovation & Build', icon: Paintbrush },
  { href: '/home-cost/lpg-vs-induction', label: 'LPG vs Induction', icon: Wallet },
  { href: '/home-cost/rent-vs-buy', label: 'Rent vs Buy', icon: Home },
];

export default function HomeCostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/home-cost" className="hover:text-primary transition-colors font-medium">
            Home Cost &amp; Savings Intelligence
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 whitespace-nowrap transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
