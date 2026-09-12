-- Kagazo Initial Supabase Schema Migration

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' 
    CHECK (plan IN ('free', 'pro', 'business')),
  plan_expiry TIMESTAMP WITH TIME ZONE,
  verification_count_today INTEGER DEFAULT 0,
  verification_count_total INTEGER DEFAULT 0,
  last_verification_reset DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE 
    DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE 
    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id TEXT,
  doc_type TEXT,
  status TEXT CHECK (status IN 
    ('VALID','INVALID','UNKNOWN','ERROR')),
  signer_name TEXT,
  signer_org TEXT,
  issuer TEXT,
  signed_on TIMESTAMP WITH TIME ZONE,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE 
    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE 
    DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
('payment_enabled', 'false'),
('maintenance_mode', 'false'),
('adsense_enabled', 'false'),
('adsense_publisher_id', ''),
('upi_id', 'YOUR_UPI_ID'),
('upi_qr_url', ''),
('site_name', 'Kagazo'),
('site_tagline', 'Verify Indian Government PDF Signatures'),
('contact_email', 'support@kagazo.in'),
('whatsapp_number', ''),
('verification_counter', '421847'),
('language_tamil_enabled', 'true'),
('free_daily_limit', '3')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS payment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  plan TEXT NOT NULL,
  upi_txn_id TEXT NOT NULL,
  screenshot_url TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' 
    CHECK (status IN 
    ('pending','approved','rejected')),
  admin_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE 
    DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE 
    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  key TEXT UNIQUE NOT NULL,
  name TEXT,
  daily_limit INTEGER DEFAULT 500,
  usage_today INTEGER DEFAULT 0,
  usage_total INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' 
    CHECK (status IN ('active','revoked')),
  created_at TIMESTAMP WITH TIME ZONE 
    DEFAULT NOW()
);

-- RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
DROP POLICY IF EXISTS "users_own_data" ON users;
CREATE POLICY "users_own_data" ON users
  FOR ALL USING (auth.uid() = id);

-- Users can read their own verifications
DROP POLICY IF EXISTS "verifications_own" ON verifications;
CREATE POLICY "verifications_own" ON verifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own verifications
DROP POLICY IF EXISTS "verifications_insert" ON verifications;
CREATE POLICY "verifications_insert" ON verifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read their own payment requests
DROP POLICY IF EXISTS "payments_own" ON payment_requests;
CREATE POLICY "payments_own" ON payment_requests
  FOR ALL USING (auth.uid() = user_id);

-- Public read for site_settings
DROP POLICY IF EXISTS "settings_public_read" ON site_settings;
CREATE POLICY "settings_public_read" ON site_settings
  FOR SELECT USING (true);
