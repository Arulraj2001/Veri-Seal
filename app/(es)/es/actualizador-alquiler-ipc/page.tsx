import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainAlquilerIpcEngine } from '@/components/international/SpainAlquilerIpcEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Actualizador de Alquiler IPC 2026 | Ley de Vivienda España',
  description:
    'Calcula la subida de tu alquiler en España en 2026 según el tope legal del 3% fijado por la Ley de Vivienda o el IPC. Conoce la nueva renta mensual exacta.',
  keywords: [
    'actualizador alquiler ipc 2026',
    'calcular subida alquiler ley vivienda tope 3',
    'cuanto puede subir el alquiler propietario',
    'simulador incremento renta alquiler espana',
    'carta notificacion subida alquiler',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/actualizador-alquiler-ipc`,
    languages: {
      'es-ES': `${SITE_URL}/es/actualizador-alquiler-ipc`,
      'es': `${SITE_URL}/es/actualizador-alquiler-ipc`,
      'x-default': `${SITE_URL}/es/actualizador-alquiler-ipc`,
    },
  },
  openGraph: {
    title: 'Actualizador de Alquiler IPC 2026 | Ley de Vivienda España',
    description:
      'Calcula la actualización anual de la renta de alquiler conforme a la Ley de Vivienda y el tope legal del 3%.',
    url: `${SITE_URL}/es/actualizador-alquiler-ipc`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainAlquilerIpcPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Actualizador de Alquiler e IPC España 2026',
    description:
      'Simulador de actualización de rentas de arrendamiento de vivienda conforme al artículo 46 del Real Decreto-ley 6/2022 y la Ley 12/2023 por el Derecho a la Vivienda.',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo España',
      url: SITE_URL,
    },
    serviceType: 'RentCalculator',
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
          <span className="text-slate-900 font-bold">Actualizador de Alquiler</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Ley 12/2023 por el Derecho a la Vivienda (Tope Anual 3%)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Actualizador de Alquiler e IPC 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Calcula cuánto sube el alquiler de tu vivienda habitual aplicando el tope legal máximo del 3%
            fijado por la legislación española o el porcentaje pactado en tu contrato.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Marco Legal Aplicable:</strong> Artículo 18 de la Ley de Arrendamientos Urbanos (LAU) y disposición final primera de la Ley 12/2023.
            </span>
          </div>
          <a
            href="https://www.ine.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Portal INE (Índices)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Normativa de Subida de Alquiler en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            En los contratos de arrendamiento de vivienda en España, la renta solo puede actualizarse una vez al año
            si figura en el contrato, con un tope legal máximo del 3% fijado por la Ley de Vivienda y notificación
            previa por escrito al inquilino.
          </p>
        </div>

        <SpainAlquilerIpcEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Eres inversor inmobiliario o propietario de varias viviendas?</h3>
            <p className="text-xs text-slate-400">
              Calcula la rentabilidad neta anual de tu alquiler descontando IBI, comunidad y seguros.
            </p>
          </div>
          <Link
            href="/es/simulador-rentabilidad-alquiler"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Simulador Rentabilidad Neta</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
