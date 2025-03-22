import { isServer } from '@tanstack/react-query';
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;
let serverClient: SupabaseClient | null = null;

export const createClient = () => {
  //브라우저 클라이언트용 환경변수
  const LOCAL_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const LOCAL_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  //서버 클라이언트용 환경변수
  const SUPABASE_URL = process.env.SUPABASE_URL!;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  //브라우저
  if (!isServer) {
    if (!browserClient) {
      browserClient = createBrowserClient(LOCAL_SUPABASE_URL, LOCAL_SUPABASE_ANON_KEY);
    }
    return browserClient;
  }

  //서버
  if (!serverClient) {
    const cookieStore = cookies();
    serverClient = createServerClient(SUPABASE_URL, SERVICE_KEY, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        }
      }
    });
  }
  return serverClient;
};
