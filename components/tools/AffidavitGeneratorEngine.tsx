'use client';

import React, { useState, useRef } from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Sliders,
  Eye,
  Sparkles,
  ShieldCheck,
  Languages,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Scale,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { printIsolatedDocument } from '@/lib/print-utils';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

type AffidavitType =
  | 'name_change'
  | 'dob_discrepancy'
  | 'address_proof'
  | 'gap_year'
  | 'lost_document'
  | 'general_declaration';

type Language = 'en' | 'ta';

interface FormData {
  deponentName: string;
  relationType: 'S/O' | 'D/O' | 'W/O';
  guardianName: string;
  age: string;
  address: string;
  idType: string;
  idNumber: string;
  oldDetail: string;
  newDetail: string;
  lostDocName: string;
  gapReason: string;
  place: string;
  date: string;
  advocateName?: string;
  advocateEnrollment?: string;
  notaryRegNo?: string;
}

// Clean Sanitizer: Returns user value or professional dotted fill-in line. NEVER raw code brackets!
const cleanVal = (val: string | undefined): string => {
  if (val && val.trim()) return val.trim();
  return '_______________________';
};

interface TemplateData {
  titleEn: string;
  titleTa: string;
  bodyEn: (d: FormData) => string[];
  bodyTa: (d: FormData) => string[];
}

