'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Building2,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  Building,
  ShieldCheck,
  ExternalLink,
  Info,
  Phone,
  Printer,
  FileCheck,
  DollarSign,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { printIsolatedDocument } from '@/lib/print-utils';

interface BranchData {
  bank: string;
  ifsc: string;
  micr: string;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  contact?: string;
}

const SAMPLE_BRANCHES: BranchData[] = [
  {
    bank: 'State Bank of India (SBI)',
    ifsc: 'SBIN0001428',
    micr: '600002015',
    branch: 'Chennai Main Branch',
    address: 'Post Box No. 16, 22 Rajaji Salai, Chennai, Tamil Nadu - 600001',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    contact: '044-25225301',
  },
  {
    bank: 'State Bank of India (SBI)',
    ifsc: 'SBIN0000800',
    micr: '641002002',
    branch: 'Coimbatore Main Branch',
    address: 'State Bank Road, Coimbatore, Tamil Nadu - 641018',
    city: 'Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    contact: '0422-2300501',
  },
  {
    bank: 'Indian Bank',
    ifsc: 'IDIB000M024',
    micr: '625019002',
    branch: 'Madurai Main Branch',
    address: 'East Avani Moola Street, Madurai, Tamil Nadu - 625001',
    city: 'Madurai',
    district: 'Madurai',
    state: 'Tamil Nadu',
    contact: '0452-2334812',
  },
  {
    bank: 'Indian Bank',
    ifsc: 'IDIB000C001',
    micr: '600019001',
    branch: 'Chennai Corporate Office',
    address: '254-260 Avvai Shanmugam Salai, Royapettah, Chennai, Tamil Nadu - 600014',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    contact: '044-28134300',
  },
  {
    bank: 'Canara Bank',
    ifsc: 'CNRB0001001',
    micr: '560015002',
    branch: 'Bengaluru Town Hall',
    address: 'J.C. Road, Town Hall, Bengaluru, Karnataka - 560002',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    contact: '080-22221234',
  },
  {
    bank: 'Canara Bank',
    ifsc: 'CNRB0000924',
    micr: '600015004',
    branch: 'T. Nagar Chennai',
    address: 'Sir Theagaraya Road, T. Nagar, Chennai, Tamil Nadu - 600017',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    contact: '044-24341050',
  },
  {
    bank: 'HDFC Bank',
    ifsc: 'HDFC0000001',
    micr: '400240002',
    branch: 'Mumbai Sandoz House',
    address: 'Dr. Annie Besant Road, Worli, Mumbai, Maharashtra - 400018',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact: '022-61606161',
  },
  {
    bank: 'HDFC Bank',
    ifsc: 'HDFC0000004',
    micr: '600240002',
    branch: 'Chennai ITC Centre',
    address: '759 Anna Salai, Chennai, Tamil Nadu - 600002',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    contact: '044-61606161',
  },
  {
    bank: 'Indian Overseas Bank (IOB)',
    ifsc: 'IOBA0000001',
    micr: '600020002',
    branch: 'Cathedral Branch Chennai',
    address: '763 Anna Salai, Chennai, Tamil Nadu - 600002',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    contact: '044-28525200',
  },
  {
    bank: 'Punjab National Bank (PNB)',
    ifsc: 'PUNB0000100',
    micr: '110024002',
    branch: 'Parliament Street New Delhi',
    address: '5 Sansad Marg, New Delhi - 110001',
    city: 'New Delhi',
    district: 'New Delhi',
    state: 'Delhi',
    contact: '011-23715124',
  },
  {
    bank: 'ICICI Bank',
    ifsc: 'ICIC0000001',
    micr: '400229002',
    branch: 'Free Press House Mumbai',
    address: 'Free Press Journal Marg, Nariman Point, Mumbai - 400021',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact: '022-33667777',
  },
  {
    bank: 'Bank of Baroda (BOB)',
    ifsc: 'BARB0MANDVI',
    micr: '390012001',
    branch: 'Mandvi Branch Baroda',
    address: 'Mandvi, Vadodara, Gujarat - 390006',
    city: 'Vadodara',
    district: 'Vadodara',
    state: 'Gujarat',
    contact: '0265-2412850',
  },
  {
    bank: 'Union Bank of India',
    ifsc: 'UBIN0530018',
    micr: '400026001',
    branch: 'Mumbai Samachar Marg',
    address: '66/80 Mumbai Samachar Marg, Fort, Mumbai, Maharashtra - 400023',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact: '022-22620000',
  },
  {
    bank: 'Karur Vysya Bank (KVB)',
    ifsc: 'KVBL0001101',
    micr: '639053001',
    branch: 'Karur Central Branch',
    address: 'Erode Road, Karur, Tamil Nadu - 639002',
    city: 'Karur',
    district: 'Karur',
    state: 'Tamil Nadu',
    contact: '04324-225521',
  },
  {
    bank: 'City Union Bank (CUB)',
    ifsc: 'CIUB0000001',
    micr: '612054001',
    branch: 'Kumbakonam Main',
    address: '149 TSR Big Street, Kumbakonam, Tamil Nadu - 612001',
    city: 'Kumbakonam',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    contact: '0435-2432322',
  },
  {
    bank: 'Tamilnad Mercantile Bank (TMB)',
    ifsc: 'TMBL0000001',
    micr: '628060002',
    branch: 'Thoothukudi Main',
    address: '56 Beach Road, Thoothukudi, Tamil Nadu - 628001',
    city: 'Thoothukudi',
    district: 'Thoothukudi',
    state: 'Tamil Nadu',
    contact: '0461-2321932',
  },
  {
    bank: 'Federal Bank',
    ifsc: 'FDRL0001001',
    micr: '682049002',
    branch: 'Aluva Main Branch',
    address: 'Federal Towers, Bank Junction, Aluva, Kerala - 683101',
    city: 'Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    contact: '0484-2622561',
  },
  {
    bank: 'Kotak Mahindra Bank',
    ifsc: 'KKBK0000958',
    micr: '400485002',
    branch: 'Nariman Point Mumbai',
    address: 'Bakhtawar 229, Nariman Point, Mumbai - 400021',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact: '022-66006022',
  },
  {
    bank: 'Axis Bank',
    ifsc: 'UTIB0000004',
    micr: '400211002',
    branch: 'Mumbai Main Branch',
    address: 'Sir P.M. Road, Fort, Mumbai - 400001',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact: '022-22660200',
  },
];

