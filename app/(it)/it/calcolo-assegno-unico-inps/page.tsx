import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Users, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloAssegnoUnicoInpsClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Assegno Unico INPS 2026 : Tabelle Rivalutate, Fasce ISEE e Maggiorazioni | Kagazo Italia',
  description:
    'Calcola l\'importo mensile e annuo dell\'Assegno Unico e Universale Figli (AUU) secondo il D.Lgs. 230/2021. Include quote base per fasce ISEE, maggiorazione per entrambi i genitori lavoratori e neonati.',
  keywords: [
    'calcolo assegno unico inps 2026',
    'tabelle rivalutate assegno unico dgs 230 2021',
    'fasce isee importo massimo minimo figlio',
    'maggiorazione entrambi genitori lavoratori',
    'assegno universale figli disabili maggiorenni',
    'rinnovo dsu isee febbraio conguagli inps',
    'maggiorazione terzo figlio quarto figlio bonus 150',
    'simulatore auu accredito conto corrente iban',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-assegno-unico-inps`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-assegno-unico-inps`,
      'it': `${SITE_URL}/it/calcolo-assegno-unico-inps`,
      'x-default': `${SITE_URL}/it/calcolo-assegno-unico-inps`,
    },
  },
  openGraph: {
    title: 'Calcolo Assegno Unico INPS 2026 | Kagazo Italia',
    description:
      'Simulatore ufficiale Assegno Unico e Universale: quote base ISEE, maggiorazioni nuclei numerosi e accredito mensile.',
    url: `${SITE_URL}/it/calcolo-assegno-unico-inps`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Qual è l\'importo massimo e minimo dell\'Assegno Unico nel 2026?',
    answer:
      'L\'importo base per ciascun figlio minorenne a carico varia da un massimo di circa 199,40 euro mensili (per nuclei con ISEE pari o inferiore a 17.090,61 euro) fino a un minimo di 57,00 euro mensili (per nuclei con ISEE pari o superiore a 45.575,00 euro o in caso di domanda presentata senza ISEE). A queste quote si aggiungono le maggiorazioni di legge.',
  },
  {
    question: 'Quali sono le maggiorazioni previste per i nuclei con figli?',
    answer:
      'Le maggiorazioni principali includono: 1) Maggiorazione per ciascun figlio successivo al secondo (fino a 96,90 € per ISEE minimi); 2) Maggiorazione per entrambi i genitori titolari di reddito da lavoro (+34,10 € a figlio); 3) Maggiorazione del 50% della quota base per ciascun figlio nel primo anno di vita; 4) Bonus forfettario di 150 euro mensili per famiglie con almeno 4 figli; 5) Maggiorazioni specifiche per figli con disabilità media, grave o non autosufficienti senza limiti di età.',
  },
  {
    question: 'Cosa succede se non si presenta la DSU per il rinnovo dell\'ISEE?',
    answer:
      'In assenza di una nuova Dichiarazione Sostitutiva Unica (DSU) attestante l\'ISEE aggiornato, a partire dalla mensilità di marzo l\'INPS corrisponde l\'importo minimo previsto per legge (57 € a figlio). Tuttavia, se la nuova DSU viene inviata entro il 30 giugno dello stesso anno, l\'INPS calcola retroattivamente e accredita tutti gli arretrati maturati da marzo in poi.',
  },
  {
    question: 'L\'Assegno Unico spetta anche per i figli maggiorenni?',
    answer:
      'Sì, l\'assegno spetta per ciascun figlio fino al compimento dei 21 anni di età a condizione che il figlio: frequenti un percorso di studi superiori, universitari o di formazione professionale; oppure svolga un tirocinio retribuito con reddito complessivo annuo non superiore a 8.000 euro; oppure sia registrato come disoccupato in cerca di lavoro presso i servizi per l\'impiego; o svolga il servizio civile universale. Per i figli con disabilità non esiste alcun limite anagrafico.',
  },
];

export default function CalcoloAssegnoUnicoInpsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Simulatore Assegno Unico e Universale INPS 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-assegno-unico-inps`,
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
          'Calcola l\'importo mensile e annuo dell\'Assegno Unico per figli a carico secondo D.Lgs. 230/2021 e fasce ISEE.',
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
            name: 'Calcolo Assegno Unico INPS',
            item: `${SITE_URL}/it/calcolo-assegno-unico-inps`,
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
            <span className="text-slate-200 font-medium">Assegno Unico INPS</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>D.Lgs. 230/2021 & Tabelle Rivalutate INPS 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Calcolo Assegno Unico e Universale Figli <br className="hidden sm:inline" />
              <span className="text-emerald-400">Importi Mensili, Fasce ISEE e Maggiorazioni</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Determina l&apos;importo esatto del sussidio mensile erogato dall&apos;INPS per i figli a carico in base alla situazione economica ISEE del nucleo, all&apos;età anagrafica dei minori e alle specifiche condizioni lavorative e familiari.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Previdenziale: Quadro Economico Assegno Unico 2026
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  L&apos;<strong>Assegno Unico e Universale (AUU)</strong> è corrisposto per ciascun figlio a carico dal settimo mese di gravidanza fino ai 21 anni (e a vita per i soggetti con disabilità). L&apos;importo di base oscilla tra <strong>199,40 € mensili</strong> (ISEE non superiore a 17.090,61 €) e <strong>57,00 € mensili</strong> (ISEE pari o superiore a 45.575 € oppure senza DSU). A tale base si aggiungono la maggiorazione per entrambi i genitori lavoratori (+34,10 €), la maggiorazione per terzo figlio, il +50% nel primo anno di vita e 150 € forfettari per nuclei con 4 o più figli.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CalcoloAssegnoUnicoInpsClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Disciplina Istitutiva dell&apos;Assegno Unico e Universale (D.Lgs. 230/2021)
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Ambito di Applicazione e Natura Giuridica
              </h3>
              <p>
                Introdotto con il Decreto Legislativo 29 dicembre 2021, n. 230 in attuazione della Legge Delega 46/2021, l&apos;Assegno Unico e Universale rappresenta la principale misura pubblica a sostegno della genitorialità e natalità in Italia. La misura ha razionalizzato e assorbito le previgenti forme frammentate di sussidio, tra cui le detrazioni fiscali IRPEF per carichi di famiglia (art. 12 TUIR) per figli fino a 21 anni, l&apos;Assegno per il Nucleo Familiare (ANF), il bonus bebè e il premio alla nascita &quot;Mamma Domani&quot;.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Meccanismo di Calcolo e Degressività ISEE
              </h3>
              <p>
                L&apos;importo dell&apos;assegno è modulato secondo un principio di progressività degressiva incentrato sull&apos;Indicatore della Situazione Economica Equivalente (ISEE):
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Soglia ISEE Minima (&le; 17.090,61 €):</strong> Diritto all&apos;importo massimo mensile di circa 199,40 € per ciascun figlio minorenne e 96,90 € per ciascun figlio tra i 18 e i 20 anni.
                </li>
                <li>
                  <strong>Fascia Intermedia (17.090,61 € - 45.575,00 €):</strong> L&apos;importo decresce in modo lineare e continuo per ciascun euro di incremento dell&apos;ISEE.
                </li>
                <li>
                  <strong>Soglia ISEE Massima (&ge; 45.575,00 € o Domanda senza DSU):</strong> Viene garantita la quota universale minima di 57,00 € per figlio minorenne e 28,50 € per ciascun maggiorenne.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Calendario Erogazioni INPS e Gestione Conguagli
              </h3>
              <p>
                L&apos;INPS corrisponde le rate mensili mediante bonifico bancario su IBAN intestato o cointestato al genitore richiedente, generalmente tra il 15 e il 20 di ciascun mese per le rate stabili. La domanda ha validità continuativa nel tempo, eliminando l&apos;onere di rinnovo formale annuale. Tuttavia, per evitare la decadenza automatica alla tariffa minima di 57 €, il nucleo ha l&apos;obbligo di rinnovare la DSU ISEE entro la fine di febbraio di ciascun anno. Presentando la DSU entro il termine ultimo del 30 giugno, l&apos;INPS ricalcola l&apos;importo e liquida per intero gli arretrati a partire dal 1° marzo.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti sull&apos;Assegno Unico e Universale
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
