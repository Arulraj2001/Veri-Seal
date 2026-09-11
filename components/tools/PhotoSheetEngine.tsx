'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Printer,
  Download,
  Scissors,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Grid,
  Calendar,
  User,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { generatePhotoSheet, PhotoSheetResponse, PhotoSheetOptions } from '@/lib/api';

export default function PhotoSheetEngine() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sheetFormat, setSheetFormat] = useState<PhotoSheetOptions['sheetFormat']>('4x6_8photos');
  const [addNameDate, setAddNameDate] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>('');
  const [dateOfPhoto, setDateOfPhoto] = useState<string>('');
  const [addCuttingGuides, setAddCuttingGuides] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PhotoSheetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError('Please select a photo first.');
      return;
    }

    setIsLoading(true);
    setProgress(20);
    setError(null);

    try {
      const res = await generatePhotoSheet(selectedFile, {
        sheetFormat,
        addNameDate,
        candidateName,
        dateOfPhoto,
        addCuttingGuides,
        outputFormat: 'both',
        onProgress: (pct) => setProgress(pct),
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to generate passport photo sheet.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownloadPdf = () => {
    if (!result?.pdf_base64) return;
    const link = document.createElement('a');
    link.href = result.pdf_base64;
    link.download = `passport_photos_${sheetFormat}_300dpi.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadImage = () => {
    if (!result?.image_base64) return;
    const link = document.createElement('a');
    link.href = result.image_base64;
    link.download = `passport_photos_${sheetFormat}_300dpi.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!result?.image_base64) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to trigger direct printing.');
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Passport Photo Sheet - VeriSeal</title>
          <style>
            @page {
              margin: 0;
              size: auto;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
            }
            img {
              max-width: 100vw;
              max-height: 100vh;
              object-fit: contain;
              display: block;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <img src="${result.image_base64}" alt="Print Sheet" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-surface-darker/60 shadow-xl p-6 sm:p-8">
      {!result ? (
        <div className="space-y-6">
          {/* File Upload Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) {
                const file = e.dataTransfer.files[0];
                if (file.type.startsWith('image/')) {
                  setSelectedFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                  setResult(null);
                  setError(null);
                }
              }
            }}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-emerald-50/40 hover:bg-emerald-50/70 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
            {previewUrl ? (
              <div className="flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Candidate Preview"
                  className="w-28 h-36 object-cover rounded-xl shadow-md border-2 border-white mb-3"
                />
                <p className="text-sm font-bold text-slate-800">{selectedFile?.name}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Click to replace photo</p>
              </div>
            ) : (
              <div>
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Upload Passport Photo (JPG / PNG)
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Take a photo with your phone or studio camera. We automatically crop to 3.5×4.5cm and arrange on printable 4×6" or A4 sheets.
                </p>
              </div>
            )}
          </div>

          {/* Sheet Format Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Printing Paper & Photo Count
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: '4x6_8photos',
                  title: '4" × 6" Card (8 Photos)',
                  desc: 'Standard postcard photo paper (Inkjet / Studio)',
                  badge: 'Most Popular',
                },
                {
                  id: '4x6_6photos',
                  title: '4" × 6" Card (6 Photos)',
                  desc: 'Extra wide border for easy cutting',
                  badge: null,
                },
                {
                  id: 'A4_32photos',
                  title: 'A4 Sheet (32 Photos)',
                  desc: 'Bulk printing on full page glossy paper',
                  badge: 'Best Value',
                },
                {
                  id: 'A4_30photos',
                  title: 'A4 Sheet (30 Photos)',
                  desc: '5 cols × 6 rows grid arrangement',
                  badge: null,
                },
                {
                  id: 'single_35x45',
                  title: 'Single 3.5×4.5 cm',
                  desc: 'Indian standard passport photo (300 DPI)',
                  badge: null,
                },
                {
                  id: 'single_51x51',
                  title: 'Single 2" × 2" (51×51mm)',
                  desc: 'US Visa & OCI Card square format',
                  badge: 'Visa / OCI',
                },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setSheetFormat(fmt.id as any)}
                  className={`p-3 text-left rounded-2xl border transition-all relative ${
                    sheetFormat === fmt.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  {fmt.badge && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                      {fmt.badge}
                    </span>
                  )}
                  <p className="text-xs font-bold text-slate-800">{fmt.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{fmt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Name and Date of Photo Option */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addNameDate}
                  onChange={(e) => setAddNameDate(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-800">
                  Add Name & Date of Photo (UPSC, SSC, Police Exam Requirement)
                </span>
              </label>
              <span className="text-[11px] text-slate-400">White footer strip</span>
            </div>

            {addNameDate && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    Candidate Name (Capital Letters)
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. RAJESH SHARMA"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Date of Photo Taken (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    value={dateOfPhoto}
                    onChange={(e) => setDateOfPhoto(e.target.value)}
                    placeholder="e.g. 10/09/2026"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cutting Guides Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={addCuttingGuides}
                onChange={(e) => setAddCuttingGuides(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-emerald-600" />
                Dashed Scissor Cutting Lines (Helps trim photos evenly)
              </span>
            </label>
            <span className="text-[11px] text-emerald-700 font-semibold">Recommended</span>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedFile || isLoading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating 300 DPI Sheet ({progress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate 300 DPI Printable Photo Sheet</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Result State */
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
              <Printer className="w-4 h-4" />
              Ready for 300 DPI High-Res Print
            </span>
            <h3 className="text-2xl font-bold text-slate-800">
              {result.total_photos} Passport Photos Generated ({result.sheet_width_px} × {result.sheet_height_px} px)
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Tiled at 300 DPI with scissor guidelines. Fits 4"×6" photo cards or A4 sheets. Print at 100% scale for exact 3.5×4.5cm dimensions.
            </p>
          </div>

          {/* High-Res Sheet Preview */}
          {result.preview_base64 && (
            <div className="max-w-md mx-auto border border-slate-200 rounded-2xl p-2 bg-slate-50 shadow-inner">
              <img
                src={result.preview_base64}
                alt="Photo Sheet Preview"
                className="w-full h-auto rounded-xl shadow border border-slate-200"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                Preview ({result.image_size_kb} KB) • 300 DPI Sharpness Guaranteed
              </p>
            </div>
          )}

          {/* Download & Print Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {result.pdf_base64 && (
              <button
                onClick={handleDownloadPdf}
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                <span>Download Printable PDF</span>
              </button>
            )}

            <button
              onClick={handleDownloadImage}
              className="py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Download 300 DPI JPEG</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              <span>Print Now</span>
            </button>

            <button
              onClick={reset}
              className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
            >
              Create Another Sheet
            </button>
          </div>

          {/* Printing Guideline Tip */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-800 max-w-lg mx-auto text-left space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-amber-700" />
              Cyber Cafe / Studio Printer Setting Notice:
            </p>
            <p className="text-[11px] leading-relaxed text-amber-900/90">
              When printing on your Epson, Canon, or HP photo printer, set <strong>Scale to 100%</strong> (or "Actual Size"). Do NOT select "Fit to Page", otherwise photos may be slightly resized beyond 3.5×4.5cm.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% In-Memory RAM Processing • Candidate photos never saved to disk</span>
          </div>
        </div>
      )}
    </div>
  );
}
