import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Globe2, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { KagazoLogo } from '@/components/ui/KagazoLogo';

export const metadata: Metadata = {
  title: 'Outils et Calculateurs Officiels France 2026 | Kagazo',
  description:
    'Suite complète de calculateurs statutaires conformes URSSAF et Code du travail : salaire brut en net 2026, charges auto-entrepreneur, indemnité rupture conventionnelle, frais de notaire, PTZ, TVA et outils administratifs.',
  alternates: {
    canonical: `${SITE_URL}/fr`,
    languages: {
      'fr-FR': `${SITE_URL}/fr`,
      'fr': `${SITE_URL}/fr`,
      'x-default': `${SITE_URL}/fr`,
    },
  },
  openGraph: {
    title: 'Outils et Calculateurs Officiels France 2026 | Kagazo',
    description:
      'Calculateurs de référence pour salariés, auto-entrepreneurs, emprunteurs et citoyens en France. Conformes aux barèmes officiels URSSAF, DGFiP et Code du travail.',
    url: `${SITE_URL}/fr`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FrenchHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-blue-500/20 selection:text-blue-950 font-sans">
      {/* Precision Editorial Header with Real Brand Logo */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/fr" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center p-1 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-105 transition-transform">
                <KagazoLogo className="w-7 h-7" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-black tracking-tight text-lg text-slate-950">
                    Kagazo
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-blue-600 text-white font-mono">
                    France
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block font-mono font-medium">
                  Portail Social, Fiscal &amp; Immobilier 2026
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
              href="/fr/calculateur-salaire-net-brut"
              className="hover:text-blue-600 transition-colors"
            >
              Brut en Net
            </Link>
            <Link
              href="/fr/simulateur-charges-urssaf"
              className="hover:text-blue-600 transition-colors"
            >
              Auto-Entrepreneur
            </Link>
            <Link
              href="/fr/calculateur-frais-de-notaire"
              className="hover:text-blue-600 transition-colors"
            >
              Frais de Notaire
            </Link>
            <Link
              href="/fr/calculateur-indemnite-rupture"
              className="hover:text-blue-600 transition-colors"
            >
              Rupture Conventionnelle
            </Link>
            <Link
              href="/fr/facture-auto-entrepreneur"
              className="hover:text-blue-600 transition-colors"
            >
              Facture PDF
            </Link>
            <Link
              href="/fr/validateur-siren-siret"
              className="hover:text-blue-600 transition-colors"
            >
              SIREN / SIRET
            </Link>
          </nav>

          {/* Language Switcher Badge */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Français</span>
            </div>
            <Link
              href="/es"
              className="hidden sm:inline-block text-[11px] font-mono text-slate-400 hover:text-slate-800 transition-colors"
            >
              ES
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
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-blue-700">
                1. Emploi &amp; Salaires
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/fr/calculateur-salaire-net-brut" className="hover:text-blue-600 transition-colors">
                    Calculateur Salaire Brut en Net 2026
                  </Link>
                </li>
                <li>
                  <Link href="/fr/simulateur-charges-urssaf" className="hover:text-blue-600 transition-colors">
                    Simulateur Charges URSSAF Auto-Entrepreneur
                  </Link>
                </li>
                <li>
                  <Link href="/fr/calculateur-indemnite-rupture" className="hover:text-blue-600 transition-colors">
                    Indemnité de Rupture Conventionnelle
                  </Link>
                </li>
                <li>
                  <Link href="/fr/simulateur-cout-embauche-employeur" className="hover:text-blue-600 transition-colors">
                    Coût Total Employeur &amp; Superbrut
                  </Link>
                </li>
                <li>
                  <Link href="/fr/calculateur-indemnite-fin-cdd" className="hover:text-blue-600 transition-colors">
                    Prime de Précarité Fin de CDD
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-blue-700">
                2. Immobilier &amp; Prêts
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/fr/calculateur-frais-de-notaire" className="hover:text-blue-600 transition-colors">
                    Calculateur Frais de Notaire 2026
                  </Link>
                </li>
                <li>
                  <Link href="/fr/simulateur-plus-value-immobiliere" className="hover:text-blue-600 transition-colors">
                    Simulateur Plus-Value Immobilière &amp; Abattements
                  </Link>
                </li>
                <li>
                  <Link href="/fr/simulateur-pret-immobilier-mensualite" className="hover:text-blue-600 transition-colors">
                    Simulateur Prêt Immobilier &amp; Assurance
                  </Link>
                </li>
                <li>
                  <Link href="/fr/simulateur-pret-taux-zero-ptz" className="hover:text-blue-600 transition-colors">
                    Simulateur Prêt à Taux Zéro (PTZ 2026)
                  </Link>
                </li>
                <li>
                  <Link href="/fr/calculateur-rendement-locatif" className="hover:text-blue-600 transition-colors">
                    Simulateur Rendement Locatif Brut &amp; Net
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-blue-700">
                3. Démarches &amp; Documents
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/fr/convertisseur-chiffre-en-lettre" className="hover:text-blue-600 transition-colors">
                    Chiffres en Lettres Officiel Chèque
                  </Link>
                </li>
                <li>
                  <Link href="/fr/facture-auto-entrepreneur" className="hover:text-blue-600 transition-colors">
                    Facture Auto-Entrepreneur PDF Gratuite
                  </Link>
                </li>
                <li>
                  <Link href="/fr/validateur-siren-siret" className="hover:text-blue-600 transition-colors">
                    Validateur Officiel SIREN / SIRET (Luhn)
                  </Link>
                </li>
                <li>
                  <Link href="/fr/photo-identite-passeport-ants" className="hover:text-blue-600 transition-colors">
                    Photo d&apos;Identité Biométrique ANTS 35×45mm
                  </Link>
                </li>
                <li>
                  <Link href="/fr/compresseur-pdf-france-travail" className="hover:text-blue-600 transition-colors">
                    Compresseur PDF France Travail &amp; CAF (&lt;2 Mo)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-blue-700">
                4. Utilitaires &amp; Entreprise
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/fr/calculateur-tva-francaise" className="hover:text-blue-600 transition-colors">
                    Calculateur TVA &amp; Clé Intracommunautaire
                  </Link>
                </li>
                <li>
                  <Link href="/fr/calculateur-heures-supplementaires" className="hover:text-blue-600 transition-colors">
                    Calculateur Heures Supplémentaires (Loi TEPA)
                  </Link>
                </li>
                <li>
                  <Link href="/fr/calculateur-duree-travail-heures-decimales" className="hover:text-blue-600 transition-colors">
                    Convertisseur Heures Décimales / Centièmes
                  </Link>
                </li>
                <li>
                  <Link href="/fr/calculateur-remise-solde" className="hover:text-blue-600 transition-colors">
                    Calculateur de Soldes &amp; Remises en Cascade
                  </Link>
                </li>
                <li>
                  <Link href="/fr/simulateur-frais-kilometriques" className="hover:text-blue-600 transition-colors">
                    Barème Kilométrique Fiscal Officiel 2026
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* E-E-A-T & Statutory Standards Declaration */}
          <div className="border-t border-slate-200/80 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-700 border border-blue-200/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-[11px] text-slate-500 leading-snug">
                <p className="font-bold text-slate-900">
                  Calculs certifiés conformes aux barèmes officiels français 2026
                </p>
                <p>
                  Sources réglementaires : URSSAF, Code du travail, Code Général des Impôts (CGI), Service-Public.fr et Légifrance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[11px] font-medium text-slate-500">
              <Link href="/fr" className="hover:text-slate-900 transition-colors">
                Portail France
              </Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">
                Conditions Générales
              </Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                Politique de Confidentialité
              </Link>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 font-mono">
            &copy; {new Date().getFullYear()} Kagazo France. Tous droits réservés. Traitement 100% sécurisé et local en navigateur.
          </div>
        </div>
      </footer>
    </div>
  );
}
