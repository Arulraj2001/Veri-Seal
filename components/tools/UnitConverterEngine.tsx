'use client';

import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  Copy, 
  Check, 
  Ruler, 
  Scale, 
  Thermometer, 
  HardDrive, 
  Gauge, 
  Maximize2, 
  Clock
} from 'lucide-react';

type CategoryKey = 'length' | 'weight' | 'temperature' | 'digital' | 'speed' | 'area' | 'time';

interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

const CATEGORIES: { id: CategoryKey; label: string; icon: any; description: string }[] = [
  { id: 'length', label: 'Length & Distance', icon: Ruler, description: 'Meters, km, feet, inches, miles' },
  { id: 'weight', label: 'Weight & Mass', icon: Scale, description: 'Kilograms, grams, pounds, ounces' },
  { id: 'temperature', label: 'Temperature', icon: Thermometer, description: 'Celsius, Fahrenheit, Kelvin' },
  { id: 'digital', label: 'Digital Storage', icon: HardDrive, description: 'Bytes, KB, MB, GB, TB (1024 binary)' },
  { id: 'speed', label: 'Speed & Velocity', icon: Gauge, description: 'km/h, mph, m/s, knots' },
  { id: 'area', label: 'Area', icon: Maximize2, description: 'sq meters, sq feet, acres, hectares' },
  { id: 'time', label: 'Time Duration', icon: Clock, description: 'Seconds, minutes, hours, days, years' },
];

