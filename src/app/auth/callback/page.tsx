'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/libs/api/supabase-user-api';
import { useAuthStore } from '@/zustand/authStore';

export default function AuthCallback() {
  const router = useRouter();
  const { setLogin } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const { session, user } = await getCurrentUser();
      if (session && user) {
        setLogin(user, session.access_token);
        router.push('/');
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [router, setLogin]);

  return <div>처리 중...</div>;
}
