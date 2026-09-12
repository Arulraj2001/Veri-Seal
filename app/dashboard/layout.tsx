import * as React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import {
  LayoutDashboard,
  FileCheck2,
  CreditCard,
  Receipt,
  KeyRound,
  User,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardBottomNav } from '@/components/dashboard/DashboardBottomNav';
import { getMergedSettings } from '@/lib/settings-store';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If not logged in, redirect to login page
  if (!session?.user) {
    redirect('/login');
  }

  const user = {
    name: session.user.name || 'Citizen User',
    email: session.user.email || 'user@Kagazo.in',
    role: (session.user as { role?: string }).role || 'user',
    plan: (session.user as { plan?: string }).plan || 'free',
  };

  const settings = await getMergedSettings();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <DashboardSidebar user={user} paymentEnabled={settings.payment_enabled} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Top Navbar in dashboard */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-surface-darker/70 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="md:hidden flex items-center gap-2 font-extrabold text-text-main">
              <span className="h-8 w-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span>Kagazo</span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold text-text-main/50">
              Citizen Digital Signature Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-primary-light hover:text-primary text-xs font-semibold text-text-main transition-colors border border-surface-darker"
            >
              <span>Verify PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-8 px-2.5 rounded-lg bg-primary-light text-primary text-xs font-bold flex items-center border border-primary/20 uppercase tracking-wider">
              {user.plan} Plan
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <DashboardBottomNav paymentEnabled={settings.payment_enabled} userPlan={user.plan} />
    </div>
  );
}
