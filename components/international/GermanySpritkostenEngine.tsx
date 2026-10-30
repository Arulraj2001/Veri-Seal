'use client';

import * as React from 'react';
import { calculateSpritkostenGermany } from '@/lib/international/germany-tax';
import { Fuel, Users, Car, MapPin } from 'lucide-react';

export function GermanySpritkostenEngine() {
  const [distanzKm, setDistanzKm] = React.useState<number>(450);
  const [verbrauchPro100Km, setVerbrauchPro100Km] = React.useState<number>(6.5);
  const [spritpreisProLiter, setSpritpreisProLiter] = React.useState<number>(1.78);
  const [mitfahrer, setMitfahrer] = React.useState<number>(3);

  const result = React.useMemo(() => {
    return calculateSpritkostenGermany(distanzKm, verbrauchPro100Km, spritpreisProLiter, mitfahrer);
  }, [distanzKm, verbrauchPro100Km, spritpreisProLiter, mitfahrer]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Fuel className="w-6 h-6 text-amber-600" />
            Fahrtstrecke, Spritpreis &amp; Mitfahrer
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Berechnung des Kraftstoffverbrauchs, der Gesamtbenzinkosten und der gerechten Kostenaufteilung in Fahrgemeinschaften.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Fahrstrecke (km)
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={distanzKm || ''}
              onChange={(e) => setDistanzKm(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Verbrauch (l / 100 km)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={verbrauchPro100Km || ''}
              onChange={(e) => setVerbrauchPro100Km(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Spritpreis (€ / Liter)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={spritpreisProLiter || ''}
              onChange={(e) => setSpritpreisProLiter(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Personenanzahl
            </label>
            <input
              type="number"
              min="1"
              max="9"
              value={mitfahrer}
              onChange={(e) => setMitfahrer(Math.max(Number(e.target.value), 1))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Gesamte Spritkosten der Fahrt
          </span>
          <div className="text-3xl font-black font-mono">
            {result.gesamtkostenFahrt.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Verbrauch : {result.kraftstoffVerbrauchLiter.toFixed(1)} Liter Kraftstoff
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Kosten pro Person
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.kostenProPerson.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Gleichmäßig aufgeteilt auf {mitfahrer} Mitfahrer
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Kilometerpreis
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {distanzKm > 0 ? (result.gesamtkostenFahrt / distanzKm).toFixed(2) : '0.00'} €/km
          </div>
          <p className="text-xs text-slate-500">
            Reine Kraftstoffkosten pro gefahrenem Kilometer
          </p>
        </div>
      </div>
    </div>
  );
}
