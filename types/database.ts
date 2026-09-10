export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          role: 'user' | 'admin';
          banned: boolean;
          plan: 'free' | 'pro' | 'business';
          plan_expiry: string | null;
          verification_count_today: number;
          verification_count_total: number;
          last_verification_reset: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          role?: 'user' | 'admin';
          banned?: boolean;
          plan?: 'free' | 'pro' | 'business';
          plan_expiry?: string | null;
          verification_count_today?: number;
          verification_count_total?: number;
          last_verification_reset?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          role?: 'user' | 'admin';
          banned?: boolean;
          plan?: 'free' | 'pro' | 'business';
          plan_expiry?: string | null;
          verification_count_today?: number;
          verification_count_total?: number;
          last_verification_reset?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      verifications: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          doc_type: string;
          status: 'VALID' | 'INVALID' | 'UNKNOWN' | 'ERROR';
          signer_name: string | null;
          signer_org: string | null;
          issuer: string | null;
          signed_on: string | null;
          file_size: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          doc_type?: string;
          status?: 'VALID' | 'INVALID' | 'UNKNOWN' | 'ERROR';
          signer_name?: string | null;
          signer_org?: string | null;
          issuer?: string | null;
          signed_on?: string | null;
          file_size?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          doc_type?: string;
          status?: 'VALID' | 'INVALID' | 'UNKNOWN' | 'ERROR';
          signer_name?: string | null;
          signer_org?: string | null;
          issuer?: string | null;
          signed_on?: string | null;
          file_size?: number | null;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          updated_at?: string;
        };
      };
      payment_requests: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          name: string;
          plan: string;
          upi_txn_id: string;
          screenshot_url: string;
          amount: number;
          status: 'pending' | 'approved' | 'rejected';
          admin_note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          name: string;
          plan: string;
          upi_txn_id: string;
          screenshot_url: string;
          amount: number;
          status?: 'pending' | 'approved' | 'rejected';
          admin_note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          name?: string;
          plan?: string;
          upi_txn_id?: string;
          screenshot_url?: string;
          amount?: number;
          status?: 'pending' | 'approved' | 'rejected';
          admin_note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string | null;
          key: string;
          name: string | null;
          daily_limit: number;
          usage_today: number;
          usage_total: number;
          status: 'active' | 'revoked';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          key: string;
          name?: string | null;
          daily_limit?: number;
          usage_today?: number;
          usage_total?: number;
          status?: 'active' | 'revoked';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          key?: string;
          name?: string | null;
          daily_limit?: number;
          usage_today?: number;
          usage_total?: number;
          status?: 'active' | 'revoked';
          created_at?: string;
        };
      };
      content: {
        Row: {
          id: string;
          section: string;
          language: string;
          data: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section: string;
          language?: string;
          data: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section?: string;
          language?: string;
          data?: Json;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          meta_description: string | null;
          meta_keywords: string | null;
          featured_image_url: string | null;
          published: boolean;
          published_at: string | null;
          author_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          meta_description?: string | null;
          meta_keywords?: string | null;
          featured_image_url?: string | null;
          published?: boolean;
          published_at?: string | null;
          author_name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          meta_description?: string | null;
          meta_keywords?: string | null;
          featured_image_url?: string | null;
          published?: boolean;
          published_at?: string | null;
          author_name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      seo_pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          h1: string;
          meta_description: string | null;
          meta_keywords: string | null;
          intro_text: string | null;
          doc_type: string | null;
          state: string | null;
          portal: string | null;
          faq: Json;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          h1: string;
          meta_description?: string | null;
          meta_keywords?: string | null;
          intro_text?: string | null;
          doc_type?: string | null;
          state?: string | null;
          portal?: string | null;
          faq?: Json;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          h1?: string;
          meta_description?: string | null;
          meta_keywords?: string | null;
          intro_text?: string | null;
          doc_type?: string | null;
          state?: string | null;
          portal?: string | null;
          faq?: Json;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
