'use client';

import { useSignup } from '@/libs/hooks/useSignup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const { email, setEmail, password, setPassword, nickname, setNickname, error, loading, handleSignup } = useSignup();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">회원가입</h1>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
        disabled={loading}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
        disabled={loading}
      />
      <Input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="mb-4"
        disabled={loading}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={handleSignup} disabled={loading}>
        {loading ? '처리 중...' : '회원가입'}
      </Button>
    </div>
  );
}
