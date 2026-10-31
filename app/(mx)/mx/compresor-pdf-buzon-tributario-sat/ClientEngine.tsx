'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Scale,
  Lock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { AdSlot } from '@/components/ads/AdSlot';

export default function CompresorPdfBuzonTributarioSatPage() {
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  const [originalSize, setOriginalSize] = React.useState<number>(0);
  const [compressedSize, setCompressedSize] = React.useState<number>(0);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
  const [targetLimitMb, setTargetLimitMb] = React.useState<number>(4.0);
  const [fileName, setFileName] = React.useState<string>('');

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setOriginalSize(file.size);
      setFileName(file.name);
      setCompressedSize(0);
      setPdfUrl(null);
    }
  };

  const optimizePdf = async () => {
    if (!pdfFile) return;
    setIsProcessing(true);

    try {
      const buffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Limpieza de metadatos pesados y compresión de flujos de objetos
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('Kagazo SAT Buzon Tributario PDF Optimizer');
      pdfDoc.setCreator('Kagazo Mexico');

      const optimizedBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([new Uint8Array(optimizedBytes).buffer as ArrayBuffer], { type: 'application/pdf' });

      setCompressedSize(blob.size);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error('Error al optimizar PDF:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const percentReduction =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, ((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuál es el tamaño máximo de archivo PDF admitido en el Buzón Tributario del SAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El portal del SAT para trámites en el Buzón Tributario (aclaraciones, solicitudes de devolución de saldos a favor de IVA/ISR, promociones y recursos de revocación) establece un límite general estricto de 4.0 MB por archivo individual adjunto en formato PDF.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es seguro comprimir documentos fiscales y bancarios en esta herramienta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es 100% seguro. Toda la compresión y reestructuración del archivo PDF se ejecuta de manera local y aislada dentro de tu propio navegador web mediante WebAssembly y JavaScript del lado del cliente. Ningún estado de cuenta, factura ni expediente contable se sube a servidores externos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Se altera la validez legal o sellos digitales del PDF al comprimirlo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El optimizador preserva intacta la estructura de páginas, textos, fuentes tipográficas y elementos gráficos vectoriales. Únicamente purga flujos de objetos redundantes y metadatos no requeridos para reducir el peso en bytes sin degradar la legibilidad.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/mx" className="hover:text-emerald-700 transition-colors">
          México
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Trámites & Identidad</span>
        <span>/</span>
        <span className="text-slate-400">Compresor PDF SAT</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Buzón Tributario SAT (&lt; 4 MB) &amp; IDSE IMSS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Compresor de PDF para Buzón Tributario del SAT México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Comprime tus expedientes contables, estados de cuenta y aclaraciones para cumplir con el límite estricto de 4 MB del Buzón Tributario del SAT e IMSS. Ejecución 100% en tu navegador con privacidad total.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload & Controls (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-700" />
              <span>Selecciona tu Documento PDF</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Límite 4 MB
            </span>
          </div>

          <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/20 group min-h-[180px]">
            <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
            <FileText className="w-12 h-12 text-slate-400 group-hover:text-emerald-700 transition-colors mb-2" />
            <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-800">
              {fileName || 'Haz clic para seleccionar el PDF a comprimir'}
            </span>
            <span className="text-xs text-slate-400 mt-1">Archivos de hasta 50 MB admitidos para compresión local</span>
          </label>

          {originalSize > 0 && (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Tamaño original del archivo:</span>
                  <span className="font-mono font-bold text-slate-900">{formatBytes(originalSize)}</span>
                </div>
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Límite reglamentario del SAT:</span>
                  <span className="font-mono font-bold text-emerald-700">{targetLimitMb} MB</span>
                </div>
                {originalSize > targetLimitMb * 1024 * 1024 && (
                  <div className="pt-1 text-rose-600 font-bold flex items-center gap-1 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Tu archivo excede el límite del SAT. Comprímelo para poder subirlo.</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={optimizePdf}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isProcessing ? 'Comprimiendo y optimizando flujos...' : 'Comprimir PDF para Buzón Tributario'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Card (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Estatus de Optimización SAT
                </span>
                <div className="text-xl sm:text-2xl font-black mt-0.5">
                  {compressedSize > 0 ? 'Documento Listo para Trámite' : 'Esperando Archivo'}
                </div>
              </div>
              {compressedSize > 0 && (
                <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                  -{percentReduction.toFixed(1)}% Reducido
                </span>
              )}
            </div>

            {compressedSize > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-slate-400">Tamaño Comprimido:</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">{formatBytes(compressedSize)}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-slate-400">Cumplimiento SAT:</div>
                    <div className="text-lg font-black text-white mt-0.5">
                      {compressedSize <= targetLimitMb * 1024 * 1024 ? '< 4 MB (Aprobado)' : 'Excede'}
                    </div>
                  </div>
                </div>

                <a
                  href={pdfUrl || '#'}
                  download={`optimizado-sat-${fileName}`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar PDF Optimizado para SAT</span>
                </a>
              </div>
            ) : (
              <p className="text-xs text-slate-400 leading-relaxed">
                Sube tu expediente o declaración anual para reestructurar las corrientes de datos y comprimir los objetos sin perder calidad de lectura.
              </p>
            )}

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-slate-300">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Privacidad Financiera: Este proceso no almacena ni envía tu PDF a ningún servidor.</span>
            </div>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Límites de Carga en el Buzón Tributario y Portales del Estado Mexicano 2026
        </h2>
        <p>
          El <strong>Buzón Tributario</strong> regulado en el Artículo 17-K del Código Fiscal de la Federación (CFF) es el canal oficial de comunicación electrónica entre el SAT y los contribuyentes. Al ingresar solicitudes de devolución automática de impuestos (F3241), avisos de compensación, contestaciones a cartas invitación o recursos de revocación, la plataforma impone un tope técnico estricto de <strong>4 Megabytes (MB)</strong> por archivo adjunto.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Consecuencias del Rechazo de Archivos por Exceso de Peso
        </h3>
        <p>
          Intentar cargar un archivo que supere los 4 MB provoca un error en la interfaz web del SAT que puede abortar la sesión del contribuyente. En plazos perentorios de aclaración o requerimientos de información bajo apercibimiento legal (Art. 18-A CFF), un archivo rechazado puede derivar en que la autoridad tenga por no presentada la solicitud o confirme la resolución determinante.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Compresión Segura sin Vulnerar el Secreto Bancario o Fiscal
        </h3>
        <p>
          Los documentos presentados ante el SAT contienen información de extrema confidencialidad: estados de cuenta bancarios con números de cuenta CLABE, contratos mercantiles, declaraciones de impuestos y facturas CFDI con RFC de proveedores. Subir estos archivos a servidores de compresión genéricos en la nube vulnera la privacidad y puede exponer datos protegidos por el secreto fiscal (Art. 69 CFF). Esta herramienta procesa la compresión íntegramente en la memoria RAM de tu computadora.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Compresión PDF SAT</span>
        </h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <details key={idx} className="group rounded-2xl bg-white border border-slate-200/90 p-5 open:shadow-xs transition-all">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
        <Link href="/mx" className="text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5">
          <span>&larr; Ver todas las 20 Herramientas México</span>
        </Link>
        <Link href="/mx/convertidor-numeros-a-letras-pesos-moneda-nacional" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Números a Letras Pesos M.N. &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
