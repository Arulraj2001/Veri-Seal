'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  Download,
  RefreshCw,
  Image as ImageIcon,
  PenTool,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
} from 'lucide-react';
import {
  joinPhotoSignature,
  PhotoSignatureJoinerResponse,
  PhotoSignatureJoinerOptions,
} from '@/lib/api';
import PreFlightComplianceCard from './PreFlightComplianceCard';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

export default function PhotoSignatureJoinerEngine() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [declarationFile, setDeclarationFile] = useState<File | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [sigPreview, setSigPreview] = useState<string | null>(null);
  const [declPreview, setDeclPreview] = useState<string | null>(null);

  const [candidateName, setCandidateName] = useState<string>('');
  const [dateOfPhoto, setDateOfPhoto] = useState<string>('');
  const [preset, setPreset] = useState<PhotoSignatureJoinerOptions['preset']>('mp_peb');

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PhotoSignatureJoinerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);
  const declInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setSignatureFile(file);
    setSigPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDeclChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setDeclarationFile(file);
    setDeclPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleProcess = async () => {
    if (!photoFile || !signatureFile) {
      setError('Please upload both Passport Photo and Signature.');
      return;
    }

    setIsLoading(true);
    setProgress(20);
    setError(null);

    try {
      const res = await joinPhotoSignature(photoFile, signatureFile, {
        declarationFile,
        candidateName: candidateName.trim() || undefined,
        dateOfPhoto: dateOfPhoto.trim() || undefined,
        preset,
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to generate composite slip.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result?.image_base64) return;
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `composite_slip_${preset}_${result.width_px}x${result.height_px}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Upload Matrix */}
      <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 shadow-sm">
        <input
          type="file"
          ref={photoInputRef}
          onChange={handlePhotoChange}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={sigInputRef}
          onChange={handleSigChange}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={declInputRef}
          onChange={handleDeclChange}
          accept="image/*"
          className="hidden"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Slot 1: Passport Photo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span>1. Passport Photo (Mandatory)</span>
            </label>
            {!photoPreview ? (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="h-40 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all"
              >
                <Upload className="w-6 h-6 text-emerald-600 mb-1" />
                <div className="font-bold text-xs text-slate-800">Choose Photo</div>
                <div className="text-[10px] text-slate-500">Recent color passport</div>
              </div>
            ) : (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="h-40 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 cursor-pointer relative group"
              >
                <img src={photoPreview} alt="Photo" className="max-h-full max-w-full object-contain rounded" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-2xl">
                  Replace Photo
                </div>
              </div>
            )}
          </div>

          {/* Slot 2: Signature */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <PenTool className="w-4 h-4 text-emerald-600" />
              <span>2. Signature (Mandatory)</span>
            </label>
            {!sigPreview ? (
              <div
                onClick={() => sigInputRef.current?.click()}
                className="h-40 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all"
              >
                <Upload className="w-6 h-6 text-emerald-600 mb-1" />
                <div className="font-bold text-xs text-slate-800">Choose Signature</div>
                <div className="text-[10px] text-slate-500">Black/blue pen on white paper</div>
              </div>
            ) : (
              <div
                onClick={() => sigInputRef.current?.click()}
                className="h-40 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 cursor-pointer relative group"
              >
                <img src={sigPreview} alt="Signature" className="max-h-full max-w-full object-contain rounded" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-2xl">
                  Replace Signature
                </div>
              </div>
            )}
          </div>

          {/* Slot 3: Handwritten Declaration (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>3. Declaration Slip (Optional)</span>
            </label>
            {!declPreview ? (
              <div
                onClick={() => declInputRef.current?.click()}
                className="h-40 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all"
              >
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <div className="font-bold text-xs text-slate-700">Choose Declaration</div>
                <div className="text-[10px] text-slate-500">For MP PEB 3-part layout</div>
              </div>
            ) : (
              <div
                onClick={() => declInputRef.current?.click()}
                className="h-40 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 cursor-pointer relative group"
              >
                <img src={declPreview} alt="Declaration" className="max-h-full max-w-full object-contain rounded" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-2xl">
                  Replace Declaration
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text Overlays & Exam Preset */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Exam Format</label>
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800"
              >
                <option value="mp_peb">MP PEB / Vyapam (400×500 px, &lt;100KB)</option>
                <option value="upsssc">UPSSSC Combined (350×500 px, &lt;50KB)</option>
                <option value="kerala_psc">Kerala PSC Profile (300×400 px, &lt;40KB)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Candidate Name (Optional Stamp)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. R. ARUN KUMAR"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Date of Photo (DOP Stamp)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. 15/08/2026"
                  value={dateOfPhoto}
                  onChange={(e) => setDateOfPhoto(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleProcess}
            disabled={isLoading || !photoFile || !signatureFile}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Joint Slip ({progress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create Combined Application Slip</span>
              </>
            )}
          </button>

          {result?.image_base64 && (
            <>
              <button
                onClick={handleDownload}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Slip (JPG &lt;{result.target_max_kb}KB)</span>
              </button>
              <WhatsAppShare
                message="Resized my exam photo to exact KB using Kagazo 📸 Free tool for SSC/UPSC/TNPSC: https://kagazo.in/tools"
                className="py-3 text-sm rounded-2xl"
              />
            </>
          )}
        </div>
      </div>

      {/* Result Display & PreFlight Scorecard */}
      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-darker/60">
              <div className="font-bold text-sm text-slate-800">
                Composite Application Slip Preview
              </div>
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {result.width_px} × {result.height_px} px • {result.output_size_kb} KB
              </div>
            </div>
            <div className="max-w-xs mx-auto bg-slate-50 p-2 rounded-2xl border border-slate-200 shadow-inner">
              <img
                src={result.image_base64}
                alt="Combined Slip"
                className="w-full h-auto rounded-lg shadow-sm border border-slate-200"
              />
            </div>
          </div>

          <PreFlightComplianceCard
            portalName={
              preset === 'mp_peb'
                ? 'MP PEB / Vyapam Portal'
                : preset === 'upsssc'
                ? 'UPSSSC Application Portal'
                : 'Kerala PSC Profile'
            }
            fileSizeKb={result.output_size_kb}
            minKbTarget={10}
            maxKbTarget={result.target_max_kb}
            widthPx={result.width_px}
            heightPx={result.height_px}
            targetWidth={result.width_px}
            targetHeight={result.height_px}
            format="JPEG"
          />
        </div>
      )}
    </div>
  );
}
