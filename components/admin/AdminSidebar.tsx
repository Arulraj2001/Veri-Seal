'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  FileEdit,
  PenTool,
  Search,
  KeyRound,
  Settings,
  LineChart,
  ShieldCheck,
  MessageSquare,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({ isOpenMobile, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries', href: '/admin/messages', icon: MessageSquare },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Content', href: '/admin/content', icon: FileEdit },
    { name: 'Blog', href: '/admin/blog', icon: PenTool },
    { name: 'SEO Pages', href: '/admin/seo-pages', icon: Search },
    { name: 'API Keys', href: '/admin/api-keys', icon: KeyRound },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Analytics', href: '/admin/analytics', icon: LineChart },
  ];

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-surface-darker">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-surface-darker">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-text-main flex items-center gap-1.5">
              <span>Veri<span className="text-primary">Seal</span></span>
              <span className="px-1.5 py-0.5 rounded bg-primary text-white text-[9px] font-black uppercase tracking-wider">
                Admin
              </span>
            </div>
            <div className="text-[10px] text-text-main/50 font-medium">Control Center</div>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-text-main/60 hover:bg-surface"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-text-main/40">
          Management Console
        </div>

        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all',
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

      {/* Footer Info */}
      <div className="p-4 border-t border-surface-darker/70 bg-surface/30 text-[11px] text-text-main/50 font-medium">
        <div>VeriSeal Engine v2.4</div>
        <div>CCA Root Synchronized</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (always visible on md+) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 z-40">
        {content}
      </aside>

      {/* Mobile Drawer (visible when open) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-xs flex">
          <div className="w-64 max-w-[80vw] h-full shadow-2xl">
            {content}
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}
