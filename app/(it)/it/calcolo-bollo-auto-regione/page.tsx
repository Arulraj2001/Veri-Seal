import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Car, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloBolloAutoRegioneClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Bollo Auto e Superbollo 2026 : Tariffe Regionali, kW/CV e Classe Euro | Kagazo Italia',
  description:
    'Calcola la tassa automobilistica regionale e il Superbollo erariale per kW o CV secondo il D.P.R. 39/1953 e D.L. 201/2011. Include addizionali regionali, scaglioni anzianità e sconto domiciliazione.',
  keywords: [
    'calcolo bollo auto regione 2026',
    'calcolatore superbollo oltre 185 kw f24 3364',
    'tariffe bollo lombardia lazio campania piemonte veneto',
    'conversione kw cv cavalli tassa automobilistica',
    'sconto domiciliazione bancaria 15 percento bollo',
    'esenzione bollo auto elettriche ibride gpl metano',
    'riduzione superbollo 5 10 15 20 anni immatricolazione',
    'scadenza pagamento bollo auto pagopa aci',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-bollo-auto-regione`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-bollo-auto-regione`,
      'it': `${SITE_URL}/it/calcolo-bollo-auto-regione`,
      'x-default': `${SITE_URL}/it/calcolo-bollo-auto-regione`,
    },
  },
  openGraph: {
    title: 'Calcolo Bollo Auto e Superbollo 2026 | Kagazo Italia',
    description:
      'Simulatore tributario ufficiale tassa automobilistica: tariffe regionali per kW/CV, classe Euro, addizionali e Superbollo.',
    url: `${SITE_URL}/it/calcolo-bollo-auto-regione`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Come si calcola la tassa automobilistica (Bollo Auto)?',
    answer:
      'Il bollo auto si calcola moltiplicando la potenza del veicolo espressa in kilowatt (kW) per la tariffa regionale unitaria corrispondente alla classe ambientale Euro del mezzo (da Euro 0 a Euro 6). Fino a 100 kW si applica la tariffa ordinaria di base (es. 2,58 €/kW per Euro 4, 5 e 6); per i kW eccedenti la soglia di 100 kW si applica una tariffa maggiorata (3,87 €/kW), su cui ciascuna Regione può deliberare addizionali fino al 10% o sconti specifici.',
  },
  {
    question: 'Che cos\'è il Superbollo e come viene ridotto con gli anni?',
    answer:
      'Il Superbollo (introdotto dall\'art. 23 del D.L. 201/2011) è un\'addizionale erariale di 20,00 euro per ogni kilowatt di potenza eccedente i 185 kW (circa 252 CV). L\'importo si riduce progressivamente in base all\'anzianità dalla data di prima immatricolazione: si riduce al 60% (12 €/kW) dopo 5 anni, al 30% (6 €/kW) dopo 10 anni, al 15% (3 €/kW) dopo 15 anni e si azzera completamente dopo 20 anni.',
  },
  {
    question: 'Come si versa il Superbollo rispetto al bollo ordinario?',
    answer:
      'Mentre il bollo auto regionale si paga comodamente tramite il circuito PagoPA, tabaccherie convenzionate, home banking o sportelli ACI, il Superbollo è un tributo erariale statale e deve essere obbligatoriamente versato all\'Agenzia delle Entrate tramite Modello F24 "Elementi Identificativi" utilizzando il codice tributo 3364, con codice regione e targa del veicolo.',
  },
  {
    question: 'Quali esenzioni sono previste per le auto elettriche e ibride?',
    answer:
      'I veicoli a propulsione esclusivamente elettrica godono di un\'esenzione dal bollo auto per i primi 5 anni dalla data di prima immatricolazione su tutto il territorio nazionale. Successivamente, in molte regioni corrispondono un quarto della tariffa prevista per i corrispondenti veicoli a benzina. Regioni virtuose come la Lombardia e il Piemonte hanno deliberato l\'esenzione a vita per le vetture 100% elettriche.',
  },
];

export default function CalcoloBolloAutoRegionePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Bollo Auto e Superbollo Italia 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-bollo-auto-regione`,
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
          'Calcola il bollo auto regionale e il superbollo erariale in base a potenza (kW/CV), classe ecologica e delibere regionali.',
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
            name: 'Calcolo Bollo Auto',
            item: `${SITE_URL}/it/calcolo-bollo-auto-regione`,
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
            <span className="text-slate-200 font-medium">Calcolo Bollo Auto</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>D.P.R. 39/1953 & D.L. 201/2011 Superbollo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Calcolo Bollo Auto e Superbollo Regionale <br className="hidden sm:inline" />
              <span className="text-emerald-400">Tariffa per kW/CV, Classe Euro ed Esenzioni</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Calcola l&apos;importo della tassa automobilistica regionale e dell&apos;addizionale erariale (Superbollo) dovuta per la tua autovettura, tenendo conto delle delibere delle singole Regioni, della classe ecologica e degli sconti per domiciliazione bancaria.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Car className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Tributaria: Funzionamento del Bollo Auto e del Superbollo
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Il <strong>Bollo Auto</strong> è una tassa di possesso regionale dovuta annualmente da chi risulta intestatario del mezzo al PRA all&apos;ultimo giorno utile per il pagamento. L&apos;importo è calcolato sui <strong>kW</strong> (1 kW = 1,35962 CV): per Euro 4, 5 e 6 la tariffa base è di <strong>2,58 €/kW fino a 100 kW</strong> e di <strong>3,87 €/kW per la quota eccedente</strong>, soggetta ad addizionali regionali (fino a +10% in Lazio, Campania e Toscana) o a sconti (15% per domiciliazione in Lombardia). Per auto con oltre <strong>185 kW (252 CV)</strong> si applica il <strong>Superbollo statale di 20 € per ogni kW eccedente</strong>, con abbattimento graduale per anzianità fino all&apos;azzeramento dopo 20 anni.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CalcoloBolloAutoRegioneClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Disciplina Giuridica e Fiscale della Tassa Automobilistica
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Natura Giuridica del Tributo: Da Tassa di Circolazione a Tassa di Possesso
              </h3>
              <p>
                In origine istituita dal Testo Unico approvato con D.P.R. 5 febbraio 1953, n. 39 come tassa dovuta per la circolazione su strada pubblica, l&apos;imposta automobilistica è stata trasformata dall&apos;articolo 5 del D.L. 953/1982 in <strong>tassa sulla proprietà del veicolo</strong>, legata alla mera iscrizione del bene mobile registrato presso il Pubblico Registro Automobilistico (PRA), a prescindere dal suo effettivo utilizzo su strada.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Il Meccanismo del Superbollo Erariale (Art. 23 D.L. 201/2011)
              </h3>
              <p>
                La misura straordinaria istituita con la manovra economica &quot;Salva Italia&quot; colpisce le autovetture e gli autoveicoli ad alte prestazioni con potenza superiore a 185 chilowatt:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Soglia di Rilevanza:</strong> 185 kW, corrispondenti esattamente a 251,53 cavalli vapore. Per i primi 185 kW si applica unicamente il bollo regionale ordinario.
                </li>
                <li>
                  <strong>Tariffa Unitari Erariale:</strong> 20,00 euro per ciascun kW eccedente la soglia dei 185 kW per le vetture nuove o immatricolate da non più di 5 anni.
                </li>
                <li>
                  <strong>Degressività per Invecchiamento:</strong> La legge prevede quattro scaglioni quinquennali: decorso il quinquennio la tariffa scende al 60% (12 €/kW); trascorsi 10 anni scende al 30% (6 €/kW); trascorsi 15 anni scende al 15% (3 €/kW); trascorsi vent&apos;anni dalla data di prima costruzione o immatricolazione l&apos;addizionale si azzera completamente.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Regime delle Sanzioni e Ravvedimento Operoso
              </h3>
              <p>
                Il mancato o tardivo pagamento del bollo auto comporta l&apos;applicazione delle sanzioni amministrative tributarie ex D.Lgs. 472/1997. Con il ravvedimento operoso il contribuente può regolarizzare spontaneamente la posizione con sanzioni ridotte (dallo 0,1% giornaliero nei primi 14 giorni, fino al 3,75% entro un anno e al 5% entro due anni), oltre agli interessi legali di mora calcolati giorno per giorno. Qualora il bollo non venga pagato per tre anni consecutivi, l&apos;ente impositore avvia la procedura di cancellazione d&apos;ufficio del veicolo dagli archivi del PRA, con conseguente ritiro della carta di circolazione e delle targhe da parte degli organi di polizia stradale.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti su Bollo Auto e Superbollo
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
