'use client';

import React from 'react';
import { RupeeBreakdownItem } from '@/lib/business-os/types';

interface Props {
  items: RupeeBreakdownItem[];
  totalSales: number;
}

export default function RupeeBreakdownBar({ items, totalSales }: Props) {
  if (totalSales <= 0 || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            Cash-Flow Anatomy
          </span>
          <h4 className="text-base font-extrabold text-slate-900 mt-1">
            Where Did Every ₹100 Earned Go Today?
          </h4>
        </div>
        <span className="text-xs font-bold text-slate-500">
          Based on ₹{totalSales.toLocaleString('en-IN')} total daily revenue
        </span>
      </div>

      {/* Segmented Horizontal Bar */}
      <div className="w-full h-7 rounded-2xl overflow-hidden flex bg-slate-100 p-0.5 shadow-inner">
        {items.map((item, idx) => {
          if (item.amountPerHundred <= 0) return null;
          return (
            <div
              key={idx}
              style={{
                width: `${Math.max(3, item.amountPerHundred)}%`,
                backgroundColor: item.color,
              }}
              className="h-full first:rounded-l-xl last:rounded-r-xl transition-all duration-300 relative group cursor-pointer"
              title={`${item.label}: ₹${item.amountPerHundred} of every ₹100 (₹${item.totalRupees.toLocaleString('en-IN')})`}
            />
          );
        })}
      </div>

      {/* Legend & Breakdown Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1 shadow-xs"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 font-medium truncate">{item.label}</span>
            </div>
            <div className="text-base font-black text-slate-900">
              ₹{item.amountPerHundred}
            </div>
            <span className="text-[10px] text-slate-500 block">
              ₹{item.totalRupees.toLocaleString('en-IN')} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
