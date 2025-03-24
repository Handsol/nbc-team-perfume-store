'use client';

import { useLogin } from '@/libs/hooks/useLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useLogin();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">로그인</h1>
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
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? '처리 중...' : '로그인'}
      </Button>
    </div>
  );
}
