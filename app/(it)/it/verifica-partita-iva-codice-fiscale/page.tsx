import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calculator, FileText, CheckCircle2 } from 'lucide-react';
import { VerificaPartitaIvaCfClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Verifica Partita IVA e Codice Fiscale 2026 : Controllo Modulo 10 e Algoritmo CIN | Kagazo Italia',
  description:
    'Valida e decodifica online la correttezza formale di Partita IVA (11 cifre, Modulo 10) e Codice Fiscale (16 caratteri, D.M. 23/12/1976). Estrae data di nascita, sesso e comune catastale.',
  keywords: [
    'verifica partita iva agenzia delle entrate',
    'controllo codice fiscale algoritmo cin',
    'algoritmo luhn modulo 10 partita iva',
    'decodifica codice fiscale data sesso comune',
    'omocodia codice fiscale lettere sostitutive',
    'controllo formale partita iva 11 cifre',
    'valutazione anagrafe tributaria vies',
    'dm 23 12 1976 regole codice fiscale',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/verifica-partita-iva-codice-fiscale`,
    languages: {
      'it-IT': `${SITE_URL}/it/verifica-partita-iva-codice-fiscale`,
      'it': `${SITE_URL}/it/verifica-partita-iva-codice-fiscale`,
      'x-default': `${SITE_URL}/it/verifica-partita-iva-codice-fiscale`,
    },
  },
  openGraph: {
    title: 'Verifica Partita IVA e Codice Fiscale | Kagazo Italia',
    description:
      'Strumento ufficiale di controllo formale per Partita IVA e Codice Fiscale con algoritmo ministeriale e decodifica anagrafica.',
    url: `${SITE_URL}/it/verifica-partita-iva-codice-fiscale`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Come funziona il calcolo del carattere di controllo del Codice Fiscale?',
    answer:
      'Il sedicesimo carattere del Codice Fiscale è una lettera di controllo alfabetica determinata secondo il D.M. 23 dicembre 1976. Ai 15 caratteri precedenti viene assegnato un valore numerico dipendente dalla loro posizione: i caratteri in posizione dispari (1°, 3°, 5°...) e quelli in posizione pari (2°, 4°, 6°...) utilizzano due tabelle di conversione ponderate differenti. I valori vengono sommati e divisi per 26; il resto della divisione intera individua la lettera corrispondente (0 = A, 1 = B ... 25 = Z).',
  },
  {
    question: 'Che cos\'è l\'omocodia e come viene risolta nel Codice Fiscale?',
    answer:
      'L\'omocodia si verifica quando due o più individui condividono identici cognomi, nomi, data di nascita e comune di nascita, generando il medesimo codice fiscale a 16 caratteri. Per evitare duplicazioni nei registri tributari, l\'Agenzia delle Entrate sostituisce una o più cifre numeriche (a partire da destra verso sinistra tra quelle relative al giorno, anno e comune) con specifiche lettere dell\'alfabeto (da L a V, escludendo vocali e lettere simili come I, O, U).',
  },
  {
    question: 'Come è strutturata una Partita IVA italiana di 11 cifre?',
    answer:
      'La Partita IVA italiana si compone di 11 caratteri esclusivamente numerici: le prime 7 cifre corrispondono al numero di matricola progressivo attribuito al contribuente dall\'ufficio delle imposte; le successive 3 cifre (dall\'8ª alla 10ª) individuano il codice identificativo provinciale dell\'Ufficio dell\'Agenzia delle Entrate competente (da 001 a 100, oppure 120/121 per soggetti esteri o non residenti); l\'undicesima cifra è il carattere di controllo calcolato tramite l\'algoritmo di Luhn (Modulo 10).',
  },
  {
    question: 'La verifica formale garantisce che la Partita IVA sia attiva e registrata?',
    answer:
      'La verifica formale eseguita da questo calcolatore attesta la rigorosa conformità logico-matematica del codice e l\'assenza di errori di battitura o cifre invertite. Tuttavia, per accertare se l\'attività economica sia effettivamente attiva, cessata, sospesa o se sia abilitata alle operazioni intracomunitarie (archivio VIES), è necessario consultare il servizio telematico ufficiale dell\'Agenzia delle Entrate o della Commissione Europea.',
  },
];

export default function VerificaPartitaIvaCfPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Validatore Partita IVA e Codice Fiscale Italia',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/verifica-partita-iva-codice-fiscale`,
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
          'Verifica formale e decodifica anagrafica di Codice Fiscale e Partita IVA secondo le formule dell\'Agenzia delle Entrate.',
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
            name: 'Verifica Partita IVA e CF',
            item: `${SITE_URL}/it/verifica-partita-iva-codice-fiscale`,
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
            <span className="text-slate-200 font-medium">Verifica Partita IVA & CF</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Algoritmi Ufficiali Ministero Finanze & Agenzia delle Entrate</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Verifica Partita IVA e Codice Fiscale <br className="hidden sm:inline" />
              <span className="text-emerald-400">Validatore di Controllo e Decodifica Anagrafica</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Verifica l&apos;esattezza matematica del carattere di controllo del Codice Fiscale (16 caratteri) e della Partita IVA (11 cifre). Decodifica automatica della data di nascita, sesso e codice catastale del comune di nascita in piena riservatezza client-side.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Operativa: Regole Algoritmiche di Validazione Fiscale
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Il <strong>Codice Fiscale</strong> delle persone fisiche (D.P.R. 605/1973) impiega un carattere di controllo alfabetico in sedicesima posizione ottenuto tramite conversione ponderata dei caratteri pari e dispari con modulo 26. La <strong>Partita IVA</strong> (D.P.R. 633/1972) consta di 11 cifre, in cui l&apos;ultima cifra funge da checksum calcolato con l&apos;algoritmo Modulo 10 di Luhn sui primi 10 caratteri. Lo strumento esegue la verifica in memoria locale senza inoltrare dati ad alcun server.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <VerificaPartitaIvaCfClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Disciplina Tributaria dei Codici Identificativi delle Persone Fisiche e Giuridiche
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Il Codice Fiscale: D.P.R. 605/1973 e Regole di Composizione (D.M. 23/12/1976)
              </h3>
              <p>
                Istituito dal D.P.R. 29 settembre 1973, n. 605 recante &quot;Disposizioni relative all&apos;anagrafe tributaria e al codice fiscale dei contribuenti&quot;, il Codice Fiscale identifica in modo univoco le persone fisiche nei rapporti con le amministrazioni e gli enti pubblici italiani. La composizione risponde a criteri matematici e fonetici precisi:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Cognome (3 consonanti):</strong> Si prelevano le prime tre consonanti del cognome. Se le consonanti sono insufficienti si aggiungono le vocali; se il cognome ha meno di tre lettere si aggiunge la lettera X.
                </li>
                <li>
                  <strong>Nome (3 consonanti):</strong> Se il nome contiene 4 o più consonanti, si scelgono la 1ª, la 3ª e la 4ª consonante. In caso contrario, si prendono le prime 3 consonanti nell&apos;ordine, seguite da vocali o dalla lettera X se necessario.
                </li>
                <li>
                  <strong>Anno, Mese e Giorno di Nascita:</strong> 2 cifre per l&apos;anno solare di nascita, 1 lettera alfabetica per il mese (da A a T secondo la tabella ministeriale) e 2 cifre per il giorno di nascita (a cui per le donne viene sommato il valore 40 per distinguerle dal genere maschile).
                </li>
                <li>
                  <strong>Codice Belfiore del Comune:</strong> 4 caratteri alfanumerici corrispondenti al codice catastale ministeriale del comune italiano di nascita o dello Stato estero di nascita (prefisso Z).
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. La Partita IVA: D.P.R. 633/1972 e Algoritmo Modulo 10 di Luhn
              </h3>
              <p>
                Ai sensi dell&apos;articolo 35 del D.P.R. 26 ottobre 1972, n. 633 (Decreto IVA), tutti i soggetti che intraprendono l&apos;esercizio di un&apos;impresa, arte o professione nel territorio dello Stato devono farne dichiarazione entro trenta giorni all&apos;Agenzia delle Entrate, che provvede ad attribuire la matricola fiscale di Partita IVA:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Cifre 1 - 7:</strong> Numero sequenziale progressivo di iscrizione all&apos;anagrafe dei soggetti IVA.
                </li>
                <li>
                  <strong>Cifre 8 - 10:</strong> Codice identificativo della sede provinciale dell&apos;Ufficio delle Entrate che ha assegnato la matricola.
                </li>
                <li>
                  <strong>Cifra 11 (Checksum):</strong> Carattere numerico di controllo calcolato moltiplicando per 2 le cifre in posizione pari e sottraendo 9 a quelle che superano 9, sommando il tutto e calcolando il complemento al multiplo di 10 superiore.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Rilevanza nella Fatturazione Elettronica (SdI) e Sanzioni
              </h3>
              <p>
                Con l&apos;introduzione dell&apos;obbligo generalizzato della fatturazione elettronica tramite il Sistema di Interscambio (SdI), l&apos;esattezza del codice fiscale o della Partita IVA del cessionario/committente costituisce requisito essenziale per la tempestiva validazione del documento XML. Un codice errato o formalmente non congruente comporta lo scarto immediato della fattura con codice errore 00200 o 00305, esponendo il fornitore alle sanzioni per omessa o tardiva fatturazione (dal 90% al 180% dell&apos;imposta non documentata ex art. 6 D.Lgs. 471/1997).
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti su Codice Fiscale e Partita IVA
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
