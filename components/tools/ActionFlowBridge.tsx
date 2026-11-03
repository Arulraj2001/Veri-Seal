'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileCheck2, Camera, PenTool, Sparkles, Shield, ChevronRight } from 'lucide-react';

export type WorkflowType = 'tnpsc' | 'passport' | 'ssc' | 'civic_pdf';

interface WorkflowStep {
  title: string;
  badge: string;
  description: string;
  href: string;
  isCurrent?: boolean;
}

const WORKFLOWS: Record<WorkflowType, {
  portal: string;
  heading: string;
  subheading: string;
  steps: WorkflowStep[];
}> = {
  tnpsc: {
    portal: 'TNPSC OTR 2026 Portal Compliance',
    heading: 'Complete Your Full TNPSC Application Package',
    subheading: 'Official TNPSC submission requires four distinct verified assets. Don’t risk application rejection on tnpscexams.in:',
    steps: [
      {
        title: 'Candidate Photo & DOP',
        badge: '20–50 KB • 200×230 px',
        description: 'Mandatory white background with candidate name and date of photo printed at bottom.',
        href: '/tools/tnpsc-photo-signature-resizer',
        isCurrent: true,
      },
      {
        title: 'Candidate Signature',
        badge: '10–20 KB • 130×60 px',
        description: 'Black ink signature cropped and calibrated to strict 10–20 KB ceiling.',
        href: '/tools/signature-cleaner-extractor',
      },
      {
        title: 'Community / PSTM PDF',
        badge: 'Strictly < 200 KB',
        description: 'Single or multi-page revenue certificate compressed without blurring digital seal.',
        href: '/tools/compress-pdf-to-200kb',
      },
      {
        title: 'Left Thumb Impression',
        badge: '10–50 KB • 300 DPI',
        description: 'Clear blue/black ink thumb impression enhanced and resized for OTR biometric slot.',
        href: '/tools/thumb-impression-resizer',
      },
    ],
  },
  passport: {
    portal: 'Print Studio & Cyber Café Workflow',
    heading: 'Print-Ready Passport & Biometric Next Steps',
    subheading: 'Maximize your photo print efficiency and complete your statutory identity preparation in seconds:',
    steps: [
      {
        title: '8 Photos on 4×6 Sheet',
        badge: '300 DPI • Cut Marks',
        description: 'Printable 4×6 inch sheet fitting 6 or 8 photos with crop guidelines for standard studios.',
        href: '/tools/passport-photo-sheet-maker',
        isCurrent: true,
      },
      {
        title: 'Date & Name Stamper',
        badge: 'Gov & Bank Mandate',
        description: 'Stamp applicant full name and date of photo on bottom border for exam hall tickets.',
        href: '/tools/photo-date-name-stamper',
      },
      {
        title: 'Biometric Face Aligner',
        badge: 'ICAO 70–80% Rule',
        description: 'Verify eye-level horizontal line and 70% to 80% facial coverage for passport agencies.',
        href: '/tools/biometric-face-aligner',
      },
      {
        title: 'Mask Aadhaar (8 Digits)',
        badge: 'UIDAI Compliant',
        description: 'Redact the first 8 digits of your Aadhaar card for hotel check-ins and exam entry safety.',
        href: '/tools/mask-aadhaar',
      },
    ],
  },
  ssc: {
    portal: 'SSC CGL & CHSL 2026 Portal Compliance',
    heading: 'SSC Combined Exam Document Pipeline',
    subheading: 'Avoid live photo upload mismatch and dimension errors on ssc.gov.in:',
    steps: [
      {
        title: 'SSC Live/Uploaded Photo',
        badge: '20–50 KB • 3.5×4.5 cm',
        description: 'Strict 20–50 KB JPEG with uniform light background and zero glare.',
        href: '/tools/ssc-photo-signature-resizer',
        isCurrent: true,
      },
      {
        title: 'SSC Signature Resizer',
        badge: '10–20 KB • 4.0×2.0 cm',
        description: 'Black ink signature cropped to exact 6×2 cm bounding box under 20 KB.',
        href: '/tools/signature-cleaner-extractor',
      },
      {
        title: 'Marksheet PDF Merger',
        badge: '< 500 KB Multi-Page',
        description: 'Merge 10th, 12th, and degree marksheets into a single lightweight PDF for document verification.',
        href: '/tools/merge-marksheets-pdf',
      },
      {
        title: 'Date & Name Stamper',
        badge: 'SSC & UPSC Format',
        description: 'Embed required DOP stamp to prevent administrative rejection.',
        href: '/tools/photo-date-name-stamper',
      },
    ],
  },
  civic_pdf: {
    portal: 'Sovereign Digital Document Suite',
    heading: 'Civic PDF Security & Submission Next Steps',
    subheading: 'Ensure full legal evidentiary validity under Section 65B of the IT Act:',
    steps: [
      {
        title: 'Cryptographic Signature',
        badge: 'CCA India Green Tick',
        description: 'Validate CCA India root chain and convert yellow question mark into permanent green tick.',
        href: '/#upload-zone',
        isCurrent: true,
      },
      {
        title: 'Mask Aadhaar (8 Digits)',
        badge: 'Zero Storage RAM',
        description: 'Mask the first 8 digits of your e-Aadhaar PDF before sharing with external third parties.',
        href: '/tools/mask-aadhaar',
      },
      {
        title: 'Compress PDF (< 200 KB)',
        badge: 'Gov Portal Preset',
        description: 'Shrink certified PDF to meet state e-Sevai and bank KYC size ceilings without losing clarity.',
        href: '/tools/compress-pdf-to-200kb',
      },
      {
        title: 'Remove PDF Password',
        badge: 'Instant Decryption',
        description: 'Permanently remove open passwords from verified PDFs for frictionless document sharing.',
        href: '/tools/unlock-pdf',
      },
    ],
  },
};

interface ActionFlowBridgeProps {
  workflow: WorkflowType;
  currentStepHref?: string;
}

export function ActionFlowBridge({ workflow, currentStepHref }: ActionFlowBridgeProps) {
  const config = WORKFLOWS[workflow];
  if (!config) return null;

  return (
    <section className="bg-gradient-to-br from-white via-surface/40 to-primary-light/20 rounded-3xl border border-primary/25 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-darker/60 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{config.portal}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-text-main tracking-tight">
            {config.heading}
          </h2>
          <p className="text-xs sm:text-sm text-text-main/75 max-w-2xl leading-relaxed">
            {config.subheading}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>100% Free • In-Browser</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.steps.map((step, idx) => {
          const isCurrent = currentStepHref ? step.href === currentStepHref : step.isCurrent;

          return (
            <div
              key={step.title}
              className={`flex flex-col justify-between p-4 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-primary-light/40 border-primary shadow-xs ring-1 ring-primary/20'
                  : 'bg-white border-surface-darker hover:border-primary/40 hover:shadow-xs group'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-main/70 border border-surface-darker'
                    }`}
                  >
                    Step 0{idx + 1} {isCurrent && '• Active'}
                  </span>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-text-main leading-snug group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-[11px] text-text-main/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-surface-darker/60">
                {isCurrent ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Currently On This Tool</span>
                  </div>
                ) : (
                  <Link
                    href={step.href}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-primary group-hover:text-primary-hover transition-colors"
                  >
                    <span>Launch Step 0{idx + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

