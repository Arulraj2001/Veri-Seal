'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, ExternalLink, Sparkles } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) {
    return null;
  }
  return (
    <footer className="bg-surface border-t border-surface-darker text-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-surface-darker/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary">
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
              <span className="text-2xl font-extrabold tracking-tight text-text-main">
                Veri<span className="text-primary">Seal</span>
              </span>
            </Link>

            <p className="text-sm text-text-main/80 max-w-sm leading-relaxed">
              Verify government PDFs instantly. Made for India.
            </p>
            <p className="text-xs text-text-main/60 max-w-sm leading-relaxed">
              Fix the yellow question mark on e-Aadhaar, community, nativity, income certificates, PAN cards, and DigiLocker PDFs.
            </p>

            <div className="pt-2 flex items-center gap-3 text-text-main/70">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl bg-white border border-surface-darker flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
                aria-label="Twitter / X"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl bg-white border border-surface-darker flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl bg-white border border-surface-darker flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.65.74-1.65 1.65 0 .92.74 1.66 1.65 1.66.91 0 1.65-.74 1.65-1.66 0-.91-.74-1.65-1.65-1.65z" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="h-9 w-9 rounded-xl bg-white border border-surface-darker flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
                aria-label="Contact Us"
                title="Contact Support Desk"
              >
                <MessageSquare className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/90">
              Document Guides
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/verify-aadhaar-pdf" className="text-text-main/75 hover:text-primary transition-colors">
                  Verify e-Aadhaar PDF
                </Link>
              </li>
              <li>
                <Link href="/verify-community-certificate-tamil-nadu" className="text-text-main/75 hover:text-primary transition-colors">
                  TN Community Certificate
                </Link>
              </li>
              <li>
                <Link href="/verify-pan-card-pdf" className="text-text-main/75 hover:text-primary transition-colors">
                  Verify e-PAN Card PDF
                </Link>
              </li>
              <li>
                <Link href="/verify-income-certificate" className="text-text-main/75 hover:text-primary transition-colors">
                  Income Certificate
                </Link>
              </li>
              <li>
                <Link href="/verify-digilocker-pdf" className="text-text-main/75 hover:text-primary transition-colors">
                  DigiLocker Document
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/90">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-text-main/75 hover:text-primary transition-colors font-bold text-primary">
                  VeriSeal Blog
                </Link>
              </li>
              <li>
                <Link href="/blog/fix-yellow-question-mark-aadhaar-pdf" className="text-text-main/75 hover:text-primary transition-colors">
                  Fix Yellow Question Mark
                </Link>
              </li>
              <li>
                <Link href="/blog/verify-tamil-nadu-community-nativity-certificate" className="text-text-main/75 hover:text-primary transition-colors">
                  TN Revenue Certificate Guide
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-text-main/75 hover:text-primary transition-colors">
                  How PKI Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-main/75 hover:text-primary transition-colors font-medium">
                  Contact &amp; Support Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* States Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/90">
              State Portals
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/verify-nativity-certificate-tamil-nadu" className="text-text-main/75 hover:text-primary transition-colors">
                  Tamil Nadu (TNeGA)
                </Link>
              </li>
              <li>
                <Link href="/verify-income-certificate" className="text-text-main/75 hover:text-primary transition-colors">
                  Andhra &amp; Telangana (MeeSeva)
                </Link>
              </li>
              <li>
                <Link href="/verify-income-certificate" className="text-text-main/75 hover:text-primary transition-colors">
                  Karnataka (Nadakacheri)
                </Link>
              </li>
              <li>
                <Link href="/verify-epfo-uan-card" className="text-text-main/75 hover:text-primary transition-colors">
                  EPFO Universal Account
                </Link>
              </li>
              <li>
                <Link href="/verify-itr-acknowledgement" className="text-text-main/75 hover:text-primary transition-colors">
                  Income Tax CPC Bengaluru
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Ostrune Agency Partner & Engineering Showcase */}
        <div className="py-5 my-8 px-6 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-text-main">
                Engineered for Speed &amp; Performance by{' '}
                <a
                  href="https://ostrune.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-black inline-flex items-center gap-1"
                >
                  <span>Ostrune Agency</span>
                  <ExternalLink className="w-3.5 h-3.5 inline" />
                </a>
              </p>
              <p className="text-xs text-text-main/70 mt-0.5">
                Web Development, High-Conversion SEO &amp; Performance Growth. Free site audit with 12h reply guarantee.
              </p>
            </div>
          </div>

          <a
            href="https://ostrune.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-text-main hover:bg-black text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
          >
            <span>Visit Ostrune</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-main/70">
          <p className="text-center sm:text-left leading-relaxed">
            &copy; 2024 VeriSeal. Free tool to verify Indian government PDF digital signatures. Not affiliated with UIDAI, NIC or any government body.
          </p>

          <div className="flex items-center gap-1.5 shrink-0 bg-white/70 border border-surface-darker px-3 py-1.5 rounded-full font-medium shadow-2xs">
            <span>Made with</span>
            <span className="text-red-500 font-bold animate-pulse">❤️</span>
            <span>for India</span>
            <span className="text-base leading-none">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
