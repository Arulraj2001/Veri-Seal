import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainItpEngine } from '@/components/international/SpainItpEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora ITP y Gastos Compraventa 2026 | Vivienda España',
  description:
    'Calcula los gastos de notaría, registro e impuestos (ITP o IVA y AJD) al comprar una vivienda en España en 2026 por comunidad autónoma. Cálculo exacto.',
  keywords: [
    'calculadora itp espana 2026',
    'gastos compraventa vivienda segunda mano',
    'impuestos comprar casa madrid cataluna valencia',
    'cuanto se paga de notario y registro comprar piso',
    'iva obra nueva ajd calcular',
    'gastos escrituracion vivienda',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
      'es': `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
      'x-default': `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
    },
  },
  openGraph: {
    title: 'Calculadora ITP y Gastos Compraventa 2026 | Vivienda España',
    description:
      'Calcula al detalle los impuestos (ITP / IVA) y aranceles notariales y registrales al comprar casa en España.',
    url: `${SITE_URL}/es/calculadora-itp-gastos-compraventa`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainItpPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Calculadora de Gastos e Impuestos de Compraventa Inmobiliaria España 2026',
    description:
      'Simulador fiscal de cálculo del Impuesto de Transmisiones Patrimoniales (ITP), Actos Jurídicos Documentados (AJD) y aranceles oficiales de notaría y registro por comunidades autónomas.',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo España',
      url: SITE_URL,
    },
    serviceType: 'PropertyTaxCalculator',
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
          <span className="text-slate-900 font-bold">Gastos e ITP Compraventa</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Ley del ITP y AJD & Aranceles Oficiales RD 1426/1989 y RD 1427/1989</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de Gastos e Impuestos Compraventa 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Descubre cuánto dinero exacto necesitas añadir al precio de la vivienda para pagar los impuestos
            autonómicos (ITP o IVA + AJD), la notaría, el registro de la propiedad y la gestoría.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Tipos Impositivos Oficiales 2026:</strong> Tablas vigentes de las 17 Comunidades Autónomas de España (de 4% en País Vasco hasta 10% en Cataluña y C. Valenciana).
            </span>
          </div>
          <a
            href="https://sede.agenciatributaria.gob.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Sede Agencia Tributaria</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Resumen de Gastos al Comprar Casa en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Al comprar una vivienda en España debes prever entre un 10% y un 12% sobre el precio escriturado:
            el ITP (entre 6% y 10% en vivienda usada) o el 10% de IVA en obra nueva, más aranceles de notaría,
            registro y gestoría.
          </p>
        </div>

        <SpainItpEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Necesitas financiar la compraventa con un préstamo bancario?</h3>
            <p className="text-xs text-slate-400">
              Calcula la cuota mensual fija o variable con el Euríbor actual y el coste total de intereses.
            </p>
          </div>
          <Link
            href="/es/calculadora-hipoteca-euribor"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora de Hipotecas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
