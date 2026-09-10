import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      // PII Scrubbing: Never send filenames containing Aadhaar, PAN, or citizen names
      if (event.extra && typeof event.extra === 'object') {
        delete (event.extra as Record<string, unknown>).fileContent;
        delete (event.extra as Record<string, unknown>).password;
      }
      return event;
    },
  });
}
