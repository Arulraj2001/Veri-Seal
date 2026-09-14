'use client';

import * as React from 'react';
import {
  Search,
  Download,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  PlaySquare,
  AlertCircle,
  FileImage,
  RefreshCw,
  Eye,
} from 'lucide-react';

function YoutubeIcon({ className = "w-4 h-4 text-red-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

interface ThumbnailTier {
  id: string;
  label: string;
  resolution: string;
  url: string;
  badge: string;
  isAvailable: boolean;
}

export function YoutubeThumbnailEngine() {
  const [inputUrl, setInputUrl] = React.useState<string>('');
  const [videoId, setVideoId] = React.useState<string | null>(null);
  const [copiedTier, setCopiedTier] = React.useState<string | null>(null);
  const [downloadingTier, setDownloadingTier] = React.useState<string | null>(null);
  const [tiers, setTiers] = React.useState<ThumbnailTier[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  // Extract YouTube Video ID
  const extractVideoId = (input: string): string | null => {
    const trimmed = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = trimmed.match(regExp);
    return match ? match[1] : null;
  };

  const handleFetch = (idToFetch?: string) => {
    const id = idToFetch || extractVideoId(inputUrl);
    if (!id) {
      setError('Please enter a valid YouTube video URL or 11-character video ID.');
      setVideoId(null);
      setTiers([]);
      return;
    }

    setError(null);
    setVideoId(id);

    const generatedTiers: ThumbnailTier[] = [
      {
        id: 'maxres',
        label: 'Maximum Resolution (1080p / 720p)',
        resolution: '1920 × 1080 / 1280 × 720',
        url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        badge: 'Ultra HD 4K/1080p',
        isAvailable: true,
      },
      {
        id: 'hq',
        label: 'High Definition (HQ)',
        resolution: '480 × 360',
        url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        badge: 'HD Quality',
        isAvailable: true,
      },
      {
        id: 'sd',
        label: 'Standard Definition (SD)',
        resolution: '640 × 480',
        url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
        badge: 'SD Format',
        isAvailable: true,
      },
      {
        id: 'mq',
        label: 'Medium Quality (MQ)',
        resolution: '320 × 180',
        url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
        badge: 'Mobile 16:9',
        isAvailable: true,
      },
      {
        id: 'default',
        label: 'Small Thumbnail',
        resolution: '120 × 90',
        url: `https://img.youtube.com/vi/${id}/default.jpg`,
        badge: 'Compact',
        isAvailable: true,
      },
    ];

    setTiers(generatedTiers);
  };

  // Helper to download image directly to user device without navigating
  const downloadThumbnail = async (tier: ThumbnailTier, asWebp = false) => {
    if (!videoId) return;
    setDownloadingTier(tier.id + (asWebp ? '-webp' : ''));

    try {
      // Draw to canvas to bypass CORS download restrictions
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load thumbnail via image proxy'));
        img.src = tier.url;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D unavailable');

      ctx.drawImage(img, 0, 0);

      const mime = asWebp ? 'image/webp' : 'image/jpeg';
      const ext = asWebp ? 'webp' : 'jpg';

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `youtube-thumbnail-${videoId}-${tier.id}.${ext}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setDownloadingTier(null);
        },
        mime,
        0.95
      );
    } catch (err) {
      console.warn('Canvas download fallback triggered:', err);
      // Fallback: direct window download
      const a = document.createElement('a');
      a.href = tier.url;
      a.target = '_blank';
      a.download = `youtube-thumbnail-${videoId}-${tier.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadingTier(null);
    }
  };

  // Copy image to clipboard
  const copyImageToClipboard = async (tier: ThumbnailTier) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Could not load image to copy'));
        img.src = tier.url;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          setCopiedTier(tier.id);
          setTimeout(() => setCopiedTier(null), 2500);
        } catch {
          // Fallback to copying URL
          await navigator.clipboard.writeText(tier.url);
          setCopiedTier(tier.id);
          setTimeout(() => setCopiedTier(null), 2500);
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Input Box */}
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-8 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
            <YoutubeIcon className="w-4 h-4 text-red-600 shrink-0" />
            Enter YouTube Video Link or Video ID
          </label>
          <p className="text-xs text-text-main/60">
            Paste any YouTube video link, Shorts URL, youtu.be short link, or 11-digit video ID.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFetch();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or youtu.be/..."
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                if (error) setError(null);
              }}
              className="w-full bg-surface border border-surface-darker text-text-main text-xs sm:text-sm rounded-2xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary font-mono shadow-inner"
            />
            {inputUrl && (
              <button
                type="button"
                onClick={() => setInputUrl('')}
                className="absolute right-3 top-3.5 text-xs text-text-main/40 hover:text-text-main"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
          >
            <Search className="w-4 h-4" /> Get Thumbnails
          </button>
        </form>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Sample Links */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-text-main/60 font-medium">Try Samples:</span>
          <button
            type="button"
            onClick={() => {
              const url = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
              setInputUrl(url);
              handleFetch('jNQXAC9IVRw');
            }}
            className="px-2.5 py-1 rounded-lg bg-surface border border-surface-darker hover:border-primary text-text-main text-[11px] font-semibold transition-colors"
          >
            Me at the zoo (First YouTube Video)
          </button>
          <button
            type="button"
            onClick={() => {
              const url = 'https://www.youtube.com/watch?v=9bZkp7q19f0';
              setInputUrl(url);
              handleFetch('9bZkp7q19f0');
            }}
            className="px-2.5 py-1 rounded-lg bg-surface border border-surface-darker hover:border-primary text-text-main text-[11px] font-semibold transition-colors"
          >
            Gangnam Style HD
          </button>
        </div>
      </div>

      {/* Thumbnails Gallery */}
      {tiers.length > 0 && videoId && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Available Resolution Tiers (Video ID: <span className="font-mono text-primary">{videoId}</span>)
              </h3>
              <p className="text-xs text-text-main/60">
                Official YouTube CDN images in uncompressed quality. 1-Click download or copy to clipboard.
              </p>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Watch Video on YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => {
              const isMax = tier.id === 'maxres';
              return (
                <div
                  key={tier.id}
                  className={`bg-white rounded-3xl border shadow-card p-5 space-y-4 transition-all ${
                    isMax
                      ? 'md:col-span-2 border-primary/40 bg-gradient-to-br from-white via-white to-primary/5'
                      : 'border-surface-darker'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-surface-darker">
                    <div>
                      <h4 className="text-sm font-bold text-text-main flex items-center gap-2">
                        {tier.label}
                        {isMax && (
                          <span className="bg-primary text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Best Quality
                          </span>
                        )}
                      </h4>
                      <span className="text-[11px] font-mono text-text-main/60">
                        {tier.resolution}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold bg-surface border border-surface-darker px-2 py-0.5 rounded text-text-main/70">
                      {tier.badge}
                    </span>
                  </div>

                  {/* Image Display */}
                  <div className="rounded-2xl overflow-hidden border border-surface-darker bg-neutral-900/5 aspect-video flex items-center justify-center relative group">
                    <img
                      src={tier.url}
                      alt={tier.label}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={() => downloadThumbnail(tier)}
                        className="px-3.5 py-2 rounded-xl bg-white text-text-main text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                      <button
                        type="button"
                        onClick={() => copyImageToClipboard(tier)}
                        className="px-3.5 py-2 rounded-xl bg-white text-text-main text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </button>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => downloadThumbnail(tier)}
                        disabled={downloadingTier === tier.id}
                        className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {downloadingTier === tier.id ? 'Downloading...' : 'Download JPG'}
                      </button>

                      <button
                        type="button"
                        onClick={() => downloadThumbnail(tier, true)}
                        disabled={downloadingTier === tier.id + '-webp'}
                        className="px-3 py-2 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <FileImage className="w-3.5 h-3.5 text-primary" />
                        WebP
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyImageToClipboard(tier)}
                      className="px-3 py-2 rounded-xl border border-surface-darker hover:border-primary/40 bg-surface text-text-main text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedTier === tier.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-text-main/60" />
                          <span>Copy Image</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
