import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calculator, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloPensioneAnticipataClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Pensione Anticipata 2026 : Simulatore Quota 103, Fornero e Vecchiaia | Kagazo Italia',
  description:
    'Simula la data di decorrenza e i requisiti per la pensione anticipata INPS in Italia: Quota 103 (62 anni + 41 anni contributi), Pensione Fornero e Vecchiaia con finestre mobili e calcolo contributivo.',
  keywords: [
    'calcolo pensione anticipata inps 2026',
    'requisiti quota 103 eta contributi finestre',
    'pensione anticipata ordinaria legge fornero',
    'pensione vecchiaia 67 anni 20 anni contributi',
    'finestra mobile dipendenti pubblici privati',
    'divieto cumulo reddito lavoro quota 103',
    'tetto massimo assegno pensione quattro volte minimo',
    'calcolo decorrenza primo assegno pensione inps',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-pensione-anticipata`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-pensione-anticipata`,
      'it': `${SITE_URL}/it/calcolo-pensione-anticipata`,
      'x-default': `${SITE_URL}/it/calcolo-pensione-anticipata`,
    },
  },
  openGraph: {
    title: 'Calcolo Pensione Anticipata & Quota 103 | Kagazo Italia',
    description:
      'Verifica immediata requisiti anagrafici e contributivi per Quota 103, pensione anticipata ordinaria e vecchiaia INPS.',
    url: `${SITE_URL}/it/calcolo-pensione-anticipata`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Quali sono i requisiti di Quota 103 confermati per il 2026?',
    answer:
      'Per accedere a Quota 103 è necessario maturare entro l\'anno solare un\'età anagrafica minima di 62 anni e un\'anzianità contributiva di almeno 41 anni (62 + 41 = 103). Il trattamento è liquidato secondo le regole del sistema contributivo ed è soggetto a un tetto massimo di importo mensile pari a 4 volte il trattamento minimo INPS (circa 2.394 euro lordi mensili) fino al raggiungimento dei 67 anni.',
  },
  {
    question: 'Come funzionano le finestre mobili per la decorrenza della pensione?',
    answer:
      'La finestra mobile rappresenta l\'intervallo di attesa tra il momento in cui si maturano i requisiti e l\'effettiva erogazione del primo assegno pensionistico. Per Quota 103, la finestra è di 7 mesi per i dipendenti del settore privato e di 9 mesi per i dipendenti delle pubbliche amministrazioni. Per la pensione anticipata ordinaria Fornero la finestra fissa è di 3 mesi per tutti i lavoratori.',
  },
  {
    question: 'È possibile lavorare dopo essere andati in pensione con Quota 103?',
    answer:
      'No. Fino al raggiungimento dell\'età per la pensione di vecchiaia (67 anni), la pensione con Quota 103 non è cumulabile con alcun reddito da lavoro dipendente o autonomo continuativo, a pena di sospensione immediata dell\'assegno e recupero delle rate indebitamente percepite. L\'unica eccezione ammessa per legge è il lavoro autonomo occasionale senza partita IVA fino al limite annuo di 5.000 euro lordi.',
  },
  {
    question: 'Quali sono i requisiti per la pensione di vecchiaia e anticipata ordinaria Fornero?',
    answer:
      'La pensione di vecchiaia ordinaria richiede 67 anni di età anagrafica e almeno 20 anni di contributi versati. La pensione anticipata ordinaria (indipendente dall\'età) richiede 42 anni e 10 mesi di contributi per gli uomini (2.227 settimane) e 41 anni e 10 mesi per le donne (2.175 settimane), con finestra mobile trimestrale.',
  },
];

export default function CalcoloPensioneAnticipataPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Simulatore Requisiti Pensione Anticipata INPS 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-pensione-anticipata`,
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
          'Simulatore di compatibilità anagrafica e contributiva per Quota 103, pensione anticipata ordinaria e vecchiaia INPS.',
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
            name: 'Calcolo Pensione Anticipata',
            item: `${SITE_URL}/it/calcolo-pensione-anticipata`,
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

      <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Breadcrumb Visual */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center space-x-2">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/it" className="hover:text-emerald-400 transition-colors">Italia</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Calcolo Pensione Anticipata</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulatore Previdenziale INPS & Finanziaria 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Calcolo Pensione Anticipata & Quota 103 <br className="hidden sm:inline" />
              <span className="text-emerald-400">Requisiti Anagrafici e Contributivi INPS</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Verifica in modo interattivo la tua idoneità alle forme di pensionamento anticipato previste dalla legge italiana: Quota 103 flessibile, pensione anticipata ordinaria Legge Fornero e pensione di vecchiaia, tenendo conto delle finestre mobili di decorrenza e dei vincoli contributivi.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Previdenziale: Requisiti di Pensionamento nel 2026
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Per accedere alla <strong>pensione anticipata con Quota 103</strong> occorrono almeno <strong>62 anni di età e 41 anni di contribuzione</strong> versata entro il 31 dicembre. Il trattamento viene liquidato con il metodo contributivo integrale con tetto massimo mensile di 2.394 € lordi e finestre di differimento di 7 mesi per il comparto privato e 9 mesi per il pubblico impiego. La <strong>pensione anticipata ordinaria Fornero</strong> non richiede limiti di età ma esige 42 anni e 10 mesi per gli uomini e 41 anni e 10 mesi per le donne. La <strong>pensione di vecchiaia ordinaria</strong> si perfeziona a 67 anni con almeno 20 anni di versamenti.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CalcoloPensioneAnticipataClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Guida Normativa al Pensionamento Anticipato e Requisiti INPS
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Quota 103: Condizioni, Calcolo Contributivo e Massimali
              </h3>
              <p>
                La misura di pensionamento anticipato flessibile nota come <em>Quota 103</em> consente l&apos;uscita dal mercato del lavoro con un minimo di 62 anni di età anagrafica e 41 anni di contribuzione effettiva. I tratti salienti della misura sono:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Ricalcolo Interamente Contributivo:</strong> La quota di pensione riferita ai periodi lavorati prima del 1° gennaio 1996, ordinariamente liquidata con il più favorevole metodo retributivo, viene ricalcolata secondo le regole del sistema contributivo basato sui coefficienti di trasformazione legati all&apos;età.
                </li>
                <li>
                  <strong>Tetto di Importo Mensile:</strong> Fino al raggiungimento dell&apos;età anagrafica per la vecchiaia (67 anni), l&apos;importo lordo mensile erogato non può superare 4 volte il trattamento minimo INPS (pari a circa 2.394 euro mensili lordi). Al compimento dei 67 anni, l&apos;assegno viene corrisposto nel suo intero importo maturato.
                </li>
                <li>
                  <strong>Finestre di Decorrenza Differita:</strong> La decorrenza economica dell&apos;assegno scatta dopo 7 mesi dalla data di maturazione per i dipendenti del settore privato e i lavoratori autonomi, e dopo 9 mesi per i dipendenti pubblici, previa apposita domanda di cessazione del servizio.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Il Regime di Incumulabilità con Redditi da Lavoro
              </h3>
              <p>
                Chi accede al pensionamento tramite Quota 103 è soggetto a un rigido divieto di cumulo con qualsiasi reddito da lavoro dipendente o autonomo continuativo fino al raggiungimento dei 67 anni. L&apos;unica deroga espressamente autorizzata dal legislatore riguarda le prestazioni di lavoro autonomo occasionale senza partita IVA, purché il compenso lordo annuo non superi l&apos;importo di 5.000 euro. In caso di violazione, l&apos;INPS dispone l&apos;immediata sospensione del trattamento pensionistico e il recupero integrale delle mensilità erogate nell&apos;anno di imposta interessato.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Canali Ordinari: Pensione Fornero e Vecchiaia
              </h3>
              <p>
                Per chi non intende subire le limitazioni o le decurtazioni del ricalcolo contributivo di Quota 103, restano pienamente operativi i due canali cardine istituiti dal D.L. 201/2011 (Legge Fornero):
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Pensione Anticipata Ordinaria:</strong> Richiede 42 anni e 10 mesi di contributi per gli uomini (2.227 settimane) e 41 anni e 10 mesi per le donne (2.175 settimane), a prescindere dall&apos;età anagrafica del richiedente, con finestra di 3 mesi.
                </li>
                <li>
                  <strong>Pensione di Vecchiaia Ordinaria:</strong> Richiede 67 anni di età e almeno 20 anni di contribuzione. Per i lavoratori con primo accredito contributivo successivo al 31/12/1995 (contributivi puri), l&apos;importo della pensione maturata deve inoltre raggiungere una soglia minima pari all&apos;importo dell&apos;assegno sociale.
                </li>
              </ul>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti sulla Pensione Anticipata INPS
              </h2>
            </div>
            <div className="divide-y divide-slate-700/60">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-base font-medium text-slate-100">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Ad Contextual */}
          <div className="my-6">
            <AdSlot slot="post_download" context="legal" />
          </div>
        </div>
      </div>
    </>
  );
}
