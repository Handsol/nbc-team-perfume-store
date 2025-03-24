'use client';

import { useState } from 'react';
import { signup } from '@/libs/apis/supabaseUserAPI';

export const useSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const { user, session, error } = await signup({ email, password, nickname });

    if (error) {
      setError(error);
    } else {
      alert('회원가입 성공! 이메일을 확인해주세요.');
      setEmail('');
      setPassword('');
      setNickname('');
    }

    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    nickname,
    setNickname,
    error,
    loading,
    handleSignup
  };
};
