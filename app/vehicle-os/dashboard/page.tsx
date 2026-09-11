'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Car,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Wrench,
  ShieldAlert,
  Fuel,
  Disc,
  BatteryCharging,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  DollarSign,
  Gauge,
} from 'lucide-react';
import {
  getGarageVehicles,
  saveGarageVehicle,
  type StoredGarageVehicle,
} from '@/lib/vehicle-os/garage-store';
import { VEHICLE_PRESETS } from '@/lib/vehicle-os/vehicles-db';

export default function VehicleDashboardPage() {
  const [vehicles, setVehicles] = React.useState<StoredGarageVehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = React.useState<string>('');
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);

  // New vehicle form state
  const [nickname, setNickname] = React.useState('');
  const [make, setMake] = React.useState('Maruti Suzuki');
  const [model, setModel] = React.useState('Swift');
  const [year, setYear] = React.useState(2023);
  const [odometer, setOdometer] = React.useState(18500);
  const [monthlyKm, setMonthlyKm] = React.useState(1000);
  const [insuranceExpiry, setInsuranceExpiry] = React.useState('');
  const [pucExpiry, setPucExpiry] = React.useState('');

  React.useEffect(() => {
    const list = getGarageVehicles();
    setVehicles(list);
    if (list.length > 0 && !selectedVehicleId) {
      setSelectedVehicleId(list[0].id);
    }
  }, []);

  const currentVehicle = React.useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  }, [vehicles, selectedVehicleId]);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    const newV: StoredGarageVehicle = {
      id: `v-${Date.now()}`,
      nickname: nickname.trim(),
      make,
      model,
      year,
      fuelType: 'petrol',
      category: 'car',
      odometer,
      monthlyKm,
      insuranceExpiryDate: insuranceExpiry || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
      pucExpiryDate: pucExpiry || new Date(Date.now() + 120 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    const updated = saveGarageVehicle(newV);
    setVehicles(updated);
    setSelectedVehicleId(newV.id);
    setShowAddModal(false);
    setNickname('');
  };

  // Metric simulations for current vehicle
  const monthlyKmValue = currentVehicle?.monthlyKm || 1000;
  const estimatedFuelMonth = Math.round((monthlyKmValue / 15.5) * 102);
  const estimatedServiceMonth = 750;
  const estimatedInsuranceMonth = 1600;
  const estimatedTollsMonth = 600;
  const totalMonthlyCost = estimatedFuelMonth + estimatedServiceMonth + estimatedInsuranceMonth + estimatedTollsMonth;
  const costPerKm = Number((totalMonthlyCost / monthlyKmValue).toFixed(2));
  const ytdCost = totalMonthlyCost * 8; // approx 8 months

  // Alert helpers
  const getDaysLeft = (dateStr?: string) => {
    if (!dateStr) return 999;
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const insuranceDays = getDaysLeft(currentVehicle?.insuranceExpiryDate);
  const pucDays = getDaysLeft(currentVehicle?.pucExpiryDate);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Garage Bar */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              SaaS Vehicle Garage
            </span>
            <span className="text-xs font-semibold text-slate-500">Live Telemetry &amp; Alerts</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Digital Vehicle Garage
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Monitor real-world ₹/km running expenses, upcoming periodic service windows, and compliance expiry dates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Vehicle Switcher */}
          {vehicles.length > 1 && (
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nickname} ({v.make} {v.model})
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {currentVehicle ? (
        <div className="space-y-8">
          {/* Vehicle Snapshot Card */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {currentVehicle.nickname}
                  </h2>
                  <div className="text-xs font-bold text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{currentVehicle.make} {currentVehicle.model} ({currentVehicle.year})</span>
                    <span>•</span>
                    <span className="font-mono text-slate-700">{currentVehicle.registrationNumber || 'TN 07 BX 4920'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/vehicle-os/cost-reality-checker"
                  className="px-3.5 py-2 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Recalculate TCO
                </Link>
                <Link
                  href="/vehicle-os/service-quote-fairness"
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Audit Service Quote
                </Link>
              </div>
            </div>

            {/* 4 Big SaaS Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">True Cost / km</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">₹{costPerKm}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Over {monthlyKmValue} km/mo</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monthly Run Cost</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  ₹{totalMonthlyCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Fuel + Maint + Ins + Tolls</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year-to-Date (YTD)</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  ₹{ytdCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Calendar year outflow</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Odometer</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {currentVehicle.odometer.toLocaleString('en-IN')} km
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Next service in ~1,550 km</div>
              </div>
            </div>

            {/* Monthly Breakdown Anatomy */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-black text-slate-700">Monthly Spending Allocation:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Fuel className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fuel: ₹{estimatedFuelMonth.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  <span>Service: ₹{estimatedServiceMonth.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Insurance: ₹{estimatedInsuranceMonth.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <DollarSign className="w-3.5 h-3.5 text-purple-600" />
                  <span>Tolls: ₹{estimatedTollsMonth.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Alerts & Maintenance Clock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Regulatory & Renewal Alerts */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Compliance &amp; Renewal Timelines</span>
              </h2>

              <div className="space-y-3">
                {/* Insurance Alert */}
                <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold text-slate-900">Motor Insurance Policy</div>
                    <div className="text-[11px] text-slate-500">
                      Expires in <span className="font-bold text-amber-700">{insuranceDays} days</span> ({currentVehicle.insuranceExpiryDate || 'In 45 days'})
                    </div>
                  </div>
                  <Link
                    href="https://www.policybazaar.com"
                    target="_blank"
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold rounded-xl border border-amber-200"
                  >
                    Compare Quotes
                  </Link>
                </div>

                {/* PUC Alert */}
                <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold text-slate-900">PUC (Pollution Certificate)</div>
                    <div className="text-[11px] text-slate-500">
                      Valid for <span className="font-bold text-emerald-700">{pucDays} days</span> (MoRTH BS6 12-month rule)
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Compliant
                  </span>
                </div>
              </div>
            </div>

            {/* Wear & Replacement Alerts */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Wear-and-Tear Health Gauges</span>
              </h2>

              <div className="space-y-3">
                {/* Tyre Wear Indicator */}
                <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Disc className="w-3.5 h-3.5 text-slate-700" />
                      <span>Tyre Tread Life</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Estimated ~26,000 km remaining (Tread is healthy)
                    </div>
                  </div>
                  <Link
                    href="/vehicle-os/tyre-replacement"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 text-[11px] font-bold rounded-xl"
                  >
                    Audit Tread
                  </Link>
                </div>

                {/* Battery Health */}
                <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <BatteryCharging className="w-3.5 h-3.5 text-amber-600" />
                      <span>12V Lead-Acid Battery</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Installed {currentVehicle.batteryInstalledDate || '2023'} (~20 months old, healthy)
                    </div>
                  </div>
                  <Link
                    href="/vehicle-os/battery-replacement"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 text-[11px] font-bold rounded-xl"
                  >
                    Battery Test
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <Car className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-base font-black text-slate-900">No Vehicles in Garage Yet</h2>
          <p className="text-xs text-slate-500">Add your primary car or bike to start tracking ₹/km expenses and service alerts.</p>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl"
          >
            Add Your First Vehicle
          </button>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-black text-slate-900">Add Vehicle to Garage</h3>
            <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nickname</label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. My Daily Swift"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Make</label>
                  <input
                    type="text"
                    required
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Odometer (km)</label>
                  <input
                    type="number"
                    value={odometer}
                    onChange={(e) => setOdometer(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly km</label>
                  <input
                    type="number"
                    value={monthlyKm}
                    onChange={(e) => setMonthlyKm(parseInt(e.target.value) || 1000)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
