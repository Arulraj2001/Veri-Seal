'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Info,
  Layers,
  ArrowRight,
  Printer,
  Sparkles,
  FileCheck,
  RefreshCw,
  MapPin,
  Clock,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { printIsolatedDocument } from '@/lib/print-utils';

// State Code Mapping according to Indian GST Directorate
const GST_STATE_CODES: Record<string, string> = {
  '01': 'Jammu & Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman & Diu',
  '26': 'Dadra & Nagar Haveli',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh (Old)',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman & Nicobar Islands',
  '36': 'Telangana',
  '37': 'Andhra Pradesh (New)',
  '38': 'Ladakh',
  '97': 'Other Territory',
  '99': 'Centre Jurisdiction',
};

// 4th Character of PAN indicates Entity Constitution
const PAN_ENTITY_TYPES: Record<string, string> = {
  C: 'Company / Private Limited / Limited',
  P: 'Individual / Proprietorship',
  H: 'Hindu Undivided Family (HUF)',
  F: 'Partnership Firm / LLP',
  A: 'Association of Persons (AOP)',
  T: 'Trust',
  B: 'Body of Individuals (BOI)',
  L: 'Local Authority',
  J: 'Artificial Juridical Person',
  G: 'Government Agency',
};

// Verified Sample Presets
const SAMPLE_PRESETS = [
  { name: 'Reliance Retail (Tamil Nadu)', gstin: '33AAACR5055K1ZR' },
  { name: 'SBI (Tamil Nadu)', gstin: '33AAACS8577K1ZQ' },
  { name: 'TCS (Maharashtra)', gstin: '27AAACT2727Q1ZW' },
  { name: 'Infosys (Karnataka)', gstin: '29AAACI4747L1ZF' },
];

export interface GstLiveDetails {
  gstin: string;
  lgnm: string;
  tradeNam: string;
  sts: string;
  rgdt: string;
  lstupdt: string;
  dty: string;
  ctb?: string;
  pradr: string;
}

// Official GSTN MOD 36 Checksum Validation Algorithm
function validateGstinChecksum(gstin: string): { isValid: boolean; expectedChecksum?: string } {
  if (gstin.length !== 15) return { isValid: false };

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let factor = 1;
  let sum = 0;
  const checkChar = gstin[14];

  for (let i = 0; i < 14; i++) {
    const codePoint = chars.indexOf(gstin[i]);
    if (codePoint === -1) return { isValid: false };

    let addend = factor * codePoint;
    factor = factor === 2 ? 1 : 2;
    addend = Math.floor(addend / 36) + (addend % 36);
    sum += addend;
  }

  const remainder = sum % 36;
  const checkCodePoint = (36 - remainder) % 36;
  const expectedChar = chars[checkCodePoint];

  return {
    isValid: expectedChar === checkChar,
    expectedChecksum: expectedChar,
  };
}

