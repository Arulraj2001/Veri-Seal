'use client';

import * as React from 'react';
import { Calendar, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export function SpainDiasHabilesEngine() {
  const [fechaInicio, setFechaInicio] = React.useState<string>(new Date().toISOString().split('T')[0]);
  const [diasPlazo, setDiasPlazo] = React.useState<number>(10);
  const [tipoPlazo, setTipoPlazo] = React.useState<'habiles' | 'naturales'>('habiles');

  // National holidays in Spain for computation
  const FESTIVOS_NACIONALES_2026 = [
    '2026-01-01', '2026-01-06', '2026-04-03', '2026-05-01',
    '2026-08-15', '2026-10-12', '2026-11-01', '2026-12-06',
    '2026-12-08', '2026-12-25',
  ];

  const resultado = React.useMemo(() => {
    const start = new Date(fechaInicio);
    if (isNaN(start.getTime())) return null;

    let current = new Date(start);
    // El cómputo en derecho administrativo se inicia a partir del día siguiente al de la notificación (Art. 30.3 LPACAP)
    current.setDate(current.getDate() + 1);

    let diasContados = 0;
    let diasNaturalesTranscurridos = 0;

    if (tipoPlazo === 'naturales') {
      current.setDate(current.getDate() + diasPlazo - 1);
      diasContados = diasPlazo;
      diasNaturalesTranscurridos = diasPlazo;
    } else {
      while (diasContados < diasPlazo) {
        const dayOfWeek = current.getDay(); // 0 is Sunday, 6 is Saturday
        const dateIso = current.toISOString().split('T')[0];
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = FESTIVOS_NACIONALES_2026.includes(dateIso);

        if (!isWeekend && !isHoliday) {
          diasContados++;
        }

        if (diasContados < diasPlazo) {
          current.setDate(current.getDate() + 1);
        }
        diasNaturalesTranscurridos++;
      }
    }

    // Si el último día es inhábil, se prorroga al primer día hábil siguiente (Art. 30.5 LPACAP)
    while (
      current.getDay() === 0 ||
      current.getDay() === 6 ||
      FESTIVOS_NACIONALES_2026.includes(current.toISOString().split('T')[0])
    ) {
      current.setDate(current.getDate() + 1);
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaLimiteStr = current.toLocaleDateString('es-ES', options);

    return {
      fechaFinIso: current.toISOString().split('T')[0],
      fechaFinFormateada: fechaLimiteStr.charAt(0).toUpperCase() + fechaLimiteStr.slice(1),
      diasHabilesComputados: diasPlazo,
      diasNaturalesTotales: diasNaturalesTranscurridos,
    };
  }, [fechaInicio, diasPlazo, tipoPlazo]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Tipo de Cómputo */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Tipo de Cómputo de Plazo
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTipoPlazo('habiles')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  tipoPlazo === 'habiles'
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Días Hábiles (Ley 39/2015)
              </button>
              <button
                type="button"
                onClick={() => setTipoPlazo('naturales')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  tipoPlazo === 'naturales'
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Días Naturales (Continuos)
              </button>
            </div>
          </div>

          {/* Fecha de Notificación */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label htmlFor="fecha-notificacion" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Fecha de Recepción de la Notificación
            </label>
            <input
              id="fecha-notificacion"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-500 block">
              El cómputo legal se inicia al día siguiente hábil de recibir la comunicación.
            </span>
          </div>

          {/* Días de Plazo */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="dias-plazo" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Días de Plazo Otorgados
              </label>
              <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200/60">
                {diasPlazo} días
              </span>
            </div>
            <input
              id="dias-plazo"
              type="range"
              min={1}
              max={60}
              step={1}
              value={diasPlazo}
              onChange={(e) => setDiasPlazo(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
            />
            <div className="flex gap-2 pt-1">
              {[10, 15, 20, 30].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiasPlazo(d)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 cursor-pointer"
                >
                  {d} días
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          {resultado && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Fecha Límite para Contestar
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Ley 39/2015 LPACAP
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  {resultado.fechaFinFormateada}
                </div>
                <div className="text-xs text-orange-400 font-mono">
                  Hasta las 23:59:59 del {resultado.fechaFinIso}
                </div>
              </div>

              {/* Breakdown Items */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Días de plazo computados:</span>
                  <span className="font-mono font-bold text-slate-100">
                    {resultado.diasHabilesComputados} días ({tipoPlazo})
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Días de calendario naturales transcurridos:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {resultado.diasNaturalesTotales} días naturales
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Exclusiones aplicadas:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    Sábados, Domingos y Festivos Nacionales
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Artículo 30 de la Ley 39/2015 (LPACAP):</strong>
              <p className="text-emerald-800 leading-relaxed">
                Salvo que por Ley o en el Derecho de la Unión Europea se exprese otro cómputo, cuando los plazos se señalen por días, se entiende que éstos son <strong>hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

