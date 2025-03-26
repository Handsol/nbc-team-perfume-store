'use client';

import { SignupOptions, LoginOptions, AuthResponse, User } from '@/types/auth';
import { getBrowserClient } from '@/utils/supabase/browserClient';
import { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';

enum SocialProvider {
  Kakao = 'kakao',
  Google = 'google'
}

/**
 * Supabase User를 User 인터페이스로 매핑
 * @param supabaseUser - Supabase에서 반환된 사용자 객체
 * @param fallbackEmail - 이메일이 없는 경우 사용할 기본 이메일
 * @returns 매핑된 User 객체
 * @throws 이메일이 없는 경우 에러 발생
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

/**
 * 회원가입을 처리하는 함수
 * @param options - 회원가입에 필요한 정보 (이메일, 비밀번호, 닉네임)
 * @returns 사용자 정보, 세션, 에러 메시지
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

  return {
    user: mappedUser,
    session: data.session,
    error: error ? error.message : null
  };
};

/**
 * 로그인을 처리하는 함수
 * @param options - 로그인에 필요한 정보 (이메일, 비밀번호)
 * @returns 사용자 정보, 세션, 에러 메시지
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
 * @throws 로그아웃 실패 시 에러 발생
 */
export const signout = async (): Promise<void> => {
  const supabase = getBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  alert('로그아웃 되었습니다. 안녕히 가세요!');
};

/**
 * 현재 로그인 상태를 확인하는 함수
 * @returns 로그인 여부 (true: 로그인 상태, false: 로그아웃 상태)
 */
export const isLoggedIn = async (): Promise<boolean> => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.getSession();
  return !!data.session && !error;
};

/**
 * 현재 사용자와 세션 정보를 가져오는 함수
 * @returns 사용자 정보, 세션, 에러 메시지
 */
export const getCurrentUser = async (): Promise<AuthResponse & { provider?: string }> => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.getSession();

  const mappedUser = data.session?.user ? {
    ...mapSupabaseUserToUser(data.session.user),
    provider: data.session.user.app_metadata?.provider || 'email',
  }
: null;

  return {
    user: mappedUser,
    session: data.session,
    provider: data.session?.user?.app_metadata?.provider || 'email',
    error: error?.message || null
  };
};

/**
 * 인증 상태 변화 구독 함수
 * @param callback - 인증 상태 변화 시 호출될 콜백 함수
 * @returns 구독 해제 함수
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
 * 소셜 로그인을 처리하는 공통 함수
 * @param provider - 소셜 로그인 제공자 (kakao, google 등)
 * @param redirectTo - 리다이렉트 URL
 * @returns 에러 메시지
 */
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
 * @param redirectTo - 리다이렉트 URL
 * @returns 에러 메시지
 */
export const signInWithKakao = async (redirectTo: string): Promise<{ error: string | null }> => {
  return signInWithOAuth(SocialProvider.Kakao, redirectTo);
};

/**
 * 구글 소셜 로그인 함수
 * @param redirectTo - 리다이렉트 URL
 * @returns 에러 메시지
 */
export const signInWithGoogle = async (redirectTo: string): Promise<{ error: string | null }> => {
  return signInWithOAuth(SocialProvider.Google, redirectTo);
};

/**
 * 닉네임 업데이트 함수
 * @param newNickname - 새로운 닉네임
 * @returns 업데이트된 사용자 정보, 세션, 에러 메시지
 */
export const updateNickname = async (newNickname: string): Promise<AuthResponse> => {
  const supabase = getBrowserClient();

  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    data: { user_nickname: newNickname },
  });

  if (updateError) {
    return { user: null, session: null, error: updateError.message };
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData.session?.user) {
    return { user: null, session: null, error: '세션 정보를 가져오는 중 오류가 발생했습니다.' };
  }

  const userId = sessionData.session.user.id;
    const { error: dbError } = await supabase
      .from('users')
      .update({ user_nickname: newNickname })
      .eq('user_id', userId);

    if (dbError) {
      return { user: null, session: null, error: `public.users 업데이트 중 오류: ${dbError.message}` };
    }

  const mappedUser = updateData.user ? mapSupabaseUserToUser(updateData.user) : null;
  return { user: mappedUser, session: sessionData.session, error: null };
};

/**
 * 비밀번호 업데이트 함수
 * @param currentPassword - 현재 비밀번호
 * @param newPassword - 새 비밀번호
 * @returns 에러 메시지
 */
export const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ error: string | null }> => {
  const supabase = getBrowserClient();
  
  // 현재 비밀번호로 로그인 시도하여 유효성 확인
  const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
    email: (await getCurrentUser()).user?.email || '',
    password: currentPassword,
  });

  if (loginError || !sessionData.session) {
    return { error: '현재 비밀번호가 올바르지 않습니다.' };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { error: null };
};