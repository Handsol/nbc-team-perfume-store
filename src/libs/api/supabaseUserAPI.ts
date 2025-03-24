'use client';

import { SignupOptions, LoginOptions, AuthResponse } from '@/types/auth';
import { getBrowserClient } from '@/utils/supabase/browserClient';

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

  const mappedUser = data.user
    ? {
        id: data.user.id,
        nickname: data.user.user_metadata?.user_nickname || nickname,
        email: data.user.email || email,
        created_at: data.user.created_at
      }
    : null;

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

  const mappedUser = data.user
    ? {
        id: data.user.id,
        nickname: data.user.user_metadata?.user_nickname || '',
        email: data.user.email || email,
        created_at: data.user.created_at
      }
    : null;

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

  const mappedUser = data.session?.user
    ? {
        id: data.session.user.id,
        nickname: data.session.user.user_metadata?.user_nickname || '',
        email: data.session.user.email || '',
        created_at: data.session.user.created_at
      }
    : null;

  return {
    user: mappedUser,
    session: data.session,
    error: error?.message || null
  };
};
