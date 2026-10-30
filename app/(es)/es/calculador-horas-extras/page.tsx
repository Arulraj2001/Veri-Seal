import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainHorasExtrasEngine } from '@/components/international/SpainHorasExtrasEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculador de Horas Extras 2026 España | Precio y Recargo',
  description:
    'Calcula cuánto te deben pagar por tus horas extras en España en 2026 según el Estatuto de los Trabajadores. Recargos diurnos (+75%), nocturnos y festivos (+100%).',
  keywords: [
    'calculador horas extras espana',
    'precio hora extra convenio estatuto trabajadores',
    'calcular horas nocturnas festivas nomina',
    'limite 80 horas extras anuales',
    'cuanto se cobra por hora extra',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculador-horas-extras`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculador-horas-extras`,
      'es': `${SITE_URL}/es/calculador-horas-extras`,
      'x-default': `${SITE_URL}/es/calculador-horas-extras`,
    },
  },
  openGraph: {
    title: 'Calculador de Horas Extras 2026 España | Precio y Recargo',
    description:
      'Calcula el precio de tus horas extraordinarias diurnas, festivas y nocturnas según el Estatuto de los Trabajadores.',
    url: `${SITE_URL}/es/calculador-horas-extras`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainHorasExtrasPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculador de Horas Extras España 2026',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Herramienta de cálculo del precio de horas extraordinarias ordinarias, festivas y nocturnas según el salario bruto y la jornada anual del convenio.',
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
          <span className="text-slate-900 font-bold">Calculador de Horas Extras</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Artículo 35 del Estatuto de los Trabajadores</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculador de Horas Extras y Recargos 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Calcula el importe que tu empresa debe abonarte en nómina por cada hora extraordinaria trabajada,
            diferenciando entre horas diurnas, nocturnas y festivas.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Referencia Legal Oficial:</strong> Real Decreto Legislativo 2/2015 del Estatuto de los Trabajadores y jurisprudencia del Tribunal Supremo.
            </span>
          </div>
          <a
            href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Consultar Art. 35 BOE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Regla de Retribución de Horas Extras en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            El valor de la hora extra no puede ser inferior al de la hora ordinaria. Se calcula dividiendo el salario bruto
            anual entre las horas anuales de convenio, aplicando habitualmente un recargo del 75% para diurnas y del 100%
            para festivas o nocturnas.
          </p>
        </div>

        <SpainHorasExtrasEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Quieres saber cómo afectarán estas horas a tu retención de IRPF?</h3>
            <p className="text-xs text-slate-400">
              Calcula tu salario neto definitivo mensual incorporando el bruto total anual de tu nómina.
            </p>
          </div>
          <Link
            href="/es/calculadora-sueldo-neto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora de Sueldo Neto</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
