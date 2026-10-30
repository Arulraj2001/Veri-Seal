import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Globe2, Calculator, ChevronDown, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { KagazoLogo } from '@/components/ui/KagazoLogo';

export const metadata: Metadata = {
  title: 'Herramientas y Calculadoras Oficiales España 2026 | Kagazo',
  description:
    'Suite completa de calculadoras laborales, fiscales, hipotecarias y de trámites en España: IRPF 2026, sueldo neto, finiquito, hipoteca Euríbor, ITP, foto DNI y facturas PDF.',
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      'es-ES': `${SITE_URL}/es`,
      'es': `${SITE_URL}/es`,
      'x-default': `${SITE_URL}/es`,
    },
  },
  openGraph: {
    title: 'Herramientas y Calculadoras Oficiales España 2026 | Kagazo',
    description:
      'Calculadoras oficiales de nómina, IRPF, hipotecas y utilidades administrativas para trabajadores, autónomos y ciudadanos en España.',
    url: `${SITE_URL}/es`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpanishHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-orange-500/20 selection:text-orange-950 font-sans">
      {/* Precision Editorial Header with Real Brand Logo */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/es" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center p-1 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:scale-105 transition-transform">
                <KagazoLogo className="w-7 h-7" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-black tracking-tight text-lg text-slate-950">
                    Kagazo
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-orange-600 text-white font-mono">
                    España
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block font-mono font-medium">
                  Portal Laboral, Fiscal e Hipotecario 2026
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 border-l border-slate-200 pl-4 transition-colors"
            >
              <span>&larr; Kagazo Global</span>
            </Link>
          </div>

          {/* Categorized Navigation Bar */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-700">
            <Link
              href="/es/calculadora-sueldo-neto"
              className="hover:text-orange-600 transition-colors"
            >
              Sueldo Neto
            </Link>
            <Link
              href="/es/calculadora-irpf-autonomos"
              className="hover:text-orange-600 transition-colors"
            >
              Autónomos
            </Link>
            <Link
              href="/es/calculadora-hipoteca-euribor"
              className="hover:text-orange-600 transition-colors"
            >
              Hipotecas
            </Link>
            <Link
              href="/es/calculadora-finiquito-despido"
              className="hover:text-orange-600 transition-colors"
            >
              Finiquito
            </Link>
            <Link
              href="/es/generador-factura-pdf"
              className="hover:text-orange-600 transition-colors"
            >
              Factura PDF
            </Link>
            <Link
              href="/es/validador-dni-nie-cif"
              className="hover:text-orange-600 transition-colors"
            >
              DNI/NIE
            </Link>
          </nav>

          {/* Language Switcher Badge */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Globe2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Español</span>
            </div>
            <Link
              href="/fr"
              className="hidden sm:inline-block text-[11px] font-mono text-slate-400 hover:text-slate-800 transition-colors"
            >
              FR
            </Link>
            <Link
              href="/de"
              className="hidden sm:inline-block text-[11px] font-mono text-slate-400 hover:text-slate-800 transition-colors"
            >
              DE
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Comprehensive Categorized Statutory Footer */}
      <footer className="border-t border-slate-200 bg-white py-14 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* 4 Category Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Category 1 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-orange-700">
                1. Laboral y Fiscal
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/es/calculadora-sueldo-neto" className="hover:text-orange-600 transition-colors">
                    Calculadora Sueldo Neto 2026
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-irpf-autonomos" className="hover:text-orange-600 transition-colors">
                    Calculadora IRPF Autónomos
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-finiquito-despido" className="hover:text-orange-600 transition-colors">
                    Calculadora de Finiquito y Despido
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-jubilacion-pension" className="hover:text-orange-600 transition-colors">
                    Calculadora de Jubilación y Pensión
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculador-horas-extras" className="hover:text-orange-600 transition-colors">
                    Calculador Horas Extras y Recargos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-orange-700">
                2. Inmobiliario e Hipotecas
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/es/calculadora-hipoteca-euribor" className="hover:text-orange-600 transition-colors">
                    Calculadora Hipoteca y Euríbor
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-itp-gastos-compraventa" className="hover:text-orange-600 transition-colors">
                    Gastos e ITP Compraventa Vivienda
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-plusvalia-municipal" className="hover:text-orange-600 transition-colors">
                    Calculadora Plusvalía Municipal (IIVTNU)
                  </Link>
                </li>
                <li>
                  <Link href="/es/actualizador-alquiler-ipc" className="hover:text-orange-600 transition-colors">
                    Actualizador Alquiler con IPC / IRA
                  </Link>
                </li>
                <li>
                  <Link href="/es/simulador-rentabilidad-alquiler" className="hover:text-orange-600 transition-colors">
                    Simulador Rentabilidad Alquiler Neta
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-orange-700">
                3. Trámites y Documentos
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/es/validador-dni-nie-cif" className="hover:text-orange-600 transition-colors">
                    Validador DNI, NIE y CIF
                  </Link>
                </li>
                <li>
                  <Link href="/es/generador-factura-pdf" className="hover:text-orange-600 transition-colors">
                    Generador Facturas PDF Gratis
                  </Link>
                </li>
                <li>
                  <Link href="/es/foto-carnet-dni-pasaporte" className="hover:text-orange-600 transition-colors">
                    Foto Carnet DNI y Pasaporte (32x26mm)
                  </Link>
                </li>
                <li>
                  <Link href="/es/validador-iban-espana" className="hover:text-orange-600 transition-colors">
                    Validador IBAN y Entidad Bancaria
                  </Link>
                </li>
                <li>
                  <Link href="/es/compresor-pdf-sede-electronica" className="hover:text-orange-600 transition-colors">
                    Compresor PDF Sede Electrónica (&lt;2MB)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-orange-700">
                4. Utilidades Diarias
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/es/calculadora-iva-trimestral" className="hover:text-orange-600 transition-colors">
                    Calculadora IVA Trimestral (Mod. 303)
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-precio-gasolina-viaje" className="hover:text-orange-600 transition-colors">
                    Calculadora Gasolina y Coste Trayecto
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-dias-habiles" className="hover:text-orange-600 transition-colors">
                    Calculadora Días Hábiles vs Naturales
                  </Link>
                </li>
                <li>
                  <Link href="/es/contador-palabras-caracteres" className="hover:text-orange-600 transition-colors">
                    Contador de Palabras y Caracteres
                  </Link>
                </li>
                <li>
                  <Link href="/es/calculadora-descuentos-rebajas" className="hover:text-orange-600 transition-colors">
                    Calculadora de Descuentos y Rebajas
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimers & E-E-A-T Authority Note */}
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-700 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="max-w-2xl leading-relaxed">
                <strong>Garantía de Privacidad y Normativa:</strong> Procesamiento 100% en memoria de tu navegador. Ningún dato salarial, catastral o bancario se almacena ni se transmite a servidores externos. Cálculos contrastados con el BOE, Ley 35/2006 del IRPF, Real Decreto-ley 13/2022 y resoluciones de la Agencia Tributaria 2026.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
              <Link href="/privacy" className="hover:underline">
                Privacidad
              </Link>
              <Link href="/terms" className="hover:underline">
                Aviso Legal
              </Link>
              <Link href="/cookies" className="hover:underline">
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-4">
            <div>
              &copy; {new Date().getFullYear()} Kagazo.in &middot; Herramientas Oficiales de Precisión para España.
            </div>
            <div>
              Revisado y actualizado con tablas de IRPF y Cotización 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
