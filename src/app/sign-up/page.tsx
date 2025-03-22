'use client';

import { useState } from 'react';
import { getBrowserClient } from '@/utils/supabase/browserClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    const supabase = getBrowserClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { user_nickname: nickname }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      alert('회원가입 성공! 이메일을 확인해주세요.');
      setEmail('');
      setPassword('');
      setNickname('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">회원가입</h1>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={handleSignup}>회원가입</Button>
    </div>
  );
}
