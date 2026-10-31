import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Home, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloImposteAcquistoCasaClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Imposte Acquisto Prima Casa e Notaio 2026 | Prezzo-Valore | Kagazo Italia',
  description:
    'Calcola tutte le spese notarili e imposte per acquisto prima e seconda casa: imposta di registro 2% o 9% con sistema Prezzo-Valore, imposte ipotecarie e catastali, IVA costruttore e imposta sostitutiva mutuo.',
  keywords: [
    'calcolo imposte acquisto prima casa 2026',
    'sistema prezzo valore rendita catastale notaio',
    'imposta di registro 2 per cento prima casa da privato',
    'iva 4 per cento acquisto casa da costruttore',
    'calcolo spese notarili acquisto prima casa mutuo',
    'imposta sostitutiva mutuo 0.25 prima casa',
    'agevolazioni fiscali prima casa requisiti 2026',
    'spese agenzia immobiliare detraibili 730',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-imposte-acquisto-casa`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-imposte-acquisto-casa`,
      'it': `${SITE_URL}/it/calcolo-imposte-acquisto-casa`,
      'x-default': `${SITE_URL}/it/calcolo-imposte-acquisto-casa`,
    },
  },
  openGraph: {
    title: 'Calcolo Imposte Acquisto Prima Casa e Notaio 2026 | Kagazo Italia',
    description:
      'Simulatore ufficiale imposte compravendita immobiliare in Italia con calcolo esatto del Prezzo-Valore catastale, onorario notarile e imposte ipocatastali.',
    url: `${SITE_URL}/it/calcolo-imposte-acquisto-casa`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Cos\'è il sistema del Prezzo-Valore e come fa risparmiare sulle imposte?',
    answer:
      'Il meccanismo del Prezzo-Valore (introdotto dall\'Art. 1, comma 497 della Legge 266/2005) consente all\'acquirente privato di immobili ad uso abitativo di pagare l\'imposta di registro calcolata sul valore catastale dell\'immobile (moltiplicando la rendita catastale rivalutata del 5% per 110 per prima casa, o per 120 per seconda casa) anziché sul reale prezzo commerciale di compravendita pattuito nel rogito, generando un notevole risparmio fiscale.',
  },
  {
    question: 'Qual è la differenza fiscale tra comprare da privato o da impresa costruttrice?',
    answer:
      'Acquistando da privato si paga l\'imposta di registro al 2% (prima casa) o al 9% (seconda casa) sul valore catastale, oltre a 50€ di imposta ipotecaria e 50€ di catastale. Acquistando da impresa con vendita soggetta a IVA, si versa l\'IVA al 4% (prima casa) o 10% (seconda casa) calcolata direttamente sul prezzo concordato, oltre a 200€ ciascuna per registro, ipotecaria e catastale.',
  },
  {
    question: 'Quali sono i requisiti di legge per accedere alle agevolazioni prima casa?',
    answer:
      'I requisiti previsti dalla Nota II-bis all\'Art. 1 della Tariffa allegata al D.P.R. 131/1986 sono: (1) l\'immobile non deve essere di lusso (categorie catastali escluse: A/1, A/8, A/9); (2) l\'acquirente deve avere o trasferire la propria residenza anagrafica nel Comune dell\'immobile entro 18 mesi dal rogito; (3) non deve possedere un\'altra abitazione acquistata con le agevolazioni prima casa, o deve impegnarsi ad alienarla entro un anno.',
  },
  {
    question: 'Come viene tassato il mutuo bancario collegato all\'acquisto?',
    answer:
      'Sui finanziamenti a medio e lungo termine erogati dagli istituti bancari si applica l\'imposta sostitutiva trattenuta direttamente all\'atto dell\'erogazione: pari allo 0,25% del capitale finanziato per i mutui prima casa e al 2,00% per i mutui stipulati per l\'acquisto di seconde case.',
  },
];

export default function CalcoloImposteAcquistoCasaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Imposte Acquisto Prima Casa Italia 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-imposte-acquisto-casa`,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'EUR',
        },
        provider: {
          '@type': 'Organization',
          name: 'Kagazo Italia',
          url: `${SITE_URL}/it`,
        },
        description:
          'Calcola tutte le imposte di registro, IVA, imposte ipocatastali e parcella del notaio per l\'acquisto di un immobile.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Italia',
            item: `${SITE_URL}/it`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Imposte Acquisto Casa',
            item: `${SITE_URL}/it/calcolo-imposte-acquisto-casa`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
          <span>/</span>
          <span className="text-sky-700 font-semibold">Imposte Acquisto Casa</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Sistema Prezzo-Valore (D.P.R. 131/1986 &amp; Legge 266/2005)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Imposte Acquisto Casa 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">Prezzo-Valore, Registro 2%, IVA e Parcella Notaio</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Fiscale Diretta:</strong> Se compri da un privato con le agevolazioni prima casa, l&apos;imposta di registro è pari al <strong>2%</strong> (minimo 1.000 €) calcolata sul <strong>valore catastale Prezzo-Valore</strong> (rendita catastale &times; 1,05 &times; 110), più 100 € complessivi di imposte ipotecaria e catastale. Se invece acquisti da impresa costruttrice, si applica l&apos;<strong>IVA al 4%</strong> direttamente sul prezzo dichiarato nel rogito, più 600 € di imposte fisse (registro, ipotecaria, catastale a 200 € ciascuna).
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloImposteAcquistoCasaClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              La Regola del Prezzo-Valore e la Tassazione degli Immobili Residenziali
            </h2>
            <p>
              Il sistema del <strong>Prezzo-Valore</strong> introdotto dalla legge finanziaria 2006 (Legge 266/2005) rappresenta un&apos;importante tutela per chi acquista un immobile residenziale da un privato. Consente di liquidare l&apos;imposta di registro non sul corrispettivo pattuito nell&apos;atto di compravendita, bensì sul valore catastale dell&apos;immobile, notevolmente inferiore rispetto ai valori di mercato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">1. Il Calcolo del Valore Catastale</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                La formula ufficiale prevede la moltiplicazione della rendita catastale non rivalutata per il coefficiente di legge del 5% e successivamente per:
              </p>
              <ul className="text-xs font-mono space-y-1 text-slate-700 pt-1">
                <li>• <strong>110</strong> per l&apos;abitazione principale (agevolazione prima casa);</li>
                <li>• <strong>120</strong> per i fabbricati ad uso abitativo seconda casa.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">2. Esclusione dagli Accertamenti di Valore</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                L&apos;applicazione del Prezzo-Valore preclude all&apos;Agenzia delle Entrate il potere di procedere ad accertamenti di maggior valore ai fini dell&apos;imposta di registro, garantendo all&apos;acquirente la certezza dell&apos;onere fiscale dovuto a patto che il prezzo reale venga integralmente indicato nell&apos;atto notarile.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sulle Imposte di Compravendita Casa (FAQ)
            </h3>
            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">{faq.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
