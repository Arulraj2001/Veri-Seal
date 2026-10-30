import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { ArrowRight, Sparkles, ShieldCheck, Building2, Landmark, FileText, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portail Outils & Calculateurs France 2026 : Fiscal, Social & Immobilier | Kagazo',
  description:
    'Suite complète de 20 outils officiels conformes à la législation française 2026 : salaire brut en net, URSSAF, rupture conventionnelle, frais de notaire, PTZ, TVA, SIREN et impôts.',
  alternates: {
    canonical: `${SITE_URL}/fr`,
  },
  openGraph: {
    title: 'Portail Outils & Calculateurs France 2026 | Kagazo',
    description:
      'Calculateurs de référence pour salariés, indépendants, propriétaires et citoyens français. Barèmes officiels URSSAF, DGFiP et Code du travail.',
    url: `${SITE_URL}/fr`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FrenchHubPage() {
  const categories = [
    {
      id: 'emploi-salaires',
      title: '1. Emploi, Salaires & Retraite',
      description: 'Calculs de rémunération, charges patronales et indemnités de départ du Code du travail.',
      icon: Building2,
      tools: [
        {
          title: 'Calculateur Salaire Brut en Net 2026',
          desc: 'Conversion de salaire brut en net pour cadre, non-cadre et fonctionnaire avec prélèvement à la source.',
          href: '/fr/calculateur-salaire-net-brut',
          tag: 'Salarié',
        },
        {
          title: 'Simulateur Charges URSSAF Auto-Entrepreneur',
          desc: 'Cotisations sociales micro-entreprise BIC, BNC et versement libératoire de l\'impôt sur le revenu.',
          href: '/fr/simulateur-charges-urssaf',
          tag: 'Indépendant',
        },
        {
          title: 'Calculateur Indemnité Rupture Conventionnelle',
          desc: 'Barème légal plancher obligatoire selon les Articles L. 1237-13 et R. 1234-2 du Code du travail.',
          href: '/fr/calculateur-indemnite-rupture',
          tag: 'Contrat',
        },
        {
          title: 'Simulateur Coût Embauche Employeur (Superbrut)',
          desc: 'Coût total employeur, charges patronales URSSAF et allègement général de cotisations (ex-Fillon).',
          href: '/fr/simulateur-cout-embauche-employeur',
          tag: 'Entreprise',
        },
        {
          title: 'Prime de Précarité & Fin de CDD',
          desc: 'Calcul de l\'indemnité légale de 10% et des congés payés non pris selon l\'Article L. 1243-8.',
          href: '/fr/calculateur-indemnite-fin-cdd',
          tag: 'CDD',
        },
      ],
    },
    {
      id: 'immobilier-prets',
      title: '2. Immobilier, Notaire & Crédit',
      description: 'Simulateurs d\'acquisition, de fiscalité immobilière et de financement de logement.',
      icon: Landmark,
      tools: [
        {
          title: 'Calculateur Frais de Notaire 2026',
          desc: 'Droits d\'enregistrement fiscaux, émoluments réglementés (Décret 2016-230) dans l\'ancien et le neuf.',
          href: '/fr/calculateur-frais-de-notaire',
          tag: 'Achat Immo',
        },
        {
          title: 'Simulateur Plus-Value Immobilière & Abattements',
          desc: 'Impôt sur la plus-value (IR 19% et prélèvements sociaux 17,2%) selon la durée de détention (CGI 150 VC).',
          href: '/fr/simulateur-plus-value-immobiliere',
          tag: 'Fiscalité',
        },
        {
          title: 'Simulateur Prêt Immobilier & Assurance',
          desc: 'Mensualités constantes, coût total des intérêts et impact de l\'assurance emprunteur.',
          href: '/fr/simulateur-pret-immobilier-mensualite',
          tag: 'Crédit',
        },
        {
          title: 'Simulateur Prêt à Taux Zéro (PTZ 2026)',
          desc: 'Vérification d\'éligibilité par zone (A, B1, B2, C), quotité de financement et durée du différé.',
          href: '/fr/simulateur-pret-taux-zero-ptz',
          tag: 'Aide d\'État',
        },
        {
          title: 'Calculateur Rendement Locatif Brut & Net',
          desc: 'Rentabilité brute, nette de charges copropriété / taxe foncière, et cash-flow après impôt (Micro vs Réel).',
          href: '/fr/calculateur-rendement-locatif',
          tag: 'Investissement',
        },
      ],
    },
    {
      id: 'demarches-documents',
      title: '3. Démarches, Documents & Administratif',
      description: 'Outils certifiés pour démarches administratives, numéros d\'entreprise et pièces d\'identité.',
      icon: FileText,
      tools: [
        {
          title: 'Convertisseur Chiffre en Lettre Officiel',
          desc: 'Conversion automatique des montants en toutes lettres pour chèques bancaires et contrats.',
          href: '/fr/convertisseur-chiffre-en-lettre',
          tag: 'Chèque',
        },
        {
          title: 'Facture Auto-Entrepreneur PDF Gratuite',
          desc: 'Générateur de factures légales avec mentions obligatoires et franchise de TVA (Art. 293 B du CGI).',
          href: '/fr/facture-auto-entrepreneur',
          tag: 'Facturation',
        },
        {
          title: 'Validateur SIREN & SIRET (Algorithme Luhn)',
          desc: 'Vérification instantanée de la validité mathématique d\'un numéro SIREN (9 chiffres) ou SIRET (14 chiffres).',
          href: '/fr/validateur-siren-siret',
          tag: 'INSEE',
        },
        {
          title: 'Photo d\'Identité Biométrique ANTS 35×45mm',
          desc: 'Recadrage photo conforme aux normes ISO/IEC 19794-5 et export sur planche 10×15 cm prête à imprimer.',
          href: '/fr/photo-identite-passeport-ants',
          tag: 'Passeport',
        },
        {
          title: 'Compresseur PDF France Travail, CAF & Ameli',
          desc: 'Réduction de taille sous 2 Mo ou 4 Mo pour respecter les limites des téléprocédures publiques.',
          href: '/fr/compresseur-pdf-france-travail',
          tag: 'Démarches',
        },
      ],
    },
    {
      id: 'utilitaires-entreprise',
      title: '4. Utilitaires, Entreprise & Vie Quotidienne',
      description: 'Calculateurs fiscaux, gestion du temps de travail et barèmes officiels de l\'État.',
      icon: Wrench,
      tools: [
        {
          title: 'Calculateur TVA & Clé Intracommunautaire',
          desc: 'Conversion HT / TTC aux 4 taux français (20%, 10%, 5,5%, 2,1%) et génération de numéro TVA UE.',
          href: '/fr/calculateur-tva-francaise',
          tag: 'TVA',
        },
        {
          title: 'Calculateur Heures Supplémentaires (Loi TEPA)',
          desc: 'Majorations de 25% et 50%, allègement de cotisations salariales (11,31%) et exonération d\'impôt.',
          href: '/fr/calculateur-heures-supplementaires',
          tag: 'Temps de travail',
        },
        {
          title: 'Convertisseur Heures:Minutes en Décimales',
          desc: 'Conversion de temps en centièmes d\'heure pour logiciels de paie et facturation d\'honoraires.',
          href: '/fr/calculateur-duree-travail-heures-decimales',
          tag: 'Gestion Paie',
        },
        {
          title: 'Calculateur Soldes & Remises en Cascade',
          desc: 'Calcul instantané du prix en caisse, des rabais successifs (-30% puis -20%) et de l\'économie réelle.',
          href: '/fr/calculateur-remise-solde',
          tag: 'Consommation',
        },
        {
          title: 'Barème Kilométrique Fiscal 2026 (DGFiP)',
          desc: 'Indemnités kilométriques pour frais réels selon la puissance fiscale (CV) et bonus électrique (+20%).',
          href: '/fr/simulateur-frais-kilometriques',
          tag: 'Impôts',
        },
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Mise à jour 2026 • 20 outils officiels conformes à la législation française</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Portail Outils &amp; Calculateurs Officiels en France
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Calculateurs de référence statutaires exécutés en mémoire locale sur votre appareil. Zéro inscription, traitement direct et respect rigoureux de la confidentialité RGPD.
          </p>
        </div>

        {/* 4 Pillars Categories */}
        <div className="space-y-16">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <section key={cat.id} id={cat.id} className="space-y-6">
                <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                    {cat.tools.length} outils
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.tools.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="group p-6 rounded-3xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                            {t.tag}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {t.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
                        <span>Ouvrir l&apos;outil</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
