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

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are allowed.');
      return;
    }

    setIsUploading(true);

    try {
      // 1. First attempt direct Supabase client upload
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanName}`;

      let publicUrl = '';

      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        });

      if (!uploadErr && uploadData) {
        const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(fileName);
        publicUrl = urlData.publicUrl;
      } else {
        // 2. Fallback to API route (which has admin service key credentials)
        const formData = new FormData();
        formData.append('file', file);

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
          JPG, PNG, WebP (Max 5MB)
        </span>
      </div>

      {/* Preview Card */}
      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-surface-darker bg-surface/50 max-h-56">
          <img
            src={value}
            alt="Featured preview"
            className="w-full h-48 object-cover rounded-2xl"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-3 py-1.5 rounded-xl bg-white text-text-main text-xs font-bold hover:bg-surface shadow-md transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-primary" />
              <span>Replace Image</span>
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-xl bg-error text-white hover:bg-error/90 shadow-md transition-colors"
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
            <p className="text-xs font-bold text-text-main">Click to upload featured image</p>
            <p className="text-[11px] text-text-main/50">Storage bucket: blog-images</p>
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
          placeholder="https://images.unsplash.com/... or https://..."
          className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}
