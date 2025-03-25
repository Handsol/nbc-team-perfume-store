// 로그인 상태를 확인 및 zustand 상태 동기화
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/zustand/authStore';
import { getCurrentUser } from '@/libs/api/supabase-user-api';

export const useAuthCheck = () => {
  const { setLogin, setLogout } = useAuthStore();

  useEffect(() => {
    const checkLogin = async () => {
      const { user, session, error } = await getCurrentUser();
      if (!error && user && session) {
        setLogin(user, session.access_token);
      } else {
        setLogout();
      }
    };
    checkLogin();
  }, [setLogin, setLogout]);
};
