import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  Home,
  FileText,
  Percent,
  Coins,
  Scale,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Car,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Utilità e Calcolatori Ufficiali Italia 2026 | Fisco, Lavoro e Casa',
  description:
    'Portale di 20 calcolatori statutari gratuiti per l\'Italia: Stipendio Netto 2026, Calcolo TFR, IMU con modello F24, Regime Forfettario, Prima Casa e Foto CIE 35x45.',
  alternates: {
    canonical: `${SITE_URL}/it`,
  },
};

export default function ItalianHubPage() {
  const categories = [
    {
      id: 'fisco-lavoro',
      title: '1. Fisco, Lavoro & Stipendi',
      description: 'Calcoli conformi alla Riforma IRPEF (D.Lgs. 216/2023), Art. 2120 c.c. (TFR), aliquote INPS e contratti CCNL.',
      icon: Briefcase,
      tools: [
        {
          title: 'Calcolo Stipendio Netto 2026',
          desc: 'Simula dal lordo annuale (RAL) il netto mensile in 13 o 14 mensilità con 3 aliquote IRPEF e addizionali.',
          href: '/it/calcolo-stipendio-netto',
          badge: 'Top 150k+',
        },
        {
          title: 'Calcolo TFR Netto e Lordo',
          desc: 'Trattamento di Fine Rapporto secondo l\'Art. 2120 c.c., rivalutazione ISTAT e tassazione separata.',
          href: '/it/calcolo-tfr-fine-rapporto',
          badge: 'Art. 2120 c.c.',
        },
        {
          title: 'Fattura Regime Forfettario 2026',
          desc: 'Coefficiente di redditività ATECO, imposta sostitutiva 5% o 15%, rivalsa INPS 4% e marca da bollo 2€.',
          href: '/it/fattura-regime-forfettario',
          badge: 'Legge 190/2014',
        },
        {
          title: 'Calcolo Pensione Quota 103 e Anticipata',
          desc: 'Verifica requisiti anagrafici e contributivi (41 anni contributi + 62 anni età) e tetto massimo provvisorio.',
          href: '/it/calcolo-pensione-anticipata',
          badge: 'INPS 2026',
        },
        {
          title: 'Calcolo Straordinari e Maggiorazioni CCNL',
          desc: 'Tariffa oraria base con maggiorazioni diurne (+15%), festive (+50%) e notturne (+65%) per Commercio e Metalmeccanici.',
          href: '/it/calcolo-straordinari-lavoro',
          badge: 'CCNL',
        },
      ],
    },
    {
      id: 'casa-immobili',
      title: '2. Casa, Immobili & Tasse Comunali',
      description: 'Simulatori per IMU catastale, imposte rogito prima casa, aggiornamento affitti e rendimento locativo.',
      icon: Home,
      tools: [
        {
          title: 'Calcolo IMU e Generatore Dati Modello F24',
          desc: 'Rendita catastale rivalutata del 5%, moltiplicatore 160, detrazione prima casa e codici tributo F24 3918/3912.',
          href: '/it/calcolo-imu-f24',
          badge: 'Scadenze Giu/Dic',
        },
        {
          title: 'Imposte Acquisto Prima Casa e Rogito',
          desc: 'Prezzo-valore catastale con imposta di registro 2% (prima casa) o 9% (seconda casa) e imposte fisse 50€.',
          href: '/it/calcolo-imposte-acquisto-casa',
          badge: 'Notaio & Fisco',
        },
        {
          title: 'Adeguamento Canone Affitto ISTAT (Indice FOI)',
          desc: 'Variazione ISTAT FOI al 100% o 75% per contratti 4+4 e canone concordato 3+2 secondo legge 431/98.',
          href: '/it/adeguamento-affitto-istat',
          badge: 'Indice ISTAT',
        },
        {
          title: 'Rendimento Locativo Netto & Cedolare Secca',
          desc: 'Confronto Cedolare Secca 21% (libero) o 10% (concordato) vs IRPEF ordinaria, dedotta IMU e spese.',
          href: '/it/calcolo-rendimento-locativo-cedolare',
          badge: 'Affitti 2026',
        },
        {
          title: 'Calcolo Plusvalenza Cessione Immobile (Under 5 Anni)',
          desc: 'Plusvalenza tassabile Art. 67 TUIR con imposta sostitutiva del 26% o tassazione ordinaria.',
          href: '/it/calcolo-plusvalenza-immobiliare',
          badge: 'Art. 67 TUIR',
        },
      ],
    },
    {
      id: 'previdenza-finanza',
      title: '3. Previdenza, Aziende & Diritto Commerciale',
      description: 'Ravvedimento operoso sanzioni F24, verifica partite IVA e codici fiscali, interessi legali e assegno unico.',
      icon: Building2,
      tools: [
        {
          title: 'Calcolo Ravvedimento Operoso F24',
          desc: 'Sanzioni ridotte Sprint, Breve, Medio, Lungo e interessi legali calcolati al giorno (Art. 13 D.Lgs. 472/97).',
          href: '/it/calcolo-ravvedimento-operoso',
          badge: 'D.Lgs. 472/97',
        },
        {
          title: 'Verifica Partita IVA e Codice Fiscale',
          desc: 'Verifica cifre di controllo Modulo 10 Agenzia Entrate e decodifica anagrafica comune del Codice Fiscale.',
          href: '/it/verifica-partita-iva-codice-fiscale',
          badge: 'Algoritmo Ufficiale',
        },
        {
          title: 'Calcolo Interessi Legali e Moratori Commerciali',
          desc: 'Interessi legali Art. 1284 c.c. e interessi moratori B2B D.Lgs. 231/2002 con maggiorazione 8 punti BCE.',
          href: '/it/calcolo-interessi-legali-mora',
          badge: 'D.Lgs. 231/02',
        },
        {
          title: 'Calcolo Giorni Lavorativi e Festività Nazionali',
          desc: 'Conteggio esatto giorni feriali ed esclusioni festività civili italiane e patroni locali.',
          href: '/it/calcolo-giorni-lavorativi',
          badge: 'Calendario Civile',
        },
        {
          title: 'Calcolo Assegno Unico e Universale Figli (INPS)',
          desc: 'Scaglioni ISEE da 199,40€ a 57€ mensili per figlio con maggiorazioni disabilità e nuclei numerosi.',
          href: '/it/calcolo-assegno-unico-inps',
          badge: 'Tabelle INPS',
        },
      ],
    },
    {
      id: 'documenti',
      title: '4. Documenti, Pubblica Amministrazione & Mobilità',
      description: 'Foto CIE conformi ICAO, compressione documenti PA, validatore IBAN bancario e calcolo bollo auto.',
      icon: FileText,
      tools: [
        {
          title: 'Foto Tessera Carta Identità Elettronica (CIE 35×45 mm)',
          desc: 'Padroneggiato standard ICAO Ministero dell\'Interno con ritaglio biometrico e foglio 10x15 da 4 foto.',
          href: '/it/foto-tessera-cie-passaporto',
          badge: 'Standard CIE/ICAO',
        },
        {
          title: 'Compressore PDF per Pubblica Amministrazione (< 2 MB)',
          desc: 'Ottimizza file per portali INPS, Agenzia delle Entrate e Giustizia Civile senza perdere nitidezza.',
          href: '/it/compressore-pdf-pubblica-amministrazione',
          badge: 'Sotto 2MB',
        },
        {
          title: 'Validatore IBAN Bancario Italiano & Estero',
          desc: 'Controllo ISO 7064 Mod 97-10, carattere CIN, codice ABI (banca) e CAB (sportello bancario).',
          href: '/it/validatore-iban-bancario-italia',
          badge: 'ABI / CAB',
        },
        {
          title: 'Calcolo Bollo Auto e Superbollo per Regione',
          desc: 'Tariffa kW o CV in base alla classe Euro ambientale (Euro 6 a Euro 0) e superbollo 20€/kW oltre 185 kW.',
          href: '/it/calcolo-bollo-auto-regione',
          badge: 'Regioni 2026',
        },
        {
          title: 'Convertitore Numeri in Lettere per Assegni e Contratti',
          desc: 'Trascrizione automatica importi in testo formale continuo senza spazi per assegni e atti notarili.',
          href: '/it/convertitore-numeri-in-lettere',
          badge: 'Testo Continuo',
        },
      ],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Portale Ufficiale Italia 2026</span>
          <span className="text-sky-300">•</span>
          <span className="font-mono">20 Calcolatori Statutari</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolatori e Utilità Statutarie <br className="hidden sm:inline" />
          <span className="text-sky-600">per Cittadini, Professionisti e Imprese</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Suite completa e indipendente di 20 strumenti di calcolo conformi alla normativa vigente: D.Lgs. 216/2023 (Riforma IRPEF), Art. 2120 Codice Civile (TFR), TUIR e disposizioni dell’Agenzia delle Entrate e dell’INPS. Nessun dato lascia il tuo dispositivo.
        </p>

        {/* E-E-A-T Institutional Trust Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Riforma IRPEF a 3 Scaglioni (23%, 35%, 43%)</span>
          </span>
          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>TFR con Rivalutazione ISTAT Art. 2120 c.c.</span>
          </span>
          <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>100% Lato Client: Zero Archiviazione Dati</span>
          </span>
        </div>
      </div>

      {/* 4 Categorized Pillars Grid */}
      <div className="space-y-14">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-100 text-sky-700 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 self-start sm:self-auto">
                  5 Calcolatori
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {tool.badge}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                      <h3 className="font-black text-base text-slate-900 group-hover:text-sky-700 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-sky-700 font-bold">
                      <span>Calcola ora gratis</span>
                      <span>&rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Guarantee Card */}
      <div className="p-8 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              <span>Garanzia di Conformità Statutaria & Riservatezza Totale</span>
              <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-md">
                GDPR Compliant
              </span>
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Tutti i calcolatori della suite italiana Kagazo elaborano i dati istantaneamente all’interno del browser. I tuoi stipendi, dati catastali, aliquote fiscali e documenti personali non vengono mai inviati o registrati su server remoti.
            </p>
          </div>
        </div>

        <Link
          href="/privacy"
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-xs"
        >
          Politica di Privacy
        </Link>
      </div>
    </div>
  );
}