const TEMPLATES: Record<AffidavitType, TemplateData> = {
  name_change: {
    titleEn: 'AFFIDAVIT FOR NAME CORRECTION / CHANGE OF NAME',
    titleTa: 'பெயர் மாற்றம் / பெயர் திருத்த உறுதிமொழிப் பத்திரம்',
    bodyEn: (d) => [
      `1. That I am a bona fide citizen of India, residing permanently at the abovementioned residential address.`,
      `2. That in my official records / certificates, my name was erroneously recorded as "${cleanVal(d.oldDetail)}".`,
      `3. That my actual, true, and legally correct name is "${cleanVal(d.newDetail || d.deponentName)}", which is supported by my official government identity proof (${d.idType}: ${cleanVal(d.idNumber)}).`,
      `4. That "${cleanVal(d.oldDetail)}" and "${cleanVal(d.newDetail || d.deponentName)}" refer to one and the same person, namely myself.`,
      `5. That I shall henceforth be known and addressed for all official, educational, banking, and legal purposes exclusively by my correct name "${cleanVal(d.newDetail || d.deponentName)}".`,
    ],
    bodyTa: (d) => [
      `1. நான் இந்தியாவின் சட்டபூர்வமான குடிமகன்/மகள் என்றும், மேற்கண்ட முகவரியில் நிரந்தரமாக வசித்து வருகிறேன் என்றும் உறுதி கூறுகிறேன்.`,
      `2. எனது பள்ளி/கல்வி சான்றிதழ்களில் எனது பெயர் தவறுதலாக "${cleanVal(d.oldDetail)}" எனப் பதிவு செய்யப்பட்டுள்ளது.`,
      `3. எனது உண்மையான மற்றும் சரியான பெயர் "${cleanVal(d.newDetail || d.deponentName)}" ஆகும். இது எனது அரசு அடையாள ஆவணம் (${d.idType}: ${cleanVal(d.idNumber)}) மூலம் உறுதி செய்யப்பட்டுள்ளது.`,
      `4. மேற்கூறிய "${cleanVal(d.oldDetail)}" மற்றும் "${cleanVal(d.newDetail || d.deponentName)}" ஆகிய இரண்டும் ஒரே நபரான என்னையே குறிக்கும்.`,
      `5. இனிவரும் காலங்களில் எனது அனைத்து அரசு, கல்வி மற்றும் சட்டப்பூர்வ நடவடிக்கைகளுக்கும் எனது சரியான பெயரான "${cleanVal(d.newDetail || d.deponentName)}" என்பதையே பயன்படுத்துவேன் என உறுதி கூறுகிறேன்.`,
    ],
  },
  dob_discrepancy: {
    titleEn: 'AFFIDAVIT FOR DATE OF BIRTH DISCREPANCY',
    titleTa: 'பிறந்த தேதி முரண்பாடு திருத்த உறுதிமொழிப் பத்திரம்',
    bodyEn: (d) => [
      `1. That I am a citizen of India residing at the address stated above.`,
      `2. That in my school records, my date of birth was inadvertently entered as "${cleanVal(d.oldDetail)}".`,
      `3. That my actual and legally valid date of birth is "${cleanVal(d.newDetail)}", as certified by my official Municipal Birth Certificate / Aadhaar Card (${d.idType}: ${cleanVal(d.idNumber)}).`,
      `4. That I execute this sworn affidavit for the specific purpose of rectifying the clerical error in my official records.`,
    ],
    bodyTa: (d) => [
      `1. நான் மேற்கண்ட முகவரியில் வசிக்கும் இந்தியக் குடிமகன்/மகள் என்று உறுதி கூறுகிறேன்.`,
      `2. எனது கல்வி ஆவணங்களில் எனது பிறந்த தேதி தவறுதலாக "${cleanVal(d.oldDetail)}" எனப் பதிவு செய்யப்பட்டுள்ளது.`,
      `3. எனது உண்மையான சட்டப்பூர்வமான பிறந்த தேதி "${cleanVal(d.newDetail)}" ஆகும். இது எனது பிறப்பு சான்றிதழ் (${d.idType}: ${cleanVal(d.idNumber)}) மூலம் நிரூபிக்கப்பட்டுள்ளது.`,
      `4. எனது அரசு மற்றும் கல்வி ஆவணங்களில் உள்ள பிழையைத் திருத்துவதற்காக இந்த உறுதிமொழிப் பத்திரத்தை அளிக்கிறேன்.`,
    ],
  },
  gap_year: {
    titleEn: 'AFFIDAVIT FOR GAP IN EDUCATION / STUDY BREAK',
    titleTa: 'படிப்பு இடைவெளி (GAP YEAR) உறுதிமொழிப் பத்திரம்',
    bodyEn: (d) => [
      `1. That I have successfully passed my qualifying examination in the academic year "${cleanVal(d.oldDetail)}".`,
      `2. That during the gap period between "${cleanVal(d.oldDetail)}" and "${cleanVal(d.newDetail)}", I was not enrolled in any full-time educational institution due to: ${cleanVal(d.gapReason)}.`,
      `3. That during the aforementioned gap period, I was neither involved in any unlawful, anti-social, or criminal activities, nor is any legal case pending against me in any Court of Law.`,
      `4. That I am executing this affidavit to submit to the college authorities for securing regular academic admission.`,
    ],
    bodyTa: (d) => [
      `1. நான் எனது தகுதித் தேர்வை "${cleanVal(d.oldDetail)}" கல்வி ஆண்டில் வெற்றிகரமாக முடித்துள்ளேன்.`,
      `2. "${cleanVal(d.oldDetail)}" முதல் "${cleanVal(d.newDetail)}" வரையிலான இடைவெளிக் காலத்தில் நான் எந்தக் கல்லூரியிலும் பயிலவில்லை. காரணம்: ${cleanVal(d.gapReason)}.`,
      `3. இந்த இடைப்பட்ட காலத்தில் நான் எந்தவிதமான சட்டவிரோத அல்லது குற்றவியல் நடவடிக்கைகளிலும் ஈடுபடவில்லை என்றும் என் மீது எந்த நீதிமன்ற வழக்கமும் இல்லை என்றும் உறுதியளிக்கிறேன்.`,
      `4. எனது கல்லூரி சேர்க்கைக்காக இந்த உறுதிமொழிப் பத்திரத்தை சமர்ப்பிக்கிறேன்.`,
    ],
  },
  address_proof: {
    titleEn: 'AFFIDAVIT FOR PROOF OF RESIDENTIAL ADDRESS',
    titleTa: 'இருப்பிட முகவரி உறுதிமொழிப் பத்திரம்',
    bodyEn: (d) => [
      `1. That I am currently and permanently residing at: ${cleanVal(d.address)}.`,
      `2. That I have been residing at the aforementioned residential premises for the past "${cleanVal(d.newDetail)}".`,
      `3. That this residential address is true, authentic, and verified by my government identity document (${d.idType}: ${cleanVal(d.idNumber)}).`,
      `4. That I make this solemn declaration to serve as legal proof of address for government and administrative procedures.`,
    ],
    bodyTa: (d) => [
      `1. நான் தற்சமயம் நிரந்தரமாக மேற்கண்ட முகவரியில் (${cleanVal(d.address)}) வசித்து வருகிறேன்.`,
      `2. நான் இந்த முகவரியில் கடந்த "${cleanVal(d.newDetail)}" தொடர்ந்து வசித்து வருகிறேன் என்று உறுதியளிக்கிறேன்.`,
      `3. எனது இருப்பிட முகவரிக்கு ஆதரவாக எனது அரசு அடையாள அட்டை (${d.idType}: ${cleanVal(d.idNumber)}) இணைக்கப்பட்டுள்ளது.`,
      `4. அரசு மற்றும் நிர்வாகத் தேவைகளுக்காக இந்த உறுதிமொழிப் பத்திரத்தை மனப்பூர்வமாக அளிக்கிறேன்.`,
    ],
  },
  lost_document: {
    titleEn: 'AFFIDAVIT FOR LOSS OF CERTIFICATE / ORIGINAL DOCUMENT',
    titleTa: 'அசல் ஆவணம் / சான்றிதழ் தொலைந்தமைக்கான உறுதிமொழிப் பத்திரம்',
    bodyEn: (d) => [
      `1. That I was issued the original document: "${cleanVal(d.lostDocName)}" with Registration/Roll No: "${cleanVal(d.oldDetail)}".`,
      `2. That unfortunately, the said original document was lost/misplaced during transit on or about "${cleanVal(d.newDetail)}", and despite my best efforts, it could not be traced.`,
      `3. That the said document has not been pledged, misused, or deposited anywhere as collateral for any loan or obligation.`,
      `4. That in the event the original document is found in the future, I undertake to surrender it immediately to the issuing authority.`,
    ],
    bodyTa: (d) => [
      `1. எனக்கு வழங்கப்பட்ட அசல் ஆவணம்: "${cleanVal(d.lostDocName)}" (பதிவு எண்: "${cleanVal(d.oldDetail)}") என்னிடம் பாதுகாப்பாக இருந்து வந்தது.`,
      `2. மேற்படி அசல் சான்றிதழ் கடந்த "${cleanVal(d.newDetail)}" வாக்கில் எதிர்பாராதவிதமாக தொலைந்துவிட்டது. தீவிரமாகத் தேடியும் கிடைக்கவில்லை.`,
      `3. இந்த அசல் ஆவணம் எங்கும் அடமானமாகவோ அல்லது தவறான நோக்கங்களுக்காகவோ பயன்படுத்தப்படவில்லை என உறுதியளிக்கிறேன்.`,
      `4. எதிர்காலத்தில் இந்த அசல் ஆவணம் கிடைத்தால் அதை உடனே உரிய துறை அதிகாரிகளிடம் ஒப்படைப்பேன் என உறுதியளிக்கிறேன்.`,
    ],
  },
  general_declaration: {
    titleEn: 'GENERAL SWORN SELF-DECLARATION AFFIDAVIT',
    titleTa: 'பொது சுய உறுதிமொழிப் பத்திரம்',
    bodyEn: (d) => [
      `1. That all particulars, statements, and facts stated in this affidavit and the accompanying application are completely true, correct, and valid to the best of my knowledge and belief.`,
      `2. That no material fact has been concealed, suppressed, or misrepresented.`,
      `3. That if any information is found to be false, inaccurate, or misleading at any stage, I shall be held personally liable for legal action and penal consequences under the Indian Penal Code.`,
    ],
    bodyTa: (d) => [
      `1. இந்த உறுதிமொழிப் பத்திரத்தில் என்னால் கூறப்பட்டுள்ள அனைத்து விபரங்களும் எனது அறிவிற்கும் நம்பிக்கைக்கும் எட்டியவரை முற்றிலும் உண்மையானவை மற்றும் சரியானவை என உறுதியளிக்கிறேன்.`,
      `2. எந்த ஒரு முக்கிய உண்மையும் என்னால் மறைக்கப்படவோ அல்லது தவறாகக் கூறப்படவோ இல்லை.`,
      `3. இதில் கூறப்பட்டுள்ள தகவல்கள் ஏதேனும் தவறு எனத் தெரியவந்தால், இந்திய சட்ட விதிகளின்படி எடுக்கப்படும் சட்டப்பூர்வ நடவடிக்கைகளுக்கு நான் முழுப் பொறுப்பாவேன் என உறுதியளிக்கிறேன்.`,
    ],
  },
};

