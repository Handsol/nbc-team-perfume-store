'use client';

import Image from 'next/image';
import Link from 'next/link';
import Search from '../Search';
import { useAuthStore } from '@/zustand/authStore';
import { useAuthCheck } from '@/libs/hooks/useAuthCheck';
import { useLogout } from '@/libs/hooks/useLogout';
import { usePathname } from 'next/navigation';
import { useLogin } from '@/libs/hooks/useLogin';

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { handleLogout, loading: logoutLoading } = useLogout();
  const { goToLoginPage } = useLogin();
  const pathname = usePathname();

  useAuthCheck(); // 세션 및 zustand 상태 동기화 진행

  if (pathname === '/sign-up' || pathname === '/login') {
    return null;
  }

  return (
    <header className="flex flex-col items-center w-full border-b border-lightgray">
      <div className="flex flex-row w-full max-w-[1400px] h-[100px] justify-between items-center px-4">
        {/* 로고 */}
        <Link href={'/'}>
          <Image src={'/orot-logo.png'} alt="orot logo" width={150} height={0} style={{ height: 'auto' }} />
        </Link>

        {/* 검색창 */}
        <div className="flex flex-1 justify-center px-10">
          <div className="w-full max-w-[700px]">
            <Search />
          </div>
        </div>

        {/* 버튼 모음 */}
        <div className="flex flex-row gap-1">
          {isLogin ? (
            <button onClick={handleLogout} disabled={logoutLoading}>
              <Image src={'/logout-button.png'} alt="logout" width={80} height={0} style={{ height: 'auto' }} />
            </button>
          ) : (
            <button onClick={goToLoginPage}>
              <Image src={'/login-button.png'} alt="login" width={80} height={0} style={{ height: 'auto' }} />
            </button>
          )}

          <button>
            <Image src={'/mypage-button.png'} alt="login" width={80} height={0} style={{ height: 'auto' }} />
          </button>
          <button>
            <Image src={'/mycart-button.png'} alt="login" width={80} height={0} style={{ height: 'auto' }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
