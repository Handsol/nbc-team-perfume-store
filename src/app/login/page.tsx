'use client';

import { useLogin } from '@/libs/hooks/useLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignup } from '@/libs/hooks/useSignup';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const { handleKakaoAuth, handleGoogleAuth } = useSignup();
  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useLogin();

  return (
    <div className="flex h-[650px] w-full items-center justify-center pt-[50px]">
      <div className="flex h-[500px] w-[500px] flex-col justify-between">
        <div>
          <h1 className="mb-8 bg-clip-text text-center text-3xl font-bold text-black">Login</h1>

          <div className="mb-5">
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="border-gray-300 w-full p-3 transition-all duration-200"
            />
          </div>

          <div className="mb-5">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="border-gray-300 w-full p-3 transition-all duration-200"
            />
          </div>

          {error && <p className="mb-5 text-sm text-red-500">{error}</p>}

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="mb-5 w-full rounded-lg bg-black py-3 text-white transition-all duration-200 hover:bg-gray"
          >
            {loading ? '처리 중...' : '로그인'}
          </Button>
        </div>

        {/* 소셜 로그인 */}
        <div className="mb-6 flex h-[50px] space-x-3">
          <Button
            onClick={handleKakaoAuth}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-3 text-black shadow-md transition-all duration-200 hover:bg-[#E5CE00]"
          >
            <Image src="/kakao-logo.svg" alt="Kakao" width={7} height={7} className="h-7 w-7 object-cover" />
            카카오로 로그인
          </Button>
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="text-gray-700 border-gray-300 hover:bg-gray-100 flex w-full items-center justify-center gap-2 rounded-lg border bg-white py-3 shadow-md transition-all duration-200"
          >
            <Image src="/google-logo.svg" alt="Google" width={24} height={24} className="h-16 w-16 object-contain" />
            구글로 로그인
          </Button>
        </div>

        <p className="text-gray-600 text-center text-sm">
          아직 회원이 아니신가요?{' '}
          <Link
            href="/sign-up"
            className="text-blue-500 transition-all duration-200 hover:text-blue-700 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
