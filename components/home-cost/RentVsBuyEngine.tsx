'use client';

import React, { useState, useMemo } from 'react';
import {
  Home,
  Building,
  TrendingUp,
  Coins,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { calculateRentVsBuy } from '@/lib/home-cost/calculations';

export default function RentVsBuyEngine() {
  const [monthlyRent, setMonthlyRent] = useState<number>(25000);
  const [propertyPrice, setPropertyPrice] = useState<number>(7500000); // 75 Lakhs
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [homeLoanInterestPercent, setHomeLoanInterestPercent] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);
  const [propertyAppreciationPercent, setPropertyAppreciationPercent] = useState<number>(5.5);
  const [rentInflationPercent, setRentInflationPercent] = useState<number>(5.0);
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState<number>(12.0);

  const model = useMemo(() => {
    return calculateRentVsBuy({
      monthlyRent,
      propertyPrice,
      downPaymentPercent,
      homeLoanInterestPercent,
      loanTenureYears,
      propertyAppreciationPercent,
      rentInflationPercent,
      investmentReturnPercent,
    });
  }, [
    monthlyRent,
    propertyPrice,
    downPaymentPercent,
    homeLoanInterestPercent,
    loanTenureYears,
    propertyAppreciationPercent,
    rentInflationPercent,
    investmentReturnPercent,
  ]);

  return (
    <div className="space-y-8">
      {/* Parameters Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <Home className="w-5 h-5 text-emerald-400" />
          <span>Indian Real Estate &amp; Financial Market Parameters</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Current Monthly Rent (₹)
            </label>
            <input
              type="number"
              step={1000}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Property Purchase Price (₹)
            </label>
            <input
              type="number"
              step={100000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold"
            />
            <p className="text-[11px] text-slate-500 mt-1">₹{(propertyPrice / 100000).toFixed(1)} Lakhs</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Down Payment %
            </label>
            <input
              type="number"
              min={10}
              max={50}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold"
            />
            <p className="text-[11px] text-slate-500 mt-1">₹{(model.downPayment / 100000).toFixed(1)} Lakhs cash</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Home Loan Interest %
            </label>
            <input
              type="number"
              step={0.1}
              value={homeLoanInterestPercent}
              onChange={(e) => setHomeLoanInterestPercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold"
            />
            <p className="text-[11px] text-slate-500 mt-1">SBI/HDFC home loan rate</p>
          </div>
        </div>

        {/* Growth Rates Sub-grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">Expected Property Appreciation</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step={0.5}
                value={propertyAppreciationPercent}
                onChange={(e) => setPropertyAppreciationPercent(Number(e.target.value))}
                className="w-20 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-bold text-center"
              />
              <span className="text-slate-500">% per year</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">Expected Annual Rent Inflation</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step={0.5}
                value={rentInflationPercent}
                onChange={(e) => setRentInflationPercent(Number(e.target.value))}
                className="w-20 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-bold text-center"
              />
              <span className="text-slate-500">% per year</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">Equity Index / Mutual Fund SIP Return</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step={0.5}
                value={investmentReturnPercent}
                onChange={(e) => setInvestmentReturnPercent(Number(e.target.value))}
                className="w-20 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-bold text-center"
              />
              <span className="text-slate-500">% per year (Nifty 50)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Monthly Home Loan EMI</span>
          <div className="text-3xl font-black text-white mt-1">
            ₹{model.emi.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Loan amount: ₹{(model.loanAmount / 100000).toFixed(1)} Lakhs
          </span>
        </div>

        <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-5">
          <span className="text-xs text-emerald-400 font-bold block">Buyer 10-Year Net Worth</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            ₹{(model.buyerNetWorth / 100000).toFixed(1)} <span className="text-sm font-normal text-slate-400">Lakhs</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Property value minus loan balance
          </span>
        </div>

        <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-5">
          <span className="text-xs text-sky-400 font-bold block">Renter 10-Year Net Worth (SIP)</span>
          <div className="text-3xl font-black text-sky-400 mt-1">
            ₹{(model.renterNetWorth / 100000).toFixed(1)} <span className="text-sm font-normal text-slate-400">Lakhs</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Down payment + monthly difference invested
          </span>
        </div>
      </div>

      {/* 10-Year Verdict Card */}
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
          10-Year Wealth Creation Verdict
        </span>
        <h4 className="text-xl font-extrabold text-white">
          {model.recommendation} by ₹{(model.netDifference / 100000).toFixed(1)} Lakhs
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          {model.buyerNetWorth > model.renterNetWorth ? (
            <>
              At a {propertyAppreciationPercent}% annual property appreciation rate, the forced savings of paying down principal combined with real estate compounding creates higher net worth than renting, even after accounting for loan interest.
            </>
          ) : (
            <>
              Renting while consistently investing the ₹{(model.downPayment / 100000).toFixed(1)} Lakh down payment and the monthly EMI-rent difference (₹{Math.max(0, model.emi - monthlyRent).toLocaleString('en-IN')}/mo) into a {investmentReturnPercent}% equity index fund creates more liquid wealth over 10 years than paying heavy bank interest.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