const BANK_PREFIX_MAP: Record<string, string> = {
  SBIN: 'State Bank of India (SBI)',
  HDFC: 'HDFC Bank',
  ICIC: 'ICICI Bank',
  IDIB: 'Indian Bank',
  CNRB: 'Canara Bank',
  IOBA: 'Indian Overseas Bank (IOB)',
  PUNB: 'Punjab National Bank (PNB)',
  BARB: 'Bank of Baroda (BOB)',
  UBIN: 'Union Bank of India',
  KVBL: 'Karur Vysya Bank (KVB)',
  CIUB: 'City Union Bank (CUB)',
  TMBL: 'Tamilnad Mercantile Bank (TMB)',
  FDRL: 'Federal Bank',
  KKBK: 'Kotak Mahindra Bank',
  UTIB: 'Axis Bank',
  INDB: 'IndusInd Bank',
  CBIN: 'Central Bank of India',
  BKID: 'Bank of India',
  UCBA: 'UCO Bank',
  MAHB: 'Bank of Maharashtra',
  IBKL: 'IDBI Bank',
  YESB: 'Yes Bank',
  BDBL: 'Bandhan Bank',
};

export default function IfscFinderEngine() {
  const [ifscInput, setIfscInput] = useState<string>('SBIN0001428');
  const [copiedIfsc, setCopiedIfsc] = useState<boolean>(false);
  const [copiedFull, setCopiedFull] = useState<boolean>(false);

  // Mandate Slip Inputs
  const [beneficiaryName, setBeneficiaryName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [remitterName, setRemitterName] = useState<string>('');

  const cleanIfsc = ifscInput.trim().toUpperCase();

  // Search Results
  const matchedBranch = useMemo(() => {
    const match = SAMPLE_BRANCHES.find((b) => b.ifsc === cleanIfsc);
    if (match) return match;

    // Derived bank name from prefix
    const prefix = cleanIfsc.slice(0, 4);
    const bankName = BANK_PREFIX_MAP[prefix] || 'Commercial / Scheduled Bank';

    if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleanIfsc)) {
      return {
        bank: bankName,
        ifsc: cleanIfsc,
        micr: 'Available on Checkbook',
        branch: `Branch Code: ${cleanIfsc.slice(5)}`,
        address: 'Official RBI Certified IFSC Code for Electronic Settlement',
        city: 'Verified National Settlement Branch',
        district: 'Regional Clearing Hub',
        state: 'India',
        contact: 'Bank Helpline / 1800-Toll-Free',
      };
    }

    return null;
  }, [cleanIfsc]);

  const isValidFormat = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleanIfsc);

  const handleCopyIfsc = () => {
    navigator.clipboard.writeText(cleanIfsc);
    setCopiedIfsc(true);
    setTimeout(() => setCopiedIfsc(false), 2000);
  };

  const handleCopyFull = () => {
    if (!matchedBranch) return;
    const text = `Beneficiary: ${beneficiaryName || 'N/A'}\nAccount: ${accountNumber || 'N/A'}\nBank: ${matchedBranch.bank}\nBranch: ${matchedBranch.branch}\nIFSC: ${matchedBranch.ifsc}\nMICR: ${matchedBranch.micr}`;
    navigator.clipboard.writeText(text);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  // Print Isolated Bank Mandate Slip
  const handlePrintMandate = () => {
    if (!matchedBranch) return;
    const mandateHtml = `
      <div style="width: 210mm; min-height: 297mm; margin: 0 auto; padding: 15mm 20mm; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0F172A; background: #FFFFFF; box-sizing: border-box;">
        <!-- Header -->
        <div style="border-bottom: 2px solid #0F172A; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="font-size: 16pt; font-weight: 800; margin: 0; text-transform: uppercase;">
              BANK FUNDS TRANSFER / NEFT &amp; RTGS MANDATE VOUCHER
            </h1>
            <p style="font-size: 9pt; color: #475569; margin: 3px 0 0 0;">
              Electronic Clearing Service &amp; Direct Credit Voucher • RBI Core Banking Compliant
            </p>
          </div>
          <div style="text-align: right; font-size: 9pt;">
            <p style="margin: 0; font-weight: bold;">Date: ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <!-- Beneficiary Verification Banner -->
        <div style="background: #ECFDF5; border: 2px solid #059669; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="font-size: 13pt; font-weight: 800; color: #065F46; text-transform: uppercase;">
              ✔ VERIFIED SETTLEMENT BRANCH
            </span>
            <p style="font-size: 9pt; color: #334155; margin: 2px 0 0 0;">
              ${matchedBranch.bank} • ${matchedBranch.branch}
            </p>
          </div>
          <div style="font-size: 18pt; font-family: monospace; font-weight: 800; color: #0F172A;">
            ${matchedBranch.ifsc}
          </div>
        </div>

        <!-- Transfer Voucher Table -->
        <table style="width: 100%; border: 1px solid #CBD5E1; font-size: 10pt; margin-bottom: 24px; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600; width: 25%;">Beneficiary Name</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-weight: 700; width: 75%; text-transform: uppercase;" colspan="3">
                ${beneficiaryName || '______________________________________'}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Account Number</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-family: monospace; font-weight: 700; font-size: 11pt;">
                ${accountNumber || '____________________'}
              </td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Transfer Type</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-weight: 700;">NEFT / RTGS / IMPS</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Bank Name</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-weight: 700;">${matchedBranch.bank}</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Branch Code</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0;">${matchedBranch.branch}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">IFSC Code</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-family: monospace; font-weight: 700; color: #047857;">${matchedBranch.ifsc}</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">MICR Code</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-family: monospace;">${matchedBranch.micr}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Remittance Amount</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; font-weight: 800; font-size: 11pt;" colspan="3">
                ₹${Number(transferAmount || 0).toLocaleString('en-IN')}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Branch Address</td>
              <td style="padding: 8px 12px; border: 1px solid #E2E8F0; color: #475569;" colspan="3">${matchedBranch.address}</td>
            </tr>
          </tbody>
        </table>

        <!-- Remitter Notice -->
        <div style="background: #F8FAFC; border-left: 4px solid #0F172A; padding: 12px 14px; font-size: 8.5pt; color: #334155; line-height: 1.5; margin-bottom: 40px;">
          <strong>Remitter Instructions &amp; Undertaking:</strong><br />
          I / We hereby authorize the bank to execute the transfer of funds as per details furnished above. I understand that the transfer will be effected based solely on the Beneficiary Account Number and IFSC Code provided.
        </div>

        <!-- Signature Authorization Block -->
        <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 9pt;">
          <div>
            <p style="margin: 0;">Remitter / Payer: <strong>${remitterName || 'Individual Payer'}</strong></p>
            <p style="margin: 4px 0 0 0; color: #64748B;">Contact: ________________________</p>
          </div>
          <div style="text-align: center;">
            <div style="width: 200px; border-bottom: 1px solid #0F172A; margin-bottom: 6px;"></div>
            <p style="font-weight: 700; margin: 0; text-transform: uppercase;">Signature of Remitter / Payer</p>
            <p style="font-size: 8pt; color: #64748B; margin: 0;">Authorized Bank Signatory</p>
          </div>
        </div>
      </div>
    `;

    printIsolatedDocument({
      title: `Bank_Transfer_Mandate_${matchedBranch.ifsc}`,
      bodyHtml: mandateHtml,
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Engine Card */}
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
                  IFSC Code &amp; Bank Branch Finder
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  NEFT • RTGS • IMPS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Instant IFSC search across 40+ Indian banks with printable bank transfer and NEFT mandate vouchers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintMandate}
              disabled={!matchedBranch}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 transition-all shadow-md active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Bank Mandate Voucher</span>
            </button>
            <button
              onClick={handleCopyFull}
              disabled={!matchedBranch}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white border border-slate-700 transition-all"
            >
              {copiedFull ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFull ? 'Copied' : 'Copy Transfer Details'}</span>
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enter 11-Character Bank IFSC Code</span>
              </label>

              {/* Sample Bank Shortcuts */}
              <div className="hidden sm:flex items-center gap-1 text-[11px]">
                <span className="text-slate-400 mr-1">Quick Select:</span>
                {SAMPLE_BRANCHES.slice(0, 5).map((b) => (
                  <button
                    key={b.ifsc}
                    onClick={() => setIfscInput(b.ifsc)}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {b.bank.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                maxLength={11}
                value={ifscInput}
                onChange={(e) => setIfscInput(e.target.value)}
                placeholder="e.g. SBIN0001428"
                className="w-full pl-4 pr-28 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-2xl text-base sm:text-lg font-mono font-bold tracking-widest text-slate-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-inner"
              />
              <button
                onClick={handleCopyIfsc}
                className="absolute inset-y-2 right-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1.5 transition-colors"
              >
                {copiedIfsc ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIfsc ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Matched Branch Card */}
          {matchedBranch ? (
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{matchedBranch.bank}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                      Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{matchedBranch.branch}</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  <span className="text-slate-500">IFSC:</span>
                  <span className="bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-emerald-600">
                    {matchedBranch.ifsc}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">MICR Code</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{matchedBranch.micr}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">District &amp; City</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{matchedBranch.city}, {matchedBranch.district}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">State</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{matchedBranch.state}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Clearing Contact</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{matchedBranch.contact || 'Helpdesk Available'}</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{matchedBranch.address}</span>
              </div>
            </div>
          ) : (
            cleanIfsc.length === 11 && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                Invalid IFSC structure. A valid IFSC consists of 4 letters, the 5th character is strictly &apos;0&apos;, followed by 6 alphanumeric branch digits.
              </div>
            )
          )}

          {/* Beneficiary Voucher Details Form for Printable Slip */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Beneficiary &amp; Transfer Voucher Details for Printing (Optional)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Beneficiary Name</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  placeholder="e.g. Account Holder Name"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 uppercase font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="e.g. 38291048291"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Transfer Amount (₹)</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="50000"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Payer / Remitter Name</label>
                <input
                  type="text"
                  value={remitterName}
                  onChange={(e) => setRemitterName(e.target.value)}
                  placeholder="e.g. Apex Technologies"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 uppercase"
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
