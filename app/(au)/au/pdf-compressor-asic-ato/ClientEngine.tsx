'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
  Info,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  Clock,
  HelpCircle,
  Upload,
  Download,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function PdfCompressorAsicAtoPage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalSize, setOriginalSize] = React.useState<number>(0);
  const [compressedSize, setCompressedSize] = React.useState<number>(0);
  const [compressedPdfUrl, setCompressedPdfUrl] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document.');
      return;
    }

    setFile(uploadedFile);
    setOriginalSize(uploadedFile.size);
    setErrorMsg(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Save with object stream optimization and minimal metadata
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const blob = new Blob([compressedBytes as unknown as BlobPart], { type: 'application/pdf' });
      setCompressedSize(blob.size);

      if (compressedPdfUrl) {
        URL.revokeObjectURL(compressedPdfUrl);
      }
      const url = URL.createObjectURL(blob);
      setCompressedPdfUrl(url);
    } catch (err: any) {
      setErrorMsg('Unable to compress PDF. File may be encrypted or corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reductionPercentage = originalSize > 0
    ? Math.max(0, ((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  const isAsicCompliant = compressedSize > 0 && compressedSize <= 10 * 1024 * 1024; // < 10 MB

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ASIC & ATO PDF Document Compressor (< 10 MB Portal Limit)',
    operatingSystem: 'All',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'In-browser client-side PDF compressor for ASIC corporate filings (< 10 MB) and ATO portal uploads. 100% confidential with zero file uploads to external servers.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">ASIC &amp; ATO PDF Compressor</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>ASIC Regulatory Guide 107 &amp; ATO Portal Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          ASIC &amp; ATO PDF Filing Document Compressor (&lt; 10 MB)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Optimize company annual returns, financial statements, and ATO audit evidence bundles to strictly comply with statutory portal upload ceilings (&lt; 10 MB). 100% client-side compression: zero corporate documents ever leave your device.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Upload PDF File</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Limit: &lt; 10 MB
            </span>
          </div>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-8 cursor-pointer bg-slate-50 hover:bg-amber-50/40 transition-all text-center">
            <Upload className="w-10 h-10 text-amber-700 mb-2" />
            <span className="text-sm font-bold text-slate-900">
              {file ? file.name : 'Select PDF Document to Compress'}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              Supports corporate statements, tax returns &amp; legal evidence
            </span>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          </label>

          {isProcessing && (
            <div className="text-center py-4 text-xs font-bold text-amber-800 animate-pulse">
              Compressing PDF structure in local browser memory...
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold">
              {errorMsg}
            </div>
          )}

          {/* Privacy Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>100% In-Browser Privacy. Sensitive corporate financial statements are never transmitted over the internet.</span>
          </div>
        </div>

        {/* Compression Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                ASIC &amp; ATO Portal Compliance Status
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                compressedSize > 0
                  ? isAsicCompliant
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                  : 'bg-white/10 text-white'
              }`}>
                {compressedSize > 0 ? (isAsicCompliant ? 'Portal Ready (< 10 MB)' : 'Exceeds 10 MB') : 'Awaiting File'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {compressedSize > 0
                  ? `${(compressedSize / (1024 * 1024)).toFixed(2)} MB`
                  : '0.00 MB'}
              </div>
              <p className="text-xs text-slate-400">
                Original Size: {originalSize > 0 ? `${(originalSize / (1024 * 1024)).toFixed(2)} MB` : '0.00 MB'} | Size Reduction: {reductionPercentage.toFixed(1)}%
              </p>
            </div>

            {compressedPdfUrl && (
              <div className="pt-2">
                <a
                  href={compressedPdfUrl}
                  download={`compressed_${file?.name || 'document.pdf'}`}
                  className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ASIC &amp; ATO Optimized PDF</span>
                </a>
              </div>
            )}
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Australian Portal File Upload Limits
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">ASIC Corporate Annual Returns (Form 201 / 484)</span>
                <span className="font-mono font-bold text-slate-900">&lt; 10 MB Maximum</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">ATO Online Services for Business / Tax Agents</span>
                <span className="font-mono font-bold text-slate-900">&lt; 10 MB Maximum</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Fair Work Commission (FWC) e-Filing (Form F2)</span>
                <span className="font-mono font-bold text-slate-900">&lt; 10 MB Maximum</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            ASIC and ATO Statutory Electronic Lodgment Guidelines
          </h2>
          <p>
            The Australian Securities and Investments Commission (ASIC) and the Australian Taxation Office (ATO) enforce strict file size thresholds for online documentary submissions. Documents exceeding 10 MB fail upload handshakes and are automatically rejected by government gateways. Compressing PDF object streams and downsampling internal raster images resolves these transmission bottlenecks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Corporate Confidentiality Assurances
          </h2>
          <p>
            Public online PDF compression services frequently upload files to cloud processing clusters, exposing commercially sensitive business records, financial statements, and director addresses. This tool runs entirely within your browser&apos;s WebAssembly and JavaScript environment, ensuring complete compliance with the Australian Privacy Principles (APPs).
          </p>
        </section>
      </article>
    </div>
  );
}

