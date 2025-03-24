'use client';

import { SignupOptions, SignupResponse } from '@/types/auth';
import { getBrowserClient } from '@/utils/supabase/browserClient';

export const signup = async ({ email, password, nickname }: SignupOptions): Promise<SignupResponse> => {
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
