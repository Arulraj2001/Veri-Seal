'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileCheck,
  LayoutGrid,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface HeroSectionProps {
  hideDecisionEngines?: boolean;
}

export function HeroSection({ hideDecisionEngines = true }: HeroSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="hero" className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 overflow-hidden bg-[#fbfbfb]">
      
      {/* ========================================================================= */}
      {/* 1. COMPREHENSIVE SEO FOUNDATION (ACCESSIBLE TO GOOGLE, SCREEN-READERS)    */}
      {/* ========================================================================= */}
      <div className="sr-only">
        <h1>
          Kagazo — India&apos;s Sovereign Citizen &amp; Document Utility Suite: Verify Indian Government PDF Signatures, Fix Yellow &quot;?&quot; Mark to Green Tick, Exam Photo Resizer &amp; A4 Multi-Card Gang Sheets
        </h1>
        <p>
          Instantly validate digital signatures on e-Aadhaar, Tamil Nadu e-Sevai, Patta/Chitta, Income, Community, Caste, PAN card, and DigiLocker PDFs with official CCA India Root (RCAI) cryptographic verification.
          Format zero-rejection exam photos with Name and DOP (Date of Photograph) banners for UPSC Civil Services, TNPSC OTR, SSC CGL, IBPS, and NEET.
          Create 5-in-1 A4 ID gang sheets, format PVC smart card trays for Epson L805, mask Aadhaar numbers client-side, and compress PDFs to strict 200KB limits.
          100% free, private in browser memory (RAM) with zero cloud uploads under India&apos;s DPDP Act 2023.
        </p>

        <div>
          <h2>Core Sovereign Document Utilities:</h2>
          <ul>
            <li>Government PDF Digital Signature Verification with CCA India RCAI LTV green checkmark</li>
            <li>TNPSC OTR &amp; UPSC Photo Resizer (125x165px, 350x350px with DOP Date Banner)</li>
            <li>5-in-1 A4 Multi-Card ID Gang Sheet Maker for Cyber Cafés and CSC Centers</li>
            <li>UIDAI-Compliant 8-Digit Masked Aadhaar Generator (Client-Side Canvas)</li>
            <li>Govt Exam PDF Compressor to exact 200KB, 100KB, and 500KB ceilings</li>
            <li>Civic Decision Engines: Home Construction Cost OS, Vehicle TCO OS, and Business Profit OS</li>
          </ul>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE MASTER HERO BANNER (100% USER GIVEN IMAGE REFERENCE)               */}
      {/* ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200/90 bg-white">
          
          {/* Main Visual Image (Aspect ratio 1024:575 preserved identically) */}
          <div className="relative aspect-[1024/575] w-full select-none">
            <Image
              src="/images/hero-banner-main.png"
              alt="Kagazo — Your Documents. Your Rights. 100% Private. Sovereign Citizen & Document Utility Suite"
              fill
              priority
              quality={100}
              className="object-cover object-center"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />

            {/* ------------------------------------------------------------------- */}
            {/* FLOATING ACTION BUTTONS: Placed precisely in the space above         */}
            {/* "No uploads. No cloud storage. 100% secure in your browser RAM."    */}
            {/* (Left: 3.8%, Top: 68.2%, Width: 33.5%, Height: 9.8%)                 */}
            {/* ------------------------------------------------------------------- */}
            <div className="absolute left-[3.8%] top-[68.2%] w-[33.5%] h-[9.8%] z-30 hidden sm:flex items-center gap-2 lg:gap-3">
              
              {/* Button 1: Verify a PDF Now */}
              <Link
                href="/verify"
                className="flex-1 h-full inline-flex items-center justify-center gap-1.5 md:gap-2 px-2.5 sm:px-3 md:px-4 rounded-lg md:rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] sm:text-xs md:text-sm lg:text-sm xl:text-[15px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
                title="Verify Government PDF Signatures with CCA India Green Tick"
              >
                <FileCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-white shrink-0" />
                <span>Verify a PDF Now</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-0.5 shrink-0" />
              </Link>

              {/* Button 2: Explore All Tools */}
              <Link
                href="/tools"
                className="flex-1 h-full inline-flex items-center justify-center gap-1.5 md:gap-2 px-2.5 sm:px-3 md:px-4 rounded-lg md:rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-[11px] sm:text-xs md:text-sm lg:text-sm xl:text-[15px] border border-slate-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all whitespace-nowrap"
                title="Explore 57+ Free Client-Side Citizen Tools"
              >
                <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700 shrink-0" />
                <span>Explore All Tools</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-0.5 shrink-0" />
              </Link>

            </div>

            {/* ------------------------------------------------------------------- */}
            {/* INTERACTIVE CLICKABLE HOTSPOTS: Bottom 6 Tool Cards                  */}
            {/* ------------------------------------------------------------------- */}
            {/* 1. Exam Photo Suite */}
            <Link
              href="/tools/tnpsc-combo-pack"
              className="absolute left-[39.2%] top-[76.2%] w-[9.6%] h-[21.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/60 transition-all"
              title="Launch Exam Photo Suite (UPSC, TNPSC, SSC OTR)"
            />

            {/* 2. A4 Multi-Card Print Studio */}
            <Link
              href="/tools/a4-multi-card-sheet"
              className="absolute left-[48.9%] top-[76.2%] w-[9.6%] h-[21.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/60 transition-all"
              title="Launch A4 Multi-Card Print Studio (5-in-1 Sheet at 300 DPI)"
            />

            {/* 3. Mask Aadhaar (UIDAI Compliant) */}
            <Link
              href="/tools/mask-aadhaar"
              className="absolute left-[58.6%] top-[76.2%] w-[9.6%] h-[21.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/60 transition-all"
              title="Launch Mask Aadhaar (UIDAI & RBI KYC Compliant)"
            />

            {/* 4. Signature Cleaner & Extractor */}
            <Link
              href="/tools/signature-cleaner-extractor"
              className="absolute left-[68.3%] top-[76.2%] w-[9.6%] h-[21.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/60 transition-all"
              title="Launch Signature Cleaner & Extractor"
            />

            {/* 5. PDF Compressors (Zero Blur) */}
            <Link
              href="/tools/compress-pdf-to-200kb"
              className="absolute left-[78.0%] top-[76.2%] w-[9.6%] h-[21.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/60 transition-all"
              title="Launch PDF Compressors (Strict 200KB / 100KB limits)"
            />

            {/* 6. Self-Attest PDF */}
            <Link
              href="/tools/self-attest-pdf"
              className="absolute left-[87.7%] top-[76.2%] w-[9.6%] h-[21.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/60 transition-all"
              title="Launch Self-Attest PDF Document Tool"
            />

            {/* ------------------------------------------------------------------- */}
            {/* INTERACTIVE CLICKABLE HOTSPOTS: Laptop Screen Portals               */}
            {/* ------------------------------------------------------------------- */}
            {/* Laptop Verify PDF Button */}
            <Link
              href="/verify"
              className="absolute left-[59.2%] top-[37.4%] w-[7.8%] h-[4.2%] rounded-md cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all"
              title="Verify Government Document Signatures"
            />

            {/* Laptop Explore Tools Button */}
            <Link
              href="/tools"
              className="absolute left-[76.8%] top-[37.4%] w-[7.8%] h-[4.2%] rounded-md cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all"
              title="Explore 57+ Free Tools"
            />

            {/* Laptop Home Cost OS */}
            <Link
              href="/home-cost"
              className="absolute left-[55.8%] top-[55.2%] w-[8.2%] h-[4.2%] rounded-md cursor-pointer hover:ring-2 hover:ring-amber-500 transition-all"
              title="Home Construction Cost OS"
            />

            {/* Laptop Vehicle OS */}
            <Link
              href="/vehicle-os"
              className="absolute left-[68.4%] top-[55.2%] w-[8.2%] h-[4.2%] rounded-md cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all"
              title="Vehicle Decision OS (EV vs Petrol TCO)"
            />

            {/* Laptop Business Profit OS */}
            <Link
              href="/business-os"
              className="absolute left-[81.0%] top-[55.2%] w-[8.2%] h-[4.2%] rounded-md cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
              title="Business Profit & Margin OS"
            />

            {/* Fanned Certificates Background -> Link to Verify Studio */}
            <Link
              href="/verify"
              className="absolute left-[45%] top-[5%] w-[42%] h-[25%] cursor-pointer"
              title="Click to Verify e-Aadhaar, PAN, TN e-Sevai, or Patta/Chitta"
            />

          </div>

          {/* =================================================================== */}
          {/* MOBILE ACTION BUTTONS (Clean, accessible on touchscreens < 640px)   */}
          {/* =================================================================== */}
          <div className="sm:hidden p-4 bg-white border-t border-slate-200/80 flex flex-col gap-2.5">
            <Link
              href="/verify"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-extrabold text-sm shadow-md"
            >
              <FileCheck className="w-4 h-4 text-white" />
              <span>Verify a PDF Now</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/tools"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-800 font-extrabold text-sm border border-slate-300 shadow-2xs"
            >
              <LayoutGrid className="w-4 h-4 text-slate-700" />
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
