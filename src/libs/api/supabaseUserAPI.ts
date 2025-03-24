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
