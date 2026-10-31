import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloStipendioNettoClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Stipendio Netto 2026 : da RAL a Netto Mensile con Nuova IRPEF | Kagazo Italia',
  description:
    'Calcola lo stipendio netto mensile partendo dalla RAL annua lorda secondo la Riforma IRPEF 2026 (D.Lgs. 216/2023), contributi INPS dipendente (9,19%), addizionali regionali e detrazioni per lavoro.',
  keywords: [
    'calcolo stipendio netto 2026',
    'da ral a netto mensile',
    'scaglioni irpef 2026',
    'contributi inps dipendente 9.19',
    'detrazioni lavoro dipendente tuir',
    'calcolo tredicesima netta',
    'stipendio netto ccnl commercio metalmeccanici',
    'simulatore busta paga netta',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-stipendio-netto`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-stipendio-netto`,
      'it': `${SITE_URL}/it/calcolo-stipendio-netto`,
      'x-default': `${SITE_URL}/it/calcolo-stipendio-netto`,
    },
  },
  openGraph: {
    title: 'Calcolo Stipendio Netto 2026 : da RAL a Netto Mensile | Kagazo Italia',
    description:
      'Simulatore ufficiale stipendio netto mensile e costo aziendale secondo la Riforma Fiscale IRPEF e tabelle INPS 2026.',
    url: `${SITE_URL}/it/calcolo-stipendio-netto`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Perché la tredicesima o quattordicesima è più bassa del netto ordinario?',
    answer:
      'La tredicesima mensilità (e la quattordicesima se prevista dal CCNL) non beneficia delle detrazioni per lavoro dipendente né delle detrazioni per familiari a carico, che vengono ripartite esclusivamente sulle 12 mensilità ordinarie. Di conseguenza, l’IRPEF applicata è calcolata per intero alla propria aliquota marginale, risultando in un netto leggermente inferiore a parità di lordo mensile.',
  },
  {
    question: 'Come influisce l’Assegno Unico e Universale sullo stipendio?',
    answer:
      'Dal marzo 2022, le vecchie detrazioni per figli a carico minori di 21 anni e gli Assegni al Nucleo Familiare (ANF) in busta paga sono stati sostituiti dall’Assegno Unico Universale erogato direttamente dall’INPS sul conto corrente bancario del genitore richiedente. In busta paga restano unicamente le detrazioni per figli di età pari o superiore a 21 anni ancora fiscalmente a carico.',
  },
  {
    question: 'Qual è la soglia della No-Tax Area per i lavoratori dipendenti?',
    answer:
      'Con la riforma fiscale, la soglia di reddito annuo al di sotto della quale l’imposta dovuta è pari a zero (grazie all’integrale assorbimento dell’IRPEF lorda da parte delle detrazioni da lavoro) è stata innalzata a 8.500 euro annui, allineando i dipendenti alla no-tax area dei pensionati.',
  },
  {
    question: 'Qual è la differenza tra RAL e Costo Aziendale Totale?',
    answer:
      'La Retribuzione Annua Lorda (RAL) è il compenso lordo pattuito nel contratto di lavoro tra azienda e dipendente. Il Costo Aziendale Totale include, oltre alla RAL, la quota dei contributi previdenziali e assistenziali INPS e INAIL a carico del datore di lavoro (~30%) e la quota annuale accantonata per il Trattamento di Fine Rapporto (TFR, circa 7,41%).',
  },
];

