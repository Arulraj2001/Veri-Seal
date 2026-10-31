import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, CreditCard, FileText, CheckCircle2 } from 'lucide-react';
import { ValidatoreIbanBancarioItaliaClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Validatore IBAN Bancario Italiano 2026 : Controllo CIN, ABI, CAB e Modulo 97-10 | Kagazo Italia',
  description:
    'Verifica online la correttezza formale e matematica dell\'IBAN bancario italiano. Controllo carattere CIN secondo l\'ABI, algoritmo internazionale ISO 7064 Mod 97-10 e identificazione della banca.',
  keywords: [
    'validatore iban bancario italia',
    'controllo cin iban bban abi cab',
    'algoritmo modulo 97 10 iso 7064',
    'verifica iban bonifico sepa sicuro',
    'riconoscimento banca codice abi sportello',
    'iban italiano 27 caratteri correttezza',
    'verifica formale coordinate bancarie',
    'controllo cifre di controllo sepa regolamento ue',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/validatore-iban-bancario-italia`,
    languages: {
      'it-IT': `${SITE_URL}/it/validatore-iban-bancario-italia`,
      'it': `${SITE_URL}/it/validatore-iban-bancario-italia`,
      'x-default': `${SITE_URL}/it/validatore-iban-bancario-italia`,
    },
  },
  openGraph: {
    title: 'Validatore IBAN Bancario Italiano | Kagazo Italia',
    description:
      'Strumento di verifica formale per IBAN italiano: validazione matematica ISO 7064, verifica CIN e identificazione istituto di credito.',
    url: `${SITE_URL}/it/validatore-iban-bancario-italia`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Quanti caratteri compongono un IBAN italiano valido?',
    answer:
      'L\'IBAN italiano ha una lunghezza rigorosa e fissa di 27 caratteri alfanumerici: 2 lettere per il codice paese (IT), 2 cifre numeriche di controllo internazionale (generate con l\'algoritmo ISO 7064 Modulo 97-10), 1 lettera per il carattere di controllo nazionale CIN, 5 cifre per il codice bancario ABI, 5 cifre per il codice di filiale CAB e 12 caratteri alfanumerici per il numero di conto corrente.',
  },
  {
    question: 'Come funziona la verifica del carattere CIN?',
    answer:
      'Il CIN (Control Internal Number) è un carattere alfabetico calcolato sui 22 caratteri successivi del BBAN (ABI, CAB e Conto Corrente). Ai caratteri in posizione pari e dispari vengono assegnati punteggi numerici prestabiliti dalla tabella ufficiale dell\'Associazione Bancaria Italiana (ABI); la somma viene divisa per 26 e il resto corrisponde alla lettera dell\'alfabeto italiano del CIN.',
  },
  {
    question: 'Cosa accade se si effettua un bonifico con un IBAN con cifra errata?',
    answer:
      'Grazie al doppio controllo di integrità (CIN e Modulo 97-10), qualsiasi errore di battitura o inversione di cifre viene rilevato istantaneamente dalla piattaforma di home banking o dall\'applicazione bancaria, impedendo la trasmissione dell\'ordine di pagamento. Nel caso in cui un IBAN digitato per errore corrisponda casualmente a un altro conto valido esistente, il bonifico viene accreditato al terzo intestatario.',
  },
  {
    question: 'I dati bancari inseriti in questo strumento rimangono privati?',
    answer:
      'Assolutamente sì. Il nostro validatore esegue tutti i calcoli matematici e gli algoritmi ISO / ABI esclusivamente nel browser del dispositivo dell\'utente (lato client) in memoria volatile. Nessun codice IBAN, numero di conto o dato sensibile viene mai salvato o inviato a server esterni.',
  },
];

export default function ValidatoreIbanBancarioItaliaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Validatore IBAN Bancario Italiano',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/validatore-iban-bancario-italia`,
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
          'Verifica la validità dell\'IBAN bancario in Italia con controllo CIN, ABI, CAB e algoritmo ISO 7064 Mod 97-10.',
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
            name: 'Validatore IBAN',
            item: `${SITE_URL}/it/validatore-iban-bancario-italia`,
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
            <span className="text-slate-200 font-medium">Validatore IBAN Bancario</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Standard ISO 13616 & Algoritmo ISO 7064 Modulo 97-10</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Validatore IBAN Bancario Italiano <br className="hidden sm:inline" />
              <span className="text-emerald-400">Verifica Algoritmo Mod 97-10, Carattere CIN & Banca ABI</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Verifica in tempo reale l&apos;esattezza matematica e la correttezza formale di qualsiasi codice IBAN italiano. Scomposizione automatica di CIN, codice ABI dell&apos;istituto, codice CAB della filiale e numero di conto corrente.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Tecnica: Struttura Ufficiale dell&apos;IBAN in Italia
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  L&apos;<strong>IBAN italiano</strong> è rigorosamente composto da <strong>27 caratteri alfanumerici</strong>: il prefisso nazionale &quot;IT&quot;, due cifre di controllo internazionali derivate dal <em>Modulo 97-10</em>, la lettera di controllo interna <strong>CIN</strong> (calcolata con algoritmo pesato ABI), 5 cifre del codice <strong>ABI</strong> dell&apos;istituto bancario, 5 cifre del codice <strong>CAB</strong> dello sportello e 12 caratteri identificativi del conto corrente. L&apos;elaborazione avviene interamente in locale nel rispetto della riservatezza dei dati finanziari.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <ValidatoreIbanBancarioItaliaClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Standard Bancari Europei e Sicurezza dei Pagamenti SEPA
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Il Quadro Regolamentare SEPA: Regolamento UE n. 260/2012
              </h3>
              <p>
                L&apos;adozione dell&apos;IBAN come identificativo univoco dei conti di pagamento nell&apos;Area Unica dei Pagamenti in Euro (SEPA) è disciplinata dal <strong>Regolamento (UE) n. 260/2012</strong> del Parlamento Europeo e del Consiglio. La normativa stabilisce i requisiti tecnici e commerciali per i bonifici e i mandati di addebito diretto in euro, eliminando le frammentazioni nazionali e garantendo che le transazioni transfrontaliere avvengano con gli stessi standard qualitativi e temporali delle operazioni domestiche.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Il Doppio Livello di Controllo Algoritmico
              </h3>
              <p>
                Nel sistema interbancario italiano, la protezione contro errori umani di digitazione è affidata a due livelli di verifica matematica reciprocamente indipendenti:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Il Carattere di Controllo CIN (Associazione Bancaria Italiana):</strong> Rappresenta una lettera dell&apos;alfabeto (da A a Z) determinata applicando una tabella di pesi a ciascuno dei 22 caratteri del BBAN. I caratteri in posizione dispari (1°, 3°, 5°...) hanno pesi specifici studiati per rilevare le inversioni più frequenti, mentre quelli in posizione pari hanno corrispondenza diretta con il loro valore ordinale.
                </li>
                <li>
                  <strong>Le Cifre di Controllo Internazionali (ISO 7064 Modulo 97-10):</strong> I primi 4 caratteri (IT e le 2 cifre) vengono posizionati al termine della stringa alfanumerica; le lettere vengono tradotte in numeri interi (A=10, B=11 ... Z=35) e la stringa risultante viene divisa per 97. Solo se il resto della divisione intera è esattamente uguale a 1 l&apos;IBAN è matematicamente integro.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Privacy e Conformità alla Direttiva PSD2
              </h3>
              <p>
                Questo strumento aderisce rigorosamente alle linee guida sulla privacy e alla direttiva europea sui servizi di pagamento (PSD2 - Direttiva UE 2015/2366). Nessuna coordinata bancaria, codice ABI, conto o codice fiscale viene archiviato, registrato su log di sistema o trasmesso a terzi, assicurando la totale riservatezza delle informazioni finanziarie dell&apos;utente.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti sulla Validazione dell&apos;IBAN
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
