'use client';

import { ChangeEvent, useState } from 'react';
import { useAuthStore } from '@/zustand/authStore';
import { AuthState } from '@/types/auth';
import { Input } from '../ui/input';

const PayUser = () => {
  const user = useAuthStore<AuthState['user']>((state) => state.user);
  const [userState, setUserState] = useState({
    nickname: '',
    email: '',
    phone: 0
  });

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newUser = {
      ...userState,
      [name]: value
    };
    setUserState(newUser);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl">주문자 정보</h2>
      <div className="flex flex-col justify-start gap-2 px-8 py-6">
        <div className="container flex flex-row items-center gap-6">
          <p className="w-32">이름</p>
          <div className="flex w-full items-center">
            <Input
              type="text"
              placeholder="주문하시는 분"
              name="nickname"
              required
              className="h-12"
              defaultValue={user?.nickname}
              onChange={handleUserInput}
            />
          </div>
        </div>
        <div className="container flex flex-row items-center gap-6">
          <p className="w-32">이메일 주소</p>
          <div className="flex w-full items-center">
            <Input
              type="mail"
              placeholder="이메일 주소"
              className="h-12"
              defaultValue={user?.email}
              name="email"
              onChange={handleUserInput}
            />
          </div>
        </div>
        <div className="container flex flex-row items-center gap-6">
          <p className="w-32">연락처</p>
          <div className="flex w-full items-center">
            <Input type="tel" placeholder="연락처" required className="h-12" name="phone" onChange={handleUserInput} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayUser;
