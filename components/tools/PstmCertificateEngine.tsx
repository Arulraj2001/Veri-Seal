'use client';

import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  ShieldCheck,
  Building,
  School,
  Calendar,
  Sliders,
  CheckCircle2,
  Plus,
  Trash2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { printIsolatedDocument } from '@/lib/print-utils';
import { AdSlot } from '@/components/ads/AdSlot';

interface StudyPeriod {
  id: string;
  fromClass: string;
  toClass: string;
  fromYear: string;
  toYear: string;
  schoolName: string;
  schoolAddress: string;
}

export default function PstmCertificateEngine() {
  // Candidate Details (empty by default)
  const [candidateName, setCandidateName] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');
  const [emisNumber, setEmisNumber] = useState<string>('');
  const [admissionNo, setAdmissionNo] = useState<string>('');

  // Multi-school Study Periods
  const [periods, setPeriods] = useState<StudyPeriod[]>([
    {
      id: '1',
      fromClass: '1st Standard',
      toClass: '10th Standard (SSLC)',
      fromYear: '',
      toYear: '',
      schoolName: '',
      schoolAddress: '',
    },
  ]);

  // Headmaster / Authority Details
  const [headmasterDesignation, setHeadmasterDesignation] = useState<string>(
    'Headmaster / Principal'
  );
  const [place, setPlace] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>(
    new Date().toLocaleDateString('en-IN')
  );
  const [dispatchNumber, setDispatchNumber] = useState<string>('');

  // Advanced Layout Settings
  const [topMarginInch, setTopMarginInch] = useState<number>(2.0); // 1.5 - 4.0 inches for pre-printed letterheads
  const [fontSizePt, setFontSizePt] = useState<number>(11); // 10 - 13 pt
  const [lineSpacing, setLineSpacing] = useState<number>(1.4); // 1.2 - 1.8
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');

  // Helper sanitizer: replaces empty strings with official legal dotted lines
  const cleanVal = (val: string, fallbackDashes = '........................................') => {
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed : fallbackDashes;
  };

  // Add Study Period
  const addPeriod = () => {
    setPeriods([
      ...periods,
      {
        id: String(Date.now()),
        fromClass: '11th Standard',
        toClass: '12th Standard (HSC)',
        fromYear: '2020-2021',
        toYear: '2021-2022',
        schoolName: 'Government Higher Secondary School',
        schoolAddress: 'Anna Nagar, Madurai - 625020',
      },
    ]);
  };

  // Remove Study Period
  const removePeriod = (id: string) => {
    if (periods.length <= 1) return;
    setPeriods(periods.filter((p) => p.id !== id));
  };

  // Update Period
  const updatePeriod = (id: string, field: keyof StudyPeriod, value: string) => {
    setPeriods(
      periods.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Isolated Document Print for PSTM Certificate
  const handlePrintCertificate = () => {
    const fontCss =
      fontFamily === 'serif'
        ? 'font-family: "Times New Roman", Times, serif;'
        : 'font-family: Arial, sans-serif;';

    const periodsRowsHtml = periods
      .map(
        (p, idx) => `
        <tr style="border-bottom: 1px solid #CBD5E1;">
          <td style="padding: 8px; text-align: center; border: 1px solid #000000; font-size: 11px;">${idx + 1}</td>
          <td style="padding: 8px; border: 1px solid #000000; font-size: 11px;">${cleanVal(p.fromClass)} to ${cleanVal(p.toClass)}</td>
          <td style="padding: 8px; text-align: center; border: 1px solid #000000; font-size: 11px;">${cleanVal(p.fromYear)} to ${cleanVal(p.toYear)}</td>
          <td style="padding: 8px; border: 1px solid #000000; font-size: 11px;">
            <strong>${cleanVal(p.schoolName)}</strong><br />
            <span style="font-size: 10px; color: #333;">${cleanVal(p.schoolAddress)}</span>
          </td>
        </tr>
      `
      )
      .join('');

    const bodyHtml = `
      <div style="${fontCss} max-width: 760px; margin: 0 auto; padding: 0 20px; color: #000000; font-size: ${fontSizePt}pt; line-height: ${lineSpacing}; background: #FFFFFF;">
        <!-- Pre-printed Letterhead Clearance Zone -->
        <div style="height: ${topMarginInch}in; text-align: center; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px;">
          <span style="font-size: 9px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px;">
            [ Space reserved for School / Institution Official Printed Letterhead ]
          </span>
        </div>

        <!-- Official Header -->
        <div style="text-align: center; margin-bottom: 16px;">
          <h2 style="font-size: 15pt; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
            தமிழ் வழியில் பயின்றதற்கான சான்றிதழ்
          </h2>
          <h3 style="font-size: 13pt; font-weight: bold; margin: 3px 0 0 0; text-transform: uppercase;">
            PERSONS STUDIED IN TAMIL MEDIUM (PSTM) CERTIFICATE
          </h3>
          <p style="font-size: 9pt; margin: 4px 0 0 0; font-style: italic;">
            (Prescribed Format as per G.O. (Ms.) No. 82, Human Resources Management (S) Department, Dated 16.08.2021)
          </p>
        </div>

        <!-- Reference / Dispatch Bar -->
        <div style="display: flex; justify-content: space-between; font-size: 10pt; margin-bottom: 16px; border-bottom: 1px solid #000000; padding-bottom: 4px;">
          <div><strong>Dispatch No / ந.க.எண்:</strong> ${cleanVal(dispatchNumber)}</div>
          <div><strong>EMIS No / எமிஸ் எண்:</strong> ${cleanVal(emisNumber)}</div>
        </div>

        <!-- Statutory Bilingual Body Text -->
        <div style="text-align: justify; margin-bottom: 16px;">
          <p style="margin-bottom: 12px;">
            திரு / திருமதி / செல்வி <strong>${cleanVal(candidateName)}</strong>, தந்தை / தாயார் பெயர் <strong>${cleanVal(fatherName)}</strong> என்பவர் கீழ்க்காணும் கல்வி ஆண்டுகளில் கீழ்க்காணும் வகுப்புகளை இக்கல்வி நிறுவனத்தில் <strong>தமிழ் வழியில் பயின்றார்</strong> எனச் சான்றளிக்கப்படுகிறது.
          </p>
          <p style="margin-bottom: 12px;">
            This is to certify that Thiru / Tmt / Selvi <strong>${cleanVal(candidateName)}</strong>, Son / Daughter of Thiru <strong>${cleanVal(fatherName)}</strong> has studied the following classes in this institution in <strong>Tamil Medium of Instruction</strong> during the academic years specified hereunder:
          </p>
        </div>

        <!-- Multi-period Study Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; border: 1px solid #000000;">
          <thead>
            <tr style="background: #F1F5F9; border-bottom: 1px solid #000000;">
              <th style="padding: 6px; border: 1px solid #000000; font-size: 10.5pt; width: 8%;">வ.எண்<br />Sl.No</th>
              <th style="padding: 6px; border: 1px solid #000000; font-size: 10.5pt; width: 30%;">பயின்ற வகுப்பு<br />Classes Studied</th>
              <th style="padding: 6px; border: 1px solid #000000; font-size: 10.5pt; width: 22%;">கல்வி ஆண்டு<br />Academic Years</th>
              <th style="padding: 6px; border: 1px solid #000000; font-size: 10.5pt; width: 40%;">பள்ளியின் பெயர் &amp; முகவரி<br />Name of Institution &amp; Address</th>
            </tr>
          </thead>
          <tbody>
            ${periodsRowsHtml}
          </tbody>
        </table>

        <!-- Statutory Verification Clause -->
        <div style="font-size: 10pt; line-height: 1.4; margin-bottom: 24px;">
          <p style="margin-bottom: 6px;">
            இச்சான்றிதழ் இக்கல்வி நிறுவனத்தின் சேர்க்கைப் பதிவேடு (Admission Register No: <strong>${cleanVal(admissionNo)}</strong>) மற்றும் மாற்றுச் சான்றிதழில் உள்ள விவரங்களின் அடிப்படையில் சரிபார்க்கப்பட்டு வழங்கப்படுகிறது.
          </p>
          <p style="margin: 0; font-style: italic;">
            This certificate is issued after verifying the particulars with the Admission Register and Transfer Certificate available in this institution.
          </p>
        </div>

        <!-- Official Signatures & Round Seal Section -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 35px;">
          <div style="width: 45%;">
            <div><strong>இடம் / Place:</strong> ${cleanVal(place)}</div>
            <div style="margin-top: 4px;"><strong>நாள் / Date:</strong> ${cleanVal(issueDate)}</div>
            <div style="margin-top: 25px; border: 1px dashed #94A3B8; width: 140px; height: 75px; display: flex; align-items: center; justify-content: center; font-size: 9pt; color: #64748B;">
              [ அலுவலக வட்ட முத்திரை / Office Round Seal ]
            </div>
          </div>

          <div style="text-align: center; width: 50%;">
            <div style="height: 50px;"></div>
            <div style="font-weight: bold; border-top: 1px solid #000000; padding-top: 4px;">
              தலைமை ஆசிரியர் / முதல்வர் கையொப்பம்<br />
              Signature of Headmaster / Principal
            </div>
            <div style="font-size: 9.5pt; margin-top: 2px;">
              அலுவலக முத்திரையுடன் / with Office Seal
            </div>
          </div>
        </div>
      </div>
    `;

    printIsolatedDocument({
      title: `PSTM_Certificate_${candidateName.trim() || 'Candidate'}`,
      bodyHtml,
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Official PSTM Certificate Generator (G.O. Ms. No. 82)
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-teal-500 text-slate-950 uppercase tracking-wide">
                  20% TNPSC RESERVATION
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Persons Studied in Tamil Medium statutory format in Tamil &amp; English. Pre-printed letterhead margin clearance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Certificate</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Settings Left */}
          <div className="lg:col-span-6 space-y-6">
            {/* Candidate & Parent Info */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Candidate &amp; Registration Particulars
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Candidate Full Name (பெயர்)
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
                    placeholder="e.g. Candidate Full Name"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Father / Parent Name (தந்தை பெயர்)
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value.toUpperCase())}
                    placeholder="e.g. Father / Guardian Name"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    EMIS Number (16-Digit எமிஸ் எண்)
                  </label>
                  <input
                    type="text"
                    value={emisNumber}
                    onChange={(e) => setEmisNumber(e.target.value)}
                    placeholder="e.g. 16-Digit EMIS Number"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Admission Register No (சேர்க்கை எண்)
                  </label>
                  <input
                    type="text"
                    value={admissionNo}
                    onChange={(e) => setAdmissionNo(e.target.value)}
                    placeholder="e.g. Admission Register Number"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Study Periods (Dynamic Multi-Row) */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  2. Tamil Medium Study Periods
                </span>
                <button
                  type="button"
                  onClick={addPeriod}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-500"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Period</span>
                </button>
              </div>

              <div className="space-y-4">
                {periods.map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-400">
                      <span>Row #{idx + 1}</span>
                      {periods.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePeriod(p.id)}
                          className="text-rose-500 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Classes Studied</label>
                        <input
                          type="text"
                          value={p.fromClass}
                          onChange={(e) => updatePeriod(p.id, 'fromClass', e.target.value)}
                          placeholder="e.g. 1st Std to 10th Std"
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Academic Years</label>
                        <input
                          type="text"
                          value={p.fromYear}
                          onChange={(e) => updatePeriod(p.id, 'fromYear', e.target.value)}
                          placeholder="e.g. 2010-2011 to 2019-2020"
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">School / College Name</label>
                      <input
                        type="text"
                        value={p.schoolName}
                        onChange={(e) => updatePeriod(p.id, 'schoolName', e.target.value)}
                        placeholder="e.g. Govt Higher Secondary School"
                        className="w-full px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">School Town / Address</label>
                      <input
                        type="text"
                        value={p.schoolAddress}
                        onChange={(e) => updatePeriod(p.id, 'schoolAddress', e.target.value)}
                        placeholder="e.g. Anna Nagar, Madurai - 625020"
                        className="w-full px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-printed Letterhead Top Margin Slider */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-600" />
                  Pre-Printed School Letterhead Clearance
                </span>
                <span className="text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                  {topMarginInch} Inches Top Gap
                </span>
              </div>

              <input
                type="range"
                min={1.0}
                max={4.0}
                step={0.25}
                value={topMarginInch}
                onChange={(e) => setTopMarginInch(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-teal-500 cursor-pointer"
              />

              <p className="text-[11px] text-slate-500">
                Adjust top space if your school uses official pre-printed letterhead paper with crest logo.
              </p>
            </div>
          </div>

          {/* Document Preview Right */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                Live A4 Statutory Document Preview
              </span>
              <span className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                G.O. MS. NO. 82
              </span>
            </div>

            {/* Paper Container */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl flex items-center justify-center border border-slate-300 dark:border-slate-800 min-h-[500px] overflow-x-auto">
              <div
                className="w-[480px] bg-white text-slate-950 p-6 rounded shadow-2xl border border-slate-300 text-left"
                style={{
                  fontFamily: fontFamily === 'serif' ? 'Times New Roman, serif' : 'Arial, sans-serif',
                  fontSize: '11px',
                  lineHeight: '1.4',
                }}
              >
                {/* Visual Top Margin clearance indicator */}
                <div
                  className="border border-dashed border-slate-300 rounded bg-slate-50 text-slate-400 text-[9px] flex items-center justify-center mb-3 text-center"
                  style={{ height: `${topMarginInch * 40}px` }}
                >
                  [ School Letterhead Clearance Zone: {topMarginInch}&quot; ]
                </div>

                <div className="text-center mb-3">
                  <div className="font-bold text-xs uppercase">தமிழ் வழியில் பயின்றதற்கான சான்றிதழ்</div>
                  <div className="font-bold text-[11px] uppercase">PERSONS STUDIED IN TAMIL MEDIUM (PSTM)</div>
                  <div className="text-[8px] text-slate-500 italic">(As per G.O. Ms. No. 82, Dt. 16.08.2021)</div>
                </div>

                <div className="flex justify-between text-[9px] border-b border-slate-400 pb-1 mb-2 font-semibold">
                  <div>ந.க.எண்: {cleanVal(dispatchNumber)}</div>
                  <div>EMIS: {cleanVal(emisNumber)}</div>
                </div>

                <p className="text-[10px] text-justify mb-2 leading-relaxed">
                  திரு / செல்வி <strong>{cleanVal(candidateName)}</strong>, தந்தை பெயர் <strong>{cleanVal(fatherName)}</strong> என்பவர் கீழ்க்காணும் கல்வி நிறுவனத்தில் <strong>தமிழ் வழியில் பயின்றார்</strong> எனச் சான்றளிக்கப்படுகிறது.
                </p>

                <table className="w-full border-collapse border border-slate-900 text-[9px] mb-3">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-900 p-1">வகுப்பு</th>
                      <th className="border border-slate-900 p-1">ஆண்டு</th>
                      <th className="border border-slate-900 p-1">பள்ளியின் பெயர்</th>
                    </tr>
                  </thead>
                  <tbody>
                    {periods.map((p, idx) => (
                      <tr key={idx}>
                        <td className="border border-slate-900 p-1">{cleanVal(p.fromClass)}</td>
                        <td className="border border-slate-900 p-1 text-center">{cleanVal(p.fromYear)}</td>
                        <td className="border border-slate-900 p-1">{cleanVal(p.schoolName)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-end mt-6 text-[9px]">
                  <div>
                    <div>இடம்: {cleanVal(place)}</div>
                    <div>நாள்: {cleanVal(issueDate)}</div>
                    <div className="w-20 h-10 border border-dashed border-slate-400 mt-2 text-[8px] flex items-center justify-center text-slate-400 text-center">
                      [ Office Seal ]
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-slate-900 pt-1 font-bold">
                      தலைமை ஆசிரியர் கையொப்பம்<br />
                      Principal Signature
                    </div>
                  </div>
                </div>
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
