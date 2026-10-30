'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Check, AlertTriangle, KeyRound, Sparkles, Building2 } from 'lucide-react';
import type { DocumentCategory } from '@/lib/doc-categories';

interface DocumentBlueprintProps {
  category: DocumentCategory;
  showVerifiedState?: boolean;
}

export function DocumentBlueprint({ category, showVerifiedState = false }: DocumentBlueprintProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const activeState = showVerifiedState || isHovered;

  // Blueprint metadata per document type
  const docMeta: Record<
    DocumentCategory,
    {
      title: string;
      authority: string;
      subAuthority: string;
      watermark: string;
      sealType: string;
      signatureLocation: string;
      signerText: string;
      passHint: string;
      accentColor: string;
      badge: string;
    }
  > = {
    all: {
      title: 'Indian Official Sovereign Document',
      authority: 'Government of India / State Authority',
      subAuthority: 'CCA India RCAI Digital Signature Hierarchy',
      watermark: 'OFFICIAL DSC',
      sealType: 'CCA India RCAI',
      signatureLocation: 'Bottom-Right Revision Block',
      signerText: 'Controller of Certifying Authorities (CCA)',
      passHint: 'Issuer DOB, PAN or Name if encrypted',
      accentColor: 'border-orange-500/40 bg-orange-50/30 text-orange-600',
      badge: 'Universal Sovereign PKI',
    },
    aadhaar: {
      title: 'Electronic Aadhaar (e-Aadhaar)',
      authority: 'Unique Identification Authority of India (UIDAI)',
      subAuthority: 'Government of India Sovereign Identity',
      watermark: 'UIDAI e-Aadhaar',
      sealType: 'DS UIDAI 01/02',
      signatureLocation: 'Bottom-Right Signature Box',
      signerText: 'DS UNIQUE IDENTIFICATION AUTHORITY OF INDIA',
      passHint: 'CAPITAL Name (4 letters) + Birth Year (e.g. RAMA1992)',
      accentColor: 'border-blue-500/40 bg-blue-50/30 text-blue-600',
      badge: 'UIDAI HSM Signature',
    },
    tn_esevai: {
      title: 'Tamil Nadu Revenue & e-Sevai Certificate',
      authority: 'Government of Tamil Nadu - Revenue Dept',
      subAuthority: 'Tamil Nadu e-Governance Agency (TNeGA)',
      watermark: 'TN REVENUE',
      sealType: 'TNeGA / NIC Sub-CA',
      signatureLocation: 'Bottom Tahsildar / DSC Seal',
      signerText: 'Tahsildar / Zonal Deputy Tahsildar (NIC DSC)',
      passHint: 'Usually unencrypted. If requested: DOB (DDMMYYYY)',
      accentColor: 'border-emerald-500/40 bg-emerald-50/30 text-emerald-600',
      badge: 'Revenue / e-District DSC',
    },
    tax_form16: {
      title: 'Form 16 / TRACES TDS Certificate',
      authority: 'Income Tax Department (TRACES)',
      subAuthority: 'Ministry of Finance, Government of India',
      watermark: 'TRACES FORM 16',
      sealType: 'Employer Class 3 DSC',
      signatureLocation: 'Part A & B Authorized Signatory',
      signerText: 'Authorized Signatory (eMudhra / Capricorn)',
      passHint: 'Company or Personal PAN in CAPITAL (e.g. ABCDE1234F)',
      accentColor: 'border-indigo-500/40 bg-indigo-50/30 text-indigo-600',
      badge: 'ITD TRACES Certified',
    },
    pan: {
      title: 'Instant Electronic PAN (e-PAN)',
      authority: 'Income Tax Department - Protean / UTIITSL',
      subAuthority: 'Central Board of Direct Taxes (CBDT)',
      watermark: 'INCOME TAX DEPT',
      sealType: 'UTIITSL / Protean Sub-CA',
      signatureLocation: 'Bottom Cryptographic QR & DSC',
      signerText: 'Income Tax Sub-CA / Protean eGov DSC',
      passHint: 'Date of Birth in DDMMYYYY format (e.g. 25081995)',
      accentColor: 'border-purple-500/40 bg-purple-50/30 text-purple-600',
      badge: 'CBDT e-PAN Seal',
    },
    digilocker: {
      title: 'DigiLocker Verified Marksheet / Degree',
      authority: 'Ministry of Electronics & IT (MeitY)',
      subAuthority: 'National DigiLocker Repository / Exam Board',
      watermark: 'DIGILOCKER VERIFIED',
      sealType: 'DigiLocker CA',
      signatureLocation: 'MeitY Green Badge & QR Block',
      signerText: 'DigiLocker Verification CA (MeitY)',
      passHint: 'Usually unencrypted; DigiLocker 6-digit PIN if locked',
      accentColor: 'border-teal-500/40 bg-teal-50/30 text-teal-600',
      badge: 'MeitY National Trust',
    },
  };

  const current = docMeta[category] || docMeta.all;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-2xl bg-gradient-to-b from-white to-surface/80 border border-surface-darker/90 p-3.5 sm:p-4 shadow-2xs overflow-hidden transition-all duration-300"
    >
      {/* Blueprint Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-surface-darker/70">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="text-xs font-bold text-text-main truncate">
            {current.title}
          </span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-darker text-text-muted shrink-0">
          {current.badge}
        </span>
      </div>

      {/* Schematic Certificate Layout Wireframe */}
      <div className="relative rounded-xl border border-dashed border-slate-300 bg-white/95 p-3 sm:p-3.5 space-y-2.5 text-left font-mono">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
          <span className="text-2xl sm:text-3xl font-black uppercase text-text-main rotate-[-15deg]">
            {current.watermark}
          </span>
        </div>

        {/* Top Header Lines representing Government Header */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div className="space-y-1">
            <div className="h-2 w-28 sm:w-36 rounded bg-slate-300/80" />
            <div className="h-1.5 w-20 sm:w-24 rounded bg-slate-200" />
          </div>
          <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Mock Content Rows (Body of Document) */}
        <div className="space-y-1.5 py-1">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-16 rounded bg-slate-200" />
            <div className="h-1.5 w-32 rounded bg-slate-100" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 rounded bg-slate-200" />
            <div className="h-1.5 w-28 rounded bg-slate-100" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 rounded bg-slate-200" />
            <div className="h-1.5 w-24 rounded bg-slate-100" />
          </div>
        </div>

        {/* Real Dynamic Signature Block: Before (Yellow ?) vs After (Green ✔) */}
        <div className="pt-1 flex items-end justify-between gap-2">
          <div className="text-[9px] font-sans text-text-muted leading-tight">
            <span className="font-bold text-slate-700 block">Cryptographic Location:</span>
            <span>{current.signatureLocation}</span>
          </div>

          {/* Interactive Stamp Morph */}
          <motion.div
            layout
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-colors duration-300 shrink-0 ${
              activeState
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs'
                : 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
            }`}
          >
            {/* Stamp Icon */}
            <div
              className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                activeState
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-400 text-amber-950'
              }`}
            >
              {activeState ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '?'}
            </div>

            {/* Stamp Text */}
            <div className="leading-tight font-sans">
              <div className="text-[10px] font-bold flex items-center gap-1">
                <span>{activeState ? 'Signature Valid' : 'Validity Unknown'}</span>
                {activeState && (
                  <span className="text-[8px] bg-emerald-200/80 text-emerald-800 px-1 py-0.2 rounded font-mono">
                    LTV
                  </span>
                )}
              </div>
              <div className="text-[8px] opacity-75 truncate max-w-[130px] sm:max-w-[160px]">
                {activeState ? current.signerText : 'Root CA Not Trusted'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Password & Authority Hint Footer */}
      <div className="mt-2.5 pt-2 border-t border-surface-darker/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px]">
        <div className="flex items-center gap-1.5 text-text-main/80">
          <KeyRound className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="font-semibold text-text-main">Passcode Hint:</span>
          <span className="text-primary font-medium">{current.passHint}</span>
        </div>
        <div className="text-[10px] text-text-muted flex items-center gap-1 self-start sm:self-auto">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>{current.subAuthority}</span>
        </div>
      </div>
    </div>
  );
}
