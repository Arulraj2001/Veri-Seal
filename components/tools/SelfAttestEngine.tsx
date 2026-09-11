'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  PenTool,
  ShieldCheck,
  FileCheck2,
  Layers,
  RefreshCw,
} from 'lucide-react';
import { applySelfAttestation, SelfAttestationResponse } from '@/lib/api';

const TARGET_PRESETS = [
  { kb: 200, label: '200 KB', note: 'UPSC / SSC / Govt Portals' },
  { kb: 300, label: '300 KB', note: 'State PSC / University' },
  { kb: 500, label: '500 KB', note: 'IBPS / Banking Portals' },
  { kb: 1024, label: '1 MB', note: 'Standard Hi-Res Archive' },
];

export default function SelfAttestEngine() {
  const [docFile, setDocFile] = useState<File | null>(null);
  const [sigFile, setSigFile] = useState<File | null>(null);
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [sigPreview, setSigPreview] = useState<string | null>(null);

  // Attestation details
  const [candidateName, setCandidateName] = useState<string>('');
  const [attestDate, setAttestDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [attestHeading, setAttestHeading] = useState<string>('Self Attested');
  const [inkColor, setInkColor] = useState<'blue' | 'black'>('blue');
  const [position, setPosition] = useState<'bottom_right' | 'bottom_left' | 'bottom_center'>('bottom_right');
  const [targetKb, setTargetKb] = useState<number>(300);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SelfAttestationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const docInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setDocFile(file);
    if (file.type.startsWith('image/')) {
      setDocPreview(URL.createObjectURL(file));
    } else {
      setDocPreview(null);
    }
    setResult(null);
    setError(null);
  };

  const handleSigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setSigFile(file);
    setSigPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!docFile) {
      setError('Please upload the certificate, marksheet, or document (PDF/Image).');
      return;
    }
    if (!sigFile) {
      setError('Please upload your signature image (PNG or JPG).');
      return;
    }
    if (!candidateName.trim()) {
      setError('Please enter candidate name as per official records.');
      return;
    }

    setIsLoading(true);
    setProgress(20);
    setError(null);

    try {
      const res = await applySelfAttestation(docFile, sigFile, {
        candidateName: candidateName.trim(),
        attestDate,
        attestHeading,
        inkColor,
        position,
        targetKb,
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Self-attestation process failed.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result?.pdf_base64) return;
    const link = document.createElement('a');
    link.href = result.pdf_base64;
    link.download = `self_attested_${candidateName.toLowerCase().replace(/\s+/g, '_') || 'doc'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Upload Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Step 1: Document
              </span>
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">
              Upload Marksheet / Degree / Certificate
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              PDF or JPG/PNG image up to 15MB. All vector fonts & crispness are preserved.
            </p>

            <input
              type="file"
              ref={docInputRef}
              onChange={handleDocChange}
              accept=".pdf,image/png,image/jpeg,image/webp"
              className="hidden"
            />

            <div
              onClick={() => docInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/40 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 group"
            >
              {docFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-white truncate max-w-[240px]">
                    {docFile.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {(docFile.size / 1024).toFixed(1)} KB • Click to change
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Choose Certificate or PDF</p>
                  <p className="text-xs text-slate-500 mt-1">10th/12th Marksheet, Caste, EWS, Degree</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Signature Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Step 2: Signature
              </span>
              <PenTool className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">
              Upload Your Signature
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Clear scanned or mobile photo of your signature on plain white paper.
            </p>

            <input
              type="file"
              ref={sigInputRef}
              onChange={handleSigChange}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />

            <div
              onClick={() => sigInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-blue-500/60 bg-slate-950/40 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 group"
            >
              {sigFile ? (
                <div className="flex flex-col items-center">
                  {sigPreview && (
                    <img
                      src={sigPreview}
                      alt="Signature Preview"
                      className="h-12 max-w-[160px] object-contain mb-2 bg-white/90 rounded p-1"
                    />
                  )}
                  <p className="text-sm font-medium text-white truncate max-w-[240px]">
                    {sigFile.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {(sigFile.size / 1024).toFixed(1)} KB • Click to change
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors mb-2">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Choose Signature Image</p>
                  <p className="text-xs text-slate-500 mt-1">Blue or Black ink photo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Attestation Setup Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Attestation Stamp Details & Placement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Candidate Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Candidate Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. RAJESH KUMAR"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors uppercase"
              />
            </div>
          </div>

          {/* Attestation Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Attestation Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="date"
                value={attestDate}
                onChange={(e) => setAttestDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Heading Label */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Stamp Heading
            </label>
            <select
              value={attestHeading}
              onChange={(e) => setAttestHeading(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="Self Attested">Self Attested (Standard)</option>
              <option value="Attested True Copy">Attested True Copy</option>
              <option value="Verified Document">Verified Document</option>
              <option value="Self Signed">Self Signed</option>
            </select>
          </div>
        </div>

        {/* Ink & Placement Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-800/80">
          {/* Ink Color */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Ink Color
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInkColor('blue')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  inkColor === 'blue'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Royal Blue Ink
              </button>
              <button
                type="button"
                onClick={() => setInkColor('black')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  inkColor === 'black'
                    ? 'bg-slate-800 border-slate-600 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                Black Ink
              </button>
            </div>
          </div>

          {/* Stamp Placement */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Stamp Position on Page
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPosition('bottom_left')}
                className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                  position === 'bottom_left'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Bottom Left
              </button>
              <button
                type="button"
                onClick={() => setPosition('bottom_center')}
                className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                  position === 'bottom_center'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Bottom Center
              </button>
              <button
                type="button"
                onClick={() => setPosition('bottom_right')}
                className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                  position === 'bottom_right'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Bottom Right
              </button>
            </div>
          </div>

          {/* Target PDF Size */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Maximum File Size Limit
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TARGET_PRESETS.map((p) => (
                <button
                  key={p.kb}
                  type="button"
                  onClick={() => setTargetKb(p.kb)}
                  className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    targetKb === p.kb
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Stamp Visualizer */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Live Stamp Simulation</p>
              <p className="text-[11px] text-slate-400">
                Will be stamped cleanly at <span className="text-emerald-400">{position.replace('_', ' ')}</span> of your document.
              </p>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-lg border flex flex-col items-center justify-center text-center ${
              inkColor === 'blue'
                ? 'border-blue-500/50 bg-blue-950/30 text-blue-300'
                : 'border-slate-500/50 bg-slate-900/50 text-slate-200'
            }`}
          >
            <span className="text-[9px] font-bold tracking-widest uppercase mb-0.5">
              {attestHeading}
            </span>
            {sigPreview ? (
              <img
                src={sigPreview}
                alt="sig"
                className="h-5 max-w-[80px] object-contain my-0.5 filter brightness-110"
              />
            ) : (
              <span className="text-[10px] italic text-slate-500 py-0.5">[Signature]</span>
            )}
            <span className="text-[9px] font-medium tracking-tight">
              {candidateName || 'CANDIDATE NAME'} • {attestDate}
            </span>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleProcess}
            disabled={isLoading || !docFile || !sigFile}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Applying Stamp & Optimizing ({progress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Apply Self-Attestation Stamp</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Self-Attestation Completed</h3>
                <p className="text-xs text-slate-400">
                  Total {result.total_pages} page(s) • Stamped at {result.position} • Volatile RAM Processed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-400">Optimized Size</div>
                <div className="text-sm font-bold text-emerald-400">
                  {result.output_size_kb} KB / {result.target_kb} KB
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          {/* High-res PDF Page Preview */}
          {result.preview_base64 && (
            <div className="flex flex-col items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 mb-3 font-medium">Page 1 Stamped Preview</p>
              <div className="max-w-2xl w-full max-h-[550px] overflow-auto rounded-lg border border-slate-700 bg-white/5 flex justify-center p-2">
                <img
                  src={result.preview_base64}
                  alt="Stamped Preview"
                  className="max-h-[500px] w-auto object-contain rounded shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Compliance Guarantee Card */}
          <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-emerald-300">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>
                <strong>100% Portal Compliance:</strong> Stamped without flattening vector text. Sized safely under {result.target_kb} KB.
              </span>
            </div>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider">
              {result.is_under_limit ? 'Guaranteed Pass' : 'Budget Fitted'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
