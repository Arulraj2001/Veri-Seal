import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { ConvertitoreNumeriInLettereClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Convertitore Numeri in Lettere 2026 : Assegni Bancari, Contratti e Rogiti | Kagazo Italia',
  description:
    'Converti qualsiasi cifra numerica in parole secondo le regole legali italiane (Art. 9 R.D. 1736/1933). Scrittura continua senza spazi per assegni, rogiti notarili e fatture con elisioni vocali corrette.',
  keywords: [
    'convertitore numeri in lettere assegno',
    'scrivere importo assegno bancario circolare',
    'trascrizione continua numeri senza spazi',
    'art 9 rd 1736 1933 prevalenza somma lettere',
    'cifra in lettere atto notarile compravendita',
    'elisione vocale ventuno quarantotto crusca',
    'scrittura centesimi assegno barra frazione',
    'convertire euro in lettere online gratis',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/convertitore-numeri-in-lettere`,
    languages: {
      'it-IT': `${SITE_URL}/it/convertitore-numeri-in-lettere`,
      'it': `${SITE_URL}/it/convertitore-numeri-in-lettere`,
      'x-default': `${SITE_URL}/it/convertitore-numeri-in-lettere`,
    },
  },
  openGraph: {
    title: 'Convertitore Numeri in Lettere per Assegni | Kagazo Italia',
    description:
      'Strumento legale di trascrizione numerica in lettere continue per assegni, contratti e rogiti conformi alla Legge Assegno.',
    url: `${SITE_URL}/it/convertitore-numeri-in-lettere`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Perché negli assegni l\'importo in lettere si scrive senza spazi (tutto attaccato)?',
    answer:
      'La prassi bancaria e notarile italiana impone la scrittura dell\'importo in lettere in forma continua senza spazi per motivi di sicurezza antifrode. Se venissero lasciati spazi vuoti tra le parole, soggetti malintenzionati potrebbero inserire termini aggiuntivi (ad esempio anteponendo la parola "cento" davanti a "mila"), alterando la somma originariamente pattuita.',
  },
  {
    question: 'Cosa prevede la legge se la cifra in numeri differisce da quella in lettere?',
    answer:
      'L\'Articolo 9 del Regio Decreto 21 dicembre 1933, n. 1736 (Legge sull\'Assegno) statuisce espressamente che, in caso di discordanza tra la somma scritta in cifre e quella scritta in lettere, l\'assegno è valido ed esecutivo per la somma espressa in lettere. Qualora la somma sia scritta più volte in lettere o più volte in cifre, in caso di difformità prevale la somma minore.',
  },
  {
    question: 'Come devono essere scritti i centesimi e le quote decimali su un assegno?',
    answer:
      'I centesimi devono essere espressi in cifre numeriche separati da una barra diagonale posta subito dopo la parola in lettere continua (es. "duemilatrecento/50"). Se l\'importo è tondo e non presenta centesimi, è comunque obbligatorio apporre "/00" dopo la parola (es. "millecinquecento/00") per impedire aggiunte postume.',
  },
  {
    question: 'Quali sono le regole grammaticali di elisione nei numerali composti in italiano?',
    answer:
      'Secondo le regole ortografiche dell\'Accademia della Crusca, nei composti con venti, trenta, quaranta, cinquanta, ecc., la vocale finale della decina cade prima di "uno" e di "otto" (es. ventuno, trentotto, quarantuno, cinquantotto). La parola "cento", invece, non perde la vocale davanti a otto (centootto), salvo rari arcaismi.',
  },
];

export default function ConvertitoreNumeriInLetterePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Convertitore Numeri in Lettere per Assegni e Rogiti',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/convertitore-numeri-in-lettere`,
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
          'Trascrive cifre numeriche in lettere in forma continua senza spazi secondo l\'Art. 9 R.D. 1736/1933 e prassi notarile.',
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
            name: 'Convertitore Numeri in Lettere',
            item: `${SITE_URL}/it/convertitore-numeri-in-lettere`,
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
            <span className="text-slate-200 font-medium">Convertitore Numeri in Lettere</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Art. 9 R.D. 1736/1933 (Legge Assegno) & Prassi Notarile L. 89/1913</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Convertitore Numeri in Lettere per Assegni e Contratti <br className="hidden sm:inline" />
              <span className="text-emerald-400">Trascrizione Giuridica Continua Senza Spazi</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Trascrivi qualsiasi somma in euro in parole secondo le norme dell&apos;ordinamento giuridico italiano per la compilazione di assegni bancari, assegni circolari, contratti e rogiti notarili di compravendita immobiliare.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Giuridica: Regole di Trascrizione della Somma in Lettere
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  L&apos;<strong>Articolo 9 del Regio Decreto 1736/1933</strong> stabilisce il principio cardine secondo cui in caso di discordanza tra l&apos;importo in numeri e quello in lettere, <em>prevale in ogni caso la somma scritta in lettere</em>. Nella prassi bancaria e commerciale la dicitura va redatta come un&apos;unica parola continua priva di spazi, separando i centesimi tramite barra obliqua (es. <em>tremilaquattrocentocinquanta/50</em> o <em>/00</em> se non vi sono centesimi), applicando le corrette elisioni vocaliche prima di uno e otto.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <ConvertitoreNumeriInLettereClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Disciplina della Trascrizione dei Valori negli Atti Giuridici e Titoli di Credito
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. La Tutela della Certezza nei Titoli di Credito: Regio Decreto n. 1736/1933
              </h3>
              <p>
                Nel diritto commerciale italiano, l&apos;assegno bancario e l&apos;assegno circolare sono titoli formali e completi destinati alla circolazione monetaria fiduciaria. L&apos;articolo 9 della Legge sull&apos;Assegno introduce una presunzione legale assoluta a tutela del prenditore del titolo:
              </p>
              <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic text-slate-200">
                &quot;Se la somma da pagare è scritta in lettere ed in cifre, l&apos;assegno bancario vale, in caso di discordanza, per la somma indicata in lettere.&quot;
              </blockquote>
              <p>
                Tale precetto risponde al principio per cui la stesura per esteso delle parole richiede un grado di attenzione e ponderazione superiore rispetto alla digitazione numerica delle cifre, minimizzando il rischio di refusi materiali o distrazioni.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. La Tecnica della Scrittura Continua Antifrode
              </h3>
              <p>
                La tradizione secolare del notariato italiano (Legge 16 febbraio 1913, n. 89) e le norme operative dell&apos;Associazione Bancaria Italiana (ABI) prescrivono che i numerali vengano saldati insieme senza soluzione di continuità. Lasciare spaziature (es. &quot;tre mila&quot; anziché &quot;tremila&quot;) permetterebbe la falsificazione del titolo mediante interpolazione di sostantivi o aggettivi moltiplicatori, alterando la volontà originaria dell&apos;emittente.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Regole Fonetiche ed Elisioni Vocaliche
              </h3>
              <p>
                La lingua italiana prevede norme fonotattiche precise per i composti numerici cardinali:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Troncamento della vocale finale della decina:</strong> Quando la decina è seguita da &quot;uno&quot; o &quot;otto&quot;, la vocale finale elide sistematicamente (ventuno, quarantotto, settantuno).
                </li>
                <li>
                  <strong>Mantenimento con &quot;tre&quot;:</strong> I composti con tre (es. ventitré, quarantatré) mantengono la vocale della decina e richiedono l&apos;accento acuto finale sulla &quot;e&quot; nella scrittura disgiunta formale.
                </li>
                <li>
                  <strong>Miliardi e Milioni:</strong> A differenza di &quot;mille&quot; che diventa &quot;mila&quot; al plurale, &quot;milione&quot; e &quot;miliardo&quot; conservano la desinenza flessiva regolare &quot;milioni&quot; e &quot;miliardi&quot;.
                </li>
              </ul>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti sulla Conversione Numerica in Lettere
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
