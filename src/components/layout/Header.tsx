'use client';

import Image from 'next/image';
import Link from 'next/link';
import Search from '../search/Search';
import { useAuthStore } from '@/zustand/authStore';
import { useAuthCheck } from '@/libs/hooks/useAuthCheck';
import { useLogout } from '@/libs/hooks/useLogout';
import { useLogin } from '@/libs/hooks/useLogin';
import { useMyPage } from '@/libs/hooks/useMyPage';
import { useCart } from '@/libs/hooks/useCart';

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { handleLogout, loading: logoutLoading } = useLogout();
  const { goToLoginPage } = useLogin();
  const { goToMyPage } = useMyPage();
  const { goToCartPage } = useCart();

  useAuthCheck(); // 세션 및 zustand 상태 동기화 진행

  return (
    <header className="flex w-full flex-col items-center border-b border-lightgray">
      <div className="flex h-[100px] w-full max-w-[1400px] flex-row items-center justify-between px-4">
        {/* 로고 */}
        <Link href={'/'}>
          <Image src={'/orot-logo.png'} alt="orot logo" width={150} height={0} style={{ height: 'auto' }} priority />
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

          <button onClick={goToMyPage}>
            <Image src={'/mypage-button.png'} alt="login" width={80} height={0} style={{ height: 'auto' }} />
          </button>
          <button onClick={goToCartPage}>
            <Image src={'/mycart-button.png'} alt="login" width={80} height={0} style={{ height: 'auto' }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
