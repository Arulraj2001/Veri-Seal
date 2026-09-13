'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Copy, 
  Check, 
  RotateCcw, 
  Calendar, 
  ArrowRightLeft, 
  Globe, 
  Zap,
  Sparkles
} from 'lucide-react';

interface ConvertedDate {
  utc: string;
  local: string;
  iso: string;
  rfc2822: string;
  relative: string;
  seconds: number;
  milliseconds: number;
}

export function TimestampConverterEngine() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [isLiveRunning, setIsLiveRunning] = useState<boolean>(true);
  
  // Convert from timestamp
  const [inputTimestamp, setInputTimestamp] = useState<string>('');
  const [timestampUnit, setTimestampUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [convertedFromTs, setConvertedFromTs] = useState<ConvertedDate | null>(null);

  // Convert from date
  const [inputDate, setInputDate] = useState<string>('');
  const [convertedFromDate, setConvertedFromDate] = useState<{ seconds: number; milliseconds: number; iso: string } | null>(null);

  // Relative offset calculator
  const [offsetValue, setOffsetValue] = useState<number>(1);
  const [offsetUnit, setOffsetUnit] = useState<'hours' | 'days' | 'weeks' | 'months'>('days');
  const [offsetDirection, setOffsetDirection] = useState<'future' | 'past'>('future');
  const [offsetResult, setOffsetResult] = useState<{ seconds: number; dateStr: string } | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live epoch ticker
  useEffect(() => {
    if (!isLiveRunning) return;
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLiveRunning]);

  // Set default inputs on mount
  useEffect(() => {
    const now = new Date();
    const nowEpoch = Math.floor(now.getTime() / 1000);
    setInputTimestamp(nowEpoch.toString());
    handleConvertTimestamp(nowEpoch.toString(), 'seconds');

    // Format local datetime-local string YYYY-MM-DDTHH:mm:ss
    const pad = (n: number) => n.toString().padStart(2, '0');
    const localIso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setInputDate(localIso);
    handleConvertDate(localIso);
    computeOffset(1, 'days', 'future');
  }, []);

  const getRelativeTime = (timestampMs: number): string => {
    const diff = Math.floor((timestampMs - Date.now()) / 1000);
    const absDiff = Math.abs(diff);

    let unit = 'second';
    let count = absDiff;

    if (absDiff >= 31536000) {
      unit = 'year';
      count = Math.floor(absDiff / 31536000);
    } else if (absDiff >= 2592000) {
      unit = 'month';
      count = Math.floor(absDiff / 2592000);
    } else if (absDiff >= 86400) {
      unit = 'day';
      count = Math.floor(absDiff / 86400);
    } else if (absDiff >= 3600) {
      unit = 'hour';
      count = Math.floor(absDiff / 3600);
    } else if (absDiff >= 60) {
      unit = 'minute';
      count = Math.floor(absDiff / 60);
    }

    const plural = count === 1 ? '' : 's';
    if (diff > 0) return `in ${count} ${unit}${plural}`;
    if (diff < 0) return `${count} ${unit}${plural} ago`;
    return 'just now';
  };

  const handleConvertTimestamp = (val: string, unit: 'seconds' | 'milliseconds') => {
    const clean = val.trim();
    if (!clean) {
      setConvertedFromTs(null);
      return;
    }
    const num = Number(clean);
    if (isNaN(num)) {
      setConvertedFromTs(null);
      return;
    }

    const ms = unit === 'seconds' ? num * 1000 : num;
    const sec = unit === 'seconds' ? num : Math.floor(num / 1000);

    const d = new Date(ms);
    if (isNaN(d.getTime())) {
      setConvertedFromTs(null);
      return;
    }

    setConvertedFromTs({
      utc: d.toUTCString(),
      local: d.toString(),
      iso: d.toISOString(),
      rfc2822: d.toUTCString(),
      relative: getRelativeTime(ms),
      seconds: sec,
      milliseconds: ms
    });
  };

  const handleConvertDate = (dateString: string) => {
    if (!dateString) {
      setConvertedFromDate(null);
      return;
    }
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      setConvertedFromDate(null);
      return;
    }
    const ms = d.getTime();
    const sec = Math.floor(ms / 1000);
    setConvertedFromDate({
      seconds: sec,
      milliseconds: ms,
      iso: d.toISOString()
    });
  };

  const computeOffset = (val: number, unit: 'hours' | 'days' | 'weeks' | 'months', dir: 'future' | 'past') => {
    const now = Date.now();
    const mult = dir === 'future' ? 1 : -1;
    let msToAdd = 0;

    switch (unit) {
      case 'hours': msToAdd = val * 3600 * 1000; break;
      case 'days': msToAdd = val * 86400 * 1000; break;
      case 'weeks': msToAdd = val * 7 * 86400 * 1000; break;
      case 'months': msToAdd = val * 30 * 86400 * 1000; break;
    }

    const targetMs = now + (mult * msToAdd);
    const targetSec = Math.floor(targetMs / 1000);
    const targetDate = new Date(targetMs);

    setOffsetResult({
      seconds: targetSec,
      dateStr: targetDate.toUTCString()
    });
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Current Live Epoch Hero Card */}
      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6570B]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Live Unix Epoch Timestamp</span>
            </div>
            <div className="text-3xl sm:text-5xl font-mono font-bold text-zinc-100 tracking-tight flex items-baseline gap-3">
              <span>{currentEpoch}</span>
              <span className="text-xs sm:text-sm font-sans font-medium text-[#E6570B]">seconds since Jan 01 1970 (UTC)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiveRunning(!isLiveRunning)}
              className="px-3 py-2 rounded-xl text-xs font-medium border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            >
              {isLiveRunning ? 'Pause Ticker' : 'Resume Ticker'}
            </button>
            <button
              onClick={() => copyToClipboard(currentEpoch.toString(), 'live-epoch')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#E6570B] hover:bg-[#d04e0a] text-white flex items-center gap-1.5 shadow-lg shadow-[#E6570B]/20 transition-all"
            >
              {copiedKey === 'live-epoch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'live-epoch' ? 'Copied' : 'Copy Epoch'}
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Timestamp to Date & Date to Timestamp */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Timestamp -> Date */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col space-y-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E6570B]/10 text-[#E6570B]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">Epoch Timestamp to Date</h2>
              <p className="text-xs text-zinc-400">Convert seconds or milliseconds into human time</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <label className="font-medium">Enter Timestamp</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTimestampUnit('seconds');
                    handleConvertTimestamp(inputTimestamp, 'seconds');
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    timestampUnit === 'seconds'
                      ? 'bg-[#E6570B] text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Seconds (10 digits)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimestampUnit('milliseconds');
                    handleConvertTimestamp(inputTimestamp, 'milliseconds');
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    timestampUnit === 'milliseconds'
                      ? 'bg-[#E6570B] text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Milliseconds (13 digits)
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputTimestamp}
                onChange={(e) => {
                  setInputTimestamp(e.target.value);
                  handleConvertTimestamp(e.target.value, timestampUnit);
                }}
                placeholder="e.g. 1715000000"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#E6570B]"
              />
              <button
                onClick={() => {
                  const now = Math.floor(Date.now() / 1000).toString();
                  setInputTimestamp(now);
                  setTimestampUnit('seconds');
                  handleConvertTimestamp(now, 'seconds');
                }}
                className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-xl whitespace-nowrap"
              >
                Now
              </button>
            </div>
          </div>

          {convertedFromTs && (
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">GMT / UTC</span>
                  <button
                    onClick={() => copyToClipboard(convertedFromTs.utc, 'ts-utc')}
                    className="text-zinc-400 hover:text-[#E6570B] transition-colors"
                  >
                    {copiedKey === 'ts-utc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-sm font-mono text-zinc-100 select-all">{convertedFromTs.utc}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">Your Local Time</span>
                  <button
                    onClick={() => copyToClipboard(convertedFromTs.local, 'ts-local')}
                    className="text-zinc-400 hover:text-[#E6570B] transition-colors"
                  >
                    {copiedKey === 'ts-local' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-sm font-mono text-zinc-100 select-all">{convertedFromTs.local}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 block mb-1">ISO 8601</span>
                  <span className="text-xs font-mono text-zinc-300 block truncate" title={convertedFromTs.iso}>{convertedFromTs.iso}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 block mb-1">Relative</span>
                  <span className="text-xs font-medium text-[#E6570B] block">{convertedFromTs.relative}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Date -> Timestamp */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col space-y-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E6570B]/10 text-[#E6570B]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">Date to Unix Timestamp</h2>
              <p className="text-xs text-zinc-400">Pick any date and time to generate its exact epoch</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400">Pick Date & Time</label>
            <input
              type="datetime-local"
              step="1"
              value={inputDate}
              onChange={(e) => {
                setInputDate(e.target.value);
                handleConvertDate(e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-[#E6570B]"
            />
          </div>

          {convertedFromDate && (
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">Unix Timestamp (Seconds)</span>
                  <button
                    onClick={() => copyToClipboard(convertedFromDate.seconds.toString(), 'date-sec')}
                    className="text-zinc-400 hover:text-[#E6570B] transition-colors"
                  >
                    {copiedKey === 'date-sec' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xl font-mono font-bold text-[#E6570B] select-all">{convertedFromDate.seconds}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">Unix Timestamp (Milliseconds)</span>
                  <button
                    onClick={() => copyToClipboard(convertedFromDate.milliseconds.toString(), 'date-ms')}
                    className="text-zinc-400 hover:text-[#E6570B] transition-colors"
                  >
                    {copiedKey === 'date-ms' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-lg font-mono font-semibold text-zinc-100 select-all">{convertedFromDate.milliseconds}</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 block mb-1">Standard ISO Format</span>
                <span className="text-xs font-mono text-zinc-300 block select-all">{convertedFromDate.iso}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Relative Time Calculator (Offset from Now) */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#E6570B]/10 text-[#E6570B]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Relative Offset & Expiry Calculator</h3>
            <p className="text-xs text-zinc-400">Quickly calculate epoch timestamps for auth tokens, JWT expires, or cookies</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="999"
              value={offsetValue}
              onChange={(e) => {
                const val = Math.max(1, parseInt(e.target.value) || 1);
                setOffsetValue(val);
                computeOffset(val, offsetUnit, offsetDirection);
              }}
              className="w-20 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-sm text-zinc-100 focus:outline-none focus:border-[#E6570B]"
            />
            <select
              value={offsetUnit}
              onChange={(e) => {
                const u = e.target.value as 'hours' | 'days' | 'weeks' | 'months';
                setOffsetUnit(u);
                computeOffset(offsetValue, u, offsetDirection);
              }}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-[#E6570B]"
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={offsetDirection}
              onChange={(e) => {
                const d = e.target.value as 'future' | 'past';
                setOffsetDirection(d);
                computeOffset(offsetValue, offsetUnit, d);
              }}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-[#E6570B]"
            >
              <option value="future">in the future (+)</option>
              <option value="past">in the past (-)</option>
            </select>
          </div>

          {offsetResult && (
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-[#E6570B]">{offsetResult.seconds}</div>
                <div className="text-[11px] text-zinc-400">{offsetResult.dateStr}</div>
              </div>
              <button
                onClick={() => copyToClipboard(offsetResult.seconds.toString(), 'offset-sec')}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg flex items-center gap-1"
              >
                {copiedKey === 'offset-sec' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimestampConverterEngine;
