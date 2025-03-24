'use client';

import { useState } from 'react';
import { login } from '@/libs/api/supabase-user-api';
import { useAuthStore } from '@/zustand/authStore';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setLogin } = useAuthStore();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { user, session, error } = await login({ email, password });

    if (error) {
      setError(error);
    } else if (user && session) {
      setLogin(user, session.access_token);
      alert('로그인 성공!');
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin
  };
};
