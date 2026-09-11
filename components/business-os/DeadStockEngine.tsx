'use client';

import React, { useState, useMemo } from 'react';
import {
  Archive,
  Plus,
  Trash2,
  AlertTriangle,
  Flame,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Boxes,
} from 'lucide-react';
import { DeadStockItem } from '@/lib/business-os/types';

export default function DeadStockEngine() {
  const [items, setItems] = useState<DeadStockItem[]>([
    {
      id: '1',
      name: 'Designer Anarkali Suits (Size XL & XXL)',
      category: 'Ethnic Wear',
      unitsInStock: 18,
      unitPurchaseCost: 1100,
      totalTrappedCapital: 19800,
      daysInStorage: 125,
      liquidationAction: 'clearance_discount',
      suggestedLiquidationPrice: 1250,
    },
    {
      id: '2',
      name: 'Ceramic Planter Pots (Floral Print)',
      category: 'Home Decor',
      unitsInStock: 35,
      unitPurchaseCost: 240,
      totalTrappedCapital: 8400,
      daysInStorage: 95,
      liquidationAction: 'bundle_deal',
      suggestedLiquidationPrice: 280,
    },
    {
      id: '3',
      name: 'Wireless Bluetooth Earbuds (Previous Gen)',
      category: 'Electronics',
      unitsInStock: 12,
      unitPurchaseCost: 750,
      totalTrappedCapital: 9000,
      daysInStorage: 180,
      liquidationAction: 'urgent_writeoff',
      suggestedLiquidationPrice: 700,
    },
  ]);

  const addItem = () => {
    const newItem: DeadStockItem = {
      id: Date.now().toString(),
      name: 'New Slow-Moving Item',
      category: 'General',
      unitsInStock: 10,
      unitPurchaseCost: 500,
      totalTrappedCapital: 5000,
      daysInStorage: 90,
      liquidationAction: 'clearance_discount',
      suggestedLiquidationPrice: 550,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof DeadStockItem, val: any) => {
    setItems(
      items.map((i) => {
        if (i.id === id) {
          const updated = { ...i, [field]: val };
          updated.totalTrappedCapital = (Number(updated.unitsInStock) || 0) * (Number(updated.unitPurchaseCost) || 0);
          return updated;
        }
        return i;
      })
    );
  };

  const totalTrappedMoney = useMemo(() => {
    return items.reduce((sum, i) => sum + i.totalTrappedCapital, 0);
  }, [items]);

  const deadItemsCount = useMemo(() => {
    return items.filter((i) => i.daysInStorage >= 90).length;
  }, [items]);

  const potentialUnlockCash = useMemo(() => {
    return items.reduce((sum, i) => sum + (i.unitsInStock * i.suggestedLiquidationPrice), 0);
  }, [items]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100 rounded-2xl text-amber-700 mt-0.5 shrink-0">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Inventory Dead Stock &amp; Trapped Capital Auditor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Unsold goods sitting in your godown or shop for &gt;90 days are not assets—they are frozen cash bleeding your working capital.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-amber-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">Trapped Cash in Stock</div>
          <div className="text-xl font-black text-rose-600">
            ₹{totalTrappedMoney.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Total Frozen Capital
          </span>
          <div className="text-2xl font-black text-rose-600">
            ₹{totalTrappedMoney.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500">Money stuck on wooden shelves</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Dead Stock Items (&gt;90 Days)
          </span>
          <div className="text-2xl font-black text-amber-700">
            {deadItemsCount} SKU Lines
          </div>
          <p className="text-[11px] text-slate-500">Immediate clearance required</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Unlockable Cash Flow
          </span>
          <div className="text-2xl font-black text-emerald-600">
            ₹{potentialUnlockCash.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-700 font-bold">Via flash liquidation sale</p>
        </div>
      </div>

      {/* Item Audit Table */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-indigo-600" />
            <span>Slow-Moving &amp; Stale Inventory Ledger</span>
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stock Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isDead = item.daysInStorage >= 90;
            return (
              <div
                key={item.id}
                className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-500">{idx + 1}.</span>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      className="font-extrabold text-xs text-slate-900 bg-white px-2 py-1 border border-slate-200 rounded-lg flex-1"
                    />
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        isDead
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {item.daysInStorage} Days in Stock
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Units in Stock</span>
                      <input
                        type="number"
                        min="1"
                        value={item.unitsInStock}
                        onChange={(e) => updateItem(item.id, 'unitsInStock', Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Purchase Cost / Unit (₹)</span>
                      <input
                        type="number"
                        min="0"
                        value={item.unitPurchaseCost}
                        onChange={(e) => updateItem(item.id, 'unitPurchaseCost', Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Storage Age (Days)</span>
                      <input
                        type="number"
                        min="1"
                        value={item.daysInStorage}
                        onChange={(e) => updateItem(item.id, 'daysInStorage', Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Flash Liquidation Price (₹)</span>
                      <input
                        type="number"
                        min="0"
                        value={item.suggestedLiquidationPrice}
                        onChange={(e) => updateItem(item.id, 'suggestedLiquidationPrice', Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 border border-slate-200 rounded-lg font-bold text-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Trapped Capital</span>
                    <div className="text-sm font-black text-rose-600">
                      ₹{item.totalTrappedCapital.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
