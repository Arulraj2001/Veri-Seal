'use client';

import * as React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Menu, LogOut, ShieldCheck, ExternalLink } from 'lucide-react';

interface AdminTopNavProps {
  adminName: string;
  onOpenMobileMenu: () => void;
}

export function AdminTopNav({ adminName, onOpenMobileMenu }: AdminTopNavProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-surface-darker px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile menu toggle + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl border border-surface-darker bg-white text-text-main hover:bg-surface"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <span className="font-extrabold text-sm sm:text-base text-text-main">
            VeriSeal <span className="text-primary font-black">Admin</span>
          </span>
        </div>
      </div>

      {/* Right: User name, live site link, and logout */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-darker hover:bg-surface text-xs font-semibold text-text-main transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-text-main/50" />
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-surface border border-surface-darker">
          <div className="h-6 w-6 rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-bold text-text-main hidden sm:inline-block max-w-[120px] truncate">
            {adminName}
          </span>
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-darker hover:bg-error-light hover:text-error hover:border-error/30 text-xs font-semibold text-text-main/70 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
