'use client';

import * as React from 'react';
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  Crop,
  Sparkles,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { FeaturedImageCropModal } from './FeaturedImageCropModal';

interface FeaturedImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function FeaturedImageUpload({ value, onChange }: FeaturedImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [uploadStats, setUploadStats] = React.useState<{ originalKb?: number; compressedKb: number; width?: number; height?: number } | null>(null);

  // Crop modal state
  const [isCropModalOpen, setIsCropModalOpen] = React.useState(false);
  const [cropImageSrc, setCropImageSrc] = React.useState<string | null>(null);
  const [sourceFileName, setSourceFileName] = React.useState<string>('featured_image');
  const [sourceOriginalKb, setSourceOriginalKb] = React.useState<number | undefined>(undefined);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    e.target.value = '';
    setError(null);

    // Validate size (max 20MB source)
    if (file.size > 20 * 1024 * 1024) {
      setError('File size exceeds the 20MB limit.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are allowed.');
      return;
    }

    const cleanBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '_');
    setSourceFileName(cleanBase || 'featured_image');
    setSourceOriginalKb(Math.round(file.size / 1024));

    // Read file as Data URL to open directly in interactive crop modal
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCropImageSrc(dataUrl);
        setIsCropModalOpen(true);
      }
    };
    reader.onerror = () => setError('Failed to read image file.');
    reader.readAsDataURL(file);
  };

  // Open cropper for existing image
  const handleOpenCropperForExisting = () => {
    if (!value) return;
    setError(null);
    setSourceFileName('recropped_featured_image');
    setSourceOriginalKb(undefined);
    setCropImageSrc(value);
    setIsCropModalOpen(true);
  };

  // Callback when user confirms crop in modal
  const handleApplyCroppedBlob = async (
    blob: Blob,
    meta: { width: number; height: number; sizeKb: number }
  ) => {
    setIsUploading(true);
    setError(null);

    try {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${sourceFileName}.webp`;
      const compressedFile = new File([blob], fileName, { type: 'image/webp' });

      let publicUrl = '';

      // 1. Direct Supabase Storage upload
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
        setUploadStats({
          originalKb: sourceOriginalKb,
          compressedKb: meta.sizeKb,
          width: meta.width,
          height: meta.height,
        });
      }
    } catch (err: any) {
      console.error('Featured image upload error:', err);
      setError(err.message || 'Failed to upload image. You can paste the URL directly.');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-text-main flex items-center gap-1.5">
          <Crop className="w-3.5 h-3.5 text-primary" />
          <span>Featured Article Image</span>
        </label>
        <span className="text-[10px] text-text-main/50 font-medium">
          Free Size Crop &amp; 16:9 Card Fit (WebP Optimized)
        </span>
      </div>

      {/* Upload Compression Stats */}
      {uploadStats && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-success/10 border border-success/20 text-[11px] font-bold text-success">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>
            ✨ Cropped &amp; Optimized ({uploadStats.width}×{uploadStats.height}px WebP) · {uploadStats.compressedKb} KB
            {uploadStats.originalKb
              ? ` (Saved ${Math.max(0, Math.round((1 - uploadStats.compressedKb / uploadStats.originalKb) * 100))}%)`
              : ''}
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

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleOpenCropperForExisting}
              className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Crop className="w-3.5 h-3.5" />
              <span>Crop / Adjust</span>
            </button>
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-3 py-1.5 rounded-xl bg-white text-text-main text-xs font-bold hover:bg-surface shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-primary" />
              <span>Replace</span>
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
            <Crop className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-text-main">Click to upload, crop &amp; fit image</p>
            <p className="text-[11px] text-text-main/50">
              Interactive Free Size, 16:9 Blog Card Fit, Zoom &amp; Rotate
            </p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Uploading indicator */}
      {isUploading && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Uploading cropped WebP image...</span>
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

      {/* Interactive Cropping Modal */}
      {cropImageSrc && (
        <FeaturedImageCropModal
          isOpen={isCropModalOpen}
          imageSrc={cropImageSrc}
          onClose={() => {
            setIsCropModalOpen(false);
            setCropImageSrc(null);
          }}
          onApplyCrop={handleApplyCroppedBlob}
        />
      )}
    </div>
  );
}
