import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainPlusvaliaEngine } from '@/components/international/SpainPlusvaliaEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora Plusvalía Municipal 2026 | IIVTNU Objetivo y Real',
  description:
    'Calcula la plusvalía municipal en España en 2026 según el Real Decreto-ley 26/2021. Compara el método objetivo y la plusvalía real y elige el importe menor.',
  keywords: [
    'calculadora plusvalia municipal 2026',
    'calcular iivtnu metodo objetivo real',
    'simulador plusvalia ayuntamiento madrid barcelona',
    'coeficientes plusvalia municipal 2026',
    'plusvalia municipal venta con perdidas exenta',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-plusvalia-municipal`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-plusvalia-municipal`,
      'es': `${SITE_URL}/es/calculadora-plusvalia-municipal`,
      'x-default': `${SITE_URL}/es/calculadora-plusvalia-municipal`,
    },
  },
  openGraph: {
    title: 'Calculadora Plusvalía Municipal 2026 | IIVTNU Objetivo y Real',
    description:
      'Calcula tu plusvalía municipal comparando el método real y objetivo tras la reforma del Tribunal Constitucional.',
    url: `${SITE_URL}/es/calculadora-plusvalia-municipal`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainPlusvaliaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Calculadora de Plusvalía Municipal IIVTNU España 2026',
    description:
      'Simulador del Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana con doble comparativa oficial conforme al Real Decreto-ley 26/2021.',
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
          <span className="text-slate-900 font-bold">Plusvalía Municipal</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Real Decreto-ley 26/2021 & Sentencia Tribunal Constitucional 182/2021</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de Plusvalía Municipal (IIVTNU) 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Compara al instante los dos métodos legales de cálculo (Método Objetivo vs Plusvalía Real) y averigua
            cuál te permite pagar menos impuestos a tu ayuntamiento o si estás exento por venta a pérdidas.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Normativa Tributaria Municipal Vigente:</strong> Coeficientes actualizados de la Ley de Haciendas Locales y exención automática por pérdidas patrimoniales.
            </span>
          </div>
          <a
            href="https://www.boe.es/buscar/act.php?id=BOE-A-2021-18276"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Consultar RD-ley 26/2021 BOE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Regla de Cálculo de la Plusvalía Municipal en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            La plusvalía municipal permite tributar por el método más favorable: el método objetivo (aplicando un coeficiente
            por años al valor catastral del suelo) o el método real (gravando la ganancia efectiva entre compra y venta).
            Si hubo pérdidas patrimoniales no se tributa.
          </p>
        </div>

        <SpainPlusvaliaEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes alquilado un inmueble y quieres actualizar la renta?</h3>
            <p className="text-xs text-slate-400">
              Aplica el tope legal del 3% fijado por la Ley de Vivienda o calcula la rentabilidad neta de tu alquiler.
            </p>
          </div>
          <Link
            href="/es/actualizador-alquiler-ipc"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Actualizador de Alquiler</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
