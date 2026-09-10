'use client';

import * as React from 'react';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-6 rounded-3xl bg-error-light/30 border border-error/30 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-error text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-text-main mb-2">
            {this.props.fallbackTitle || 'Something went wrong'}
          </h3>
          <p className="text-xs sm:text-sm text-text-main/70 mb-6 leading-relaxed">
            {this.props.fallbackDescription ||
              'A client-side error occurred during processing. Your files remain completely secure in memory.'}
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={this.handleReset}
            className="inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Capture verification errors with safe non-PII context:
 * { doc_type, file_size, error_code }
 */
export function captureVerificationError(context: {
  doc_type?: string;
  file_size?: number;
  error_code?: string;
  message?: string;
}) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureMessage(context.message || `Verification error: ${context.error_code || 'UNKNOWN'}`, {
      level: 'error',
      extra: {
        doc_type: context.doc_type || 'unidentified',
        file_size: context.file_size || 0,
        error_code: context.error_code || 'GENERIC_ERROR',
      },
    });
  }
}
