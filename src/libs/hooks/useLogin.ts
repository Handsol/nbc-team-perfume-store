'use client';

import { useState } from 'react';
import { login } from '@/libs/api/supabaseUserAPI';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { user, session, error } = await login({ email, password });

    if (error) {
      setError(error);
    } else if (user && session) {
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
