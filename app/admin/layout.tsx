import * as React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Enforce admin-only access
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user || role !== 'admin') {
    redirect('/login?error=admin_required');
  }

  const adminName = session.user.name || session.user.email || 'Administrator';

  return (
    <AdminLayoutClient adminName={adminName}>
      {children}
    </AdminLayoutClient>
  );
}
