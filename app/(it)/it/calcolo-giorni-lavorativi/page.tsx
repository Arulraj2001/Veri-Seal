'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Building2,
  Clock,
  ListFilter,
  Check,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

// Calcolo computistico Pasqua (Algoritmo Anonimo / Gauss)
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = Marzo, 4 = Aprile
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
}

const PATRONI_CITTA: Record<string, { month: number; day: number; name: string }> = {
  nessuno: { month: 0, day: 0, name: 'Nessun patrono specifico' },
  roma: { month: 6, day: 29, name: 'Roma (SS. Pietro e Paolo - 29 Giugno)' },
  milano: { month: 12, day: 7, name: 'Milano (Sant\'Ambrogio - 7 Dicembre)' },
  napoli: { month: 9, day: 19, name: 'Napoli (San Gennaro - 19 Settembre)' },
  torino: { month: 6, day: 24, name: 'Torino (San Giovanni - 24 Giugno)' },
  firenze: { month: 6, day: 24, name: 'Firenze (San Giovanni - 24 Giugno)' },
  venezia: { month: 4, day: 25, name: 'Venezia (San Marco - 25 Aprile)' },
  bologna: { month: 10, day: 4, name: 'Bologna (San Petronio - 4 Ottobre)' },
  genova: { month: 6, day: 24, name: 'Genova (San Giovanni - 24 Giugno)' },
  palermo: { month: 7, day: 15, name: 'Palermo (Santa Rosalia - 15 Luglio)' },
  bari: { month: 5, day: 8, name: 'Bari (San Nicola - 8 Maggio)' },
};

function getItalianHolidays(year: number, cityKey: string): Holiday[] {
  const holidays: Holiday[] = [
    { date: `${year}-01-01`, name: 'Capodanno' },
    { date: `${year}-01-06`, name: 'Epifania' },
    { date: `${year}-04-25`, name: 'Festa della Liberazione' },
    { date: `${year}-05-01`, name: 'Festa dei Lavoratori' },
    { date: `${year}-06-02`, name: 'Festa della Repubblica' },
    { date: `${year}-08-15`, name: 'Ferragosto (Assunzione)' },
    { date: `${year}-11-01`, name: 'Tutti i Santi' },
    { date: `${year}-12-08`, name: 'Immacolata Concezione' },
    { date: `${year}-12-25`, name: 'Natale' },
    { date: `${year}-12-26`, name: 'Santo Stefano' },
  ];

  // Pasquetta (Lunedì dell'Angelo)
  const easter = getEasterSunday(year);
  const pasquetta = new Date(easter);
  pasquetta.setDate(pasquetta.getDate() + 1);
  const mm = String(pasquetta.getMonth() + 1).padStart(2, '0');
  const dd = String(pasquetta.getDate()).padStart(2, '0');
  holidays.push({ date: `${year}-${mm}-${dd}`, name: 'Lunedì dell\'Angelo (Pasquetta)' });

  // Santo Patrono
  if (cityKey && cityKey !== 'nessuno' && PATRONI_CITTA[cityKey]) {
    const patron = PATRONI_CITTA[cityKey];
    const pMonth = String(patron.month).padStart(2, '0');
    const pDay = String(patron.day).padStart(2, '0');
    holidays.push({ date: `${year}-${pMonth}-${pDay}`, name: patron.name });
  }

  return holidays;
}

