'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Award,
  CheckCircle2,
  Printer,
  Sparkles,
  BookOpen,
  GraduationCap,
  Building2,
  FileText,
  HelpCircle,
  TrendingUp,
  Percent,
  Compass,
} from 'lucide-react';
import { printIsolatedDocument } from '@/lib/print-utils';
import { AdSlot } from '@/components/ads/AdSlot';

interface CollegeTier {
  name: string;
  campus: string;
  expectedCutoffRange: string;
  minCutoff: number;
  branches: string[];
  type: 'Top Tier 1 Autonomous' | 'Tier 1 Govt / Aided' | 'Tier 2 Reputed';
}

const COLLEGE_BENCHMARKS: CollegeTier[] = [
  {
    name: 'College of Engineering, Guindy (CEG)',
    campus: 'Anna University, Chennai',
    expectedCutoffRange: '196.00 – 199.50',
    minCutoff: 195.5,
    branches: ['CSE', 'IT', 'ECE', 'AI&DS', 'EEE'],
    type: 'Top Tier 1 Autonomous',
  },
  {
    name: 'Madras Institute of Technology (MIT)',
    campus: 'Anna University, Chromepet',
    expectedCutoffRange: '194.50 – 198.50',
    minCutoff: 194.0,
    branches: ['Aeronautical', 'CSE', 'IT', 'ECE', 'Robotics'],
    type: 'Top Tier 1 Autonomous',
  },
  {
    name: 'PSG College of Technology',
    campus: 'Peelamedu, Coimbatore',
    expectedCutoffRange: '194.00 – 198.50',
    minCutoff: 193.5,
    branches: ['CSE', 'IT', 'Robotics', 'Mech', 'ECE'],
    type: 'Top Tier 1 Autonomous',
  },
  {
    name: 'SSN College of Engineering',
    campus: 'Kalavakkam, OMR Chennai',
    expectedCutoffRange: '192.00 – 197.00',
    minCutoff: 191.0,
    branches: ['CSE', 'IT', 'ECE', 'Biomedical', 'Chemical'],
    type: 'Tier 1 Govt / Aided',
  },
  {
    name: 'Coimbatore Institute of Technology (CIT)',
    campus: 'Civil Aerodrome Post, Coimbatore',
    expectedCutoffRange: '190.50 – 196.00',
    minCutoff: 189.5,
    branches: ['CSE', 'ECE', 'AI&DS', 'Civil', 'Mech'],
    type: 'Tier 1 Govt / Aided',
  },
  {
    name: 'Thiagarajar College of Engineering (TCE)',
    campus: 'Thiruparankundram, Madurai',
    expectedCutoffRange: '190.00 – 195.50',
    minCutoff: 189.0,
    branches: ['CSE', 'IT', 'ECE', 'Data Science', 'EEE'],
    type: 'Tier 1 Govt / Aided',
  },
  {
    name: 'Government College of Technology (GCT)',
    campus: 'Thadagam Road, Coimbatore',
    expectedCutoffRange: '188.00 – 194.00',
    minCutoff: 187.0,
    branches: ['CSE', 'IT', 'ECE', 'Production', 'IBT'],
    type: 'Tier 1 Govt / Aided',
  },
  {
    name: 'Kumaraguru College of Technology (KCT)',
    campus: 'Saravanampatti, Coimbatore',
    expectedCutoffRange: '184.00 – 192.50',
    minCutoff: 182.0,
    branches: ['CSE', 'Mechatronics', 'Aero', 'ECE', 'IT'],
    type: 'Tier 2 Reputed',
  },
];

