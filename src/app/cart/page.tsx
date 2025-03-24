'use client';

import CartItemList from '@/components/cart/CartItemList';
import { getCartItemList } from '@/libs/api/cart/cart-api';
import { CartItem } from '@/types/cart-items';
import { useAuthStore } from '@/zustand/authStore';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const CartPage = () => {
  // 장바구니 테스트용 변수
  // const user_id = '6b25b700-0dff-4f94-8425-462fcfb74d5d';
  const user = useAuthStore((state) => state.user);
  const [userId, setUserId] = useState<string>('');
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  console.log(userId)
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['cart'],
      queryFn: () => getCartItemList(userId)
    });
  }, [queryClient, userId]);

  // userId가 없는 상태
  if (!userId) {
    return <p>장바구니를 조회중입니다...</p>;
  }

  return (
    <>
      <h1>CartPage</h1>

      <p>장바구니 목록</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CartItemList user_id={userId} />
      </HydrationBoundary>
    </>
  );
};
export default CartPage;
