import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Outils Salariaux et Fiscaux Gratuits en Ligne | Kagazo France',
  description:
    'Simulateurs salariaux conformes aux cotisations URSSAF 2026. Convertissez votre salaire brut en net et écrivez vos chiffres en toutes lettres pour factures et chèques.',
  alternates: {
    canonical: `${SITE_URL}/fr`,
  },
};

export default function FrenchHubPage() {
  const tools = [
    {
      title: 'Calculateur Salaire Brut en Net 2026',
      desc: 'Estimez avec précision votre salaire net mensuel et annuel après déduction des cotisations sociales (statut cadre ou non-cadre) et du prélèvement à la source (impôt sur le revenu).',
      href: '/fr/calculateur-salaire-net-brut',
      tag: 'Le plus utilisé',
      highlight: true,
    },
    {
      title: 'Convertisseur Chiffre en Lettre',
      desc: 'Convertissez instantanément vos montants en euros en toutes lettres pour remplir vos chèques bancaires, devis et factures conformément aux règles d’orthographe françaises.',
      href: '/fr/convertisseur-chiffre-en-lettre',
      tag: 'Conforme chèque',
      highlight: false,
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Mise à jour conforme barème URSSAF 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Outils de Précision Salariale et Administrative en France
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Calculateurs gratuits exécutés en mémoire locale sur votre appareil. Zéro inscription, zéro stockage de données et respect strict de la confidentialité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`group p-6 sm:p-8 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                t.highlight
                  ? 'bg-white border-blue-200 shadow-sm hover:shadow-md hover:border-blue-400'
                  : 'bg-white border-slate-200 shadow-2xs hover:shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                    {t.tag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {t.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
                <span>Accéder à l&apos;outil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

