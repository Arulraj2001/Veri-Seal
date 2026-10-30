import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainRentabilidadEngine } from '@/components/international/SpainRentabilidadEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulador Rentabilidad Alquiler 2026 | Cálculo Bruto y Neto',
  description:
    'Calcula la rentabilidad bruta y neta de tu inversión en vivienda de alquiler en España. Descuenta IBI, comunidad, seguros y reducción del 50% en IRPF.',
  keywords: [
    'simulador rentabilidad alquiler espana',
    'calcular rentabilidad neta piso alquiler',
    'formula rentabilidad bruta vivienda',
    'gastos deducibles irpf alquiler vivienda habitual',
    'rentabilidad inmobiliaria calcular roe',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
    languages: {
      'es-ES': `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
      'es': `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
      'x-default': `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
    },
  },
  openGraph: {
    title: 'Simulador Rentabilidad Alquiler 2026 | Cálculo Bruto y Neto',
    description:
      'Calcula la rentabilidad real de tu inversión inmobiliaria en España tras gastos operativos e impuestos.',
    url: `${SITE_URL}/es/simulador-rentabilidad-alquiler`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainRentabilidadPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Simulador de Rentabilidad de Alquiler Inmobiliario España',
    description:
      'Herramienta de análisis financiero para calcular el rendimiento bruto y neto de activos inmobiliarios destinados al arrendamiento.',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo España',
      url: SITE_URL,
    },
    serviceType: 'InvestmentCalculator',
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
          <span className="text-slate-900 font-bold">Rentabilidad de Alquiler</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Inversión Inmobiliaria & Tributación en IRPF (Art. 23.2 LIRPF)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Simulador de Rentabilidad de Alquiler 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Calcula la rentabilidad bruta y neta real de un piso o vivienda en alquiler.
            Desglosa la inversión inicial con impuestos (ITP o IVA) y resta los costes operativos recurrentes.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Fórmula Financiera y Tributaria:</strong> Rentabilidad sobre capital total invertido (ROE) y consideración de gastos fiscalmente deducibles en IRPF.
            </span>
          </div>
          <a
            href="https://sede.agenciatributaria.gob.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Manual Renta Agencia Tributaria</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Cómo Calcular la Rentabilidad Neta del Alquiler
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            La rentabilidad neta se obtiene restando de los ingresos anuales de alquiler todos los gastos fijos
            (IBI, comunidad, seguros y reparaciones) y dividiendo el beneficio resultante entre la inversión total
            (precio de compra más impuestos de transmisión y reforma).
          </p>
        </div>

        <SpainRentabilidadEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes que pagar la liquidación trimestral de IVA de tu actividad?</h3>
            <p className="text-xs text-slate-400">
              Simula el Modelo 303 restando el IVA soportado en tus compras y gastos deducibles.
            </p>
          </div>
          <Link
            href="/es/calculadora-iva-trimestral"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora IVA Trimestral</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
