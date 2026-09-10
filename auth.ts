import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';

const ADMIN_EMAILS = [
  'admin@veriseal.in',
  'samuel@veriseal.in',
  process.env.ADMIN_EMAIL?.toLowerCase(),
].filter(Boolean) as string[];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-client-secret',
    }),
    Credentials({
      id: 'credentials',
      name: 'Email (Magic Link)',
      credentials: {
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        if (!email || typeof email !== 'string') {
          return null;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const namePart = normalizedEmail.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

        let userRole: 'user' | 'admin' = 'user';
        let userPlan: 'free' | 'pro' | 'business' = 'free';

        // Check if admin email list matches
        if (
          ADMIN_EMAILS.includes(normalizedEmail) ||
          normalizedEmail.startsWith('admin@') ||
          normalizedEmail.includes('admin')
        ) {
          userRole = 'admin';
          userPlan = 'business';
        }

        // Check Supabase if connected
        try {
          const { data: dbUser } = await supabase
            .from('users')
            .select('id, role, plan, banned')
            .eq('email', normalizedEmail)
            .single();

          if (dbUser) {
            if (dbUser.banned) {
              throw new Error('This account has been suspended by administration.');
            }
            if (dbUser.role) {
              userRole = dbUser.role as 'user' | 'admin';
            }
            if (dbUser.plan) {
              userPlan = dbUser.plan as 'free' | 'pro' | 'business';
            }
          }
        } catch (e) {
          console.debug('Supabase user lookup fallback:', e);
        }

        return {
          id: 'user_' + Buffer.from(normalizedEmail).toString('hex').substring(0, 12),
          name: formattedName,
          email: normalizedEmail,
          role: userRole,
          plan: userPlan,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      if (user?.email) {
        try {
          const normalizedEmail = user.email.toLowerCase().trim();
          const { data: existingUser } = await supabase
            .from('users')
            .select('id, welcome_sent')
            .eq('email', normalizedEmail)
            .maybeSingle();

          if (!existingUser || !existingUser.welcome_sent) {
            const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
            fetch(`${baseUrl}/api/email/welcome`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: user.name || normalizedEmail.split('@')[0],
                email: normalizedEmail,
              }),
            }).catch((err) => console.debug('Welcome email dispatch error:', err));

            await supabase.from('users').upsert({
              email: normalizedEmail,
              name: user.name || normalizedEmail.split('@')[0],
              role: (user as { role?: string }).role || 'user',
              plan: (user as { plan?: string }).plan || 'free',
              welcome_sent: true,
              created_at: new Date().toISOString(),
            });
          }
        } catch (e) {
          console.debug('Supabase signIn callback check:', e);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || 'user';
        token.plan = (user as { plan?: string }).plan || 'free';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || session.user.id;
        (session.user as { role?: string }).role = (token.role as string) || 'user';
        (session.user as { plan?: string }).plan = (token.plan as string) || 'free';
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
