import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NumberToWordsEngine } from '@/components/international/NumberToWordsEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Convertisseur Chiffre en Lettre en Ligne | Remplir un Chèque en Euros',
  description:
    'Convertissez n’importe quel montant en chiffres en toutes lettres pour rédiger vos chèques bancaires, devis et factures conformément aux règles de grammaire françaises.',
  keywords: [
    'convertisseur chiffre en lettre',
    'ecrire somme en lettre cheque',
    'montant en toutes lettres euros',
    'comment ecrire cent quatre-vingts cheque',
    'chiffre en lettre facture',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
    languages: HREFLANG_REGISTRY.french_numbers.locales,
  },
};

export default function NumberToWordsPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/fr" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Chiffres en Lettres</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Règles Grammaticales et Réforme Orthographique 1990</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Convertisseur de Chiffres en Lettres (Euros)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Générez l’orthographe exacte de vos sommes d’argent pour remplir vos chèques de banque, contrats de vente et factures professionnelles sans risque d’erreur.
          </p>
        </div>

        <NumberToWordsEngine />

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Règles d&apos;écriture d&apos;un chèque bancaire en France
          </h2>
          <p>
            Sur un chèque, la mention de la somme en toutes lettres prévaut légalement sur la mention en chiffres en cas de divergence (article L. 131-10 du Code monétaire et financier).
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Trait d&apos;union systématique :</strong> Depuis la réforme de 1990 de l&apos;Académie française, tous les éléments d&apos;un nombre composé sont reliés par un trait d&apos;union (ex. <em>trois-cent-quarante-deux</em>).
            </li>
            <li>
              <strong>Invariabilité de mille :</strong> Le mot <em>mille</em> ne prend jamais d&apos;« s ». En revanche, <em>cent</em> et <em>vingt</em> prennent un « s » s&apos;ils sont multipliés et qu&apos;aucun autre chiffre ne les suit (ex. <em>quatre-vingts</em>, mais <em>quatre-vingt-deux</em>).
            </li>
            <li>
              <strong>Centimes :</strong> Il est recommandé d&apos;écrire les centimes en toutes lettres ou sous forme fractionnée (ex. <em>et 50 centimes</em>).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