const UNITS_MAP: Record<CategoryKey, UnitDef[]> = {
  length: [
    { id: 'm', name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
    { id: 'km', name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'cm', name: 'Centimeter', symbol: 'cm', toBase: (v) => v * 0.01, fromBase: (v) => v / 0.01 },
    { id: 'mm', name: 'Millimeter', symbol: 'mm', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
    { id: 'mi', name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    { id: 'yd', name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { id: 'ft', name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { id: 'in', name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { id: 'nmi', name: 'Nautical Mile', symbol: 'nmi', toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
  ],
  weight: [
    { id: 'kg', name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
    { id: 'g', name: 'Gram', symbol: 'g', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
    { id: 'mg', name: 'Milligram', symbol: 'mg', toBase: (v) => v * 0.000001, fromBase: (v) => v / 0.000001 },
    { id: 't', name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'lb', name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
    { id: 'oz', name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
    { id: 'st', name: 'Stone', symbol: 'st', toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 },
  ],
  temperature: [
    { id: 'c', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
    { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => (v * 9) / 5 + 32 },
    { id: 'k', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  digital: [
    { id: 'b', name: 'Byte', symbol: 'B', toBase: (v) => v, fromBase: (v) => v },
    { id: 'kb', name: 'Kilobyte', symbol: 'KB', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
    { id: 'mb', name: 'Megabyte', symbol: 'MB', toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
    { id: 'gb', name: 'Gigabyte', symbol: 'GB', toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
    { id: 'tb', name: 'Terabyte', symbol: 'TB', toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
    { id: 'pb', name: 'Petabyte', symbol: 'PB', toBase: (v) => v * 1024 ** 5, fromBase: (v) => v / 1024 ** 5 },
  ],
  speed: [
    { id: 'kmh', name: 'Kilometers per Hour', symbol: 'km/h', toBase: (v) => v, fromBase: (v) => v },
    { id: 'ms', name: 'Meters per Second', symbol: 'm/s', toBase: (v) => v * 3.6, fromBase: (v) => v / 3.6 },
    { id: 'mph', name: 'Miles per Hour', symbol: 'mph', toBase: (v) => v * 1.609344, fromBase: (v) => v / 1.609344 },
    { id: 'kn', name: 'Knots', symbol: 'kn', toBase: (v) => v * 1.852, fromBase: (v) => v / 1.852 },
  ],
  area: [
    { id: 'sqm', name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
    { id: 'sqkm', name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
    { id: 'sqft', name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    { id: 'ac', name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
    { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    { id: 'sqmi', name: 'Square Mile', symbol: 'mi²', toBase: (v) => v * 2589988.11, fromBase: (v) => v / 2589988.11 },
  ],
  time: [
    { id: 's', name: 'Second', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
    { id: 'min', name: 'Minute', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    { id: 'hr', name: 'Hour', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { id: 'day', name: 'Day', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    { id: 'wk', name: 'Week', symbol: 'wk', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    { id: 'mo', name: 'Month (30d)', symbol: 'mo', toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
    { id: 'yr', name: 'Year (365d)', symbol: 'yr', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
  ],
};

export function UnitConverterEngine() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('length');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('ft');
  const [copied, setCopied] = useState<boolean>(false);

  const units = UNITS_MAP[activeCategory];

  // Handle switching category
  const handleSelectCategory = (cat: CategoryKey) => {
    setActiveCategory(cat);
    const newUnits = UNITS_MAP[cat];
    setFromUnitId(newUnits[0].id);
    setToUnitId(newUnits[1] ? newUnits[1].id : newUnits[0].id);
  };

  const handleSwap = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  // Compute conversion
  const conversionResult = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return null;

    const fromDef = units.find((u) => u.id === fromUnitId);
    const toDef = units.find((u) => u.id === toUnitId);

    if (!fromDef || !toDef) return null;

    const baseVal = fromDef.toBase(num);
    const finalVal = toDef.fromBase(baseVal);

    // Format output with reasonable precision
    let formatted: string;
    if (Math.abs(finalVal) < 0.000001 || Math.abs(finalVal) >= 1e12) {
      formatted = finalVal.toExponential(6);
    } else {
      formatted = parseFloat(finalVal.toPrecision(8)).toString();
    }

    return {
      finalVal,
      formatted,
      fromSymbol: fromDef.symbol,
      toSymbol: toDef.symbol,
      fromName: fromDef.name,
      toName: toDef.name,
    };
  }, [inputValue, fromUnitId, toUnitId, units]);

  // Compute all other units in same category for instant comparison table
  const allConversions = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return [];

    const fromDef = units.find((u) => u.id === fromUnitId);
    if (!fromDef) return [];

    const baseVal = fromDef.toBase(num);

    return units.map((u) => {
      const val = u.fromBase(baseVal);
      let formatted: string;
      if (Math.abs(val) < 0.000001 || Math.abs(val) >= 1e12) {
        formatted = val.toExponential(4);
      } else {
        formatted = parseFloat(val.toPrecision(6)).toString();
      }
      return {
        id: u.id,
        name: u.name,
        symbol: u.symbol,
        value: formatted,
      };
    });
  }, [inputValue, fromUnitId, units]);

  const copyResult = () => {
    if (!conversionResult) return;
    navigator.clipboard.writeText(`${conversionResult.formatted} ${conversionResult.toSymbol}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Category Pills Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#E6570B] text-white shadow-lg shadow-[#E6570B]/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Conversion Studio */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-4">
          {/* From Input Card */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">From</span>
              <select
                value={fromUnitId}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-[#E6570B]"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent font-mono text-2xl sm:text-3xl font-bold text-zinc-100 focus:outline-none placeholder-zinc-700"
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-[#E6570B] transition-all transform hover:scale-105 active:scale-95"
              title="Swap Units"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Output Card */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">To</span>
              <select
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-[#E6570B]"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#E6570B] truncate">
                {conversionResult ? conversionResult.formatted : '—'}
              </div>
              {conversionResult && (
                <button
                  onClick={copyResult}
                  className="ml-2 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title="Copy result"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Formula / Sentence Result Banner */}
        {conversionResult && (
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="text-zinc-300">
              <span className="font-mono font-semibold text-zinc-100">{inputValue} {conversionResult.fromSymbol}</span>
              <span className="text-zinc-500 mx-2">=</span>
              <span className="font-mono font-bold text-[#E6570B]">{conversionResult.formatted} {conversionResult.toSymbol}</span>
              <span className="text-zinc-500 ml-2">({conversionResult.fromName} to {conversionResult.toName})</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">100% Client-Side Live Precision</span>
          </div>
        )}
      </div>

      {/* Instant Matrix Table: All Units in Category */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-200">
          Complete {CATEGORIES.find((c) => c.id === activeCategory)?.label} Matrix
        </h3>
        <p className="text-xs text-zinc-400">Live equivalents of your input across all recognized units:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {allConversions.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all ${
                item.id === toUnitId
                  ? 'bg-[#E6570B]/10 border-[#E6570B]/40'
                  : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-300">{item.name}</span>
                <span className="text-[11px] font-mono text-zinc-500">{item.symbol}</span>
              </div>
              <div className="text-sm font-mono font-semibold text-zinc-100 select-all truncate">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnitConverterEngine;
