import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainHipotecaEngine } from '@/components/international/SpainHipotecaEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Hipotecas 2026 España | Cuota y Euríbor',
  description:
    'Calcula la cuota mensual de tu hipoteca en España en 2026 a tipo fijo o variable con el Euríbor actual. Cuadro de amortización francés y desglose de intereses.',
  keywords: [
    'calculadora hipoteca espana',
    'simulador hipoteca euribor 2026',
    'calcular cuota hipoteca tipo fijo',
    'simulador hipotecario banco espana',
    'cuanto pago de hipoteca por 200000 euros',
    'cuadro amortizacion frances hipoteca',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-hipoteca-euribor`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-hipoteca-euribor`,
      'es': `${SITE_URL}/es/calculadora-hipoteca-euribor`,
      'x-default': `${SITE_URL}/es/calculadora-hipoteca-euribor`,
    },
  },
  openGraph: {
    title: 'Calculadora de Hipotecas 2026 España | Cuota y Euríbor',
    description:
      'Calcula tu cuota mensual hipotecaria fija o variable según el Euríbor actual y el sistema de amortización francés.',
    url: `${SITE_URL}/es/calculadora-hipoteca-euribor`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainHipotecaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Calculadora de Hipotecas España 2026',
    description:
      'Simulador hipotecario oficial basado en la Ley 5/2019 de crédito inmobiliario con cálculo exacto de cuota por sistema de amortización francés.',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo España',
      url: SITE_URL,
    },
    serviceType: 'MortgageCalculator',
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
          <span className="text-slate-900 font-bold">Calculadora de Hipotecas</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Ley 5/2019 Reguladora de los Contratos de Crédito Inmobiliario</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de Hipotecas y Euríbor 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Simula tu cuota mensual hipotecaria a tipo fijo o variable con el Euríbor actual.
            Conoce el coste total de intereses y el capital devuelto mediante el sistema de amortización francés.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Fórmula Financiera Oficial:</strong> Sistema de amortización constante francés conforme a las directrices de supervisión del Banco de España.
            </span>
          </div>
          <a
            href="https://www.bde.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Portal Banco de España</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Cálculo de Cuota Hipotecaria en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            La cuota mensual de una hipoteca en España se calcula mediante el sistema de amortización francés,
            donde las cuotas son constantes pagando más intereses al inicio. En hipotecas variables la cuota se revisa
            anualmente sumando el Euríbor y el diferencial pactado.
          </p>
        </div>

        <SpainHipotecaEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Vas a comprar vivienda y quieres calcular los impuestos?</h3>
            <p className="text-xs text-slate-400">
              Calcula el ITP de segunda mano o IVA de obra nueva según tu comunidad autónoma con nuestro simulador.
            </p>
          </div>
          <Link
            href="/es/calculadora-itp-gastos-compraventa"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora Gastos e ITP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
