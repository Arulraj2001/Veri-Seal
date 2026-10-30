import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainJubilacionEngine } from '@/components/international/SpainJubilacionEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Jubilación 2026 España | Cuánto Cobras',
  description:
    'Calcula gratis tu pensión de jubilación en España en 2026. Simula tu base reguladora, porcentaje según años cotizados y edad legal ordinaria en 14 pagas.',
  keywords: [
    'calculadora jubilacion espana 2026',
    'calcular pension jubilacion seguridad social',
    'cuanto cobro de jubilacion con 30 anos cotizados',
    'edad jubilacion 2026 requisitos',
    'base reguladora pension 25 anos',
    'simulador pension de jubilacion boe',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-jubilacion-pension`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-jubilacion-pension`,
      'es': `${SITE_URL}/es/calculadora-jubilacion-pension`,
      'x-default': `${SITE_URL}/es/calculadora-jubilacion-pension`,
    },
  },
  openGraph: {
    title: 'Calculadora de Jubilación 2026 España | Cuánto Cobras',
    description:
      'Calcula tu pensión de jubilación en España en 14 pagas según las bases de cotización y la escala legal de edad 2026.',
    url: `${SITE_URL}/es/calculadora-jubilacion-pension`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainJubilacionPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Calculadora de Pensión de Jubilación España 2026',
    description:
      'Simulador actuarial de cálculo de la pensión contributiva de jubilación de la Seguridad Social española según los últimos 25 años de cotización y la escala legal de 2026.',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo España',
      url: SITE_URL,
    },
    serviceType: 'PensionCalculator',
    areaServed: 'ES',
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
          <span className="text-slate-900 font-bold">Calculadora de Jubilación</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Ley 21/2021 de Garantía del Poder Adquisitivo de las Pensiones</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de Pensión de Jubilación 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Descubre cuánto cobrarás de pensión pública de la Seguridad Social al mes en 14 pagas.
            Cálculo exacto de tu base reguladora y comprobación de los requisitos de edad legal de retiro.
          </p>
        </div>

        {/* E-E-A-T Statutory Verification Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Validado conforme a la Seguridad Social:</strong> Período de cómputo de 300 bases (últimos 25 años) divisor 350 y escala de coeficientes 2026.
            </span>
          </div>
          <a
            href="https://www.seg-social.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Portal Oficial Seguridad Social</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule for Google AI Overviews */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Regla de Cálculo de la Jubilación en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            La pensión de jubilación resulta de aplicar a la base reguladora (promedio de los últimos 25 años de cotización)
            un porcentaje según los años cotizados: con 15 años se obtiene el 50%, aumentando progresivamente hasta el 100%
            a los 36 años y 6 meses.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainJubilacionEngine />

        {/* Deep Statutory Guidance Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Edad Legal de Jubilación y Años de Cotización en España
            </h2>
            <p className="text-sm text-slate-600">
              Evolución del calendario de la reforma de pensiones fijada en el Real Decreto Legislativo 8/2015.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Año de Jubilación</th>
                  <th className="py-3 px-4 font-mono">Cotización Requerida para Jubilarse a los 65</th>
                  <th className="py-3 px-4 font-mono">Edad si se Cotiza Menos Tiempo</th>
                  <th className="py-3 px-4 font-mono">Años para el 100% de la Base</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/80 transition-colors bg-orange-50/30">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">2026 (Año en Curso)</td>
                  <td className="py-3 px-4 font-bold text-orange-700">38 años y 3 meses o más</td>
                  <td className="py-3 px-4 font-bold text-slate-900">66 años y 8 meses</td>
                  <td className="py-3 px-4">36 años y 6 meses</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">2027 en adelante (Meta definitiva)</td>
                  <td className="py-3 px-4">38 años y 6 meses o más</td>
                  <td className="py-3 px-4">67 años cumplidos</td>
                  <td className="py-3 px-4">37 años cotizados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Trabajas por cuenta propia y quieres saber cuánto cotizas?</h3>
            <p className="text-xs text-slate-400">
              Calcula tus cuotas a la Seguridad Social según tus rendimientos reales con nuestro simulador de autónomos.
            </p>
          </div>
          <Link
            href="/es/calculadora-irpf-autonomos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora Autónomos 2026</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
