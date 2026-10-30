import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceFactureEngine } from '@/components/international/FranceFactureEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Facture Auto-Entrepreneur Gratuite PDF 2026 | Conforme CGI',
  description:
    'Créez et téléchargez gratuitement vos factures micro-entreprise en PDF en 2026. Mentions obligatoires art. 293 B du CGI, pénalités de retard et indemnité 40 €.',
  keywords: [
    'facture auto entrepreneur gratuit pdf',
    'modele facture micro entreprise gratuit',
    'faire une facture sans tva art 293 b',
    'generateur facture auto entrepreneur',
    'mentions obligatoires facture auto entrepreneur',
    'facture pdf pret a imprimer auto entrepreneur',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/facture-auto-entrepreneur`,
    languages: HREFLANG_REGISTRY.invoice_generator.locales,
  },
  openGraph: {
    title: 'Facture Auto-Entrepreneur Gratuite PDF 2026 | Conforme CGI',
    description:
      'Générez en ligne vos factures professionnelles pour auto-entrepreneur au format PDF. Conforme au Code de commerce et à l’art. 293 B du CGI.',
    url: `${SITE_URL}/fr/facture-auto-entrepreneur`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FranceFacturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Générateur de Factures Auto-Entrepreneur Gratuit PDF',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Outil gratuit d’édition et téléchargement de factures professionnelles pour micro-entreprises avec mention d’exonération de TVA (Art. 293 B du CGI) et clauses de recouvrement légales.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelles sont les mentions légales obligatoires sur une facture auto-entrepreneur ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Une facture conforme en France doit obligatoirement mentionner : le numéro chronologique unique, la date d’émission, votre identité suivie de la mention « EI » ou « Entrepreneur Individuel », votre numéro SIRET, les coordonnées du client, la désignation des prestations avec prix unitaire HT, la mention « TVA non applicable, art. 293 B du CGI » (si vous bénéficiez de la franchise en base), la date d’échéance, les pénalités de retard et l’indemnité forfaitaire de 40 €.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi la mention « EI » est-elle devenue obligatoire ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depuis la loi du 14 février 2022 en faveur de l’activité professionnelle indépendante, la dénomination « EI » ou « Entrepreneur Individuel » doit obligatoirement figurer avant ou après le nom commercial sur tous les documents contractuels et factures pour délimiter le patrimoine professionnel insaisissable.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium print:hidden">
          <Link href="/fr" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Facture Auto-Entrepreneur PDF</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Conforme Code de Commerce & Art. 293 B du CGI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Générateur de Facture Auto-Entrepreneur PDF
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Créez vos factures micro-entreprise conformes à la réglementation française sans inscription ni abonnement.
            Génération instantanée au format A4 prêt à imprimer ou enregistrer en PDF.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-blue-50/60 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5 print:hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Normes Facturation Micro-Entreprise
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            La facture d’auto-entrepreneur exige un numéro chronologique séquentiel, le SIRET, la mention « EI »,
            l’indication obligatoire « TVA non applicable, art. 293 B du CGI », la date d'échéance, les pénalités
            de retard et l’indemnité forfaitaire de 40 euros pour frais de recouvrement.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceFactureEngine />

        {/* AdSense Placement Slot 1 */}
        <div className="w-full border border-dashed border-slate-200 bg-slate-50/40 rounded-2xl py-8 text-center print:hidden">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Emplacement Publicitaire
          </span>
        </div>

        {/* Mandatory Legal Clauses Guide */}
        <div className="space-y-6 pt-6 border-t border-slate-200 print:hidden">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Les Mentions Légales Indispensables en France
            </h2>
            <p className="text-sm text-slate-600">
              Vérifiez la conformité stricte de vos factures pour éviter l'amende de 15 € par mention manquante (art. 1737 II du CGI).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">1. Mention EI & SIRET</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Votre nom et prénom doivent impérativement être complétés par « EI » ou « Entrepreneur Individuel » sur tous les documents. Le numéro SIRET à 14 chiffres délivré par l'INSEE est obligatoire.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">2. Exonération TVA 293 B</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tant que vous êtes sous le seuil de franchise en base de TVA, la phrase exacte « TVA non applicable, art. 293 B du CGI » doit apparaître au bas de la facture, sans aucune ligne de TVA ajoutée.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">3. Clause 40 € & Retard</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pour toute facture adressée à un professionnel, le taux des pénalités de retard et l’indemnité forfaitaire de 40 € pour frais de recouvrement (art. D.441-5 du Code de commerce) sont d'ordre public.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Besoin d'écrire un chèque ou montant officiel en toutes lettres ?</h3>
            <p className="text-xs text-slate-400">
              Convertissez n'importe quel chiffre en lettres selon les règles orthographiques officielles de l'Académie française.
            </p>
          </div>
          <Link
            href="/fr/convertisseur-chiffre-en-lettre"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Convertisseur Chiffre en Lettre</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
