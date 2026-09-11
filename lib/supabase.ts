import { createClient } from '@supabase/supabase-js';

// Clean isomorphic WebSocket shim for Node.js environments (< Node 22)
// Prevents @supabase/realtime-js from throwing in Next.js server-side route handlers / sitemap
class ServerWebSocketMock {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;
  readonly readyState = 3;
  send() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
  onopen = null;
  onclose = null;
  onerror = null;
  onmessage = null;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

const wsTransport = typeof window !== 'undefined' ? undefined : (ServerWebSocketMock as unknown as typeof WebSocket);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
  ...(wsTransport ? { realtime: { transport: wsTransport } } : {}),
});

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  ...(wsTransport ? { realtime: { transport: wsTransport } } : {}),
});
