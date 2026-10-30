import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainGasolinaEngine } from '@/components/international/SpainGasolinaEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora Gasolina y Coste de Viaje 2026 | Dividir Gastos',
  description:
    'Calcula gratis cuánto cuesta la gasolina de tu viaje en coche por km. Desglosa consumo a los 100 km, peajes y divide el coste exacto entre los pasajeros.',
  keywords: [
    'calculadora gasolina viaje coche espana',
    'calcular coste trayecto compartir coche',
    'gasto combustible por kilometro',
    'dividir gastos viaje gasolina peajes',
    'precio kilometraje empresa 0.26 euros hacienda',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
    languages: {
      'es-ES': `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
      'es': `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
      'x-default': `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
    },
  },
  openGraph: {
    title: 'Calculadora Gasolina y Coste de Viaje 2026 | Dividir Gastos',
    description:
      'Calcula el gasto total de combustible y peajes en carretera y divide el importe por pasajero de forma justa.',
    url: `${SITE_URL}/es/calculadora-precio-gasolina-viaje`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainGasolinaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculadora de Gasolina y Coste de Viaje en Coche',
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Calculadora de gasto en carburante y peajes por trayecto kilométrico para reparto equitativo de gastos de viaje y cálculo de dietas de kilometraje.',
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
          <span className="text-slate-900 font-bold">Coste Gasolina y Viaje</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <span>Reparto Equitativo de Gastos & Kilometraje DGT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculadora de Gasolina y Coste de Trayecto
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Calcula los litros de combustible consumidos y el coste total en euros de cualquier viaje por carretera.
            Añade peajes y divide el gasto de forma exacta entre todos los ocupantes del vehículo.
          </p>
        </div>

        {/* E-E-A-T Authority Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Referencia Oficial de Dietas de Kilometraje:</strong> Orden HFP/792/2023 del Ministerio de Hacienda que fija la exención tributaria en 0,26 € por km.
            </span>
          </div>
          <a
            href="https://geoportalgasolineras.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Geoportal Gasolineras MITECO</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 45-Word Answer Capsule */}
        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Fórmula de Cálculo del Coste de Viaje en Coche
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            El coste de combustible resulta de multiplicar los kilómetros recorridos por el consumo medio a los 100 km,
            dividir entre 100 y multiplicar por el precio del litro. Al total se suman los peajes y se divide entre
            el número de ocupantes.
          </p>
        </div>

        <SpainGasolinaEngine />

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">¿Tienes que calcular un plazo administrativo en días hábiles?</h3>
            <p className="text-xs text-slate-400">
              Comprueba fechas límite excluyendo sábados, domingos y festivos oficiales según la Ley 39/2015.
            </p>
          </div>
          <Link
            href="/es/calculadora-dias-habiles"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculadora Días Hábiles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