export default function TneaCutoffCalculatorEngine() {
  // Student Marks
  const [mathsMarks, setMathsMarks] = useState<number>(92);
  const [physicsMarks, setPhysicsMarks] = useState<number>(88);
  const [chemistryMarks, setChemistryMarks] = useState<number>(84);

  // Student Profile & Reservations
  const [studentName, setStudentName] = useState<string>('');
  const [community, setCommunity] = useState<string>('BC');
  const [isGovtSchool7Point5, setIsGovtSchool7Point5] = useState<boolean>(false);
  const [isFirstGraduate, setIsFirstGraduate] = useState<boolean>(false);
  const [targetBranch, setTargetBranch] = useState<string>('CSE');

  // Exact Anna University Cutoff Formula:
  // Cutoff = Maths + (Physics / 2) + (Chemistry / 2)
  const cutoffScore = useMemo(() => {
    const m = Number(mathsMarks) || 0;
    const p = Number(physicsMarks) || 0;
    const c = Number(chemistryMarks) || 0;
    const cutoff = m + p / 2 + c / 2;
    return Math.min(200, Math.max(0, cutoff));
  }, [mathsMarks, physicsMarks, chemistryMarks]);

  // Fee Waiver Estimates
  const feeWaiverDetails = useMemo(() => {
    if (isGovtSchool7Point5) {
      return {
        title: '100% Free Higher Education (TN Govt 7.5% Quota)',
        desc: 'Zero tuition fees, zero hostel fees, zero mess fees, zero transport charges fully borne by the Government of Tamil Nadu.',
        amountStr: '100% Total Fee Exemption (~₹1.5 Lakh/yr)',
        badge: '7.5% GOVT SCHOOL SCHOLARSHIP',
      };
    }
    if (isFirstGraduate) {
      return {
        title: 'First Graduate (FG) Tuition Fee Concession',
        desc: 'Eligible for direct government tuition fee reduction up to ₹25,000 per academic year for the full 4-year B.E / B.Tech course.',
        amountStr: '₹25,000 / year Tuition Concession',
        badge: 'FIRST GRADUATE WAIVER',
      };
    }
    return null;
  }, [isGovtSchool7Point5, isFirstGraduate]);

  // Filtered College Probabilities
  const eligibleColleges = useMemo(() => {
    return COLLEGE_BENCHMARKS.map((col) => {
      const diff = cutoffScore - col.minCutoff;
      let chance: 'High' | 'Moderate' | 'Ambitious';
      if (diff >= 2.0) chance = 'High';
      else if (diff >= -1.5) chance = 'Moderate';
      else chance = 'Ambitious';

      return {
        ...col,
        chance,
      };
    });
  }, [cutoffScore]);

  // Isolated Print for Official TNEA Counseling Preparation Dossier
  const handlePrintDossier = () => {
    const upperName = studentName.trim().toUpperCase() || 'STUDENT';
    const cutoffFormatted = cutoffScore.toFixed(3);

    const bodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 750px; margin: 0 auto; padding: 25px; border: 2px solid #0F172A; color: #0F172A; background: #FFFFFF;">
        <div style="text-align: center; border-bottom: 2px solid #0F172A; padding-bottom: 12px; margin-bottom: 20px;">
          <h1 style="font-size: 18px; margin: 0; font-weight: bold; text-transform: uppercase;">TAMIL NADU ENGINEERING ADMISSIONS (TNEA 2025–26)</h1>
          <h2 style="font-size: 13px; margin: 4px 0 0 0; font-weight: normal; color: #334155;">OFFICIAL ENGINEERING CUTOFF &amp; COUNSELING PREPARATION DOSSIER</h2>
        </div>

        <table style="width: 100%; margin-bottom: 20px; font-size: 13px; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px; font-weight: bold; width: 30%;">Candidate Name:</td>
            <td style="padding: 6px; border-bottom: 1px dotted #94A3B8;">${upperName}</td>
            <td style="padding: 6px; font-weight: bold; width: 20%;">Community:</td>
            <td style="padding: 6px; border-bottom: 1px dotted #94A3B8; font-weight: bold;">${community}</td>
          </tr>
          <tr>
            <td style="padding: 6px; font-weight: bold;">7.5% Govt School Quota:</td>
            <td style="padding: 6px; border-bottom: 1px dotted #94A3B8;">${isGovtSchool7Point5 ? 'YES (Eligible)' : 'No'}</td>
            <td style="padding: 6px; font-weight: bold;">First Graduate:</td>
            <td style="padding: 6px; border-bottom: 1px dotted #94A3B8;">${isFirstGraduate ? 'YES (₹25k Concession)' : 'No'}</td>
          </tr>
          <tr>
            <td style="padding: 6px; font-weight: bold;">Target Preferred Branch:</td>
            <td style="padding: 6px; border-bottom: 1px dotted #94A3B8;">${targetBranch}</td>
            <td style="padding: 6px; font-weight: bold;">Date of Assessment:</td>
            <td style="padding: 6px; border-bottom: 1px dotted #94A3B8;">${new Date().toLocaleDateString('en-IN')}</td>
          </tr>
        </table>

        <!-- Marks Calculation Table -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; text-align: center; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background: #E2E8F0; color: #0F172A; font-weight: bold;">
                <th style="padding: 8px; border: 1px solid #CBD5E1;">Subject</th>
                <th style="padding: 8px; border: 1px solid #CBD5E1;">Marks Scored</th>
                <th style="padding: 8px; border: 1px solid #CBD5E1;">Weightage Formula</th>
                <th style="padding: 8px; border: 1px solid #CBD5E1;">Calculated Component</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold;">Mathematics</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1;">${mathsMarks} / 100</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1;">100% Weightage</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold;">${Number(mathsMarks).toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold;">Physics</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1;">${physicsMarks} / 100</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1;">Marks / 2</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold;">${(Number(physicsMarks) / 2).toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold;">Chemistry</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1;">${chemistryMarks} / 100</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1;">Marks / 2</td>
                <td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold;">${(Number(chemistryMarks) / 2).toFixed(2)}</td>
              </tr>
              <tr style="background: #FEF3C7; font-size: 15px; font-weight: bold; color: #92400E;">
                <td colspan="3" style="padding: 10px; border: 1px solid #CBD5E1; text-align: right;">OFFICIAL TNEA ENGINEERING CUTOFF (OUT OF 200):</td>
                <td style="padding: 10px; border: 1px solid #CBD5E1; font-size: 18px; color: #0F172A;">${cutoffFormatted}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mandatory Certificate Verification Checklist -->
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; color: #0F172A;">
            TNEA Online Certificate Verification (Mandatory Uploads strictly &lt;200KB PDF):
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; color: #334155;">
            <div>[ &nbsp; ] 10th (SSLC) Marksheet</div>
            <div>[ &nbsp; ] 12th (HSC) Marksheet</div>
            <div>[ &nbsp; ] Transfer Certificate (TC)</div>
            <div>[ &nbsp; ] Permanent Community Certificate</div>
            <div>[ &nbsp; ] Nativity Certificate (if applicable)</div>
            <div>[ &nbsp; ] First Graduate Certificate &amp; Joint Declaration</div>
            <div>[ &nbsp; ] 7.5% Govt School 6th to 12th Bonafide Study Proof</div>
            <div>[ &nbsp; ] Passport Size Photograph &amp; Signature Scan</div>
          </div>
        </div>

        <div style="border-top: 1px solid #E2E8F0; padding-top: 10px; font-size: 10px; color: #64748B; text-align: justify; line-height: 1.4;">
          <strong>Counseling Advice:</strong> Cutoff ranges are based on Directorate of Technical Education (DoTE) previous year counseling closing ranks. Actual seat allotment depends on reservation quota rank and vacancy rounds.
        </div>
      </div>
    `;

    printIsolatedDocument({
      title: 'TNEA Engineering Cutoff & Counseling Dossier',
      bodyHtml,
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Main Container Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  TNEA Engineering Cutoff Calculator &amp; Counseling Kit 2025–26
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500 text-slate-950 uppercase tracking-wide">
                  ANNA UNIVERSITY 200 CUTOFF
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Formula: Maths + (Physics/2) + (Chemistry/2). Includes 7.5% Govt School Quota and College Tier Predictor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDossier}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Counseling Dossier</span>
            </button>
          </div>
        </div>

        {/* Input Controls & Result Bar */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Marks & Quotas */}
          <div className="lg:col-span-6 space-y-6">
            {/* Student Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value.toUpperCase())}
                  placeholder="e.g. Full Name as per 12th Marksheet"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 uppercase focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Community Category
                </label>
                <select
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="OC">OC (Open Competition)</option>
                  <option value="BC">BC (Backward Class)</option>
                  <option value="BCM">BCM (Backward Class Muslim)</option>
                  <option value="MBC/DNC">MBC / DNC (Most Backward Class)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="SCA">SCA (SC Arunthathiyar)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                </select>
              </div>
            </div>

            {/* Subject Marks Sliders */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  Class 12 Subject Marks (Out of 100)
                </span>
                <span className="text-[11px] text-slate-500">Board Marks</span>
              </div>

              {/* Mathematics */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Mathematics (100% Weightage):
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                    {mathsMarks} / 100
                  </span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={100}
                  value={mathsMarks}
                  onChange={(e) => setMathsMarks(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Physics */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Physics (Divided by 2 = 50 Weightage):
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                    {physicsMarks} / 100 → {(physicsMarks / 2).toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={100}
                  value={physicsMarks}
                  onChange={(e) => setPhysicsMarks(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Chemistry */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Chemistry (Divided by 2 = 50 Weightage):
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                    {chemistryMarks} / 100 → {(chemistryMarks / 2).toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={100}
                  value={chemistryMarks}
                  onChange={(e) => setChemistryMarks(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Special Quota & Fee Waiver Toggles */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Government Fee Waivers &amp; Quotas
              </div>

              {/* 7.5% Government School Quota */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGovtSchool7Point5}
                  onChange={(e) => setIsGovtSchool7Point5(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    7.5% TN Govt School Horizontal Reservation
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Studied 6th to 12th in Tamil Nadu State Government schools. Eligible for 100% full fee waiver (tuition + hostel).
                  </div>
                </div>
              </label>

              {/* First Graduate */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFirstGraduate}
                  onChange={(e) => setIsFirstGraduate(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    First Graduate (FG) in Family
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    No other graduate in family. Eligible for ₹25,000 / year direct government tuition fee concession.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Right Display: Big Cutoff Score & College Tier Radar */}
          <div className="lg:col-span-6 space-y-6">
            {/* Cutoff Score Hero Banner */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-indigo-800 shadow-2xl relative overflow-hidden text-center">
              <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-300 mb-2">
                OFFICIAL ANNA UNIVERSITY TNEA CUTOFF
              </div>
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-2">
                {cutoffScore.toFixed(3)}
                <span className="text-2xl font-bold text-indigo-300"> / 200</span>
              </div>
              <p className="text-xs text-indigo-200 max-w-sm mx-auto">
                Maths ({mathsMarks}) + Physics/2 ({(physicsMarks / 2).toFixed(1)}) + Chemistry/2 ({(chemistryMarks / 2).toFixed(1)})
              </p>

              {feeWaiverDetails && (
                <div className="mt-4 pt-4 border-t border-indigo-800/80 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{feeWaiverDetails.amountStr}</span>
                </div>
              )}
            </div>

            {/* College Tier Eligibility Radar */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Top College Allotment Benchmarks
                </span>
                <span className="text-[10px] text-slate-500">Based on DoTE Closing Ranks</span>
              </div>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {eligibleColleges.map((col, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{col.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{col.campus}</div>
                      <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                        Cutoff Band: {col.expectedCutoffRange}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                          col.chance === 'High'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : col.chance === 'Moderate'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {col.chance === 'High'
                          ? 'HIGH CHANCE'
                          : col.chance === 'Moderate'
                          ? 'MODERATE'
                          : 'AMBITIOUS'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Ostrune Agency Ad Banner */}
      <AdSlot slot="in_content" />
    </div>
  );
}
