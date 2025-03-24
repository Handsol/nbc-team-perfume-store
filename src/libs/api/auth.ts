import { createClient } from '@/utils/supabase/create-client';

const supabase = createClient();

// 로그인 여부 확인
export const isLoggedIn = async (): Promise<boolean> => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return !!session;
};

// 로그아웃 기능
export const signout = async (): Promise<void> => {
  await supabase.auth.signOut();
  alert('로그아웃 되었습니다. 안녕히 가세요!');
};
