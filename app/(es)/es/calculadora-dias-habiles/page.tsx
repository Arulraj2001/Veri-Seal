import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainDiasHabilesEngine } from '@/components/international/SpainDiasHabilesEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora Días Hábiles España 2026 | Plazos Ley 39/2015',
  description:
    'Calcula fechas límite en días hábiles administrativos en España según la Ley 39/2015. Excluye sábados, domingos y festivos nacionales oficiales.',
  keywords: [
    'calculadora dias habiles espana 2026',
    'calcular plazo administrativo ley 39 2015',
    'computo dias habiles sabados domingos festivos',
    'fecha limite contestar notificacion hacienda',
    'contar dias habiles y naturales',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-dias-habiles`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-dias-habiles`,
      'es': `${SITE_URL}/es/calculadora-dias-habiles`,
      'x-default': `${SITE_URL}/es/calculadora-dias-habiles`,
    },
  },
  openGraph: {
    title: 'Calculadora Días Hábiles España 2026 | Plazos Ley 39/2015',
    description:
      'Calcula la fecha exacta de vencimiento de cualquier plazo administrativo en España excluyendo fines de semana y festivos.',
    url: `${SITE_URL}/es/calculadora-dias-habiles`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainDiasHabilesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculadora de Días Hábiles y Plazos Administrativos España',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Calculador jurídico de plazos en días hábiles y naturales según las reglas de cómputo del artículo 30 de la Ley 39/2015 del Procedimiento Administrativo Común.',
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
          <span className="text-slate-900 font-bold">Calculadora Días Hábiles</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Artículo 30 de la Ley 39/2015 (LPACAP)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de Días Hábiles y Plazos Legales 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Determina con exactitud la fecha límite para responder a requerimientos de Hacienda, la Seguridad Social,
            multas de tráfico de la DGT o recursos judiciales en España.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Reglas de Cómputo BOE:</strong> El plazo inicia el día hábil siguiente a la notificación y se prorroga al primer día hábil si el último vence en inhábil.
            </span>
          </div>
          <a
            href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Consultar Ley 39/2015 BOE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Cómputo de Días Hábiles Administrativos en España
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Los plazos administrativos en España se computan a partir del día siguiente al de la notificación,
            excluyendo del cálculo los sábados, los domingos y los festivos declarados. Si el último día es inhábil,
            el plazo se prorroga al siguiente día hábil.
          </p>
        </div>

        <SpainDiasHabilesEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes que redactar o contar palabras de un recurso o informe?</h3>
            <p className="text-xs text-slate-400">
              Analiza en tiempo real caracteres, palabras, párrafos y tiempo estimado de lectura.
            </p>
          </div>
          <Link
            href="/es/contador-palabras-caracteres"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Contador de Palabras</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
