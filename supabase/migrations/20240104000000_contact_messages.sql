-- VeriSeal Phase 5 Contact & Support System Schema Migration

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for admin inbox speed
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- RLS policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contact submissions
DROP POLICY IF EXISTS "contact_messages_public_insert" ON contact_messages;
CREATE POLICY "contact_messages_public_insert" ON contact_messages 
  FOR INSERT WITH CHECK (true);

-- Allow admins full read/update/delete access
DROP POLICY IF EXISTS "contact_messages_admin_select" ON contact_messages;
CREATE POLICY "contact_messages_admin_select" ON contact_messages 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "contact_messages_admin_update" ON contact_messages;
CREATE POLICY "contact_messages_admin_update" ON contact_messages 
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "contact_messages_admin_delete" ON contact_messages;
CREATE POLICY "contact_messages_admin_delete" ON contact_messages 
  FOR DELETE USING (true);
