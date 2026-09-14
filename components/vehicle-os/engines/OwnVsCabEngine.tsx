'use client';

import * as React from 'react';
import {
  Car,
  Sparkles,
} from 'lucide-react';

export function OwnVsCabEngine() {
  const [monthlyKm, setMonthlyKm] = React.useState<number>(850);
  const [cabFarePerKm, setCabFarePerKm] = React.useState<number>(18.5); // Average Ola/Uber city fare
  const [cabBaseSurgePerTrip, setCabBaseSurgePerTrip] = React.useState<number>(45);
  const [monthlyTrips, setMonthlyTrips] = React.useState<number>(36);

  // Own car parameters
  const [carEMI, setCarEMI] = React.useState<number>(14500);
  const [carMileage, setCarMileage] = React.useState<number>(14.5);
  const [fuelPrice, setFuelPrice] = React.useState<number>(102);
  const [monthlyParking, setMonthlyParking] = React.useState<number>(1500);
  const [monthlyInsuranceService, setMonthlyInsuranceService] = React.useState<number>(2500);

  // Public transport estimate
  const transitCostPerMonth = Math.round(monthlyTrips * 75); // Metro/Bus combo

  // Computations
  const ownCarFuel = Math.round(((monthlyKm || 0) / (carMileage || 1)) * fuelPrice);
  const totalOwnCarMonth = carEMI + ownCarFuel + monthlyParking + monthlyInsuranceService;

  const totalCabMonth = Math.round((monthlyKm || 0) * cabFarePerKm + monthlyTrips * cabBaseSurgePerTrip);

  const fuelPerKm = fuelPrice / (carMileage || 1);
  const fixedCarCosts = carEMI + monthlyParking + monthlyInsuranceService;
  const netCabPremiumPerKm = cabFarePerKm - fuelPerKm;
  const breakEvenKmMonth =
    netCabPremiumPerKm > 0 ? Math.round(fixedCarCosts / netCabPremiumPerKm) : 2500;

  const cheapest =
    transitCostPerMonth < Math.min(totalOwnCarMonth, totalCabMonth)
      ? 'transit'
      : totalCabMonth < totalOwnCarMonth
      ? 'cab'
      : 'own';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Car className="w-4 h-4 text-amber-600" />
            <span>Your Commute &amp; Vehicle Assumptions</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Commute (km)</label>
              <input
                type="number"
                value={monthlyKm}
                onChange={(e) => setMonthlyKm(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Trips Count</label>
              <input
                type="number"
                value={monthlyTrips}
                onChange={(e) => setMonthlyTrips(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Car Loan Monthly EMI (₹)</label>
              <input
                type="number"
                value={carEMI}
                onChange={(e) => setCarEMI(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Parking &amp; Tolls (₹)</label>
              <input
                type="number"
                value={monthlyParking}
                onChange={(e) => setMonthlyParking(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Insurance &amp; Service / mo (₹)</label>
              <input
                type="number"
                value={monthlyInsuranceService}
                onChange={(e) => setMonthlyInsuranceService(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cab Fare Average (₹ / km)</label>
              <input
                type="number"
                step="0.5"
                value={cabFarePerKm}
                onChange={(e) => setCabFarePerKm(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Output */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Monthly Comparison
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">Commute Cost Verdict</h2>
          </div>

          {/* 3 Modalities */}
          <div className="space-y-3 font-mono text-xs">
            <div
              className={`p-3.5 rounded-2xl border flex justify-between items-center ${
                cheapest === 'own' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="font-bold font-sans text-slate-900">Own Car</div>
                <div className="text-[10px] text-slate-500 font-sans">EMI + Fuel + Parking</div>
              </div>
              <div className="text-right">
                <div className="text-base font-black text-slate-900">₹{totalOwnCarMonth.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-slate-500">/ month</div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border flex justify-between items-center ${
                cheapest === 'cab' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="font-bold font-sans text-slate-900">On-Demand Cabs (Ola/Uber)</div>
                <div className="text-[10px] text-slate-500 font-sans">{monthlyTrips} trips @ ₹{cabFarePerKm}/km</div>
              </div>
              <div className="text-right">
                <div className="text-base font-black text-slate-900">₹{totalCabMonth.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-slate-500">/ month</div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border flex justify-between items-center ${
                cheapest === 'transit' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="font-bold font-sans text-slate-900">Public Transit (Metro/Bus)</div>
                <div className="text-[10px] text-slate-500 font-sans">Fixed daily commute</div>
              </div>
              <div className="text-right">
                <div className="text-base font-black text-emerald-700">₹{transitCostPerMonth.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-slate-500">/ month</div>
              </div>
            </div>
          </div>

          {/* Break-Even km callout */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5 text-amber-900">
            <div className="font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>The Crossover Threshold:</span>
            </div>
            <p className="leading-relaxed">
              At your current running ({monthlyKm} km/mo), taking <strong>cabs saves ₹{Math.abs(totalOwnCarMonth - totalCabMonth).toLocaleString('en-IN')}/month</strong> over car ownership.
            </p>
            <p className="font-bold text-amber-800">
              👉 Owning a car only becomes cheaper than cabs above approximately ~{breakEvenKmMonth.toLocaleString('en-IN')} km/month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
