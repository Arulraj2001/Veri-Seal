'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  Download,
  RefreshCw,
  Archive,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Layers,
  Trash2,
} from 'lucide-react';
import {
  batchProcessPhotos,
  BatchProcessResponse,
  BatchProcessOptions,
} from '@/lib/api';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';

const PRESETS = [
  { id: 'ssc_photo', label: 'SSC Photo', desc: '350×450 px • 20–50 KB' },
  { id: 'ssc_sig', label: 'SSC Signature', desc: '140×60 px • 10–20 KB' },
  { id: 'upsc_photo', label: 'UPSC Photo', desc: '350×350 px • 20–50 KB' },
  { id: 'upsc_sig', label: 'UPSC Signature', desc: '350×350 px • 20–50 KB' },
  { id: 'ibps_photo', label: 'IBPS Bank Photo', desc: '200×230 px • 20–50 KB' },
  { id: 'ibps_sig', label: 'IBPS Signature', desc: '140×60 px • 10–20 KB' },
  { id: 'rrb_photo', label: 'Railway RRB Photo', desc: '320×240 px • 20–50 KB' },
  { id: 'rrb_sig', label: 'Railway RRB Signature', desc: '160×80 px • 10–40 KB' },
];

export default function BatchResizerEngine() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [preset, setPreset] = useState<string>('ssc_photo');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<BatchProcessResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    if (filesArray.length > 50) {
      setError('Maximum 50 files allowed per batch.');
      setSelectedFiles(filesArray.slice(0, 50));
    } else {
      setSelectedFiles(filesArray);
      setError(null);
    }
    setResult(null);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
    setResult(null);
  };

  const handleProcess = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one photo or signature file.');
      return;
    }

    setIsLoading(true);
    setProgress(20);
    setError(null);

    try {
      const res = await batchProcessPhotos(selectedFiles, {
        preset,
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Batch processing failed.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownloadZip = () => {
    if (!result?.zip_base64) return;
    const link = document.createElement('a');
    link.href = result.zip_base64;
    link.download = `candidates_${preset}_batch_${result.total_files}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 shadow-sm">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFilesChange}
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
        />

        {selectedFiles.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-10 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Archive className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Drop Folder or Select Up to 50 Photos / Signatures
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5">
              Built for Cyber Cafes and CSC centers. Batch resizes all student files in RAM and
              outputs an organized ZIP archive ready for portal upload.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors">
              <Upload className="w-4 h-4" />
              <span>Select Multiple Photos</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header / Queue Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-darker/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-800">
                    {selectedFiles.length} Candidate Files Selected
                  </div>
                  <div className="text-xs text-slate-500">
                    {(selectedFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB Total
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl border border-surface-darker/70 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                >
                  + Add More Files
                </button>
                <button
                  onClick={() => setSelectedFiles([])}
                  className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors"
                >
                  Clear Queue
                </button>
              </div>
            </div>

            {/* Target Preset Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Select Universal Target Recruitment Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPreset(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      preset === p.id
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold truncate">{p.label}</div>
                    <div className={`text-[10px] truncate ${preset === p.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {p.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Queue Table (Preview of up to 6 files) */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden">
              <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700 flex justify-between">
                <span>Queued Files ({selectedFiles.length})</span>
                <span className="text-[11px] text-slate-500">Auto-calibrating to {preset}</span>
              </div>
              <div className="max-h-56 overflow-y-auto divide-y divide-slate-200 text-xs">
                {selectedFiles.slice(0, 10).map((file, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between gap-3 hover:bg-white transition-colors">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-slate-400 font-mono text-[10px] w-5">{idx + 1}.</span>
                      <span className="font-medium text-slate-800 truncate max-w-xs">{file.name}</span>
                      <span className="text-slate-400 text-[10px]">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(idx)}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove from batch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {selectedFiles.length > 10 && (
                  <div className="p-2 text-center text-slate-400 text-xs italic">
                    + {selectedFiles.length - 10} more files queued in memory
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={handleProcess}
                disabled={isLoading}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing {selectedFiles.length} files ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Batch Resize All {selectedFiles.length} Files</span>
                  </>
                )}
              </button>

              {result?.zip_base64 && (
                <>
                  <button
                    onClick={handleDownloadZip}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition-all"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download Processed ZIP ({result.total_zip_size_kb} KB)</span>
                  </button>
                  <WhatsAppShare
                    message="Resized my exam photo to exact KB using Kagazo 📸 Free tool for SSC/UPSC/TNPSC: https://kagazo.in/tools"
                    className="py-3 text-sm rounded-2xl"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Batch Processing Result Table */}
      {result && (
        <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-darker/60">
            <div>
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Batch Processing Report</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {result.success_count} files successfully calibrated to {result.preset} specifications
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              100% Zero-Watermark Ready
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Original Filename</th>
                  <th className="p-3">Output Name</th>
                  <th className="p-3">Original Size</th>
                  <th className="p-3">Calibrated Size</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.files_summary.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="p-3 font-medium text-slate-800">{item.original_name}</td>
                    <td className="p-3 text-emerald-700 font-mono text-[11px]">{item.output_name}</td>
                    <td className="p-3 text-slate-500">{item.original_size_kb} KB</td>
                    <td className="p-3 font-bold text-slate-800">{item.output_size_kb} KB</td>
                    <td className="p-3">
                      {item.status === 'success' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> PASS
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                          FAIL
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