export default function AffidavitGeneratorEngine() {
  const [affidavitType, setAffidavitType] = useState<AffidavitType>('name_change');
  const [lang, setLang] = useState<Language>('en');
  const [paperMode, setPaperMode] = useState<'stamp_paper' | 'plain_a4'>('stamp_paper');
  const [stampPaperMarginInches, setStampPaperMarginInches] = useState<number>(3.5); // Top blank space for ₹20/50/100 stamp
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans'>('serif');
  const [fontSizePt, setFontSizePt] = useState<number>(12);
  const [lineSpacing, setLineSpacing] = useState<number>(1.5);
  const [includeNotarySealBox, setIncludeNotarySealBox] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    deponentName: '',
    relationType: 'S/O',
    guardianName: '',
    age: '',
    address: '',
    idType: 'Aadhaar Card',
    idNumber: '',
    oldDetail: '',
    newDetail: '',
    lostDocName: '',
    gapReason: '',
    place: '',
    date: new Date().toISOString().split('T')[0],
    advocateName: '',
    advocateEnrollment: '',
    notaryRegNo: '',
  });

  const template = TEMPLATES[affidavitType];
  const paragraphs = lang === 'en' ? template.bodyEn(formData) : template.bodyTa(formData);
  const title = lang === 'en' ? template.titleEn : template.titleTa;

  // Build the complete document HTML for isolated printing
  const generateDocumentHtml = (): string => {
    const isTa = lang === 'ta';
    const topMarginIn = paperMode === 'stamp_paper' ? stampPaperMarginInches : 0.8;
    const fontFamilyCss = fontStyle === 'serif' ? 'Georgia, "Times New Roman", Times, serif' : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    return `
      <div style="
        width: 210mm;
        min-height: 297mm;
        padding-top: ${topMarginIn}in;
        padding-left: 1.0in;
        padding-right: 1.0in;
        padding-bottom: 1.0in;
        font-family: ${fontFamilyCss};
        font-size: ${fontSizePt}pt;
        line-height: ${lineSpacing};
        color: #000000;
        background: #FFFFFF;
        box-sizing: border-box;
      ">
        <!-- Document Title -->
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-size: ${fontSizePt + 2}pt; font-weight: bold; text-decoration: underline; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
            ${title}
          </h1>
        </div>

        <!-- Deponent Preamble -->
        <div style="text-align: justify; margin-bottom: 20px;">
          ${isTa ? `
            நான், <strong>${formData.deponentName}</strong>, ${formData.relationType} <strong>${formData.guardianName}</strong>, வயது சுமார் ${formData.age} ஆண்டுகள், மேற்கண்ட <strong>${formData.address}</strong> என்ற முகவரியில் வசித்து வருகிறேன். நான் இந்த உறுதிமொழிப் பத்திரத்தின் மூலம் மனப்பூர்வமாக சத்தியம் செய்து பின்வருமாறு உறுதியளிக்கிறேன்:
          ` : `
            I, <strong>${formData.deponentName}</strong>, ${formData.relationType} <strong>${formData.guardianName}</strong>, aged about ${formData.age} years, residing at <strong>${formData.address}</strong>, do hereby solemnly affirm and state on oath as follows:
          `}
        </div>

        <!-- Affidavit Clauses -->
        <div style="text-align: justify; margin-bottom: 24px;">
          ${paragraphs.map((p) => `<p style="margin-bottom: 14px; text-indent: 20px;">${p}</p>`).join('')}
        </div>

        <!-- Verification Clause -->
        <div style="text-align: justify; margin-top: 24px; padding-top: 12px; border-top: 1px solid #999;">
          <p style="font-weight: bold; margin-bottom: 8px;">
            ${isTa ? 'உறுதிமொழி சரிபார்ப்பு (VERIFICATION):' : 'VERIFICATION:'}
          </p>
          <p style="margin: 0;">
            ${isTa ? `
              மேற்கண்ட பத்திகளில் கூறப்பட்டுள்ள அனைத்தும் எனது அறிவிற்கும் நம்பிக்கmatchிற்கும் எட்டியவரை முற்றிலும் உண்மையானவை மற்றும் சரியானவை என சத்தியம் செய்கிறேன். இதில் எந்த ஒரு முக்கிய உண்மையும் என்னால் மறைக்கப்படவில்லை.
            ` : `
              Verified at <strong>${formData.place}</strong> on this <strong>${formData.date}</strong> that the contents of the above affidavit are true and correct to the best of my knowledge, information, and belief. No part of it is false and nothing material has been concealed therein.
            `}
          </p>
        </div>

        <!-- Signature Block -->
        <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <p style="margin: 0 0 4px 0;">Place: <strong>${formData.place}</strong></p>
            <p style="margin: 0;">Date: <strong>${formData.date}</strong></p>
          </div>
          <div style="text-align: center;">
            <div style="width: 220px; border-bottom: 1px solid #000; margin-bottom: 6px;"></div>
            <p style="font-weight: bold; margin: 0;">DEPONENT / AFFIANT</p>
            <p style="font-size: 10pt; color: #444; margin: 0;">(${formData.deponentName})</p>
          </div>
        </div>

        <!-- Notary Attestation Block -->
        ${includeNotarySealBox ? `
          <div style="margin-top: 35px; padding-top: 16px; border-top: 1px dashed #777; display: flex; justify-content: space-between; align-items: flex-start; font-size: 10pt;">
            <!-- Left: Advocate Attestation -->
            <div style="width: 48%; border: 1px solid #777; padding: 10px; border-radius: 4px;">
              <p style="font-weight: bold; margin: 0 0 4px 0; text-transform: uppercase;">Identified &amp; Attested by me:</p>
              <p style="margin: 0;">Advocate: <strong>${formData.advocateName || '_______________________'}</strong></p>
              <p style="margin: 0;">Enrollment: <strong>${formData.advocateEnrollment || '_______________________'}</strong></p>
              <div style="height: 40px;"></div>
              <p style="margin: 0; text-align: center; border-top: 1px dotted #999; padding-top: 4px;">Advocate Signature</p>
            </div>

            <!-- Right: Notary Seal -->
            <div style="width: 48%; border: 1px solid #777; padding: 10px; border-radius: 4px; text-align: center;">
              <p style="font-weight: bold; margin: 0 0 4px 0; text-transform: uppercase;">Notary Public Seal &amp; Stamp</p>
              <p style="font-size: 9pt; color: #444; margin: 0 0 6px 0;">Solemnly affirmed before me at ${formData.place}</p>
              <div style="height: 34px; border: 1px dashed #bbb; display: flex; align-items: center; justify-content: center; color: #999; font-size: 9pt;">
                [ Official Notary Stamp ]
              </div>
              <p style="font-size: 9pt; margin: 4px 0 0 0;">Reg No: ${formData.notaryRegNo || 'GO/MS/XXXX'}</p>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  };

  // Isolated 1-Click Print
  const handlePrint = () => {
    printIsolatedDocument({
      title: title,
      bodyHtml: generateDocumentHtml(),
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  const handleCopyText = () => {
    const fullText = `${title}\n\n${paragraphs.join('\n\n')}\n\nDeponent Signature\n${formData.deponentName}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Engine Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Bilingual Legal Affidavit &amp; Self-Declaration Generator
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wide">
                  ENGLISH + தமிழ்
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Generate sworn affidavits calibrated for ₹20/₹50/₹100 Non-Judicial stamp paper with zero whole-page print bugs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>1-Click Print A4 Document</span>
            </button>
            <WhatsAppShare
              message="Generated bilingual affidavit in Tamil & English using Kagazo 📝 Free: https://kagazo.in/tools/bilingual-affidavit-generator"
              className="py-2 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Studio Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Form Inputs & Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Language & Paper Mode Selector */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-amber-600" />
                  <span>Document Language</span>
                </span>
                <div className="flex items-center p-1 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === 'en' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang('ta')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === 'ta' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              {/* Paper Mode */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Print Paper Type
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setPaperMode('stamp_paper')}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      paperMode === 'stamp_paper'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div>e-Stamp / Stamp Paper</div>
                    <div className="text-[10px] font-normal opacity-80">Leaves top gap for state seal</div>
                  </button>
                  <button
                    onClick={() => setPaperMode('plain_a4')}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      paperMode === 'plain_a4'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div>Plain A4 White Paper</div>
                    <div className="text-[10px] font-normal opacity-80">Full-page self declaration</div>
                  </button>
                </div>
              </div>

              {/* Stamp Paper Top Margin Slider */}
              {paperMode === 'stamp_paper' && (
                <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/40">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Stamp Paper Top Blank Gap</span>
                    <span className="text-amber-700 dark:text-amber-400">{stampPaperMarginInches}&quot; Inches</span>
                  </div>
                  <input
                    type="range"
                    min={2.5}
                    max={5.0}
                    step={0.25}
                    value={stampPaperMarginInches}
                    onChange={(e) => setStampPaperMarginInches(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Recommended: 3.5&quot; for ₹20/₹50/₹100 stamp papers; 4.0&quot; for ₹500 papers.
                  </span>
                </div>
              )}
            </div>

            {/* Template Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Affidavit Purpose &amp; Legal Category
              </label>
              <select
                value={affidavitType}
                onChange={(e) => setAffidavitType(e.target.value as AffidavitType)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="name_change">1. Name Correction / Change of Name</option>
                <option value="dob_discrepancy">2. Date of Birth (DOB) Discrepancy</option>
                <option value="gap_year">3. Education Study Break (Gap Year)</option>
                <option value="address_proof">4. Residential Address Self-Declaration</option>
                <option value="lost_document">5. Loss of Certificate / Original Marksheet</option>
                <option value="general_declaration">6. General Sworn Affidavit / Declaration</option>
              </select>
            </div>

            {/* Deponent Form Inputs */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3.5 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Deponent (Applicant) Identification</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Deponent Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.deponentName}
                    onChange={(e) => setFormData({ ...formData, deponentName: e.target.value })}
                    placeholder="e.g. Full Legal Name"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Relation &amp; Guardian
                  </label>
                  <div className="flex gap-1.5">
                    <select
                      value={formData.relationType}
                      onChange={(e) => setFormData({ ...formData, relationType: e.target.value as any })}
                      className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    >
                      <option value="S/O">S/O</option>
                      <option value="D/O">D/O</option>
                      <option value="W/O">W/O</option>
                    </select>
                    <input
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="Guardian Name"
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    ID Proof (Aadhaar / Voter)
                  </label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    placeholder="XXXX-XXXX-1234"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Full Permanent Residential Address
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium text-xs leading-relaxed"
                />
              </div>

              {/* Purpose-Specific Fields */}
              {affidavitType === 'name_change' && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Incorrect / Old Name
                    </label>
                    <input
                      type="text"
                      value={formData.oldDetail}
                      onChange={(e) => setFormData({ ...formData, oldDetail: e.target.value })}
                      placeholder="e.g. OLD / INCORRECT NAME"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 uppercase font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Correct / Gazette Name
                    </label>
                    <input
                      type="text"
                      value={formData.newDetail}
                      onChange={(e) => setFormData({ ...formData, newDetail: e.target.value })}
                      placeholder="e.g. CORRECT LEGAL NAME"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 uppercase font-medium"
                    />
                  </div>
                </div>
              )}

              {affidavitType === 'gap_year' && (
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">From Year</label>
                      <input
                        type="text"
                        value={formData.oldDetail}
                        onChange={(e) => setFormData({ ...formData, oldDetail: e.target.value })}
                        placeholder="2022"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">To Year</label>
                      <input
                        type="text"
                        value={formData.newDetail}
                        onChange={(e) => setFormData({ ...formData, newDetail: e.target.value })}
                        placeholder="2024"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Reason for Gap
                    </label>
                    <input
                      type="text"
                      value={formData.gapReason}
                      onChange={(e) => setFormData({ ...formData, gapReason: e.target.value })}
                      placeholder="e.g. Competitive exam preparation"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}

              {affidavitType === 'lost_document' && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Lost Document Name
                    </label>
                    <input
                      type="text"
                      value={formData.lostDocName}
                      onChange={(e) => setFormData({ ...formData, lostDocName: e.target.value })}
                      placeholder="e.g. 10th SSLC Marksheet"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Roll / Reg Number
                    </label>
                    <input
                      type="text"
                      value={formData.oldDetail}
                      onChange={(e) => setFormData({ ...formData, oldDetail: e.target.value })}
                      placeholder="e.g. 481920"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}

              {/* Date & Place */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Place / City</label>
                  <input
                    type="text"
                    value={formData.place}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Typography & Advanced Formatting */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3.5 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-600" />
                <span>Typography &amp; Layout Formatting</span>
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Font Style</label>
                  <select
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value as any)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                  >
                    <option value="serif">Legal Serif</option>
                    <option value="sans">Clean Sans</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Size (Pt)</label>
                  <select
                    value={fontSizePt}
                    onChange={(e) => setFontSizePt(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                  >
                    <option value={11}>11 pt (Compact)</option>
                    <option value={12}>12 pt (Standard)</option>
                    <option value={13}>13 pt (Large)</option>
                    <option value={14}>14 pt (Readable)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Spacing</label>
                  <select
                    value={lineSpacing}
                    onChange={(e) => setLineSpacing(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                  >
                    <option value={1.25}>1.25 (Tight)</option>
                    <option value={1.5}>1.5 (Standard)</option>
                    <option value={1.75}>1.75 (Double)</option>
                  </select>
                </div>
              </div>

              {/* Notary Seal Toggle */}
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Include Notary Seal &amp; Advocate Box
                </span>
                <input
                  type="checkbox"
                  checked={includeNotarySealBox}
                  onChange={(e) => setIncludeNotarySealBox(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 accent-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Physical Document Live Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-600" />
                <span>Physical Paper Preview (1:1 A4 Print Layout)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                {paperMode === 'stamp_paper' ? `Non-Judicial Top Gap: ${stampPaperMarginInches}"` : 'Plain A4 Standard'}
              </span>
            </div>

            {/* A4 Sheet Container */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-inner overflow-auto max-h-[880px]">
              <div
                className="bg-white text-black mx-auto shadow-2xl rounded-xs relative transition-all"
                style={{
                  width: '100%',
                  maxWidth: '210mm',
                  minHeight: '297mm',
                  paddingTop: paperMode === 'stamp_paper' ? `${stampPaperMarginInches}in` : '0.8in',
                  paddingLeft: '0.9in',
                  paddingRight: '0.9in',
                  paddingBottom: '0.9in',
                  fontFamily: fontStyle === 'serif' ? 'Georgia, "Times New Roman", Times, serif' : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: `${fontSizePt}pt`,
                  lineHeight: lineSpacing,
                }}
              >
                {/* Stamp Paper Visual Guideline (Only visible in editor, hidden in print) */}
                {paperMode === 'stamp_paper' && (
                  <div
                    className="absolute top-0 left-0 right-0 border-b-2 border-dashed border-amber-500/60 bg-amber-50/50 flex flex-col items-center justify-center text-amber-900 pointer-events-none select-none text-center px-4"
                    style={{ height: `${stampPaperMarginInches}in` }}
                  >
                    <Scale className="w-6 h-6 text-amber-600 mb-1 opacity-70" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      ★ Non-Judicial / e-Stamp Area ({stampPaperMarginInches}&quot; Blank Top Space) ★
                    </span>
                    <span className="text-[10px] text-amber-700 opacity-80">
                      Feed physical green stamp paper into printer. Text begins cleanly below this line.
                    </span>
                  </div>
                )}

                {/* Document Title */}
                <div className="text-center mb-6">
                  <h1
                    className="font-bold underline uppercase tracking-wide"
                    style={{ fontSize: `${fontSizePt + 2}pt` }}
                  >
                    {title}
                  </h1>
                </div>

                {/* Deponent Statement */}
                <div className="text-justify mb-5">
                  {lang === 'ta' ? (
                    <span>
                      நான், <strong>{formData.deponentName || '____________________'}</strong>, {formData.relationType} <strong>{formData.guardianName || '____________________'}</strong>, வயது சுமார் {formData.age || '__'} ஆண்டுகள், மேற்கண்ட <strong>{formData.address || '________________________________________'}</strong> என்ற முகவரியில் வசித்து வருகிறேன். நான் இந்த உறுதிமொழிப் பத்திரத்தின் மூலம் மனப்பூர்வமாக சத்தியம் செய்து பின்வருமாறு உறுதியளிக்கிறேன்:
                    </span>
                  ) : (
                    <span>
                      I, <strong>{formData.deponentName || '____________________'}</strong>, {formData.relationType} <strong>{formData.guardianName || '____________________'}</strong>, aged about {formData.age || '__'} years, residing at <strong>{formData.address || '________________________________________'}</strong>, do hereby solemnly affirm and state on oath as follows:
                    </span>
                  )}
                </div>

                {/* Clauses */}
                <div className="text-justify space-y-3.5 mb-6">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="indent-6 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Verification */}
                <div className="text-justify mt-6 pt-3 border-t border-slate-300">
                  <p className="font-bold mb-2">
                    {lang === 'ta' ? 'உறுதிமொழி சரிபார்ப்பு (VERIFICATION):' : 'VERIFICATION:'}
                  </p>
                  <p className="text-sm leading-relaxed">
                    {lang === 'ta' ? (
                      `மேற்கண்ட பத்திகளில் கூறப்பட்டுள்ள அனைத்தும் எனது அறிவிற்கும் நம்பிக்கைக்கும் எட்டியவரை முற்றிலும் உண்மையானவை மற்றும் சரியானவை என சத்தியம் செய்கிறேன். இதில் எந்த ஒரு முக்கிய உண்மையும் என்னால் மறைக்கப்படவில்லை.`
                    ) : (
                      `Verified at ${formData.place || '__________'} on this ${formData.date || '__________'} that the contents of the above affidavit are true and correct to the best of my knowledge, information, and belief. No part of it is false and nothing material has been concealed therein.`
                    )}
                  </p>
                </div>

                {/* Signature Block */}
                <div className="mt-10 flex justify-between items-end text-sm">
                  <div>
                    <p>Place: <strong>{formData.place}</strong></p>
                    <p>Date: <strong>{formData.date}</strong></p>
                  </div>
                  <div className="text-center">
                    <div className="w-56 border-b border-black mb-1.5"></div>
                    <p className="font-bold">DEPONENT / AFFIANT</p>
                    <p className="text-xs text-slate-600">({formData.deponentName || 'Signature'})</p>
                  </div>
                </div>

                {/* Notary Public & Advocate Box */}
                {includeNotarySealBox && (
                  <div className="mt-8 pt-4 border-t border-dashed border-slate-400 flex justify-between items-start gap-4 text-xs">
                    <div className="w-1/2 border border-slate-400 p-2.5 rounded-sm">
                      <p className="font-bold uppercase mb-1">Identified &amp; Attested by me:</p>
                      <p>Advocate: <strong>{formData.advocateName || '____________________'}</strong></p>
                      <p>Enrollment: <strong>{formData.advocateEnrollment || '____________________'}</strong></p>
                      <div className="h-10"></div>
                      <p className="text-center border-t border-dotted border-slate-400 pt-1 text-[11px]">
                        Advocate Signature &amp; Seal
                      </p>
                    </div>

                    <div className="w-1/2 border border-slate-400 p-2.5 rounded-sm text-center">
                      <p className="font-bold uppercase mb-0.5">Notary Public Seal &amp; Stamp</p>
                      <p className="text-[10px] text-slate-500 mb-1.5">Solemnly affirmed before me at {formData.place}</p>
                      <div className="h-9 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[10px]">
                        [ Official Notary Stamp ]
                      </div>
                      <p className="text-[10px] mt-1">Reg No: {formData.notaryRegNo || 'GO/MS/XXXX'}</p>
                    </div>
                  </div>
                )}
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
