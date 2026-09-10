'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileCheck2,
  CreditCard,
  Receipt,
  KeyRound,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  paymentEnabled: boolean;
  userPlan: string;
}

export function DashboardBottomNav({ paymentEnabled, userPlan }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Verifications', href: '/dashboard/verifications', icon: FileCheck2 },
    { name: 'Plan', href: '/dashboard/plan', icon: CreditCard },
    ...(paymentEnabled
      ? [{ name: 'Payment', href: '/dashboard/payment', icon: Receipt }]
      : []),
    ...(userPlan === 'business'
      ? [{ name: 'API Keys', href: '/dashboard/api-keys', icon: KeyRound }]
      : []),
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Dashboard Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-surface-darker/80 px-2 py-1.5 shadow-lg safe-area-bottom"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-all min-w-[54px]',
                isActive
                  ? 'text-primary font-bold'
                  : 'text-text-main/60 hover:text-text-main'
              )}
            >
              <div
                className={cn(
                  'p-1.5 rounded-lg mb-0.5 transition-colors',
                  isActive ? 'bg-primary-light text-primary' : 'text-text-main/60'
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="truncate max-w-[64px]">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
