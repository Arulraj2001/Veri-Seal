'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ExternalLink,
  Sparkles,
  Mail,
  Check,
  Copy,
  ArrowUpRight,
  Headphones,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { translations } from '@/lib/translations';
import { KagazoLogo } from '@/components/ui/KagazoLogo';

export function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [contactEmail, setContactEmail] = React.useState('support@kagazo.in');
  const [whatsappNumber, setWhatsappNumber] = React.useState('+919876543210');
  const [hideDecisionEngines, setHideDecisionEngines] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.contact_email) {
          setContactEmail(data.contact_email);
        }
        if (data?.whatsapp_number) {
          setWhatsappNumber(data.whatsapp_number);
        }
        if (typeof data?.hide_decision_engines === 'boolean') {
          setHideDecisionEngines(data.hide_decision_engines);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  const t = (translations as any)[language] || translations.en;
  const isTamil = language === 'ta';

  return (
    <footer className="bg-gradient-to-b from-surface/80 via-white to-surface border-t border-surface-darker text-text-main relative overflow-hidden">
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main Footer Directory (Centered & well-proportioned max-w-7xl, reducing excessive horizontal stretch) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10 lg:gap-8 pb-12 border-b border-surface-darker/80">
          
          {/* Brand & Trust Column (Col 1 & 2 on desktop, full width on mobile) */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-light border border-primary/25 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                <KagazoLogo className="w-7 h-7 drop-shadow-xs" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-text-main flex items-center gap-1">
                  Kaga<span className="text-primary">zo</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-1 animate-pulse"></span>
                </span>
                <span className="text-[10px] -mt-1 font-bold text-text-main/60 tracking-wider uppercase">
                  {isTamil ? 'இந்தியாவின் நம்பகமான தளம்' : 'India PKI & Exam Utilities'}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-text-main/80 max-w-sm leading-relaxed">
              {t.footer_tagline || (isTamil
                ? 'அரசு PDF ஆவணங்களை உடனடியாக சரிபார்க்கவும். இந்தியாவிற்காக உருவாக்கப்பட்டது.'
                : 'Free cryptographically verified Indian government PDF validator, smart photo sheet studio, and financial intelligence calculators.')}
            </p>

            {/* Live Infrastructure Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-bold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational • 99.9% Uptime</span>
            </div>

            {/* Product Hunt Featured Badge */}
            <div className="pt-1">
              <a
                href="https://www.producthunt.com/products/kagazo?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-kagazo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-90 hover:scale-[1.01] transition-all"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1249001&theme=light&t=1789285219090"
                  alt="Kagazo - Verify Gov PDF Digital Signatures Free & Productivity Tools | Product Hunt"
                  width={250}
                  height={54}
                  className="w-[210px] h-auto rounded-lg"
                />
              </a>
            </div>

            {/* Interactive Contact & Support Action Group */}
            <div className="pt-2 space-y-2.5">
              <div className="text-xs font-black uppercase tracking-wider text-text-main/70">
                Official Support Desk
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-sm">
                {/* Clickable Email Button with Copy Option */}
                <div className="flex items-center rounded-xl bg-white border border-surface-darker shadow-2xs hover:border-primary/40 transition-colors group">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="h-9 px-3 flex-1 sm:flex-initial flex items-center gap-2 text-xs font-bold text-text-main hover:text-primary transition-colors"
                    title="Send Email to Support Desk"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                    <span className="truncate max-w-[160px] sm:max-w-none">{contactEmail}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="h-9 px-2.5 border-l border-surface-darker/60 text-text-main/50 hover:text-primary transition-colors cursor-pointer shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Support Form CTA */}
                <Link
                  href="/contact"
                  className="h-9 px-3.5 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors shadow-2xs text-xs font-bold flex items-center justify-center gap-1.5 shrink-0"
                  aria-label="Contact Support Desk"
                >
                  <Headphones className="h-3.5 w-3.5" />
                  <span>Support Desk</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 1: Photo & Biometric Suite (Col 1 on mobile 2-col grid) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-text-main/90 flex items-center gap-1.5">
              <span>{isTamil ? 'புகைப்பட ஸ்டுடியோ' : 'Photo Studio'}</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Passport Sheet (4×6)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/a4-multi-card-sheet"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  A4 Multi-Card Sheet
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/signature-cleaner-extractor"
                  className="text-emerald-700 font-bold hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Signature Extractor ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/thumb-impression-resizer"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Thumb Resizer (LTI)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/photo-date-name-stamper"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Date &amp; Name Stamper
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/biometric-face-aligner"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Biometric Face Aligner
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/photo-signature-joiner"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Photo-Signature Joiner
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: PDF & Exam Compressors (Col 2 on mobile 2-col grid) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-text-main/90">
              {isTamil ? 'PDF & தேர்வுகள்' : 'PDF & Exam Suite'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/tools/compress-pdf-to-200kb"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Compress PDF 200KB
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/compress-pdf-to-100kb"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Compress PDF 100KB
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/compress-pdf-to-300kb"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Compress PDF 300KB
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/handwritten-declaration-scanner"
                  className="text-indigo-600 font-bold hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Declaration (50–100KB) ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mask-aadhaar"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Mask Aadhaar (8 Digits)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Merge Marksheets (&lt;1MB)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/unlock-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Unlock Protected PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tax, Decision OS & Calculators (Col 1 on row 2 on mobile) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-text-main/90">
              {isTamil ? 'முடிவு அமைப்புகள்' : 'Decision OS & Tax'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/tools/income-tax-calculator-2025-26"
                  className="text-emerald-700 font-bold hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Income Tax 2025-26 ★
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/gst-number-verifier"
                  className="text-indigo-600 font-bold hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  GSTIN Verifier ★
                </Link>
              </li>
              {!hideDecisionEngines && (
                <>
                  <li>
                    <Link
                      href="/home-cost"
                      className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                    >
                      Home Cost &amp; Build OS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business-os"
                      className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                    >
                      Business Profit OS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/vehicle-os"
                      className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                    >
                      Vehicle Decision OS
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="/tools/ifsc-code-finder"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  IFSC &amp; Branch Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/marriage-biodata-maker"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Marriage Biodata Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verification & PKI Trust (Col 2 on row 2 on mobile) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-text-main/90">
              {isTamil ? 'சரிபார்ப்பு & தளம்' : 'Verify & Directory'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/verify-aadhaar-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Verify e-Aadhaar PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/verify-pan-card-pdf"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Verify e-PAN Card PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/verify-community-certificate-tamil-nadu"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  TN Community Cert
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-primary font-bold hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Blog &amp; Knowledge Hub &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  All 56+ Free Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-text-main/75 hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Zero Data Retention
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Engineering Partner Showcase (Ostrune) */}
        <div className="py-5 my-8 px-5 sm:px-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-surface/90 via-white to-surface border border-surface-darker/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/20 shadow-2xs">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-text-main flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                <span>Engineered for Speed &amp; Performance by</span>
                <a
                  href="https://ostrune.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-black inline-flex items-center gap-1"
                >
                  <span>Ostrune Agency</span>
                  <ExternalLink className="w-3.5 h-3.5 inline" />
                </a>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                  Performance Partner
                </span>
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
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-text-main hover:bg-black text-white text-xs font-black shrink-0 transition-colors shadow-xs w-full sm:w-auto justify-center"
          >
            <span>Visit Ostrune</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom Bar: Symmetrical Copyright, Legal Quick Links & India Badge */}
        <div className="pt-6 sm:pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-text-main/70">
          <p className="text-center lg:text-left leading-relaxed">
            © 2026 Kagazo. {t.footer_rights || (isTamil ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை' : 'All rights reserved')} — {isTamil
              ? 'இந்திய அரசு PDF டிஜிட்டல் கையொப்பங்களை சரிபார்க்கும் இலவச தளம்.'
              : 'Free online tool for Indian government PDF digital signature verification.'}
          </p>

          {/* Quick Legal & Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 text-xs font-semibold text-text-main/70 shrink-0">
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
              Support Desk
            </Link>
            <span>•</span>
            <a
              href={`mailto:${contactEmail}`}
              className="hover:text-primary text-primary font-bold transition-colors inline-flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-primary" />
              <span>{contactEmail}</span>
            </a>
          </div>

          {/* Made with Love for India badge */}
          <div className="flex items-center gap-1.5 shrink-0 bg-white border border-surface-darker px-3.5 py-1.5 rounded-full font-bold shadow-2xs text-text-main text-[11px]">
            <span>{t.footer_made || (isTamil ? 'இந்தியாவிற்காக ❤️ உடன் உருவாக்கப்பட்டது 🇮🇳' : 'Made with ❤️ for India 🇮🇳')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
