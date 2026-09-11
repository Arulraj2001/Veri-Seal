'use client';

import React, { useState, useMemo } from 'react';
import {
  Paintbrush,
  Grid,
  Coins,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { calculateRenovationEstimate } from '@/lib/home-cost/calculations';

export default function RenovationCostEngine() {
  const [roomLengthFt, setRoomLengthFt] = useState<number>(14);
  const [roomWidthFt, setRoomWidthFt] = useState<number>(12);
  const [roomHeightFt, setRoomHeightFt] = useState<number>(10);
  const [coats, setCoats] = useState<2 | 3>(2);
  const [paintType, setPaintType] = useState<'tractor_emulsion' | 'premium_acrylic' | 'royale_luxury'>('premium_acrylic');
  const [tileSize, setTileSize] = useState<'2x2' | '4x2'>('2x2');

  const reno = useMemo(() => {
    return calculateRenovationEstimate({
      roomLengthFt,
      roomWidthFt,
      roomHeightFt,
      coats,
      paintType,
      tileLengthFt: tileSize === '2x2' ? 2 : 4,
      tileWidthFt: 2,
    });
  }, [roomLengthFt, roomWidthFt, roomHeightFt, coats, paintType, tileSize]);

  const handleAffiliateClick = (type: 'paint' | 'tiles') => {
    const query = type === 'paint'
      ? 'asian paints royale emulsion premium paint 20 litre'
      : 'vitrified floor tiles 2x2 kajaria somany';
    window.open(`https://www.amazon.in/s?k=${encodeURIComponent(query)}&tag=veriseal-21`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Dimensions & Grade Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Paintbrush className="w-5 h-5 text-emerald-600" />
          <span>Room Dimensions &amp; Renovation Materials Quality</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room Dimensions */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Room Dimensions (Length × Width × Height)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  value={roomLengthFt}
                  onChange={(e) => setRoomLengthFt(Number(e.target.value))}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 font-bold text-center"
                />
                <span className="text-[10px] text-slate-500 block text-center mt-1 font-medium">Length (ft)</span>
              </div>
              <div>
                <input
                  type="number"
                  value={roomWidthFt}
                  onChange={(e) => setRoomWidthFt(Number(e.target.value))}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 font-bold text-center"
                />
                <span className="text-[10px] text-slate-500 block text-center mt-1 font-medium">Width (ft)</span>
              </div>
              <div>
                <input
                  type="number"
                  value={roomHeightFt}
                  onChange={(e) => setRoomHeightFt(Number(e.target.value))}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 font-bold text-center"
                />
                <span className="text-[10px] text-slate-500 block text-center mt-1 font-medium">Height (ft)</span>
              </div>
            </div>
          </div>

          {/* Paint Grade */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Wall Paint Quality
            </label>
            <select
              value={paintType}
              onChange={(e) => setPaintType(e.target.value as any)}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold cursor-pointer"
            >
              <option value="tractor_emulsion">Economy (Tractor Emulsion / Berger ~₹160/L)</option>
              <option value="premium_acrylic">Premium (Apcolite / Super Acrylic ~₹320/L)</option>
              <option value="royale_luxury">Luxury (Asian Paints Royale / Velvet ~₹580/L)</option>
            </select>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-500 font-medium">Coats:</span>
              <button
                type="button"
                onClick={() => setCoats(2)}
                className={`px-2.5 py-1 rounded text-xs font-bold border cursor-pointer ${
                  coats === 2 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                2 Coats (Standard)
              </button>
              <button
                type="button"
                onClick={() => setCoats(3)}
                className={`px-2.5 py-1 rounded text-xs font-bold border cursor-pointer ${
                  coats === 3 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                3 Coats (Dark / Fresh Plaster)
              </button>
            </div>
          </div>

          {/* Tile Size */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Vitrified Floor Tile Dimensions
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTileSize('2x2')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  tileSize === '2x2'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                2 × 2 ft (600×600mm)
              </button>
              <button
                type="button"
                onClick={() => setTileSize('4x2')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  tileSize === '4x2'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                4 × 2 ft (GVT Slab)
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">Includes automatic 10% cutting wastage allowance.</p>
          </div>
        </div>
      </div>

      {/* Estimates Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Painting Estimate */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <Paintbrush className="w-4 h-4 text-emerald-600" />
              Wall Painting Estimate
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">{reno.wallAreaSqFt} sq ft walls</span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{reno.totalPaintingCost.toLocaleString('en-IN')}
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Paint Needed:</span>
              <strong className="text-slate-900">{reno.paintLitres} Litres</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Material Cost:</span>
              <span className="font-semibold text-slate-900">₹{reno.paintCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Labor Cost:</span>
              <span className="font-semibold text-slate-900">₹{reno.paintingLabor.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Flooring Tile Estimate */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-700 flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-sky-600" />
              Floor Tiling Estimate
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">{reno.floorAreaSqFt} sq ft floor</span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{reno.totalTilingCost.toLocaleString('en-IN')}
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Tile Count (incl 10% waste):</span>
              <strong className="text-slate-900">{reno.totalTilesWith10PctWastage} Tiles</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Vitrified Tile Material:</span>
              <span className="font-semibold text-slate-900">₹{reno.tileCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mason &amp; Tile Labor:</span>
              <span className="font-semibold text-slate-900">₹{reno.tileLabor.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Grand Total Budget */}
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 border border-emerald-300 rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">Combined Room Budget</span>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Turnkey
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-700 mt-2">
              ₹{reno.grandTotal.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Complete materials &amp; labor estimate for a fresh {roomLengthFt}×{roomWidthFt} ft room makeover.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleAffiliateClick('paint')}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>View Paint &amp; Tile Deals</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
