'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { translations } from '@/lib/translations';

export function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  const t = (translations as any)[language] || translations.en;
  const isTamil = language === 'ta';

  return (
    <footer className="bg-surface border-t border-surface-darker text-text-main">
      <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Grid: 6-Column Layout (2-col brand + 4 balanced link columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-surface-darker/80">
          {/* Brand & Trust Column (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-2xs">
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
                <span className="text-2xl font-extrabold tracking-tight text-text-main flex items-center gap-1">
                  Veri<span className="text-primary">Seal</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-1"></span>
                </span>
                <span className="text-[10px] -mt-1 font-semibold text-text-main/60 tracking-wider uppercase">
                  {isTamil ? 'இந்தியாவின் நம்பகமான தளம்' : 'India PKI & Exam Utilities'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-text-main/80 max-w-sm leading-relaxed">
              {t.footer_tagline || (isTamil
                ? 'அரசு PDF ஆவணங்களை உடனடியாக சரிபார்க்கவும். இந்தியாவிற்காக உருவாக்கப்பட்டது.'
                : 'Free cryptographically verified Indian government PDF validator, smart photo sheet studio, and financial intelligence calculators.')}
            </p>

            {/* Zero Retention Architecture Pill */}
            <div className="p-3 rounded-xl bg-white/75 border border-surface-darker/80 max-w-sm flex items-start gap-2.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800">100% In-RAM Processing</span>
                <p className="text-[11px] text-text-main/60 mt-0.5 leading-tight">
                  Zero document storage. Files exist purely in ephemeral memory and are never saved to disk.
                </p>
              </div>
            </div>

            {/* Social & Contact Actions */}
            <div className="pt-1 flex items-center gap-2.5 text-text-main/70">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl bg-white border border-surface-darker flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors shadow-2xs"
                aria-label="Twitter / X"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl bg-white border border-surface-darker flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors shadow-2xs"
                aria-label="GitHub"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl bg-white border border-surface-darker flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors shadow-2xs"
                aria-label="LinkedIn"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.65.74-1.65 1.65 0 .92.74 1.66 1.65 1.66.91 0 1.65-.74 1.65-1.65z" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="h-9 px-3 rounded-xl bg-white border border-surface-darker flex items-center gap-1.5 hover:text-primary hover:border-primary/40 transition-colors shadow-2xs text-xs font-semibold"
                aria-label="Contact Us"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Support</span>
              </Link>
            </div>
          </div>

          {/* Column 1: Photo & Card Studio (6 items) */}
          {/* Column 1: Photo & Card Studio (7 items) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/90">
              {isTamil ? 'புகைப்பட ஸ்டுடியோ' : 'Photo Studio Suite'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Passport Sheet Maker (4×6)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/a4-multi-card-sheet"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight font-medium text-emerald-600 dark:text-emerald-400"
                >
                  Multi-Card A4 Sheet (5-in-1) ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/compress-for-whatsapp"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight font-medium text-emerald-600 dark:text-emerald-400"
                >
                  WhatsApp Doc Compressor ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/pvc-id-card-maker"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Dual-Sided PVC Card Maker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/stamp-size-photo-maker"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Stamp Size &amp; NEET Postcard
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/formal-attire-changer"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Formal Suit &amp; Attire Changer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/photo-date-name-stamper"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Exam Name &amp; DOP Stamper
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: KYC Documents & Exam PDF (7 items) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/90">
              {isTamil ? 'KYC & தேர்வு ஆவணங்கள்' : 'KYC & Exam Utilities'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight font-medium text-emerald-600 dark:text-emerald-400"
                >
                  Aadhaar + PAN Single PDF ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/affidavit-generator"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight font-medium text-indigo-600 dark:text-indigo-400"
                >
                  Legal Affidavit Generator (தமிழ்) ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/salary-slip-generator"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight font-medium text-emerald-600 dark:text-emerald-400"
                >
                  Salary Slip Generator (தமிழ்) ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/handwritten-declaration-scanner"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight font-medium text-indigo-600 dark:text-indigo-400"
                >
                  Declaration Scanner (50KB–100KB) ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Compress PDF to 200KB
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Merge Marksheets (&lt;1MB)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mask-aadhaar"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Mask Aadhaar (8 Digits)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tax, Calculators & Lookups (7 items) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/90">
              {isTamil ? 'வரி & கணக்கீடுகள்' : 'Tax & Business Calculators'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/tools/income-tax-calculator-2025-26"
                  className="text-text-main/75 hover:text-emerald-700 transition-colors block leading-tight font-medium text-emerald-600 dark:text-emerald-400"
                >
                  Income Tax FY 2025-26 ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/gst-number-verifier"
                  className="text-text-main/75 hover:text-emerald-700 transition-colors block leading-tight font-medium text-indigo-600 dark:text-indigo-400"
                >
                  GST Number (GSTIN) Verifier ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/ifsc-code-finder"
                  className="text-text-main/75 hover:text-emerald-700 transition-colors block leading-tight"
                >
                  IFSC &amp; Branch Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/home-cost"
                  className="text-text-main/75 hover:text-emerald-700 transition-colors block leading-tight"
                >
                  Home Cost Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/home-cost/solar-calculator"
                  className="text-text-main/75 hover:text-emerald-700 transition-colors block leading-tight"
                >
                  PM Surya Ghar Solar ROI
                </Link>
              </li>
              <li>
                <Link
                  href="/business-os"
                  className="text-text-main/75 hover:text-indigo-700 transition-colors block leading-tight"
                >
                  Business Profit OS
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicle-os"
                  className="text-text-main/75 hover:text-amber-700 transition-colors block leading-tight"
                >
                  Vehicle Decision OS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verification & Trust (6 items) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/90">
              {isTamil ? 'சரிபார்ப்பு & அறக்கட்டளை' : 'Verify & PKI Trust'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/verify-aadhaar-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Verify e-Aadhaar PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/verify-pan-card-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Verify e-PAN Card PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/verify-community-certificate-tamil-nadu"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  TN Community Certificate
                </Link>
              </li>
              <li>
                <Link
                  href="/verify-digilocker-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  DigiLocker Document
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  How PKI Verification Works
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-text-main/75 hover:text-primary transition-colors block leading-tight"
                >
                  Zero Data Retention Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Engineering Partner Showcase */}
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

        {/* Bottom Bar: Symmetrical Copyright, Legal Quick Links, and India Badge */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-text-main/70">
          <p className="text-center lg:text-left leading-relaxed">
            © 2026 VeriSeal. {t.footer_rights || (isTamil ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை' : 'All rights reserved')} — {isTamil
              ? 'இந்திய அரசு PDF டிஜிட்டல் கையொப்பங்களை சரிபார்க்கும் இலவச தளம்.'
              : 'Free online tool for Indian government PDF digital signature verification.'}
          </p>

          {/* Quick Legal Links */}
          <div className="flex items-center gap-4 text-xs font-medium text-text-main/60 shrink-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/tools" className="hover:text-primary transition-colors">
              Tools Directory
            </Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog &amp; Guides
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Support
            </Link>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 bg-white/70 border border-surface-darker px-3 py-1.5 rounded-full font-medium shadow-2xs">
            <span>{t.footer_made || (isTamil ? 'இந்தியாவிற்காக ❤️ உடன் உருவாக்கப்பட்டது 🇮🇳' : 'Made with ❤️ for India 🇮🇳')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
