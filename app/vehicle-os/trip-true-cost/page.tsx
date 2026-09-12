'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Fuel,
  CreditCard,
  Car,
  Users,
  Train,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function TripTrueCostPage() {
  const [distanceKm, setDistanceKm] = React.useState<number>(350); // e.g. Chennai to Bangalore
  const [mileageKmPerLitre, setMileageKmPerLitre] = React.useState<number>(15.0);
  const [fuelPrice, setFuelPrice] = React.useState<number>(102);
  const [fastagTolls, setFastagTolls] = React.useState<number>(485);
  const [parkingFee, setParkingFee] = React.useState<number>(250);
  const [passengersCount, setPassengersCount] = React.useState<number>(3);
  const [trainFarePerPerson, setTrainFarePerPerson] = React.useState<number>(850); // AC chair car

  // Calculations
  const fuelCost = Math.round((distanceKm / mileageKmPerLitre) * fuelPrice);
  // Wear and tear / tyre / service depreciation amortized at ~₹3.20 per highway km
  const wearAndTearCost = Math.round(distanceKm * 3.2);
  const totalTrueTripCost = fuelCost + fastagTolls + parkingFee + wearAndTearCost;
  const costPerPassenger = Math.round(totalTrueTripCost / Math.max(1, passengersCount));

  // Train / transit comparison
  const totalTransitCost = trainFarePerPerson * passengersCount;
  const carSavesMoney = totalTrueTripCost <= totalTransitCost;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Trip True Cost & Split Calculator' },
        ]}
      />
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            Travel Planning
          </span>
          <span className="text-xs font-semibold text-slate-500">Full Highway Cost Deconstruction</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Trip True-Cost Calculator — Fuel, Tolls, Wear &amp; Transit Compare
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          A highway road trip costs far more than fuel alone. Calculate your actual trip outgo—including FASTag tolls, destination parking, and vehicle depreciation wear—and compare it against train or bus tickets for your family.
        </p>
      </div>

      {/* Grid: Inputs Left, Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Trip Route Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">One-Way Distance (km)</label>
                <input
                  type="number"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Highway Mileage (km/L)</label>
                <input
                  type="number"
                  step="0.5"
                  value={mileageKmPerLitre}
                  onChange={(e) => setMileageKmPerLitre(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">FASTag Tolls Total (₹)</label>
                <input
                  type="number"
                  value={fastagTolls}
                  onChange={(e) => setFastagTolls(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parking / Hotel Charge (₹)</label>
                <input
                  type="number"
                  value={parkingFee}
                  onChange={(e) => setParkingFee(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Passenger Count</label>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={passengersCount}
                  onChange={(e) => setPassengersCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Train Ticket / Person (₹)</label>
                <input
                  type="number"
                  value={trainFarePerPerson}
                  onChange={(e) => setTrainFarePerPerson(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                True Highway Outflow
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                ₹{totalTrueTripCost.toLocaleString('en-IN')}
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                ₹{costPerPassenger.toLocaleString('en-IN')} per passenger ({passengersCount} people)
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs font-mono border-t border-slate-200 pt-3">
              <div className="flex justify-between text-slate-700">
                <span>• Fuel ({Math.round(distanceKm / mileageKmPerLitre)} Litres):</span>
                <span className="font-bold text-slate-900">₹{fuelCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>• FASTag Expressway Tolls:</span>
                <span className="font-bold text-slate-900">₹{fastagTolls.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>• Destination Parking:</span>
                <span className="font-bold text-slate-900">₹{parkingFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>• Vehicle Wear &amp; Tyre Deprec:</span>
                <span className="font-bold text-slate-900">₹{wearAndTearCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Modal comparison */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Train className="w-4 h-4 text-amber-600" />
                <span>Car vs Train / Bus Comparison:</span>
              </div>
              <p>
                {carSavesMoney ? (
                  <span className="text-emerald-800 font-semibold">
                    Driving your car is <strong>₹{(totalTransitCost - totalTrueTripCost).toLocaleString('en-IN')} cheaper</strong> than buying {passengersCount} train tickets (₹{totalTransitCost.toLocaleString('en-IN')}) with superior door-to-door flexibility.
                  </span>
                ) : (
                  <span className="text-amber-800 font-semibold">
                    Taking the train (₹{totalTransitCost.toLocaleString('en-IN')} total) saves approximately <strong>₹{(totalTrueTripCost - totalTransitCost).toLocaleString('en-IN')}</strong> and avoids driving fatigue.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
