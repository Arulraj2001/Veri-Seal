'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  FileCheck,
  LayoutGrid,
  ShieldCheck,
  Zap,
  Calculator,
  BookOpen,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface HeroSectionProps {
  hideDecisionEngines?: boolean;
}

export function HeroSection({ hideDecisionEngines = true }: HeroSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="hero" className="relative pt-24 pb-10 md:pt-28 md:pb-14 overflow-hidden bg-[#fbfbfb] border-b border-slate-200/80">
      {/* Background Indian Tricolor & Warm Monument Atmosphere */}
      <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full pointer-events-none -z-10 opacity-70">
        <div className="absolute top-0 right-0 w-[600px] h-[350px] bg-gradient-to-bl from-amber-500/10 via-amber-200/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-gradient-to-l from-emerald-500/10 via-teal-200/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: BRAND, HEADLINE, VALUE PILLS, BUTTONS & TRUST (100% MATCH)   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-left">
            
            {/* 1. Brand Logo & "Made for Indian Citizens" Pill */}
            <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3">
              {/* Brand Logo & Tagline */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-2xs">
                  <FileText className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    Kagazo
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 tracking-tight mt-0.5">
                    India&apos;s Sovereign Citizen &amp; Document Utility Suite
                  </div>
                </div>
              </div>

              {/* Made for Indian Citizens Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                {/* Circular Indian Tricolor Badge */}
                <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-300 flex flex-col shrink-0">
                  <div className="h-1/3 bg-[#FF9933]" />
                  <div className="h-1/3 bg-white flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#000080]" />
                  </div>
                  <div className="h-1/3 bg-[#138808]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  Made for Indian Citizens
                </span>
              </div>
            </div>

            {/* 2. Giant Stacked 3-Line Headline */}
            <div className="space-y-0 text-4xl sm:text-5xl lg:text-5xl xl:text-[58px] font-black tracking-tight leading-[1.06]">
              <div className="text-slate-900">Your Documents.</div>
              <div className="text-blue-600">Your Rights.</div>
              <div className="text-emerald-600">100% Private.</div>
            </div>

            {/* 3. Subtitle */}
            <div className="space-y-0.5">
              <div className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                Verify • Prepare • Calculate • Comply
              </div>
              <div className="text-sm sm:text-base font-medium text-slate-600">
                All in One Place. Built for India.
              </div>
            </div>

            {/* 4. Four Key Value Proposition Badges (Row of 4) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              
              {/* Badge 1: 100% In-Browser Privacy */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[11px] font-black text-slate-900 leading-tight">
                    100% In-Browser Privacy
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    Zero Uploads · Zero File Retention
                  </div>
                </div>
              </div>

              {/* Badge 2: 57+ Free Utilities */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[11px] font-black text-slate-900 leading-tight">
                    57+ Free Utilities
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    Photos, PDFs, KYC, Compliance &amp; More
                  </div>
                </div>
              </div>

              {/* Badge 3: Civic Decision Engines */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[11px] font-black text-slate-900 leading-tight">
                    Civic Decision Engines
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    Home • Vehicle • Business
                  </div>
                </div>
              </div>

              {/* Badge 4: Expert Knowledge Hub */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[11px] font-black text-slate-900 leading-tight">
                    Expert Knowledge Hub
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    Step-by-step Guides for Every Citizen
                  </div>
                </div>
              </div>

            </div>

            {/* 5. Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              {/* Primary Blue Button */}
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <FileCheck className="w-4 h-4 text-white" />
                <span>Verify a PDF Now</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              {/* Secondary White Button */}
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all"
              >
                <LayoutGrid className="w-4 h-4 text-slate-700" />
                <span>Explore All Tools</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>

            {/* 6. Privacy Reassurance Note */}
            <div className="text-xs text-slate-500 font-medium">
              No uploads. No cloud storage. 100% secure in your browser RAM.
            </div>

            {/* 7. Bottom Trust Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-slate-200/70 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                <span>Compliant with India&apos;s DPDP Act 2023</span>
              </div>

              <div className="flex items-center gap-1.5">
                <img
                  src="/logos/emblem_of_india.svg"
                  alt="Emblem of India"
                  className="w-3.5 h-4 object-contain grayscale opacity-80"
                />
                <span>Trusted by Millions of Indian Citizens</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Works Offline (PWA Enabled)</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: LAPTOP MOCKUP, FANNED CERTIFICATES & 6 TOOL CARDS            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 w-full relative">
            <div className="relative aspect-[629/575] w-full overflow-hidden rounded-2xl select-none group shadow-xl border border-slate-200/80 bg-white">
              
              {/* High-Resolution 2x Master Visual */}
              <Image
                src="/images/hero-right-complete@2x.png"
                alt="Kagazo Sovereign Citizen Suite — Document Verification, Exam Resizer, Cyber Café Print Lab"
                fill
                priority
                className="object-cover object-left-top"
              />

              {/* ------------------------------------------------------------- */}
              {/* Interactive Clickable Hotspots overlaying the 6 tool cards    */}
              {/* ------------------------------------------------------------- */}
              {/* Card 1: Exam Photo Suite */}
              <Link
                href="/tools/tnpsc-combo-pack"
                className="absolute left-[0.8%] top-[75.5%] w-[15.8%] h-[22.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 transition-all"
                title="Launch Exam Photo Suite (UPSC, TNPSC, SSC)"
              />

              {/* Card 2: A4 Multi-Card Print Studio */}
              <Link
                href="/tools/a4-multi-card-sheet"
                className="absolute left-[17.2%] top-[75.5%] w-[15.8%] h-[22.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 transition-all"
                title="Launch A4 Multi-Card Print Studio (5-in-1 Sheet)"
              />

              {/* Card 3: Mask Aadhaar (UIDAI Compliant) */}
              <Link
                href="/tools/mask-aadhaar"
                className="absolute left-[33.6%] top-[75.5%] w-[15.8%] h-[22.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 transition-all"
                title="Launch Mask Aadhaar (UIDAI Compliant)"
              />

              {/* Card 4: Signature Cleaner & Extractor */}
              <Link
                href="/tools/signature-cleaner-extractor"
                className="absolute left-[50.0%] top-[75.5%] w-[15.8%] h-[22.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 transition-all"
                title="Launch Signature Cleaner & Extractor"
              />

              {/* Card 5: PDF Compressors (Zero Blur) */}
              <Link
                href="/tools/compress-pdf-to-200kb"
                className="absolute left-[66.4%] top-[75.5%] w-[15.8%] h-[22.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 transition-all"
                title="Launch PDF Compressors (Strict 200KB / 100KB limits)"
              />

              {/* Card 6: Self-Attest PDF */}
              <Link
                href="/tools/self-attest-pdf"
                className="absolute left-[82.8%] top-[75.5%] w-[15.8%] h-[22.5%] rounded-xl cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 transition-all"
                title="Launch Self-Attest PDF Tool"
              />

              {/* ------------------------------------------------------------- */}
              {/* Interactive Clickable Hotspots on Laptop Screen               */}
              {/* ------------------------------------------------------------- */}
              {/* Laptop Screen: Verify Government Document Signatures Button */}
              <Link
                href="/verify"
                className="absolute left-[20%] top-[37%] w-[16%] h-[8%] rounded-md cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all"
                title="Verify PDF Signatures"
              />

              {/* Laptop Screen: 57+ Free Tools Explore Button */}
              <Link
                href="/tools"
                className="absolute left-[58%] top-[37%] w-[16%] h-[8%] rounded-md cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all"
                title="Explore 57+ Free Tools"
              />

              {/* Laptop Screen: Home Construction Cost OS */}
              <Link
                href="/home-cost"
                className="absolute left-[13%] top-[53%] w-[18%] h-[6%] rounded-md cursor-pointer hover:ring-2 hover:ring-amber-500 transition-all"
                title="Calculate Home Construction Costs"
              />

              {/* Laptop Screen: Vehicle Decision OS */}
              <Link
                href="/vehicle-os"
                className="absolute left-[41%] top-[53%] w-[18%] h-[6%] rounded-md cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all"
                title="Compare EV vs Petrol vs Hybrid Costs"
              />

              {/* Laptop Screen: Business Profit OS */}
              <Link
                href="/business-os"
                className="absolute left-[69%] top-[53%] w-[18%] h-[6%] rounded-md cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
                title="Model Business Profits & Margins"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
