-- VeriSeal Phase 5 Storage Bucket & Policies for Payment Proofs

-- 1. Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'payment-screenshots',
  'payment-screenshots',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage policies
-- Authenticated users can upload screenshots to their own folder: [user_id]/[timestamp]-[txn_id].jpg
DROP POLICY IF EXISTS "Allow authenticated uploads to payment-screenshots" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to payment-screenshots" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'payment-screenshots' 
    AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
  );

-- Admins and owners can view screenshots
DROP POLICY IF EXISTS "Allow owner and admin read on payment-screenshots" ON storage.objects;
CREATE POLICY "Allow owner and admin read on payment-screenshots" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'payment-screenshots'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR EXISTS (
        SELECT 1 FROM public.users 
        WHERE users.id = auth.uid() AND users.role = 'admin'
      )
    )
  );
