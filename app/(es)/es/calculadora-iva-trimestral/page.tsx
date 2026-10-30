import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainIvaTrimestralEngine } from '@/components/international/SpainIvaTrimestralEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora IVA Trimestral Modelo 303 España 2026 | Gratis',
  description:
    'Calcula gratis el resultado de tu declaración trimestral de IVA (Modelo 303) en España en 2026. Resta el IVA soportado del repercutido al 21%, 10% y 4%.',
  keywords: [
    'calculadora iva trimestral espana',
    'calcular modelo 303 iva autonomos pymes',
    'iva soportado repercutido calcular',
    'resultado a ingresar o compensar iva hacienda',
    'fechas presentacion modelo 303 2026',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-iva-trimestral`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-iva-trimestral`,
      'es': `${SITE_URL}/es/calculadora-iva-trimestral`,
      'x-default': `${SITE_URL}/es/calculadora-iva-trimestral`,
    },
  },
  openGraph: {
    title: 'Calculadora IVA Trimestral Modelo 303 España 2026 | Gratis',
    description:
      'Simulador de autoliquidación trimestral de IVA en España para autónomos y sociedades (Modelo 303).',
    url: `${SITE_URL}/es/calculadora-iva-trimestral`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainIvaTrimestralPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Calculadora de IVA Trimestral Modelo 303 España',
    description:
      'Simulador fiscal de autoliquidación del Impuesto sobre el Valor Añadido (Ley 37/1992 del IVA) para profesionales y pequeñas empresas en España.',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo España',
      url: SITE_URL,
    },
    serviceType: 'TaxCalculator',
    areaServed: 'ES',
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
          <span className="text-slate-900 font-bold">IVA Trimestral (Mod. 303)</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Ley 37/1992 del Impuesto sobre el Valor Añadido</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de IVA Trimestral (Modelo 303) 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Anticípate al resultado de tu liquidación trimestral de IVA con la Agencia Tributaria.
            Desglosa tus ventas y gastos por tipos impositivos (21%, 10% y 4%) y descubre si te sale a pagar o a compensar.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Validado conforme a la AEAT:</strong> Desglose según casillas oficiales del Modelo 303 de Autoliquidación del IVA de la Agencia Tributaria española.
            </span>
          </div>
          <a
            href="https://sede.agenciatributaria.gob.es/Sede/procedimientoini/G601.shtml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Trámite Modelo 303 AEAT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Cómo Funciona el Modelo 303 de IVA
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            El Modelo 303 es la autoliquidación trimestral donde se declara el IVA repercutido (cobrado en facturas a clientes)
            menos el IVA soportado (pagado a proveedores en gastos deducibles). Si la diferencia es positiva se ingresa a Hacienda;
            si es negativa se compensa en trimestres posteriores.
          </p>
        </div>

        <SpainIvaTrimestralEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes que emitir facturas con IVA e IRPF a tus clientes?</h3>
            <p className="text-xs text-slate-400">
              Genera facturas oficiales en PDF listas para imprimir o enviar sin necesidad de registro.
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
