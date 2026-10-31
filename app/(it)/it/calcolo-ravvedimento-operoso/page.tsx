import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloRavvedimentoClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Ravvedimento Operoso F24 2026 : Sanzioni e Interessi Legali | Kagazo Italia',
  description:
    'Calcola sanzioni ridotte e interessi legali giornalieri per ravvedimento operoso F24 secondo l\'Art. 13 D.Lgs. 472/1997: ravvedimento sprint (0,1% al giorno), breve, medio, lungo e biennale per IRPEF, IVA, IRES e IMU.',
  keywords: [
    'calcolo ravvedimento operoso f24 online',
    'sanzioni ridotte art 13 d lgs 472 97',
    'ravvedimento sprint entro 14 giorni 0.1 al giorno',
    'calcolo interessi legali giornalieri 2026',
    'codici tributo sanzione 8901 8911 f24',
    'ravvedimento operoso imu comune codice 8918',
    'ravvedimento breve entro 30 giorni 1.5 per cento',
    'sanatoria ritardo pagamento tasse agenzia entrate',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-ravvedimento-operoso`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-ravvedimento-operoso`,
      'it': `${SITE_URL}/it/calcolo-ravvedimento-operoso`,
      'x-default': `${SITE_URL}/it/calcolo-ravvedimento-operoso`,
    },
  },
  openGraph: {
    title: 'Calcolo Ravvedimento Operoso F24 2026 | Kagazo Italia',
    description:
      'Calcolatore ufficiale sanzioni ridotte e interessi al giorno per rimediare a ritardi e omessi versamenti nel Modello F24.',
    url: `${SITE_URL}/it/calcolo-ravvedimento-operoso`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Quali sono gli scaglioni del ravvedimento operoso?',
    answer:
      'L\'Art. 13 del D.Lgs. 472/1997 prevede le seguenti fattispecie di sanzione ridotta: (1) Sprint: 0,1% per ogni giorno di ritardo se il versamento avviene entro 14 giorni; (2) Breve: 1,5% (1/10 del 15%) tra il 15° e il 30° giorno; (3) Intermedio/Medio: 1,67% (1/9 del 15%) entro 90 giorni; (4) Lungo: 3,75% (1/8 del 30%) entro il termine di presentazione della dichiarazione dell\'anno in cui la violazione è stata commessa; (5) Biennale: 4,29% (1/7 del 30%) entro l\'anno successivo; (6) Ultrabiennale: 5,0% (1/6 del 30%) oltre 2 anni.',
  },
  {
    question: 'Come si calcolano gli interessi legali nel ravvedimento operoso?',
    answer:
      'Gli interessi si calcolano applicando il saggio di interesse legale vigente giorno per giorno, con decorrenza dal giorno successivo alla scadenza originaria fino al giorno di effettivo versamento incluso. La formula è: (Imposta dovuta × Tasso legale × Giorni di ritardo) / 36.500.',
  },
  {
    question: 'Come si compila il Modello F24 per il ravvedimento?',
    answer:
      'Nel Modello F24 devono essere compilate tre righe separate: (1) l\'imposta originaria con il suo codice tributo naturale; (2) la sanzione ridotta con l\'apposito codice tributo (es. 8901 per IRPEF, 8904 per IVA, 8918 per IMU); (3) gli interessi legali maturati con il rispettivo codice tributo (es. 1989 per IRPEF, 1991 per IVA). In tutte e tre le righe va indicato lo stesso anno di riferimento del debito.',
  },
  {
    question: 'Quando non è più possibile usufruire del ravvedimento operoso?',
    answer:
      'Il ravvedimento operoso è precluso solo dalla formale notifica di un atto di liquidazione, avviso di accertamento o cartella di pagamento esattoriale emessa dall\'Agenzia delle Entrate o dall\'ente creditore. I meri accessi, ispezioni e verifiche fiscali non impediscono più il ricorso al ravvedimento operoso, sebbene con sanzioni ridotte proporzionalmente modulate.',
  },
];

export default function CalcoloRavvedimentoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Ravvedimento Operoso F24 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-ravvedimento-operoso`,
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
          'Calcola sanzioni ridotte e interessi legali per ravvedimento operoso F24 secondo l\'Art. 13 D.Lgs. 472/1997.',
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
            name: 'Ravvedimento Operoso F24',
            item: `${SITE_URL}/it/calcolo-ravvedimento-operoso`,
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
          <span className="text-sky-700 font-semibold">Ravvedimento Operoso F24</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Art. 13 D.Lgs. 472/1997 &amp; Circolari Agenzia delle Entrate</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Ravvedimento Operoso F24 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">Sanzioni Ridotte e Interessi Legali al Giorno</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> Il ravvedimento operoso consente di regolarizzare versamenti omessi o tardivi pagando una sanzione fortemente ridotta: <strong>0,1% al giorno</strong> fino a 14 giorni (ravvedimento sprint), <strong>1,5%</strong> tra 15 e 30 giorni, <strong>1,67%</strong> entro 90 giorni e <strong>3,75%</strong> entro un anno. Agli importi si sommano gli <strong>interessi legali giornalieri</strong> calcolati dal giorno successivo alla scadenza. Nel modello F24 si versano imposta, sanzione e interessi con codici tributo distinti.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloRavvedimentoClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              La Disciplina Giuridica del Ravvedimento Operoso Tributario
            </h2>
            <p>
              L&apos;istituto del <strong>ravvedimento operoso</strong> disciplinato dall&apos;<strong>Articolo 13 del Decreto Legislativo 18 dicembre 1997, n. 472</strong> permette a qualsiasi contribuente (privato, professionista o società di capitali) di sanare spontaneamente omissioni, errori e ritardi nei versamenti dei tributi erariali e locali, beneficiando di consistenti riduzioni delle sanzioni amministrative ed evitando le sanzioni piene ordinarie (pari al 30%).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">1. Il Principio di Tempestività</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Prima il contribuente sana l&apos;irregolarità, minore è l&apos;entità della sanzione: dal ravvedimento sprint con sanzione pari allo 0,1% per ogni giorno di ritardo (se saldato entro 14 giorni), fino al ravvedimento ordinario annuale con sanzione ridotta a un ottavo del minimo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">2. Versamento Contestuale Obbligatorio</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Perché il ravvedimento operoso sia giuridicamente valido ed efficace, il contribuente deve provvedere al pagamento contestuale dell&apos;imposta omessa, della sanzione ridotta e degli interessi moratori legali calcolati al giorno.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sul Ravvedimento Operoso (FAQ)
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
