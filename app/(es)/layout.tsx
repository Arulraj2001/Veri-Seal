import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Globe2, Calculator, FileCheck, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Herramientas Laborales y Fiscales Online | Kagazo España',
  description:
    'Calculadora de sueldo neto España 2026, IRPF autónomos, validador de DNI/NIE/CIF y generador de facturas PDF sin registro. Cálculos 100% exactos y privados en tu navegador.',
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      'es-ES': `${SITE_URL}/es`,
      'es': `${SITE_URL}/es`,
      'x-default': `${SITE_URL}/es`,
    },
  },
  openGraph: {
    title: 'Herramientas Laborales y Fiscales Online | Kagazo España',
    description:
      'Calculadoras oficiales de nómina, IRPF y utilidades administrativas para trabajadores y autónomos en España.',
    url: `${SITE_URL}/es`,
    locale: 'es_ES',
    siteName: 'Kagazo Herramientas',
    type: 'website',
  },
};

export default function SpanishHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-orange-500/20 selection:text-orange-950">
      {/* Precision Editorial Header (Swiss-Fintech Taste) */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/es" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="leading-tight">
              <span className="font-extrabold tracking-tight text-base block text-slate-900">
                Kagazo <span className="text-orange-600 font-semibold text-xs ml-1 px-1.5 py-0.5 rounded bg-orange-50 border border-orange-200/60">España</span>
              </span>
              <span className="text-[10px] text-slate-500 block -mt-0.5 font-mono">
                Laboral &amp; Fiscal 2026
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 border-l border-slate-200 pl-4 transition-colors"
          >
            <span>&larr; Kagazo Global</span>
          </Link>
        </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link
              href="/es/calculadora-sueldo-neto"
              className="hover:text-orange-600 transition-colors"
            >
              Calculadora Sueldo Neto
            </Link>
            <Link
              href="/es/validador-dni-nie-cif"
              className="hover:text-orange-600 transition-colors"
            >
              Validador DNI / NIE
            </Link>
            <Link
              href="/fr/calculateur-salaire-net-brut"
              className="text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-mono"
            >
              FR (France)
            </Link>
            <Link
              href="/de/brutto-netto-rechner"
              className="text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-mono"
            >
              DE (Deutschland)
            </Link>
          </nav>

          {/* Language Switcher Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Globe2 className="w-3.5 h-3.5 text-orange-600" />
            <span>Español (ES)</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Localized Statutory Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 text-sm">
                Kagazo Herramientas Laborales España
              </span>
              <p className="text-[11px] max-w-xl text-slate-500 leading-relaxed">
                Plataforma de cálculo independiente basada en la Ley 35/2006 del IRPF y normativa de la Seguridad Social 2026. Los cálculos son informativos y no constituyen asesoramiento tributario vinculante.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <Link href="/privacy" className="hover:underline">
                Privacidad y RGPD
              </Link>
              <Link href="/terms" className="hover:underline">
                Aviso Legal
              </Link>
              <Link href="/cookies" className="hover:underline">
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Kagazo.in &middot; Procesamiento local sin almacenamiento de nóminas.
            </div>
            <div className="font-mono text-[10px]">
              Actualizado conforme al IRPF y SMI 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

