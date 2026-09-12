'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Info,
  Car,
} from 'lucide-react';
import { evaluateServiceQuote } from '@/lib/vehicle-os/calculations';
import { VEHICLE_PRESETS } from '@/lib/vehicle-os/vehicles-db';
import { QuoteAnalysisResult } from '@/lib/vehicle-os/types';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';

interface QuoteEntry {
  id: string;
  name: string;
  price: number;
}

const DEFAULT_QUOTE_ITEMS: QuoteEntry[] = [
  { id: '1', name: 'Fully Synthetic Engine Oil 3.5L', price: 3850 },
  { id: '2', name: 'Front Brake Pads Set', price: 4500 },
  { id: '3', name: 'Engine Oil Filter', price: 420 },
  { id: '4', name: 'Air Filter Element', price: 1200 },
  { id: '5', name: 'AC Vent Disinfection & Sanitizer', price: 1450 },
  { id: '6', name: 'Engine Flush Chemical', price: 950 },
  { id: '7', name: 'Periodic Maintenance Labour', price: 2400 },
  { id: '8', name: 'Wheel Alignment & Balancing', price: 1200 },
];

export default function ServiceQuoteFairnessPage() {
  const [selectedVehicleId, setSelectedVehicleId] = React.useState<string>('maruti-swift-petrol');
  const [workshopType, setWorkshopType] = React.useState<'authorized' | 'independent'>('authorized');
  const [items, setItems] = React.useState<QuoteEntry[]>(DEFAULT_QUOTE_ITEMS);
  const [pasteText, setPasteText] = React.useState<string>('');
  const [copied, setCopied] = React.useState<boolean>(false);

  // New item inputs
  const [newItemName, setNewItemName] = React.useState('');
  const [newItemPrice, setNewItemPrice] = React.useState('');

  const analysis: QuoteAnalysisResult = React.useMemo(() => {
    return evaluateServiceQuote(items);
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice) return;
    const priceNum = parseFloat(newItemPrice);
    if (isNaN(priceNum) || priceNum <= 0) return;

    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        name: newItemName.trim(),
        price: priceNum,
      },
    ]);
    setNewItemName('');
    setNewItemPrice('');
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleParsePasteText = () => {
    if (!pasteText.trim()) return;
    const lines = pasteText.split('\n');
    const parsed: QuoteEntry[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Extract trailing number
      const match = trimmed.match(/(.+?)[:\s–-]+(₹?\s*\d[\d,]*\.?\d*)$/);
      if (match && match[1] && match[2]) {
        const name = match[1].trim();
        const priceStr = match[2].replace(/[^\d.]/g, '');
        const price = parseFloat(priceStr);
        if (!isNaN(price) && price > 0) {
          parsed.push({ id: `p-${idx}-${Date.now()}`, name, price });
        }
      } else {
        // Simple fallback
        const words = trimmed.split(/\s+/);
        const lastWord = words[words.length - 1].replace(/[^\d.]/g, '');
        const price = parseFloat(lastWord);
        if (!isNaN(price) && words.length > 1) {
          const name = words.slice(0, -1).join(' ');
          parsed.push({ id: `p-${idx}-${Date.now()}`, name, price });
        }
      }
    });

    if (parsed.length > 0) {
      setItems(parsed);
      setPasteText('');
    }
  };

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(analysis.negotiationScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Service Quote Fairness Checker' },
        ]}
      />
      {/* Tool Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            🥇 Top MVP Tool
          </span>
          <span className="text-xs font-semibold text-slate-500">Service Estimate Intelligence</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          “Is This Service Quote Fair?” — Garage Estimate Auditor
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Paste or enter your service center estimate. Our intelligence engine audits each line item against Indian market benchmark pricing, highlights unmandated dealer add-on chemicals, and gives you a polite, ready-to-copy WhatsApp counter-script.
        </p>

        {/* Vehicle & Workshop Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Select Vehicle
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {VEHICLE_PRESETS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.brand})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Workshop Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setWorkshopType('authorized')}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  workshopType === 'authorized'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                OEM Authorized Center
              </button>
              <button
                type="button"
                onClick={() => setWorkshopType('independent')}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  workshopType === 'independent'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Independent / Multi-brand
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Itemized Line Table & Fast Entry */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Paste or Add Box */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Estimate Line Items ({items.length})</span>
              </h2>

              <button
                type="button"
                onClick={() => setItems(DEFAULT_QUOTE_ITEMS)}
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                Load Sample Estimate
              </button>
            </div>

            {/* Paste Raw Text Box */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
              <label className="block text-[11px] font-bold text-slate-700">
                Quick Paste Estimate (from WhatsApp or email message):
              </label>
              <textarea
                rows={2}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste here e.g.&#10;Engine oil 2800&#10;Brake pads 4500&#10;AC disinfection 1400"
                className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
              <button
                type="button"
                onClick={handleParsePasteText}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Parse &amp; Audit Pasted Text
              </button>
            </div>

            {/* Line Items List */}
            <div className="divide-y divide-slate-100">
              {analysis.items.map((item, idx) => (
                <div key={item.id || idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.status === 'fair' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Reasonable</span>
                        </span>
                      )}
                      {item.status === 'high' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Above Typical (+{item.percentageDiff}%)</span>
                        </span>
                      )}
                      {item.status === 'unnecessary' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-extrabold">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          <span>Check Required / Unnecessary</span>
                        </span>
                      )}
                      {item.status === 'unknown' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                          <span>Custom Item</span>
                        </span>
                      )}

                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-normal pl-1">{item.advice}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-900">
                        ₹{item.quotedPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        Fair: ₹{item.minFairPrice.toLocaleString('en-IN')} – ₹{item.maxFairPrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Manual Add Line Form */}
            <form onSubmit={handleAddItem} className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Add item e.g. Coolant replacement"
                className="w-full sm:flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="Price (₹)"
                className="w-full sm:w-28 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Quote Verdict & Negotiation Script */}
        <div className="space-y-6">
          {/* Verdict Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Quote Audit Verdict</span>
            </h2>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500">Your Quoted Total</div>
                  <div className="text-xl font-black text-slate-900">
                    ₹{analysis.totalQuoted.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-slate-500">Fair Market Band</div>
                  <div className="text-sm font-black text-emerald-700">
                    ₹{analysis.fairMinTotal.toLocaleString('en-IN')} – ₹{analysis.fairMaxTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {analysis.potentialSavings > 0 ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <div className="text-xs font-extrabold text-emerald-900">
                    Potential Savings Identified:
                  </div>
                  <div className="text-2xl font-black text-emerald-700 mt-0.5">
                    ₹{analysis.potentialSavings.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Found {analysis.unnecessaryCount} unmandated add-on(s) and {analysis.highCount} overpriced item(s).
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs font-bold text-emerald-800">
                  ✅ Clean Estimate: All entered items fall within acceptable Indian market service bands.
                </div>
              )}
            </div>

            {/* Polite Negotiation Counter-Script */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">The "Smart Customer" Counter-Script</span>
                <button
                  type="button"
                  onClick={copyScriptToClipboard}
                  className="flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy WhatsApp Message</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl text-[11px] font-mono leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
                {analysis.negotiationScript}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-1.5 text-[10px] text-slate-500 pt-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Estimates are indicative ranges based on Indian market data. Manufacturer service calculators describe their figures as estimates; actual prices vary by city tier and parts.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Box: Tyres & Maintenance */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('tyres')}
        title="Need Wear Parts Replaced (Tyres &amp; Brake Pads)?"
        contextHint="Dealership markups on tyres and pads can be 25-40% higher than authorized tyre networks with doorstep fitment:"
      />
    </div>
  );
}
