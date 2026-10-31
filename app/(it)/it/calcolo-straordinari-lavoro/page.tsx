import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloStraordinariClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Lavoro Straordinario 2026 : Maggiorazioni CCNL e Netto Busta Paga | Kagazo Italia',
  description:
    'Calcola la tariffa oraria e il compenso netto per lavoro straordinario diurno, notturno e festivo secondo il D.Lgs. 66/2003 e i contratti collettivi CCNL Commercio (168) e Metalmeccanico (173).',
  keywords: [
    'calcolo compenso lavoro straordinario busta paga',
    'maggiorazioni orarie straordinari ccnl commercio',
    'divisore orario metalmeccanico 173 terziario 168',
    'straordinario notturno festivo percentuale maggiorazione',
    'limite massimo 250 ore straordinario annue legge',
    'tassazione straordinari irpef inps dipendente',
    'paga oraria calcolo da stipendio lordo mensile',
    'd lgs 66 2003 orario di lavoro straordinari',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-straordinari-lavoro`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-straordinari-lavoro`,
      'it': `${SITE_URL}/it/calcolo-straordinari-lavoro`,
      'x-default': `${SITE_URL}/it/calcolo-straordinari-lavoro`,
    },
  },
  openGraph: {
    title: 'Calcolo Lavoro Straordinario 2026 | Kagazo Italia',
    description:
      'Simulatore ufficiale compenso straordinari diurni, festivi e notturni: divisori contrattuali, maggiorazioni CCNL e netto in busta paga.',
    url: `${SITE_URL}/it/calcolo-straordinari-lavoro`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Come si calcola la paga oraria per il lavoro straordinario?',
    answer:
      'Si divide la retribuzione mensile lorda di fatto (stipendio base, contingenza, scatti e terzi elementi) per il divisore contrattuale previsto dal proprio CCNL (168 per il Commercio e Terziario, 173 per i Metalmeccanici). Alla paga oraria ordinaria risultante si applica la percentuale di maggiorazione prevista dal contratto per la tipologia di straordinario svolto.',
  },
  {
    question: 'Qual è il limite massimo di ore di straordinario consentite per legge?',
    answer:
      'L\'Articolo 5 del Decreto Legislativo 8 aprile 2003, n. 66 fissa il limite massimo annuale di lavoro straordinario in 250 ore per ciascun lavoratore, a meno che i contratti collettivi nazionali di categoria (CCNL) non stabiliscano limiti diversi. Inoltre, la durata media settimanale dell\'orario di lavoro non può superare le 48 ore comprensive dello straordinario, calcolate su un periodo di riferimento di 4 mesi.',
  },
  {
    question: 'Quali sono le percentuali di maggiorazione tipiche nei CCNL?',
    answer:
      'Nel CCNL Commercio e Terziario le maggiorazioni sono: 15% per straordinario diurno feriale (prime 8 ore settimanali), 30% per straordinario festivo o notturno non festivo, 50% per notturno festivo. Nel CCNL Metalmeccanico Industria le maggiorazioni sono più elevate: 25% per diurno feriale (prime 2 ore), 30% per le ore successive, 50% per festivo e fino al 65% per straordinario festivo notturno.',
  },
  {
    question: 'Come vengono tassati gli straordinari in busta paga?',
    answer:
      'I compensi per lavoro straordinario sono assoggettati alla normale contribuzione previdenziale a carico del lavoratore (9,19% INPS) e concorrono integralmente all\'imponibile fiscale IRPEF, venendo tassati all\'aliquota marginale del lavoratore (23%, 35% o 43%), a meno che non siano vigenti misure di detassazione agevolata sui premi di produttività.',
  },
];

export default function CalcoloStraordinariPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Lavoro Straordinario Italia 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-straordinari-lavoro`,
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
          'Calcola il compenso orario e netto per straordinario diurno, festivo e notturno secondo il D.Lgs. 66/2003 e i contratti CCNL.',
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
            name: 'Calcolo Straordinari Lavoro',
            item: `${SITE_URL}/it/calcolo-straordinari-lavoro`,
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
          <span className="text-sky-700 font-semibold">Calcolo Straordinari</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>D.Lgs. 8 aprile 2003, n. 66 &amp; Contrattazione Collettiva CCNL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Lavoro Straordinario 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">Maggiorazioni CCNL Commercio e Metalmeccanici</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Giuridica Diretta:</strong> La retribuzione per lavoro straordinario si determina calcolando la quota oraria ordinaria (stipendio mensile lordo diviso per il parametro orario contrattuale, es. <strong>168</strong> nel CCNL Terziario o <strong>173</strong> nel Metalmeccanico) a cui si somma la percentuale di maggiorazione: dal <strong>15% al 25%</strong> per lavoro feriale diurno, dal <strong>30% al 50%</strong> per festivo o notturno, e fino al <strong>65%</strong> per notturno festivo. Il limite massimo legale è di <strong>250 ore annue</strong> per lavoratore.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloStraordinariClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Disciplina Giuridica e Limiti del Lavoro Straordinario in Italia
            </h2>
            <p>
              Il lavoro straordinario è la prestazione lavorativa svolta oltre il normale orario di lavoro settimanale fissato dalla legge in 40 ore (Art. 3 D.Lgs. 66/2003). La legge stabilisce che il ricorso al lavoro straordinario deve essere contenuto e utilizzato solo per esigenze tecniche e organizzative eccezionali e indifferibili.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">1. I Divisori Contrattuali Ufficiali</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Per calcolare la paga oraria di un dipendente mensilizzato, non si divide lo stipendio per le ore effettivamente lavorate nel mese, bensì per un divisore convenzionale fisso stabilito dal contratto collettivo nazionale applicato (es. 168 per Commercio/Terziario, 173 per Metalmeccanici Industria, 172 per Chimici).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">2. Riposo Compensativo e Banca Ore</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                I contratti collettivi possono consentire al lavoratore di optare, in alternativa o in combinazione con il pagamento della sola maggiorazione, per il godimento di riposi compensativi orari accantonati in un&apos;apposita &quot;banca delle ore&quot; da fruire entro determinati termini.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sul Calcolo degli Straordinari (FAQ)
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
