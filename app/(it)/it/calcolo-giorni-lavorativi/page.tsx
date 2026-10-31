import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calendar as CalendarIcon, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloGiorniLavorativiClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Giorni Lavorativi e Festività 2026 : Scadenze Legali e Termini Civili | Kagazo Italia',
  description:
    'Calcola con precisione legale i giorni lavorativi, festivi e bancari tra due date in Italia. Include festività nazionali, Pasqua, Pasquetta, Santo Patrono e sospensione feriale Art. 155 c.p.c.',
  keywords: [
    'calcolo giorni lavorativi italia 2026',
    'conteggio giorni festivi tra due date',
    'calcolo termini processuali art 155 cpc',
    'sospensione feriale termini 1 31 agosto',
    'giorni feriali e bancari target sepa',
    'feste nazionali patrono roma milano napoli',
    'calcolo pasqua e pasquetta algoritmo',
    'proroga automatica scadenza giorno festivo',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-giorni-lavorativi`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-giorni-lavorativi`,
      'it': `${SITE_URL}/it/calcolo-giorni-lavorativi`,
      'x-default': `${SITE_URL}/it/calcolo-giorni-lavorativi`,
    },
  },
  openGraph: {
    title: 'Calcolo Giorni Lavorativi e Festività 2026 | Kagazo Italia',
    description:
      'Strumento legale per il calcolo dei giorni feriali, lavorativi e festività civili e religiose con rispetto dell\'Art. 155 c.p.c. e festività locali.',
    url: `${SITE_URL}/it/calcolo-giorni-lavorativi`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Come si calcolano i termini processuali secondo l\'Art. 155 del Codice di Procedura Civile?',
    answer:
      'Ai sensi dell\'art. 155 c.p.c., nel computo dei termini a giorni o ad ore si escludono il giorno o l\'ora iniziale (dies a quo non computatur in termino) e si computa il giorno finale (dies ad quem computatur). Se il giorno di scadenza è festivo, la scadenza è prorogata di diritto al primo giorno seguente non festivo. Per gli atti processuali svolti fuori udienza, la scadenza cade il sabato è equiparata a quella festiva con proroga al lunedì.',
  },
  {
    question: 'Che cos\'è la sospensione feriale dei termini e quando si applica?',
    answer:
      'La legge 7 ottobre 1969 n. 742, come modificata dal D.L. 132/2014, stabilisce che il decorso dei termini processuali relativi alle giurisdizioni ordinarie ed amministrative è sospeso di diritto dal 1° al 31 agosto di ciascun anno (31 giorni) e riprende a decorrere dalla fine del periodo di sospensione. Ove il decorso abbia inizio durante il periodo di sospensione, l\'inizio stesso è differito alla fine di detto periodo (1° settembre).',
  },
  {
    question: 'Quali sono le festività nazionali ufficiali in Italia riconosciute per legge?',
    answer:
      'Le festività civili e religiose con astensione dal lavoro in Italia sono: 1° Gennaio (Capodanno), 6 Gennaio (Epifania), Pasqua e Lunedì dell\'Angelo (Pasquetta), 25 Aprile (Festa della Liberazione), 1° Maggio (Festa dei Lavoratori), 2 Giugno (Festa della Repubblica), 15 Agosto (Assunzione/Ferragosto), 1° Novembre (Tutti i Santi), 8 Dicembre (Immacolata Concezione), 25 Dicembre (Natale), 26 Dicembre (Santo Stefano) e la ricorrenza del Santo Patrono del comune.',
  },
  {
    question: 'Cosa succede se una scadenza contrattuale o di pagamento cade di sabato o domenica?',
    answer:
      'Nel diritto civile (art. 1187 e 2963 c.c.) e nelle transazioni bancarie europee SEPA, se il termine scade in giorno festivo o non lavorativo (sabato e domenica per il circuito bancario TARGET2), l\'adempimento è prorogato al primo giorno lavorativo successivo senza maturazione di interessi moratori o penalità contrattuali.',
  },
];

export default function CalcoloGiorniLavorativiPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Giorni Lavorativi e Termini Legali Italia',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-giorni-lavorativi`,
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
          'Calcola giorni feriali, lavorativi e festività civili in Italia con computo Art. 155 c.p.c. e patroni comunali.',
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
            name: 'Calcolo Giorni Lavorativi',
            item: `${SITE_URL}/it/calcolo-giorni-lavorativi`,
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb Visual */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center space-x-2">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/it" className="hover:text-emerald-400 transition-colors">Italia</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Calcolo Giorni Lavorativi</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Algoritmo Calendario Civile & Computistico 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Calcolo Giorni Lavorativi, Feriali e Termini Legali
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Conteggia con esattezza il numero di giorni lavorativi (5 o 6 giorni a settimana), fine settimana e festività infrasettimanali tra due date in Italia. Integrato con calendario pasquale computistico, festività dei santi patroni e regole di proroga ex Art. 155 del Codice di Procedura Civile.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <CalendarIcon className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Operativa: Regole del Computo Temporale in Italia
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  In una settimana lavorativa standard di 5 giorni (lunedì-venerdì), l’anno civile conta mediamente tra 250 e 254 giornate lavorative nette, a seconda delle festività nazionali infrasettimanali che cadono nel fine settimana. Secondo il principio processuale <em>dies a quo non computatur in termino</em>, il primo giorno non viene computato nei termini perentori, mentre il termine finale cadente di sabato o festivo si proroga al primo giorno feriale utile.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CalcoloGiorniLavorativiClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Disciplina Giuridica dei Termini Temporali e Festività Lavorative
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Il Principio di Computo Temporale: Art. 155 c.p.c. e Art. 2963 c.c.
              </h3>
              <p>
                Nel sistema giuridico italiano, il computo dei termini temporali sia per gli atti processuali che per le obbligazioni civili segue regole inderogabili sancite dall&apos;articolo 155 del Codice di Procedura Civile e dall&apos;articolo 2963 del Codice Civile:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Esclusione del giorno iniziale (dies a quo):</strong> Non si conta il giorno nel corso del quale cade il momento iniziale dal quale comincia a decorrere il termine.
                </li>
                <li>
                  <strong>Inclusione del giorno finale (dies ad quem):</strong> Si computa per intero il giorno nel quale il termine perentorio o dilatorio viene a compimento.
                </li>
                <li>
                  <strong>Proroga di diritto del giorno festivo:</strong> Se il giorno di scadenza è festivo, la scadenza è prorogata di diritto al primo giorno seguente non festivo.
                </li>
                <li>
                  <strong>Equiparazione del sabato:</strong> La proroga al primo giorno feriale successivo si applica anche quando la scadenza cade di sabato per gli atti processuali da compiere fuori udienza.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Il Calendario delle Festività Civili e Religiose Nazionali
              </h3>
              <p>
                La legge 27 maggio 1949, n. 260 e la legge 5 marzo 1977, n. 54 regolano i giorni festivi a tutti gli effetti civili e per la chiusura dei pubblici uffici:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
                <div><strong>1 Gennaio:</strong> Capodanno</div>
                <div><strong>6 Gennaio:</strong> Epifania</div>
                <div><strong>Domenica di Pasqua:</strong> Calcolo computistico lunare</div>
                <div><strong>Lunedì dell&apos;Angelo:</strong> Pasquetta</div>
                <div><strong>25 Aprile:</strong> Festa della Liberazione</div>
                <div><strong>1 Maggio:</strong> Festa dei Lavoratori</div>
                <div><strong>2 Giugno:</strong> Festa della Repubblica</div>
                <div><strong>15 Agosto:</strong> Ferragosto / Assunzione</div>
                <div><strong>1 Novembre:</strong> Tutti i Santi</div>
                <div><strong>8 Dicembre:</strong> Immacolata Concezione</div>
                <div><strong>25 Dicembre:</strong> Natale del Signore</div>
                <div><strong>26 Dicembre:</strong> Santo Stefano</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. La Sospensione Feriale dei Termini (Legge 742/1969)
              </h3>
              <p>
                In base alla Legge 7 ottobre 1969 n. 742, modificata dall&apos;art. 16 del D.L. 132/2014, il decorso dei termini processuali davanti a qualsiasi giurisdizione civile, tributaria e amministrativa è sospeso per 31 giorni consecutivi, dal 1° al 31 agosto di ciascun anno. Se un termine ha inizio prima del 1° agosto, esso si arresta il 31 luglio e riprende a decorrere dal 1° settembre. Se un termine dovrebbe iniziare durante il mese di agosto, il conteggio decorre dal 1° settembre. Fanno eccezione i procedimenti cautelari urgenti, gli alimenti e le cause relative a fallimenti.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti sul Calcolo dei Giorni Lavorativi e Festivi
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
