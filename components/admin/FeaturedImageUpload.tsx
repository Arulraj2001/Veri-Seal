'use client';

import * as React from 'react';
import { Upload, Image as ImageIcon, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface FeaturedImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function FeaturedImageUpload({ value, onChange }: FeaturedImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [uploadStats, setUploadStats] = React.useState<{ originalKb: number; compressedKb: number } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  /**
   * Client-side 16:9 auto-crop & WebP compression engine
   * Scales & crops image to 1200x675 (16:9) to fit blog cards perfectly.
   */
  const compressAndFitToCard = (
    file: File,
    targetWidth = 1200,
    targetHeight = 675
  ): Promise<{ blob: Blob; sizeKb: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              return reject(new Error('HTML5 Canvas context is not supported in this browser.'));
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Calculate cover crop coordinates
            const srcRatio = img.width / img.height;
            const targetRatio = targetWidth / targetHeight;

            let renderWidth = targetWidth;
            let renderHeight = targetHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (srcRatio > targetRatio) {
              // Image is wider than 16:9 -> crop horizontal sides evenly
              renderHeight = targetHeight;
              renderWidth = img.width * (targetHeight / img.height);
              offsetX = (targetWidth - renderWidth) / 2;
            } else {
              // Image is taller than 16:9 -> crop top/bottom evenly
              renderWidth = targetWidth;
              renderHeight = img.height * (targetWidth / img.width);
              offsetY = (targetHeight - renderHeight) / 2;
            }

            // Clean background fill
            ctx.fillStyle = '#0F172A';
            ctx.fillRect(0, 0, targetWidth, targetHeight);

            // Draw image scaled and centered
            ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

            // Export as WebP
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  return reject(new Error('Failed to generate compressed image blob.'));
                }
                const sizeKb = Math.round(blob.size / 1024);
                resolve({ blob, sizeKb });
              },
              'image/webp',
              0.84
            );
          } catch (canvasErr: any) {
            reject(canvasErr);
          }
        };
        img.onerror = () => reject(new Error('Failed to decode image file.'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    e.target.value = '';
    setError(null);

    // Validate size (max 15MB source)
    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds the 15MB limit.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are allowed.');
      return;
    }

    setIsUploading(true);
    setUploadStats(null);

    try {
      const originalKb = Math.round(file.size / 1024);
      // Auto-compress & fit to exact 16:9 (1200x675)
      const { blob: compressedBlob, sizeKb: compressedKb } = await compressAndFitToCard(file, 1200, 675);
      setUploadStats({ originalKb, compressedKb });

      const cleanBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanBase}.webp`;
      const compressedFile = new File([compressedBlob], fileName, { type: 'image/webp' });

      let publicUrl = '';

      // 1. First attempt direct Supabase client upload
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('blog-images')
        .upload(fileName, compressedFile, {
          contentType: 'image/webp',
          upsert: false,
        });

      if (!uploadErr && uploadData) {
        const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(fileName);
        publicUrl = urlData.publicUrl;
      } else {
        // 2. Fallback to API route (uses admin service role key)
        const formData = new FormData();
        formData.append('file', compressedFile);

        const apiRes = await fetch('/api/admin/blog/upload-image', {
          method: 'POST',
          body: formData,
        });

        const apiData = await apiRes.json();
        if (!apiRes.ok || apiData.error) {
          throw new Error(apiData.error || uploadErr?.message || 'Upload failed');
        }

        publicUrl = apiData.url;
      }

      if (publicUrl) {
        onChange(publicUrl);
      }
    } catch (err: any) {
      console.error('Featured image upload error:', err);
      setError(err.message || 'Failed to upload image. Please try pasting the URL directly.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-text-main">
          Featured Article Image
        </label>
        <span className="text-[10px] text-text-main/50 font-medium">
          Auto-fits 16:9 Card (1200×675 px WebP)
        </span>
      </div>

      {/* Upload Compression Stats */}
      {uploadStats && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-success/10 border border-success/20 text-[11px] font-bold text-success">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>
            ✨ Auto-fitted to 16:9 (1200×675 px WebP) · {uploadStats.compressedKb} KB (Saved {Math.max(0, Math.round((1 - uploadStats.compressedKb / uploadStats.originalKb) * 100))}%)
          </span>
        </div>
      )}

      {/* Preview Card */}
      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-surface-darker bg-surface/50 aspect-video w-full">
          <img
            src={value}
            alt="Featured preview"
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
            16:9 Card Preview
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-3 py-1.5 rounded-xl bg-white text-text-main text-xs font-bold hover:bg-surface shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-primary" />
              <span>Replace Image</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setUploadStats(null);
              }}
              className="p-1.5 rounded-xl bg-error text-white hover:bg-error/90 shadow-md transition-colors cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleButtonClick}
          className="border-2 border-dashed border-surface-darker hover:border-primary/60 rounded-2xl p-6 text-center cursor-pointer transition-all bg-surface/20 hover:bg-surface/40 flex flex-col items-center justify-center gap-2 group"
        >
          <div className="p-3 rounded-2xl bg-white border border-surface-darker group-hover:border-primary/40 shadow-2xs group-hover:scale-105 transition-all">
            <ImageIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-text-main">Click to upload &amp; auto-fit image</p>
            <p className="text-[11px] text-text-main/50">Auto-converts to 1200×675 px (16:9) WebP</p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Spinner */}
      {isUploading && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Uploading image to Supabase blog-images bucket...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-error/10 border border-error/20 text-xs text-error font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Manual URL Input Fallback */}
      <div>
        <label className="block text-[11px] font-semibold text-text-main/60 mb-1">
          Or paste image URL directly:
        </label>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or /api/og?title=..."
          className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}
