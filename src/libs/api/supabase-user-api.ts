'use client';

import { SignupOptions, LoginOptions, AuthResponse, User } from '@/types/auth';
import { getBrowserClient } from '@/utils/supabase/browserClient';
import { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';

enum SocialProvider {
  Kakao = 'kakao',
  Google = 'google'
}

/**
 * 회원가입을 처리하는 함수
 */
export const signup = async ({ email, password, nickname }: SignupOptions): Promise<AuthResponse> => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { user_nickname: nickname }
    }
  });

  const mappedUser = data.user ? mapSupabaseUserToUser(data.user) : null;

  // supabase 설정으로 public user 테이블에 바로 들어가게 되어 아래 코드 주석 처리
  // if (!error && mappedUser) {
  //   // public.users에 사용자 추가
  //   const { error: insertError } = await supabase
  //     .from('users')
  //     .insert([{ id: mappedUser.id, nickname, email, created_at: mappedUser.created_at }]);
  //   if (insertError) console.error('Insert Error:', insertError);
  // }

  return {
    user: mappedUser,
    session: data.session,
    error: error ? error.message : null
  };
};

/**
 * 로그인을 처리하는 함수
 */
export const login = async ({ email, password }: LoginOptions): Promise<AuthResponse> => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  const mappedUser = data.user ? mapSupabaseUserToUser(data.user) : null;

  return {
    user: mappedUser,
    session: data.session,
    error: error ? error.message : null
  };
};

/**
 * 로그아웃을 처리하는 함수
 */
export const signout = async (): Promise<void> => {
  const supabase = getBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  alert('로그아웃 되었습니다. 안녕히 가세요!');
};

/**
 * 현재 로그인 상태를 확인하는 함수
 */
export const isLoggedIn = async (): Promise<boolean> => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.getSession();
  return !!data.session && !error;
};

/**
 * 현재 사용자와 세션 정보를 가져오는 함수
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.getSession();

  const mappedUser = data.session?.user ? mapSupabaseUserToUser(data.session.user) : null;

  return {
    user: mappedUser,
    session: data.session,
    error: error?.message || null
  };
};

/**
 * 인증 상태 변화 구독 함수
 */
export const subscribeToAuthState = (
  callback: (event: AuthChangeEvent, user: User | null, session: Session | null) => void
): { unsubscribe: () => void } => {
  const supabase = getBrowserClient();
  const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
    let mappedUser: User | null = null;
    if (session && session.user) {
      mappedUser = mapSupabaseUserToUser(session.user);
    }
    callback(event, mappedUser, session);
  });

  return {
    unsubscribe: () => subscription.subscription.unsubscribe()
  };
};

/**
 * Supabase User를 User 인터페이스로 매핑
 */
const mapSupabaseUserToUser = (supabaseUser: SupabaseUser): User => {
  const email = supabaseUser.email;
  if (!email) {
    throw new Error('사용자 이메일이 존재하지 않습니다.');
  }

  return {
    id: supabaseUser.id,
    nickname: supabaseUser.user_metadata?.nickname || '',
    email,
    created_at: supabaseUser.created_at
  };
};

const signInWithOAuth = async (provider: SocialProvider, redirectTo: string): Promise<{ error: string | null }> => {
  const supabase = getBrowserClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo
    }
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
};

/**
 * 카카오 소셜 로그인 함수
 */
export const signInWithKakao = async (redirectTo: string): Promise<{ error: string | null }> => {
  return signInWithOAuth(SocialProvider.Kakao, redirectTo);
};

/**
 * 구글 소셜 로그인 함수
 */
export const signInWithGoogle = async (redirectTo: string): Promise<{ error: string | null }> => {
  return signInWithOAuth(SocialProvider.Google, redirectTo);
};
