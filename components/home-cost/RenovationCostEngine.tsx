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
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <Paintbrush className="w-5 h-5 text-emerald-400" />
          <span>Room Dimensions &amp; Renovation Materials Quality</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room Dimensions */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Room Dimensions (Length × Width × Height)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  value={roomLengthFt}
                  onChange={(e) => setRoomLengthFt(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold text-center"
                />
                <span className="text-[10px] text-slate-500 block text-center mt-1">Length (ft)</span>
              </div>
              <div>
                <input
                  type="number"
                  value={roomWidthFt}
                  onChange={(e) => setRoomWidthFt(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold text-center"
                />
                <span className="text-[10px] text-slate-500 block text-center mt-1">Width (ft)</span>
              </div>
              <div>
                <input
                  type="number"
                  value={roomHeightFt}
                  onChange={(e) => setRoomHeightFt(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold text-center"
                />
                <span className="text-[10px] text-slate-500 block text-center mt-1">Height (ft)</span>
              </div>
            </div>
          </div>

          {/* Paint Grade */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Wall Paint Quality
            </label>
            <select
              value={paintType}
              onChange={(e) => setPaintType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
            >
              <option value="tractor_emulsion">Economy (Tractor Emulsion / Berger ~₹160/L)</option>
              <option value="premium_acrylic">Premium (Apcolite / Super Acrylic ~₹320/L)</option>
              <option value="royale_luxury">Luxury (Asian Paints Royale / Velvet ~₹580/L)</option>
            </select>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-400">Coats:</span>
              <button
                type="button"
                onClick={() => setCoats(2)}
                className={`px-2.5 py-1 rounded text-xs font-bold border ${
                  coats === 2 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                2 Coats (Standard)
              </button>
              <button
                type="button"
                onClick={() => setCoats(3)}
                className={`px-2.5 py-1 rounded text-xs font-bold border ${
                  coats === 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                3 Coats (Dark / Fresh Plaster)
              </button>
            </div>
          </div>

          {/* Tile Size */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Vitrified Floor Tile Dimensions
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTileSize('2x2')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  tileSize === '2x2'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                2 × 2 ft (600×600mm)
              </button>
              <button
                type="button"
                onClick={() => setTileSize('4x2')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  tileSize === '4x2'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
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
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Paintbrush className="w-4 h-4" />
              Wall Painting Estimate
            </span>
            <span className="text-[10px] text-slate-400">{reno.wallAreaSqFt} sq ft walls</span>
          </div>
          <div className="text-3xl font-black text-white">
            ₹{reno.totalPaintingCost.toLocaleString('en-IN')}
          </div>
          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between">
              <span className="text-slate-400">Paint Needed:</span>
              <strong className="text-white">{reno.paintLitres} Litres</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Material Cost:</span>
              <span>₹{reno.paintCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Labor Cost:</span>
              <span>₹{reno.paintingLabor.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Flooring Tile Estimate */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <Grid className="w-4 h-4" />
              Floor Tiling Estimate
            </span>
            <span className="text-[10px] text-slate-400">{reno.floorAreaSqFt} sq ft floor</span>
          </div>
          <div className="text-3xl font-black text-white">
            ₹{reno.totalTilingCost.toLocaleString('en-IN')}
          </div>
          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between">
              <span className="text-slate-400">Tile Count (incl 10% waste):</span>
              <strong className="text-white">{reno.totalTilesWith10PctWastage} Tiles</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vitrified Tile Material:</span>
              <span>₹{reno.tileCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mason &amp; Tile Labor:</span>
              <span>₹{reno.tileLabor.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Grand Total Budget */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">Combined Room Budget</span>
              <span className="text-[10px] font-bold text-white bg-emerald-500/20 px-2 py-0.5 rounded-full">
                Turnkey
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-400 mt-2">
              ₹{reno.grandTotal.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Complete materials &amp; labor estimate for a fresh {roomLengthFt}×{roomWidthFt} ft room makeover.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleAffiliateClick('paint')}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-[0.99]"
          >
            <span>View Paint &amp; Tile Deals</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
