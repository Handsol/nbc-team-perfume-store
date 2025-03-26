'use client';

import { useLogin } from '@/libs/hooks/useLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignup } from '@/libs/hooks/useSignup';

export default function LoginPage() {
  const { handleKakaoAuth } = useSignup();
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

      <div className="flex space-x-2">
        <Button
          onClick={handleKakaoAuth}
          disabled={loading}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
        >
          카카오로 로그인
        </Button>
        <Button disabled={loading} className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100">
          구글로 로그인
        </Button>
      </div>
    </div>
  );
}
