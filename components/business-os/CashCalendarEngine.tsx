'use client';

import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Plus,
  Trash2,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Building,
  Receipt,
  Users,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { CashCalendarEvent } from '@/lib/business-os/types';

export default function CashCalendarEngine() {
  const [currentCashBalance, setCurrentCashBalance] = useState<number>(85000);

  const [events, setEvents] = useState<CashCalendarEvent[]>([
    {
      id: '1',
      date: '2026-09-15',
      description: 'Customer Bulk Order Payment (Sharma Garments)',
      amount: 42000,
      type: 'inflow',
      category: 'customer_payment',
      isConfirmed: true,
    },
    {
      id: '2',
      date: '2026-09-18',
      description: 'Raw Material Supplier Bill (Surat Textile)',
      amount: 48000,
      type: 'outflow',
      category: 'supplier_bill',
      isConfirmed: true,
    },
    {
      id: '3',
      date: '2026-09-20',
      description: 'Monthly GST 3B & TDS Tax Settlement',
      amount: 22500,
      type: 'outflow',
      category: 'gst_tax',
      isConfirmed: true,
    },
    {
      id: '4',
      date: '2026-09-25',
      description: 'Direct WhatsApp Sales Expected Collection',
      amount: 35000,
      type: 'inflow',
      category: 'customer_payment',
      isConfirmed: false,
    },
    {
      id: '5',
      date: '2026-09-30',
      description: 'Commercial Shop Rent Payment',
      amount: 28000,
      type: 'outflow',
      category: 'rent',
      isConfirmed: true,
    },
    {
      id: '6',
      date: '2026-10-05',
      description: 'Staff Salaries & Helper Wages',
      amount: 45000,
      type: 'outflow',
      category: 'staff_salary',
      isConfirmed: true,
    },
  ]);

  const addEvent = () => {
    const newEv: CashCalendarEvent = {
      id: Date.now().toString(),
      date: '2026-09-22',
      description: 'New Scheduled Inflow/Outflow',
      amount: 15000,
      type: 'outflow',
      category: 'supplier_bill',
      isConfirmed: true,
    };
    setEvents([...events, newEv]);
  };

  const removeEvent = (id: string) => {
    if (events.length <= 1) return;
    setEvents(events.filter((e) => e.id !== id));
  };

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  // Calculate cumulative balance progression
  const timelineData = useMemo(() => {
    let runningBalance = currentCashBalance;
    let minBalance = currentCashBalance;
    let minBalanceDate = '';

    const computed = sortedEvents.map((ev) => {
      if (ev.type === 'inflow') {
        runningBalance += ev.amount;
      } else {
        runningBalance -= ev.amount;
      }

      if (runningBalance < minBalance) {
        minBalance = runningBalance;
        minBalanceDate = ev.date;
      }

      return {
        ...ev,
        projectedBalance: runningBalance,
      };
    });

    return {
      events: computed,
      finalBalance: runningBalance,
      minBalance,
      minBalanceDate,
      hasNegativeCrunch: minBalance < 0,
    };
  }, [currentCashBalance, sortedEvents]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-indigo-100 rounded-2xl text-indigo-700 mt-0.5 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              30-Day Business Cash Flow Calendar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Forecast your exact bank balance on every upcoming date after rent, staff wages, GST, and supplier cheques clear.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-indigo-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Projected Month-End Balance</div>
          <div
            className={`text-xl font-black ${
              timelineData.finalBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            ₹{timelineData.finalBalance.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Starting Balance Input & Alert */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Current Bank &amp; Drawer Cash
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-sm">₹</span>
            <input
              type="number"
              min="0"
              value={currentCashBalance || ''}
              onChange={(e) => setCurrentCashBalance(Math.max(0, Number(e.target.value)))}
              className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-900 focus:bg-white focus:border-indigo-500"
            />
          </div>
          <span className="text-[10px] text-slate-400">Available liquidity today</span>
        </div>

        <div className="md:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Cash Crunch Forecast
            </span>
            {timelineData.hasNegativeCrunch ? (
              <div className="text-sm font-black text-rose-600 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Account dips to -₹{Math.abs(timelineData.minBalance).toLocaleString('en-IN')} around {timelineData.minBalanceDate}!</span>
              </div>
            ) : (
              <div className="text-sm font-black text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safe liquidity buffer maintained throughout all scheduled obligations.</span>
              </div>
            )}
            <p className="text-[11px] text-slate-500">
              Lowest cash point projected: ₹{timelineData.minBalance.toLocaleString('en-IN')}
            </p>
          </div>

          <button
            type="button"
            onClick={addEvent}
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 shrink-0 cursor-pointer"
          >
            + Schedule Event
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
          Chronological Cash Movements Timeline
        </h3>

        <div className="space-y-3">
          {timelineData.events.map((ev, idx) => {
            const isInflow = ev.type === 'inflow';
            const isNegative = ev.projectedBalance < 0;
            return (
              <div
                key={ev.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isNegative
                    ? 'bg-rose-50/70 border-rose-300'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isInflow ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isInflow ? '+' : '-'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900">{ev.description}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {ev.date}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Category: {ev.category.replace('_', ' ').toUpperCase()} • {ev.isConfirmed ? 'Confirmed' : 'Expected'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="text-right">
                    <div
                      className={`text-sm font-black ${
                        isInflow ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {isInflow ? '+' : '-'}₹{ev.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold">
                      Balance after: <strong className={isNegative ? 'text-rose-600 font-black' : 'text-slate-700'}>₹{ev.projectedBalance.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  {events.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEvent(ev.id)}
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
