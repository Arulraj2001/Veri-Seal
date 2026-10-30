import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainFiniquitoEngine } from '@/components/international/SpainFiniquitoEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Finiquito y Despido 2026 España | Cálculo Exacto',
  description:
    'Calcula gratis tu indemnización por despido y finiquito en España según el Estatuto de los Trabajadores. Despido improcedente (33 días) y objetivo (20 días).',
  keywords: [
    'calculadora finiquito despido',
    'calcular indemnizacion despido improcedente',
    'despido objetivo 20 dias calcular',
    'finiquito baja voluntaria',
    'indemnizacion despido estatuto trabajadores',
    'calculo vacaciones no disfrutadas finiquito',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-finiquito-despido`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-finiquito-despido`,
      'es': `${SITE_URL}/es/calculadora-finiquito-despido`,
      'x-default': `${SITE_URL}/es/calculadora-finiquito-despido`,
    },
  },
  openGraph: {
    title: 'Calculadora de Finiquito y Despido 2026 España | Cálculo Exacto',
    description:
      'Simulador de finiquito e indemnización por despido en España: 20 días, 33 días y liquidación de vacaciones pendientes.',
    url: `${SITE_URL}/es/calculadora-finiquito-despido`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainFiniquitoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Finiquito y Despido España 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulador de indemnización por despido (Art. 53 y 56 del Estatuto de los Trabajadores) y liquidación de saldo y finiquito en España.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cuál es la diferencia entre finiquito e indemnización por despido?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El finiquito es la liquidación económica que corresponde a cualquier trabajador al finalizar su relación laboral, incluyendo los días trabajados en el mes, la parte proporcional de pagas extraordinarias y las vacaciones no disfrutadas. La indemnización es una compensación adicional que se abona únicamente cuando el despido es imputable a la empresa o a causas objetivas.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuántos días por año corresponden por despido en España?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Por despido objetivo corresponden 20 días de salario por año trabajado con un límite máximo de 12 mensualidades. Por despido improcedente corresponden 33 días por año trabajado con un tope de 24 mensualidades (para contratos firmados tras la reforma laboral de febrero de 2012). Por fin de contrato temporal corresponden 12 días por año.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Tributa la indemnización por despido en el IRPF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La indemnización legal obligatoria fijada por el Estatuto de los Trabajadores está totalmente exenta de IRPF hasta un límite de 180.000 euros. Cualquier importe acordado por encima del límite legal sí debe tributar como rendimiento del trabajo.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora de Finiquito y Despido</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de Finiquito e Indemnización por Despido
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Calcula el dinero exacto que te corresponde cobrar al terminar tu contrato: indemnización legal según la causa del despido,
            días devengados de vacaciones y pagas extras no disfrutadas.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Regla de Cálculo de Despido en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            La indemnización por despido se calcula multiplicando el salario diario bruto por los días de compensación por año
            (20 días en despido objetivo con tope de 12 mensualidades; 33 días en improcedente con tope de 24 mensualidades)
            más la liquidación de vacaciones pendientes.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainFiniquitoEngine />

        {/* Statutory Comparison Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tipos de Despido y Baremo Legal de Indemnización en España
            </h2>
            <p className="text-sm text-slate-600">
              Resumen de los tipos de cese y las cuantías fijadas en el Estatuto de los Trabajadores.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Causa de Extinción</th>
                  <th className="py-3 px-4 font-mono">Días por Año</th>
                  <th className="py-3 px-4 font-mono">Tope Máximo</th>
                  <th className="py-3 px-4">Derecho a Paro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Despido Improcedente</td>
                  <td className="py-3 px-4 font-bold text-orange-600">33 días / año</td>
                  <td className="py-3 px-4 font-bold">24 mensualidades</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Sí</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Despido Objetivo (Económico, organizativo)</td>
                  <td className="py-3 px-4 font-bold text-orange-600">20 días / año</td>
                  <td className="py-3 px-4 font-bold">12 mensualidades</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Sí</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Fin de Contrato Temporal</td>
                  <td className="py-3 px-4 font-bold text-orange-600">12 días / año</td>
                  <td className="py-3 px-4 font-bold">12 mensualidades</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Sí</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Despido Disciplinario Procedente</td>
                  <td className="py-3 px-4 text-slate-400">0 días</td>
                  <td className="py-3 px-4 text-slate-400">Sin indemnización</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Sí</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Baja Voluntaria (Dimisión)</td>
                  <td className="py-3 px-4 text-slate-400">0 días</td>
                  <td className="py-3 px-4 text-slate-400">Solo finiquito</td>
                  <td className="py-3 px-4 font-sans text-red-600 font-bold">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Buscas nuevo empleo o calculas una oferta salarial?</h3>
            <p className="text-xs text-slate-400">
              Simula el sueldo limpio mensual en 12 o 14 pagas con las retenciones de IRPF exactas de 2026.
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

