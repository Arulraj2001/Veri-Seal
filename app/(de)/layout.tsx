import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Präzisions-Rechner & Werkzeuge Online | Kagazo Deutschland',
  description:
    'Brutto-Netto-Rechner 2026 Deutschland für alle Steuerklassen (1-6). Präzise Berechnung von Lohnsteuer und Sozialversicherung in Ihrem Browser.',
  alternates: {
    canonical: `${SITE_URL}/de`,
    languages: {
      'de-DE': `${SITE_URL}/de`,
      'de': `${SITE_URL}/de`,
      'x-default': `${SITE_URL}/de`,
    },
  },
};

export default function GermanHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-amber-500/20 selection:text-amber-950">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/de" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="leading-tight">
              <span className="font-extrabold tracking-tight text-base block text-slate-900">
                Kagazo <span className="text-amber-600 font-semibold text-xs ml-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/60">Deutschland</span>
              </span>
              <span className="text-[10px] text-slate-500 block -mt-0.5 font-mono">
                Gehalt &amp; Steuern 2026
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

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link
              href="/de/brutto-netto-rechner"
              className="hover:text-amber-600 transition-colors"
            >
              Brutto-Netto-Rechner
            </Link>
            <Link
              href="/es/calculadora-sueldo-neto"
              className="text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-mono"
            >
              ES (España)
            </Link>
            <Link
              href="/fr/calculateur-salaire-net-brut"
              className="text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-mono"
            >
              FR (France)
            </Link>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Globe2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Deutsch (DE)</span>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 text-sm">
                Kagazo Präzisionswerkzeuge Deutschland
              </span>
              <p className="text-[11px] max-w-xl text-slate-500 leading-relaxed">
                Berechnungsgrundlagen nach § 32a EStG und Sozialgesetzbuch 2026. Unverbindliche Orientierungshilfe ohne Gewähr.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <Link href="/privacy" className="hover:underline">
                Datenschutz (DSGVO)
              </Link>
              <Link href="/terms" className="hover:underline">
                Impressum
              </Link>
              <Link href="/cookies" className="hover:underline">
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>&copy; {new Date().getFullYear()} Kagazo.in &middot; Lokale Verarbeitung ohne Datenspeicherung.</div>
            <div className="font-mono text-[10px]">EStG Tarif 2026</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

