import { isServer } from '@tanstack/react-query';
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;
let serverClient: SupabaseClient | null = null;

export const createClient = () => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  //환경변수 검증 
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase 환경변수가 설정되지 않았습니다.');
  }
  
  //클라이언트
  if (!isServer) {
    if (!browserClient) {
      browserClient = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return browserClient;
  }

  //서버
  if (!serverClient) {
    const cookieStore = cookies();
    serverClient = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
