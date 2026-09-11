'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Download,
  Sparkles,
  RefreshCw,
  Layers,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { mergeMarksheets, MergeMarksheetsResponse } from '@/lib/api';

interface FileListItem {
  id: string;
  file: File;
  previewUrl: string;
  isPdf: boolean;
}

export default function MarksheetMergeEngine() {
  const [items, setItems] = useState<FileListItem[]>([]);
  const [targetKb, setTargetKb] = useState<number>(1000);
  const [preset, setPreset] = useState<'color' | 'greyscale' | 'xerox'>('color');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<MergeMarksheetsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    addFiles(Array.from(e.target.files));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((f) => {
      const ext = f.name.toLowerCase();
      return (
        ext.endsWith('.jpg') ||
        ext.endsWith('.jpeg') ||
        ext.endsWith('.png') ||
        ext.endsWith('.webp') ||
        ext.endsWith('.pdf')
      );
    });

    if (items.length + validFiles.length > 15) {
      setError('You can merge a maximum of 15 marksheets at a time.');
      return;
    }

    const newItems: FileListItem[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
      isPdf: file.name.toLowerCase().endsWith('.pdf'),
    }));

    setItems((prev) => [...prev, ...newItems]);
    setError(null);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target && target.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setItems((prev) => {
      const arr = [...prev];
      const temp = arr[index - 1];
      arr[index - 1] = arr[index];
      arr[index] = temp;
      return arr;
    });
  };

  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    setItems((prev) => {
      const arr = [...prev];
      const temp = arr[index + 1];
      arr[index + 1] = arr[index];
      arr[index] = temp;
      return arr;
    });
  };

  const handleMerge = async () => {
    if (items.length === 0) {
      setError('Please add at least one marksheet photo or PDF.');
      return;
    }

    setIsLoading(true);
    setProgress(15);
    setError(null);

    try {
      const rawFiles = items.map((i) => i.file);
      const res = await mergeMarksheets(rawFiles, {
        targetKb,
        preset,
        pageFormat: 'A4',
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to merge marksheets.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!result?.pdf_base64) return;
    const link = document.createElement('a');
    link.href = result.pdf_base64;
    link.download = `all_semesters_marksheets_under_${targetKb}KB.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    items.forEach((it) => {
      if (it.previewUrl) URL.revokeObjectURL(it.previewUrl);
    });
    setItems([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-surface-darker/60 shadow-xl p-6 sm:p-8">
      {/* Step 1: File Uploader */}
      {!result ? (
        <div className="space-y-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
            }}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-emerald-50/40 hover:bg-emerald-50/70 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
            />
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Click to Upload Marksheets & Certificates
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Select 1 to 12 semester marksheets, provisional degree, or consolidated certificates (JPG, PNG, PDF).
            </p>
          </div>

          {/* Files List / Ordering */}
          {items.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Arranged Pages ({items.length} Marksheet{items.length > 1 ? 's' : ''})
                </span>
                <span className="text-xs text-slate-400">Order from Semester 1 to Final Degree</span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      {item.previewUrl ? (
                        <img
                          src={item.previewUrl}
                          alt="thumb"
                          className="w-10 h-10 object-cover rounded border border-slate-300 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-800 truncate">{item.file.name}</p>
                        <p className="text-xs text-slate-400">
                          {(item.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 text-slate-600"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === items.length - 1}
                        title="Move Down"
                        className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 text-slate-600"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        title="Remove"
                        className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Controls: Target KB & Preset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Target Maximum File Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '< 500 KB', val: 500 },
                  { label: '< 1000 KB (1MB)', val: 1000 },
                  { label: '< 2000 KB (2MB)', val: 2000 },
                ].map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => setTargetKb(t.val)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      targetKb === t.val
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Color / Scan Quality Filter
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Color', val: 'color' },
                  { label: 'Xerox Clean', val: 'xerox' },
                  { label: 'Greyscale', val: 'greyscale' },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => setPreset(p.val as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      preset === p.val
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleMerge}
            disabled={items.length === 0 || isLoading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Optimizing & Merging ({progress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Merge Marksheets into 1 Single PDF (&lt;{targetKb}KB)</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Result State */
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <FileCheck className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              {result.is_under_target ? 'Guaranteed Under Limit' : 'Successfully Optimized'}
            </span>
            <h3 className="text-2xl font-bold text-slate-800">
              Single PDF Ready ({result.output_size_kb} KB)
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Combined {result.total_pages} marksheets into one standard A4 PDF document strictly compliant with government portal rules.
            </p>
          </div>

          {/* Page 1 Thumbnail Preview */}
          {result.preview_base64 && (
            <div className="max-w-xs mx-auto border border-slate-200 rounded-2xl p-2 bg-slate-50 shadow-inner">
              <img
                src={result.preview_base64}
                alt="Page 1 Preview"
                className="w-full h-auto rounded-xl shadow"
              />
              <p className="text-xs text-slate-400 mt-1 font-medium">Page 1 Document Preview</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleDownload}
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Combined PDF ({result.output_size_kb} KB)</span>
            </button>

            <button
              onClick={resetAll}
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
            >
              Merge Another Batch
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% In-Memory RAM Processing • No marksheet scans stored on servers</span>
          </div>
        </div>
      )}
    </div>
  );
}
