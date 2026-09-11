'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileCheck2,
  CreditCard,
  Receipt,
  KeyRound,
  User,
  LogOut,
  ShieldCheck,
  Zap,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    plan: string;
  };
  paymentEnabled: boolean;
}

export function DashboardSidebar({ user, paymentEnabled }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Verifications', href: '/dashboard/verifications', icon: FileCheck2 },
    { name: 'My Plan', href: '/dashboard/plan', icon: CreditCard },
    { name: 'Payment Status', href: '/dashboard/payment', icon: Receipt },
    ...(user.plan === 'business'
      ? [{ name: 'API Keys', href: '/dashboard/api-keys', icon: KeyRound }]
      : []),
    ...(user.role === 'admin'
      ? [{ name: 'Admin Panel', href: '/admin', icon: ShieldAlert }]
      : []),
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-surface-darker/80 shrink-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-surface-darker/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary">
            <svg
              className="w-5 h-5 text-primary fill-primary/15 stroke-primary"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-text-main">
            Veri<span className="text-primary">Seal</span>
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-main/75 hover:bg-surface hover:text-primary'
              )}
            >
              <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-text-main/60')} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mini Upgrade CTA for Free Users */}
      {user.plan === 'free' && (
        <div className="mx-3 mb-3 p-3 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-surface border border-primary/20 text-left">
          <div className="flex items-center gap-1.5 text-xs font-black text-text-main">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Upgrade to Pro</span>
          </div>
          <p className="text-[11px] text-text-main/60 mt-1 leading-snug">
            Unlock 20-file batch verification and priority RAM queue.
          </p>
          <Link
            href="/dashboard/payment?plan=pro"
            className="mt-2.5 inline-flex items-center justify-center gap-1 w-full py-1.5 px-2.5 rounded-xl bg-primary text-white text-[11px] font-bold hover:bg-primary-hover transition-colors shadow-sm"
          >
            <span>Upgrade ₹199/mo</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* User Info & Sign Out Footer */}
      <div className="p-4 border-t border-surface-darker/70 bg-surface/30">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="h-9 w-9 rounded-xl bg-primary-light text-primary font-bold text-sm flex items-center justify-center border border-primary/20">
            {(user.name?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
          </div>
          <div className="truncate flex-1">
            <div className="text-xs font-bold text-text-main truncate">{user.name}</div>
            <div className="text-[11px] text-text-main/50 truncate">{user.email}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-surface-darker hover:bg-error-light hover:text-error hover:border-error/30 text-xs font-semibold text-text-main/70 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
