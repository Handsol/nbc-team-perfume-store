// 'use client';

import CartItemList from '@/components/cart/CartItemList';
import { getCartItemList } from '@/libs/api/cart/cart-api';
import { useAddCartItem, useDeleteCartItem, useUpdateItemQuantity } from '@/libs/hooks/cart/mutations';
import { useGetCartItems } from '@/libs/hooks/cart/queries';
import { CartItem } from '@/types/cart-items';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const CartPage = async () => {
  //장바구니 테스트용 변수
  const user_id = '6b25b700-0dff-4f94-8425-462fcfb74d5d';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItemList(user_id)
  });

  return (
    <>
      <h1>CartPage</h1>

      <p>장바구니 목록</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CartItemList user_id={user_id} />
      </HydrationBoundary>
    </>
  );
};
export default CartPage;
