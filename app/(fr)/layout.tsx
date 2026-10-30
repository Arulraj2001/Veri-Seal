import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Outils et Calculateurs Salariaux en Ligne | Kagazo France',
  description:
    'Calculateur de salaire brut en net 2026 France (cadre et non-cadre), convertisseur de chiffres en lettres pour chèques et factures. Outils précis conformes URSSAF.',
  alternates: {
    canonical: `${SITE_URL}/fr`,
    languages: {
      'fr-FR': `${SITE_URL}/fr`,
      'fr': `${SITE_URL}/fr`,
      'x-default': `${SITE_URL}/fr`,
    },
  },
};

export default function FrenchHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-blue-500/20 selection:text-blue-950">
      {/* Editorial Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/fr" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="leading-tight">
              <span className="font-extrabold tracking-tight text-base block text-slate-900">
                Kagazo <span className="text-blue-600 font-semibold text-xs ml-1 px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200/60">France</span>
              </span>
              <span className="text-[10px] text-slate-500 block -mt-0.5 font-mono">
                Social &amp; Fiscal 2026
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link
              href="/fr/calculateur-salaire-net-brut"
              className="hover:text-blue-600 transition-colors"
            >
              Salaire Brut en Net
            </Link>
            <Link
              href="/fr/convertisseur-chiffre-en-lettre"
              className="hover:text-blue-600 transition-colors"
            >
              Chiffres en Lettres
            </Link>
            <Link
              href="/es/calculadora-sueldo-neto"
              className="text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-mono"
            >
              ES (España)
            </Link>
            <Link
              href="/de/brutto-netto-rechner"
              className="text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-mono"
            >
              DE (Deutschland)
            </Link>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Français (FR)</span>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 text-sm">
                Kagazo Outils Précision France
              </span>
              <p className="text-[11px] max-w-xl text-slate-500 leading-relaxed">
                Calculs informatifs basés sur les barèmes officiels URSSAF et DGFiP 2026. Ne remplace pas une fiche de paie établie par un expert-comptable certifié.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <Link href="/privacy" className="hover:underline">
                Confidentialité &amp; RGPD
              </Link>
              <Link href="/terms" className="hover:underline">
                Mentions Légales
              </Link>
              <Link href="/cookies" className="hover:underline">
                Gestion des Cookies
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>&copy; {new Date().getFullYear()} Kagazo.in &middot; Traitement local sécurisé.</div>
            <div className="font-mono text-[10px]">Barème URSSAF 2026</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
