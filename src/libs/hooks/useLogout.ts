'use client';

import { useState } from 'react';
import { signout } from '@/libs/api/supabase-user-api';
import { useAuthStore } from '@/zustand/authStore';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLogout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      await signout();
      setLogout(); // Zustand 상태 초기화
      alert('로그아웃 되었습니다. 안녕히 가세요!');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그아웃 실패');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};
