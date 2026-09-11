'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Languages,
  ArrowRight,
  LayoutDashboard,
  LogOut,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types';
import { useLanguage } from '@/components/providers/LanguageProvider';

function UserAvatar({
  src,
  name,
  email,
  className = 'h-7 w-7 rounded-lg text-xs',
}: {
  src?: string | null;
  name?: string | null;
  email?: string | null;
  className?: string;
}) {
  const [hasError, setHasError] = React.useState(false);
  const initial = (name?.trim()?.charAt(0) || email?.trim()?.charAt(0) || 'U').toUpperCase();

  const isValidUrl =
    src &&
    typeof src === 'string' &&
    src.trim().length > 0 &&
    (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:'));

  if (isValidUrl && !hasError) {
    return (
      <img
        src={src}
        alt={name || 'User Profile'}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setHasError(true)}
        className={cn('object-cover shrink-0 overflow-hidden', className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'bg-primary text-white font-bold flex items-center justify-center shrink-0 select-none shadow-xs',
        className
      )}
    >
      {initial}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const user = session?.user;
  const userRole = (user as { role?: string })?.role || 'user';
  const userPlan = (user as { plan?: string })?.plan || 'free';

  React.useEffect(() => {
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  const navLinks = [
    { label: t.nav.home, href: '/#hero' },
    { label: 'Exam PDF Compressor (100% Free)', href: '/tools/government-exam-pdf-compressor' },
    { label: t.nav.documents, href: '/#supported-docs' },
    { label: t.nav.howItWorks, href: '/#how-it-works' },
    { label: t.nav.security, href: '/#trust-section' },
    { label: t.nav.faq, href: '/#faq-section' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-surface-darker/80 shadow-2xs py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg z-20"
        >
          <div className="h-10 w-10 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <svg
              className="w-6 h-6 text-primary fill-primary/15 stroke-primary"
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
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-text-main flex items-center gap-1">
              Veri<span className="text-primary">Seal</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-1"></span>
            </span>
            <span className="text-[10px] -mt-1 font-semibold text-text-main/60 tracking-wider uppercase">
              {t.common.brandSubtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Center (Perfect geometric center of the website) */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface/85 px-4 py-1.5 rounded-full border border-surface-darker/70 backdrop-blur-md shadow-2xs z-10">
          <Link
            href="/tools/pdf-compressor"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-text-main hover:text-primary rounded-full hover:bg-white/60 transition-colors"
          >
            <span>PDF Compressor</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-emerald-500/15 text-emerald-600 rounded-full border border-emerald-500/30">
              FREE
            </span>
          </Link>
          <a
            href="/#how-it-works"
            className="px-3.5 py-1.5 text-sm font-medium text-text-main/80 hover:text-primary rounded-full hover:bg-white/60 transition-colors"
          >
            {t.nav.howItWorks}
          </a>
          <Link
            href="/blog"
            className="px-3.5 py-1.5 text-sm font-medium text-text-main/80 hover:text-primary rounded-full hover:bg-white/60 transition-colors"
          >
            {t.nav.blog}
          </Link>
          <Link
            href="/contact"
            className="px-3.5 py-1.5 text-sm font-medium text-text-main/80 hover:text-primary rounded-full hover:bg-white/60 transition-colors"
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Right Actions - Adjusted to right end without overlap */}
        <div className="hidden md:flex items-center justify-end gap-2 ml-auto z-20 shrink-0">
          {/* Real-time Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-surface-darker/80 bg-white hover:border-primary/40 text-xs font-semibold text-text-main transition-all shadow-2xs active:scale-95 shrink-0"
            title="Toggle Language (EN / தமிழ்)"
          >
            <Languages className="w-3.5 h-3.5 text-primary" />
            <span className={language === 'en' ? 'text-primary font-bold' : 'text-text-main/60 font-medium'}>
              EN
            </span>
            <span className="text-text-main/30">|</span>
            <span className={language === 'ta' ? 'text-primary font-bold font-tamil' : 'text-text-main/60 font-tamil font-medium'}>
              தமிழ்
            </span>
          </button>

          {/* Conditional Auth State */}
          {status === 'authenticated' && user ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-2 py-1 rounded-xl bg-surface hover:bg-primary-light/40 border border-surface-darker/80 transition-colors group shadow-2xs"
                title="User Profile & Settings"
              >
                <UserAvatar
                  src={user.image}
                  name={user.name}
                  email={user.email}
                  className="h-7 w-7 rounded-lg text-xs"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors max-w-[75px] truncate leading-tight">
                    {user.name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-primary leading-tight">
                    {userPlan}
                  </span>
                </div>
              </Link>

              {userRole === 'admin' && (
                <Link href="/admin" title={t.nav.adminPanel}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 flex items-center justify-center border-amber-400/70 text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl shadow-2xs"
                    aria-label={t.nav.adminPanel}
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                  </Button>
                </Link>
              )}

              {/* Dashboard: Icon Only */}
              <Link href="/dashboard" title={t.nav.dashboard}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0 flex items-center justify-center rounded-xl border border-surface-darker/80 hover:border-primary/40 hover:bg-primary-light/40 shadow-2xs transition-colors"
                  aria-label={t.nav.dashboard}
                >
                  <LayoutDashboard className="w-4 h-4 text-primary" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="h-9 w-9 p-0 text-text-main/60 hover:text-error hover:bg-error-light rounded-xl"
                title={t.nav.logout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/login">
                <Button variant="outline" size="sm" className="h-9 px-3 font-semibold text-xs rounded-xl shadow-2xs">
                  {t.nav.signIn}
                </Button>
              </Link>

              {/* Quick CTA */}
              <a href="#upload-zone">
                <Button size="sm" className="h-9 px-3.5 font-semibold text-xs shadow-sm rounded-xl">
                  {language === 'ta' ? 'இலவச சரிபார்ப்பு' : 'Verify PDF'}
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-surface-darker text-xs font-semibold text-text-main bg-white"
          >
            <span className={language === 'en' ? 'text-primary font-bold' : 'text-text-main/70'}>
              EN
            </span>
            <span>|</span>
            <span className={language === 'ta' ? 'text-primary font-bold font-tamil' : 'text-text-main/70 font-tamil'}>
              தமிழ்
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-text-main hover:bg-surface border border-surface-darker focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-[61px] bg-background z-40 md:hidden flex flex-col px-6 py-8 overflow-y-auto border-t border-surface-darker"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-semibold text-text-main hover:bg-surface hover:text-primary transition-colors border-b border-surface-darker/40"
                >
                  {link.label}
                  <ArrowRight className="w-4 h-4 text-primary opacity-60" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-surface-darker flex flex-col gap-3">
              {status === 'authenticated' && user ? (
                <>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface border border-surface-darker">
                    <UserAvatar
                      src={user.image}
                      name={user.name}
                      email={user.email}
                      className="h-11 w-11 rounded-xl text-base"
                    />
                    <div className="truncate flex-1">
                      <div className="text-sm font-black text-text-main truncate">
                        {user.name || 'Citizen User'}
                      </div>
                      <div className="text-xs text-text-main/60 truncate">{user.email}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-[10px] font-black uppercase">
                      {userPlan}
                    </span>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button size="lg" className="w-full gap-2 font-bold">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Go to User Dashboard</span>
                    </Button>
                  </Link>

                  {userRole === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full gap-2 font-bold border-amber-400 text-amber-800 bg-amber-50"
                      >
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                        <span>Admin Control Panel</span>
                      </Button>
                    </Link>
                  )}

                  <a
                    href="#upload-zone"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="outline" size="lg" className="w-full font-bold">
                      Verify PDF Now
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-2 text-error border-error/30 hover:bg-error-light hover:border-error/50 font-bold"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <a
                    href="#upload-zone"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button size="lg" className="w-full">
                      Verify PDF Now
                    </Button>
                  </a>

                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full font-bold"
                    >
                      Sign In to Portal
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-auto pt-8 text-center text-xs text-text-main/60">
              <p>VeriSeal — India Government PKI Verification Tool</p>
              <p className="mt-1">Free, Private &amp; Secure. Files Never Leave Memory.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}


