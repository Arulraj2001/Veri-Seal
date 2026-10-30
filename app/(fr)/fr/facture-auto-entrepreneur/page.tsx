import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceFactureEngine } from '@/components/international/FranceFactureEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, FileText, CheckCircle2, AlertTriangle, Scale, Printer } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Facture Auto-Entrepreneur Gratuite PDF 2026 | Mentions Légales Obligatoires (Art. L. 441-9)',
  description:
    'Créez et téléchargez instantanément vos factures micro-entreprise conformes en PDF en 2026. Mentions obligatoires « EI », franchise TVA (art. 293 B du CGI), pénalités de retard et indemnité de 40 €. Sans inscription.',
  keywords: [
    'facture auto entrepreneur gratuit pdf 2026',
    'modele facture micro entreprise mention ei',
    'faire une facture sans tva article 293 b',
    'mentions obligatoires facture auto entrepreneur',
    'generateur facture pdf sans inscription gratuit',
    'indemnite forfaitaire recouvrement 40 euros facture',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/facture-auto-entrepreneur`,
    languages: HREFLANG_REGISTRY.invoice_generator.locales,
  },
  openGraph: {
    title: 'Facture Auto-Entrepreneur Gratuite PDF 2026 | Conforme CGI',
    description:
      'Générez en ligne vos factures professionnelles pour micro-entreprise au format PDF. Conforme au Code de commerce et à l’art. 293 B du CGI.',
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
        name: 'Générateur de Factures Auto-Entrepreneur Gratuit PDF 2026',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Outil gratuit de création de factures professionnelles conformes pour auto-entrepreneurs et micro-entreprises, avec export PDF immédiat.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${SITE_URL}/fr`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Facture Auto-Entrepreneur',
            item: `${SITE_URL}/fr/facture-auto-entrepreneur`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelles sont les mentions obligatoires sur une facture d’auto-entrepreneur en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Une facture d’auto-entrepreneur doit obligatoirement comporter : 1° Le nom et prénom du dirigeant suivi de la mention « Entrepreneur Individuel » ou « EI » ; 2° L’adresse de domiciliation et le numéro SIRET/SIREN ; 3° Le numéro unique séquentiel de facture et sa date d’émission ; 4° L’identité complète du client ; 5° Le détail des prestations/produits HT ; 6° La formule de franchise « TVA non applicable, art. 293 B du CGI » ; 7° La date d’échéance, le taux des pénalités de retard et l’indemnité forfaitaire de 40 € pour frais de recouvrement entre professionnels.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi la mention « EI » est-elle devenue obligatoire ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depuis la réforme du statut unique de l’entrepreneur individuel (décret n° 2022-725), la mention « EI » ou « Entrepreneur individuel » doit figurer immédiatement avant ou après le nom du professionnel sur tous les documents commerciaux, devis et factures, afin de distinguer formellement le patrimoine professionnel du patrimoine personnel protégé.',
            },
          },
          {
            '@type': 'Question',
            name: 'Puis-je facturer un particulier sans numéro SIREN ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour un client particulier (B2C), le numéro SIREN n’existe pas : indiquez simplement son nom complet et son adresse postale. Notez que la mention de l’indemnité forfaitaire de 40 € pour frais de recouvrement ne s’applique pas aux particuliers mais uniquement aux transactions B2B.',
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
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/fr" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Facture Auto-Entrepreneur</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Scale className="w-3.5 h-3.5" />
            <span>Conforme Art. L. 441-9 C. Com & Art. 293 B du CGI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Générateur de Facture Auto-Entrepreneur Gratuit (PDF 2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Éditez en quelques clics une facture professionnelle 100% conforme à la législation française. Intègre la mention obligatoire « EI », la franchise en base de TVA, les pénalités de retard et le téléchargement PDF prêt à imprimer ou à envoyer par e-mail.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceFactureEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règles légales de facturation en micro-entreprise</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Toute facture émise par un auto-entrepreneur doit comporter son <strong>nom suivi de la mention « EI »</strong>, son <strong>numéro SIRET</strong>, un <strong>numéro chrono sans trou</strong>, et la mention légale <strong>« TVA non applicable, art. 293 B du CGI »</strong> en cas de franchise. Entre professionnels, elle doit obligatoirement mentionner les <strong>pénalités de retard et l’indemnité forfaitaire de 40 €</strong>.
          </p>
        </div>

        {/* Worked Statutory Checklist Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Grille d’Audit des Mentions Obligatoires sur Facture en France (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Vérifiez la conformité légale de votre facture avant envoi pour éviter toute amende fiscale (jusqu’à 75 000 € d’amende par omission répétée).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Rubrique Obligatoire</th>
                  <th className="py-3 px-3">Texte Légal & Référence</th>
                  <th className="py-3 px-3">Exemple de Libellé Recommandé</th>
                  <th className="py-3 px-3">Sanction en Cas d’Omission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Statut Entrepreneur Individuel</td>
                  <td className="py-3 px-3">Décret n° 2022-725</td>
                  <td className="py-3 px-3 text-blue-700 font-medium">« Thomas Dupont EI »</td>
                  <td className="py-3 px-3 text-red-600 font-medium">Amende 4e classe (750 €)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Franchise de TVA</td>
                  <td className="py-3 px-3">Art. 293 B du CGI</td>
                  <td className="py-3 px-3 text-blue-700 font-medium">« TVA non applicable, art. 293 B du CGI »</td>
                  <td className="py-3 px-3 text-red-600 font-medium">Redressement TVA 20%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Numérotation Chronologique</td>
                  <td className="py-3 px-3">Art. 242 nonies A CGI</td>
                  <td className="py-3 px-3 text-blue-700 font-medium">FA-2026-001, FA-2026-002 (sans rupture)</td>
                  <td className="py-3 px-3 text-red-600 font-medium">15 € par mention inexacte</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Indemnité de Recouvrement (B2B)</td>
                  <td className="py-3 px-3">Art. D. 441-5 C. Com</td>
                  <td className="py-3 px-3 text-blue-700 font-medium">« Indemnité forfaitaire de compensation : 40 € »</td>
                  <td className="py-3 px-3 text-red-600 font-medium">Amende administrative DGCCRF</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Pénalités de Retard</td>
                  <td className="py-3 px-3">Art. L. 441-10 C. Com</td>
                  <td className="py-3 px-3 text-blue-700 font-medium">« Taux directeur semestriel BCE majoré de 10 points »</td>
                  <td className="py-3 px-3 text-red-600 font-medium">Amende administrative 75 000 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Guide Juridique de la Facturation en Micro-Entreprise
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              1. L’Ordre Strict de Numérotation des Factures
            </h3>
            <p>
              Le droit fiscal français interdit formellement d’émettre des factures de manière désordonnée ou de supprimer une facture émise. La numérotation doit reposer sur une séquence continue et chronologique sans rupture (ex: 2026-001, 2026-002, 2026-003). Si une erreur intervient sur une facture déjà envoyée au client, il est strictement interdit de la modifier : vous devez émettre une <strong>facture d’avoir</strong> annulant la facture initiale, puis créer une nouvelle facture corrigée.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. Délais de Paiement Légaux et Pénalités Entre Professionnels
            </h3>
            <p>
              En matière de relations commerciales interentreprises (B2B), le délai de paiement convenu entre les parties ne peut dépasser <strong>60 jours à compter de la date d’émission de la facture</strong> (ou 45 jours fin de mois, selon l’article L. 441-10 du Code de commerce). En l’absence de délai négocié, le délai par défaut est de 30 jours suivant la réception des marchandises ou l’exécution de la prestation.
            </p>
            <p>
              Tout retard de règlement donne lieu de plein droit (sans qu’un rappel soit nécessaire) à l’exigibilité d’intérêts de retard calculés sur le montant impayé, ainsi qu’à l’indemnité forfaitaire de 40 € pour frais de recouvrement.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-purple-600" />
              3. Conservation et Archivage des Factures
            </h3>
            <p>
              En vertu de l’article L. 123-22 du Code de commerce, toute facture émise ou reçue doit obligatoirement être conservée pendant une <strong>durée minimale de 10 ans</strong> à compter de la clôture de l’exercice. Elles peuvent être stockées sous format numérique PDF à condition de garantir l’intégrité du document et la lisibilité dans le temps.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur la Facture Auto-Entrepreneur
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on utiliser Word ou Excel pour facturer ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui pour les micro-entrepreneurs non assujettis à la TVA. Cependant, les fichiers Excel modifiables présentent un risque élevé d’erreur de numérotation. L’export immédiat en PDF non modifiable est impératif pour garantir la valeur probante en cas de contrôle fiscal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Que faire si je dépasse le seuil de franchise de TVA ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Dès le 1er jour du mois de dépassement du seuil majoré, vous devez facturer la TVA (généralement 20%). Vous devez supprimer la mention de l’article 293 B du CGI et afficher le montant HT, le taux de TVA et le montant TTC.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Un acompte nécessite-t-il une facture ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. L’encaissement de tout acompte avant l’exécution d’une prestation ou la livraison de biens impose obligatoirement l’émission d’une « Facture d’acompte » datée du jour de l’encaissement.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Faut-il indiquer son assurance décennale ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Pour les artisans du bâtiment (peinture, électricité, maçonnerie), il est obligatoire de mentionner le nom de l’assureur décennale, ses coordonnées et la couverture géographique du contrat sous peine d’amende.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle est la différence entre un devis signé et une facture ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le devis signé avec la mention « Bon pour accord » constitue le contrat de vente initial. La facture intervient après l’exécution de la prestation ou la livraison pour exiger légalement le règlement de la créance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que la facture électronique obligatoire (e-invoicing) ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La réforme de la facturation électronique entre assujettis à la TVA imposera progressivement la transmission des factures via des plateformes de dématérialisation partenaires (PDP) ou le portail public de facturation.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils Essentiels pour Indépendants & Auto-Entrepreneurs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/simulateur-charges-urssaf"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Charges URSSAF Micro</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/validateur-siren-siret"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Validateur SIREN / SIRET</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-tva-francaise"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Calculateur TVA 20% & 10%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/convertisseur-chiffre-en-lettre"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Chiffres en Lettres Facture</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