export default function GstinVerifierEngine() {
  const [inputGstin, setInputGstin] = useState<string>('33AAACR5055K1ZR');
  const [vendorName, setVendorName] = useState<string>('Reliance Retail Limited');
  const [invoiceRef, setInvoiceRef] = useState<string>('INV-2026-001');
  const [copied, setCopied] = useState<boolean>(false);

  // Live GSTN API search state
  const [liveDetails, setLiveDetails] = useState<GstLiveDetails | null>(null);
  const [isLiveLoading, setIsLiveLoading] = useState<boolean>(false);
  const [liveMessage, setLiveMessage] = useState<string | null>(null);

  const cleanGstin = useMemo(() => inputGstin.trim().toUpperCase().replace(/\s+/g, ''), [inputGstin]);

  // OCR Misread / Typo Detector
  const typoSuggestions = useMemo(() => {
    const suggestions: string[] = [];
    if (cleanGstin.length >= 2) {
      // First 2 characters must be digits
      if (cleanGstin[0] === 'O') suggestions.push('Digit 1: "O" is likely number "0"');
      if (cleanGstin[1] === 'O') suggestions.push('Digit 2: "O" is likely number "0"');
      if (cleanGstin[0] === 'I' || cleanGstin[0] === 'L') suggestions.push('Digit 1: "I/L" is likely number "1"');
      if (cleanGstin[1] === 'I' || cleanGstin[1] === 'L') suggestions.push('Digit 2: "I/L" is likely number "1"');
    }
    if (cleanGstin.length >= 14) {
      if (cleanGstin[13] !== 'Z' && cleanGstin[13] === '2') {
        suggestions.push('Digit 14: "2" is likely the default letter "Z"');
      }
    }
    return suggestions;
  }, [cleanGstin]);

  // Structural Analysis
  const analysis = useMemo(() => {
    if (!cleanGstin) return null;

    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const formatMatch = regex.test(cleanGstin);

    const stateCode = cleanGstin.slice(0, 2);
    const stateName = GST_STATE_CODES[stateCode] || 'Unknown / Invalid State Code';

    const panNumber = cleanGstin.slice(2, 12);
    const entityFourthChar = panNumber[3] || '';
    const entityType = PAN_ENTITY_TYPES[entityFourthChar] || 'Standard Taxpayer';

    const entityNumber = cleanGstin[12] || '';
    const defaultZ = cleanGstin[13] || '';
    const checksumChar = cleanGstin[14] || '';

    let checksumResult: { isValid: boolean; expectedChecksum?: string } = { isValid: false, expectedChecksum: '' };
    if (cleanGstin.length === 15) {
      checksumResult = validateGstinChecksum(cleanGstin);
    }

    const isFullyValid = formatMatch && checksumResult.isValid;

    return {
      formatMatch,
      isFullyValid,
      stateCode,
      stateName,
      panNumber,
      entityType,
      entityNumber,
      defaultZ,
      checksumChar,
      expectedChecksum: checksumResult.expectedChecksum || '',
    };
  }, [cleanGstin]);

  // Query live GST search API whenever 15-character GST format matches
  useEffect(() => {
    if (!analysis?.formatMatch || cleanGstin.length !== 15) {
      setLiveDetails(null);
      setLiveMessage(null);
      return;
    }

    let isMounted = true;
    setIsLiveLoading(true);
    setLiveMessage(null);

    fetch(`/api/gst-lookup?gstin=${encodeURIComponent(cleanGstin)}`)
      .then((res) => res.json())
      .then((resData) => {
        if (!isMounted) return;
        if (resData.success && resData.data) {
          setLiveDetails(resData.data);
          if (resData.data.tradeNam && resData.data.tradeNam !== 'N/A') {
            setVendorName(resData.data.tradeNam);
          } else if (resData.data.lgnm && resData.data.lgnm !== 'N/A') {
            setVendorName(resData.data.lgnm);
          }
        } else {
          setLiveDetails(null);
          if (resData.message) {
            setLiveMessage(resData.message);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setLiveDetails(null);
          setLiveMessage('Operating in offline checksum verification mode.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLiveLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [cleanGstin, analysis?.formatMatch]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanGstin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print Vendor Due Diligence Slip
  const handlePrintSlip = () => {
    if (!analysis) return;
    const nowStr = new Date().toLocaleString('en-IN', {
      dateStyle: 'long',
      timeStyle: 'medium',
    });

    const slipHtml = `
      <div style="width: 210mm; min-height: 297mm; margin: 0 auto; padding: 15mm 20mm; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0F172A; background: #FFFFFF; box-sizing: border-box;">
        <!-- Header -->
        <div style="border-bottom: 2px solid #0F172A; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="font-size: 16pt; font-weight: 800; margin: 0; text-transform: uppercase;">
              GSTIN VERIFICATION &amp; VENDOR DUE DILIGENCE SLIP
            </h1>
            <p style="font-size: 9pt; color: #475569; margin: 4px 0 0 0;">
              Mathematical Verification under ISO/IEC 7064 MOD 36-2 • Section 16(2) CGST Act Compliance
            </p>
          </div>
          <div style="text-align: right; font-size: 8.5pt; color: #64748B;">
            <p style="margin: 0;">Verified: <strong>${nowStr}</strong></p>
            <p style="margin: 2px 0 0 0;">Ref: <strong>${invoiceRef || 'N/A'}</strong></p>
          </div>
        </div>

        <!-- Verdict Banner -->
        <div style="background: ${analysis.isFullyValid ? '#ECFDF5' : '#FFF1F2'}; border: 2px solid ${analysis.isFullyValid ? '#059669' : '#E11D48'}; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="font-size: 13pt; font-weight: 800; color: ${analysis.isFullyValid ? '#065F46' : '#9F1239'}; text-transform: uppercase;">
              ${analysis.isFullyValid ? '✔ VERIFIED AUTHENTIC GSTIN' : '✖ INVALID / CHECKSUM MISMATCH'}
            </span>
            <p style="font-size: 9pt; color: #334155; margin: 2px 0 0 0;">
              ${analysis.isFullyValid ? 'Structure, State Code, and Algorithm Checksum are 100% Valid.' : 'The 15th checksum character does not match the computed algorithm.'}
            </p>
          </div>
          <div style="font-size: 18pt; font-family: monospace; font-weight: 800; color: #0F172A;">
            ${cleanGstin}
          </div>
        </div>

        <!-- Key Metrics Table -->
        <table style="width: 100%; border: 1px solid #CBD5E1; font-size: 10pt; margin-bottom: 24px; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600; width: 25%;">Vendor Name</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-weight: 700; width: 75%;" colspan="3">${vendorName || 'Not Specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">State Jurisdiction</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-weight: 700;">Code ${analysis.stateCode} — ${analysis.stateName}</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Embedded PAN</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-family: monospace; font-weight: 700;">${analysis.panNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Taxpayer Entity Type</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0;">${analysis.entityType}</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Entity Index</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0;">${analysis.entityNumber} Registration in State</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Checksum Validation</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0;">Provided: <strong>${analysis.checksumChar}</strong> | Computed: <strong>${analysis.expectedChecksum}</strong></td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Invoice Ref</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0;">${invoiceRef || 'N/A'}</td>
            </tr>
          </tbody>
        </table>

        <!-- Statutory ITC Notice -->
        <div style="background: #F8FAFC; border-left: 4px solid #0F172A; padding: 12px 14px; font-size: 8.5pt; color: #334155; line-height: 1.5; margin-bottom: 40px;">
          <strong>Input Tax Credit (ITC) Compliance Note:</strong><br />
          Under Section 16(2) of the Central Goods and Services Tax (CGST) Act, 2017, registered buyers are required to ensure the supplier possesses a valid GSTIN and reports corresponding tax in GSTR-1. This document serves as proof of mathematical format verification for internal accounting files.
        </div>

        <!-- Verification Sign-off -->
        <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 9pt;">
          <div>
            <p style="margin: 0;">Verified By: ___________________________</p>
            <p style="margin: 4px 0 0 0; color: #64748B;">Accounts / Tax Officer</p>
          </div>
          <div style="text-align: center;">
            <div style="width: 200px; border-bottom: 1px solid #0F172A; margin-bottom: 6px;"></div>
            <p style="font-weight: 700; margin: 0; text-transform: uppercase;">Authorized Signatory</p>
            <p style="font-size: 8pt; color: #64748B; margin: 0;">Accounting &amp; Audit Seal</p>
          </div>
        </div>
      </div>
    `;

    printIsolatedDocument({
      title: `GSTIN_Verification_${cleanGstin}`,
      bodyHtml: slipHtml,
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Engine Main Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  GST Number (GSTIN) Instant Verifier
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  MOD 36 ALGORITHM
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify 15-digit GST numbers, decode PAN and State, and export printable vendor due diligence slips.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintSlip}
              disabled={!analysis?.formatMatch}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 transition-all shadow-md active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Vendor Due Diligence Slip</span>
            </button>
            <a
              href="https://services.gst.gov.in/services/searchtp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
            >
              <span>Govt Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>
        </div>

        {/* Input Bar & Presets */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enter 15-Digit Goods and Services Tax Identification Number (GSTIN)</span>
              </label>

              {/* Sample Presets */}
              <div className="hidden sm:flex items-center gap-1 text-[11px]">
                <span className="text-slate-400 mr-1">Test Samples:</span>
                {SAMPLE_PRESETS.map((p) => (
                  <button
                    key={p.gstin}
                    onClick={() => {
                      setInputGstin(p.gstin);
                      setVendorName(p.name);
                    }}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                maxLength={15}
                value={inputGstin}
                onChange={(e) => setInputGstin(e.target.value)}
                placeholder="e.g. 33AAACS8577K1ZQ"
                className="w-full pl-4 pr-28 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-2xl text-base sm:text-lg font-mono font-bold tracking-widest text-slate-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-inner"
              />
              <button
                onClick={handleCopy}
                className="absolute inset-y-2 right-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Typo alerts */}
            {typoSuggestions.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Potential Typo Detected:</span>
                </span>
                <ul className="list-disc list-inside text-[11px] opacity-90 pl-1">
                  {typoSuggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Character-by-Character Visualizer */}
          {cleanGstin.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Segment Breakdown (15 Characters)
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-center font-bold">
                {/* 1-2 State */}
                <div className="flex flex-col flex-1 min-w-[50px] p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                  <span className="text-sm">{cleanGstin.slice(0, 2) || '--'}</span>
                  <span className="text-[9px] font-sans font-normal opacity-80">State</span>
                </div>
                {/* 3-12 PAN */}
                <div className="flex flex-col flex-[4] min-w-[140px] p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300">
                  <span className="text-sm tracking-wider">{cleanGstin.slice(2, 12) || '----------'}</span>
                  <span className="text-[9px] font-sans font-normal opacity-80">Embedded 10-Digit PAN</span>
                </div>
                {/* 13 Entity */}
                <div className="flex flex-col flex-1 min-w-[40px] p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300">
                  <span className="text-sm">{cleanGstin[12] || '-'}</span>
                  <span className="text-[9px] font-sans font-normal opacity-80">Entity</span>
                </div>
                {/* 14 Default Z */}
                <div className="flex flex-col flex-1 min-w-[40px] p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300">
                  <span className="text-sm">{cleanGstin[13] || '-'}</span>
                  <span className="text-[9px] font-sans font-normal opacity-80">Default &apos;Z&apos;</span>
                </div>
                {/* 15 Checksum */}
                <div className="flex flex-col flex-1 min-w-[40px] p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                  <span className="text-sm">{cleanGstin[14] || '-'}</span>
                  <span className="text-[9px] font-sans font-normal opacity-80">MOD 36</span>
                </div>
              </div>
            </div>
          )}

          {/* Verification Verdict Banner */}
          {analysis && (
            <div
              className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
                analysis.isFullyValid
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                  : analysis.formatMatch
                  ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-500/40 text-amber-950 dark:text-amber-200'
                  : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500/40 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {analysis.isFullyValid ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                ) : analysis.formatMatch ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {analysis.isFullyValid
                    ? 'Valid & Mathematically Verified GSTIN'
                    : analysis.formatMatch
                    ? 'Invalid Checksum Detected (Potential Fake / Typo)'
                    : 'Invalid GSTIN Format (Must be 15 Characters)'}
                </div>
                <div className="text-xs opacity-90 leading-relaxed">
                  {analysis.isFullyValid
                    ? `Complies 100% with the official GSTN structure. Registered under State Code ${analysis.stateCode} (${analysis.stateName}).`
                    : analysis.formatMatch
                    ? `The format matches 15 characters, but the MOD 36 checksum character "${analysis.checksumChar}" does not match the computed algorithm value "${analysis.expectedChecksum}". Check for misread characters.`
                    : 'A standard Indian GSTIN consists of 2 state digits, 10 PAN characters, 1 entity digit, 1 "Z" character, and 1 checksum character.'}
                </div>
              </div>
            </div>
          )}

          {/* Decoded Entity Details Grid */}
          {analysis && analysis.formatMatch && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">State Jurisdiction</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">{analysis.stateName}</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">State Code: {analysis.stateCode}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Embedded PAN Card</span>
                <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 block">{analysis.panNumber}</span>
                <span className="text-[10px] text-slate-500 font-semibold block">10-Digit Income Tax PAN</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Taxpayer Constitution</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">{analysis.entityType}</span>
                <span className="text-[10px] text-slate-500 font-semibold block">Derived from 4th PAN char</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Entity Count / Check</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">Reg #{analysis.entityNumber}</span>
                <span className="text-[10px] text-slate-500 font-semibold block">Checksum: {analysis.checksumChar} (Mod 36)</span>
              </div>
            </div>
          )}

          {/* STEP 3 & 4: Live Taxpayer Information & Status Badge (when valid) */}
          {analysis && analysis.isFullyValid && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="bg-slate-50 dark:bg-slate-800/80 px-5 py-3.5 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                    Official GSTN Taxpayer Verification
                  </span>
                </div>

                {isLiveLoading ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>Querying GSTN Portal...</span>
                  </span>
                ) : liveDetails ? (
                  // Status badge colours: Active (green), Cancelled (red), Suspended (amber), Provisional (blue)
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${
                      liveDetails.sts.toLowerCase().includes('active')
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                        : liveDetails.sts.toLowerCase().includes('cancel')
                        ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                        : liveDetails.sts.toLowerCase().includes('suspend')
                        ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                        : 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        liveDetails.sts.toLowerCase().includes('active')
                          ? 'bg-emerald-600 animate-pulse'
                          : liveDetails.sts.toLowerCase().includes('cancel')
                          ? 'bg-rose-600'
                          : liveDetails.sts.toLowerCase().includes('suspend')
                          ? 'bg-amber-600'
                          : 'bg-blue-600'
                      }`}
                    />
                    <span>Status: {liveDetails.sts}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <span>✓ MOD 36 Algorithm Verified</span>
                  </span>
                )}
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                {isLiveLoading ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                    <p className="text-xs">Fetching taxpayer registration status, legal name, and address...</p>
                  </div>
                ) : liveDetails ? (
                  <div className="space-y-4 text-xs">
                    {/* Legal & Trade Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Trade Name (tradeNam)
                        </span>
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">
                          {liveDetails.tradeNam || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Legal Name (lgnm)
                        </span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block mt-0.5">
                          {liveDetails.lgnm || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">State (Code {analysis.stateCode})</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{analysis.stateName}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Business Type (dty)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{liveDetails.dty}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Date (rgdt)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{liveDetails.rgdt}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Last Updated (lstupdt)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{liveDetails.lstupdt}</span>
                      </div>
                    </div>

                    {/* Principal Place of Business */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Principal Place of Business (pradr)</span>
                        <p className="text-slate-700 dark:text-slate-300 text-xs font-medium mt-0.5 leading-relaxed">{liveDetails.pradr}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>ISO/IEC 7064 MOD 36 Mathematical Checksum Verified</span>
                    </span>
                    <p className="text-emerald-800/80 dark:text-emerald-300/80 text-[11px] leading-relaxed">
                      {liveMessage || 'Structure, state code, and error-detecting checksum digit match 100% with statutory GST specifications.'}
                    </p>
                  </div>
                )}

                {/* Step 5: Statutory Disclaimer */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Data sourced from GSTN. Verify critical transactions at{' '}
                    <a
                      href="https://services.gst.gov.in/services/searchtp"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      <span>gstin.gov.in</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Audit Reference Inputs for Printable Slip */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Vendor &amp; Invoice Details for Audit Slip (Optional)</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Vendor / Business Name</label>
                <input
                  type="text"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder="e.g. Apex Technologies Pvt Ltd"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Invoice / PO Reference</label>
                <input
                  type="text"
                  value={invoiceRef}
                  onChange={(e) => setInvoiceRef(e.target.value)}
                  placeholder="e.g. INV-2026-890"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <AdSlot slot="in_content" />
        </div>
      </div>
    </div>
  );
}
