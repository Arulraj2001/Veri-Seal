import { track } from '@vercel/analytics';

export type AnalyticsEvent =
  | { name: 'pdf_uploaded'; properties?: { file_size: number; file_name?: string } }
  | { name: 'verification_complete'; properties: { doc_type: string; status: string; duration_ms?: number } }
  | { name: 'pdf_downloaded'; properties: { doc_type?: string; file_name?: string } }
  | { name: 'signup_started'; properties?: { source?: string } }
  | { name: 'payment_initiated'; properties: { plan: string; amount: number } };

/**
 * Dispatches custom telemetry events to both Vercel Analytics and Google Analytics (GA4).
 */
export function trackEvent<T extends AnalyticsEvent>(event: T): void {
  try {
    // 1. Vercel Analytics
    if (typeof window !== 'undefined') {
      track(event.name, event.properties as Record<string, string | number | boolean>);
    }

    // 2. Google Analytics 4 (gtag)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', event.name, event.properties);
    }
  } catch (err) {
    console.debug('Analytics dispatch error:', err);
  }
}
