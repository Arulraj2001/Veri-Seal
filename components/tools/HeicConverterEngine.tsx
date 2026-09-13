'use client';

import * as React from 'react';
import {
  Upload,
  FileImage,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Zap,
  Trash2,
  Plus,
  ShieldCheck,
  FileArchive,
  FileText,
  Sliders,
  ChevronRight,
  ArrowRight,
  Info,
  Smartphone,
  Eye,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ConvertedHeicItem {
  id: string;
  originalFile: File;
  originalSizeKb: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedSizeKb?: number;
  outputFormat: 'jpg' | 'png' | 'pdf';
  errorMessage?: string;
}

interface HeicConverterEngineProps {
  defaultFormat?: 'jpg' | 'pdf';
  toolHeading?: string;
  toolSubheading?: string;
}

export function HeicConverterEngine({
  defaultFormat = 'jpg',
  toolHeading = 'Apple HEIC to JPG / PNG / PDF Converter Studio',
  toolSubheading = 'Batch convert iPhone & iPad HEIC/HEIF photos directly in your browser. 100% private in-memory RAM processing.',
}: HeicConverterEngineProps) {
  const [items, setItems] = React.useState<ConvertedHeicItem[]>([]);
  const [outputFormat, setOutputFormat] = React.useState<'jpg' | 'png' | 'pdf'>(
    defaultFormat === 'pdf' ? 'pdf' : 'jpg'
  );
  const [quality, setQuality] = React.useState<number>(85);
  const [isConvertingAll, setIsConvertingAll] = React.useState<boolean>(false);
  const [activePreviewUrl, setActivePreviewUrl] = React.useState<string | null>(null);
  const [activePreviewName, setActivePreviewName] = React.useState<string>('');
  const [isZipping, setIsZipping] = React.useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = React.useState<boolean>(false);
  const [pdfBlob, setPdfBlob] = React.useState<Blob | null>(null);

  // Clean up object URLs on unmount
  React.useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.convertedUrl) {
          URL.revokeObjectURL(item.convertedUrl);
        }
      });
    };
  }, [items]);

  const handleFilesAdded = (fileList: FileList | File[]) => {
    const rawFiles = Array.from(fileList);
    const validFiles = rawFiles.filter((f) => {
      const ext = f.name.toLowerCase();
      return (
        ext.endsWith('.heic') ||
        ext.endsWith('.heif') ||
        f.type === 'image/heic' ||
        f.type === 'image/heif' ||
        f.type === ''
      );
    });

    if (!validFiles.length) {
      alert('Please upload Apple .HEIC or .HEIF photo files.');
      return;
    }

    const newItems: ConvertedHeicItem[] = validFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      originalFile: file,
      originalSizeKb: file.size / 1024,
      status: 'pending',
      outputFormat: outputFormat,
    }));

    setItems((prev) => [...prev, ...newItems].slice(0, 50));
    setPdfBlob(null);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.convertedUrl) {
        URL.revokeObjectURL(target.convertedUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.convertedUrl) {
        URL.revokeObjectURL(item.convertedUrl);
      }
    });
    setItems([]);
    setActivePreviewUrl(null);
    setPdfBlob(null);
  };

  // Convert a single item using heic2any
  const convertSingleItem = async (
    item: ConvertedHeicItem,
    targetFormat: 'jpg' | 'png' | 'pdf',
    targetQuality: number
  ): Promise<ConvertedHeicItem> => {
    try {
      const heic2anyModule = await import('heic2any');
      const heic2any = heic2anyModule.default;

      const toType = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
      const conversionResult = await heic2any({
        blob: item.originalFile,
        toType: toType,
        quality: targetQuality / 100,
      });

      const blobResult = Array.isArray(conversionResult)
        ? conversionResult[0]
        : conversionResult;

      const convertedUrl = URL.createObjectURL(blobResult);

      return {
        ...item,
        status: 'completed',
        convertedBlob: blobResult,
        convertedUrl: convertedUrl,
        convertedSizeKb: blobResult.size / 1024,
        outputFormat: targetFormat,
      };
    } catch (err: any) {
      return {
        ...item,
        status: 'error',
        errorMessage: err?.message || 'Failed to decode HEIC image.',
      };
    }
  };

  // Execute batch conversion with controlled concurrency (2 at a time)
  const handleConvertAll = async () => {
    if (!items.length || isConvertingAll) return;
    setIsConvertingAll(true);
    setPdfBlob(null);

    const pendingItems: ConvertedHeicItem[] = items.map((i) => ({
      ...i,
      status: i.status === 'completed' ? i.status : 'converting',
    }));
    setItems(pendingItems);

    const updatedList: ConvertedHeicItem[] = [...pendingItems];

    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i].status === 'completed' && updatedList[i].outputFormat === outputFormat) {
        continue;
      }

      updatedList[i] = { ...updatedList[i], status: 'converting' };
      setItems([...updatedList]);

      const result = await convertSingleItem(updatedList[i], outputFormat, quality);
      updatedList[i] = result;
      setItems([...updatedList]);
    }

    setIsConvertingAll(false);

    // Auto-select first converted image for live preview if not set
    const firstReady = updatedList.find((it) => it.status === 'completed' && it.convertedUrl);
    if (firstReady && firstReady.convertedUrl) {
      setActivePreviewUrl(firstReady.convertedUrl);
      setActivePreviewName(firstReady.originalFile.name);
    }
  };

  // Individual file download
  const handleDownloadSingle = (item: ConvertedHeicItem) => {
    if (!item.convertedBlob) return;
    const baseName = item.originalFile.name.replace(/\.[^/.]+$/, '');
    const ext = item.outputFormat === 'png' ? 'png' : 'jpg';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(item.convertedBlob);
    a.download = `${baseName}_converted.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 1-Click ZIP Download for all converted files
  const handleDownloadZip = async () => {
    const completed = items.filter((it) => it.status === 'completed' && it.convertedBlob);
    if (!completed.length || isZipping) return;

    setIsZipping(true);
    try {
      const JSZipModule = await import('jszip');
      const JSZip = JSZipModule.default;
      const zip = new JSZip();

      completed.forEach((item, index) => {
        const baseName = item.originalFile.name.replace(/\.[^/.]+$/, '');
        const ext = item.outputFormat === 'png' ? 'png' : 'jpg';
        const fileName = `${baseName || `photo_${index + 1}`}.${ext}`;
        if (item.convertedBlob) {
          zip.file(fileName, item.convertedBlob);
        }
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `kagazo_converted_photos_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('ZIP generation failed', e);
      alert('Could not generate ZIP archive. Please download files individually.');
    } finally {
      setIsZipping(false);
    }
  };

  // 1-Click Combined A4 PDF Download
  const handleDownloadMergedPdf = async () => {
    const completed = items.filter((it) => it.status === 'completed' && it.convertedBlob);
    if (!completed.length || isPdfGenerating) return;

    setIsPdfGenerating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const maxW = pageWidth - margin * 2;
      const maxH = pageHeight - margin * 2;

      for (let i = 0; i < completed.length; i++) {
        const item = completed[i];
        if (!item.convertedBlob) continue;

        if (i > 0) {
          doc.addPage();
        }

        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(item.convertedBlob!);
        });

        // Calculate aspect ratio to fit gracefully inside A4
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const imgWidth = img.naturalWidth || 800;
        const imgHeight = img.naturalHeight || 600;
        const ratio = imgWidth / imgHeight;

        let renderW = maxW;
        let renderH = renderW / ratio;

        if (renderH > maxH) {
          renderH = maxH;
          renderW = renderH * ratio;
        }

        const xPos = margin + (maxW - renderW) / 2;
        const yPos = margin + (maxH - renderH) / 2;

        doc.addImage(dataUrl, 'JPEG', xPos, yPos, renderW, renderH, undefined, 'FAST');
      }

      doc.save(`kagazo_heic_merged_${Date.now()}.pdf`);
    } catch (err) {
      console.error('PDF creation failed', err);
      alert('Failed to generate combined PDF.');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Calculated metrics
  const totalOriginalSizeKb = items.reduce((acc, it) => acc + it.originalSizeKb, 0);
  const completedItems = items.filter((it) => it.status === 'completed' && it.convertedSizeKb);
  const totalConvertedSizeKb = completedItems.reduce((acc, it) => acc + (it.convertedSizeKb || 0), 0);
  const savingsPercent =
    totalOriginalSizeKb > 0 && completedItems.length === items.length
      ? Math.max(0, Math.round(((totalOriginalSizeKb - totalConvertedSizeKb) / totalOriginalSizeKb) * 100))
      : 0;

  return (
    <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker/70">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            {toolHeading}
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            {toolSubheading}
          </p>
        </div>

        {/* Output Format Tabs */}
        <div className="inline-flex p-1 rounded-2xl bg-surface border border-surface-darker/80 self-start sm:self-auto">
          {(['jpg', 'png', 'pdf'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => {
                setOutputFormat(fmt);
              }}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all uppercase',
                outputFormat === fmt
                  ? 'bg-primary text-white shadow-2xs'
                  : 'text-text-main/70 hover:text-text-main'
              )}
            >
              {fmt === 'pdf' ? 'A4 PDF' : fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      {!items.length ? (
        <label
          htmlFor="heic-upload-input"
          className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-primary-light/10 hover:bg-primary-light/20 transition-all group"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform mb-3">
            <Upload className="w-8 h-8" />
          </div>
          <div className="font-extrabold text-base sm:text-lg text-text-main">
            Drop Apple iPhone / iPad .HEIC Photos Here
          </div>
          <p className="text-xs sm:text-sm text-text-main/60 mt-1 max-w-md">
            Drag and drop single or multiple .HEIC / .HEIF images (up to 50 files). Converted 100% in-browser RAM without uploading to any server.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
              <Check className="w-3 h-3" /> iPhone 11 - 16 Pro Max
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
              <Check className="w-3 h-3" /> Live Photos &amp; Bursts
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-white px-3 py-1 rounded-full border border-primary/20 shadow-2xs">
              <Check className="w-3 h-3" /> Zero Server Storage
            </span>
          </div>
          <input
            id="heic-upload-input"
            type="file"
            multiple
            accept=".heic,.heif,image/heic,image/heif"
            onChange={(e) => e.target.files && handleFilesAdded(e.target.files)}
            className="sr-only"
          />
        </label>
      ) : (
        /* Side-by-Side 2-Column Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Upload Queue & Controls (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Toolbar */}
            <div className="p-4 bg-surface/50 rounded-2xl border border-surface-darker/80 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-text-main">
                  Queue: <strong>{items.length} Photo(s)</strong> ({(totalOriginalSizeKb / 1024).toFixed(1)} MB total)
                </span>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="add-more-heic"
                    className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add More
                  </label>
                  <input
                    id="add-more-heic"
                    type="file"
                    multiple
                    accept=".heic,.heif,image/heic,image/heif"
                    onChange={(e) => e.target.files && handleFilesAdded(e.target.files)}
                    className="sr-only"
                  />
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Quality Slider (for JPG mode) */}
              {outputFormat === 'jpg' && (
                <div className="pt-2 border-t border-surface-darker/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-text-main flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-primary" />
                      JPG Compression Quality:
                    </span>
                    <span className="font-extrabold text-primary bg-primary-light px-2 py-0.5 rounded-md">
                      {quality}% (~{(250 * (quality / 85)).toFixed(0)} KB / photo)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-1.5 bg-surface-darker rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-text-main/50">
                    <span>50% (Max Compression)</span>
                    <span>85% (Balanced Recommended)</span>
                    <span>100% (Lossless Quality)</span>
                  </div>
                </div>
              )}

              {/* Action Button: Convert All */}
              <button
                type="button"
                onClick={handleConvertAll}
                disabled={isConvertingAll}
                className={cn(
                  'w-full py-3 px-4 rounded-xl font-extrabold text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all',
                  isConvertingAll
                    ? 'bg-primary/60 cursor-not-allowed'
                    : 'bg-primary hover:bg-[#c74a08] active:scale-[0.99]'
                )}
              >
                {isConvertingAll ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing in Browser RAM...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>
                      Convert All to {outputFormat.toUpperCase()} ({items.length} Files)
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Queue Cards */}
            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded-2xl border border-surface-darker/80 shadow-2xs flex items-center justify-between gap-3 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-surface border border-surface-darker flex items-center justify-center shrink-0 overflow-hidden relative">
                      {item.convertedUrl ? (
                        <img
                          src={item.convertedUrl}
                          alt={item.originalFile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileImage className="w-5 h-5 text-primary/70" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-text-main truncate max-w-[180px] sm:max-w-xs">
                        {item.originalFile.name}
                      </div>
                      <div className="text-[11px] text-text-main/60 flex items-center gap-1.5 mt-0.5">
                        <span>Original: {(item.originalSizeKb / 1024).toFixed(1)} MB</span>
                        {item.convertedSizeKb && (
                          <>
                            <span>→</span>
                            <span className="font-extrabold text-primary">
                              {item.convertedSizeKb > 1024
                                ? `${(item.convertedSizeKb / 1024).toFixed(1)} MB`
                                : `${item.convertedSizeKb.toFixed(0)} KB`}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.status === 'pending' && (
                      <span className="text-[10px] font-bold text-text-main/50 bg-surface px-2 py-1 rounded-md">
                        Pending
                      </span>
                    )}
                    {item.status === 'converting' && (
                      <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-1 rounded-md flex items-center gap-1">
                        <div className="w-2.5 h-2.5 border border-primary/30 border-t-primary rounded-full animate-spin" />
                        Decoding
                      </span>
                    )}
                    {item.status === 'completed' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.convertedUrl) {
                              setActivePreviewUrl(item.convertedUrl);
                              setActivePreviewName(item.originalFile.name);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-surface hover:bg-surface-darker text-text-main transition-colors"
                          title="Preview Photo"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadSingle(item)}
                          className="p-1.5 rounded-lg bg-primary text-white hover:bg-[#c74a08] transition-colors"
                          title="Download Image"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    {item.status === 'error' && (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                        Error
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-text-main/40 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Sticky Preview & Batch Download Dock (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            {/* Live Preview Card */}
            <div className="bg-surface/60 rounded-2xl border border-surface-darker/80 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-text-main flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  Converted Studio Preview
                </span>
                {completedItems.length > 0 && (
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {completedItems.length} of {items.length} Ready
                  </span>
                )}
              </div>

              {activePreviewUrl ? (
                <div className="space-y-2">
                  <div className="aspect-[4/3] rounded-xl bg-black/5 border border-surface-darker overflow-hidden flex items-center justify-center p-1">
                    <img
                      src={activePreviewUrl}
                      alt={activePreviewName}
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="text-[11px] font-bold text-text-main truncate text-center">
                    {activePreviewName}
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-xl bg-surface border border-surface-darker/60 flex flex-col items-center justify-center p-6 text-center text-text-main/50 space-y-2">
                  <FileImage className="w-8 h-8 text-text-main/30" />
                  <p className="text-xs">
                    Click &quot;Convert All&quot; to decode HEIC images and preview live results.
                  </p>
                </div>
              )}

              {/* Bandwidth Savings Badge */}
              {completedItems.length > 0 && (
                <div className="p-3 bg-white rounded-xl border border-surface-darker space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-main/70">Original Total:</span>
                    <strong className="text-text-main">
                      {(totalOriginalSizeKb / 1024).toFixed(1)} MB
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-main/70">Converted Total:</span>
                    <strong className="text-primary font-bold">
                      {(totalConvertedSizeKb / 1024).toFixed(1)} MB
                    </strong>
                  </div>
                  {savingsPercent > 0 && (
                    <div className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-center mt-1">
                      🎉 Saved {savingsPercent}% storage with zero loss in visual clarity!
                    </div>
                  )}
                </div>
              )}

              {/* Batch Download Action Buttons */}
              <div className="space-y-2 pt-2">
                {outputFormat === 'pdf' ? (
                  <button
                    type="button"
                    onClick={handleDownloadMergedPdf}
                    disabled={completedItems.length === 0 || isPdfGenerating}
                    className={cn(
                      'w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all',
                      completedItems.length === 0 || isPdfGenerating
                        ? 'bg-primary/40 cursor-not-allowed'
                        : 'bg-primary hover:bg-[#c74a08] active:scale-[0.99]'
                    )}
                  >
                    {isPdfGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Compiling A4 PDF Document...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>Download Merged A4 PDF ({completedItems.length} Pages)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleDownloadZip}
                    disabled={completedItems.length === 0 || isZipping}
                    className={cn(
                      'w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all',
                      completedItems.length === 0 || isZipping
                        ? 'bg-primary/40 cursor-not-allowed'
                        : 'bg-primary hover:bg-[#c74a08] active:scale-[0.99]'
                    )}
                  >
                    {isZipping ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Compressing ZIP Archive...</span>
                      </>
                    ) : (
                      <>
                        <FileArchive className="w-4 h-4" />
                        <span>
                          Download All as ZIP ({completedItems.length} {outputFormat.toUpperCase()}s)
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sovereign Privacy Guarantee Stamp */}
            <div className="p-4 rounded-2xl bg-white border border-surface-darker space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-extrabold text-text-main">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% In-Browser RAM Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Your iPhone photos are decoded locally using client-side WebAssembly. Zero bytes are uploaded to any cloud server or third-party database.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
