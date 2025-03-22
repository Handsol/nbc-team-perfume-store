'use client';

import Image from 'next/image';
import Link from 'next/link';
import Search from '../Search';
import { useEffect } from 'react';
import { isLoggedIn, signout } from '@/libs/api/auth';
import { useLoginState } from '@/zustand/login-status';

const Header = () => {
  const { loggedIn, setLoggedIn, logout } = useLoginState();

  useEffect(() => {
    const checkLogin = async () => {
      const login = await isLoggedIn();
      setLoggedIn(login);
    };
    checkLogin();
  }, [setLoggedIn]);

  const handleLogout = async () => {
    await signout();
    logout();
  };

  return (
    <div className="flex flex-col items-center w-full border-b border-lightgray">
      <div className="flex flex-row w-full max-w-[1400px] h-[100px] justify-between items-center px-4">
        {/* 로고 */}
        <Link href={'/'}>
          <Image src={'/orot-logo.png'} alt="orot logo" width={150} height={0} />
        </Link>

        {/* 검색창 */}
        <div className="flex flex-1 justify-center px-10">
          <div className="w-full max-w-[700px]">
            <Search />
          </div>
        </div>

        {/* 버튼 모음 */}
        <div className="flex flex-row gap-1">
          {loggedIn ? (
            <button onClick={handleLogout}>
              <Image src={'/logout-button.png'} alt="logout" width={80} height={0} />
            </button>
          ) : (
            <Link href={'/login'}>
              <Image src={'/login-button.png'} alt="login" width={80} height={0} />
            </Link>
          )}

          <Link href={'/my-page'}>
            <Image src={'/mypage-button.png'} alt="login" width={80} height={0} />
          </Link>
          <Link href={'/cart'}>
            <Image src={'/mycart-button.png'} alt="login" width={80} height={0} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
