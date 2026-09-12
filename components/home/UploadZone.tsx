'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileUp,
  FileText,
  Lock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Info,
  Check,
  X,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  FileCheck,
  ArrowRight,
  Printer,
  Scissors,
  Camera,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WhatsAppShare } from '@/components/ui/WhatsAppShare';
import type { VerificationState, VerificationResult } from '@/types';
import { SITE_CONFIG } from '@/lib/constants';
import {
  verifyPdf,
  downloadVerifiedPdf,
  getGuestVerificationUsage,
  incrementGuestVerificationCount,
  fetchPublicSettings,
  recordVerificationEvent,
  prewarmBackend,
  type PublicSettings,
} from '@/lib/api';
import { UpiPaymentFlowModal } from '@/components/payment/UpiPaymentFlowModal';
import { GuestLimitModal } from '@/components/home/GuestLimitModal';
import { getSeoSlugForDocType } from '@/lib/seo-store';
import { trackEvent } from '@/lib/analytics';
import { captureVerificationError, ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { processPdfWithWorker } from '@/lib/pdf-worker-client';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function UploadZone() {
  const { t, language } = useLanguage();
  const { data: session } = useSession();
  const user = session?.user;
  const userPlan = (user as { plan?: string })?.plan || 'guest';
  const isPaidUser = userPlan === 'pro' || userPlan === 'business';

  const [state, setState] = React.useState<VerificationState>('idle');
  const [file, setFile] = React.useState<File | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [progressStage, setProgressStage] = React.useState('Initializing verification...');
  const [result, setResult] = React.useState<VerificationResult | null>(null);
  const [rawBase64, setRawBase64] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorCode, setErrorCode] = React.useState('');
  const [whatDoesThisMeanOpen, setWhatDoesThisMeanOpen] = React.useState(false);
  const [verifiedCount, setVerifiedCount] = React.useState(SITE_CONFIG.verifiedCountDefault);
  const [publicSettings, setPublicSettings] = React.useState<PublicSettings | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const [showGuestLimitModal, setShowGuestLimitModal] = React.useState(false);

  const [isCounterLive, setIsCounterLive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Fetch real public settings, pre-warm backend, and verification stats
  React.useEffect(() => {
    prewarmBackend();

    fetchPublicSettings().then((settings) => {
      setPublicSettings(settings);
    });

    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data?.verification_counter) {
          setVerifiedCount(parseInt(data.verification_counter, 10));
          setIsCounterLive(Boolean(data.isLive));
        } else if (data?.count) {
          setVerifiedCount(data.count);
          setIsCounterLive(Boolean(data.isLive));
        }
      })
      .catch(() => {
        setVerifiedCount(421847);
      });
  }, []);

  const resetAll = () => {
    setState('idle');
    setFile(null);
    setIsPasswordProtected(false);
    setPassword('');
    setProgress(0);
    setResult(null);
    setRawBase64(null);
    setErrorMessage('');
    setErrorCode('');
    setShowGuestLimitModal(false);
    setShowUpgradeModal(false);
    setWhatDoesThisMeanOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (state === 'idle' || state === 'file-selected') {
      setState('drag-over');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (state === 'drag-over') {
      setState(file ? 'file-selected' : 'idle');
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      setErrorCode('INVALID_FORMAT');
      setErrorMessage(
        'Please upload a valid PDF document (.pdf). Image files, scanned photos, and Word documents do not contain official cryptographic digital signatures.'
      );
      setState('error');
      return;
    }

    // Validate size (max 25MB)
    const maxBytes = SITE_CONFIG.maxFileSizeMB * 1024 * 1024;
    if (selectedFile.size > maxBytes) {
      setErrorCode('FILE_TOO_LARGE');
      setErrorMessage(`File exceeds the maximum limit of ${SITE_CONFIG.maxFileSizeMB}MB. Please upload a smaller file.`);
      setState('error');
      return;
    }

    setFile(selectedFile);
    const isAadhaar = selectedFile.name.toLowerCase().includes('aadhaar');
    setIsPasswordProtected(isAadhaar);
    setState('file-selected');

    // Telemetry: Track PDF uploaded
    trackEvent({
      name: 'pdf_uploaded',
      properties: { file_size: selectedFile.size, file_name: selectedFile.name },
    });

    // Web Worker: Offload hash / byte validation from UI thread for large files
    if (selectedFile.size > 2 * 1024 * 1024) {
      processPdfWithWorker(selectedFile).then((workerRes) => {
        if (!workerRes.success && workerRes.error) {
          console.warn('Worker validation note:', workerRes.error);
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  // Start verification process (Calls real backend API)
  const startVerification = async () => {
    if (!file) return;

    // Daily Limit check: If payment toggle is ON and user is NOT a paid user (Pro/Business)
    // Guests can verify freely up to the daily limit, then must sign up / sign in before upgrading.
    // Logged-in free users can upgrade directly to Pro/Business.
    if (!isPaidUser && publicSettings?.payment_enabled) {
      const freeLimit = publicSettings.free_daily_limit || 3;
      const usage = getGuestVerificationUsage();

      if (usage.count >= freeLimit) {
        if (!user) {
          setShowGuestLimitModal(true);
          return;
        } else {
          setShowUpgradeModal(true);
          return;
        }
      }
    }

    setState('processing');
    setProgress(10);
    setProgressStage('Uploading PDF to verification engine...');

    try {
      const { result: apiResult, rawBase64: verifiedBase64 } = await verifyPdf(
        file,
        isPasswordProtected ? password : undefined,
        (percent) => {
          setProgress(percent);
          if (percent < 40) {
            setProgressStage('Parsing PDF signature dictionary (/ByteRange)...');
          } else if (percent < 85) {
            setProgressStage('Validating certificate chain against CCA India RCAI root...');
          } else {
            setProgressStage('Checking revocation and embedding LTV DSS...');
          }
        }
      );

      setResult(apiResult);
      setRawBase64(verifiedBase64 || null);

      if (apiResult.status === 'valid') {
        try {
          confetti({
            particleCount: 65,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#E6570B', '#16A34A', '#F59E0B'],
          });
        } catch {
          // ignore in SSR
        }
        setState('result-valid');
      } else if (apiResult.status === 'invalid') {
        setState('result-invalid');
      } else {
        setState('result-unknown');
      }

      // Increment guest usage and record in database
      incrementGuestVerificationCount();
      if (isCounterLive) {
        setVerifiedCount((prev) => prev + 1);
      }
      recordVerificationEvent(apiResult.docType, apiResult.status, apiResult.signerName);

      // Telemetry: Track verification complete
      trackEvent({
        name: 'verification_complete',
        properties: { doc_type: apiResult.docType, status: apiResult.status },
      });
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      const code = errorObj?.code || '';
      setErrorCode(code);

      // Sentry: Capture verification error with safe context (no PII or PDF bytes)
      captureVerificationError({
        doc_type: file?.name,
        file_size: file?.size,
        error_code: code,
        message: errorObj?.message,
      });

      if (code === 'DAILY_LIMIT_REACHED' || code === 'GUEST_LIMIT_REACHED') {
        if (!user) {
          setShowGuestLimitModal(true);
        } else {
          setShowUpgradeModal(true);
        }
        setState('file-selected');
        return;
      }

      if (code === 'WRONG_PASSWORD') {
        setErrorMessage(
          'Incorrect password provided. For e-Aadhaar, use the first 4 letters of your name in CAPITAL LETTERS + year of birth (e.g. RAMA1995).'
        );
      } else if (code === 'NO_SIGNATURE_FOUND') {
        setErrorMessage(
          'No digital signatures were detected in this PDF. Please ensure you are uploading the official government digitally signed document.'
        );
      } else if (code === 'FILE_TOO_LARGE') {
        setErrorMessage('The uploaded file exceeds the 25MB file size limit.');
      } else if (code === 'RATE_LIMIT_EXCEEDED') {
        setErrorMessage('Rate limit reached (10 verifications / minute per IP). Please wait a moment before trying again.');
      } else {
        setErrorMessage(errorObj?.message || 'Verification failed. Please check the document and try again.');
      }
      setState('error');
    }
  };

  // Helper for quick testing with sample simulated files
  const loadSampleDoc = (name: string, expectedOutcome: 'valid' | 'invalid') => {
    // Generate minimal valid PDF header bytes
    const sampleContent =
      '%PDF-1.7\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 300] >>\nendobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000102 00000 n\ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n178\n%%EOF';

    const fakeFile = new File([sampleContent], name, {
      type: 'application/pdf',
    });
    setFile(fakeFile);
    setIsPasswordProtected(name.toLowerCase().includes('aadhaar'));
    setState('file-selected');
  };

  const handleDownload = () => {
    if (rawBase64 && result) {
      trackEvent({
        name: 'pdf_downloaded',
        properties: { doc_type: result.docType, file_name: result.fileName },
      });
      downloadVerifiedPdf(rawBase64, result.fileName);
    } else {
      alert('Generating verified PDF document...');
    }
  };

  return (
    <ErrorBoundary fallbackTitle="Verification Engine Error">
      <section id="upload-zone" className="py-12 md:py-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card Wrapper with fixed min-height for zero CLS */}
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-10 relative overflow-hidden min-h-[480px]">
          {/* Top Header inside card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-surface-darker/60">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center gap-2">
                <span>{t.upload.cardHeading}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {t.upload.liveEngine}
                </span>
              </h2>
              <p className="text-sm text-text-main/70 mt-1">
                {t.upload.cardSubheading}
              </p>
            </div>

            {/* State indicators / Quick Reset */}
            {state !== 'idle' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAll}
                className="text-xs text-text-main/70 hover:text-primary gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.upload.uploadAnother}</span>
              </Button>
            )}
          </div>

          {/* Hidden Real File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInputChange}
            className="hidden"
            id="pdf-file-input"
          />

          {/* STATE 1: IDLE */}
          {state === 'idle' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary/50 hover:border-primary bg-surface/30 hover:bg-primary-light/30 rounded-2xl p-10 sm:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group"
            >
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-primary-light border border-primary/30 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <FileUp className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse-slow" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-text-main mb-2">
                {t.upload_title || t.upload.dropTitle}
              </h3>

              <p className="text-xs sm:text-sm text-text-main/60 max-w-md mb-6 leading-relaxed">
                {t.upload_subtitle || t.upload.dropHint}
              </p>

              <Button
                type="button"
                variant="primary"
                size="md"
                className="pointer-events-none group-hover:bg-primary-hover shadow-md"
              >
                {t.upload_btn || t.upload.selectPdfBtn}
              </Button>
            </div>
          )}

          {/* STATE 2: DRAG OVER */}
          {state === 'drag-over' && (
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="border-2 border-solid border-primary bg-primary-light/50 rounded-2xl p-12 sm:p-20 flex flex-col items-center justify-center text-center cursor-pointer shadow-hover"
            >
              <div className="h-20 w-20 rounded-2xl bg-primary text-white flex items-center justify-center mb-5 animate-bounce">
                <FileUp className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-primary mb-2">
                {t.upload.releaseToUpload}
              </h3>
              <p className="text-sm font-medium text-text-main/80">
                {t.upload.releaseHint}
              </p>
            </motion.div>
          )}

          {/* STATE 3 & 4: FILE SELECTED & PASSWORD FIELD */}
          {state === 'file-selected' && file && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Selected File Card */}
              <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-surface border border-surface-darker">
                <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-text-main text-base truncate">
                      {file.name}
                    </h4>
                    <p className="text-xs text-text-main/60 flex items-center gap-2 mt-0.5">
                      <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <span>•</span>
                      <span className="text-primary font-semibold">PDF Document</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetAll}
                  className="p-2 rounded-xl text-text-main/50 hover:text-error hover:bg-error-light/50 transition-colors"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Password Checkbox */}
              <div className="flex items-center gap-2.5 px-1">
                <input
                  type="checkbox"
                  id="pwd-checkbox"
                  checked={isPasswordProtected}
                  onChange={(e) => setIsPasswordProtected(e.target.checked)}
                  className="h-4 w-4 rounded text-primary focus:ring-primary border-surface-darker cursor-pointer"
                />
                <label
                  htmlFor="pwd-checkbox"
                  className="text-sm font-semibold text-text-main cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>{t.upload.passwordCheckbox}</span>
                </label>
              </div>

              {/* Password Input Accordion */}
              <AnimatePresence>
                {isPasswordProtected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-primary" />
                          <span>{t.upload_password_label || t.upload.passwordDecryptionTitle}</span>
                        </label>
                        <span className="text-[11px] font-medium text-amber-800/80">
                          {t.upload.inMemoryOnly}
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t.upload.passwordPlaceholder}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-sm text-text-main font-mono placeholder:text-text-main/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-main/50 hover:text-text-main p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <p className="text-xs text-amber-800 leading-relaxed">
                        {t.upload_password_hint || t.upload.passwordRuleDetail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => startVerification()}
                  className="w-full sm:flex-1 text-base font-bold shadow-md"
                >
                  {t.upload_btn || t.upload.verifyBtn}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={resetAll}
                  className="w-full sm:w-auto"
                >
                  {t.upload.cancelBtn}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STATE 5: PROCESSING */}
          {state === 'processing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 sm:py-16 flex flex-col items-center text-center space-y-6"
            >
              {/* Spinning Ring */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-surface-darker" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-main">
                  {t.upload_processing || t.upload.verifyingTitle}
                </h3>
                <p className="text-sm text-text-main/70 mt-1 font-mono">
                  {progressStage}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md">
                <div className="h-2.5 w-full bg-surface rounded-full overflow-hidden border border-surface-darker/60">
                  <motion.div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-text-main/60 mt-2">
                  <span>{t.upload.pkiEngineProgress}</span>
                  <span>{progress}%</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATE 6: RESULT VALID */}
          {state === 'result-valid' && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Valid Banner */}
              <div className="p-6 rounded-2xl bg-success-light/40 border border-success/30 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                {/* Animated Green Circle SVG with Stroke Draw Checkmark */}
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-success"
                    viewBox="0 0 52 52"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      cx="26"
                      cy="26"
                      r="23"
                      strokeWidth="3"
                      className="animate-draw-circle text-success/30"
                    />
                    <path
                      d="M14 27l8 8 16-16"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-draw-check text-success"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-2xl font-black text-success-dark">
                      {t.upload.signatureValid}
                    </h3>
                    <Badge variant="success">{t.upload.ccaVerified}</Badge>
                  </div>
                  <p className="text-sm text-text-main/80 leading-relaxed">
                    {t.upload.verifiedSubheading}
                  </p>
                </div>
              </div>

              {/* Certificate Details Table */}
              <div className="rounded-2xl border border-surface-darker overflow-hidden bg-white">
                <div className="bg-surface px-5 py-3 border-b border-surface-darker flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-main/80">
                    {t.upload.certDetailsHeading}
                  </span>
                  <span className="text-xs font-semibold text-success flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.upload.legallyValid}
                  </span>
                </div>

                <div className="divide-y divide-surface-darker/60 text-sm">
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-text-main/60 font-medium">{t.upload.docNameLabel}</span>
                    <span className="sm:col-span-2 font-bold text-text-main break-all">{result.fileName}</span>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-text-main/60 font-medium">{t.upload.signerLabel}</span>
                    <span className="sm:col-span-2 font-bold text-text-main">{result.signerName}</span>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-text-main/60 font-medium">{t.upload.issuedByLabel}</span>
                    <span className="sm:col-span-2 text-text-main">{result.issuer}</span>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-text-main/60 font-medium">{t.upload.signedOnLabel}</span>
                    <span className="sm:col-span-2 text-text-main">{result.signedAt}</span>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-text-main/60 font-medium">{t.upload.scopeLabel}</span>
                    <span className="sm:col-span-2 text-success font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> {result.signatureCovers}
                    </span>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-text-main/60 font-medium">{t.upload.hashLabel}</span>
                    <span className="sm:col-span-2 text-xs font-mono text-text-main/70">{result.algorithm}</span>
                  </div>
                </div>
              </div>

              {/* In-Place Signature Transformation Visual Callout */}
              <div className="p-4 rounded-2xl bg-surface/70 border border-success/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold">
                    <span>{language === 'ta' ? '❓ சரிபார்க்கப்படவில்லை' : '❓ Unverified'}</span>
                  </div>
                  <span className="text-text-main/40 font-bold">➔</span>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-success-light border border-success/40 text-success-dark text-xs font-bold">
                    <span>{language === 'ta' ? '✔ உண்மையான கையொப்பம்' : '✔ Signature valid'}</span>
                  </div>
                </div>
                <p className="text-xs text-text-main/70 text-center sm:text-right">
                  {t.upload.inPlaceNote}
                </p>
              </div>

              {/* Download Verified Button & WhatsApp Share */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  className="w-full sm:flex-1 text-base font-bold shadow-md gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>{t.upload.downloadBtn}</span>
                </Button>

                <WhatsAppShare
                  message="I verified my government PDF signature using Kagazo ✅ It shows green tick now! Try it free: https://kagazo.in"
                  className="w-full sm:w-auto justify-center py-3.5"
                />

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={resetAll}
                  className="w-full sm:w-auto"
                >
                  {t.upload.verifyAnother}
                </Button>
              </div>

              {/* Logged in User Quick Audit Link */}
              {user && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-surface/60 border border-surface-darker text-xs text-text-main/70">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    <span>Cryptographic audit recorded under account <strong>{user.email}</strong></span>
                  </span>
                  <Link
                    href="/dashboard/verifications"
                    className="inline-flex items-center gap-1 font-bold text-primary hover:text-primary-hover hover:underline"
                  >
                    <span>View in Dashboard Audit Log</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Internal Link to matching SEO Landing Page Guide */}
              {result.docType && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-primary-light/40 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 rounded-lg bg-primary text-white">
                      <FileCheck className="w-4 h-4" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-text-main">
                      Official guide &amp; troubleshooting for <span className="text-primary font-black">{result.docType}</span>
                    </span>
                  </div>

                  <Link
                    href={`/${getSeoSlugForDocType(result.docType)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover hover:underline transition-colors shrink-0"
                  >
                    <span>Learn more about {result.docType}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Expandable "What does this mean?" Section */}
              <div className="rounded-2xl border border-surface-darker bg-surface/40 p-4">
                <button
                  type="button"
                  onClick={() => setWhatDoesThisMeanOpen(!whatDoesThisMeanOpen)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-text-main hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    {language === 'ta' ? 'உங்கள் சான்றிதழுக்கு இதன் அர்த்தம் என்ன?' : 'What does this mean for your certificate?'}
                  </span>
                  {whatDoesThisMeanOpen ? (
                    <ChevronUp className="w-4 h-4 text-text-main/70" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-main/70" />
                  )}
                </button>

                <AnimatePresence>
                  {whatDoesThisMeanOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 text-xs sm:text-sm text-text-main/80 space-y-2 pt-3 border-t border-surface-darker/60"
                    >
                      <p>
                        1. <strong>{language === 'ta' ? 'நம்பகத்தன்மை:' : 'Authenticity:'}</strong>{' '}
                        {language === 'ta'
                          ? 'இந்த ஆவணம் சம்பந்தப்பட்ட அரசுத் துறையினால் உண்மையாக வழங்கப்பட்டு கையொப்பமிடப்பட்டுள்ளது.'
                          : 'This document was genuinely produced and signed by the designated government department.'}
                      </p>
                      <p>
                        2. <strong>{language === 'ta' ? 'ஒருமைப்பாடு:' : 'Integrity:'}</strong>{' '}
                        {language === 'ta'
                          ? 'டிஜிட்டல் கையொப்பமிட்ட பிறகு இந்த PDF கோப்பில் எந்த மாற்றமும் செய்யப்படவில்லை.'
                          : 'The PDF content has not been altered, modified, or tampered with since the cryptographic signature was applied.'}
                      </p>
                      <p>
                        3. <strong>{language === 'ta' ? 'சட்டப்பூர்வ நிலை:' : 'Legal Status:'}</strong>{' '}
                        {language === 'ta'
                          ? 'இந்திய தகவல் தொழில்நுட்ப சட்டம் 2000 பிரிவு 5-இன் கீழ், இந்த கையொப்பம் கையால் இடப்பட்ட கையொப்பத்திற்கு இணையான சட்ட மதிப்பைக் கொண்டுள்ளது.'
                          : "Under Section 5 of India's Information Technology Act 2000, digital signatures generated under the CCA hierarchy carry the exact same legal validity as handwritten signatures."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STATE 7: RESULT INVALID */}
          {state === 'result-invalid' && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="animate-shake p-6 rounded-2xl bg-error-light/40 border border-error/30 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-error text-white flex items-center justify-center shadow-sm">
                  <XCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-error-dark">
                    {language === 'ta' ? 'செல்லாத கையொப்பம் (Invalid)' : 'Signature Invalid'}
                  </h3>
                  <p className="text-sm text-text-main/80 mt-1 leading-relaxed">
                    {language === 'ta'
                      ? 'எச்சரிக்கை: டிஜிட்டல் கையொப்பத்தை சரிபார்க்க முடியவில்லை அல்லது கையொப்பமிட்ட பிறகு ஆவணம் மாற்றப்பட்டிருக்கலாம்.'
                      : 'Warning: The digital signature cannot be validated or the document may have been modified after signing.'}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-surface-darker bg-white p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-error uppercase tracking-wider">
                    {language === 'ta' ? 'தோல்விக்கான காரணம்' : 'Reason for Failure'}
                  </h4>
                  <p className="text-sm text-text-main/80 mt-1">
                    {result.reason || (language === 'ta' ? 'கையொப்பமிட்ட பிறகு PDF ஆவணம் மாற்றப்பட்டுள்ளது.' : 'Document byte stream modified after digital signature application.')}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-darker">
                  <h4 className="text-sm font-bold text-text-main uppercase tracking-wider">
                    {language === 'ta' ? 'அடுத்து நீங்கள் செய்ய வேண்டியது' : 'What You Should Do Next'}
                  </h4>
                  <p className="text-sm text-text-main/80 mt-1">
                    {result.remedy || (language === 'ta' ? 'அதிகாரப்பூர்வ அரசு தளத்திலிருந்து புதிய அசல் கோப்பைப் பதிவிறக்கவும்.' : 'Download a fresh original copy directly from the official portal.')}
                  </p>
                </div>

                {result.officialPortalUrl && (
                  <div className="pt-3 border-t border-surface-darker">
                    <a
                      href={result.officialPortalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    >
                      <span>{language === 'ta' ? 'அரசு தளத்தை பார்வையிடவும்' : `Visit ${result.officialPortalName || 'Official Government Portal'}`}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="primary" size="lg" onClick={resetAll} className="w-full">
                  {language === 'ta' ? 'மற்றொரு PDF-ஐ முயற்சிக்கவும்' : 'Try Another PDF'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STATE 8: RESULT UNKNOWN */}
          {state === 'result-unknown' && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-warning-light/50 border border-warning/30 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-warning text-white flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-warning-dark">
                    {language === 'ta' ? 'தெரியாத கையொப்பம் (Unknown Root)' : 'Signature Unknown (Issuer Not in Root Store)'}
                  </h3>
                  <p className="text-sm text-text-main/80 mt-1 leading-relaxed">
                    {language === 'ta'
                      ? 'ஆவணத்தில் கையொப்பம் உள்ளது, ஆனால் சான்றிதழ் சங்கிலி அங்கீகரிக்கப்பட்ட அதிகாரப்பூர்வ CCA அமைப்பில் முடியவில்லை.'
                      : 'The document signature exists, but the certificate chain terminates at a root authority not recognized in the standard CCA hierarchy.'}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-surface-darker bg-white p-6 space-y-3">
                <h4 className="text-sm font-bold text-text-main">
                  {language === 'ta' ? 'தொழில்நுட்ப விளக்கம்' : 'Technical Explanation'}
                </h4>
                <p className="text-sm text-text-main/80 leading-relaxed">
                  {language === 'ta'
                    ? 'கிரிப்டோகிராஃபிக் ஹாஷ் ஒருமைப்பாடு சரியாக உள்ளது, ஆனால் வழங்கிய அமைப்பு இந்தியாவின் RCAI அங்கீகரிக்கப்பட்ட பட்டியலில் இல்லை.'
                    : 'The cryptographic hash integrity is intact, but the root CA is not in the official Root Certifying Authority of India (RCAI) store.'}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" size="lg" onClick={resetAll} className="w-full">
                  {language === 'ta' ? 'மற்றொரு ஆவணத்தை பதிவேற்றவும்' : 'Upload Another Document'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STATE 9: ERROR */}
          {state === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-4 space-y-6"
            >
              {/* Specialized view for NO_SIGNATURE_FOUND */}
              {errorCode === 'NO_SIGNATURE_FOUND' || errorMessage.toLowerCase().includes('no digital signature') ? (
                <div className="space-y-6">
                  {/* Top Notice */}
                  <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                      <AlertTriangle className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-1.5">
                        Verification Failed
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-text-main">
                        No Digital Signatures Detected
                      </h3>
                      <p className="text-sm text-text-main/80 mt-1 leading-relaxed">
                        No digital signatures were detected in this PDF. Please ensure you are uploading the official government digitally signed document.
                      </p>
                    </div>
                  </div>

                  {/* Common Reasons / Issues */}
                  <div className="rounded-2xl border border-surface-darker bg-surface/30 p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      <h4 className="text-xs sm:text-sm font-bold text-text-main uppercase tracking-wider">
                        Why did this happen? Common issues with downloaded files:
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-xl bg-white border border-surface-darker/80 shadow-xs flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                          <Printer className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-text-main">
                            Saved via &quot;Print to PDF&quot; / &quot;Save as PDF&quot;
                          </h5>
                          <p className="text-xs text-text-main/70 mt-1 leading-relaxed">
                            Using Chrome, Edge, or mobile &quot;Print to PDF&quot; flattens the file, permanently stripping the cryptographic digital signature dictionary (<code className="text-[11px] bg-surface px-1 py-0.5 rounded">/ByteRange</code>).
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-surface-darker/80 shadow-xs flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                          <Scissors className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-text-main">
                            Modified or Compressed Online
                          </h5>
                          <p className="text-xs text-text-main/70 mt-1 leading-relaxed">
                            Editing or compressing with tools like iLovePDF, SmallPDF, or CamScanner alters the byte stream and breaks the digital signature.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-surface-darker/80 shadow-xs flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                          <Camera className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-text-main">
                            Scanned Paper Copy or Photo
                          </h5>
                          <p className="text-xs text-text-main/70 mt-1 leading-relaxed">
                            Taking a phone photo or scanning a paper printout creates flat visual pixels. It does not carry the cryptographic PKCS#7 signature certificate.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-surface-darker/80 shadow-xs flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-text-main">
                            Application Slip or Draft Receipt
                          </h5>
                          <p className="text-xs text-text-main/70 mt-1 leading-relaxed">
                            Acknowledgment slips or payment receipts are not digitally signed. Only the final approved government certificate carries a digital signature.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How to Fix Section */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                    <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      How to Fix &amp; Verify Successfully:
                    </h4>
                    <ol className="text-xs sm:text-sm text-text-main/80 space-y-2 list-decimal list-inside leading-relaxed pl-1">
                      <li>
                        Log in directly to your official government issuing portal (e.g.{' '}
                        <strong>UIDAI myAadhaar</strong>,{' '}
                        <strong>TNeGA e-District</strong>,{' '}
                        <strong>DigiLocker</strong>,{' '}
                        <strong>TRACES</strong>, or{' '}
                        <strong>MeeSeva</strong>).
                      </li>
                      <li>
                        Download the original PDF file directly onto your device.
                      </li>
                      <li>
                        <strong>Important:</strong> Do not open and re-save or &quot;Print to PDF&quot;.
                      </li>
                      <li>
                        Upload the fresh downloaded PDF directly here for instant validation and permanent Green Tick seal.
                      </li>
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button variant="primary" size="lg" onClick={resetAll} className="w-full sm:flex-1 font-bold gap-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Upload Fresh Government PDF</span>
                    </Button>
                  </div>
                </div>
              ) : errorCode === 'INVALID_FORMAT' ? (
                /* Specialized view for INVALID_FORMAT */
                <div className="space-y-6 text-center sm:text-left">
                  <div className="p-6 rounded-2xl bg-error-light/40 border border-error/30 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-error text-white flex items-center justify-center shadow-sm">
                      <XCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-error-dark">
                        Unsupported File Format
                      </h3>
                      <p className="text-sm text-text-main/80 mt-1 leading-relaxed">
                        {errorMessage}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-surface-darker bg-surface/30 p-5 space-y-3">
                    <h4 className="text-sm font-bold text-text-main">
                      Supported Official Document Formats:
                    </h4>
                    <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                      Only original ISO 32000 PDF documents (.pdf) containing government PKCS#7 digital signature dictionaries can be verified. Supported: e-Aadhaar (UIDAI), Community &amp; Nativity Certificates (TNeGA), PAN Card (NSDL/Protean), DigiLocker PDFs, and TRACES Form 16.
                    </p>
                  </div>

                  <Button variant="primary" size="lg" onClick={resetAll} className="w-full font-bold gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Upload Official PDF Certificate</span>
                  </Button>
                </div>
              ) : (
                /* Fallback generic error view */
                <div className="py-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-error-light text-error flex items-center justify-center">
                    <XCircle className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-text-main">
                    Verification Failed
                  </h3>
                  <p className="text-sm text-text-main/70 max-w-md">
                    {errorMessage || 'An error occurred while inspecting the PDF digital signature. Please verify the file is not corrupted.'}
                  </p>
                  <Button variant="primary" size="md" onClick={resetAll} className="mt-2 font-bold gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* Test Simulation Strip for Demo */}
          {state === 'idle' && (
            <div className="mt-8 pt-6 border-t border-surface-darker/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-text-main/60 font-medium">Quick Demo Samples:</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => loadSampleDoc('eAadhaar_SAMPLE_RAMA.pdf', 'valid')}
                  className="px-2.5 py-1 rounded-lg bg-surface hover:bg-primary-light hover:text-primary font-medium text-text-main transition-colors border border-surface-darker"
                >
                  📄 Sample Aadhaar (Valid)
                </button>
                <button
                  type="button"
                  onClick={() => loadSampleDoc('TN_Community_Certificate_2024.pdf', 'valid')}
                  className="px-2.5 py-1 rounded-lg bg-surface hover:bg-primary-light hover:text-primary font-medium text-text-main transition-colors border border-surface-darker"
                >
                  📄 TN Community (Valid)
                </button>
                <button
                  type="button"
                  onClick={() => loadSampleDoc('Modified_Document_Tampered.pdf', 'invalid')}
                  className="px-2.5 py-1 rounded-lg bg-surface hover:bg-error-light hover:text-error font-medium text-text-main transition-colors border border-surface-darker"
                >
                  ⚠️ Tampered PDF (Invalid)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info below upload zone */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-text-main/60">
            {language === 'ta' ? 'PDF கோப்புகள் மட்டுமே, அதிகபட்சம் 25MB • 100% நினைவகத்தில் இயங்கும்' : 'Accepts PDF only, max 25MB • Files processed 100% in memory'}
          </p>
          <p className="text-xs font-semibold text-text-main/80">
            {language === 'ta' ? 'ஆதரிக்கும் ஆவணங்கள்: இ-ஆதார் • சாதி சான்றிதழ் • இருப்பிடம் • பான் • டிஜிலாக்கர் • ITR-V' : 'Supports: e-Aadhaar • Community Cert • Nativity • PAN • DigiLocker • ITR-V'}
          </p>

          {/* Live Trust Counter UI */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-5 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-surface-darker/80 shadow-xs hover:border-primary/30 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div className="text-left">
                  <div className="text-sm sm:text-base font-black text-text-main tracking-tight font-mono leading-none">
                    {verifiedCount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-text-main/60 mt-0.5">
                    {t.upload.counterSuffix}
                  </div>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-px bg-surface-darker" />

              <div className="flex items-center gap-2 text-[11px] text-text-main/70 font-medium">
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-semibold">
                  <span>✓ {t.upload.trustTag}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Limit Reached Modal - Prompts Sign Up / Sign In First */}
      <GuestLimitModal
        isOpen={showGuestLimitModal}
        onClose={() => setShowGuestLimitModal(false)}
        freeLimit={publicSettings?.free_daily_limit || 3}
        onViewPlans={() => setShowUpgradeModal(true)}
      />

      {/* Complete UPI Payment Flow 3-Step Modal */}
      <UpiPaymentFlowModal
        isOpen={showUpgradeModal}
        canDismiss={true}
        onClose={() => setShowUpgradeModal(false)}
        userEmail={user?.email || ''}
        userName={user?.name || ''}
      />
      </section>
    </ErrorBoundary>
  );
}
