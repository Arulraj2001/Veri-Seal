'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Check,
  Copy,
  Headphones,
  Globe2,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { translations } from '@/lib/translations';
import { KagazoLogo } from '@/components/ui/KagazoLogo';

export function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [contactEmail, setContactEmail] = React.useState('support@kagazo.in');
  const [whatsappNumber, setWhatsappNumber] = React.useState('+919876543210');
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

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/es') || pathname?.startsWith('/fr') || pathname?.startsWith('/de') || pathname?.startsWith('/it') || pathname?.startsWith('/br') || pathname?.startsWith('/uk') || pathname?.startsWith('/mx') || pathname?.startsWith('/au')) {
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
                  href="/verify"
                  className="text-emerald-700 font-black hover:text-primary transition-colors block py-0.5 leading-tight hover:translate-x-0.5 transform duration-150"
                >
                  Verify Document Signatures ★
                </Link>
              </li>
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

        {/* International Statutory Portals Banner (160 Tools across 8 Nations) */}
        <div className="py-8 border-b border-surface-darker/80 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-primary" />
                  <span>International Sovereign Statutory Portals</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  160 Tools • 100% In-Browser
                </span>
              </div>
              <p className="text-xs text-text-main/70">
                Compliant statutory calculation, tax simulation, and document verification engines tailored to 8 national jurisdictions.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Data Retention</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            <Link
              href="/es"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-orange-400 hover:bg-orange-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇪🇸</span>
                <span className="font-bold text-xs text-text-main truncate">España</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded">
                20 Herramientas
              </span>
            </Link>

            <Link
              href="/de"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇩🇪</span>
                <span className="font-bold text-xs text-text-main truncate">Deutschland</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded">
                20 Rechner
              </span>
            </Link>

            <Link
              href="/fr"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇫🇷</span>
                <span className="font-bold text-xs text-text-main truncate">France</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded">
                20 Simulateurs
              </span>
            </Link>

            <Link
              href="/it"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-sky-400 hover:bg-sky-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇮🇹</span>
                <span className="font-bold text-xs text-text-main truncate">Italia</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-sky-700 bg-sky-100/80 px-1.5 py-0.5 rounded">
                20 Calcolatori
              </span>
            </Link>

            <Link
              href="/br"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇧🇷</span>
                <span className="font-bold text-xs text-text-main truncate">Brasil</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                20 Ferramentas
              </span>
            </Link>

            <Link
              href="/uk"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇬🇧</span>
                <span className="font-bold text-xs text-text-main truncate">United Kingdom</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-indigo-900 bg-indigo-100/80 px-1.5 py-0.5 rounded">
                20 Tools
              </span>
            </Link>

            <Link
              href="/mx"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇲🇽</span>
                <span className="font-bold text-xs text-text-main truncate">México</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                20 Herramientas
              </span>
            </Link>

            <Link
              href="/au"
              className="flex flex-col items-start p-2.5 rounded-xl bg-surface border border-surface-darker hover:border-amber-500 hover:bg-amber-50/50 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-base group-hover:scale-110 transition-transform">🇦🇺</span>
                <span className="font-bold text-xs text-text-main truncate">Australia</span>
              </div>
              <span className="mt-1 text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                20 Tools
              </span>
            </Link>
          </div>
        </div>

        {/* Legal, Trust & Corporate Navigation Bar */}
        <div className="py-5 border-b border-surface-darker/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <nav aria-label="Legal & Trust Links" className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-text-main/75 font-medium">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-primary transition-colors">
              Disclaimer
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link href="/how-it-works" className="hover:text-primary font-bold text-text-main transition-colors">
              How It Works
            </Link>
            <Link href="/about" className="hover:text-primary font-bold text-text-main transition-colors">
              About Us
            </Link>
            <Link href="/tools" className="hover:text-primary transition-colors">
              Tools Directory
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog &amp; Guides
            </Link>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="text-xs font-bold text-text-main hover:text-primary transition-colors flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl hover:border-primary/40 shadow-2xs"
            >
              <Headphones className="w-3.5 h-3.5 text-primary" />
              <span>Support Desk</span>
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 bg-primary-light/60 border border-primary/20 px-3 py-1.5 rounded-xl transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{contactEmail}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Full-Width Symmetrical Copyright & Badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-main/70">
          <p className="text-center sm:text-left leading-relaxed text-text-main/75 max-w-2xl">
            © 2026 Kagazo. {t.footer_rights || (isTamil ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை' : 'All rights reserved')} — {isTamil
              ? 'இந்திய அரசு PDF டிஜிட்டல் கையொப்பங்களை சரிபார்க்கும் இலவச தளம்.'
              : 'Free cryptographically verified sovereign PDF digital signature validator, biometric photo studios, and statutory civic utilities.'}
          </p>

          {/* Made with Love Badge */}
          <div className="flex items-center gap-2 shrink-0 bg-white border border-surface-darker px-4 py-2 rounded-full font-bold shadow-2xs text-text-main text-xs">
            <span>{t.footer_made || (isTamil ? 'இந்தியாவிற்காக ❤️ உடன் உருவாக்கப்பட்டது 🇮🇳' : 'Made with ❤️ for India 🇮🇳 & Global Citizens 🌐')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
