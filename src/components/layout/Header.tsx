'use client';

import Image from 'next/image';
import Link from 'next/link';
import Search from '../Search';
import { useEffect } from 'react';
import { useAuthStore } from '@/zustand/authStore';
import { isLoggedIn, signout } from '@/libs/api/supabaseUserAPI';

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const loggedIn = await isLoggedIn();
  //     setLoggedIn(login);
  //   };
  //   checkLogin();
  // }, [setLoggedIn]);

  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

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
            <button onClick={handleLogout}>
              <Image src={'/logout-button.png'} alt="logout" width={80} height={0} style={{ height: 'auto' }} />
            </button>
          ) : (
            <button>
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
