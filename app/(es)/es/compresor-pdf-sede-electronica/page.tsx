import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainPdfCompressorEngine } from '@/components/international/SpainPdfCompressorEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Compresor PDF Sede Electrónica Gratis (<2MB / <4MB) España',
  description:
    'Comprime gratis tus archivos PDF para subirlos a la Sede Electrónica, DGT, Seguridad Social o Hacienda sin que los rechacen por superar 2 MB o 4 MB.',
  keywords: [
    'comprimir pdf sede electronica 2mb',
    'reducir tamano pdf hacienda dgt seguridad social',
    'comprimir pdf online gratis sin registro espana',
    'bajar peso pdf menos de 4mb',
    'optimizar pdf registro electronico administracion',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/compresor-pdf-sede-electronica`,
    languages: {
      'es-ES': `${SITE_URL}/es/compresor-pdf-sede-electronica`,
      'es': `${SITE_URL}/es/compresor-pdf-sede-electronica`,
      'x-default': `${SITE_URL}/es/compresor-pdf-sede-electronica`,
    },
  },
  openGraph: {
    title: 'Compresor PDF Sede Electrónica Gratis (<2MB / <4MB) España',
    description:
      'Reduce el peso de tus archivos PDF para trámites en la administración pública española sin perder legibilidad.',
    url: `${SITE_URL}/es/compresor-pdf-sede-electronica`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainPdfCompressorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Compresor de PDF para la Sede Electrónica España',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Herramienta gratuita para comprimir documentos PDF y ajustarlos a los límites máximos permitidos en los registros telemáticos de la Administración Pública española.',
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Compresor PDF Sede Electrónica</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Ajustado a los Límites de los Registros Públicos Telemáticos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Compresor de PDF para Sede Electrónica (&lt;2MB / &lt;4MB)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Reduce el peso de tus documentos PDF para que la Sede de la Seguridad Social, la Agencia Tributaria
            o la DGT los acepte sin dar error de archivo demasiado grande. Procesamiento local sin almacenar tus datos.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Máxima Privacidad Ciudadana:</strong> Tu documento PDF se optimiza en la memoria local de tu navegador. Nunca se envía ni se almacena en ningún servidor.
            </span>
          </div>
          <a
            href="https://sede.administracion.gob.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Punto de Acceso General PAG</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Límites de Peso de Archivos en Trámites Públicos
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Los registros electrónicos de los ministerios y ayuntamientos en España rechazan adjuntos que superen
            entre 2 y 4 megabytes. Comprimir el PDF eliminando metadatos innecesarios y optimizando las imágenes integradas
            resuelve el rechazo sin perder nitidez.
          </p>
        </div>

        <SpainPdfCompressorEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes que enviar una factura comercial a la administración?</h3>
            <p className="text-xs text-slate-400">
              Genera tu factura electrónica o en formato PDF con desglose de IVA y retenciones legales.
            </p>
          </div>
          <Link
            href="/es/generador-factura-pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Generador Facturas PDF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
