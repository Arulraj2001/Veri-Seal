import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainWordCounterEngine } from '@/components/international/SpainWordCounterEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contador de Palabras y Caracteres Gratis | En Tiempo Real',
  description:
    'Cuenta gratis palabras, caracteres con y sin espacios, párrafos y tiempo de lectura de cualquier texto en español en tiempo real. Sin límites ni registro.',
  keywords: [
    'contador de palabras y caracteres online',
    'contar letras y espacios en un texto',
    'contador palabras redaccion informe tfg',
    'calcular tiempo de lectura texto',
    'analizador longitud texto gratis',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/contador-palabras-caracteres`,
    languages: {
      'es-ES': `${SITE_URL}/es/contador-palabras-caracteres`,
      'es': `${SITE_URL}/es/contador-palabras-caracteres`,
      'x-default': `${SITE_URL}/es/contador-palabras-caracteres`,
    },
  },
  openGraph: {
    title: 'Contador de Palabras y Caracteres Gratis | En Tiempo Real',
    description:
      'Cuenta palabras, caracteres y tiempo de lectura en tiempo real con estadísticas detalladas.',
    url: `${SITE_URL}/es/contador-palabras-caracteres`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainWordCounterPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Contador de Palabras y Caracteres Online en Español',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Herramienta gratuita para análisis tipográfico y cuantitativo de textos en idioma español con cálculo instantáneo de palabras, caracteres y párrafos.',
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
          <span className="text-slate-900 font-bold">Contador de Palabras</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Análisis Tipográfico en Vivo sin Registro</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Contador de Palabras y Caracteres Online
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Analiza la extensión de tus textos, ensayos, recursos administrativos o publicaciones para redes sociales.
            Cálculo inmediato de palabras, caracteres (con y sin espacios), párrafos y tiempo medio de lectura.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Privacidad 100% en Cliente:</strong> Todo el análisis se realiza de forma local en la memoria de tu navegador. El texto introducido nunca viaja a ningún servidor ni se almacena.
            </span>
          </div>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Conteo de Caracteres y Palabras en Español
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            El contador procesa el texto en memoria separando las palabras mediante espacios y saltos de línea.
            Distingue entre caracteres totales y caracteres sin espacios, estimando el tiempo de lectura a una velocidad
            media de 200 palabras por minuto.
          </p>
        </div>

        <SpainWordCounterEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Estás comparando precios de compras o rebajas de temporada?</h3>
            <p className="text-xs text-slate-400">
              Calcula el precio final con descuento y el dinero exacto que ahorras en cada artículo.
            </p>
          </div>
          <Link
            href="/es/calculadora-descuentos-rebajas"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora de Descuentos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
