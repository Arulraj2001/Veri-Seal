import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Präzisions-Rechner & Werkzeuge für Deutschland 2026 | Kagazo',
  description:
    'Kostenlose Rechner für Deutschland: Brutto-Netto-Rechner 2026 mit Steuerklassen 1 bis 6 und aktuellen Sozialabgaben.',
  alternates: {
    canonical: `${SITE_URL}/de`,
  },
};

export default function GermanHubPage() {
  const tools = [
    {
      title: 'Brutto-Netto-Rechner 2026',
      desc: 'Berechnen Sie exakt Ihr monatliches und jährliches Nettogehalt nach Abzug von Lohnsteuer, Solidaritätszuschlag und Sozialversicherungsbeiträgen (Kranken-, Renten- und Pflegeversicherung).',
      href: '/de/brutto-netto-rechner',
      tag: 'Top Tool',
      highlight: true,
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Aktualisiert nach Einkommensteuertarif 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Gehalts- und Steuer-Präzisionsrechner für Deutschland
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Kostenlose Werkzeuge mit direkter Ausführung im Browser. Keine Anmeldung, keine Speicherung Ihrer Gehaltsdaten und absolute DSGVO-Konformität.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group p-6 sm:p-8 rounded-3xl border border-amber-200 bg-white shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                    {t.tag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {t.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-600">
                <span>Zum Rechner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
