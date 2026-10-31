'use client';

import * as React from 'react';
import {
  Calendar as CalendarIcon,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Clock,
  ListFilter,
} from 'lucide-react';

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
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

interface Holiday {
  date: string;
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
  palermo: { month: 7, day: 15, name: 'Palermo (Santa Rosalia - 15 Luglio)' },
};

function getItalianHolidays(year: number, patronoKey: string): Map<string, string> {
  const map = new Map<string, string>();
  const add = (m: number, d: number, name: string) => {
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    map.set(`${year}-${mm}-${dd}`, name);
  };

  add(1, 1, 'Capodanno');
  add(1, 6, 'Epifania');
  add(4, 25, 'Festa della Liberazione');
  add(5, 1, 'Festa dei Lavoratori');
  add(6, 2, 'Festa della Repubblica');
  add(8, 15, 'Assunzione / Ferragosto');
  add(11, 1, 'Tutti i Santi (Ognissanti)');
  add(12, 8, 'Immacolata Concezione');
  add(12, 25, 'Natale');
  add(12, 26, 'Santo Stefano');

  const easter = getEasterSunday(year);
  const easterMonday = new Date(easter.getTime() + 24 * 60 * 60 * 1000);
  const emM = String(easterMonday.getMonth() + 1).padStart(2, '0');
  const emD = String(easterMonday.getDate()).padStart(2, '0');
  map.set(`${year}-${emM}-${emD}`, 'Lunedì dell\'Angelo (Pasquetta)');

  const patrono = PATRONI_CITTA[patronoKey];
  if (patrono && patrono.month > 0) {
    add(patrono.month, patrono.day, patrono.name);
  }

  return map;
}

export function CalcoloGiorniLavorativiClient() {
  const [dataInizio, setDataInizio] = React.useState<string>('2026-01-01');
  const [dataFine, setDataFine] = React.useState<string>('2026-12-31');
  const [settimanaLavorativa, setSettimanaLavorativa] = React.useState<'5_giorni' | '6_giorni'>('5_giorni');
  const [patrono, setPatrono] = React.useState<string>('nessuno');
  const [oreGiornaliere, setOreGiornaliere] = React.useState<number>(8);

  const calcolo = React.useMemo(() => {
    const start = new Date(dataInizio);
    const end = new Date(dataFine);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return {
        giorniTotali: 0,
        giorniLavorativi: 0,
        giorniWeekend: 0,
        festivitaInfrasettimanali: 0,
        oreLavorativeTotali: 0,
        elencoFestivitaInfrasettimanali: [] as Holiday[],
      };
    }

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const holidaysMap = new Map<string, string>();

    for (let y = startYear; y <= endYear; y++) {
      const yearMap = getItalianHolidays(y, patrono);
      yearMap.forEach((v, k) => holidaysMap.set(k, v));
    }

    let giorniTotali = 0;
    let giorniLavorativi = 0;
    let giorniWeekend = 0;
    let festivitaInfrasettimanali = 0;
    const elencoFestivitaInfrasettimanali: Holiday[] = [];

    const current = new Date(start);
    while (current <= end) {
      giorniTotali++;
      const dayOfWeek = current.getDay();
      const isSunday = dayOfWeek === 0;
      const isSaturday = dayOfWeek === 6;

      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      const dateKey = `${yyyy}-${mm}-${dd}`;

      const holidayName = holidaysMap.get(dateKey);

      let isWorkingDay = true;

      if (isSunday || (settimanaLavorativa === '5_giorni' && isSaturday)) {
        giorniWeekend++;
        isWorkingDay = false;
      }

      if (holidayName) {
        if (!isSunday && !(settimanaLavorativa === '5_giorni' && isSaturday)) {
          festivitaInfrasettimanali++;
          elencoFestivitaInfrasettimanali.push({ date: dateKey, name: holidayName });
          isWorkingDay = false;
        }
      }

      if (isWorkingDay) {
        giorniLavorativi++;
      }

      current.setDate(current.getDate() + 1);
    }

    const oreLavorativeTotali = giorniLavorativi * oreGiornaliere;

    return {
      giorniTotali,
      giorniLavorativi,
      giorniWeekend,
      festivitaInfrasettimanali,
      oreLavorativeTotali,
      elencoFestivitaInfrasettimanali,
    };
  }, [dataInizio, dataFine, settimanaLavorativa, patrono, oreGiornaliere]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
            <CalendarIcon className="w-4 h-4 text-sky-600" />
            <span>Parametri Periodo e Calendario</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setDataInizio('2026-01-01');
              setDataFine('2026-12-31');
              setSettimanaLavorativa('5_giorni');
              setPatrono('nessuno');
              setOreGiornaliere(8);
            }}
            className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reimposta</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Data Iniziale</label>
              <input
                type="date"
                value={dataInizio}
                onChange={(e) => setDataInizio(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Data Finale</label>
              <input
                type="date"
                value={dataFine}
                onChange={(e) => setDataFine(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Orario Settimanale</label>
              <select
                value={settimanaLavorativa}
                onChange={(e) => setSettimanaLavorativa(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="5_giorni">Settimana Corta (Lun - Ven, 5 giorni)</option>
                <option value="6_giorni">Settimana Lunga (Lun - Sab, 6 giorni)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Santo Patrono Città</label>
              <select
                value={patrono}
                onChange={(e) => setPatrono(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                {Object.entries(PATRONI_CITTA).map(([k, v]) => (
                  <option key={k} value={k}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Ore Lavorative Contrattuali Giornaliere</span>
              <span className="font-mono text-sky-700 font-bold">{oreGiornaliere} ore / giorno</span>
            </label>
            <input
              type="range"
              min={4}
              max={10}
              step={0.5}
              value={oreGiornaliere}
              onChange={(e) => setOreGiornaliere(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          {calcolo.elencoFestivitaInfrasettimanali.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ListFilter className="w-3.5 h-3.5 text-sky-600" />
                <span>Festività Infrasettimanali Escluse dal Conteggio:</span>
              </span>
              <div className="max-h-36 overflow-y-auto space-y-1 text-[11px] text-slate-600 font-mono pr-2">
                {calcolo.elencoFestivitaInfrasettimanali.map((f, i) => (
                  <div key={i} className="flex justify-between py-0.5 border-b border-slate-200/60 last:border-0">
                    <span>{f.date}</span>
                    <span className="text-slate-800 font-bold">{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Computo Giorni Lavorativi
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
            {calcolo.giorniTotali} gg solari
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1 text-center">
          <span className="text-xs text-sky-200 font-medium">Giorni Lavorativi Effettivi</span>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
            {calcolo.giorniLavorativi}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono font-bold block">
            Pari a {calcolo.oreLavorativeTotali.toLocaleString('it-IT')} Ore Lavorative Complessive
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Giorni Solari Totali nel Periodo</span>
            <span className="font-mono text-white">{calcolo.giorniTotali}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Fine Settimana (Sab/Dom)</span>
            <span className="font-mono text-rose-400">- {calcolo.giorniWeekend}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Festività Infrasettimanali di Legge</span>
            <span className="font-mono text-amber-400">- {calcolo.festivitaInfrasettimanali}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300">
            <span>Monte Ore Lavorabile</span>
            <span className="font-mono font-bold text-sky-400">{calcolo.oreLavorativeTotali} ore</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong>Computo Termini Processuali (Art. 155 c.p.c.):</strong> Se il giorno di scadenza cade di sabato o giorno festivo, il termine è prorogato di diritto al primo giorno seguente non festivo. Sospensione feriale: 1-31 agosto.
        </div>
      </div>
    </div>
  );
}