export default function CalcoloStipendioNettoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Stipendio Netto Italia 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-stipendio-netto`,
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
          'Calcola lo stipendio netto mensile partendo dalla RAL annua lorda secondo la Riforma IRPEF D.Lgs. 216/2023, contributi INPS e addizionali regionali.',
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
            name: 'Calcolo Stipendio Netto',
            item: `${SITE_URL}/it/calcolo-stipendio-netto`,
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
          <span className="text-sky-700 font-semibold">Calcolo Stipendio Netto</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Riforma IRPEF D.Lgs. 216/2023 &amp; Tabelle INPS 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Stipendio Netto 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">da RAL Lorda a Busta Paga Mensile</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> Per calcolare lo stipendio netto in Italia si sottrae dalla Retribuzione Annua Lorda (RAL) il contributo previdenziale <strong>INPS del 9,19%</strong> a carico del dipendente. Sull’imponibile risultante si applicano le <strong>3 aliquote IRPEF 2026</strong> (23% fino a 28.000 €, 35% tra 28.001 € e 50.000 €, 43% oltre 50.000 €), sottraendo le detrazioni da lavoro dipendente (fino a 1.955 €) e sommando le addizionali regionale e comunale. Il netto annuale viene poi diviso per 13 o 14 mensilità.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloStipendioNettoClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* 800+ Words Statutory Legal & Mathematical Guide */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Come Funziona il Calcolo dello Stipendio Netto in Italia (2026)
            </h2>
            <p>
              La determinazione dello stipendio netto mensile partendo dalla <strong>Retribuzione Annua Lorda (RAL)</strong> rappresenta uno dei calcoli fiscali più frequenti e cruciali per lavoratori dipendenti, candidati in sede di colloquio e datori di lavoro. In Italia, la busta paga è regolata da norme giuslavoristiche e tributarie multilivello: il <strong>Testo Unico delle Imposte sui Redditi (TUIR - D.P.R. 917/1986)</strong>, la <strong>Riforma IRPEF a 3 scaglioni</strong> introdotta dal <em>Decreto Legislativo n. 216/2023</em> e confermata dalla Legge di Bilancio, le tabelle contributive INPS e le delibere degli enti locali per le addizionali regionali e comunali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                <span>1. Contributi INPS a Carico del Lavoratore</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Prima di applicare qualsiasi imposta fiscale, la retribuzione lorda viene decurtata dei contributi previdenziali e assistenziali versati all’INPS. Per i contratti di lavoro subordinato ordinari (a tempo indeterminato o determinato), l’aliquota a carico del lavoratore è pari al <strong>9,19%</strong> (che sale al 9,49% per aziende con Fondo Integrazione Salariale FIS). Per i contratti di apprendistato, la quota agevolata ammonta al <strong>5,84%</strong>. La cifra risultante costituisce l’<strong>Imponibile Fiscale</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                <span>2. I 3 Nuovi Scaglioni IRPEF 2026</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Il D.Lgs. 216/2023 ha accorpato i primi due scaglioni di reddito, riducendo le aliquote progressive a tre fasce:
              </p>
              <ul className="text-xs font-mono space-y-1 text-slate-700 pt-1">
                <li>• Fino a 28.000 €: <strong>23%</strong></li>
                <li>• Da 28.001 € a 50.000 €: <strong>35%</strong></li>
                <li>• Oltre 50.000 €: <strong>43%</strong></li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Esempio Pratico di Calcolo Reale su RAL di 30.000 € (13 Mensilità)
            </h3>
            <p>
              Consideriamo un lavoratore dipendente residente a Milano (Lombardia) con contratto a tempo indeterminato e una RAL di <strong>30.000 €</strong> distribuita in 13 mensilità:
            </p>
            <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-2">
              <div>1. Contributi INPS dipendente: 30.000 € &times; 9,19% = <strong>2.757,00 €</strong></div>
              <div>2. Imponibile Fiscale: 30.000 € &minus; 2.757,00 € = <strong>27.243,00 €</strong></div>
              <div>3. IRPEF Lorda: 27.243,00 € rientra interamente nel 1° scaglione (23%) = <strong>6.265,89 €</strong></div>
              <div>4. Detrazione Lavoro Dipendente (Art. 13 TUIR): 1.910 + 1.190 &times; [(28.000 &minus; 27.243) / 13.000] = <strong>1.979,29 €</strong></div>
              <div>5. IRPEF Netta: 6.265,89 € &minus; 1.979,29 € = <strong>4.286,60 €</strong></div>
              <div>6. Addizionale Regionale (1,23%): <strong>335,09 €</strong> | Addizionale Comunale (0,8%): <strong>217,94 €</strong></div>
              <div className="pt-2 border-t border-slate-700 text-sky-400 font-bold">
                Totale Netto Annuo: 30.000 &minus; 2.757 &minus; 4.286,60 &minus; 335,09 &minus; 217,94 = 22.403,37 €
              </div>
              <div className="text-white font-bold">
                Stipendio Netto Mensile (13 mensilità): 22.403,37 € / 13 = 1.723,34 € netti / mese
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sul Calcolo Stipendio (FAQ)
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
