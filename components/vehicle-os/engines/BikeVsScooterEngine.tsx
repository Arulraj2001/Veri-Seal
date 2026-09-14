'use client';

import * as React from 'react';
import {
  Coins,
} from 'lucide-react';

export function BikeVsScooterEngine() {
  const [dailyKm, setDailyKm] = React.useState<number>(35); // Daily commute distance
  const [bootSpaceNeeded, setBootSpaceNeeded] = React.useState<'critical' | 'nice-to-have' | 'not-needed'>('critical');
  const [gearlessPreference, setGearlessPreference] = React.useState<'prefer-auto' | 'fine-with-gears'>('prefer-auto');
  const [fuelPrice, setFuelPrice] = React.useState<number>(102);

  // Commuter Bike (e.g. Hero Splendor 100 / Honda Shine 125)
  // Price: ₹95,000 | Mileage: ~62 km/L | Tyres: ₹3,500/pair | Maintenance: ₹1,400/yr
  const monthlyKm = dailyKm * 26; // 26 working days
  const bikeFuelMonth = Math.round(((monthlyKm || 0) / 62) * fuelPrice);
  const bikeMaintMonth = Math.round(1400 / 12);
  const bikeTotalMonth = bikeFuelMonth + bikeMaintMonth;

  // Gearless Scooter (e.g. Honda Activa 6G / TVS Jupiter)
  // Price: ₹98,000 | Mileage: ~48 km/L | Tyres: ₹3,200/pair | Maintenance: ₹1,500/yr
  const scooterFuelMonth = Math.round(((monthlyKm || 0) / 48) * fuelPrice);
  const scooterMaintMonth = Math.round(1500 / 12);
  const scooterTotalMonth = scooterFuelMonth + scooterMaintMonth;

  const monthlyFuelDiff = Math.abs(scooterFuelMonth - bikeFuelMonth);
  const annualSavingsBike = monthlyFuelDiff * 12;

  let recommendation = '';
  let winner: 'bike' | 'scooter' = 'scooter';

  if (bootSpaceNeeded === 'critical' || gearlessPreference === 'prefer-auto') {
    winner = 'scooter';
    recommendation = `🛵 Gearless Scooter (Honda Activa / TVS Jupiter) is your best match. Although a commuter bike saves ₹${annualSavingsBike.toLocaleString('en-IN')}/year in petrol, the scooter’s massive under-seat boot storage, front footboard for groceries, and effortless clutchless automatic CVT make it infinitely superior for family and urban city errands.`;
  } else if (dailyKm >= 45) {
    winner = 'bike';
    recommendation = `🏍️ Commuter Motorcycle (Hero Splendor / Honda Shine) is your best match. At ${dailyKm} km/day (${monthlyKm} km/mo), the bike's 62 km/L economy saves you ₹${annualSavingsBike.toLocaleString('en-IN')} annually in pure petrol savings, plus 18-inch wheels handle highway potholes with far better spinal comfort.`;
  } else {
    winner = 'scooter';
    recommendation = `🛵 Gearless Scooter recommended for convenience, helmet storage, and shared multi-family member usability.`;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>Your Daily Usage Profile</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Daily Commute Distance (km)</label>
              <input
                type="number"
                value={dailyKm}
                onChange={(e) => setDailyKm(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                ~{monthlyKm.toLocaleString('en-IN')} km per month
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Luggage &amp; Boot Space Need</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'critical', label: 'Essential (Helmet, Groceries)' },
                  { id: 'nice-to-have', label: 'Nice to have' },
                  { id: 'not-needed', label: 'Not Needed (Backpack)' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBootSpaceNeeded(b.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left ${
                      bootSpaceNeeded === b.id
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Clutch &amp; Gear Preference</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGearlessPreference('prefer-auto')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    gearlessPreference === 'prefer-auto'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Prefer Gearless Automatic (CVT)
                </button>
                <button
                  type="button"
                  onClick={() => setGearlessPreference('fine-with-gears')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    gearlessPreference === 'fine-with-gears'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Comfortable with Manual Gears
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Output */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Recommended Choice
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              {winner === 'scooter' ? '🛵 Gearless Scooter' : '🏍️ Commuter Motorcycle'}
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {recommendation}
          </p>

          {/* Monthly Operating Spread */}
          <div className="space-y-2.5 font-mono text-xs border-t border-slate-200 pt-3">
            <div className="flex justify-between items-center text-slate-700">
              <span>Motorcycle (Splendor / Shine):</span>
              <span className="font-bold text-slate-900">₹{bikeTotalMonth.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span>Scooter (Activa / Jupiter):</span>
              <span className="font-bold text-slate-900">₹{scooterTotalMonth.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center text-emerald-700 font-bold">
              <span>Annual Fuel Difference:</span>
              <span>₹{annualSavingsBike.toLocaleString('en-IN')} / year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
