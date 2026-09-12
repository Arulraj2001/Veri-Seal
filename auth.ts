import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';

const ADMIN_EMAILS = [
  'admin@veriseal.in',
  'samuel@veriseal.in',
  process.env.ADMIN_EMAIL?.toLowerCase(),
].filter(Boolean) as string[];

const googleClientId = process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET;

const authProviders = [];
if (googleClientId && googleClientSecret) {
  authProviders.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
}

authProviders.push(
  Credentials({
      id: 'credentials',
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password as string | undefined;

        if (!email || typeof email !== 'string') {
          return null;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const namePart = normalizedEmail.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

        const isPrebuiltAdmin =
          ADMIN_EMAILS.includes(normalizedEmail) ||
          normalizedEmail.startsWith('admin@') ||
          normalizedEmail.includes('admin');

        let userRole: 'user' | 'admin' = isPrebuiltAdmin ? 'admin' : 'user';
        let userPlan: 'free' | 'pro' | 'business' = isPrebuiltAdmin ? 'business' : 'free';
        let dbUserId: string | null = null;

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || anonKey;

        // 1. If password is provided, or if this is an admin account, verify against Supabase Auth
        if (password && typeof password === 'string' && password.trim().length > 0) {
          if (supabaseUrl && anonKey) {
            try {
              const authRes = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
                method: 'POST',
                headers: {
                  apikey: anonKey,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: normalizedEmail,
                  password: password,
                }),
              });

              const authData = await authRes.json();

              if (!authRes.ok || !authData?.user) {
                console.warn('Supabase Auth verification failed:', authData?.msg || authData?.error_description);
                // Return null so NextAuth throws invalid credentials error
                return null;
              }

              // Successfully authenticated against Supabase Auth!
              const sbUser = authData.user;
              dbUserId = sbUser.id;

              if (isPrebuiltAdmin) {
                userRole = 'admin';
                userPlan = 'business';
              }

              // Synchronize user to public.users table in Supabase
              if (serviceKey) {
                await fetch(`${supabaseUrl}/rest/v1/users`, {
                  method: 'POST',
                  headers: {
                    apikey: serviceKey,
                    Authorization: `Bearer ${serviceKey}`,
                    'Content-Type': 'application/json',
                    Prefer: 'resolution=merge-duplicates',
                  },
                  body: JSON.stringify({
                    id: sbUser.id,
                    email: normalizedEmail,
                    name: sbUser.user_metadata?.name || formattedName,
                    role: userRole,
                    plan: userPlan,
                    updated_at: new Date().toISOString(),
                  }),
                }).catch((err) => console.debug('Supabase public.users sync error:', err));
              }

              return {
                id: sbUser.id,
                name: sbUser.user_metadata?.name || formattedName,
                email: normalizedEmail,
                role: userRole,
                plan: userPlan,
              };
            } catch (err) {
              console.error('Error during Supabase password check:', err);
              return null;
            }
          }
        }

        // 2. Admin account MUST supply the password
        if (isPrebuiltAdmin) {
          console.warn('Admin login attempted without password');
          return null;
        }

        // 3. Optional passwordless fallback for public citizen demo
        try {
          const { data: dbUser } = await supabase
            .from('users')
            .select('id, role, plan, banned')
            .eq('email', normalizedEmail)
            .maybeSingle();

          if (dbUser) {
            dbUserId = dbUser.id;
            if (dbUser.banned) {
              return null;
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
          id: dbUserId || ('user_' + Buffer.from(normalizedEmail).toString('hex').substring(0, 12)),
          name: formattedName,
          email: normalizedEmail,
          role: userRole,
          plan: userPlan,
        };
      },
    })
  );

  export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'veriseal_super_secret_auth_key_prod_32chars_minimum_length',
    providers: authProviders,
    session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      if (user?.email) {
        try {
          const normalizedEmail = user.email.toLowerCase().trim();
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', normalizedEmail)
            .maybeSingle();

          if (!existingUser) {
            const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
            fetch(`${baseUrl}/api/email/welcome`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: user.name || normalizedEmail.split('@')[0],
                email: normalizedEmail,
              }),
            }).catch((err) => console.debug('Welcome email dispatch error:', err));

            await supabase.from('users').upsert(
              {
                email: normalizedEmail,
                name: user.name || normalizedEmail.split('@')[0],
                role: (user as { role?: string }).role || 'user',
                plan: (user as { plan?: string }).plan || 'free',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'email' }
            );
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

        const email = user.email?.toLowerCase().trim();
        if (
          email &&
          (ADMIN_EMAILS.includes(email) ||
            email.startsWith('admin@') ||
            email.includes('admin'))
        ) {
          token.role = 'admin';
          token.plan = 'business';
        }
      }

      // Sync latest role & plan from Supabase database if available
      if (token.email) {
        try {
          const { data: dbUser } = await supabase
            .from('users')
            .select('id, role, plan, banned')
            .eq('email', (token.email as string).toLowerCase().trim())
            .maybeSingle();

          if (dbUser) {
            token.id = dbUser.id || token.id;
            if (dbUser.role) token.role = dbUser.role;
            if (dbUser.plan) token.plan = dbUser.plan;
          }
        } catch (e) {
          console.debug('Supabase jwt sync fallback:', e);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || session.user.id;
        (session.user as { role?: string }).role = (token.role as string) || 'user';
        (session.user as { plan?: string }).plan = (token.plan as string) || 'free';

        // Sanitize profile picture to prevent broken image tags
        const rawImage = (token.picture as string) || session.user.image;
        if (rawImage && typeof rawImage === 'string' && (rawImage.startsWith('http://') || rawImage.startsWith('https://'))) {
          session.user.image = rawImage;
        } else {
          session.user.image = undefined;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
