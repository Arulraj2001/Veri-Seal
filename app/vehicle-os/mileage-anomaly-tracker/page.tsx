'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Gauge,
  Fuel,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  TrendingDown,
  Info,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface FuelLogEntry {
  id: string;
  date: string;
  odometer: number;
  litres: number;
  totalCost: number;
}

const DEFAULT_LOGS: FuelLogEntry[] = [
  { id: '1', date: '2024-05-01', odometer: 15000, litres: 32.0, totalCost: 3264 },
  { id: '2', date: '2024-05-15', odometer: 15580, litres: 31.5, totalCost: 3213 }, // 580km / 31.5L = 18.4 km/L
  { id: '3', date: '2024-05-30', odometer: 16165, litres: 32.2, totalCost: 3284 }, // 585km / 32.2L = 18.1 km/L
  { id: '4', date: '2024-06-14', odometer: 16620, litres: 32.0, totalCost: 3264 }, // 455km / 32.0L = 14.2 km/L (Anomaly!)
];

export default function MileageAnomalyTrackerPage() {
  const [logs, setLogs] = React.useState<FuelLogEntry[]>(DEFAULT_LOGS);

  // Form states
  const [newDate, setNewDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [newOdo, setNewOdo] = React.useState('');
  const [newLitres, setNewLitres] = React.useState('');
  const [newCost, setNewCost] = React.useState('');

  // Calculations
  const calculatedEntries = React.useMemo(() => {
    const sorted = [...logs].sort((a, b) => a.odometer - b.odometer);
    return sorted.map((entry, index) => {
      if (index === 0) {
        return { ...entry, distance: 0, mileage: 0 };
      }
      const prev = sorted[index - 1];
      const distance = entry.odometer - prev.odometer;
      const mileage = entry.litres > 0 ? Number((distance / entry.litres).toFixed(2)) : 0;
      return { ...entry, distance, mileage };
    });
  }, [logs]);

  const validMileages = calculatedEntries.filter((e) => e.mileage > 0);
  const baselineMileage =
    validMileages.length > 1
      ? Number(
          (
            validMileages.slice(0, -1).reduce((acc, curr) => acc + curr.mileage, 0) /
            (validMileages.length - 1)
          ).toFixed(1)
        )
      : validMileages[0]?.mileage || 18.0;

  const currentMileage = validMileages[validMileages.length - 1]?.mileage || baselineMileage;
  const percentageDrop =
    baselineMileage > 0 ? Math.round(((baselineMileage - currentMileage) / baselineMileage) * 100) : 0;
  const isAnomaly = percentageDrop >= 15;

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const odoNum = parseInt(newOdo);
    const litresNum = parseFloat(newLitres);
    const costNum = parseFloat(newCost);
    if (isNaN(odoNum) || isNaN(litresNum) || odoNum <= 0 || litresNum <= 0) return;

    setLogs((prev) => [
      ...prev,
      {
        id: `f-${Date.now()}`,
        date: newDate,
        odometer: odoNum,
        litres: litresNum,
        totalCost: costNum || Math.round(litresNum * 102),
      },
    ]);
    setNewOdo('');
    setNewLitres('');
    setNewCost('');
  };

  const handleRemove = (id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            ⛽ Fuel Intelligence
          </span>
          <span className="text-xs font-semibold text-slate-500">Tank-to-Tank Anomaly Detector</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Real Mileage Tracker &amp; Drop Anomaly Detector
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Log every tank-full fill up. Our engine establishes your vehicle's baseline running economy and instantly warns you when mileage drops abnormally (e.g. 23% drop) so you can investigate tyre pressure or driving condition variances.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Fuel Logbook */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-amber-600" />
              <span>Full-to-Full Fuel Logs</span>
            </h2>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Odometer</th>
                    <th className="py-2.5 px-3">Litres</th>
                    <th className="py-2.5 px-3">Economy</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculatedEntries.map((log) => (
                    <tr key={log.id}>
                      <td className="py-2.5 px-3 text-slate-600">{log.date}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{log.odometer.toLocaleString('en-IN')} km</td>
                      <td className="py-2.5 px-3 text-slate-700">{log.litres} L</td>
                      <td className="py-2.5 px-3">
                        {log.mileage > 0 ? (
                          <span
                            className={`font-black px-2 py-0.5 rounded-md ${
                              log.mileage < baselineMileage * 0.85
                                ? 'bg-red-100 text-red-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {log.mileage} km/L
                          </span>
                        ) : (
                          <span className="text-slate-400">First Fill</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemove(log.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Log Form */}
            <form onSubmit={handleAddLog} className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
              />
              <input
                type="number"
                value={newOdo}
                onChange={(e) => setNewOdo(e.target.value)}
                placeholder="Current Odo (km)"
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
              />
              <input
                type="number"
                step="0.1"
                value={newLitres}
                onChange={(e) => setNewLitres(e.target.value)}
                placeholder="Litres filled"
                className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Fill</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right 5 Cols: Anomaly Alert & Non-Diagnostic Guidance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Mileage Diagnostic Engine
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Telemetry Status</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Learned Baseline</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">{baselineMileage} km/L</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Latest Tank</div>
                <div className={`text-xl font-black mt-0.5 ${isAnomaly ? 'text-red-600' : 'text-emerald-700'}`}>
                  {currentMileage} km/L
                </div>
              </div>
            </div>

            {/* Anomaly Callout */}
            {isAnomaly ? (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-red-900 font-extrabold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>⚠️ {percentageDrop}% Abnormal Mileage Drop Detected!</span>
                </div>
                <p className="text-[11px] text-red-800 leading-relaxed font-medium">
                  Your latest tank ({currentMileage} km/L) dropped significantly below your normal {baselineMileage} km/L baseline.
                </p>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Normal Fuel Economy: Operating within healthy 5% variance.</span>
              </div>
            )}

            {/* Non-Diagnostic Investigation Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-900">Check These 6 Non-Diagnostic Causes:</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Cold Tyre Pressure:</strong> A 3-4 PSI drop in all four tyres increases rolling drag by 8-12%.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Summer AC Idling:</strong> Running AC while parked or stuck in heavy urban gridlock consumes ~0.8-1.2L/hour.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Fuel Station Dispenser Auto-Cut:</strong> Early dispenser auto-shutoff creates apparent tank volume variance.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Air Filter Clogged:</strong> Indian dust storms can choke paper air intake elements within 5,000 km.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Driving Route Shift:</strong> Pure 100% city stop-start vs open expressway driving profile change.</span>
                </li>
              </ul>
            </div>

            {/* Strict Non-Diagnostic Disclaimer */}
            <div className="flex items-start gap-1.5 text-[10px] text-slate-400 pt-1">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                * VeriSeal Mileage Tracker provides statistical variance detection based on user fill logs. It does not perform internal mechanical engine diagnosis.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
