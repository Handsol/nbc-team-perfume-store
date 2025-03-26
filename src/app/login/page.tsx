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
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        로그인
      </h1>

      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="w-full p-3 mb-5 transition-all duration-200 border-gray-300"
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        className="w-full p-3 mb-5 transition-all duration-200 border-gray-300"
      />
      {error && <p className="text-red-500 mb-5 text-sm">{error}</p>}

      <Button
        onClick={handleLogin}
        disabled={loading}
        className="w-full py-3 mb-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
      >
        {loading ? '처리 중...' : '로그인'}
      </Button>

      <div className="flex space-x-3 mb-6">
        <Button
          onClick={handleKakaoAuth}
          disabled={loading}
          className="w-full py-3 bg-[#FEE500] text-black hover:bg-[#E5CE00] rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          <Image src="/kakao-logo.svg" alt="Kakao" width={7} height={7} className="w-7 h-7 object-cover" />
          카카오로 로그인
        </Button>
        <Button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          <Image src="/google-logo.svg" alt="Google" width={6} height={6} className="w-full h-6 object-cover" />
          구글로 로그인
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600">
        아직 회원이 아니신가요?{' '}
        <Link href="/sign-up" className="text-blue-500 hover:text-blue-700 hover:underline transition-all duration-200">
          회원가입
        </Link>
      </p>
    </div>
  );
}