export default function CalcoloGiorniLavorativiPage() {
  const [dataStart, setDataStart] = React.useState<string>('2026-06-01');
  const [dataEnd, setDataEnd] = React.useState<string>('2026-06-30');
  const [includiSabato, setIncludiSabato] = React.useState<boolean>(false);
  const [sospensioneFerialeAgosto, setSospensioneFerialeAgosto] = React.useState<boolean>(false);
  const [cittaPatrono, setCittaPatrono] = React.useState<string>('milano');

  const calcolo = React.useMemo(() => {
    const dStart = new Date(dataStart);
    const dEnd = new Date(dataEnd);

    if (isNaN(dStart.getTime()) || isNaN(dEnd.getTime()) || dStart > dEnd) {
      return {
        totaleGiorniSolari: 0,
        giorniLavorativi: 0,
        weekendGiorni: 0,
        festivitaInfrasettimanali: [] as { date: string; name: string }[],
        giorniSospensioneAgosto: 0,
      };
    }

    const startYear = dStart.getFullYear();
    const endYear = dEnd.getFullYear();

    // Raccoglie festività di tutti gli anni interessati
    const holidaysMap = new Map<string, string>();
    for (let y = startYear; y <= endYear; y++) {
      const hList = getItalianHolidays(y, cittaPatrono);
      hList.forEach((h) => holidaysMap.set(h.date, h.name));
    }

    let totaleGiorniSolari = 0;
    let giorniLavorativi = 0;
    let weekendGiorni = 0;
    let giorniSospensioneAgosto = 0;
    const festivitaTrovate: { date: string; name: string }[] = [];

    const cur = new Date(dStart);
    while (cur <= dEnd) {
      totaleGiorniSolari++;
      const dayOfWeek = cur.getDay(); // 0 = Domenica, 6 = Sabato
      const isoDate = cur.toISOString().split('T')[0];
      const isSunday = dayOfWeek === 0;
      const isSaturday = dayOfWeek === 6;
      const isHoliday = holidaysMap.has(isoDate);

      // Sospensione feriale estiva ex Legge 742/1969: dal 1° al 31 agosto
      const isAugustPeriod = sospensioneFerialeAgosto && cur.getMonth() === 7;

      if (isSunday || (!includiSabato && isSaturday)) {
        weekendGiorni++;
      } else if (isHoliday) {
        festivitaTrovate.push({ date: isoDate, name: holidaysMap.get(isoDate)! });
      } else if (isAugustPeriod) {
        giorniSospensioneAgosto++;
      } else {
        giorniLavorativi++;
      }

      cur.setDate(cur.getDate() + 1);
    }

    return {
      totaleGiorniSolari,
      giorniLavorativi,
      weekendGiorni,
      festivitaInfrasettimanali: festivitaTrovate,
      giorniSospensioneAgosto,
    };
  }, [dataStart, dataEnd, includiSabato, sospensioneFerialeAgosto, cittaPatrono]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Giorni Lavorativi & Festività</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Legge 260/1949, Art. 155 c.p.c. & Sospensione Termini</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Giorni Lavorativi e Festività Nazionali <br className="hidden sm:inline" />
          <span className="text-sky-600">Calendario Civile, Patroni Locali e Termini Legali</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Diretta:</strong> Il calcolatore determina i <strong>giorni lavorativi ed effettivi</strong> tra due date selezionate, escludendo automaticamente le 11 festività nazionali statutariamente riconosciute dalla <strong>Legge 260/1949</strong>, la Pasquetta mobile, i weekend (sabato e domenica o solo domenica) e il Santo Patrono della città. Include l'opzione per la <strong>sospensione feriale dei termini processuali (1-31 agosto)</strong> prevista dall'Art. 1 della Legge 742/1969 per l'ambito giudiziario e forense.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <CalendarIcon className="w-4 h-4 text-sky-600" />
              <span>Intervallo Temporale e Parametri</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setDataStart('2026-06-01');
                setDataEnd('2026-06-30');
                setIncludiSabato(false);
                setSospensioneFerialeAgosto(false);
                setCittaPatrono('milano');
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Date Inizio e Fine */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Data di Inizio (inclusa)</label>
                <input
                  type="date"
                  value={dataStart}
                  onChange={(e) => setDataStart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Data di Fine (inclusa)</label>
                <input
                  type="date"
                  value={dataEnd}
                  onChange={(e) => setDataEnd(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Santo Patrono */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Santo Patrono Locale (Festività Cittadina)</label>
              <select
                value={cittaPatrono}
                onChange={(e) => setCittaPatrono(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {Object.entries(PATRONI_CITTA).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Settimana Lavorativa (5 o 6 giorni) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Configurazione Settimanale</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIncludiSabato(false)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    !includiSabato
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Settimana Corta (Lun - Ven)</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Sabato e domenica non lavorativi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIncludiSabato(true)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    includiSabato
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Settimana Lunga (Lun - Sab)</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Solo domenica non lavorativa</span>
                </button>
              </div>
            </div>

            {/* Sospensione Feriale Agosto */}
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={sospensioneFerialeAgosto}
                onChange={(e) => setSospensioneFerialeAgosto(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
              />
              <span className="text-xs text-slate-800 font-medium">
                Attiva <strong>Sospensione Feriale dei Termini Processuali (1-31 Agosto)</strong> ex Legge 742/1969 per atti giudiziari
              </span>
            </label>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo esatto con computo della Pasqua mobile e festività infrasettimanali statutariamente vigenti.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Riepilogo Giorni Effettivi
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              {calcolo.totaleGiorniSolari} Giorni Totali
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Giorni Effettivamente Lavorativi</span>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
              {calcolo.giorniLavorativi}
            </div>
            <span className="text-[11px] text-sky-300 font-medium block">
              Esclusi festivi e fine settimana ({includiSabato ? '6 gg su 7' : '5 gg su 7'})
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Giorni di calendario (solari)</span>
              <span className="font-mono text-white">{calcolo.totaleGiorniSolari} gg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Giorni di fine settimana (weekend)</span>
              <span className="font-mono text-amber-400 font-bold">- {calcolo.weekendGiorni} gg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Festività infrasettimanali escluse</span>
              <span className="font-mono text-rose-400 font-bold">- {calcolo.festivitaInfrasettimanali.length} gg</span>
            </div>
            {calcolo.giorniSospensioneAgosto > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Sospensione feriale agosto (L. 742/69)</span>
                <span className="font-mono text-cyan-400 font-bold">- {calcolo.giorniSospensioneAgosto} gg</span>
              </div>
            )}
          </div>

          {calcolo.festivitaInfrasettimanali.length > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Festività Infrasettimanali Rilevate:
              </span>
              <ul className="text-xs text-slate-400 space-y-1">
                {calcolo.festivitaInfrasettimanali.map((f, idx) => (
                  <li key={idx} className="flex justify-between font-mono text-[11px]">
                    <span className="text-slate-300">{f.name}</span>
                    <span className="text-sky-300">{f.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Computo dei Termini e Calendario Lavorativo in Italia
          </h2>
          <p>
            Il conteggio dei giorni lavorativi assume una rilevanza fondamentale sia nei rapporti contrattuali tra imprese e lavoratori, sia nella disciplina processuale dei termini legali e decadenziali.
          </p>
          <p>
            Le festività nazionali ufficiali in Italia sono stabilite dalla <strong>Legge 27 maggio 1949, n. 260</strong> e successive integrazioni. Quando una festività cade dal lunedì al venerdì (o sabato per le aziende con orario su sei giorni), essa costituisce festività infrasettimanale a tutti gli effetti di legge e dà diritto al riposo retribuito.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Art. 155 del Codice di Procedura Civile (Computo dei Termini)
          </h3>
          <p>
            Nel diritto processuale civile, il computo dei termini a giorni si effettua secondo regole rigorose:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Dies a quo non computatur in termino:</strong> Non si calcola il giorno iniziale da cui decorre il termine, mentre si calcola il giorno finale (<em>dies ad quem computatur</em>).
            </li>
            <li>
              <strong>Proroga di Diritto:</strong> Se il giorno di scadenza è festivo o cade di sabato (a seguito della riforma introdotta con Legge 69/2009 all’art. 155 comma 5 c.p.c.), la scadenza è prorogata di diritto al primo giorno successivo non festivo.
            </li>
            <li>
              <strong>Sospensione Feriale Estiva (Legge 742/1969):</strong> Dal <strong>1° al 31 agosto</strong> di ciascun anno il decorso dei termini processuali è sospeso di diritto per tutti i procedimenti civili e amministrativi ordinari, riprendendo a decorrere dal 1° settembre.
            </li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Elenco Festività Nazionali Obbligatorie
          </h3>
          <p>
            Le festività civili e religiose riconosciute dalla Repubblica Italiana comprendono:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Festività Fisse di Calendario:</strong>
              <p>1 Gennaio (Capodanno), 6 Gennaio (Epifania), 25 Aprile (Liberazione), 1 Maggio (Festa Lavoratori), 2 Giugno (Repubblica), 15 Agosto (Assunzione), 1 Novembre (Ognissanti), 8 Dicembre (Immacolata), 25 Dicembre (Natale), 26 Dicembre (Santo Stefano).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Festività Mobili e Locali:</strong>
              <p>Lunedì dell'Angelo (Pasquetta, primo lunedì successivo alla Pasqua di Resurrezione calcolata con computo lunare) e la festa del Santo Patrono del Comune sede dell'unità produttiva o del Tribunale competente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
