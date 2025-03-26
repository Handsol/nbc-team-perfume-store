'use client';

import CartItemList from '@/components/cart/CartItemList';
import { getCartItemList } from '@/libs/api/cart/cart-api';
import { TCartItem } from '@/types/cart-items';
import { useAuthStore } from '@/zustand/authStore';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Loading from '../loading';

const CartPage = () => {
  const user = useAuthStore((state) => state.user);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setIsLoading(false);
    }
  }, [user]);
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['cart'],
      queryFn: () => getCartItemList(userId)
    });
  }, [queryClient, userId]);

  if (isLoading) {
    return <span className="loader"> loading...</span>;
  } else if (!userId) {
    return (
        <div className="container mx-auto mt-10 flex flex-col items-center justify-center">
          <p>로그인 후 이용해주세요</p>
          <div className="flex items-center justify-center">
            <Link className={buttonVariants({ variant: 'default' })} href={'/login'}>
              로그인 하러가기
            </Link>
          </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-4 text-2xl">장바구니</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CartItemList user_id={userId} />
      </HydrationBoundary>
    </div>
  );
};
export default CartPage;
