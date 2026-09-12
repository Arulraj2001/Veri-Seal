'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  Receipt,
  TrendingUp,
  Plus,
  Trash2,
  PieChart,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { analyzeServiceInvoice } from '@/lib/vehicle-os/calculations';
import { ServiceInvoiceItem, InvoiceAnalysisResult } from '@/lib/vehicle-os/types';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';
import { saveGarageVehicle, getGarageVehicles } from '@/lib/vehicle-os/garage-store';

const DEFAULT_INVOICE_ITEMS: ServiceInvoiceItem[] = [
  { id: '1', description: 'Engine Oil 0W-20 Synthetic', type: 'parts', amount: 3200 },
  { id: '2', description: 'Oil Filter Cartridge', type: 'parts', amount: 380 },
  { id: '3', description: 'Front Brake Pads Set (Ceramic)', type: 'parts', amount: 2600 },
  { id: '4', description: 'Periodic Paid Service Labour (PMS 30k)', type: 'labour', amount: 1600 },
  { id: '5', description: 'Brake Disc Caliper Greasing Labour', type: 'labour', amount: 450 },
  { id: '6', description: 'CGST 9% + SGST 9% (Combined 18%)', type: 'tax', amount: 1480 },
];

export default function ServiceInvoiceAnalyzerPage() {
  const [items, setItems] = React.useState<ServiceInvoiceItem[]>(DEFAULT_INVOICE_ITEMS);
  const [previousServiceTotal, setPreviousServiceTotal] = React.useState<number>(6580);
  const [kmDrivenSinceLastService, setKmDrivenSinceLastService] = React.useState<number>(9800);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  // Form inputs
  const [descInput, setDescInput] = React.useState('');
  const [typeInput, setTypeInput] = React.useState<'parts' | 'labour' | 'tax' | 'upsell'>('parts');
  const [amountInput, setAmountInput] = React.useState('');

  const analysis: InvoiceAnalysisResult = React.useMemo(() => {
    return analyzeServiceInvoice(items, previousServiceTotal, kmDrivenSinceLastService);
  }, [items, previousServiceTotal, kmDrivenSinceLastService]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descInput.trim() || !amountInput) return;
    const num = parseFloat(amountInput);
    if (isNaN(num) || num <= 0) return;

    setItems((prev) => [
      ...prev,
      {
        id: `inv-${Date.now()}`,
        description: descInput.trim(),
        type: typeInput,
        amount: num,
      },
    ]);
    setDescInput('');
    setAmountInput('');
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSaveToGarage = () => {
    const currentVehicles = getGarageVehicles();
    if (currentVehicles.length > 0) {
      const primary = { ...currentVehicles[0] };
      primary.lastServiceDate = new Date().toISOString().split('T')[0];
      primary.lastServiceOdo = primary.odometer;
      saveGarageVehicle(primary);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Service Invoice Line-Item Auditor' },
        ]}
      />
      {/* Page Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black uppercase tracking-wider">
            🥈 Top MVP Tool
          </span>
          <span className="text-xs font-semibold text-slate-500">Service Invoice &amp; Cost-Driver Auditor</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Service Invoice Analyzer — Track Inflation &amp; Parts vs Labour
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Deconstruct completed garage invoices into Parts, Labour, and Taxes. Compare against your previous service bill to identify exactly which replacement item drove your cost increase.
        </p>

        {/* Prior Service Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Previous Service Bill Total (₹)
            </label>
            <input
              type="number"
              value={previousServiceTotal}
              onChange={(e) => setPreviousServiceTotal(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. 6580"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Kilometers Driven Since Last Service
            </label>
            <input
              type="number"
              value={kmDrivenSinceLastService}
              onChange={(e) => setKmDrivenSinceLastService(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. 10000"
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Line Item Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-amber-600" />
                <span>Invoice Line Items ({items.length})</span>
              </h2>

              <button
                type="button"
                onClick={() => setItems(DEFAULT_INVOICE_ITEMS)}
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                Reset Default Items
              </button>
            </div>

            {/* Items Table */}
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        item.type === 'parts'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : item.type === 'labour'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : item.type === 'tax'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{item.description}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-900">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Item Form */}
            <form onSubmit={handleAddItem} className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-2">
              <input
                type="text"
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                placeholder="Item name e.g. Cabin AC filter"
                className="sm:col-span-6 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value as any)}
                className="sm:col-span-3 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="parts">Parts</option>
                <option value="labour">Labour</option>
                <option value="tax">Tax / GST</option>
                <option value="upsell">Discretionary</option>
              </select>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder="Amount (₹)"
                className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="sm:col-span-1 p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs flex items-center justify-center transition-colors"
                title="Add item"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Invoice Anatomy & Inflation Delta */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-amber-600" />
              <span>Invoice Breakdown</span>
            </h2>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Total Invoice Amount:</span>
                <span className="text-xl font-black text-slate-900">
                  ₹{analysis.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Stacked percentage bar */}
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div style={{ width: `${analysis.partsPercentage}%` }} className="bg-blue-600" title="Parts" />
                <div style={{ width: `${analysis.labourPercentage}%` }} className="bg-amber-500" title="Labour" />
                <div style={{ width: `${analysis.taxPercentage}%` }} className="bg-slate-400" title="Tax" />
              </div>

              <div className="grid grid-cols-3 text-center text-[10px] font-bold text-slate-600 gap-1 pt-1">
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-1" />
                  <span>Parts: {analysis.partsPercentage}%</span>
                  <div className="text-slate-900 font-extrabold">₹{analysis.partsAmount.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />
                  <span>Labour: {analysis.labourPercentage}%</span>
                  <div className="text-slate-900 font-extrabold">₹{analysis.labourAmount.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-1" />
                  <span>GST: {analysis.taxPercentage}%</span>
                  <div className="text-slate-900 font-extrabold">₹{analysis.taxAmount.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Prior Service Inflation Delta */}
            {analysis.previousServiceDelta && (
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900">Compared to Last Service:</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    +{analysis.previousServiceDelta.percentageDiff}% (₹{analysis.previousServiceDelta.amountDiff.toLocaleString('en-IN')})
                  </span>
                </div>

                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                  {analysis.previousServiceDelta.primaryDriver}
                </p>
              </div>
            )}

            {/* Cost Per Kilometer */}
            {analysis.costPerKmSinceLastService && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Maintenance Cost / km:</span>
                </div>
                <span className="text-xs font-black text-slate-900">
                  ₹{analysis.costPerKmSinceLastService} / km
                </span>
              </div>
            )}

            {/* Save to Garage CTA */}
            <button
              type="button"
              onClick={handleSaveToGarage}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Saved to Digital Garage!</span>
                </>
              ) : (
                <>
                  <span>Save Record to My Garage</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Box */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('battery')}
        title="Automotive Battery Replacements"
        contextHint="Save ₹800+ when exchanging your dead battery through verified doorstep dealers with genuine warranty cards:"
      />
    </div>
  );
}
