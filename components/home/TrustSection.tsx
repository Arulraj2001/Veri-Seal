'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, Zap, ShieldCheck, Smartphone, CheckCircle, Award } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function TrustSection() {
  const { language } = useLanguage();

  const trustGuarantees = [
    {
      title: 'Zero Cloud Storage — 100% RAM',
      desc: 'All cryptographic checks, image resizing, and compression run strictly in your browser memory. Nothing is ever uploaded to a server.',
      icon: Lock,
    },
    {
      title: 'No Account or Phone Number',
      desc: 'Instant citizen access. No mandatory mobile number collection, no Aadhaar OTP harvesting, and no registration hurdles.',
      icon: Zap,
    },
    {
      title: 'CCA India Sovereign RCAI Root',
      desc: 'Direct cryptographic chain validation using official Root Certifying Authority of India certificates from MeitY.',
      icon: ShieldCheck,
    },
    {
      title: 'Cross-Device Client WebAssembly',
      desc: 'Engineered to run natively on mobile Chrome, Safari, Android, Windows, and Mac without installing proprietary software.',
      icon: Smartphone,
    },
  ];

  return (
    <section id="trust-section" className="py-20 sm:py-24 bg-surface/60 border-y border-surface-darker/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20 inline-flex items-center gap-1.5 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sovereign Privacy Architecture</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main tracking-tight leading-tight">
            DPDP Act 2023 Compliant. Zero Cloud Storage.
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Unlike commercial PDF websites that secretly upload your Aadhaar and certificates to overseas servers, Kagazo executes 100% inside your local browser RAM.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual RAM Privacy Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-surface-darker/90 shadow-2xl bg-slate-950 group">
              <Image
                src="/images/ram-privacy.jpg"
                alt="Hardware-level RAM Privacy & Zero Cloud Storage Architecture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CLIENT-SIDE WASM EXECUTION</span>
                </div>
                <div className="text-sm font-bold">
                  Isolated Browser Memory Enclave
                </div>
                <div className="text-xs text-slate-300">
                  Memory is instantly wiped the moment your tab closes.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Guarantees & Legal Citations */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustGuarantees.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-surface-darker/80 shadow-soft hover:shadow-card transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-text-main">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Legal Authority Footnote */}
            <div className="rounded-2xl bg-white p-6 border border-surface-darker/80 shadow-soft flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-text-main">
                  {language === 'ta'
                    ? 'இந்தியாவின் தகவல் தொழில்நுட்ப சட்டம் 2000 பிரிவு 5-இன் கீழ் அங்கீகரிக்கப்பட்டது'
                    : "Recognized Under Section 5 of India's Information Technology Act 2000"}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  {language === 'ta'
                    ? 'மத்திய தகவல் தொடர்பு அமைச்சகத்தின் CCA-ஆல் உரிமம் பெற்ற மின்னணு கையொப்பங்கள் இந்திய நீதிமன்றங்களில் முழு சட்ட மதிப்பைக் கொண்டுள்ளன.'
                    : 'Electronic records digitally verified through Certifying Authorities licensed by the Controller of Certifying Authorities (CCA) carry full legal evidentiary value in Indian courts.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
